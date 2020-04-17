<template>
	<view class="common-list u-f">
		<view class="common-list-l"><image :src="item.userpic" mode="widthFix" lazy-load></image></view>
		<view class="common-list-r">
			<view class="user-info u-f-ac u-f-jsb">
				<view class="u-f-ac">{{ item.username }}
					<tagSex :sex='item.sex' :age='item.age'></tagSex>
				</view>
				<view class="icon iconfont icon-zengjia" v-show="item.isguanzhu">关注</view>
			</view>
			<view class="common-list-title">{{ item.title }}</view>
			<!-- 视频 -->
			<view class="common-list-content u-f-ajc">
				<image :src="item.titlepic" mode="widthFix" lazy-load v-show="item.titlepic"></image>
				<view class="common-list-play icon iconfont icon-bofang" v-show="item.video"></view>
				<view class="common-list-playInfo" v-show="item.video">{{ item.video.looknum }}次播放 {{ item.video.long }}</view>
			</view>
			<!-- 分享 -->
			<view class="common-list-share u-f-ac" v-show="item.share">
				<image :src="item.share.titlepic" mode="widthFix" lazy-load></image>
				<view>{{ item.share.title }}</view>
			</view>
			<view class="common-list-bottom u-f-ac u-f-jsb">
				<view>{{ item.path }}</view>
				<view class="u-f-ac">
					<view class="icon iconfont icon-zhuanfa u-f-ac">
						<view class="common-list-text">{{ item.sharenum }}</view>
					</view>
					<view class="icon iconfont icon-pinglun u-f-ac">
						<view class="common-list-text">{{ item.commentnum }}</view>
					</view>
					<view class="icon iconfont icon-dianzan u-f-ac">
						<view class="common-list-text">{{ item.goodnum }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import tagSex from './tag-sex-age.vue';
export default {
	props: {
		item: Object,
		index: Number
	},
	methods: {},
	components: {
		tagSex
	}
};
</script>

<style lang="scss" scoped>
.common-list {
	padding: 20upx;
	.common-list-l {
		flex-shrink: 0;
		margin-right: 10upx;
		image {
			width: 90upx;
			height: 90upx;
			border-radius: 45upx;
		}
	}
	.common-list-r {
		padding-top: 15upx;
		flex: 1;
	}
	.common-list-content {
		position: relative;
		image {
			width: 100%;
			border-radius: 10upx;
		}
		.common-list-play,
		.common-list-playInfo {
			position: absolute;
			color: #fff;
		}
		.common-list-play {
			font-size: 130upx;
		}
		.common-list-playInfo {
			padding: 0 20upx;
			right: 10upx;
			bottom: 10upx;
			background: rgba(51, 51, 51, 0.73);
			border-radius: 20upx;
			font-size: 26upx;
		}
	}
	.common-list-bottom {
		padding: 20upx 2upx 15upx;
		color: #bbbbbb;
		border-bottom: 1px solid #eeeeee;
		view:first-child {
			font-size: 28upx;
		}
		view:last-child {
			.iconfont {
				margin-left: 10upx;
				font-size: 28upx;
			}
		}
		.common-list-text {
			font-size: 22upx;
			padding-left: 5upx;
		}
	}
	.common-list-share {
		padding: 5upx;
		background: #f7f7f7;
		border-radius: 10upx;
		image {
			width: 200upx;
			height: 150upx;
			margin-right: 10upx;
			border-radius: 10upx;
		}
		view {
			color: #363636;
		}
	}
	.user-info {
		view:first-child {
			color: #999999;
			font-size: 28upx;
		}
		view:last-child {
			color: #4c4c4c;
			padding: 0 10upx;
			font-size: 26upx;
			background: #f4f4f4;
		}
	}
}
</style>
