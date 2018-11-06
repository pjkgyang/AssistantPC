
<template>
  <div>
    <el-dialog title="项目备忘" width="800px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div style="padding:20px;">
        <!-- <div flex class="mg-12">
                    <span class="filter-weight before-require" text-right style="display:inline-block;width:140px;">附件：</span>
                    <div>
                        <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" :on-change="handleChangeFile" :before-upload="newFiles" :on-remove="handleRemove" multiple>
                            <el-button size="mini" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </div> -->
        <p>
          <span class="filter-weight before-require" text-right style="display:inline-block;width:140px">备忘承诺完成时间：</span>
          <el-date-picker size="mini" v-model="form.cnwcrq" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        </p><br>
        <p flex>
          <span class="filter-weight before-require" text-right style="display:inline-block;width:140px;">说明：</span>
          <el-input style="width:600px" type="textarea" :rows="3" placeholder="请输入说明内容" v-model="form.sm">
          </el-input>
        </p>
      </div>
      <div text-right class="pd-10">
        <el-button type="primary" size="mini" @click="handleCommitMilestone">提交</el-button>
        <el-button size="mini" type="danger" @click="handleCloseDialog">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryMilestoneOperationrecords } from "@/api/milestone.js";
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      visible: this.show,
      upload_url: "123",
      uploadForm: new FormData(),
      form: {
        // fileList: "",
        cnwcrq: "",
        sm: ""
      },
      files: []
    };
  },
  methods: {
    handleCloseDialog() {
      this.visible = false;
    },
    handleCommitMilestone() {
      // if (!this.files.length) {
      //   this.$alert("请选择文件上传", "提示", {
      //     confirmButtonText: "确定",
      //     type: "warning"
      //   });
      //   return;
      // }
      if (!this.form.cnwcrq) {
        this.$alert("请选择承诺完成日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.form.sm) {
        this.$alert("请填写备忘说明", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.$emit("handleCommitXmbw", this.form);

      // this.$refs.uploadfile.submit();
      // axios
      //   .post(window.baseurl + "attachment/uploadAttach.do", this.uploadForm, {
      //     headers: { "Content-Type": "multipart/form-data" }
      //   })
      //   .then(res => {
      //     if (res.data.state == "success") {
      //       this.form.fileList = res.data.data;
      //       this.$emit('handleCommitXmbw',this.form);
      //     } else {
      //       this.$alert(res.data.msg, "提示", {
      //         confirmButtonText: "确定",
      //         type: "error"
      //       });
      //     }
      //   })
      //   .catch(error => {});
    }
    // handleRemove(file, fileList) {
    //   this.files = fileList;
    //   this.uploadForm.append("fileUpload", "");
    // },
    // handleChangeFile(file, fileList) {
    //   this.files = fileList;
    // },
    // newFiles(file) {
    //   this.files = [];
    //   this.files.push(file);
    //   this.uploadForm.append("fileUpload", file);
    //   return true;
    // }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.cnwcrq = "";
        this.files = [];
        this.uploadForm = new FormData();
      } else {
      }
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
