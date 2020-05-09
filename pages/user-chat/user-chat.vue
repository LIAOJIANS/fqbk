<template>
	<view class="user-chat">
		<!-- 聊天列表 -->
		<scroll-view id="scrollView" scroll-y :scroll-top="scrollTop" :scroll-with-animation="true" :style="{ height: style.contentH + 'px' }">
			<view class="u-f-ajc chat-load-more" hover-class="chat-load-more-hover" @tap="loadmore">{{ loadtext }}</view>
			<block v-for="(item, index) in list" :key="index">
				<view class="chat-item"><userChatList :item="item" :index="index" /></view>
			</block>
		</scroll-view>

		<!-- 底部发送 -->
		<userChatBottom @submit="submit" />
	</view>
</template>

<script>
import userChatBottom from '../../components/user-chat/user-chat-bottom.vue';
import userChatList from '../../components/user-chat/user-chat-list';
import time from '../../common/time.js';
export default {
	data() {
		return {
			loadtext: '点击加载更多',
			scrollTop: 0, // 滚动高度
			style: {
				// 滑动高度
				contentH: 0, // 内容总高度
				itemH: 0 // 元素总高度
			},
			list: [] // 聊天数组
		};
	},

	onLoad(e) {
		let userinfo = JSON.parse(e.userinfo);
		// 用户不存在
		if (!userinfo.userid) {
			uni.showToast({ title: '该用户不存在', icon: 'none' });
			return uni.navigateBack({ delta: 1 });
		}
		// 初始化聊天对象
		this.$chat.CurrentToUser = {
			userid: userinfo.userid,
			username: userinfo.username,
			userpic: userinfo.userpic
		};
		// 修改标题
		uni.setNavigationBarTitle({ title: userinfo.username });
	},

	onUnload() {
		// 初始化聊天对象
		this.$chat.CurrentToUser = {
			userid: 0,
			username: '',
			userpic: ''
		};
	},

	onReady() {
		this.__init();
	},

	methods: {
		__init() {
			// 获取窗口信息
			try {
				const res = uni.getSystemInfoSync();
				this.style.contentH = res.windowHeight - uni.upx2px(120);
			} catch (e) {}
			// 获取聊天历史记录
			this.getdata();
			// 至于底部
			this.pageToBottom(true);
			// 开启监听
			uni.$on('UserChat', data => {
				this.list.push(
					this.$chat.__format(data, {
						type: 'chatdetail',
						isme: false,
						olddata: this.list
					})
				);
				this.pageToBottom();
			});
		},

		pageToBottom(isfirst = false, isscrollToBottom = true) {
			let q = uni.createSelectorQuery().in(this);
			let itemH = q.selectAll('.chat-item');
			this.$nextTick(() => {
				itemH
					.fields(
						{
							size: true
						},
						data => {
							if (data) {
								if (isfirst) {
									this.style.itemH = 0;
									for (let i = 0; i < data.length; i++) {
										this.style.itemH += data[i].height;
									}
								} else {
									this.style.itemH += data.length > 0 ? data[data.length - 1].height : data[0].height;
								}
								if (isscrollToBottom) {
									this.scrollTop = this.style.itemH > this.style.contentH ? this.style.itemH : 0;
								}
							}
						}
					)
					.exec();
			});
		},

		getdata(isall = false) {
			try {
				let key = 'chatdetail_' + this.user.userinfo.id + '_' + this.$chat.CurrentToUser.userid;
				let list = uni.getStorageSync(key);
				list = list ? JSON.parse(list) : [];
				// 首次加载十条
				if (!isall && list.length > 10) {
					return (this.list = list.splice(0, 10));
				}
				// 加载剩下的数据
				this.list = list;
				this.loadtext = '';
			} catch (e) {
				uni.showToast({ title: '加载失败~', icon: 'none' });
			}
		},

		async submit(data) {
			if (!data) {
				return uni.showToast({ title: '请输入你要发送的消息~', icon: 'none' });
			}
			let result = this.$chat.send({ type: 'text', data: data });
			let [err, res] = await this.$http.post('/chat/send', result, {
				token: true,
				checkToken: true,
				checkAuth: true
			});
			if (!this.$http.errorCheck(err, res)) {
				return uni.showToast({
					title: '发送失败',
					icon: 'none'
				});
			}
			this.list.push(
				this.$chat.__format(result, {
					type: 'chatdetail', // 转化类型
					olddata: this.list,
					isme: true
				})
			);
			this.pageToBottom();
		},

		// 加载更多
		loadmore() {
			if (this.loadtext !== '点击加载更多') return;
			// 修改状态
			this.loadtext = '加载中...';
			this.getdata(true);
			this.pageToBottom(true, false);
		}
	},

	components: {
		userChatBottom,
		userChatList
	}
};
</script>

<style lang="scss"></style>
