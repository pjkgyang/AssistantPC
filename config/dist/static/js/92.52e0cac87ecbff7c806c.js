webpackJsonp([92],{DkgI:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("t5DY"),a("mmiC"),a("oFuF");var i=a("GLli"),n=a("aCns"),r=a("NxvJ"),l={data:function(){return{dataList:{},headList:[],filterList:["date","lb","lcbxmlx"],filterDate:{lcbxmlx:"",date:"",lb:"2"},currentPage:1,pageSize:15}},methods:{exportTable:function(){var t=this.filterDate.date?this.filterDate.date[0]:"",e=this.filterDate.date?this.filterDate.date[1]:"";window.open(window.baseurl+"report/exportYswgphb.do?startDt="+t+"&endDt="+e+"&completionType="+this.filterDate.lb+"&milestoneProjectType="+this.filterDate.lcbxmlx+"&lx=4")},handleCurrentChange:function(t){this.currentPage=t,this.yswgphb()},handleChangeFilter:function(t){this.filterDate=t,this.currentPage=1,this.yswgphb()},yswgphb:function(){var t=this;this.$get(this.API.yswgphb,{curPage:this.currentPage,pageSize:this.pageSize,startDt:this.filterDate.date?this.filterDate.date[0]:"",endDt:this.filterDate.date?this.filterDate.date[1]:"",completionType:this.filterDate.lb,milestoneProjectType:this.filterDate.lcbxmlx,lx:4}).then(function(e){"success"==e.state?t.dataList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},handleXxwt:function(t,e,a){var i=a[e].en.split(","),n={completionType:this.filterDate.lb,milestoneProjectType:this.filterDate.lcbxmlx,startDt:this.filterDate.date?this.filterDate.date[0]:"",endDt:this.filterDate.date?this.filterDate.date[1]:""};(n[a[1].en]=t[1],-1!=a[e].en.indexOf(",")&&i[0]!=i[1])?a[e].en.split(",").forEach(function(t,e,a){0==e&&(n[t]=a[1])}):n[i[0]]=t[e];var r=this.$router.resolve({path:"/yswgdetail",query:n});window.open(r.href,"_blank")}},mounted:function(){var t=this;this.$nextTick(function(){t.yswgphb()}),window.onerror=function(){return!0}},activated:function(){},watch:{},components:{tableComponent:i.a,filterComponent:r.a,tableComponents:n.a}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("filterComponent",{attrs:{filterList:t.filterList,placeholder:"请输入区域名称"},on:{handleChangeFilter:t.handleChangeFilter}})],1),t._v(" "),a("div",[a("tableComponents",{attrs:{tableData:t.dataList,pageShow:!0,currentPage:t.currentPage,pageSize:t.pageSize,indexArr:[],widthArr:[],Width:"auto",Height:0},on:{handleCurrentChange:t.handleCurrentChange,handleXxwt:t.handleXxwt,exportTable:t.exportTable}})],1)])},staticRenderFns:[]};var o=a("Z0/y")(l,s,!1,function(t){a("pza1")},null,null);e.default=o.exports},pza1:function(t,e){}});
//# sourceMappingURL=92.52e0cac87ecbff7c806c.js.map