webpackJsonp([55],{K2D7:function(t,e){},qmxB:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("t5DY"),a("mmiC");var i=a("oFuF"),r=a("aCns"),n={data:function(){return{dataList:{},headList:[],archiveShow:!1,filterList:["keyword","yf","bm","rylx"],filterData:{keyword:"",yf:"",bm:"",rylx:[]},currentPage:1,pageSize:15}},methods:{handleArchive:function(){var t=this;this.$confirm("是否确定封存此月数据?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$post(t.API.depositAssessmentData,{yf:t.filterData.yf,khlx:"1"}).then(function(e){"success"==e.state?e.data?(t.$alert("封存成功!","提示",{confirmButtonText:"确定",type:"success"}),t.archiveShow=!1):t.$alert("封存失败!","提示",{confirmButtonText:"确定",type:"error"}):t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})})},exportTable:function(){this.filterData.yf=this.filterData.yf?this.filterData.yf:"",window.open(window.baseurl+"assessment/exportydkhb.do?bm="+this.filterData.bm+"&yf="+this.filterData.yf+"&rylx="+this.filterData.rylx.join(",")+"&keyword="+this.filterData.keyword)},handleCurrentChange:function(t){this.currentPage=t,this.ydkhb()},handleChangeFilter:function(t,e){this.filterData=t,this.currentPage=1,this.ydkhb(),e&&this.hasDepositData()},hasDepositData:function(){var t=this;this.$get(this.API.hasDepositData,{yf:this.filterData.yf,khlx:"1"}).then(function(e){"success"==e.state&&(t.archiveShow=!e.data)})},ydkhb:function(){var t=this;this.$get(this.API.ydkhb,{curPage:this.currentPage,pageSize:this.pageSize,bm:this.filterData.bm,yf:this.filterData.yf,rylx:this.filterData.rylx.join(","),keyword:this.filterData.keyword}).then(function(e){"success"==e.state?t.dataList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},handleXxwt:function(t,e,a){var i="",r=a[e].en.split(","),n={yf:this.filterData.yf,rybh:t[0],rygh:t[1]};if(-1!=a[e].en.indexOf(",")&&(r[0]==r[1]?n[r[0]]=t[e]:r.forEach(function(t,e,a){0==e&&(n[t]=a[1])})),"lcbjs"==r[0]||"lcbdcs"==r[0])i="/khbbdetail/lcbxq",delete n.rybh;else if("wtsljs"==r[0]||"wtslaqwcs"==r[0]||"dyslzs"==r[0]||"aqsl"==r[0])i="/khbbdetail/wt",delete n.rygh;else if("tscls"==r[0])i="/khbbdetail/ts",delete n.rybh;else if("rbbts"==r[0])i="/rbdetail",n.sfbt="1",n.sfglpz="0",delete n.rygh;else{if("zbbts"!=r[0])return;i="/zbdetail",n.sfbt="1",n.sfglpz="0",delete n.rygh}var s=this.$router.resolve({path:i,query:n});window.open(s.href,"_blank")}},mounted:function(){var t=this,e=(new Date).getFullYear()+"-"+((new Date).getMonth()+1<10?"0"+((new Date).getMonth()+1):(new Date).getMonth()+1);this.filterData.yf=Object(i.m)(e),this.$nextTick(function(){t.ydkhb()}),this.hasDepositData()},activated:function(){},watch:{},components:{filterComponent:a("NxvJ").a,tableComponents:r.a}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("filterComponent",{attrs:{filterList:t.filterList,placeholder:"请输入姓名/工号"},on:{handleChangeFilter:t.handleChangeFilter}})],1),t._v(" "),a("div",[a("tableComponents",{attrs:{tableData:t.dataList,pageShow:!0,currentPage:t.currentPage,pageSize:t.pageSize,indexArr:[1,2,4],widthArr:[],Width:"150",Height:0,archiveShow:t.archiveShow},on:{handleCurrentChange:t.handleCurrentChange,handleXxwt:t.handleXxwt,exportTable:t.exportTable,handleArchive:t.handleArchive}})],1)])},staticRenderFns:[]};var h=a("Z0/y")(n,s,!1,function(t){a("K2D7")},null,null);e.default=h.exports}});
//# sourceMappingURL=55.7dd7aee7347921c7de2f.js.map