<template>
    <div>
        <el-dialog title="添加参加人员" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
             <div>
               &nbsp;&nbsp;&nbsp;
                <span>
                    <span class="filter-weight">人员模板：</span>
                    <a href="javaScript:;;" @click="handleDownload">下载人员模板</a>
                </span>
                <p style="margin-left:14px !important;font-size:12px;color:#aaa">
                    上传人员列表前,可先下载对照模板<span style="color:#f00;">（注：模板不一致，或造成人员添加失败）</span>
                </p>
            </div><br>
            <div flex>
                &#x3000;
                <span class="filter-weight">人员附件：</span>
                <div>
                    <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" :before-upload="newFiles" :on-remove="handleRemove" >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div> -->
                    </el-upload>
                </div>
            </div>
            <div text-right style="margin:16px">
                <el-button type="primary" size="mini" @click="handleCommit">确定</el-button>
                <el-button size="mini" @click="handleClose">取消</el-button>
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
      form: {
        sm: "",
        fileList: ""
      },
      files: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    wid:{
      type:String,
      default:''
    }
  },
  methods: {
    // 
    handleDownload(){
        window.open(window.baseurl+'wtgj/downloadTrainingStaff.do');
    },
    handleClose() {
      this.visible = false;
    },
    handleRemove(file, fileList) {
      this.uploadForm.append("fileUpload", "");
    },
    handleCommit() {
      this.uploadForm.append("wid", this.wid);
      this.$refs.uploadfile.submit();
      if (!!this.files.length) {
        axios
          .post(
            window.baseurl + "wtgj/uploadTrainingStaff.do",
            this.uploadForm,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
          .then(res => {
            if (res.data.state == "success") {
              this.form.fileList = res.data.data;
              this.visible = false;
              this.$emit('handleUploadSuccess',res.data.data);
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          })
          .catch(error => {});
      } else {
        this.$emit("handleCommitTB", this.form);
      }
    },
    newFiles(file) {
      this.files = [];
      this.files.push(file);
      this.uploadForm.append("fileUpload", file);
      return true;
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        // this.uploadForm.append("wid",'');
        this.uploadForm = new FormData();
        this.form.fileList = '';
        this.files = [];
      } else {
        
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
