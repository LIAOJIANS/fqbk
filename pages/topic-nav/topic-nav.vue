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
						<view class="recent-updates">
							<block v-for="(item,index1) in items.lists" :key="index1">
								<view class="recent-updates-list">
									<topicList :item="item" :index="index1"/>
								</view>
							</block>
						</view>
						<loadMore :loadtext='items.context' />
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
				getHeight: `height: ${ 500 }px`, // 默认高度
				tabIndex: 0, // 默认显示第一个
				tabBars: [
					{ name: '关注', id: 'guanzhu' },
					{ name: '推荐', id: 'tuijian' },
					{ name: '体育', id: 'tiyu' },
					{ name: '热点', id: 'redian' },
					{ name: '财经', id: 'caijing' },
					{ name: '娱乐', id: 'yule' },
				],
				newslist: [
					{
						context: '下拉加载更多',
						lists:[
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							},
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							},
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							},
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							},
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							},{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							}
						]
					},
					{
						context: '下拉加载更多',
						lists:[]
					},
					{
						context: '下拉加载更多',
						lists:[]
					},
					{
						context: '下拉加载更多',
						lists:[
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							},
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							},
							{
								titlepic: '../../static/logo.png',
								title: '#淘宝记录铺#',
								desc: '120斤到85斤 我的反转人生',
								totalnum: 50,
								todaynum: 10
							}
						]
					},
					{
						context: '下拉加载更多',
						lists:[]
					},
					{
						context: '下拉加载更多',
						lists:[]
					}	 
				]
			}
		},
		
		created() {
			let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(100)
			this.getHeight = `height: ${ height }px`
		},
		
		methods: {
			tabtap(index) { 
				this.tabIndex = index
			},
			
			loadingDate(index) { // 下拉加载
				if(this.newslist[index].context !== '下拉加载更多') return
				setTimeout(() => {
					this.newslist[index].context = '正在加载中.......'
				}, 1000)
				
				this.newslist[index].context = '没有更多数据'
			},
			
			tabChange(e) { // 改变显示索引
				this.tabIndex = e.detail.current
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
