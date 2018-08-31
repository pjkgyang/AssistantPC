<template>
  <div class="xgyx height100" flex-column>
    <div col=1>
      <span class="introText mr-20">项目经理</span><span class="baseText mr-20">{{xmtj.xmjl == ''?'暂无':xmtj.xmjl}}</span>
      <span class="introText mr-20">甲方负责人</span><span class="baseText mr-20">{{xmtj.jfxm == ''?'暂无':xmtj.jfxm}}</span>
      <span class="introText mr-20">项目建设周期</span><span class="baseText mr-20">{{xmtj.xmksrq==''?'无':xmtj.xmksrq}} 至 {{xmtj.xmjsrq==''?'无':xmtj.xmjsrq}}</span>
      <span class="introText mr-20">售后服务周期<span class="baseText">&#x3000;{{xmtj.fwqx==''?'无':xmtj.fwqx}} </span>月</span>
    </div>
    <div class="xgyx__body" flex col=14>
      <div class="xgyx__body--wtzz" col=4 flex-column>
        <h4 col=1>问题追踪</h4>
        <div class="xgyx__wtzz--container" col=8 flex-column>
          <div col=1 flex spacearound>
            <div class="vertical-card" flex-column>
              <span col=6 center class="nums">{{xmtj.wtwhfzs}}</span>
              <span col=5 center class="text introText">未回复</span>
            </div>
            <div class="vertical-card" flex-column>
              <span col=6 center class="nums">{{xmtj.wtyqwhfzs}}</span>
              <span col=5 center class="text introText">逾期未响应</span>
            </div>
            <div class="vertical-card" flex-column>
              <span col=6 center class="nums">{{xmtj.wtyqwwczs}}</span>
              <span col=5 center class="text introText">逾期未完成</span>
            </div>
            <div class="vertical-card" flex-column>
              <span col=6 center class="nums">{{xmtj.wtwjjsjzs}}</span>
              <span col=5 center class="text introText">无解决时间</span>
            </div>
          </div>
          <div col=3>
            <h5>最近提出</h5>
            <div class="list__item" v-for="(item,index) in xmtj.zjtcwtList">
              <h6 :title="item.bt"><a :href="'http://careful.wisedu.com/#/questionDetail?wid='+ item.wid"  target="blank">{{index+1}} . {{item.bt}}</a></h6>
              <span :class='{tag:true,"tag-green":item.zt=="已受理","tag-ywc":item.zt=="已完成","tag-yellow":item.zt=="已延期","tag-red":item.zt=="未受理"}'>{{item.zt}}</span>
              <span class="time">{{item.fbrq}}</span>
            </div>
            <div v-if="xmtj.zjtcwtList ==null ||xmtj.zjtcwtList.length == 0" style="text-align:center;">
                  <p style="line-height:100px;font-weight:700">暂无内容</p>
            </div>
          </div>
        </div>
      </div>
      <div class="xgyx__body--xmjz" col=3>
        <h4 col=1>项目进展</h4>
        <div class="xgyx__xmjz--container" col=8 flex-column>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="xmtj.p_xmjd" style="width:90%;"></el-progress>
          <div class="vertical-steps">
             <div :class="{'vertical-step__item':true,'done':process.completed,'todo':!process.completed}" v-for="(process,index) in xmtj.jdList" :key="index">
              {{process.jdmc}}
            </div>
            <!-- <div class="vertical-step__item done">
              启动
            </div>
            <div class="vertical-step__item done">
              安装部署
              <br>
              <span class="tag tag-yellow">已延期</span>
              <br>
            </div>
            <div class="vertical-step__item todo">
              系统部署及功能确认
            </div>
            <div class="vertical-step__item todo">
              试运行
            </div>
            <div class="vertical-step__item todo">
              结项
            </div> -->
          </div>
            <!-- <div v-if="xmtj.jdList ==null ||xmtj.jdList.length == 0" style="text-align:center;">
               <p style="border-top:1px solid #eee;border-bottom:1px solid #eee;">无</p>
           </div> -->
        </div>
      </div>
      <div class="xgyx__body--rwwcqk" col=3 flex-column>
        <h4 col=1>任务完成情况</h4>
        <div class="xgyx__rwwcqk--container" col=8 flex-column>
          <div col=1 flex spacearound>
            <div class="vertical-card" flex-column>
              <span col=6 center class="nums">{{xmtj.rwcqs}}</span>
              <span col=5 center class="text introText">已超期</span>
            </div>
            <div class="vertical-card" flex-column>
              <span col=6 center class="nums">{{xmtj.rwwwcs}}</span>
              <span col=5 center class="text introText">未完成</span>
            </div>
            <div class="vertical-card" flex-column>
              <span col=6 center class="nums">{{xmtj.rwcqwcs}}</span>
              <span col=5 center class="text introText">超期完成</span>
            </div>
          </div>
          <div class="horizenl-card" col=3 spacearound>
            <div class="horizenl-card__items">
              <div class="pull-left introText">投诉</div>
              <div class="pull-right"><span style="color: #1989FA;font-weight: bold;">{{xmtj.xmtszs}}</span>&nbsp;条</div>
            </div>
            <div class="horizenl-card__items">
              <div class="pull-left introText">催办</div>
              <div class="pull-right"><span style="color: #1989FA;font-weight: bold;">{{xmtj.rwcbzs}}</span>&nbsp;条</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      wtzzOptions: [{
        name: '已阅未回复',
        value: 10
      }, {
        name: '已阅未回复',
        value: 10
      }, {
        name: '已阅未回复',
        value: 10
      }, {
        name: '已阅未回复',
        value: 10
      }],
      problems: [{
        title: '1.任务已经完成，申请验收',
        status: 0,
        time: '上午8:00'
      }, {
        title: '1.任务已经完成，申请验收',
        status: 1,
        time: '上午8:00'
      }, {
        title: '1.任务已经完成，申请验收',
        status: 2,
        time: '上午8:00'
      }],
      rwwcqkOptions: [{
        name: '已超期',
        value: 10
      }, {
        name: '已阅未回复',
        value: 10
      }, {
        name: '已阅未回复',
        value: 10
      }]
    }
  },
  props:{
    xmtj:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  mounted() {},
  methods: {},
  components: {},
}

</script>
<style lang="scss" scope>
.xgyx {
  .xgyx__body {
    border-top: 1px solid #EBEEF5;
    h4 {
      font-size: 16px;
      font-weight: bolder;
    }
    h5 {
      font-size: 14px;
      font-weight: bolder;
    }
    .xgyx__body--wtzz,
    .xgyx__body--xmjz {
      padding: 10px;
      border-right: 1px solid #EBEEF5;
      .xgyx__xmjz--container {
        padding-top: 10px;
        .vertical-steps {
          padding-left: 30px;
          margin-top: 20px;
        }
        .vertical-step__item {
          min-height: 32px;
          padding-bottom: 5px;
          color: #C0C4CC;
          position: relative;
        }
        .vertical-step__item:before {
          content: '';
          position: absolute;
          left: -24px;
          top: 0;
          width: 1px;
          height: 100%;
        }
        .vertical-step__item:last-child:before {
          width: 0px;
        }
        .vertical-step__item:after {
          content: '';
          position: absolute;
          left: -30px;
          top: 0;
          width: 14px;
          border-radius: 50%;
          height: 14px;
        }
        .vertical-step__item.done:before {
          background: #409EFF;
        }
        .vertical-step__item.todo:before {
          background: #C0C4CC;
        }
        .vertical-step__item.done:after {
          background: #409EFF;
        }
        .vertical-step__item.todo:after {
          background: #C0C4CC;
        }
      }
    }
    .xgyx__body--rwwcqk {
      padding: 10px;
    }
    .xgyx__wtzz--container {
      .vertical-card {
        .nums {
          color: #F56C6C;
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
    .xgyx__rwwcqk--container {
      .vertical-card {
        .nums {
          color: #464C5B;
          font-size: 20px;
          font-weight: bolder;
        }
      }
      .horizenl-card {
        .horizenl-card__items {
          height: 36px;
          margin-top: 10px;
          padding: 0 6px;
          background: #F8FAFB;
          margin-left: 10px;
          line-height: 3;
        }
      }
    }
    .list__item {
      margin-top: 8px;
      min-width:21vw;
      max-width:21vw;
      h6 {
        font-size: 12px;
        color: #464C5B;
        font-weight: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .time {
        color: #9EA7B4;
      }
    }
  }
}

</style>
