webpackJsonp([36],{"6ajx":function(t,a){},LzdB:function(t,a,e){"use strict";var n={data:function(){return{thList:[{name:"分类",label:""},{name:"每日新增问题",label:"xzwt"},{name:"每日已解决问题",label:"drjjwt"},{name:"截止今日遗留问题",label:"drylwt"},{name:"待项目团队解决",label:"dxmtdjj"},{name:"待专家解决",label:"dzjjj"},{name:"待产品解决",label:"dcpjj"},{name:"待产品经理解决",label:"dcpjljj"},{name:"待指定人解决",label:"dzdrjj"},{name:"申请关闭",label:"dgb"},{name:"总问题数",label:"wtzs"},{name:"遗留问题比例",label:"ylbl"}],object:{}}},mounted:function(){},methods:{handleWtgz:function(t,a,e){this.object={},this.object[a]=e,this.object.cpxbh=t,this.$emit("handleWtgz",this.object)}},props:{tableData:{type:Array,default:function(){return[]}}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"out-table"},[e("table",{staticClass:"table table-wtgz",attrs:{border:""}},[e("thead",[e("tr",t._l(t.thList,function(a){return e("th",[t._v(t._s(a.name))])}))]),t._v(" "),e("tbody",t._l(t.tableData,function(a,n){return e("tr",{key:n},[e("td",{attrs:{title:a.cpxmc}},[t._v(t._s(a.cpxmc))]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"xzwt",a.xzwt)}}},[t._v(t._s(a.xzwt))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"drjjwt",a.drjjwt)}}},[t._v(t._s(a.drjjwt))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"drylwt",a.drylwt)}}},[t._v(t._s(a.drylwt))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"dxmtdjj",a.dxmtdjj)}}},[t._v(t._s(a.dxmtdjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"dzjjj",a.dzjjj)}}},[t._v(t._s(a.dzjjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"dcpjj",a.dcpjj)}}},[t._v(t._s(a.dcpjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"dcpjljj",a.dcpjljj)}}},[t._v(t._s(a.dcpjljj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"dzdrjj",a.dzdrjj)}}},[t._v(t._s(a.dzdrjj))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"dgb",a.dgb)}}},[t._v(t._s(a.dgb))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"wtzs",a.wtzs)}}},[t._v(t._s(a.wtzs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtgz(a.cpxbh,"ylbl",a.ylbl)}}},[t._v(t._s(a.ylbl))])])])}))])])},staticRenderFns:[]};var c=e("VU/8")(n,l,!1,function(t){e("aFMK")},"data-v-493de649",null);a.a=c.exports},UHa9:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});e("t5DY");var n=e("mmiC"),l=e("oFuF"),c={data:function(){return{gczdList:[],dwlxList:[{label:"1",mc:"学校"},{label:"0",mc:"金智"},{label:"2",mc:"合作伙伴"}],gczd:"",dwlx:"",reportList:[]}},methods:{handleWtgz:function(t){t.qyzd=this.gczd,t.dwlx=this.dwlx,t.lx=0;var a=this.$router.resolve({path:"/report-list/questionlist.html",query:t});window.open(a.href,"_blank")},exportTable:function(){window.open(window.baseurl+"report/exportylWtReportByCpx.do?dwlx="+this.dwlx+"&qyzd="+this.gczd+"&lx=0")},handleDWLX:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.dwlx=a,this.ylWtReportByCpx())},handleGCZD:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.gczd=a,this.ylWtReportByCpx())},ylWtReportByCpx:function(){var t=this;Object(n.e)({curPage:1,pageSize:99999,qyzd:this.gczd,dwlx:this.dwlx,cpxbh:"",sjlb:"",lx:0,keyword:""}).then(function(a){var e=a.data;"success"==e.state?t.reportList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})}},mounted:function(){null==Object(l.n)("gczd")?Object(l.i)("gczd",this.gczdList,!0):this.gczdList=Object(l.n)("gczd"),this.ylWtReportByCpx()},activated:function(){},watch:{},components:{reportTable:e("LzdB").a}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"query-condition"},[e("div",[e("p",{staticClass:"query-title"},[t._v("区域工程:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleGCZD}},[e("span",{class:{"bg-active":""==t.gczd},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(a,n){return e("span",{key:n,class:{"bg-active":t.gczd==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("单位类型:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleDWLX}},[e("span",{class:{"bg-active":""==t.dwlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.dwlxList,function(a,n){return e("span",{class:{"bg-active":t.dwlx==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)])]),t._v(" "),e("div",{staticStyle:{"text-align":"right",margin:"10px 0"}},[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.exportTable}},[t._v("导出")])],1),t._v(" "),e("div",[e("report-table",{attrs:{tableData:t.reportList},on:{handleWtgz:t.handleWtgz}})],1)])},staticRenderFns:[]};var d=e("VU/8")(c,i,!1,function(t){e("6ajx")},null,null);a.default=d.exports},aFMK:function(t,a){}});
//# sourceMappingURL=36.8b3c5ae3df1925afa66a.js.map