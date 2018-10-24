<template>
 <div>
     <el-dialog
            title="批注详情"
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
                        <el-table-column prop="yhxm" label="批注人" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column  prop="createTime" label="批注日期" width="160" v-if="!rbshow"></el-table-column>
                        <el-table-column  prop="comment" label="批注内容"  show-overflow-tooltip  v-if="!rbshow"></el-table-column>
                        <el-table-column  prop="ydsj" label="批注日期" width="160"  v-if="rbshow"></el-table-column>
                        <el-table-column  prop="bz" label="批注内容"  show-overflow-tooltip  v-if="rbshow"></el-table-column>
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
       rbshow:{
         type:Boolean,
           default:false
       }
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
