<template>
	<view>
		<uniNavBar :statusBar='true' @click-right='openAdd'>
			<block slot="left">
				<view class="nav-left">
					<view class="icon iconfont icon-qiandao"></view>
				</view>
			</block>
			<view class="tab-nav-bar u-f-ajc">
				<block v-for="(bar, index) in tabBars" :key='index'>
					<view :class="{ 'active': tabIndex === index }" @click="changeTab(index)">
						{{ bar.name }}
						<view class="tab-nav-bar-line" v-show="tabIndex === index"></view>
					</view>
				</block>
			</view>
			<block slot='right'>
				<view class="nav-right u-f-ajc">
					<view class="icon iconfont icon-bianji"></view>
				</view>
			</block>	
		</uniNavBar>
	</view>
</template>

<script>
	import uniNavBar from "../../components/uni-nav-bar/uni-nav-bar.vue";
	export default {
		components:{
			uniNavBar
		},
		props:{
			tabBars:Array,
			tabIndex:Number
		},
		methods:{
			changeTab(index){
				this.$emit('change-tab', index);
			},
			openAdd(){
				// 打开发布页面
				uni.navigateTo({
					url: '../add-input/add-input',
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.nav-left, 
	.nav-right{
		view {
			font-size: 45upx;
		}
	}
	.nav-left {
		margin-left: 16upx;
		view {
			color: #ff9619;
		}
	}
	.nav-right {
		width: 100%;
	}
	.tab-nav-bar {
		width: 100%;
		margin-left: -20upx;
		view {
			font-size: 35upx;
			padding: 0 15upx;
			color: #969696;
			font-weight: bold;
			position: relative;
		}
		.active {
			color: black;
			.tab-nav-bar-line {
				position: absolute;
				height: 12upx;
				width: 42upx;
				bottom: 10upx;
				left: 50%;
				transform: translateX(-50%);
				background-color: #FEDE33;
				border-radius: 20px;
			}
		}
	}
</style>
