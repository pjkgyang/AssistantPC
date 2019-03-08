<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'"></filterComponent>
    </div>
    <div>
      <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleXxwt="handleXxwt" @exportTable="exportTable" :indexArr='[1,2,4]' :widthArr="[]" :Width="'150'" :Height="0" :archiveShow="archiveShow" @handleArchive="handleArchive"></tableComponents>
    </div>
  </div>
</template>
<script>
import { getResponsibleTaskList } from "@/api/common.js";
import { queryCostStat } from "@/api/report.js";
import { getMenu, getSession, getPreMonth } from "@/utils/util.js";
import tableComponents from "@/components/reportTable/tableComponents.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";
export default {
  data() {
    return {
      dataList: {},
      headList: [],
      archiveShow: false,
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
    handleArchive() {
      this.$confirm("是否确定封存此月数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(this.API.depositAssessmentData, {
          yf: this.filterData.yf,
          khlx: "1"
        }).then(res => {
          if (res.state == "success") {
            if (!!res.data) {
              this.$alert("封存成功!", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
              this.archiveShow = false;
            } else {
              this.$alert("封存失败!", "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      });
    },
    exportTable() {
      this.filterData.yf = !this.filterData.yf?'':this.filterData.yf
      window.open(
        window.baseurl +
          "assessment/exportydkhb.do?bm=" +
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
    handleChangeFilter(data,params) {
      this.filterData = data;
      this.currentPage = 1;
      this.ydkhb();
       if(!!params){
        this.hasDepositData();
      }
    },
    hasDepositData() {
      this.$get(this.API.hasDepositData, {
        yf: this.filterData.yf,
        khlx: "1"
      }).then(res => {
        if (res.state == "success") {
          this.archiveShow = !res.data;
        }
      })
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
      let url = "";
      let arr = params[i].en.split(",");
      let obj = {
        yf: this.filterData.yf,
        rybh: data[0],
        rygh: data[1]
      };
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
      if (arr[0] == "lcbjs" || arr[0] == "lcbdcs") {
        url = "/khbbdetail/lcbxq";
        delete obj.rybh;
      } else if (
        arr[0] == "wtsljs" ||
        arr[0] == "wtslaqwcs" ||
        arr[0] == "dyslzs" ||
        arr[0] == "aqsl"
      ) {
        url = "/khbbdetail/wt";
        delete obj.rygh;
      } else if (arr[0] == "tscls") {
        url = "/khbbdetail/ts";
        delete obj.rybh;
      } else if (arr[0] == "rbbts") {
        url = "/rbdetail";
        obj["sfbt"] = "1";
        obj["sfglpz"] = "0";
        delete obj.rygh;
      } else if (arr[0] == "zbbts") {
        url = "/zbdetail";
        obj["sfbt"] = "1";
        obj["sfglpz"] = "0";
        delete obj.rygh;
      } else {
        return;
      }
      // let decodeData = window.btoa(JSON.stringify(obj));
      let routeData = this.$router.resolve({
        path: url,
        query: obj
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    let date = new Date().getFullYear() + "-" +
      (new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1));
    this.filterData.yf = getPreMonth(date);
    this.$nextTick(() => {
      this.ydkhb();
    });

    this.hasDepositData();
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
