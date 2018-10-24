<template>
<div class="pd-10">
    <div class="xxts-pannel">
        <tableLayout>
            <section slot="top"></section>
            <section slot="bottom">
               <tableComponents :tableData="detailData"  :pageShow="true" :currentPage="currentPage" :pageSize="pageSize"   @handleCurrentChange="handleCurrentChange"
            :indexArr='[0,1]' :widthArr="[1,2,3,4,5]" :Width="'165'" :Height="0" :exportShow="false"></tableComponents>
            </section>
        </tableLayout>
    </div>
    </div>
</template>

<script>
import tableComponents from "@/components/reportTable/tableComponents.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
export default {
  data() {
    return {
      detailData:{},
      tableHeight: window.innerHeight - 400,
      currentPage:1,
      pageSize:15,
      total:0,
      queryData:{}
    };
  },
  methods: {
    //   handleSizeChange(data){
    //     this.queryData.curPage = 1;
    //     this.queryData.pageSize = data;
    //     this.yswgphxqb(); 
    //   },
      handleCurrentChange(data){
        this.queryData.curPage = data;
        this.yswgphxqb();
      },
      yswgphxqb(){
          this.$get(this.API.yswgphxqb,this.queryData).then((res)=>{
              if(res.state == 'success'){
                  this.detailData = res.data
              }
          })
      }
  },
  mounted() {
    this.queryData = this.$route.query
    this.queryData.curPage = this.currentPage;
    this.queryData.pageSize = this.pageSize;
    this.yswgphxqb();
  },
  components: { tableLayout,tableComponents }
};
</script>

<style lang='scss' scoped>
.xxts-pannel {
  width: 90%;
  margin: 0 auto ;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  
  h4,
  h5 {
    font-weight: 700;
  }
  .fontRed {
    color: rgb(182, 74, 74);
  }
  .table {
    border: none;
    tr {
      height: 37px;
      text-align: center;
    }
    th {
      background: #f5f7fa;
      text-align: center;
    }
  }
}
</style>
