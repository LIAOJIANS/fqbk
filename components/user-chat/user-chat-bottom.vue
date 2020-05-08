<template>
	<view class="user-chat-buttom u-f-ac animated fadeInDown fast">
		<input type="text" placeholder="请文明发言" :focus='focus' @blur="blur" v-model="text" />
		<view class="icon iconfont icon-fabu u-f-ajc" @click="submit"></view>
	</view>
</template>

<script>
	export default {
		props: {
			focus: {
				type:Boolean,
				default:false
			},
		},
		data() {
			return {
				text:""
			}
		},
		methods:{
			submit(){
				this.$emit('submit',this.text);
				this.text="";
			},
			blur(){
				this.$emit('blur');
			}
		}
	}
</script>

<style lang="scss">
	.user-chat-buttom {
		height: 120upx;
		padding: 0 20upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		border-top: 1px solid #EEEEEE;
		input {
			padding: 10upx 20upx;
			border-radius: 10upx;
			flex: 1;
			margin-right: 20upx;
			background: #F7F7F7;
		}
		view {
			width: 80upx;
			font-size: 50upx;
		}
	}
</style>
