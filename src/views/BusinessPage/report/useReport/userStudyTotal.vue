<template>
    <div>
        <div>
			<br>
			<span class="filter-weight">接入开始日期：</span>
			<el-date-picker
			  v-model="jrksrq"
			  type="date"
			  placeholder="选择日期"
			  size="mini"
			  format="yyyy 年 MM 月 dd 日"
			  value-format="yyyy-MM-dd">
			</el-date-picker>&#x3000;
			<span class="filter-weight">接入结束日期：</span>
			<el-date-picker
			  v-model="jrjsrq"
			  type="date"
			  size="mini"
			  placeholder="选择日期"
			  format="yyyy 年 MM 月 dd 日"
			  value-format="yyyy-MM-dd">
			</el-date-picker>
			&#x3000;
			<el-button size="mini" type="primary" @click="handleCheck">查询</el-button>
        </div>
        <div>
            <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" 
            @handleCurrentChange="handleCurrentChange"  @exportTable="exportTable"  @handleXxwt="handleXxwt"
            :indexArr='[0]' :widthArr="[]" :Width="'130'" :Height="240"></tableComponents>
        </div>
    </div>
</template>
<script>

import tableComponents from "@/components/reportTable/tableComponents.vue";

export default {
  data() {
    return {
      jrksrq:"",
	  jrjsrq:"",
      dataList: {},
      headList: [],

      currentPage: 1,
      pageSize: 18
    };
  },
  methods: {
    exportTable() {
		this.jrksrq = !this.jrksrq?'':this.jrksrq;
		this.jrjsrq = !this.jrjsrq?'':this.jrjsrq;
		window.open(window.baseurl + 'userstudyreport/exportUserStudyTotalReport.do?startDate='+this.jrksrq +'&endDate='+this.jrjsrq);
	},
	handleCheck(){
		this.currentPage = 1;
		this.queryUserStudyTotalReport();
	},
    handleCurrentChange(data) {
      this.currentPage = data;
      this.queryUserStudyTotalReport();
    },
    handleChangeFilter(data) {
      this.currentPage = 1;
      this.filterDate = data;
      this.queryUserStudyTotalReport();
    },
    // 用户登录统计报表
    queryUserStudyTotalReport(curPage) {
      this.$get(this.API.queryUserStudyTotalReport, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        startDate: !this.jrksrq?'':this.jrksrq,
		endDate: !this.jrjsrq?'':this.jrjsrq,
      }).then(res => {
        if(res.state == 'success'){
            this.dataList = res.data;
        }
      });
    },
    handleXxwt(data, i, params) {
      // let routeData = this.$router.resolve({
      //   path: "/userDetail",
      //   query:{
      //       bh:data[0]
      //   }
      // });
      // window.open(routeData.href, "_blank");
    }
  },
  mounted() {
	this.queryUserStudyTotalReport();
  },
  activated() {},
  watch: {},
  components: {
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
