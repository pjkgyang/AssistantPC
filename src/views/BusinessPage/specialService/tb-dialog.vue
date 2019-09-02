<template>
  <div class="dialog-container">
    <el-dialog
      title="提报计划"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="addPlan">
        <el-form
          style="width:950px;margin:0 auto"
          class="demo-ruleForm"
          :model="tbjhData"
          :inline="true"
          size="mini"
          label-width="135px"
        >
          <el-form-item label="实际结束日期" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="tbjhData.sjjsrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="投入工时" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请填写工时"
              v-model="tbjhData.gstr"
            ></el-input>
          </el-form-item>

          <el-form-item label="说明" required>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入说明内容"
              v-model="tbjhData.sm"
              style="width:800px"
            ></el-input>
          </el-form-item>

          <el-form-item label="附件" required>
            <uploadFiles :isClear="clearFile" @handleUploadFile="handleUploadFile"></uploadFiles>
          </el-form-item>
        </el-form>
        <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
          <el-button size="small" type="primary" @click="handleCommit">确认提交</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadFiles from "@/components/BusinessPage/upload.vue";
export default {
  data() {
    return {
      visible: this.show,
      clearFile: false,
      tbjhData: {
        sjjsrq: "",
        gstr: 0,
        sm: "",
        fjData: ""
      },
      pickerBeginDateBefore: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    wid: {
      type: String,
      default: ""
    }
  },
  components: {
    uploadFiles
  },
  methods: {
    // 上传附件
    handleUploadFile(data) {
      if (!!data.length) {
        this.tbjhData.fjData = data.join(",");
      } else {
        this.tbjhData.fjData = "";
      }
    },

    handleCommit() {
      if (!this.valiDate()) return;
      this.$post(this.API.submitSpecialService, {
        wids: this.wid,
        sjjsrq:this.tbjhData.sjjsrq,
        gstr:this.tbjhData.gstr,
        fjData:this.tbjhData.fjData,
        sm:this.tbjhData.sm
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "提报成功", type: "success" });
          this.$emit('handleCommitTb','');
          this.clearFile = !this.clearFile;
          this.tbjhData.sjjsrq = "";
          this.tbjhData.gstr = 0;
          this.tbjhData.fjData = "";
          this.tbjhData.sm = "";
          this.visible = false;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
      // this.$confirm("是否确定提交该项服务计划?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     this.$post(this.API.submitSpecialService, {
      //       wids: params.wid
      //     }).then(res => {
      //       if (res.state == "success") {
      //         this.$message({ message: "提报成功", type: "success" });
      //         this.pageSpecialService();
      //       } else {
      //       }
      //     });
      //   })
      //   .catch(() => {});
    },

    valiDate() {
      if (!this.tbjhData.sjjsrq) {
        this.$message({
          message: "请选择计划结束日期",
          type: "warning"
        });
        return false;
      }
      if (!this.tbjhData.gstr) {
        this.$message({
          message: "请填写投入工时",
          type: "warning"
        });
        return false;
      }
      if (/^[\s]*$/.test(this.tbjhData.sm)) {
        this.$message({
          message: "请填写服务内容",
          type: "warning"
        });
        return false;
      }
      return true;
    }
  },
  watch: {
    show() {
      this.visible = this.show;
      if (this.show) {
      } else {
      
      }
    }
  }
};
</script>
<style scoped lang="scss">
.addPlan {
  padding: 10px 0;
}

div.el-form-item {
  margin-bottom: 8px !important;
}

.addPlan-textarea {
  width: 950px;
  margin: 0 auto;
}

.addPlan-textarea > p {
  width: 125px;
  text-align: right;
  padding-right: 12px;
  font-weight: 700;
}

.addPlan-textarea > p::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
