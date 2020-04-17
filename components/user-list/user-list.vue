<template>
	<view class="user-list u-f-ac animated fadeIn fast">
		<image :src="item.userpic" mode="widthFix"></image>
		<view class="user-list-content">
			<view class="username">{{ item.username }}</view>
			<tagSex :sex="item.sex" :age="item.age"></tagSex>
		</view>
		<view class="icon iconfont u-f-ajc" v-show="!hidden"
		:class="[item.isguanzhu ? 'icon-xuanze-yixuan' : 'icon-zengjia1']"></view>
	</view>
</template>

<script>
	import tagSex from "../../components/common/tag-sex-age.vue";
	export default {
		components:{
			tagSex
		},
		props:{
			hidden:{
				type:Boolean,
				default:false
			},
			item:Object,
			index:Number
		},
		methods: {
			openSpace(){
				uni.navigateTo({
					url:"../../pages/user-space/user-space?userid="+this.item.id
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
.user-list {
	padding: 20upx 0;
	border-bottom: 1px solid #eeeeee;
	image {
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		margin-right: 20upx;
		flex-shrink: 0;
	}
	.username {
		margin-top: 30upx;
	}
	.user-list-content {
		font-size: 36upx;
		flex: 1;
	}
	.icon-xuanze-yixuan {
		width: 80upx;
		color: #ccc;
	}
	.icon-zengjia1 {
		width: 80upx;
		color: #f8791b;
	}
}
</style>
