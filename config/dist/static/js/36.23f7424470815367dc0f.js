webpackJsonp([36],{"0nas":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("P+gh"),n=a("oFuF"),i=a("aCns"),l={data:function(){return{visible:this.show,tableHeight:window.innerHeight-210}},props:{show:{type:Boolean,default:!1},tableData:{tyep:Object,default:function(){return{}}},currentPage:{type:Number,default:1},pageSize:{type:Number,default:15},title:{type:String,default:""},sm:{type:String,default:""}},methods:{handleClose:function(){this.visible=!1},handleCurrentChange:function(t){this.$emit("handleCurrentChange",t)}},watch:{show:function(t,e){this.visible=this.show}},components:{tableComponents:i.a}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-dialog",{attrs:{title:t.title,width:"1000px",top:"0",visible:t.visible,"append-to-body":!0,"close-on-click-modal":!1,show:t.show},on:{"update:visible":function(e){t.visible=e},close:function(e){t.$emit("update:show",!1)}}},[a("div",{staticClass:"dialog-jd"},[a("p",[t._v(t._s(t.sm))]),t._v(" "),a("tableComponents",{attrs:{tableData:t.tableData,pageShow:!0,currentPage:t.currentPage,pageSize:t.pageSize,indexArr:[],widthArr:[0,1,2],Width:"120",Height:300,exportShow:!1},on:{handleCurrentChange:t.handleCurrentChange}})],1)])],1)},staticRenderFns:[]};var v=a("Z0/y")(l,r,!1,function(t){a("9UZm")},"data-v-0e1c6532",null).exports,o={data:function(){return{year:"",activeName:"first",monthList:[{mc:"四月",val:"04"},{mc:"五月",val:"05"},{mc:"六月",val:"06"},{mc:"七月",val:"07"},{mc:"八月",val:"08"},{mc:"九月",val:"09"},{mc:"十月",val:"10"},{mc:"十一月",val:"11"},{mc:"十二月",val:"12"},{mc:"一月",val:"01"},{mc:"二月",val:"02"},{mc:"三月",val:"03"}],tableData:{},month:"",markYear:"",data:{},username:"",show:!1,title:"",sm:"",queryObj:{},type:""}},mounted:function(){this.markYear=(new Date).getFullYear();var t=(new Date).getMonth()+1,e=this.markYear+"-"+(t<10?"0"+t:t);this.username=sessionStorage.username,this.month=Object(n.l)(e).split("-")[1],this.year=Object(n.l)(e).split("-")[0];var a=this.markYear+"-"+this.month;this.personalSettlement(a)},methods:{handleCurrentChange:function(t){this.queryObj.curPage=t,this.getDetail(this.type)},handleCheckJs:function(t){var e=this.markYear+"-"+this.month;switch(this.type=t,this.queryObj.curPage=1,this.queryObj.pageSize=15,t){case"ekjs":this.title="Crowd结算",this.sm="",this.queryObj.yf=e,delete this.queryObj.startDt,delete this.queryObj.endDt;break;case"xmjs":this.title="项目结算",this.sm="说明：团队收入为正数是表示收入，负数表示支出给团队成员费用",this.queryObj.yf=e,delete this.queryObj.startDt,delete this.queryObj.endDt;break;case"sqdy":this.title="售前调用结算",this.sm="说明：售前调用按500/800结算个人收入",this.queryObj.startDt=e+"-01",this.queryObj.endDt=Object(n.j)(e)+"-01",delete this.queryObj.yf}this.getDetail(t),this.show=!this.show},handleChangeDate:function(t){this.markYear=t;var e=t+"-"+this.month;this.personalSettlement(e)},handleCheckJS:function(t){this.month=t.val;var e=this.markYear+"-"+this.month;this.personalSettlement(e)},personalSettlement:function(t){var e=this;this.$get(this.API.personalSettlement,{yf:t}).then(function(t){"success"==t.state&&(e.data=t.data)})},getDetail:function(t){var e=this;this.$get("ekjs"==t?this.API.crowdSettlement:"xmjs"==t?this.API.projectSettlement:this.API.presaleCallSettlement,this.queryObj).then(function(t){"success"==t.state&&(e.tableData=t.data)})}},components:{tableLayout:s.a,sydetailDialog:v}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("tableLayout",[a("section",{attrs:{slot:"top"},slot:"top"},[a("div",{staticClass:"personalJs-top",attrs:{"flex-column":"",spacearound:""}},[a("section",{staticClass:"pd-10"},[a("el-date-picker",{attrs:{type:"year",placeholder:"选择年","value-format":"yyyy",format:"yyyy 年"},on:{change:t.handleChangeDate},model:{value:t.year,callback:function(e){t.year=e},expression:"year"}})],1),t._v(" "),a("section",{staticClass:"personalJs-top-month",staticStyle:{height:"45%"},attrs:{flex:"",spacearound:""}},t._l(t.monthList,function(e){return a("div",[a("p",{class:{monthprocessmc:!0,colorActive:t.month==e.val}},[t._v(t._s(e.mc))]),t._v(" "),a("div",{staticClass:"monthprocess",attrs:{colcenter:""}},[a("span",{staticClass:"processLine"}),t._v(" "),a("span",{class:{processDot:!0,widthActive:t.month==e.val},on:{click:function(a){t.handleCheckJS(e)}}})])])}))])]),t._v(" "),a("section",{staticClass:"personalJs-bottom",attrs:{slot:"bottom",flex:"",spacearound:""},slot:"bottom"},[a("div",{staticClass:"personalJs-menu"},[a("h5",[a("span",{staticClass:"filter-weight"},[t._v("结算清单")]),a("br"),t._v("Settlement list")]),t._v(" "),a("div",{staticClass:"personalJs-menu-dl"},[a("h5",[t._v("我的账户:")]),t._v(" "),a("dl",[a("dt",{staticClass:"bordeBottom"},[t._v("本月收入:"),a("span",{staticClass:"colorActive"},[t._v(t._s(t.data.sfzcb?t.data.sfzcb:0)+" 元")])]),t._v(" "),a("dd",[t._v("本月项目实发:"),a("span",[t._v(t._s(t.data.shfa)+" 元")])]),t._v(" "),a("dd",[t._v("冲入奖金池:"),a("span",[t._v(t._s(t.data.byxzjj)+" 元")])]),t._v(" "),a("dd",[t._v("本月奖金池领取:"),a("span",[t._v(t._s(t.data.byyljj)+" 元")])]),t._v(" "),a("dt",{staticClass:"bordeTopBottom"},[t._v("项目结余:"),a("span",[t._v(t._s(t.data.byjy)+" 元")])]),t._v(" "),a("dt",[t._v("奖金池结余:"),a("span",[t._v(t._s(t.data.wfjj)+" 元")])])]),t._v(" "),a("h5",[t._v("项目结算:")]),t._v(" "),a("dl",[a("dt",{staticClass:"bordeBottom"},[t._v("上月结算余额:"),a("span",[t._v(t._s(t.data.syjs)+" 元")])]),t._v(" "),a("dt",[t._v("本月项目结算:"),a("span",[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(e){t.handleCheckJs("xmjs")}}},[t._v(t._s(t.data.xmjs)+" 元")])])]),t._v(" "),a("dt",[t._v("本月CROWD结算:"),a("span",[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(e){t.handleCheckJs("ekjs")}}},[t._v(t._s(t.data.crowdjs)+" 元")])])]),t._v(" "),a("dt",[t._v("本月售前调用:"),a("span",[a("a",{attrs:{href:"javaScript:;;"},on:{click:function(e){t.handleCheckJs("sqdy")}}},[t._v(t._s(t.data.sqjs)+" 元")])])]),t._v(" "),a("dt",[t._v("本月其他结算:"),a("span",[t._v(t._s(t.data.qtjs)+" 元")])]),t._v(" "),a("p",[t._v(t._s(t.data.qtjssm))]),t._v(" "),a("dt",[t._v("本月奖惩:"),a("span",[t._v(t._s(t.data.jc)+" 元")])]),t._v(" "),a("p",[t._v(t._s(t.data.jcsm))]),t._v(" "),a("dt",{staticClass:"bordeBottom"},[t._v("本月结算合计:"),a("span",[t._v(t._s(t.data.yifa)+" 元")])]),t._v(" "),a("dt",[t._v("本月项目实发:"),a("span",[t._v(t._s(t.data.shfa)+" 元")])]),t._v(" "),a("dt",[t._v("本月项目结余:"),a("span",[t._v(t._s(t.data.byjy)+" 元")])])]),t._v(" "),a("h5",[t._v("奖金池:")]),t._v(" "),a("dl",[a("dt",[t._v("上月结余:"),a("span",[t._v(t._s(t.data.syjyjj)+" 元")])]),t._v(" "),a("dt",[t._v("本月新增:"),a("span",[t._v(t._s(t.data.byxzjj)+" 元")])]),t._v(" "),a("dt",[t._v("本月已领:"),a("span",[t._v(t._s(t.data.byyljj)+" 元")])]),t._v(" "),a("dt",[t._v("本月结余:"),a("span",[t._v(t._s(t.data.wfjj)+" 元")])])])])]),t._v(" "),a("div",{staticClass:"personalJs-menu",staticStyle:{"padding-left":"20px"}},[a("h5",[a("span",{staticClass:"filter-weight"},[t._v("分包结算说明")]),a("br"),t._v("Description")]),t._v(" "),a("div",{staticClass:"personalJs-menu-sm"},[a("section",[a("p",[t._v("【规则】")]),t._v(" "),a("p",[t._v("1.实结结算 = 分包实施费用 - 实施调用费用 - 预留费用;")]),t._v(" "),a("p",[t._v("2.二开结算 = (分包二开费用 - 实际使用二开费用 - 预留费用) * (5400 / 0800);")]),t._v(" "),a("p",[t._v("3.可变结算 = (分包可变费用 - 实际使用可变费用 - 预留费用) * 70%;")]),t._v(" "),a("p",[t._v("4.结算费用 = 实施结算 + 二开结算 + 可变结算;")]),t._v(" "),a("p",[t._v("5.结算金额总计(元) = 项目结算合计 + 其他人员调用 + 导师奖励 + 其他奖励;")]),t._v(" "),a("p",[t._v("6.应发工资:结算金额总计 - 结算期已发金额[月工资 * (当月月份财年 - 起始月份)](财年起始月份:4月份);")]),t._v(" "),a("p",[t._v("7.实发工资:如果低于工资按工资标准发放,否则按应发工资发放;")])]),t._v(" "),a("section",[a("p",[t._v("【案例】")]),t._v(" "),a("p",[t._v("张三月工资12000元,只有一个分包,6月份结算数据如下:")]),t._v(" "),a("p",[t._v("分包实施费用30000元,实施调用费用6000元,预留4000元;")]),t._v(" "),a("p",[t._v("分包二开费用20000元,实际二开费用8000元,预留2000元;")]),t._v(" "),a("p",[t._v("分包可变费用20000元,实际可变费用7000元,预留3000元;")]),t._v(" "),a("p",[t._v("奖励0元,惩罚0元,其他人员调用2000元,导师奖励1000元,其他奖成0元;")]),t._v(" "),a("p",[t._v("1.实施结算:20000 = 30000 - 6000 - 4000;")]),t._v(" "),a("p",[t._v("2.二开结算:6136 = (200008000 - 2000) * (5400 / 8800);")]),t._v(" "),a("p",[t._v("3.可变结算:7000 = (200007000 - 3000) * 70%;")]),t._v(" "),a("p",[t._v("4.结算费用:33136 = 20000 + 6136 + 7000;")]),t._v(" "),a("p",[t._v("5.结算金额总计:36136 = 33136 + 2000 + 1000 + 0;")]),t._v(" "),a("p",[t._v("6.应发工资:24136 = 36136 - 12000 （4月份已发工资）;")]),t._v(" "),a("p",[t._v("7.实发工资:24136 > 12000,按24136发放,24136其中12000为工资,12136元为奖金金额;")])])])])])]),t._v(" "),a("sydetailDialog",{attrs:{show:t.show,title:t.title,sm:t.sm,currentPage:t.queryObj.curPage,pageSize:t.queryObj.pageSize,tableData:t.tableData},on:{"update:show":function(e){t.show=e},handleCurrentChange:t.handleCurrentChange}})],1)},staticRenderFns:[]};var _=a("Z0/y")(o,c,!1,function(t){a("CKOe")},"data-v-87b804d4",null);e.default=_.exports},"9UZm":function(t,e){},CKOe:function(t,e){}});
//# sourceMappingURL=36.23f7424470815367dc0f.js.map