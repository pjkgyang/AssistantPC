webpackJsonp([95],{fWMy:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("aCns"),a=e("oFuF"),n={data:function(){return{currentPage:1,pageSize:25,dataList:{},queryData:{},routePath:"",queryMark:"",dialogVisible:!1,jsztMenu:[],jsztRadio:"0",jssm:"",jszts:"",wid:"",rygh:"",keyword:""}},methods:{handleExport:function(){var t="",s="";"lcbxq"==this.$route.params.id&&(t="assessment/exportYdkhlcbxqb.do",-1!=(s=window.location.hash.split("?")[1]).indexOf("&ydjl=1")&&(s=s.replace("&ydjl=1",""))),"wt"==this.$route.params.id&&(t="assessment/exportYdkhwtxqb.do",s=window.location.hash.split("?")[1]),"ts"==this.$route.params.id&&(t="assessment/exportYdkhtsxqb.do",s="yf="+this.queryData.yf+"&rywid="+this.queryData.rywid),"shgs"==this.$route.params.id&&(t="assessment/exportYdwtshgsxqb.do",s=window.location.hash.split("?")[1]+"&jszt="+this.jszts+"&keyword="+this.keyword),"ydjlwtxq"==this.$route.params.id&&(t="assessment/exportYdjlwtxqb.do",s=window.location.hash.split("?")[1]),window.open(window.baseurl+t+"?"+s)},handleCommit:function(){"0"==this.jsztRadio||this.jssm?this.xgjszt():this.$message({message:"请填写结算说明",type:"warning"})},handleXxwt:function(t,s,e){var i=this;if(this.wid=t[0],this.rygh=t[1],window.location.hash.includes("/khbbdetail/wt")||window.location.hash.includes("/khbbdetail/ydjlwtxq")||window.location.hash.includes("/khbbdetail/ts")||window.location.hash.includes("/khbbdetail/shgs")&&"问题标题"==e[s].zh){var a=this.$router.resolve({path:window.location.hash.includes("/khbbdetail/ts")?"/complaintDetail":"/questionDetail",query:{wid:t[0]}});window.open(a.href,"_blank")}else"shgs"==this.$route.params.id&&("核准工时"==e[s].zh?this.$get(this.API.nfxggs,{rygh:t[1],wid:t[0]}).then(function(s){"success"==s.state&&(s.data?i.$prompt("请输入工时","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^\d+(\.\d+)?$/,inputErrorMessage:"工时格式不正确"}).then(function(s){var e=s.value;i.$get(i.API.xggs,{wid:t[0],rygh:t[1],gs:e}).then(function(t){"success"==t.state&&i.$alert("修改成功","标题名称",{confirmButtonText:"确定",callback:function(t){i.ydwtshgsxqb()}})})}).catch(function(){}):i.$alert("对不起，您无权修改工时!如有疑问，请联系管理员;","提示",{confirmButtonText:"确定",type:"warning"}))}):"结算状态"==e[s].zh&&this.$get(this.API.nfxgjszt,{wid:t[0],rygh:t[1]}).then(function(t){"success"==t.state&&(t.data?i.dialogVisible=!0:i.$alert("对不起，您无权修改结算状态!如有疑问，请联系管理员;","提示",{confirmButtonText:"确定",type:"warning"}))}))},xgjszt:function(){var t=this;this.$get(this.API.xgjszt,{yf:this.queryData.yf,wid:this.wid,rygh:this.rygh,jszt:this.jsztRadio,jssm:this.jssm}).then(function(s){"success"==s.state&&(t.ydwtshgsxqb(),t.$message({showClose:!0,message:"保存成功~",type:"success"}),t.dialogVisible=!1)})},handleCurrentChange:function(t){this.queryData.curPage=t,this.routeGo()},getTsxqb:function(){var t=this;this.$get(this.API.ydkhtsxqb,this.queryData).then(function(s){"success"==s.state&&(t.dataList=s.data)})},getLcbxqb:function(){var t=this;this.$get(this.API.ydkhlcbxqb,this.queryData).then(function(s){"success"==s.state&&(t.dataList=s.data)})},getWtxqb:function(){var t=this;this.$get(this.API.ydkhwtxqb,this.queryData).then(function(s){"success"==s.state&&(t.dataList=s.data)})},ydjlwtxqb:function(){var t=this;this.$get(this.API.ydjlwtxqb,this.queryData).then(function(s){"success"==s.state&&(t.dataList=s.data)})},ydwtshgsxqb:function(){var t=this;this.$get(this.API.ydwtshgsxqb,{curPage:this.queryData.curPage,pageSize:this.pageSize,yf:this.queryData.yf,rywid:this.queryData.rywid,jszt:this.jszts,keyword:this.keyword}).then(function(s){"success"==s.state&&(t.dataList=s.data)})},routeGo:function(){switch(this.$route.params.id){case"ts":this.getTsxqb();break;case"wt":this.getWtxqb();break;case"shgs":this.ydwtshgsxqb();break;case"lcbxq":this.getLcbxqb();break;case"ydjlwtxq":this.ydjlwtxqb()}},handleSearch:function(){this.ydwtshgsxqb()},handleFilterJSZT:function(t){this.jszts=t,this.ydwtshgsxqb()}},mounted:function(){Object(a.n)("wtgsjszt")?this.jsztMenu=Object(a.n)("wtgsjszt"):Object(a.i)("wtgsjszt",this.jsztMenu,!0),this.queryData=this.$route.query,this.queryData.curPage=1,this.queryData.pageSize=this.pageSize,this.queryData.ydjl?(this.queryMark=this.queryData.ydjl,delete this.queryData.ydjl):this.queryMark="",this.routeGo()},components:{reportTable:i.a}},r={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"pd-10"},[e("div",{staticClass:"bgfff"},[e("h4",[t._v("\n\t\t\t"+t._s("ydjlwtxq"==t.$route.params.id||1==t.queryMark?"月度奖励":"shgs"==t.$route.params.id?"售后工时":"月度考核")+"报表 -"+t._s(t.$route.params.id.includes("ts")?"投诉详情":t.$route.params.id.includes("wt")?"问题详情":t.$route.params.id.includes("lcbxq")?"里程碑详情":t.$route.params.id.includes("shgs")?"售后工时详情":t.$route.params.id.includes("ydjlwtxq")?"问题详情":"详情")+"\n\t\t")]),t._v(" "),t.$route.params.id.includes("shgs")?e("div",[e("div",{attrs:{flex:""}},[e("p",{staticClass:"query-title"},[t._v("高级查询:")]),t._v(" "),e("p",[e("el-input",{staticStyle:{width:"493px"},attrs:{size:"mini",placeholder:"请输入问题标题/问题编号/发布人"},on:{change:t.handleSearch},model:{value:t.keyword,callback:function(s){t.keyword=s},expression:"keyword"}}),t._v("\n\t\t\t\t\t　\n\t\t\t\t\t"),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleSearch}},[t._v("查询")])],1)]),t._v(" "),e("div",{attrs:{flex:""}},[e("p",{staticClass:"query-title"},[t._v("结算状态:")]),t._v(" "),e("p",{staticClass:"query-list"},[e("span",{class:{"bg-active":""==t.jszts},on:{click:function(s){t.handleFilterJSZT("")}}},[t._v("全部")]),t._v(" "),t._l(t.jsztMenu,function(s){return e("span",{key:s.id,class:{"bg-active":t.jszts==s.label},on:{click:function(e){t.handleFilterJSZT(s.label)}}},[t._v(t._s(s.mc))])})],2)])]):t._e(),t._v(" "),e("div",{attrs:{"text-right":""}},[e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),e("reportTable",{attrs:{type:t.$route.params.id,tableData:t.dataList,pageShow:!0,currentPage:t.currentPage,pageSize:t.pageSize,exportShow:!1,indexArr:[],widthArr:"shgs"==t.$route.params.id?[3]:"wt"==t.$route.params.id||"ydjlwtxq"==t.$route.params.id?[1,4]:"ts"==t.$route.params.id?[1,3]:[2,6],rowWidth:(t.$route.params.id,"300"),Width:"140",Height:"shgs"==t.$route.params.id?240:180},on:{handleCurrentChange:t.handleCurrentChange,handleXxwt:t.handleXxwt}})],1),t._v(" "),e("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"500px"},on:{"update:visible":function(s){t.dialogVisible=s}}},[e("div",{staticClass:"jszt-dialog"},[e("h4",[t._v("请选择结算标志:")]),t._v(" "),e("el-radio-group",{model:{value:t.jsztRadio,callback:function(s){t.jsztRadio=s},expression:"jsztRadio"}},t._l(t.jsztMenu,function(s,i){return e("el-radio",{key:i,attrs:{label:s.label}},[t._v(t._s(s.mc))])})),t._v(" "),"0"!=t.jsztRadio?e("div",[e("h4",{staticClass:"before-require"},[t._v("结算说明:")]),t._v(" "),e("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入结算说明"},model:{value:t.jssm,callback:function(s){t.jssm=s},expression:"jssm"}})],1):t._e()],1),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{size:"mini"},on:{click:function(s){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleCommit}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var o=e("Z0/y")(n,r,!1,function(t){e("lPLT")},"data-v-401576f0",null);s.default=o.exports},lPLT:function(t,s){}});
//# sourceMappingURL=95.be9f5c65ff5ea867e2ec.js.map