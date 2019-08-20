<template>
   <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10 ">
          <tableComponents
          :tableData="dataList"
          :exportShow="true"
          :pageShow="false"
          @exportTable="exportTable"
          @handleXxwt="handleXxwt"
          :indexArr="[0, 1]"
          :widthArr="[]"
          :Width="'80'"
          :Height="120"
        ></tableComponents>
        </section>
        <div text-right style="margin-top:2px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div> 
  </div>
</template>

<script>
  import tableComponents from "@/components/reportTable/tableComponents.vue";
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        dataList: {},
      };
    },
    methods: {
      handleXxwt(){
        return;
      },
      exportTable(){
        window.open(this.API.exportMeetingStatDetail+'?'+window.location.hash.split('?')[1])
      },
      handleSizeChange(data) {
        this.pageSize = data;
        this.currentPage = 1;
        this.queryMeetingStatDetail();
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.queryMeetingStatDetail();
      },
     
     // 获取专项服务列表  
      queryMeetingStatDetail() {
        let queryData = this.$route.query;
        queryData.curPage = this.currentPage;
        queryData.pageSize = this.pageSize;
        this.$get(this.API.queryMeetingStatDetail,queryData).then(res => {
          if (res.state == "success") {
            this.dataList = res.data;
            this.total = res.data.body.records;
          }else{
             this.$alert(res.msg, '提示', {
              confirmButtonText: '确定',
              type:'error'
            });
          }
        });
      },
    },
    mounted() {
     this.queryMeetingStatDetail();
    },
    props: {},
    components: {
      tableComponents
    }
  };
</script>

<style lang="scss" scoped>
  .myitem-meet {
    padding: 10px 20px;
    a{
      color: #409EFF;
    }
  }

  .pannel-cpmc:hover {
    text-decoration: underline !important;
  }

  .meet-content {
    padding: 10px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    overflow-y: auto;
  }
</style>
