webpackJsonp([68],{"+45T":function(t,a){},BXYQ:function(t,a){},wo4C:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});e("t5DY"),e("mmiC");var s=e("oFuF"),r={data:function(){return{thList:[],tdList:[],limit:"",object:{}}},updated:function(){this.limit=this.tableData.length},methods:{handleWtpfQy:function(t,a,e){this.object={},this.object[a]=e,this.object.username=t.username,this.$emit("handleWtpfQy",this.object)}},computed:{},props:{tableData:{type:Array,default:function(){return[]}},total:{type:Object,default:function(){return{}}},nowPage:{type:Number,default:1}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"out-table"},[e("table",{staticClass:"table table-xjpm-gr",attrs:{border:""}},[e("thead",[0!=t.tableData.length?e("tr",[e("th",[t._v(t._s(t.tableData[0].username))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].nickname))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].qymc))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].star1))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].star2))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].star3))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].star4))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].star5))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].starbad))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].staravg))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].wtgbs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].wtzs))]),t._v(" "),e("th",[t._v(t._s(t.tableData[0].zgs))])]):t._e()]),t._v(" "),e("tbody",t._l([].concat(t.tableData).splice(1,t.limit-1),function(a,s){return 0!=t.tableData.length?e("tr",{key:s},[e("td",{attrs:{title:a.username}},[t._v(t._s(a.username))]),t._v(" "),e("td",{attrs:{title:a.nickname}},[t._v(t._s(a.nickname))]),t._v(" "),e("td",{attrs:{title:a.qymc}},[t._v(t._s(a.qymc))]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtpfQy(a,"star1",a.star1)}}},[t._v(t._s(a.star1))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtpfQy(a,"star2",a.star2)}}},[t._v(t._s(a.star2))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtpfQy(a,"star3",a.star3)}}},[t._v(t._s(a.star3))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtpfQy(a,"star4",a.star4)}}},[t._v(t._s(a.star4))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtpfQy(a,"star5",a.star5)}}},[t._v(t._s(a.star5))])]),t._v(" "),e("td",[t._v(t._s(a.starbad))]),t._v(" "),e("td",[t._v(t._s(a.staravg))]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtpfQy(a,"wtgbs",a.wtgbs)}}},[t._v(t._s(a.wtgbs))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(e){t.handleWtpfQy(a,"wtzs",a.wtzs)}}},[t._v(t._s(a.wtzs))])]),t._v(" "),e("td",[t._v(t._s(a.zgs))])]):t._e()}))])])},staticRenderFns:[]};var n={data:function(){return{gczdList:[],cpxline:[],dwlxList:[{label:"1",mc:"学校"},{label:"2",mc:"合作伙伴"}],xmlxList:[],gczd:"",xmlx:"",dwlx:"1",cpx:"",cpxmc:"",sjlb:"0",grpmList:[],ksrqValue:"",jsrqValue:"",keyword:"",currentPage:1,total:null,nowPage:null}},methods:{handleCheckDate:function(){this.nowPage=0,this.WtReportOrderStar(1)},handleCurrentChange:function(t){this.WtReportOrderStar(t),this.nowPage=t-1},handleSearch:function(){this.nowPage=0,this.WtReportOrderStar(1)},handleSearchBtn:function(){this.nowPage=0,this.WtReportOrderStar(1)},handleWtpfQy:function(t){t.gbsjStart=this.ksrqValue,t.gbsjEnd=this.jsrqValue,t.keyword=this.keyword,t.qyzd=this.gczd,t.cpxbh=this.cpx,t.dwlx=this.dwlx,t.xmlx=this.xmlx,t.lx=5;var a=this.$router.resolve({path:"/report-list/questionPflist.html",query:t});window.open(a.href,"_blank")},exportTable:function(){window.open(window.baseurl+"report/exportWtReportOrderStar.do?gbsjStart="+this.ksrqValue+"&gbsjEnd="+this.jsrqValue+"&dwlx="+this.dwlx+"&cpxbh="+this.cpx+"&xmlx="+this.xmlx+"&qyzd="+this.gczd+"&lx=5&keyword="+this.keyword)},handleGCZD:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.gczd=a,this.nowPage=0,this.WtReportOrderStar(1))},handleDWLX:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.dwlx=a,this.nowPage=0,this.WtReportOrderStar(1))},handleXMLX:function(t){var a=t.target.getAttribute("data-type");null!=a&&(this.xmlx=a,this.nowPage=0,this.WtReportOrderStar(1))},handleCPX:function(t){var a=t.target.getAttribute("data-type");this.cpxmc=t.target.getAttribute("data-mc"),null!=a&&(this.cpx=a,this.nowPage=0,this.WtReportOrderStar(1))},WtReportOrderStar:function(t){var a=this;this.$get(this.API.WtReportOrderStar,{curPage:t,pageSize:10,gbsjStart:this.ksrqValue,gbsjEnd:this.jsrqValue,lx:5,qyzd:this.gczd,cpxbh:this.cpx,dwlx:this.dwlx,xmlx:this.xmlx,keyword:this.keyword}).then(function(e){"success"==e.state?(a.grpmList=e.data.rows,a.total=e.data.records,1==t&&(a.currentPage=1)):a.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})}},mounted:function(){null==Object(s.n)("cpx")?(Object(s.i)("cpx",this.cpxline,!0),Object(s.i)("gczd",this.gczdList,!0),Object(s.i)("ProjectCustomStatus",this.xmlxList,"")):(this.cpxline=Object(s.n)("cpx"),this.gczdList=Object(s.n)("gczd"),this.xmlxList=Object(s.n)("ProjectCustomStatus")),this.WtReportOrderStar(1)},activated:function(){},watch:{},components:{tablexjpmGr:e("VU/8")(r,i,!1,function(t){e("+45T")},"data-v-071ac5c1",null).exports,pagination:e("9A7R").a}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"query-condition"},[e("div",[e("p"),e("p",{staticClass:"query-title"},[t._v("高级搜索")]),t._v(" "),e("el-input",{staticStyle:{width:"260px"},attrs:{size:"mini",placeholder:"请输入工号/姓名"},on:{change:t.handleSearch},model:{value:t.keyword,callback:function(a){t.keyword=a},expression:"keyword"}}),t._v("　\n            "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleSearchBtn}},[t._v("查询")]),t._v(" "),e("p")],1),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("关闭时间:")]),t._v(" "),e("p",[e("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.ksrqValue,callback:function(a){t.ksrqValue=a},expression:"ksrqValue"}}),t._v("　  \n                至　 "),e("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.jsrqValue,callback:function(a){t.jsrqValue=a},expression:"jsrqValue"}})],1),t._v("　 \n             "),e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCheckDate}},[t._v("查询")])],1),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("区域工程:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleGCZD}},[e("span",{class:{"bg-active":""==t.gczd},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(a,s){return e("span",{key:s,class:{"bg-active":t.gczd==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("产品线:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleCPX}},[e("span",{class:{"bg-active":""==t.cpx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.cpxline,function(a,s){return e("span",{class:{"bg-active":t.cpx==a.label},attrs:{"data-mc":a.mc,"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("单位类型:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleDWLX}},[e("span",{class:{"bg-active":""==t.dwlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.dwlxList,function(a,s){return e("span",{class:{"bg-active":t.dwlx==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)]),t._v(" "),e("div",[e("p",{staticClass:"query-title"},[t._v("项目类型:")]),t._v(" "),e("p",{staticClass:"query-list",on:{click:t.handleXMLX}},[e("span",{class:{"bg-active":""==t.xmlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.xmlxList,function(a,s){return e("span",{class:{"bg-active":t.xmlx==a.label},attrs:{"data-type":a.label}},[t._v(t._s(a.mc))])})],2)])]),t._v(" "),e("div",{staticStyle:{"text-align":"right",margin:"10px 0"}},[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.exportTable}},[t._v("导出")])],1),t._v(" "),e("div",[e("tablexjpmGr",{attrs:{tableData:t.grpmList,nowPage:t.nowPage},on:{handleWtpfQy:t.handleWtpfQy}}),t._v(" "),e("div",{staticStyle:{"text-align":"right"}},[e("pagination",{attrs:{currentPage:t.currentPage,pageSize:10,total:t.total},on:{handleCurrentChange:t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var c=e("VU/8")(n,l,!1,function(t){e("BXYQ")},null,null);a.default=c.exports}});
//# sourceMappingURL=68.80213706ae95daf591ec.js.map