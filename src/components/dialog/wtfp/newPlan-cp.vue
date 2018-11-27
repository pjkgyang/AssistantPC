<template>
    <div>
        <el-dialog title="新建计划" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-xjjh">
                <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true">
                    <el-form-item label="问题标题" required>
                        <el-input readonly v-model="form.wtbt" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item  label="产品" required>
                        <el-input readonly v-model="form.cpmc" placeholder="" style="width:213px"></el-input>
                    </el-form-item>
                    <el-form-item label="提出日期" required>
                        <el-input readonly v-model="form.tcrq" placeholder="" style="width:213px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="问题分析" required>
                        <el-input type="textarea" v-model="form.wtfx" placeholder="请输入问题分析(1000字以内)" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="下一步计划" required>
                        <el-input type="textarea" v-model="form.xbjh" placeholder="请输入下一步计划(100字以内)" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="计划完成时间" required>
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhwcrq" style="width:213px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="责任人" required>
                        <el-input v-model="form.zrrxm" placeholder="请选择责任人" style="width:213px" @focus="handleChooseZrr"></el-input>
                    </el-form-item><br>
                    <el-form-item style="float:right">
                        <div >
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
import zrrDialog from '@/components/dialog/wtfp/zrr-dialog.vue';
export default {
  data() {
    return {
      visible: this.show,
      zrrShow:false,
      form: {
        wtbt: "1111111",
        cpmc: "123123123",
        tcrq: "455sdfsdfs",
        wtfx: "asddddd",
        xbjh: "下步计划",
        jhwcrq: "",
        zrrxm: "",
        zrrbh: ""
      }
    };
  },
  methods: {
    handleClose() {
        this.visible = false;
    },
    handleCommit() {},
    handleChooseZrr(){
        this.zrrShow = !this.zrrShow
    },
    handleAddZrr(data){
        this.form.zrrbh = data.userid
        this.form.zrrxm = data.username
        this.zrrShow = !this.zrrShow
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
  components: {zrrDialog}
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
