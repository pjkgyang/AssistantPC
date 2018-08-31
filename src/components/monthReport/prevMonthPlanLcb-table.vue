   <template>
 <div>
     <table border class="monthReport-itemdetail-table">
        <tr>
            <td class="table-name">项目编号</td>
            <td><p>{{itemData.xmbh}}</p></td>
            <td class="table-name">项目名称</td>
            <td><p>{{itemData.xmmc}}</p></td>
            <td class="table-name">项目内容</td>
            <td :title="itemData.xmnr_display"><p>{{itemData.xmnr_display}}</p></td>
        </tr>
        <tr>
            <td class="table-name">产品名称</td>
            <td><p>{{itemData.cpmc}}</p></td>
            <td class="table-name">里程碑描述</td>
            <td :title="itemData.lcbms_display"><p>{{itemData.lcbms_display}}</p></td>
            <td class="table-name">里程碑状态</td>
            <td><p>{{itemData.zt_display}}</p></td>
        </tr>
        <tr>
           
            <td class="table-name">责任人</td>
            <td ><p>{{itemData.zrrxm}}</p></td>
            <td class="table-name">项目经理</td>
            <td ><p>{{itemData.xmjlxm}}</p></td>
            <td class="table-name">战队队长</td>
            <td><p>{{itemData.zddzxm}}</p></td>
        </tr> 
        <!-- 非金智不显示 1老师 -->
         <tr v-if="isJzuser != 1">
             <td class="table-name">完工量</td>
            <td ><p>{{itemData.wglg}}</p></td>
            <td class="table-name">合同金额（元）</td>
            <td ><p>{{itemData.htje}}</p></td>
            <td class="table-name">合同毛收入（元）</td>
            <td><p>{{itemData.htmsr}}</p></td>
        </tr> 
        <tr>
            <td class="table-name">未完成原因</td>
            <td ><p>{{itemData.wwcyy}}</p></td>
            <td class="table-name">后续措施</td>
            <td ><p>{{itemData.hxcs}}</p></td>
            <td class="table-name">计划完成时间</td>
            <td><p>{{itemData.jhjssj}}</p></td>
        </tr> 
        <tr>
            <td class="table-name">承诺完成时间</td>
            <td><p>{{itemData.cnjssj}}</p></td>
            <td v-if="pzShow" class="table-name">批注</td>
            <td v-if="pzShow"><p>{{itemData.pzzs==0?'无':itemData.pzzs+'人次批注'}}</p></td>
        </tr>   
     </table>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         isJzuser:""
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
           type:Boolean,
           default:false
       }
   },
   mounted(){
      this.isJzuser = sessionStorage.isJZuser
      console.log(this.isJzuser)
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

   
   
 