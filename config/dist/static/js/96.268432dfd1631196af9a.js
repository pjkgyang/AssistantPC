webpackJsonp([96],{"K/JX":function(t,e){},l3CB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("ifEj"),i=a("O9/E"),l=a("9A7R"),o=a("GRVU"),n=(a("YkBq"),a("oFuF")),r={data:function(){return{tableHeight:window.innerHeight-200,fwList:[{label:"全部",value:""},{label:"战队（组织结构）",value:"0"},{label:"学校成员",value:"2"},{label:"合作伙伴",value:"3"},{label:"项目",value:"1"}],startDate:"",endDate:"",tableData:[],dialogDialyVisible:!1,dialogTaskVisible:!1,tasklogDetailVisible:!1,taskName:"",relevanceTask:!1,dailyValue:{},pageSize:17,records:null,options:[],value:"",ydztValue:"",gcqyValue:"",gczdList:[],fwValue:"",TaskRelevance:{},rwgc:{},total:"",baseUrl:"",isRead:"",keyword:"",closeDialogNum:0,taskDetail:{},pzValue:"",logDetail:{},isedit:!0,rwbh:"",xmbh:"",sign:0,nowPage:1,pzList:[],isJzuser:"",isDisabled:0}},mounted:function(){},methods:{handleReadlog:function(t,e){var a=this;0==e.ydzt&&Object(o.l)({wid:e.wid}).then(function(t){var s=t.data;"success"==s.state?e.ydzt=1:a.$alert(s.msg,"提示",{confirmButtonText:"确定",type:"error"})})},handleCloseDetail:function(){this.tasklogDetailVisible=!1},handleSaveDetail:function(){var t=this;Object(o.c)({wid:this.taskDetail.wid,bz:this.pzValue}).then(function(e){"success"==e.data.state&&(t.tasklogDetailVisible=!1,t.$alert("保存成功","提示",{confirmButtonText:"确定",type:"success"}))})},handleChoosetxr:function(){this.queryLogTaskProcess(1)},changeTaskydzt:function(){this.queryLogTaskProcess(1)},changeTaskgcqy:function(){this.queryLogTaskProcess(1)},changeTaskscope:function(){this.queryLogTaskProcess(1)},handleTasklogDetail:function(t,e){var a=this;this.tasklogDetailVisible=!0,this.taskDetail=e,0==e.ydzt&&Object(o.l)({wid:e.wid}).then(function(t){var s=t.data;"success"==s.state?e.ydzt=1:a.$alert(s.msg,"提示",{confirmButtonText:"确定",type:"error"})}),2!=e.ydzt&&0!=this.isJzuser||this.getLogComments(this.taskDetail.wid),this.getLogComment(this.taskDetail.wid)},handleEditDetail:function(t,e){this.logDetail=e,this.sign+=1,this.isedit=!0,this.dialogDialyVisible=!0},handleDailyPaper:function(){this.dialogDialyVisible=!this.dialogDialyVisible,this.closeDialogNum+=1,this.sign-=1,this.isedit=!1,this.taskName=""},handleDeleteDetail:function(t,e){var a=this;this.$confirm("是否删除该条日志?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.d)({wid:e.wid}).then(function(t){"success"==t.data.state&&(a.queryLogTaskProcess(a.nowPage),a.$alert("删除成功","提示",{confirmButtonText:"确定",type:"success"}))})}).catch(function(){})},handleSubmit:function(t){this.isDisabled=1,this.rwgc.gclx=2,this.rwgc.gcms=t.gcms,this.rwgc.gcrq=t.gcrq,this.rwgc.gs=t.gs,this.rwgc.fjdata=t.fjdata.join(","),this.rwgc.wid=t.wid,this.isedit?(this.rwgc.xmbh=""==this.xmbh?t.xmbh:this.xmbh,this.rwgc.rwbh=""==this.rwbh?t.rwbh:this.rwbh,this.addOrUpdateTaskProcess(this.rwgc)):(this.rwgc.wid="",this.rwgc.xmbh=this.xmbh,this.rwgc.rwbh=this.rwbh,this.addOrUpdateTaskProcess(this.rwgc))},resetForm:function(){this.taskName="",this.rwgc.xmbh="",this.rwgc.rwbh=""},addDailyTasks:function(){this.dialogTaskVisible=!this.dialogTaskVisible},chooseRevelenceTask:function(t){this.taskName=t.rwmc,this.xmbh=t.xmbh,this.rwbh=t.rwbh,this.dialogTaskVisible=!this.dialogTaskVisible},handleCloseDialy:function(){},handleExport:function(){var t=this.startDate?this.startDate:"",e=this.endDate?this.endDate:"";window.open(this.baseUrl+"process/exportPersonnelLog.do?startDay="+t+"&endDay="+e+"&isRead="+this.ydztValue+"&gcqy="+this.gcqyValue+"&cybh="+this.value+"&fw="+this.fwValue+"&keyword="+this.keyword)},checkTaskLog:function(){var t=new Date(this.startDate),e=new Date(this.endDate);t.getTime()>e.getTime()?this.$alert("开始时间必须大于结束时间!","错误提示",{confirmButtonText:"确定",type:"error"}):this.queryLogTaskProcess(1)},handleEnterlog:function(){this.checkTaskLog()},handleCurrentChange:function(t){this.nowPage=t,this.queryLogTaskProcess(t)},handleDownFile:function(t,e,a){var s=a.target.getAttribute("data-fj");window.open(window.baseurl+"attachment/downloadFile.do?fjId="+s)},GetDateStr:function(t){var e=new Date;e.setDate(e.getDate()+t);var a=e.getFullYear(),s=e.getMonth()+1,i=e.getDate();return a+"-"+(s<10?"0"+s:s)+"-"+(i<10?"0"+i:i)},queryLogTaskProcess:function(t){var e=this;Object(o.j)({curPage:t,pageSize:this.pageSize,startDay:this.startDate?this.startDate:"",endDay:this.endDate?this.endDate:"",cybh:this.value,isRead:this.ydztValue,qygc:this.gcqyValue,keyword:this.keyword,fw:this.fwValue}).then(function(t){var a=t.data;"success"==a.state?(e.tableData=a.data.rows,e.records=a.data.records,e.total=a.data.total):e.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})},getLogComment:function(t){var e=this;Object(o.f)({wid:t}).then(function(t){var a=t.data;"success"==a.state&&(e.pzValue=a.data)})},getLogComments:function(t){var e=this;Object(o.g)({wid:t}).then(function(t){var a=t.data;"success"==a.state&&(null!=a.data&&0!=a.data.length?e.pzList=a.data:e.pzList=[])})},addOrUpdateTaskProcess:function(t){var e=this;Object(o.a)(t).then(function(t){var a=t.data;"success"==a.state?(e.isDisabled=0,e.$alert("添加成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){e.taskName="",e.xmbh="",e.rwbh="",e.closeDialogNum+=1,e.queryLogTaskProcess(1),e.dialogDialyVisible=!e.dialogDialyVisible}})):(e.isDisabled=0,e.$alert(a.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}}))})}},activated:function(){this.isJzuser=sessionStorage.getItem("isJZuser"),this.baseUrl=window.baseurl,this.endDate=(new Date).getFullYear()+"-"+("0"+((new Date).getMonth()+1)).slice(-2)+"-"+("0"+(new Date).getDate()).slice(-2),this.startDate=this.GetDateStr(-7),this.queryLogTaskProcess(1),Object(n.n)("gczd")?this.gczdList=Object(n.n)("gczd"):Object(n.i)("gczd",this.gczdList,!0)},components:{dailyParper:s.a,dialogTask:i.a,pagination:l.a}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"task-log"},[a("div",{staticClass:"task-log-addDailyPaper"},[a("el-button",{attrs:{type:"primary"},on:{click:t.handleDailyPaper}},[a("span",{staticClass:"el-icon-circle-plus"}),t._v(" 添加日报\n    ")])],1),t._v(" "),a("div",{staticClass:"task-log-date"},[a("el-date-picker",{staticStyle:{width:"130px"},attrs:{type:"date",size:"small",placeholder:"开始日期","value-format":"yyyy-MM-dd"},model:{value:t.startDate,callback:function(e){t.startDate=e},expression:"startDate"}}),t._v("至\n    "),a("el-date-picker",{staticStyle:{width:"130px"},attrs:{type:"date",size:"small",placeholder:"结束日期","value-format":"yyyy-MM-dd"},model:{value:t.endDate,callback:function(e){t.endDate=e},expression:"endDate"}}),t._v(" \n    "),a("span",{staticStyle:{"font-size":"14px"}},[t._v("阅读状态 :")]),t._v(" "),a("el-select",{staticStyle:{width:"80px"},on:{change:t.changeTaskydzt},model:{value:t.ydztValue,callback:function(e){t.ydztValue=e},expression:"ydztValue"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),a("el-option",{attrs:{label:"已读",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"未读",value:"0"}})],1),t._v(" \n    "),0==t.isJzuser?a("span",{staticStyle:{"font-size":"14px"}},[t._v("区域 :")]):t._e(),t._v(" "),0==t.isJzuser?a("el-select",{staticStyle:{width:"130px"},on:{change:t.changeTaskgcqy},model:{value:t.gcqyValue,callback:function(e){t.gcqyValue=e},expression:"gcqyValue"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),t._l(t.gczdList,function(t,e){return a("el-option",{key:e,attrs:{label:t.mc,value:t.label}})})],2):t._e(),t._v(" \n    "),a("span",{staticStyle:{"font-size":"14px"}},[t._v("范围 :")]),t._v(" "),a("el-select",{staticStyle:{width:"100px"},on:{change:t.changeTaskscope},model:{value:t.fwValue,callback:function(e){t.fwValue=e},expression:"fwValue"}},t._l(t.fwList,function(t,e){return a("el-option",{key:e,attrs:{label:t.label,value:t.value}})})),t._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{size:"small",placeholder:"项目编号/项目名称/填写人姓名"},on:{change:t.handleEnterlog},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v(" "),a("el-button",{attrs:{type:"info"},on:{click:t.checkTaskLog}},[t._v("查询")]),t._v("  \n    "),a("a",{attrs:{href:"javaScript:void(0)"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),a("div",{staticClass:"task-log-tabel"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","max-height":t.tableHeight}},[a("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{attrs:{flex:"",spacearound:""}},[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){t.handleTasklogDetail(e.$index,e.row)}}},[t._v("批注")]),t._v(" "),e.row.editable?a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){t.handleEditDetail(e.$index,e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),e.row.editable?a("el-button",{staticStyle:{color:"#f00"},attrs:{type:"text",size:"mini"},on:{click:function(a){t.handleDeleteDetail(e.$index,e.row)}}},[t._v("删除")]):t._e()],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"阅读状态",width:"90"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{attrs:{slot:"reference"},slot:"reference"},[0==e.row.ydzt?a("span",{staticClass:"tasklog-ydzt tasklog-ydzt-wy",attrs:{title:"点击设为已阅"},on:{click:function(a){t.handleReadlog(e.$index,e.row)}}},[t._v(t._s(e.row.ydzt_display))]):t._e(),t._v(" "),0!=e.row.ydzt?a("span",{class:{"tasklog-ydzt":!0,"tasklog-ydzt-yy":1==e.row.ydzt}},[t._v(t._s(1==e.row.ydzt?"已阅":e.row.ydzt_display))]):t._e()])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"cjrxm",label:"填写人",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号","show-overflow-tooltip":"",sortable:"",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":"",width:"260"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gcms",label:"内容","show-overflow-tooltip":"",width:"500"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpmc_display",label:"产品名称","show-overflow-tooltip":"",width:"180"}}),t._v(" "),a("el-table-column",{attrs:{prop:"rwmc_display",label:"任务名称","show-overflow-tooltip":"",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gcrq",label:"日报日期",width:"110",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cjsj",label:"填写时间",width:"160",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"gs",label:"工时(小时)",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{label:"附件"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("div",{on:{click:function(a){t.handleDownFile(e.$index,e.row,a)}}},t._l(e.row.fjData,function(e,s){return a("span",{key:s,attrs:{title:"点击下载","data-fj":e.fjbh}},[t._v(t._s(e.fjmc))])}))])]}}])})],1),t._v(" "),t.records>15?a("div",{staticStyle:{"text-align":"right",margin:"10px 0"}},[a("pagination",{attrs:{pageSize:t.pageSize,total:t.records},on:{handleCurrentChange:t.handleCurrentChange}})],1):t._e()],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogDialyVisible,title:"添加日志",width:"600px","close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogDialyVisible=e},close:t.handleCloseDialy}},[a("daily-parper",{attrs:{disabled:t.isDisabled,sign:t.sign,logInfo:t.logDetail,taskName:t.taskName,closeDialogNum:t.closeDialogNum,addBtnShow:!0},on:{resetForm:t.resetForm,handleSubmit:t.handleSubmit,addDailyTasks:t.addDailyTasks}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogTaskVisible,title:"关联任务",width:"900px","close-on-click-modal":!1},on:{"update:visible":function(e){t.dialogTaskVisible=e}}},[a("dialogTask",{attrs:{dialogTaskVisible:t.dialogTaskVisible},on:{chooseRevelenceTask:t.chooseRevelenceTask}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.tasklogDetailVisible,title:"日志详情",width:"700px","close-on-click-modal":!1},on:{"update:visible":function(e){t.tasklogDetailVisible=e}}},[a("div",{staticClass:"tasklog-detail"},[a("p",[a("span",[t._v("日报日期 :")]),t._v(" "),a("span",[t._v(t._s(t.taskDetail.gcrq))])]),t._v(" "),a("p",[a("span",[t._v("填写时间 :")]),t._v(" "),a("span",[t._v(t._s(t.taskDetail.cjsj))])]),t._v(" "),a("p",[a("span",[t._v("项目名称 :")]),t._v(" "),a("span",[t._v(t._s(""==t.taskDetail.xmmc?"无":t.taskDetail.xmmc))])]),t._v(" "),a("p",[a("span",[t._v("产品名称 :")]),t._v(" "),a("span",[t._v(t._s(""==t.taskDetail.cpmc?"无":t.taskDetail.cpmc))])]),t._v(" "),a("p",[a("span",[t._v("关联任务 :")]),t._v(" "),a("span",[t._v(t._s(""==t.taskDetail.rwmc?"无":t.taskDetail.rwmc))])]),t._v(" "),a("p",[a("span",[t._v("工时(小时) :")]),t._v(" "),a("span",[t._v(t._s(t.taskDetail.gs))])]),t._v(" "),a("p",[a("span",[t._v("日志内容 :")]),t._v(" "),a("span",[t._v(t._s(t.taskDetail.gcms))])]),t._v(" "),a("p",[a("span",[t._v("附件列表 :")]),t._v(" "),a("span",{staticClass:"name-wrapper"},t._l(t.taskDetail.fjData,function(e,s){return a("span",{key:s,attrs:{"data-fj":e.fjbh},on:{click:function(e){t.handleDownFile("","",e)}}},[t._v(t._s(e.fjmc))])}))]),t._v(" "),2==t.taskDetail.ydzt||0==t.isJzuser?a("p",{staticStyle:{border:"none"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pzList,border:"","max-height":"300"}},[a("el-table-column",{attrs:{prop:"yhxm",label:"姓名",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ydsj",label:"阅读日期",width:"155"}}),t._v(" "),a("el-table-column",{attrs:{prop:"bz",label:"批注","show-overflow-tooltip":""}})],1)],1):t._e(),t._v(" "),2!=t.taskDetail.ydzt?a("p",{staticStyle:{border:"none"},attrs:{flex:""}},[a("span",[t._v("批注:")]),t._v(" "),a("el-input",{attrs:{type:"textarea",rows:5,placeholder:"请输入批注内容",resize:"none"},model:{value:t.pzValue,callback:function(e){t.pzValue=e},expression:"pzValue"}})],1):t._e(),t._v(" "),a("div",{staticStyle:{"text-align":"right"}},[2!=t.taskDetail.ydzt?a("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleSaveDetail}},[t._v("更新批注")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"mini",type:"info"},on:{click:t.handleCloseDetail}},[t._v("取消")])],1)])])],1)},staticRenderFns:[]};var d=a("Z0/y")(r,c,!1,function(t){a("K/JX")},"data-v-3cd34fd6",null);e.default=d.exports}});
//# sourceMappingURL=96.268432dfd1631196af9a.js.map