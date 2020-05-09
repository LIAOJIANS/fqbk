<template>
	<view class="uni-tab-bar">
		<swiperTabHead
		:tabBars="tabBars" 
		:tabIndex="tabIndex"
		@tabtap="tabtap">
		</swiperTabHead>
		
		<swiper class="swiper-box"
		:style="getHeight"
		:current="tabIndex"
		@change="tabChange">
			<swiper-item v-for="(items,index) in newslist" :key="index" :style="getHeight"> 
				<scroll-view scroll-y class="list" @scrolltolower="loadingDate(index)" :style="getHeight">
					<template v-if="items.lists.length > 0">
						<!-- 图文列表 -->
						<view class="recent-updates">
							<block v-for="(item,index1) in items.lists" :key="index1">
								<view class="recent-updates-list">
									<topicList :item="item" :ischange="ischange" :index="index1"/>
								</view>
							</block>
						</view>
						<loadMore :loadtext='items.context' />
					</template>
					<template v-else-if="!items.first">
						<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
						padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
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
	import swiperTabHead from '../../components/index/swiper-tab-head.vue'
	import loadMore from '../../components/common/load-more.vue'
	import noThing from '../../components/common/no-thing.vue'
	import topicList from '../../components/news/topic-list.vue';
	export default {
		data() {
			return {
				ischange:false,
				tabIndex: 0, // 默认显示第一个
				tabBars: [],
				newslist: []
			}
		},
		
		onLoad(e) {
			this._getLoadData()
			if (e.ischange) {
				this.ischange = true;
				// 修改页面标题
				uni.setNavigationBarTitle({
					title:"选择所属话题"
				})
			}
		},
		
		computed: {
			getHeight() {
				let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(100) - 44;
				// #ifdef MP-ALIPAY
				return `height: ${height}px;`;
				// #endif
				return `height: ${ height + 44 }px;`;
			}
		},
		
		
		methods: {
			async _getLoadData() { // 请求数据
				const [err, res] = await this.$http.get('/topicclass')
				let arr = []
				res.data.data.list.forEach(item => {
					this.tabBars.push({
						id: item.id,
						name: item.classname
					})
					arr.push({ // 分类对应的对象数
						context: '下拉加载更多',
						lists: [],
						page: 1,
						first: false
					})
				})
				this.newslist = arr
				this.tabBars.length > 0 && this._getIndexData()
			},
			
			async _getIndexData() {
				const [err, res] = await this.$http.get(`/topicclass/${ this.tabBars[this.tabIndex].id }/topic/${ this.newslist[this.tabIndex].page }`)
				let error = this.$http.errorCheck(err,res,()=>{
					this.newslist[currentIndex].loadtext="上拉加载更多";
				},()=>{
					this.newslist[currentIndex].loadtext="上拉加载更多";
				});
				if (!error) return;
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
				return
			},
			
			_fomat(item) {
				return {
					id: item.id,
					title: item.title,
					titlepic: item.titlepic,
					desc: item.desc,
					totalnum: item.post_count,
					todaynum: item.todaypost_count
				}
			},
			
			tabtap(index) { 
				this.tabIndex = index
			},
			
			loadingDate(index) { // 下拉加载
				if(this.newslist[index].context !== '下拉加载更多') return
				this.newslist[index].context="加载中...";
				this.newslist[this.tabIndex].page++
				this._getIndexData()
			},
			
			tabChange(e) { // 改变显示索引
				this.tabIndex = e.detail.current
				this._getIndexData()
			}
		},
		
		components: {
			swiperTabHead,
			loadMore,
			noThing,
			topicList
		}
		
	}
</script>

<style scoped>
	.recent-updates {
		padding: 25upx 20upx;
	}
	.recent-updates-list {
		margin-top: 15upx;
		padding-bottom: 15upx;
		border-bottom: 1px solid #eee;
	}
</style>
