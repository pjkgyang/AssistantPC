webpackJsonp([26],{"4XHU":function(t,e){},aj7r:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});s("mtWM");var a=s("9A7R"),l=(s("t5DY"),s("IfOk")),i=(s("YkBq"),s("nfA5")),n=s("RPTL"),r=s("uYz0"),o=s("oFuF"),c=s("kAAd"),u={data:function(){return{queryLJshow:!0,keyword:"",questionList:[],pageSize:10,CurrentPage:1,total:null,dwlxList:[{label:"1",mc:"学校"},{label:"0",mc:"金智"},{label:"2",mc:"合作伙伴"}],cpline:[],cplist:[],wtlb:[],wtlbbg:"",sfjj:"",sfcb:"",cpxbg:"",cpbg:"",sfbug:"",cxzt:"",wxyztbg:"",wjjztbg:"",gczd:"",wtfl:"",dwlx:"",wid:"",xmbh:"",xmmc:"",isJZuser:"",username:null,wtlbmc:"",baseUrl:"",starDay:"",endDay:""}},props:{},mounted:function(){this.username=sessionStorage.getItem("username"),this.isJZuser=sessionStorage.getItem("isJZuser"),null==Object(o.n)("cpx")?(Object(o.i)("cpx",this.cpline,!0),Object(o.i)("ProblemType",this.wtlb,""),Object(o.i)("cp",this.cplist,!0)):(this.cpline=Object(o.n)("cpx"),this.wtlb=Object(o.n)("ProblemType"),this.cplist=Object(o.n)("cp"))},methods:{handleQueryShow:function(){this.queryLJshow=!this.queryLJshow},handleQuestionDetail:function(t){var e=this.$router.resolve({name:"questionDetail",query:{wid:t.wid,f:"1"}});window.open(e.href,"_blank")},searchQuestion:function(){this.queryAllQuestions(1)},handlequeryQuestion:function(){this.queryAllQuestions(1)},handleCurrentChange:function(t){this.CurrentPage=t,this.queryAllQuestions(t)},changeStarDay:function(t){this.queryAllQuestions(1)},changeEndDay:function(t){this.queryAllQuestions(1)},handleCPX:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.cpxbg=e,this.queryAllQuestions(1))},handleCP:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.cpbg=e,this.queryAllQuestions(1))},handleWTLB:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.wtlbbg=e,this.queryAllQuestions(1))},handleDWLX:function(t){var e=t.target.getAttribute("data-type");null!=e&&(this.dwlx=e,this.queryAllQuestions(1))},queryAllQuestions:function(t){var e=this;Object(l.t)({curPage:t,pageSize:this.pageSize,xmbh:this.xmbh||"",urgent:this.sfjj,cp:this.cpbg,cpx:this.cpxbg,bug:this.sfbug,noResponse:this.wxyztbg,jjzt:this.wjjztbg,zt:this.cxzt,keyword:this.keyword||"",qyzd:this.gczd,wtfl:this.wtfl,dwlx:this.dwlx,cb:this.sfcb,wtlb:this.wtlbbg,isSolution:!0,starDay:this.starDay,endDay:this.endDay}).then(function(t){var s=t.data;"success"==s.state&&(null!=s.data.rows&&(e.questionList=s.data.rows),e.total=s.data.records)})}},watch:{},activated:function(){this.keyword=this.$route.params.dwmc,this.queryAllQuestions(1),this.baseUrl=window.baseurl},components:{pagination:a.a,itemChoose:i.a,zdfzrChoose:n.a,sqjsForm:r.a,questionCard:c.a}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"project-question"},[s("div",{staticClass:"project-question-query"},[s("div",[s("span",{staticClass:"query-title"},[s("span",{class:{"isshown-query":!0,"el-icon-arrow-down":!t.queryLJshow,"el-icon-arrow-up":t.queryLJshow},on:{click:t.handleQueryShow}}),t._v(" 高级查询")]),t._v(" "),s("el-input",{staticStyle:{width:"493px"},attrs:{size:"small",placeholder:"请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称"},on:{change:t.searchQuestion},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v("　\n              "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handlequeryQuestion}},[t._v("查询")])],1),t._v(" "),t.queryLJshow?s("div",{staticClass:"query-condition"},[s("div",[s("p",{staticClass:"query-title"},[t._v("提问时间:")]),t._v(" "),s("p",{staticClass:"query-list"},[s("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择开始日期","value-format":"yyyy-MM-dd"},on:{change:t.changeStarDay},model:{value:t.starDay,callback:function(e){t.starDay=e},expression:"starDay"}}),t._v(" 　 至 　 \n               "),s("el-date-picker",{attrs:{size:"mini",type:"date",placeholder:"选择结束日期","value-format":"yyyy-MM-dd"},on:{change:t.changeEndDay},model:{value:t.endDay,callback:function(e){t.endDay=e},expression:"endDay"}})],1)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("产品线:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleCPX}},[s("span",{class:{"bg-active":""==t.cpxbg},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.cpline,function(e,a){return s("span",{class:{"bg-active":t.cpxbg===e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("产品:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleCP}},[s("span",{class:{"bg-active":""==t.cpbg},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.cplist,function(e,a){return s("span",{class:{"bg-active":t.cpbg==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),s("div",[s("p",{staticClass:"query-title"},[t._v("问题类别:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleWTLB}},[s("span",{class:{"bg-active":""==t.wtlbbg},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.wtlb,function(e,a){return s("span",{class:{"bg-active":t.wtlbbg==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),0==t.isJZuser?s("div",[s("p",{staticClass:"query-title"},[t._v("单位类型:")]),t._v(" "),s("p",{staticClass:"query-list",on:{click:t.handleDWLX}},[s("span",{class:{"bg-active":""==t.dwlx},attrs:{"data-type":""}},[t._v("全部")]),t._v(" "),t._l(t.dwlxList,function(e,a){return s("span",{class:{"bg-active":t.dwlx==e.label},attrs:{"data-type":e.label}},[t._v(t._s(e.mc))])})],2)]):t._e()]):t._e()]),t._v(" "),s("div",{staticStyle:{background:"#fff","margin-top":"10px","box-shadow":"0 0 5px #ccc","border-radius":"5px",padding:"10px"}},[s("questionCard",{attrs:{questionList:t.questionList,isShow:!1},on:{handleQuestionDetail:t.handleQuestionDetail}}),t._v(" "),t.total>10?s("div",{staticStyle:{"margin-top":"10px","text-align":"right"}},[s("pagination",{attrs:{total:t.total,pageSize:t.pageSize},on:{handleCurrentChange:t.handleCurrentChange}})],1):t._e()],1)])},staticRenderFns:[]};var p=s("VU/8")(u,d,!1,function(t){s("c6vL")},"data-v-fb5dac66",null);e.default=p.exports},c6vL:function(t,e){},uYz0:function(t,e,s){"use strict";var a={data:function(){return{form:{nycd:"4",sfjj:"0",gs:0,sfbg:!1,gbsm:""}}},props:{gs:{type:Number,default:0}},methods:{submitForm:function(){/^\d+(\.\d+)?$/.test(this.form.gs)?(this.form.gs=this.gs,this.$emit("submitForm",this.form)):this.$alert("请填写正确工时","提示",{confirmButtonText:"确定",type:"warning"})},closeForm:function(){this.$emit("closeForm","")}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",size:"mini"}},[s("el-form-item",{attrs:{label:"难易程度"}},[s("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.nycd,callback:function(e){t.$set(t.form,"nycd",e)},expression:"form.nycd"}},[s("el-option",{attrs:{label:"高",value:"4"}}),t._v(" "),s("el-option",{attrs:{label:"中",value:"3"}}),t._v(" "),s("el-option",{attrs:{label:"一般",value:"2"}}),t._v(" "),s("el-option",{attrs:{label:"低",value:"1"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"是否紧急"}},[s("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.sfjj,callback:function(e){t.$set(t.form,"sfjj",e)},expression:"form.sfjj"}},[s("el-option",{attrs:{label:"是",value:"1"}}),t._v(" "),s("el-option",{attrs:{label:"否",value:"0"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"工时"}},[s("el-input",{staticStyle:{width:"174px"},attrs:{placeholder:"工时 例如:2.5",readonly:""},model:{value:t.gs,callback:function(e){t.gs=e},expression:"gs"}}),t._v(" "),s("span",{staticStyle:{color:"#A8A8A8","font-size":"14px","margin-left":"25px"}},[t._v("提示:该工时为回复累加工时,不能修改！")])],1),t._v(" "),s("el-form-item",{attrs:{label:"是否bug"}},[s("el-switch",{model:{value:t.form.sfbg,callback:function(e){t.$set(t.form,"sfbg",e)},expression:"form.sfbg"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"关闭说明"}},[s("el-input",{attrs:{type:"textarea",resize:"none",rows:"4"},model:{value:t.form.gbsm,callback:function(e){t.$set(t.form,"gbsm",e)},expression:"form.gbsm"}})],1),t._v(" "),s("el-form-item",{staticStyle:{"text-align":"right"}},[s("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("提交")]),t._v(" "),s("el-button",{attrs:{type:"info"},on:{click:t.closeForm}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]};var i=s("VU/8")(a,l,!1,function(t){s("4XHU")},"data-v-dbfa0784",null);e.a=i.exports}});
//# sourceMappingURL=26.ff25216e10b3dc5dd974.js.map