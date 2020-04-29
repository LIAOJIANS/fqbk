<template>
	<view class="u-f" @click="openTopicDetail">
		<image :src="item.titlepic" mode="widthFix"></image>
		<view class="content-r">
			<view class="content-title">#{{ item.title }}#</view>
			<view class="content-title-text">{{ item.desc }}</view>
			<view>动态 {{ item.totalnum }} 今日 {{ item.todaynum }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number,
		ischange: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		openTopicDetail() {
			if (this.ischange) {
				// 通知并返回
				uni.$emit('changeTopic', {
					id: this.item.id,
					title: this.item.title
				});
				uni.navigateBack({ delta: 1 });
				return;
			}
			uni.navigateTo({
				url: '../../pages/topic-detail/topic-detail?detail=' + JSON.stringify(this.item)
			});
		}
	}
};
</script>

<style lang="scss" scoped>
image {
	width: 180upx;
	border-radius: 20upx;
}
.content-r {
	flex: 1;
	margin-left: 20upx;
	color: #a4a4a4;
}
.content-title {
	font-size: 36upx;
	color: black;
}
</style>
