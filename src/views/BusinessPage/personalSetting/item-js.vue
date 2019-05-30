<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入项目编号/项目名称/分包编号'"></filterComponent>
    </div>
    <div text-right>
      <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
    </div>
    <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleXxwt="handleXxwt" :indexArr='[0]' :widthArr="[2,5]" :Width="'130'" :Height="250" :rowWidth="'260'" :archiveShow="false" :exportShow="false"></tableComponents>
    <xmjsDialog :show.sync="show" :data="rowData" @handleClickSure="handleClickSure"></xmjsDialog>
    <jssqcxDialog :show.sync="jscxShow" :fbbh="rowData.fbbh"></jssqcxDialog>
  </div>
</template>

<script>
import tableComponents from "@/views/BusinessPage/personalSetting/tableComponents.vue";
import xmjsDialog from "@/components/dialog/jssq-dialog.vue";
import jssqcxDialog from "@/components/dialog/jssqcx-dialog.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";
export default {
  data() {
    return {
      filterList: ["keyword", "fbxz"],
      show: false,
      jscxShow: false,
      currentPage: 1,
      pageSize: 20,
      rowData: {},
      dataList: {},

      filterWord: {
        keyword: "",
        fbxz: ""
      }
    };
  },
  methods: {
    // 查询条件
    handleChangeFilter(data) {
      this.filterWord = data;
      this.currentPage = 1;
      this.getSettlementApplication();
    },
    // 导出
    handleExport() {
      window.open(
        window.baseurl +
          "settlement/exportSettlementApplication.do?fbxz=" +
          this.filterWord.fbxz +
          "&keyword=" +
          this.filterWord.keyword
      );
    },
    handleClickSure(data) {
      let _this = this;
      data.fbbh = this.rowData.fbbh;
      data.xmbh = this.rowData.xmbh;
      this.$post(this.API.saveSettlementApplication, data).then(res => {
        if (res.state == "success") {
          Object.keys(res.data).forEach(function(key) {
            _this.$alert(res.data[key], "提示", {
              confirmButtonText: "确定",
              type: key == "true" ? "success" : "error",
              callback: action => {
                if (!!key) {
                  _this.show = false;
									_this.getSettlementApplication();
                }
              }
            });
          });
        }
      });
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getSettlementApplication();
    },
    handleXxwt(data, i, params) {
			if(data[3] == '已终止' && params == "sqjs"){
				 this.$message({
          message: '该项目已经终止，不允许提交结算申请！',
          type: 'warning'
        });
				return;
			}
      this.rowData.fbmc = data[5];
      this.rowData.fbbh = data[4];
      this.rowData.xmbh = data[1];
      if (params == "sqjs") {
        this.show = !this.show;
      } else {
        this.jscxShow = !this.jscxShow;
      }
    },
    getSettlementApplication() {
      this.$get(this.API.settlementApplication, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        fbxz: this.filterWord.fbxz,
        keyword: this.filterWord.keyword
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    }
  },
  mounted() {
    this.getSettlementApplication();
  },
  components: { tableComponents, xmjsDialog, jssqcxDialog, filterComponent }
};
</script>

<style scoped>
</style>
