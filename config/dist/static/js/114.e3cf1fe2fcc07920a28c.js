webpackJsonp([114],{Z83b:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("t5DY"),i("mmiC"),i("oFuF");var r=i("GLli"),a=i("aCns"),n=i("NxvJ"),l={data:function(){return{dataList:{},headList:[],filterList:["keyword","bm","date","dwlx","xmlx","cpx"],filterDate:{keyword:"",xmlx:"",bm:"",date:"",dwlx:"",cpx:""},currentPage:1,pageSize:15}},methods:{exportTable:function(){var t=this.filterDate.date?this.filterDate.date[0]:"",e=this.filterDate.date?this.filterDate.date[1]:"";window.open(window.baseurl+"report/exportGrtsqlReport.do?bm="+this.filterDate.bm+"&startDt="+t+"&endDt="+e+"&wtxmlx="+this.filterDate.xmlx+"&dwlx="+this.filterDate.dwlx+"&cpx="+this.filterDate.cpx+"&keyword="+this.filterDate.keyword)},handleCurrentChange:function(t){this.currentPage=t,this.grtsqlReport()},handleChangeFilter:function(t){this.filterDate=t,this.currentPage=1,this.grtsqlReport()},grtsqlReport:function(){var t=this;this.$get(this.API.grtsqlReport,{curPage:this.currentPage,pageSize:this.pageSize,bm:this.filterDate.bm,startDt:this.filterDate.date?this.filterDate.date[0]:"",endDt:this.filterDate.date?this.filterDate.date[1]:"",wtxmlx:this.filterDate.xmlx,dwlx:this.filterDate.dwlx,cpx:this.filterDate.cpx,keyword:this.filterDate.keyword}).then(function(e){"success"==e.state?t.dataList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},handleXxwt:function(t,e,i){var r={bm:this.filterDate.bm,startDt:this.filterDate.date?this.filterDate.date[0]:"",endDt:this.filterDate.date?this.filterDate.date[1]:"",wtxmlx:this.filterDate.xmlx,dwlx:this.filterDate.dwlx,cpxbh:this.filterDate.cpx,keyword:this.filterDate.keyword};(r.wtxgrbh=t[1],-1!=i[e].en.indexOf(","))&&i[e].en.split(",").forEach(function(t,e,i){0==e&&(r[t]=i[1])});var a=this.$router.resolve({path:"/report-list/questionlist.html",query:r});window.open(a.href,"_blank")}},mounted:function(){var t=this;this.$nextTick(function(){t.grtsqlReport()}),window.onerror=function(){return!0}},activated:function(){},watch:{},components:{tableComponent:r.a,filterComponent:n.a,tableComponents:a.a}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",[i("filterComponent",{attrs:{filterList:t.filterList,placeholder:"请输入姓名/工号"},on:{handleChangeFilter:t.handleChangeFilter}})],1),t._v(" "),i("div",[i("tableComponents",{attrs:{tableData:t.dataList,pageShow:!0,currentPage:t.currentPage,pageSize:t.pageSize,indexArr:[0,1,2,3],widthArr:[],Width:"140",Height:0},on:{handleCurrentChange:t.handleCurrentChange,handleXxwt:t.handleXxwt,exportTable:t.exportTable}})],1)])},staticRenderFns:[]};var o=i("VU/8")(l,s,!1,function(t){i("uMqi")},null,null);e.default=o.exports},uMqi:function(t,e){}});
//# sourceMappingURL=114.e3cf1fe2fcc07920a28c.js.map