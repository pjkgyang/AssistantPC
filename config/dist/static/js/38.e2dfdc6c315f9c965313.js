webpackJsonp([38],{"/Du8":function(t,e){},EOdI:function(t,e,a){"use strict";var s={data:function(){return{visible:this.show,form:{sfxq:"0",sm:""}}},props:{show:{type:Boolean,default:!1},xmData:{type:Object,default:function(){return{}}}},methods:{onSubmit:function(){"0"==this.form.sfxq&&/^[\s]*$/.test(this.form.sm)?this.$message({message:"请填写说明内容",type:"warning"}):this.$emit("handleSubmit",this.form)}},watch:{show:function(t,e){this.visible=this.show}},components:{}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dialog-xmfk"},[a("el-dialog",{attrs:{title:"项目反馈",width:"1000px",top:"30px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("div",{staticStyle:{padding:"10px 15px"}},[a("el-form",{ref:"form",staticClass:"xmfk-form",attrs:{model:t.form,"label-width":"140px"}},[a("el-form-item",{attrs:{label:"当前项目续签状态："}},[a("span",[t._v(t._s(1==t.xmData.xqwb?"是":"否"))])]),t._v(" "),a("el-form-item",{attrs:{label:"当前项目续签说明："}},[a("span",[t._v(t._s(t.xmData.xqwbsm?t.xmData.xqwbsm:"无"))])]),t._v(" "),a("el-form-item",{attrs:{label:"是否续签"}},[a("el-radio-group",{model:{value:t.form.sfxq,callback:function(e){t.$set(t.form,"sfxq",e)},expression:"form.sfxq"}},[a("el-radio",{attrs:{label:"1"}},[t._v("是")]),t._v(" "),a("el-radio",{attrs:{label:"0"}},[t._v("否")])],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"说明",required:"0"==t.form.sfxq}},[a("el-input",{attrs:{type:"textarea"},model:{value:t.form.sm,callback:function(e){t.$set(t.form,"sm",e)},expression:"form.sm"}})],1),t._v(" "),a("el-form-item",{attrs:{"text-right":""}},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.onSubmit}},[t._v("保存")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(e){t.visible=!1}}},[t._v("关闭")])],1)],1)],1)])],1)},staticRenderFns:[]};var l=a("VU/8")(s,i,!1,function(t){a("y0ZS")},"data-v-56eb867c",null);e.a=l.exports},jOoe:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("TloA"),i=a("Apg0"),l=a("EOdI"),n=a("IfOk"),o=a("9A7R"),c=a("oFuF"),r={data:function(){return{height:window.innerHeight-330,xmData:{},tableHeight:window.innerHeight-390,xmlbMenu:[{mc:"软件",id:"软件"},{mc:"集成",id:"集成"},{mc:"服务",id:"服务"}],gxhtMenu:[{mc:"是",id:"1"},{mc:"否",id:"0"}],xmbqMenu:[{mc:"收藏项目",id:"1"},{mc:"高风险项目",id:"2"},{mc:"我拥有的项目",id:"3"},{mc:"我参与的项目",id:"4"},{mc:"已关闭的项目",id:"5"}],xmztMenu:[{mc:"在建",id:"1"},{mc:"售后",id:"2"},{mc:"过保",id:"3"},{mc:"已关闭",id:"4"}],sffbMenu:[{mc:"全部",id:""},{mc:"是",id:"1"},{mc:"否",id:"0"}],gczdList:[],htxzList:[],keyword:"",xmztC:"",xmlbC:"",gxhtC:"",xmbqC:"",gczdC:"",sfxqC:"",sffbc:"",allfbData:[],curPage:1,pageSize:13,totalNum:null,baseUrl:null,xmkbkeyword:"",isNone:!1,myItemData:{},emptyArray:[],urlData:{},xmfkShow:!1,userGroup:"",xmbh:"",gbrqValue:[],gbksrqValue:"",gbjsrqValue:""}},mounted:function(){null==Object(c.n)("gczd")?Object(c.i)("gczd",this.gczdList,!0):this.gczdList=Object(c.n)("gczd"),this.baseUrl=window.baseurl;JSON.parse(sessionStorage.getItem("shown"));this.userGroup=JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag,this.getProjects(1)},methods:{handleRouterXxkb:function(t){var e=this.$router.resolve({path:"/xxtsql",query:{dwmc:escape(t)}});window.open(e.href,"_blank")},handleSubmit:function(t){var e=this;this.$post(this.API.projectFeedback,{xmbh:this.xmData.xmbh,sm:t.sm,sfxq:t.sfxq}).then(function(t){"success"==t.state&&(e.xmfkShow=!1,e.getProjects(e.curPage),e.$message({message:"保存成功~",type:"success"}))})},handleExport:function(){this.gbksrqValue=this.gbksrqValue?this.gbksrqValue:"",this.gbjsrqValue=this.gbjsrqValue?this.gbjsrqValue:"",window.open(this.baseUrl+"project/exportXmData.do?keyword="+this.keyword+"&xmzt="+this.xmztC+"&xmlb="+this.xmlbC+"&sfgx="+this.gxhtC+"&projectLabel="+this.xmbqC+"&qygc="+this.gczdC+"&sffb="+this.sffbc+"&htxz="+this.htxzList.join(","))},handleCommand:function(t,e){if(this.xmbh=e.xmbh,2==t){var a=this.$router.resolve({path:"/projectXmfb",query:{xmbh:e.xmbh,xmmc:e.xmmc}});window.open(a.href,"_blank")}else{var s=this.$router.resolve({path:"/projectfbmx",query:{xmbh:e.xmbh}});window.open(s.href,"_blank")}},handleCommandXmfk:function(t){this.xmData=t,this.xmfkShow=!0},handlePage:function(t){var e=this;event.currentTarget.parentNode.parentNode.parentNode.parentNode;event.target.className.includes("el-icon-star")?Object(n.g)({xmbh:t.xmbh}).then(function(t){"success"==t.data.state&&e.getMyProjects(1)}):(t.isAll=!1,this.$router.push({name:"Task",params:{data:t}}))},handleChangeDate:function(t){this.getProjects(1)},getProjects:function(t){var e=this;this.$get(this.API.getProjects,{curPage:t,pageSize:this.pageSize,keyword:this.keyword,xmzt:this.xmztC,xmlb:this.xmlbC,sfgx:this.gxhtC,pl:this.xmbqC,sffb:this.sffbc,htxz:this.htxzList.join(","),qygc:this.gczdC}).then(function(t){"success"==t.state&&(e.allfbData=t.data.rows,e.totalNum=t.data.records)})},handleSearch:function(){this.getProjects(1)},SearchItem:function(){this.getProjects(1)},CheckXmlb:function(t){var e=t.target.getAttribute("data-xmlb");this.xmlbC=e,this.getProjects(1)},CheckXmzt:function(t){this.xmztC=t,this.getProjects(1)},CheckGxht:function(t){var e=t.target.getAttribute("data-gxht");this.gxhtC=e,this.getProjects(1)},CheckXmbq:function(t){var e=t.target.getAttribute("data-xmbq");this.xmbqC=e,this.getProjects(1)},handleChooseSfxq:function(){this.getProjects(1)},handleHtxz:function(){this.getProjects(1)},CheckGcdz:function(t){this.gczdC=t,this.getProjects(1)},CheckSffb:function(t){this.sffbc=t,this.getProjects(1)},handleCurrentChange:function(t){this.curPage=t,this.getProjects(t)},handleEdit:function(t,e,a,s){this.$router.push({name:"Task",params:{data:e}})},handleAddXB:function(t,e,a,s){var i=this;Object(n.g)({xmbh:e.xmbh}).then(function(t){"success"==t.data.state&&(s.target.className.includes("el-icon-star-off")?e.isxb=!0:s.target.className.includes("el-icon-star-on")&&(e.isxb=!1),1==i.xmbqC&&i.getProjects(1))})}},components:{pagination:o.a,gbtxDialog:s.a,gbtxjlDialog:i.a,xmfkDialog:l.a}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("section",{staticClass:"project_more_table"},[a("div",[a("div",{staticClass:"project_more_choose"},[a("div",[a("span",{staticClass:"table-menu-name",staticStyle:{padding:"2px 4px","margin-right":"10px"}},[t._v("高级查询:")]),t._v(" "),a("el-input",{staticClass:"search-input",attrs:{placeholder:"请输入项目编号/项目名称/合同编号/项目经理/学校","prefix-icon":"el-icon-search",size:"small"},on:{change:t.SearchItem},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v("\n\t\t\t\t\t　\n\t\t\t\t\t"),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleSearch}},[t._v("搜索")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),a("div",[a("p",[a("span",{staticClass:"table-menu-name"},[t._v("项目标签:")]),t._v(" "),a("span",{class:{"bg-active":""==t.xmbqC},attrs:{"data-xmbq":""},on:{click:t.CheckXmbq}},[t._v("全部")]),t._v(" "),t._l(t.xmbqMenu,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.xmbqC},attrs:{"data-xmbq":e.id},on:{click:t.CheckXmbq}},[t._v(t._s(e.mc))])})],2),t._v(" "),a("div",{attrs:{flex:""}},[a("p",[a("span",{staticClass:"table-menu-name"},[t._v("项目状态:")]),t._v(" "),a("span",{class:{"bg-active":""==t.xmztC},on:{click:function(e){t.CheckXmzt("")}}},[t._v("全部")]),t._v(" "),t._l(t.xmztMenu,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.xmztC},on:{click:function(a){t.CheckXmzt(e.id)}}},[t._v(t._s(e.mc))])})],2),t._v(" "),a("p",[a("span",{staticClass:"table-menu-name"},[t._v("项目类别:")]),t._v(" "),a("span",{class:{"bg-active":""==t.xmlbC},attrs:{"data-xmlb":""},on:{click:t.CheckXmlb}},[t._v("全部")]),t._v(" "),t._l(t.xmlbMenu,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.xmlbC},attrs:{"data-xmlb":e.id},on:{click:t.CheckXmlb}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.mc)+"\n\t\t\t\t\t\t\t")])})],2)]),t._v(" "),a("div",{attrs:{flex:""}},[a("p",[a("span",{staticClass:"table-menu-name"},[t._v("是否购销合同:")]),t._v(" "),a("span",{class:{"bg-active":""==t.gxhtC},attrs:{"data-gxht":""},on:{click:t.CheckGxht}},[t._v("全部")]),t._v(" "),t._l(t.gxhtMenu,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.gxhtC},attrs:{"data-gxht":e.id},on:{click:t.CheckGxht}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.mc)+"\n\t\t\t\t\t\t\t")])})],2),t._v(" "),a("p",{attrs:{colcenter:""}},[a("span",{staticClass:"table-menu-name"},[t._v("合同性质:")]),t._v(" "),a("el-checkbox-group",{on:{change:t.handleHtxz},model:{value:t.htxzList,callback:function(e){t.htxzList=e},expression:"htxzList"}},[a("el-checkbox",{attrs:{label:"A"}},[t._v("正式")]),t._v(" "),a("el-checkbox",{attrs:{label:"C"}},[t._v("在谈")])],1)],1)]),t._v(" "),a("div",{attrs:{flex:""}},[a("p",[a("span",{staticClass:"table-menu-name"},[t._v("是否分包:")]),t._v(" "),t._l(t.sffbMenu,function(e){return a("span",{key:e.id,class:{"bg-active":e.id==t.sffbc},on:{click:function(a){t.CheckSffb(e.id)}}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),t.userGroup.includes("QYZ")?t._e():a("p",[a("span",{staticClass:"table-menu-name"},[t._v("区域工程:")]),t._v(" "),a("span",{class:{"bg-active":""==t.gczdC},attrs:{"data-gczd":""},on:{click:function(e){t.CheckGcdz("")}}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(e){return a("span",{key:e.id,class:{"bg-active":e.label==t.gczdC},on:{click:function(a){t.CheckGcdz(e.label)}}},[t._v(t._s(e.mc))])})],2)])]),t._v(" "),a("div",{staticClass:"project-fbtable"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.allfbData,border:"","min-width":"1000"}},[a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"mini"},nativeOn:{click:function(a){a.preventDefault(),t.handleCommand("1",e.row)}}},[t._v("立项信息")]),t._v(" "),e.row.fbgs<=0||!e.row.fbgs?a("el-button",{attrs:{type:"text",size:"mini"},nativeOn:{click:function(a){a.preventDefault(),t.handleCommand("2",e.row)}}},[t._v("\n\t\t\t\t\t\t\t\t项目分包\n\t\t\t\t\t\t\t")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称",width:"320",fixed:"left","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{label:"分包个数",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.fbgs?e.row.fbgs:0))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"dwmc",label:"学校","show-overflow-tooltip":"",width:"280"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmlb",label:"项目类别",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmzt",label:"项目状态",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"ztztmc",label:"整体状态",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"khjl",label:"客户经理",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"yfzrrxm",label:"项目经理",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"jfzrrxm",label:"甲方责任人",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"qssj",label:"签署日期",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lxrq",label:"立项日期",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"qdrq",label:"启动日期",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"yssj",label:"整体验收时间",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fwksrq",label:"服务开始日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"fwqx",label:"服务期限",width:"90"}}),t._v(" "),a("el-table-column",{attrs:{prop:"gbsj",label:"过保日期",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"htje",label:"合同金额(元)",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xqwb",label:"是否续签",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(1==e.row.xqwb?"是":"否"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"htxz",label:"合同性质","show-overflow-tooltip":"",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"htbh",label:"合同编号","show-overflow-tooltip":"",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号","show-overflow-tooltip":"",width:"100"}})],1),t._v(" "),t.totalNum>10?a("pagination",{attrs:{pageSize:t.pageSize,total:t.totalNum},on:{handleCurrentChange:t.handleCurrentChange}}):t._e()],1)])]),t._v(" "),a("xmfkDialog",{attrs:{xmData:t.xmData,show:t.xmfkShow},on:{"update:show":function(e){t.xmfkShow=e},handleSubmit:t.handleSubmit}})],1)},staticRenderFns:[]};var h=a("VU/8")(r,m,!1,function(t){a("/Du8")},"data-v-3331a521",null);e.default=h.exports},y0ZS:function(t,e){}});
//# sourceMappingURL=38.e2dfdc6c315f9c965313.js.map