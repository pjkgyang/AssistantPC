<template>
    <div>
        <el-dialog title="上传文件" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-pj">
                <div flex>
                    <span class="filter-weight">上传文件：</span>
                    <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :limit="3" :on-exceed="handleExceed"
                     :auto-upload="false" :before-upload="newFiles" :on-remove="handleRemove" multiple :file-list="files">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">上传单个文件不能超过50M（最多一次上传3个文件）</div>
                    </el-upload>
                </div>
                <div text-right>
                    <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>
                    <el-button size="mini" @click="handleClose">取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      visible: this.show,
      upload_url: "123",
      uploadForm: new FormData(),
      files: []
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    // 删除附件
    handleRemove(file, fileList) {
      this.uploadForm.append("fileUpload", "");
    },
    handleExceed(files, fileList) {
        if(files.length > 3){
           this.$alert(`对不起,单次上传最多3个文件`, "提示", {confirmButtonText: "确定",type: "warning"});
        }
    },
    newFiles(file) {
      this.files = [];
      if (file.size / 1024 / 1024 < 50) {
        this.files.push(file);
        this.uploadForm.append("fileUpload", file);
        return true;
      } else {
        this.uploadForm = new FormData();
        this.$alert("上传不允许超过50M，请检查后上传", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
    },
    handleCommit() {
      this.uploadForm.append("lx", this.lx);
      this.uploadForm.append("path", this.filePath);
      this.$refs.uploadfile.submit();

      if (!!this.files.length) {
        axios.post(
            window.baseurl + "attachment/uploadTemplateFile.do",
            this.uploadForm,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          ).then(res => {
            if (res.data.state == "success") {
              this.visible = false;
              this.$emit("handleCommit", "");
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          })
          .catch(error => {});
      } else {
        
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    filePath: {
      type: String,
      default: ""
    },
    lx: {
      type: Number,
      default:0
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
         this.uploadForm = new FormData();
         this.files = [];
      } else {

      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-pj {
  padding: 8px 10px;
}
.dialog-pj section:nth-of-type(2) {
  margin: 10px 0;
}
.pj-title {
  font-weight: 700;
  width: 14%;
}
.pj-content {
  width: 86%;
}
.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
