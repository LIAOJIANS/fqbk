(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/home"],{"3cf3":function(n,t,e){"use strict";(function(n){e("b02b"),e("921b");o(e("66fd"));var t=o(e("f1c6"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"5e30":function(n,t,e){"use strict";var o,i=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return o}))},a146:function(n,t,e){"use strict";e.r(t);var o=e("ac25"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);t["default"]=i.a},ac25:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){Promise.all([e.e("common/vendor"),e.e("components/home/other-login")]).then(function(){return resolve(e("4d8f"))}.bind(null,e)).catch(e.oe)},i=function(){e.e("components/home/home-info").then(function(){return resolve(e("c162"))}.bind(null,e)).catch(e.oe)},u=function(){e.e("components/home/home-data").then(function(){return resolve(e("572c"))}.bind(null,e)).catch(e.oe)},s=function(){Promise.all([e.e("common/vendor"),e.e("components/home/home-list-item")]).then(function(){return resolve(e("e10c"))}.bind(null,e)).catch(e.oe)},a={data:function(){return{isLogin:!1,homeinfo:{userpic:"../../static/shou.jpg",username:"昵称",totalnum:0,todaynum:0},homedata:[{name:"糗事",num:0},{name:"动态",num:0},{name:"评论",num:0},{name:"粉丝",num:0}],list:[{icon:"liulan",name:"浏览历史",clicktype:"navigateTo",url:"../user-history/user-history"},{icon:"huiyuanvip",name:"百科认证",clicktype:"nothing",url:""},{icon:"keyboard",name:"审核百科",clicktype:"nothing",url:""},{icon:"shezhi",name:"我的设置",clicktype:"navigateTo",url:"/pages/user-set/user-set",auth:!0,NoCheck:!0}]}},components:{otherLogin:o,homeInfo:i,homeData:u,homeListItem:s},onShareAppMessage:function(n){return{title:this.detail.title,path:"/pages/detail/detail?detailData="+JSON.stringify(this.detail)}},onShow:function(){this.isULogin()},onNavigationBarButtonTap:function(t){0===t.index&&n.navigateTo({url:"../user-set/user-set"})},methods:{isULogin:function(){if(!this.user.token)return this.isLogin=!1,this.homeinfo={userpic:"",username:"",totalnum:0,todaynum:0},this.homedata[0].num=0,this.homedata[1].num=0,this.homedata[2].num=0,void(this.homedata[3].num=0);this.format()},format:function(){this.homeinfo.id=this.user.userinfo.id,this.homeinfo.userpic=this.user.userinfo.userpic,this.homeinfo.username=this.user.userinfo.username,this.homeinfo.totalnum=this.user.counts.post_count||0,this.homeinfo.todaynum=this.user.counts.today_posts_count||0,this.homedata[0].num=this.user.counts.post_count||0,this.homedata[1].num=this.user.counts.post_count||0,this.homedata[2].num=this.user.counts.comments_count||0,this.homedata[3].num=this.user.counts.withfen_count||0,this.isLogin=!0},openLogin:function(){n.navigateTo({url:"../login/login"})}}};t.default=a}).call(this,e("543d")["default"])},f1c6:function(n,t,e){"use strict";e.r(t);var o=e("5e30"),i=e("a146");for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);var s,a=e("f0c5"),c=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"4208c906",null,!1,o["a"],s);t["default"]=c.exports}},[["3cf3","common/runtime","common/vendor"]]]);