webpackJsonp([93],{GrVa:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"zdsfw-layout"},[a("div",{staticClass:"filter"},[a("span",{staticClass:"filter-weight"},[t._v("关键字查询:")]),t._v(" "),a("el-input",{staticStyle:{width:"50%"},attrs:{type:"text",size:"mini",placeholder:"项目编号/项目名称/学校"},on:{change:t.handleSearchKeyword},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"xx",label:"学校","min-width":"160","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"90","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpmc",label:"产品名称","min-width":"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"fwnr",label:"服务内容","min-width":"140","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"tbsj",label:"提报时间",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zrr",label:"责任人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fxms",label:"风险描述",width:"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"风险等级(解决情况)",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return["-"!=e.row.fxdj?a("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheck(e.row)}}},[a("el-tag",{class:{"zdsfw-fxdj-s1":1==e.row.fxdj,"zdsfw-fxdj-s2":2==e.row.fxdj,"zdsfw-fxdj-s3":3==e.row.fxdj},attrs:{size:"mini"}},[t._v(t._s(1==e.row.fxdj?"S1":2==e.row.fxdj?"S2":"S3"))]),t._v(" \n\t\t      ")],1):t._e(),t._v(" "),"-"==e.row.fxdj?a("span",[t._v(t._s(e.row.fxdj))]):t._e(),t._v(" "),a("span",{staticStyle:{"font-size":"12px"}},[t._v(t._s(0==e.row.fxsfcl?"(无需处理)":1==e.row.fxsfcl?"(已处理)":e.row.fxsfcl))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"风险状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{size:"mini",type:"1"==e.row.zt?"success":"primary"}},[t._v("\n\t\t\t\t\t"+t._s("0"==e.row.zt?"待处理":"1"==e.row.zt?"已处理":"无需处理")+"\n\t\t\t\t")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"clsj",label:"处理时间",width:"160"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gs",label:"工时"}})],1),t._v(" "),a("br"),t._v(" "),a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.curPage,"page-sizes":[20,40,70,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var r=a("Z0/y")({data:function(){return{tableData:[],curPage:1,pageSize:20,total:0,keyword:""}},methods:{handleSizeChange:function(t){this.curPage=1,this.pageSize=t,this.pageActiveServiceRisk()},handleCurrentChange:function(t){this.curPage=t,this.pageActiveServiceRisk()},handleSearchKeyword:function(){this.curPage=1,this.pageActiveServiceRisk()},pageActiveServiceRisk:function(){var t=this;this.$get(this.API.pageActiveServiceRisk,{curPage:this.curPage,pageSize:this.pageSize,keyword:this.keyword}).then(function(e){"success"==e.state?(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.total=e.data.records):t.$message({message:e.msg,type:"error"})})}},mounted:function(){this.pageActiveServiceRisk()}},l,!1,function(t){a("yuJl")},"data-v-45a4083b",null);e.default=r.exports},yuJl:function(t,e){}});
//# sourceMappingURL=93.be7f331d6b95841ce868.js.map