webpackJsonp([41],{VrEv:function(t,e){},"jn/G":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});n("t5DY"),n("mmiC");var a=n("oFuF"),r=n("aCns"),i={data:function(){return{dataList:{},headList:[],filterList:["keyword","yf","bm","rylx"],filterData:{keyword:"",yf:"",bm:"",rylx:[]},currentPage:1,pageSize:15}},methods:{exportTable:function(){window.open(window.baseurl+"report/exportydjlbb.do?bm="+this.filterData.bm+"&yf="+this.filterData.yf+"&rylx="+this.filterData.rylx.join(",")+"&keyword="+this.filterData.keyword)},handleCurrentChange:function(t){this.currentPage=t,this.ydjlb()},handleChangeFilter:function(t){this.filterData=t,this.currentPage=1,this.ydjlb()},ydjlb:function(){var t=this;this.$get(this.API.ydjlb,{curPage:this.currentPage,pageSize:this.pageSize,bm:this.filterData.bm,yf:this.filterData.yf,rylx:this.filterData.rylx.join(","),keyword:this.filterData.keyword}).then(function(e){"success"==e.state?t.dataList=e.data:t.$alert(e.msg,"提示",{confirmButtonText:"确定",type:"error"})})},handleXxwt:function(t,e,n){var a="",r=n[e].en.split(","),i={yf:this.filterData.yf,rygh:t[1]};"ysjs"==r[0]||"ysdcs"==r[0]||"wgjs"==r[0]||"wgdcs"==r[0]?(a="/khbbdetail/lcbxq",i.ydjl=1):"wtpf"!=r[0]&&"wtqwjs"!=r[0]&&"wtqwdcs"!=r[0]&&"wtcnjs"!=r[0]&&"wtcndcs"!=r[0]||(a="/khbbdetail/ydjlwtxq"),n[e].canRedirect&&(r[0]==r[1]||1==r.length?i[r[0]]=t[e]:r.forEach(function(t,e,n){0==e&&(i[t]=n[1])}));var l=this.$router.resolve({path:a,query:i});window.open(l.href,"_blank")}},mounted:function(){var t=this,e=(new Date).getFullYear()+"-"+((new Date).getMonth()+1<10?"0"+(new Date).getMonth()+1:(new Date).getMonth()+1);this.filterData.yf=Object(a.l)(e),this.$nextTick(function(){t.ydjlb()}),window.onerror=function(){return!0}},activated:function(){},watch:{},components:{filterComponent:n("NxvJ").a,tableComponents:r.a}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("filterComponent",{attrs:{filterList:t.filterList,placeholder:"请输入姓名/工号"},on:{handleChangeFilter:t.handleChangeFilter}})],1),t._v(" "),n("div",[n("tableComponents",{attrs:{tableData:t.dataList,pageShow:!0,currentPage:t.currentPage,pageSize:t.pageSize,indexArr:[1,2,3],widthArr:[6],Width:"130",Height:0},on:{handleCurrentChange:t.handleCurrentChange,handleXxwt:t.handleXxwt,exportTable:t.exportTable}})],1)])},staticRenderFns:[]};var o=n("Z0/y")(i,l,!1,function(t){n("VrEv")},null,null);e.default=o.exports}});
//# sourceMappingURL=41.f2734a4756017dbed346.js.map