webpackJsonp([98],{OWkp:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("oFuF");var l={data:function(){return{height:window.innerHeight-260,currentPage:1,pageSize:15,records:0,filterData:{keyword:"",gcdq:"",jszt:"0"},gcdqList:[{label:"全部",id:""},{label:"南区",id:"南区"},{label:"北区",id:"北区"},{label:"其他",id:"其他"}],jsztList:[{label:"全部",id:""},{label:"已结算",id:"1"},{label:"未结算",id:"0"}],tableData:[],userGroup:""}},mounted:function(){this.queryJsData(),this.userGroup=JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag},methods:{handleSearch:function(){this.currentPage=1,this.queryJsData()},handleExport:function(){window.open(window.baseurl+"jsxx/exportJsData.do?keyword="+this.filterData.keyword+"&gcdq="+this.filterData.gcdq+"&sfjs="+this.filterData.jszt+"&isjs=1")},CheckGcdz:function(t){this.filterData.gcdq=t,this.currentPage=1,this.queryJsData()},CheckSfsh:function(t){this.filterData.jszt=t,this.currentPage=1,this.queryJsData()},handleCurrentChange:function(t){this.currentPage=t,this.queryJsData()},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.queryJsData()},handleClick:function(t){var e=this.$router.resolve({path:"/projectsettledetail",query:{wid:t.jssqwid,fbbh:t.fbbh}});window.open(e.href,"_blank")},queryJsData:function(){var t=this;this.$get(this.API.queryJsData,{curPage:this.currentPage,pageSize:this.pageSize,gcdq:this.filterData.gcdq,sfjs:this.filterData.jszt,keyword:this.filterData.keyword}).then(function(e){"success"==e.state?(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.records=e.data.records):t.$message({message:e.msg,type:"error"})})}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project_settle"},[a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title",staticStyle:{padding:"2px 4px","margin-right":"10px"}},[t._v("高级查询:")]),t._v(" "),a("el-input",{staticClass:"search-input",staticStyle:{width:"500px"},attrs:{placeholder:"请输入项目编号/项目名称/合同编号/项目经理/学校","prefix-icon":"el-icon-search",size:"small"},on:{change:t.handleSearch},model:{value:t.filterData.keyword,callback:function(e){t.$set(t.filterData,"keyword",e)},expression:"filterData.keyword"}}),t._v("\n\t\t　\n\t\t"),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleSearch}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),-1!=t.userGroup.indexOf("JYGL")?a("div",{staticStyle:{margin:"10px 0"},attrs:{flex:""}},[a("span",{staticClass:"query-title"},[t._v("工程大区:")]),t._v(" "),a("p",{staticClass:"query-list",staticStyle:{width:"90%"}},t._l(t.gcdqList,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.filterData.gcdq},on:{click:function(a){t.CheckGcdz(e.id)}}},[t._v(t._s(e.label))])}))]):t._e(),t._v(" "),a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title"},[t._v("是否结算:")]),t._v(" "),a("p",{staticClass:"query-list"},t._l(t.jsztList,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.filterData.jszt},on:{click:function(a){t.CheckSfsh(e.id)}}},[t._v(t._s(e.label))])}))]),t._v(" "),a("br"),t._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{"max-height":t.height,data:t.tableData,border:""}},[a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.row)}}},[t._v(t._s("未结算"==e.row.jszt?"结算":"详情"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"fbmc",label:"分包名称","min-width":"260",fixed:"left","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"lcbmc",label:"结算点","min-width":"150",fixed:"left","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"是否结算",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{size:"mini",type:"未结算"==e.row.jszt?"primary":"success"}},[t._v(t._s(e.row.jszt))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"shzt",label:"结算状态",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sqjsrxm",label:"申请人",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sqjsrq",label:"申请时间",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbbh",label:"分包编号",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbmc",label:"分包名称","min-width":"160","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"htbh",label:"合同编号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbssfy",label:"中标实施金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbekfy",label:"中标二开金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbkbfy",label:"中标可变金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jsssfy",label:"结算实施金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jsekfy",label:"结算二开金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jskbfy",label:"结算可变金额",width:"110"}})],1),t._v(" "),a("div",[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.records},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var i=a("Z0/y")(l,s,!1,function(t){a("TIPG")},"data-v-3bbb626d",null);e.default=i.exports},TIPG:function(t,e){}});
//# sourceMappingURL=98.95e4926b4f934fd07bc6.js.map