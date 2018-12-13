<template>
    <div>
        <div>
            <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" 
            :placeholder="'请输入用户名/手机号/单位'"></filterComponent>
        </div>
        <div>
            <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" 
            @handleCurrentChange="handleCurrentChange"  @exportTable="exportTable"  @handleXxwt="handleXxwt"
            :indexArr='[0,1]' :widthArr="[]" :Width="'130'" :Height="250"></tableComponents>
        </div>
    </div>
</template>
<script>
import { getResponsibleTaskList } from "@/api/common.js";
import { userLoginStat } from "@/api/report.js";
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
      filterList: ["keyword"],
      filterDate: {
        keyword: ""
      },
      currentPage: 1,
      pageSize: 18
    };
  },
  methods: {
    exportTable() {
      let startDt = !this.filterDate.date ? "" : this.filterDate.date[0];
      let endDt = !this.filterDate.date ? "" : this.filterDate.date[1];
      window.open(
        window.baseurl +
          "usageReport/exportUserLoginStat.do?keyword=" +
          this.filterDate.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.userLoginStat();
    },
    handleChangeFilter(data) {
      this.currentPage = 1;
      this.filterDate = data;
      this.userLoginStat();
    },
    // 用户登录统计报表
    userLoginStat(curPage) {
      this.$get(this.API.userLoginStat, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.filterDate.keyword
      }).then(res => {
        if(res.state == 'success'){
            this.dataList = res.data;
        }
      });
    },
    handleXxwt(data, i, params) {
      let routeData = this.$router.resolve({
        path: "/userDetail",
        query:{
            bh:data[0]
        }
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    this.userLoginStat();
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
