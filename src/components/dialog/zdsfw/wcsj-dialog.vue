<template>
 <div>
      <el-dialog
            title="调整服务计划"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-qrfw">
                   <div>
                       <span class="qrfw-title">原服务计划完成时间:</span>
                       <el-input size="mini"  placeholder="请输入内容"  v-model="yjhwcsj" readonly style="width:250px"></el-input>
                   </div>
                    <div style="margin:10px 0;">
                       <span class="qrfw-title">目标服务计划完成时间:</span>
                       <el-date-picker size="mini"  v-model="mbjhwcsj" type="date" style="width:250px"
                        placeholder="选择日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                   </div>
                   <div flex>
                       <span class="qrfw-title">说明:</span>
                       <el-input
                        style="width:470px"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入说明内容"
                        v-model="smValue">
                        </el-input>
                   </div><br>
                   <div text-right>
                       <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>&#x3000;
                       <el-button size="mini"  @click="handleClose">取消</el-button>
                   </div>
            </div>
        </el-dialog>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         visible:this.show,
         yjhwcsj:'',
         mbjhwcsj:'',
         smValue:''
     }
   },
   methods:{
       handleCommit(){

       },
       handleClose(){  
           this.visible = false
       },
     
   },
   props:{
        show: {
            type: Boolean,
            default:false
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{

            }
        }
    },
   components: {}
 }
</script>

<style lang="scss" scoped>
.dialog-qrfw{
    padding:15px 30px;
     .qrfw-title{
        display: inline-block;
        width:150px !important;
        font-weight: 700;
        text-align: right;
    }
}

</style>
