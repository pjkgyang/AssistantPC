<template>
<div>
    <div text-right class="mb-12">
        <el-button type="primary" size="mini" @click="exportTable">导出</el-button>
    </div>
    <div class="out-table">
        <table class="table table-cpxhx" :style="{width:width}" border>
            <!-- <caption>产品线解决情况</caption> -->
                <thead> 
                    <tr v-if="tableData.head">
                    <th v-for="(th,i) in tableData.head" v-if="!th.hidden">{{th.zh}}</th>
                    </tr>
                </thead>
                <tbody :style="{height:height}">
                    <tr v-if="bodyData"  v-for="(body,k) in bodyData">
                        <td v-for="(td,j) in body" v-if="!tableData.head[j].hidden">
                            <!-- <a  href="javaScript:void(0)" @click="handleXxwt(j)">{{td}}</a> -->
                            <span :title="td" v-if="!tableData.head[j].canRedirect">{{td}}</span>
                            <a v-else href="javaScript:void(0)" @click="handleXxwt(body,j)" :title="td">{{td}}</a>
                            <!-- <span v-else @click="handleXxwt(td,j)">{{td}}</span> -->
                        </td>
                    </tr>
                </tbody>
        </table>
        </div>
        <div style="text-align:right;padding:10px 0" v-if="pageShow">
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
         total:20,
         bodyData:[]
       }
   },
   updated(){
        this.total = this.tableData.body.records
        if(!!this.tableData.body.rows){
            this.bodyData = this.tableData.body.rows
        }else{
            this.bodyData = this.tableData.body
        }
   },
  
   methods:{
        exportTable(){
            this.$emit('exportTable','')  
        },
        handleCurrentChange(data){
          this.$emit('handleCurrentChange',data);    
        },
        handleXxwt(data,i){
            // console.log(data);
            // console.log(data[i]);
            // console.log(this.tableData.head[i]);
            // return;
            this.$emit('handleXxwt',data,i,this.tableData.head);
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
        pageShow:{
            type:Boolean,
            default:true
        },
        width:{
            type:String,
            default:'2500px'
        },
        height:{
            type:String,
            default:'58vh'
        }
   },
   watch:{
       tableData(){
            
       }
   },
   components:{pagination}

}
</script>
<style scoped>
.out-table{
    width: 100%;
    overflow-x: auto;
}
.table{
    border: 1px solid #ebeef5;
}
.table thead {
    width: calc( 100% - 1.2em ) !important;
    background: #f5f7fa;
}
.table thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}
.table tbody{
    display: block;
    /* height:58vh; */
    width: 100%;
    overflow-y: scroll;
}
.table caption{
    border: 1px solid #ebeef5;
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
    border-right: 1px solid #ebeef5;
    padding: 0;
    margin: 0;
    vertical-align:middle;
}
/* .table td:first-child,.table th:first-child{
    width: 12%;
} */
.table tr:last-child{
   border-bottom: 1px solid #ebeef5; 
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-right: 1px solid #ebeef5;
}

</style>
