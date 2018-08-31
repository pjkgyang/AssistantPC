<template>
 <div>
     <table border class="monthReport-itemdetail-table">
        <tr>
            <td class="table-name">问题标题</td>
            <td :title="itemData.wtbt?itemData.wtbt:itemData.bt"><p>{{itemData.wtbt?itemData.wtbt:itemData.bt}}</p></td>
            <td class="table-name">发布人</td>
            <td><p>{{itemData.fbrxm}}</p></td>
            <td class="table-name">所属单位</td>
            <td :title="itemData.dwmc"><p>{{itemData.dwmc}}</p></td>
        </tr>
        <tr>
            <td class="table-name">所属项目</td>
            <td :title="itemData.xmmc"><p>{{itemData.xmmc}}</p></td>
            <td class="table-name">所属产品</td>
            <td :title="itemData.cpmc"><p>{{itemData.cpmc}}</p></td>
            <td class="table-name">问题类别</td>
            <td><p>{{itemData.wtlb_display?itemData.wtlb_display:itemData.wtlb}}</p></td>
        </tr>
        <tr>
            <td class="table-name">是否紧急</td>
            <td><p>{{itemData.sfjj_display?itemData.sfjj_display:itemData.sfjj}}</p></td>
            <td class="table-name">期望解决时间</td>
            <td><p>{{itemData.qwjjsj}}</p></td>
            <td class="table-name">承诺解决时间</td>
            <td><p>{{itemData.cnjjsj}}</p></td>
        </tr>
        <tr>
            <td class="table-name">当前处理环节</td>
            <td><p>{{itemData.wtlc}}</p></td>
            <td class="table-name">处理计划</td>
            <td><p>{{itemData.cljh}}</p></td>
        </tr>   
     </table>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   props:{
       itemData:{
           type:Object,
           default:()=>{
               return {}
           }
       },
       pzShow:{
         type:String,
         default:''  
       }
   },
   components: {}
 }
</script>

<style scoped>
.monthReport-itemdetail-table{
    border-color: #EBEEF5;
    width: 100%;
}
.monthReport-itemdetail-table td{
    border: 1px solid #EBEEF5;
    padding: 0 20px;
    color: #767881;
    font-size: 13px;
    width: 24%;
    max-width:360px;
}
.monthReport-itemdetail-table td p{
    width: 100%;
    white-space: pre-wrap;
}
.monthReport-itemdetail-table .table-name{
    width: 134px !important;
    height: 48px;
    background: #F5F7FA;
    font-size: 14px;
    color: #9EA7B4;
    font-weight: 700;
    white-space: nowrap;
}
 
</style>
