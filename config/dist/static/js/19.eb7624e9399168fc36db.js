webpackJsonp([19],{"4PuL":function(t,e){},B2c5:function(t,e){},EOdI:function(t,e,s){"use strict";var i={data:function(){return{visible:this.show,form:{sfxq:"0",sm:""}}},props:{show:{type:Boolean,default:!1},xmData:{type:Object,default:function(){return{}}}},methods:{onSubmit:function(){"0"==this.form.sfxq&&/^[\s]*$/.test(this.form.sm)?this.$message({message:"请填写说明内容",type:"warning"}):this.$emit("handleSubmit",this.form)}},watch:{show:function(t,e){this.visible=this.show}},components:{}},a={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dialog-xmfk"},[s("el-dialog",{attrs:{title:"项目反馈",width:"1000px",top:"30px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[s("div",{staticStyle:{padding:"10px 15px"}},[s("el-form",{ref:"form",staticClass:"xmfk-form",attrs:{model:t.form,"label-width":"140px"}},[s("el-form-item",{attrs:{label:"当前项目续签状态："}},[s("span",[t._v(t._s(1==t.xmData.xqwb?"是":"否"))])]),t._v(" "),s("el-form-item",{attrs:{label:"当前项目续签说明："}},[s("span",[t._v(t._s(t.xmData.xqwbsm?t.xmData.xqwbsm:"无"))])]),t._v(" "),s("el-form-item",{attrs:{label:"是否续签"}},[s("el-radio-group",{model:{value:t.form.sfxq,callback:function(e){t.$set(t.form,"sfxq",e)},expression:"form.sfxq"}},[s("el-radio",{attrs:{label:"1"}},[t._v("是")]),t._v(" "),s("el-radio",{attrs:{label:"0"}},[t._v("否")])],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"说明",required:"0"==t.form.sfxq}},[s("el-input",{attrs:{type:"textarea"},model:{value:t.form.sm,callback:function(e){t.$set(t.form,"sm",e)},expression:"form.sm"}})],1),t._v(" "),s("el-form-item",{attrs:{"text-right":""}},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.onSubmit}},[t._v("保存")]),t._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(e){t.visible=!1}}},[t._v("关闭")])],1)],1)],1)])],1)},staticRenderFns:[]};var l=s("VU/8")(i,a,!1,function(t){s("y0ZS")},"data-v-56eb867c",null);e.a=l.exports},"OP1+":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("TloA"),a=s("Apg0"),l=s("EOdI"),r=s("oFuF"),n=s("nfA5"),o={data:function(){return{dialogQuestionVisible:!1,visible:this.show,gbclList:[],zrrList:[],gzztList:[],form:{xmbh:"",gbcl:"",gbgzzt:"",zrrbh:"",zrrxm:"",yjqdrq:"",yjqdje:"",xbxmbh:"",xbxmmc:"",sm:""}}},props:{show:{type:Boolean,default:!1},xmbh:{type:String,default:""}},methods:{onSubmit:function(){this.validate()&&(2==this.form.gbcl&&(this.form.xbxmmc=this.form.xbxmbh=this.sm=""),4!=this.form.gbcl&&5!=this.form.gbcl||(this.form.yjqdrq=this.form.yjqdje=this.form.xbxmmc=this.form.xbxmbh=this.sm=""),1==this.form.gbcl&&(this.form.yjqdrq=this.form.yjqdje=this.form.gbgzzt=this.sm=""),3!=this.form.gbcl&&6!=this.form.gbcl&&7!=this.form.gbcl||(this.form.yjqdrq=this.form.yjqdje=this.form.gbgzzt=this.form.xbxmmc=this.form.xbxmbh=""),this.$emit("handleSubmit",this.form))},handleSelect:function(t){var e=this;this.zrrList.forEach(function(s){t==s.cybh&&(e.form.zrrxm=s.cymc.split("(")[0])})},addQuestiontItem:function(){this.dialogQuestionVisible=!0},handleChooseItem:function(t){this.form.xbxmmc=t.xmmc,this.form.xbxmbh=t.xmbh,this.dialogQuestionVisible=!1},getTeamMembers:function(){var t=this;this.$get(this.API.getTeamMembers,{xmbh:this.xmbh}).then(function(e){"success"==e.state?t.zrrList=e.data?e.data:[]:t.$message({message:e.msg,type:"error"})})},validate:function(){if(!this.form.gbcl)return this.$message({message:"请选择过保策略",type:"warning"}),!1;if(!this.form.zrrbh)return this.$message({message:"请选择责任人",type:"warning"}),!1;if(2==this.form.gbcl){if(!/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(this.form.yjqdje))return this.$message({message:"请填写正确金额",type:"warning"}),!1;if(!this.form.yjqdrq)return this.$message({message:"请选择签单日期",type:"warning"}),!1;if(!this.form.gbgzzt)return this.$message({message:"请选择过保跟踪状态",type:"warning"}),!1}return 1!=this.form.gbcl||this.form.xbxmbh?4!=this.form.gbcl&&5!=this.form.gbcl||this.form.gbgzzt?!!(3!=this.form.gbcl&&6!=this.form.gbcl&&7!=this.form.gbcl||this.form.sm)||(this.$message({message:"请填写说明内容",type:"warning"}),!1):(this.$message({message:"请选择过保跟踪状态",type:"warning"}),!1):(this.$message({message:"请选择续保合同",type:"warning"}),!1)}},watch:{show:function(t,e){this.visible=this.show,t&&(this.gbclList=[],this.gzztList=[],Object(r.n)("gbcl")?this.gbclList=Object(r.n)("gbcl"):Object(r.i)("OverProtectionStrategy",this.gbclList,""),Object(r.n)("gzzt")?this.gzztList=Object(r.n)("gzzt"):Object(r.i)("OverProtectionTrackStatus",this.gzztList,""),this.getTeamMembers())}},components:{itemChoose:n.a}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dialog-xmfk"},[s("el-dialog",{attrs:{title:"过保反馈",width:"1000px",top:"30px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[s("div",{staticStyle:{padding:"10px 15px"}},[s("el-form",{ref:"form",staticClass:"xmfk-form",attrs:{model:t.form,"label-width":"140px"}},[s("el-form-item",{attrs:{label:"过保策略",required:""}},[s("el-radio-group",{model:{value:t.form.gbcl,callback:function(e){t.$set(t.form,"gbcl",e)},expression:"form.gbcl"}},t._l(t.gbclList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.label}},[t._v(t._s(e.mc))])}))],1),t._v(" "),s("el-form-item",{attrs:{label:"责任人",required:""}},[s("el-select",{attrs:{size:"mini",placeholder:"请选择责任人"},on:{change:t.handleSelect},model:{value:t.form.zrrbh,callback:function(e){t.$set(t.form,"zrrbh",e)},expression:"form.zrrbh"}},t._l(t.zrrList,function(t,e){return s("el-option",{key:e,attrs:{label:t.cymc,value:t.cybh}})}))],1),t._v(" "),2==t.form.gbcl?s("el-form-item",{attrs:{label:"预计签单日期",required:""}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{size:"mini",type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.form.yjqdrq,callback:function(e){t.$set(t.form,"yjqdrq",e)},expression:"form.yjqdrq"}})],1):t._e(),t._v(" "),2==t.form.gbcl?s("el-form-item",{attrs:{label:"预计签单金额(元)",required:""}},[s("el-input",{attrs:{size:"mini",placeholder:"请输入预计签单金额"},model:{value:t.form.yjqdje,callback:function(e){t.$set(t.form,"yjqdje",e)},expression:"form.yjqdje"}})],1):t._e(),t._v(" "),2==t.form.gbcl||4==t.form.gbcl||5==t.form.gbcl?s("el-form-item",{attrs:{label:"当前跟踪状态",required:""}},[s("el-radio-group",{model:{value:t.form.gbgzzt,callback:function(e){t.$set(t.form,"gbgzzt",e)},expression:"form.gbgzzt"}},t._l(t.gzztList,function(e,i){return s("el-radio",{key:i,attrs:{label:e.label}},[t._v(t._s(e.mc))])}))],1):t._e(),t._v(" "),1==t.form.gbcl?s("el-form-item",{attrs:{label:"续保合同",required:""}},[s("el-input",{staticStyle:{width:"100%"},attrs:{size:"mini",type:"text",readonly:"",placeholder:"请选择项目"},model:{value:t.form.xbxmmc,callback:function(e){t.$set(t.form,"xbxmmc",e)},expression:"form.xbxmmc"}},[s("el-button",{attrs:{slot:"append",icon:"el-icon-circle-plus-outline"},on:{click:t.addQuestiontItem},slot:"append"})],1)],1):t._e(),t._v(" "),3==t.form.gbcl||6==t.form.gbcl||7==t.form.gbcl?s("el-form-item",{attrs:{label:"说明",required:""}},[s("el-input",{attrs:{type:"textarea"},model:{value:t.form.sm,callback:function(e){t.$set(t.form,"sm",e)},expression:"form.sm"}})],1):t._e(),t._v(" "),s("el-form-item",{attrs:{"text-right":""}},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.onSubmit}},[t._v("保存")]),t._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(e){t.visible=!1}}},[t._v("关闭")])],1)],1)],1)]),t._v(" "),s("el-dialog",{attrs:{title:"选择项目",visible:t.dialogQuestionVisible,"close-on-click-modal":!1,width:"800px",top:"30px","append-to-body":""},on:{"update:visible":function(e){t.dialogQuestionVisible=e}}},[s("div",{staticStyle:{padding:"10px"}},[s("itemChoose",{on:{handleEdit:t.handleChooseItem}})],1)])],1)},staticRenderFns:[]};var m=s("VU/8")(o,c,!1,function(t){s("4PuL")},"data-v-b4b4214e",null).exports,h=s("IfOk"),b={data:function(){return{xmData:{},tableHeight:window.innerHeight-390,xmlbMenu:[{mc:"软件",id:"软件"},{mc:"集成",id:"集成"},{mc:"服务",id:"服务"}],gxhtMenu:[{mc:"是",id:"1"},{mc:"否",id:"0"}],xmbqMenu:[{mc:"收藏项目",id:"1"},{mc:"高风险项目",id:"2"},{mc:"我拥有的项目",id:"3"},{mc:"我参与的项目",id:"4"},{mc:"已关闭的项目",id:"5"}],xmztMenu:[{mc:"在建",id:"1"},{mc:"售后",id:"2"},{mc:"过保",id:"3"},{mc:"已关闭",id:"4"}],ywzrrList:[{id:"",label:"全部"},{id:"1",label:"有"},{id:"0",label:"无"}],qdrqList:[{id:"0",label:"当年"},{id:"1",label:"明年"},{id:"2",label:"自定义"}],gczdList:[],htxzList:[],gbclList:[],gzztList:[],keyword:"",xmztC:"",xmlbC:"",gxhtC:"",xmbqC:"",gczdC:"",sfxqC:"",gbcl:"",ywzrr:"",yjqdrq:"2",yjqdksrq:"",yjqdjsrq:"",qdrq:[],minqdje:0,maxqdje:0,gzzt:"",allfbData:[],curPage:1,pageSize:15,totalNum:null,baseUrl:null,xmkbkeyword:"",isNone:!1,myItemData:{},emptyArray:[],urlData:{},gbtxShow:!1,gbtxjlShow:!1,xmfkShow:!1,gbfkShow:!1,userGroup:"",xmbh:"",gbrqValue:[],gbksrqValue:"",gbjsrqValue:"",gbtjShow:!1}},mounted:function(){Object(r.n)("gczd")?this.gczdList=Object(r.n)("gczd"):Object(r.i)("gczd",this.gczdList,!0),Object(r.n)("gbcl")?this.gbclList=Object(r.n)("gbcl"):Object(r.i)("OverProtectionStrategy",this.gbclList,""),Object(r.n)("gzzt")?this.gzztList=Object(r.n)("gzzt"):Object(r.i)("OverProtectionTrackStatus",this.gzztList,""),this.baseUrl=window.baseurl;JSON.parse(sessionStorage.getItem("shown"));this.userGroup=JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag,this.getProjects(1)},methods:{handleRouterXxkb:function(t){var e=this.$router.resolve({path:"/xxtsql",query:{dwmc:escape(t.dwmc),bh:t.wid}});window.open(e.href,"_blank")},handleSubmitGbfk:function(t){var e=this;t.xmbh=this.xmbh,this.$post(this.API.overProtectionFeedback,t).then(function(t){"success"==t.state?(e.$message({message:"提交成功~",type:"success"}),e.getProjects(e.curPage),e.gbfkShow=!1):e.$message({message:t.msg,type:"error"})})},handleSubmit:function(t){var e=this;this.$post(this.API.projectFeedback,{xmbh:this.xmData.xmbh,sm:t.sm,sfxq:t.sfxq}).then(function(t){"success"==t.state?(e.xmfkShow=!1,e.getProjects(e.curPage),e.$message({message:"保存成功~",type:"success"})):e.$message({message:t.msg,type:"error"})})},handleExport:function(){this.gbksrqValue=this.gbksrqValue?this.gbksrqValue:"",this.gbjsrqValue=this.gbjsrqValue?this.gbjsrqValue:"",this.minqdje=this.minqdje?this.minqdje:"",this.maxqdje=this.maxqdje?this.maxqdje:"",window.open(this.baseUrl+"project/exportXmData.do?keyword="+this.keyword+"&xmzt="+this.xmztC+"&xmlb="+this.xmlbC+"&sfgx="+this.gxhtC+"&projectLabel="+this.xmbqC+"&gbsjStart="+this.gbksrqValue+"&gbsjEnd="+this.gbjsrqValue+"&qygc="+this.gczdC+"&sfxq="+this.sfxqC+"&htxz="+this.htxzList.join(",")+"&gbcl="+this.gbcl+"&gbzrr="+this.ywzrr+"&yjqdksrq="+this.yjqdksrq+"&yjqdjsrq="+this.yjqdjsrq+"&minqdje="+this.minqdje+"&maxqdje="+this.maxqdje+"&gbgzzt="+this.gzzt)},handleCommand:function(t,e){this.xmbh=e,1==t?this.gbtxShow=!0:this.gbtxjlShow=!0},handleCommandXmfk:function(t){this.xmData=t,this.xmfkShow=!0},handleCommandGbfk:function(t){this.xmbh=t.xmbh,this.gbfkShow=!0},handlePage:function(t){var e=this;event.currentTarget.parentNode.parentNode.parentNode.parentNode;event.target.className.includes("el-icon-star")?Object(h.g)({xmbh:t.xmbh}).then(function(t){"success"==t.data.state&&e.getMyProjects(1)}):(t.isAll=!1,this.$router.push({name:"Task",params:{data:t}}))},handleChangeDate:function(t){this.getProjects(1)},getProjects:function(t){var e=this;this.yjqdksrq="0"==this.yjqdrq?(new Date).getFullYear()+"-01-01":"1"==this.yjqdrq?(new Date).getFullYear()+1+"-01-01":this.qdrq[0]?this.qdrq[0]:"",this.yjqdjsrq="0"==this.yjqdrq?(new Date).getFullYear()+"-12-31":"1"==this.yjqdrq?(new Date).getFullYear()+1+"-12-31":this.qdrq[1]?this.qdrq[1]:"",Object(h.r)({curPage:t,pageSize:this.pageSize,keyword:this.keyword,xmzt:this.xmztC,xmlb:this.xmlbC,sfgx:this.gxhtC,pl:this.xmbqC,sfxq:this.sfxqC,htxz:this.htxzList.join(","),qygc:this.gczdC,gbsjStart:this.gbksrqValue,gbsjEnd:this.gbjsrqValue,gbcl:this.gbcl,gbzrr:this.ywzrr,yjqdksrq:this.yjqdksrq,yjqdjsrq:this.yjqdjsrq,minqdje:this.minqdje?this.minqdje:"",maxqdje:this.maxqdje?this.maxqdje:"",gbgzzt:this.gzzt}).then(function(t){var s=t.data;"success"==s.state&&(e.allfbData=s.data.rows,e.totalNum=s.data.records)})},handleCheckGbtj:function(){this.gbtjShow=!this.gbtjShow},handleSearch:function(){this.getProjects(1)},SearchItem:function(){this.getProjects(1)},CheckXmlb:function(t){var e=t.target.getAttribute("data-xmlb");this.xmlbC=e,this.getProjects(1)},CheckXmzt:function(t){this.xmztC=t,this.getProjects(1)},CheckGxht:function(t){var e=t.target.getAttribute("data-gxht");this.gxhtC=e,this.getProjects(1)},CheckXmbq:function(t){var e=t.target.getAttribute("data-xmbq");this.xmbqC=e,this.getProjects(1)},handleChooseSfxq:function(){this.getProjects(1)},handleHtxz:function(){this.getProjects(1)},CheckGcdz:function(t){this.gczdC=t,this.getProjects(1)},CheckGbcl:function(t){this.gbcl=t||"",this.getProjects(1)},CheckYwzrr:function(t){this.ywzrr=t,this.getProjects(1)},CheckYjqdrq:function(t){this.yjqdrq=t,this.getProjects(1)},CheckGzzt:function(t){this.gzzt=t||"",this.getProjects(1)},handleCurrentChange:function(t){this.curPage=t,this.getProjects(t)},handleEdit:function(t,e,s,i){this.$router.push({name:"Task",params:{data:e}})},handleAddXB:function(t,e,s,i){var a=this;Object(h.g)({xmbh:e.xmbh}).then(function(t){"success"==t.data.state&&(i.target.className.includes("el-icon-star-off")?e.isxb=!0:i.target.className.includes("el-icon-star-on")&&(e.isxb=!1),1==a.xmbqC&&a.getProjects(1))})}},components:{pagination:s("9A7R").a,gbtxDialog:i.a,gbtxjlDialog:a.a,xmfkDialog:l.a,gbfkDialog:m}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("section",{staticClass:"project_more_table"},[s("div",[s("div",{staticClass:"project_more_choose"},[s("div",[s("span",{staticClass:"table-menu-name",staticStyle:{padding:"2px 4px","margin-right":"10px"}},[t._v("高级查询:")]),t._v(" "),s("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入项目编号/项目名称/合同编号/项目经理/学校/过保责任人","prefix-icon":"el-icon-search",size:"small"},on:{change:t.SearchItem},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v("\n\t\t\t\t\t\t　\n\t\t\t\t\t\t"),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleCheckGbtj}},[t._v("过保条件")]),t._v(" "),s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleSearch}},[t._v("搜索")]),t._v(" "),s("a",{staticClass:"project_more_export",attrs:{href:"javaScript:void(0)"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),s("div",[s("p",[s("span",{staticClass:"table-menu-name"},[t._v("项目标签:")]),t._v(" "),s("span",{class:{"bg-active":""==t.xmbqC},attrs:{"data-xmbq":""},on:{click:t.CheckXmbq}},[t._v("全部")]),t._v(" "),t._l(t.xmbqMenu,function(e){return s("span",{key:e.id,class:{"bg-active":e.id==t.xmbqC},attrs:{"data-xmbq":e.id},on:{click:t.CheckXmbq}},[t._v(t._s(e.mc))])})],2),t._v(" "),s("div",{attrs:{flex:""}},[s("p",[s("span",{staticClass:"table-menu-name"},[t._v("项目状态:")]),t._v(" "),s("span",{class:{"bg-active":""==t.xmztC},on:{click:function(e){t.CheckXmzt("")}}},[t._v("全部")]),t._v(" "),t._l(t.xmztMenu,function(e){return s("span",{key:e.id,class:{"bg-active":e.id==t.xmztC},on:{click:function(s){t.CheckXmzt(e.id)}}},[t._v(t._s(e.mc))])})],2),t._v(" "),s("p",[s("span",{staticClass:"table-menu-name"},[t._v("项目类别:")]),t._v(" "),s("span",{class:{"bg-active":""==t.xmlbC},attrs:{"data-xmlb":""},on:{click:t.CheckXmlb}},[t._v("全部")]),t._v(" "),t._l(t.xmlbMenu,function(e){return s("span",{key:e.id,class:{"bg-active":e.id==t.xmlbC},attrs:{"data-xmlb":e.id},on:{click:t.CheckXmlb}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.mc)+"\n\t\t\t\t\t\t\t\t")])})],2)]),t._v(" "),s("div",{attrs:{flex:""}},[s("p",{staticStyle:{width:"382px"}},[s("span",{staticClass:"table-menu-name"},[t._v("是否购销合同:")]),t._v(" "),s("span",{class:{"bg-active":""==t.gxhtC},attrs:{"data-gxht":""},on:{click:t.CheckGxht}},[t._v("全部")]),t._v(" "),t._l(t.gxhtMenu,function(e){return s("span",{key:e.id,class:{"bg-active":e.id==t.gxhtC},attrs:{"data-gxht":e.id},on:{click:t.CheckGxht}},[t._v("\n\t\t\t\t\t\t\t\t\t"+t._s(e.mc)+"\n\t\t\t\t\t\t\t\t")])})],2),t._v(" "),s("p",{attrs:{colcenter:""}},[s("span",{staticClass:"table-menu-name"},[t._v("合同性质:")]),t._v(" "),s("el-checkbox-group",{on:{change:t.handleHtxz},model:{value:t.htxzList,callback:function(e){t.htxzList=e},expression:"htxzList"}},[s("el-checkbox",{attrs:{label:"A"}},[t._v("正式")]),t._v(" "),s("el-checkbox",{attrs:{label:"C"}},[t._v("在谈")])],1)],1),t._v("\n\t\t\t\t\t\t\t　　　\n\t\t\t\t\t\t\t")]),t._v(" "),t.gbtjShow?s("div",[s("div",{attrs:{flex:""}},[s("p",[s("span",{staticClass:"table-menu-name"},[t._v("过保日期:")]),t._v(" "),s("span",[s("el-date-picker",{staticStyle:{},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"date",placeholder:"过保开始日期"},on:{change:t.handleChangeDate},model:{value:t.gbksrqValue,callback:function(e){t.gbksrqValue=e},expression:"gbksrqValue"}})],1),t._v("\n\t\t\t\t\t\t\t\t\t至  \n\t\t\t\t\t\t\t\t\t"),s("span",[s("el-date-picker",{staticStyle:{},attrs:{size:"mini","value-format":"yyyy-MM-dd",type:"date",placeholder:"过保结束日期"},on:{change:t.handleChangeDate},model:{value:t.gbjsrqValue,callback:function(e){t.gbjsrqValue=e},expression:"gbjsrqValue"}})],1)]),t._v("\n\t\t\t\t\t\t\t\t　\n\t\t\t\t\t\t\t")]),t._v(" "),s("div",{attrs:{flex:""}},[s("p",[s("span",{staticClass:"table-menu-name"},[t._v("过保策略:")]),t._v(" "),s("span",{class:{"bg-active":""==t.gbcl},on:{click:function(e){t.CheckGbcl("")}}},[t._v("全部")]),t._v(" "),t._l(t.gbclList,function(e,i){return s("span",{key:i,class:{"bg-active":t.gbcl==e.label},on:{click:function(s){t.CheckGbcl(e.label)}}},[t._v(t._s(e.mc))])})],2),t._v(" "),s("p",[s("span",{staticClass:"table-menu-name"},[t._v("过保有无责任人:")]),t._v(" "),t._l(t.ywzrrList,function(e,i){return s("span",{key:i,class:{"bg-active":t.ywzrr==e.id},on:{click:function(s){t.CheckYwzrr(e.id)}}},[t._v(t._s(e.label))])})],2)]),t._v(" "),s("div",{attrs:{flex:""}},[s("p",[s("span",{staticClass:"table-menu-name"},[t._v("预计签单日期:")]),t._v(" "),t._l(t.qdrqList,function(e,i){return s("span",{key:i,class:{"bg-active":t.yjqdrq==e.id},on:{click:function(s){t.CheckYjqdrq(e.id)}}},[t._v(t._s(e.label))])}),t._v(" "),2==t.yjqdrq?s("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",size:"mini",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.qdrq,callback:function(e){t.qdrq=e},expression:"qdrq"}}):t._e()],2)]),t._v(" "),s("div",{attrs:{flex:""}},[s("p",[s("span",{staticClass:"table-menu-name"},[t._v("过保预计签单金额:")]),t._v("\n\t\t\t\t\t\t\t\t\t从　"),s("el-input-number",{attrs:{size:"mini",step:1},model:{value:t.minqdje,callback:function(e){t.minqdje=e},expression:"minqdje"}}),t._v("　到　\n\t\t\t\t\t\t\t\t\t "),s("el-input-number",{attrs:{size:"mini",step:1},model:{value:t.maxqdje,callback:function(e){t.maxqdje=e},expression:"maxqdje"}})],1)]),t._v(" "),s("div",{attrs:{flex:""}},[s("p",[s("span",{staticClass:"table-menu-name"},[t._v("当前跟踪状态:")]),t._v(" "),s("span",{class:{"bg-active":""==t.gzzt},on:{click:function(e){t.CheckGzzt("")}}},[t._v("全部")]),t._v(" "),t._l(t.gzztList,function(e,i){return s("span",{key:i,class:{"bg-active":t.gzzt==e.label},on:{click:function(s){t.CheckGzzt(e.label)}}},[t._v(t._s(e.mc))])})],2)])]):t._e(),t._v(" "),s("p",[s("span",{staticClass:"table-menu-name"},[t._v("区域工程:")]),t._v(" "),s("span",{class:{"bg-active":""==t.gczdC},attrs:{"data-gczd":""},on:{click:function(e){t.CheckGcdz("")}}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(e){return s("span",{key:e.id,class:{"bg-active":e.label==t.gczdC},on:{click:function(s){t.CheckGcdz(e.label)}}},[t._v(t._s(e.mc))])})],2)])]),t._v(" "),s("div",{staticClass:"project-fbtable"},[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.allfbData,border:"","min-width":"1000"}},[!(t.userGroup.includes("XXLDZ")||t.userGroup.includes("JZGCRY")||t.userGroup.includes("JZFGCRY"))||"1"==t.xmztC&&"软件"==t.xmlbC?t._e():s("el-table-column",{attrs:{fixed:"left",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[!t.userGroup.includes("XXLDZ")&&!t.userGroup.includes("JZGCRY")||"在建"==e.row.xmzt&&"软件"==e.row.xmlb?t._e():s("el-button",{attrs:{type:"text",size:"mini"},nativeOn:{click:function(s){s.preventDefault(),t.handleCommand("1",e.row.xmbh)}}},[t._v("\n\t\t\t\t\t\t\t\t\t过保提醒\n\t\t\t\t\t\t\t\t")]),t._v(" "),!t.userGroup.includes("XXLDZ")&&!t.userGroup.includes("JZGCRY")||"在建"==e.row.xmzt&&"软件"==e.row.xmlb?t._e():s("el-button",{attrs:{type:"text",size:"mini"},nativeOn:{click:function(s){s.preventDefault(),t.handleCommand("2",e.row.xmbh)}}},[t._v("\n\t\t\t\t\t\t\t\t\t提醒记录\n\t\t\t\t\t\t\t\t")]),t._v(" "),!t.userGroup.includes("JZFGCRY")&&!t.userGroup.includes("JZGCRY")||"在建"==e.row.xmzt&&"软件"==e.row.xmlb?t._e():s("el-button",{attrs:{type:"text",size:"mini"},nativeOn:{click:function(s){s.preventDefault(),t.handleCommandGbfk(e.row)}}},[t._v("\n\t\t\t\t\t\t\t\t\t过保反馈\n\t\t\t\t\t\t\t\t")])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"项目名称",width:"320",fixed:"left"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("div",{staticStyle:{display:"flex"},attrs:{slot:"reference"},slot:"reference"},[s("p",[s("span",{class:{"xb-star":!0,"el-icon-star-on":e.row.isxb,"el-icon-star-off":!e.row.isxb},attrs:{title:"添加收藏"},on:{click:function(s){t.handleAddXB(e.$index,e.row,e.cell,s)}}})]),t._v(" "),s("p",{staticClass:"name-wrapper",attrs:{title:e.row.xmmc},on:{click:function(s){t.handleEdit(e.$index,e.row)}}},[s("span",[t._v(t._s(e.row.xmmc))])])])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"学校","show-overflow-tooltip":"",width:"280"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticClass:"name-wrapper",on:{click:function(s){t.handleRouterXxkb(e.row)}}},[t._v(t._s(e.row.dwmc))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"cn",label:"财年",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"gczd",label:"区域工程","min-width":"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"xmlb",label:"项目类别",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"ztztmc",label:"整体状态",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"khjl",label:"客户经理",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"yfzrrxm",label:"项目经理",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"jfzrrxm",label:"甲方责任人",width:"100","show-overflow-tooltip":""}}),t._v(" "),s("el-table-column",{attrs:{prop:"qssj",label:"签署日期",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"lxrq",label:"立项日期",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"qdrq",label:"启动日期",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"yssj",label:"整体验收时间",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwksrq",label:"服务开始日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwqx",label:"服务期限",width:"90"}}),t._v(" "),s("el-table-column",{attrs:{prop:"gbsj",label:"过保日期",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"htje",label:"合同金额(元)",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"xqwb",label:"续签维保合同",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(1==e.row.xqwb?"是":"否"))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"htxz",label:"合同性质","show-overflow-tooltip":"",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"htbh",label:"合同编号","show-overflow-tooltip":"",width:"150"}}),t._v(" "),s("el-table-column",{attrs:{prop:"xmbh",label:"项目编号","show-overflow-tooltip":"",width:"100"}})],1),t._v(" "),t.totalNum>10?s("pagination",{attrs:{pageSize:t.pageSize,total:t.totalNum},on:{handleCurrentChange:t.handleCurrentChange}}):t._e()],1)])]),t._v(" "),s("gbtxDialog",{attrs:{xmbh:t.xmbh,show:t.gbtxShow},on:{"update:show":function(e){t.gbtxShow=e}}}),t._v(" "),s("gbtxjlDialog",{attrs:{xmbh:t.xmbh,show:t.gbtxjlShow},on:{"update:show":function(e){t.gbtxjlShow=e}}}),t._v(" "),s("xmfkDialog",{attrs:{xmData:t.xmData,show:t.xmfkShow},on:{"update:show":function(e){t.xmfkShow=e},handleSubmit:t.handleSubmit}}),t._v(" "),s("gbfkDialog",{attrs:{show:t.gbfkShow,xmbh:t.xmbh},on:{"update:show":function(e){t.gbfkShow=e},handleSubmit:t.handleSubmitGbfk}})],1)},staticRenderFns:[]};var u=s("VU/8")(b,d,!1,function(t){s("B2c5")},"data-v-f11f5c68",null);e.default=u.exports},y0ZS:function(t,e){}});
//# sourceMappingURL=19.eb7624e9399168fc36db.js.map