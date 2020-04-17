<template>
	<view class="animated fadeIn more-share">
		<template v-if="!isLogin">
			<view class="u-f-ajc">登录防糗百，体验更多功能</view>
			<!-- 第三方登录 -->
			<otherLogin :noback="true"></otherLogin>
			<!-- 账号密码登陆 -->
			<view class="u-f-ajc" @tap="openLogin">账号密码登陆 <view class="icon iconfont icon-jinru"></view> </view>
		</template>
		<template v-else>
			<homeInfo :homeinfo='homeinfo'></homeInfo>
		</template>
		<homeData :homedata="homedata"></homeData>
		<!-- 广告位 -->
		<view class="home-adv u-f-ajc animated fadeIn fast" >
			<image src="https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/Appstatic/qsbk/demo/demo20.jpg" mode="widthFix" lazy-load></image>
		</view>
		<!-- 功能列表 -->
		<view class="home-list">
			<block v-for="(item,index) in list" :key="index">
				<homeListItem :item="item" :index="index"></homeListItem>
			</block>
		</view>
	</view>
</template>

<script>
	import otherLogin from '../../components/home/other-login.vue'
	import homeInfo from '../../components/home/home-info.vue'
	import homeData from '../../components/home/home-data.vue'
	import homeListItem from "../../components/home/home-list-item.vue";
	export default {
		data() {
			return {
				isLogin: false,
				homeinfo:{
					userpic:"../../static/shou.jpg",
					username:"昵称",
					totalnum:0,
					todaynum:0,
				},
				homedata:[
					{ name:"糗事", num:0 },
					{ name:"动态", num:0 },
					{ name:"评论", num:0 },
					{ name:"粉丝", num:0 },
				],
				list: [
					{ icon:"liulan",name:"浏览历史",clicktype:"navigateTo",url:"/pages/user-history/user-history"},
					{ icon:"huiyuanvip",name:"糗百认证",clicktype:"nothing",url:"" },
					{ icon:"keyboard",name:"审核糗事",clicktype:"nothing",url:"" },
				]
			}
		},
		onLoad() {
			this.getData()
		},
		components: {
			otherLogin,
			homeInfo,
			homeData,
			homeListItem
		},
		onNavigationBarButtonTap(e) {
			if(e.index === 0) {
				uni.navigateTo({
					url: '../user-set/user-set'
				})
			}
		},
		methods: {
			// isLogin() {
				
			// },
			
			async getData() {
				const [res] = await this.$http.get('/post/1')
				console.log(res)
			},
			
			openLogin() {
				uni.navigateTo({
					url: '../login/login'
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
