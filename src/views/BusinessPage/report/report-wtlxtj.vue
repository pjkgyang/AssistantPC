<template>
  <div>
    <div class="query-condition">
      <div>
        <p class="query-title">区域工程:</p>
        <p class="query-list" @click="handleGCZD">
          <span data-type="" :class="{'bg-active':gczd == ''}">全部</span>
          <span v-for="(gcqy,index) in gczdList" :data-type="gcqy.label" :key="index" :class="{'bg-active':gczd == gcqy.label}">{{gcqy.mc}}</span>
        </p>
      </div>
      <div>
        <p class="query-title">单位类型:</p>
        <p class="query-list" @click="handleDWLX">
          <span data-type="" :class="{'bg-active':dwlx == ''}">全部</span>
          <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
        </p>
      </div>
      <div>
        <p class="query-title">提问时间:</p>
        <p class="query-list">
          <el-date-picker size="mini" @change="handleChangeTwrq" v-model="twrq" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </p>
      </div>
    </div>
    <div style="text-align:right;margin:10px 0">
      <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
    </div>
    <div>
      <report-wtlxtj :tableData="wtlxList" @handleWtlxtj="handleWtlxtj"></report-wtlxtj>
    </div>
  </div>
</template>
<script>
  import {
    getResponsibleTaskList
  } from "@/api/common.js";
  import {
    wtztqkReport,
    ylWtReportByCpx
  } from "@/api/report.js";
  import {
    getMenu,
    getSession
  } from "@/utils/util.js";
  import reportWtlxtj from "@/components/reportTable/report-wtlxtj.vue";
  export default {
    data() {
      return {
        gczdList: [],
        dwlxList: [{
            label: "1",
            mc: "学校"
          },
          {
            label: "0",
            mc: "金智"
          },
          {
            label: "2",
            mc: "合作伙伴"
          }
        ],
        gczd: "",
        dwlx: "",
        twrq: [], //提问日期
        title: "区域所属学校",
        wtlxList: []
      };
    },

    methods: {
      handleChangeTwrq(){
        if(!this.twrq){
          this.twrq = []
        }
        this.ylWtReportByCpx();
      },
      // 问题类型 跳转
      handleWtlxtj(param) {
        param["qyzd"] = this.gczd;
        param["dwlx"] = this.dwlx;
        param["lx"] = 8;
        let routeData = this.$router.resolve({
          path: "/report-list/questionlist.html",
          query: param
        });
        window.open(routeData.href, "_blank");
      },
      exportTable() {
        this.twrq  = !this.twrq?[]:this.twrq;
        let ksrq = !this.twrq[0]?'':this.twrq[0],jsrq = !this.twrq[1]?'':this.twrq[1];
        window.open(
          window.baseurl +
          "report/exportylWtReportByCpx.do?dwlx=" +
          this.dwlx +
          "&qyzd=" +
          this.gczd +
          "&lx=8" +
          "&wtStart="+
           ksrq +
          "&wtEnd="+
           jsrq
        );
      },
      handleGCZD(e) {
        let gczd = e.target.getAttribute("data-type");
        if (gczd == null) return;
        this.gczd = gczd;
        this.ylWtReportByCpx();
      },
      handleDWLX(e) {
        let dwlx = e.target.getAttribute("data-type");
        if (dwlx == null) return;
        this.dwlx = dwlx;
        this.ylWtReportByCpx();
      },

      //    遗留问题报表  //问题跟踪报表
      ylWtReportByCpx() {
        ylWtReportByCpx({
          curPage: 1,
          pageSize: 99999,
          qyzd: this.gczd,
          dwlx: this.dwlx,
          cpxbh: "",
          sjlb: "",
          lx: 8,
          wtStart:!this.twrq[0]?'':this.twrq[0],
          wtEnd:!this.twrq[1]?'':this.twrq[1],
          keyword: ""
        }).then(({
          data
        }) => {
          if (data.state == "success") {
            this.wtlxList = data.data; // 区域所属学校
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type: "error",
              callback: action => {}
            });
          }
        });
      }
    },
    mounted() {
      if (getSession("gczd") == null) {
        getMenu("gczd", this.gczdList, true); //获取工程战队
      } else {
        this.gczdList = getSession("gczd");
      }

      this.ylWtReportByCpx(); //区域所属学校
    },
    activated() {},
    watch: {},
    components: {
      reportWtlxtj
    }
  };
</script>
<style scope>
  .query-condition>div {
    display: flex;
    align-items: flex-start;
    margin: 10px 0;
    font-size: 13px;
  }

  .query-title {
    font-size: 14px;
    width: 100px;
    white-space: nowrap;
    text-align: left;
    padding: 3px 10px 0;
    font-weight: 700;
  }

  .query-list {
    width: 95%;
  }

  .query-list span:hover {
    cursor: pointer;
  }

  .query-list span {
    display: inline-block;
    padding: 0px 5px;
    color: #637d8a;
    border-radius: 3px;
    margin: 5px 10px 0 0;
  }

  .bg-active {
    background: #1997d7;
    color: #fff !important;
  }
</style>
