<template>
	<view>
		<!-- 自定义导航 -->
		<!-- #ifndef APP-PLUS -->
		<view style="display: flex;
		align-items: center;
		padding:0 20upx;height: 88upx;
		position: fixed;z-index: 9999;
		left: 0;
		top: 0;
		right: 0;
		background: #FFFFFF;">
			<view class="iconfont icon-sousuo" 
			style="position: absolute;left: 30upx;color: #CCCCCC;"></view>
			<input style="flex: 1;padding: 5upx 0 5upx 50upx;border-radius: 4px;background: #F7F7F7;" 
			type="text" v-model="serchVal" @confirm="_loadData"
			:placeholder="getPlaceholder" 
			placeholder-style="color: #CCCCCC;"/>
			<text style="padding-left:20upx;"
			@click="goBack">取消</text>
		</view>
		<view style="height: 88upx;"></view>
		<!-- #endif -->
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key="index">
				<template v-if="searchType === 'post'">
					<indexList :item="item" :index="index" />
				</template>
				<template v-if="searchType === 'topic'">
					<view style="padding: 0 20px;"><topicList :item="item" :index="index" /></view>
				</template>
				<template v-else>
					<view style="padding: 0 20px;"><userList :item="item" :index="index" :hidden='true' /></view>
				</template>
			</block>
			<loadMore :loadtext="content" />
		</template>
		<template v-else-if="isData && list.length < 1">
			<noThing />
		</template>
	</view>
</template>

<script>
import loadMore from '../../components/common/load-more.vue';
import noThing from '../../components/common/no-thing.vue';
import indexList from '../../components/index/index-list.vue';
import topicList from '../../components/news/topic-list.vue';
import userList from '../../components/user-list/user-list';
export default {
	data() {
		return {
			isData: false, // 默认用户没点过搜索
			content: '下拉加载更多',
			list: [],
			page: 1, // 默认加载第一页
			serchVal: '', // 搜索框内容
			searchType: 'post' // 搜索类型
		};
	},

	components: {
		loadMore,
		noThing,
		indexList,
		topicList,
		userList
	},

	onLoad(e) {
		// 开启监听
		uni.$on('updateData', this.updateData);
		if (!e) return;
		this.searchType = e.searchType || 'post';
		// #ifdef APP-PLUS
		let pageTitle = '搜索文章';
		if (this.searchType === 'topic') {
			pageTitle = '搜索话题';
		} else if (this.searchType === 'user') {
			pageTitle = '搜索用户';
		}
		let currentWebView = this.$mp.page.$getAppWebview();
		let tn = currentWebView.getStyle().titleNView;
		tn.searchInput.placeholder = pageTitle;
		currentWebView.setStyle({
			titleNView: tn
		});
		// #endif
	},
	
	computed: {
		getPlaceholder() {
			let type = '文章'
			if (this.searchType == 'post') {
				type = '文章';
			}else if(this.searchType == 'topic'){
				type = '话题';
			}else if(this.searchType == 'user'){
				type = '用户';
			}
			return '搜索'+type;
		}
	},

	onNavigationBarButtonTap(e) {
		// 监听头部按钮点击事件
		if (e.index === 0) {
			uni.navigateBack({
				delta: 1
			});
		}
	},

	onPullDownRefresh() {
		this._loadData(this.serchVal);
		uni.stopPullDownRefresh();
	},

	onReachBottom() {
		this.loadingDate();
	},

	onNavigationBarSearchInputChanged(e) {
		// 输入框内容的变化
		if (e.text) {
			this.serchVal = e.text;
			console.log(this.serchVal)
		}
	},

	onNavigationBarSearchInputConfirmed(e) {
		// 用户点击搜索键盘时的变化
		if (e.text) {
			this._loadData(this.serchVal);
		}
	},

	methods: {
		// #ifndef APP-PLUS
		goBack(){
			uni.navigateBack({
				delta: 1
			});
		},
		// #endif
		
		updateData(resdata) {
			switch (resdata.type) {
				case 'guanzhu':
					this.guanzhu(resdata);
					break;
				case 'support':
					this.support(resdata);
					break;
				case 'updateComment':
					this.updateComment(resdata);
					break;
			}
		},

		guanzhu(data) {
			this.list.forEach((item, index) => {
				if (item.userid === data.userid) {
					item.isguanzhu = data.data;
				}
			});
		},

		updateComment(data) {
			let obj = this.list.find((item, index) => {
				return item.id === data.post_id;
			});
			if (!obj) return;
			obj.commentnum++;
		},

		support(data) {
			// 拿到当前对象
			let obj = this.list.find(value => {
				return value.id === data.post_id;
			});
			if (!obj) return;
			let oldindex = obj.infonum.index; // 操作前的状态
			obj.infonum.index = data.do == 'ding' ? 1 : 2; // 操作后的状态
			if (oldindex !== 0) {
				//之前操作过
				oldindex == 1 ? obj.infonum.dingnum-- : obj.infonum.cainum--;
			}
			if (obj.infonum.index !== 0) {
				// 当前操作
				obj.infonum.index == 1 ? obj.infonum.dingnum++ : obj.infonum.cainum++;
			}
		},

		async _loadData(val) {
			// #ifndef APP-PLUS
				val = val.detail.value
			// #endif
			uni.showLoading({ title: 'Loading...' });
			// 判断请求类型
			let url ='/search/' + this.searchType;
			const [err, res] = await this.$http.post(url, {
				keyword: val,
				page: this.page
			});
			let error = this.$http.errorCheck(
				err,
				res,
				() => {
					uni.hideLoading();
					this.isData = true;
				},
				() => {
					uni.hideLoading();
					this.isData = true;
				}
			);
			if (!error) return;
			let arr = [];
			res.data.data.list.forEach(item => {
				arr.push(this._fomat(item));
			});
			this.list = this.page > 1 ? this.list.concat(arr) : arr;
			this.isData = true;
		
			res.data.data.list.length < 10 ? this.content = '没有更多数据了' : this.contentt = '下拉加载更多';
			
			uni.hideLoading();
		},

		_fomat(item) {
			switch (this.searchType) {
				case 'post':
					return {
						userid: item.user.id,
						userpic: item.user.userpic,
						username: item.user.username,
						isguanzhu: !!item.user.fens.length,
						id: item.id,
						title: item.title,
						type: 'img',
						video: false,
						path: item.path,
						share: !!item.share,
						titlepic: item.titlepic,
						infonum: {
							index: item.support.length > 0 ? item.support[0].type + 1 : 0,
							dingnum: item.ding_count,
							cainum: item.cai_count
						},
						commentnum: item.comment_count,
						sharenum: item.sharenum
					};
				case 'topic':
					return {
						id: item.id,
						titlepic: item.titlepic,
						title: item.title,
						desc: item.desc,
						totalnum: item.totalnum,
						todaynum: itme.todaynum
					};
				case 'user': 
					return {
						id: item.userinfo.user_id,
						userpic: item.userpic,
						username: item.username,
						age: item.userinfo.age,
						sex: item.userinfo.sex,
						isguanzhu: false
					}
			}
		},

		loadingDate() {
			if (this.contentt !== '下拉加载更多') return;
			this.contentt = '加载中...';
			this.page++;
			this._loadData(this.serchVal);
		}
	}
};
</script>

<style></style>
