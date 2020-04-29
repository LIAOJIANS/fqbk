<template>
	<view>
		<!-- 自定义列表 -->
		<newNav :tabBars="tabBars" :tabIndex="tabIndex" @change-tab="selectionType"></newNav>

		<!-- 话题 -->
		<swiper class="swiper-box" :style="getHeight" :current="tabIndex" @change="tabChange">
			<swiper-item>
				<scroll-view scroll-y class="list" :style="getHeight" @scrolltolower="loadingDate()">
					<template v-if="guangzhu.list.length > 0">
						<block v-for="(item, index) in guangzhu.list" :key="index"><newList :item="item" :index="index"></newList></block>
						<loadMore :loadtext="guangzhu.loadtext" />
					</template>
					<template v-else-if="!guangzhu.firstload">
						<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
						padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
					</template>
					<template v-else>
						<!-- 无内容默认 -->
						<no-thing></no-thing>
					</template>
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
import noThing from "../../components/common/no-thing.vue";

export default {
	data() {
		return {
			tabIndex: 0, // 默认是显示关注
			getHeight: `height: ${500}px`, // 默认高度
			tabBars: [{ id: 1, name: '关注' }, { id: 2, name: '话题' }],
			guangzhu: {
				firstload:false,
				loadtext:"上拉加载更多",
				page:1,
				list:[]
			},
			topic: {
				swipers: [],
				nav: [],
				list: []
			}
		};
	},
	
	onShow() {
		this.getFollowPostList();
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
			// 开启监听
			uni.$on('updateData',this.updateData);
		},
		
		updateData(data){
			switch (data.type){
				case "support":
				this.updateSupport(data);
					break;
				case 'updateComment':
				this.updateComment(data);
					break;
			}
		},
		
		// 更新评论数
		updateComment(data){
			// 拿到当前对象
			let obj = this.guangzhu.list.find(value =>{
				return value.id === data.post_id;
			});
			if (!obj) return;
			obj.commentnum++; // 评论数+1
		},
		
		updateSupport(data){
			let obj = this.guangzhu.list.find((item)=>{
				return item.id === data.post_id;
			})
			if(!obj || obj.infonum.index === 1) return;
			if (data.do == 'ding') {
				obj.infonum.index = 1;
				obj.goodnum++;
			}
		},
		
		// 获取动态列表
		async getFollowPostList(){
			let url = `/followpost/${this.guangzhu.page}`;
			let [err,res] = await this.$http.get(url,{},{
				token:true
			});
			if (!this.$http.errorCheck(err,res)) {
				this.guangzhu.firstload = true;
				return this.guangzhu.loadtext="上拉加载更多";
			}
			let arr = [];
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push(this.__format(list[i]));
			}
			this.guangzhu.list = this.guangzhu.page > 1 
								? this.guangzhu.list.concat(arr) : arr;
			this.guangzhu.firstload = true;
			this.guangzhu.loadtext=list.length < 10 ? "没有更多数据了" : "上拉加载更多";
			return;
		},
		
		__format(item){
			let obj = {
				userid:item.user.id,
				userpic:item.user.userpic,
				username:item.user.username,
				isguanzhu:!!item.user.fens.length,
				id:item.id,
				title:item.title,
				type:"img", // img:图文,video:视频
				titlepic:item.titlepic,
				video:false,
				path:item.path,
				share:!!item.share,
				infonum:{
					index:(item.support.length>0) ? (item.support[0].type+1) : 0,//0:没有操作，1:顶,2:踩；
					dingnum:item.ding_count,
					cainum:item.cai_count,
				},
				sex:item.user.userinfo.sex,
				age:item.user.userinfo.age,
				goodnum:item.ding_count,
				commentnum:item.comment_count,
				sharenum:item.sharenum,
			};
			if (item.user_id === this.user.userinfo.id) {
				obj.isguanzhu = true;
			}
			return obj;
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
					todaynum: item.todaypost_count,
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
			if(this.guangzhu.loadtext!="上拉加载更多") return;
			// 修改状态
			this.guangzhu.loadtext="加载中...";
			this.guangzhu.page++;
			this.getFollowPostList();
		}
	},
	components: {
		newList,
		loadMore,
		newNav,
		topicNav,
		topicList,
		noThing
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
