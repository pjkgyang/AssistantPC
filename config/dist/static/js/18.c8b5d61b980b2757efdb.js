webpackJsonp([18,54],{"5xTi":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),r=s.n(a),i=s("md9p"),l={data:function(){return{dialogVisible:this.show,form:{jhksrq:"",sxfs:"",fwznzrr:"",fwznwczt:"",fwznwcsj:"",sszrr:"",sswczt:"",sswcsj:"",kfzrr:"",kfwczt:"",kfwcsj:""},rules:{}}},props:{show:{type:Boolean,default:!1},curData:{type:Object,default:function(){return{}}},zbwid:{type:String,default:""}},watch:{show:function(t,e){this.dialogVisible=this.show,t?r()(this.curData)!={}&&(this.form.wid=this.curData.wid,this.form.jhksrq=this.curData.jhksrq,this.form.sxfs=this.curData.sxfs,this.form.fwznzrr=this.curData.fwznzrr,this.form.fwznwczt=this.curData.fwznwczt,this.form.fwznwcsj=this.curData.fwznwcsj,this.form.sszrr=this.curData.sszrr,this.form.sswczt=this.curData.sswczt,this.form.sswcsj=this.curData.sswcsj,this.form.kfzrr=this.curData.kfzrr,this.form.kfwczt=this.curData.kfwczt,this.form.kfwcsj=this.curData.kfwcsj):(this.form.wid="",this.form.jhksrq="",this.form.sxfs="",this.form.fwznzrr="",this.form.fwznwczt="",this.form.fwznwcsj="",this.form.sszrr="",this.form.sswczt="",this.form.sswcsj="",this.form.kfzrr="",this.form.kfwczt="",this.form.kfwcsj="")}},methods:{submitForm:function(t){this.valiDate()&&this.$emit("handleCommitSSjh",this.form)},getServicePlan:function(){var t=this;this.$get(this.API.getServiceItemPlan,{zbwid:this.zbwid}).then(function(e){"success"==e.state&&(e.data?t.form=e.data:t.form={})})},valiDate:function(){return!!this.form.jhksrq||(this.$message({message:"请选择计划开始日期",type:"warning"}),!1)}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-dialog",{attrs:{title:"实施计划",visible:t.dialogVisible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show,width:"1000px"},on:{"update:visible":function(e){t.dialogVisible=e},close:function(e){t.$emit("update:show",!1)}}},[s("el-form",{ref:"form",staticStyle:{padding:"10px"},attrs:{model:t.form,"label-width":"135px",size:"mini"}},[s("el-form-item",{attrs:{label:"计划开始日期"}},[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择计划开始日期","value-format":"yyyy-MM-dd"},model:{value:t.form.jhksrq,callback:function(e){t.$set(t.form,"jhksrq",e)},expression:"form.jhksrq"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"实现方式"}},[s("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入实现方式"},model:{value:t.form.sxfs,callback:function(e){t.$set(t.form,"sxfs",e)},expression:"form.sxfs"}})],1),t._v(" "),s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"服务指南责任人"}},[s("el-input",{staticStyle:{width:"192px"},attrs:{placeholder:"请输入服务指南整理责任人"},model:{value:t.form.fwznzrr,callback:function(e){t.$set(t.form,"fwznzrr",e)},expression:"form.fwznzrr"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"完成状态"}},[s("el-select",{staticStyle:{width:"192px"},attrs:{placeholder:"请选择完成状态"},model:{value:t.form.fwznwczt,callback:function(e){t.$set(t.form,"fwznwczt",e)},expression:"form.fwznwczt"}},[s("el-option",{attrs:{label:"已完成",value:"1"}}),t._v(" "),s("el-option",{attrs:{label:"未完成",value:"0"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"完成时间"}},[s("el-date-picker",{staticStyle:{width:"192px"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.form.fwznwcsj,callback:function(e){t.$set(t.form,"fwznwcsj",e)},expression:"form.fwznwcsj"}})],1)],1),t._v(" "),s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"实施责任人"}},[s("el-input",{staticStyle:{width:"192px"},attrs:{placeholder:"请输入实施责任人"},model:{value:t.form.sszrr,callback:function(e){t.$set(t.form,"sszrr",e)},expression:"form.sszrr"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"完成状态"}},[s("el-select",{staticStyle:{width:"192px"},attrs:{placeholder:"请选择完成状态"},model:{value:t.form.sswczt,callback:function(e){t.$set(t.form,"sswczt",e)},expression:"form.sswczt"}},[s("el-option",{attrs:{label:"已完成",value:"1"}}),t._v(" "),s("el-option",{attrs:{label:"未完成",value:"0"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"完成时间"}},[s("el-date-picker",{staticStyle:{width:"192px"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.form.sswcsj,callback:function(e){t.$set(t.form,"sswcsj",e)},expression:"form.sswcsj"}})],1)],1),t._v(" "),s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"开发责任人"}},[s("el-input",{staticStyle:{width:"192px"},attrs:{placeholder:"请输入开发责任人"},model:{value:t.form.kfzrr,callback:function(e){t.$set(t.form,"kfzrr",e)},expression:"form.kfzrr"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"完成状态"}},[s("el-select",{staticStyle:{width:"192px"},attrs:{placeholder:"请选择完成状态"},model:{value:t.form.kfwczt,callback:function(e){t.$set(t.form,"kfwczt",e)},expression:"form.kfwczt"}},[s("el-option",{attrs:{label:"已完成",value:"1"}}),t._v(" "),s("el-option",{attrs:{label:"未完成",value:"0"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"完成时间"}},[s("el-date-picker",{staticStyle:{width:"192px"},attrs:{type:"date",placeholder:"选择日期","value-format":"yyyy-MM-dd"},model:{value:t.form.kfwcsj,callback:function(e){t.$set(t.form,"kfwcsj",e)},expression:"form.kfwcsj"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{"text-right":""}},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm("form")}}},[t._v("保存")]),t._v(" "),s("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var n=s("VU/8")(l,o,!1,function(t){s("cr1n")},"data-v-2008ce6e",null).exports,c=s("XZD3"),f={name:"el-tree-select",props:{props:{type:Object,default:function(){return{value:"id",label:"title",children:"children"}}},options:{type:Array,default:function(){return[]}},value:{type:Number,default:function(){return null}},clearable:{type:Boolean,default:function(){return!0}},accordion:{type:Boolean,default:function(){return!1}}},data:function(){return{valueId:this.value,valueTitle:"",defaultExpandedKey:[]}},mounted:function(){this.initHandle()},methods:{initHandle:function(){this.valueId&&(this.valueTitle=this.$refs.selectTree.getNode(this.valueId).data[this.props.label],this.$refs.selectTree.setCurrentKey(this.valueId),this.defaultExpandedKey=[this.valueId]),this.$nextTick(function(){var t=document.querySelectorAll(".el-scrollbar .el-select-dropdown__wrap")[0],e=document.querySelectorAll(".el-scrollbar .el-scrollbar__bar");t.style.cssText="margin: 0px; max-height: none; overflow: hidden;",e.forEach(function(t){return t.style.width=0})})},handleNodeClick:function(t){this.valueTitle=t[this.props.label],this.valueId=t[this.props.value],this.$emit("getValue",this.valueId),this.defaultExpandedKey=[]},clearHandle:function(){this.valueTitle="",this.valueId=null,this.defaultExpandedKey=[],this.clearSelected(),this.$emit("getValue",null)},clearSelected:function(){document.querySelectorAll("#tree-option .el-tree-node").forEach(function(t){return t.classList.remove("is-current")})}},watch:{value:function(){this.valueId=this.value,this.initHandle()}}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-select",{attrs:{size:"mini",value:t.valueTitle,clearable:t.clearable},on:{clear:t.clearHandle}},[s("el-option",{attrs:{value:t.valueTitle,label:t.valueTitle}},[s("el-tree",{ref:"selectTree",attrs:{id:"tree-option",accordion:t.accordion,data:t.options,props:t.props,"node-key":t.props.value,"default-expanded-keys":t.defaultExpandedKey},on:{"node-click":t.handleNodeClick}})],1)],1)},staticRenderFns:[]};var d=s("VU/8")(f,h,!1,function(t){s("kAS6")},"data-v-57ddcd24",null).exports,m={data:function(){return{ssjhShow:!1,dialogVisible:!1,year:"",currentPage:1,pageSize:15,records:0,unit:{},curDept:{},filterData:{txrqStart:"",txrqEnd:""},treeOptions:[],tableData:[],curData:{}}},mounted:function(){this.pageServiceItemPlan()},methods:{handleChangeUnit:function(t){this.curDept={},this.unit=t,this.currentPage=1,this.pageServiceItemPlan(),this.treeDept()},getValue:function(t){this.curDept.bmbh!=t&&(this.curDept.bmbh=t||"",this.pageServiceItemPlan())},handleChangeTxrq:function(){this.year?(this.filterData.txrqStart=this.year+"-00-00",this.filterData.txrqEnd=this.year+"-12-32"):(this.filterData.txrqStart=this.year,this.filterData.txrqEnd=this.year),this.currentPage=1,this.pageServiceItemPlan()},handleAddSsjh:function(t){this.curData={},this.curData.zbwid=t.wid,this.ssjhShow=!0},handleEditSsjh:function(t){this.curData=t,this.ssjhShow=!0},handleDeleteSsjh:function(t){var e=this;this.$confirm("是否确认删除此计划?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$post(e.API.deleteServiceItemPlan,{wid:t.wid}).then(function(t){"success"==t.state?(e.$message({message:"删除成功",type:"success"}),e.pageServiceItemPlan()):e.$message({message:t.msg,type:"error"})})}).catch(function(){})},handleCommitSSjh:function(t){var e=t;e.zbwid=this.curData.zbwid,this.saveServiceItemPlan(e)},handleAddFwsx:function(){this.dialogVisible=!0},handleCurrentChange:function(t){this.currentPage=t,this.pageServiceItemPlan()},saveServiceItemPlan:function(t){var e=this;this.$post(this.API.saveServiceItemPlan,t).then(function(t){"success"==t.state?(e.pageServiceItemPlan(),e.$message({message:"保存成功",type:"success"}),"{}"!=r()(e.curData)&&(e.ssjhShow=!1)):e.$message({message:t.msg,type:"error"})})},pageServiceItemPlan:function(){var t=this;this.$get(this.API.pageServiceItemPlan,{curPage:this.currentPage,pageSize:this.pageSize,dwbh:this.unit.dwbh,bmbh:"0"==this.curDept.bmbh?"":this.curDept.bmbh,txrqStart:this.filterData.txrqStart?this.filterData.txrqStart:"",txrqEnd:this.filterData.txrqEnd?this.filterData.txrqEnd:""}).then(function(e){"success"==e.state&&(e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.records=e.data.records)})},treeDept:function(){var t=this;this.$get(this.API.treeDeptWithUnit,{dwbh:this.unit.dwbh,dwmc:this.unit.dwmc,zts:"1,3"}).then(function(e){"success"==e.state&&(t.treeOptions=e.data)})}},components:{serviceItem:i.default,ssjhDailog:n,chooseSchool:c.a,selectTree:d}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pannelPadding-10"},[s("div",{staticClass:"pannelPaddingBg-10"},[s("div",{staticClass:"mg-12"},[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleAddFwsx}},[t._v("添加服务事项计划")])],1),t._v(" "),s("div",{attrs:{flex:""}},[s("chooseSchool",{on:{handleChangeUnit:t.handleChangeUnit}}),t._v("　\n      "),s("div",[s("span",{staticClass:"filter-weight before-require"},[t._v("部门：")]),t._v(" "),s("selectTree",{attrs:{options:t.treeOptions},on:{getValue:t.getValue}})],1)],1),t._v(" "),s("div",{staticClass:"mg-12"},[s("span",{staticClass:"filter-weight"},[t._v("计划年份：")]),t._v(" "),s("el-date-picker",{staticStyle:{width:"300px"},attrs:{size:"mini",type:"year",placeholder:"选择年份",format:"yyyy 年","value-format":"yyyy"},on:{change:t.handleChangeTxrq},model:{value:t.year,callback:function(e){t.year=e},expression:"year"}})],1),t._v(" "),s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[s("el-table-column",{attrs:{prop:"txrq",label:"计划年份",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(e.row.txrq.slice(0,4)))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"txrq",label:"填写日期",width:"110"}}),t._v(" "),s("el-table-column",{attrs:{prop:"dwmc",label:"学校","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwmc",label:"服务事项名称","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),s("el-table-column",{attrs:{prop:"bmmc",label:"部门名称","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwdx",label:"服务对象","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwlb",label:"服务类别","min-width":"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"xxhzc",label:"信息化支持","min-width":"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(1==e.row.xxhzc?"是":"否"))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"fwznzrr",label:"服务指南责任人",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwznwcsj",label:"服务指南完成时间",width:"140"}}),t._v(" "),s("el-table-column",{attrs:{prop:"kfzrr",label:"开发责任人",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"kfwcsj",label:"开发完成时间",width:"110"}}),t._v(" "),s("el-table-column",{attrs:{prop:"sszrr",label:"实施责任人",width:"100"}}),t._v(" "),s("el-table-column",{attrs:{prop:"sswcsj",label:"实施完成时间",width:"110"}}),t._v(" "),s("el-table-column",{attrs:{fixed:"left",label:"操作",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"text",size:"small"},on:{click:function(s){t.handleEditSsjh(e.row)}}},[t._v("编辑")]),t._v(" "),s("el-button",{staticStyle:{color:"#f00"},attrs:{type:"text",size:"small"},on:{click:function(s){t.handleDeleteSsjh(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),s("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.records},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1),t._v(" "),s("el-dialog",{attrs:{title:"添加实施计划",visible:t.dialogVisible,width:"1200px"},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("div",[s("serviceItem",{attrs:{isPlan:!0},on:{handleAddSsjh:t.handleAddSsjh}})],1)]),t._v(" "),s("ssjhDailog",{attrs:{show:t.ssjhShow,curData:t.curData,zbwid:t.curData.zbwid},on:{"update:show":function(e){t.ssjhShow=e},handleCommitSSjh:t.handleCommitSSjh}})],1)},staticRenderFns:[]};var p=s("VU/8")(m,u,!1,function(t){s("FYx3")},null,null);e.default=p.exports},FYx3:function(t,e){},YOAO:function(t,e){},cr1n:function(t,e){},kAS6:function(t,e){},md9p:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("mvHQ"),r=s.n(a),i=s("QVEk"),l=s("TNFc"),o={data:function(){return{dialogVisible:this.show,isClearFileBsyj:!1,isClearFileFwzn:!1,fwlbList:[],fwdxList:[],fwData:{},bsyjfjMc:"",fwznfjMc:"",form:{fwmc:"",fwdx:[],lxr:"",lxfs:"",sjbm:"",bsyj:"",bsyjfj:"",fwzn:"0",fwznsm:"",fwznfj:"",fwlb:"",fwnr:"",xxhzc:"0",xxhjsnf:"",xxhcjgs:"",xxhjszt:"",xxhsxsj:"",xxzxdjls:"",xxzxdjlslxfs:"",ywbmdjls:"",ywbmdjlslxfs:"",cjgsdjr:"",cjgsdjrlxfs:"",syqk:"",bz:""}}},props:{show:{type:Boolean,default:!1},Type:{type:String,default:""},wid:{type:String,default:""}},watch:{show:function(t,e){var s=this;t&&(this.getService(),"edit"==this.Type?this.$get(this.API.getServiceItem,{wid:this.wid}).then(function(t){"success"==t.state&&(s.fwData=t.data,s.form.fwmc=s.fwData.fwmc,s.form.fwdx=s.fwData.fwdxwid.split(","),s.form.lxr=s.fwData.lxr,s.form.lxfs=s.fwData.lxfs,s.form.sjbm=s.fwData.sjbm,s.form.bsyj=s.fwData.bsyj,s.bsyjfjMc=s.fwData.bsyjFj?s.fwData.bsyjFj[0].fjmc:"",s.form.bsyjfj=s.fwData.bsyjFj?s.fwData.bsyjFj[0].fjbh+"|"+s.fwData.bsyjFj[0].fjmc:"",s.form.fwzn=s.fwData.fwzn,s.form.fwznsm=s.fwData.fwznsm,s.fwznfjMc=s.fwData.fwznFj?s.fwData.fwznFj[0].fjmc:"",s.form.fwznfj=s.fwData.fwznFj?s.fwData.fwznFj[0].fjbh+"|"+s.fwData.fwznFj[0].fjmc:"",s.form.fwlb=s.fwData.fwlbwid,s.form.fwnr=s.fwData.fwnr,s.form.xxhzc=s.fwData.xxhzc,s.form.xxhjsnf=s.fwData.xxhjsnf,s.form.xxhcjgs=s.fwData.xxhcjgs,s.form.xxhjszt=s.fwData.xxhjszt,s.form.xxhsxsj=s.fwData.xxhsxsj,s.form.xxzxdjls=s.fwData.xxzxdjls,s.form.xxzxdjlslxfs=s.fwData.xxzxdjlslxfs,s.form.ywbmdjls=s.fwData.ywbmdjls,s.form.ywbmdjlslxfs=s.fwData.ywbmdjlslxfs,s.form.cjgsdjr=s.fwData.cjgsdjr,s.form.cjgsdjrlxfs=s.fwData.cjgsdjrlxfs,s.form.syqk=s.fwData.syqk,s.form.bz=s.fwData.bz,s.form.wid=s.fwData.wid)}):(delete this.form.wid,this.form.fwmc=this.form.lxr=this.form.lxfs=this.form.sjbm="",this.form.bsyj="",this.form.bsyjfj="",this.form.fwzn="0",this.form.fwznsm="",this.form.fwznfj="",this.isClearFileBsyj=!this.isClearFileBsyj,this.isClearFileFwzn=!this.isClearFileFwzn,this.form.fwlb="",this.form.fwnr="",this.form.xxhzc="0",this.form.xxhjsnf="",this.form.xxhcjgs="",this.form.xxhjszt="",this.form.xxhsxsj="",this.form.xxzxdjls="",this.form.xxzxdjlslxfs="",this.form.ywbmdjls="",this.form.ywbmdjlslxfs="",this.form.cjgsdjr="",this.form.cjgsdjrlxfs="",this.form.syqk="",this.form.bz="",this.form.fwdx=[])),this.dialogVisible=this.show}},methods:{handleUploadFileBsyj:function(t){this.form.bsyjfj=t.join(",")},handleUploadFileFwzn:function(t){this.form.fwznfj=t.join(",")},handleRemoveBsyjfj:function(){this.form.bsyjfj="",this.bsyjfjMc=""},handleRemoveFwznfj:function(){this.form.fwznfj="",this.fwznfjMc=""},getService:function(){var t=this;this.$get(this.API.serviceObjects,{}).then(function(e){"success"==e.state?t.fwdxList=e.data:t.$message({message:e.msg,type:"error"})}),this.$get(this.API.serviceCatalogs,{}).then(function(e){"success"==e.state?t.fwlbList=e.data:t.$message({message:e.msg,type:"error"})})},onSubmit:function(){this.valiDate()&&this.$emit("handleCommitService",this.form)},getServiceItem:function(){var t=this;this.$get(this.API.getServiceItem,{wid:this.wid}).then(function(e){"success"==e.state&&(t.fwData=e.data)})},valiDate:function(){return this.form.fwmc?this.form.fwdx.length?this.form.lxr?/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.form.lxfs)&&/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.lxfs)?this.form.fwlb?1!=this.form.xxhzc||this.form.xxhjsnf?1!=this.form.xxhzc||this.form.xxhcjgs?1!=this.form.xxhzc||this.form.xxhjszt?!(1==this.form.xxhzc&&!this.form.xxhsxsj)||(this.$message({message:"请选择上线时间",type:"warning"}),!1):(this.$message({message:"请选择建设状态",type:"warning"}),!1):(this.$message({message:"请输入承建公司",type:"warning"}),!1):(this.$message({message:"请选择建设年份",type:"warning"}),!1):(this.$message({message:"请选择服务类别",type:"warning"}),!1):(this.$message({message:"请填写正确联系方式",type:"warning"}),!1):(this.$message({message:"请输入联系人",type:"warning"}),!1):(this.$message({message:"请选择服务对象",type:"warning"}),!1):(this.$message({message:"请填写服务名称",type:"warning"}),!1)}},components:{uploadFile:l.a}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("el-dialog",{attrs:{title:"服务事项基本信息",visible:t.dialogVisible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show,width:"1000px"},on:{"update:visible":function(e){t.dialogVisible=e},close:function(e){t.$emit("update:show",!1)}}},[s("el-form",{ref:"form",staticStyle:{padding:"10px"},attrs:{model:t.form,"label-width":"135px",size:"mini"}},[s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"服务名称",required:""}},[s("el-input",{staticStyle:{width:"355px"},attrs:{placeholder:"请输入服务名称"},model:{value:t.form.fwmc,callback:function(e){t.$set(t.form,"fwmc",e)},expression:"form.fwmc"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"服务对象",required:""}},[s("el-select",{staticStyle:{width:"355px"},attrs:{multiple:"",placeholder:"请选择服务对象"},model:{value:t.form.fwdx,callback:function(e){t.$set(t.form,"fwdx",e)},expression:"form.fwdx"}},t._l(t.fwdxList,function(t,e){return s("el-option",{key:e,attrs:{label:t.text,value:t.id}})}))],1)],1),t._v(" "),s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"联系人",required:""}},[s("el-input",{staticStyle:{width:"355px"},attrs:{type:"text",placeholder:"请输入联系人"},model:{value:t.form.lxr,callback:function(e){t.$set(t.form,"lxr",e)},expression:"form.lxr"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"联系方式",required:""}},[s("el-input",{staticStyle:{width:"355px"},attrs:{type:"number",placeholder:"请输入联系方式"},model:{value:t.form.lxfs,callback:function(e){t.$set(t.form,"lxfs",e)},expression:"form.lxfs"}})],1)],1),t._v(" "),s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"服务类别",required:""}},[s("el-select",{staticStyle:{width:"355px"},attrs:{placeholder:"请选择服务类别"},model:{value:t.form.fwlb,callback:function(e){t.$set(t.form,"fwlb",e)},expression:"form.fwlb"}},t._l(t.fwlbList,function(t,e){return s("el-option",{key:e,attrs:{label:t.text,value:t.id}})}))],1),t._v(" "),s("el-form-item",{attrs:{label:"涉及部门"}},[s("el-input",{staticStyle:{width:"355px"},attrs:{placeholder:"请输入涉及部门"},model:{value:t.form.sjbm,callback:function(e){t.$set(t.form,"sjbm",e)},expression:"form.sjbm"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"服务内容"}},[s("el-input",{attrs:{type:"textarea",placeholder:"请输入服务内容"},model:{value:t.form.fwnr,callback:function(e){t.$set(t.form,"fwnr",e)},expression:"form.fwnr"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"办事依据"}},[s("el-input",{staticStyle:{width:"100%"},attrs:{placeholder:"请输入办事依据"},model:{value:t.form.bsyj,callback:function(e){t.$set(t.form,"bsyj",e)},expression:"form.bsyj"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"办事依据附件"}},[s("uploadFile",{attrs:{istb:t.isClearFileBsyj},on:{handleUploadFile:t.handleUploadFileBsyj}}),t._v(" "),t.bsyjfjMc?s("p",{staticClass:"file"},[t._v(t._s(t.bsyjfjMc)+" "),s("i",{staticClass:"el-icon-close",on:{click:t.handleRemoveBsyjfj}})]):t._e()],1),t._v(" "),s("el-form-item",{attrs:{label:"服务指南",required:""}},[s("el-radio-group",{staticStyle:{width:"100%"},model:{value:t.form.fwzn,callback:function(e){t.$set(t.form,"fwzn",e)},expression:"form.fwzn"}},[s("el-radio",{attrs:{label:"1"}},[t._v("有")]),t._v(" "),s("el-radio",{attrs:{label:"0"}},[t._v("无")])],1)],1),t._v(" "),1==t.form.fwzn?s("el-form-item",{attrs:{label:"服务指南说明",required:""}},[s("el-input",{attrs:{type:"textarea",placeholder:"服务指南说明"},model:{value:t.form.fwznsm,callback:function(e){t.$set(t.form,"fwznsm",e)},expression:"form.fwznsm"}})],1):t._e(),t._v(" "),1==t.form.fwzn?s("el-form-item",{attrs:{label:"服务指南附件"}},[s("uploadFile",{attrs:{istb:t.isClearFileFwzn},on:{handleUploadFile:t.handleUploadFileFwzn}}),t._v(" "),t.fwznfjMc?s("p",{staticClass:"file"},[t._v(t._s(t.fwznfjMc)+" "),s("i",{staticClass:"el-icon-close",on:{click:t.handleRemoveFwznfj}})]):t._e()],1):t._e(),t._v(" "),s("el-form-item",{attrs:{label:"信息化支持",required:""}},[s("el-radio-group",{staticStyle:{width:"100%"},model:{value:t.form.xxhzc,callback:function(e){t.$set(t.form,"xxhzc",e)},expression:"form.xxhzc"}},[s("el-radio",{attrs:{label:"1"}},[t._v("有")]),t._v(" "),s("el-radio",{attrs:{label:"0"}},[t._v("无")])],1)],1),t._v(" "),1==t.form.xxhzc?s("div",[s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"建设年份",required:""}},[s("el-date-picker",{staticStyle:{width:"355px"},attrs:{align:"right",type:"year",placeholder:"选择年"},model:{value:t.form.xxhjsnf,callback:function(e){t.$set(t.form,"xxhjsnf",e)},expression:"form.xxhjsnf"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"承建公司",required:""}},[s("el-input",{staticStyle:{width:"355px"},attrs:{placeholder:"请输入承建公司"},model:{value:t.form.xxhcjgs,callback:function(e){t.$set(t.form,"xxhcjgs",e)},expression:"form.xxhcjgs"}})],1)],1),t._v(" "),s("div",{attrs:{flex:""}},[s("el-form-item",{attrs:{label:"建设状态",required:""}},[s("el-select",{staticStyle:{width:"355px"},attrs:{placeholder:"请选择建设状态"},model:{value:t.form.xxhjszt,callback:function(e){t.$set(t.form,"xxhjszt",e)},expression:"form.xxhjszt"}},[s("el-option",{attrs:{label:"在建",value:"1"}}),t._v(" "),s("el-option",{attrs:{label:"售后",value:"2"}}),t._v(" "),s("el-option",{attrs:{label:"服务",value:"3"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"上线时间",required:""}},[s("el-date-picker",{staticStyle:{width:"355px"},attrs:{type:"date",placeholder:"选择日期"},model:{value:t.form.xxhsxsj,callback:function(e){t.$set(t.form,"xxhsxsj",e)},expression:"form.xxhsxsj"}})],1)],1)]):t._e(),t._v(" "),s("el-form-item",{attrs:{label:"使用情况"}},[s("el-input",{staticStyle:{width:"100%"},attrs:{type:"textarea",rows:"4",placeholder:"请输入使用情况"},model:{value:t.form.syqk,callback:function(e){t.$set(t.form,"syqk",e)},expression:"form.syqk"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"备注"}},[s("el-input",{attrs:{type:"textarea",rows:"4",placeholder:"请输入备注"},model:{value:t.form.bz,callback:function(e){t.$set(t.form,"bz",e)},expression:"form.bz"}})],1),t._v(" "),s("el-form-item",{attrs:{"text-right":""}},[s("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("保存")]),t._v(" "),s("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var c=s("VU/8")(o,n,!1,function(t){s("qc24")},"data-v-709989f0",null).exports,f=s("XZD3"),h={data:function(){return{tableHeight:window.innerHeight-200,jbxxShow:!1,ssjhShow:!1,Type:"",treeDataSource:[],currentPage:1,pageSize:15,records:0,keywordTree:"",keyword:"",tableData:[],unit:{},curDept:{},wid:"",prevTree:{}}},props:{isPlan:{type:Boolean,default:!1}},methods:{handleChangeFwsx:function(){this.pageServiceItem()},handleChangeTree:function(){this.treeDept()},handleChangeUnit:function(t){this.curDept={},this.unit=t,this.treeDept(),this.pageServiceItem()},handleCommitSSjh:function(t){var e=this;t.zbwid=this.curData.wid,this.$post(this.API.updateServiceItemPlan,t).then(function(t){"success"==t.state?(e.pageServiceItem(),e.$message({message:"保存成功",type:"success"}),e.ssjhShow=!1):e.$message({message:t.msg,type:"error"})})},handleCommitService:function(t){var e=this,s=t;s.fwdx=t.fwdx.join(","),s.dwbh=this.unit.dwbh,s.dwmc=this.unit.dwmc,s.bmbh=this.curDept.id,s.bmmc=this.curDept.title,this.$post(this.API.saveServiceItem,s).then(function(t){"success"==t.state?(e.pageServiceItem(),e.$message({message:"添加成功",type:"success"}),e.jbxxShow=!1):e.$message({message:t.msg,type:"error"})})},handleCurrentChange:function(t){this.currentPage=t,this.pageServiceItem()},handlerExpand:function(t){t.isExpand=!t.isExpand},handlerChooseModel:function(t){"{}"!=r()(this.prevTree)&&this.$set(this.prevTree,"Experience","无"),this.$set(t,"Experience","1"),this.prevTree=t,this.curDept=t,this.currentPage=1,this.pageServiceItem()},handleAddService:function(){this.Type="",this.jbxxShow=!0},handleAddSsjh:function(t){this.$emit("handleAddSsjh",t)},handleDelSsjh:function(t,e){var s=this;this.$confirm("是否确定删除此条记录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){s.$post(s.API.deleteServiceItem,{wid:t.wid}).then(function(t){"success"==t.state?(s.$message({message:"删除成功",type:"success"}),s.tableData.splice(e,1)):s.$alert(t.msg,"提示",{confirmButtonText:"确定",type:"error"})})}).catch(function(){})},handleOperate:function(t,e){"edit"==t?(this.wid=e.wid,this.Type="edit",this.jbxxShow=!0):"ssjh"==t&&(this.ssjhShow=!0)},pageServiceItem:function(){var t=this;this.$get(this.API.pageServiceItem,{curPage:this.currentPage,pageSize:this.isPlan?10:this.pageSize,dwbh:this.unit.dwbh,bmbh:"0"==this.curDept.id?"":this.curDept.id,keyword:this.keyword}).then(function(e){"success"==e.state?(e.data&&e.data.rows?t.tableData=e.data.rows:t.tableData=[],t.records=e.data.records):t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},treeDept:function(){var t=this;this.$get(this.API.treeDeptWithUnit,{dwbh:this.unit.dwbh,dwmc:this.unit.dwmc,zts:"1,3",keyword:this.keywordTree}).then(function(e){"success"==e.state&&(t.treeDataSource=e.data)})}},components:{treeTable:i.a,jbxxDailog:c,chooseSchool:f.a}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"pannelPadding-10"},[s("div",{staticClass:"pannelPaddingBg-10 jh-pannel "},[s("div",[s("div",{staticClass:"tree"},[s("chooseSchool",{on:{handleChangeUnit:t.handleChangeUnit}}),t._v(" "),s("br"),t._v(" "),s("div",{attrs:{flex:"",spacebetween:""}},[s("el-input",{staticStyle:{width:"300px"},attrs:{size:"mini",placeholder:"请输入部门名称"},on:{change:t.handleChangeTree},model:{value:t.keywordTree,callback:function(e){t.keywordTree=e},expression:"keywordTree"}}),t._v(" "),s("el-button",{attrs:{size:"mini",type:"primary"},on:{change:t.handleChangeTree}},[t._v("查询")])],1),t._v(" "),s("tree-table",{ref:"recTree",attrs:{list:t.treeDataSource},on:{"update:list":function(e){t.treeDataSource=e},handlerExpand:t.handlerExpand,handlerChooseModel:t.handlerChooseModel}})],1),t._v(" "),s("div",{staticClass:"form"},[t.curDept.parentId?s("div",{staticStyle:{"padding-bottom":"10px"}},[s("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handleAddService}},[t._v("添加服务事项")])],1):t._e(),t._v(" "),s("div",[s("el-input",{staticStyle:{width:"500px"},attrs:{size:"mini",placeholder:"请输入服务名称"},on:{change:t.handleChangeFwsx},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),t._v(" "),s("el-button",{attrs:{size:"mini",type:"primary"},on:{change:t.handleChangeFwsx}},[t._v("查询")])],1),s("br"),t._v(" "),s("el-table",{style:{width:t.isPlan?"760px":"100%"},attrs:{data:t.tableData,border:"","max-height":t.tableHeight}},[s("el-table-column",{attrs:{fixed:"left",label:"操作",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.isPlan?t._e():s("el-button",{attrs:{type:"text",size:"small"},on:{click:function(s){t.handleOperate("edit",e.row)}}},[t._v("编辑")]),t._v(" "),t.isPlan?t._e():s("a",{attrs:{href:"#/schoolSeivice/detail?id="+e.row.wid,target:"_blank"}},[t._v("查看")]),t._v(" "),t.isPlan?s("el-button",{attrs:{type:"text",size:"small"},on:{click:function(s){t.handleAddSsjh(e.row)}}},[t._v("添加")]):t._e(),t._v(" "),s("el-button",{staticStyle:{color:"#f00"},attrs:{type:"text",size:"small"},on:{click:function(s){t.handleDelSsjh(e.row,t.scoped.$index)}}},[t._v("删除")])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"fwmc",label:"服务名称","min-width":"220"}}),t._v(" "),s("el-table-column",{attrs:{prop:"bmmc",label:"部门名称",width:"180"}}),t._v(" "),s("el-table-column",{attrs:{prop:"bsyj",label:"办事依据",width:"180"}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwdx",label:"服务对象",width:"180"}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwlb",label:"服务类别",width:"120"}}),t._v(" "),s("el-table-column",{attrs:{prop:"fwzn",label:"服务指南",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s("0"==e.row.fwzn?"无":"有"))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"xxhzc",label:"信息化支持",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s("0"==e.row.xxhzc?"无":"有"))])]}}])})],1),t._v(" "),s("el-pagination",{attrs:{"current-page":t.currentPage,"page-size":t.pageSize,layout:"total, prev, pager, next",total:t.records},on:{"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.currentPage=e}}})],1)])]),t._v(" "),s("jbxxDailog",{attrs:{show:t.jbxxShow,wid:t.wid,Type:t.Type},on:{"update:show":function(e){t.jbxxShow=e},handleCommitService:t.handleCommitService}})],1)},staticRenderFns:[]};var m=s("VU/8")(h,d,!1,function(t){s("YOAO")},null,null);e.default=m.exports},qc24:function(t,e){}});
//# sourceMappingURL=18.c8b5d61b980b2757efdb.js.map