<template>
    <div>
       <div>
           <filterComponent  :filterList="filterList" @handleChangeFilter="handleChangeFilter"></filterComponent>
       </div>
        <div>
            <!-- <tableComponent :tableData="dataList" :tableHead="headList" :pageShow="false" @handleXxwt="handleXxwt"
            @exportTable="exportTable" :height="'54vh'"></tableComponent> -->
            <tableComponents :tableData="dataList" :pageShow="false" :indexArr='[0,1]' :Height="0" :widthArr='[]'
            @exportTable="exportTable" @handleXxwt="handleXxwt" :Width="'150'"></tableComponents>
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
      filterList: ["cpx", "date", "dwlx", "xmlx"],
      filterDate: {
        cpx: "",
        xmlx: "",
        date: "",
        dwlx: ""
      }
    };
  },
  methods: {
    exportTable() {
      let startDt = !this.filterDate.date ? "" : this.filterDate.date[0];
      let endDt = !this.filterDate.date ? "" : this.filterDate.date[1];
      window.open(
        window.baseurl +
          "report/exportQytsqlReport.do?startDt=" +
          startDt +
          "&endDt=" +
          endDt +
          "&wtxmlx=" +
          this.filterDate.xmlx +
          "&dwlx=" +
          this.filterDate.dwlx +
          "&cpx=" +
          this.filterDate.cpx
      );
    },
    handleChangeFilter(data) {
      this.filterDate = data;
      this.qytsqlReport();
    },
    qytsqlReport() {
      this.$get(this.API.qytsqlReport, {
        cpx: this.filterDate.cpx,
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
        cpxbh: this.filterDate.cpx,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        wtxmlx: this.filterDate.xmlx,
        dwlx: this.filterDate.dwlx
      };
      obj["qyzd"] = data[1];
      if (params[i].en.indexOf(",") != -1) {
        let arr = params[i].en.split(",");
        arr.forEach((ele, i, arr) => {
          if (i == 0) {
            obj[ele] = arr[1];
          }
        });
      }
      let routeData = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query: obj
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    this.qytsqlReport();
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
