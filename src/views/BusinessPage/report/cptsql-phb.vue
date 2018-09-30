<template>
    <div>
       <div>
           <filterComponent  :filterList="filterList" @handleChangeFilter="handleChangeFilter"></filterComponent>
       </div>
        <div>
            <!-- <tableComponent :tableData="dataList" :tableHead="headList" :pageShow="false" :num='[2]' :height="'55vh'"
            @handleXxwt="handleXxwt" @exportTable="exportTable"></tableComponent> -->
            <tableComponents :tableData="dataList" :pageShow="false" @exportTable="exportTable" @handleXxwt="handleXxwt" 
            :Width="140" :Height="370"></tableComponents>
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
      filterList: ["qygc", "date", "dwlx", "xmlx"],
      filterDate: {
        xmlx: "",
        gczd: "",
        date: "",
        dwlx: ""
      },
      currentPage: 1
    };
  },
  methods: {
    exportTable() {
      let startDt = !this.filterDate.date ? "" : this.filterDate.date[0];
      let endDt = !this.filterDate.date ? "" : this.filterDate.date[1];
      window.open(
        window.baseurl +
          "report/exportCptsqlReport.do?qyzd=" +
          this.filterDate.gczd +
          "&startDt=" +
          startDt +
          "&endDt=" +
          endDt +
          "&wtxmlx=" +
          this.filterDate.xmlx +
          "&dwlx=" +
          this.filterDate.dwlx
      );
    },
    handleChangeFilter(data) {
      this.filterDate = data;
      this.cptsqlReport();
      this.currentPage = 1;
    },
    cptsqlReport() {
      this.$get(this.API.cptsqlReport, {
        qygc: this.filterDate.gczd,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        wtxmlx: this.filterDate.xmlx,
        dwlx: this.filterDate.dwlx
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
          //  this.dataList = res.data.body;
          //  this.headList = res.data.head;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    handleXxwt(data, i, params) {
      let obj = {
        qyzd: this.filterDate.gczd,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        wtxmlx: this.filterDate.xmlx,
        dwlx: this.filterDate.dwlx
      };
      obj["cpxbh"] = data[1];
      if (params[i].en.indexOf(",") != -1) {
        let arr = params[i].en.split(",");
        arr.forEach((ele, i, arr) => {
          if (i == 0) {
            obj[ele] = arr[1];
          }
        });
      }
      // console.log(data);
      // console.log(i)
      // console.log(params);
      // return;
      let routeData = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query: obj
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.cptsqlReport();
    });
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
