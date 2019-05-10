<template>
  <div class="xgyx height100" flex-column>
    <div col=1>
      <span class="introText">项目经理</span>&nbsp;
      <span class="baseText mr-20">{{xmtj.xmjl == ''?'暂无':xmtj.xmjl}}</span>
      <span class="introText">甲方</span>&nbsp;
      <span class="baseText mr-20">{{xmtj.jfxm == ''?'暂无':xmtj.jfxm}}</span>
      <span class="introText ">建设周期</span>&nbsp;
      <span class="baseText mr-20">{{xmtj.xmksrq==''?'无':xmtj.xmksrq}} 至 {{xmtj.xmjsrq==''?'无':xmtj.xmjsrq}}</span>
      <span class="introText mr-20">售后服务周期
        <span class="baseText">&nbsp;{{xmtj.fwqx==''?'无':xmtj.fwqx}} </span>月</span>
      <span class="introText">服务开始日期&nbsp;</span>{{!xmtj.fwksrq?'无':xmtj.fwksrq}}
        
    </div>
    <div class="xgyx__body" flex col=14>
      <div class="xgyx__body--wtzz" col=6 flex-column>
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
          <div flex col="3" class="xgyx_zjtc" spacebetween>
            <div>
              <h5>最近提出</h5>
              <div class="list__item" v-for="(item,index) in xmtj.zjtcwtList">
                <h6 :title="item.bt">
                  <a :href="'http://careful.wisedu.com/#/questionDetail?wid='+ item.wid" target="blank">{{index+1}} . {{item.bt}}</a>
                </h6>
                <span>
                  <span :class='{tag:true,"tag-green":item.zt=="已受理","tag-ywc":item.zt=="已完成","tag-yellow":item.zt=="已延期","tag-red":item.zt=="未受理"}'>{{item.zt}}</span>
                  <span class="time">{{item.fbrq}}</span>
                </span>
              </div>
              <div v-if="xmtj.zjtcwtList ==null ||xmtj.zjtcwtList.length == 0" style="text-align:center;">
                <p style="line-height:100px;font-weight:700">暂无内容</p>
              </div>
            </div>
            <!-- <div>
            <h5>最近催办</h5>
            <div class="list__item" v-for="(item,index) in xmtj.zjtcwtList">
              <h6 :title="item.bt"><a :href="'http://careful.wisedu.com/#/questionDetail?wid='+ item.wid"  target="blank">{{index+1}} . {{item.bt}}</a></h6>
              <span>
                <span :class='{tag:true,"tag-green":item.zt=="已受理","tag-ywc":item.zt=="已完成","tag-yellow":item.zt=="已延期","tag-red":item.zt=="未受理"}'>{{item.zt}}</span>
                <span class="time">{{item.fbrq}}</span>
              </span>
            </div>
            <div v-if="xmtj.zjtcwtList ==null ||xmtj.zjtcwtList.length == 0" style="text-align:center;">
                  <p style="line-height:100px;font-weight:700">暂无内容</p>
            </div>
          </div> -->
          </div>
        </div>
      </div>

      <div class="xgyx__body--xmjz" col=5>
        <div col=1 flex spacebetween>
          <h4>项目进展</h4>
          <el-tag size="mini" :type="!xmtj.sfyq?'primary':'danger'">{{!xmtj.sfyq?'未延期':'已经延期'}}</el-tag>
          <a href="javaScript:;;" @click="handleReminde(xmtj.xmbh)">催办</a>
          <a href="javaScript:;;" @click="handleRemindeDetail(xmtj.xmbh)">催办详情</a>
        </div>
        <div class="xgyx__xmjz--container" col=8 flex-column>
          <el-progress :text-inside="true" :stroke-width="18" :percentage="xmtj.p_xmjd" style="width:90%;"></el-progress>
          <div class="vertical-steps">
            <div :class="{'vertical-step__item':true,'done':process.completed,'todo':!process.completed}" v-for="(process,index) in xmtj.jdList" :key="index">
              {{process.jdmc}}
            </div>
          </div>
          <!-- <div v-if="xmtj.jdList ==null ||xmtj.jdList.length == 0" style="text-align:center;">
               <p style="border-top:1px solid #eee;border-bottom:1px solid #eee;">无</p>
           </div> -->
        </div>
      </div>

      <div class="xgyx__body--rwwcqk" col=4 flex-column>
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
            <!-- 2018-12-04 修改 -->
            <div class="horizenl-card__items" flex spacebetween colcenter>
              <span class="introText">付款进度（到款率）</span>
              <span style="color: #1989FA;font-weight: bold;">{{!xmtj.dkl?0:xmtj.dkl}}</span>
            </div>
            <div v-if="!!xmtj.fkList && !!xmtj.fkList.length">
              <p class="filter-weight">付款记录：</p>
              <p v-for="(fk,index) in xmtj.fkList" class="horizenl-card_fkjd" flex spacebetween>
                <span class="fkjd_sj">{{fk.sj}}</span>
                <span class="fkjd_je">{{fk.je}}</span>
                <span class="fkjd_sm">{{fk.sm}}</span>
              </p>
            </div>
            <!-- <div class="horizenl-card__items" flex spacearound>
              <div class="pull-left introText">投诉</div>
              <div class="pull-right"><span style="color: #1989FA;font-weight: bold;">{{xmtj.xmtszs}}</span>&nbsp;条</div>
            </div>
            <div class="horizenl-card__items" flex spacearound>
              <div class="pull-left introText">催办</div>
              <div class="pull-right"><span style="color: #1989FA;font-weight: bold;">{{xmtj.rwcbzs}}</span>&nbsp;条</div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <cbnrDialog :show.sync="cbnrShow" :title="'催办'" @handleClickSure="handleClickSure"></cbnrDialog>
    <cbxqDialog :show.sync="cbxqShow" :xmbh="xmbh"></cbxqDialog>
  </div>
</template> 
<script type="text/javascript">
import cbnrDialog from "@/components/dialog/resource/pjsm-dialog.vue";
import cbxqDialog from "@/components/dialog/cbxq-dialog.vue";
export default {
  data() {
    return {
      cbnrShow:false,
      cbxqShow:false,
      wtzzOptions: [
        {
          name: "已阅未回复",
          value: 10
        },
        {
          name: "已阅未回复",
          value: 10
        },
        {
          name: "已阅未回复",
          value: 10
        },
        {
          name: "已阅未回复",
          value: 10
        }
      ],
      problems: [
        {
          title: "1.任务已经完成，申请验收",
          status: 0,
          time: "上午8:00"
        },
        {
          title: "1.任务已经完成，申请验收",
          status: 1,
          time: "上午8:00"
        },
        {
          title: "1.任务已经完成，申请验收",
          status: 2,
          time: "上午8:00"
        }
      ],
      rwwcqkOptions: [
        {
          name: "已超期",
          value: 10
        },
        {
          name: "已阅未回复",
          value: 10
        },
        {
          name: "已阅未回复",
          value: 10
        }
      ],
      xmbh: "",
    };
  },
  props: {
    xmtj: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  mounted() {},
  methods: {
    // 催办详情
    handleRemindeDetail(data){
      this.xmbh = data;
      this.cbxqShow = !this.cbxqShow
    },
    // 项目催办
    handleReminde(data) {
      this.xmbh = data;
      this.cbnrShow = !this.cbnrShow;
    },
    handleClickSure(data) {
      this.$post(this.API.addProjectProcess, {
        xmbh: this.xmbh,
        gcms: data,
        gclx: 2
      }).then(res => {
        if (res.state == "success") {
          this.$alert("催办成功", "提示", {
            confirmButtonText: "确定",
            type:'success'
          });
          this.cbnrShow = !this.cbnrShow;
        }else{
          this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
        }
      });
    }
  },
  components: { cbnrDialog ,cbxqDialog }
};
</script>
<style lang="scss" scope>
.xgyx {
  .xgyx__body {
    border-top: 1px solid #ebeef5;
    h4 {
      font-size: 16px;
      font-weight: bolder;
    }
    h5 {
      font-size: 14px;
      font-weight: bolder;
    }
    .xgyx__body--wtzz {
      .xgyx__wtzz--container {
        width: 100%;
      }
      .xgyx_zjtc {
        > div {
          width: 100%;
        }
      }
    }
    .xgyx__body--wtzz,
    .xgyx__body--xmjz {
      padding: 10px;
      border-right: 1px solid #ebeef5;
      .xgyx__xmjz--container {
        padding-top: 6px;
        .vertical-steps {
          padding-left: 30px;
          margin-top: 20px;
        }
        .vertical-step__item {
          min-height: 32px;
          padding-bottom: 5px;
          color: #c0c4cc;
          position: relative;
        }
        .vertical-step__item:before {
          content: "";
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
          content: "";
          position: absolute;
          left: -30px;
          top: 0;
          width: 14px;
          border-radius: 50%;
          height: 14px;
        }
        .vertical-step__item.done:before {
          background: #409eff;
        }
        .vertical-step__item.todo:before {
          background: #c0c4cc;
        }
        .vertical-step__item.done:after {
          background: #409eff;
        }
        .vertical-step__item.todo:after {
          background: #c0c4cc;
        }
      }
    }
    .xgyx__body--rwwcqk {
      padding: 10px;
    }
    .xgyx__wtzz--container {
      .vertical-card {
        .nums {
          color: #f56c6c;
          font-size: 20px;
          font-weight: bolder;
        }
      }
    }
    .xgyx__rwwcqk--container {
      .vertical-card {
        .nums {
          color: #464c5b;
          font-size: 20px;
          font-weight: bolder;
        }
      }
      .horizenl-card {
        .horizenl-card__items {
          height: 36px;
          // margin-top: 10px;
          margin: 5px 0;
          padding: 0 6px;
          background: #f8fafb;
        }
        .horizenl-card_fkjd {
          color: #9ea7b4;
          padding: 1px 6px;
          border-bottom: 1px solid #eee;
          span {
            display: inline-block;
            font-size: 12px;
            text-align: center;
          }
          .fkjd_sj {
            width: 35%;
          }

          .fkjd_je {
            width: 40%;
          }
          .fkjd_sm {
            width: 25%;
          }
        }
      }
    }
    .list__item {
      margin-top: 6px;
      min-width:21vw;
      max-width:21vw;
      > span {
        display: inline-block;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      h6 {
        font-size: 12px;
        color: #464c5b;
        font-weight: normal;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .time {
        color: #9ea7b4;
      }
    }
  }
}
</style>
