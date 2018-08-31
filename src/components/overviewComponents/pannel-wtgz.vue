<template>
  <div class="card-body height100 pannel-wtgz" flex-column>
    <!-- <span class="introText" col=1>自2018年1月1日项目启动开始统计</span> -->
    <div flex-column col=14>
      <div class="wtgz-card" flex spacearound col=2>
        <div class="wtgz-card__item wtgz-card__item01" :style="item01" colcenter spacearound col=3>
          <div><img :src="wtgzCardIcon1" alt="" width="20" height="20"><span class="text">催办</span></div>
          <span class="nums">{{wtgz.wtcbzs}}</span>
        </div>
        <div class="wtgz-card__item wtgz-card__item02" :style="item02" colcenter spacearound col=3>
          <div><img :src="wtgzCardIcon2" alt="" width="20" height="20"><span class="text">未完成</span></div>
          <span class="nums">{{wtgz.wtwclzs}}</span>
        </div>
        <div class="wtgz-card__item wtgz-card__item03" :style="item03" colcenter spacearound col=3>
          <div><img :src="wtgzCardIcon3" alt="" width="20" height="20"><span class="text">已完成</span></div>
          <span class="nums">{{wtgz.wtyclzs}}</span>
        </div>
      </div>
      <div class="wtgz-mid" col=3 flex>
        <div class="wtgz-mid__left" center flex col=5>
          <circle-bar col=2 :percent="parseInt(wtgz.p_wtyql)"></circle-bar>
          <circle-bar col=2 :percent="parseInt(wtgz.p_wtmyd)" outerStroke="rgba(25, 190, 107,0.1)" inner-stroke="#19BE6B" text="满意度"></circle-bar>
          <div col=2 flex-column spacearound class="right-split">
            <div class="satisfy" col=2><span class="pull-left" style="width:30px;">满意</span><img :src="satisfy" alt="satisfy" width="20"><span style="font-weight: bold;font-size: 16px;" class="pull-right">{{wtgz.wtmyzs}}</span></div>
            <div class="notsatisfy" col=2><span class="pull-left" style="width:30px;white-space:nowrap">不满意</span><img :src="notsatisfy" alt="notsatisfy" width="20"><span style="font-weight: bold;font-size: 16px;" class="pull-right">{{wtgz.wtbmyzs}}</span></div>
          </div>
        </div>
        <div class="wtgz-mid__right" col=5 flex>
          <!-- <div class="mid__right-item" flex-column col=2 v-for="(item) in wtgzMidOptions">
            <span col=6 center class="nums">{{item.value}}</span>
            <span col=5 center class="text">{{item.name}}</span>
          </div> -->
           <div class="mid__right-item" flex-column col=2 >
            <span col=6 center class="nums">{{wtgz.wtwhfzs}}</span>
            <span col=5 center class="text">未回复</span>
          </div>
           <div class="mid__right-item" flex-column col=2 >
            <span col=6 center class="nums">{{wtgz.wtyqwhfzs}}</span>
            <span col=5 center class="text">逾期未响应</span>
          </div>
           <div class="mid__right-item" flex-column col=2 >
            <span col=6 center class="nums">{{wtgz.wtyqwwczs}}</span>
            <span col=5 center class="text">逾期未完成</span>
          </div>
           <div class="mid__right-item" flex-column col=2 >
            <span col=6 center class="nums">{{wtgz.wtwjjsjzs}}</span>
            <span col=5 center class="text">无解决时间</span>
          </div>
        </div>
      </div>
      <div class="wtgz-list" col=5 flex>
        <div class="wtgz-list__left " col=5>
          <h4>最近提出</h4>
          <div  v-if="wtgz.zjtcwtList != null && wtgz.zjtcwtList.length != 0" class="list__left--item right-split" v-for="(item,index) in wtgz.zjtcwtList">
            <h5 :title="item.bt"><a href="javaScript:void(0)" @click="handleOpenQuestionDetail(item.wid)">{{index+1}}.{{item.bt}}</a></h5>
            <span :class='{tag:true,"tag-green":item.zt=="已受理","tag-ywc":item.zt=="已完成","tag-yellow":item.zt=="已延期","tag-red":item.zt=="未受理"}'>{{item.zt}}</span>
            <span class="time">{{item.fbrq}}</span>
          </div>
          <div v-if="wtgz.zjtcwtList == null ||wtgz.zjtcwtList.length == 0" class="wtgz-list__empty">
              <!-- <img src="static/img/none.png" alt=""> -->
              <p style="line-height:100px;font-weight:700">暂无内容</p>
          </div>
        </div>
        <div class="wtgz-list__left" col=5>
          <h4>最近催办</h4>
          <div v-if="wtgz.zjcbwtList !=null && wtgz.zjcbwtList.length != 0" class="list__left--item right-split" v-for="(item,index) in wtgz.zjcbwtList">
            <h5 :title="item.bt">{{index+1}}.{{item.bt}}</h5>
            <span :class='{tag:true,"tag-green":item.zt=="已受理","tag-ywc":item.zt=="已完成","tag-yellow":item.zt=="已延期","tag-red":item.zt=="未受理"}'>{{item.zt}}</span>
            <span class="time">{{item.fbrq}}</span>
          </div>
          <div v-if="wtgz.zjcbwtList ==null ||wtgz.zjcbwtList.length == 0"  class="wtgz-list__empty">
              <!-- <img src="static/img/none.png" alt=""> -->
             <p style="line-height:100px;font-weight:700">暂无内容</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import CircleBar from '@/components/overviewComponents/circle.vue'

import wtgzCard3 from '../../../static/img/wtgz-card3.png'
import wtgzCardIcon3 from '../../../static/img/wtgz-card-icon3.png'
import wtgzCard2 from '../../../static/img/wtgz-card2.png'
import wtgzCardIcon2 from '../../../static/img/wtgz-card-icon2.png'
import wtgzCard1 from '../../../static/img/wtgz-card1.png'
import wtgzCardIcon1 from '../../../static/img/wtgz-card-icon1.png'
import satisfy from '../../../static/img/wtgz-satisfy.png'
import notsatisfy from '../../../static/img/wtgz-notsatisfy.png'

export default {
  data() {
    return {
      item01:{
        backgroundImage: "url(" + require("../../../static/img/wtgz-card1.png") + ")",  
      },
      item02:{
        backgroundImage: "url(" + require("../../../static/img/wtgz-card2.png") + ")",  
      },
      item03:{
        backgroundImage: "url(" + require("../../../static/img/wtgz-card3.png") + ")",  
      },
      wtgzCard3,
      wtgzCardIcon3,
      wtgzCard2,
      wtgzCardIcon2,
      wtgzCard1,
      wtgzCardIcon1,
      satisfy,
      notsatisfy,
      wtgzMidOptions:[{
        name:'未回复',
        value:10
      },{
        name:'逾期未响应',
        value:10
      },{
        name:'逾期未完成',
        value:10
      },{
        name:'无解决时间',
        value:10
      }],
      lastPropagations:[{
        title:'1.任务已经完成，申请验收',
        status:0,
        time:'上午8:00'
      },{
        title:'1.任务已经完成，申请验收',
        status:1,
        time:'上午8:00'
      },{
        title:'1.任务已经完成，申请验收',
        status:2,
        time:'上午8:00'
      }]
    }
  },
    props:{
     wtgz:{
       type:Object,
       default:function(){
         return {}
       }
     },
  },
  mounted() {
       this.wtgzMidOptions[0].value =  this.wtgz.wtwhfzs
       this.wtgzMidOptions[1].value =  this.wtgz.wtyqwhfzs
       this.wtgzMidOptions[2].value =  this.wtgz.wtyqwwczs
       this.wtgzMidOptions[3].value =  this.wtgz.wtwjjsjzs
       window.onerror = function(){return true;}
  },
  methods: {
    handleOpenQuestionDetail(param){
      let routeData = this.$router.resolve({
        name: "questionDetail",
        query: {
          wid: param
        }
      });
      window.open(routeData.href, "_blank");
    }
  },
  components: {
    CircleBar
  },
}

</script>
<style lang="scss">
.pannel-wtgz {
  .wtgz-card {
    margin: 0 0 10px 0;
  }
  .mid__right-item .nums{
    font-size: 24px;font-weight: bold;color: #F56C6C;
  }
  .mid__right-item .text{
    font-size: 13px;color: #9EA7B4;
  }
  .wtgz-card__item {
    background-position: center center;
    background-repeat: no-repeat;
    margin: 8px;
    border-radius: 8px;
  }

  .wtgz-card__item img {
    vertical-align: bottom;
    margin-right: 8px;
  }
  .wtgz-card__item span.nums{
    color:#fff;font-size: 26px;font-weight: bold;
  }
  .wtgz-card__item span.text{
    color:#fff;font-size: 16px;
  }
  .wtgz-card__item01 {
    box-shadow: 0 9px 16px 0 #D4CBF1;
    // background-image:url('../../static/img/wtgz-card1.png')
    background-size: cover;
  }
  .wtgz-list__left {
    width: 50%;
  }
  .wtgz-list__left .wtgz-list__empty{
    text-align:center;
    padding-top:30px;

  }
  .wtgz-list__left .wtgz-list__empty p{
    font-size:16px;
    font-weight: 700;
  }
  .wtgz-list__left:last-child .right-split:after{
    width:0;
  }
  .wtgz-card__item02 {
    box-shadow: 0 9px 16px 0 #EDCDBE;
    // background-image:url('../../static/img/wtgz-card2.png')
    background-size: cover;
  }

  .wtgz-card__item03 {
    box-shadow: 0 9px 16px 0 #AADCD7;
    // background-image:url('../../static/img/wtgz-card3.png')
    background-size: cover;
  }

  .satisfy {
    color: #23C172;
    padding: 5px;
  }

  .notsatisfy {
    color: #FFAC36;
    padding: 5px;
  }


  .wtgz-mid__right {
    padding: 15px;
  }

  .wtgz-list {
    border-top: 1px solid #EBEEF5;
  }

  .wtgz-list h4 {
    padding: 10px 0;
    font-weight: 700;
  }

  .wtgz-list .list__left--item {
    margin-bottom: 4px;
  }

  .wtgz-list .list__left--item h5 {
    font-size: 12px;
    color: #464C5B;
    font-weight: normal;
    width:100%;
    // text-overflow: ellipsis;
    // overflow: hidden;
    // white-space: nowrap;
  }

  .wtgz-list__left {
    padding: 0 16px;
  }

  .wtgz-list .list__left--item .time {
    color: #9EA7B4;
  }
}

</style>
