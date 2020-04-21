<template>
	<view class="body">
		<input type="text" class="uni-input common-input" placeholder="请输入邮箱" v-model="email">
		<input type="text" password class="uni-input common-input" placeholder="请输入密码" v-model="password">
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
				hasEmail: false,
				isOk: true,
				email: '',
				password: ''
			}
		},
		onLoad(e) {
			this.hasEmail = !!(e.email && e.email!== "false");
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
			
			async submit() {
				const { email, password } = this
				if(!this._isEmail(email)) return uni.showToast({ title: '请输入正确的邮箱' });
				let [err,res] = await this.$http.post('/user/bindemail',{
					email:this.email
				},{
					token:true,
					checkToken:true
				});
				if (!this.$http.errorCheck(err,res)){
					return this.loading = this.disabled = false;
				}
				this.isbind = true;
				this.loading = this.disabled = false;
				// 修改状态，缓存
				this.User.userinfo.email = this.email;
				uni.setStorageSync("userinfo", this.user.userinfo);
				return uni.showToast({
					title: '绑定成功！',
					success: () => {
						uni.navigateBack({ delta: 1 });
					}
				});
			}
		}
	}
</script>

<style>
@import url("../../common/form.css");
</style>
