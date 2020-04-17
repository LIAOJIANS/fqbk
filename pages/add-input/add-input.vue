<template>
	<view>
		<uniNavBar @click-left='back' @click-right='submit' :statusBar='true' rightText='发布' left-icon='back'>
			<view class="u-f-ajc" @click="changeLook">
				{{ context }}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uniNavBar>
		<view class="textarea">
			<textarea v-model="textValue" placeholder="请输入发布内容......" />
		</view>
		<uploudImages @upload='changeImages' />
		<uniPopup :show='isShowAlert' position='middle' mode='fixed' @hidePopup='hideAlert'>
			<view class="tongzhi">
				<view class="u-f-ajc">
					<image src="../../static/common/addinput.png" mode="widthFix"></image>
				</view>
				<view>1、涉及黄色，政治，广告及骚扰信息</view>
				<view>2、涉及黄色，政治，广告及骚扰信息</view>
				<view>3、涉及黄色，政治，广告及骚扰信息</view>
				<view>4、涉及黄色，政治，广告及骚扰信息</view>
				<button type="default" @click="hideAlert">朕知道了</button>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import uploudImages from '../../components/common/uploud-images.vue'
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				context: '所有人可看',
				textValue: '',
				imageList: [],
				isShowAlert: true,
				isSave: false, // 是否保存过草稿
			}
		},
		onBackPress() { // 监听页面返回，是否储存为草稿
			if(!this.textValue && this.imageList.length < 1) return
			if(!this.isSave) { // 给定个标识，不然跳转返回的时候会无限监听
				this.saveDraft()
				return true
			}
		},
		methods: {
			saveDraft() {
				uni.showModal({
					content: '是否保存为草稿',
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if(res.confirm) {
							console.log('保存')
						} else {
							console.log('不保存')
						}
						this.isSave = true
						this.back()
					},
				});
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			
			submit() {
				console.log('发布任务')
			},
			
			changeLook() {
				let changeArrs = ['所有人可看', '仅自己可看']
				uni.showActionSheet({
					itemList: changeArrs,
					success: res => {
						this.context = changeArrs[res.tapIndex]
					}
				});
			},
			
			changeImages(arr) { // 上传子组件穿回来的数据
				this.imageList = arr
			},
			
			hideAlert() {
				this.isShowAlert = false
			}
		},
		components: {
			uniNavBar,
			uploudImages,
			uniPopup
		}
	}
</script>

<style lang="scss">
	.textarea {
		padding: 20upx 10upx 0;
		border: 1px solid #eee;
	}
	.tongzhi {
		width: 500upx;
		image {
			width: 70%;
			margin-bottom: 30upx;
		}
		button {
			margin-top: 30upx;
			background-color: #ffe934;
			color: #171606;
		}
	}
</style>
