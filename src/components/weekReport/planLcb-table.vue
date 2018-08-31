   <template>
 <div>
     <table border class="monthReport-itemdetail-table">
        <tr>
            <td class="table-name">项目编号</td>
            <td><p>{{itemData.xmbh}}</p></td>
            <td class="table-name">项目名称</td>
            <td><p>{{itemData.xmmc}}</p></td>
            <td class="table-name">项目内容</td>
            <td :title="itemData.xmnr"><p>{{itemData.xmnr}}</p></td>
        </tr>
        <tr>
            <td class="table-name">工作内容</td>
            <td><p>{{itemData.gznr}}</p></td>
            <td class="table-name">里程碑描述</td>
            <td :title="itemData.lcbms"><p>{{itemData.lcbms}}</p></td>
            <td class="table-name">里程碑状态</td>
            <td><p>{{itemData.zt_display}}</p></td>
        </tr>
        <tr>
            <td class="table-name">计划完成时间</td>
            <td><p>{{itemData.jhjssj}}</p></td>
            <td class="table-name">承诺完成时间</td>
            <td><p>{{itemData.cnjssj}}</p></td>
            <td class="table-name">完成状态</td>
            <td><p>{{itemData.zt_display}}</p></td>
        </tr> 
        <tr>

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

   
   
 