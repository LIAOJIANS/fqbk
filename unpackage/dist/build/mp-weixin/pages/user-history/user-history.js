(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user-history/user-history"],{"2c9a":function(n,t,i){"use strict";i.r(t);var e=i("cbd2"),o=i("cb31");for(var u in o)"default"!==u&&function(n){i.d(t,n,(function(){return o[n]}))}(u);var c,r=i("f0c5"),a=Object(r["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);t["default"]=a.exports},"581a":function(n,t,i){"use strict";(function(n){i("b02b"),i("921b");e(i("66fd"));var t=e(i("2c9a"));function e(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,i("543d")["createPage"])},cb31:function(n,t,i){"use strict";i.r(t);var e=i("f84c"),o=i.n(e);for(var u in e)"default"!==u&&function(n){i.d(t,n,(function(){return e[n]}))}(u);t["default"]=o.a},cbd2:function(n,t,i){"use strict";var e={"uni-nav-bar":function(){return i.e("components/uni-nav-bar/uni-nav-bar").then(i.bind(null,"d353"))},"uni-list":function(){return i.e("components/uni-list/uni-list").then(i.bind(null,"da93"))},"uni-list-item":function(){return i.e("components/uni-list-item/uni-list-item").then(i.bind(null,"682f"))}},o=function(){var n=this,t=n.$createElement;n._self._c},u=[];i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return u})),i.d(t,"a",(function(){return e}))},f84c:function(n,t,i){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){i.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(i("d353"))}.bind(null,i)).catch(i.oe)},o=function(){i.e("components/uni-list/uni-list").then(function(){return resolve(i("da93"))}.bind(null,i)).catch(i.oe)},u=function(){i.e("components/uni-list-item/uni-list-item").then(function(){return resolve(i("682f"))}.bind(null,i)).catch(i.oe)},c=function(){i.e("components/common/no-thing").then(function(){return resolve(i("f074"))}.bind(null,i)).catch(i.oe)},r={components:{uniList:o,uniListItem:u,noThing:c,uniNavBar:e},data:function(){return{firstload:!1,list:[]}},onShow:function(){this.getList()},onNavigationBarButtonTap:function(){this.clear()},methods:{clickRight:function(){this.clear()},clear:function(){var t=this;n.showModal({title:"提示",content:"是否要清除浏览历史？",success:function(i){i.confirm&&(t.user.clearHistory(),t.list=[],n.showToast({title:"清除成功"}))}})},getList:function(){try{var t=n.getStorageSync("HistoryList_"+this.user.userinfo.id);this.list=t?JSON.parse(t):[]}catch(i){n.showToast({title:"加载失败~",icon:"none"})}this.firstload=!0},openDetail:function(t){n.navigateTo({url:"/pages/detail/detail?detailData="+JSON.stringify(t)})}}};t.default=r}).call(this,i("543d")["default"])}},[["581a","common/runtime","common/vendor"]]]);