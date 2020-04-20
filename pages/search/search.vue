<template>
	<view>
		<template v-if="list.length > 0">
			<block v-for="(item, index) in list" :key='index'>
				<template v-if="searchType === 'post'">
					<indexList :item='item' :index='index' />
				</template>
				<template v-if="searchType === 'topic'">
					<view style="padding: 0 20px;">
						<topicList :item='item' :index='index' />
					</view>
				</template>
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
	import topicList from '../../components/news/topic-list.vue'
	export default {
		data() {
			return {
				isData: false, // 默认用户没点过搜索
				content: '下拉加载更多',
				list: [],
				page: 1, // 默认加载第一页
				serchVal: '', // 搜索框内容
				searchType: 'post', // 搜索类型
			}
		},
		
		components: {
			loadMore,
			noThing,
			indexList,
			topicList
		},
		
		onLoad(e) {
			if(!e) return
			this.searchType = e.searchType || 'post'
			// #ifdef APP-PLUS
			if(this.searchType === 'topic') {
				let currentWebView = this.$mp.page.$getAppWebview()
				let tn = currentWebView.getStyle().titleNView
				tn.searchInput.placeholder = '搜索话题'
				currentWebView.setStyle({
					titleNView: tn
				})
			}
			// #endif
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
			async _loadData(val) {
				uni.showLoading({ title: 'Loading...' });
				// 判断请求类型
				let url = this.searchType === 'topic' ? '/search/topic' : '/search/post'
				const [err, res] = await this.$http.post(url, {
					keyword: val,
					page: this.page
				})
				let error = this.$http.errorCheck(err,res,()=>{
					uni.hideLoading()
					this.isData = true
				},()=>{
					uni.hideLoading()
					this.isData = true
				});
				if(!error) return
				let arr = []
				res.data.data.list.forEach(item => {
					arr.push(this._fomat(item))
				})
				this.list = this.page > 1 ? this.list.concat(arr) : arr
				this.isData = true
				if(res.data.data.list.length < 10) {
					this.content = '没有更多数据了'
				} else {
					this.contentt = '下拉加载更多'
				}
				uni.hideLoading()
			},
			
			_fomat(item) {
				switch(this.searchType) {
					case 'post' :
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
								index: (item.support.length > 0) ? (item.support[0].type + 1) : 0,
								dingnum: item.ding_count,
								cainum: item.cai_count
							},
							commentnum: item.comment_count,
							sharenum: item.sharenum
						}
					case 'topic' :
						return {
							id: item.id,
							titlepic: item.titlepic,
							title: item.title,
							desc: item.desc,
							totalnum: item.totalnum,
							todaynum: itme.todaynum
						}
				}
			},
			
			loadingDate() {
				if(this.contentt !== '下拉加载更多') return
				this. contentt = "加载中...";
				this.page++
				this._loadData(this.serchVal)
			}
		}
	}
</script>

<style>

</style>
