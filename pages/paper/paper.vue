<template>
	<view class="paper-content">
		<!-- 右上角显示 -->
		<paperPopup :show="isShowMenu" @hide="hidAlert" @addfriend="addFirend" @clear="clear"></paperPopup>
		<!-- 小纸条列表 -->
		<template v-if=" list.length > 0 ">
			<block v-for="(item, index) in list" :key="index"><paperList :item="item" :index="index" /></block>
		</template>
		<template v-else-if="!firstload">
			<view style="font-size: 50upx;font-weight: bold;color: #CCCCCC;
			padding-top: 100upx;" class="u-f-ajc">Loading ...</view>
		</template>
		<template v-else>
			<!-- 无内容默认 -->
			<no-thing />
		</template>
	</view>
</template>

<script>
import badGe from '../../components/uni-badge/uni-badge.vue';
import paperList from '../../components/paper/paper-list.vue';
import paperPopup from '../../components/paper/paper-left-popup.vue';
import Time from '../../common/time.js';
import noThing from '../../components/common/no-thing.vue';
export default {
	data() {
		return {
			firstload:false,
			isShowMenu: false, // 是否显示菜单
			list: []
		};
	},
	onNavigationBarButtonTap(e) {
		if (e.index === 1) {
			this.isShowMenu = true;
		} else {
			uni.navigateTo({
				url: '../user-list/user-list'
			});
		}
	},

	onShow() {
		this.getdata();
	},

	onPullDownRefresh() {
		// 下拉
		this.getdata();
	},
	
	onLoad() {
		// 开启监听
		uni.$on('UserChat',(data)=>{
			// 置顶更新
			let index = this.list.findIndex((val)=>{
				return val.userid === data.from_id;
			});
			// 会话存在
			if (index!==-1) {
				this.list[index].data = data.data;
				this.list[index].time = Time.gettime.gettime(data.time);
				this.list[index].noreadnum++;
				// 置顶
				this.list = this.$chat.__toFirst(this.list,index)
				return;
			}
			// 追加
			let obj = this.$chat.__format(data,{ type:"chatlist" });
			// 格式化时间
			obj.time = Time.gettime.gettime(obj.time);
			obj.noreadnum = 1;
			this.list.unshift(obj);
		})
	},

	methods: {
		getdata() {
			try {
				let userid = this.user.userinfo.id;
				if (!userid) {
					this.firstload = true;
					return uni.stopPullDownRefresh();
				}
				this.list = [];
				let list = uni.getStorageSync('chatlist' + this.user.userinfo.id);
				list = list ? JSON.parse(list) : [];
				for (var i = 0; i < list.length; i++) {
					list[i].time = Time.gettime.gettime(list[i].time);
				}
				this.list = list;
				this.firstload = true;
			} catch (e) {
				return uni.stopPullDownRefresh();
			}
			uni.stopPullDownRefresh();
		},

		addFirend() {
			// 添加朋友
			this.hidAlert();
		},

		clear() {
			// 清除缓存
			this.hidAlert();
		},

		hidAlert() {
			this.isShowMenu = false;
		}
	},
	components: {
		badGe,
		paperList,
		paperPopup,
		noThing
	}
};
</script>

<style lang="scss" scoped>
.paper-content {
	padding: 0 20upx;
	position: relative;
}
</style>
