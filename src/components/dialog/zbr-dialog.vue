<template>
 <div>
     <el-dialog
            title="选择中标人"
            width="750px"
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
                        <el-table-column
                            fixed="left"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" size="mini">编辑</el-button>
                            </template>
                          </el-table-column>
                        <el-table-column prop="fbbh" label="分包编号" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="fbmc" label="分包名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="zbrxm" label="中标人" width="120"></el-table-column>
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
      handleClick(row) {
        this.$emit('handlemodifyZbr',row);
      },
      listZbxx(){
        this.$get(this.API.listZbxx,{xmbh:this.xmbh}).then((res)=>{
            if(res.state == 'success'){
                this.tableData = res.data;
            }
        }) 
      }
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       xmbh:{
          type:String,
          default:''      
       },
       count:{
         type:Number,
         default:0
       }
   },
     watch: {
        show(n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{
              this.listZbxx();
            }
        },
        count(){
          this.listZbxx();
        }
    },
   components: {}
 }
</script>

<style scoped>

 
</style>
