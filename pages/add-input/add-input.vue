<template>
	<view>
		<uniNavBar @click-left='back' @click-right='submit' :statusBar='true' rightText='发布' left-icon='back'>
			<view class="u-f-ajc" @click="changeLook">
				{{ getType }}
				<view class="icon iconfont icon-xialazhankai"></view>
			</view>
		</uniNavBar>
		<view class="textarea">
			<textarea v-model="textValue" placeholder="请输入发布内容......" />
		</view>
		<uploudImages @upload='changeImages'  @del='delImageList' :image-list="imageList" />
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
		<!-- 底部 -->
		<view class="u-f-ac addinput-foot">
			
			<picker class="u-f1 u-f-ajc" mode="selector" :range="postclass.range" @change="changePostClass">
				<view class="u-f1 u-f-ajc">
				{{postclass.title ? postclass.title : "选择分类"}}
				</view>
			</picker>
			
			<view class="u-f1 u-f-ajc" 
			hover-class="addinput-foot-btn"
			@tap="changeTopic">{{topic.title ? topic.title : "选择话题"}}</view>
		</view>
	</view>
</template>

<script>
	let changeArrs = ['所有人可看', '仅自己可看']
	import uploudImages from '../../components/common/uploud-images.vue'
	import uniNavBar from '../../components/uni-nav-bar/uni-nav-bar.vue'
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				context: 0,
				textValue: '',
				imageList: [],
				isShowAlert: true,
				isSave: false, // 是否保存过草稿
				imglistIds:[],
				postclass:{
					id:0,     // 当前选中分类id
					title:"", // 当前选中分类名称
					range:[], // 可选项
					list:[]   // 服务端获取到的分类列表
				},
				topic:{
					id:0,	  // 当前选中话题id
					title:""  // 当前选中话题名称
				}
			}
		},
		
		computed: {
			getType() {
				return changeArrs[this.context]
			}
		},
		
		onLoad(e) {
			// 读取缓存
			let res = uni.getStorageSync('addinput');
			if (res) {
				res = JSON.parse(res);
				this.context = res.context || 0;
				this.imglistIds = res.imglistIds || [];
				if (this.imglistIds.length) {
					this.imglist = res.imglist;
				}
				this.textValue = res.textValue || '';
				if (res.postclass) {
					this.postclass = res.postclass;
				}
				if (res.topic) {
					this.topic = res.topic;
				}
			}
			// 获取文章分类
			let postclass = e.postclass ? JSON.parse(e.postclass) : false;
			this.getPostClass(postclass);
			// 监听所属话题选择
			uni.$on('changeTopic',(data)=>{
				this.topic.id = data.id;
				this.topic.title = `#${data.title}#`;
			})
		},
		
		onBackPress() { // 监听页面返回，是否储存为草稿
			if(!this.textValue && this.imageList.length < 1) return
			if(!this.isSave) { // 给定个标识，不然跳转返回的时候会无限监听
				this.saveDraft()
				return true
			}
		},
		methods: {
			changeTopic(){
				uni.navigateTo({
					url:"/pages/topic-nav/topic-nav?ischange=" + true,
				});
			},
			
			async getPostClass(postclass){
				if (postclass) {
					this.postclass.list = postclass;
					let arr = [];
					for (let i = 0; i < postclass.length; i++) {
						arr.push(postclass[i].name)
					}
					return this.postclass.range = arr;
				}
				try{
					let [err,res] = await this.$http.get('/postclass');
					if (!this.$http.errorCheck(err,res)) return;
					let list = res.data.data.list;
					let arr = [] , arr2 = [];
					for (let i = 0; i < list.length; i++) {
						arr.push(list[i].classname);
						arr2.push({
							id:list[i].id,
							name:list[i].classname
						})
					}
					this.postclass.range = arr;
					this.postclass.list = arr2;
				}catch(e){
					return;
				}
			},
			
			saveDraft() {
				uni.showModal({
					content: '是否保存为草稿',
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if(res.confirm) {
							// 本地存储
							let obj = {
								yinsi:this.yinsi,
								text:this.text,
								imglist:this.imglist,
								imglistIds:this.imglistIds,
								postclass:this.postclass,
								topic:this.topic
							};
							uni.setStorageSync('addinput',JSON.stringify(obj))
						} else {
							uni.removeStorage({ key:"addinput" }) // 清除缓存
						}
						this.isSave = true
						this.back()
					},
				});
			},
			
			changePostClass(e){
				// 当前选中的id
				this.postclass.id = this.postclass.list[e.target.value].id;
				// 当前选中的名称
				this.postclass.title = this.postclass.list[e.target.value].name;
			},
			
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			
			async submit() {
				if (!this.postclass.id) {
					return uni.showToast({
						title: '请选择分类',icon:"none"
					});
				}
				uni.showLoading({ title: '发布中...', mask: true });
				try{
					let [err,res] = await this.$http.post('/post/create',{
						imglist:JSON.stringify(this.imglistIds),
						text:this.textValue,
						isopen:this.context,
						topic_id:this.topic.id,
						post_class_id:this.postclass.id
					},{
						token:true,
						checkToken:true,
						checkAuth:true
					});
					// 发布失败
					if (!this.$http.errorCheck(err,res)) {
						return uni.hideLoading();
					}
					// 发布成功
					uni.hideLoading();
					uni.showToast({
						title: '发布成功！'
					});
					this.isSave = true;
					uni.$emit('updateData',{ 
						type:"updateList",
						data:res.data.data.detail
					});
					this.back()
				}catch(e){
					return;
				}
			},
			
			changeLook() {
				uni.showActionSheet({
					itemList: changeArrs,
					success: res => {
						this.context = res.tapIndex
					}
				});
			},
			
			changeImages(item) { // 上传子组件穿回来的数据
				this.imageList.push(item.url)
				
				console.log(this.imageList)
				this.imglistIds.push({ id: item.id });
			},
			
			delImageList(index){
				this.imageList.splice(index, 1);
				this.imglistIds.splice(index, 1);
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
