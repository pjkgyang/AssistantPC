<template>
<div>
    <div class="out-table">
          <el-table
    :data="tableData.rows"
    border
    class="report-ele-table"
    width="100%">
    <el-table-column v-for="(th,index) in tableHead" :key="index"  :label="th.zh"
     :width="th.en=='xmmc'||th.en=='xxmc'?260:120" show-overflow-tooltip>
         <template slot-scope="scope" >
            <span  @click="handleRouter(th.en,scope.row)">{{scope.row[index]}}</span>
            <!-- <a href="#">{{scope.row[index]}}</a> -->
      </template>
    </el-table-column>

  </el-table>
         </div>
         <div style="text-align:right;padding:10px 0">
            <pagination :currentPage="currentPage" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
    </div>
</template>
<script>
import pagination from '@/components/BusinessPage/pagination.vue'

export default {
   data(){
       return{
         thList:[{name:'都是',value:'2222'},{name:'都是',value:'2222'},{name:'都是',value:'2222'}],
         tdList:[],
         limit:'',
         object:{},
         total:20
       }
   },
   updated(){
        // this.total = this.tableData.body.records
        window.onerror = function(){ return true };
        console.log(this.tableData)
   },
  
   methods:{
       handleRouter(index,row){
           console.log(index)
           console.log(row)
       },
        handleXxwt(data){
            console.log(data)
        },
        handleCurrentChange(data){
          this.$emit('handleCurrentChange',data);    
        }
   },
   computed:{
       
   },
   props:{
       tableData:{
           type:Object,
           default:function(){
               return {}
           }
       },
       tableHead:{
           type:Array,
           default:function(){
               return []
           }
       },
        currentPage:{
            type:Number,
            default:1
        },
        pageSize:{
            type:Number,
            default:13   
        },
   },
   components:{pagination}

}
</script>
<style scoped>
.out-table{
    overflow-x: auto;
    width: 100%;
}
.table {
   border: 1px solid #ddd; 
   margin-bottom: 10px !important;
}
.table caption{
    border: 1px solid #ddd;
    border-bottom: none;
    text-align: center;
    background: #eee;
    font-size:18px;
    font-weight: 700;
    color: #000;
}
.table tr,.table th{
    height: 40px;
    text-align:center;
    white-space: nowrap;
    padding: 0 10px;
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 10px;
}
</style>
