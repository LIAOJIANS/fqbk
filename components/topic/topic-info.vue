<template>
	<view>
		<view class="detail-bg"><image :src="topicInfo.titlepic" mode="aspectFill" lazy-load></image></view>
		<view class="details-info">
			<view class="details u-f-ac">
				<image :src="topicInfo.titlepic" mode="aspectFill"></image>
				<view>{{ topicInfo.title }}</view>
			</view>
			<view class="dongtai u-f-ac">
				<view>动态 {{ topicInfo.totlanum }}</view>
				<view>今日 {{ topicInfo.todaynum }}</view>
			</view>
			<view class="topic-introduction">{{ topicInfo.desc }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		topicInfo: Object
	}
};
</script>

<style lang="scss" scoped>
.detail-bg {
	width: 100%;
	height: 300upx;
	position: relative;
	overflow: hidden;
	> image {
		width: 100%;
		position: absolute;
		filter: blur(10px);
	}
}
.details {
	position: relative;
	image {
		width: 150upx;
		height: 150upx;
		border-radius: 20upx;
		position: absolute;
		top: -75upx;
	}
	view {
		font-size: 36upx;
		margin-left: 180upx;
	}
}
.dongtai {
	padding: 25upx 0;
	color: #cdcdcd;
}
.topic-introduction {
	font-size: 32upx;
	color: #a3a3a3;
}
.details-info {
	padding: 0 25upx;
}
</style>
