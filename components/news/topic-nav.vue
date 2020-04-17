<template>
	<view class="popular-classification">
		<view class="popular-classification-more u-f-ac u-f-jsb">
			<view class="host">热门分类</view>
			<view class="u-f-ac" @click="openTopicNav">
				更多
				<view class="icon iconfont icon-gengduo"></view>
			</view>
		</view>
		<view class="popular-classification-list u-f">
			<view v-for="(item, index) in nav" :key='index'>{{ item.name }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		nav: Array
	},
	methods: {
		openTopicNav() {
			uni.navigateTo({
				url: '../../pages/topic-nav/topic-nav'
			});
		}
	}
};
</script>

<style lang="scss">
.popular-classification {
	padding: 25upx 15upx;
	.popular-classification-more {
		font-size: 28upx;
		view:last-child {
			color: #d6d6d6;
		}
		.host {
			font-size: 32upx;
			color: #383838;
		}
	}
	.popular-classification-list {
		margin-top: 30upx;
		view {
			flex: 1;
			margin: 0 10upx;
			background: #f7f7f7;
			color: #9e9e9e;
			white-space: nowrap;
			border-radius: 10upx;
			text-align: center;
		}
	}
}
</style>
