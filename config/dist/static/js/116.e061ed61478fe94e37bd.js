webpackJsonp([116],{Od7L:function(t,e){},zYNi:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("oFuF");var l={data:function(){return{height:window.innerHeight-250,dialogVisible:!1,currentPage:1,pageSize:15,total:0,records:0,filterData:{keyword:"",gcdq:"",sfzb:""},gcdqList:[{label:"全部",id:""},{label:"南区",id:"南区"},{label:"北区",id:"北区"},{label:"其他",id:"其他"}],sfzbList:[{label:"全部",id:""},{label:"已中标",id:"1"},{label:"未中标",id:"0"}],tableData:[],userGroup:""}},mounted:function(){this.fbManage(),this.userGroup=JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag},methods:{handleSearch:function(){this.fbManage()},handleExport:function(){window.open(window.baseurl+"fbxx/exportFbManage.do?keyword="+this.filterData.keyword+"&gcdq="+this.filterData.gcdq+"&sfzb="+this.filterData.sfzb+"&isfb=0")},CheckGcdz:function(t){this.filterData.gcdq=t,this.currentPage=1,this.fbManage()},CheckSfsh:function(t){this.filterData.sfzb=t,this.currentPage=1,this.fbManage()},handleCurrentChange:function(t){this.currentPage=t,this.fbManage()},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.fbManage()},handleClick:function(t){this.dialogVisible=!this.dialogVisible;var e=this.$router.resolve({path:"/projectbiddetail",query:{fbbh:t.fbbh,xmmc:t.xmmc}});window.open(e.href,"_blank")},fbManage:function(){var t=this;this.$get(this.API.fbManage,{curPage:this.currentPage,pageSize:this.pageSize,sfzb:this.filterData.sfzb,gcdq:this.filterData.gcdq,isfb:0,keyword:this.filterData.keyword}).then(function(e){"success"==e.state?(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.total=e.data.total,t.records=e.data.records):t.$message({message:e.msg,type:"error"})})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project_fbsh"},[a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title",staticStyle:{padding:"2px 4px","margin-right":"10px"}},[t._v("高级查询:")]),t._v(" "),a("el-input",{staticClass:"search-input",staticStyle:{width:"500px"},attrs:{placeholder:"请输入项目编号/项目名称/合同编号/项目经理/学校","prefix-icon":"el-icon-search",size:"small"},on:{change:t.handleSearch},model:{value:t.filterData.keyword,callback:function(e){t.$set(t.filterData,"keyword",e)},expression:"filterData.keyword"}}),t._v("\n\t\t　\n\t\t"),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleSearch}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),-1!=t.userGroup.indexOf("JYGL")?a("div",{staticStyle:{margin:"10px 0"},attrs:{flex:""}},[a("span",{staticClass:"query-title"},[t._v("工程大区:")]),t._v(" "),a("p",{staticClass:"query-list",staticStyle:{width:"90%"}},t._l(t.gcdqList,function(e){return a("span",{class:{"bg-active":e.id==t.filterData.gcdq},on:{click:function(a){t.CheckGcdz(e.id)}}},[t._v(t._s(e.label))])}))]):t._e(),t._v(" "),a("div",{attrs:{flex:""}},[a("span",{staticClass:"query-title"},[t._v("是否中标:")]),t._v(" "),a("p",{staticClass:"query-list"},t._l(t.sfzbList,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.filterData.sfzb},on:{click:function(a){t.CheckSfsh(e.id)}}},[t._v(t._s(e.label))])}))]),t._v(" "),a("br"),t._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","max-height":t.height}},[a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.row)}}},[t._v("详情")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称",fixed:"left","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号"}}),t._v(" "),a("el-table-column",{attrs:{label:"分包状态",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n\t\t\t\t\t"+t._s("02"==e.row.fbzt?"审核中":"03"==e.row.fbzt?"招标中":"04"==e.row.fbzt?"审核未通过":"05"==e.row.fbzt?"分包结束":"分包关闭")+"\n\t\t\t\t")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"htbh",label:"合同编号","min-width":"130","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xx",label:"学校","min-width":"200"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jf",label:"甲方",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbbh",label:"分包编号","min-width":"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbmc",label:"分包名称","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"sfzb",label:"是否中标",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbje",label:"分包金额",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ssfy",label:"实施金额",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ekfy",label:"二开金额",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"kbfy",label:"可变金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbgs",label:"投标个数",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbrxm",label:"中标人",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbje",label:"中标金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbssfy",label:"中标实施金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbekfy",label:"中标二开金额",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zbkbfy",label:"中标可变费用",width:"110"}})],1),t._v(" "),a("div",[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.records},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var r=a("VU/8")(l,i,!1,function(t){a("Od7L")},"data-v-4be317a4",null);e.default=r.exports}});
//# sourceMappingURL=116.e061ed61478fe94e37bd.js.map