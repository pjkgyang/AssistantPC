<template>
  <!-- <div style="position: relative;height:100%;"> -->
  <div class="project_toubiao">
    <div class="item_dataTab">
      <div style="width: 100%;;">
        <busy-nav
          @dropdownSelect="handleSelect"
          @dropdownSelectTwo="handleSelectT"
          @dropdownSelectThree="handleSelectTh"
          @dropdownSelectFour="handleSelectF"
        ></busy-nav>
      </div>
      <div class="item_dataTab_card">
        <item-card
          v-for="(data, index) in datas"
          :cardData="data"
          :data-fbbh="data.fbbh"
          :key="index"
          @handleFBdetails="handleFBdetails"
        ></item-card>
      </div>
      <div
        style="text-align:center;width:100%;height:100%;padding:50px 0;"
        v-if="datas.length == 0"
      >
        <img src="static/img/empty.png" alt />
        <br />
        <p>暂无项目</p>
      </div>
    </div>
    <div>
      <pagination
        v-if="totalPage != 1 && total != 0 && totalPage != null"
        :pageSize="pageSize"
        :total="total"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>
</template>
<script>
import busyNav from "@/components/BusinessPage/businessPageNav.vue";
import itemCard from "@/components/BusinessPage/itemCard.vue";
import pagination from "@/components/BusinessPage/pagination.vue";
import { EventBus } from "../../utils/util.js";
import { queryTbxx } from "@/api/toubiao.js";

export default {
  data() {
    return {
      datas: [],
      curPage: 1,
      pageSize: 12,
      total: null,
      keyword: "",
      gczd: "",
      zbzt: "01",
      fbxz: "",
      zzdy: "",
      sfgx: "",
      totalPage: null
    };
  },
  mounted() {
    this.queryTbxx(this.curPage, this.pageSize);
    EventBus.$on("searchInfo", param => {
      this.keyword = param;
      this.queryTbxx(1);
    });
  },
  methods: {
    // 工程战队
    handleSelect(data) {
      this.gczd = data;
      this.queryTbxx(1);
    },
    //  分包性质
    handleSelectT(data) {
      this.fbxz = data;
      this.queryTbxx(1);
    },
    // 分包状态
    handleSelectTh(data) {
      this.zbzt = data;
      this.queryTbxx(1);
    },
    //  购销合同
    handleSelectF(data) {
      this.sfgx = data;
      this.queryTbxx(1);
    },
    handleFBdetails(data) {
      //跳转到分包详情
      let routeData = this.$router.resolve({
        path: "/businesspage/fbdetail",
        query: {
          xmbh: data.xmbh,
          fbbh: data.fbbh,
          r: data.tbrs
        }
      });
      window.open(routeData.href, "_blank");
    },
    handleCurrentChange(data) {
      this.queryTbxx(data);
    },
    queryTbxx(curPage) {
      queryTbxx({
        curPage: curPage,
        pageSize: 12,
        keyword: this.keyword || "",
        gczd: this.gczd || "",
        zbzt: this.zbzt || "",
        fbxz: this.fbxz || "",
        zzdy: this.zzdy || "",
        sfgx: this.sfgx || ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.datas = data.data.rows;
          this.total = data.data.records;
          this.totalPage = data.data.total;
        } else {
          this.$message(data.msg);
        }
      });
    }
  },
  //监听$emit的oneChange事件   关键字
  created() {},
  components: { itemCard, busyNav, pagination }
};
</script>
<style scoped>
.project_toubiao {
  width: 1300px;
  margin: 0 auto;
  box-shadow: 0 0 5px #999;
  overflow-x: hidden;
  background: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.item_dataTab {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.item_dataTab_card {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}
.item_dataTab::after {
  content: "";
  display: block;
  clear: both;
}
</style>
