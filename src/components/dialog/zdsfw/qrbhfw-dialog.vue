<template>
 <div>
      <el-dialog
            :title="title"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-qrbhfw">
                   <div flex v-if=" title == '确认服务'">
                       <span class="filter-weight before-require">评价</span>&#x3000;
                       <el-rate v-model="form.pf"  :show-text="true"  :texts="['1分', '2分', '3分', '4分', '5分']"></el-rate>
                   </div>
                    <div flex class="mg-12">
                       <span class="filter-weight before-require">说明</span>&#x3000;
                       <el-input type="textarea"  :rows="5" placeholder="请输入说明内容" v-model="form.sm" style="width:580px"></el-input>
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
             pf:null,
             sm:''
         }
     }
   },
   methods:{
       handleClose(){  
           this.visible = false
       },
       handleCommit(){
        if(!this.validate()) return;
        this.$emit('handleCommitQR',this.form) 
       },
       validate(){
           if(!this.form.pf && this.title == '确认服务'){
               this.$alert('请选择评价星级!', '提示', {confirmButtonText: '确定',type:'warning'});
               return false;
           }
           if(!this.form.sm){
               this.$alert('请填写说明内容!', '提示', {confirmButtonText: '确定',type:'warning'});
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
        title:{
            type:String,
            default:'确认服务'
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              this.form.sm = '';
              this.form.pf = null;
            }else{

            }
        }
    },
   components: {}
 }
</script>

<style scoped>
.dialog-qrbhfw{
    padding:15px 30px;
}
 
</style>
