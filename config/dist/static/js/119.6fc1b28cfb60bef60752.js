webpackJsonp([119],{"/plz":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticStyle:{padding:"10px 20px"}},[t._m(0),t._v(" "),s("ul",{staticClass:"grrzdj-list"},[t._l(t.grrzdjList,function(e){return t.grrzdjList.length?s("li",{attrs:{flex:"","space-around":""}},[s("p",[t._v(t._s(e.gh))]),t._v(" "),s("p",[t._v(t._s(e.xm))]),t._v(" "),s("p",[t._v(t._s(e.rzxl))]),t._v(" "),s("p",[t._v(t._s(e.cpx))]),t._v(" "),s("p",[t._v(t._s(e.rzjb))]),t._v(" "),s("p",[t._v(t._s(e.rzdj))]),t._v(" "),s("p",[t._v(t._s(e.rzrq))])]):t._e()}),t._v(" "),t.grrzdjList.length?t._e():s("div",[t._v("暂无数据")])],2)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"grrzdj-head",attrs:{flex:"","space-around":""}},[s("p",[t._v("工号")]),t._v(" "),s("p",[t._v("姓名")]),t._v(" "),s("p",[t._v("任职序列")]),t._v(" "),s("p",[t._v("产品线")]),t._v(" "),s("p",[t._v("任职级别")]),t._v(" "),s("p",[t._v("任职等级")]),t._v(" "),s("p",[t._v("获取时间")])])}]};var n=s("VU/8")({data:function(){return{grrzdjList:[]}},mounted:function(){this.getPersonalPositionLevel()},methods:{getPersonalPositionLevel:function(){var t=this;this.$get(this.API.listPersonalPositionLevel,{}).then(function(e){"success"==e.state&&(e.data?t.grrzdjList=e.data:t.grrzdjList=[])})}},components:{}},r,!1,function(t){s("xqN/")},"data-v-431edd3e",null);e.default=n.exports},"xqN/":function(t,e){}});
//# sourceMappingURL=119.6fc1b28cfb60bef60752.js.map