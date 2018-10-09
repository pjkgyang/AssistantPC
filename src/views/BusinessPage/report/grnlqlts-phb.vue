<template>
    <div>
       <div>
           <filterComponent  :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'"
           ></filterComponent>
       </div>
        <div>
            <!-- <tableComponent :tableData="dataList" :tableHead="headList" :pageShow="true" :currentPage="currentPage"  @handleCurrentChange="handleCurrentChange"
            :height="'370px'" @handleXxwt="handleXxwt" @exportTable="exportTable"></tableComponent> -->
            <tableComponents :tableData="dataList"  :pageShow="true" :currentPage="currentPage" :pageSize="pageSize"  @handleCurrentChange="handleCurrentChange"
            @handleXxwt="handleXxwt" @exportTable="exportTable" :indexArr='[0,1,2,3]' :widthArr="[3]" :Width="140" :Height="0"></tableComponents>
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
      filterList: ["keyword",'bm',"date", "dwlx", "xmlx", "cpx"],
      filterDate: {
        keyword: "",
        xmlx: "",
        bm:"",
        date: "",
        dwlx: "",
        cpx: ""
      },
      currentPage: 1,
      pageSize:15
    };
  },
  methods: {
    exportTable() {
      let startDt = !this.filterDate.date ? "" : this.filterDate.date[0];
      let endDt = !this.filterDate.date ? "" : this.filterDate.date[1];
      window.open(
        window.baseurl +
          "report/exportGrtsqlReport.do?bm=" +
          this.filterDate.bm +
          "&startDt=" +
          startDt +
          "&endDt=" +
          endDt +
          "&wtxmlx=" +
          this.filterDate.xmlx +
          "&dwlx=" +
          this.filterDate.dwlx +
          "&cpx=" +
          this.filterDate.cpx +
          "&keyword=" +
          this.filterDate.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.grtsqlReport();
    },
    handleChangeFilter(data) {
      this.filterDate = data;
      this.currentPage = 1;
      this.grtsqlReport();
    },
    grtsqlReport() {
      this.$get(this.API.grtsqlReport, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        // qygc: this.filterDate.gczd,
        bm: this.filterDate.bm,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        wtxmlx: this.filterDate.xmlx,
        dwlx: this.filterDate.dwlx,
        cpx: this.filterDate.cpx,
        keyword: this.filterDate.keyword
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
        // qyzd: this.filterDate.gczd,
        bm:this.filterDate.bm,
        startDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        endDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        wtxmlx: this.filterDate.xmlx,
        dwlx: this.filterDate.dwlx,
        cpxbh: this.filterDate.cpx,
        keyword: this.filterDate.keyword,
      };
      obj["wtxgrbh"] = data[1];
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
    this.$nextTick(() => {
      this.grtsqlReport();
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
