<template>
	<view>
		<userSpaceHead :userinfo='userinfo' />
		<view class="user-space-data">
			<homeData :homedata='homedata' />
		</view>
		<swiperTabHead
		:tabBars="tabBars" 
		:tabIndex="tabIndex"
		@tabtap="tabtap"
		scrollStyle='border-bottom: none'
		scrollItemStyle='width: 33.33%'>
		</swiperTabHead>
		<view class="list animated fadeIn more-share">
			<template v-if="tabIndex === 0">
				<userspaceUserinfo :userinfo='userinfo' />
			</template>
			<template v-if="tabIndex === 1">
				<block v-for="(item, index) in qiushi.list" :key="index">
					<newList :item="item" :index="index"></newList>
				</block>
				<loadMore :loadtext="qiushi.context" />
			</template>
			<template v-if="tabIndex === 2">
				<block v-for="(item, index) in qiushi.list" :key="index">
					<newList :item="item" :index="index"></newList>
				</block>
				<loadMore :loadtext="qiushi.context" />
			</template>
		</view>
		<userSpacePopup :show='showMeuo' :isblack='false' @hide='hide' ></userSpacePopup>
	</view>
</template>

<script>
	import userSpaceHead from '../../components/user-space/user-space-head.vue'
	import swiperTabHead from '../../components/index/swiper-tab-head.vue'
	import homeData from '../../components/home/home-data.vue'
	import userspaceUserinfo from '../../components/user-space/user-space-userinfo.vue'
	import newList from '../../components/common/common-list.vue'
	import userSpacePopup from '../../components/user-space/user-space-popup.vue'
	import loadMore from '../../components/common/load-more.vue'
	
	export default {
		data() {
			return {
				tabIndex: 0,
				showMeuo: false,
				userinfo: {
					userpic: '../../static/shou.jpg',
					username: '我是你爸爸',
					isme: false,
					sex: 0,
					age: 18,
					bgimg: '2',
					isguanzhu: false,
					job: '切图仔',
					path: '北京伤害',
					qg: '已婚',
					birthday: '未知',
					regtime: '',
					id: 12138
					
				},
				homedata:[
					{ name:"获赞", num: '12K' },
					{ name:"关注", num: 24 },
					{ name:"粉丝", num: 100 }
				],
				tabBars: [
					{ name: '主页', id: 'dangqian' },
					{ name: '糗事', id: 'zuixin' },
					{ name: '动态', id: 'dongtai' }
				],
				qiushi: {
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
			}
		},
		
		components: {
			userSpaceHead,
			homeData,
			swiperTabHead,
			userspaceUserinfo,
			userSpacePopup,
			newList,
			loadMore
		},
		
		onReachBottom() {
			this.loadingDate()
		},
		
		onNavigationBarButtonTap(e) {
			console.log(e.index)
			if(e.index === 0) {
				this.showMeuo = true
			}
		},
		
		methods: {
			tabtap(index) {
				this.tabIndex = index
			},
			
			hide() { // 隐藏菜单栏
				this.showMeuo = false
			},
			
			loadingDate() {
				// 下拉加载
				if (this.guangzhu.context !== '下拉加载更多') return;
				setTimeout(() => {
					this.guangzhu.context = '正在加载中.......';
				}, 1000);
			
				this.guangzhu.context = '没有更多数据';
			}
		}
	}
</script>

<style lang="scss">
	.user-space-data {
		position: relative;
		top: -35upx;
		z-index: 10;
		background: #fff;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}
</style>
