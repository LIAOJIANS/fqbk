<template>
	<view class="body">
		<input type="text" class="uni-input common-input" placeholder="请输入邮箱" v-model="email">
		<input type="text" password class="uni-input common-input" placeholder="请输入密码" v-model="passWord">
		<button 
		type="primary" 
		class="user-set-btn" 
		:disabled="isOk" 
		:class="[ isOk ? 'user-set-btn-disable' : '']"
		@click="submit"
		>完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isOk: true,
				email: '',
				password: ''
			}
		},
		watch: {
			email() {
				this.change()
			},
			password() {
				this.change()
			}
		},
		methods: {
			change() {
				const { email, password } = this
				if(email && password) {
					this.isOk = false
				} else {
					this.isOk = true
				}
			},
			
			 _isEmail(email) {
			    return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(email)
			},
			
			submit() {
				const { email, password } = this
				
				if(!this._isEmail(email)) return uni.showToast({ title: '请输入正确的邮箱' });
				uni.showLoading({
					title: '正在提交',
					mask: false
				});
				setTimeout(() => {
					uni.hideLoading()
					uni.showToast({
						title: '提交成功',
						icon: 'success'
					});
				}, 1000)
			}
		}
	}
</script>

<style>
@import url("../../common/form.css");
</style>
