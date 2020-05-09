<script>
	
	export default {
		onLaunch: function() {
			// 监听用户是否断网
			this.lib.NetWork.On()
			// 监听用户是否登录
			this.user.__init()
			// #ifdef APP-PLUS
			// 监听是否有新版本
			this.lib.Update()
			// #endif
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/*每个页面公共css */
	/* 引入官方css库 */
	@import './common/uni.css';
	/* 引入自定义图标库 */
	@import './common/icon.css';
	/* 引入动画库 */
	@import './common/animate.css';
	/* 公共样式 */
	@import './common/common.css';
	
	page{ 
		background: #FFFFFF; 
		height: 100%;
	}
	::-webkit-scrollbar{
		display: none;
	}
</style>
