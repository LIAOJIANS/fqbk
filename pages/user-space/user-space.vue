<template>
	<view>
		<userSpaceHead :userinfo="userinfo" />
		<view class="user-space-data"><homeData :homedata="homedata" /></view>
		<swiperTabHead :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap" scrollStyle="border-bottom: none" scrollItemStyle="width: 33.33%"></swiperTabHead>
		<block v-for="(item, index) in tablist" :key="index">
			<template v-if="tabIndex === 0 && tabIndex === index">
				<!-- 主页 -->
				<userspaceUserinfo :userinfo="userinfo"></userspaceUserinfo>
			</template>
			<template v-else-if="tabIndex == index">
				<template v-if="item.list.length > 0">
					<!-- 列表 -->
					<block v-for="(list, listindex) in item.list" :key="listindex"><newList nonavigate :item="list" :index="listindex"></newList></block>
					<!-- 上拉加载 -->
					<load-more :loadtext="item.loadtext"></load-more>
				</template>
				<template v-else-if="!item.firstload">
					<view
						style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
					padding-top: 100upx;"
						class="u-f-ajc"
					>
						Loading ...
					</view>
				</template>
				<template v-else>
					<!-- 无内容默认 -->
					<view
						style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
					padding-top: 100upx;"
						class="u-f-ajc"
					>
						No content~
					</view>
				</template>
			</template>
		</block>
		<userSpacePopup :show="showMeuo" :isblack="false" @hide="hide"></userSpacePopup>
	</view>
</template>

<script>
import userSpaceHead from '../../components/user-space/user-space-head.vue';
import swiperTabHead from '../../components/index/swiper-tab-head.vue';
import homeData from '../../components/home/home-data.vue';
import userspaceUserinfo from '../../components/user-space/user-space-userinfo.vue';
import newList from '../../components/common/common-list.vue';
import userSpacePopup from '../../components/user-space/user-space-popup.vue';
import loadMore from '../../components/common/load-more.vue';
import Time from '../../common/time.js';
import noThing from '../../components/common/no-thing.vue';

export default {
	data() {
		return {
			tabIndex: 0,
			showMeuo: false,
			userinfo: {
				userpic: '',
				username: '',
				isme: false,
				sex: 0,
				age: 0,
				bgimg: '1',
				isguanzhu: false,
				job: '',
				path: '',
				qg: '',
				birthday: '',
				regtime: '',
				id: 0
			},
			homedata: [{ name: '获赞', num: 0 }, { name: '关注', num: 0 }, { name: '粉丝', num: 0 }],
			tabBars: [{ name: '主页', id: 'dangqian' }, { name: '糗事', id: 'zuixin' }, { name: '动态', id: 'dongtai' }],
			qiushi: {},
			tablist: [
				{},
				{
					context: '下拉加载更多',
					list: [],
					page: 1,
					firstload: false
				},
				{
					context: '下拉加载更多',
					list: [],
					page: 1,
					firstload: false
				}
			]
		};
	},

	components: {
		userSpaceHead,
		homeData,
		swiperTabHead,
		userspaceUserinfo,
		userSpacePopup,
		newList,
		loadMore,
		noThing
	},

	onReachBottom() {
		this.loadingDate();
	},

	onNavigationBarButtonTap(e) {
		console.log(e.index);
		if (e.index === 0) {
			this.showMeuo = true;
		}
	},

	onLoad(e) {
		this._loadDate(e.userid);
	},

	methods: {
		_loadDate(userid) {
			this._getUserInfo(userid);
			this.getCounts(userid)
		},

		async _getUserInfo(userid) {
			let sexArr = ['不限', '男', '女'];
			let qgArr = ['秘密', '未婚', '已婚'];
			let isme, info, isguanzhu, isblack;
			if (userid == this.user.userinfo.id) {
				info = this.user.userinfo;
				isme = true;
				isguanzhu = false;
				isblack = false;
			} else {
				const [err, res] = this.$http.post(
					'/getuserinfo',
					{
						user_id: userid
					},
					{ token: true }
				);
				// 错误处理
				if (!this.$http.errorCheck(err, res)) return;
				info = res.data.data;
				isme = false;
				isguanzhu = !!res.data.data.fens.length;
				isblack = !!res.data.data.blacklist.length;
			}
			let timer = info.create_time ? Time.gettime.dateFormat(new Date(info.create_time * 1000), '{Y}-{MM}-{DD}') : '未知';
			this.userinfo = {
				isme: isme,
				bgimg: '1',
				userpic: info.userpic,
				username: info.username,
				sex: sexArr[info.userinfo.sex] || '不限',
				age: info.userinfo.age,
				isguanzhu: isguanzhu,
				isblack: isblack,
				regtime: timer,
				id: info.id,
				birthday: info.userinfo.birthday || '未知',
				job: info.userinfo.job || '未知',
				path: info.userinfo.path || '未知',
				qg: qgArr[info.userinfo.qg] || '秘密'
			};
		},

		tabtap(index) {
			this.tabIndex = index;
			this._getData();
		},

		async _getData() {
			if (!this.tablist[this.tabIndex].page) return;
			let page = this.tablist[this.tabIndex].page;
			let url = this.userinfo.isme ? `/user/post/${page}` : `/user/${this.userinfo.id}/post/${page}`;
			let index = this.tabIndex;
			let [err, res] = await this.$http.get(url, {}, { token: true });
			if (!this.$http.errorCheck(err, res)) {
				this.tablist[index].firstload = true;
				return (this.tablist[index].context = '上拉加载更多');
			}
			let arr = [];
			let list = res.data.data.list;
			for (let i = 0; i < list.length; i++) {
				arr.push(this._fomat(list[i]));
			}
			this.tablist[index].list = page > 1 ? this.tablist[index].list.concat(arr) : arr;
			this.tablist[index].firstload = true;
			this.tablist[index].context = list.length < 10 ? '没有更多数据了' : '上拉加载更多';
			return;
		},

		_fomat(item) {
			let obj = {
				userid: item.user.id,
				userpic: item.user.userpic,
				username: item.user.username,
				isguanzhu: !!item.user.fens.length,
				id: item.id,
				title: item.title,
				type: 'img', // img:图文,video:视频
				titlepic: item.titlepic,
				video: false,
				path: item.path,
				share: !!item.share,
				infonum: {
					index: item.support.length > 0 ? item.support[0].type + 1 : 0, //0:没有操作，1:顶,2:踩；
					dingnum: item.ding_count,
					cainum: item.cai_count
				},
				goodnum: item.ding_count,
				commentnum: item.comment_count,
				sharenum: item.sharenum,
				sex: item.user.userinfo.sex,
				age: item.user.userinfo.age
			};
			if (item.user_id === this.User.userinfo.id) {
				obj.isguanzhu = true;
			}
			return obj;
		},

		hide() {
			// 隐藏菜单栏
			this.showMeuo = false;
		},

		loadingDate() {
			if (this.tablist[this.tabIndex].context != '上拉加载更多') return;
			// 修改状态
			this.tablist[this.tabIndex].context = '加载中...';
			this.tablist[this.tabIndex].page++;
			this._getData();
		},
		
		async getCounts(userid) {
			let counts
			if(userid === this.user.userinfo.id) {
				counts = this.user.counts
			} else {
				let [err,res] = await this.$http.get('/user/getcounts/' + this.user.userinfo.id);
				if (!this.$http.errorCheck(err,res)) return;
				counts = res.data.data;
			}
			if (counts) {
				this.homedata[0].num = counts.post_count;
				this.homedata[1].num = counts.withfollow_count;
				this.homedata[2].num = counts.withfen_count;
			}
		}
	}
};
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
