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
				<view>{{ sex }}</view>
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
				<view>{{ qg }}</view>
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
	let job = ['秘密', '前端工程师', '切图仔']
	import mpvueCityPicker from "../../components/mpvue-citypicker/mpvueCityPicker.vue"
	export default {
		data() {
			return {
				userpic: '../../static/shou.jpg',
				username: '彭昕杰的爸爸',
				sex: '男',
				qg: '已婚',
				job: "切图仔",
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
			
			changeImg() { // 更换头像
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					success: res => {
						this.userpic = res.tempFilePaths
					}
				})
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
						arr = job
						break
				}
				uni.showActionSheet({ // 选择的内置组件
					itemList: arr, 
					success: res => {
						switch(type) {
							case 'sex' :
								this.sex = arr[res.tapIndex]
								break
							case 'qg' :
								this.qg = arr[res.tapIndex]
								break
							case 'job' :
								this.jop = arr[res.tapIndex]
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
