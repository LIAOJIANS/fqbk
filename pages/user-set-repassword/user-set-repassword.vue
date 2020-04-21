<template>
	<view class="body">
		<input type="text" password class="uni-input common-input" placeholder="请输入旧密码" v-model="oldPassWord" />
		<input type="text" password class="uni-input common-input" placeholder="请输入新密码" v-model="newPassWord" />
		<input type="text" password class="uni-input common-input" placeholder="确认新密码" v-model="password" />
		<button type="primary" class="user-set-btn" :disabled="isOk" :class="[isOk ? 'user-set-btn-disable' : '']" @click="submit">完成</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			hasPassword: false,
			isOk: true,
			newPassWord: '',
			password: '',
			oldPassWord: '',
			loading:false
		}
	},
	onLoad(e) {
		this.hasPassword = !!(e.password && e.password !== "false");
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

		async submit() {
			const { newPassWord, password, oldPassWord } = this
			if(!this.check()) return;
			this.loading = this.disabled = true;
			let [err,res] = await this.$http.post('/repassword',{
				oldpassword: oldpassword || 0,
				newpassword: newpassword,
				renewpassword:  renewpassword,
			},{
				token:true,
				checkToken:true
			})
			if(!this.$http.errorCheck(err,res)){
				this.loading = this.disabled = false;
				return;
			}
			// 修改状态，缓存
			this.user.userinfo.password = true;
			uni.setStorageSync('userinfo',this.user.userinfo);
			this.loading = this.disabled = false;
			return uni.showToast({
				title: '修改密码成功！',
				success: () => {
					uni.navigateBack({ delta: 1 });
				}
			});
		}
	}
}
</script>

<style>
@import url('../../common/form.css');
</style>
