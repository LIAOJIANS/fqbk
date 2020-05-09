(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/user-space/user-space-userinfo"],{"0bf6":function(t,e,n){"use strict";var u,r=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return u}))},"1c28":function(t,e,n){"use strict";n.r(e);var u=n("64a0"),r=n.n(u);for(var i in u)"default"!==i&&function(t){n.d(e,t,(function(){return u[t]}))}(i);e["default"]=r.a},"64a0":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=r(n("9337"));function r(t){return t&&t.__esModule?t:{default:t}}var i={props:{userinfo:Object},computed:{getRegAge:function(){return this.userinfo.regtime?u.default.gettime.sumAge(this.userinfo.regtime):"未知"},getXingZuo:function(){return this.userinfo.birthday&&"未知"!=this.userinfo.birthday&&""!==this.userinfo.birthday?u.default.gettime.getHoroscope(this.userinfo.birthday):"未知"}}};e.default=i},a43f:function(t,e,n){},c292:function(t,e,n){"use strict";var u=n("a43f"),r=n.n(u);r.a},fdd0:function(t,e,n){"use strict";n.r(e);var u=n("0bf6"),r=n("1c28");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("c292");var f,o=n("f0c5"),c=Object(o["a"])(r["default"],u["b"],u["c"],!1,null,"6c3c5456",null,!1,u["a"],f);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/user-space/user-space-userinfo-create-component',
    {
        'components/user-space/user-space-userinfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fdd0"))
        })
    },
    [['components/user-space/user-space-userinfo-create-component']]
]);
