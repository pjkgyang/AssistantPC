webpackJsonp([45],{"9WBs":function(t,e,i){"use strict";(function(t){var n=i("9A7R"),s=i("o6RA"),a=i("IfOk"),o=(i("1bZv"),i("YkBq")),c=i("nfA5"),l=i("RPTL");i("oFuF");e.a={data:function(){return{note:{backgroundImage:"url("+i("SQ3j")+")"},total:null,pageSize:10,keyword:"",complain:[],comments:[],replyContent:"",complainContent:"",wid:"",complainType:null,pageData:1,windowUnitType:"",complaintProcess:[],ZDcpjkrVisible:!1,zdTitle:"指定产品接口人",cpjkrValue:"",zdzrrValue:"",cpKeyword:"",tableData:[],jkrTotal:null,tsBtnAuth:{},HFbtnDisabled:!1,showCondition:"",queryLJshow:!0}},mounted:function(){var e=this;this.wid=this.$route.query.wid,window.location.hash.includes("h=1")?sessionStorage.setItem("Detailpannel",window.location.hash):sessionStorage.removeItem("Detailpannel"),this.windowUnitType=sessionStorage.getItem("isJZuser"),Object(a.P)().then(function(t){var i=t.data;e.showCondition=i.data}),t("#summernoteT").summernote({dialogsInBody:!0,placeholder:"请输入投诉内容",height:200,width:"100%",minHeight:250,maxHeight:"",lang:"zh-CN",focus:!0,toolbar:[["style",["bold","italic","underline","clear"]],["font",["strikethrough","superscript","subscript"]],["fontsize",["fontsize"]],["color",["color"]],["para",["ul","ol","paragraph"]],["height",["height"]],["picture"],["link",["linkDialogShow","unlink"]]]}),this.queryProcess(this.wid),this.complantBtnAuth(this.wid),this.getComplaint(this.wid),document.title="投诉详情"},computed:{},methods:{handleCommitReminder:function(){this.reply(2,"","催办成功")},handleCommitZdfzr:function(){this.ZDcpjkrVisible=!0,this.zdTitle="指定解决人",this.queryUser(1)},handleCommitCpjkr:function(){this.ZDcpjkrVisible=!0,this.zdTitle="指定产品接口人",this.queryCpData(1)},handleCommitSL:function(){"<p><br></p>"!=t("#summernoteT").summernote("code")&&""!=t("#summernoteT").summernote("code")?this.reply(6,"","受理成功"):this.$alert("请填写受理内容","提示",{confirmButtonText:"确定",type:"warning",callback:function(t){}})},handleCommitFK:function(){this.reply(7,"","反馈成功")},handleZrrChange:function(t){"指定产品接口人"==this.zdTitle?this.queryCpData(t):"指定解决人"==this.zdTitle&&this.queryUser(t)},queryComplainZRR:function(t){this.cpKeyword=t,"指定产品接口人"==this.zdTitle?this.queryCpData(1):"指定解决人"==this.zdTitle&&this.queryUser(1)},queryComplainUser:function(t){this.cpKeyword=t,"指定产品接口人"==this.zdTitle?this.queryCpData(1):"指定解决人"==this.zdTitle&&this.queryUser(1)},handleCommitZdr:function(t){"指定产品接口人"==this.zdTitle?this.reply(3,t.cymc+","+t.userId,"操作成功",t.nr):"指定解决人"==this.zdTitle&&this.reply(4,t.nickName+","+t.uid,"操作成功",t.nr),this.ZDcpjkrVisible=!1},handleClose:function(){this.ZDcpjkrVisible=!1},queryUser:function(t){var e=this;Object(o.u)({curPage:t,pageSize:10,Isexternal:"",keyword:this.cpKeyword}).then(function(t){var i=t.data;"success"==i.state&&(e.tableData=i.data.rows,e.jkrTotal=i.data.records)})},queryCpData:function(t){var e=this;Object(o.v)({curPage:t,pageSize:10,rylb:1,keyword:this.cpKeyword}).then(function(t){var i=t.data;"success"==i.state&&(e.tableData=i.data.rows,e.jkrTotal=i.data.records)})},handleCommitReply:function(){var e=this;this.replyContent=t("#summernoteT").summernote("code"),"<p><br></p>"==this.replyContent||""==this.replyContent?this.$alert("请输入回复内容","提示",{confirmButtonText:"确定",type:"warning"}):(this.HFbtnDisabled=!0,Object(s.g)({tswid:this.wid,tslx:1,content:this.replyContent}).then(function(i){var n=i.data;"success"==n.state?(e.HFbtnDisabled=!1,e.$alert("回复成功","提示",{confirmButtonText:"确定",type:"success",callback:function(i){e.queryProcess(e.wid),t("#summernoteT").summernote("code",""),e.getComments()}})):(e.$alert(n.msg,"提示",{confirmButtonText:"确定",type:"error"}),e.HFbtnDisabled=!1)}))},handleCloseComplain:function(){var t=this;this.$confirm("是否关闭该投诉?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.reply(5,"","关闭成功！","")}).catch(function(){})},reply:function(e,i,n,a){var o=this;Object(s.g)({tswid:this.wid,tslx:e,ryData:i,content:3==e||4==e?a:t("#summernoteT").summernote("code")}).then(function(i){var s=i.data;"success"==s.state?o.$alert(n,"提示",{confirmButtonText:"确定",type:"success",callback:function(i){5==e||6!=e&&7!=e||o.complantBtnAuth(o.wid),t("#summernoteT").summernote("code",""),o.queryProcess(o.wid),o.getComments()}}):o.$alert(s.msg,"提示",{confirmButtonText:"确定",type:"error"})})},getComplaint:function(e){var i=this;Object(s.f)({wid:e}).then(function(e){var n=e.data;"success"==n.state&&(i.complain=n.data,i.getComments(),3==i.complain.zt&&t("#summernoteT").summernote("destroy"))})},complantBtnAuth:function(t){var e=this;Object(s.h)({tswid:t}).then(function(t){var i=t.data;"success"==i.state&&(e.tsBtnAuth=i.data)})},queryProcess:function(t){var e=this;Object(a.z)({wid:t,isTs:!0}).then(function(t){var i=t.data;"success"==i.state&&(e.complaintProcess=i.data,e.complaintProcess.forEach(function(t,i,n){1==t.flag?e.complaintProcess[i].status="process":2==t.flag&&(e.complaintProcess[i].status="success")}))})},getComments:function(){var t=this;Object(s.e)({curPage:1,pageSize:99999,tswid:this.wid}).then(function(e){var i=e.data;"success"==i.state&&null!=i.data&&0!=i.data.length&&(t.comments=i.data.rows)})},closeComplaint:function(){var t=this;this.$confirm("是否确定关闭该条投诉?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.a)({tswid:t.wid}).then(function(e){"success"==e.data.state&&t.$alert("投诉已经关闭，感谢您的支持！","提示",{confirmButtonText:"确定",type:"success",callback:function(t){}})})}).catch(function(){})}},watch:{},activated:function(){},components:{pagination:n.a,itemChoose:c.a,zdfzrChoose:l.a}}}).call(e,i("L7Pj"))},Lyw6:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("9WBs"),s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticStyle:{"padding-top":"10px"}},[i("div",{staticClass:"complain-detail"},[i("section",[i("div",{staticStyle:{padding:"0 10px","margin-top":"10px"}},[i("div",{staticClass:"question-steps"},[i("el-steps",{attrs:{"align-center":"","finish-status":"success"}},t._l(t.complaintProcess,function(e,n){return i("el-step",{key:n,attrs:{status:e.status,title:e.mc}},[1==e.flag?i("i",{staticClass:"el-icon-time",attrs:{slot:"icon"},slot:"icon"}):t._e()])}))],1),t._v(" "),i("div",{staticStyle:{overflow:"hidden"}},[i("div",{staticClass:"complain-detail-cont"},[i("div",{staticStyle:{margin:"0 20px"}},[3!=t.complain.zt?i("img",{attrs:{src:"static/img/tousu.png",alt:""}}):t._e(),t._v(" "),3==t.complain.zt?i("span",{staticClass:"el-icon-success",staticStyle:{color:"#67C23A","font-size":"32px"}}):t._e()]),t._v(" "),i("div",{staticStyle:{width:"80%"}},[i("p",{staticStyle:{color:"#000",margin:"0"}},[t._v(t._s(t.complain.tsbt))]),t._v(" "),i("p",{staticStyle:{"font-size":"12px",color:"#363748"}},[t._v(t._s(t.complain.tssj))]),t._v(" "),i("p",{staticClass:"complain-detail-bt"},[i("span",[i("span",{staticClass:"complain-detail-front"},[t._v("投诉人单位 : ")]),t._v(t._s(t.complain.ssdwmc)+" ")]),t._v(" "),i("span",[i("span",{staticClass:"complain-detail-front"},[t._v("投诉人 : ")]),t._v(t._s(t.complain.tsrxm))])]),t._v(" "),i("p",{staticClass:"complain-detail-bt"},[i("span",[i("span",{staticClass:"complain-detail-front"},[t._v("项目 : ")]),t._v(t._s(t.complain.xmmc)+" ")])]),t._v(" "),i("p",{staticClass:"complain-detail-bt"},[i("span",[i("span",{staticClass:"complain-detail-front"},[t._v("产品 : ")]),t._v(t._s(t.complain.cpmc)+" ")])]),t._v(" "),i("p",{staticClass:"complain-detail-bt"},[i("span",[i("span",{staticClass:"complain-detail-front"},[t._v("投诉对象 : ")]),t._l(t.complain.ryTsData,function(e){return i("span",[t._v(t._s(e.yhxm)+"　")])})],2)])])]),t._v(" "),i("div",{staticClass:"complain-info",domProps:{innerHTML:t._s(t.complain.tsnr)}})])]),t._v(" "),i("div",{staticClass:"complain-detail-reply"},t._l(t.comments,function(e,n){return i("div",[i("div",{staticStyle:{background:"#F5F7FA",color:"#363748","margin-top":"10px",height:"44px","line-height":"44px"}},[i("span",[t._v(t._s(1==e.hflx?"回复":2==e.hflx?"催办":3==e.hflx?"产品":4==e.hflx?"指定":5==e.hflx?"关闭":6==e.hflx?"受理":"回答"))]),t._v(" "),i("span",{staticStyle:{"font-size":"12px",color:"#A8A8A8"}},[t._v("回复人:")]),t._v(t._s(e.hfrxm)+"　　\n                    "),i("span",{staticStyle:{"font-size":"12px",color:"#A8A8A8"}},[t._v("所属单位:")]),t._v(t._s(e.ssdw)+"　　"+t._s(e.hfsj)+"\n                    "),3==e.hflx||4==e.hflx?i("span",{staticStyle:{"font-size":"12px",color:"#A8A8A8","margin-left":"60px"}},[t._v(t._s(3==e.hflx?"产品接口人":"责任人")+" ：")]):t._e(),t._v(" "),t._l(e.ryTsData,function(e){return i("span",[t._v(t._s(e.yhxm))])})],2),t._v(" "),i("div",{staticClass:"complain-info",domProps:{innerHTML:t._s(e.hfnr)}})])}))]),t._v(" "),t._m(0),t._v(" "),i("div",{staticStyle:{"text-align":"right",padding:"10px 15px"}},[t.tsBtnAuth.sl?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCommitSL}},[t._v("受理")]):t._e(),t._v(" "),t.tsBtnAuth.fk?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCommitFK}},[t._v("投诉反馈")]):t._e(),t._v(" "),t.tsBtnAuth.zdrcp?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCommitCpjkr}},[t._v("指定产品接口人")]):t._e(),t._v(" "),t.tsBtnAuth.zdrjjr?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCommitZdfzr}},[t._v("指定解决人")]):t._e(),t._v(" "),t.tsBtnAuth.cb?i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCommitReminder}},[t._v("催办")]):t._e(),t._v(" "),t.tsBtnAuth.hf?i("el-button",{attrs:{type:"primary",size:"mini",disabled:t.HFbtnDisabled},on:{click:t.handleCommitReply}},[t._v("回复")]):t._e(),t._v(" "),t.tsBtnAuth.gb?i("el-button",{attrs:{type:"danger",size:"mini"},on:{click:t.handleCloseComplain}},[t._v("关闭投诉")]):t._e()],1),t._v(" "),i("el-dialog",{attrs:{title:t.zdTitle,visible:t.ZDcpjkrVisible,"close-on-click-modal":!1,width:"800px",top:"50px","append-to-body":""},on:{"update:visible":function(e){t.ZDcpjkrVisible=e}}},[i("div",{staticStyle:{padding:"10px"}},[i("zdfzrChoose",{attrs:{tableData:t.tableData,zdTitle:t.zdTitle,jkrTotal:t.jkrTotal},on:{handleClose:t.handleClose,handleCommitZdr:t.handleCommitZdr,queryComplainZRR:t.queryComplainZRR,queryComplainUser:t.queryComplainUser,handleCurrentChange:t.handleZrrChange}})],1)])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"quilleditor"},[e("div",{attrs:{id:"summernoteT"}})])}]};var a=function(t){i("qORG")},o=i("Z0/y")(n.a,s,!1,a,"data-v-60ac73fc",null);e.default=o.exports},qORG:function(t,e){}});
//# sourceMappingURL=45.2eadb8ff8d3c085c6766.js.map