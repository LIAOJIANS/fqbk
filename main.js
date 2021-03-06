import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 全局引入配置文件
import config from './common/config.js'
Vue.prototype.config = config
import lib from './common/lib.js'
Vue.prototype.lib = lib
import user from 'common/user.js'
Vue.prototype.user = user

import chat from "./common/chat.js";
Vue.prototype.$chat = chat;

// 引入全局
import $http from './common/request.js'
Vue.prototype.$http = $http

App.mpType = 'app'

const app = new Vue({
    ...App,
	config,
	lib
})
app.$mount()
