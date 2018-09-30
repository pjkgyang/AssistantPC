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
                       <span class="qrfw-title before-require">原服务计划完成时间:</span>
                        <el-date-picker size="mini"  v-model="yjhwcsj" readonly type="date" style="width:250px"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                   </div>
                    <div style="margin:10px 0;">
                       <span class="qrfw-title before-require">目标服务计划完成时间:</span>
                       <el-date-picker size="mini" :picker-options="pickerBeginDate"  v-model="form.mbjhwcsj" type="date" style="width:250px"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                   </div>
                   <div flex>
                       <span class="qrfw-title before-require">说明:</span>
                       <el-input
                            style="width:470px"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入说明内容"
                            v-model="form.sm">
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
         form:{
            mbjhwcsj:'',
            sm:''
         },
          pickerBeginDate: {
            disabledDate(time) {
            let curDate = new Date().getTime();
            return (
                time.getTime() < Date.now() - 8.64e7
            );
         }
      },
     }
   },
   methods:{
       handleCommit(){
           if(!this.validate()) return;
           this.$emit('handleCommitTZJH',this.form)
       },
       handleClose(){  
           this.visible = false
       },
       validate(){
           if(!this.form.mbjhwcsj){
               this.$alert('请选择目标服务计划完成时间', '提示', {confirmButtonText: '确定',type:'warning'});
               return false;
           }
           if(!this.form.sm){
               this.$alert('请填写说明内容', '提示', {confirmButtonText: '确定',type:'warning'});
               return false;
           }
           return true;
       }
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        yjhwcsj:{
            type:String,
            default:''
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
                this.form.sm = '';
                this.form.mbjhwcsj = '';
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
        width:155px !important;
        font-weight: 700;
        text-align: right;
    }
}

</style>
