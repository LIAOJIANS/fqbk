(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/detail/comment-list"],{"29b1":function(e,t,n){"use strict";n.r(t);var u=n("e026"),i=n.n(u);for(var c in u)"default"!==c&&function(e){n.d(t,e,(function(){return u[e]}))}(c);t["default"]=i.a},"344e":function(e,t,n){"use strict";var u=n("e9dc"),i=n.n(u);i.a},"61f0":function(e,t,n){"use strict";n.r(t);var u=n("ef06"),i=n("29b1");for(var c in i)"default"!==c&&function(e){n.d(t,e,(function(){return i[e]}))}(c);n("344e");var r,a=n("f0c5"),f=Object(a["a"])(i["default"],u["b"],u["c"],!1,null,"15cafafa",null,!1,u["a"],r);t["default"]=f.exports},e026:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={props:{item:Object,index:Number},methods:{reply:function(){this.$emit("reply",this.item.id)},openSpace:function(){e.navigateTo({url:"../../pages/user-space/user-space?userid="+this.item.userid})}}};t.default=n}).call(this,n("543d")["default"])},e9dc:function(e,t,n){},ef06:function(e,t,n){"use strict";var u,i=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return c})),n.d(t,"a",(function(){return u}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/detail/comment-list-create-component',
    {
        'components/detail/comment-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("61f0"))
        })
    },
    [['components/detail/comment-list-create-component']]
]);
