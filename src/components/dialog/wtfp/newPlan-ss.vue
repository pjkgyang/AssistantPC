<template>
    <div>
        <el-dialog title="新建计划" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-xjjh">
                <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true">
                    <el-form-item label="产品" required>
                        <el-input readonly v-model="form.cpmc" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训主题" required>
                        <el-input v-model="form.pxzt" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="培训形式" required>
                        <el-select v-model="form.pxxs" placeholder="请选择" style="width:213px">
                            <el-option v-for="item in pxxsList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计划培训日期" required>
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhpxrq" style="width:213px"></el-date-picker>
                    </el-form-item><br>
                    <el-form-item label="分享人" required>
                        <el-input type="textarea" v-model="form.fxrxm" placeholder='请输入分享人工号（用英文逗号 " , " 隔开)' style="width:550px"></el-input>
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
export default {
  data() {
    return {
      visible: this.show,
      form: {
        cpmc: "123123123",
        pxzt: "xxxxxxxx",
        pxxs: "cccccccccc",
        jhpxrq: "2018-08-08",
        fxrxm: ""
      },
      pxxsList: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
        if(!this.validate()) return;
    },
 
    handleAddZrr(data) {},

    validate() {
      if (!this.form.pxxs) {
        this.$alert("请选择培训形式", "提示", {confirmButtonText: "确定",type:'warning'});
        return false;
      }
      if (!this.form.jhpxrq) {
        this.$alert("请选择计划培训日期", "提示", {confirmButtonText: "确定",type:'warning'});
        return false;
      }
      if (!this.form.fxrxm) {
        this.$alert("请输入分享人工号", "提示", {confirmButtonText: "确定",type:'warning'});
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
