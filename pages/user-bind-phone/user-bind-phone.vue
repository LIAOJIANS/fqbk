<template>
	<view class="body">
		<input type="number" v-model="phone"
		class="uni-input common-input"
		placeholder="输入手机号" :disabled="isbind"/>
		
		<view class="login-input-box" v-if="!isbind">
			<input type="text" v-model="yzm"
			class="uni-input common-input forget-input"
			placeholder="请输入验证码" />
			<view class="forget u-f-ajc login-font-color yanzhengma"
			@tap="countDown">
				<view class="u-f-ajc">{{ countVal }}</view>
			</view>
		</view>
		
		<button class="user-set-btn" 
		:loading="loading" :class="{ 'user-set-btn-disable' : disabled}" 
		type="primary" @tap="submit" :disabled="disabled || isbind">{{ isbind ? "已绑定" : "立即绑定"}}</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isbind:false,
				disabled:true,
				loading:false,
				phone:"",
				yzm: '',
				countVal: '获取验证码',
				codetime:0
			}
		},
		
		watch: {
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
		
		onLoad(e) {
			if (e.phone !== "false" && e.phone && e.phone !== 'null') {
				this.isbind = true;
				this.phone = e.phone;
			}
		},
		
		methods: {
			check() {
				const { phone, yzm } = this
				if(( phone && yzm )) this.disabled = false
			},
			
			async submit() {
				const [err, res] = await this.$http.post('/user/bindphone', {
					phone:this.phone,
					code:this.yzm
				}, {
					token:true,
					checkToken:true,
				})
				// 请求失败处理
				if (!this.$http.errorCheck(err,res)) return;
				
				this.isbind = true;
				this.disabled = false;
				uni.showToast({ title: '绑定成功！'});
				let data = res.data.data;
				if (typeof data === 'boolean') {
					this.user.userinfo.phone = this.phone;
				}else{
					this.user.userinfo = this.user.__formatUserinfo(data);
				}
				uni.setStorageSync("userinfo",this.user.userinfo);
			},
			
			async countDown() { //  倒计时发送验证码
				if(!this.phone || !/^1\d{10}$/.test(this.phone)) return uni.showToast({ title: '手机号为空，或者不正确', icon: 'none' })
				if(this.countVal !== '获取验证码') return uni.showToast({ title: '正在发送，请勿重复点击' })
				let [err, res] = await this.$http.post('/user/sendcode', { // 请求验证码
					phone: this.phone
				})
				if(res.data.errorCode !== 30005) return uni.showToast({ title: res.data.msg, icon: 'none' })
				uni.showToast({ title: res.data.msg })
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
				}, 1000)
			}
		}
	}
</script>

<style>
@import "../../common/form.css";
.login-input-box{
	position: relative;
}
.login-input-box .forget-input{
	padding-right: 150upx;
}
.login-input-box .forget{
	position: absolute;
	top: 0;
	height: 100%;
	z-index: 100;
}
.login-input-box .forget{
	width: 150upx;
	right: 0;
}
.login-input-box .phone{
	width:100upx;
	left: 0;
	font-weight: bold;
}
.login-input-box .phone-input{
	padding-left: 100upx;
}
.yanzhengma view{
	background: #EEEEEE;
	border-radius: 10upx;
	font-size: 25upx;
	width: 150upx;
	padding: 10upx 0;
}
</style>
