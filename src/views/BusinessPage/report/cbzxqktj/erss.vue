<template>
    <div class="pannelPadding-10">
        <div class="pannelPaddingBg-10">
            <h4 text-center>{{$route.query.xz=='0'?'二开调用详情':$route.query.xz=='1'?'实施调用详情':'报销提报详情'}}</h4>
            <h4 v-if="!!tableData.length && tableData[0].xmbh ">[{{tableData[0].xmbh}}]{{tableData[0].xmmc}}</h4>
            <div class="mg-12" text-right v-if="$route.query.xz != '1'">
              <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
            </div>
            <ekdyTable :tableData="tableData" v-if="$route.query.xz == '0'"></ekdyTable>
            <ekssTable :tableData="tableData" v-if="$route.query.xz == '1'"></ekssTable>
            <bxfyTable :tableData="tableData" v-if="!$route.query.xz"></bxfyTable>
            <div text-right>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 35, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import ekdyTable from "@/components/table/ekdy.vue";
import ekssTable from "@/components/table/ekss.vue";
import bxfyTable from "@/components/table/bxfy.vue";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0
    };
  },
  methods: {
    //导出
    handleExport(){
   
      if(!this.$route.query.xz){   // 报销
        window.open(this.API.exportBxbDetail+'?xmbh='+this.$route.query.xmbh);
      }else{ //调用
        window.open(this.API.exportEktbDetail+'?xmbh='+this.$route.query.xmbh+'&xz=0');
      }
    },
    // 页码分页
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      if (!!this.$route.query.xz) {
        this.pageEktbDetail();
      } else {
        this.pageBxDetail();
      }
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      if (!!this.$route.query.xz) {
        this.pageEktbDetail();
      } else {
        this.pageBxDetail();
      }
    },
    pageEktbDetail() {
      this.$get(this.API.pageEktbDetail, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh,
        xz: this.$route.query.xz
      }).then(res => {
        if (res.state == "success") {
          if(!!res.data.rows){
            this.tableData = res.data.rows;
          }else{
            this.tableData =  [];
          }
          this.total = res.data.records;
        }
      });
    },
    pageBxDetail() {
      this.$get(this.API.pageBxDetail, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xmbh: this.$route.query.xmbh
      }).then(res => {
        if (res.state == "success") {
         if(!!res.data.rows){
            this.tableData = res.data.rows;
          }else{
            this.tableData =  [];
          }
          this.total = res.data.records;
        }
      });
    }
  },
  mounted() {
    if (!!this.$route.query.xz) {
      this.pageEktbDetail();
    } else {
      this.pageBxDetail();
    }
  },
  components: { ekdyTable, ekssTable, bxfyTable }
};
</script>

<style scoped>
h4 {
  font-weight: 700;
  margin: 10px 0 !important;
}
</style>
