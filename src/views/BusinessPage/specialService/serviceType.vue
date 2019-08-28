<template>
  <div>
    <el-dialog
      title="选择服务类型"
      width="600px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-bj">
        <section>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" :selectable="checkboxInit"></el-table-column>
            <el-table-column prop="cpxmc" label="服务类型"></el-table-column>
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
      pickerBeginDateBefore: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      tableData: [],
      cpxids: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: ""
    }
  },
  methods: {
    checkboxInit(row, index) {
      if (row.flag == "1") {
        return false;
      } else {
        return true;
      }
    },
    // 选择服务类型
    handleSelectionChange(val) {
      this.cpxids = [];
      val.forEach((ele, i, arr) => {
        this.cpxids.push(ele.cpxwid);
      });
    },

    // 提交服务
    handleClickSure() {
      this.$emit("handleAddservice", this.cpxids);
    },

    // 获取服务类型
    getSpecialServiceCPX() {
      this.$get(this.API.getSpecialServiceCPX, { xmbh: this.xmbh }).then(
        res => {
          if (res.state == "success") {
            this.tableData = res.data;
          } else {
          }
        }
      );
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
        this.getSpecialServiceCPX();
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
