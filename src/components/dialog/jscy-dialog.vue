<template>
 <div>
      <el-dialog
            title="申请团队成员"
            :width="tableWidth"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-jssqcx">
                <div>
                    <tableComponents :tableData="tableData" :exportShow="false" :widthArr="[2]" :indexArr="[]" :Width="'130'"
                    @handleXxwt="handleXxwt" :Height="260" :pageShow="false"></tableComponents>
                </div>
            </div>
        </el-dialog>
 </div>
</template>

<script>
import tableComponents from '@/components/reportTable/tableComponents.vue'
 export default {
   data () {
     return {
         visible:this.show,
         tableWidth:'80vw',
         tableData:{}
     }
   },
   methods:{
       handleClose(){  
           this.visible = false
       },
       handleXxwt(data,i,params){
           
       }
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        wid:{
            type:String,
            default:""
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
               
            }else{
                this.$get(this.API.settlementTeamMembers,{
                    curPage:1,
                    pageSize:999,
                    wid:this.wid
                }).then(res=>{
                    if(res.state == 'success'){
                        this.tableData = res.data
                    }
                })
            }
        }
    },
   components: {tableComponents}
 }
</script>

<style scoped>
.dialog-jssqcx{
    padding: 8px 10px;
}

 
</style>
