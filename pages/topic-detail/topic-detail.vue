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
							<newList :item='itemList' :index='listIndex' @changeevent='updateData'></newList>
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
					{ name: "默认", id: "moren" },
					{ name: "最新", id: "zuixin" }
				],
				tabIndex: 0,
				topicInfo: {
					titlepic: '../../static/banner/item1.jpg',
					title: '#忆往事，敬余生#',
					desc: '面试官：在电梯里巧遇马云你会做什么？90后女孩的回答当场被踹死',
					totalnum: 1000,
					todaynum: 1000
				},
				topicList: [
					{
						context: '下拉加载更多',
						list: [],
						first: false,
						page: 1
					},
					{
						context: '下拉加载更多',
						list: [],
						first: false,
						page: 1
					}
				]
			}
		},
		
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000)
		},
		
		onLoad(e) {
			// 获取路由参数
			this._initData(JSON.parse(e.detail))
			// 开启监听
			uni.$once('updateData',this.updateData);
		},
		
		onReachBottom() {
			this.loadingDate()
		},
		
		methods: {
			_initData(obj) {
				console.log(obj)
				uni.setNavigationBarTitle({
					// 修改头部标题
					title: obj.title
				});
				this.topicInfo = obj
				this._getData()
			},
			
			updateData(resdata) {
				switch (resdata.type){
					case "guanzhu":
						this.guanzhu(resdata)
						break
				}
			},
			
			async _getData() {
				const [err, res] = await this.$http.get(`/topic/${ this.topicInfo.id }/post/${this.topicList[ this.tabIndex ].page}`, {}, {token:true})
				if(!this.$http.errorCheck(err, res)) return this.topicList[this.tabIndex].context = '下拉加载更多'
				let arr = []
				res.data.data.list.forEach(item => {
					arr.push(this._fomat(item))
				})
				this.topicList[this.tabIndex].list = this.topicList[this.tabIndex].page > 1 ? this.topicList[this.tabIndex].list.concat(arr) : arr
				this.topicList[this.tabIndex].first = true
				if(res.data.data.list.length < 10) {
					this.topicList[this.tabIndex].context = '没有更多数据了'
				} else {
					this.topicList[this.tabIndex].context = '下拉加载更多'
				}
				return
			},
			
			guanzhu(data) {
				this.topicList[this.tabIndex].list.forEach(item => {
					if (item.userid === data.userid) {
						item.isguanzhu = data.data;
					}
				})
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
						index: (item.support.length > 0) ? (item.support[0].type + 1) : 0,
						dingnum: item.ding_count,
						cainum: item.cai_count
					},
					goodnum: item.ding_count,
					commentnum: item.comment_count,
					sharenum: item.sharenum
				}
			},
			
			loadingDate() {
				if(this.topicList[this.tabIndex].context !== '下拉加载更多') return
				this.topicList[this.tabIndex].context="加载中...";
				this.topicList[this.tabIndex].page++
				this._getData()
			},
			
			tabtap(index) {
				this.tabIndex = index
				this._getData()
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
