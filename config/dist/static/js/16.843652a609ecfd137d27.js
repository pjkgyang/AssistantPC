webpackJsonp([16],{"5Kfr":function(t,e){},"5OU5":function(t,e){},fLVd:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("NxvJ"),s=a("P+gh"),n=a("YkBq"),o={data:function(){return{visible:this.show,keyword:"",currentPage:1,pageSize:15,total:200,tableData:[],inx:""}},methods:{handleCurrentChange:function(t){this.currentPage=t,this.getUsers()},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getUsers()},handleSearchUser:function(){this.getUsers()},handleAdd:function(t,e){var a=this;this.$post(this.API.saveZdcy,{wid:"",cyid:e.usercode,cyxm:e.username,qyzdwid:this.qyzdwid}).then(function(t){"success"==t.state&&a.$alert("添加成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){e.ytj=0,a.$emit("addUserSuccess","")}})})},getUsers:function(){var t=this;Object(n.j)({curPage:this.currentPage,pageSize:this.pageSize,unitType:0,keyword:this.keyword,dept:"01AM"}).then(function(e){var a=e.data;"success"==a.state&&(a.data&&a.data.rows?(t.total=a.data.records,t.tableData=a.data.rows,t.tableData.forEach(function(t){t.ytj=1})):(t.total=0,t.tableData=[]))})}},props:{show:{type:Boolean,default:!1},qyzdwid:{type:String,default:""}},watch:{show:function(t,e){this.visible=this.show,t&&this.getUsers()}},components:{tableLayout:s.a}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"人员列表",width:"1000px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("tableLayout",{staticStyle:{padding:"0 10px"}},[a("section",{attrs:{slot:"top"},slot:"top"},[a("el-input",{attrs:{size:"mini",placeholder:"请搜索人员姓名/工号/部门","suffix-icon":"el-icon-search"},on:{change:t.handleSearchUser},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"max-height":580,border:""}},[a("el-table-column",{attrs:{prop:"username",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"usercode",label:"工号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"dept",label:"部门"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",disabled:0==e.row.ytj},on:{click:function(a){t.handleAdd(e.$index,e.row)}}},[t._v(t._s(e.row.ytj?"添加":"已添加"))])]}}])})],1)],1)]),t._v(" "),a("div",{staticClass:"pd-10",attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var r=a("Z0/y")(o,l,!1,function(t){a("5Kfr")},"data-v-5f37f5d1",null).exports,c=(a("IfOk"),{data:function(){return{visible:this.show,keyword:"",currentPage:1,pageSize:15,total:0,filters:[{text:"在建",value:"在建"},{text:"售后",value:"售后"},{text:"过保",value:"过保"},{text:"已关闭",value:"已关闭"}],tableData:[]}},methods:{handleCurrentChange:function(t){this.currentPage=t,this.getTeamProjects()},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getTeamProjects()},handleSearchUser:function(){this.currentPage=1,this.getTeamProjects()},handleAdd:function(t,e){var a=this;this.$post(this.API.addTeamProject,{xmbh:e.xmbh,qyzdwid:this.qyzdwid}).then(function(t){"success"==t.state&&a.$alert("添加成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){e.ytj=0,a.$emit("addProjectSuccess","")}})})},getTeamProjects:function(){var t=this;this.$get(this.API.pageTeamProjects,{curPage:this.currentPage,pageSize:this.pageSize,qyzdwid:"",keyword:this.keyword}).then(function(e){"success"==e.state&&e.data.rows&&(e.data.rows.forEach(function(t){t.ytj=1}),t.tableData=e.data.rows,t.total=e.data.records)})}},props:{show:{type:Boolean,default:!1},qyzdwid:{type:String,default:""}},watch:{show:function(t,e){this.visible=this.show,t&&(this.currentPage=1,this.getTeamProjects())}},components:{tableLayout:s.a}}),d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"项目列表",width:"1000px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("tableLayout",{staticStyle:{padding:"0 10px"}},[a("section",{attrs:{slot:"top"},slot:"top"},[a("el-input",{attrs:{size:"mini",placeholder:"请搜索项目编号/项目名称","suffix-icon":"el-icon-search"},on:{change:t.handleSearchUser},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,"max-height":580,border:""}},[a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称"}}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"110"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini",disabled:0==e.row.ytj},on:{click:function(a){t.handleAdd(e.$index,e.row)}}},[t._v(t._s(e.row.ytj?"添加":"已添加"))])]}}])})],1)],1)]),t._v(" "),a("div",{staticClass:"pd-10",attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)},staticRenderFns:[]};var u=a("Z0/y")(c,d,!1,function(t){a("5OU5")},"data-v-1c5bb319",null).exports,h={data:function(){return{visible:this.show,zdxmShow:!1,userShow:!1,userData:[],itemData:[],pageSize:10,multipleUserList:[],currentPageItem:1,itemTotal:0,multipleItemList:[]}},methods:{addProjectSuccess:function(){this.currentPageItem=1,this.getTeamProjects()},addUserSuccess:function(){this.getListQyzdCy()},handleSelectionChangeUser:function(t){var e=this;this.multipleUserList=[],t.forEach(function(t){e.multipleUserList.push(t.wid)})},handleSelectionChangeItem:function(t){var e=this;this.multipleItemList=[],t.forEach(function(t){e.multipleItemList.push(t.xmbh)})},handleCurrentChangeItem:function(t){this.currentPageItem=t,this.getTeamProjects()},handleAddUser:function(){this.userShow=!this.userShow},handleAddItem:function(){this.zdxmShow=!this.zdxmShow},handleDeleteUser:function(){this.deleteZdcy()},handleDeleteItem:function(){this.deleteTeamProject()},getListQyzdCy:function(){var t=this;this.$get(this.API.listQyzdCy,{qyzdwid:this.qyzdwid}).then(function(e){"success"==e.state&&(e.data?t.userData=e.data:t.userData=[])})},getTeamProjects:function(){var t=this;this.$get(this.API.pageTeamProjects,{curPage:this.currentPageItem,pageSize:this.pageSize,qyzdwid:this.qyzdwid,keyword:""}).then(function(e){"success"==e.state&&(e.data.rows&&e.data?(t.itemData=e.data.rows,t.itemTotal=e.data.records):(t.itemData=[],t.itemTotal=0))})},deleteZdcy:function(){var t=this;this.$confirm("请确定是否删除该成员?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$post(t.API.deleteZdcy,{wids:t.multipleUserList.join(",")}).then(function(e){"success"==e.state&&t.$alert("删除成功","提示",{confirmButtonText:"确定",type:"success",callback:function(e){t.getListQyzdCy()}})})}).catch(function(){})},deleteTeamProject:function(){var t=this;this.$confirm("请确定是否删除该项目?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$post(t.API.deleteTeamProject,{xmbh:t.multipleItemList.join(",")}).then(function(e){"success"==e.state&&t.$alert("删除成功","提示",{confirmButtonText:"确定",type:"success",callback:function(e){t.getTeamProjects()}})})}).catch(function(){})}},props:{show:{type:Boolean,default:!1},qyzdwid:{type:String,default:""}},watch:{show:function(t,e){this.visible=this.show,t&&(this.getListQyzdCy(),this.getTeamProjects())}},components:{tableLayout:s.a,userDialog:r,zdxmDialog:u}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:"战队维护",width:"80%",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("div",{staticClass:"dialog-zdwh"},[a("tableLayout",{attrs:{title:"战队成员管理"}},[a("section",{attrs:{slot:"top"},slot:"top"},[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.handleAddUser(e)}}},[t._v("添加成员")]),t._v(" "),a("el-button",{attrs:{disabled:!t.multipleUserList.length,type:"danger",size:"mini"},nativeOn:{click:function(e){return t.handleDeleteUser(e)}}},[t._v("删除成员")])],1),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.userData,border:"","tooltip-effect":"dark","max-height":300},on:{"selection-change":t.handleSelectionChangeUser}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cyid",label:"成员工号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cyxm",label:"成员姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"qyzd",label:"战队名称","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"zddz",label:"战队队长","show-overflow-tooltip":""}})],1)],1)]),t._v(" "),a("tableLayout",{attrs:{title:"战队项目管理"}},[a("section",{attrs:{slot:"top"},slot:"top"},[a("el-button",{attrs:{type:"primary",size:"mini"},nativeOn:{click:function(e){return t.handleAddItem(e)}}},[t._v("添加项目")]),t._v(" "),a("el-button",{attrs:{disabled:!t.multipleItemList.length,type:"danger",size:"mini"},nativeOn:{click:function(e){return t.handleDeleteItem(e)}}},[t._v("删除项目")])],1),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.itemData,border:"","tooltip-effect":"dark","max-height":300},on:{"selection-change":t.handleSelectionChangeItem}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmbh",label:"项目编号",width:"110"}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmmc",label:"项目名称","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"xmjl",label:"项目经理",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lxrq",label:"立项日期",width:"120","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"fwqx",label:"服务期限",width:"100"}})],1),t._v(" "),a("div",{attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPageItem,"page-size":t.pageSize,layout:"total,prev, pager, next, jumper",total:t.itemTotal},on:{"current-change":t.handleCurrentChangeItem}})],1)],1)])],1)]),t._v(" "),a("zdxm-dialog",{attrs:{show:t.zdxmShow,qyzdwid:t.qyzdwid},on:{"update:show":function(e){t.zdxmShow=e},addProjectSuccess:t.addProjectSuccess}}),t._v(" "),a("user-dialog",{attrs:{show:t.userShow,qyzdwid:t.qyzdwid},on:{"update:show":function(e){t.userShow=e},addUserSuccess:t.addUserSuccess}})],1)},staticRenderFns:[]};var f=a("Z0/y")(h,p,!1,function(t){a("oR/U")},"data-v-78e1259e",null).exports,m=a("oFuF"),g={data:function(){return{visible:this.show,gczdList:[],userList:"",form:{qyzd:"",qygc:"",qyzddzid:"",qyzddzxm:""}}},methods:{changeValue:function(t){var e=this;this.userList.find(function(a){a.usercode===t&&(e.form.qyzddzxm=a.username)})},onSubmit:function(){this.validate()&&this.saveQyzd()},handleClose:function(){this.visible=!1},validate:function(){return this.form.qyzd?this.form.qygc?!!this.form.qyzddzid||(this.$alert("请选择战队队长","提示",{confirmButtonText:"确定",type:"warning"}),!1):(this.$alert("请选择区域工程","提示",{confirmButtonText:"确定",type:"warning"}),!1):(this.$alert("请填写战队名称","提示",{confirmButtonText:"确定",type:"warning"}),!1)},saveQyzd:function(){var t=this;this.$post(this.API.saveQyzd,this.form).then(function(e){"success"==e.state?(t.$alert("添加成功","提示",{confirmButtonText:"确定",type:"success",callback:function(e){t.$emit("handleAddSuccess","")}}),t.visible=!1):t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})}},props:{show:{type:Boolean,default:!1},data:{type:Object,default:function(){return{}}},title:{type:String,default:"添加战队"}},watch:{show:function(t,e){var a=this;this.visible=this.show,t&&(this.form=this.data,null==Object(m.n)("UnResponsiveStatus")?Object(m.i)("gczd",this.gczdList,!0):this.gczdList=Object(m.n)("gczd"),Object(n.j)({curPage:1,pageSize:9999,unitType:0,keyword:"",dept:"01AM"}).then(function(t){var e=t.data;"success"==e.state&&(a.userList=e.data.rows)}))}},components:{}},w={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:t.title,width:"700px",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("el-form",{ref:"form",staticStyle:{padding:"10px 20px"},attrs:{model:t.form,"label-width":"80px",size:"mini"}},[a("el-form-item",{attrs:{label:"战队名称",required:""}},[a("el-input",{model:{value:t.form.qyzd,callback:function(e){t.$set(t.form,"qyzd",e)},expression:"form.qyzd"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"区域工程",required:""}},[a("el-select",{staticStyle:{width:"100%"},attrs:{disabled:"编辑战队"==t.title,placeholder:"请选择区域工程"},model:{value:t.form.qygc,callback:function(e){t.$set(t.form,"qygc",e)},expression:"form.qygc"}},t._l(t.gczdList,function(t,e){return a("el-option",{key:e,attrs:{label:t.mc,value:t.label}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:"战队队长",required:""}},[a("el-select",{staticStyle:{width:"100%"},attrs:{filterable:"",placeholder:"请选择战队队长（可按姓名搜索）"},on:{change:t.changeValue},model:{value:t.form.qyzddzid,callback:function(e){t.$set(t.form,"qyzddzid",e)},expression:"form.qyzddzid"}},t._l(t.userList,function(t,e){return a("el-option",{key:e,attrs:{label:t.username,value:t.usercode}})}))],1),t._v(" "),a("el-form-item",{attrs:{"text-right":""}},[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("保存")]),t._v(" "),a("el-button",{on:{click:t.handleClose}},[t._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]};var y=a("Z0/y")(g,w,!1,function(t){a("xK1o")},"data-v-6b40aff2",null).exports,b={data:function(){return{show:!1,userShow:!1,addzdShow:!1,filterList:["keyword"],tableHeight:window.innerHeight-300,currentPage:1,pageSize:15,total:0,filterData:"",qyzdwid:"",userGroupTag:"",limitShow:!0,zdData:{},tableData:[],title:""}},mounted:function(){this.userGroupTag=JSON.parse(sessionStorage.userInfo).userGroupTag,-1==this.userGroupTag.indexOf("JYGL")&&-1==this.userGroupTag.indexOf("ZDDZ")||-1!=this.userGroupTag.indexOf("QYZ")||(this.limitShow=!1),-1!=this.userGroupTag.indexOf("JYGL")&&this.filterList.push("qygc"),this.getPageQyzd()},methods:{handleAddSuccess:function(){this.currentPage=1,this.getPageQyzd()},handleAddzd:function(){this.zdData={},this.title="添加战队",this.addzdShow=!this.addzdShow},handleChangeFilter:function(t){this.filterData=t,this.getPageQyzd()},handleClickEdit:function(t){this.zdData=t,this.title="编辑战队",this.addzdShow=!this.addzdShow},handleClickMaintain:function(t){this.qyzdwid=t.wid,this.show=!this.show},handleClickDelete:function(t){var e=this;this.$confirm("请确定是否删除该战队?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$post(e.API.deleteQyzd,{wid:t.wid}).then(function(t){"success"==t.state?e.$alert("删除成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){e.getPageQyzd()}}):e.$alert(t.msg,"提示",{confirmButtonText:"确定",type:"error"})})}).catch(function(){})},handleCurrentChange:function(t){this.currentPage=t,this.getPageQyzd()},handleSizeChange:function(t){this.pageSize=t,this.currentPage=1,this.getPageQyzd()},getPageQyzd:function(){var t=this;this.$get(this.API.pageQyzd,{curPage:this.currentPage,pageSize:this.pageSize,qygc:this.filterData.gczd?this.filterData.gczd:"",keyword:this.filterData.keyword?this.filterData.keyword:""}).then(function(e){"success"==e.state&&(t.tableData=e.data.rows,t.total=e.data.records)})}},components:{filterComponent:i.a,zdwhDialog:f,addzdDialog:y}},v={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"layout-bgf"},[a("el-card",{attrs:{shadow:"hover"}},[a("filterComponent",{attrs:{filterList:t.filterList,placeholder:"请输入战队队长工号/姓名"},on:{handleChangeFilter:t.handleChangeFilter}})],1)],1),t._v(" "),a("div",{staticClass:"layout-bgf"},[a("el-card",{staticStyle:{padding:"0 20px"},attrs:{shadow:"hover"}},[t.limitShow?a("div",{staticClass:"mb-12"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.handleAddzd}},[t._v("添加战队")])],1):t._e(),t._v(" "),a("el-table",{attrs:{data:t.tableData,border:"","max-height":t.tableHeight}},[a("el-table-column",{attrs:{fixed:"left",label:"操作",width:"220"},scopedSlots:t._u([{key:"default",fn:function(e){return[t.limitShow?a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleClickDelete(e.row)}}},[t._v("删除")]):t._e(),t._v(" "),t.limitShow?a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleClickEdit(e.row)}}},[t._v("编辑")]):t._e(),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.handleClickMaintain(e.row)}}},[t._v("维护")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"qygc",label:"区域工程","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"qyzd",label:"战队名称","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"qyzddzxm",label:"战队队长",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sjzgxm",label:"上级领导姓名",width:"120"}})],1),t._v(" "),a("div",{staticClass:"pd-10",attrs:{"text-right":""}},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[15,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1),t._v(" "),a("zdwh-dialog",{attrs:{show:t.show,qyzdwid:t.qyzdwid},on:{"update:show":function(e){t.show=e}}}),t._v(" "),a("addzd-dialog",{attrs:{show:t.addzdShow,data:t.zdData,title:t.title},on:{"update:show":function(e){t.addzdShow=e},handleAddSuccess:t.handleAddSuccess}})],1)},staticRenderFns:[]};var z=a("Z0/y")(b,v,!1,function(t){a("lUPc")},"data-v-61dee758",null);e.default=z.exports},lUPc:function(t,e){},"oR/U":function(t,e){},xK1o:function(t,e){}});
//# sourceMappingURL=16.843652a609ecfd137d27.js.map