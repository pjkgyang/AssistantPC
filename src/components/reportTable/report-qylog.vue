<template>
    <div class="out-table">
        <table class="table media-table" >
            <caption>区域日报报表</caption>
                <thead>
                  <tr>
                    <th>日期</th>
                    <th>区域名称</th>
                    <!-- <th>区域工程总</th> -->
                    <th>战队名称</th>
                    <th>战队队长</th>
                    <th>战队人数</th>
                    <th>应填日报人数</th>
                    <th>请假人数</th>
                    <th>未填日报人数</th>
                    <th>补填日报人数</th>
                    <th>战队队长未阅人数</th>
                    <th>区域总未阅人数</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(qyrb,i) in tableData" :key="i">
                    <td :title="qyrb.rq">{{qyrb.rq}}</td>
                    <td :title="qyrb.qymc">{{qyrb.qymc}}</td>
                    <!-- <td :title="qyrb.qyzxm">{{qyrb.qyzxm}}</td> -->
                    <td :title="qyrb.qyzd">{{qyrb.qyzd}}</td>
                    <td :title="qyrb.zddzxm">{{qyrb.zddzxm}}</td>
                    <td><span @click="handleQylog({qy:qyrb.qymc,rq:qyrb.rq,zdwid:qyrb.wid},'')" class="router-mx">{{qyrb.zdryzs}}</span></td>
                    <td><span @click="handleQylog({qy:qyrb.qymc,rq:qyrb.rq,zdwid:qyrb.wid},'1')" class="router-mx">{{qyrb.ytzs}}</span></td>
                    <td><span @click="handleQylog({qy:qyrb.qymc,rq:qyrb.rq,zdwid:qyrb.wid},'2')" class="router-mx">{{qyrb.qjzs}}</span></td>
                    <td><span @click="handleQylog({qy:qyrb.qymc,rq:qyrb.rq,zdwid:qyrb.wid},'3')" class="router-mx">{{qyrb.wtrbzs}}</span></td>
                    <td><span @click="handleQylog({qy:qyrb.qymc,rq:qyrb.rq,zdwid:qyrb.wid},'4')" class="router-mx">{{qyrb.btrbzs}}</span></td>
                    <td><span @click="handleQylog({qy:qyrb.qymc,rq:qyrb.rq,zdwid:qyrb.wid},'5')"class="router-mx">{{qyrb.zddzwys}}</span></td>
                    <td><span @click="handleQylog({qy:qyrb.qymc,rq:qyrb.rq,zdwid:qyrb.wid},'6')" class="router-mx">{{qyrb.qyzwys}}</span></td>
                </tr>
                <tr v-if="tableData.length == 0">
                     <td>暂无内容</td>
                </tr>
            </tbody>
             <tfoot>
                 <tr>
                     <td colspan="4">总计</td>
                     <td>{{total.zdzrs}}</td>
                     <td>{{total.ytrbzs}}</td>
                     <td>{{total.qjzrs}}</td>
                     <td>{{total.wtrbzrs}}</td>
                     <td>{{total.btrbzrs}}</td>
                     <td>{{total.zddzwyrs}}</td>
                     <td>{{total.qyzwyrs}}</td>
                 </tr>
             </tfoot>
        </table>
    </div>
</template>
<script>
export default {
   data(){
       return{
          zdryzsTotal:0,

       }
   },
   updated(){
 
   },
   activated(){

   },
   mounted(){

   },

   methods:{
      handleQylog(qyinfo,data){
        let routeData = this.$router.resolve({
            name: "LogPannal1",
            query:{
                qyrq:qyinfo.rq,
                qymc:qyinfo.qy,
                zdwid:qyinfo.zdwid,
                ryfw:data
            }
        });
        window.open(routeData.href, '_blank'); 
      }
   },
   props:{
       tableData:{
           type:Array,
           default:function(){
               return []
           }
       },
       total:{
           type:Object,
           default:function(){
               return {}
           }
       },
       qy:{
          type:String,
          default:''
       }
   },
   watch:{
     
   }
}
</script>
<style scoped>
.out-table{
    overflow-y: hidden;
}
.table{
    border: 1px solid #ddd;
    /* width: 100%; */
    width: 1500px;
}
.table thead,.table tfoot{
    width: calc( 100% - 1.2em ) !important;
}
.table thead, tbody tr,.table tfoot {
    display:table;
    width:100%;
    table-layout:fixed;
}
.table tbody{
    display: block;
    height:64vh;
    width: 100%;
    overflow-y: scroll;
}

.table caption{
    border: 1px solid #ddd;
    border-bottom: none;
    text-align: center;
    background: #eee !important;
    font-size:18px;
    font-weight: 700;
    color: #000;
}
.table tr,.table th{
    height: 37px !important;
    text-align:center;
    border-right: 1px solid #ddd;
    padding: 0;
    margin: 0;
    vertical-align:middle;
}
.table tr:last-child{
   border-bottom: 1px solid #ddd; 
}
.table td{
    /* text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; */
    border-right: 1px solid #ddd;
}
.router-mx{
    color: rgb(61, 126, 211);
}
.router-mx:hover{
    cursor: pointer;
    text-decoration: underline;
}

</style>
