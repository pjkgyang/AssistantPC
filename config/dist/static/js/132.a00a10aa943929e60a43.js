webpackJsonp([132],{rM2I:function(t,e){},tkRl:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("mmiC"),s=a("oFuF"),r={data:function(){return{qygcList:[],qyrbmxList:[],qyzdList:[],qymc:"",date:"",ryfw:"",qyzd:"",ryfwList:[{label:"1",mc:"应填人员"},{label:"2",mc:"请假人员"},{label:"3",mc:"未填报人员"},{label:"4",mc:"补填人员"},{label:"5",mc:"战队队长未阅人员"},{label:"6",mc:"区域总未阅人员"}],pickerBeginDateBefore:{disabledDate:function(t){return t.getTime()>Date.now()}},tag:""}},updated:function(){},mounted:function(){document.title="区域日报-统计明细",window.onerror=function(){return!0},null==Object(s.n)("gczd")?Object(s.i)("gczd",this.qygcList,!0):this.qygcList=Object(s.n)("gczd"),this.tag=JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag,this.date=this.$route.query.qyrq,this.qymc=decodeURIComponent(this.$route.query.qymc),this.ryfw=this.$route.query.ryfw,this.qyzd=this.$route.query.zdwid,this.qyRbMxReport(),this.getQyzd(this.qymc)},methods:{exportTable:function(){window.open(window.baseurl+"report/exportQyRbMxReport.do?rq="+this.date+"&qymc="+this.qymc+"&zdwid="+this.qyzd+"&ryfw="+this.ryfw)},handleDatePicker:function(){this.qyRbMxReport()},handleQY:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.qymc=e,this.qyzd="",this.qyRbMxReport(),this.getQyzd(this.qymc))},handleRYFW:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.ryfw=e,this.qyRbMxReport())},handleQYZD:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.qyzd=e,this.qyRbMxReport())},handleGrmx:function(t){var e=this.$router.resolve({name:"LogPannal2",query:{yhbh:t,rq:this.date}});window.open(e.href,"_blank")},qyRbMxReport:function(){var t=this;Object(i.c)({rq:this.date,qymc:this.qymc,ryfw:this.ryfw,zdwid:this.qyzd}).then(function(e){var a=e.data;"success"==a.state&&(null==a.data?t.qyrbmxList=[]:t.qyrbmxList=a.data)})},getQyzd:function(t){var e=this;Object(i.a)({qymc:t}).then(function(t){var a=t.data;null!=a.data&&(e.qyzdList=a.data)})}},props:{},watch:{}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"qyrb-pannal1"},[a("div",{staticClass:"out-table"},[a("div",{staticClass:"query-condition"},[a("div",[a("p",{staticClass:"query-title"},[t._v("日期:")]),t._v(" "),a("p",[a("el-date-picker",{attrs:{align:"right",type:"date",size:"mini","value-format":"yyyy-MM-dd",placeholder:"选择日期","picker-options":t.pickerBeginDateBefore},on:{change:t.handleDatePicker},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1)]),t._v(" "),t.tag.includes("JYGL")?a("div",[a("p",{staticClass:"query-title"},[t._v("区域工程:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleQY}},[a("span",{class:{"bg-active":""==t.qymc},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.qygcList,function(e,i){return a("span",{key:i,class:{"bg-active":t.qymc==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]):t._e(),t._v(" "),a("div",[a("p",{staticClass:"query-title"},[t._v("人员范围:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleRYFW}},[a("span",{class:{"bg-active":""==t.ryfw},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.ryfwList,function(e,i){return a("span",{key:i,class:{"bg-active":t.ryfw==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),t.tag.includes("JYGL")||t.tag.includes("QYZ")||t.tag.includes("ZDDZ")?a("div",[a("p",{staticClass:"query-title"},[t._v("区域战队:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleQYZD}},[a("span",{class:{"bg-active":""==t.qyzd},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.qyzdList,function(e,i){return a("span",{key:i,class:{"bg-active":t.qyzd==e.id},attrs:{"data-type":e.id}},[t._v(t._s(e.text))])})],2)]):t._e()]),t._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"10px 0"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.exportTable}},[t._v("导出")])],1),t._v(" "),a("table",{staticClass:"table"},[a("caption",[t._v("区域日报统计明细表")]),t._v(" "),t._m(0),t._v(" "),a("tbody",[t._l(t.qyrbmxList,function(e){return a("tr",[a("td",{attrs:{title:e.qymc}},[t._v(t._s(e.qymc))]),t._v(" "),a("td",{attrs:{title:e.qyzxm}},[t._v(t._s(e.qyzxm))]),t._v(" "),a("td",{attrs:{title:e.qyzd}},[t._v(t._s(e.qyzd))]),t._v(" "),a("td",{attrs:{title:e.zddzxm}},[t._v(t._s(e.zddzxm))]),t._v(" "),a("td",{attrs:{title:e.cyxm}},[t._v(t._s(e.cyxm))]),t._v(" "),a("td",[a("span",{staticClass:"router-mx",on:{click:function(a){t.handleGrmx(e.cyuid)}}},[t._v(t._s(e.rbzs))])]),t._v(" "),a("td",{attrs:{title:e.bz}},[t._v(t._s(e.bz))])])}),t._v(" "),0==t.qyrbmxList.length?a("tr",[a("td",[t._v("暂无内容")])]):t._e()],2)])])])},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("区域名称")]),t._v(" "),a("th",[t._v("区域工程总")]),t._v(" "),a("th",[t._v("战队名称")]),t._v(" "),a("th",[t._v("战队队长")]),t._v(" "),a("th",[t._v("战队成员")]),t._v(" "),a("th",[t._v("填写日报总数")]),t._v(" "),a("th",[t._v("备注")])])])}]};var c=a("VU/8")(r,n,!1,function(t){a("rM2I")},"data-v-22aff3d3",null);e.default=c.exports}});
//# sourceMappingURL=132.a00a10aa943929e60a43.js.map