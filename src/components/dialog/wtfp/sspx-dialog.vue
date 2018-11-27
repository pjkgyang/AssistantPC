<template>
    <div>
        <el-dialog title="新建计划" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-xjjh">
                <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true">
                    <el-form-item label="产品" required>
                        <el-input readonly v-model="form.cpmc" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训主题" required>
                        <el-input readonly v-model="form.pxzt" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训形式" required>
                        <el-input readonly v-model="form.pxxs" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="计划培训日期" required>
                        <el-input readonly v-model="form.jhpxrq" placeholder="" style="width:213px"></el-input>
                    </el-form-item>
                    <el-form-item label="实际完成时间" required>
                       <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.sjwcrq" style="width:213px"></el-date-picker>
                    </el-form-item><br>
                    <el-form-item label="分享人" required>
                        <el-input type="textarea" readonly v-model="form.fxrxm" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训视频" required>
                        <el-input type="textarea" v-model="form.pxsp" placeholder='请输入视频地址(用英文逗号 " , " 隔开)' style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训课件" required>
                        <div>
                            <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" 
                            :auto-upload="false" :before-upload="newFiles" :on-remove="handleRemove" 
                            multiple  accept=".pptx,.docx,.doc">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能传(.pptx,.docx,.doc)文件</div>
                            </el-upload>
                        </div>
                   </el-form-item><br>
            <el-form-item style="float:right">
                <div>
                    <el-button type="primary" @click="handleCommit">保存</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </div>
            </el-form-item>
            </el-form>
    </div>
    </el-dialog>
    </div>
</template>

<script>
 import axios from 'axios'
 import Qs from 'qs'
export default {
  data() {
    return {
      visible: this.show,
      form: {
        cpmc: "123123123",
        pxzt:'dasdasd',
        pxxs:'adasdasdf',
        pxzt: "xxxxxxxx",
        pxxs: "cccccccccc",
        jhpxrq: "2018-08-08",
        sjwcrq:'2018-08-08',
        fxrxm: "",
        pxsp:'',
        fileList:''
      },
      upload_url: "123",
      uploadForm: new FormData(),
      files: []
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
      if (!this.validate()) return;
    },
    handleRemove(file, fileList) {
      this.uploadForm.append("fileUpload", "");
    },
    handleCommit() {
      if (!this.validate()) return;
      this.$refs.uploadfile.submit();
      if (!!this.files.length) {
        axios
          .post(
            window.baseurl + "attachment/uploadAttach.do",
            this.uploadForm,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
          .then(res => {
            if (res.data.state == "success") {
              this.form.fileList = res.data.data;
              this.$emit("handleCommitSave", this.form);
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          })
          .catch(error => {});
      } else {
        this.$emit("handleCommitSave", this.form);
      }
    },
    newFiles(file) {
      this.files = [];
      this.files.push(file);
      this.uploadForm.append("fileUpload", file);
      return true;
    },

    validate() {
      if (!this.form.pxxs) {
        this.$alert("请选择培训形式", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.jhpxrq) {
        this.$alert("请选择计划培训日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.fxrxm) {
        this.$alert("请输入分享人工号", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      return true;
    }
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
