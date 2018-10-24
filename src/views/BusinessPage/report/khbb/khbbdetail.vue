<template>
    <div class="pd-10">
        <div class="bgfff">
            <h4>考核报表-{{$route.params.id.includes('ts')?'投诉详情':$route.params.id.includes('wt')?'问题详情':'里程碑详情'}}</h4>
            <reportTable :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" :exportShow="false" :indexArr='[]' :widthArr="[0,2]" :Width="'140'" :Height="0"></reportTable>
        </div>
    </div>
</template>

<script>
import reportTable from "@/components/reportTable/tableComponents.vue";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 15,
      dataList: {},
      queryData:{}
    };
  },
  methods: {
    handleCurrentChange() {},

    getTsxqb() {
      this.$get(this.API.tsxqb, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        yf: this.queryData.yf,
        slrbh: this.queryData.bh,

      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    },
    getLcbxqb() {
      this.$get(this.API.lcbxqb, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        yf: this.queryData.yf,
        zrrbh: this.queryData.bh,
        lcbjs: !this.queryData.lcbjs ? "" : this.queryData.lcbjs,
        lcbdcs: !this.queryData.lcbdcs ? "" : this.queryData.lcbdcs
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    },
    getWtxqb() {
      this.$get(this.API.wtxqb, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        yf: this.queryData.yf,
        slrbh: this.queryData.bh,
        yhbh: this.queryData.gs,
        wtsljs: !this.queryData.wtsljs ? "" : this.queryData.wtsljs,
        wtslaqwcs: !this.queryData.wtslaqwcs? "": this.queryData.wtslaqwcs
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    }
  },
  mounted() {
    this.queryData = JSON.parse(window.atob(this.$route.params.id.split('&')[1]));
    // console.log(this.$route)
    if (this.$route.path.includes("/khbbdetail/ts")) {
      this.getTsxqb();
    } else if (this.$route.path.includes("/khbbdetail/wt")) {
      this.getWtxqb();
    } else {
      this.getLcbxqb();
    }
  },
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
