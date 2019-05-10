<template>
    <div>
        <div>
            <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter"></filterComponent>
        </div>
        <div style="margin:5px 0" colcenter spacebetween>
            <div>
                <p class="month-plan-explain">注：日报工时成本 = 日报工时 * 120（元/小时）</p>
            </div>
        </div>
        <div>
            <!-- <tableComponent :tableData="dataList" :tableHead="headList" :currentPage="currentPage"  @handleCurrentChange="handleCurrentChange"
            @exportTable="exportTable" :height="'380px'" :width="'3500px'"></tableComponent> -->
            <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleXxwt="handleXxwt" @exportTable="exportTable" :indexArr='[0,1]' :widthArr="[1,2,3]" :Width="'150'" :Height="0"></tableComponents>
        </div>
    </div>
</template>
<script>
import { getResponsibleTaskList } from "@/api/common.js";
import { queryCostStat } from "@/api/report.js";
import { getMenu, getSession } from "@/utils/util.js";
import tableComponent from "@/components/reportTable/tableComponent.vue";
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
      filterList: ["qygc", "xmlb", "date", "sfzt", "keyword", "xmlx"],
      filterDate: {
        sfzt: "",
        gczd: "",
        date: "",
        xmlb: "",
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
          "report/exportCostStat.do?qygc=" +
          this.filterDate.gczd +
          "&xmlb=" +
          this.filterDate.xmlb +
          "&sfzt=" +
          this.filterDate.sfzt +
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
      this.queryCostStat();
    },
    handleChangeFilter(data) {
      this.currentPage = 1;
      this.filterDate = data;
      this.queryCostStat();
    },
    queryCostStat(curPage) {
      //成本执行统计
      this.$get(this.API.queryCostStat, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qygc: this.filterDate.gczd,
        xmlb: this.filterDate.xmlb,
        sfzt: this.filterDate.sfzt,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        xmlx: this.filterDate.xmlx,
        keyword: this.filterDate.keyword
      }).then(res => {
        this.dataList = res.data;
        // this.dataList = res.data.body;
        // this.headList = res.data.head;
      });
    },

    handleXxwt(data, i, params) {
        let obj = {};
        obj.xmbh = data[0];
				 obj.xmmc = data[1];
        if(params[i].en == 'ekdy'){
            obj.xz = '0';
        }else if(params[i].en == 'ssdy'){
            obj.xz = '1';  
        }
      let routeData = this.$router.resolve({
        path: params[i].en == "rbgs"?"/gsrbdetail":"/erssdetail",
        query:obj
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    if (getSession("gczd") == null) {
      getMenu("gczd", this.gczdList, true); //获取工程战队
    } else {
      this.gczdList = getSession("gczd");
    }
    this.queryCostStat(1);
    window.onerror = function() {
      return true;
    };
  },
  activated() {},
  watch: {},
  components: {
    tableComponent,
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
/* .query-title{
    font-size: 14px;
    width: 100px;
    white-space: nowrap;
    text-align:left;
    padding: 3px 10px 0;
    font-weight: 700;
} */
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
