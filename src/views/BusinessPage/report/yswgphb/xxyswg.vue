<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入区域名称'"></filterComponent>
    </div>
    <div>
      <!-- <tableComponent :tableData="dataList" :tableHead="headList" :pageShow="true" :currentPage="currentPage"  @handleCurrentChange="handleCurrentChange"
            :height="'370px'" @handleXxwt="handleXxwt" @exportTable="exportTable"></tableComponent> -->
      <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" 
      @handleCurrentChange="handleCurrentChange" @handleXxwt="handleXxwt" @exportTable="exportTable" 
      :indexArr='[]' :widthArr="[]" :Width="'auto'" :Height="0"></tableComponents>
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
      dataList: {},
      headList: [],
      filterList: [ "date", "lb", "lcbxmlx",],
      filterDate: {
        lcbxmlx: "",
        date: "",
        lb: "2",
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
          "report/exportYswgphb.do?startDt=" +
          startDt +
          "&endDt=" +
          endDt +
          "&completionType=" +
          this.filterDate.lb +
          "&milestoneProjectType=" +
          this.filterDate.lcbxmlx +
          '&lx=2'
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.yswgphb();
    },
    handleChangeFilter(data) {
      this.filterDate = data;
      this.currentPage = 1;
      this.yswgphb();
    },
    yswgphb() {
      this.$get(this.API.yswgphb, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        completionType: this.filterDate.lb,
        milestoneProjectType: this.filterDate.lcbxmlx,
        lx:2
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    handleXxwt(data, i, params) {
       let arrEn = params[i].en.split(",");
       let obj = {
        completionType: this.filterDate.lb,
        milestoneProjectType: this.filterDate.lcbxmlx,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
      };
       obj[params[2].en] =  data[2];
      if (params[i].en.indexOf(",") != -1 && arrEn[0] != arrEn[1]) {
        let arr = params[i].en.split(",");
        arr.forEach((ele, i, arr) => {
          if (i == 0) {
            obj[ele] = arr[1];
          }
        });
      }else{
        obj[arrEn[0]] = data[i];
      }
  
      let routeData = this.$router.resolve({
        path: "/yswgdetail",
        query: obj
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.yswgphb();
    });
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
