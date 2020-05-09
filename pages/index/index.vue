<template>
	<view class="uni-tab-bar">
		<!-- 导航栏 -->
		<!-- #ifndef APP-PLUS -->
		<uni-nav-bar :shadow="false" :border="false" @click-left="clickLeft" @click-right="clickRight">
			<!-- 左边图标 -->
			<block slot="left"><view class="iconfont icon-qiandao" style="font-size: 22px;color: #FF9619;margin-left: 20upx;"></view></block>
			<!-- 中间搜索框 -->
			<view
				style="display: flex;justify-content: center;align-items: center;border-radius: 4px;margin-left: -46upx;height: 60upx;margin-top: 12upx;color: #CCCCCC;background: #F7F7F7;"
				@tap="openSearch"
			>
				<view class="iconfont icon-sousuo" style="margin-right: 6upx;"></view>
				搜索糗事
			</view>
			<!-- 右边图标 -->
			<block slot="right"><view class="icon iconfont icon-bianji1" style="font-size: 22px;color: #000000;"></view></block>
		</uni-nav-bar>
		<!-- #endif -->

		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiperTabHead>
		<view class="aa">
			<swiper class="swiper-box" :style="getHeight" :current="tabIndex" @change="tabChange">
				<swiper-item v-for="(items, index) in newslist" :key="index" :style="getHeight">
					<scroll-view scroll-y class="list" @scrolltolower="loadingDate(index)" :style="getHeight">
						<template v-if="items.lists.length > 0">
							<!-- 图文列表 -->
							<block v-for="(item, index1) in items.lists" :key="index1"><indexList @changeevent="updateData" :item="item" :index="index1" /></block>
							<loadMore :loadtext="items.context" />
						</template>
						<template v-else-if="!items.first">
							<view
								style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
							padding-top: 100upx;"
								class="u-f-ajc"
							>
								Loading ...
							</view>
						</template>
						<template v-else>
							<noThing />
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
// #ifndef APP-PLUS
import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue';
// #endif
import indexList from '../../components/index/index-list.vue';
import swiperTabHead from '../../components/index/swiper-tab-head.vue';
import loadMore from '../../components/common/load-more.vue';
import noThing from '../../components/common/no-thing.vue';
export default {
	data() {
		return {
			tabIndex: 0, // 默认显示第一个
			tabBars: [],
			newslist: []
		};
	},

	created() {
		this._getLoadData();
		// 开启监听
		uni.$on('updateData', this.updateData);
	},

	computed: {
		getHeight() {
			let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(100) - 44;
			// #ifdef MP-ALIPAY
			return `height: ${ height }px;`;
			// #endif
			return `height: ${ height + 44 }px;`;
		}
	},

	onNavigationBarSearchInputClicked() {
		uni.navigateTo({ url: '../search/search' });
	},

	onNavigationBarButtonTap(e) {
		// 监听头部按钮点击事件
		if (e.index === 1) uni.navigateTo({ url: '../add-input/add-input' });
	},

	methods: {
		// #ifndef APP-PLUS
		clickLeft(){
			console.log('左边事件')
		},
		clickRight(){
			// 打开发布页面
			this.User.navigate({
				url: '../add-input/add-input?postclass=' + JSON.stringify(this.tabBars),
			})
		},
		openSearch(){
			uni.navigateTo({
				url: '../search/search',
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
			this.newslist[this.tabIndex].lists.forEach((item, index) => {
				if (item.userid === data.userid) {
					item.isguanzhu = data.data;
				}
			});
		},

		updateComment(data) {
			let obj = this.newslist[this.tabIndex].lists.find((item, index) => {
				return item.id === data.post_id;
			});
			if (!obj) return;
			obj.commentnum++;
		},

		support(data) {
			// 拿到当前对象
			let obj = this.newslist[this.tabIndex].lists.find(value => {
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

		async _getLoadData() {
			// 请求数据
			const [err, res] = await this.$http.get('/postclass');
			let arr = [];
			res.data.data.list.forEach(item => {
				this.tabBars.push({
					id: item.id,
					name: item.classname
				});
				arr.push({
					// 分类对应的对象数
					context: '下拉加载更多',
					lists: [],
					page: 1,
					first: false
				});
			});
			this.newslist = arr;
			this.tabBars.length > 0 && this._getIndexData();
		},

		async _getIndexData() {
			const [err, res] = await this.$http.get(`/postclass/${this.tabBars[this.tabIndex].id}/post/${this.newslist[this.tabIndex].page}`, {}, { token: true });
			let error = this.$http.errorCheck(
				err,
				res,
				() => {
					this.newslist[currentIndex].loadtext = '上拉加载更多';
				},
				() => {
					this.newslist[currentIndex].loadtext = '上拉加载更多';
				}
			);
			if (!error) return;
			let arr = [];
			res.data.data.list.forEach(item => {
				arr.push(this._fomat(item));
			});
			this.newslist[this.tabIndex].lists = this.newslist[this.tabIndex].page > 1 ? this.newslist[this.tabIndex].lists.concat(arr) : arr;
			this.newslist[this.tabIndex].first = true;
			if (res.data.data.list.length < 10) {
				this.newslist[this.tabIndex].context = '没有更多数据了';
			} else {
				this.newslist[this.tabIndex].context = '下拉加载更多';
			}
			return;
		},

		_fomat(item) {
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
		},

		tabtap(index) {
			this.tabIndex = index;
		},

		loadingDate(index) {
			// 下拉加载
			if (this.newslist[index].context !== '下拉加载更多') return;
			this.newslist[index].context = '加载中...';
			this.newslist[this.tabIndex].page++;
			this._getIndexData();
		},

		tabChange(e) {
			// 改变显示索引
			this.tabIndex = e.detail.current;
			this._getIndexData();
		}
	},

	components: {
		indexList,
		swiperTabHead,
		loadMore,
		noThing
	}
};
</script>

<style scoped></style>
