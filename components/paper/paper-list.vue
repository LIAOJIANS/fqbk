<template>
	<view class="paper-list u-f-ac animated fadeIn fast" @tap="opendetail">
		<image :src="item.userpic" mode="widthFix" lazy-load></image>
		<view class="username">
			<view class="u-f-ac u-f-jsb">
				{{ item.username }}
				<view>{{ item.time }}</view>
			</view>
			<view class="u-f-ac u-f-jsb">
				{{ item.data }}
				<badGe type="error" :text="item.noreadnum"></badGe>
			</view>
		</view>
	</view>
</template>

<script>
import badGe from '../../components/uni-badge/uni-badge.vue';
export default {
	components: {
		badGe
	},
	props: {
		item: Object,
		index: Number
	},
	computed: {
		getItemNoreadnum() {
			return this.item.noreadnum;
		}
	},
	methods: {
		opendetail() {
			uni.navigateTo({
				url: '../../pages/user-chat/user-chat'
			});
			
			// let obj = {
			// 	userid: this.item.userid,
			// 	username: this.item.username,
			// 	userpic: this.item.userpic
			// };
			// this.User.navigate({
			// 	url: '../../pages/user-chat/user-chat?userinfo=' + JSON.stringify(obj)
			// });
			// // 更新未读数的状态
			// this.$chat.Read(this.item);
		}
	}
};
</script>

<style lang="scss" scoped>
.paper-list {
	border-bottom: 1px solid #eeeeee;
	padding: 20upx 0;
	image {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		margin-right: 20upx;
		flex-shrink: 0;
	}
	.username {
		flex: 1;
		view:first-child {
			font-size: 35upx;
			view {
				font-size: 28upx;
				color: #cbcbcb;
			}
		}
		view:last-child {
			color: #999999;
		}
	}
}
</style>
