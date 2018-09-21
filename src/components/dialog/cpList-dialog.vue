<template>
 <div>
      <el-dialog
            title="产品列表"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div style="padding:15px">
                <el-table
                :data="tableData"
                border
                :max-height="500"
                style="width: 100%">
                    <el-table-column prop="cp_display" label="产品" show-overflow-tooltip></el-table-column>
                    <el-table-column
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)"  size="mini">修改</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <el-dialog width="700px" title="修改产品信息" :visible.sync="dialogEditTaskVisible" :close-on-click-modal="false"> 
            <enditTaskInfo @changeCPzrr="changeCPzrr" :xmbh="xmbh" :cpinfo="cpinfo"  :dialogEditTaskVisible="dialogEditTaskVisible"></enditTaskInfo>
        </el-dialog>
 </div>
</template>

<script>
 import { getProjectCatalog } from '@/api/xmfz.js'
 import enditTaskInfo from '@/components/BusinessPage/editTaskinfo.vue'
 export default {
   data () {
     return {
         visible:this.show,
         dialogEditTaskVisible:false,
         cpinfo:{},
         tableData: []
     }
   },
   methods:{
       handleClick(data){
           this.cpinfo = data;
           this.dialogEditTaskVisible = !this.dialogEditTaskVisible;
       },
       changeCPzrr(){
           this.dialogEditTaskVisible = false;
           this.visible = false;
       },
       getProjectCatalog(){
          getProjectCatalog({xmbh:this.xmbh}).then(({data})=>{
            if(data.state == 'success'){
                if(!!data.data){
                    this.tableData = data.data 
                }
           }
       })
    }, 
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        xmbh:{
            type:String,
            default:''
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
                
            }else{
                this.getProjectCatalog();
            }
        }
    },
   components: {enditTaskInfo}
 }
</script>

<style scoped>

</style>
