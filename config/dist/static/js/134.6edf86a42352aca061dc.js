webpackJsonp([134],{"23ik":function(t,e){},z9F7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("oFuF");var s={data:function(){return{tableHeight:window.innerHeight-310,currentPage:1,pageSize:15,records:0,filterData:{keyword:"",gcdq:"",shzt:""},gcdqList:[{label:"全部",id:""},{label:"南区",id:"南区"},{label:"北区",id:"北区"},{label:"其他",id:"其他"}],shztList:[{label:"全部",id:""},{label:"未审核",id:"0"},{label:"审核通过",id:"1"},{label:"审核不通过",id:"2"},{label:"已冲账",id:"3"}],tableData:[],userGroup:"",jssqwidArr:[]}},mounted:function(){this.queryJsData(),this.userGroup=JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag},methods:{handleSetCz:function(){var t=this;this.$post(this.API.setCz,{jssqwids:this.jssqwidArr.join(",")}).then(function(e){"success"==e.state?(t.$message({message:"设置成功",type:"success"}),t.queryJsData()):t.$message({message:"设置成功",type:"success"})})},handleSelectionChange:function(t){var e=this;this.jssqwidArr=[],t.forEach(function(t){e.jssqwidArr.push(t.jssqwid)})},checkboxInit:function(t,e){return"审核通过"==t.shzt},handleSearch:function(){this.currentPage=1,this.queryJsData()},handleExport:function(){window.open(window.baseurl+"jsxx/exportJsData.do?keyword="+this.filterData.keyword+"&gcdq="+this.filterData.gcdq+"&shzt="+this.filterData.shzt+"&isReview=1")},CheckGcdz:function(t){this.filterData.gcdq=t,this.currentPage=1,this.queryJsData()},CheckSfsh:function(t){this.filterData.shzt=t,this.currentPage=1,this.queryJsData()},handleCurrentChange:function(t){this.currentPage=t,this.queryJsData()},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.queryJsData()},handleClick:function(t){var e=this.$router.resolve({path:"/projectSettleAuditDetail",query:{wid:t.jssqwid,fbbh:t.fbbh}});window.open(e.href,"_blank")},queryJsData:function(){var t=this;this.$get(this.API.queryJsData,{curPage:this.currentPage,pageSize:this.pageSize,gcdq:this.filterData.gcdq,shzt:this.filterData.shzt,isReview:1,keyword:this.filterData.keyword}).then(function(e){"success"==e.state?(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.records=e.data.records):t.$message({message:e.msg,type:"error"})})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project_settle"},[a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title",staticStyle:{padding:"2px 4px","margin-right":"10px"}},[t._v("高级查询:")]),t._v(" "),a("el-input",{staticClass:"search-input",staticStyle:{width:"500px"},attrs:{placeholder:"请输入项目编号/项目名称/合同编号/项目经理/学校","prefix-icon":"el-icon-search",size:"small"},on:{change:t.handleSearch},model:{value:t.filterData.keyword,callback:function(e){t.$set(t.filterData,"keyword",e)},expression:"filterData.keyword"}}),t._v("\n\t\t　\n\t\t"),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleSearch}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),-1!=t.userGroup.indexOf("JYGL")?a("div",{staticStyle:{margin:"10px 0"},attrs:{flex:""}},[a("span",{staticClass:"query-title"},[t._v("工程大区:")]),t._v(" "),a("p",{staticClass:"query-list",staticStyle:{width:"90%"}},t._l(t.gcdqList,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.filterData.gcdq},on:{click:function(a){t.CheckGcdz(e.id)}}},[t._v(t._s(e.label))])}))]):t._e(),t._v(" "),a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title"},[t._v("是否审核:")]),t._v(" "),a("p",{staticClass:"query-list"},t._l(t.shztList,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.filterData.shzt},on:{click:function(a){t.CheckSfsh(e.id)}}},[t._v(t._s(e.label))])}))]),t._v(" "),a("br"),t._v(" "),a("div",[a("el-button",{attrs:{size:"mini",type:"danger",disabled:!t.jssqwidArr.length},on:{click:t.handleSetCz}},[t._v("设置冲账")]),a("br"),a("br"),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","max-height":t.tableHeight},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",selectable:t.checkboxInit}}),t._v(" "),a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.row)}}},[t._v(t._s("已结算"==e.row.shzt?"审核":"详情"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"fbmc",label:"分包名称",fixed:"left","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"lcbmc",label:"结算点",fixed:"left","min-width":"140","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"是否审核",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{size:"mini",type:"未审核"==e.row.shzt||"审核不通过"==e.row.shzt?"info":"success"}},[t._v(t._s(e.row.shzt))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"shzt",label:"结算状态",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sqjsrxm",label:"申请人",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"shrq",label:"审核日期",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sqjsrq",label:"申请时间",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbbh",label:"分包编号",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"htbh",label:"合同编号",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbssfy",label:"中标实施金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbekfy",label:"中标二开金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbkbfy",label:"中标可变金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jsssfy",label:"结算实施金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jsekfy",label:"结算二开金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jskbfy",label:"结算可变金额",width:"110"}})],1),t._v(" "),a("div",[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.records},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var i=a("VU/8")(s,l,!1,function(t){a("23ik")},"data-v-20c69d21",null);e.default=i.exports}});
//# sourceMappingURL=134.6edf86a42352aca061dc.js.map