<template>
	<view class="user-chat">
		<!-- 聊天列表 -->
		<scroll-view id='scrollView' scroll-y :scroll-top="scrollTop" :scroll-with-animation="true" :style="{ height: style.content + 'px' }">
			<block v-for="(item, index) in list" :key='index'>
				<view class="chat-item">
					<userChatList :item='item' :index='index' />
				</view>
			</block>
		</scroll-view>
		
		<!-- 底部发送 -->
		<userChatBottom @submit='submit'/>
	</view>
</template>

<script>
	import userChatBottom from '../../components/user-chat/user-chat-bottom.vue'
	import userChatList from '../../components/user-chat/user-chat-list'
	import time from '../../common/time.js'
	export default {
		data() {
			return {
				scrollTop: 0, // 滚动高度
				style: { // 滑动高度
					content: 0, // 内容总高度
					itemH: 0 // 元素总高度
				},
				list: [], // 聊天数组
			}
		},
		
		created() {
			this._loadData()
			this.style.content = uni.getSystemInfoSync().windowHeight - uni.upx2px(120)
		},
		
		mounted() {
			this._checkScrollTopH()
		},
		
		methods: {
			_loadData() {
				let arr = [
					{
						isme: true,
						userpic: '../../static/shou.jpg',
						type: 'text',
						data: 'hhhhh',
						time: '1554970014'
					},
					{
						isme: false,
						userpic: '../../static/shou.jpg',
						type: 'img',
						data: '../../static/shou.jpg',
						time: '1554970014'
					}
				]
				this.list = this._timeCheck(arr)
			},
			
			_timeCheck(arr) {
				arr.forEach((item, index) => {
					if(item.time) {
						item.gstime = time.gettime.getChatTime(item.time, index > 0 ? arr[index -1].time : 0)
					}
				})
				return arr
			},
			
			_checkScrollTopH() { // 判断元素总高度
				let q = uni.createSelectorQuery()
				q.select('#scrollView').boundingClientRect()
				q.selectAll('.chat-item').boundingClientRect()
				// 执行所有定义函数
				
				q.exec(res => {
					res[1].forEach(item => {
						console.log(item)
						this.style.itemH += item.height
					})
					// 如果元素总高度大于容器高度的话，则让他滚动距离定位
					if(this.style.itemH > this.style.content) {
						this.scrollTop = this.style.itemH
					}
				})
			},
			
			submit(data) {
				let nowTime = new Date().getTime()
				this.list.push({
					isme: true,
					userpic: '../../static/shou.jpg',
					type: 'text',
					data: data,
					time: nowTime,
					gstime: time.gettime.getChatTime(nowTime, this.list.length > 0 ? this.list[this.list.length - 1].time : 0)
				})
				this._checkScrollTopH()
			}
		},
		
		 components: {
			 userChatBottom,
			 userChatList
		 }
	}
</script>

<style lang="scss">

</style>
