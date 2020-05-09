(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/paper/paper-list"],{"040d":function(e,t,n){"use strict";var u=n("557b"),r=n.n(u);r.a},"23d9":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=function(){n.e("components/uni-badge/uni-badge").then(function(){return resolve(n("a0b6"))}.bind(null,n)).catch(n.oe)},r={components:{badGe:u},props:{item:Object,index:Number},computed:{getItemNoreadnum:function(){return this.item.noreadnum}},methods:{opendetail:function(){var e={userid:this.item.userid,username:this.item.username,userpic:this.item.userpic};this.user.navigate({url:"../../pages/user-chat/user-chat?userinfo="+JSON.stringify(e)}),this.$chat.Read(this.item)}}};t.default=r},"557b":function(e,t,n){},7160:function(e,t,n){"use strict";var u,r=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return u}))},a9c5:function(e,t,n){"use strict";n.r(t);var u=n("23d9"),r=n.n(u);for(var i in u)"default"!==i&&function(e){n.d(t,e,(function(){return u[e]}))}(i);t["default"]=r.a},e51b:function(e,t,n){"use strict";n.r(t);var u=n("7160"),r=n("a9c5");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("040d");var a,c=n("f0c5"),o=Object(c["a"])(r["default"],u["b"],u["c"],!1,null,"275187ee",null,!1,u["a"],a);t["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/paper/paper-list-create-component',
    {
        'components/paper/paper-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e51b"))
        })
    },
    [['components/paper/paper-list-create-component']]
]);
