<template>
	<view class="user-space-head u-f-ajc">
		<image :src="getBgImg" mode="aspectFill" lazy-load @tap.stop="changBgImg"></image>
		<view class="user-space-head-info u-f-ajc u-f-column">
			<image :src="userinfo.userpic" mode="aspectFill" lazy-load></image>
			<view class="user-space-margin u-f-ac">
				{{userinfo.username}} 
				<tag-sex-age :sex="getSex" :age="getAge"></tag-sex-age> 
			</view>
			<view v-if="!userinfo.isme" class="icon iconfont user-space-head-btn user-space-margin" :class="getGuanZhuClass" @tap.stop="guanzhu">
				{{userinfo.isguanzhu ? '已关注' : '关注'}}
			</view>
		</view>
	</view>
</template>

<script>
	import tagSexAge from "../common/tag-sex-age.vue"
	export default {
		components:{
			tagSexAge
		},
		
		props:{
			userinfo: Object
		},
		
		data() {
			return {
				bgimg: this.userinfo.bgimg
			}
		},
		
		computed:{
			getSex(){
				return this.userinfo.sex;
			},
			getAge(){
				return this.userinfo.age;
			},
			getBgImg(){
				return "../../static/banner/item" + this.bgimg + ".jpg";
			},
			getGuanZhuClass(){
				return this.userinfo.isguanzhu ? 'active':'icon-zengjia';
			}
		},
		
		methods:{
			changBgImg(){ // 切换背景
				let index = parseInt(this.userinfo.bgimg)
				this.bgimg = this.userinfo.bgimg = index < 5 ? ++index : 1
			},
			
			guanzhu(){ // 关注
				console.log('关注')
			}
		}
	}
</script>

<style scoped>
.user-space-head{
	position: relative;
	height: 500upx;
	overflow: hidden;
}
.user-space-head>image{
	width: 100%;
}
.user-space-head-info{
	position: absolute;
	top: 150upx;
}
.user-space-head-info>image{
	width: 150upx;
	height: 150upx;
	border-radius: 100%;
}
.user-space-head-info>view:first-of-type{
	color: #FFFFFF;
	font-size: 35upx;
	font-weight: bold;
	text-shadow: 2upx 2upx 10upx #333333;
}
.user-space-head-btn{
	background: #FFE933;
	color: #333333;
	border: 1upx solid #FFE933;
	padding: 0 15upx;
	border-radius: 10upx;
	font-size: 28upx;
}
.active{
	background:none;
	color: #FFFFFF;
	border: 1upx solid #FFFFFF;
}
.user-space-margin {
	margin-top: 10upx;
}
</style>
