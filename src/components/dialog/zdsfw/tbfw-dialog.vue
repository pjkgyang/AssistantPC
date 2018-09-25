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
                       <span class="filter-weight">提报说明：</span>&nbsp;
                       <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" style="width:550px"></el-input>
                   </div><br>
                   <div flex>
                       &#x3000;&#x3000;<span class="filter-weight">附件：</span>
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
         textarea:'',
         fileList:[]
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
           axios.post(window.baseurl+'attachment/uploadAttach.do',this.uploadForm,{
                  headers:{'Content-Type':'multipart/form-data'} 
           }).then((res)=>{
               if(res.state == 'success'){
                    this.fileList = res.data.data.split(',');
               }else{
                    this.$alert(res.msg, '提示', {confirmButtonText: '确定',type:'error'});
               }
           }).catch(error=>{})
           this.$refs.uploadfile.submit();
       },
       newFiles(file){
         this.uploadForm.append('fileUpload',file);
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
