webpackJsonp([105],{KdbH:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("t5DY"),a("mmiC");var i=a("oFuF"),r=a("aCns"),n={data:function(){return{gczdList:[],xmlxList:[],xmlx:"",gczd:"",dataList:{},headList:[],keyword:"",filterList:["qygc","date","keyword"],filterDate:{gczd:"",date:"",keyword:""},currentPage:1,pageSize:15}},methods:{exportTable:function(){var t=this.filterDate.date?this.filterDate.date[0]:"",e=this.filterDate.date?this.filterDate.date[1]:"";window.open(window.baseurl+"usageReport/exportProblemsameIPStat.do?qygc="+this.filterDate.gczd+"&startDt="+t+"&endDt="+e+"&keyword="+this.filterDate.keyword)},handleCurrentChange:function(t){this.currentPage=t,this.problemsameIPStat()},handleChangeFilter:function(t){this.currentPage=1,this.filterDate=t,this.problemsameIPStat()},problemsameIPStat:function(t){var e=this;this.$get(this.API.problemsameIPStat,{curPage:this.currentPage,pageSize:this.pageSize,qygc:this.filterDate.gczd,startDt:this.filterDate.date?this.filterDate.date[0]:"",endDt:this.filterDate.date?this.filterDate.date[1]:"",keyword:this.filterDate.keyword}).then(function(t){"success"==t.state&&(e.dataList=t.data)})}},mounted:function(){null==Object(i.n)("gczd")?Object(i.i)("gczd",this.gczdList,!0):this.gczdList=Object(i.n)("gczd"),this.problemsameIPStat()},activated:function(){},watch:{},components:{filterComponent:a("NxvJ").a,tableComponents:r.a}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("filterComponent",{attrs:{filterList:t.filterList,placeholder:"请输入问题标题/提问人/受理人"},on:{handleChangeFilter:t.handleChangeFilter}})],1),t._v(" "),a("div",[a("tableComponents",{attrs:{tableData:t.dataList,pageShow:!0,currentPage:t.currentPage,pageSize:t.pageSize,indexArr:[0,1],widthArr:[0,2],Width:"130",Height:0},on:{handleCurrentChange:t.handleCurrentChange,exportTable:t.exportTable}})],1)])},staticRenderFns:[]};var d=a("VU/8")(n,s,!1,function(t){a("j5ol")},null,null);e.default=d.exports},j5ol:function(t,e){}});
//# sourceMappingURL=105.8196dc3ba8570542e7a4.js.map