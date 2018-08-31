<template>
<div>
    <div class="out-table">
        <table class="table table-cpxhx" border>
            <caption>产品线解决情况</caption>
               <tr v-if="tableData.head">
                   <th v-for="(th,i) in tableData.head">{{th.zh}}</th>
                </tr>
                <tr v-if="tableData.body.rows"  v-for="(body,i) in tableData.body.rows">
                    <td v-for="(td,j) in body">
                        <!-- <a  href="javaScript:void(0)" @click="handleXxwt(i)">{{td}}</a> -->
                        <span>{{td}}</span>
                    </td>
                </tr>
        </table>
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
         thList:[],
         tdList:[],
         limit:'',
         object:{},
         total:20
       }
   },
   updated(){
        this.total = this.tableData.body.records
        window.onerror = function(){ return true };

   },
  
   methods:{
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
