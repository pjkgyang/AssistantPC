webpackJsonp([62],{CN4I:function(t,e){},ZmMw:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("auNG"),a=i("1vsE"),n=i("oFuF"),c={data:function(){return{noticeList:[],showIndex:0,noticeDeatil:{},wid:"",isread:0,curPage:1,total:""}},mounted:function(){a.a.init(document.querySelector("#scrollbar"))},methods:{handleReadAllMsg:function(){var t=this;Object(s.b)().then(function(e){"success"==e.data.state&&(t.getMessage(1,!0),n.a.$emit("readAllMessages",""))})},handleNoticeDetail:function(t){var e=t.currentTarget.getAttribute("data-wid");this.readMessage(e)},readMessage:function(t){var e=this;Object(s.c)({wid:t}).then(function(i){var s=i.data;"success"==s.state&&(n.a.$emit("changeNoticeNum",""),null!=s.data?e.noticeDeatil=s.data:e.noticeDeatil={},e.wid=t)})},handleNoticeType:function(t){var e=t.target.getAttribute("data-type");this.isread=e,this.showIndex=e,2==e&&(this.isread=""),this.getMessage(1,!0)},handleNext:function(){this.curPage+=1,this.getMessage(this.curPage)},handlePrev:function(){this.curPage-=1,this.getMessage(this.curPage)},getMessage:function(t,e){var i=this;Object(s.a)({curPage:t,pageSize:12,keyword:"",isread:this.isread}).then(function(t){var s=t.data;"success"==s.state&&(i.noticeList=s.data.rows,i.total=s.data.total,e&&0!=s.data.rows.length&&i.readMessage(i.noticeList[0].wid))})},closeNotice:function(){this.$router.go(-1)}},activated:function(){this.getMessage(1,!0)},components:{}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sys-notice"},[i("div",{staticClass:"sys-notice-list"},[i("div",{staticClass:"sys-notice-operate"},[i("span",{class:{"btn-active":0==t.showIndex},attrs:{"data-type":"0"},on:{click:t.handleNoticeType}},[t._v("未读")]),t._v("　\n              "),i("span",{class:{"btn-active":1==t.showIndex},attrs:{"data-type":"1"},on:{click:t.handleNoticeType}},[t._v("已读")]),t._v("　\n              "),i("span",{class:{"btn-active":2==t.showIndex},attrs:{"data-type":"2"},on:{click:t.handleNoticeType}},[t._v("全部")]),t._v(" "),i("el-button",{staticStyle:{float:"right"},attrs:{size:"mini"},on:{click:t.handleReadAllMsg}},[t._v("全部标记为已读")])],1),t._v(" "),i("div",{staticClass:"notice-list",attrs:{id:"scrollbar"}},[i("div",[t._l(t.noticeList,function(e){return i("section",{class:{"list-bg":e.wid==t.wid},attrs:{"data-wid":e.wid},on:{click:t.handleNoticeDetail}},[i("div",{staticClass:"notice-list-top"},[i("span",{staticStyle:{"font-weight":"700","font-size":"15px",color:"#666",float:"left"}},[t._v(t._s(e.title))]),i("br"),t._v(" "),i("span",{staticStyle:{"font-size":"12px",color:"#aaa",float:"left"}},[t._v("发送人:"+t._s(e.fsrxm))]),t._v(" "),i("span",{staticStyle:{"font-size":"12px",color:"#aaa",float:"right"}},[t._v(t._s(e.sendTime))])]),t._v(" "),i("div",[i("span",{staticClass:"sys-notice-tip"},[t._v(t._s(e.summary))])])])}),t._v(" "),0==t.noticeList.length?i("div",{staticStyle:{"text-align":"center",padding:"20px"}},[t._v("\n                         暂无通知\n                      ")]):t._e()],2)]),t._v(" "),0!=t.noticeList.length?i("div",{staticClass:"paginate-btn"},[i("el-button-group",[i("el-button",{attrs:{size:"mini",type:"info",round:"",disabled:1==t.curPage,icon:"el-icon-arrow-left"},on:{click:t.handlePrev}},[t._v("上一页")]),t._v(" "),i("el-button",{attrs:{size:"mini",type:"info",round:"",disabled:t.curPage==t.total},on:{click:t.handleNext}},[t._v("下一页"),i("i",{staticClass:"el-icon-arrow-right el-icon--right"})])],1)],1):t._e()]),t._v(" "),i("div",{staticClass:"sys-notice-detail"},["{}"!=JSON.stringify(t.noticeDeatil)&&0!=t.noticeList.length?i("div",[i("div",{staticClass:"sys-notice-detail-head"},[i("h3",[t._v(t._s(t.noticeDeatil.tzbt))]),t._v(" "),i("p",[t._v("发送人 : "),i("span",[t._v(t._s(t.noticeDeatil.fsrxm))])]),t._v(" "),i("p",[t._v("接收人 : "),i("span",[t._v(t._s(t.noticeDeatil.jsrxm))])]),t._v(" "),i("p",[t._v("时间 : "),i("span",[t._v(t._s(t.noticeDeatil.fssj))])]),t._v(" "),t.noticeDeatil.xmmc?i("p",[t._v("项目名称 : "),i("span",[t._v(t._s(t.noticeDeatil.xmmc))])]):t._e(),t._v(" "),t.noticeDeatil.rwmc?i("p",[t._v("任务名称 : "),i("span",[t._v(t._s(t.noticeDeatil.rwmc_display))])]):t._e(),t._v(" "),t.noticeDeatil.lcbms?i("p",[t._v("里程碑名称 : "),i("span",[t._v(t._s(t.noticeDeatil.lcbms_display))])]):t._e()]),t._v(" "),i("div",{staticClass:"sys-notice-detail-content"},[i("h5",[t._v("内容：")]),t._v(" "),i("div",{staticStyle:{color:"#000"},domProps:{innerHTML:t._s(t.noticeDeatil.tznr)}})])]):t._e(),t._v(" "),"{}"==JSON.stringify(t.noticeDeatil)||0==t.noticeList.length?i("div",{staticStyle:{"text-align":"center","padding-top":"100px"}},[i("img",{attrs:{src:"static/img/empty.png",alt:""}}),t._v(" "),i("p",[t._v("暂无通知")])]):t._e(),t._v(" "),i("div",{staticClass:"sysNotice-close",attrs:{title:"关闭"},on:{click:t.closeNotice}},[i("span",{staticClass:"el-icon-close"})])])])},staticRenderFns:[]};var l=i("Z0/y")(c,o,!1,function(t){i("CN4I")},"data-v-60f7fa7d",null);e.default=l.exports}});
//# sourceMappingURL=62.e36f8fa55b97fe6d4564.js.map