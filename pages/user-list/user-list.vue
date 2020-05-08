<template>
	<view class="user-list-body">
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollStyle="border-bottom: none" scrollItemStyle="width: 33.33%"></swiperTabHead>
		<block v-for="(item, index) in dataLists" :key="index">
			<template v-if="tabIndex === index && item.list.length > 0">
				<block v-for="(itemList, listIndex) in item.list" :key="listIndex"><userList :item="itemList" :index="listIndex" :hidden="hidden"></userList></block>
				<loadMore :loadtext="item.context" />
			</template>
			<template v-else-if="!item.firstload && tabIndex === index">
				<view
					style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
				padding-top: 100upx;"
					class="u-f-ajc"
				>
					Loading ...
				</view>
			</template>
			<template v-else-if='tabIndex === index'>
			<view class="nothings u-f-ajc animated fadeIn">
				<image src="../../static/common/nothing.png" 
				mode="widthFix"></image>
			</view>
			</template>
		</block>
	</view>
</template>

<script>
import swiperTabHead from '../../components/index/swiper-tab-head.vue';
import userList from '../../components/user-list/user-list';
import loadMore from '../../components/common/load-more.vue';
import noThing from '../../components/common/no-thing.vue';
export default {
	data() {
		return {
			tabIndex: 0,
			hidden: null,
			tabBars: [{ name: '互关', id: 'huguan', num: 10 }, { name: '关注', id: 'guanzhu', num: 10 }, { name: '粉丝', id: 'fensi', num: 10 }],
			dataLists: [
				{
					firstload: false,
					page: 1,
					context: '上拉加载更多',
					list: []
				},
				{
					firstload: false,
					page: 1,
					context: '上拉加载更多',
					list: []
				},
				{
					firstload: false,
					page: 1,
					context: '上拉加载更多',
					list: []
				}
			]
		};
	},

	onNavigationBarButtonTap(e) {
		// 监听导航按钮事件
		if (e.index === 0) {
			uni.navigateBack({
				delta: 1
			});
		}
	},
	
	onNavigationBarSearchInputClicked() {
		uni.navigateTo({
			url: '../search/search?searchType=user',
		});
	},

	onReachBottom() {
		this.loadingDate();
	},

	onShow() {
		this.__init();
	},

	methods: {
		__init() {
			this.tabBars[0].num = this.user.counts.friend_count > 100 ? '99+' : this.user.counts.friend_count;
			this.tabBars[1].num = this.user.counts.withfollow_count > 100 ? '99+' : this.user.counts.withfollow_count;
			this.tabBars[2].num = this.user.counts.withfen_count > 100 ? '99+' : this.user.counts.withfen_count;
			this.getData()
		},

		async getData() {
			try {
				let currentIndex = this.tabIndex;
				let [err,res] = await this.$http.get(this.getUrl(),{},{
					token:true,
					checkToken:true
				});
				// 错误处理
				if (!this.$http.errorCheck(err,res)) {
					this.dataLists[currentIndex].loadtext="上拉加载更多";
					return;
				}
				// 获取成功
				let arr = [];
				let list = res.data.data.list;
				list.forEach(item => {
					arr.push(this.__format(item, currentIndex));
				})
				this.dataLists[currentIndex].list = this.dataLists[currentIndex].page > 1 ? this.dataLists[currentIndex].list.concat(arr) : arr
				this.dataLists[currentIndex].firstload = true
				this.dataLists[currentIndex].loadtext= list.length < 10 ? "没有更多数据了" : "上拉加载更多";
			} catch(e) {
				return
			}
		},
		
		__format(item, currentIndex){
			return {
				id: item.userinfo.user_id,
				userpic: item.userpic,
				username: item.username,
				age: item.userinfo.age,
				sex: item.userinfo.sex,
				isguanzhu: currentIndex !== 2 
			}
		},
		
		getUrl(){
			let arr = ['/friends/', '/follows/', '/fens/'];
			return arr[this.tabIndex] + this.dataLists[this.tabIndex].page;
		},

		tabtap(index) {
			this.tabIndex = index;
			this.hidden = false;
			if (!this.dataLists[this.tabIndex].firstload) {
				this.getData();
			}
		},

		loadingDate() {
			if(this.dataLists[this.tabIndex].loadtext!=="上拉加载更多")  return;
			this.dataLists[this.tabIndex].context = '正在加载中.......';
			// 下拉加载
			this.dataLists[this.tabIndex].page++
			this.getData()
		}
	},

	watch: {
		tabIndex(val) {
			if (val === 1) {
				this.hidden = true;
			}
		}
	},

	components: {
		swiperTabHead,
		userList,
		loadMore,
		noThing
	}
};
</script>

<style lang="scss" scoped>
.user-list-body {
	padding: 0 20upx;
}
</style>
