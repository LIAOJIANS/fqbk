<template>
	<view>
		<uniStatusBar bgcolor='#ffe933'/>
		<image class="headImg" src="../../static/common/loginhead.png" mode="widthFix"></image>
		<view class="icon iconfont icon-guanbi" @click="back"></view>
		<view class="body">
			<template v-if="isPassWord">
				<view class="border">
					<input type="text" v-model="username" placeholder="手机号/昵称/邮箱" />
				</view>
				<view class="border u-f-ac">
					<input type="text" password v-model="password" placeholder="请输入密码"/>
					<view class="forget-pwd">忘记密码？</view>
				</view>
			</template>
			<template v-else>
				<view class="border u-f-ac">
					<view class="phone-top">+86</view>
					<input type="text" v-model="phone" maxlength="11" placeholder="手机号" />
				</view>
				<view class="border u-f-ac">
					<input type="text" v-model="yzm" maxlength="6" placeholder="请输入验证码"/>
					<view class="yzm" @click="countDown">{{ countVal }}</view>
				</view>
			</template>
			<button type="primary" class="user-set-btn" :disabled='isOk' :class="[ isOk ? 'user-set-btn-disable' : '']">登录</button>
			<view class="login-type u-f-ajc" @click="loginType">
				{{ isPassWord ? '验证码登录' : '账号密码登录' }}
				<view class="icon iconfont icon-jinru"></view>
			</view>
		</view>
		<!-- 第三方登陆 -->
		<view class="other-login-title u-f-ajc login-padding login-font-color">第三方登录</view>
		<otherLogin :noback="false"></otherLogin>
		
		<!-- 协议 -->
		<view class="login-rule u-f-ajc login-padding login-font-color">
			注册即代表您同意<view>《XXX协议》</view>
		</view>
	</view>
</template>

<script>
	import uniStatusBar from '../../components/uni-status-bar/uni-status-bar.vue'
	import otherLogin from "../../components/home/other-login.vue";
	export default {
		data() {
			return {
				isPassWord: false,
				username: '',
				password: '',
				phone: '',
				isOk: true,
				yzm: '',
				countVal: '获取验证码',
			}
		},
		
		watch: {
			username() {
				this.check()
			},
			
			password() {	
				this.check()
			},
			
			phone() {
				this.check()
			},
			
			yzm() {
				this.check()
			}
		},
		
		created() {
			uni.getStorage({
				key: 'count-val',
				success: res => {
					const data = JSON.parse(res.data)
					if(data.countVal !== '获取验证码' && data) { 
						// 如果当前的时间小于页面死亡时间，那就证明该用户在当前一分钟倒计时内回来，否则，重新计算倒计时
						if ( Math.floor((new Date().getTime() - data.time) / 1000) < data.countVal) this.down(data.countVal)
					}
				}
			})
		},
		
		beforeDestroy() { // 页面死亡前
			const data = JSON.stringify({
				countVal: this.countVal,
				time: new Date().getTime()
			})
			uni.setStorage({
				key: 'count-val',
				data: data,
			})
		},
		
		components: {
			uniStatusBar,
			otherLogin
		},
		
		methods: {
			check() {
				const { username, password, phone, yzm } = this
				if(( username && password  ) || ( phone && yzm )) this.isOk = false
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			
			loginType() {
				this.isPassWord = !this.isPassWord
				this.initData()
			},
			
			initData() {
				this.username = '',
				this.password = '',
				this.phone = '',
				this.isOk = true,
				this.yzm = ''
			},
			
			countDown() { //  倒计时发送验证码
				if(!this.phone || !/^1\d{10}$/.test(this.phone)) return uni.showToast({ title: '手机号为空，或者不正确', icon: 'none' })
				if(this.countVal !== '获取验证码') return uni.showToast({ title: '正在发送，请勿重复点击' })
				let timer = 60
				this.down(timer)
			},
			
			down(timer) {
				const timeId = setInterval(() => {
					this.countVal = timer--
					if(timer <= 0) {
						this.countVal = '获取验证码'
						clearInterval(timeId)
					}
				}, 100)
			}
		}
	}
</script>

<style lang="scss">
	@import url("../../common/form.css");
	.headImg {
		width: 100%;
	}
	.icon-guanbi {
		position: fixed;
		top: 60upx;
		left: 30upx;
		font-style: 40upx;
		font-weight: bold;
		color: #333;
	}
	.border {
		padding: 20upx 10upx;
		border-bottom: 1px solid #f4f4f4;
		input {
			width: 100%;
			line-height: 50upx;
			flex: 1;
			font-size: 32upx;
			font-weight: bold;
			color: #969696;
		}
		.forget-pwd {
			font-size: 30upx;
		}
		.phone-top {
			margin-right: 15upx;
			font-size: 32upx;
			font-weight: bold;
			color: #333333;
		}
		.yzm {
			width: 180upx;
			line-height: 70upx;
			text-align: center;
			background: #f4f4f4;
			color: #939393;
			font-size: 28upx;
			border-radius: 10upx;
		}
	}
	.login-type {
		margin: 30upx 0;
		text-align: center;
		font-size: 30upx;
		view {
			color: #d5d5d5;
		}
	}
	.other-login-title{
		position: relative;
	}
	.other-login-title:before,.other-login-title:after{
		content: "";
		position: absolute;
		background: #BBBBBB;
		height: 1upx;
		width: 100upx;
		top: 50%;
	}
	.other-login-title:before{
		left: 25%;
	}
	.other-login-title:after{
		right: 25%;
	}
	.login-font-color{ 
		color: #BBBBBB;
	}
	.login-padding{ 
		padding: 20upx 0;
	}
</style>
