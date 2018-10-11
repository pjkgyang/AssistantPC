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
                        <el-table-column prop="name" label="批注人" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="date" label="批注日期" width="140"></el-table-column>
                        <el-table-column prop="address" label="批注内容"  show-overflow-tooltip></el-table-column>
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
          tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-08',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-06',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-07',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }],
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
