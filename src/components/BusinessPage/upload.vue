<template>
    <div>
        <div flex>
            <div>
                <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" :before-upload="newFiles" :on-remove="handleRemove" multiple>
                    <el-button size="mini" type="primary">上传附件</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div> -->
                </el-upload>
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
      form: {
        sm: "",
        fileList: ""
      },
      files: []
    };
  },
  methods: {
    // 移除附件
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
      this.uploadForm.append("fileUpload", "");
    },
    newFiles(file) {
      this.files = [];
      this.files.push(file);
      this.uploadForm.append("fileUpload", file);
      return true;
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
