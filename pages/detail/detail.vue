<template>
	<view>
		<detailInfo :item="obj" />
		<view class="comment-list">
			<view>最新评论 {{ comment.count }}</view>
			<block v-for="(item, index) in comment.list" :key='index'>
				<commentList :item='item' :index='index' @reply='reply' />
			</block>
		</view>
		<view style="height: 120upx;"></view>
		<userChatBottom @submit='submit' />
		<moreShare :show='shareshow' :sharedata='sharedata' @togle='togle' />
	</view>
	
</template>

<script>
import detailInfo from '../../components/detail/detail-info.vue';
import commentList from '../../components/detail/comment-list.vue';
import moreShare from '../../components/common/more-share.vue'
import userChatBottom from '../../components/user-chat/user-chat-bottom.vue'
import time from '../../common/time.js'
export default {
	data() {
		return {
			sharedata: {
				title: '',
				url: '',
				titlepic: '',
				shareType: 0
			},
			shareshow: false,
			obj: {}, // 详情对象
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
		this.id = JSON.parse(e.detailData).id
		this._initData(JSON.parse(e.detailData))
	},
	
	created() {
	
	},

	onNavigationBarButtonTap(e) { 
		if (e.index === 0) {
			this.isShow()
		}
	},

	methods: {
		_initData(obj) {
			uni.setNavigationBarTitle({
				// 修改头部标题
				title: obj.title
			});
			this._getData(this.id)
			this._getComment()
		},
		
		async _getData(id) {
			const [err, res] = await this.$http.get(`/post/${ id }`)
			this.$http.errorCheck(err, res)
			this.obj = this._hlandData(res.data.data.detail)
		},
		
		_hlandData(item) {
			let images = []
			item.images.forEach(items => { // 赋值images
				images.push(items.url)
			})
			return {
				id: item.id,
				userid: item.user_id,
				userpic: item.user.userpic,
				username: item.user.username,
				content: item.content,
				create_time: time.gettime.gettime(item.create_time),
				sex: item.user.userinfo.sex,
				age: item.user.userinfo.age,
				isguanzhu: false,
				title: item.title,
				titlepic: item.titlepic,
				morepic: images,
				video: false,
				share: false,
				path: item.path,
				sharenum: item.sharenum,
				commentnum: item.commentnum,
				goodnum: item.commentnum
			}
		},
		
		async _getComment() {
			let [err, res] = await this.$http.get(`/post/${ this.id  }/comment`)
			let list = res.data.data.list
			this.comment.list = this.comment.list.concat(this._ArrSort(list))
		},
		
		_ArrSort(arr, id = 0) {
			let temp = [], lev = 0
			let forFn = function (arr, id, lev) { // 递归调用查找子类
				arr.forEach(item => {
					if(item.fid === id) {
						item.lev = lev
						temp.push({
							id: item.id,
							fid: item.fid,
							userid: item.user.id,
							userpic: item.user.userpic,
							username: item.user.username,
							time: time.gettime.gettime(item.create_time),
							data: item.data
						})
						forFn(arr, item.id, lev+1)
					}
				})
			}
			forFn(arr, id, lev)
			return temp
		},
		
		togle() { // 取消
			this.shareshow = false
		},
		
		isShow() {
			this.shareshow = true
		},
		
		submit(data) {
			this.comment.list.push(
				{
					fid: 0,
					userpic: 'https://s1.hdslb.com/bfs/static/jinkela/space/asserts/icon-auth.png',
					username: '小猫咪',
					time: '1555400035',
					data: data 
				}
			)
		},
		
		reply(id) {
			console.log(111)
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
