<template>
  <div>
    <el-dialog title="培训" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-xjjh">
        <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true">
          <el-form-item label="产品" required>
            <el-input :disabled="true"  v-model="form.cpmc" placeholder="" style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="培训主题" required>
            <el-input :disabled="true"  v-model="form.pxzt" placeholder="" style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="培训形式" required>
            <el-input :disabled="true"  v-model="form.pxxs" placeholder="" style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="计划培训日期" required>
            <el-input :disabled="true"  v-model="form.jhpxsj" placeholder="" style="width:213px"></el-input>
          </el-form-item>
          <el-form-item label="分享人" required>
            <el-input :disabled="true" v-model="form.fxrxm" placeholder="" style="width:213px"></el-input>
          </el-form-item><br>
          <el-form-item label="实际完成时间" required>
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.sjwcsj" style="width:550px"></el-date-picker>
          </el-form-item><br>
          <el-form-item label="培训视频" required>
            <el-input type="textarea" v-model="form.pxsp" placeholder='请输入视频地址(用英文逗号 " , " 隔开)' style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="培训课件" required>
            <div>
              <el-upload class="upload-demo"  ref="uploadfile" :action="upload_url" :auto-upload="false" :before-upload="newFiles" :on-remove="handleRemove" multiple >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能传(.pptx,.docx,.doc)文件</div>
              </el-upload>
            </div>
          </el-form-item><br>
          <el-form-item label="参加人员" required>
            <el-input  type="textarea" v-model="form.ry" placeholder='请输入人员工号(用英文逗号 " , " 隔开)' style="width:550px"></el-input>
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
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      visible: this.show,
      form: {
        cpmc: "",
        pxzt: "",
        pxxs: "",
        jhpxsj: "",
        sjwcsj: "",
        fxrxm: "",
        pxsp: "",
        fileList: "",
        ry:""
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
    // handleCommit() {
    //   if (!this.validate()) return;
    //   this.$post(this.API.abilityTraining, {
    //     wid: this.itemData.wid,
    //     sjwcsj: this.form.sjwcsj,
    //     pxsp: this.form.pxsp
    //   });
    // },

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
      if(!file.size / 1024 / 1024 < 10){
         this.$alert('上传单个文件大小不能超过10M', "提示", {confirmButtonText: "确定",type: "warning"}); 
         return;
      }else{
        this.files.push(file);
        this.uploadForm.append("fileUpload", file);
        return true;
      }
    },

    validate() {
      if (!this.form.sjwcsj) {
        this.$alert("请选择计划完成日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.ry) {
        this.$alert("请填写参加人员", "提示", {
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
    },
    itemData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.sjwcsj = '';
        this.form.pxsp = '';
        this.files = [];
        this.form.ry = '';
      } else {
        this.form.cpmc = this.itemData.cpmc;
        this.form.pxzt = this.itemData.pxzt;
        this.form.pxxs =
          this.itemData.pxxs == 1
            ? "线上直播"
            : this.itemData.pxxs == 2 ? "线下培训" : "线上加线下";
        this.form.jhpxsj = this.itemData.jhpxsj;
        this.form.fxrxm = this.itemData.fxrxm;
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
