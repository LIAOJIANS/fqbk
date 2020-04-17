<template>
	<view>
		<view class="paper-letf-popup-mask" v-show="show" @click="hidAlert"></view>
		<view class="paper-letf-popup" v-show="show">
			<view class="u-f-ac" hover-class="paper-letf-popup-c" @click="addFirend">
				<view class="icon iconfont icon-sousuo"></view>
				加好友
			</view>
			<view class="u-f-ac" hover-class="paper-letf-popup-c" @click="clear">
				<view class="icon iconfont icon-qingchu"></view>
				清除缓存
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		show: Boolean
	},
	methods: {
		hidAlert() {
			this.$emit('hide');
		},
		addFirend() {
			this.$emit('addfriend');
		},
		clear() {
			this.$emit('clear');
		}
	}
};
</script>

<style lang="scss" scoped>
.paper-letf-popup-mask {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
}
.paper-letf-popup {
	width: 55%;
	position: absolute;
	top: 10upx;
	right: 0;
	background: #ffffff;
	z-index: 2000;
	box-shadow: 1upx 1upx 20upx 2upx #ccc;
	view {
		padding: 15upx;
		font-size: 35upx;
		view {
			margin-right: 10upx;
			font-weight: bold;
		}
	}
	.paper-letf-popup-c {
		background: #eee;
	}
}
</style>
