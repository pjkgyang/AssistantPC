webpackJsonp([30],{"4JwX":function(t,a){},RV6D:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});e("t5DY");var s=e("mmiC"),i=e("oFuF"),c={data:function(){return{thList:[],tdList:[],limit:"",object:{}}},updated:function(){this.limit=this.tableData.length},methods:{handleQyjjqk:function(t,a,e){this.object={},this.object[a]=e,this.object.qybh=t,this.$emit("handleQyjjqk",this.object)}},computed:{},props:{tableData:{type:Array,default:function(){return[]}}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticStyle:{"overflow-x":"auto"}},[e("table",{staticClass:"table table-qyjjqk",attrs:{border:""}},[e("caption",[t._v("区域解决情况")]),t._v(" "),0!=t.tableData.length?e("tr",[e("th",{staticStyle:{width:"100px"}},[t._v("区域工程")]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].qdjkrjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].xmtdjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].gczjjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].cpzjjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].zdrjj))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].qdjkrhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].xmtdhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].gczjhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].cpzjhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].zdrhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].hjhs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].dyz))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].wtzs))])]):t._e(),t._v(" "),t._l([].concat(t.tableData).splice(1,t.limit-1),function(a,s){return 0!=t.tableData.length?e("tr",{key:s},[e("td",{attrs:{title:a.qymc}},[t._v(t._s(a.qymc))]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"qdjkrjj",a.qdjkrjj)}}},[t._v(t._s(a.qdjkrjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"xmtdjj",a.xmtdjj)}}},[t._v(t._s(a.xmtdjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"gczjjj",a.gczjjj)}}},[t._v(t._s(a.gczjjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"cpzjjj",a.cpzjjj)}}},[t._v(t._s(a.cpzjjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"zdrjj",a.zdrjj)}}},[t._v(t._s(a.zdrjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"qdjkrhs",a.qdjkrhs)}}},[t._v(t._s(a.qdjkrhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"xmtdhs",a.xmtdhs)}}},[t._v(t._s(a.xmtdhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"gczjhs",a.gczjhs)}}},[t._v(t._s(a.gczjhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"cpzjhs",a.cpzjhs)}}},[t._v(t._s(a.cpzjhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"zdrhs",a.zdrhs)}}},[t._v(t._s(a.zdrhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"hjhs",a.hjhs)}}},[t._v(t._s(a.hjhs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"dyz",a.dyz)}}},[t._v(t._s(a.dyz))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleQyjjqk(a.qybh,"wtzs",a.wtzs)}}},[t._v(t._s(a.wtzs))])])]):t._e()})],2)])])},staticRenderFns:[]};var n={data:function(){return{cpxline:[],dwlxList:[{label:"1",mc:"学校"},{label:"0",mc:"金智"},{label:"2",mc:"合作伙伴"}],jjztList:[{label:"1",mc:"已关闭"},{label:"2",mc:"申请关闭中"}],jjzt:"",cpx:"",dwlx:"",cpxmc:"",qyjjqkList:[]}},methods:{handleQyjjqk:function(t){t.cpxbh=this.cpx,t.dwlx=this.dwlx,t.wtzt=this.jjzt,t.lx=7;var a=this.$router.resolve({path:"/report-list/questionlist.html",query:t});window.open(a.href,"_blank")},exportTable:function(){window.open(window.baseurl+"report/exportylWtReportByCpx.do?dwlx="+this.dwlx+"&cpxbh="+this.cpx+"&wtzt="+this.jjzt+"&lx=7")},handleCPX:function(t){var a=t.target.getAttribute("data-type");this.cpxmc=t.target.getAttribute("data-mc"),null!=a&&(this.cpx=a,this.ylWtReportByCpx())},handleDWLX:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.dwlx=a,this.ylWtReportByCpx())},handleJJZT:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.jjzt=a,this.ylWtReportByCpx())},ylWtReportByCpx:function(){var t=this;Object(s.f)({curPage:1,pageSize:99999,qyzd:"",dwlx:this.dwlx,cpxbh:this.cpx,sjlb:"",wtzt:this.jjzt,lx:7,keyword:""}).then(function(a){var e=a.data;"success"==e.state?t.qyjjqkList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})}},mounted:function(){null==Object(i.j)("cpx")?Object(i.g)("cpx",this.cpxline,!0):this.cpxline=Object(i.j)("cpx"),this.ylWtReportByCpx()},activated:function(){},watch:{},components:{reportQyjjqk:e("Z0/y")(c,l,!1,function(t){e("Tv7e")},"data-v-56501324",null).exports}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"query-condition"},[e("div",[e("p",{staticClass:"query-title"},[t._v("产品线:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleCPX}},[e("span",{class:{"bg-active":""==t.cpx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.cpxline,function(a,s){return e("span",{class:{"bg-active":t.cpx==a.label},attrs:{"data-mc":a.mc,"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("单位类型:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleDWLX}},[e("span",{class:{"bg-active":""==t.dwlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.dwlxList,function(a,s){return e("span",{class:{"bg-active":t.dwlx==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("解决状态:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleJJZT}},[e("span",{class:{"bg-active":""==t.jjzt},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.jjztList,function(a,s){return e("span",{class:{"bg-active":t.jjzt==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)])]),t._v(" "),e("div",{staticStyle:{"text-align":"right",margin:"10px 0"}},[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.exportTable}},[t._v("导出")])],1),t._v(" "),e("div",[e("report-qyjjqk",{attrs:{tableData:t.qyjjqkList},on:{handleQyjjqk:t.handleQyjjqk}})],1)])},staticRenderFns:[]};var j=e("Z0/y")(n,r,!1,function(t){e("4JwX")},null,null);a.default=j.exports},Tv7e:function(t,a){}});
//# sourceMappingURL=30.cc336b0afc0b9307b27d.js.map