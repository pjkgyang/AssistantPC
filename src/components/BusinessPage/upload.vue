<template>
    <div>
        <div flex>
            &#x3000;&#x3000;&#x3000;
            <span class="filter-weight">附件：</span>
            <div>
                <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" :before-upload="newFiles" :on-remove="handleRemove" multiple>
                    <el-button size="small" type="primary">点击上传</el-button>
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
    handleRemove(file, fileList) {
      this.uploadForm.append("fileUpload", "");
    },
    // handleCommit() {
    //   if (!this.validate()) return;
    //   if (this.wids.split(",").length == 1) {
    //     this.$refs.uploadfile.submit();
    //   }
    //   if (!!this.files.length) {
    //     axios
    //       .post(
    //         window.baseurl + "attachment/uploadAttach.do",
    //         this.uploadForm,
    //         {
    //           headers: { "Content-Type": "multipart/form-data" }
    //         }
    //       )
    //       .then(res => {
    //         if (res.data.state == "success") {
    //           this.form.fileList = res.data.data;
    //           this.$emit("handleCommitTB", this.form);
    //         } else {
    //           this.$alert(res.data.msg, "提示", {
    //             confirmButtonText: "确定",
    //             type: "error"
    //           });
    //         }
    //       })
    //       .catch(error => {});
    //   } else {
    //     this.$emit("handleCommitTB", this.form);
    //   }
    // },
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
