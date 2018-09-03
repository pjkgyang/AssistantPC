<template>
 <div>
      <el-dialog
            title="编辑"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-edit">
                <section flex v-if="isShow">
                    <span class="edit-title before-require">{{!isCljh?'工作内容':'处理计划'}}</span>
                    <span class="edit-content">
                        <el-input type="textarea" :rows="10" :maxlength="500" :placeholder="!isCljh?'请输入工作内容':'请输入处理计划'" v-model="form.gznr"></el-input>
                    </span>
                </section>
                <section flex v-if="yycsShow">
                    <span class="edit-title before-require">未完成原因</span>
                    <span class="edit-content">
                       <el-input type="textarea" :rows="5" :maxlength="500" placeholder="请输入未完成原因" v-model="form.wwcyy"></el-input>
                    </span>
                </section>
                <section flex v-if="yycsShow">
                    <span class="edit-title before-require">后续措施</span>
                    <span class="edit-content">
                       <el-input type="textarea" :rows="5" :maxlength="500"  placeholder="请输入后续措施" v-model="form.hxcs"></el-input>
                    </span>
                </section>
                <section class="edit-btn-group">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary"  @click="handleClickSure">确定</el-button>
                </section>
            </div>
        </el-dialog>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         visible:this.show,
         form:this.data
     }
   },
   methods:{
       handleClose(){  
           this.visible = false
       },
       handleClickSure(){
           if(!this.validate()) return;
           this.$emit('handleClickSure',this.form);
       },
       validate(){
           if(this.isShow && !this.form.gznr){
               this.$alert(this.isCljh?'请填写处理总结':'请填写工作内容', '提示', {confirmButtonText: '确定',type:'warning'});
               return false;
           }
        //    if(this.yycsShow && !this.form.wwcyy){
        //        this.$alert('请填写未完成原因', '提示', {confirmButtonText: '确定',type:'warning'});
        //        return false;
        //    }
        //    if(this.yycsShow && !this.form.hxcs){
        //        this.$alert('请填写后续措施', '提示', {confirmButtonText: '确定',type:'warning'});
        //        return false;
        //    }
           return true;
       }
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        isShow:{
            type: Boolean,
            default:false
        },
        yycsShow:{
            type: Boolean,
            default:true    
        },
    data:{
        type:Object,
        default:()=>{
            return {
                 gznr:'',
                 wwcyy:'',
                 hxcs:''
             }
          }
    },
    isCljh:{
        type: Boolean,
        default:false 
    }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
                // this.form.gznr = '' 
                // this.form.wwcyy = '' 
                // this.form.hxcs = '' 
                // this.data.gznr = '' 
                // this.data.wwcyy = '' 
                // this.data.hxcs = '' 
            }else{

            }
        }
    },
   components: {}
 }
</script>

<style scoped>
.dialog-edit{
    padding: 8px 10px;
}
.dialog-edit section:nth-of-type(2){
    margin: 10px 0;
}
.edit-title{
    font-weight: 700;
    width:14%;
}
.edit-content{
    width: 86%;
}
.edit-btn-group{
    text-align: right;
    padding: 10px 0;
}
 
</style>
