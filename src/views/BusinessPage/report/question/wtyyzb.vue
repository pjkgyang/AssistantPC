<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'"></filterComponent>
    </div>
    <div>
      <tableComponents :tableData="dataList" :pageShow="false" :exportShow="false" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" @handleXxwt="handleXxwt" @exportTable="exportTable" 
			:indexArr='[20]' :widthArr="[1]" :Width="'130'" :Height="250"  ></tableComponents>
    </div>
  </div>
</template>

<script>
import tableComponents from "@/components/reportTable/tableComponents.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";

export default {
  data() {
    return {
      dataList: {},
      filterList: ["qygc","dwlx", "date"],
      filterData: {
        gczd: "",
		dwlx: "",
        date: ""
      },
      currentPage: 1,
      pageSize: 15,
    };
  },
  methods: {
    exportTable() {
     
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.questionOperatIndicator();
    },

    handleChangeFilter(data,params) {
      this.filterData = data;
      this.currentPage = 1;
      this.questionOperatIndicator();
    },

    questionOperatIndicator() {
      this.$get(this.API.questionOperatIndicator, {
        qygc:this.filterData.gczd,
        dwlx:this.filterData.dwlx,
        startDt: !this.filterData.date[0] ? "" : this.filterData.date[0],
        endDt: !this.filterData.date[1] ? "" : this.filterData.date[1],
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        } else {
          this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
        }
      });
    },

    // 查看详情
  	handleXxwt(data, i, params) {
		let obj = {
            qygc:this.filterData.gczd,
            dwlx:this.filterData.dwlx,
            startDt: !this.filterData.date[0] ? "" : this.filterData.date[0],
            endDt: !this.filterData.date[1] ? "" : this.filterData.date[1],
        }
        let arr = params[i].en.split(",");
        if (params[i].en.indexOf(",") != -1 && !!params[i].canRedirect) {
            obj[arr[0]] = data[i];
        }
        let routeData = this.$router.resolve({
            path: "/report-list/detail.html",
            query:obj
        });
        window.open(routeData.href, "_blank");
    },
  },
  mounted() {
      this.questionOperatIndicator();
  },
  activated() {

  },
  watch: {},
  components: {
    filterComponent,
    tableComponents
  }
};
</script>
<style>
</style>
