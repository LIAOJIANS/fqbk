(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"122f":function(t,n,e){},"3e1a":function(t,n,e){"use strict";var r,o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return r}))},"560e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(e("4795"));function o(t){return t&&t.__esModule?t:{default:t}}function a(t,n){return l(t)||c(t,n)||u(t,n)||i()}function i(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,n){if(t){if("string"===typeof t)return s(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(e):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?s(t,n):void 0}}function s(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function c(t,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var e=[],r=!0,o=!1,a=void 0;try{for(var i,u=t[Symbol.iterator]();!(r=(i=u.next()).done);r=!0)if(e.push(i.value),n&&e.length===n)break}catch(s){o=!0,a=s}finally{try{r||null==u["return"]||u["return"]()}finally{if(o)throw a}}return e}}function l(t){if(Array.isArray(t))return t}function f(t,n,e,r,o,a,i){try{var u=t[a](i),s=u.value}catch(c){return void e(c)}u.done?n(s):Promise.resolve(s).then(r,o)}function h(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var a=t.apply(n,e);function i(t){f(a,r,o,i,u,"next",t)}function u(t){f(a,r,o,i,u,"throw",t)}i(void 0)}))}}var d=function(){e.e("components/uni-status-bar/uni-status-bar").then(function(){return resolve(e("325e"))}.bind(null,e)).catch(e.oe)},p=function(){Promise.all([e.e("common/vendor"),e.e("components/home/other-login")]).then(function(){return resolve(e("4d8f"))}.bind(null,e)).catch(e.oe)},m={data:function(){return{isPassWord:!1,username:"",password:"",phone:"",isOk:!0,yzm:"",countVal:"获取验证码"}},watch:{username:function(){this.check()},password:function(){this.check()},phone:function(){this.check()},yzm:function(){this.check()}},created:function(){var n=this;t.getStorage({key:"count-val",success:function(t){var e=JSON.parse(t.data);"获取验证码"!==e.countVal&&e&&Math.floor(((new Date).getTime()-e.time)/1e3)<e.countVal&&n.down(e.countVal)}})},beforeDestroy:function(){var n=JSON.stringify({countVal:this.countVal,time:(new Date).getTime()});t.setStorage({key:"count-val",data:n})},components:{uniStatusBar:d,otherLogin:p},methods:{check:function(){var t=this.username,n=this.password,e=this.phone,r=this.yzm;(t&&n||e&&r)&&(this.isOk=!1)},submit:function(){return this.isPassWord?this.user.login({url:"/user/login",data:{username:this.username,password:this.password}}):this.phone&&/^1\d{10}$/.test(this.phone)?this.user.login({url:"/user/phonelogin",data:{phone:this.phone,code:this.yzm}}):t.showToast({title:"手机号为空，或者不正确",icon:"none"})},back:function(){t.navigateBack({delta:1})},loginType:function(){this.isPassWord=!this.isPassWord,this.initData()},initData:function(){this.username="",this.password="",this.phone="",this.isOk=!0,this.yzm=""},countDown:function(){var n=this;return h(r.default.mark((function e(){var o,i,u,s;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n.phone&&/^1\d{10}$/.test(n.phone)){e.next=2;break}return e.abrupt("return",t.showToast({title:"手机号为空，或者不正确",icon:"none"}));case 2:if("获取验证码"===n.countVal){e.next=4;break}return e.abrupt("return",t.showToast({title:"正在发送，请勿重复点击"}));case 4:return e.next=6,n.$http.post("/user/sendcode",{phone:n.phone});case 6:if(o=e.sent,i=a(o,2),i[0],u=i[1],30005===u.data.errorCode){e.next=12;break}return e.abrupt("return",t.showToast({title:u.data.msg,icon:"none"}));case 12:t.showToast({title:u.data.msg}),s=60,n.down(s);case 15:case"end":return e.stop()}}),e)})))()},down:function(t){var n=this,e=setInterval((function(){n.countVal=t--,t<=0&&(n.countVal="获取验证码",clearInterval(e))}),1e3)}}};n.default=m}).call(this,e("543d")["default"])},7250:function(t,n,e){"use strict";(function(t){e("b02b"),e("921b");r(e("66fd"));var n=r(e("86a9"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"86a9":function(t,n,e){"use strict";e.r(n);var r=e("3e1a"),o=e("f63b");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("adb0");var i,u=e("f0c5"),s=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);n["default"]=s.exports},adb0:function(t,n,e){"use strict";var r=e("122f"),o=e.n(r);o.a},f63b:function(t,n,e){"use strict";e.r(n);var r=e("560e"),o=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);n["default"]=o.a}},[["7250","common/runtime","common/vendor"]]]);