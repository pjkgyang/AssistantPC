webpackJsonp([48],{"/MMd":function(t,e){},"44Zs":function(t,e){},zZrr:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});l("IfOk");var i=l("oFuF"),a=(l("Q3je"),{data:function(){return{visible:this.show,tableData:[],currentPage:1,pageSize:10,total:0,multipleSelection:[],wtwidArr:[],tableHeight:window.innerHeight-350}},props:{show:{type:Boolean,default:!1},xmbh:{type:String,dafault:""}},methods:{listHtnrApp:function(){var t=this;this.$get(this.API.listHtnrApp,{xmbh:this.xmbh}).then(function(e){"success"==e.state?e.data?t.tableData=e.data:t.tableData=[]:t.$message({message:e.msg,type:"error"})})}},watch:{show:function(t,e){this.visible=this.show,t&&this.listHtnrApp()}},components:{}}),s={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("el-dialog",{attrs:{title:"采购产品详情",width:"1100px",top:"30px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[l("div",{staticStyle:{padding:"10px 15px"}},[l("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","max-height":t.tableHeight}},[l("el-table-column",{attrs:{prop:"ywx",label:"业务线"}}),t._v(" "),l("el-table-column",{attrs:{prop:"cpmc",label:"产品名称","show-overflow-tooltip":""}})],1),t._v(" "),l("div",{staticClass:"mg-12",attrs:{"text-right":""}},[l("el-button",{attrs:{size:"mini"},on:{click:function(e){t.visible=!1}}},[t._v("关闭")])],1)],1)])],1)},staticRenderFns:[]};var r={data:function(){return{tableHeight:window.innerHeight-120,innerHeight:window.innerHeight,currentPage:1,pageSize:20,total:0,tableData:[],xmztMenu:[{mc:"在建",id:"1"},{mc:"售后",id:"2"},{mc:"过保",id:"3"},{mc:"已关闭",id:"4"}],xmlbMenu:[{mc:"软件",id:"软件"},{mc:"集成",id:"集成"},{mc:"服务",id:"服务"}],qkztList:[{mc:"全部",id:""},{mc:"欠款",id:"1"}],gczdList:[],xmbh:"",filter:{keyword:"",xmzt:"",xmlb:"",qygc:"",qsDate:[],gbDate:[],qkzt:""},cgcpShow:!1,isJZuser:""}},props:{},mounted:function(){this.isJZuser=sessionStorage.getItem("isJZuser"),Object(i.n)("gczd")?this.gczdList=Object(i.n)("gczd"):Object(i.i)("gczd",this.gczdList,!0),"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},methods:{handleSearchXm:function(){this.currentPage=1,"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},handleFilterXMZT:function(t){this.filter.xmzt=t,this.currentPage=1,"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},handleFilterXMLB:function(t){this.filter.xmlb=t,this.currentPage=1,"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},handleFilterQk:function(t){this.filter.qkzt=t,this.currentPage=1,"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},handleFilterQy:function(t){this.filter.qygc=t,this.currentPage=1,"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},handlePickQsDate:function(t){this.filter.qsDate[0]=this.filter.qsDate[0]?this.filter.qsDate[0]:"",this.filter.qsDate[1]=this.filter.qsDate[1]?this.filter.qsDate[1]:"",this.currentPage=1,"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},handlePickGbDate:function(t){this.filter.gbDate[0]=this.filter.gbDate[0]?this.filter.gbDate[0]:"",this.filter.gbDate[1]=this.filter.gbDate[1]?this.filter.gbDate[1]:"",this.currentPage=1,"xms"==this.$route.query.lx?this.pageUnitProjects():"fk"==this.$route.query.lx?this.listXxdk():this.getDetail()},handleCheckCgcp:function(t){this.xmbh=t,this.cgcpShow=!0},handleCheckDetail:function(t,e,l,i){var a={};a.dwmc=this.$route.query.dwmc,l&&(a.xmbh=l.xmbh,a.wtxmlx="gb"==i?3:"sh"==i?2:1),a[t]=e;var s=this.$router.resolve({path:"/report-list/questionlist.html",query:a}).href;window.open(s,"_blank")},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,"xms"==this.$route.query.lx?this.pageUnitProjects():this.getDetail()},handleCurrentChange:function(t){this.currentPage=t,"xms"==this.$route.query.lx?this.pageUnitProjects():this.getDetail()},getDetail:function(){var t=this;this.$get("zj"==this.$route.query.lx?this.API.pageZjWtxm:"sh"==this.$route.query.lx?this.API.pageShWtxm:"gb"==this.$route.query.lx?this.API.pageGbWtxm:this.API.pageYqRwxm,{dwmc:this.$route.query.dwmc,curPage:this.currentPage,pageSize:this.pageSize}).then(function(e){"success"==e.state?(t.tableData=e.data.rows,t.total=e.data.records):t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},listXxdk:function(){var t=this;this.$get(this.API.listXxdk,{dwmc:this.$route.query.dwmc,gczt:this.filter.xmzt,xmlb:this.filter.xmlb,qssjStart:this.filter.qsDate[0]?this.filter.qsDate[0]:"",qssjEnd:this.filter.qsDate[1]?this.filter.qsDate[1]:"",gbsjStart:this.filter.gbDate[0]?this.filter.gbDate[0]:"",gbsjEnd:this.filter.gbDate[1]?this.filter.gbDate[1]:"",qygc:this.filter.qygc,qkzt:this.filter.qkzt,keyword:this.filter.keyword}).then(function(e){"success"==e.state?e.data?t.tableData=e.data:t.tableData=[]:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},pageUnitProjects:function(){var t=this;this.$get(this.API.pageUnitProjects,{curPage:this.currentPage,pageSize:this.pageSize,dwmc:this.$route.query.dwmc,gczt:this.filter.xmzt,xmlb:this.filter.xmlb,qssjStart:this.filter.qsDate[0]?this.filter.qsDate[0]:"",qssjEnd:this.filter.qsDate[1]?this.filter.qsDate[1]:"",gbsjStart:this.filter.gbDate[0]?this.filter.gbDate[0]:"",gbsjEnd:this.filter.gbDate[1]?this.filter.gbDate[1]:"",qygc:this.filter.qygc,qkzt:this.filter.qkzt,keyword:this.filter.keyword}).then(function(e){"success"==e.state?(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.total=e.data.records):t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})}},watch:{show:function(t,e){}},components:{cgcpDialog:l("Z0/y")(a,s,!1,function(t){l("44Zs")},"data-v-07ab381a",null).exports}},o={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"pd-10"},[l("div",{staticClass:"dialog-jd"},[l("h4",{attrs:{"text-center":""}},[t._v("\n\t\t\t统计情况 -\n\t\t\t"+t._s("zj"==t.$route.query.lx?"在建":"zj"==t.$route.query.lx?"售后":"gb"==t.$route.query.lx?"过保":"xms"==t.$route.query.lx?"项目列表":"fk"==t.$route.query.lx?"付款详情":"延期任务")+"\n\t\t")]),t._v(" "),"zj"==t.$route.query.lx?l("div",[l("el-table",{key:"ssyh-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","min-height":500,"max-height":t.tableHeight}},[l("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"sxrq",label:"合同签订年份",width:"200"}}),t._v(" "),l("el-table-column",{attrs:{prop:"ztztmc",label:"当前状态",width:"200"}}),t._v(" "),l("el-table-column",{attrs:{label:"问题数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("a",{attrs:{href:"javaScript:;;"},on:{click:function(l){t.handleCheckDetail("wtzs",e.row.wtzs,e.row,"zj")}}},[t._v(t._s(e.row.wtzs))])]}}])})],1)],1):t._e(),t._v(" "),"sh"==t.$route.query.lx?l("div",[l("el-table",{key:"jdqr-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","min-height":500,"max-height":t.tableHeight}},[l("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"sxrq",label:"合同签订年份",width:"150"}}),t._v(" "),l("el-table-column",{attrs:{prop:"ysrq",label:"验收日期",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{prop:"gbrq",label:"过保日期",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{prop:"zbts",label:"在保天数",width:"100"}}),t._v(" "),l("el-table-column",{attrs:{label:"问题数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("a",{attrs:{href:"javaScript:;;"},on:{click:function(l){t.handleCheckDetail("wtzs",e.row.wtzs,e.row,"sh")}}},[t._v(t._s(e.row.wtzs))])]}}])})],1)],1):t._e(),t._v(" "),"gb"==t.$route.query.lx?l("div",[l("el-table",{key:"jdqr-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","min-height":500,"max-height":t.tableHeight}},[l("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"sxrq",label:"合同签订年份",width:"150"}}),t._v(" "),l("el-table-column",{attrs:{prop:"ysrq",label:"验收日期",width:"120"}}),t._v(" "),l("el-table-column",{attrs:{prop:"gbts",label:"在保天数",width:"100"}}),t._v(" "),l("el-table-column",{attrs:{label:"问题数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("a",{attrs:{href:"javaScript:;;"},on:{click:function(l){t.handleCheckDetail("wtzs",e.row.wtzs,e.row,"gb")}}},[t._v(t._s(e.row.wtzs))])]}}])})],1)],1):t._e(),t._v(" "),"yq"==t.$route.query.lx?l("div",[l("el-table",{key:"jdqr-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","min-height":500,"max-height":t.tableHeight}},[l("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"rwmc",label:"任务名称","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"cnjrsj",label:"承诺完成时间",width:"160","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"yqts",label:"延期天数",width:"100"}})],1)],1):t._e(),t._v(" "),l("div",["xms"==t.$route.query.lx||"fk"==t.$route.query.lx?l("div",{staticClass:"xxtsqlDetail-filter"},[l("div",[l("p",{staticClass:"query-title"},[t._v("高级查询:")]),t._v(" "),l("p",[l("el-input",{staticStyle:{width:"493px"},attrs:{size:"mini",placeholder:"请输入项目编号/项目名称/合同编号/甲方负责人/乙方负责人"},on:{change:t.handleSearchXm},model:{value:t.filter.keyword,callback:function(e){t.$set(t.filter,"keyword",e)},expression:"filter.keyword"}}),t._v("\n\t\t\t\t\t\t　\n\t\t\t\t\t\t"),l("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleSearchXm}},[t._v("查询")])],1)]),t._v(" "),l("div",[l("p",{staticClass:"query-title"},[t._v("项目状态:")]),t._v(" "),l("p",{staticClass:"query-list"},[l("span",{class:{"bg-active":""==t.filter.xmzt},attrs:{"data-type":""},on:{click:function(e){t.handleFilterXMZT("")}}},[t._v("全部")]),t._v(" "),t._l(t.xmztMenu,function(e){return l("span",{key:e.id,class:{"bg-active":t.filter.xmzt==e.id},on:{click:function(l){t.handleFilterXMZT(e.id)}}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),l("div",[l("p",{staticClass:"query-title"},[t._v("项目类别:")]),t._v(" "),l("p",{staticClass:"query-list"},[l("span",{class:{"bg-active":""==t.filter.xmlb},attrs:{"data-type":""},on:{click:function(e){t.handleFilterXMLB("")}}},[t._v("全部")]),t._v(" "),t._l(t.xmlbMenu,function(e){return l("span",{key:e.id,class:{"bg-active":t.filter.xmlb==e.id},on:{click:function(l){t.handleFilterXMLB(e.id)}}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),l("div",[l("p",{staticClass:"query-title"},[t._v("签署日期:")]),t._v(" "),l("p",[l("el-date-picker",{attrs:{size:"mini",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.handlePickQsDate},model:{value:t.filter.qsDate,callback:function(e){t.$set(t.filter,"qsDate",e)},expression:"filter.qsDate"}})],1)]),t._v(" "),l("div",[l("p",{staticClass:"query-title"},[t._v("过保日期:")]),t._v(" "),l("p",[l("el-date-picker",{attrs:{size:"mini",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd"},on:{change:t.handlePickGbDate},model:{value:t.filter.gbDate,callback:function(e){t.$set(t.filter,"gbDate",e)},expression:"filter.gbDate"}})],1)]),t._v(" "),1!=t.isJZuser?l("div",[l("p",{staticClass:"query-title"},[t._v("区域:")]),t._v(" "),l("p",{staticClass:"query-list"},[l("span",{class:{"bg-active":""==t.filter.qygc},on:{click:function(e){t.handleFilterQy("")}}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(e,i){return l("span",{key:i,class:{"bg-active":t.filter.qygc==e.label},on:{click:function(l){t.handleFilterQy(e.label)}}},[t._v("\n\t\t\t\t\t\t\t"+t._s(e.mc)+"\n\t\t\t\t\t\t")])})],2)]):t._e(),t._v(" "),l("div",[l("p",{staticClass:"query-title"},[t._v("欠款状态:")]),t._v(" "),l("p",{staticClass:"query-list"},t._l(t.qkztList,function(e){return l("span",{class:{"bg-active":t.filter.qkzt==e.id},on:{click:function(l){t.handleFilterQk(e.id)}}},[t._v(t._s(e.mc))])}))])]):t._e(),t._v(" "),"xms"==t.$route.query.lx?l("div",[l("el-table",{key:"jdqr-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","min-height":500,"max-height":t.innerHeight-420}},[l("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"100"}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmlb",label:"项目类别",width:"100"}}),t._v(" "),l("el-table-column",{attrs:{label:"项目状态",sortable:"",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-tag",{attrs:{size:"mini",type:"primary"}},[t._v(t._s(e.row.gczt_display))])]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"xmjd",label:"整体进度",width:"100"}}),t._v(" "),l("el-table-column",{attrs:{prop:"qssj",label:"签署日期",sortable:"","min-width":"110","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"htje",label:"合同金额(元)","min-width":"110"}}),t._v(" "),l("el-table-column",{attrs:{label:"待付款(元)","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",[t._v(t._s(e.row.dfk?e.row.dfk:"-"))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"已付款(元)","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",[t._v(t._s(e.row.yfk?e.row.yfk:"-"))])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"采购产品","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("a",{attrs:{href:"javaScript:void(0)"},on:{click:function(l){t.handleCheckCgcp(e.row.xmbh)}}},[t._v(t._s(e.row.cpzs))])]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"qdrq",label:"启动日期","min-width":"100"}}),t._v(" "),l("el-table-column",{attrs:{prop:"ztysjssj",label:"整体验收日期","min-width":"110"}}),t._v(" "),l("el-table-column",{attrs:{prop:"jszq",label:"建设周期(月)","min-width":"110"}}),t._v(" "),l("el-table-column",{attrs:{prop:"fwqx",label:"服务期限(月)","min-width":"110"}}),t._v(" "),l("el-table-column",{attrs:{prop:"gbsj",label:"过保日期",sortable:"","min-width":"110"}}),t._v(" "),l("el-table-column",{attrs:{prop:"jfzrr",label:"甲方负责人","min-width":"100"}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmjl",label:"乙方责任人","min-width":"100"}})],1)],1):t._e()]),t._v(" "),"fk"==t.$route.query.lx?l("div",[l("el-table",{key:"jdqr-table",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","max-height":t.tableHeight}},[l("el-table-column",{attrs:{prop:"xmbh",label:"项目编号","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"htbh",label:"合同编号","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","min-width":"260","show-overflow-tooltip":""}}),t._v(" "),l("el-table-column",{attrs:{prop:"htje",label:"合同金额(元)","min-width":"130"}}),t._v(" "),l("el-table-column",{attrs:{prop:"ysje",label:"应收金额(元)","min-width":"130"}}),t._v(" "),l("el-table-column",{attrs:{prop:"dkje",label:"到款金额(元)","min-width":"130"}}),t._v(" "),l("el-table-column",{attrs:{prop:"dsk",label:"待付款(元)","min-width":"130"}}),t._v(" "),l("el-table-column",{attrs:{prop:"ye",label:"余额(元)","min-width":"130"}})],1)],1):t._e(),t._v(" "),t.total>0?l("div",{staticClass:"mg-12",attrs:{"text-right":""}},[l("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[20,35,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e()]),t._v(" "),l("div",[l("cgcpDialog",{attrs:{show:t.cgcpShow,xmbh:t.xmbh},on:{"update:show":function(e){t.cgcpShow=e}}})],1)])},staticRenderFns:[]};var n=l("Z0/y")(r,o,!1,function(t){l("/MMd")},"data-v-176da45a",null);e.default=n.exports}});
//# sourceMappingURL=48.450017aac297fd18ea24.js.map