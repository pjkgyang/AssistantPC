webpackJsonp([21],{AJ4S:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});e("t5DY");var c=e("mmiC"),s=e("oFuF"),i={data:function(){return{limit:"",object:{}}},updated:function(){this.limit=this.tableData.length},mounted:function(){},methods:{handleCpx:function(t,a,e){this.object={},this.object[a]=e,this.object.cpxbh=t,this.$emit("handleCpx",this.object)}},props:{tableData:{type:Array,default:function(){return[]}}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"out-table"},[e("table",{staticClass:"table table-cpxhx",attrs:{border:""}},[e("caption",[t._v("产品线解决情况")]),t._v(" "),e("thead",[0!=t.tableData.length?e("tr",[e("th",[t._v("产品线")]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].xmtdjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].gczjjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].cpzjjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].zdrjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].xmtdhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].gczjhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].cpzjhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].zdrhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].hjhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].xmtdzfl))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].gczjzfl))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].dyz))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].wtzs))])]):t._e()]),t._v(" "),e("tbody",t._l([].concat(t.tableData).splice(1,t.limit-1),function(a,c){return e("tr",{key:c},[e("td",{attrs:{title:a.cpxmc}},[t._v(t._s(a.cpxmc))]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"xmtdjj",a.xmtdjj)}}},[t._v(t._s(a.xmtdjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"gczjjj",a.gczjjj)}}},[t._v(t._s(a.gczjjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"cpzjjj",a.cpzjjj)}}},[t._v(t._s(a.cpzjjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"zdrjj",a.zdrjj)}}},[t._v(t._s(a.zdrjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"xmtdhs",a.xmtdhs)}}},[t._v(t._s(a.xmtdhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"gczjhs",a.gczjhs)}}},[t._v(t._s(a.gczjhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"cpzjhs",a.cpzjhs)}}},[t._v(t._s(a.cpzjhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"zdrhs",a.zdrhs)}}},[t._v(t._s(a.zdrhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"hjhs",a.hjhs)}}},[t._v(t._s(a.hjhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"xmtdzfl",a.xmtdzfl)}}},[t._v(t._s(a.xmtdzfl))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"gczjzfl",a.gczjzfl)}}},[t._v(t._s(a.gczjzfl))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"dyz",a.dyz)}}},[t._v(t._s(a.dyz))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleCpx(a.cpxbh,"wtzs",a.wtzs)}}},[t._v(t._s(a.wtzs))])])])}))])])},staticRenderFns:[]};var n={data:function(){return{gczdList:[],dwlxList:[{label:"1",mc:"学校"},{label:"0",mc:"金智"},{label:"2",mc:"合作伙伴"}],jjztList:[{label:"1",mc:"已关闭"},{label:"2",mc:"申请关闭中"}],jjzt:"",gczd:"",dwlx:"",title:"区域所属学校",cpxhsbList:[]}},methods:{handleCpx:function(t){t.qyzd=this.gczd,t.dwlx=this.dwlx,t.wtzt=this.jjzt,t.lx=6;var a=this.$router.resolve({path:"/report-list/questionlist.html",query:t});window.open(a.href,"_blank")},exportTable:function(){window.open(window.baseurl+"report/exportylWtReportByCpx.do?dwlx="+this.dwlx+"&qyzd="+this.gczd+"&wtzt="+this.jjzt+"&lx=6")},handleGCZD:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.gczd=a,this.ylWtReportByCpx())},handleDWLX:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.dwlx=a,this.ylWtReportByCpx())},handleJJZT:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.jjzt=a,this.ylWtReportByCpx())},ylWtReportByCpx:function(){var t=this;Object(c.f)({curPage:1,pageSize:99999,qyzd:this.gczd,dwlx:this.dwlx,cpxbh:"",sjlb:"",wtzt:this.jjzt,lx:6,keyword:""}).then(function(a){var e=a.data;"success"==e.state?t.cpxhsbList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})}},mounted:function(){null==Object(s.l)("gczd")?Object(s.g)("gczd",this.gczdList,!0):this.gczdList=Object(s.l)("gczd"),this.ylWtReportByCpx()},activated:function(){},watch:{},components:{reportCpxhs:e("Z0/y")(i,l,!1,function(t){e("PCyN")},"data-v-7b0eb1b0",null).exports}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"query-condition"},[e("div",[e("p",{staticClass:"query-title"},[t._v("区域工程:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleGCZD}},[e("span",{class:{"bg-active":""==t.gczd},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(a,c){return e("span",{key:c,class:{"bg-active":t.gczd==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("单位类型:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleDWLX}},[e("span",{class:{"bg-active":""==t.dwlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.dwlxList,function(a,c){return e("span",{class:{"bg-active":t.dwlx==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("解决状态:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleJJZT}},[e("span",{class:{"bg-active":""==t.jjzt},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.jjztList,function(a,c){return e("span",{class:{"bg-active":t.jjzt==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)])]),t._v(" "),e("div",{staticStyle:{"text-align":"right",margin:"10px 0"}},[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.exportTable}},[t._v("导出")])],1),t._v(" "),e("div",[e("report-cpxhs",{attrs:{tableData:t.cpxhsbList},on:{handleCpx:t.handleCpx}})],1)])},staticRenderFns:[]};var d=e("Z0/y")(n,r,!1,function(t){e("kgkt")},null,null);a.default=d.exports},PCyN:function(t,a){},kgkt:function(t,a){}});
//# sourceMappingURL=21.b2ce7d7e00404860db9a.js.map