webpackJsonp([143],{"7Grw":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});i("t5DY"),i("mmiC"),i("oFuF");var a=i("GLli"),r=i("aCns"),n=i("NxvJ"),l={data:function(){return{dataList:{},headList:[],filterList:["qygc","date","dwlx","xmlx"],filterDate:{xmlx:"",gczd:"",date:"",dwlx:""},currentPage:1}},methods:{exportTable:function(){var t=this.filterDate.date?this.filterDate.date[0]:"",e=this.filterDate.date?this.filterDate.date[1]:"";window.open(window.baseurl+"report/exportCptsqlReport.do?qyzd="+this.filterDate.gczd+"&startDt="+t+"&endDt="+e+"&wtxmlx="+this.filterDate.xmlx+"&dwlx="+this.filterDate.dwlx)},handleChangeFilter:function(t){this.filterDate=t,this.cptsqlReport(),this.currentPage=1},cptsqlReport:function(){var t=this;this.$get(this.API.cptsqlReport,{qygc:this.filterDate.gczd,startDt:this.filterDate.date?this.filterDate.date[0]:"",endDt:this.filterDate.date?this.filterDate.date[1]:"",wtxmlx:this.filterDate.xmlx,dwlx:this.filterDate.dwlx}).then(function(e){"success"==e.state?t.dataList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},handleXxwt:function(t,e,i){var a={qyzd:this.filterDate.gczd,startDt:this.filterDate.date?this.filterDate.date[0]:"",endDt:this.filterDate.date?this.filterDate.date[1]:"",wtxmlx:this.filterDate.xmlx,dwlx:this.filterDate.dwlx};(a.cpxbh=t[1],-1!=i[e].en.indexOf(","))&&i[e].en.split(",").forEach(function(t,e,i){0==e&&(a[t]=i[1])});var r=this.$router.resolve({path:"/report-list/questionlist.html",query:a});window.open(r.href,"_blank")}},mounted:function(){var t=this;this.$nextTick(function(){t.cptsqlReport()})},activated:function(){},watch:{},components:{tableComponent:a.a,filterComponent:n.a,tableComponents:r.a}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("div",[e("filterComponent",{attrs:{filterList:this.filterList},on:{handleChangeFilter:this.handleChangeFilter}})],1),this._v(" "),e("div",[e("tableComponents",{attrs:{tableData:this.dataList,pageShow:!1,Width:"140",Height:370,widthArr:[2]},on:{exportTable:this.exportTable,handleXxwt:this.handleXxwt}})],1)])},staticRenderFns:[]};var d=i("VU/8")(l,s,!1,function(t){i("n6F5")},null,null);e.default=d.exports},n6F5:function(t,e){}});
//# sourceMappingURL=143.f1f0ac19e18f2d988a82.js.map