webpackJsonp([87],{Rq33:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("oFuF");var r={data:function(){return{currentPage:1,pageSize:15,records:0,filterData:{keyword:"",qrzt:""},qrztList:[{label:"",mc:"全部"},{label:"0",mc:"未确认"},{label:"1",mc:"已确认"}],tableData:[{},{}]}},mounted:function(){},methods:{handleSearch:function(){this.currentPage=1,this.getFbshList()},SearchItem:function(){this.currentPage=1,this.getFbshList()},handleExport:function(){},CheckGcdz:function(t){this.currentPage=1,this.filterData.gcdq=t,this.getFbshList()},CheckSfsh:function(t){this.currentPage=1,this.filterData.shzt=t||"",this.getFbshList()},handleCurrentChange:function(t){this.currentPage=t,this.getFbshList()},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.getFbshList()},handleClick:function(t){var e=this.$router.resolve({path:"/projectfbshdetail",query:{xmbh:t.xmbh,fbbh:t.fbbh}});window.open(e.href,"_blank")},getFbshList:function(){var t=this;this.$get(this.API.fbManage,{curPage:this.currentPage,pageSize:this.pageSize,gczq:this.filterData.gcdq,shzt:this.filterData.shzt,keyword:this.filterData.keyword}).then(function(e){"success"==e.state?(e.data.rows&&(t.tableData=e.data.rows),t.records=e.data.records):t.$message({message:e.msg,type:"error"})})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project_fbsh"},[a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title",staticStyle:{padding:"2px 4px","margin-right":"10px"}},[t._v("高级查询:")]),t._v(" "),a("el-input",{staticClass:"search-input",staticStyle:{width:"500px"},attrs:{placeholder:"请输入项目编号/项目名称/合同编号/项目经理/学校","prefix-icon":"el-icon-search",size:"small"},on:{change:t.SearchItem},model:{value:t.filterData.keyword,callback:function(e){t.$set(t.filterData,"keyword",e)},expression:"filterData.keyword"}}),t._v("\n\t\t　\n\t\t"),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleSearch}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title"},[t._v("确认状态:")]),t._v(" "),a("p",{staticClass:"query-list"},t._l(t.qrztList,function(e){return a("span",{key:e.label,class:{"bg-active":e.label==t.filterData.qrzt},on:{click:function(a){t.CheckQrzt(e.label)}}},[t._v(t._s(e.mc))])}))]),t._v(" "),a("br"),t._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.row)}}},[t._v("确认")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","min-width":"280","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmnr",label:"项目内容","min-width":"280"}}),t._v(" "),a("el-table-column",{attrs:{prop:"qzrq",label:"签字日期",width:"110","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"jhksrq",label:"售后计划开始时间",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zt",label:"状态",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"htje",label:"合同金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"htmsr",label:"合同毛收入",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"czsj",label:"操作时间",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tjrxm",label:"提交人",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tjrq",label:"提交日期",width:"110"}})],1),t._v(" "),a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.records},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var i=a("VU/8")(r,l,!1,function(t){a("bBH8")},"data-v-92d7fe08",null);e.default=i.exports},bBH8:function(t,e){}});
//# sourceMappingURL=87.81c11ab835c060b5e554.js.map