webpackJsonp([44],{"31R5":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("ZuM3"),a={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"complain-list"},[e("div",{staticStyle:{hieght:"80%"}},[e("div",{staticClass:"complain-query"},[e("p",{staticStyle:{"font-size":"14px !important","margin-bottom":"10px  !important"}},[t._v("\n        　 \n        "),e("span",{class:{"isshown-query":!0,"el-icon-arrow-up":!t.queryLJshow,"el-icon-arrow-down":t.queryLJshow},on:{click:t.handleQueryShow}}),t._v(" \n        "),e("span",{staticStyle:{"font-weight":"700"}},[t._v("高级查询")]),t._v("  \n        "),e("el-input",{staticStyle:{width:"300px"},attrs:{size:"mini",placeholder:"请输入投诉人工号/手机号/项目编号/项目名称"},on:{change:t.searchComplant},model:{value:t.keyword,callback:function(i){t.keyword=i},expression:"keyword"}}),t._v("　\n        "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.handlequeryComplant}},[t._v("查询")])],1),t._v(" "),t.queryLJshow?e("div",[e("div",{attrs:{flex:"",colcenter:""}},[e("span",{staticClass:"query-title"},[t._v("查询状态:")]),t._v(" "),e("p",{staticClass:"query-list"},[e("span",{class:{"bg-active":""==t.cxzt},attrs:{"data-type":""},on:{click:t.handleCXZT}},[t._v("全部")]),t._v(" "),e("span",{class:{"bg-active":"1"==t.cxzt},attrs:{"data-type":"1"},on:{click:t.handleCXZT}},[t._v("未处理")]),t._v(" "),e("span",{class:{"bg-active":"2"==t.cxzt},attrs:{"data-type":"2"},on:{click:t.handleCXZT}},[t._v("处理中")]),t._v(" "),e("span",{class:{"bg-active":"3"==t.cxzt},attrs:{"data-type":"3"},on:{click:t.handleCXZT}},[t._v("已关闭")])])]),t._v(" "),e("div",{attrs:{flex:"",colcenter:""}},[e("span",{staticClass:"query-title"},[t._v("是否催办:")]),t._v(" "),e("p",{staticClass:"query-list"},[e("span",{class:{"bg-active":""==t.sfcb},attrs:{"data-type":""},on:{click:t.handleSFCB}},[t._v("全部")]),t._v(" "),e("span",{class:{"bg-active":"1"==t.sfcb},attrs:{"data-type":"1"},on:{click:t.handleSFCB}},[t._v("是")]),t._v(" "),e("span",{class:{"bg-active":"0"==t.sfcb},attrs:{"data-type":"0"},on:{click:t.handleSFCB}},[t._v("否")])])]),t._v(" "),e("div",{attrs:{flex:"",colcenter:""}},[e("span",{staticClass:"query-title"},[t._v("投诉类别:")]),t._v(" "),e("p",{staticClass:"query-list"},[e("span",{class:{"bg-active":""==t.tslb},attrs:{"data-type":""},on:{click:t.handleTSLB}},[t._v("全部")]),t._v(" "),t._l(t.complaintType,function(i,s){return e("span",{key:s,class:{"bg-active":t.tslb==i.label},attrs:{"data-type":i.label},on:{click:t.handleTSLB}},[t._v(t._s(i.mc))])})],2)]),t._v(" "),2==t.showCondition?e("div",{attrs:{flex:"",colcenter:""}},[e("span",{staticClass:"query-title"},[t._v("区域战队:")]),t._v(" "),e("p",{staticClass:"query-list"},[e("span",{class:{"bg-active":""==t.gczd},attrs:{"data-type":""},on:{click:t.handleGCZD}},[t._v("全部")]),t._v(" "),t._l(t.gczdList,function(i,s){return e("span",{key:s,class:{"bg-active":t.gczd==i.label},attrs:{"data-type":i.label},on:{click:t.handleGCZD}},[t._v(t._s(i.mc))])})],2)]):t._e()]):t._e()]),t._v(" "),e("div",{staticStyle:{background:"#fff","margin-top":"10px","box-shadow":"0 2px 12px 0 rgba(0,0,0,.1)","border-radius":"4px",padding:"10px 0"}},[e("el-button",{staticStyle:{margin:"10px 0 0 10px"},attrs:{type:"danger"},on:{click:t.handleComplain}},[t._v("我要投诉")]),t._v(" "),e("hr",{staticStyle:{"border-top":"1px solid #eee",margin:"8px 0 0 0 !important"}}),t._v(" "),e("ul",[t._l(t.complainList,function(i,s){return e("li",[e("div",{staticClass:"complain-logo"},[1==i.zt||2==i.zt?e("img",{attrs:{src:"static/img/tousu.png",alt:""}}):t._e(),t._v(" "),3==i.zt?e("span",{staticClass:"el-icon-success"}):t._e()]),t._v(" "),e("div",{staticClass:"complain-content"},[e("span",{staticClass:"complain-bt",attrs:{"data-wid":i.wid},on:{click:t.getComplaint}},[e("span",[t._v(t._s(i.tsbt))])]),t._v(" "),e("p",{staticStyle:{color:"#363748","font-size":"12px"}},[t._v(t._s(i.tssj))]),t._v(" "),e("p",{staticStyle:{"white-space":"nowrap"}},[e("span",{staticStyle:{display:"inline-block",width:"50%"}},[e("span",{staticClass:"complain-content-info-front"},[t._v("投诉人单位：")]),t._v(t._s(i.ssdwmc))]),t._v(" "),e("span",{staticStyle:{display:"inline-block",width:"50%"}},[e("span",{staticClass:"complain-content-info-front"},[t._v("投诉人：")]),t._v(t._s(i.tsrxm))])]),t._v(" "),e("p",{staticClass:"complain-content-info"},[e("span",{staticClass:"complain-content-tscp",attrs:{title:i.cpmc}},[e("span",{staticClass:"complain-content-info-front"},[t._v("投诉产品 : ")]),t._v(t._s(i.cpmc))]),t._v(" "),e("span",[e("span",{staticClass:"complain-content-info-front"},[t._v("投诉类别 : ")]),t._v(t._s(i.tslbmc))])]),t._v(" "),e("p",[e("span",{staticStyle:{display:"inline-block",width:"100%",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"},attrs:{title:i.xmmc}},[e("span",{staticClass:"complain-content-info-front"},[t._v("投诉项目 : ")]),t._v(t._s(i.xmmc))])]),t._v(" "),e("p",{staticClass:"complainOprater"},[i.edita?e("span",{staticClass:"el-icon-edit",on:{click:function(i){t.complainEdit(s)}}},[e("span",{staticStyle:{color:"#409EFF"}},[t._v(" 编辑")])]):t._e(),t._v("　\n              "),i.edita?e("span",{staticClass:"el-icon-delete",attrs:{"data-wid":i.wid},on:{click:t.complainDelect}},[e("span",{staticStyle:{color:"#f00"}},[t._v(" 删除")])]):t._e()])]),t._v(" "),e("div",{staticClass:"complain-oprate"},[e("span",{class:{"lx-wcl":1==i.zt,"lx-clz":2==i.zt,"lx-ycl":3==i.zt},staticStyle:{"font-size":"16px",color:"#f00"}},[t._v(t._s(1==i.zt?"未处理":2==i.zt?"处理中":"已关闭"))]),e("br")])])}),t._v(" "),e("div",{staticStyle:{"text-align":"right","padding-top":"10px"}},[t.total>8&&null!=t.total?e("pagination",{attrs:{total:t.total,pageSize:t.pageSize,currentPage:t.currentPage},on:{handleCurrentChange:t.handleCurrentChange}}):t._e()],1),t._v(" "),0==t.complainList.length?e("div",{staticStyle:{"text-align":"center","font-size":"20px","padding-top":"100px"}},[e("img",{attrs:{src:"static/img/empty.png",alt:""}}),t._v(" "),e("p",[t._v("暂无投诉")])]):t._e()],2)],1)]),t._v(" "),e("el-dialog",{attrs:{title:"投诉内容","close-on-click-modal":!1,visible:t.complainVisible,width:"800px"},on:{"update:visible":function(i){t.complainVisible=i}}},[e("div",{staticClass:"complain-cplist",staticStyle:{padding:"10px"}},[e("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px"}},[e("el-form-item",{staticStyle:{"margin-bottom":"15px"},attrs:{label:"投诉类别",required:""}},[e("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择投诉类别",size:"mini"},model:{value:t.form.tslb,callback:function(i){t.$set(t.form,"tslb",i)},expression:"form.tslb"}},t._l(t.complaintType,function(t,i){return e("el-option",{key:t.label,attrs:{label:t.mc,value:t.label}})}))],1),t._v(" "),e("el-form-item",{staticStyle:{"margin-bottom":"15px"},attrs:{label:"项目名称",required:""}},[e("el-input",{attrs:{size:"mini",placeholder:"请选择项目",readonly:""},model:{value:t.form.xmmc,callback:function(i){t.$set(t.form,"xmmc",i)},expression:"form.xmmc"}},[e("el-button",{attrs:{slot:"append",icon:"el-icon-circle-plus"},on:{click:t.addComplaintItem},slot:"append"})],1)],1),t._v(" "),e("el-form-item",{staticStyle:{"margin-bottom":"15px"},attrs:{label:"产品"}},[e("el-select",{ref:"selects",staticStyle:{width:"100%"},attrs:{placeholder:"请选择产品 / 搜索产品名称",size:"mini",filterable:""},on:{change:t.handleChoose},model:{value:t.form.cp,callback:function(i){t.$set(t.form,"cp",i)},expression:"form.cp"}},t._l(t.xmcpList,function(t,i){return e("el-option",{key:i,attrs:{label:t.mc,value:t.mc+"&"+t.label}})}))],1),t._v(" "),e("el-form-item",{staticStyle:{"margin-bottom":"15px"},attrs:{label:"投诉对象"}},[e("el-select",{staticStyle:{width:"100%"},attrs:{multiple:"",placeholder:"请选择投诉对象（可多选）",size:"mini"},model:{value:t.form.object,callback:function(i){t.$set(t.form,"object",i)},expression:"form.object"}},t._l(t.tsdxList,function(t,i){return e("el-option",{key:i,attrs:{label:t.userName,value:t.userName+","+t.userId}})}))],1),t._v(" "),e("el-form-item",{staticStyle:{"margin-bottom":"15px","line-height":"3"},attrs:{label:"标题",required:""}},[e("el-input",{attrs:{placeholder:"请输入投诉标题",size:"mini"},model:{value:t.form.title,callback:function(i){t.$set(t.form,"title",i)},expression:"form.title"}})],1)],1),t._v(" "),e("div",{staticClass:"complain-textarea"},[e("span",[t._v("投诉内容")]),t._v(" "),e("div",{attrs:{id:"summernote"}})]),t._v(" "),e("div",{staticStyle:{width:"100%","text-align":"right"}},[e("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("提交")])],1)],1)]),t._v(" "),e("el-dialog",{attrs:{title:"选择项目","close-on-click-modal":!1,visible:t.dialogComplainVisible,width:"800px",top:"50px","append-to-body":""},on:{"update:visible":function(i){t.dialogComplainVisible=i}}},[e("div",{staticStyle:{padding:"10px"}},[e("itemChoose",{attrs:{sfts:!0},on:{handleEdit:t.handleChooseItem}})],1)])],1)},staticRenderFns:[]};var n=function(t){e("PrBu")},c=e("Z0/y")(s.a,a,!1,n,"data-v-2b42a9dd",null);i.default=c.exports},PrBu:function(t,i){},ZuM3:function(t,i,e){"use strict";(function(t){var s=e("MgeX"),a=e.n(s),n=e("ZLEe"),c=e.n(n),o=e("3cXf"),l=e.n(o),r=e("9A7R"),p=e("o6RA"),m=e("IfOk"),h=e("YkBq"),d=e("nfA5"),u=e("oFuF");i.a={data:function(){return{note:{backgroundImage:"url("+e("SQ3j")+")"},total:null,pageSize:8,currentPage:1,keyword:"",complainVisible:!1,dialogComplainVisible:!1,complainList:[],complain:[],form:{cp:"",cpbh:"",xmbh:"",xmmc:"",tslb:"",title:"",object:[],content:""},wid:"",complainType:null,windowUnitType:"",cxzt:"",sfcb:"",tslb:"",gczd:"",complaintType:[],allfbData:[],tsdxList:[],gczdList:[],cpList:[],xmcpList:[],zdTitle:"指定产品接口人",showCondition:"",queryLJshow:!0}},mounted:function(){var t=this;this.windowUnitType=sessionStorage.getItem("isJZuser"),Object(m.P)().then(function(i){var e=i.data;t.showCondition=e.data}),Object(u.n)("ComplaintType")&&Object(u.n)("kycp")&&Object(u.n)("gczd")?(this.complaintType=Object(u.n)("ComplaintType"),this.cpList=Object(u.n)("kycp"),this.gczdList=Object(u.n)("gczd")):(Object(u.i)("kycp",this.cpList,!0),Object(u.i)("gczd",this.gczdList,!0),Object(u.i)("ComplaintType",this.complaintType))},computed:{},methods:{searchComplant:function(){this.complaintList(1),this.currentPage=1},handlequeryComplant:function(){this.complaintList(1),this.currentPage=1},handleQueryShow:function(){this.queryLJshow=!this.queryLJshow},handleCXZT:function(t){var i=t.target.getAttribute("data-type");this.cxzt=i,this.complaintList(1),this.currentPage=1},handleSFCB:function(t){var i=t.target.getAttribute("data-type");this.sfcb=i,this.complaintList(1),this.currentPage=1},handleTSLB:function(t){var i=t.target.getAttribute("data-type");this.tslb=i,this.complaintList(1),this.currentPage=1},handleGCZD:function(t){var i=t.target.getAttribute("data-type");this.gczd=i,this.complaintList(1),this.currentPage=1},handleChoose:function(t){var i=this;this.$get(this.API.questionLimitProduct,{xmbh:this.form.xmbh,cpbh:t.split("&")[1]}).then(function(e){"success"==e.state&&(e.data||(i.$alert("该项目未采购 "+t.split("&")[0]+" 专项基础环境运维服务,请联系销售采购对应的服务","提示",{confirmButtonText:"确定",type:"warning"}),i.$refs.selects.blur()))})},handleCurrentChange:function(t){this.complaintList(t),this.currentPage=t},complainEdit:function(i){var e=this;this.complainType="edit",this.form.object=[],this.complainVisible=!0,this.$nextTick(function(){t("#summernote").summernote({dialogsInBody:!0,placeholder:"请输入投诉内容",height:200,width:"100%",minHeight:200,maxHeight:200,lang:"zh-CN",focus:!0,toolbar:[["style",["bold","italic","underline","clear"]],["font",["strikethrough","superscript","subscript"]],["fontsize",["fontsize"]],["color",["color"]],["para",["ul","ol","paragraph"]],["height",["height"]],["picture"],["link",["linkDialogShow","unlink"]]]}),t("#summernote").summernote("code",e.complainList[i].tsnr)}),Object(h.s)({xmbh:this.complainList[i].xmbh}).then(function(t){var i=t.data;"success"==i.state&&(e.tsdxList=i.data,e.tsdxList.forEach(function(t,i,s){t.userId&&t.userName||e.tsdxList.splice(i,1)}))}),this.wid=this.complainList[i].wid,this.form.title=this.complainList[i].tsbt,this.form.cp=this.complainList[i].cpmc,this.form.cpbh=this.complainList[i].cpdm,this.form.xmbh=this.complainList[i].xmbh,this.form.xmmc=this.complainList[i].xmmc,this.form.content=this.complainList[i].content,this.form.tslb=this.complainList[i].tslb,null!=this.complainList[i].ryTsData&&this.complainList[i].ryTsData.forEach(function(t,i,s){e.form.object.push(t.yhxm+","+t.yhbh)})},handleChooseItem:function(t){var i=this;this.form.xmmc=t.xmmc,this.form.xmbh=t.xmbh,this.form.cp="",this.form.cpbh="",this.form.object=[],this.queryResponsibleProduct(t.xmbh,t),Object(h.s)({xmbh:t.xmbh}).then(function(t){var e=t.data;"success"==e.state&&(i.tsdxList=e.data,i.tsdxList.forEach(function(t,e,s){t.userId&&t.userName||i.tsdxList.splice(e,1)}))}),this.dialogComplainVisible=!1},addComplaintItem:function(){this.dialogComplainVisible=!0},queryResponsibleProduct:function(t,i){var e=this;this.xmcpList=[],Object(m.C)({xmbh:t}).then(function(t){if("success"==t.data.state)if("{}"==l()(t.data.data))e.$alert(" 您选择的项目没有可提问产品，请联系项目经理 ( "+i.yfzrrxm+")添加负责业务。","提示",{confirmButtonText:"确定",type:"warning"});else for(var s=c()(t.data.data),n=a()(t.data.data),o=0;o<s.length;o++)e.xmcpList.push({label:s[o],mc:n[o]})})},complainDelect:function(t){var i=this,e=t.currentTarget.getAttribute("data-wid");this.$confirm("是否删除该投诉?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(p.d)({wid:e}).then(function(t){"success"==t.data.state&&i.$alert("删除成功！","提示",{confirmButtonText:"确定",type:"success",callback:function(t){i.complaintList(1)}})})}).catch(function(){})},getComplaint:function(t){var i=t.currentTarget.getAttribute("data-wid");this.wid=i;var e=this.$router.resolve({name:"complaintDetail",query:{wid:i}});window.open(e.href,"_blank")},handleComplain:function(){this.complainType="complain",this.form.title="",this.form.object=[],t("#summernote").summernote("code",""),this.complainVisible=!0,this.$nextTick(function(){t("#summernote").summernote({dialogsInBody:!0,placeholder:"请输入投诉内容",height:200,width:"100%",minHeight:200,maxHeight:200,lang:"zh-CN",focus:!0,toolbar:[["style",["bold","italic","underline","clear"]],["font",["strikethrough","superscript","subscript"]],["fontsize",["fontsize"]],["color",["color"]],["para",["ul","ol","paragraph"]],["height",["height"]],["picture"],["link",["linkDialogShow","unlink"]]]})})},submitForm:function(){var i=this;this.form.content=t("#summernote").summernote("code"),this.form.tslb?this.form.xmbh?this.form.title?this.form.content&&"<p><br></p>"!=this.form.content?"complain"==this.complainType?Object(p.b)({tslb:this.form.tslb,xmmc:this.form.xmmc,xmbh:this.form.xmbh,cpdm:this.form.cp.split("&")[1],cpmc:this.form.cp.split("&")[0],tsbt:this.form.title,tsnr:this.form.content,tsdxData:this.form.object.join("|")}).then(function(t){"success"==t.data.state?i.$alert("投诉成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){i.complainVisible=!i.complainVisible,i.complaintList(1)}}):i.$alert("提交失败！","提示",{confirmButtonText:"确定",type:"error"})}):"edit"==this.complainType&&Object(p.b)({wid:this.wid,tslb:this.form.tslb,xmmc:this.form.xmmc,xmbh:this.form.xmbh,cpdm:this.form.cp.split("&")[1]||this.form.cpbh,cpmc:this.form.cp.split("&")[0],tsbt:this.form.title,tsnr:this.form.content,tsdxData:this.form.object.join("|"),isedite:!0}).then(function(t){var e=t.data;"success"==e.state?i.$alert("修改成功","提示",{confirmButtonText:"确定",type:"success",callback:function(t){i.complainVisible=!1,i.complaintList(i.currentPage)}}):i.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error",callback:function(t){}})}):this.$alert("请填写投诉内容","提示",{confirmButtonText:"确定",type:"error"}):this.$alert("请填写投诉标题","提示",{confirmButtonText:"确定",type:"error"}):this.$alert("请选择项目","提示",{confirmButtonText:"确定",type:"error"}):this.$alert("请选择投诉类别","提示",{confirmButtonText:"确定",type:"error"})},complaintList:function(t){var i=this;Object(p.c)({curPage:t,pageSize:8,keyword:this.keyword,type:this.tslb,state:this.cxzt,qyzd:this.gczd,cb:this.sfcb}).then(function(t){var e=t.data;"success"==e.state&&(i.complainList=e.data.rows,i.total=e.data.records)})}},watch:{},activated:function(){this.complaintList(1)},components:{pagination:r.a,itemChoose:d.a}}}).call(i,e("L7Pj"))}});
//# sourceMappingURL=44.ad4a476968ad76e22a8a.js.map