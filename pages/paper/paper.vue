<template>
	<view class="paper-content">
		<!-- 右上角显示 -->
		<paperPopup :show='isShowMenu' @hide='hidAlert' @addfriend='addFirend' @clear='clear'></paperPopup>
		<!-- 小纸条列表 -->
		<block v-for="(item, index) in list" :key='index'>
			<paperList :item='item' :index='index' />
		</block>
		<!-- 上拉加载 -->
		<loadMore :loadtext='context'></loadMore>
	</view>
</template>

<script>
	import badGe from '../../components/uni-badge/uni-badge.vue'
	import paperList from '../../components/paper/paper-list.vue'
	import paperPopup from '../../components/paper/paper-left-popup.vue'
	import loadMore from '../../components/common/load-more.vue'
	export default {
		data() {
			return {
				context: '上拉加载更多',
				isShowMenu: false, // 是否显示菜单
				list: [
					{
						userpic: '.../../static/shou.jpg',
						username: 'shanJ',
						time: '10:21',
						noreadnum: 2,
						data: '我是你爸爸爸爸爸爸'
					},
					{
						userpic: '.../../static/shou.jpg',
						username: 'shanJ',
						time: '10:21',
						noreadnum: 2,
						data: '我是你爸爸爸爸爸爸'
					}
				]
			};
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 1) {
				this.isShowMenu = true
			} else {
				uni.navigateTo({
					url: '../user-list/user-list'
				});
			}
		},
		
		onPullDownRefresh() { // 下拉
			this.getdata()
		},
		
		onReachBottom() { // 上拉
			this.loadingDate()
		},
		
		methods: {
			getdata() { // 获取数据
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 1000)
			},
			
			addFirend() { // 添加朋友
				this.hidAlert()
			},
			
			clear() { // 清除缓存
				this.hidAlert()
			},
			
			hidAlert() {
				this.isShowMenu = false
			},
			
			loadingDate(index) { // 下拉加载
				if(this.context !== '下拉加载更多') return
				setTimeout(() => {
					this.context = '正在加载中.......'
				}, 1000)
				this.context = '没有更多数据'
			},
		},
		components: {
			badGe,
			paperList,
			loadMore,
			paperPopup
		},
		
	}
</script>

<style lang="scss" scoped>
	.paper-content {
		padding: 0 20upx;
		position: relative;
	}
</style>
