<template>
    <div class="pannelPadding-10">
        <div class="pannelPaddingBg-10">
            <div>
                <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter"></filterComponent>
            </div>
            <div>
                <tableComponents :tableData="dataList" :pageShow="!dataList||JSON.stringify(dataList) == '{}'?false:true"
                 :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" :exportShow="false"
                  :indexArr='[0,1]' :widthArr="[]" :Width="'130'" :Height="250"></tableComponents>
            </div>
        </div>

    </div>
</template>
<script>
import { getResponsibleTaskList } from "@/api/common.js";
import { userLoginReport } from "@/api/report.js";
import { getMenu, getSession } from "@/utils/util.js";
import tableComponents from "@/components/reportTable/tableComponents.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";
export default {
  data() {
    return {
      gczdList: [],
      xmlxList: [],
      xmlx: "",
      gczd: "",
      dataList: {},
      headList: [],
      keyword: "",
      filterList: [],
      filterDate: {
        keyword: ""
      },
      currentPage: 1,
      pageSize: 18
    };
  },
  methods: {
    handleCurrentChange(data) {
      this.currentPage = data;
      this.userLoginReport();
    },
    handleChangeFilter(data) {
      this.currentPage = 1;
      this.filterDate = data;
      this.userLoginReport();
    },
    // 用户登录统计报表(详情) ；
    userLoginReport(curPage) {
      this.$get(this.API.userLoginReport, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        yhbh: this.$route.query.bh
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    }
  },
  mounted() {
    this.userLoginReport();
  },
  activated() {},
  watch: {},
  components: {
    filterComponent,
    tableComponents
  }
};
</script>
<style scope>
.query-condition > div {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 13px;
}
.query-list {
  width: 95%;
}
.query-list span:hover {
  cursor: pointer;
}
.query-list span {
  display: inline-block;
  padding: 0px 5px;
  color: #637d8a;
  border-radius: 3px;
  margin: 5px 10px 0 0;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}
</style>
