<template>
 <div>
      <el-dialog
            title="提报服务"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-tbfw">
               <form action="">
                   <div flex>
                       <span class="filter-weight before-require">提报说明：</span>&nbsp;
                       <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.sm" style="width:550px"></el-input>
                   </div><br>
                   <div flex  v-if="wids.split(',').length == 1">
                       &#x3000;&#x3000;&#x3000;<span class="filter-weight">附件：</span>
                       <div>
                        <el-upload
                                class="upload-demo"
                                ref="uploadfile"
                                :action="upload_url"
                                :auto-upload="false"
                                :before-upload="newFiles"
                                :on-remove="handleRemove"
                                multiple>
                                <el-button size="small" type="primary">点击上传</el-button>
                                <!-- <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div> -->
                            </el-upload>
                        </div>
                   </div>
                   <div text-right>
                       <el-button size="mini" type="primary" @click="handleCommit">提交</el-button>&#x3000;
                       <el-button size="mini"  @click="handleClose">取消</el-button>
                   </div>
               </form>
            </div>
        </el-dialog>
 </div>
</template>

<script>
 import axios from 'axios'
 import Qs from 'qs'
 export default {
   data () {
     return {
         visible:this.show,
         upload_url:'123',
         uploadForm: new FormData(),
         form:{
             sm:'',
             fileList:''
         },
         files:[]
     }
   },
   methods:{
       handleClose(){  
           this.visible = false
       },
       handleRemove(file, fileList) {
           this.uploadForm.append('fileUpload','');
       },
       handleCommit(){
           if(!this.validate()) return;
           if(this.wids.split(',').length == 1){
              this.$refs.uploadfile.submit();
           }    
           if(!!this.files.length){
                axios.post(window.baseurl+'attachment/uploadAttach.do',this.uploadForm,{
                    headers:{'Content-Type':'multipart/form-data'} 
                }).then(res=>{
                    if(res.data.state == 'success'){
                        this.form.fileList = res.data.data
                        this.$emit('handleCommitTB',this.form);
                    }else{
                        this.$alert(res.data.msg, '提示', {confirmButtonText: '确定',type:'error'});
                    }
                }).catch(error=>{});
           }else{
               this.$emit('handleCommitTB',this.form);
           }
       },
       newFiles(file){
         this.files = [];
         this.files.push(file);
         this.uploadForm.append('fileUpload',file);
         return true;
       },

       validate(){
           if(!this.form.sm){
               this.$alert('请填写提报说明!', '提示', {confirmButtonText: '确定',type:'warning'});
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
        wids:{
            type:String,
            default:''
        }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              this.form.sm = '';
              this.uploadForm.append('fileUpload','');
            }else{
               
            }
        }
    },
   components: {}
 }
</script>

<style scoped>
.dialog-tbfw{
    padding:15px 30px;
}
 
</style>
