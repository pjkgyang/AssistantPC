webpackJsonp([58],{ECOO:function(t,s){},tJkf:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("3cXf"),i=e.n(a),l=e("oFuF"),r={data:function(){return{dialogVisible:!1,title:"",tableData:[],tdywyData:[],jsxx:{},jssqData:{},tdxxData:[],tbje:null,zbxx:"",cdradio:1,wids:[],jsSource:"",url:"",cdfyData:{},jsssfyTotal:0}},mounted:function(){this.queryJsxq()},methods:{handleSettleBcjsfy:function(t){"0"==t&&Number(this.jsxx.sjssfy)>Number(this.jsxx.zbssfy)&&(this.$message({message:"中标实施费用必须 大于 本次结算实施费用 ",type:"warning"}),this.jsxx.sjssfy=0),"1"==t&&Number(this.jsxx.sjekfy)>Number(this.jsxx.zbekfy)&&(this.$message({message:"中标二开费用必须 大于 本次结算二开费用",type:"warning"}),this.jsxx.sjekfy=0),"2"==t&&Number(this.jsxx.sjkbfy)>Number(this.jsxx.zbkbfy)&&(this.$message({message:"中标可变费用必须 大于 本次结算可变费用 ",type:"warning"}),this.jsxx.sjkbfy=0),this.jsxx.jsje=Number(this.jsxx.sjssfy)+Number(this.jsxx.sjekfy)+Number(this.jsxx.sjkbfy)+Number(this.jsxx.jlje)-Number(this.jsxx.cfje),this.jsxx.jsje=this.jsxx.jsje<0?0:this.jsxx.jsje},handleInputfy:function(t){switch(t){case"0":this.jsxx.sjssfy=Number(this.jsxx.zbssfy)-Number(this.jsxx.yjsssfy)-Number(this.jsxx.ylssfy)-Number(this.jsxx.rlssfy?this.jsxx.rlssfy:0),this.jsxx.sjssfy=this.jsxx.sjssfy<0?0:this.jsxx.sjssfy;break;case"1":this.jsxx.sjekfy=Number(this.jsxx.zbekfy)-Number(this.jsxx.yjsekfy)-Number(this.jsxx.ylekfy)-Number(this.jsxx.rlekfy?this.jsxx.rlekfy:0),this.jsxx.sjekfy=this.jsxx.sjekfy<0?0:this.jsxx.sjekfy;break;case"2":this.jsxx.sjkbfy=Number(this.jsxx.zbkbfy)-Number(this.jsxx.yjskbfy)-Number(this.jsxx.ylkbfy)-Number(this.jsxx.rlkbfy?this.jsxx.rlkbfy:0),this.jsxx.sjkbfy=this.jsxx.sjkbfy<0?0:this.jsxx.sjkbfy}this.jsxx.jsje=Number(this.jsxx.sjssfy)+Number(this.jsxx.sjekfy)+Number(this.jsxx.sjkbfy)+Number(this.jsxx.jlje)-Number(this.jsxx.cfje),this.jsxx.jsje=this.jsxx.jsje<0?0:this.jsxx.jsje},handleSave:function(){var t=this,s=[],e=0,a=0,r="";this.tdxxData.forEach(function(i){s.push({fbbh:t.jssqData.fbbh,lcbbh:t.jssqData.lcbbh,lcbmc:t.jssqData.lcbmc,cpmc:i.cpmc,tdwid:i.tdwid,cybh:i.cybh,cymc:i.cymc,jsssfy:i.jsssfy,jsekfy:i.jsekfy,jskbfy:i.jskbfy,jsje:i.jsje}),e+=i.jsekfy?Number(i.jsekfy):0,a+=i.jskbfy?Number(i.jskbfy):0}),this.$message.close(),this.jsxx.sjssfy<this.jsssfyTotal&&(r+="分包实施结算费用必须大于等于团队实施结算费用！，"),5400*this.jsxx.sjekfy/8800<e&&(r+="分包二开结算费用必须大于等于团队二开结算费用！，"),.7*this.jsxx.sjkbfy<a&&(r+="分包可变结算费用必须大于等于团队可变结算费用！，"),r?this.$alert('<strong style="color:#f00">'+r+"</strong>","提示",{dangerouslyUseHTMLString:!0}):this.$post(this.API.saveJsFeeData,{wid:this.jsxx.wid?this.jsxx.wid:"",fbbh:this.jssqData.fbbh,lcbbh:this.jssqData.lcbbh,lcbmc:this.jssqData.lcbmc,jlje:this.jsxx.jlje?this.jsxx.jlje:0,cfje:this.jsxx.cfje?this.jsxx.cfje:0,jsje:this.jsxx.jsje,sm:Object(l.r)(this.jsxx.sm),jlsm:Object(l.r)(this.jsxx.jlsm),ylssfy:this.jsxx.ylssfy,ylekfy:this.jsxx.ylekfy,ylkbfy:this.jsxx.ylkbfy,rlssfy:this.jsxx.rlssfy,rlekfy:this.jsxx.rlekfy,rlkbfy:this.jsxx.rlkbfy,sjssfy:this.jsxx.sjssfy,sjekfy:this.jsxx.sjekfy,sjkbfy:this.jsxx.sjkbfy,teamFeeList:i()(s)}).then(function(s){"success"==s.state?t.$message({message:"保存成功",type:"success"}):t.$message({message:s.msg,type:"error"})})},handleSelectionChange:function(t){var s=this;t.forEach(function(t){s.wids.push(t.wid)})},handleMultipleSet:function(){var t=this;this.$post(this.API.batchSetJsFySource,{wids:this.wids.join(","),jssqwid:this.jssqData.wid,cdlx:this.cdradio,jsFySource:this.jsSource}).then(function(s){"success"==s.state?(t.$message({message:"保存成功",type:"success"}),t.querySettleMoney(t.jsSource)):t.$message({message:s.msg,type:"error"})})},handleSettleMoney:function(t){switch(this.jsSource=t,t){case"0":this.title="本次结算实施费用",this.url=this.API.querySsfy;break;case"1":this.title="本次结算二开费用",this.url=this.API.queryEkfy;break;case"2":this.title="本次结算可变费用",this.url=this.API.queryBxfy}this.querySettleMoney(t),this.dialogVisible=!this.dialogVisible},querySettleMoney:function(t){var s=this;this.$get(this.url,{xmbh:this.jsxx.xmbh,jssqwid:this.jssqData.wid}).then(function(e){"success"==e.state?(s.cdfyData=e.data,s.tableData=e.data.tableData?e.data.tableData:[],"0"==t?s.jsxx.rlssfy=s.cdfyData.fbcd?s.cdfyData.fbcd:0:"1"==t?s.jsxx.rlekfy=s.cdfyData.fbcd?s.cdfyData.fbcd:0:s.jsxx.rlkbfy=s.cdfyData.fbcd?s.cdfyData.fbcd:0,s.handleInputfy(t)):s.$message({message:e.msg,type:"error"})})},handleChangeInput:function(t,s){var e=this;this.jsssfyTotal=0;var a=0,i=0;this.jsxx.yjszfy=0,this.tdxxData[t].jsje=Number(this.tdxxData[t].jsssfy)+Number(this.tdxxData[t].jsekfy)+Number(this.tdxxData[t].jskbfy),this.tdxxData.forEach(function(t){e.jsssfyTotal+=t.jsssfy?Number(t.jsssfy):0,a+=t.jsekfy?Number(t.jsekfy):0,i+=t.jskbfy?Number(t.jskbfy):0,e.jsxx.yjszfy+=Number(t.jsje)}),this.tdywyData.forEach(function(t,s,l){e.tdywyData[s].jsssfy=e.tdywyData[s].jsekfy=e.tdywyData[s].jskbfy=e.tdywyData[s].jsje=0,e.tdxxData.forEach(function(a,i,l){t.cybh==a.cybh&&(e.tdywyData[s].jsssfy+=Number(a.jsssfy),e.tdywyData[s].jsekfy+=Number(a.jsekfy),e.tdywyData[s].jskbfy+=Number(a.jskbfy),e.tdywyData[s].jsje+=Number(e.tdxxData[i].jsje))}),"合计"==t.cybh&&(e.tdywyData[s].jsssfy=e.jsssfyTotal,e.tdywyData[s].jsekfy=a,e.tdywyData[s].jskbfy=i,e.tdywyData[s].jsje+=e.jsssfyTotal+a+i)})},queryJsxq:function(){var t=this;this.$get(this.API.queryJsxq,{jssqwid:this.$route.query.wid,fbbh:this.$route.query.fbbh}).then(function(s){"success"==s.state&&(t.jssqData=s.data.jssqData,t.tdxxData=s.data.jstdData?s.data.jstdData:[],t.tdywyData=s.data.jstdYwyData?s.data.jstdYwyData:[],t.jsxx=s.data.jsxx,t.jsxx.ylssfy=t.jsxx.ylssfy?t.jsxx.ylssfy:0,t.jsxx.ylekfy=t.jsxx.ylekfy?t.jsxx.ylekfy:0,t.jsxx.ylkbfy=t.jsxx.ylkbfy?t.jsxx.ylkbfy:0,t.tdxxData.forEach(function(s){t.jsssfyTotal+=s.jsssfy?Number(s.jsssfy):0}))})}},activated:function(){},components:{}},j={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("div",{staticClass:"jsdetail_container"},[e("div",{staticClass:"fb_info"},[e("div",[e("h4",[t._v("项目结算详情")]),t._v(" "),"02"==t.jssqData.jszt||"01"==t.jssqData.jszt?e("div",{attrs:{"text-right":""}},[e("el-button",{attrs:{size:"small",type:"danger"},on:{click:t.handleSave}},[t._v("保存")])],1):t._e(),t._v(" "),e("div",[e("h5",[t._v("历史结算信息")]),t._v(" "),e("table",[e("tr",[e("th",[t._v("分包结算次数")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.jscs))]),t._v(" "),e("th",[t._v("中标总金额（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.zbzfy))]),t._v(" "),e("th",[t._v("已结算金额（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.yjszfy))])]),t._v(" "),e("tr",[e("th",[t._v("剩余结算金额（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.syjsje))]),t._v(" "),e("th",[t._v("团队结算金额（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.yjstdfy))])])])]),t._v(" "),e("div",[e("h5",[t._v("结算申请信息")]),t._v(" "),e("table",[e("tr",[e("th",[t._v("项目名称")]),t._v(" "),e("td",{attrs:{colspan:"5"}},[t._v(t._s(t.jsxx.xmmc))])]),t._v(" "),e("tr",[e("th",[t._v("分包名称")]),t._v(" "),e("td",{attrs:{colspan:"5"}},[t._v(t._s(t.jsxx.fbmc))])]),t._v(" "),e("tr",[e("th",[t._v("中标人")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.zbrmc))]),t._v(" "),e("th",[t._v("申请人")]),t._v(" "),e("td",[t._v(t._s(t.jssqData.jsrmc))]),t._v(" "),e("th",[t._v("申请时间")]),t._v(" "),e("td",[t._v(t._s(t.jssqData.jsrq))])]),t._v(" "),e("tr",[e("th",[t._v("实际开始日期")]),t._v(" "),e("td",[t._v(t._s(t.jssqData.sjkssj))]),t._v(" "),e("th",[t._v("实际结束日期")]),t._v(" "),e("td",[t._v(t._s(t.jssqData.sjjssj))]),t._v(" "),e("th",[t._v("结算点")]),t._v(" "),e("td",[t._v(t._s(t.jssqData.lcbmc))])]),t._v(" "),e("tr",[e("th",[t._v("申请说明")]),t._v(" "),e("td",{attrs:{colspan:"5",height:"80px"}},[t._v(t._s(t.jssqData.sm))])])])]),t._v(" "),e("div",[e("h5",[t._v("本次结算信息")]),t._v(" "),e("table",[e("tr",[e("th",[t._v("本次结算总金额（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.jsje?t.jsxx.jsje:0))]),t._v(" "),e("th",[t._v("本次已结算总金额（元）")]),t._v(" "),e("td",{attrs:{colspan:"3"}},[t._v(t._s(t.jsxx.yjszfy?t.jsxx.yjszfy:0))])]),t._v(" "),e("tr",[e("th",[t._v("中标实施费用（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.zbssfy))]),t._v(" "),e("th",[t._v("中标二开费用（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.zbekfy))]),t._v(" "),e("th",[t._v("中标可变费用（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.zbkbfy))])]),t._v(" "),e("tr",[e("th",[t._v("已结算实施费用（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.yjsssfy))]),t._v(" "),e("th",[t._v("已结算二开费用（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.yjsekfy))]),t._v(" "),e("th",[t._v("已结算可变费用（元）")]),t._v(" "),e("td",[t._v(t._s(t.jsxx.yjskbfy))])]),t._v(" "),e("tr",[e("th",[t._v("预留实施费用（元）")]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.ylssfy,expression:"jsxx.ylssfy"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.ylssfy},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"ylssfy",s.target.value)},function(s){t.handleInputfy("0")}]}})]),t._v(" "),e("th",[t._v("预留二开费用（元）")]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.ylekfy,expression:"jsxx.ylekfy"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.ylekfy},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"ylekfy",s.target.value)},function(s){t.handleInputfy("1")}]}})]),t._v(" "),e("th",[t._v("预留可变费用（元）")]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.ylkbfy,expression:"jsxx.ylkbfy"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.ylkbfy},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"ylkbfy",s.target.value)},function(s){t.handleInputfy("2")}]}})])]),t._v(" "),e("tr",[e("th",[t._v("实施调用费用（元）")]),t._v(" "),e("td",{staticStyle:{border:"none !important"},attrs:{colcenter:"",spacebetween:""}},[e("span",[t._v(t._s(t.jsxx.rlssfy?t.jsxx.rlssfy:0))]),e("i",{staticClass:"el-icon-edit-outline",attrs:{title:"设置费用"},on:{click:function(s){t.handleSettleMoney("0")}}})]),t._v(" "),e("th",[t._v("二开调用费用（元）")]),t._v(" "),e("td",{staticStyle:{border:"none !important"},attrs:{colcenter:"",spacebetween:""}},[e("span",[t._v(t._s(t.jsxx.rlekfy?t.jsxx.rlekfy:0))]),e("i",{staticClass:"el-icon-edit-outline",attrs:{title:"设置费用"},on:{click:function(s){t.handleSettleMoney("1")}}})]),t._v(" "),e("th",[t._v("可变报销费用（元）")]),t._v(" "),e("td",{staticStyle:{border:"none !important"},attrs:{colcenter:"",spacebetween:""}},[e("span",[t._v(t._s(t.jsxx.rlkbfy?t.jsxx.rlkbfy:0))]),e("i",{staticClass:"el-icon-edit-outline",attrs:{title:"设置费用"},on:{click:function(s){t.handleSettleMoney("2")}}})])]),t._v(" "),e("tr",[e("th",[t._v("本次结算实施费用（元）")]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.sjssfy,expression:"jsxx.sjssfy"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.sjssfy},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"sjssfy",s.target.value)},function(s){t.handleSettleBcjsfy("0")}]}})]),t._v(" "),e("th",[t._v("本次结算二开费用（元）")]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.sjekfy,expression:"jsxx.sjekfy"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.sjekfy},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"sjekfy",s.target.value)},function(s){t.handleSettleBcjsfy("1")}]}})]),t._v(" "),e("th",[t._v("本次结算可变费用（元）")]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.sjkbfy,expression:"jsxx.sjkbfy"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.sjkbfy},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"sjkbfy",s.target.value)},function(s){t.handleSettleBcjsfy("2")}]}})])]),t._v(" "),e("tr",[e("th",[t._v("预留说明")]),t._v(" "),e("td",{attrs:{colspan:"5"}},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.sm,expression:"jsxx.sm"}],staticStyle:{width:"100%",padding:"5px"},attrs:{placeholder:"请输入预留说明",rows:"3"},domProps:{value:t.jsxx.sm},on:{input:function(s){s.target.composing||t.$set(t.jsxx,"sm",s.target.value)}}})])]),t._v(" "),e("tr",[e("th",[t._v("奖励金额（元）")]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.jlje,expression:"jsxx.jlje"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.jlje},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"jlje",s.target.value)},t.handleInputfy]}})]),t._v(" "),e("th",[t._v("惩罚金额（元）")]),t._v(" "),e("td",{attrs:{colspan:"3"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.cfje,expression:"jsxx.cfje"}],staticStyle:{width:"100%"},attrs:{type:"number"},domProps:{value:t.jsxx.cfje},on:{input:[function(s){s.target.composing||t.$set(t.jsxx,"cfje",s.target.value)},t.handleInputfy]}})])]),t._v(" "),e("tr",[e("th",[t._v("奖惩说明")]),t._v(" "),e("td",{attrs:{colspan:"5"}},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.jsxx.jlsm,expression:"jsxx.jlsm"}],staticStyle:{width:"100%",padding:"5px"},attrs:{placeholder:"请输入奖惩说明",rows:"3"},domProps:{value:t.jsxx.jlsm},on:{input:function(s){s.target.composing||t.$set(t.jsxx,"jlsm",s.target.value)}}})])])])]),t._v(" "),e("div",[e("h5",[t._v("个人结算信息")]),t._v(" "),e("table",{staticClass:"table_center"},[t._m(0),t._v(" "),t._l(t.tdywyData,function(s,a){return e("tr",{key:a},[e("td",{attrs:{colspan:"合计"==s.cybh?3:0}},[t._v(t._s(s.cybh))]),t._v(" "),"合计"!=s.cybh?e("td",[t._v(t._s(s.cymc))]):t._e(),t._v(" "),"合计"!=s.cybh?e("td",[t._v(t._s(s.ywymc))]):t._e(),t._v(" "),e("td",[t._v(t._s(s.jsssfy))]),t._v(" "),e("td",[t._v(t._s(s.jsekfy))]),t._v(" "),e("td",[t._v(t._s(s.jskbfy))]),t._v(" "),e("td",[t._v(t._s(s.jsje?s.jsje:0))])])}),t._v(" "),t.tdywyData.length?t._e():e("tr",[e("td",{attrs:{colspan:"7"}},[t._v("暂无内容")])])],2)]),t._v(" "),e("div",[e("h5",[t._v("本次团队结算信息")]),t._v(" "),t._m(1),t._v(" "),e("table",{staticClass:"table_center"},[t._m(2),t._v(" "),t.tdxxData.length?t._e():e("tr",[e("td",{attrs:{colspan:"14"}},[t._v("暂无内容")])]),t._v(" "),t._l(t.tdxxData,function(s,a){return e("tr",{key:a},[e("td",[t._v(t._s(s.ywymc))]),t._v(" "),e("td",{staticStyle:{width:"300px"}},[t._v(t._s(s.cpmc))]),t._v(" "),e("td",[t._v(t._s(s.cymc))]),t._v(" "),e("td",[t._v(t._s(s.zbssfy))]),t._v(" "),e("td",[t._v(t._s(s.yjsssfy))]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:s.jsssfy,expression:"item.jsssfy"}],staticStyle:{width:"80px"},attrs:{type:"number"},domProps:{value:s.jsssfy},on:{input:[function(e){e.target.composing||t.$set(s,"jsssfy",e.target.value)},function(s){t.handleChangeInput(a,"ss")}]}})]),t._v(" "),e("td",[t._v(t._s(s.zbekfy))]),t._v(" "),e("td",[t._v(t._s(s.yjsekfy))]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:s.jsekfy,expression:"item.jsekfy"}],staticStyle:{width:"80px"},attrs:{type:"number"},domProps:{value:s.jsekfy},on:{input:[function(e){e.target.composing||t.$set(s,"jsekfy",e.target.value)},function(s){t.handleChangeInput(a,"ek")}]}})]),t._v(" "),e("td",[t._v(t._s(s.zbkbfy))]),t._v(" "),e("td",[t._v(t._s(s.yjskbfy))]),t._v(" "),e("td",[e("input",{directives:[{name:"model",rawName:"v-model",value:s.jskbfy,expression:"item.jskbfy"}],staticStyle:{width:"80px"},attrs:{type:"number"},domProps:{value:s.jskbfy},on:{input:[function(e){e.target.composing||t.$set(s,"jskbfy",e.target.value)},function(s){t.handleChangeInput(a,"kb")}]}})]),t._v(" "),e("td",[t._v(t._s(s.jsje?s.jsje:0))])])})],2)])])])]),t._v(" "),e("el-dialog",{attrs:{title:t.title,visible:t.dialogVisible,width:"80%"},on:{"update:visible":function(s){t.dialogVisible=s}}},[e("div",{staticClass:"pd-10"},[e("div",[e("span",{staticClass:"filter-weight"},[t._v("承担人：")]),t._v(" "),e("el-radio-group",{model:{value:t.cdradio,callback:function(s){t.cdradio=s},expression:"cdradio"}},[e("el-radio",{attrs:{label:0}},[t._v("区域承担")]),t._v(" "),e("el-radio",{attrs:{label:1}},[t._v("分包扣除")])],1),t._v("\n\t\t\t\t　\n\t\t\t\t"),e("el-button",{attrs:{disabled:!t.wids.length,type:"primary",size:"mini"},on:{click:t.handleMultipleSet}},[t._v("批量设置")])],1),t._v(" "),e("p",{staticStyle:{color:"#f00",margin:"10px 0 !important"}},[t._v("总金额："+t._s(t.cdfyData.zje?t.cdfyData.zje:0)+"元，区域承担："+t._s(t.cdfyData.qycd?t.cdfyData.qycd:0)+"元，分包扣除："+t._s(t.cdfyData.fbcd?t.cdfyData.fbcd:0)+"元")]),t._v(" "),2!=t.jsSource?e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""},on:{"selection-change":t.handleSelectionChange}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),e("el-table-column",{attrs:{label:"承担人",width:"100"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("span",[t._v(t._s("0"==s.row.rlzt?"区域承担":"1"==s.row.rlzt?"分包扣除":""))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"wid",label:"单据编号",width:"180"}}),t._v(" "),e("el-table-column",{attrs:{prop:"kfkjmc",label:"开发性质",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"fwlxmc",label:"服务类型",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"ztmc",label:"状态",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"ssywxmc",label:"业务线","min-width":"250"}}),t._v(" "),e("el-table-column",{attrs:{prop:"zbje",label:"中标金额",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"xqfmc",label:"需求方",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"zbjzrq",label:"招标截止日期",width:"140"}}),t._v(" "),e("el-table-column",{attrs:{prop:"jfrq",label:"交付日期",width:"140"}}),t._v(" "),e("el-table-column",{attrs:{prop:"zbrmc",label:"中标人",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"zbsj",label:"中标时间",width:"140"}})],1):t._e(),t._v(" "),2==t.jsSource?e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""},on:{"selection-change":t.handleSelectionChange}},[e("el-table-column",{attrs:{type:"selection",width:"55"}}),t._v(" "),e("el-table-column",{attrs:{label:"承担人",width:"100"},scopedSlots:t._u([{key:"default",fn:function(s){return[e("span",[t._v(t._s("0"==s.row.rlzt?"区域承担":"1"==s.row.rlzt?"分包扣除":""))])]}}])}),t._v(" "),e("el-table-column",{attrs:{prop:"djbh",label:"单据编号",width:"120","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"djzt",label:"状态",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"kmbh",label:"科目编号",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"kmmc",label:"科目名称","min-width":"250","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"je",label:"金额",width:"100"}}),t._v(" "),e("el-table-column",{attrs:{prop:"bxsqrq",label:"申请日期",width:"110"}}),t._v(" "),e("el-table-column",{attrs:{prop:"bxwcrq",label:"完成日期",width:"110"}}),t._v(" "),e("el-table-column",{attrs:{prop:"bxrmc",label:"报销人",width:"90"}}),t._v(" "),e("el-table-column",{attrs:{prop:"bxrbmmc",label:"报销人部门",width:"150","show-overflow-tooltip":""}}),t._v(" "),e("el-table-column",{attrs:{prop:"fycdrmc",label:"承担人",width:"90"}}),t._v(" "),e("el-table-column",{attrs:{prop:"fycdrbmmc",label:"承担人部门",width:"150","show-overflow-tooltip":""}})],1):t._e(),t._v(" "),e("br"),t._v(" "),e("div",{attrs:{slot:"footer","text-right":""},slot:"footer"},[e("el-button",{attrs:{size:"mini"},on:{click:function(s){t.dialogVisible=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(s){t.dialogVisible=!1}}},[t._v("确 定")])],1)],1)])],1)},staticRenderFns:[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("tr",[e("th",[t._v("工号")]),t._v(" "),e("th",[t._v("姓名")]),t._v(" "),e("th",[t._v("负责业务线")]),t._v(" "),e("th",[t._v("结算实施金额")]),t._v(" "),e("th",[t._v("结算二开金额")]),t._v(" "),e("th",[t._v("结算可变金额")]),t._v(" "),e("th",[t._v("合计")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",{staticStyle:{color:"#f00","font-size":"12px"}},[this._v("\n\t\t\t\t\t\t个人结算二开费用 = 结算二开费用 * 5400 / 8800; 个人结算可变费用 = 结算可变费用 * 70%;\n\t\t\t\t\t\t"),s("br"),this._v("\n\t\t\t\t\t\t结算总金额包含团队结算费用; 实际实施费用指二开实施费用；实际二开费用指二开开发费用；实际可变费用指报销费用;\n\t\t\t\t\t")])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("tr",[e("th",[t._v("业务域")]),t._v(" "),e("th",[t._v("合同内容")]),t._v(" "),e("th",[t._v("责任人")]),t._v(" "),e("th",[t._v("中标实施费用(元)")]),t._v(" "),e("th",[t._v("已结算实施费用(元)")]),t._v(" "),e("th",[t._v("本次结算实施费用(元)")]),t._v(" "),e("th",[t._v("中标二开费用(元)")]),t._v(" "),e("th",[t._v("已结算二开费用(元)")]),t._v(" "),e("th",[t._v("本次结算二开费用(元)")]),t._v(" "),e("th",[t._v("中标可变费用(元)")]),t._v(" "),e("th",[t._v("已结算可变费用(元)")]),t._v(" "),e("th",[t._v("本次结算可变费用(元)")]),t._v(" "),e("th",[t._v("本次合计结算")])])}]};var n=e("Z0/y")(r,j,!1,function(t){e("ECOO")},"data-v-dfe8bd7e",null);s.default=n.exports}});
//# sourceMappingURL=58.a6a735152050f80cb08f.js.map