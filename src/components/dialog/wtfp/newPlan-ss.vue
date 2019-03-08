<template>
    <div>
        <el-dialog :title="title" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-xjjh">
                <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true">
                    <el-form-item label="产品" required>
                        <el-input :disabled="true" v-model="form.cpmc" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训主题" required>
                        <el-input   v-model="form.pxzt" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训形式" required>
                        <el-select v-model="form.pxxs" placeholder="请选择" style="width:213px">
                            <el-option v-for="item in pxxsList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计划培训日期" required>
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhpxsj" style="width:213px"></el-date-picker>
                    </el-form-item><br>
                    <el-form-item label="分享人" required>
                        <el-input v-model="form.fxrxm" placeholder="请选择分享人" style="width:550px" @focus="handleChooseZrr"></el-input>
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
        <zrrDialog :show.sync="zrrShow" @handleAddZrr="handleAddZrr"></zrrDialog>
    </div>
</template>

<script>
import zrrDialog from "@/components/dialog/wtfp/zrr-dialog.vue";
export default {
  data() {
    return {
      visible: this.show,
      title: "新建计划",
      zrrShow: false,
      form: {
        cpmc: "",
        pxzt: "",
        pxxs: "",
        jhpxsj: "",
        fxrxm: "",
        fxrbh: ""
      },
      pxxsList: [
        {
          value: "1",
          label: "线上直播"
        },
        {
          value: "2",
          label: "线下培训"
        },
        {
          value: "3",
          label: "线上加线下"
        }
      ],

    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
      if (!this.validate()) return;
      this.$post(this.API.addOrUpdateCapacityPlan, {
        wid: this.isEdit ? this.questionData.wid : "",
        wtwid: !this.questionData.wtwid
          ? this.questionData.wid
          : this.questionData.wtwid,
        cpbh: this.questionData.cpbh,
        cpmc: this.questionData.cpmc,
        pxzt: this.form.pxzt,
        pxxs: this.form.pxxs,
        jhpxsj: this.form.jhpxsj,
        fxrbh: this.form.fxrbh,
        fxrxm: this.form.fxrxm
      }).then(res => {
        if (res.state == "success") {
          this.visible = false;
          this.$alert(this.isEdit ? "编辑成功" : "新建成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$emit("handleSavesuccess", "");
            }
          });
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    handleChooseZrr() {
      this.zrrShow = !this.zrrShow;
    },
    handleAddZrr(data) {
      this.form.fxrbh = data.userid;
      this.form.fxrxm = data.username;
      this.zrrShow = !this.zrrShow;
    },

    validate() {
      if (!this.form.pxxs) {
        this.$alert("请选择培训形式", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.jhpxsj) {
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
    questionData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.pxzt = "";
        this.form.pxxs = "";
        this.form.jhpxsj = "";
        this.form.fxrxm = this.form.fxrbh = "";
      } else {
        this.form.cpmc = this.questionData.cpmc;
        if (!!this.isEdit) {
          this.form.pxzt = this.questionData.pxzt;
          this.form.pxxs = this.questionData.pxxs;
          this.form.jhpxsj = this.questionData.jhpxsj;
          this.form.fxrxm = this.questionData.fxrxm;
          this.form.fxrbh = this.questionData.fxrbh;
        }
      }
    },
    questionData: {
      handler: function(val, oldval) {
        if (!!val.cpmc) {
          this.form.cpmc = this.questionData.cpmc;
        }
      },
      immediate: true, //关键
      deep: true
    },

    isEdit(n, o) {
      if (n) {
        this.title = "编辑计划";
      } else {
        this.title = "新建计划";
      }
    }
  },
  components: { zrrDialog }
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
