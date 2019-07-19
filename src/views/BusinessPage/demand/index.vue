<template>
  <div class="demand-pannel">
    <div class="list pull-left">
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
            <p class="query-title">需求分类:</p>
            <p class="query-list">
              <span :class="{ 'bg-active': filterData.xqfl == '' }" @click="handleChangeXqfl('')">全部</span>
              <span v-for="(xqfl, index) in xqflList" @click="handleChangeXqfl(xqfl.label)" :key="index" :class="{ 'bg-active': filterData.xqfl == xqfl.label }">
                {{ xqfl.mc }}
              </span>
            </p>
          </div>
          <div>
            <p class="query-title">查询状态:</p>
            <p class="query-list">
              <span :class="{ 'bg-active': filterData.cxzt == '' }" @click="handleChangeCxzt('')">全部</span>
              <span v-for="(cxzt, index) in cxztList" @click="handleChangeCxzt(cxzt.label)" :key="index" :class="{ 'bg-active': filterData.cxzt == cxzt.label }">
                {{ cxzt.mc }}
              </span>
            </p>
          </div>
          <div class="mg-12">
            <p class="query-title">需求类型:</p>
            <p class="query-list">
              <span :class="{ 'bg-active': filterData.xqlx == '' }" @click="handleChangeXqlx('')">全部</span>
              <span v-for="(xqlx, index) in xqlxList" @click="handleChangeXqlx(xqlx.label)" :key="index" :class="{ 'bg-active': filterData.xqlx == xqlx.label }">
                {{ xqlx.mc }}
              </span>
            </p>
          </div>
          <div flex>
            <p class="query-title">产品:</p>
            <p class="query-list" style="width:90%">
              <span :class="{ 'bg-active': filterData.cp == '' }" @click="handleChangeCp('')">全部</span>
              <span v-for="(cp, index) in cplist" @click="handleChangeCp(cp.label)" :key="index" :class="{ 'bg-active': filterData.cp == cp.label }">
                {{ cp.mc }}
              </span>
            </p>
          </div>
          <div flex class="mg-12">
            <p class="query-title">区域工程:</p>
            <p class="query-list" style="width:90%;">
              <span :class="{ 'bg-active': filterData.gczd == '' }" @click="handleChangeGczd('')">全部</span>
              <span v-for="(gczd, index) in gczdList" @click="handleChangeGczd(gczd.label)" :key="index" :class="{ 'bg-active': filterData.gczd == gczd.label }">
                {{ gczd.mc }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="pannelPaddingBg-10 mg-12">
        <ul class="demand-list">
          <li flex v-for="(item, index) in dataList" :key="index">
            <div class="demand-list_bgimg" center>{{item.cpjc}}</div>
            <div class="demand-list-info" flex-column spacebetween>
              <span><a href="#/demand/detail?id=23ad66851de4402885321ede2bbb130c" target="_blank" >{{item.bt}}</a></span>
              <p>
                {{item.tcsj}} &#x3000; {{item.tcrxm}} &#x3000;&#x3000;
                <span class="title">需求编号：</span>
                {{item.xqbh}} &#x3000;&#x3000;
                <el-tag key="1" type="success" effect="plain" size="mini">{{item.dqlcmc}}</el-tag>
              </p>
              <p>
                <span class="title">提出老师：</span>
                {{item.tcls}} ( {{item.lsdw}} ) &#x3000;&#x3000;
                <span class="title">类型：</span>
                {{item.xqfl==1?'需求':item.xqfl==2?'BUG':'需求变更'}}&#x3000;&#x3000;
                <span class="title">产品：</span>
                {{item.cpbjmc}}
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
    </div>
    <div class="pannelPaddingBg-10 guid pull-right">
      <h5>需求工作指南</h5>
      <div>
        <step :list="stepDatas"></step>
      </div>
      <section text-center>
        <el-button size="small" @click="handleSendDemand" type="primary">我要提需求</el-button>
      </section>
    </div>

    <xqDialog :show.sync="xqShow" @handleCommitDemand="handleCommitDemand"></xqDialog>
  </div>
</template>

<script>
  import {
    getMenu,
    getSession
  } from '@/utils/util.js';
  import step from '@/components/demand/step';
  import xqDialog from '@/views/BusinessPage/demand/xq-dialog';
  import emptyContent from '@/components/BusinessPage/emptyContent';
  export default {
    data() {
      return {
        xqShow: false,
        xqflList: [], //需求分类
        gczdList: [], //区域工程
        cxztList: [], //查询状态
        xqlxList: [], //需求类型
        cplist: [], //产品
        queryLJshow: true,
        currentPage: 1,
        pageSize: 10,
        records: 0,
        dataList: [],
        stepDatas: [], //流程
        filterData: {
          xqfl: '', //需求分类
          cxzt: '', //查询状态
          gczd: '',
          xqlx: '', //需求类型
          cp: '',
          keyword: ''
        }
      };
    },
    mounted() {
      //获取工程战队
      if (!getSession('gczd')) {
        getMenu('gczd', this.gczdList, true);
      } else {
        this.gczdList = getSession('gczd');
      }
      //获取产品
      if (
        !getSession("cp")
      ) {
        getMenu("cp", this.cplist, true);
      } else {
        this.cplist = getSession("cp");
      }

      //获取需求分类
      if (!getSession('DemandRelatedType')) {
        getMenu('DemandRelatedType', this.xqflList);
      } else {
        this.xqflList = getSession('DemandRelatedType');
      }

      //获取需求状态
      if (!getSession('DemandStatus')) {
        getMenu('DemandStatus', this.cxztList);
      } else {
        this.cxztList = getSession('DemandStatus');
      }

      //获取需求类型
      if (!getSession('DemandType')) {
        getMenu('DemandType', this.xqlxList);
      } else {
        this.xqlxList = getSession('DemandType');
      }

      this.queryProcessTemplate();
      this.queryPagesDemand();
    },
    methods: {

      // 提需求
      handleSendDemand() {
        this.xqShow = true;
      },

      // 需求提报成功
      handleCommitDemand() {
        this.queryPagesDemand();
      },

      // 筛选条件显示
      handleQueryShow() {
        this.queryLJshow = !this.queryLJshow;
      },
      //  查询
      handleQuery() {
        this.currentPage = 1;
        this.queryPagesDemand();
      },

      // 切换页数
      handleCurrentChange(data) {
        this.currentPage = data;
        this.queryPagesDemand();
      },

      // 需求分类
      handleChangeXqfl(data) {
        this.filterData.xqfl = data;
        this.currentPage = 1;
        this.queryPagesDemand();
      },
      // 查询状态
      handleChangeCxzt(data) {
        this.filterData.cxzt = data;
        this.currentPage = 1;
        this.queryPagesDemand();
      },
      // 需求类型
      handleChangeXqlx(data) {
        this.filterData.xqlx = data;
        this.currentPage = 1;
        this.queryPagesDemand();
      },
      // 产品
      handleChangeCp(data) {
        this.filterData.cp = data;
        this.currentPage = 1;
        this.queryPagesDemand();
      },
      // 工程战队
      handleChangeGczd(data) {
        this.filterData.gczd = data;
        this.currentPage = 1;
        this.queryPagesDemand();
      },

      //  查询需求列表
      queryPagesDemand() {
        this.$get(this.API.queryPageDemands, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          xqxglx: this.filterData.xqfl,
          xqlx: this.filterData.xqlx,
          qygc: this.filterData.gczd,
          cpbh: this.filterData.cp,
          keyword: this.filterData.keyword
        }).then(res => {
          if (res.state == 'success') {
            if (!!res.data.rows) {
              // let dataArr = res.data.rows;
              // dataArr.forEach((ele,i,arr)=>{
              //     this.$get(this.API.getDictEnum,{
              //       name: 'DemandType',
              //       code: ele.xqfl
              //     }).then(res=>{
              //       if(res.state == 'success'){
              //         dataArr[i].xqfl_display = res.data;
              //         // this.$set(res.data.rows[i],'.xqfl_display',res.data);
              //       }
              //     })
              //   })
                this.dataList = res.data.rows;
            } else {
              this.dataList = [];
            }
            this.records = res.data.records;
          } else {
            this.$message({message: res.msg,type: 'error'});
          }
        })
      },

      // 获取流程模板
      queryProcessTemplate() {
        this.$get(this.API.demandProcessTemplate, {
          zbwid: ''
        }).then(res => {
          if (res.state == 'success') {
            this.stepDatas = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      }
    },
    components: {
      step,
      xqDialog,
      emptyContent
    }
  };
</script>

<style scoped lang="scss">
  .demand-pannel {
    width: 85%;
    margin: 20px auto 0;

    .isshown-query {
      &:hover {
        cursor: pointer;
      }
    }

    .demand-list {
      li {
        border-bottom: 1px solid #dddddd;
        padding: 20px 12px;
      }

      .demand-list_bgimg {
        width: 114px;
        height: 74px;
        background: #999;
        color: #fff;
        font-weight: 700;
        font-size: 18px;
        padding: 0 5px;
      }

      .demand-list-info {
        padding: 0 20px;

        a {
          font-size: 16px;
        }

        .title {
          color: #999;
        }
      }
    }

    .list {
      width: 75%;
    }

    .guid {
      min-width: 20%;

      h5 {
        border-bottom: 1px solid #999;
        text-align: center;
        padding: 10px 0;
        font-weight: 700 !important;
      }

      >div {
        padding: 20px 0 0 40px;
      }
    }
  }
</style>
