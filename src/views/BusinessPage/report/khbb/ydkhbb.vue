<template>
    <div>
        <div>
            <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'"></filterComponent>
        </div>
        <div>
            <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleXxwt="handleXxwt" @exportTable="exportTable" :indexArr='[0,1,2]' :widthArr="[]" :Width="'140'" :Height="0"></tableComponents>
        </div>
    </div>
</template>
<script>
import { getResponsibleTaskList } from "@/api/common.js";
import { queryCostStat } from "@/api/report.js";
import { getMenu, getSession,getPreMonth } from "@/utils/util.js";
import tableComponents from "@/components/reportTable/tableComponents.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";
export default {
  data() {
    return {
      dataList: {},
      headList: [],
      filterList: ["keyword", "yf", "bm", "rylx"],
      filterData: {
        keyword: "",
        yf: "",
        bm: "",
        rylx: []
      },
      currentPage: 1,
      pageSize: 15
    };
  },
  methods: {
    exportTable() {
      window.open(
        window.baseurl +
          "report/exportydkhb.do?bm=" +
          this.filterData.bm +
          "&yf=" +
          this.filterData.yf +
          "&rylx=" +
          this.filterData.rylx.join(",") +
          "&keyword=" +
          this.filterData.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.ydkhb();
    },
    handleChangeFilter(data) {
      this.filterData = data;
      this.currentPage = 1;
      this.ydkhb();
    },
    ydkhb() {
      this.$get(this.API.ydkhb, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        bm: this.filterData.bm,
        yf: this.filterData.yf,
        rylx: this.filterData.rylx.join(","),
        keyword: this.filterData.keyword
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
      let url = '';
      let arr = params[i].en.split(",");
      let obj = {
        // bm: this.filterData.bm,
        yf: this.filterData.yf,
        // rylx: this.filterData.rylx.join(","),
        // keyword: this.filterData.keyword,
        bh:data[0],
        gs:data[1]
      };
      switch(arr[0]){
          case 'lcbjs'||'lcbdcs':
            url = '/khbbdetail/lcbxq';
            break;
          case 'wtsljs'||'wtslaqwcs':
            url = '/khbbdetail/wt';
            break;
          case 'wtjs':
            url = '/khbbdetail/ts';
            break;
            default:
            break;
      }
      if (params[i].en.indexOf(",") != -1) {
        if (arr[0] == arr[1]) {
          obj[arr[0]] = data[i];
        } else {
          arr.forEach((ele, i, arr) => {
            if (i == 0) {
              obj[ele] = arr[1];
            }
          });
        }
      }
      let decodeData = window.btoa(JSON.stringify(obj));
      let routeData = this.$router.resolve({
        path: url+'&'+decodeData,
        query:{}
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    let date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + new Date().getMonth() + 1
        : new Date().getMonth() + 1);
    this.filterData.yf =  getPreMonth(date);  
    this.$nextTick(() => {
      this.ydkhb();
    });
    window.onerror = function() {
      return true;
    };
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
