<template>
  <div class="pannelPadding-10">
    <div class="project-question pannelPaddingBg-10">
      <div class="mg-12" text-right v-if="userGroupTag.includes('ProblemAdmin')">
        <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
      </div>
      <div class="project-question-detailList">
        <questionCard :questionList="questionList" @handleQuestionDetail="handleQuestionDetail" @handleReject="handleReject" @handleClose="handleClose"></questionCard>
        <div style="padding:5px 10px 10px 0;text-align:right" v-if="total > 10">
          <pagination :total="total" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </div>
      <gxrDialog :show.sync="gxrShow" :wtInfo="wtInfo" @closeQuestion="closeQuestion"></gxrDialog>
    </div>
  </div>
</template>
<script>
import gxrDialog from "@/components/dialog/gxr-dialog.vue";
import pagination from "@/components/BusinessPage/pagination.vue";
import { queryReportQuestionLst, applyDismiss } from "@/api/xmkb.js";
import questionCard from "@/components/BusinessPage/questionCard.vue";
export default {
  data() {
    return {
      gxrShow: false,
      wtInfo: {},
      index: "",
      questionList: [],
      curPage: 1,
      pageSize: 10,
      CurrentPage: 1,
      total: null,
      Data: {},
      queryId: "",
      userGroupTag:""

    };
  },
  props: {},
  mounted() {
    this.queryId = this.$route.params.id;
    this.getReportQuestion(1); //获取报表问题
    this.userGroupTag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
  },

  methods: {
    handleExport(){
      window.open(this.API.exportReportQuestionLst+'?'+window.location.hash.split('?')[1]);
    },
    handleReject(params, index) {
      // 驳回
      this.$confirm("确定驳回该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          applyDismiss({
            wid: "",
            zbwid: params.wid
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("已成功驳回！", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.questionList[index].sqgbCount = 0;
                }
              });
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    handleClose(params, index) {
      //关闭问题
      this.wtInfo = params;
      this.index = index;
      this.gxrShow = !this.gxrShow;
    },
    closeQuestion() {
      this.gxrShow = !this.gxrShow;
      this.questionList[this.index].fbzt = 1;
      this.questionList[this.index].sqgbCount = 0;
    },
    getReportQuestion(curPage) {
      this.Data = this.$route.query;
      this.Data.curPage = curPage;
      this.Data.pageSize = this.pageSize;
      this.queryReportQuestionList(this.Data);
    },

    queryReportQuestionList(obj) {
      //获取报表问题列表
      this.$get(
        this.queryId == "questionPflist"
          ? this.API.WtReportOrderStarLst
          : this.API.queryReportQuestionLst,
        obj
      ).then(res => {
        if (res.state == "success") {
          if (res.data.rows != null) {
            this.questionList = res.data.rows;
          }
          this.total = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        }
      });
    },
      // 分页切换

    handleCurrentChange(data) {
      this.CurrentPage = data;
      this.getReportQuestion(data);
    },

    handleQuestionDetail(params) {
      // 跳转详情
      let routeData = this.$router.resolve({
        name: "questionDetail",
        query: {
          wid: params.wid
        }
      });
      window.open(routeData.href, "_blank");
    }
  },
  watch: {},
  activated() {},
  components: { pagination, gxrDialog, questionCard }
};
</script>
<style scoped>
.project-question {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
}
.project-question .project-question-detailList {
  border-radius: 4px;
  background: #fff;
  padding: 10px;
}

.question-type {
  text-align: center;
  width: 100px;
}
.questionOperate {
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
}
.questionOperate > span:hover {
  text-decoration: underline #888;
}
.question-type span.el-icon-question {
  font-size: 32px;
  color: #f56c6c;
}
.question-type span.el-icon-success {
  font-size: 30px;
  color: #67c23a;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}
</style>
