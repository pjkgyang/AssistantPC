webpackJsonp([94],{XDCK:function(t,_,v){"use strict";Object.defineProperty(_,"__esModule",{value:!0});var x={data:function(){return{htjbxx:{},htnrData:[]}},mounted:function(){this.getLxxx()},methods:{getLxxx:function(){var t=this;this.$get(this.API.queryLxxx,{xmbh:this.$route.query.xmbh}).then(function(_){"success"==_.state&&(console.log(_),t.htjbxx=_.data.lxxx,t.htnrData=_.data.lxxx_htnr?_.data.lxxx_htnr:[])})}},activated:function(){},components:{}},h={render:function(){var t=this,_=t.$createElement,v=t._self._c||_;return v("div",[v("div",{staticClass:"fbdetail_container"},[v("div",{staticClass:"fb_info"},[v("div",[v("h4",[t._v("合同内容")]),t._v(" "),v("div",[v("h6",[t._v("合同基本信息")]),t._v(" "),v("table",[v("tr",[v("th",[t._v("项目编号")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.xmbh))]),t._v(" "),v("th",[t._v("项目名称")]),t._v(" "),v("td",{attrs:{colspan:"3"}},[t._v(t._s(t.htjbxx.xmmc))])]),t._v(" "),v("tr",[v("th",[t._v("合同编号")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.htbh))]),t._v(" "),v("th",[t._v("项目类别")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.xmlbmc))]),t._v(" "),v("th",[t._v("项目状态")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.xmxz))])]),t._v(" "),v("tr",[v("th",[t._v("合同金额（元）")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.htje?t.htjbxx.htje:0))]),t._v(" "),v("th",[t._v("合同毛收入（元）")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.htmsr?t.htjbxx.htmsr:0))]),t._v(" "),v("th",[t._v("到款率（%）")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.dkl?t.htjbxx.dkl:0))])]),t._v(" "),v("tr",[v("th",[t._v("合同性质")]),t._v(" "),v("td",[t._v(t._s("A"==t.htjbxx.sfzt?"正式":"B"==t.htjbxx.sfzt?"内部":"在谈"))]),t._v(" "),v("th",[t._v("是否购销")]),t._v(" "),v("td",[t._v(t._s("0"==t.htjbxx.sfgx?"否":"是"))]),t._v(" "),v("th",[t._v("财年")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.cn))])]),t._v(" "),v("tr",[v("th",[t._v("项目经理")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.xmjl))]),t._v(" "),v("th",[t._v("客户经理")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.khjl))]),t._v(" "),v("th",[t._v("学校")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.xx))])]),t._v(" "),v("tr",[v("th",[t._v("甲方")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.yh))]),t._v(" "),v("th",[t._v("签署方")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.qsfmc))]),t._v(" "),v("th",[t._v("签署日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.qssj))])]),t._v(" "),v("tr",[v("th",[t._v("生效日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.sxrq))]),t._v(" "),v("th",[t._v("立项日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.lxrq))]),t._v(" "),v("th",[t._v("启动日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.qdrq))])]),t._v(" "),v("tr",[v("th",[t._v("承诺验收日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.cnysrq))]),t._v(" "),v("th",[t._v("整体验收报告日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.ztysbgsj))]),t._v(" "),v("th",[t._v("整体验收结束日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.ztysjssj))])]),t._v(" "),v("tr",[v("th",[t._v("服务开始日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.fwksrq))]),t._v(" "),v("th",[t._v("服务年限（月）")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.fwqx))]),t._v(" "),v("th",[t._v("过保日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.gbsj))])]),t._v(" "),v("tr",[v("th",[t._v("工程区域")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.gcqy))]),t._v(" "),v("th",[t._v("工程战队")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.gczd))]),t._v(" "),v("th",[t._v("是否延长售后")]),t._v(" "),v("td",[t._v(t._s(1==t.htjbxx.gcfwzt?"是":"否"))])]),t._v(" "),v("tr",[v("th",[t._v("延长截止日期")]),t._v(" "),v("td",[t._v(t._s(t.htjbxx.ycfwqx))]),t._v(" "),v("th",[t._v("延长说明")]),t._v(" "),v("td",{attrs:{colspan:"3"}},[t._v(t._s(t.htjbxx.gcfwztsm))])])])]),t._v(" "),v("div",[v("h6",[t._v("合同内容")]),t._v(" "),v("el-table",{staticStyle:{width:"100%"},attrs:{data:t.htnrData,border:"","max-height":"400"}},[v("el-table-column",{attrs:{prop:"ywx",label:"业务线","min-width":"120"}}),t._v(" "),v("el-table-column",{attrs:{prop:"app",label:"合同内容","show-overflow-tooltip":"","min-width":"150"}}),t._v(" "),v("el-table-column",{attrs:{prop:"zb",label:"占比(%)",width:"80"}}),t._v(" "),v("el-table-column",{attrs:{prop:"sm",label:"说明","min-width":"150","show-overflow-tooltip":""}}),t._v(" "),v("el-table-column",{attrs:{prop:"ejcpmc",label:"产品归属","min-width":"150"}}),t._v(" "),v("el-table-column",{attrs:{prop:"ssry",label:"实施人月",width:"100"}}),t._v(" "),v("el-table-column",{attrs:{prop:"kfry",label:"二开人月",width:"120"}}),t._v(" "),v("el-table-column",{attrs:{prop:"kfry",label:"项目类别",width:"120"}})],1)],1)])])])])},staticRenderFns:[]};var s=v("Z0/y")(x,h,!1,function(t){v("isqI")},"data-v-453d4dcd",null);_.default=s.exports},isqI:function(t,_){}});
//# sourceMappingURL=94.fc53fad098164bd0771e.js.map