webpackJsonp([81],{I52y:function(t,e){},UwRw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{tableData:[],currentPage:1,pageSize:20,records:0}},mounted:function(){this.tbManage()},methods:{handleClick:function(t,e){var a=this;if("swzb"==e)this.$confirm("是否确认设为中标?","提示",{cancelButtonText:"再想想",confirmButtonText:"确定",type:"warning"}).then(function(){a.$post(a.API.setBid,{fbbh:a.$route.query.fbbh,tbbh:t.tbbh}).then(function(t){"success"==t.state?(a.$message({message:"已设为中标",type:"success"}),a.tbManage()):a.$message({message:t.msg,type:"warning"})})}).catch(function(){});else{var n=this.$router.resolve({path:"/biddetail",query:{fbbh:t.fbbh,tbbh:t.tbbh,xmmc:this.$route.query.xmmc}});window.open(n.href,"_blank")}},handleCurrentChange:function(t){this.currentPage=t,this.tbManage()},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.tbManage()},tbManage:function(){var t=this;this.$get(this.API.tbManage,{curPage:this.currentPage,pageSize:this.pageSize,fbbh:this.$route.query.fbbh}).then(function(e){"success"==e.state&&(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.records=e.data.records)})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"project_fbsh"},[t._m(0),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return["1"==e.row.sfswzb?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.row,"swzb")}}},[t._v("设为中标")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){t.handleClick(e.row,"xq")}}},[t._v("详情")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"sfzb",label:"是否中标",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbmc",label:"分包名称","min-width":"240"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbrxm",label:"投标人",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbrq",label:"投标时间","min-width":"130"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbssfy",label:"投标实施金额","min-width":"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbekfy",label:"投标二开金额","min-width":"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbkbfy",label:"投标可变金额","min-width":"110"}})],1),t._v(" "),a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[20,50,70,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.records},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{"text-center":""}},[e("h4",[this._v("项目中标详情")])])}]};var s=a("VU/8")(n,r,!1,function(t){a("I52y")},"data-v-bd8882b0",null);e.default=s.exports}});
//# sourceMappingURL=81.1eb50f400fe945782e3d.js.map