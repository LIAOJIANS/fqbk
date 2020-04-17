<template>
	<view class="user-list-body">
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollStyle="border-bottom: none" scrollItemStyle="width: 33.33%"></swiperTabHead>

		<block v-for="(item, index) in dataLists" :key="index">
			<template v-if="tabIndex === index">
				<block v-for="(itemList, listIndex) in item.list" :key="listIndex">
					<userList :item="itemList" :index="listIndex" :hidden='hidden'></userList>
				</block>
			</template>
		</block>
	</view>
</template>

<script>
import swiperTabHead from '../../components/index/swiper-tab-head.vue';
import userList from '../../components/user-list/user-list';
export default {
	data() {
		return {
			tabIndex: 0,
			hidden: null, 
			tabBars: [{ name: '互关', id: 'huguan', num: 10 }, { name: '关注', id: 'guanzhu', num: 10 }, { name: '粉丝', id: 'fensi', num: 10 }],
			dataLists: [
				{
					context: '上拉加载更多',
					list: [
						{
							userpic: '../../static/shou.jpg',
							username: 'woshishui',
							age: 20,
							sex: 0,
							isguanzhu: true
						}
					]
				},
				{
					context: '上拉加载更多',
					list: [
						{
							userpic: '../../static/shou.jpg',
							username: 'woshishui',
							age: 20,
							sex: 0,
							isguanzhu: true
						}
					]
				},
				{
					context: '上拉加载更多',
					list: [
						{
							userpic: '../../static/shou.jpg',
							username: 'woshishui',
							age: 20,
							sex: 0,
							isguanzhu: false
						}
					]
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
	
	onReachBottom() {
		this.loadingDate()
	},

	methods: {
		tabtap(index) {
			this.tabIndex = index;
			this.hidden = false
		},
		
		loadingDate() {
			// 下拉加载
			if (this.dataLists[this.tabIndex].context !== '下拉加载更多') return;
			setTimeout(() => {
				this.dataLists[this.tabIndex].context = '正在加载中.......';
			}, 1000);
		
			this.dataLists[this.tabIndex].context = '没有更多数据';
		},
	},
	
	watch: {
		tabIndex(val) {
			if(val === 1) {
				this.hidden = true
			} 
		}
	},

	components: {
		swiperTabHead,
		userList
	}
};
</script>

<style lang="scss" scoped>
.user-list-body {
	padding: 0 20upx;
}

</style>
