webpackJsonp([33],{"00Vt":function(t,e){},"2J1b":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("t5DY");var n=a("mmiC"),s=a("oFuF"),c={data:function(){return{thList:[],tdList:[],limit:"",object:{}}},updated:function(){this.limit=this.tableData3.length},mounted:function(){window.onerror=function(){return!0}},methods:{handleCpxygz:function(t,e,a){this.object={},this.object[e]=a,this.object.cpxbh=t,this.$emit("handleCpxygz",this.object)}},props:{tableData3:{type:Array,default:function(){return[]}}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"out-table"},[a("table",{staticClass:"table table-cpxygz",attrs:{border:""}},[a("thead",[0!=t.tableData3.length?a("tr",[a("th",[t._v("分类")]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].noResponseMore24H))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].noResponseMore48H))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].noResponseMore5D))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].cqwwjj))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].ccnwjj))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].noSolveMore24H))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].noSolveMore48H))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].noSolveMore5D))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].cqw))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].ccn))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].dyz))]),t._v(" "),a("th",[t._v(t._s(t.tableData3[0].wtzs))])]):t._e()]),t._v(" "),a("tbody",t._l([].concat(t.tableData3).splice(1,t.limit-1),function(e,n){return 0!=t.tableData3.length?a("tr",{key:n},[a("td",{attrs:{title:e.cpxmc}},[t._v(t._s(e.cpxmc))]),t._v(" "),a("td",[a("a",{attrs:{href:"javascript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"noResponseMore24H",e.noResponseMore24H)}}},[t._v(t._s(e.noResponseMore24H))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"noResponseMore48H",e.noResponseMore48H)}}},[t._v(t._s(e.noResponseMore48H))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"noResponseMore5D",e.noResponseMore5D)}}},[t._v(t._s(e.noResponseMore5D))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"cqwwjj",e.cqwwjj)}}},[t._v(t._s(e.cqwwjj))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"ccnwjj",e.ccnwjj)}}},[t._v(t._s(e.ccnwjj))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"noSolveMore24H",e.noSolveMore24H)}}},[t._v(t._s(e.noSolveMore24H))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"noSolveMore48H",e.noSolveMore48H)}}},[t._v(t._s(e.noSolveMore48H))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"noSolveMore5D",e.noSolveMore5D)}}},[t._v(t._s(e.noSolveMore5D))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"cqw",e.cqw)}}},[t._v(t._s(e.cqw))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"ccn",e.ccn)}}},[t._v(t._s(e.ccn))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"dyz",e.dyz)}}},[t._v(t._s(e.dyz))])]),t._v(" "),a("td",[a("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(a){t.handleCpxygz(e.cpxbh,"wtzs",e.wtzs)}}},[t._v(t._s(e.wtzs))])])]):t._e()}))])])},staticRenderFns:[]};var o={data:function(){return{gczdList:[],cpxline:[],dwlxList:[{label:"1",mc:"学校"},{label:"0",mc:"金智"},{label:"2",mc:"合作伙伴"}],gczd:"",dwlx:"",sjlb:"0",ylwtList3:[]}},methods:{handleCpxygz:function(t){t.qyzd=this.gczd,t.dwlx=this.dwlx,t.sjlb=this.sjlb,t.lx=3;var e=this.$router.resolve({path:"/report-list/questionlist.html",query:t});window.open(e.href,"_blank")},exportTable:function(){window.open(window.baseurl+"report/exportylWtReportByCpx.do?dwlx="+this.dwlx+"&qyzd="+this.gczd+"&sjlb="+this.sjlb+"&lx=3")},handleDWLX:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.dwlx=e,this.ylWtReportByCpx())},handleGCZD:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.gczd=e,this.ylWtReportByCpx())},handleSJLB:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.sjlb=e,this.ylWtReportByCpx())},ylWtReportByCpx:function(){var t=this;Object(n.e)({curPage:1,pageSize:99999,qyzd:this.gczd,dwlx:this.dwlx,cpxbh:"",sjlb:this.sjlb,lx:3,keyword:""}).then(function(e){var a=e.data;"success"==a.state?t.ylwtList3=a.data:t.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})}},mounted:function(){null==Object(s.n)("cpx")?(Object(s.i)("cpx",this.cpxline,!0),Object(s.i)("gczd",this.gczdList,!0)):(this.cpxline=Object(s.n)("cpx"),this.gczdList=Object(s.n)("gczd")),this.ylWtReportByCpx()},activated:function(){},watch:{},components:{reportYlwt3:a("Z0/y")(c,l,!1,function(t){a("00Vt")},"data-v-49bd5f94",null).exports}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"query-condition"},[a("div",[a("p",{staticClass:"query-title"},[t._v("区域工程:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleGCZD}},[a("span",{class:{"bg-active":""==t.gczd},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(e,n){return a("span",{key:n,class:{"bg-active":t.gczd==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),a("div",[a("p",{staticClass:"query-title"},[t._v("单位类型:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleDWLX}},[a("span",{class:{"bg-active":""==t.dwlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.dwlxList,function(e,n){return a("span",{class:{"bg-active":t.dwlx==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),a("div",[a("p",{staticClass:"query-title"},[t._v("时间类别:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleSJLB}},[a("span",{class:{"bg-active":"0"==t.sjlb},attrs:{"data-type":"0"}},[t._v("按当前环节")]),t._v(" "),a("span",{class:{"bg-active":"1"==t.sjlb},attrs:{"data-type":"1"}},[t._v("按提问时间")])])])]),t._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"10px 0"}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.exportTable}},[t._v("导出")])],1),t._v(" "),a("div",[a("report-ylwt3",{attrs:{tableData3:t.ylwtList3},on:{handleCpxygz:t.handleCpxygz}})],1)])},staticRenderFns:[]};var r=a("Z0/y")(o,i,!1,function(t){a("uCdn")},null,null);e.default=r.exports},uCdn:function(t,e){}});
//# sourceMappingURL=33.83614313d353117e5679.js.map