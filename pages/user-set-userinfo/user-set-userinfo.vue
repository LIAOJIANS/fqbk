<template>
	<view class="body">
		
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>头像</view>
			<view class="u-f-ac" @click="changeImg">
				<image :src="userpic" mode="aspectFill" lazy-load></image>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>昵称</view>
			<view class="u-f-ac">
				<input type="text" v-model="username" />
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>性别</view>
			<view class="u-f-ac" @click="changeOne('sex')">
				<view>{{ sexArr[sex] }}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>生日</view>
			<picker mode="date" :value="birthday" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="u-f-ac">
					<view>{{ birthday || '暂无' }}</view>
					<view class="icon iconfont icon-bianji1"></view>
				</view>
			</picker>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>情感</view>
			<view class="u-f-ac" @click="changeOne('qg')">
				<view>{{ qgArr[qg] }}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>职业</view>
			<view class="u-f-ac" @click="changeOne('job')">
				<view>{{ job }}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		<view class="user-set-userinfo-list u-f-ac u-f-jsb">
			<view>家乡</view>
			<view class="u-f-ac"  @click="showMulLinkageThreePicker">
				<view>{{ pickerText || '暂无' }}</view>
				<view class="icon iconfont icon-bianji1"></view>
			</view>
		</view>
		
		<button class="user-set-btn" type="primary" @tap="submit">完成</button>
		<mpvueCityPicker themeColor="#007AFF" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></mpvueCityPicker>
		
	</view>
</template>

<script>
	let sexArr = ['不限','男','女']
	let qgArr = ['秘密','未婚','已婚']
	let jobArr = ['秘密', '前端工程师', '切图仔']
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue"
	import Time from '../../common/time.js';
	export default {
		data() {
			return {
				sexArr:sexArr,
				qgArr:qgArr,
				userpic: '',
				username: '',
				sex: 0,
				qg: 0,
				job: "",
				birthday: "",
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '', // 三级联动选出的数据
			}
		},
		
		components: {
			mpvueCityPicker
		},
		
		onBackPress() {
		  if (this.$refs.mpvueCityPicker.showPicker) {
		  	this.$refs.mpvueCityPicker.pickerCancel();
		    return true;
		  }
		},
		
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		
		created() {
			this.userpic = this.user.userinfo.userpic;
			this.username = this.user.userinfo.username;
			this.sex = this.user.userinfo.userinfo.sex || 0;
			this.qg = this.user.userinfo.userinfo.qg || 0;
			this.job = this.user.userinfo.userinfo.job || "请填写";
			this.birthday = this.user.userinfo.userinfo.birthday || "请填写";
			this.pickerText = this.user.userinfo.userinfo.path || "请填写";
		},
		
		computed: {
			startDate() {
				return this.getDate('start');
			},
			
			endDate() {
				return this.getDate('end');
			}
		},
		
		methods: {
			showMulLinkageThreePicker() { // 三级联动
				this.$refs.mpvueCityPicker.show()
			},
			
			onConfirm(e) { // 联动后触发的事件
				this.pickerText = e.label;
			},
			
			async changeImg() { // 更换头像
			console.log(1)
				const [err, res] = await uni.chooseImage({
					count:1,
					sizeType:['compressed'],
				})
				if(!res) return
				uni.showToast({ title: '上传者', icon: 'loading' })
				let [err1, res1] = await this.$http.upload('/edituserpic',{
					name: 'userpic',
					filePath: res.tempFilePaths[0],
					token:true,
					checkToken:true
				});
				let data = JSON.parse(res1.data)
				if(err1 || data.checkCode) {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
					uni.hideLoading()
					return false
				}
				// 成功
				uni.hideLoading();
				uni.showToast({ title: '修改头像成功!' });
				this.userpic = data.data;
				// 修改状态，存储
				this.user.userinfo.userpic = this.userpic;
				uni.setStorageSync("userinfo",this.user.userinfo);
				
			},
			
			changeOne(type) { // 选择性别
				let arr = []
				switch(type) {
					case 'sex':
						arr = sexArr
						break
					case 'qg':
						arr = qgArr
						break
					case 'job':
						arr = jobArr
						break
				}
				uni.showActionSheet({ // 选择的内置组件
					itemList: arr, 
					success: res => {
						switch(type) {
							case 'sex' :
								this.sex = res.tapIndex
								break
							case 'qg' :
								this.qg = res.tapIndex
								break
							case 'job' :
								this.job = arr[res.tapIndex]
								break
						}
					}
				})
			},
			
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			
			async submit() {
				let data = {
					name: this.username,
					sex: this.sex === '男' ? 1 : 0,
					qg: this.qg,
					job: this.job,
					birthday: this.birthday,
					path: this.pickerText,
					age: Time.gettime.getAgeByBirthday(this.birthday),
				}
				let [err,res] = await this.$http.post('/edituserinfo', data, {
					token:true,
					checkToken:true
				})
				// 请求失败处理
				if (!this.$http.errorCheck(err,res)) return;
				// 成功
				uni.showToast({ title: '修改成功！' });
				// 修改状态，缓存
				this.user.userinfo.username = this.username;
				this.user.userinfo.userinfo = data;
				uni.setStorageSync('userinfo',this.user.userinfo);
				uni.navigateBack({
					data: 1
				})
			}
		}
	}
</script>

<style lang="scss">
@import "../../common/form.css";
.user-set-userinfo-list{
	padding: 20upx;
	border-bottom: 1upx solid #F4F4F4;
	view:first-child{
		font-size: 32upx;
		font-weight: bold;
		color: #9B9B9B;
	}
	view:last-child{
		image{
			width: 80upx;
			height: 80upx;
			border-radius: 100%;
		}
		input{
			text-align: right;
		}
		view:last-of-type{
			margin-left: 20upx;
			color: #9B9B9B;
		}
		view:first-child {
			color: #333;
			font-weight: normal;
			font-size: 30upx;
		}
	}
}
</style>
