webpackJsonp([46],{c6Fp:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={data:function(){return{dwmc:"",detailData:{},gbData:[],gbPage:1,gbPageSize:10,gbTotal:0,shData:[],shPage:1,shPageSize:10,shTotal:0,zjData:[],zjPage:1,zjPageSize:10,zjTotal:0,yqData:[],yqPage:1,yqPageSize:10,yqTotal:0}},methods:{handleCheckDetail:function(t,a,e,s){var l={};l.dwmc=this.detailData.dw,e&&(l.xmbh=e.xmbh,l.wtxmlx="gb"==s?3:"sh"==s?2:1),l[t]=a;var i=this.$router.resolve({path:"/report-list/questionlist.html",query:l}).href;window.open(i,"_blank")},handleGbSizeChange:function(t){this.gbPageSize=t,this.gbPage=1,this.pageGbWtxm()},handleGbCurrentChange:function(t){this.gbPage=t,this.pageGbWtxm()},handleShSizeChange:function(t){this.shPageSize=t,this.shPage=1,this.pageShWtxm()},handleShCurrentChange:function(t){this.shPage=t,this.pageShWtxm()},handleZjSizeChange:function(t){this.zjPageSize=t,this.zjPage=1,this.pageZjWtxm()},handleZjCurrentChange:function(t){this.zjPage=t,this.pageZjWtxm()},handleYqSizeChange:function(t){this.yqPageSize=t,this.yqPage=1,this.pageYqRwxm()},handleYqCurrentChange:function(t){this.yqPage=t,this.pageYqRwxm()},dwtsqlmxReport:function(){var t=this;this.$get(this.API.dwtsqlmxReport,{dwmc:this.dwmc}).then(function(a){"success"==a.state?t.detailData=a.data:t.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error"})})},pageGbWtxm:function(){var t=this;this.$get(this.API.pageGbWtxm,{curPage:this.gbPage,pageSize:this.gbPageSize,dwmc:this.dwmc}).then(function(a){"success"==a.state?(t.gbData=a.data.rows,t.gbTotal=a.data.records):t.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error"})})},pageShWtxm:function(){var t=this;this.$get(this.API.pageShWtxm,{curPage:this.shPage,pageSize:this.shPageSize,dwmc:this.dwmc}).then(function(a){"success"==a.state?(t.shData=a.data.rows,t.shTotal=a.data.records):t.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error"})})},pageZjWtxm:function(){var t=this;this.$get(this.API.pageZjWtxm,{curPage:this.zjPage,pageSize:this.zjPageSize,dwmc:this.dwmc}).then(function(a){"success"==a.state?(t.zjData=a.data.rows,t.zjTotal=a.data.records):t.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error"})})},pageYqRwxm:function(){var t=this;this.$get(this.API.pageYqRwxm,{curPage:this.yqPage,pageSize:this.yqPageSize,dwmc:this.dwmc}).then(function(a){"success"==a.state?(t.yqData=a.data.rows,t.yqTotal=a.data.records):t.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error"})})}},mounted:function(){this.$route.query.dwmc?this.dwmc=unescape(this.$route.query.dwmc):this.dwmc=JSON.parse(sessionStorage.userInfo).unit,this.dwtsqlmxReport(),this.pageGbWtxm(),this.pageShWtxm(),this.pageZjWtxm(),this.pageYqRwxm()},components:{tableLayout:e("P+gh").a}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"xxts-pannel"},[e("section",{attrs:{flex:"",spacearound:""}},[e("h4",[t._v("学校名称："),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.dw))])]),t._v(" "),e("h4",[t._v("问题总数："),e("a",{staticClass:"fontRed",attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtzs",t.detailData.wtzs)}}},[t._v(t._s(t.detailData.wtzs))])]),t._v(" "),e("h4",[t._v("消耗工时总计："),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.hjgs))])])]),e("br"),t._v(" "),e("tableLayout",[e("section",{attrs:{slot:"top"},slot:"top"},[e("div",{attrs:{flex:""}},[e("h5",[t._v("改进学校环境问题总数/占比: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.w02)+"/"+t._s(t.detailData.w02zb))])]),t._v("　　\n                 "),e("h5",[t._v("改进学校环境问题处理工时: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.w02gs))])])])]),t._v(" "),e("section",{attrs:{slot:"bottom"},slot:"bottom"},[e("table",{staticClass:"table",attrs:{border:"",width:"100%"}},[e("tr",[e("th",[t._v("改进学校服务器环境")]),t._v(" "),e("th",[t._v("改进学校数据库环境")]),t._v(" "),e("th",[t._v("改进学校网络环境")]),t._v(" "),e("th",[t._v("改进学校中间件环境")])]),t._v(" "),e("tr",[e("td",[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtbq","50")}}},[t._v(t._s(t.detailData.bq50))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtbq","51")}}},[t._v(t._s(t.detailData.bq51))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtbq","52")}}},[t._v(t._s(t.detailData.bq52))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtbq","53")}}},[t._v(t._s(t.detailData.bq53))])])])])])]),t._v(" "),e("tableLayout",[e("section",{attrs:{slot:"top"},slot:"top"},[e("div",{attrs:{flex:""}},[e("h5",[t._v("加强学校培训问题总数/占比: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.w04)+"/"+t._s(t.detailData.w04zb))])]),t._v("　　\n                 "),e("h5",[t._v("加强学校培训问题处理工时: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.w04gs))])])])]),t._v(" "),e("section",{attrs:{slot:"bottom"},slot:"bottom"},[e("table",{staticClass:"table",attrs:{border:"",width:"100%"}},[e("tr",[e("th",[t._v("帮用户导数据")]),t._v(" "),e("th",[t._v("帮用户开权限")]),t._v(" "),e("th",[t._v("加强用户培训")])]),t._v(" "),e("tr",[e("td",[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtbq","61")}}},[t._v(t._s(t.detailData.bq61))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtbq","62")}}},[t._v(t._s(t.detailData.bq62))])]),t._v(" "),e("td",[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCheckDetail("wtbq","63")}}},[t._v(t._s(t.detailData.bq63))])])])])])]),t._v(" "),e("tableLayout",[e("section",{attrs:{slot:"top"},slot:"top"},[e("div",{attrs:{flex:""}},[e("h5",[t._v("过保阶段问题数/占比: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.gbxmwt)+"/"+t._s(t.detailData.gbxmwtzb))])]),t._v("　　\n                 "),e("h5",[t._v("过保阶段问题处理工时: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.gbxmwtgs))])])])]),t._v(" "),e("section",{attrs:{slot:"bottom"},slot:"bottom"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.gbData,border:"","max-height":500}},[e("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"sxrq",label:"合同签订年份",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"ysrq",label:"验收日期",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"gbts",label:"在保天数",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{label:"问题数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(e){t.handleCheckDetail("wtzs",a.row.wtzs,a.row,"gb")}}},[t._v(t._s(a.row.wtzs))])]}}])})],1),t._v(" "),e("div",{attrs:{"text-right":""}},[e("el-pagination",{attrs:{"current-page":t.gbPage,"page-sizes":[10,20,35,50],"page-size":t.gbPageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.gbTotal},on:{"size-change":t.handleGbSizeChange,"current-change":t.handleGbCurrentChange}})],1)],1)]),t._v(" "),e("tableLayout",[e("section",{attrs:{slot:"top"},slot:"top"},[e("div",{attrs:{flex:""}},[e("h5",[t._v("售后阶段问题数/占比: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.shxmwt)+"/"+t._s(t.detailData.shxmwtzb))])]),t._v("　　\n                 "),e("h5",[t._v("售后阶段问题处理工时: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.shxmwtgs))])])])]),t._v(" "),e("section",{attrs:{slot:"bottom"},slot:"bottom"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.shData,border:"","max-height":500}},[e("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"sxrq",label:"合同签订年份",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"ysrq",label:"验收日期",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"gbrq",label:"过保日期",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"zbts",label:"在保天数",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{label:"问题数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(e){t.handleCheckDetail("wtzs",a.row.wtzs,a.row,"sh")}}},[t._v(t._s(a.row.wtzs))])]}}])})],1),t._v(" "),e("div",{attrs:{"text-right":""}},[e("el-pagination",{attrs:{"current-page":t.shPage,"page-sizes":[10,20,35,50],"page-size":t.shPageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.shTotal},on:{"size-change":t.handleShSizeChange,"current-change":t.handleShCurrentChange}})],1)],1)]),t._v(" "),e("tableLayout",[e("section",{attrs:{slot:"top"},slot:"top"},[e("div",{attrs:{flex:""}},[e("h5",[t._v("在建阶段问题数/占比: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.zjxmwt)+"/"+t._s(t.detailData.zjxmwtzb))])]),t._v("　　\n                 "),e("h5",[t._v("在建阶段问题处理工时: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.zjxmwtgs))])])])]),t._v(" "),e("section",{attrs:{slot:"bottom"},slot:"bottom"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.zjData,border:"","max-height":500}},[e("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"sxrq",label:"合同签订年份",width:"200"}}),t._v(" "),e("el-table-column",{attrs:{prop:"ztztmc",label:"当前状态",width:"200"}}),t._v(" "),e("el-table-column",{attrs:{label:"问题数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("a",{attrs:{href:"javaScript:;;"},on:{click:function(e){t.handleCheckDetail("wtzs",a.row.wtzs,a.row,"zj")}}},[t._v(t._s(a.row.wtzs))])]}}])})],1),t._v(" "),e("div",{attrs:{"text-right":""}},[e("el-pagination",{attrs:{"current-page":t.zjPage,"page-sizes":[10,20,35,50],"page-size":t.zjPageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.zjTotal},on:{"size-change":t.handleZjSizeChange,"current-change":t.handleZjCurrentChange}})],1)],1)]),t._v(" "),e("tableLayout",[e("section",{attrs:{slot:"top"},slot:"top"},[e("div",[e("h5",[t._v("延期任务数: "),e("span",{staticClass:"fontRed"},[t._v(t._s(t.detailData.yqrws))])])])]),t._v(" "),e("section",{attrs:{slot:"bottom"},slot:"bottom"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.yqData,border:"","max-height":500}},[e("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),e("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"sxrq",label:"合同签订年份",width:"200"}}),t._v(" "),e("el-table-column",{attrs:{prop:"ztztmc",label:"当前状态",width:"200"}})],1),t._v(" "),e("div",{attrs:{"text-right":""}},[e("el-pagination",{attrs:{"current-page":t.yqPage,"page-sizes":[10,20,35,50],"page-size":t.yqPageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.yqTotal},on:{"size-change":t.handleYqSizeChange,"current-change":t.handleYqCurrentChange}})],1)],1)])],1)},staticRenderFns:[]};var i=e("Z0/y")(s,l,!1,function(t){e("oqTl")},"data-v-a3cc3a12",null);a.default=i.exports},oqTl:function(t,a){}});
//# sourceMappingURL=46.b7d21b079e33c88c8501.js.map