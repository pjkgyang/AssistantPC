webpackJsonp([27],{ACha:function(t,a){},D2Cl:function(t,a){},ItkK:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("3cXf"),b=e.n(s),r={data:function(){return{}},props:{htnrData:{type:Array,default:function(){return[]}},show:{type:Boolean,default:!0},fbnrData:{type:Array,default:function(){return[]}},allfbData:{type:Array,default:function(){return[]}}}},v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[t.show?e("div",[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.htnrData,border:"","max-height":"400"}},[e("el-table-column",{attrs:{prop:"ywx",label:"业务线",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"app",label:"合同内容","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"zb",label:"占比(%)",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"sm",label:"说明",width:"150","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"rjcpmc",label:"二级产品名称",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"ssry",label:"实施人月",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"kfry",label:"二开人月",width:"120"}})],1)],1):t._e(),t._v(" "),t.show?t._e():e("div",[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.fbnrData,border:"","max-height":"400"}},[e("el-table-column",{attrs:{prop:"cpxmc",label:"产品线名称",width:"300"}}),t._v(" "),e("el-table-column",{attrs:{prop:"cp",label:"产品"}}),t._v(" "),e("el-table-column",{attrs:{prop:"wglv",label:"完工率(%)",width:"120"}}),t._v(" "),e("el-table-column",{attrs:{prop:"wgl",label:"完工量(元)",width:"120"}})],1)],1)])},staticRenderFns:[]};var i=e("Z0/y")(r,v,!1,function(t){e("D2Cl")},"data-v-6896fbd2",null).exports,_=e("TSLv"),l=e("oFuF"),n={data:function(){return{dialogTableVisible:!1,tbly:"",xmbh:"",fbData:"",htjbxx:{},htnrData:[],tbfyData:[],istb:"",tbzt:"",fbxxData:{},fbcpData:[],tbje:null,zbxx:""}},mounted:function(){var t=this;l.a.$on("hoshRouter",function(a){t.$router.push({name:"DataTab"})})},methods:{handleToubiao:function(){var t=this;Object(_.a)({fbbh:this.fbData.fbbh}).then(function(a){var e=a.data;"success"==e.state?t.tbfyData=e.data:t.$message.error(e.msg)}),this.dialogTableVisible=!this.dialogTableVisible},handleCommit:function(){var t=this;this.tbje=null,this.tbfyData.forEach(function(a,e,s){t.tbje+=parseFloat(a.je)}),0==this.tbje||isNaN(this.tbje)?this.$alert("投标总金额不能为0","提示",{confirmButtonText:"确定",type:"error"}):Object(_.e)({fbbh:this.fbData.fbbh,tbfy:b()(this.tbfyData),tbly:this.tbly}).then(function(a){"success"==a.data.state&&t.$alert("投标成功","提示",{confirmButtonText:"确定",type:"success",callback:function(a){t.istb=!0,t.dialogTableVisible=!t.dialogTableVisible}})})}},activated:function(){var t=this;void 0==this.$route.params.data?this.fbData=JSON.parse(sessionStorage.getItem("fbData")):(sessionStorage.setItem("fbData",b()(this.$route.params.data)),this.fbData=this.$route.params.data||this.fbData),Object(_.c)({xmbh:this.fbData.xmbh,fbbh:this.fbData.fbbh}).then(function(a){var e=a.data;"success"==e.state?(t.htjbxx=e.data.lxxx,t.htnrData=e.data.htnr,t.istb=e.data.istb,t.tbzt=e.data.tbzt,t.tbzt&&t.istb?(t.tbly=e.data.tbxx[0].tbly,t.tbfyData=e.data.tbfy):t.tbzt||void 0!=t.istb||(t.zbxx=e.data.zbxx)):t.$message({message:e.msg,type:"error"})}),Object(_.b)({fbbh:this.fbData.fbbh}).then(function(a){var e=a.data;if("success"==e.state){t.fbxxData=e.data.fbxx;var s=e.data.fbcp;s.forEach(function(t,a,e){e[a].wglv=Object(l.p)(t.wglv),e[a].wgl=Object(l.p)(t.wgl)}),t.fbcpData=s}else t.$message({message:e.msg,type:"error"})})},components:{htnrTable:i}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"fbdetail_container"},[e("div",{staticClass:"fb_name"},[e("div",[e("p",{staticClass:"project__name"},[t._v("\r\n                        "+t._s(t.fbData.fbbh)+" "+t._s(t.fbData.fbmc)+"\r\n                         "),t._v(" "),e("span",{class:{"card-state":!0,"card-state-zbz":"01"==this.fbData.tbzt,"card-state-close":"02"==this.fbData.tbzt}},[t._v("\r\n                             "+t._s("01"==t.fbData.tbzt?"投标中":"招标结束")+"\r\n                         ")])]),t._v(" "),e("p",{staticClass:"project__label"},[t._v("￥"+t._s(t.fbData.zfy))])]),t._v(" "),e("div",{staticClass:"project__extra"},[e("b",[t._v("已有"+t._s(t.fbData.tbrs)+"人投标")]),t._v(" "),e("p",[t._v("招标截止 "+t._s(t.fbData.zbjzrq))]),t._v(" "),0==t.istb&&"01"==this.fbData.tbzt?e("a",{attrs:{href:"javaScript:;;"},on:{click:t.handleToubiao}},[t._v("我要投标")]):t._e(),t._v(" "),0!=t.istb&&"01"==this.fbData.tbzt?e("span",{staticStyle:{"font-size":"16px",background:"#71C671",padding:"3px 5px","border-radius":"4px"}},[t._v("\r\n                        已投标\r\n                     ")]):t._e()])]),t._v(" "),e("div",{staticClass:"fb_info"},[e("div",[e("h4",[t._v("合同内容")]),t._v(" "),e("div",[e("h6",[t._v("合同基本信息")]),t._v(" "),e("table",[e("tr",[e("th",[t._v("合同金额(元)")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.htje))]),t._v(" "),e("th",[t._v("合同毛收入(元)")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.htmsr))]),t._v(" "),e("th",[t._v("合同签订日期")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.qdrq))])]),t._v(" "),e("tr",[e("th",[t._v("生效日期")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.sxrq))]),t._v(" "),e("th",[t._v("立项日期")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.lxrq))]),t._v(" "),e("th",[t._v("合同服务开始时间")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.fwksrq?t.htjbxx.fwksrq:"无"))])]),t._v(" "),e("tr",[e("th",[t._v("服务期限(月)")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.fwqx?t.htjbxx.fwqx:"无"))]),t._v(" "),e("th",[t._v("客户经理")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.khjl?t.htjbxx.khjl:"无"))]),t._v(" "),e("th",[t._v("项目经理")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.xmjl?t.htjbxx.xmjl:"无"))])]),t._v(" "),e("tr",[e("th",[t._v("项目性质")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.xmxz))]),t._v(" "),e("th",[t._v("项目类别")]),t._v(" "),e("td",[t._v(t._s(t.htjbxx.xmlb))])])])]),t._v(" "),e("div",[e("h6",[t._v("合同内容")]),t._v(" "),e("htnrTable",{attrs:{htnrData:t.htnrData}})],1)]),t._v(" "),e("div",[e("div",[e("h4",[t._v("分包信息")]),t._v(" "),e("div",[e("h6",[t._v("分包基本信息")]),t._v(" "),e("table",[e("tr",[e("th",[t._v("合同编号")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.htbh))]),t._v(" "),e("th",[t._v("分包名称")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.fbmc))]),t._v(" "),e("th",[t._v("分包人姓名")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.fbrxm))])]),t._v(" "),e("tr",[e("th",[t._v("分包日期")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.fbrq))]),t._v(" "),e("th",[t._v("分包性质")]),t._v(" "),e("td",[t._v(t._s("01"==t.fbxxData.fbxz?"在建":"02"==t.fbxxData.fbxz?"售后服务":"过保"))]),t._v(" "),e("th",[t._v("自助打印")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.zzdy))])]),t._v(" "),e("tr",[e("th",[t._v("计划开始日期")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.jhksrq))]),t._v(" "),e("th",[t._v("计划结束日期")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.jhjsrq))]),t._v(" "),e("th",[t._v("招标截止日期")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.zbjzrq))])]),t._v(" "),e("tr",[e("th",[t._v("实施费用 (元)")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.ssfy))]),t._v(" "),e("th",[t._v("二开费用 (元)")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.ekfy))]),t._v(" "),e("th",[t._v("可变费用 (元)")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.kbfy))])]),t._v(" "),e("tr",[e("th",[t._v("分包说明")]),t._v(" "),e("td",{attrs:{colspan:"5"}},[t._v(t._s(t.fbxxData.fbsm))])]),t._v(" "),e("tr",[e("th",[t._v("审核人编号")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.shrbh))]),t._v(" "),e("th",[t._v("审核人姓名")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.shrmc))]),t._v(" "),e("th",[t._v("审核日期")]),t._v(" "),e("td",[t._v(t._s(t.fbxxData.shrq))])]),t._v(" "),e("tr",[e("th",[t._v("审核意见")]),t._v(" "),e("td",{attrs:{colspan:"5"}},[t._v(t._s(t.fbxxData.shyj?t.fbxxData.shyj:"无"))])])])]),t._v(" "),e("div",[e("h6",[t._v("分包内容")]),t._v(" "),e("htnrTable",{attrs:{show:!1,fbnrData:t.fbcpData}})],1),t._v(" "),e("div",[t.tbzt||void 0!=t.istb?t._e():e("div",[e("h6",[t._v("投标费用:")]),t._v(" "),e("div",[e("span",{staticStyle:{"font-size":"14px"}},[t._v("投标理由:")]),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.zbxx.tbly,expression:"zbxx.tbly"}],staticStyle:{margin:"5px 0 10px",width:"100%",height:"50px","border-radius":"5px",resize:"none",outline:"none"},attrs:{readonly:""},domProps:{value:t.zbxx.tbly},on:{input:function(a){a.target.composing||t.$set(t.zbxx,"tbly",a.target.value)}}})]),t._v(" "),e("table",{staticClass:"tb-table tbfy_table",attrs:{border:"",width:"100%"}},[t._m(0),t._v(" "),e("tr",[e("td",[t._v("实施费用")]),e("td",[t._v(t._s(t.zbxx.ssfy))])]),t._v(" "),e("tr",[e("td",[t._v("二开费用")]),e("td",[t._v(t._s(t.zbxx.ekfy))])]),t._v(" "),e("tr",[e("td",[t._v("可变费用")]),e("td",[t._v(t._s(t.zbxx.kbfy))])]),t._v(" "),e("tr",[e("td",[t._v("总费用")]),e("td",[t._v(t._s(t.zbxx.zfy))])])])]),t._v(" "),t.tbzt&&t.istb?e("div",[e("h6",[t._v("投标费用:")]),t._v(" "),e("div",[e("span",{staticStyle:{"font-size":"14px"}},[t._v("投标理由:")]),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.tbly,expression:"tbly"}],staticStyle:{margin:"5px 0 10px",width:"100%",height:"50px","border-radius":"5px",resize:"none",outline:"none"},attrs:{readonly:""},domProps:{value:t.tbly},on:{input:function(a){a.target.composing||(t.tbly=a.target.value)}}})]),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tbfyData,border:"","max-height":"400"}},[e("el-table-column",{attrs:{prop:"mbkmmc",label:"科目名称"}}),t._v(" "),e("el-table-column",{attrs:{prop:"je",label:"金额(元)"}})],1)],1):t._e()])])])]),t._v(" "),e("el-dialog",{attrs:{title:"投标",visible:t.dialogTableVisible,"close-on-click-modal":!1},on:{"update:visible":function(a){t.dialogTableVisible=a}}},[e("div",{staticStyle:{padding:"0 20px"}},[e("div",{staticStyle:{margin:"10px 0",position:"relative"}},[e("span",[t._v("投标理由：")]),t._v(" "),e("el-input",{attrs:{type:"textarea",maxlength:"200",resize:"none",rows:"4"},model:{value:t.tbly,callback:function(a){t.tbly=a},expression:"tbly"}}),t._v(" "),e("span",{staticStyle:{position:"absolute",bottom:"0",right:"10px","font-size":"12px"}},[e("span",{class:{"max-length":t.tbly.length>=200}},[t._v("( "+t._s(t.tbly.length))]),t._v(" / 200 )")])],1),t._v(" "),e("table",{staticClass:"tb-table",attrs:{border:"",width:"100%"}},[e("tr",[e("th",[t._v("科目名称")]),t._v(" "),e("th",[t._v("金额（元）")])]),t._v(" "),t._l(t.tbfyData,function(a,s){return e("tr",{key:s},[e("td",[t._v(t._s(a.mbkmmc))]),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:a.je,expression:"tbfy.je"}],attrs:{type:"text"},domProps:{value:a.je},on:{input:function(e){e.target.composing||t.$set(a,"je",e.target.value)}}})])])})],2)]),t._v(" "),e("div",{staticStyle:{margin:"10px 0","text-align":"right",background:"#eee",padding:"10px 20px"}},[e("button",{staticClass:"tbcommit",on:{click:t.handleCommit}},[t._v("提交")])])])],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("tr",[a("th",[this._v("科目名称")]),this._v(" "),a("th",[this._v("金额（元）")])])}]};var h=e("Z0/y")(n,o,!1,function(t){e("ACha")},"data-v-1d6f099e",null);a.default=h.exports},TSLv:function(t,a,e){"use strict";a.d=function(t){var a=window.baseurl+i+"queryTbxx.do";return b.a.get(a,{params:{curPage:t.curPage,pageSize:t.pageSize,keyword:t.keyword||"",gczd:t.gczd||"",zbzt:t.zbzt||"",fbxz:t.fbxz||"",zzdy:t.zzdy||"",sfgx:t.sfgx||""}})},a.c=function(t){var a=window.baseurl+i+"queryHtxx.do";return b.a.get(a,{params:{xmbh:t.xmbh,fbbh:t.fbbh}})},a.b=function(t){var a=window.baseurl+i+"queryFbxx.do";return b.a.get(a,{params:{fbbh:t.fbbh}})},a.a=function(t){var a=window.baseurl+i+"launchTb.do";return b.a.get(a,{params:{fbbh:t.fbbh}})},a.e=function(t){var a=window.baseurl+i+"saveTbxx.do";return b.a.post(a,{fbbh:t.fbbh,tbfy:t.tbfy,tbly:t.tbly||""},{transformRequest:[function(t){return t=v.a.stringify(t)}]})};var s=e("aozt"),b=e.n(s),r=e("DEjr"),v=e.n(r),i="tbxx/"}});
//# sourceMappingURL=27.fbaf745f477ba626c088.js.map