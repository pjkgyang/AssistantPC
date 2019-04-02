<template>
    <div class="upload_file">
        <div flex>
            <div>
                <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" 
                :before-upload="beforeUpload" :on-remove="handleRemove" :on-change="handleChange">
                    <el-button size="mini" type="primary">上传附件</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div> -->
                </el-upload>
                <p v-if="!!fileName">
                  {{fileName}}&#x3000;<i class="el-icon-close" @click="handleRemove"></i>     
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      upload_url: "123",
      uploadForm: new FormData(),
      fileList:[],//文件集合
      fileName:null, 
      uploadAction:'123'
    };
  },
  methods: {

    // 删除文件
    handleRemove(file, fileList) {
      this.fileName = '';
      this.uploadForm = new FormData();
      this.$emit('handleUploadCrowd','');
    },

    beforeUpload(file) {
      this.fileName = file.name;
      this.uploadForm.append("uploadCrowd", file);
      axios.post(window.baseurl + "external/uploadCrowd.do", this.uploadForm, {
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
          if(res.data.state == 'success'){
             this.$emit('handleUploadCrowd',res.data.data)
          }
      });
      return true;
    },
   
   //  
   handleChange(file,fileList){
     
   },

  },
  components: {}
};
</script>

<style lang="scss" scoped>
.upload_file{
  p{
    border: 1px solid rgb(235, 234, 234);
    padding: 5px 3px;
    border-radius: 3px;
    margin-top: 4px !important;
    i:hover{
      cursor: pointer;
      color: #f00;
    }
  }
}
</style>
