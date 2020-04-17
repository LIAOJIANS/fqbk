<template>
	<view class="body">
		<input type="text" password class="uni-input common-input" placeholder="请输入旧密码" v-model="oldPassWord">
		<input type="text" password class="uni-input common-input" placeholder="请输入新密码" v-model="newPassWord">
		<input type="text" password class="uni-input common-input" placeholder="确认新密码" v-model="password">
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
				newPassWord: '',
				password: '',
				oldPassWord: '',
			}
		},
		watch: {
			newPassWord() {
				this.change()
			},
			password() {
				this.change()
			},
			oldPassWord() {
				this.change()
			}
		},
		methods: {
			change() {
				const { newPassWord, password, oldPassWord } = this
				if(newPassWord && password && oldPassWord) {
					this.isOk = false
				} else {
					this.isOk = true
				}
			},
			
			submit() {
				const { newPassWord, password, oldPassWord } = this
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
