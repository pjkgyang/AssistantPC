webpackJsonp([128],{"6Fvu":function(e,t){},hHsf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});a("t5DY"),a("mmiC"),a("oFuF");var n=a("aCns"),i={data:function(){return{gczdList:[],xmlxList:[],xmlx:"",gczd:"",dataList:{},headList:[],keyword:"",filterList:["keyword"],filterDate:{keyword:""},currentPage:1,pageSize:18}},methods:{exportTable:function(){this.filterDate.date&&this.filterDate.date[0],this.filterDate.date&&this.filterDate.date[1];window.open(window.baseurl+"usageReport/exportUserLoginStat.do?keyword="+this.filterDate.keyword)},handleCurrentChange:function(e){this.currentPage=e,this.userLoginStat()},handleChangeFilter:function(e){this.currentPage=1,this.filterDate=e,this.userLoginStat()},userLoginStat:function(e){var t=this;this.$get(this.API.userLoginStat,{curPage:this.currentPage,pageSize:this.pageSize,keyword:this.filterDate.keyword}).then(function(e){"success"==e.state&&(t.dataList=e.data)})},handleXxwt:function(e,t,a){var n=this.$router.resolve({path:"/userDetail",query:{bh:e[0]}});window.open(n.href,"_blank")}},mounted:function(){this.userLoginStat()},activated:function(){},watch:{},components:{filterComponent:a("NxvJ").a,tableComponents:n.a}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",[a("filterComponent",{attrs:{filterList:e.filterList,placeholder:"请输入用户名/手机号/单位"},on:{handleChangeFilter:e.handleChangeFilter}})],1),e._v(" "),a("div",[a("tableComponents",{attrs:{tableData:e.dataList,pageShow:!0,currentPage:e.currentPage,pageSize:e.pageSize,indexArr:[0,1],widthArr:[],Width:"130",Height:250},on:{handleCurrentChange:e.handleCurrentChange,exportTable:e.exportTable,handleXxwt:e.handleXxwt}})],1)])},staticRenderFns:[]};var o=a("VU/8")(i,r,!1,function(e){a("6Fvu")},null,null);t.default=o.exports}});
//# sourceMappingURL=128.6842bd61947bb06192c3.js.map