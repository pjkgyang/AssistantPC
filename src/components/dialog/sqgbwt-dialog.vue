<template>
  <div>
    <el-dialog
      :title="!this.suspend?'申请关闭问题列表(我的提问)':'申请挂起问题列表'"
      width="1200px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="questionList-hg" :style="{'max-height':height+'px'}">
        <questionCard
          :questionList="questionList"
          @handleQuestionDetail="handleQuestionDetail"
          @handleReject="handleReject"
          @handleClose="handleClose"
          @handleAgreeGq="handleAgreeGq"
          @handleRejectGq="handleRejectGq"
        ></questionCard>
      </div>
      <div text-right class="pd-10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
    <gxrDialog :show.sync="gxrShow" :wtInfo="wtInfo" @closeQuestion="closeQuestion"></gxrDialog>
  </div>
</template>

<script>
import { queryAllQuestions, applyDismiss } from "@/api/xmkb.js";
import questionCard from "@/components/BusinessPage/questionCard.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import gxrDialog from "@/components/dialog/gxr-dialog.vue";
import { getUsers } from "@/api/personal.js";
export default {
  data() {
    return {
      height: window.innerHeight - 200,
      visible: this.show,
      gxrShow: false,
      wtInfo: {},
      index: "",
      currentPage: 1,
      pageSize: 15,
      total: 0,
      questionList: []
    };
  },
  methods: {
    handleQuestionDetail(params) {
      let routeData = this.$router.resolve({
        name: "questionDetail",
        query: {
          wid: params.wid
        }
      });
      window.open(routeData.href, "_blank");
    },

    // 驳回
    handleReject(params, index, sm) {
      this.$confirm("确定驳回该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          applyDismiss({
            wid: "",
            zbwid: params.wid,
            sm: sm
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
    //关闭问题
    handleClose(params, index) {
      this.wtInfo = params;
      this.index = index;
      this.gxrShow = !this.gxrShow;
    },
     //关闭问题成功
    closeQuestion() {
      this.gxrShow = !this.gxrShow;
      this.questionList[this.index].fbzt = 1;
      this.questionList[this.index].sqgbCount = 0;
    },

    // 同意 挂起
    handleAgreeGq(params, index) {
      this.$post(this.API.dealSuspend, {
        wid: params.wid,
        isagree: 0,
        sm: ""
      }).then(res => {
        if (res.state == "success") {
          this.$alert("已同意挂起！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.questionList[index].sqgqz = 0;
            }
          });
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    // 驳回 挂起
    handleRejectGq(params, index, sm) {
      this.$post(this.API.dealSuspend, {
        wid: params.wid,
        isagree: 1,
        sm: sm
      }).then(res => {
        if (res.state == "success") {
          this.$alert("已成功驳回！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.questionList[index].sqgqz = 0;
            }
          });
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    handleCurrentChange(data) {
      // 分页
      this.currentPage = data;
      this.queryAllQuestions();
    },
    handleSizeChange(data) {
      // 每页条数
      this.pageSize = data;
      this.currentPage = 1;
      this.queryAllQuestions();
    },
    // 查询申请关闭的问题
    queryAllQuestions() {
      queryAllQuestions({
        curPage: this.currentPage,
        pageSize: this.pageSize,
        dtwrcl: 1
      }).then(({ data }) => {
        if (data.state == "success") {
          if (!!data.data.rows && !!data.data) {
            this.questionList = data.data.rows;
          }
          this.total = data.data.records;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    // 获取挂起问题
    queryApplySuspension() {
      this.$get(this.API.queryApplySuspension, {
        curPage: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows && !!res.data) {
            this.questionList = res.data.rows;
          }
          this.total = res.data.records;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    suspend: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
      } else {
        this.currentPage = 1;
        if (!this.suspend) {
          this.queryAllQuestions();
        } else {
          this.queryApplySuspension();
        }
      }
    }
  },
  components: { tableLayout, questionCard, gxrDialog }
};
</script>

<style scoped>
.questionList-hg {
  overflow-y: auto;
}
</style>
