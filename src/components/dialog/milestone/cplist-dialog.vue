<template>
 <div>
     <el-dialog
            title="产品列表"
            width="800px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="pd-10">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        :max-height="600"
                        border
                        >
                        <el-table-column  prop="cpbh" label="产品编号" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column  prop="cpmc" label="产品名称" min-width="160" ></el-table-column>
                        <el-table-column  prop="ssgzl" label="实施工作量(人/月)"  width="140"></el-table-column>
                        <el-table-column  prop="ekgzl" label="二开工作量(人/月)" width="140"  ></el-table-column>
                        <el-table-column  prop="kbgzl" label="可变费用(元)"   width="120"></el-table-column>
                    </el-table> 
                </div>
      </el-dialog>
 </div>
</template>

<script>
 import { getMenu, getSession } from "@/utils/util.js";
 export default {
   data () {
     return {
          visible:this.show,
     }
   },
   methods:{
      handleClose(){
         this.visible = false; 
      },
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       tableData:{
         type:Array,
         default:()=>{
           return [];
         }
       },
   },
     watch: {
        show(n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{
             
            }
        },
    },
   components: {}
 }
</script>

<style scoped>

 
</style>
