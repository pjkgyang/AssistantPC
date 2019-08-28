<template>
  <div>
    <el-dialog
      title="确认服务"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-xqqr">
        <section>
          <div flex>
            <span class="filter-weight">评价：</span>
            <el-rate v-model="filterData.pf" :texts="texts" show-text></el-rate>
          </div>

          <p class="pj-content">
            <span class="filter-weight">说明：</span>
            <el-input
              v-model="filterData.sm"
              type="textarea"
              :rows="5"
              :maxlength="500"
              style="width:670px"
              placeholder="请输入备注内容"
            ></el-input>
          </p>
        </section>
        <section class="pj-btn-group">
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
      texts: ["1分", "2分", "3分", "4分", "5分"],
      filterData: {
        sm: "",
        pf: 5
      }
    };
  },
  methods: {
    handleClickSure() {
      if (!this.validate()) return;
      this.$emit("handleClickSure", this.filterData);
    },
    validate() {
      if (this.filterData.pf <= 3 && /^[\s]*$/.test(this.filterData.sm)) {
        this.$alert("请输入备注内容", "提示", {
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
    zbwid: {
      type: String,
      default: ""
    },
    btnbh: {
      type: String,
      default: ""
    },
    demandDetail: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.filterData.pf = 5;
        this.filterData.sm = "";
      } else {
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.dialog-xqqr {
  padding: 8px 10px;
}
.dialog-xqqr section:nth-of-type(2) {
  margin: 10px 0;
}

.pj-content {
  width: 86%;
}
.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
