<template>
 <div>
     <el-dialog
            title="操作记录"
            width="1000px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div style="padding:10px;">
                <section>
                    <el-table :data="tableData" style="width: 100%" :max-height="580" border>
                        <el-table-column prop="xgsj" label="修改时间" width="160"></el-table-column>
                        <el-table-column prop="xgsm" label="修改说明" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xgqzt" label="修改前状态" width="100"></el-table-column>
                        <el-table-column prop="xgqzt" label="修改后状态" width="100"></el-table-column>
                        <el-table-column prop="lcbbh" label="里程碑编号"  show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xgrbh" label="修改人编号" width="100"></el-table-column>
                        <el-table-column prop="xgrxm" label="修改人姓名" width="100"></el-table-column>
                      </el-table>
                </section>
            </div>
            <div text-right class="pd-10">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                 </el-pagination>
            </div>
            <div text-right class="pd-10">
                <el-button size="mini" type="danger" @click="handleCloseDialog">关闭</el-button>
            </div>
      </el-dialog>
 </div>
</template>

<script>
import { queryMilestoneOperationrecords } from "@/api/milestone.js";
 export default {
   data () {
     return {
          visible:this.show,
          currentPage:1,
          pageSize:15,
          total:0,
          tableData: []
     }
   },
   methods:{
       handleCloseDialog(){
           this.visible = false;
       },
       handleCurrentChange(data){
           this.currentPage = data;
           this.queryMilestoneOperationrecords();
       },
       handleSizeChange(data){
           this.pageSize = data;
           this.currentPage = 1;
           this.queryMilestoneOperationrecords();
       },
       queryMilestoneOperationrecords(){
           queryMilestoneOperationrecords({
               curPage:this.currentPage,
               pageSize:this.pageSize,
               lcbbh:this.lcbbh
           }).then(({data})=>{
               if(data.state == 'success'){
                   if(!!data.data){
                       this.tableData = data.data.rows
                       this.total = data.data.records
                   }else{
                       this.tableData = []
                       this.total = 0
                   }
               }
           })
       }
       
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       lcbbh:{
         type:String,
         default:''  
       }
   },
     watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{
                this.queryMilestoneOperationrecords();
            }
        }
    },
   components: {}
 }
</script>

<style scoped>

 
</style>
