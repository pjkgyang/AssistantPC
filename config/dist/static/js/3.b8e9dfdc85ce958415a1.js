webpackJsonp([3],{"2odY":function(t,e,a){"use strict";var i=a("oFuF"),r={data:function(){return{cplist:[],jhztList:[{lable:"",mc:"全部"},{lable:"1",mc:"未完成"},{lable:"2",mc:"已完成"}],pxxslist:[{label:1,mc:"线上直播"},{label:2,mc:"线下培训"},{label:3,mc:"线上加线下"}],pxkslist:[{label:1,mc:"1小时以内"},{label:2,mc:"1小时~2小时"},{label:3,mc:"2小时~3小时"},{label:4,mc:"3小时以上"}],filterWord:{keyword:"",cpbh:"",cpmc:"",bbh:"",jhcjrq:[],jhpxrq:[],sjpxrq:[],jhzt:"",sfyq:0,pxxs:"",pxsc:""},groupTag:"",sfzk:!0}},props:{filterList:{type:Array,default:function(){return["keyword","cp","jhcjrq","jhpxrq","jhzt","sfyq","bbh"]}},placeholder:{type:String,default:"请输入项目名称/项目编号"},xmbh:{type:String,default:""},filterShow:{type:Boolean,default:!0}},methods:{handleExpand:function(){this.sfzk=!this.sfzk},handleSearch:function(){this.$emit("handleChangeFilter",this.filterWord)},changeDate:function(t){t||(this.filterWord.jhcjrq=[]),this.$emit("handleChangeFilter",this.filterWord)},changeDateFbrq:function(t){t||(this.filterWord.jhpxrq=[]),this.$emit("handleChangeFilter",this.filterWord)},changeDateSjpxrq:function(t){t||(this.filterWord.sjpxrq=[]),this.$emit("handleChangeFilter",this.filterWord)},handleCp:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.filterWord.cpbh=e,this.$emit("handleChangeFilter",this.filterWord))},handleKs:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.filterWord.pxsc=e,this.$emit("handleChangeFilter",this.filterWord))},handlePxxs:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.filterWord.pxxs=e,this.$emit("handleChangeFilter",this.filterWord))},handleSfyq:function(){this.$emit("handleChangeFilter",this.filterWord)},handleJhzt:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.filterWord.jhzt=e,this.$emit("handleChangeFilter",this.filterWord))}},mounted:function(){Object(i.n)("cp")?this.cplist=Object(i.n)("cp"):Object(i.i)("cp",this.cplist,!0)},activated:function(){},watch:{},components:{}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"query-condition"},[t.filterList.includes("keyword")?a("div",[a("p"),a("p",{staticClass:"query-title"},[a("span",{class:{expandIcon:!0,"el-icon-arrow-up":1==this.sfzk,"el-icon-arrow-down":0==this.sfzk},attrs:{title:this.sfzk?"点击收起筛选条件":"点击展开筛选条件"},on:{click:t.handleExpand}}),t._v("　高级搜索:")]),t._v(" "),a("el-input",{staticStyle:{width:"348px"},attrs:{size:"mini",placeholder:t.placeholder},on:{change:t.handleSearch},model:{value:t.filterWord.keyword,callback:function(e){t.$set(t.filterWord,"keyword",e)},expression:"filterWord.keyword"}}),t._v("　\n                "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleSearch}},[t._v("查询")]),t._v(" "),a("p")],1):t._e(),t._v(" "),a("transition",{attrs:{name:"el-zoom-in-top"}},[t.sfzk?a("section",{staticClass:"query-condition"},[t.filterList.includes("bbh")?a("div",[a("p",{staticClass:"query-title"},[t._v("版本号:")]),t._v(" "),a("p",[a("el-input",{staticStyle:{width:"348px"},attrs:{size:"mini",placeholder:"请输入版本号"},on:{change:t.handleSearch},model:{value:t.filterWord.bbh,callback:function(e){t.$set(t.filterWord,"bbh",e)},expression:"filterWord.bbh"}}),t._v("　\n                    ")],1)]):t._e(),t._v(" "),t.filterList.includes("cp")?a("div",[a("p",{staticClass:"query-title"},[t._v("产品:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleCp}},[a("span",{class:{"bg-active":""==t.filterWord.cpbh},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.cplist,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterWord.cpbh==e.label&&t.filterWord.cpmc==e.mc},attrs:{"data-index":i,"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]):t._e(),t._v(" "),t.filterList.includes("pxks")?a("div",[a("p",{staticClass:"query-title"},[t._v("培训课时:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleKs}},[a("span",{class:{"bg-active":""==t.filterWord.pxsc},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.pxkslist,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterWord.pxsc==e.label},attrs:{"data-index":i,"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]):t._e(),t._v(" "),t.filterList.includes("pxxs")?a("div",[a("p",{staticClass:"query-title"},[t._v("培训形式:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handlePxxs}},[a("span",{class:{"bg-active":""==t.filterWord.pxxs},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.pxxslist,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterWord.pxxs==e.label&&t.filterWord.cpmc==e.mc},attrs:{"data-index":i,"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]):t._e(),t._v(" "),t.filterList.includes("jhcjrq")?a("div",[a("p",{staticClass:"query-title"},[t._v("计划创建日期:")]),t._v(" "),a("p",{staticClass:"query-list"},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",size:"mini",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeDate},model:{value:t.filterWord.jhcjrq,callback:function(e){t.$set(t.filterWord,"jhcjrq",e)},expression:"filterWord.jhcjrq"}})],1)]):t._e(),t._v(" "),t.filterList.includes("jhpxrq")?a("div",[a("p",{staticClass:"query-title"},[t._v(t._s(t.filterList.includes("pxxs")?"计划培训日期":"计划发版日期")+":")]),t._v(" "),a("p",{staticClass:"query-list"},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",size:"mini",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeDateFbrq},model:{value:t.filterWord.jhpxrq,callback:function(e){t.$set(t.filterWord,"jhpxrq",e)},expression:"filterWord.jhpxrq"}})],1)]):t._e(),t._v(" "),t.filterList.includes("sjpxrq")?a("div",[a("p",{staticClass:"query-title"},[t._v("实际培训日期:")]),t._v(" "),a("p",{staticClass:"query-list"},[a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",size:"mini",type:"daterange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeDateSjpxrq},model:{value:t.filterWord.sjpxrq,callback:function(e){t.$set(t.filterWord,"sjpxrq",e)},expression:"filterWord.sjpxrq"}})],1)]):t._e(),t._v(" "),t.filterList.includes("jhzt")?a("div",[a("p",{staticClass:"query-title"},[t._v("计划状态:")]),t._v(" "),a("p",{staticClass:"query-list",on:{click:t.handleJhzt}},t._l(t.jhztList,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterWord.jhzt==e.lable},attrs:{"data-type":e.lable}},[t._v(t._s(e.mc))])}))]):t._e(),t._v(" "),t.filterList.includes("sfyq")?a("div",[a("p",{staticClass:"query-title"},[t._v("是否延期:")]),t._v(" "),a("p",{staticStyle:{padding:"5px 0"}},[a("el-radio-group",{on:{change:t.handleSfyq},model:{value:t.filterWord.sfyq,callback:function(e){t.$set(t.filterWord,"sfyq",e)},expression:"filterWord.sfyq"}},[a("el-radio",{attrs:{label:2}},[t._v("全部")]),t._v(" "),a("el-radio",{attrs:{label:1}},[t._v("是")]),t._v(" "),a("el-radio",{attrs:{label:0}},[t._v("否")])],1)],1)]):t._e()]):t._e()])],1)])},staticRenderFns:[]};var s=a("Z0/y")(r,l,!1,function(t){a("GJvh")},null,null);e.a=s.exports},"9yCq":function(t,e){},D5Qd:function(t,e){},GJvh:function(t,e){},WY8K:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("2odY"),r=a("P+gh"),l=a("2r/n"),s=a("o4VN"),n={data:function(){return{sspxShow:!1,wtfpShow:!1,filterList:["keyword","cp","pxxs","pxks","jhcjrq","jhpxrq","sjpxrq","jhzt"],tableData:[],jhData:{},currentPage:1,pageSize:15,total:0,filterWord:{keyword:"",cpbh:"",cpmc:"",jhcjrq:[],jhpxrq:[],sjpxrq:[],jhzt:"",pxxs:"",pxsc:""},itemData:{},userGroupTag:""}},methods:{handleNrsuccess:function(){this.pageCapacityPlan()},handleCehckCyrs:function(t,e){var a=this.$router.resolve({path:"/stafflist",query:{nljhwid:t.wid,type:e,cpbh:t.cpbh}});window.open(a.href,"_blank")},handleCehckwts:function(t){var e=this.$router.resolve({path:"/report-list/questionlist.html",query:{jhwid:t,jhlx:"2"}});window.open(e.href,"_blank")},handleCommitSave:function(t){var e=this;this.$post(this.API.abilityTraining,{wid:this.itemData.wid,pxzt:t.pxzt,pxxs:t.pxxs,jhpxsj:t.jhpxsj,fxrxm:t.fxrxm,fxrbh:t.fxrbh,sjwcsj:t.sjwcsj?t.sjwcsj:"",pxsp:t.pxsp,fjData:t.fileList,pxsc:t.pxsc}).then(function(t){"success"==t.state?(e.sspxShow=!e.sspxShow,e.$alert("保存成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){e.pageCapacityPlan()}})):e.$alert(t.msg,"提示",{confirmButtonText:"确定",type:"error"})})},handleDownFile:function(t,e,a){var i=a.target.getAttribute("data-fj");window.open(window.baseurl+"attachment/downloadFile.do?fjId="+i)},handleCurrentChange:function(t){this.currentPage=1,this.pageCapacityPlan()},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.pageCapacityPlan()},handleChangeFilter:function(t){this.filterWord=t,this.pageCapacityPlan()},handleExport:function(){this.filterWord.jhcjrq[0]=this.filterWord.jhcjrq[0]?this.filterWord.jhcjrq[0]:"",this.filterWord.jhcjrq[1]=this.filterWord.jhcjrq[1]?this.filterWord.jhcjrq[1]:"",this.filterWord.jhpxrq[0]=this.filterWord.jhpxrq[0]?this.filterWord.jhpxrq[0]:"",this.filterWord.jhpxrq[1]=this.filterWord.jhpxrq[1]?this.filterWord.jhpxrq[1]:"",this.filterWord.sjpxrq[0]=this.filterWord.sjpxrq[0]?this.filterWord.sjpxrq[0]:"",this.filterWord.sjpxrq[1]=this.filterWord.sjpxrq[1]?this.filterWord.sjpxrq[1]:"",window.open(window.baseurl+"wtgj/exportCapacityPlan.do?cpbh="+this.filterWord.cpbh+"&zt="+this.filterWord.jhzt+"&pxxs="+this.filterWord.pxxs+"&cjsjStart="+this.filterWord.jhcjrq[0]+"&cjsjEnd="+this.filterWord.jhcjrq[1]+"&jhpxsjStart="+this.filterWord.jhpxrq[0]+"&jhpxsjEnd="+this.filterWord.jhpxrq[1]+"&sjpxsjStart="+this.filterWord.sjpxrq[0]+"&sjpxsjEnd="+this.filterWord.sjpxrq[1]+"&keyword="+this.filterWord.keyword,"&pxsc="+this.filterWord.pxsc)},handleTrain:function(t){this.itemData=t,this.sspxShow=!this.sspxShow},handlePlnrjh:function(t){this.jhData=t,this.wtfpShow=!this.wtfpShow},handleDeljh:function(t){var e=this;this.$confirm("是否确定将此计划删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$post(e.API.deleteCapacityPlan,{wid:t.wid}).then(function(t){"success"==t.state?e.$alert("删除成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){e.pageCapacityPlan()}}):e.$alert(t.msg,"提示",{confirmButtonText:"确定",type:"error"})})}).catch(function(){})},pageCapacityPlan:function(){var t=this;this.$get(this.API.pageCapacityPlan,{curPage:this.currentPage,pageSize:this.pageSize,cpbh:this.filterWord.cpbh,zt:this.filterWord.jhzt,pxxs:this.filterWord.pxxs,cjsjStart:this.filterWord.jhcjrq[0],cjsjEnd:this.filterWord.jhcjrq[1],jhpxsjStart:this.filterWord.jhpxrq[0],jhpxsjEnd:this.filterWord.jhpxrq[1],sjpxsjStart:this.filterWord.sjpxrq[0],sjpxsjEnd:this.filterWord.sjpxrq[1],keyword:this.filterWord.keyword,pxsc:this.filterWord.pxsc}).then(function(e){"success"==e.state?(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.total=e.data.records):t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})}).catch(function(t){})}},mounted:function(){this.pageCapacityPlan(),this.userGroupTag=JSON.parse(sessionStorage.userInfo).userGroupTag},components:{filterCondition:i.a,tableLayout:r.a,sspxDialog:l.a,wtfplistDialog:s.a}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pannelPadding-10"},[a("div",{staticClass:"pannelPaddingBg-10"},[a("tableLayout",[a("section",{attrs:{slot:"top"},slot:"top"},[a("filterCondition",{attrs:{filterList:t.filterList,placeholder:"请输入问题标题 / 培训主题"},on:{handleChangeFilter:t.handleChangeFilter}})],1),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("div",{attrs:{"text-right":""}},[a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),a("div",{staticStyle:{margin:"10px 0"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[t.userGroupTag.includes("NLPXZJ")?a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){t.handleTrain(e.row)}}},[t._v("培训")]),t._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){t.handlePlnrjh(e.row)}}},[t._v("批量纳入计划")]),t._v(" "),a("el-button",{staticStyle:{color:"#f00"},attrs:{type:"text",size:"mini"},on:{click:function(a){t.handleDeljh(e.row)}}},[t._v("删除")])]}}])}):t._e(),t._v(" "),a("el-table-column",{attrs:{prop:"cpmc",label:"产品","min-width":"180"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"left",prop:"pxzt",label:"培训主题","min-width":"300","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pxsc",label:"培训时长",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"zt",label:"培训状态",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{size:"mini",type:1==e.row.zt?"danger":"success"}},[t._v(t._s(2==e.row.zt?"已完成":"未完成"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"培训形式",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.pxxs?"线上直播":2==e.row.pxxs?"线下培训":"线上加线下"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"jhpxsj",label:"计划培训日期",width:"130",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"sjpxsj",label:"实际培训日期",width:"130",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"fxrxm",label:"分享人",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{label:"推荐参与人数",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCehckCyrs(e.row,"2")}}},[t._v(t._s(e.row.tjrs))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"参与人数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCehckCyrs(e.row,"1")}}},[t._v(t._s(e.row.cyrs))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"cjsj",label:"创建日期",width:"160",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cjrxm",label:"创建人",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{label:"纳入计划问题数",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(a){t.handleCehckwts(e.row.wid)}}},[t._v(t._s(e.row.jhwtzs))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"附件","min-width":"260"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("div",{on:{click:function(a){t.handleDownFile(e.$index,e.row,a)}}},t._l(e.row.fjList,function(e,i){return a("p",[a("a",{key:i,attrs:{href:"javaScript:;;",title:"点击下载","data-fj":e.fjbh}},[t._v(t._s(e.fjmc))])])}))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"pxsp",label:"培训视频",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.pxsp.split(","),function(i){return"-"!=e.row.pxsp?a("a",{attrs:{href:i,target:"blank"}},[t._v(t._s(i))]):t._e()})}}])})],1)],1)])]),t._v(" "),a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,20,30,50],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("sspx-dialog",{attrs:{show:t.sspxShow,itemData:t.itemData},on:{"update:show":function(e){t.sspxShow=e},handleCommitSave:t.handleCommitSave}}),t._v(" "),a("wtfplist-dialog",{attrs:{show:t.wtfpShow,jhData:t.jhData,lx:2},on:{"update:show":function(e){t.wtfpShow=e},handleNrsuccess:t.handleNrsuccess}})],1)},staticRenderFns:[]};var c=a("Z0/y")(n,o,!1,function(t){a("9yCq")},"data-v-29d48e3e",null);e.default=c.exports},o4VN:function(t,e,a){"use strict";var i={data:function(){return{visible:this.show,tableData:[],currentPage:1,pageSize:10,total:0,multipleSelection:[],wtwidArr:[],tableHeight:window.innerHeight-350,sfbugList:[{mc:"全部",label:""},{mc:"是",label:"1"},{mc:"否",label:"0"}],keyword:"",sfbug:""}},props:{show:{type:Boolean,default:!1},lx:{type:Number,default:0},jhData:{type:Object,default:function(){return{}}}},methods:{handleClose:function(){this.visible=!1},handleSearch:function(){this.currentPage=1,this.planImprovementProblemList()},handleSFBUG:function(t){this.sfbug=t,this.currentPage=1,this.planImprovementProblemList()},handleCommit:function(){var t=this;this.$confirm("是否将此问题纳入计划?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$post(t.API.addInPlan,{lx:t.lx,wtwid:t.wtwidArr.join(","),wid:t.jhData.wid}).then(function(e){"success"==e.state?(t.visible=!1,t.$alert("纳入成功","提示",{confirmButtonText:"确定",type:"success",callback:function(e){t.$emit("handleNrsuccess","")}})):t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})}).catch(function(){})},handleSizeChange:function(t){this.currentPage=1,this.pageSize=t,this.planImprovementProblemList()},handleCurrentChange:function(t){this.currentPage=t,this.planImprovementProblemList()},handleSelectionChange:function(t){var e=this;this.wtwidArr=[],t.forEach(function(t){e.wtwidArr.push(t.wtwid)})},planImprovementProblemList:function(){var t=this;this.$get(this.API.planImprovementProblemList,{curPage:this.currentPage,pageSize:this.pageSize,cpbh:this.jhData.cpbh,jhlx:this.lx,sfnr:0,fbqbh:2==this.lx?"W03":"W05",sfbug:this.sfbug,keyword:this.keyword}).then(function(e){"success"==e.state&&(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.total=e.data.records)})}},watch:{show:function(t,e){this.visible=this.show,t&&this.planImprovementProblemList()}},components:{}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"问题列表",width:"1100px",top:"30px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("div",{staticClass:"dialog-xjjh"},[a("div",{staticClass:"mg-12"},[a("div",[a("span",{staticClass:"query-title"},[t._v("高级搜索:")]),t._v(" "),a("el-input",{staticStyle:{width:"300px",margin:"12px 0"},attrs:{size:"mini",placeholder:"请输入问题标题/问题标签"},on:{change:t.handleSearch},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleSearch}},[t._v("查询")])],1),t._v(" "),a("div",{attrs:{flex:""}},[t._v("\n            "),a("p",{staticClass:"query-title"},[t._v("是否BUG:")]),t._v(" "),a("p",{staticClass:"query-list"},t._l(t.sfbugList,function(e){return a("span",{class:{"bg-active":t.sfbug==e.label},on:{click:function(a){t.handleSFBUG(e.label)}}},[t._v(t._s(e.mc))])}))])]),t._v(" "),a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","max-height":t.tableHeight},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{fixed:"",type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"",prop:"wtbt",label:"问题标题",width:"220","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"twsj",label:"时间",width:"170"}}),t._v(" "),a("el-table-column",{attrs:{prop:"twr",label:"发布人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpmc",label:"产品",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"bqmc",label:"标签",width:"190"}}),t._v(" "),a("el-table-column",{attrs:{prop:"twrdw",label:"所属单位",width:"220","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"wtlb",label:"问题类别",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dbqr",label:"打标签人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sfbug",label:"是否bug"}})],1)],1),t._v(" "),t.tableData.length?a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,30,50],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1):t._e(),t._v(" "),a("div",{staticClass:"mg-12",attrs:{"text-right":""}},[a("el-button",{attrs:{size:"mini"},on:{click:t.handleClose}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleCommit}},[t._v("保存")])],1)])])],1)},staticRenderFns:[]};var l=a("Z0/y")(i,r,!1,function(t){a("D5Qd")},"data-v-41c0a208",null);e.a=l.exports}});
//# sourceMappingURL=3.b8e9dfdc85ce958415a1.js.map