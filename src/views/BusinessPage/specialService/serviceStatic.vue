<template>
  <div class="myitem-zxfw">
    <tableLayout class="zxfw-content" flex-column>
        
      <section slot="top" style="border-bottom:1px solid #EBEEF5" col=1>
        <!-- <div class="mg-12">
            <el-button size="mini" type="primary">查询</el-button>
        </div> -->
        <zxfwFilter :placeholder="'学校名称/项目名称/项目编号/合同编号'" @handleChangeFilter="handleChangeFilter" :filterList="['jhksrq','jhjsrq','tbrq','qrrq']"></zxfwFilter>
      </section>
      <section slot="bottom" col=2>
        <section>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border >
            <el-table-column prop="xmbh" label="服务类型" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="htbh" label="计划总数" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmmc" label="为完成数" min-width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmlb" label="已完成数" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfzt" label="已关闭数" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfgx" label="超期未完成数" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dkl" label="超期完成数" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrrxm" label="按期完成率" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="1星" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="2星" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="3星" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="4星" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="5星" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pf" label="好评比例" width="80"></el-table-column>
            <el-table-column prop="pf" label="总投入工时" width="110"></el-table-column>
            <el-table-column prop="pf" label="确认老师" width="80"></el-table-column>
          </el-table>
        </section>
        <div text-right style="margin-top:2px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </section>
    </tableLayout>
  </div>
</template>

<script>
  import zxfwFilter from "@/views/BusinessPage/specialService/filter.vue";
  import tableLayout from "@/components/layout/tableLayout.vue";

  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        tableData: [],
      };
    },
    methods: {

      // 筛选条件
      handleChangeFilter(data) {
        this.filterData = data;
        this.currentPage = 1;
        this.pageActiveService();
      },


      handleSizeChange(data) {
        this.pageSize = data;
        this.currentPage = 1;
        this.pageActiveService();
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.pageActiveService();
      },


      pageActiveService() {
        this.$get(this.API.pageActiveService, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          cpbh: this.filterData.cpbh,
          cpmc: this.filterData.cpmc,
          zt: this.filterData.fwzt,
          jhksrq: this.filterData.jhksrq,
          jhjsrq: this.filterData.jhjsrq,
          sfgq: this.filterData.sfgq,
          keyword: this.filterData.keyword
        }).then(res => {
          if (res.state == "success") {
            this.tableData = res.data.rows;
            this.total = res.data.records;
          }
        });
      },
    },
    mounted() {
    
    },
    props: {},
    components: {
      tableLayout,
      zxfwFilter
    }
  };
</script>

<style lang="scss" scoped>
  .myitem-zxfw {
    padding: 10px 20px;
  }

  .pannel-cpmc:hover {
    text-decoration: underline !important;
  }

  .zxfw-content {
    padding: 10px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    overflow-y: auto;
  }
</style>
