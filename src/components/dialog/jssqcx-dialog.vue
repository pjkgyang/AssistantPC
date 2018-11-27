<template>
    <div>
        <el-dialog title="结算申请记录" :width="tableWidth" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-jssqcx">
                <div>
                    <div text-right>
                        <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
                    </div>
                    <tableComponents :tableData="tableData" :exportShow="false" :widthArr="[2]" :Width="'130'" @handleXxwt="handleXxwt" :Height="270" :pageShow="false" :rowWidth="'320'"></tableComponents>
                </div>
                <jscyDialog :show.sync="tdcyShow" :wid="wid"></jscyDialog>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import tableComponents from "@/components/reportTable/tableComponents.vue";
import jscyDialog from "@/components/dialog/jscy-dialog.vue";
export default {
  data() {
    return {
      visible: this.show,
      tdcyShow: false,
      tableData: {},
      tableWidth: "80vw",
      wid: ""
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleExport() {
      window.open(
        window.baseurl +
          "settlement/exportSettlementApplicationRecord.do?fbbh=" +
          this.fbbh
      );
    },
    handleXxwt(data, i, params) {
      this.wid = data[0];
      this.tdcyShow = !this.tdcyShow;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fbbh: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
      } else {
        this.$get(this.API.settlementApplicationRecord, {
          curPage: 1,
          pageSize: 99,
          fbbh: this.fbbh
        }).then(res => {
          if (res.state == "success") {
            console.log(res);
            this.tableData = res.data;
          }
        });
      }
    }
  },
  components: { tableComponents, jscyDialog }
};
</script>

<style scoped>
.dialog-jssqcx {
  padding: 8px 10px;
}
</style>
