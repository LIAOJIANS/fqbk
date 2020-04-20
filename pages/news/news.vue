<template>
	<view>
		<!-- 自定义列表 -->
		<newNav :tabBars="tabBars" :tabIndex="tabIndex" @change-tab="selectionType"></newNav>

		<!-- 话题 -->
		<swiper class="swiper-box" :style="getHeight" :current="tabIndex" @change="tabChange">
			<swiper-item>
				<scroll-view scroll-y class="list" :style="getHeight" @scrolltolower="loadingDate()">
					<block v-for="(item, index) in guangzhu.list" :key="index"><newList :item="item" :index="index"></newList></block>
					<loadMore :loadtext="guangzhu.context" />
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="list" :style="getHeight">
					<view class="search-input">
						<!-- 搜索框 -->
						<input class="uni-input" placeholder-class="icon iconfont icon-sousuo topic-search" placeholder="搜索话题" disabled @click="goSearch" />
						<!-- 轮播图 -->
						<swiper class="topic-swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
							<block v-for="(item, index) in topic.swipers" :key='index'>
								<swiper-item>
									<image :src="item.src" mode="widthFix" lazy-load></image>
								</swiper-item>
							</block>
						</swiper>
					</view>
					
					<view class="nav-border">
						<!-- 热门分类 -->
						<topicNav :nav='topic.nav'></topicNav>
					</view>
					
					<!-- 最近更新 -->
					<view class="recent-updates">
						<view class="recent-title">最近更新</view>
						<view class="recent-updates-list u-f" v-for="(item, index) in topic.list" :key="index">
							<topicList :item='item' :index='index'></topicList>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import newNav from '../../components/news/news-nav-bar.vue';
import topicNav from '../../components/news/topic-nav.vue';
import topicList from '../../components/news/topic-list.vue';
import newList from '../../components/common/common-list.vue';
import loadMore from '../../components/common/load-more.vue';

export default {
	data() {
		return {
			tabIndex: 0, // 默认是显示关注
			getHeight: `height: ${500}px`, // 默认高度
			tabBars: [{ id: 1, name: '关注' }, { id: 2, name: '话题' }],
			guangzhu: {
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
			topic: {
				swipers: [],
				nav: [],
				list: []
			}
		};
	},

	created() {
		let height = uni.getSystemInfoSync().windowHeight - uni.upx2px(100) - 25;
		this.getHeight = `height: ${height}px`;
		this._loadData()
	},

	methods: {
		_loadData() {
			this._getAdvertising()
			this._getHotClass()
			this._getHotH()
		},
		
		async _getAdvertising() {
			const [err, res] = await this.$http.get('/adsense/0')
			res.data.data.list.forEach(item => {
				this.topic.swipers.push({
					src: item.src,
					url: item.url
				})
			})
		},
		
		async _getHotClass() {
			const [err, res] = await this.$http.get('/topicclass')
			res.data.data.list.forEach(item => {
				this.topic.nav.push({
					id: item.id,
					name: item.classname
				})
			})
		},
		
		async _getHotH() {
			const [err, res] = await this.$http.get('/hottopic')
			res.data.data.list.forEach(item => {
				this.topic.list.push({
					id: item.id,
					title: item.title,
					titlepic: item.titlepic,
					desc: item.desc,
					totalnum: item.post_count,
					todaynum: item.todaypost_count
				})
			})
		},
		
		goSearch() { // 跳转搜索页
			uni.navigateTo({ url: '../search/search?searchType=topic' })
		},
		
		openAdd() {
			uni.navigateTo({ url: '../add-input/add-input' });
		},

		tabChange(e) {
			this.tabIndex = e.detail.current;
		},

		selectionType(val) {
			this.tabIndex = val;
			// 拉去数据
		},

		loadingDate() {
			// 下拉加载
			if (this.guangzhu.context !== '下拉加载更多') return;
			setTimeout(() => {
				this.guangzhu.context = '正在加载中.......';
			}, 1000);

			this.guangzhu.context = '没有更多数据';
		}
	},
	components: {
		newList,
		loadMore,
		newNav,
		topicNav,
		topicList
	}
};
</script>

<style lang="scss">
	.search-input {
		padding: 20upx 20upx 0;
		border-bottom: 1px solid #eeeeee;
		input {
			background: #F4F4F4;
			border-radius: 10upx;
		}
		.topic-search {
			text-align: center;
			font-size: 27upx;
		}
		.topic-swiper {
			padding: 20upx 0;
			image {
				width: 100%;
				border-radius: 10upx;
			}
		}
	}
	.nav-border {
		border-bottom: 1px solid #eee;
	}
	.recent-updates {
		padding: 25upx 20upx;
		.recent-title {
			font-size: 32upx;
		}
	}
	.recent-updates-list {
		margin-top: 15upx;
		padding-bottom: 15upx;
		border-bottom: 1px solid #eee;
	}
</style>
