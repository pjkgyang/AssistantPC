<template>
    <div>
        <el-dialog title="文档改进" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-pj">
                <section>
                    <span class="filter-weight before-require">当前状态：</span>
                    <el-tag size="mini" :type="data.gjzt==1?'':data.gjzt==2?'success':'info'">{{!data.gjzt?'未改进':data.gjzt==1?'改进中':'改进完成'}}</el-tag> 
                </section>
                <section>
                    <span class="filter-weight before-require">改进状态:</span>
                    <el-radio-group v-model="form.gjzt">
                        <el-radio :label="0">未改进</el-radio>
                        <el-radio :label="1">改进中</el-radio>
                        <el-radio :label="2">改进完成</el-radio>
                    </el-radio-group>
                </section>
                <section>
                    <span class="pj-title before-require">改进说明:</span>
                        <p class="pj-content">
                            <el-input type="textarea" :rows="5" :maxlength="500" style="width:670px" placeholder="请输入内容" v-model="form.sm"></el-input>
                        </p>
                </section>
                <section class="pj-btn-group">
                    <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
                    <el-button size="small" @click="handleClose">取消</el-button>
                </section>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      form:{
          gjzt:0,
          sm: ""
      }
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleClickSure() {
      if(!this.validate()) return;
      this.$emit("handleCommit", this.form);
    },
    validate() {
      if (/^[\s]*$/.test(this.form.sm)) {
        this.$alert("请填写说明内容", "提示", {
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
    data:{
        type:Object,
        default:()=>{
            return {}
        }
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
