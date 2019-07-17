<template>
  <div>
    <el-dialog title="完成验证" width="700px" top="30px" :visible.sync="visible" :append-to-body="true"
      :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-pj">
        <section>
          <p>
            <span class="filter-weight">确认老师：</span>
            <el-input v-model="filterData.qrls" size="mini" placeholder="请输入内容" style="width:600px"></el-input>
          </p>
          <p class="mg-12">
            <span class="filter-weight">是否会签：</span>
            <el-radio-group v-model="filterData.sfhq">
              <el-radio :label="3">备选项</el-radio>
              <el-radio :label="6">备选项</el-radio>
            </el-radio-group>
          </p>
          <p class="pj-content">
            <span class="filter-weight">备注：</span>
            <el-input type="textarea" :rows="5" :maxlength="500" style="width:680px" placeholder="请输入备注内容" v-model="filterData.sm"></el-input>
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
        filterData: {
          sm: '',
          qrls: '',
          sfhq: ''
        }
      }
    },
    methods: {
      handleClose() {
        this.visible = false
      },
      handleClickSure() {
        if (!this.validate()) return;
        this.$emit('handleClickSure', this.filterData);
      },
      validate() {
        if (/^[\s]*$/.test(this.sm)) {
          this.$alert('请填写说明内容', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
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
      title: {
        type: String,
        default: '说明'
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
  }
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
