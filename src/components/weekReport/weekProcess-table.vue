<template>
 <div>
     <table border class="monthReport-itemdetail-table">
        <tr>
            <td class="table-name">项目编号</td>
            <td><p>{{itemData.xmbh}}</p></td>
            <td class="table-name">项目名称</td>
            <td><p>{{itemData.xmmc}}</p></td>
            <td class="table-name">产品名称</td>
            <td><p>{{itemData.cpmc_display}}</p></td>
        </tr>
        <tr>
            <td class="table-name">责任人</td>
            <td><p>{{itemData.zrrxm}}</p></td>
            <td class="table-name">任务名称</td>
            <td><p>{{itemData.rwmc_display}}</p></td>
            <td class="table-name">创建人</td>
            <td><p>{{itemData.cjrxm}}</p></td>
        </tr>
        <tr>
            <td class="table-name">未完成原因</td>
            <td><p>{{itemData.wwcyy}}</p></td>
            <td class="table-name">后续措施</td>
            <td><p>{{itemData.hxcs}}</p></td>
            <td class="table-name">工作内容</td>
            <td :title="itemData.gzms"><p>{{itemData.gzms}}</p></td>
        </tr>
        <tr>

            <td class="table-name">批注</td>
            <td><p>{{itemData.pzzs==0?'无':itemData.pzzs+'人批注'}}</p></td>
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
