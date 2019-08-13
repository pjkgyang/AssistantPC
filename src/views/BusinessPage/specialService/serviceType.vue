<template>
  <div>
    <el-dialog
      title="选择服务类型"
      width="400px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-bj">
        <section>
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column fixed="left" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="small">编辑</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="fwmc" label="服务类型"></el-table-column>
          </el-table>
        </section>
        <section class="pj-btn-group" text-right>
          <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
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
      multipleSelection:[]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleClickSure() {

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

<style scoped lang="scss">
.dialog-bj {
  padding: 8px 10px;
  section {
    div {
      > span {
      }
    }
  }
}
.dialog-bj section:nth-of-type(2) {
  margin: 10px 0;
}
.pj-title {
  font-weight: 700;
  width: 14%;
}
.pj-content {
  width: 86%;
}
</style>
