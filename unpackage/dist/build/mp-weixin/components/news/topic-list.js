(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/news/topic-list"],{2502:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}))},"62a6":function(t,e,n){"use strict";n.r(e);var i=n("ec65"),a=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=a.a},"77b7":function(t,e,n){"use strict";var i=n("e9f4"),a=n.n(i);a.a},"9fa3":function(t,e,n){"use strict";n.r(e);var i=n("2502"),a=n("62a6");for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("77b7");var u,o=n("f0c5"),r=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"e583415e",null,!1,i["a"],u);e["default"]=r.exports},e9f4:function(t,e,n){},ec65:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{item:Object,index:Number,ischange:{type:Boolean,default:!1}},methods:{openTopicDetail:function(){if(this.ischange)return t.$emit("changeTopic",{id:this.item.id,title:this.item.title}),void t.navigateBack({delta:1});t.navigateTo({url:"../../pages/topic-detail/topic-detail?detail="+JSON.stringify(this.item)})}}};e.default=n}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/news/topic-list-create-component',
    {
        'components/news/topic-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("9fa3"))
        })
    },
    [['components/news/topic-list-create-component']]
]);
