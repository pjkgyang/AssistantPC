<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'" :filterShow="filterShow"></filterComponent>
    </div>
    <div>
      <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleXxwt="handleXxwt" @exportTable="exportTable" :indexArr='[20]' :widthArr="[]" :Width="'130'" :Height="0" :archiveShow="archiveShow" @handleArchive="handleArchive"></tableComponents>
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
      filterList: ["keyword", "yf", "bm"],
      filterData: {
        keyword: "",
        yf: "",
        bm: ""
      },
      currentPage: 1,
      pageSize: 15,
      filterShow: true
    };
  },
  methods: {
    handleArchive() {
      this.$confirm("是否确认此月数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(this.API.depositAssessmentData, {
          yf: this.filterData.yf,
          khlx: "3"
        }).then(res => {
          if (res.state == "success") {
            if (!!res.data) {
              this.$alert("确认成功!", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
              this.archiveShow = false;
            } else {
              this.$alert("确认失败!", "提示", {
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
      window.open(
        window.baseurl +
          "assessment/exportydwtshgsb.do?bm=" +
          this.filterData.bm +
          "&yf=" +
          this.filterData.yf +
          "&keyword=" +
          this.filterData.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.ydwtshgsb();
    },
    handleChangeFilter(data,params) {
      this.filterData = data;
      this.currentPage = 1;
      this.ydwtshgsb();
      if (!!params) {
        this.hasDepositData();
      }
    },
    hasDepositData() {
      this.$get(this.API.hasDepositData, {
        yf: this.filterData.yf,
        khlx: "3",
        qygc:this.filterData.bm
      }).then(res => {
        if (res.state == "success") {
          this.archiveShow = !res.data;
        }
      })
    },
    ydwtshgsb() {
      this.$get(this.API.ydwtshgsb, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        bm: this.filterData.bm,
        yf: this.filterData.yf,
        keyword: this.filterData.keyword
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
      let url = "";
      let arr = params[i].en.split(",");
      let obj = {
        yf: this.filterData.yf,
        rygh: data[0]
      };
      if (arr[0] && !!params[i].canRedirect) {
        url = "/khbbdetail/shgs";
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
    if (
      JSON.parse(sessionStorage.userInfo).userGroupTag.indexOf("JYGL") != -1
    ) {
      this.filterShow = true;
    } else {
      this.filterShow = false;
    }
    let date = new Date().getFullYear() + "-" +
      (new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1) : (new Date().getMonth() + 1));
    this.filterData.yf = getPreMonth(date);
    this.$nextTick(() => {
      this.ydwtshgsb();
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
