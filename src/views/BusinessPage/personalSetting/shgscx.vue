<template>
  <div class="pd-10">
    <div class="bgfff">
        <div flex>
            <p class="query-title">高级查询:</p>
            <p>
                <el-input v-model="keyword" style="width:493px;" size="mini" placeholder="请输入项目编号/项目名称/合同编号/甲方负责人/乙方负责人" @change="handleSearch"></el-input>&#x3000;
                <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
            </p>
        </div>
        <!-- 结算状态 -->
        <div flex>
            <p class="query-title">结算状态:</p>
            <p class="query-list">
            <span  :class="{'bg-active':jszts == ''}" @click="handleFilterJSZT('')">全部</span>
            <span  v-for="jszt in jsztMenu"  :class="{'bg-active':jszts == jszt.id}"
                    :key="jszt.id" @click="handleFilterJSZT(jszt.id)">{{jszt.mc}}</span>
            </p>
       </div>
      <div text-right>
        <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
      </div>
      <reportTable :type="$route.params.id" :tableData="dataList" :pageShow="true" :currentPage="currentPage" 
      :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" :exportShow="false" :indexArr='[]' 
      :widthArr="[3]" :rowWidth="'300'" :Width="'140'" :Height="180" ></reportTable>
    </div>
  </div>
</template>

<script>
import reportTable from "@/components/reportTable/tableComponents.vue";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
      dataList: {},
      queryData: {},
      routePath: "",
      queryMark: "",

      jsztMenu: [
        { id: 1, mc: "结算" },
        { id: 2, mc: "不结算" },
        { id: 3, mc: "后续结算" }
      ],
      keyword: "",
      jszts: "" //结算状态
    };
  },
  methods: {
    handleSearch() {

    },
    handleFilterJSZT(data) {
      this.jszts = data;
     
    },
    handleExport() {
      let url = "";
      let param = "";
      // 考核报表详情
      if (this.$route.params.id == "lcbxq") {
        // 里程碑(奖励，考核)
        url = "assessment/exportYdkhlcbxqb.do";
        param = window.location.hash.split("?")[1];
        if (param.indexOf("&ydjl=1") != -1) {
          param = param.replace("&ydjl=1", "");
        }
      }
      if (this.$route.params.id == "wt") {
        // 问题
        url = "assessment/exportYdkhwtxqb.do";
        param = window.location.hash.split("?")[1];
      }
      if (this.$route.params.id == "ts") {
        // 投诉
        url = "assessment/exportYdkhtsxqb.do";
        param = "yf=" + this.queryData.yf + "&rygh=" + this.queryData.rygh;
      }
      // 售后工时详情
      if (this.$route.params.id == "shgs") {
        //售后工时
        url = "assessment/exportYdwtshgsxqb.do";
        param = window.location.hash.split("?")[1];
      }
      // 月度奖励详情
      if (this.$route.params.id == "ydjlwtxq") {
        //问题
        url = "assessment/exportYdjlwtxqb.do";
        param = window.location.hash.split("?")[1];
      }
      window.open(window.baseurl + url + "?" + param);
    },
    handleCurrentChange() {},
    ydwtshgsxqb() {
      this.$get(this.API.ydwtshgsxqb, this.queryData).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    }
  },
  mounted() {},
  components: { reportTable }
};
</script>

<style lang="scss" scoped>
.bgfff {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  h4 {
    margin: 10px 0 !important;
    font-weight: 700;
  }
}
</style>
