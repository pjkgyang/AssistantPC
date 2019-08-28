<template>
  <div class="serviceCounter-pannel">
    <div class="pannelPaddingBg-10">
      <div>
        <span class="query-title">
          <span
            :class="{ 'isshown-query': true, 'el-icon-arrow-up': !queryLJshow, 'el-icon-arrow-down': queryLJshow }"
            @click="handleQueryShow"
          ></span>
          &nbsp;高级查询
        </span>
        <el-input
          v-model="filterData.keyword"
          style="width:493px;"
          size="mini"
          placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称"
          @change="handleQuery"
        ></el-input>&#x3000;
        <el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
      </div>

      <div v-show="queryLJshow">
        <div class="mg-12" flex>
          <p class="query-title">登记日期:</p>
          <p class="query-list">
            <el-date-picker
              size="mini"
              v-model="filterData.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </p>
        </div>

        <div class="mg-12" flex>
          <p class="query-title">处理状态:</p>
          <p class="query-list">
            <span
              v-for="(clzt, index) in clztList"
              @click="handleChangeclzt(clzt.label)"
              :key="index"
              :class="{ 'bg-active': filterData.clzt == clzt.label }"
            >{{ clzt.mc }}</span>
          </p>
        </div>

        <div flex>
          <p class="query-title">问题级别:</p>
          <p class="query-list">
            <span
              v-for="(wtjb, index) in wtjbList"
              @click="handleChangewtjb(wtjb.label)"
              :key="index"
              :class="{ 'bg-active': filterData.wtjb == wtjb.label }"
            >{{ wtjb.mc }}</span>
          </p>
        </div>

        <div class="mg-12" flex>
          <p class="query-title">是否催办:</p>
          <p class="query-list">
            <span
              v-for="(sfcb, index) in sfcbList"
              @click="handleChangesfcb(sfcb.label)"
              :key="index"
              :class="{ 'bg-active': filterData.sfcb == sfcb.label }"
            >{{ sfcb.mc }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="pannelPaddingBg-10 mg-12">
      <div class="pd-10">
        <el-button size="mini" type="danger" @click="fwdjShow = true">服务登记</el-button>
      </div>
      <ul class="serviceCounter-list">
        <li
          v-for="(item, index) in dataList"
          :key="index"
          @mouseover="editOrdelete = index"
          @mouseout="editOrdelete = null"
        >
        <div colcenter spacebetween>
          <div class="serviceCounter-list-info" flex-column spacebetween>
            <span>
              <a :href="'#/serviceCounter/detail?id='+item.wid" target="_blank">{{item.bt}}</a>
            </span>
            <p class="serviceCounter-list_info">
              <span>
                <span class="title">服务编号：</span>
                {{item.fwbh}}
              </span>
              <span>
                <span class="title">提报日期：</span>
                {{item.tbsj}}
              </span>
              <span>
                <span class="title">期望解决日期：</span>
                {{item.qwjjrq}}
              </span>
            </p>
            <p class="serviceCounter-list_info">
              <span>
                <span class="title">提报人：</span>
                {{item.tbr}} ({{!item.lxfs?'无':item.lxfs}})
              </span>
              <span>
                <span class="title">提报人单位：</span>
                {{item.dwmc}}
              </span>
              <span>
                <span class="title">问题级别：</span>
                {{item.wtjb_display}}
              </span>
            </p>
            <p class="serviceCounter-list_info">
              <span>
                <span class="title">信息系统：</span>
                {{item.yymc}}
              </span>
              <span>
                <span class="title">承建单位：</span>
                {{item.cjdw}}
              </span>
              
            </p>
          </div>

          <div class="serviceCounter-list-zt">
            <el-tag size="large" :type="item.zt == '3'?'danger':'primary'">{{item.zt_display}}</el-tag>
            <div  :style="{'color':item.delayState == 3||item.delayState == 4?'#f00':'#333'}">
              {{item.delayDesc}}
            </div>
          </div>

          </div>

          <div class="serviceCounter-list-info" v-show="editOrdelete == index">
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="text"
              style="color:#f00"
              @click="handleOprate('delete',index,item)"
            >删除</el-button>
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="text"
              v-if="item.zt!='0'"
              @click="handleOprate('edit',index,item)"
            >编辑</el-button>
          </div>          
        </li>
      </ul>
      <el-pagination
        v-if="!!dataList.length"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="records"
      ></el-pagination>

      <div v-if="!dataList.length">
        <emptyContent></emptyContent>
      </div>
    </div>

    <fwdjDialog :show.sync="fwdjShow" :wid="wid" @handleCommitFwdj="handleCommitFwdj"></fwdjDialog>
    <yypzDialog :show.sync="yypzShow"></yypzDialog>
    <BjDialog :show.sync="bjShow"></BjDialog>
    <yypzxqDialog :show.sync="yypzxqShow"></yypzxqDialog>
  </div>
</template>

<script>
import { getMenu, getSession } from "@/utils/util.js";
import emptyContent from "@/components/BusinessPage/emptyContent";
import fwdjDialog from "@/views/BusinessPage/serviceCounter/fwdj-dialog";
import yypzDialog from "@/views/BusinessPage/serviceCounter/yypz-dialog";
import BjDialog from "@/views/BusinessPage/serviceCounter/bj-dialog";
import yypzxqDialog from "@/views/BusinessPage/serviceCounter/yypzxq-dialog";

export default {
  data() {
    return {
      fwdjShow: false,
      yypzShow: false,
      bjShow: false,
      yypzxqShow: false, //配置详情
      clztList: [
        { mc: "全部", label: "" },
        { mc: "处理中", label: "1" },
        { mc: "待验证", label: "2" },
        { mc: "办结", label: "3" }
      ], //处理状态
      wtjbList: [
        { mc: "全部", label: "" },
        { mc: "一般", label: "0" },
        { mc: "紧急", label: "1" },
        { mc: "宕机", label: "2" }
      ], //问题级别
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
      dataList: [], //列表
      wid: "", //当前记录

      filterData: {
        clzt: "", //处理状态
        wtjb: "", //问题级别
        date: [],
        sfcb: "", //是否催办
        keyword: ""
      },

      editOrdelete: null
    };
  },
  mounted() {
    this.pageServiceDesk();
  },
  methods: {
    handleOprate(type, index, params) {
      if (type == "delete") {
        this.$confirm("是否删除此条记录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post(this.API.deleteServiceDesk, {
              wid: params.wid
            }).then(res => {
              if (res.state == "success") {
                this.$message({ message: "删除成功", type: "success" });
                this.dataList.splice(index, 1);
              }
            });
          })
          .catch(() => {});
      } else {
        this.wid = params.wid;
        this.fwdjShow = true;
      }
    },

    // 提需求
    handleSendserviceCounter() {
      this.wid = "";
      this.fwdjShow = true;
    },

    // 筛选条件显示
    handleQueryShow() {
      this.queryLJshow = !this.queryLJshow;
    },
    //  查询
    handleQuery() {
      this.currentPage = 1;
      this.pageServiceDesk();
    },

    // 切换页数
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageServiceDesk();
    },

    // 处理状态
    handleChangeclzt(data) {
      this.filterData.clzt = data;
      this.currentPage = 1;
    },
    // 问题级别
    handleChangewtjb(data) {
      this.filterData.wtjb = data;
      this.currentPage = 1;
    },
    // 是否催办
    handleChangesfcb(data) {
      this.filterData.sfcb = data;
      this.currentPage = 1;
    },
    handleCommitFwdj() {
      this.pageServiceDesk();
    },
    //  查询需求列表
    pageServiceDesk() {
      this.$get(this.API.pageServiceDesk, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        djrqStart: !this.filterData.date[0] ? "" : this.filterData.date[0],
        djrqEnd: !this.filterData.date[1] ? "" : this.filterData.date[1],
        zt: this.filterData.clzt,
        wtjb: this.filterData.wtjb,
        sfcb: this.filterData.sfcb,
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
    yypzDialog,
    BjDialog,
    yypzxqDialog
  }
};
</script>

<style scoped lang="scss">
.serviceCounter-pannel {
  width: 95%;
  margin: 20px auto 0;

  .isshown-query {
    &:hover {
      cursor: pointer;
    }
  }

  .serviceCounter-list {
    li {
      border-bottom: 1px solid #dddddd;
      padding: 10px 12px;
    }

    .serviceCounter-list-info {
      padding: 0 20px;
      p {
        margin: 5px 0 !important;
      }
      a {
        color: #333;
        font-size: 18px;
        font-weight: 700;
        &:hover {
          color: rgb(74, 131, 197);
        }
      }
      .serviceCounter-list_info {
        > span {
          display: inline-block;
          min-width: 300px;
        }
      }
      .title {
        color: rgb(184, 184, 184);
      }
    }

    .serviceCounter-list-zt{
      width: 15%;
      text-align: center;
    }
  }
}
</style>
