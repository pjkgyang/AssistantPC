webpackJsonp([114],{"0O1/":function(t,e){},"8Yg6":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("kFt9"),o={data:function(){return{show:!1,currentPageLcb:1,pageSizeLcb:15,totalLcb:0,currentPageWt:1,pageSizeWt:15,totalWt:0,tableDataLcb:[],tableDataWt:[],pzxqData:[],xmbh:"",isAll:""}},mounted:function(){this.pageHomePageMonthWorkDetail(),this.pageHomePageMonthQuestionDetail()},methods:{handleSizeChangeLcb:function(t){this.pageSizeLcb=t,this.currentPageLcb=1,this.pageHomePageMonthWorkDetail()},handleCurrentChangeLcb:function(t){this.currentPageLcb=t,this.pageHomePageMonthWorkDetail()},handleSizeChangeWt:function(t){this.pageSizeWt=t,this.currentPageWt=1,this.pageHomePageMonthQuestionDetail()},handleCurrentChangeWt:function(t){this.currentPageWt=t,this.pageHomePageMonthQuestionDetail()},pageHomePageMonthWorkDetail:function(){var t=this;this.$get(this.API.pageHomePageMonthWorkDetail,{curPage:this.currentPageLcb,pageSize:this.pageSizeLcb,xmbh:this.$route.query.xmbh,isAll:this.$route.query.isAll}).then(function(e){"success"==e.state&&(e.data.rows?t.tableDataLcb=e.data.rows:t.tableDataLcb=[],t.totalLcb=e.data.records)})},pageHomePageMonthQuestionDetail:function(){var t=this;this.$get(this.API.pageHomePageMonthQuestionDetail,{curPage:this.currentPageWt,pageSize:this.pageSizeWt,xmbh:this.$route.query.xmbh,isAll:this.$route.query.isAll}).then(function(e){"success"==e.state&&(e.data.rows?t.tableDataWt=e.data.rows:t.tableDataWt=[],t.totalWt=e.data.records)})},getLogCommentsForHomePageDetail:function(t){var e=this;this.$get(this.API.getLogCommentsForHomePageDetail,{wid:t,isAll:this.$route.query.isAll}).then(function(t){"success"==t.state&&(t.data?e.pzxqData=t.data:e.pzxqData=[])})},handleCheckpzDetail:function(t){this.getLogCommentsForHomePageDetail(t),this.show=!this.show}},components:{tableLayout:a("P+gh").a,pzxqDialog:l.a}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rbpzDetail"},[a("div",[a("tableLayout",[a("section",{attrs:{slot:"top"},slot:"top"},[a("h4",[t._v("月报 - 里程碑工作")])]),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableDataLcb,border:""}},[a("el-table-column",{attrs:{label:"批注",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckpzDetail(e.row.zgzWid)}}},[t._v(t._s(e.row.pzzs)+"人批注")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称",width:"350","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmnr_display",label:"项目内容","min-width":"300","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"lcbms_display",label:"里程碑描述",width:"180","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cnjssj",label:"承诺完成时间",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jhjssj",label:"计划完成时间",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zt_display",label:"完成状态",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"wwcyy",label:"未完成原因",width:"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"hxcs",label:"后续措施",width:"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"wglg",label:"完工量（元）",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"yhmc",label:"创建人",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cjsj",label:"创建时间",width:"155"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmjlxm",label:"项目经理",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zddzxm",label:"战队队长",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zrrxm",label:"责任人",width:"100"}})],1),t._v(" "),a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPageLcb,"page-sizes":[15,25,35,50],"page-size":t.pageSizeLcb,layout:"total, sizes, prev, pager, next, jumper",total:t.totalLcb},on:{"size-change":t.handleSizeChangeLcb,"current-change":t.handleCurrentChangeLcb}})],1)],1)]),t._v(" "),a("tableLayout",[a("section",{attrs:{slot:"top"},slot:"top"},[a("h4",[t._v("月报 - 问题")])]),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableDataWt,border:""}},[a("el-table-column",{attrs:{label:"批注",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckpzDetail(e.row.wid)}}},[t._v(t._s(e.row.pzzs)+"人批注")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"wtbt",label:"问题标题",width:"250",fixed:"left","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbrxm",label:"发布人",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"fbrssdw",label:"发布人所属单位",width:"300","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"所属项目",width:"300","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpmc",label:"所属产品",width:"300","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"wtlb_display",label:"问题类别",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sfjj_display",label:"是否紧急",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"wtlc",label:"当前处理环节",width:"140"}}),t._v(" "),a("el-table-column",{attrs:{prop:"qwjjsj",label:"期望解决时间",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cnjjsj",label:"承诺解决时间",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"zt_display",label:"问题状态",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"wwcyy",label:"未完成原因",width:"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"hxcs",label:"后续措施",width:"200","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"yhmc",label:"创建人",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cjsj",label:"创建时间",width:"155"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cljh",label:"处理计划",width:"200","show-overflow-tooltip":""}})],1),t._v(" "),a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPageWt,"page-sizes":[100,200,300,400],"page-size":t.pageSizeWt,layout:"total, sizes, prev, pager, next, jumper",total:t.totalWt},on:{"size-change":t.handleSizeChangeWt,"current-change":t.handleCurrentChangeWt}})],1)],1)])],1),t._v(" "),a("pzxqDialog",{attrs:{show:t.show,tableData:t.pzxqData},on:{"update:show":function(e){t.show=e}}})],1)},staticRenderFns:[]};var s=a("VU/8")(o,r,!1,function(t){a("0O1/")},"data-v-5028a018",null);e.default=s.exports}});
//# sourceMappingURL=114.40c592cc3c6643d545cb.js.map