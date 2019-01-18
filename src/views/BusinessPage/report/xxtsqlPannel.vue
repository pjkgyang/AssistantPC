<template>
  <div class="xxts-pannel">
    <h4>{{dwmc}}</h4>
    <section class="xxts-pannel_sort">
      <h5>统计情况</h5>
      <div flex spacearound class="mg-12">
        <section v-for="item in sortList" center :class="{'sort_circle':true,'circle_xms':item.mc=='项目数','circle_wts':item.mc=='问题数','circle_zgs':item.mc=='总工时','circle_yqs':item.mc=='延期任务'}">
          <p>
            <span>{{item.value}}
              <span class="units">{{item.mc=='总工时'?'(小时)':'(个)'}}</span>
            </span><br>
            <span>{{item.mc}}</span>
          </p>
        </section>
      </div>
    </section>
    <section class="xxts-pannel_wtfbqk">
      <h5>问题分布情况</h5>
      <div flex spacearound class="pannel_wtfbqk-type">
        <barChart></barChart>
        <circleChart></circleChart>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">改进学校环境</span>&#x3000;&#x3000;
            <span>问题个数/占比：
              <span class="fontRed">11/50%</span>
            </span> &#x3000;&#x3000;工时：
            <span class="fontRed">11</span>(小时)</p>
          <div col="5" flex-column spacearound>
            <p>
              <span>改进学校服务器环境</span>
              <span>
                <span class="fontRed">10</span> 个
              </span>
            </p>
            <p>
              <span>改进学校数据库环境</span>
              <span>
                 <span class="fontRed">10</span> 个
               </span>
              </p>
            <p>
              <span>改进学校网络环境</span>
              <span>
                 <span class="fontRed">10</span> 个
              </span>
              </p>
            <p>
              <span>改进学校中间件环境</span>
              <span>
                <span class="fontRed">10</span> 个
              </span>
              </p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :pieData="gjhjData" :pieIndex="0"></pieChart>
        </section>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">加强学校培训</span>&#x3000;&#x3000;
            <span>问题个数/占比：
              <span class="fontRed">11/50%</span>
            </span> &#x3000;&#x3000;工时：
            <span class="fontRed">11</span>(小时)</p>
          <div col="5" flex-column spacearound>
            <p>
              <span>改进学校服务器环境</span>
              <span>
                <span class="fontRed">10</span> 个
              </span>
            </p>
            <p>
              <span>改进学校数据库环境</span>
              <span>
                 <span class="fontRed">10</span> 个
               </span>
              </p>
            <p>
              <span>改进学校网络环境</span>
              <span>
                 <span class="fontRed">10</span> 个
              </span>
              </p>
            <p>
              <span>改进学校中间件环境</span>
              <span>
                <span class="fontRed">10</span> 个
              </span>
              </p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :pieData="gjhjData" :pieIndex="1"></pieChart>
        </section>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">纳入产品改进</span>&#x3000;&#x3000;
            <span>问题个数/占比：
              <span class="fontRed">11/50%</span>
            </span> &#x3000;&#x3000;工时：
            <span class="fontRed">11</span>(小时)</p>
          <div col="5" flex-column spacearound>
             <p>
              <span>改进学校服务器环境</span>
              <span>
                <span class="fontRed">10</span> 个
              </span>
            </p>
            <p>
              <span>改进学校数据库环境</span>
              <span>
                 <span class="fontRed">10</span> 个
               </span>
              </p>
            <p>
              <span>改进学校网络环境</span>
              <span>
                 <span class="fontRed">10</span> 个
              </span>
              </p>
            <p>
              <span>改进学校中间件环境</span>
              <span>
                <span class="fontRed">10</span> 个
              </span>
              </p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :pieData="gjhjData" :pieIndex="2"></pieChart>
        </section>
      </div>

      <div flex spacearound class="pannel_wtfbqk-type" >  
        <section class="wtfbqk-detail" flex-column>
          <p col="1">
            <span class="font17">项目分类统计</span>&#x3000;&#x3000;
           </p>
          <div col="5" flex-column spacearound>
            <p>
              <span>在建阶段</span>
              <span>
                个数 / 占比：<span class="fontRed">{{detailData.zjxmwt}} / {{detailData.zjxmwtzb}}</span>&#x3000;<span class="fontRed">{{detailData.zjxmwtgs}}</span> 小时
                 </span>
              </p>
            <p>
              <span>售后阶段</span>
              <span>
                 个数 / 占比：<span class="fontRed">{{detailData.shxmwt}} / {{detailData.shxmwtzb}}</span>个 &#x3000;<span class="fontRed">{{detailData.shxmwtgs}}</span> 小时
             </span>
            </p>
             
            <p>
              <span>过保阶段</span>
              <span>
                 个数 / 占比：<span class="fontRed">{{detailData.gbxmwt}} / {{detailData.gbxmwtzb}}</span>个 &#x3000;<span class="fontRed">{{detailData.gbxmwtgs}}</span> 小时
              </span>
            </p>
          </div>
        </section>
        <section class="wtfbqk-pie">
          <pieChart :pieData="gjhjData" :pieIndex="3"></pieChart>
        </section>
      </div>


    </section>
  </div>
</template>

<script>
import circleChart from "@/components/chart/circleChart.vue";
import barChart from "@/components/chart/barChart.vue";
import pieChart from "@/components/chart/pieChart.vue";

export default {
  data() {
    return {
      dwmc: "",
      detailData: {},
      sortList: [
        { mc: "项目数", value: 10 },
        { mc: "问题数", value: 10 },
        { mc: "总工时", value: 10 },
        { mc: "延期任务", value: 10 }
      ],
      gjhjData: [
        { value: 100, name: "服务器环境" },
        { value: 200, name: "数据库环境" },
        { value: 300, name: "网络环境" },
        { value: 400, name: "中间件环境" }
      ], //改进学校环境饼图数据
      gbData: [],
      gbPage: 1,
      gbPageSize: 10,
      gbTotal: 0,

      shData: [],
      shPage: 1,
      shPageSize: 10,
      shTotal: 0,

      zjData: [],
      zjPage: 1,
      zjPageSize: 10,
      zjTotal: 0,

      yqData: [],
      yqPage: 1,
      yqPageSize: 10,
      yqTotal: 0
    };
  },
  methods: {
    handleCheckDetail(key, value, params, type) {
      let obj = {};
      obj["dwmc"] = this.detailData.dw;
      if (!!params) {
        obj["xmbh"] = params.xmbh;
        obj["wtxmlx"] = type == "gb" ? 3 : type == "sh" ? 2 : 1;
      }
      obj[key] = value;
      let { href } = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query: obj
      });
      window.open(href, "_blank");
    },
    //   过保 每页条数
    handleGbSizeChange(data) {
      this.gbPageSize = data;
      this.gbPage = 1;
      this.pageGbWtxm();
    },
    //   过保 分页
    handleGbCurrentChange(data) {
      this.gbPage = data;
      this.pageGbWtxm();
    },
    //   售后 每页条数
    handleShSizeChange(data) {
      this.shPageSize = data;
      this.shPage = 1;
      this.pageShWtxm();
    },
    //   售后 分页
    handleShCurrentChange(data) {
      this.shPage = data;
      this.pageShWtxm();
    },
    //   在建
    handleZjSizeChange(data) {
      this.zjPageSize = data;
      this.zjPage = 1;
      this.pageZjWtxm();
    },
    handleZjCurrentChange(data) {
      this.zjPage = data;
      this.pageZjWtxm();
    },
    //  延期
    handleYqSizeChange(data) {
      this.yqPageSize = data;
      this.yqPage = 1;
      this.pageYqRwxm();
    },
    handleYqCurrentChange(data) {
      this.yqPage = data;
      this.pageYqRwxm();
    }, 
    // 
    dwtsqlmxReport() {
      this.$get(this.API.dwtsqlmxReport, {
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.detailData = res.data;
          this.sortList[0].value = !res.data.wtzs?0:res.data.xmzs;
          this.sortList[1].value = !res.data.wtzs?0:res.data.wtzs;
          this.sortList[2].value = !res.data.hjgs?0:res.data.hjgs;
          this.sortList[3].value = !res.data.yqrws?0:res.data.yqrws;


          console.log(this.detailData);
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 过保
    pageGbWtxm() {
      this.$get(this.API.pageGbWtxm, {
        curPage: this.gbPage,
        pageSize: this.gbPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.gbData = res.data.rows;
          this.gbTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 售后
    pageShWtxm() {
      this.$get(this.API.pageShWtxm, {
        curPage: this.shPage,
        pageSize: this.shPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.shData = res.data.rows;
          this.shTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 在建
    pageZjWtxm() {
      this.$get(this.API.pageZjWtxm, {
        curPage: this.zjPage,
        pageSize: this.zjPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.zjData = res.data.rows;
          this.zjTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 延期任务
    pageYqRwxm() {
      this.$get(this.API.pageYqRwxm, {
        curPage: this.yqPage,
        pageSize: this.yqPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.yqData = res.data.rows;
          this.yqTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
    if (!!this.$route.query.dwmc) {
      this.dwmc = unescape(this.$route.query.dwmc);
    } else {
      this.dwmc = JSON.parse(sessionStorage.userInfo).unit;
    }
    this.dwtsqlmxReport();
    // this.pageGbWtxm(); //过保
    // this.pageShWtxm(); //售后
    // this.pageZjWtxm(); //在建
    // this.pageYqRwxm(); //延期
  },
  components: { circleChart, barChart, pieChart }
};
</script>

<style lang='scss' scoped>
.xxts-pannel {
  width: 90%;
  margin: 15px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  h4 {
    font-size: 25px !important;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px !important;
  }
  .xxts-pannel_sort {
    .sort_circle {
      width: 9vw;
      height: 9vw;
      border-radius: 50%;
      font-size: 22px;
      box-shadow: -5px -5px 15px rgb(190, 190, 190);
      .units {
        font-size: 16px;
      }
      &:hover{
        cursor: pointer;
        color: #3a9494;
      }
    }
  }
  h5 {
    font-size: 16px !important;
    font-weight: 700;
    margin: 20px 0 !important;
    color: #999999;
    border-left: 4px solid rgb(141, 75, 158);
    padding-left: 10px;
  }
  .xxts-pannel_wtfbqk {
    .wtfbqk-detail {
      width: 42%;
      font-weight: 700;
      > p {
        font-size: 15px !important;
        color: rgb(179, 116, 34);
        .font17 {
          font-size: 17px;
        }
      }
      div {
        text-align: center;
        padding: 15px 0;
        font-size: 14px;
        color: rgb(179, 116, 34);
        p{
            >span {
            display: inline-block;
            width: 150px;
          }
            >span:nth-child(2) {
              white-space: nowrap;
            display: inline-block;
            width: 100px;
          }
        }
      }
      .fontRed {
        color: #f00;
      }
    }
    .wtfbqk-pie {
      width: 53%;
    }

    .pannel_wtfbqk-type {
      margin: 20px 0;
      padding: 20px 0;
      border-radius: 10px;
      box-shadow: 0 0 5px rgba(104, 114, 114, 0.2);
    }
  }
}
.circle_xms {
  border: 2px solid rgb(168, 190, 218);
  background: rgba(189, 210, 236, 0.3);
}
.circle_wts {
  border: 2px solid #f5dac3;
  background: rgba(245, 218, 195, 0.3);
}
.circle_zgs {
  border: 2px solid #fae492;
  background: rgba(250, 228, 146, 0.3);
}
.circle_yqs {
  border: 2px solid #98c070;
  background: rgba(152, 192, 112, 0.3);
}
</style>
