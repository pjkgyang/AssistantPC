webpackJsonp([71],{hcWy:function(e,t){},"ht/Z":function(e,t){},lA6j:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("XZD3"),n=i("woOf"),a=i.n(n),h={name:"tree-item",props:{model:{type:Object,default:function(){return{}}},options:{type:Object,default:function(){return{}}},depth:{type:Number,default:0},ids:{type:Array,default:function(){return[]}},idsWithParent:{type:Array,default:function(){return[]}},half:{type:Array,default:function(){return[]}},state:{type:Number,default:0}},data:function(){return{open:!1,itemState:0}},computed:{toggleIcon:function(){return this.open?this.options.closeIcon:this.options.openIcon},labelIcon:function(){return-1!==this.half.indexOf(this.model.id)?this.options.halfCheckedIcon:-1!==this.idsWithParent.indexOf(this.model.id)?this.options.checkedIcon:this.options.uncheckedIcon},labelStatus:function(){return-1!==this.half.indexOf(this.model.id)?"half-checked":-1!==this.idsWithParent.indexOf(this.model.id)?"checked":"unchecked"},isFolder:function(){return this.model.children&&this.model.children.length},isBold:function(){return{"item-bold":this.isFolder&&this.options.folderBold}},self:function(){var e=a()({},this.model,{children:[]});return delete e.children,e}},created:function(){if(this.isFolder&&this.depth<this.options.depthOpen&&(this.open=!0),this.options.checkbox){if(-1!==this.idsWithParent.indexOf(this.model.id)){if(this.itemState=this.itemState+1,this.isFolder&&!this.options.idsWithParent){var e=this.ids.indexOf(this.model.id);-1!==e&&this.$delete(this.ids,e)}this.$emit("child-change",!0)}this.state>0&&(this.addChecked(),this.itemState=this.itemState+1)}},watch:{state:function(e,t){e>t?(this.addChecked(),this.itemState=this.itemState+1):(this.delChecked(),this.deleteHalfChecked(this.model.id),this.itemState=this.itemState-1)}},methods:{toggle:function(){this.isFolder&&(this.open=!this.open)},handle:function(){this.emitHandle(this.self)},emitHandle:function(e){this.$emit("handle",e)},toggleChecked:function(){this.isFolder&&this.deleteHalfChecked(),-1!==this.idsWithParent.indexOf(this.model.id)?(this.delChecked(),this.$emit("child-change",!1),this.itemState=this.itemState-1):(this.addChecked(),this.$emit("child-change",!0),this.options.checkedOpen&&this.isFolder&&(this.open=!0),this.itemState=this.itemState+1)},addChecked:function(){-1===this.idsWithParent.indexOf(this.model.id)&&this.$set(this.idsWithParent,this.idsWithParent.length,this.model.id),this.isFolder&&!this.options.idsWithParent||-1===this.ids.indexOf(this.model.id)&&this.$set(this.ids,this.ids.length,this.model.id)},delChecked:function(){var e=this.idsWithParent.indexOf(this.model.id),t=this.ids.indexOf(this.model.id);-1!==e&&this.$delete(this.idsWithParent,e),-1!==t&&this.$delete(this.ids,t)},setHalfChecked:function(){-1===this.half.indexOf(this.model.id)&&this.$set(this.half,this.half.length,this.model.id)},deleteHalfChecked:function(){var e=this.half.indexOf(this.model.id);-1!==e&&this.$delete(this.half,e)},childChange:function(e){var t=this;if(this.model.children.some(function(e){return-1!==t.half.indexOf(e.id)}))return this.addChecked(),this.setHalfChecked(),void this.$emit("child-change",!0);e?(this.addChecked(),this.model.children.some(function(e){return-1===t.idsWithParent.indexOf(e.id)})?this.setHalfChecked():this.deleteHalfChecked(),this.$emit("child-change",!0)):(this.model.children.some(function(e){return-1!==t.idsWithParent.indexOf(e.id)})?this.setHalfChecked():(this.deleteHalfChecked(),this.delChecked()),this.$emit("child-change",!1))}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("li",{staticClass:"vue-tree-item"},[i("div",{staticClass:"item-wrapper",attrs:{onselectstart:"return false;"}},[e.isFolder?i("span",{staticClass:"item-toggle",on:{click:e.toggle}},[i("i",{class:[e.toggleIcon]})]):i("span",{staticClass:"item-toggle"}),e._v(" "),e.options.checkbox?i("span",{staticClass:"item-checkbox",class:[e.labelIcon,e.labelStatus],on:{click:e.toggleChecked}}):e._e(),e._v(" "),i("span",{staticClass:"item-label",class:e.isBold,on:{click:e.handle}},[e._v("\n      "+e._s(e.model[e.options.label])+"\n    ")])]),e._v(" "),e.isFolder?i("ul",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],staticClass:"vue-tree-list"},e._l(e.model.children,function(t,s){return i("tree-item",{key:s,attrs:{model:t,options:e.options,ids:e.ids,depth:e.depth+1,"ids-with-parent":e.idsWithParent,half:e.half,state:e.itemState},on:{handle:e.emitHandle,"child-change":e.childChange}})})):e._e()])},staticRenderFns:[]},o=i("VU/8")(h,d,!1,null,null,null).exports,l=(i("ht/Z"),{components:{"tree-item":o},model:{prop:"ids",event:"change"},props:{treeData:{type:Array,default:function(){return[]}},options:{type:Object,default:function(){return{}}},ids:{type:Array,default:function(){return[]}}},data:function(){return{defaultOptions:{label:"label",checkbox:!0,checkedOpen:!0,folderBold:!0,idsWithParent:!0,depthOpen:0,openIcon:"fa fa-angle-right",closeIcon:"fa fa-angle-down",halfCheckedIcon:"fa fa-minus-square-o fa-fw",checkedIcon:"fa fa-check-square-o fa-fw",uncheckedIcon:"fa fa-square-o fa-fw"},termOptions:{},idsWithParent:[],state:0}},created:function(){this.initOptions(),this.idsWithParent=this.ids.slice(0)},watch:{options:{handler:function(e){this.initOptions()},deep:!0}},methods:{handle:function(e){this.$emit("handle",e)},initOptions:function(){this.termOptions=a()({},this.defaultOptions,this.options),this.idsWithParent=this.ids.slice(0)}}}),r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",{staticClass:"vue-tree-list"},e._l(e.treeData,function(t,s){return i("tree-item",{key:s,attrs:{ids:e.ids,"ids-with-parent":e.idsWithParent,model:t,options:e.termOptions,depth:0,state:e.state},on:{handle:e.handle}})}))},staticRenderFns:[]},c=i("VU/8")(l,r,!1,null,null,null).exports,u={data:function(){return{tableHeight:window.innerHeight-220,dialogVisible:!1,unitData:{},keyword:"",tableData:[],currentPage:1,pageSize:15,records:0,checkIds:[],checkedIds:[],openIds:[],defaultProps:{children:"children",label:"title"},treeDataSource:[]}},mounted:function(){},methods:{handleCommit:function(){var e=this,t=this.$refs.tree.getCheckedKeys(),i=this.$refs.tree.getHalfCheckedKeys().concat(t);this.$post(this.API.addUserDept,{userId:this.curUser.userid,deptIds:i.join(",")}).then(function(t){"success"==t.state?(e.$message({message:"保存成功",type:"success"}),e.dialogVisible=!1):e.$message({message:t.msg,type:"error"})})},handleEditDept:function(e){this.curUser=e,this.openIds=[],this.checkedIds=[],this.userDeptChecked(),this.treeDept(),this.dialogVisible=!0},filterTree:function(e){var t=this;e.forEach(function(e,i,s){e.children&&e.children.length&&(e.isExpand&&!t.checkIds.length&&t.openIds.push(e.id),t.checkIds.forEach(function(i,s,n){i==e.id&&(t.openIds.push(e.id),t.checkIds.splice(s,1),t.checkedIds=t.checkIds)}),t.filterTree(e.children))})},handleSearch:function(){this.currentPage=1,this.getSchoolUsers()},handleChangeUnit:function(e){this.unitData=e,this.currentPage=1,this.getSchoolUsers()},handleCurrentChange:function(e){this.currentPage=e,this.getSchoolUsers()},getSchoolUsers:function(){var e=this;this.$get(this.API.getUsers,{curPage:this.currentPage,pageSize:this.pageSize,dwbh:this.unitData.dwbh,unitType:1,keyword:this.keyword}).then(function(t){"success"==t.state?(t.data.rows?e.tableData=t.data.rows:e.tableData=[],e.records=t.data.records):e.$message({message:t.msg,type:"error"})})},treeDept:function(){var e=this;this.$get(this.API.treeDeptWithUnit,{dwbh:this.unitData.dwbh,dwmc:this.unitData.dwmc,zts:"1,3"}).then(function(t){"success"==t.state&&(e.treeDataSource=t.data,e.filterTree(e.treeDataSource))})},userDeptChecked:function(){var e=this;this.$get(this.API.userDeptChecked,{userId:this.curUser.userid}).then(function(t){"success"==t.state?e.checkIds=t.data?t.data:[]:e.$message({message:t.msg,type:"error"})})}},components:{chooseSchool:s.a,VueTree:c}},f={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"fwsxtj-pannel"},[i("div",{staticClass:"pannelPaddingBg-10"},[i("div",{staticClass:"mg-12"},[i("chooseSchool",{on:{handleChangeUnit:e.handleChangeUnit}})],1),e._v(" "),i("div",[i("div",{staticClass:"mg-12"},[i("el-input",{staticStyle:{width:"365px"},attrs:{size:"mini",placeholder:"请输入用户姓名查询"},on:{change:e.handleSearch},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),e._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"","max-height":e.tableHeight}},[i("el-table-column",{attrs:{prop:"username",label:"姓名"}}),e._v(" "),i("el-table-column",{attrs:{prop:"dept",label:"部门"}}),e._v(" "),i("el-table-column",{attrs:{prop:"email",label:"邮箱"}}),e._v(" "),i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(i){e.handleEditDept(t.row)}}},[e._v("编辑")])]}}])})],1),e._v(" "),i("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pageSize,layout:"total, prev, pager, next",total:e.records},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)]),e._v(" "),i("el-dialog",{attrs:{title:"部门维护",visible:e.dialogVisible,width:"800px"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("div",{staticClass:"pd-10"},[i("el-tree",{ref:"tree",attrs:{data:e.treeDataSource,"show-checkbox":"","node-key":"id",props:e.defaultProps,"default-expanded-keys":e.openIds,"default-checked-keys":e.checkedIds}}),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer","text-right":""},slot:"footer"},[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:e.handleCommit}},[e._v("确 定")]),e._v(" "),i("el-button",{attrs:{size:"mini"},on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")])],1)],1)])],1)},staticRenderFns:[]};var p=i("VU/8")(u,f,!1,function(e){i("hcWy")},null,null);t.default=p.exports}});
//# sourceMappingURL=71.54f00b34d876f6528110.js.map