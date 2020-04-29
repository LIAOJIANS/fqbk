<template>
	<view>
		<detailInfo :item="obj" @changeevent="updateData" />
		<view class="comment-list">
			<view>最新评论 {{ comment.count }}</view>
			<block v-for="(item, index) in comment.list" :key="index"><commentList :item="item" :index="index" @reply="reply" /></block>
		</view>
		<view style="height: 120upx;"></view>
		<userChatBottom @submit="submit" />
		<moreShare :show="shareshow" :sharedata="sharedata" @togle="togle" />
	</view>
</template>

<script>
import detailInfo from '../../components/detail/detail-info.vue';
import commentList from '../../components/detail/comment-list.vue';
import moreShare from '../../components/common/more-share.vue';
import userChatBottom from '../../components/user-chat/user-chat-bottom.vue';
import time from '../../common/time.js';
export default {
	data() {
		return {
			reply_id: 0, // 回复id
			sharedata: {
				title: '',
				url: '',
				titlepic: '',
				shareType: 0
			},
			shareshow: false,
			obj: {
				// 详情对象
				userpic: '',
				username: '',
				sex: 0, //0 男 1 女
				age: 0,
				content: '',
				isguanzhu: false,
				title: '',
				titlepic: '',
				morepic: [],
				video: false,
				share: false,
				path: '',
				sharenum: 0,
				commentnum: 0,
				goodnum: 0,
				creat_time: 0
			},
			isguanzhu: false,
			id: null,
			comment: {
				count: 0,
				list: []
			}
		};
	},

	components: {
		detailInfo,
		commentList,
		userChatBottom,
		moreShare
	},

	onLoad(e) {
		// 获取路由参数
		this.id = JSON.parse(e.detailData).id;
		this._initData(JSON.parse(e.detailData));
	},

	created() {},

	onNavigationBarButtonTap(e) {
		if (e.index === 0) {
			this.isShow();
		}
	},

	methods: {
		_initData(obj) {
			uni.setNavigationBarTitle({
				// 修改头部标题
				title: obj.title
			});
			// 加载中
			uni.showLoading({ title: 'Loading...',mask:true });
			this.isguanzhu = obj.isguanzhu;
			this._getData(this.id);
			this._getComment();
			this.__initShare(obj);
			obj.morepic = [];
			obj.content = '';
			obj.goodnum = obj.infonum.dingnum;
			this.obj = obj;
			this.comment.count = obj.commentnum;
		},

		__initShare(obj) {
			this.sharedata = {
				title: obj.title,
				content: obj.title,
				url: 'http://www.liaojs.cn:3000/public/myBlog/#/home',
				titlepic: obj.titlepic ? obj.titlepic : 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/app/share-logo@3.png',
				shareType: 0
			};
		},

		updateData(data) {
			switch (data.type) {
				case 'support':
					this._support(data);
					break;
				case 'guanzhu':
					this._guanzhu(data);
					break;
			}
		},

		_guanzhu(data) {
			this.obj.isguanzhu = data.data;
		},

		_support(data) {
			if (data.do == 'ding') {
				this.obj.infonum.index = 1;
				this.obj.goodnum++;
			}
		},

		async _getData(id) {
			const [err, res] = await this.$http.get(`/post/${id}`);
			let error = this.$http.errorCheck(err,res,()=>{
				uni.hideLoading();
			},()=>{
				uni.hideLoading();
			});
			if (!error) return;
			let data = res.data.data.detail;
			this.obj.content = data.content;
			let images = [];
			data.images.forEach(items => {
				// 赋值images
				images.push(items.url);
			});
			this.obj.morepic = images;
			this.obj.age = data.user.userinfo.age;
			this.obj.sex = data.user.userinfo.sex;
			this.obj.creat_time = data.creat_time;
			return uni.hideLoading();
		},
		
		async _getComment() {
			let [err, res] = await this.$http.get(`/post/${this.id}/comment`);
			let list = res.data.data.list;
			this.comment.list = this.comment.list.concat(this._ArrSort(list));
		},

		_ArrSort(arr, id = 0) {
			let temp = [],
				lev = 0;
			let forFn = function(arr, id, lev) {
				// 递归调用查找子类
				arr.forEach(item => {
					if (item.fid === id) {
						item.lev = lev;
						temp.push({
							id: item.id,
							fid: item.fid,
							userid: item.user.id,
							userpic: item.user.userpic,
							username: item.user.username,
							time: time.gettime.gettime(item.create_time),
							data: item.data
						});
						forFn(arr, item.id, lev + 1);
					}
				});
			};
			forFn(arr, id, lev);
			return temp;
		},

		togle() {
			// 取消
			this.shareshow = false;
		},

		isShow() {
			this.shareshow = true;
		},

		async submit(data) {
			uni.showLoading({ title: '评论中...', mask: false });
			let reply_id = this.reply_id;
			let [err, res] = await this.$http.post(
				'/post/comment',
				{
					post_id: this.obj.id,
					fid: reply_id,
					data: data
				},
				{
					token: true
				}
			);
			// 错误处理
			if (err || res.data.errorCode) {
				let msg = res.data.errorCode ? res.data.msg : '发送失败，请检查网络~';
				uni.hideLoading();
				return uni.showToast({
					title: msg,
					icon: 'none'
				});
			}
			// 发送成功
			uni.hideLoading();
			uni.showToast({ title: '发送成功~' });
			let result = {
				id: res.data.data.id,
				fid: reply_id,
				userpic: this.user.userinfo.userpic,
				username: this.user.userinfo.username,
				time: time.gettime.gettime(new Date().getTime()),
				data: data
			};
			// 评论数+1
			this.comment.count++;
			this.obj.commentnum++;
			// 通知首页更新评论数，通知会员中心更新评论数
			uni.$emit('updateData', {
				type: 'updateComment',
				post_id: this.obj.id
			});
			// 一级评论
			if (reply_id === 0) {
				return this.comment.list.push(result);
			}
			// 二级评论
			// 找出被评论id的索引
			let index = this.comment.list.findIndex(val => {
				return val.id === reply_id;
			});
			if (index > -1) {
				// 中间插入
				this.comment.list.splice(index + 1, 0, result);
			}
		},

		reply(id) {
			console.log(111);
		}
	}
};
</script>

<style lang="scss">
.comment-list {
	padding: 20upx;
	> view {
		font-size: 28upx;
		font-weight: bold;
	}
}
</style>
