<template>
	<view>
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key='index'>
				<indexList :item='item' :index='index' />
			</block>
			<loadMore :loadtext='content' />
		</template>
		<template v-else-if="isData && list.length < 1">
			<noThing />
		</template>
	</view>
</template>

<script>
	import loadMore from '../../components/common/load-more.vue'
	import noThing from '../../components/common/no-thing.vue'
	import indexList from '../../components/index/index-list.vue'
	export default {
		data() {
			return {
				isData: false, // 默认用户没点过搜索
				content: '下拉加载更多',
				list: [],
				page: 1, // 默认加载第一页
				serchVal: '' // 搜索框内容
			}
		},
		components: {
			loadMore,
			noThing,
			indexList
		},
		
		onNavigationBarButtonTap(e) { // 监听头部按钮点击事件
			if(e.index === 0) {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		
		onPullDownRefresh() {
			this._loadData(this.serchVal)
			uni.stopPullDownRefresh()
		},
		
		onReachBottom() {
			this.loadingDate()
		},
		
		onNavigationBarSearchInputChanged(e) { // 输入框内容的变化
			if(e.text) {
				this.serchVal = e.text
			}
		},
		
		onNavigationBarSearchInputConfirmed(e) { // 用户点击搜索键盘时的变化
			if(e.text) {
				this._loadData(this.serchVal)
			
			}
		},
		
		methods: {
			_loadData(val) {
				uni.showLoading();
				let arr = [
						{
							userpic: '../../static/shou.png',
							username: '鲁大师',
							isguanzhu: false,
							title: '走出去，才发现你跟别人差点不是一点半点',
							type: 'img',
							titlepic: '../../static/logo.png',
							infonum: {
								index: 0,
								dingnum: 11,
								cainum: 1000
							},
							cainum: {},
							commentnum: 10,
							sharenum: 10
						},
						{
							userpic: '../../static/shou.png',
							username: '鲁大师',
							isguanzhu: false,
							title: '走出去，才发现你跟别人差点不是一点半点',
							type: 'img',
							titlepic: '../../static/logo.png',
							infonum: {
								index: 0,
								dingnum: 11,
								cainum: 1000
							},
							cainum: {},
							commentnum: 10,
							sharenum: 10
						},
						{
							userpic: '../../static/shou.png',
							username: '鲁大师',
							isguanzhu: false,
							title: '走出去，才发现你跟别人差点不是一点半点',
							type: 'video',
							titlepic: '../../static/logo.png',
							playnum: '20W',
							long: '2:00:00',
							infonum: {
								index: 1,
								dingnum: 11,
								cainum: 1000
							},
							cainum: {},
							commentnum: 10,
							sharenum: 10
						}
					
				]
				
				setTimeout(() => {
					this.list = arr
					console.log(1)
					uni.hideLoading()
					this.isData = true
				}, 1000)
			},
			
			loadingDate() {
				// 下拉加载
				if (this.content !== '下拉加载更多') return;
				setTimeout(() => {
					this.content = '正在加载中.......';
				}, 1000);
			
				this.content = '没有更多数据';
			}
		}
	}
</script>

<style>

</style>
