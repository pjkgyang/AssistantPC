<template>
    <div>
        <el-dialog title="编辑" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-qrfw">
                <el-form ref="form" :model="form" label-width="110px" size="mini">
                    <el-form-item label="计划开始日期" required>
                        <el-date-picker  type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhksrq" style="width:100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="计划结束日期" required>
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhjsrq" style="width:100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="责任人" required>
                        <el-input v-model="form.zrrxm" placeholder="请选择责任人" readonly style="width:433px;"></el-input>
                        <el-button size="mini" @click="handleChangeZrr">更改责任人</el-button>
                    </el-form-item><br>
                    <el-form-item text-right>
                        <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>&#x3000;
                        <el-button size="mini" @click="handleClose">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
        <zrr-dialog :show.sync="zrrShow" @handleAddZrr="handleAddZrr"></zrr-dialog>
    </div>
</template>

<script>
import zrrDialog from '@/components/dialog/zdsfw/zrr-dialog.vue'
export default {
  data() {
    return {
      visible: this.show,
      zrrShow:false,
      form: {
        jhksrq: "",
        jhjsrq: "",
        zrrxm:"",
        zrrbh:""
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
    handleAddZrr(data){
        this.form.zrrxm = data.username;
        this.form.zrrbh = data.userid;
        this.zrrShow = !this.zrrShow;
    },
    handleChangeZrr(){
        this.zrrShow = !this.zrrShow;
    },
    handleCommit() {
      if (!this.validate()) return;
      this.$emit("handleEdit", this.form);
    },
    handleClose() {
      this.visible = false;
    },
    validate() {
      if (!this.form.jhksrq) {
        this.$alert("请选择计划开始日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.jhjsrq) {
        this.$alert("请填写计划结束日期", "提示", {
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
      default: ()=>{
        return {}
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        
      } else {
          console.log(this.data)
          this.form.zrrxm = this.data.zrrxm
          this.form.zrrbh = this.data.zrrbh
          this.form.jhksrq = this.data.jhksrq
          this.form.jhjsrq = this.data.jhjsrq
      }
    }
  },
  components: {zrrDialog}
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
