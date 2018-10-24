<template>
  <div>
    <tableLayout>
      <section slot="top">
        <div class="personalJs-top" flex-column spacearound>
          <section class="pd-10">
            <el-date-picker v-model="year" type="year" placeholder="选择年" value-format="yyyy" format="yyyy 年" @change="handleChangeDate"></el-date-picker>
          </section>
          <section flex spacearound class="personalJs-top-month" style="height:45%">
            <div v-for="monthly in monthList">
              <p :class="{'monthprocessmc':true,'colorActive':month == monthly.val}">{{monthly.mc}}</p>
              <div class="monthprocess" colcenter>
                <span class="processLine"></span>
                <span @click="handleCheckJS(monthly)" :class="{'processDot':true,'widthActive':month == monthly.val}"></span>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section slot="bottom" class="personalJs-bottom" flex spacearound>
        <div class="personalJs-menu">
          <h5><span class="filter-weight">结算清单</span><br>Settlement list</h5>
          <div class="personalJs-menu-dl">
            <h5>我的账户:</h5>
            <dl>
              <dt class="bordeBottom">本月收入:<span class="colorActive">{{!data.sfzcb?0:data.sfzcb}} 元</span></dt>
              <dd>本月项目实发:<span>{{data.shfa}} 元</span></dd>
              <dd>冲入奖金池:<span>{{data.byxzjj}} 元</span></dd>
              <dd>本月奖金池领取:<span>{{data.byyljj}} 元</span></dd>
              <dt class="bordeTopBottom">项目结余:<span>{{data.byjy}} 元</span></dt>
              <dt>奖金池结余:<span>{{data.wfjj}} 元</span></dt>
            </dl>
            <h5>项目结算:</h5>
            <dl>
              <dt class="bordeBottom">上月结算余额:<span>{{data.syjs}} 元</span></dt>
              <dt>本月项目结算:<span><a @click="handleCheckJs('xmjs')" href="javaScript:;;">{{data.xmjs}} 元</a></span></dt>
              <dt>本月CROWD结算:<span><a @click="handleCheckJs('ekjs')" href="javaScript:;;">{{data.crowdjs}} 元</a></span></dt>
              <dt>本月售前调用:<span><a @click="handleCheckJs('sqdy')" href="javaScript:;;">{{data.sqjs}} 元</a></span></dt>
              <dt>本月其他结算:<span>{{data.qtjs}} 元</span></dt>
              <p>{{data.qtjssm}}</p>
              <dt>本月奖惩:<span>{{data.jc}} 元</span></dt>
              <p>{{data.jcsm}}</p>
              <dt class="bordeBottom">本月结算合计:<span>{{data.yifa}} 元</span></dt>
              <dt>本月项目实发:<span>{{data.shfa}} 元</span></dt>
              <dt>本月项目结余:<span>{{data.byjy}} 元</span></dt>
            </dl>
            <h5>奖金池:</h5>
            <dl>
              <dt>上月结余:<span>{{data.syjyjj}} 元</span></dt>
              <dt>本月新增:<span>{{data.byxzjj}} 元</span></dt>
              <dt>本月已领:<span>{{data.byyljj}} 元</span></dt>
              <dt>本月结余:<span>{{data.wfjj}} 元</span></dt>
            </dl>
          </div>
        </div>
        <div class="personalJs-menu" style="padding-left: 20px;">
          <h5><span class="filter-weight">分包结算说明</span><br>Description</h5>
          <div class="personalJs-menu-sm">
            <section>
              <p>【规则】</p>
              <p>1.实结算 = 分包实施费用实泡周用用预留需用;</p>
              <p>2.二开结算 = (分包二开用实际使用二开用预留费用) * (5400 / 0800);</p>
              <p>3.可变结算 = (分包可变费用实际使用可变用预留用) * 70%;</p>
              <p>4.结算用 = 实抱结算 + 二开结算 + 可变结算;</p>
              <p>5.结算金额总计(元) = 项目结算台计 + 其他人员调用+导师奖励+其他奖励;</p>
              <p>6.应发工资:结算金总计结算期已发金额[月工资”(当月月份财年起始月份)](财年起始月份:4月份);</p>
              <p>7.实发工资:如果低于工资技工资标准发放,否则按应发工资发放;</p>
            </section>
            <section>
              <p>【案例】</p>
              <p>张三月工资12000元,只有一个分包,6月份结算数摇如下:</p>
              <p>分包实施差用30000元,实用费用6000元,预留4000元;</p>
              <p>分包二开费用20000元,实际一开费用8000元,预留2000元;</p>
              <p>分包可变费用20000元,实际可变费用7000元,预3000元;</p>
              <p>奖励0元,惩罚0元,其他人员调用2000元,导师奖助1000元,其他奖成0元;</p>
              <p>1.实施结算:20000 = 30000 - 6000 - 4000;</p>
              <p>2.二开结算:6136 = (200008000 - 2000) * (5400 / 8800);</p>
              <p>3.可变结算:7000 = (200007000 - 3000) * 70%;</p>
              <p>4.结算费用:33136 = 20000 + 6136 + 7000;</p>
              <p>5.结算命数总计:36136 = 33136 + 2000 + 1000 + 0;</p>
              <p>6.应发工资:24136 = 36136 - 12000 4月份已发工资;</p>
              <p>7.实发工资:24136 > 12000按24136发放,24136其中12000为工资,12136元为奖全全额;</p>
            </section>
          </div>
        </div>
      </section>
    </tableLayout>
    <sydetailDialog :show.sync="show" :title="title" :sm="sm" :currentPage="queryObj.curPage" :pageSize="queryObj.pageSize"
    @handleCurrentChange="handleCurrentChange" :tableData="tableData"></sydetailDialog>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import { getPreMonth,getNextMonth } from "@/utils/util.js";
import sydetailDialog from "@/components/dialog/sydetail-dialog.vue";
export default {
  data() {
    return {
      year: "",
      activeName: "first",
      monthList: [
        { mc: "四月", val: "04" },
        { mc: "五月", val: "05" },
        { mc: "六月", val: "06" },
        { mc: "七月", val: "07" },
        { mc: "八月", val: "08" },
        { mc: "九月", val: "09" },
        { mc: "十月", val: "10" },
        { mc: "十一月", val: "11" },
        { mc: "十二月", val: "12" },
        { mc: "一月", val: "01" },
        { mc: "二月", val: "02" },
        { mc: "三月", val: "03" }
      ],
      tableData:{},
      month: "",
      markYear: "",
      data: {},
      username: "",
      show: false,
      title: "",
      sm:"",
      queryObj:{},
      type:''
    };
  },
  mounted() {
    this.markYear = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let yf = this.markYear + "-" + (month < 10 ? "0" + month : month);
    this.username = sessionStorage.username;
    this.month = getPreMonth(yf).split("-")[1];
    this.year = getPreMonth(yf).split("-")[0];
    let oldyf = this.markYear + "-" + this.month;
    this.personalSettlement(oldyf);
  },
  methods: {
    handleCurrentChange(data){
      this.queryObj.curPage = data;
       this.getDetail(this.type);
    },
    handleCheckJs(params) {
      let yf = this.markYear + "-" + this.month;
      this.type = params;
      this.queryObj.curPage = 1;
      this.queryObj.pageSize = 15;
      switch (params) {
        case "ekjs":
          this.title = "Crowd结算";
          this.sm = '';
          this.queryObj.yf = yf;
          delete this.queryObj.startDt;
          delete this.queryObj.endDt;
          break;
        case "xmjs":
          this.title = "项目结算";
          this.sm = '说明：团队收入为正数是表示收入，负数表示支出给团队成员费用';
          this.queryObj.yf = yf;
          delete this.queryObj.startDt;
          delete this.queryObj.endDt;
          break;
        case "sqdy":
          this.title = "售前调用结算";
          this.sm = '说明：售前调用按500/800结算个人收入';
          this.queryObj.startDt = yf+'-01';
          this.queryObj.endDt = getNextMonth(yf)+'-01';
          delete this.queryObj.yf;

        break;
      }
      this.getDetail(params);
      this.show = !this.show;
    },
    handleChangeDate(val) {
      this.markYear = val;
      let yf = val + "-" + this.month;
      this.personalSettlement(yf);
    },
    handleCheckJS(data) {
      this.month = data.val;
      let yf = this.markYear + "-" + this.month;
      this.personalSettlement(yf);
    },
    personalSettlement(yf) {
      this.$get(this.API.personalSettlement, {
        yf: yf
      }).then(res => {
        if (res.state == "success") {
          this.data = res.data;
        }
      });
    },
    getDetail(type){
      this.$get(
        type == "ekjs"
          ? this.API.crowdSettlement
          : type == "xmjs"
            ? this.API.projectSettlement
            : this.API.presaleCallSettlement,
         this.queryObj
      ).then(res => {
        if (res.state == "success") {
          this.tableData = res.data;
        }
      });
    }
  },
  components: { tableLayout, sydetailDialog }
};
</script>

<style lang="scss" scoped>
@import "../../../style.scss";
.personalJs-top {
  width: 100%;
  height: 220px;
  background: url("../../../../static/img/topback.png") no-repeat;
  background-size: 100%;
  background-color: rgba($color: #124c4e, $alpha: 0.3);
  .personalJs-top-month {
    padding: 0 20px;
    width: 90%;
    margin: 0 auto;
    > div {
      width: 10%;
      text-align: center;
    }
    > div:hover .processDot {
      cursor: pointer;
      transform: scale(1.5, 1.5);
    }
    > div:hover .monthprocessmc {
      color: #275a5c;
      font-weight: 700;
    }
    .monthprocessmc {
      padding: 12px 0;
      color: #666;
      animation: me 0.2s;
      transition: all 0.2s;
    }
    .monthprocess {
      margin-top: 10px;
      position: relative;
      .processLine {
        width: 100%;
        // calc((100% - 15px) / 2);
        height: 2px;
        border: 1px solid #275a5c;
      }
      .processDot {
        position: absolute;
        left: 0px;
        right: 0px;
        top: 0px;
        bottom: 0px;
        margin: auto;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid #275a5c;
        background: #43b4b8;
        animation: me 0.618s;
        transition: all 0.618s;
      }
    }
  }
}
.personalJs-bottom {
  > div {
    width: 45%;
  }
  .personalJs-menu {
    padding-right: 20px;
    > h5 {
      margin-bottom: 15px !important;
      @include fontColors(#0b886d, #f8f9fa);
    }
    .personalJs-menu-dl {
      dl {
        padding-left: 20px;
        margin-bottom: 10px;
        dt,
        dd,
        p {
          padding: 2px 0;
          font-size: 12px;
          span {
            float: right;
          }
        }
      }
      h5 {
        border-left: 4px solid #45af9a;
        padding-left: 5px;
        font-weight: 700;
        margin-bottom: 5px !important;
      }
    }
    .personalJs-menu-sm {
      font-size: 12px;
      section {
        margin: 8px 0;
        p {
          padding: 1px 0;
        }
      }
    }
  }
}

@keyframes me {
  from {
  }
  to {
    transform: scale(1.5, 1.5);
  }
}
.colorActive {
  color: #df2b1e !important;
  font-weight: 700;
}
.widthActive {
  width: 22.5px !important;
  height: 22.5px !important;
  background: #df2b1e !important;
  border-color: #aa251b !important;
}
.bordeBottom {
  border-bottom: 1px dotted #999;
}
.bordeTopBottom {
  border-bottom: 1px dotted #999;
  border-top: 1px dotted #999;
}
</style>
