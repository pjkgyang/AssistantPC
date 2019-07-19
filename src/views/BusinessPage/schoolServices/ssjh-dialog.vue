<template>
  <div>
    <el-dialog title="实施计划" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)"
      :show="show" width="1000px">
      <el-form ref="form" :model="form" label-width="135px" size="mini" style="padding: 10px;">
        <el-form-item label="计划开始日期">
          <el-date-picker type="date" placeholder="选择计划开始日期" v-model="form.jhksrq" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="实现方式">
          <el-input v-model="form.sxfs" placeholder="请输入实现方式" style="width:100%"></el-input>
        </el-form-item>

        <div flex>
          <el-form-item label="服务指南责任人">
            <el-input v-model="form.fwznzrr" placeholder="请输入服务指南整理责任人" style="width:192px"></el-input>
          </el-form-item>
          <el-form-item label="完成状态">
            <el-select v-model="form.fwznwczt" placeholder="请选择完成状态" style="width:192px">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="未完成" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.fwznwcsj" value-format="yyyy-MM-dd" style="width: 192px;"></el-date-picker>
          </el-form-item>
        </div>

        <div flex>
          <el-form-item label="实施责任人">
            <el-input v-model="form.sszrr" placeholder="请输入实施责任人" style="width:192px"></el-input>
          </el-form-item>
          <el-form-item label="完成状态">
            <el-select v-model="form.sswczt" placeholder="请选择完成状态" style="width:192px">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="未完成" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.sswcsj" value-format="yyyy-MM-dd" style="width: 192px;"></el-date-picker>
          </el-form-item>
        </div>
        <div flex>
          <el-form-item label="开发责任人">
            <el-input v-model="form.kfzrr" placeholder="请输入开发责任人" style="width:192px"></el-input>
          </el-form-item>
          <el-form-item label="完成状态">
            <el-select v-model="form.kfwczt" placeholder="请选择完成状态" style="width:192px">
              <el-option label="已完成" value="1"></el-option>
              <el-option label="未完成" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="完成时间">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.kfwcsj" value-format="yyyy-MM-dd" style="width: 192px"></el-date-picker>
          </el-form-item>
        </div>

        <el-form-item text-right>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: this.show,
        form: {
          jhksrq: '',
          sxfs: '',
          fwznzrr: '',
          fwznwczt: '',
          fwznwcsj: '',
          sszrr: '',
          sswczt: '',
          sswcsj: '',
          kfzrr: '',
          kfwczt: '',
          kfwcsj: '',
        },
        rules: {}
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      zbwid: {
        type: String,
        default: ''
      }
    },
    watch: {
      show(n, o) {
        if (!!n) {

        }
        this.dialogVisible = this.show;
      }
    },
    methods: {
      submitForm(formName) {
        if (!this.valiDate()) return;
        this.$emit('handleCommitSSjh', this.form);
      },
      getServicePlan() {
        this.$get(this.API.getServiceItemPlan, {
          zbwid: this.zbwid
        }).then(res => {
          if (res.state == 'success') {
            if (!!res.data) {
              this.form = res.data;
            } else {
              this.form = {};
            }
          } else {

          }
        })
      },
      valiDate() {
        if (!this.form.jhksrq) {
          this.$message({
            message: '请选择计划开始日期',
            type: 'warning'
          })
          return false;
        }
        return true;
      }
    }
  };
</script>

<style scoped>
  .title {
    font-weight: 700;
    padding: 0 10px;
    margin: 10px 0;
    border-left: 4px solid blueviolet;
  }
</style>
