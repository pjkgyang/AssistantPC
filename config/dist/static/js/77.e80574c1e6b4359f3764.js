webpackJsonp([77],{"8iIB":function(t,s){},VDXV:function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={data:function(){return{baseUrl:"",jdList:[],fxList:[{cpmc:"asdasd",fwnr:"adasdas",fxms:"123123123",cljy:"12312312"}],cpData:{}}},mounted:function(){var t=this;this.baseUrl=window.baseurl,this.isJzuser=sessionStorage.getItem("isJZuser"),this.$get(this.API.getActiveService,{wid:this.$route.query.wid}).then(function(s){"success"==s.state&&(t.cpData=s.data)}),this.$get(this.API.listOperationLog,{zbwid:this.$route.query.wid}).then(function(s){"success"==s.state&&(t.jdList=s.data)})},components:{tableLayout:a("P+gh").a}},_={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"fwjh-Detail"},[a("div",{staticClass:"fwjh-Detail-content"},[a("tableLayout",[a("section",{attrs:{slot:"top"},slot:"top"},[a("h5",[t._v("产品内容")]),t._v(" "),a("div",{staticClass:"contentMark"},[a("table",[a("tr",[a("td",{staticClass:"contenTitle"},[t._v("学校名称")]),t._v(" "),a("td",[t._v(t._s(t.cpData.xx))]),t._v(" "),a("td",{staticClass:"contenTitle"},[t._v("合同名称")]),t._v(" "),a("td",[t._v(t._s(t.cpData.xmmc))])]),t._v(" "),a("tr",[a("td",{staticClass:"contenTitle"},[t._v("产品")]),t._v(" "),a("td",[t._v(t._s(t.cpData.cpmc))]),t._v(" "),a("td",{staticClass:"contenTitle"},[t._v("服务内容")]),t._v(" "),a("td",[t._v(t._s(t.cpData.fwnr))])]),t._v(" "),a("tr",[a("td",{staticClass:"contenTitle"},[t._v("责任人")]),t._v(" "),a("td",[t._v(t._s(t.cpData.zrrxm))]),t._v(" "),a("td",{staticClass:"contenTitle"},[t._v("状态")]),t._v(" "),a("td",[t._v(t._s(t.cpData.zt_display))])]),t._v(" "),a("tr",[a("td",{staticClass:"contenTitle"},[t._v("计划完成时间")]),t._v(" "),a("td",[t._v(t._s(t.cpData.jhjsrq))]),t._v(" "),a("td",{staticClass:"contenTitle"},[t._v("实际完成时间")]),t._v(" "),a("td",[t._v(t._s(t.cpData.sjjsrq?t.cpData.sjjsrq:"无"))])]),t._v(" "),a("tr",[a("td",{staticClass:"contenTitle"},[t._v("巡检工时(小时)")]),t._v(" "),a("td",[t._v(t._s(t.cpData.xjgs))]),t._v(" "),a("td",{staticClass:"contenTitle"},[t._v("相关材料")]),t._v(" "),a("td",{attrs:{colspan:"3"}},t._l(t.cpData.fjList,function(s){return t.cpData.fjList?a("a",{staticStyle:{"margin-right":"30px"},attrs:{href:t.baseUrl+"attachment/downloadFile.do?fjId="+s.fjbh}},[t._v(t._s(s.fjmc))]):t._e()}))])])]),t._v(" "),t.cpData.problems&&t.cpData.problems.length>0?a("div",[a("h5",[t._v("问题项")]),t._v(" "),a("div",{staticClass:"contentMark"},t._l(t.cpData.problems,function(s,e){return a("section",{staticClass:"option-list",attrs:{flex:""}},[a("div",{staticClass:"filter-weight option-list-index",attrs:{flex:"",colcenter:""}},[a("span",[t._v(t._s(e+1))])]),t._v(" "),a("div",[a("p",[a("span",{staticClass:"filter-weight"}),t._v(t._s(s.cpmc)+"　"+t._s(s.fwnr)+"　\n                  "),a("el-tag",{attrs:{size:"mini",type:"1"==s.zt?"success":"primary"}},[t._v(t._s("0"==s.zt?"待处理":"1"==s.zt?"已处理":"无需处理"))]),t._v(" \n                ")],1),t._v(" "),a("p",[a("span",[t._v("问题描述：")]),t._v(" "),a("span",{staticStyle:{color:"#f00"}},[t._v(t._s(s.wtms))])]),t._v(" "),a("p",[a("span",[t._v("处理建议：")]),t._v(" "),a("span",{staticStyle:{color:"green"}},[t._v(t._s(s.clyj))])]),t._v(" "),0==t.isJzuser?a("p",[a("span",[t._v("问题工时：")]),t._v(" "),a("span",{staticStyle:{color:"green"}},[t._v(t._s(s.gs))])]):t._e(),t._v(" "),a("p",[a("span",[t._v("处理时间：")]),t._v(" "),a("span",{staticStyle:{color:"green"}},[t._v(t._s(s.clsj))]),t._v("　\n                  "),a("span",[t._v("处理结果：")]),t._v(" "),a("span",[t._v(t._s(s.cljg))])])])])}))]):t._e(),t._v(" "),t.cpData.risks&&t.cpData.risks.length>0?a("div",[a("h5",[t._v("风险项")]),t._v(" "),a("div",{staticClass:"contentMark"},t._l(t.cpData.risks,function(s,e){return a("section",{staticClass:"option-list",attrs:{flex:""}},[a("div",{staticClass:"filter-weight option-list-index",attrs:{flex:"",colcenter:""}},[a("span",[t._v(t._s(e+1))])]),t._v(" "),a("div",[a("p",{staticClass:"filter-weight"},[t._v("\n                  "+t._s(s.cpmc)+"　"+t._s(s.fwnr)+"　\n                  "),a("el-tag",{class:{"zdsfw-fxdj-s1":1==s.fxdj,"zdsfw-fxdj-s2":2==s.fxdj,"zdsfw-fxdj-s3":3==s.fxdj},attrs:{size:"mini"}},[t._v(t._s(1==s.fxdj?"S1":2==s.fxdj?"S2":"S3"))]),t._v("　\n\n                  "),a("el-tag",{attrs:{size:"mini",type:"1"==s.zt?"success":"primary"}},[t._v(t._s("0"==s.zt?"待处理":"1"==s.zt?"已处理":"无需处理"))]),t._v(" \n\n                ")],1),t._v(" "),a("p",[a("span",[t._v("风险描述：")]),t._v(" "),a("span",{staticStyle:{color:"#f00"}},[t._v(t._s(s.fxms))])]),t._v(" "),a("p",[a("span",[t._v("处理建议：")]),t._v(" "),a("span",{staticStyle:{color:"green"}},[t._v(t._s(s.cljy))])]),t._v(" "),0==t.isJzuser?a("p",[a("span",[t._v("风险工时：")]),t._v(" "),a("span",{staticStyle:{color:"green"}},[t._v(t._s(s.gs))])]):t._e(),t._v(" "),a("p",[a("span",[t._v("处理时间：")]),t._v(" "),a("span",{staticStyle:{color:"green"}},[t._v(t._s(s.clsj))]),t._v("　\n                  "),a("span",[t._v("处理结果：")]),t._v(" "),a("span",[t._v(t._s(s.cljg))])]),t._v(" "),s.fjList?a("p",[a("span",[t._v("相关附件：")]),t._v(" "),t._l(s.fjList,function(s){return a("a",{staticStyle:{"margin-right":"30px"},attrs:{href:t.baseUrl+"attachment/downloadFile.do?fjId="+s.fjbh}},[t._v(t._s(s.fjmc))])})],2):t._e()])])}))]):t._e()]),t._v(" "),a("section",{attrs:{slot:"bottom"},slot:"bottom"},[a("div",[a("h5",[t._v("服务小结")]),t._v(" "),a("p",[t._v(t._s(t.cpData.zjtbcznr))]),a("br")]),t._v(" "),a("div",{staticClass:"contetnProgress"},[a("h5",[t._v("计划进度")]),t._v(" "),a("div",{staticClass:"contentMark"},[t._l(t.jdList,function(s,e){return t.jdList.length?a("div",{class:{"progress-dot":!0,"progress-dot-last":e==t.jdList.length-1}},[a("div",[a("span",[t._v(t._s(s.cjsj)+"　"),a("span",{staticStyle:{color:"rgb(21, 145, 202)"}},[t._v(t._s(s.czrxm?s.czrxm:""))]),t._v("　"+t._s(s.czlxmc))]),t._v(" "),a("div",{class:{"jd-content":4==s.czlx},domProps:{innerHTML:t._s(s.cznr)}})])]):t._e()}),t._v(" "),t.jdList.length?t._e():a("div",{staticClass:"emptyContent"},[a("img",{attrs:{src:"static/img/empty.png",alt:""}}),t._v(" "),a("p",[t._v("暂无日志记录")])])],2)])])])],1)])},staticRenderFns:[]};var i=a("VU/8")(e,_,!1,function(t){a("8iIB")},"data-v-e7856474",null);s.default=i.exports}});
//# sourceMappingURL=77.e80574c1e6b4359f3764.js.map