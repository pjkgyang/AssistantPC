<template>
  <div class="serviceCounter-pannel">
      <div class="pannelPaddingBg-10 ">
        <div>
          <span class="query-title">
            <span :class="{ 'isshown-query': true, 'el-icon-arrow-up': !queryLJshow, 'el-icon-arrow-down': queryLJshow }"
              @click="handleQueryShow"></span>
            &nbsp;高级查询
          </span>
          <el-input v-model="filterData.keyword" style="width:493px;" size="mini" placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称"
            @change="handleQuery"></el-input>
          &#x3000;
          <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
        </div>
    
        <div v-show="queryLJshow">
          <div class="mg-12">
            <p class="query-title">登记日期:</p>
            <p class="query-list">
                <el-date-picker
                  size="mini"
                  v-model="filterData.date"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </p>
          </div>

          <div class="mg-12">
            <p class="query-title">处理状态:</p>
            <p class="query-list">
              <span :class="{ 'bg-active': filterData.clzt == '' }" @click="handleChangeclzt('')">全部</span>
              <span v-for="(clzt, index) in clztList" @click="handleChangeclzt(clzt.label)" :key="index" :class="{ 'bg-active': filterData.clzt == clzt.label }">
                {{ clzt.mc }}
              </span>
            </p>
          </div>

          <div>
            <p class="query-title">问题级别:</p>
            <p class="query-list">
              <span :class="{ 'bg-active': filterData.wtjb == '' }" @click="handleChangewtjb('')">全部</span>
              <span v-for="(wtjb, index) in wtjbList" @click="handleChangewtjb(wtjb.label)" :key="index" :class="{ 'bg-active': filterData.wtjb == wtjb.label }">
                {{ wtjb.mc }}
              </span>
            </p>
          </div>
          <div class="mg-12">
            <p class="query-title">是否催办:</p>
            <p class="query-list">
              <span v-for="(sfcb, index) in sfcbList" @click="handleChangesfcb(sfcb.label)" :key="index" :class="{ 'bg-active': filterData.sfcb == sfcb.label }">
                {{ sfcb.mc }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="pannelPaddingBg-10 mg-12">
        <div class="pd-10 ">
           <el-button size="mini" type="danger" @click="bjShow = true">服务登记</el-button>
        </div>
        <ul class="serviceCounter-list">
          <li flex v-for="(item, index) in dataList" :key="index">
            <!-- <div class="serviceCounter-list_bgimg" center>服务</div> -->
            <div class="serviceCounter-list-info" flex-column spacebetween>
              <span><a :href="'#/serviceCounter/detail?id='+item.wid" target="_blank" >{{item.bt}}</a></span>
              <p>
                <span class="title">服务编号：{{item.fwbh}}</span>
                <span class="title">提报日期：{{item.tbrq}}</span>
                <span class="title">期望解决日期：{{item.qwjjrq}}</span>
              </p>
              <p>
                <span class="title">提报人：{{item.tbr}}</span>
                <span class="title">提报人单位：{{item.tbrdw}}</span>
                <span class="title">问题级别：{{item.wtjb}}</span>
              </p>
              <p>
                <span class="title">信息系统：{{item.xxxt}}</span>
                <span class="title">承建单位：{{item.cjdw}}</span>
                <span class="title">延期3天解决：{{item.tbrq}}</span>
              </p>
            </div>
          </li>
        </ul>
        <el-pagination v-if="!!dataList.length" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="pageSize" layout="total, prev, pager, next" :total="records"></el-pagination>

        <div v-if="!dataList.length">
          <emptyContent></emptyContent>
        </div>
      </div>

      <fwdjDialog :show.sync="fwdjShow"></fwdjDialog>
      <yyzDialog :show.sync="yypzShow"></yyzDialog>
      <BjDialog :show.sync="bjShow"></BjDialog>
  </div>
</template>

<script>
import { getMenu, getSession } from "@/utils/util.js";
import emptyContent from "@/components/BusinessPage/emptyContent";
import fwdjDialog from "@/views/BusinessPage/serviceCounter/fwdj-dialog";
import yyzDialog from "@/views/BusinessPage/serviceCounter/yypz-dialog";
import BjDialog from "@/views/BusinessPage/serviceCounter/bj-dialog";

export default {
  data() {
    return {
      fwdjShow: false,
      yypzShow:false,
      bjShow:false,
      clztList: [], //处理状态
      wtjbList: [], //问题级别
      sfcbList: [
        { mc: "全部", label: "" },
        { mc: "是", label: "1" },
        { mc: "否", label: "0" }
      ], //是否催办
      xmcpList: [], //产品
      queryLJshow: true,
      currentPage: 1,
      pageSize: 10,
      records: 0,
      dataList: [
        {
          bt: "404错误",
          fwbh: "fw123123",
          tbrq: "2018-08-08",
          qwjjrq: "2018-08-08",
          tbr: "张三",
          tbrdw: "学工处",
          wtjb: "当即",
          xxxt: "学工",
          cjdw: "金智",
          yq: 3
        },
        {
          bt: "404错误",
          fwbh: "fw123123",
          tbrq: "2018-08-08",
          qwjjrq: "2018-08-08",
          tbr: "张三",
          tbrdw: "学工处",
          wtjb: "当即",
          xxxt: "学工",
          cjdw: "金智",
          yq: 3
        }
      ],

      filterData: {
        clzt: "", //需求分类
        wtjb: "", //查询状态
        date:[],
        sfcb: "", //需求类型
        keyword: ""
      }
    };
  },
  mounted() {},
  methods: {
    // 提需求
    handleSendserviceCounter() {
      this.fwdjShow = true;
    },

    // 筛选条件显示
    handleQueryShow() {
      this.queryLJshow = !this.queryLJshow;
    },
    //  查询
    handleQuery() {
      this.currentPage = 1;
      this.queryPagesserviceCounter();
    },

    // 切换页数
    handleCurrentChange(data) {
      this.currentPage = data;
      this.queryPagesserviceCounter();
    },

    // 需求分类
    handleChangeclzt(data) {
      this.filterData.clzt = data;
      this.currentPage = 1;
      this.queryPagesserviceCounter();
    },
    // 查询状态
    handleChangewtjb(data) {
      this.filterData.wtjb = data;
      this.currentPage = 1;
      this.queryPagesserviceCounter();
    },
    // 需求类型
    handleChangesfcb(data) {
      this.filterData.sfcb = data;
      this.currentPage = 1;
      this.queryPagesserviceCounter();
    },

    // 工程战队
    handleChangeGczd(data) {
      this.filterData.gczd = data;
      this.currentPage = 1;
      this.queryPagesserviceCounter();
    },

    //  查询需求列表
    queryPagesserviceCounter() {
      this.$get(this.API.queryPageserviceCounters, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        xqxglx: this.filterData.clzt,
        sfcb: this.filterData.sfcb,
        qygc: this.filterData.gczd,
        mkbh: this.filterData.cp,
        keyword: this.filterData.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.dataList = res.data.rows;
          } else {
            this.dataList = [];
          }
          this.records = res.data.records;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    }
  },
  components: {
    emptyContent,
    fwdjDialog,
    yyzDialog,
    BjDialog
  }
};
</script>

<style scoped lang="scss">
.serviceCounter-pannel {
  width: 85%;
  margin: 20px auto 0;

  .isshown-query {
    &:hover {
      cursor: pointer;
    }
  }

  .serviceCounter-list {
    li {
      border-bottom: 1px solid #dddddd;
      padding: 20px 12px;
    }

    // .serviceCounter-list_bgimg {
    //   width: 114px;
    //   height: 74px;
    //   background: #999;
    //   color: #fff;
    //   font-weight: 700;
    //   font-size: 16px;
    //   padding: 0 5px;
    // }

    .serviceCounter-list-info {
      padding: 0 20px;
      p {
        margin: 5px 0 !important;
      }
      a {
        color: #333;
        font-size: 18px;
        font-weight: 700;
        &:hover{
          color: rgb(74, 131, 197);
        }
      }

      .title {
        color: rgb(41, 41, 41);
        display: inline-block;
        width: 260px;
      }
    }
  }
}
</style>
