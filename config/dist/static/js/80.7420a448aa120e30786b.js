webpackJsonp([80],{Pelv:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={data:function(){return{tableHeight:window.innerHeight-120,tableData:[],currentPage:1,pageSize:50,total:0,Data:{},id:"",headData:[],title:""}},mounted:function(){switch(this.$route.params.id){case"school":this.title="区域学校用户 — 学校列表",document.title="区域学校用户 — 学校";break;case"user":this.title="区域学校用户 — 用户列表",document.title="区域学校用户 — 用户列表";break;case"project":this.title="区域学校用户 — 项目列表",document.title="区域学校用户 — 项目列表"}this.getDetailData(1)},methods:{handleScope:function(t,e){console.log(t),console.log(e)},getDetailData:function(t){this.Data=this.$route.query,this.Data.curPage=t,this.Data.pageSize=this.pageSize,this.queryRegionSchoolDetailData(this.Data)},queryRegionSchoolDetailData:function(t){var e=this;this.$get(this.API.queryRegionSchoolDetailData,t).then(function(t){"success"==t.state&&(e.tableData=t.data.body.rows,e.headData=t.data.head,e.total=t.data.body.records)})},handleCurrentChange:function(t){this.currentPage=t,this.getDetailData(t)},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getDetailData(1)}},components:{tableLayout:a("P+gh").a}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pd-10"},[a("tableLayout",{attrs:{title:t.title}},[a("div",{attrs:{slot:"bottom"},slot:"bottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","max-height":t.tableHeight}},t._l(t.headData,function(e,i){return a("el-table-column",{key:i,attrs:{label:e.zh,"show-overflow-tooltip":"",width:"项目经理"==e.zh||"是否在谈"==e.zh||"是否购销"==e.zh?100:"项目名称"==e.zh?300:""},scopedSlots:t._u([{key:"default",fn:function(n){return[a("span",{on:{click:function(a){t.handleScope(n,e)}}},[t._v(t._s(n.row[i]))])]}}])})})),t._v(" "),a("div",{staticClass:"project-fbtable mg-12",attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[20,50,70,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])],1)},staticRenderFns:[]};var o=a("VU/8")(i,n,!1,function(t){a("WWvw")},"data-v-c03ee32a",null);e.default=o.exports},WWvw:function(t,e){}});
//# sourceMappingURL=80.7420a448aa120e30786b.js.map