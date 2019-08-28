<template>
  <div>
    <el-dialog
      title="添加承建单位"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-pj">
        <el-form ref="form" :model="form" size="mini" label-width="80px">
          <el-form-item label="单位名称">
            <el-input v-model="form.mc" placeholder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="是否金智">
            <el-radio-group v-model="form.sfjz">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item text-right>
            <el-button type="primary" @click="handleCommit">保存</el-button>
            <el-button @click="visible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      form: {
        mc: "",
        sfjz: "0"
      }
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },

    handleCommit() {
      if (!this.validate()) return;
      this.form.dwmc = this.curDept.dwmc;
      this.form.dwbh = this.curDept.dwbh;
      this.$post(this.API.saveCjdw, this.form).then(res => {
        if (res.state == "success") {
          this.$message({ message: "保存成功", type: "success" });
          this.visible = false;
          this.form.mc = "";
          this.form.sfjz = "0";
          this.$emit("handleCommit", this.form);
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    validate() {
      if (/^[\s]*$/.test(this.form.mc)) {
        this.$alert("请填写单位名称", "提示", {
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
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    curDept: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
        if (!!this.dataInfo.mc) {
          this.form.mc = this.dataInfo.mc;
          this.form.sfjz = this.dataInfo.sfjz;
          this.form.wid = this.dataInfo.wid;
        }
      } else {
        delete this.form.wid;
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
