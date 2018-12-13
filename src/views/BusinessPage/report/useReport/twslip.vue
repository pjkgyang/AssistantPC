<template>
    <div>
        <div>
            <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter"
             :placeholder="'请输入问题标题/提问人/受理人'"></filterComponent>
        </div>
        <div>
            <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" 
            @handleCurrentChange="handleCurrentChange"  @exportTable="exportTable" 
            :indexArr='[0,1]' :widthArr="[0,2]" :Width="'130'" :Height="0"></tableComponents>
        </div>
    </div>
</template>
<script>
import { getResponsibleTaskList } from "@/api/common.js";
import { problemsameIPStat } from "@/api/report.js";
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
      filterList: ["qygc",  "date",  "keyword"],
      filterDate: {
        gczd: "",
        date: "",
        keyword: ""
      },
      currentPage: 1,
      pageSize: 15
    };
  },
  methods: {
    exportTable() {
      let startDt = !this.filterDate.date ? "" : this.filterDate.date[0];
      let endDt = !this.filterDate.date ? "" : this.filterDate.date[1];
      window.open(
        window.baseurl +
          "usageReport/exportProblemsameIPStat.do?qygc=" +
          this.filterDate.gczd +
          "&startDt=" +
          startDt +
          "&endDt=" +
          endDt +
          "&keyword=" +
          this.filterDate.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.problemsameIPStat();
    },
    handleChangeFilter(data) {
      this.currentPage = 1;
      this.filterDate = data;
      this.problemsameIPStat();
    },
    // 提问受理IP相同统计报表
    problemsameIPStat(curPage) {
      this.$get(this.API.problemsameIPStat, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qygc: this.filterDate.gczd,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        keyword: this.filterDate.keyword
      }).then(res => {
        if(res.state == 'success'){
            this.dataList = res.data;
        }
      });
    }
  },
  mounted() {
    if (getSession("gczd") == null) {
      getMenu("gczd", this.gczdList, true); //获取工程战队
    } else {
      this.gczdList = getSession("gczd");
    }
    this.problemsameIPStat();
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
