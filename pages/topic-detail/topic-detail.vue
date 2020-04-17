<template>
	<view>
		<!-- 话题详情 -->
		<topicInfo :topicInfo='topicInfo' />
		<!-- 评论 -->
		<view>
			<swiperTabHead
			:tabBars="tabBars" 
			:tabIndex="tabIndex"
			@tabtap="tabtap"
			scrollStyle='border-bottom: none'
			scrollItemStyle='width: 50%'>
			</swiperTabHead>
			<view class="list">
				<block v-for="(item, index) in topicList" :key='index'>
					<template v-if="tabIndex === index">
						<block v-for="(itemList, listIndex) in item.list" :key='listIndex'>
							<newList :item='itemList' :index='listIndex'></newList>
						</block>
						<loadMore :loadtext='item.context' />
					</template>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	import topicInfo from '../../components/topic/topic-info.vue'
	import swiperTabHead from '../../components/index/swiper-tab-head.vue'
	import loadMore from '../../components/common/load-more.vue'
	import newList from '../../components/common/common-list.vue'
	export default {
		data() {
			return {
				tabBars: [
					{ name: '默认', id: 'dangqian' },
					{ name: '最新', id: 'zuixin' },
				],
				tabIndex: 0,
				topicInfo: {
					titlepic: '../../static/banner/item1.jpg',
					title: '#忆往事，敬余生#',
					desc: '面试官：在电梯里巧遇马云你会做什么？90后女孩的回答当场被踹死',
					totlanum: 1000,
					todaynum: 1000
				},
				topicList: [
					{
						context: '下拉加载更多',
						list: [
							{
								// 文字
								userpic: '../../static/common/loginhead.png',
								username: 'shanJ',
								sex: 1, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题我是标题我是标题我是标题我是标题我是标题',
								titlepic: false,
								video: false,
								share: false,
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							},
							{
								// 图文
								userpic: '../../static/shou.jpg',
								username: 'shanJ',
								sex: 0, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题',
								titlepic: '../../static/shou.jpg',
								video: false,
								share: false,
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							},
							{
								// 视频
								userpic: '../../static/shou.jpg',
								username: 'shanJ',
								sex: 0, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题',
								titlepic: '../../static/shou.jpg',
								video: {
									looknum: '20W',
									long: '2: 47'
								},
								share: false,
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							},
							{
								// 分享
								userpic: '../../static/shou.jpg',
								username: 'shanJ',
								sex: 0, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题',
								titlepic: '',
								video: false,
								share: {
									title: '我是标题',
									titlepic: '../../static/shou.jpg'
								},
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							}
						]
					},
					{
						context: '下拉加载更多',
						list: [
							{
								// 图文
								userpic: '../../static/shou.jpg',
								username: 'shanJ',
								sex: 0, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题',
								titlepic: '../../static/shou.jpg',
								video: false,
								share: false,
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							},
							{
								// 文字
								userpic: '../../static/common/loginhead.png',
								username: 'shanJ',
								sex: 1, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题我是标题我是标题我是标题我是标题我是标题',
								titlepic: false,
								video: false,
								share: false,
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							},
							{
								// 视频
								userpic: '../../static/shou.jpg',
								username: 'shanJ',
								sex: 0, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题',
								titlepic: '../../static/shou.jpg',
								video: {
									looknum: '20W',
									long: '2: 47'
								},
								share: false,
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							},
							{
								// 分享
								userpic: '../../static/shou.jpg',
								username: 'shanJ',
								sex: 0, // 0男 1女
								age: 25,
								isguanzhu: false,
								title: '我是标题',
								titlepic: '',
								video: false,
								share: {
									title: '我是标题',
									titlepic: '../../static/shou.jpg'
								},
								path: '广州 仓头',
								sharenum: 20,
								commentnum: 30,
								goodnum: 40
							}
						]
					}
				]
			}
		},
		
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000)
		},
		
		onReachBottom() {
			this.loadingDate()
		},
		
		methods: {
			loadingDate() {
				// 下拉加载
				if (this.topicList[this.tabIndex].context !== '下拉加载更多') return;
				setTimeout(() => {
					this.topicList[this.tabIndex].context = '正在加载中.......';
				}, 1000);
			
				this.topicList[this.tabIndex].context = '没有更多数据';
			},
			
			tabtap(index) {
				this.tabIndex = index
			},
		},
		components: {
			topicInfo,
			swiperTabHead,
			loadMore,
			newList
		}
	}
</script>

<style lang="scss" scoped>
</style>
