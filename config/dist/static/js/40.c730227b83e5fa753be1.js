webpackJsonp([40],{"7BXw":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("aozt");var a=s("9A7R"),i=s("IfOk"),n=s("t5DY"),l=s("oFuF"),c=s("Vnos"),r={data:function(){return{questionTitle:"提交问题",show:!1,cnjsrq:"",queryLJshow:!0,keyword:"",questionList:[],pageSize:10,CurrentPage:1,total:null,dwlxList:[{label:"1",mc:"学校"},{label:"0",mc:"金智"},{label:"2",mc:"合作伙伴"}],cxzt:"0",sqgb:"",cpline:[],cplist:[],wtbqlist:[],wtbq:"",wtlb:[],wtlbbg:"",cpxbg:"",cpbg:"",dwlx:"",qusetionInfo:{},wid:"",xmbh:"",xmmc:"",accreditShow:!1,showCondition:"",isJZuser:"",SLbtnDisabled:!1,username:null,baseUrl:"",starDay:"",endDay:""}},props:{},mounted:function(){null!=window.userName?(this.username=window.userName,sessionStorage.setItem("username",window.userName)):this.username=sessionStorage.getItem("username"),this.isJZuser=JSON.parse(sessionStorage.getItem("userInfo")).unitType,Object(l.j)("cpx")&&Object(l.j)("ProblemType")&&Object(l.j)("cp")&&Object(l.j)("WTBQ")?(this.cpline=Object(l.j)("cpx"),this.wtlb=Object(l.j)("ProblemType"),this.cplist=Object(l.j)("cp"),this.wtbqlist=Object(l.j)("WTBQ")):(Object(l.g)("cpx",this.cpline,!0),Object(l.g)("ProblemType",this.wtlb,""),Object(l.g)("cp",this.cplist,!0),Object(l.g)("WTBQ",this.wtbqlist,!0))},methods:{handleExport:function(){this.keyword=this.keyword?this.keyword:"",window.open(window.baseurl+"question/exportQuestionReport.do?&cp="+this.cpbg+"&cpx="+this.cpxbg+"&zt="+this.cxzt+"&wtbq="+this.wtbq+"&sqgb="+this.sqgb+"&keyword="+this.keyword+"&dwlx="+this.dwlx+"&wtlb="+this.wtlbbg+"&starDay="+this.starDay+"&endDay="+this.endDay+"&isAnalyse=true&xmbh=")},handleTWsuccess:function(){switch(this.questionTitle){case"我要提问":this.queryAllQuestions(1);break;case"编辑问题":this.queryAllQuestions(this.CurrentPage)}},handleQueryShow:function(){this.queryLJshow=!this.queryLJshow},handleQuestionDetail:function(t){var e=t.target.getAttribute("data-wid"),s=this.$router.resolve({name:"questionDetail",query:{wid:e,bq:1}});window.open(s.href,"_blank")},editQuestion:function(t){var e=this;this.questionTitle="编辑问题";var s=t.currentTarget.getAttribute("data-wid");Object(n.b)({wid:s}).then(function(t){var a=t.data;"success"==a.state&&(a.data?Object(i.x)({wid:s}).then(function(t){var s=t.data;"success"==s.state?(e.qusetionInfo=s.data,e.accreditShow=!1,e.show=!0):e.$alert(s.msg,"提示",{confirmButtonText:"确定",callback:function(t){}})}):e.$alert("该条问题已有回复，不可编辑","提示",{confirmButtonText:"确定",callback:function(t){}}))})},deleteQuestion:function(t){var e=this,s=t.currentTarget.getAttribute("data-wid");this.$confirm("是否删除该条问题?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.h)({wids:s}).then(function(t){var s=t.data;"success"==s.state?e.$alert("删除成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){e.queryAllQuestions(1)}}):e.$alert(s.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})}).catch(function(){})},searchQuestion:function(){this.queryAllQuestions(1)},handlequeryQuestion:function(){this.queryAllQuestions(1)},handleCurrentChange:function(t){this.CurrentPage=t,this.queryAllQuestions(t)},changeStarDay:function(t){this.queryAllQuestions(1)},changeEndDay:function(t){this.queryAllQuestions(1)},handleCXZT:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.cxzt=e,this.queryAllQuestions(1))},handleSQGB:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.sqgb=e,this.queryAllQuestions(1))},handleWTBQ:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.wtbq=e,this.queryAllQuestions(1))},handleCPX:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.cpxbg=e,this.queryAllQuestions(1))},handleCP:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.cpbg=e,this.queryAllQuestions(1))},handleWTLB:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.wtlbbg=e,this.queryAllQuestions(1))},handleDWLX:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.dwlx=e,this.queryAllQuestions(1))},queryAllQuestions:function(t){var e=this;Object(i.q)({curPage:t,pageSize:this.pageSize,xmbh:"",cp:this.cpbg,cpx:this.cpxbg,zt:this.cxzt,sqgb:this.sqgb,keyword:this.keyword,dwlx:this.dwlx,wtlb:this.wtlbbg,wtbq:this.wtbq,starDay:this.starDay,endDay:this.endDay,isAnalyse:!0}).then(function(t){var s=t.data;"success"==s.state&&(null!=s.data.rows&&(e.questionList=s.data.rows),e.total=s.data.records)})}},watch:{},activated:function(){this.keyword=this.$route.params.dwmc,this.queryAllQuestions(1),this.baseUrl=window.baseurl},components:{pagination:a.a,twDialog:c.a}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"project-question"},[s("div",{staticClass:"project-question-query"},[s("div",[s("span",{class:{"isshown-query":!0,"el-icon-arrow-down":!t.queryLJshow,"el-icon-arrow-up":t.queryLJshow},on:{click:t.handleQueryShow}}),t._v(" "),s("span",{staticClass:"query-title"},[t._v("高级查询")]),t._v(" "),s("el-input",{staticStyle:{width:"493px"},attrs:{size:"small",placeholder:"请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称"},on:{change:t.searchQuestion},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v("　\n                "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handlequeryQuestion}},[t._v("查询")])],1),t._v(" "),t.queryLJshow?s("div",{staticClass:"query-condition"},[s("div",[s("p",{staticClass:"query-title"},[t._v("提问时间:")]),t._v(" "),s("p",{staticClass:"query-list"},[s("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择开始日期","value-format":"yyyy-MM-dd"},on:{change:t.changeStarDay},model:{value:t.starDay,callback:function(e){t.starDay=e},expression:"starDay"}}),t._v(" 　 至　 \n                 "),s("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择结束日期","value-format":"yyyy-MM-dd"},on:{change:t.changeEndDay},model:{value:t.endDay,callback:function(e){t.endDay=e},expression:"endDay"}})],1)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("查询状态:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleCXZT}},[s("span",{class:{"bg-active":""==t.cxzt},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),s("span",{class:{"bg-active":"0"==t.cxzt},attrs:{"data-type":"0"}},[t._v("处理中")]),t._v(" "),s("span",{class:{"bg-active":"1"==t.cxzt},attrs:{"data-type":"1"}},[t._v("已关闭")])])]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("申请关闭:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleSQGB}},[s("span",{class:{"bg-active":""==t.sqgb},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),s("span",{class:{"bg-active":"1"==t.sqgb},attrs:{"data-type":"1"}},[t._v("是")]),t._v(" "),s("span",{class:{"bg-active":"0"==t.sqgb},attrs:{"data-type":"0"}},[t._v("否")])])]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("问题标签:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleWTBQ}},[s("span",{class:{"bg-active":""==t.wtbq},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.wtbqlist,function(e,a){return s("span",{class:{"bg-active":t.wtbq===e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])}),t._v(" "),s("span",{class:{"bg-active":"-1"==t.wtbq},attrs:{"data-type":"-1"}},[t._v("无")])],2)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("产品线:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleCPX}},[s("span",{class:{"bg-active":""==t.cpxbg},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.cpline,function(e,a){return s("span",{class:{"bg-active":t.cpxbg===e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("产品:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleCP}},[s("span",{class:{"bg-active":""==t.cpbg},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.cplist,function(e,a){return s("span",{class:{"bg-active":t.cpbg==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("问题类别:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleWTLB}},[s("span",{class:{"bg-active":""==t.wtlbbg},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.wtlb,function(e,a){return s("span",{class:{"bg-active":t.wtlbbg==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("单位类型:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleDWLX}},[s("span",{class:{"bg-active":""==t.dwlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.dwlxList,function(e,a){return s("span",{class:{"bg-active":t.dwlx==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)])]):t._e()]),t._v(" "),s("div",{staticStyle:{background:"#fff","margin-top":"10px","box-shadow":"0 2px 12px 0 rgba(0,0,0,.1)","border-radius":"4px",padding:"10px 0"}},[s("div",{staticStyle:{padding:"0 10px","text-align":"right"}},[s("el-button",{staticStyle:{"margin-top":"8px"},attrs:{size:"mini",type:"primary"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),s("hr",{staticStyle:{"border-top":"1px solid #eee",margin:"8px 0 0 0 !important"}}),t._v(" "),s("ul",{staticClass:"project-question-list"},[t._l(t.questionList,function(e,a){return s("li",[s("div",{class:{"question-type":!0}},[s("span",{class:{"el-icon-question":1!=e.fbzt,"el-icon-success":1==e.fbzt}}),t._v(" "),s("p",{staticClass:"questionOperate"},[e.isdel?s("span",{staticClass:"el-icon-edit",attrs:{"data-wid":e.wid},on:{click:t.editQuestion}},[s("span",{staticStyle:{color:"#409EFF"}},[t._v(" 编辑")])]):t._e(),t._v(" \n                      "),e.isdel?s("span",{staticClass:"el-icon-delete",attrs:{"data-wid":e.wid},on:{click:t.deleteQuestion}},[s("span",{staticStyle:{color:"#f00"}},[t._v(" 删除")])]):t._e()])]),t._v(" "),s("div",{staticClass:"question-info"},[s("span",{staticClass:"question-info-bt",attrs:{"data-wid":e.wid},on:{click:t.handleQuestionDetail}},[t._v(t._s(e.bt))]),s("br"),t._v(" "),s("span",{staticStyle:{color:"#363748","font-size":"12px"}},[t._v(t._s(e.fbrq))]),t._v("　\n                  "),e.sqgbCount>0?s("span",{staticClass:"question-tag-ysqgb"},[t._v("已申请关闭")]):t._e(),t._v("　　\n                  "),s("p",[s("span",[s("span",{staticClass:"question-info-front"}),t._v("发布人 : "+t._s(e.fbrxm))]),t._v(" "),s("span",[s("span",{staticClass:"question-info-front"},[t._v("所属单位 : ")]),t._v(t._s(null==e.ssbm?"无":e.ssbm))]),t._v(" "),s("span",[s("span",{staticClass:"question-info-front"},[t._v("问题类别 : ")]),t._v(t._s(null==e.wtlb?"无":e.wtlb))])]),t._v(" "),s("p",[s("span",[s("span",{staticClass:"question-info-front"},[t._v("产品 : ")]),t._v(t._s(e.cpbh))]),t._v(" "),s("span",[s("span",{staticClass:"question-info-front"},[t._v("是否紧急 : ")]),t._v(t._s(null==e.jjyf?"无":"1"==e.jjyf?"是":"否"))]),t._v(" "),s("span",[s("span",{staticClass:"question-info-front"},[t._v("版本号 : ")]),t._v(t._s(e.bbh))])]),t._v(" "),e.bqMc?s("p",[s("span",{staticClass:"question-info-front"},[t._v("问题标签 : "),t._l(e.bqMc.split(","),function(e){return s("span",{staticClass:"question-wtbq"},[t._v(t._s(e))])})],2)]):t._e()]),t._v(" "),s("div",{staticClass:"question-state"},[s("span",{class:{"ygb-color":1==e.fbzt,"clz-color":1!=e.fbzt},staticStyle:{"font-size":"14px",color:"#f00"}},[t._v(t._s(e.lcMc))]),s("br"),t._v(" "),s("span",{staticStyle:{"font-size":"14px",color:"#7ECE64","margin-top":"5px"}},[s("span",{staticStyle:{"font-size":"12px",color:"#A8A8A8"}},[t._v("回复数")]),t._v(" 　"+t._s(e.replyCount))]),s("br"),t._v(" "),s("span",{staticStyle:{"font-size":"12px",color:"#A8A8A8"}},[1!=e.fbzt&&e.cnjsrq?s("span",[t._v("\n                         "+t._s((new Date).getTime()<new Date(e.cnjsrq).getTime()?Math.round((new Date(e.cnjsrq).getTime()-(new Date).getTime())/864e5)+" 天到期":"过期 "+Math.round(((new Date).getTime()-new Date(e.cnjsrq).getTime())/864e5)+" 天")+"\n                    ")]):t._e(),t._v(" "),1==e.fbzt&&e.cnjsrq?s("span",[t._v("\n                          "+t._s((e.sqgbsj?new Date(e.sqgbsj).getTime():e.gbsj?new Date(e.gbsj).getTime():(new Date).getTime())<new Date(e.cnjsrq).getTime()?Math.round((new Date(e.cnjsrq).getTime()-(e.sqgbsj?new Date(e.sqgbsj).getTime():e.gbsj?new Date(e.gbsj).getTime():(new Date).getTime()))/864e5)+" 天到期":"过期 "+Math.round(((e.sqgbsj?new Date(e.sqgbsj).getTime():e.gbsj?new Date(e.gbsj).getTime():(new Date).getTime())-new Date(e.cnjsrq).getTime())/864e5)+" 天")+"\n                    ")]):t._e()])])])}),t._v(" "),0==t.questionList.length?s("div",{staticStyle:{"text-align":"center","padding-top":"50px"}},[s("img",{attrs:{src:"static/img/empty.png",alt:""}}),t._v(" "),s("p",[t._v("暂无问题")])]):t._e()],2),t._v(" "),t.total>10?s("div",{staticStyle:{"margin-top":"10px","text-align":"right"}},[s("pagination",{attrs:{total:t.total,pageSize:t.pageSize},on:{handleCurrentChange:t.handleCurrentChange}})],1):t._e()]),t._v(" "),s("twDialog",{attrs:{show:t.show,questionTitle:t.questionTitle,accreditShow:t.accreditShow,questionInfo:t.qusetionInfo},on:{"update:show":function(e){t.show=e},handleTWsuccess:t.handleTWsuccess}})],1)},staticRenderFns:[]};var u=s("Z0/y")(r,o,!1,function(t){s("v/8r")},"data-v-2d80a1b4",null);e.default=u.exports},"v/8r":function(t,e){}});
//# sourceMappingURL=40.c730227b83e5fa753be1.js.map