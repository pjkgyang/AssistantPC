webpackJsonp([13],{"8ET6":function(t,e){},BO1k:function(t,e,a){t.exports={default:a("fxRn"),__esModule:!0}},POVW:function(t,e){},U1LE:function(t,e){},cMjM:function(t,e){},fxRn:function(t,e,a){a("+tPU"),a("zQR9"),t.exports=a("g8Ux")},g8Ux:function(t,e,a){var i=a("77Pl"),s=a("3fs2");t.exports=a("FeBl").getIterator=function(t){var e=s(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return i(e.call(t))}},pOCr:function(t,e,a){"use strict";var i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-tree",{ref:"tree2",staticClass:"filter-tree",attrs:{data:this.options,props:this.defaultProps,"node-key":"id","default-expanded-keys":["DSROOT"]},on:{"node-click":this.handleNodeClick}})],1)},staticRenderFns:[]};var s=a("VU/8")({data:function(){return{defaultProps:{value:"id",label:"title"},options:[]}},mounted:function(){this.demandProductTree()},methods:{handleNodeClick:function(t){this.$emit("handleNodeClick",t)},demandProductTree:function(){var t=this;this.$get(this.API.demandProductTree,{}).then(function(e){"success"==e.state&&(t.options=e.data)})}},components:{}},i,!1,function(t){a("rjsR")},"data-v-72bbfa06",null);e.a=s.exports},rjsR:function(t,e){},t1J1:function(t,e,a){"use strict";(function(t){var i=a("BO1k"),s=a.n(i),n=a("mtWM"),d=(a.n(n),a("nfA5")),l=a("TNFc"),r=a("IfOk"),c=a("tv1R"),o=a("pOCr"),h=a("oFuF");e.a={data:function(){return{isInnerItem:!1,dialogdemandVisible:!1,demandListVisible:!1,visible:this.show,isClearFile:!1,defaultProps:{value:"id",label:"title"},options:[],xmmc:"",xmbh:"",xmzt:"",xqflList:[],xmcpList:[],tclsList:[],sfxsList:[{mc:"是",label:"1"},{mc:"否",label:"0"}],crowdywxList:[],crowdcpList:[],cpData:[],val:[],teacherData:[],fwznfjMc:"",glxqMc:"",demandData:{xmbh:"",xmmc:"",xqfl:"",teacherData:"",sfsx:"0",cpbjbh:"",cpbjmc:"",crowdywxbh:"",crowdywxmc:"",crowdcpbh:"",crowdcpmc:"",qwsjwcrq:"",qwkfjfrq:"",glxqWid:"",bt:"",xqfjwid:"",xqfjmc:""},pickerBeginDateBefore:{disabledDate:function(t){(new Date).getTime();return t.getTime()<Date.now()-864e5}}}},props:{show:{type:Boolean,default:!1},demandInfo:{type:Object,default:function(){return{}}},Type:{type:String,default:""},btnbh:{type:String,default:""}},components:{itemChoose:d.a,uploadFile:l.a,xqlistDilog:c.a,cpTree:o.a},methods:{handleChangeQwwcrq:function(){this.demandData.qwkfjfrq&&new Date(this.demandData.qwsjwcrq)>new Date(this.demandData.qwkfjfrq)&&(this.$alert("期望设计完成日期必须小于期望开发交付日期","提示",{confirmButtonText:"确定",type:"warning",callback:function(t){}}),this.demandData.qwsjwcrq="")},handleChangeQwjfrq:function(){this.demandData.qwsjwcrq&&new Date(this.demandData.qwsjwcrq)>new Date(this.demandData.qwkfjfrq)&&(this.$alert("期望设计完成日期必须小于期望开发交付日期","提示",{confirmButtonText:"确定",type:"warning",callback:function(t){}}),this.demandData.qwkfjfrq="")},handleRemoveFwznfj:function(){this.fwznfjMc="",this.demandData.xqfjwid="",this.demandData.xqfjmc=""},handleNodeClick:function(t){!t.children&&t.isOptional&&(this.demandData.cpbjbh=t.id,this.demandData.cpbjmc=t.title,this.cpTreeShow=!1)},handleItemChange:function(){this.cpData=this.getCascaderObj(this.val,this.options),this.cpData[this.cpData.length-1].isOptional||(this.$alert("模块选择有误，请选择到产品模块~","提示",{confirmButtonText:"确定",type:"warning",callback:function(t){}}),this.cpData=[])},getCascaderObj:function(t,e){return t.map(function(t,a,i){var n=!0,d=!1,l=void 0;try{for(var r,c=s()(e);!(n=(r=c.next()).done);n=!0){var o=r.value;if(o.id==t)return e=o.children,o}}catch(t){d=!0,l=t}finally{try{!n&&c.return&&c.return()}finally{if(d)throw l}}return null})},handleUploadFile:function(t){this.fwznfjMc="",t.length?(this.demandData.xqfjwid=t[0].split("|")[0],this.demandData.xqfjmc=t[0].split("|")[1]):(this.demandData.xqfjwid="",this.demandData.xqfjmc="")},handleChangeCrowdYwx:function(t){var e=this;this.crowdywxList.forEach(function(a){a.lbdm==t&&(e.demandData.crowdywxmc=a.lbmc)}),this.getCrowdCp(t)},handleChangeCrowdCp:function(t){var e=this;this.crowdcpList.forEach(function(a){a.lbdm==t&&(e.demandData.crowdcpmc=a.lbmc)})},handleEdit:function(t){this.xmzt=t.xmzt,this.demandData.xmbh=t.xmbh,this.demandData.xmmc=t.xmmc,this.getUsers(),this.dialogdemandVisible=!1},handleChooseDemand:function(t){this.glxqMc="["+t.xqbh+"]"+t.bt,this.demandData.glxqWid=t.wid},adddemandtItem:function(){this.dialogdemandVisible=!0},handleRelaseDemand:function(){this.demandListVisible=!0},handleCommit:function(){var e=this;1==this.demandData.xqfl&&(this.demandData.glxqWid=""),this.demandInfo.wid&&this.Type.includes("edit")&&(this.demandData.wid=this.demandInfo.wid),this.btnbh&&(this.demandData.btnbh=this.btnbh),this.demandData.cpbjbh=this.cpData.length?this.cpData[this.cpData.length-1].id:"",this.demandData.cpbjmc=this.cpData.length?this.cpData[this.cpData.length-1].title:"",this.demandData.teacherData=this.teacherData.join("|"),this.demandData.nr=t("#summernoteTT").summernote("code"),this.valiDate()&&this.$post(this.API.submitDemand,this.demandData).then(function(a){"success"==a.state?(e.$message({message:"提交成功",type:"success"}),t("#summernoteTT").summernote("code",""),e.isClearFile=!e.isClearFile,e.visible=!1,e.$emit("handleCommitDemand",e.Type)):e.$message({message:a.msg,type:"warning"})})},queryDemandProductTree:function(t){var e=this;this.xmcpList=[],this.$get(this.API.demandProductTree,{}).then(function(a){"success"==a.state&&(e.options=a.data,t())}),this.$get(this.API.getCrowdYwx,{}).then(function(t){"success"==t.state&&(e.crowdywxList=t.data)})},getCrowdCp:function(t){var e=this;this.$get(this.API.getCrowdCp,{ywxbm:t}).then(function(t){"success"==t.state&&(e.crowdcpList=t.data)})},getUsers:function(){var t=this;this.$get(this.API.getUsers,{curPage:1,pageSize:999,xmbh:this.demandData.xmbh,unitType:1}).then(function(e){"success"==e.state&&(t.tclsList=e.data.rows)})},getProjects:function(){var t=this;Object(r.r)({curPage:1,pageSize:2,keyword:"",xmlb:"",sfgx:"",xmzt:"1,2,3",pl:""}).then(function(e){var a=e.data;"success"==a.state&&1==a.data.records&&"过保"!=a.data.rows[0].xmzt&&(t.xmzt=a.data.rows[0].xmzt,t.xmmc=a.data.rows[0].xmmc,t.xmbh=a.data.rows[0].xmbh)})},valiDate:function(){return this.demandData.xmbh?this.demandData.xqfl?this.demandData.teacherData?this.demandData.cpbjbh?this.demandData.crowdywxbh?this.demandData.crowdcpbh?this.demandData.qwsjwcrq?this.demandData.qwkfjfrq?1==this.demandData.xqfl||this.demandData.glxqWid?this.demandData.xqfjwid?this.demandData.bt?!(!this.demandData.nr||"<p><br></p>"==this.demandData.nr)||(this.$message({message:"请填写需求内容",type:"warning"}),!1):(this.$message({message:"请填写需求标题",type:"warning"}),!1):(this.$message({message:"请上传附件",type:"warning"}),!1):(this.$message({message:"请选择关联的需求",type:"warning"}),!1):(this.$message({message:"请选择期望开发交付日期",type:"warning"}),!1):(this.$message({message:"请选择期望设计完成日期",type:"warning"}),!1):(this.$message({message:"请选择CROWD产品",type:"warning"}),!1):(this.$message({message:"请选择CROWD业务线",type:"warning"}),!1):(this.$message({message:"请选择产品或产品选择有误（请注意需选择到模块级~）",type:"warning"}),!1):(this.$message({message:"请选择提出老师",type:"warning"}),!1):(this.$message({message:"请选择需求分类",type:"warning"}),!1):(this.$message({message:"请选择项目编号",type:"warning"}),!1)}},watch:{show:function(){var e=this;if(this.visible=this.show,this.show){if(this.$nextTick(function(){t("#summernoteTT").summernote({dialogsInBody:!0,placeholder:"请输入内容",focus:!0,height:200,width:"100%",minHeight:295,lang:"zh-CN",toolbar:[["style",["bold","italic","underline","clear"]],["font",["strikethrough","superscript","subscript"]],["fontsize",["fontsize"]],["color",["color"]],["para",["ul","ol","paragraph"]],["height",["height"]],["picture"],["link",["linkDialogShow","unlink"]]]}),"edit"!=e.Type&&"editDisabled"!=e.Type||t("#summernoteTT").summernote("code",e.demandInfo.nr)}),Object(h.n)("DemandType")?this.xqflList=Object(h.n)("DemandType"):Object(h.i)("DemandType",this.xqflList),this.queryDemandProductTree(function(){"edit"!=e.Type&&"editDisabled"!=e.Type||(e.val=e.demandInfo.syfjcpbh.split(",").reverse(),e.cpData=e.getCascaderObj(e.val,e.options))}),this.teacherData=[],"edit"==this.Type||"editDisabled"==this.Type){t("#summernoteTT").summernote("code",this.demandInfo.nr),this.xmzt=this.demandInfo.xmzt,this.demandData.xmbh=this.demandInfo.xmbh,this.demandData.xmmc=this.demandInfo.xmmc,this.demandData.xqfl="editDisabled"==this.Type?"3":this.demandInfo.xqfl,this.demandData.sfsx=this.demandInfo.sfsx,this.demandData.cpbjbh=this.demandInfo.cpbjbh,this.demandData.cpbjmc=this.demandInfo.cpbjmc,this.demandData.crowdywxbh=this.demandInfo.crowdywxbh,this.demandData.crowdywxmc=this.demandInfo.crowdywxmc,this.getCrowdCp(this.demandInfo.crowdywxbh),this.demandData.crowdcpbh=this.demandInfo.crowdcpbh,this.demandData.crowdcpmc=this.demandInfo.crowdcpmc,this.demandData.qwsjwcrq=this.demandInfo.qwsjwcrq,this.demandData.qwkfjfrq=this.demandInfo.qwkfjfrq,this.demandData.bt=this.demandInfo.bt,this.demandData.xqfjwid=this.demandInfo.xqfjwid,this.demandData.xqfjmc=this.demandInfo.xqfjmc,this.fwznfjMc=this.demandInfo.xqfjmc,this.glxqMc=this.demandInfo.glxqbh?"["+this.demandInfo.glxqbh+"]"+this.demandInfo.glxqbt:"",this.demandData.glxqWid=this.demandInfo.glxqwid,this.getUsers();var a=this.demandInfo.tclsbh.split(","),i=this.demandInfo.tcls.split(",");a.forEach(function(t,s,n){e.teacherData.push(a[s]+","+i[s])})}"disabled"==this.Type&&(this.demandData.xqfl="3",this.xmzt=this.demandInfo.xmzt,this.demandData.xmbh=this.demandInfo.xmbh,this.demandData.xmmc=this.demandInfo.xmmc,this.glxqMc="["+this.demandInfo.xqbh+"]"+this.demandInfo.bt,this.demandData.glxqWid=this.demandInfo.wid,this.getUsers())}else this.xmzt=this.glxqMc="",this.demandData.cpbjbh="",this.demandData.teacherData="",this.demandData.xmbh="",this.demandData.xmmc="",this.demandData.xqfl="",this.demandData.teacherData="",this.demandData.sfsx="0",this.demandData.cpbjbh="",this.demandData.cpbjmc="",this.demandData.crowdywxbh="",this.demandData.crowdywxmc="",this.demandData.crowdcpbh="",this.demandData.crowdcpmc="",this.demandData.qwsjwcrq="",this.demandData.qwkfjfrq="",this.demandData.glxqWid="",this.demandData.bt="",this.demandData.xqfjwid="",this.demandData.xqfjmc=""}}}}).call(e,a("7t+N"))},tv1R:function(t,e,a){"use strict";var i={data:function(){return{visible:this.show,tableData:[],currentPage:1,pageSize:15,records:0}},methods:{handleChooseDemand:function(t){this.$emit("handleChooseDemand",t),this.visible=!1},handleCurrentChange:function(t){this.currentPage=t,this.queryPageDemands()},queryPageDemands:function(){var t=this;this.$get(this.API.queryPageDemands,{curPage:this.currentPage,pageSize:this.pageSize,xqxglx:"",xqlx:"",qygc:"",cpbh:"",xmbh:this.xmbh,keyword:""}).then(function(e){"success"==e.state?(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.records=e.data.records):t.$message({message:e.msg,type:"error"})})}},props:{show:{type:Boolean,default:!1},xmbh:{type:String,default:""}},watch:{show:function(t,e){this.visible=this.show,t&&this.queryPageDemands()}},components:{}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"选择需求",width:"1000px",top:"30px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("div",{staticClass:"dialog-xqqr"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"bt",label:"标题","min-width":"180","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){t.handleChooseDemand(e.row)}}},[t._v(t._s(e.row.bt))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"xqbh",label:"需求编号",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"tcrxm",label:"发布人",width:"100","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"tcsj",label:"发布时间",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"tcls",label:"提出人",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"cpmc",label:"产品",width:"150"}})],1),t._v(" "),t.tableData.length?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.records},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}}):t._e(),t._v(" "),a("section",{staticClass:"pj-btn-group"},[a("el-button",{attrs:{size:"small"},on:{click:function(e){t.visible=!1}}},[t._v("取消")])],1)],1)])],1)},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(t){a("cMjM")},"data-v-1bbf8b20",null);e.a=n.exports},vJtZ:function(t,e,a){"use strict";var i={data:function(){return{Length:0}},props:{type:{type:String,default:"process"},list:{type:Array,default:function(){return[{mc:"需求设计",type:1,index:1},{mc:"发布需求",type:2},{mc:"分配开发",type:2},{mc:"需求确认",type:1,index:2}]}}},mounted:function(){var t=this;this.list.forEach(function(e){e.index&&(t.Length+=1)})},components:{}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.list.length?a("ul",t._l(t.list,function(e,i){return a("li",{key:i,class:{crowdBefore:!!e.index,active:0==e.lx,"active-1":0!=e.lx&&"0"==e.lczt,"active-2":0!=e.lx&&"1"==e.lczt,"active-3":0!=e.lx&&"2"==e.lczt}},[a("div",[t._v(t._s(e.mc))])])})):t._e()])},staticRenderFns:[]};var n=a("VU/8")(i,s,!1,function(t){a("U1LE")},"data-v-4416ea36",null);e.a=n.exports},vVXA:function(t,e,a){"use strict";var i=a("t1J1"),s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dialog-container"},[a("el-dialog",{attrs:{title:"我要提需求",width:"1000px",top:"30px",visible:t.visible,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("div",{staticClass:"demand"},[a("el-form",{staticClass:"demo-ruleForm",staticStyle:{width:"950px",margin:"0 auto"},attrs:{model:t.demandData,inline:!0,size:"mini","label-width":"135px"}},[a("el-form-item",{attrs:{label:"项目名称",required:""}},[a("el-input",{style:{width:"800px"},attrs:{size:"mini",type:"text",readonly:"",placeholder:"请选择项目"},model:{value:t.demandData.xmmc,callback:function(e){t.$set(t.demandData,"xmmc",e)},expression:"demandData.xmmc"}},[a("el-button",{staticStyle:{width:"30px",padding:"0 12px"},attrs:{slot:"append",disabled:"disabled"==t.Type,icon:"el-icon-circle-plus-outline"},on:{click:t.adddemandtItem},slot:"append"})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"项目状态",required:""}},[a("el-input",{staticStyle:{width:"325px"},attrs:{size:"mini",type:"text",readonly:""},model:{value:t.xmzt,callback:function(e){t.xmzt=e},expression:"xmzt"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"需求分类",required:""}},[a("el-select",{staticStyle:{width:"325px"},attrs:{size:"mini",placeholder:"请选择需求分类"},model:{value:t.demandData.xqfl,callback:function(e){t.$set(t.demandData,"xqfl",e)},expression:"demandData.xqfl"}},t._l(t.xqflList,function(t,e){return a("el-option",{key:e,attrs:{label:t.mc,value:t.label}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"提出老师",required:""}},[a("el-select",{staticStyle:{width:"800px"},attrs:{size:"mini",multiple:"",placeholder:"请选择提出老师"},model:{value:t.teacherData,callback:function(e){t.teacherData=e},expression:"teacherData"}},t._l(t.tclsList,function(t,e){return a("el-option",{key:e,attrs:{label:t.username,value:t.userid+","+t.username}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"是否线上",required:""}},[a("el-select",{staticStyle:{width:"325px"},attrs:{size:"mini",placeholder:"请选择是否线上"},model:{value:t.demandData.sfsx,callback:function(e){t.$set(t.demandData,"sfsx",e)},expression:"demandData.sfsx"}},t._l(t.sfxsList,function(t,e){return a("el-option",{key:e,attrs:{label:t.mc,value:t.label}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"模块",required:""}},[a("el-cascader",{staticStyle:{width:"325px"},attrs:{size:"mini",props:t.defaultProps,options:t.options,"show-all-levels":!1},on:{change:t.handleItemChange},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"CROWD业务线",required:""}},[a("el-select",{staticStyle:{width:"325px"},attrs:{size:"mini",placeholder:"请选择CROWD业务线"},on:{change:t.handleChangeCrowdYwx},model:{value:t.demandData.crowdywxbh,callback:function(e){t.$set(t.demandData,"crowdywxbh",e)},expression:"demandData.crowdywxbh"}},t._l(t.crowdywxList,function(t,e){return a("el-option",{key:e,attrs:{label:t.lbmc,value:t.lbdm}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"CROWD产品",required:""}},[a("el-select",{staticStyle:{width:"325px"},attrs:{size:"mini",placeholder:"请选择CROWD产品"},on:{change:t.handleChangeCrowdCp},model:{value:t.demandData.crowdcpbh,callback:function(e){t.$set(t.demandData,"crowdcpbh",e)},expression:"demandData.crowdcpbh"}},t._l(t.crowdcpList,function(t,e){return a("el-option",{key:e,attrs:{label:t.lbmc,value:t.lbdm}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"期望设计完成日期",required:""}},[a("el-date-picker",{staticStyle:{width:"325px"},attrs:{"picker-options":t.pickerBeginDateBefore,clearable:!1,size:"mini",type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},on:{change:t.handleChangeQwwcrq},model:{value:t.demandData.qwsjwcrq,callback:function(e){t.$set(t.demandData,"qwsjwcrq",e)},expression:"demandData.qwsjwcrq"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"期望开发交付日期",required:""}},[a("el-date-picker",{staticStyle:{width:"325px"},attrs:{"picker-options":t.pickerBeginDateBefore,clearable:!1,size:"mini",type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},on:{change:t.handleChangeQwjfrq},model:{value:t.demandData.qwkfjfrq,callback:function(e){t.$set(t.demandData,"qwkfjfrq",e)},expression:"demandData.qwkfjfrq"}})],1),t._v(" "),1!=t.demandData.xqfl?a("el-form-item",{attrs:{label:"关联需求",required:""}},[a("el-input",{staticStyle:{width:"800px"},attrs:{type:"text",readonly:"",placeholder:"请选择需求"},model:{value:t.glxqMc,callback:function(e){t.glxqMc=e},expression:"glxqMc"}},[a("el-button",{staticStyle:{width:"30px",padding:"0 12px"},attrs:{slot:"append",disabled:"disabled"==t.Type||"editDisabled"==t.Type||!t.demandData.xmbh,icon:"el-icon-circle-plus-outline"},on:{click:t.handleRelaseDemand},slot:"append"})],1)],1):t._e(),t._v(" "),a("el-form-item",{attrs:{label:"需求标题",required:""}},[a("el-input",{staticStyle:{width:"800px"},attrs:{size:"mini",type:"text",placeholder:"标题"},model:{value:t.demandData.bt,callback:function(e){t.$set(t.demandData,"bt",e)},expression:"demandData.bt"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"需求附件",required:""}},[a("uploadFile",{attrs:{Type:"demand",istb:t.isClearFile},on:{handleUploadFile:t.handleUploadFile}}),t._v(" "),t.fwznfjMc&&t.Type.includes("edit")?a("p",{staticClass:"file"},[t._v("\n            "+t._s(t.fwznfjMc)+"\n            "),a("i",{staticClass:"el-icon-close",on:{click:t.handleRemoveFwznfj}})]):t._e()],1)],1),t._v(" "),a("div",{staticClass:"demand-textarea"},[a("p",[t._v("需求描述")]),t._v(" "),a("div",{attrs:{id:"summernoteTT"}})]),t._v(" "),a("div",{staticStyle:{"text-align":"right",width:"100%",margin:"10px 0",padding:"0 20px"}},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:t.handleCommit}},[t._v("确认提交")]),t._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(e){t.visible=!1}}},[t._v("取消")])],1)],1)]),t._v(" "),a("el-dialog",{attrs:{title:"选择项目",visible:t.dialogdemandVisible,"close-on-click-modal":!1,width:"800px",top:"30px","append-to-body":""},on:{"update:visible":function(e){t.dialogdemandVisible=e}}},[a("div",{staticStyle:{padding:"10px"}},[a("itemChoose",{on:{handleEdit:t.handleEdit}})],1)]),t._v(" "),a("xqlistDilog",{attrs:{show:t.demandListVisible,xmbh:t.demandData.xmbh},on:{"update:show":function(e){t.demandListVisible=e},handleChooseDemand:t.handleChooseDemand}})],1)},staticRenderFns:[]};var n=function(t){a("8ET6")},d=a("VU/8")(i.a,s,!1,n,"data-v-b75b6704",null);e.a=d.exports},wjHE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("BO1k"),s=a.n(i),n=a("oFuF"),d=a("vJtZ"),l=a("vVXA"),r=a("gou5"),c={data:function(){return{xqShow:!1,xqflList:[],gczdList:[],xqztList:[],xqlxList:[],xmcpList:[],queryLJshow:!0,currentPage:1,pageSize:10,records:0,dataList:[],stepDatas:[],val:[],unitType:"",groupTag:"",defaultProps:{value:"id",label:"title"},filterData:{xqfl:"",xqzt:"",gczd:"",xqlx:"",cp:"",keyword:""}}},mounted:function(){Object(n.n)("gczd")?this.gczdList=Object(n.n)("gczd"):Object(n.i)("gczd",this.gczdList,!0),Object(n.n)("DemandRelatedType")?this.xqflList=Object(n.n)("DemandRelatedType"):Object(n.i)("DemandRelatedType",this.xqflList),Object(n.n)("DemandStatus")?this.xqztList=Object(n.n)("DemandStatus"):Object(n.i)("DemandStatus",this.xqztList),Object(n.n)("DemandType")?this.xqlxList=Object(n.n)("DemandType"):Object(n.i)("DemandType",this.xqlxList),this.queryProcessTemplate(),this.queryPagesDemand(),this.queryDemandProductTree(),this.unitType=JSON.parse(sessionStorage.getItem("userInfo")).unitType,this.groupTag=JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag},methods:{handleItemChange:function(){var t=this.getCascaderObj(this.val,this.xmcpList),e=t.length-1;this.filterData.cp=t[e].id,this.currentPage=1,this.queryPagesDemand()},handleCheckALLcp:function(){this.filterData.cp="",this.currentPage=1,this.queryPagesDemand()},handleSendDemand:function(){this.xqShow=!0},handleCommitDemand:function(){this.queryPagesDemand()},handleQueryShow:function(){this.queryLJshow=!this.queryLJshow},handleExport:function(){window.open(this.API.exportDemands+"?xqfl="+this.filterData.xqfl+"&xqxglx="+this.filterData.xqlx+"&xqzt="+this.filterData.xqzt+"&qygc="+this.filterData.gczd+"&cpbh="+this.filterData.cp+"&keyword="+this.filterData.keyword)},handleQuery:function(){this.currentPage=1,this.queryPagesDemand()},handleCurrentChange:function(t){this.currentPage=t,this.queryPagesDemand()},handleChangeXqfl:function(t){this.filterData.xqfl=t,this.currentPage=1,this.queryPagesDemand()},handleChangexqzt:function(t){this.filterData.xqzt=t,this.currentPage=1,this.queryPagesDemand()},handleChangeXqlx:function(t){this.filterData.xqlx=t,this.currentPage=1,this.queryPagesDemand()},handleChangeCp:function(t){this.filterData.cp=t,this.currentPage=1,this.queryPagesDemand()},handleChangeGczd:function(t){this.filterData.gczd=t,this.currentPage=1,this.queryPagesDemand()},getCascaderObj:function(t,e){return t.map(function(t,a,i){var n=!0,d=!1,l=void 0;try{for(var r,c=s()(e);!(n=(r=c.next()).done);n=!0){var o=r.value;if(o.id==t)return e=o.children,o}}catch(t){d=!0,l=t}finally{try{!n&&c.return&&c.return()}finally{if(d)throw l}}return null})},queryPagesDemand:function(){var t=this;this.$get(this.API.queryPageDemands,{curPage:this.currentPage,pageSize:this.pageSize,xqzt:this.filterData.xqzt,xqxglx:this.filterData.xqfl,xqlx:this.filterData.xqlx,qygc:this.filterData.gczd,mkbh:this.filterData.cp,keyword:this.filterData.keyword}).then(function(e){"success"==e.state?(e.data.rows?t.dataList=e.data.rows:t.dataList=[],t.records=e.data.records):t.$message({message:e.msg,type:"error"})})},queryProcessTemplate:function(){var t=this;this.$get(this.API.demandProcessTemplate,{zbwid:""}).then(function(e){"success"==e.state?t.stepDatas=e.data:t.$message({message:e.msg,type:"error"})})},queryDemandProductTree:function(){var t=this;this.xmcpList=[],this.$get(this.API.demandProductTree,{}).then(function(e){"success"==e.state&&(t.xmcpList=e.data,t.xmcpList.unshift({id:"",isExpand:0,isOptional:0,level:0,parentId:"",sortCode:1,title:"全部"}))})}},components:{step:d.a,xqDialog:l.a,emptyContent:r.a}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"demand-pannel"},[a("div",{staticClass:"list pull-left"},[a("div",{staticClass:"pannelPaddingBg-10"},[a("div",[a("span",{staticClass:"query-title"},[a("span",{class:{"isshown-query":!0,"el-icon-arrow-up":!t.queryLJshow,"el-icon-arrow-down":t.queryLJshow},on:{click:t.handleQueryShow}}),t._v("\n           高级查询\n        ")]),t._v(" "),a("el-input",{staticStyle:{width:"493px"},attrs:{size:"mini",placeholder:"请输入提出人姓名/工号/手机号/标题/项目编号/项目名称"},on:{change:t.handleQuery},model:{value:t.filterData.keyword,callback:function(e){t.$set(t.filterData,"keyword",e)},expression:"filterData.keyword"}}),t._v("　\n        "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleQuery}},[t._v("查询")]),t._v("　\n        "),a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.handleExport}},[t._v("导出")])],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.queryLJshow,expression:"queryLJshow"}]},[a("div",{staticClass:"mg-12",attrs:{flex:""}},[a("p",{staticClass:"query-title"},[t._v("需求分类:")]),t._v(" "),a("p",{staticClass:"query-list"},[a("span",{class:{"bg-active":""==t.filterData.xqfl},on:{click:function(e){t.handleChangeXqfl("")}}},[t._v("全部")]),t._v(" "),t._l(t.xqflList,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterData.xqfl==e.label},on:{click:function(a){t.handleChangeXqfl(e.label)}}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),a("div",{attrs:{flex:""}},[a("p",{staticClass:"query-title"},[t._v("查询状态:")]),t._v(" "),a("p",{staticClass:"query-list"},[a("span",{class:{"bg-active":""==t.filterData.xqzt},on:{click:function(e){t.handleChangexqzt("")}}},[t._v("全部")]),t._v(" "),t._l(t.xqztList,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterData.xqzt==e.label},on:{click:function(a){t.handleChangexqzt(e.label)}}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),a("div",{staticClass:"mg-12",attrs:{flex:""}},[a("p",{staticClass:"query-title"},[t._v("需求类型:")]),t._v(" "),a("p",{staticClass:"query-list"},[a("span",{class:{"bg-active":""==t.filterData.xqlx},on:{click:function(e){t.handleChangeXqlx("")}}},[t._v("全部")]),t._v(" "),t._l(t.xqlxList,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterData.xqlx==e.label},on:{click:function(a){t.handleChangeXqlx(e.label)}}},[t._v(t._s(e.mc))])})],2)]),t._v(" "),a("div",{attrs:{flex:""}},[a("p",{staticClass:"query-title"},[t._v("产品:")]),t._v(" "),a("p",{staticStyle:{width:"90%"}},[a("el-cascader",{staticStyle:{width:"325px"},attrs:{size:"mini",props:t.defaultProps,options:t.xmcpList,"show-all-levels":!1,"change-on-select":""},on:{change:t.handleItemChange},model:{value:t.val,callback:function(e){t.val=e},expression:"val"}})],1)]),t._v(" "),t.groupTag.includes("JZGCRY")||t.groupTag.includes("JYGL")?a("div",{staticClass:"mg-12",attrs:{flex:""}},[a("p",{staticClass:"query-title"},[t._v("区域工程:")]),t._v(" "),a("p",{staticClass:"query-list",staticStyle:{width:"90%"}},[a("span",{class:{"bg-active":""==t.filterData.gczd},on:{click:function(e){t.handleChangeGczd("")}}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(e,i){return a("span",{key:i,class:{"bg-active":t.filterData.gczd==e.label},on:{click:function(a){t.handleChangeGczd(e.label)}}},[t._v(t._s(e.mc))])})],2)]):t._e()])]),t._v(" "),a("div",{staticClass:"pannelPaddingBg-10 mg-12"},[a("ul",{staticClass:"demand-list"},t._l(t.dataList,function(e,i){return a("li",{key:i,attrs:{flex:""}},[a("div",{staticClass:"demand-list_bgimg",attrs:{center:""}},[t._v(t._s(e.cpjc))]),t._v(" "),a("div",{staticClass:"demand-list-info",attrs:{"flex-column":"",spacebetween:""}},[a("span",[a("a",{attrs:{href:"#/demand/detail?id="+e.wid,target:"_blank"}},[t._v(t._s(e.bt))])]),t._v(" "),a("p",[t._v("\n              "+t._s(e.tcsj)+" 　 "+t._s(e.tcrxm)+" 　　\n              "),a("span",{staticClass:"title"},[t._v("需求编号：")]),t._v("\n              "+t._s(e.xqbh)+" 　　\n              "),a("el-tag",{key:"1",attrs:{type:"success",effect:"plain",size:"mini"}},[t._v(t._s(e.dqlcmc))])],1),t._v(" "),a("p",[a("span",{staticClass:"title"},[t._v("提出老师：")]),t._v("\n              "+t._s(e.tcls)+" ( "+t._s(e.lsdw)+" ) 　　\n              "),a("span",{staticClass:"title"},[t._v("类型：")]),t._v("\n              "+t._s(1==e.xqfl?"需求":2==e.xqfl?"BUG":"需求变更")+"　　\n              "),a("span",{staticClass:"title"},[t._v("产品：")]),t._v("\n              "+t._s(e.cpbjmc)+"\n            ")])])])})),t._v(" "),t.dataList.length?a("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.records},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}}):t._e(),t._v(" "),t.dataList.length?t._e():a("div",[a("emptyContent")],1)],1)]),t._v(" "),a("div",{staticClass:"pannelPaddingBg-10 guid pull-right"},[a("h5",[t._v("需求工作指南")]),t._v(" "),a("div",[a("step",{attrs:{list:t.stepDatas}})],1),t._v(" "),0==t.unitType?a("section",{attrs:{"text-center":""}},[a("el-button",{attrs:{type:"danger"},on:{click:t.handleSendDemand}},[t._v("我要提需求")])],1):t._e(),t._v(" "),a("br")]),t._v(" "),a("xqDialog",{attrs:{show:t.xqShow},on:{"update:show":function(e){t.xqShow=e},handleCommitDemand:t.handleCommitDemand}})],1)},staticRenderFns:[]};var h=a("VU/8")(c,o,!1,function(t){a("POVW")},"data-v-29b17f3b",null);e.default=h.exports}});
//# sourceMappingURL=13.759ab83f45569e523de2.js.map