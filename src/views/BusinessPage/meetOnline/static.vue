<template>
  <div class="myitem-meet">
    <tableLayout class="meet-content" flex-column>
      <section slot="top" style="border-bottom:1px solid #EBEEF5" col=1>
        <meetFilter :placeholder="'学校名称/项目名称/项目编号/合同编号'" :type="$route.name" :filterArr="[]" @handleChangeFilter="handleChangeFilter"></meetFilter>
      </section>
      <section slot="bottom" col=2>
        <section>
          <tableComponents
          :tableData="dataList"
          :exportShow="false"
          :pageShow="false"
          @exportTable="exportTable"
          @handleXxwt="handleXxwt"
          :indexArr="[0, 1]"
          :widthArr="[0]"
          :Width="'80'"
          :Height="0"
        ></tableComponents>
        </section>
      </section>
    </tableLayout>
  </div>
</template>

<script>
  import meetFilter from "@/views/BusinessPage/meetOnline/filter.vue";
  import tableLayout from "@/components/layout/tableLayout.vue";
  import tableComponents from "@/components/reportTable/tableComponents.vue";


  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 15,
        total: 0,
        dataList: {},
        filterData: {
          meetingFormat:"",
          meetingStatus:"",
          internalMeeting:"",
          startDateTime:"",//计划开始日期
          endDateTime:"",//计划结束日期
        },
      };
    },
    methods: {
       exportTable(){

       },

       handleXxwt(data, i, params){
         let obj = {
           startDateTime:this.filterData.startDateTime,
           endDateTime:this.filterData.endDateTime,
           meetingFormat:this.filterData.meetingFormat,
           meetingStatus:this.filterData.meetingStatus,
           internalMeeting:this.filterData.internalMeeting
         };
        let arr = params[i].en.split(",");
        if (params[i].en.indexOf(",") != -1 && !!params[i].canRedirect) {
          obj[arr[0]] = data[i];
          // if (arr[0] == arr[1]) {
          //   obj[arr[0]] = data[i];
          // } else {
          //   arr.forEach((ele, i, arr) => {
          //     if (i == 0) {
          //       obj[ele] = arr[1];
          //     }
          //   });
          // }
        }else if(!params[i].canRedirect) return;
        let routeData = this.$router.resolve({
          path: '/meeting/staticdetail',
          query:obj
        });
        window.open(routeData.href, "_blank");
       },
      // 筛选条件
      handleChangeFilter(data) {
        this.filterData = data;
        this.currentPage = 1;
        this.queryMeetingStat();
      },

      handleSizeChange(data) {
        this.pageSize = data;
        this.currentPage = 1;
        this.queryMeetingStat();
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.queryMeetingStat();
      },
     
     // 获取专项服务列表  
      queryMeetingStat() {
        this.$get(this.API.queryMeetingStat, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          meetingFormat:this.filterData.meetingFormat,
          meetingStatus:this.filterData.meetingStatus,
          internalMeeting:this.filterData.internalMeeting,
          startDateTime:this.filterData.startDateTime,//计划开始日期
          endDateTime:this.filterData.endDateTime,//计划结束日期
        }).then(res => {
          if (res.state == "success") {
            this.dataList = res.data;
            this.total = res.data.records;
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
      this.queryMeetingStat();
    },
    props: {},
    components: {
      tableLayout,
      meetFilter,
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
