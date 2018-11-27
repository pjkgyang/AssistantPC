<template>
  <div>
    <el-dialog title="编辑" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-qrfw">
        <el-form ref="form" :model="form" label-width="110px" size="mini">
          <el-form-item label="计划开始日期" required v-if="!plxgZrr">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhksrq" style="width:100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="计划结束日期" required v-if="!plxgZrr">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhjsrq" style="width:100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="责任人" required>
            <el-select v-model="form.zrrbh" placeholder="请选择责任人" style="width:100%;" @change="handleChangeZrr">
              <el-option v-for="item in zrrList" :key="item.value" :label="item.userName+' ( '+ item.userCode +' )'" :value="item.userId">
              </el-option>
            </el-select>
            <!-- <el-input v-model="form.zrrxm" placeholder="请选择责任人" readonly style="width:433px;"></el-input>
            <el-button size="mini" @click="handleChangeZrr">更改责任人</el-button> -->
          </el-form-item><br>
          <el-form-item text-right>
            <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>&#x3000;
            <el-button size="mini" @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryProjectParticipant } from "@/api/personal.js";
export default {
  data() {
    return {
      visible: this.show,
      zrrList: [],
      form: {
        jhksrq: "",
        jhjsrq: "",
        zrrxm: "",
        zrrbh: ""
      },
      pickerBeginDate: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    handleChangeZrr(val) {
      this.form.zrrbh = val;
      this.zrrList.forEach(ele => {
        if (ele.userId == val) {
          this.form.zrrxm = ele.userName;
        }
      });
    },
    handleCommit() {
      if (!this.validate()) return;
      this.$emit("handleEdit", this.form);
    },
    handleClose() {
      this.visible = false;
    },
    validate() {
      if (!this.form.jhksrq && !this.plxgZrr) {
        this.$alert("请选择计划开始日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.jhjsrq && !this.plxgZrr) {
        this.$alert("请填写计划结束日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.zrrbh) {
        this.$alert("请选择责任人", "提示", {
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
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    plxgZrr: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.zrrxm = this.form.zrrbh = this.form.jhksrq = this.form.jhjsrq =
          "";
      } else {
        queryProjectParticipant({
          xmbh: this.xmbh,
          sfjz: 1
        }).then(({ data }) => {
          if (data.state == "success") {
            this.zrrList = data.data;
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type:'error'
            });
          }
        });
        if (!this.plxgZrr) {
          this.form.zrrxm = this.data.zrrxm;
          this.form.zrrbh = this.data.zrrbh;
          this.form.jhksrq = this.data.jhksrq;
          this.form.jhjsrq = this.data.jhjsrq;
        }
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-qrfw {
  padding: 15px 30px;
  .qrfw-title {
    display: inline-block;
    width: 155px !important;
    font-weight: 700;
    text-align: right;
  }
}
</style>
