<template>
    <div>
        <div>
           <filterComponent  :filterList="filterList" @handleChangeFilter="handleChangeFilter"></filterComponent>
       </div>
       <div style="text-align:right;margin:10px 0">
           <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
        </div>
        <div>
             <report-cpxhs :tableData="cpxhsbList" @handleCpx="handleCpx"></report-cpxhs>
        </div>              
    </div>    
</template>
<script>
import { getResponsibleTaskList } from "@/api/common.js";
import { wtztqkReport, ylWtReportByCpx } from "@/api/report.js";
import { getMenu, getSession } from "@/utils/util.js";
import reportCpxhs from "@/components/reportTable/report-cpxhs.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";
export default {
  data() {
    return {
      filterList: ["qygc", "date", "dwlx", "jjzt"],
      filterDate: {
        dwlx :'',
        gczd:'',
        jjzt:''
      },
      title: "区域所属学校",
      cpxhsbList: []
    };
  },

  methods: {
    handleCpx(param) {
      param["qyzd"] = this.filterDate.gczd;
      param["dwlx"] = this.filterDate.dwlx;
      param["wtzt"] = this.filterDate.jjzt;
      param["lx"] = 6;
      param["gbStartDt"] =!this.filterDate.date ? "" : this.filterDate.date[0],
      param["gbEndDt"] = !this.filterDate.date ? "" : this.filterDate.date[1]
      let routeData = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query: param
      });
      window.open(routeData.href, "_blank");
    },
    exportTable() {
      let startDt = !this.filterDate.date ? "" : this.filterDate.date[0];
      let endDt = !this.filterDate.date ? "" : this.filterDate.date[1];
      window.open(
        window.baseurl +
          "report/exportylWtReportByCpx.do?dwlx=" +
          this.filterDate.dwlx +
          "&qyzd=" +
          this.filterDate.gczd +
          "&wtzt=" +
          this.filterDate.jjzt +
          "&lx=6" +
          "&gbStartDt=" +
          startDt +
          "&gbEndDt=" +
          endDt
      );
    },
    handleChangeFilter(data) {
      this.filterDate = data;
      this.ylWtReportByCpx();
    },

    //    遗留问题报表  //问题跟踪报表
    ylWtReportByCpx() {
      ylWtReportByCpx({
        curPage: 1,
        pageSize: 99999,
        qyzd: this.filterDate.gczd,
        dwlx: this.filterDate.dwlx,
        cpxbh: "",
        sjlb: "",
        wtzt: this.filterDate.jjzt,
        lx: 6,
        gbStartDt: !this.filterDate.date ? "" : this.filterDate.date[0],
        gbEndDt: !this.filterDate.date ? "" : this.filterDate.date[1],
        keyword: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.cpxhsbList = data.data; // 区域所属学校
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        }
      });
    }
  },
  mounted() {
    this.ylWtReportByCpx(); //区域所属学校
  },
  activated() {},
  watch: {},
  components: {
    reportCpxhs,
    filterComponent
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
.query-title {
  font-size: 14px;
  width: 100px;
  white-space: nowrap;
  text-align: left;
  padding: 3px 10px 0;
  font-weight: 700;
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
