webpackJsonp([59],{"+Qfx":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("3fu1"),o=n("9A7R"),s=n("IfOk"),a=n("kAAd"),r={data:function(){return{gxrShow:!1,wtInfo:{},index:"",questionList:[],curPage:1,pageSize:10,CurrentPage:1,total:null,Data:{},queryId:""}},props:{},mounted:function(){this.queryId=this.$route.params.id,this.getReportQuestion(1)},methods:{handleReject:function(t,e){var n=this;this.$confirm("确定驳回该申请, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.b)({wid:"",zbwid:t.wid}).then(function(t){var i=t.data;"success"==i.state?n.$alert("已成功驳回！","提示",{confirmButtonText:"确定",type:"success",callback:function(t){n.questionList[e].sqgbCount=0}}):n.$alert(i.msg,"提示",{confirmButtonText:"确定",type:"error"})})}).catch(function(){})},handleClose:function(t,e){this.wtInfo=t,this.index=e,this.gxrShow=!this.gxrShow},closeQuestion:function(){this.gxrShow=!this.gxrShow,this.questionList[this.index].fbzt=1,this.questionList[this.index].sqgbCount=0},getReportQuestion:function(t){this.Data=this.$route.query,this.Data.curPage=t,this.Data.pageSize=this.pageSize,this.queryReportQuestionList(this.Data)},queryReportQuestionList:function(t){var e=this;this.$get("questionPflist"==this.queryId?this.API.WtReportOrderStarLst:this.API.queryReportQuestionLst,t).then(function(t){"success"==t.state?(null!=t.data.rows&&(e.questionList=t.data.rows),e.total=t.data.records):e.$alert(t.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})})},handleCurrentChange:function(t){this.CurrentPage=t,this.getReportQuestion(t)},handleQuestionDetail:function(t){var e=this.$router.resolve({name:"questionDetail",query:{wid:t.wid}});window.open(e.href,"_blank")}},watch:{},activated:function(){},components:{pagination:o.a,gxrDialog:i.a,questionCard:a.a}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"project-question"},[n("div",{staticClass:"project-question-detailList"},[n("questionCard",{attrs:{questionList:t.questionList},on:{handleQuestionDetail:t.handleQuestionDetail,handleReject:t.handleReject,handleClose:t.handleClose}}),t._v(" "),t.total>10?n("div",{staticStyle:{padding:"5px 10px 10px 0","text-align":"right"}},[n("pagination",{attrs:{total:t.total,pageSize:t.pageSize},on:{handleCurrentChange:t.handleCurrentChange}})],1):t._e()],1),t._v(" "),n("gxrDialog",{attrs:{show:t.gxrShow,wtInfo:t.wtInfo},on:{"update:show":function(e){t.gxrShow=e},closeQuestion:t.closeQuestion}})],1)},staticRenderFns:[]};var c=n("Z0/y")(r,u,!1,function(t){n("3ItA")},"data-v-98abea98",null);e.default=c.exports},"3ItA":function(t,e){}});
//# sourceMappingURL=59.c190cfabcbd49ad93314.js.map