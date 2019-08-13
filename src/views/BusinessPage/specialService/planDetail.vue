<template>
  <div class="fwjh-Detail">
    <div class="fwjh-Detail-content">
      <tableLayout>
        <section slot="top">
          <h5>迎新专项服务</h5>
          <div class="contentMark">
            <table>
              <tr>
                <td class="contenTitle">项目名称</td>
                <td>{{planData.cpmc}}</td>
                <td class="contenTitle">项目编号</td>
                <td>{{planData.fwnr}}</td>
              </tr>
              <tr>
                <td class="contenTitle">计划开始日期</td>
                <td>{{planData.zrrxm}}</td>
                <td class="contenTitle">计划结束日期</td>
                <td>{{planData.zt_display}}</td>
              </tr>
              <tr>
                <td class="contenTitle">服务阶段</td>
                <td>{{planData.jhjsrq}}</td>
                <td class="contenTitle">服务项</td>
                <td>{{!planData.sjjsrq?'无':planData.sjjsrq}}</td>
              </tr>
              <tr>
                <td class="contenTitle">金智责任人</td>
                <td>{{planData.xjgs}}</td>
                <td class="contenTitle">学校责任人</td>
                <td>阿斯达多</td>
              </tr>
              <tr>
                <td class="contenTitle">服务内容</td>
                <td colspan="3">{{planData.xjgs}}</td>
              </tr>
            </table>
          </div>
        </section>
        <section slot="bottom">
          <div class="contetnProgress">
            <h5>计划进度</h5>
            <div class="contentMark">
              <!-- <el-scrollbar style="height:calc(100vh - 300px);"> -->
              <div v-if="jdList.length" v-for="(jd,index) in jdList" :class="{'progress-dot':true,'progress-dot-last':index == (jdList.length-1)}">
                <div>
                  <span>{{jd.cjsj}}&#x3000;<span style="color:rgb(21, 145, 202)">{{!jd.czrxm?'':jd.czrxm}}</span>&#x3000;{{jd.czlxmc}}</span>
                  <div :class="{'jd-content':jd.czlx == 4}" v-html="jd.cznr"></div>
                </div>
              </div>
              <div v-else class="emptyContent">
                <img src="static/img/empty.png" alt="">
                <p>暂无日志记录</p>
              </div>
              <!-- </el-scrollbar> -->
            </div>
          </div>
        </section>
      </tableLayout>
    </div>
  </div>
</template>

<script>
  import tableLayout from "@/components/layout/tableLayout.vue";
  export default {
    data() {
      return {
        baseUrl: "",
        jdList: [],
        planData: {}
      };
    },
    mounted() {
      this.baseUrl = window.baseurl;
      this.isJzuser = sessionStorage.getItem('isJZuser');
    },
    components: {
      tableLayout
    }
  };
</script>

<style lang="scss" scoped>
  .fwjh-Detail {
    padding: 10px 0;
    height: 100%;

    //    background: linear-gradient(to right bottom,rgb(237, 243, 245),rgb(227, 246, 250));
    .fwjh-Detail-content {
      width: 80%;
      background: #fff;
      border-radius: 5px;
      margin: 0 auto;
      padding: 10px 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      h5,
      h6 {
        font-weight: 700;
        font-size: 15px;
        margin-bottom: 10px !important;
        padding-left: 5px;
        border-left: 4px solid rgb(177, 55, 214);
      }

      h6 {
        font-size: 12px;
      }
    }

    .contentMark {
      padding: 0 30px;

      .emptyContent {
        width: 200px;
        text-align: center;
        padding: 20px 0;

        img {
          width: 100px;
          height: 100px;
        }

        p {
          margin: 5px 0 !important;
        }
      }

      table {
        margin: 15px 0;
        width: 100%;
        border-color: #ccc;

        td {
          text-align: center;
          border: 1px solid rgb(233, 230, 230);
          padding: 5px 0;
        }

        tr>td:nth-child(even) {
          width: 35%;
        }
      }
    }
  }

  .contenTitle {
    width: 15% !important;
    font-weight: 700;
    color: #807e7e;
    background: rgb(247, 244, 244);
  }

  .progress-dot {
    padding: 0 30px 10px;
    position: relative;
    min-height: 60px;

    div {
      color: #636161;
      font-size: 13px;
    }
  }

  .progress-dot:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 2px;
    width: 20px;
    height: 20px;
    background: #2a82e4;
    border-radius: 50%;
  }

  .progress-dot::after {
    content: "";
    width: 1px;
    height: calc(100% - 20px);
    position: absolute;
    top: 22px;
    left: 10px;
    border-left: 1px solid #2a82e4;
  }

  .progress-dot-ywc::before {
    background: #2a82e4;
  }

  .progress-dot-ywc::after {
    border-color: #2a82e4;
  }

  .progress-dot-last:after {
    display: none;
  }

  .option-list {
    border-bottom: 1px dashed #999;
    margin: 10px 0px;
    font-size: 12px;
    padding: 0 10px 5px;

    .option-list-index {
      margin-right: 10px;

      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid rgb(54, 54, 54);
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
      }
    }
  }

  .jd-content {
    // font-weight: 700;
    color: rgb(21, 145, 202) !important;
  }
</style>
