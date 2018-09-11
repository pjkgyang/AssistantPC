<template>
  <div class="view-pannel-xmlist height100" flex-column>
    <div flex-1 flex>
      <div class="pannel-xmlist-mid" col=1 flex-column>
        <div v-for="(xmtj,index) in xmtjList" :key="index"  >
          <card class="xmtj-xmlist">
            <div class="card-head" slot="head">
            <h3  @click="checkItemDetails(xmtj)" class="home-xmmc">[{{xmtj.xmbh}}]{{xmtj.xmmc}}</h3></div>
            <div class="card-body card-body__syqk height100" slot="body" >
              <pannel3-xgyx :xmtj="xmtj"></pannel3-xgyx>
            </div>
          </card>
        </div>
         <div v-if="shown"  col=1 center>
             <p><img src="static/img/none.png" alt=""><br><span style="font-weight:700;font-size:16px">暂无项目</span></p>
         </div>
        <div class="pannel3_pagation" v-if="total>5">
           <pagination :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Card from "@/components/overviewComponents/card.vue";
import Pannel3Xgyx from "@/components/overviewComponents/pannel3-xgyx.vue";


import {
  getTop5,
  getDwXmTj,
  getDwXmTjRT,
  queryRecentQuestions,
  queryRecentComplaints
} from "@/api/home.js";
import pagination from "@/components/BusinessPage/pagination.vue";
export default {
  data() {
    return {
      loading: false,
      schoolNames: "",
      schoolNamesOptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        }
      ],
      xmtjList: [{
          xmmc:''
      }],
      problems: [],
      complaint: [],
      top5List: [],
      statisticsList: {},
      questionAll: "",
      complaintAll: "",
      dwbh: "",
      dwmc: "",
      zsdm: "",
      pageSize: 5,
      total: null,
      data:{},
      shown:false,
      xmmcValue:"",
      xmfl:null,
    };
  },
  mounted() {
     this.dwmc = this.$route.query.dwmc
     this.xmfl = this.$route.query.xmfl
     switch(this.xmfl){
            case '0':
            document.title = '在建项目数';
            break;
            case '1':
            document.title = '售后项目数';
            break;
            case '2':
            document.title = '过保项目数';
            break;
            case '3':
            document.title = '已关闭项目数';
            break;
            default:
            break;
     }
     this.getDwXmTjRT(1);
  },
  methods: {
    checkItemDetails(param){  //查看项目详情
       this.data.xmbh = param.xmbh;
       this.data.xmmc = param.xmmc;
       this.data.yfzrrxm = param.xmjl
       this.data.isAll = true;
       let routeData = this.$router.resolve({
        name: "ItemDetail",
        query:this.data,
      });
      window.open(routeData.href, "_blank");
    },

    handleCurrentChange(data){  // 分页切换
       this.getDwXmTjRT(data);
    },
    
    //   获取单位项目统计
    getDwXmTj() {
      getDwXmTj({
        dwmc: this.dwmc
      }).then(({ data }) => {
        if (data.state == "success") {
          this.statisticsList = data.data;
        }
      });
    },

    getDwXmTjRT(curPage,keyword) {
      getDwXmTjRT({
        dwmc: this.dwmc,
        curPage: curPage,
        pageSize: this.pageSize,
        keyword:keyword||"",
        xmfl:this.xmfl
      }).then(({ data }) => {
        if (data.state == "success") {
          this.total = data.data.records;
          if (data.data.rows != null && data.data.rows.length != 0 ) {
            this.xmtjList = data.data.rows;
            this.shown = false
          }else{
            this.xmtjList = []
            this.shown = true
          }
        }else{
          this.$alert(data.msg, '提示', {
          confirmButtonText: '确定',
          type:'error',
          callback: action => {}
        });
        }
      });
    },
  },
  components: {
    Card,
    Pannel3Xgyx,
    pagination
  }
};
</script>
<style lang="scss">
.view-pannel-xmlist {
  // min-height: 1200px;
  // min-width: 1250px;
  width:86%;
  margin: 0 auto;
}

.home-xmmc:hover{
 color: rgb(96, 172, 248);
 text-decoration: underline;
 text-underline-position: auto;
 cursor:pointer;
}
.pannel-xmlist-mid .card-box {
  max-height: 440px !important;
}
.pannel3_pagation {
  background: #fff;
  border-radius: 4px;
  text-align: right;
  margin:2px 6px 6px;
}
.card-head h3 {
  font-size: 18px;
  color: #464c5b;
  letter-spacing: 0;
  text-align: left;
  font-weight: 700;
  line-height: 30px;
}
.xmtj-xmlist{
  height: 400px;
  margin-bottom: 10px;
}
</style>
