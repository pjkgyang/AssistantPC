<template>
 <div>
      <el-dialog
            title="说明"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-pj">
                <section flex>
                    <span class="pj-title before-require">评价说明：</span>
                    <span class="pj-content">
                       <el-input type="textarea" :rows="5" :maxlength="500"  placeholder="请输入说明" v-model="sm"></el-input>
                    </span>
                </section>
                <section class="pj-btn-group">
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
         sm:""
     }
   },
   methods:{
       handleClose(){  
           this.visible = false
       },
       handleClickSure(){
           if(!this.validate()) return;
           this.$emit('handleClickSure',this.sm);
       },
       validate(){
           if(/^[\s]*$/.test(this.sm)){
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
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
               this.sm = ''
            }else{

            }
        }
    },
   components: {}
 }
</script>

<style scoped>
.dialog-pj{
    padding: 8px 10px;
}
.dialog-pj section:nth-of-type(2){
    margin: 10px 0;
}
.pj-title{
    font-weight: 700;
    width:14%;
}
.pj-content{
    width: 86%;
}
.pj-btn-group{
    text-align: right;
    padding: 10px 0;
}
 
</style>
