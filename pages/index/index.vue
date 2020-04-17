<template>
	<view class="content">
		<swiperTabHead
		:tabBars="tabBars" 
		:tabIndex="tabIndex"
		@tabtap="tabtap">
		</swiperTabHead>
		
		<swiper class="swiper-box"
		:style="getHeight"
		:current="tabIndex"
		@change="tabChange">
			<swiper-item v-for="(items,index) in newslist" :key="index"> 
				<scroll-view scroll-y class="list" @scrolltolower="loadingDate(index)" :style="getHeight">
					<template v-if="items.lists.length > 0">
						<!-- 图文列表 -->
						<block v-for="(item,index1) in items.lists" :key="index1">
							<indexList @changeevent="updateData" :item="item" :index="index1"/>
						</block>
						<loadMore :loadtext='items.context' />
					</template>
					<template v-else-if="!item.first">
						<view>Loading.... {{ item.first }}</view>
					</template>
					<template v-else>
						<noThing />
					</template>
				</scroll-view>
			</swiper-item>
		</swiper> 
	</view>
</template>

<script>
	import indexList from '../../components/index/index-list.vue'
	import swiperTabHead from '../../components/index/swiper-tab-head.vue'
	import loadMore from '../../components/common/load-more.vue'
	import noThing from '../../components/common/no-thing.vue'
	export default {
		data() {
			return {
				getHeight: `height: ${ 500 }px`, // 默认高度
				tabIndex: 0, // 默认显示第一个
				tabBars: [],
				newslist: []
			}
		},
		
		created() {
			let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(100)
			this.getHeight = `height: ${ height }px`
			this._getLoadData()
		},
		
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({ url: '../search/search' })
		},
		
		onNavigationBarButtonTap(e) { // 监听头部按钮点击事件
			if(e.index === 1) uni.navigateTo({ url: '../add-input/add-input' })
		},
		
		methods: {
			async _getLoadData() { // 请求数据
				const [err, res] = await this.$http.get('/postclass')
				let arr = []
				res.data.data.list.forEach(item => {
					this.tabBars.push({
						id: item.id,
						name: item.classname
					})
					arr.push({ // 分类对应的对象数组
						context: '下拉加载更多',
						lists: [],
						page: 1,
						first: false
					})
				})
				this.newslist = arr
				this._getIndexData()
			},
			
			async _getIndexData() {
				const [err, res] = await this.$http.get(`/postclass/${ this.tabBars[this.tabIndex].id }/post/${ this.newslist[this.tabIndex].page }`, {}, { token: true })
				if(!res) this.newslist[this.tabIndex].context = '加载中。。。。。'
				let arr = []
				res.data.data.list.forEach(item => {
					arr.push(this._fomat(item))
				})
				this.newslist[this.tabIndex].lists = this.newslist[this.tabIndex].page > 1 ? this.newslist[this.tabIndex].lists.concat(arr) : arr
				this.newslist[this.tabIndex].first = true
				if(res.data.data.list.length < 10) {
					this.newslist[this.tabIndex].context = '没有更多数据了'
				} else {
					this.newslist[this.tabIndex].context = '下拉加载更多'
				}
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
					shar: !!item.share,
					titlepic: item.titlepic,
					infonum: {
						index: (item.support.length > 0) ? (item.support[0].type + 1) : 0,
						dingnum: item.ding_count,
						cainum: item.cai_count
					},
					commentnum: item.comment_count,
					sharenum: item.sharenum
				}
			},
						
			tabtap(index) { 
				this.tabIndex = index
			},
			
			loadingDate(index) { // 下拉加载
				if(this.newslist[index].context !== '下拉加载更多') return
				this.newslist[this.tabIndex].page++
				this._getIndexData()
			},
			
			tabChange(e) { // 改变显示索引
				this.tabIndex = e.detail.current
				this._getIndexData()
			}
		},
		
		components: {
			indexList,
			swiperTabHead,
			loadMore,
			noThing
		}
		
	}
</script>

<style scoped>
</style>
