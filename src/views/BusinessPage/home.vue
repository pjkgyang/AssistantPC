<template>
  <div class="view-pannel3 height100" flex-column>
    <div class="total-select">
      <div class="select-group">
        <span class="select-group__title">学校名称<span style="color:#999">( 注 : 可输入学校名称查询 )</span></span>
        <el-select  v-model="schoolNames" filterable remote  clearable  placeholder="请选择" size="small" @change="changeUnit" :remote-method="remoteMethod">
          <el-option v-for="(item,index) in schoolNamesOptions" :key="index" :label="item.mc" :value="item.wid">
         </el-option>
        </el-select>
        <span class="select-group__title">项目名称</span>
        <el-input v-model="xmmcValue" placeholder="请输入项目名称/项目编号" size="small" style="width:210px" @change="queryItemEnter"></el-input>
        <el-button size="mini" type="primary" @click="queryItem">查询项目</el-button>
      </div>
    </div>
    <div flex-1 flex>
      <div class="pannel3-left" col=1 flex-column>
        <card col=4>
          <div class="card-head" slot="head">
            <h3>综合统计</h3></div>
          <div class="card-body card-body__zhtj height100" slot="body" flex-column>
            <div class="zhtj-card__item zhtj-card__item01" colcenter spacebetween col=3 @click="handlecheckDwXmtj(0)">
              <div><img :src="zhtjCardIcon1" alt="" width="20" height="20"><span class="text">在建项目数</span></div>
              <span class="nums">{{statisticsList.zjxmzs}}</span>
            </div>
            <div class="zhtj-card__item zhtj-card__item02" colcenter spacebetween col=3 @click="handlecheckDwXmtj(1)">
              <div><img :src="zhtjCardIcon2" alt="" width="20" height="20"><span class="text">售后项目数</span></div>
              <span class="nums">{{statisticsList.shxmzs}}</span>
            </div>
            <div class="zhtj-card__item zhtj-card__item03" colcenter spacebetween col=3 @click="handlecheckDwXmtj(2)">
              <div><img :src="zhtjCardIcon4" alt="" width="20" height="20"><span class="text">过保项目数</span></div>
              <span class="nums">{{statisticsList.gbxmzs}}</span>
            </div>
            <div class="zhtj-card__item zhtj-card__item04" colcenter spacebetween col=3 @click="handlecheckDwXmtj(3)">
              <div><img :src="zhtjCardIcon3" alt="" width="20" height="20"><span class="text">已关闭项目数</span></div>
              <span class="nums">{{statisticsList.ygbxmzs}}</span>
            </div>
          </div>
        </card>
        <card col=5>
          <div class="card-head" slot="head">
            <h3>热门应用TOP5</h3></div>
          <div class="card-body card-body__syqk" slot="body" flex>
            <top5-app :items="top5List"></top5-app>
          </div>
           <div slot="body" v-if="top5List.length == 0||top5List==null" style="text-align:center;padding:10px 0;">
                <img src="static/img/none.png" alt="">
                <p class="empty_content">暂无内容</p>
            </div>
        </card>
        <card col=1 hidden>
          <div class="card-head" slot="head">
            <h3>综合统计</h3></div>
          <div class="card-body card-body__syqk" slot="body" flex>
            综合统计
          </div>
        </card>
      </div>
      <div class="pannel3-mid" col=3 flex-column>
        <card col=1 v-for="(xmtj,index) in xmtjList" :key="index">
          <div class="card-head" slot="head">
          <h3 :data-info="xmtj.xmbh+'&'+xmtj.xmmc" @click="checkItemDetails" class="home-xmmc">[{{xmtj.xmbh}}]{{xmtj.xmmc}}</h3></div>
          <div class="card-body card-body__syqk height100" slot="body" >
            <pannel3-xgyx :xmtj="xmtj"></pannel3-xgyx>
          </div>
        </card>
         <div v-if="shown"  col=1 center>
             <p><img src="static/img/none.png" alt=""><br><span style="font-weight:700;font-size:16px">暂无项目</span></p>
         </div>
        <!-- <card col=1>
          <div class="card-head" slot="head">
            <h3>学工迎新项目</h3></div>
          <div class="card-body card-body__syqk height100" slot="body">
            <pannel3-xgyx></pannel3-xgyx>
          </div>
        </card> -->
        <div class="pannel3_pagation" v-if="total>3">
           <pagination :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </div>
      <div class="pannel3-right" col=1 flex-column >
        <card col=1  style="overflow-y:hidden;">
          <div class="card-head" slot="head">
            <h3 class="pull-left">问题</h3>
            <span class="pull-right card-head__more" @click="checkAllQuestion">查看更多...</span>
            <!-- ({{questionAll}}) -->
          </div>
          <div class="card-body card-body__wt" slot="body" flex-column >
            <div class="list__item right-split" v-for="(item,i) in problems" :key="i">
              <h5 ><a  href="javaScript:void(0)"  @click="handleOpenQuestionDetail(item.wid)">{{item.bt}}</a></h5>
              <span :class='{tag:true,"tag-green":item.zt=="已受理","tag-ywc":item.zt=="已完成","tag-yellow":item.zt=="已延期","tag-red":item.zt=="未受理"}'>{{item.zt}}</span>
              <span class="time">{{item.fbrq}}</span><br>
              <span>&nbsp;<span class="time"> 承诺结束日期 : {{!item.cnjsrq?'无':item.cnjsrq}}</span></span>
            </div>
            <div v-if="problems.length == 0||problems==null" style="text-align:center;padding:10px 0">
                <img src="static/img/none.png" alt="">
                <p class="empty_content">暂无内容</p>
            </div>
          </div>
        </card>
        <card col=1 style="overflow-y:hidden">
          <div class="card-head" slot="head">
            <h3 class="pull-left">投诉</h3>
            <span class="pull-right card-head__more" @click="checkAllComplaint">查看更多...</span>
          </div>
          <div class="card-body card-body__ts" slot="body" flex-column>
            <div class="list__item right-split" v-for="item in complaint">
              <h5><a href="javaScript:void(0)"  @click="handleOpenComplainDetail(item.wid)">{{item.bt}}</a></h5>
              <span :class='{tag:true,"tag-green":item.zt=="已受理","tag-ywc":item.zt=="已完成","tag-yellow":item.zt=="已延期","tag-red":item.zt=="未受理"}'>{{item.zt}}</span>
              <span class="time">{{item.fbrq}}</span>
            </div>
            <div v-if="complaint.length == 0||complaint==null" style="text-align:center;padding:10px 0">
                <img src="static/img/none.png" alt="">
                <p class="empty_content">暂无内容</p>
            </div>
          </div>
        </card>
        <card col=1 hidden>
          <div class="card-head" slot="head">
            <h3>综合统计</h3></div>
          <div class="card-body card-body__syqk" slot="body" flex>
            111
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Card from "@/components/overviewComponents/card.vue";
import CircleBar from "@/components/overviewComponents/circle.vue";
import zhtjCardIcon1 from "../../../static/img/zhtj-card-icon1.png";
import zhtjCardIcon2 from "../../../static/img/zhtj-card-icon2.png";
import zhtjCardIcon3 from "../../../static/img/zhtj-card-icon3.png";
import zhtjCardIcon4 from "../../../static/img/zhtj-card-icon4.png";

import Pannel3Xgyx from "@/components/overviewComponents/pannel3-xgyx.vue";
import Top5App from "@/components/overviewComponents/pannel3-top5app.vue";
import { getDwByUser } from "@/api/system.js";
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
      zhtjCardIcon1,
      zhtjCardIcon2,
      zhtjCardIcon3,
      zhtjCardIcon4,
      loading: false,
      schoolNames:"",
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
      xmtjList: [],
      problems: [],
      complaint: [],
      top5List: [],
      statisticsList: {},
      questionAll: "",
      complaintAll: "",
      dwbh: "",
      dwmc: "",
      zsdm: "",
      pageSize: 3,
      total: null,
      data:{},
      shown:false,
      xmmcValue:""
    };
  },
  mounted() {
    //    获取用户单位
   this.getDwByUser(true,'');
  },
  methods: {
    handleOpenQuestionDetail(param){  // 打开问题详情
      let routeData = this.$router.resolve({
        name: "questionDetail",
        query: {
          wid: param
        }
      });
      window.open(routeData.href, "_blank");
    },
    handleOpenComplainDetail(param){  // 打开投诉详情
      let routeData = this.$router.resolve({
        name: "complaintDetail",
        query: {
          wid: param
        }
      });
      window.open(routeData.href, "_blank");
    },
    handlecheckDwXmtj(param){
        let routeData = this.$router.resolve({
        name: "DwxmList",
        query: {
          dwmc:this.dwmc,
          xmfl:param
        }
      });
      window.open(routeData.href, "_blank");
    }, 
    queryItemEnter(val){
        this.getDwXmTjRT(1,val);
    },
    queryItem(){
        this.getDwXmTjRT(1,this.xmmcValue);
    },
    checkItemDetails(e){  //查看项目详情
       let xmbh = e.target.getAttribute('data-info').split('&')[0];
       let xmmc = e.target.getAttribute('data-info').split('&')[1];
       this.data.xmbh = xmbh;
       this.data.xmmc = xmmc;
       this.data.isAll = true
       this.$router.push({ name: 'Task',params:{data:this.data}});
    },
    checkAllQuestion(){
       this.$router.push({ name: 'Question',params:{dwmc:this.dwmc}});
    },
    checkAllComplaint(){
       this.$router.push({ name: 'Complaint'});
    },
    handleCurrentChange(data){  // 分页切换
       this.getDwXmTjRT(data);
    },
    changeUnit(val) {  //切换学校
        if(!val)  return;
        let obj = {};
        obj = this.schoolNamesOptions.find((item)=>{
            return item.wid === val;
        });
        this.dwbh = obj.wid
        this.dwmc = obj.mc
        this.zsdm = obj.ampxxdm
        if(this.zsdm != ''){
          this.getTop5(this.zsdm);
        }else{
          this.top5List = []
        }
        this.getDwXmTj();
        this.getDwXmTjRT(1);
        this.queryRecentQuestions();
        this.queryRecentComplaints();
    },
    remoteMethod(val) {  //远程搜索
      this.getDwByUser(false,val);
    },

    // 获取top5
    getTop5(zsdm) {
      getTop5({
        dwzsdm:zsdm
      }).then(({ data }) => {
        if (data.state == "success") {
             this.top5List = data.data;
        }
      });
    },
    //   获取单位项目统计
    getDwXmTj() {
      getDwXmTj({
        dwmc: this.dwmc,
      }).then(({ data }) => {
        if (data.state == "success") {
          this.statisticsList = data.data;
        }
      });
    },

    queryRecentQuestions() {
      queryRecentQuestions({
        curPage: 1,
        pageSize:5,
        unitNum: this.dwbh,
        isAll:true
      }).then(({ data }) => {
        if (data.state == "success") {
          this.questionAll = data.data.records;
          if (data.data.rows.length != 0 && data.data.rows != null) {
            this.problems = data.data.rows;
          }else{
            this.problems = [];
          }
        }
      });
    },

    queryRecentComplaints() {
      queryRecentComplaints({
        curPage: 1,
        pageSize: 5,
        unitNum: this.dwbh,
        isAll:true
      }).then(({ data }) => {
        if (data.state == "success") {
          this.complaintAll = data.data.records;
          if (data.data.rows.length != 0 && data.data.rows != null) {
            this.complaint = data.data.rows;
          }else{
            this.complaint = []
          }
        }
      });
    },
    getDwXmTjRT(curPage,keyword) {
      getDwXmTjRT({
        dwmc: this.dwmc,
        curPage: curPage,
        pageSize: this.pageSize,
        keyword:keyword||"",
        xmfl:""
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

    getDwByUser(type,keyword){
        getDwByUser({
        dwlx: "",
        curPage: 1,
        pageSize: 7,
        keyword:keyword
        }).then(({ data }) => {
        if (data.state == "success") {
            if(type){
              if(data.data.rows){
                  this.schoolNamesOptions = data.data.rows;
                  this.schoolNames = this.schoolNamesOptions[0].jc
                  this.dwbh = data.data.rows[0].wid;
                  this.dwmc = data.data.rows[0].mc;
                  this.zsdm = data.data.rows[0].ampxxdm;
                  if(this.zsdm != ''){
                    this.getTop5(this.zsdm);
                  }else{
                    this.top5List = []
                  }
                    this.getDwXmTj();
                    this.getDwXmTjRT(1);
                    this.queryRecentQuestions();
                    this.queryRecentComplaints();
              }
            }else{
              this.schoolNamesOptions = data.data.rows;  
            }
          }
        });
    }
  },
  components: {
    Card,
    CircleBar,
    Pannel3Xgyx,
    Top5App,
    pagination
  }
};
</script>
<style lang="scss">
.view-pannel3 {
  min-height: 1200px;
  min-width: 1250px;
}
.pannel3-mid {
  min-height: 1150px;
}
.home-xmmc:hover{
 color: rgb(96, 172, 248);
 text-decoration: underline;
 text-underline-position: auto;
 cursor:pointer;
}
.pannel3-mid .card-box {
  max-height: 380px !important;
}
.pannel3_pagation {
  background: #fff;
  border-radius: 4px;
  text-align: right;
  margin:2px 6px 6px;
}
.card-head__more {
  color: #1989fa;
  position: relative;
  top: 8px;
  cursor: pointer;
}

.card-head h3 {
  font-size: 18px;
  color: #464c5b;
  letter-spacing: 0;
  text-align: left;
  font-weight: 700;
  line-height: 30px;
}

.select-group {
  float: left;
  padding: 8px 30px 8px 5px;
}

.select-group__title {
  font-size: 14px;
  font-weight: bold;
  margin-right: 12px;
}

.total-select {
  flex: 48px 0 0;
}

.card-body__zhtj {
  .zhtj-card__item {
    padding: 0 20px;
    border-radius: 8px;
    color: #ffffff;
    margin: 10px;
    img {
      vertical-align: bottom;
    }
    .nums {
      font-size: 28px;
      font-weight: bold;
    }
    .text {
      padding-left: 12px;
      font-size: 14px;
    }
  }
  .zhtj-card__item:hover{
    box-shadow:0 2px 12px 0 rgba(0,0,0,.5);
    cursor: pointer;
  }
  .zhtj-card__item01 {
    background: #409eff;
  }
  .zhtj-card__item02 {
    background: #2ac376;
  }
  .zhtj-card__item03 {
    background: #ffa54d;
  }
  .zhtj-card__item04 {
    background: #ff6847;
  }
}

.card-body__wt,
.card-body__ts {
 
  margin-top: 8px;
  .list__item {
    padding: 4px;
    border-top: 1px solid #ebeef5;
  }

  .list__item h5 {
    font-size: 14px;
    color: #464c5b;
    font-weight: normal;
    padding:0 5px;
  }

  .wt-list__left {
    padding: 0 16px;
  }

  .list__item .time {
    color: #9ea7b4;
  }
}
.textElipase{
    overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}
</style>
