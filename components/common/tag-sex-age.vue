<template>
	<view class="tag-sex icon iconfont" :class="getSexClass">
		{{ getAge }}
	</view> 
</template>

<script>
	export default {
		props:{
			sex:Number,
			age:Number
		},
		computed: {
			getAge() {
				return this.age ? this.age : "未知";
			},
			getSexClass(){
				return this.sex==0?'icon-nan':'icon-nv';
			}
		},
	}
</script>

<style scoped>
.tag-sex{
	display: inline-block;
	padding: 2upx 10upx;
	margin-left: 10upx;
	border-radius: 20upx;
	font-size: 21upx!important;
	background-color: #007aff!important;
	color: #fff!important;
	line-height: 25upx!important;
}
.icon-nv{
	background: #FF698D!important;
}
</style>
