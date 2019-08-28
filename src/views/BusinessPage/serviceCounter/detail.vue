<template>
  <div class="pannelPadding-10 serviceCounter-detail">
    <div class="pannelPaddingBg-10">
      <div v-if="!$route.query.id">
        <el-input v-model="keyword" placeholder="请输入编号/手机号" @change="handleSearch"></el-input>
        <br />
      </div>
      <!-- 单个服务台 -->
      <div class="questionList" v-if="!!$route.query.id">
        <div class="mg-12" v-if="!!lcList.length">
          <el-steps finish-status="success" simple>
            <el-step
              v-for="(lc, index) in lcList"
              :key="index"
              :status="(Number(fwdjInfo.zt)+1) == Number(lc.id) ? 'process ' : Number(fwdjInfo.zt) >= Number(lc.id) ? 'success' :'wait'"
              :title="lc.lcjdmc"
            ></el-step>
          </el-steps>
        </div>
        <div>
          <h4 class="mg-12">{{fwdjInfo.bt}}</h4>
          <div>
            <p>
              登记时间：{{fwdjInfo.cjsj}} &#x3000;&#x3000; 登记人：{{fwdjInfo.cjrxm}} &#x3000;&#x3000;
              <span
                class="filter-weight"
              >服务编号：{{fwdjInfo.fwbh}}</span>
            </p>
          </div>
        </div>
        <div class="mg-12">
          <div class="questionList-info" flex spacearound>
            <p>
              <span class="baseText">提报日期：</span>
              {{fwdjInfo.tbsj}}
            </p>
            <p>
              <span class="baseText">提报人：</span>
              {{fwdjInfo.tbr}} ({{!fwdjInfo.lxfs?'无':fwdjInfo.lxfs}})
            </p>
            <p>
              <span class="baseText">提报人单位：</span>
              {{fwdjInfo.dwmc}}
            </p>

            <p>
              <span class="baseText">请求来源：</span>
              {{fwdjInfo.qqly_display}}
            </p>
            <p>
              <span class="baseText">信息系统：</span>
              {{fwdjInfo.yymc}}
            </p>
            <p>
              <span class="baseText">承建单位：</span>
              {{fwdjInfo.cjdw}}
            </p>

            <p>
              <span class="baseText">问题级别：</span>
              {{fwdjInfo.wtjb_display}}
            </p>
            <!-- </div> -->
            <p>
              <span class="baseText">处理状态：</span>
              {{fwdjInfo.zt_display}}
            </p>
            <p class="date">
              <span class="baseText">单位联系人：</span>
              {{fwdjInfo.dwlxr}} ({{!fwdjInfo.dwlxfs?'无':fwdjInfo.dwlxfs}})
            </p>

            <p class="date">
              <span class="baseText">期望解决日期：</span>
              {{fwdjInfo.qwjjrq}}
            </p>
            <p class="date">
              <span class="baseText">承诺解决日期：</span>
              {{!fwdjInfo.cnjjrq?'无':fwdjInfo.cnjjrq}}
            </p>
            <p>
              <span class="baseText">附件：</span>
              <a
                v-if="!!fwdjInfo.files"
                style="margin-right:10px"
                title="点击下载"
                v-for="fj in fwdjInfo.files"
                :href="API.downloadFile+'?fjId='+fj.fjbh"
              >{{fj.fjmc}}</a>
              <span v-if="!fwdjInfo.files">无</span>
            </p>
          </div>
        </div>

        <div class="questionList-content" v-html="fwdjInfo.sm"></div>
        <div class="questionList-reply" v-for="(item,index) in fwdjInfo.logs">
          <div colcenter>
            <span class="questionList-reply_title">{{item.lxms}}</span>
            <div style="width:100%;">
              <div colcenter spacebetween style="width:100%;">
                <p>
                  <span class="baseText">处理人：</span>
                  {{item.cjrxm}}&#x3000;&#x3000;
                  <span class="baseText">环节：</span>
                  {{item.dqztmc}}&#x3000;&#x3000; {{item.cjsj}}
                </p>
                <div v-if="groupTag.includes('FWTGLRY')">
                  <el-button size="mini" type="primary" @click="handleOprateFwt('edit',item)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleOprateFwt('del',item)">删除</el-button>
                </div>
              </div>

              <br />
              <div v-html="item.gcms"></div>
            </div>
          </div>
        </div>
        <div class="mg-12" v-if="fwdjInfo.zt != '3'">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="sm"></el-input>
        </div>
        <div text-right v-if="fwdjInfo.zt != '3'">
          <el-button
            type="primary"
            size="mini"
            v-if="fwdjInfo.sfjz == '1' && !fwdjInfo.wtwid"
            @click="handleOperateBtn('zjz')"
          >转问题系统</el-button>
          <el-button
            type="primary"
            size="mini"
            v-if="Number(fwdjInfo.zt) < 2"
            @click="handleOperateBtn('dtbryz')"
          >待提报人验证</el-button>
          <el-button type="primary" size="mini" @click="handleOperateBtn('cnsj')">更新承诺时间</el-button>
          <el-button type="primary" size="mini" @click="handleOperateBtn('yhhf')">用户回访</el-button>
          <el-button type="primary" size="mini" @click="handleOperateBtn('hf')">回复</el-button>
          <el-button type="primary" size="mini" @click="handleOperateBtn('cb')">催办</el-button>
          <el-button type="primary" size="mini" @click="handleOperateBtn('bj')">办结</el-button>
        </div>
      </div>

      <!-- 单条连接搜索 -->
      <div class="questionList" v-if="!$route.query.id && !!fwdjList.length">
        <el-collapse v-model="activeName" accordion @change="handleChangeCollapse">
          <el-collapse-item
            v-for="(fwdj,index) in fwdjList"
            :title="fwdj.bt"
            :key="index"
            :name="index+1"
          >
            <div class="mg-12" v-if="!!lcList.length">
              <el-steps finish-status="success" simple>
                <el-step
                  v-for="(lc, index) in lcList"
                  :key="index"
                  :status="(Number(fwdj.zt)+1) == Number(lc.id) ? 'process ' : Number(fwdj.zt) >= Number(lc.id) ? 'success' :'wait'"
                  :title="lc.lcjdmc"
                ></el-step>
              </el-steps>
            </div>
            <div>
              <h4 class="mg-12">{{fwdj.bt}}</h4>
              <p>
                <span class="baseText">登记时间：</span>
                {{fwdj.cjsj}} &#x3000;&#x3000; 登记人：{{fwdj.cjrxm}} &#x3000;&#x3000;
                <span
                  class="filter-weight baseText"
                >服务编号：{{fwdjInfo.fwbh}}</span>
              </p>
            </div>
            <div class="mg-12 questionList-info" flex spacebetween>
              <p>
                <span class="baseText">提报日期：</span>
                {{fwdj.tbsj}}
              </p>
              <p>
                <span class="baseText">提报人：</span>
                {{fwdj.tbr}} ({{!fwdj.lxfs?'无':fwdj.lxfs}})
              </p>
              <p>
                <span class="baseText">提报人单位：</span>
                {{fwdj.dwmc}}
              </p>

              <p>
                <span class="baseText">请求来源：</span>
                {{fwdj.qqly_display}}
              </p>
              <p>
                <span class="baseText">信息系统：</span>
                {{fwdj.yymc}}
              </p>
              <p>
                <span class="baseText">承建单位：</span>
                {{fwdj.cjdw}}
              </p>

              <p>
                <span class="baseText">问题级别：</span>
                {{fwdj.wtjb_display}}
              </p>
              <!-- </div> -->
              <p>
                <span class="baseText">处理状态：</span>
                {{fwdj.zt_display}}
              </p>
              <p class="date">
                <span class="baseText">单位联系人：</span>
                {{fwdj.dwlxr}} ({{!fwdj.dwlxfs?'无':fwdj.dwlxfs}})
              </p>

              <p class="date">
                <span class="baseText">期望解决日期：</span>
                {{fwdj.qwjjrq}}
              </p>
              <p class="date">
                <span class="baseText">承诺解决日期：</span>
                {{!fwdj.cnjjrq?'无':fwdj.cnjjrq}}
              </p>
              <p>
                <span class="baseText">附件：</span>
                <a
                  style="margin-right:10px"
                  title="点击下载"
                  v-for="fj in fwdj.files"
                  :href="API.downloadFile+'?fjId='+fj.fjbh"
                >{{fj.fjmc}}</a>
              </p>
            </div>
            <div>
              <span class="baseText">附件：</span>
            </div>

            <div class="questionList-content" v-html="fwdj.sm"></div>
            <div class="questionList-reply" v-for="(item,index) in fwdj.logs">
              <div colcenter>
                <span class="questionList-reply_title">{{item.lxms}}</span>
                <div>
                  <p>
                    <span class="baseText">处理人：</span>
                    {{item.cjrxm}}&#x3000;&#x3000;
                    <span class="baseText">环节：</span>
                    {{item.dqztmc}}&#x3000;&#x3000;{{item.cjsj}}
                  </p>
                  <div v-html="item.gcms"></div>
                </div>
              </div>
            </div>
            <div class="mg-12" v-if="item.zt != '3'">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="sm"></el-input>
            </div>
            <div text-right v-if="item.zt != '3'">
              <el-button type="primary" size="mini" @click="handleOperateBtn('hf',fwdj)">回复</el-button>
              <el-button type="primary" size="mini" @click="handleOperateBtn('cb',fwdj)">催办</el-button>
              <el-button type="primary" size="mini" @click="handleOperateBtn('bj',fwdj)">办结</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div v-if="!$route.query.id && !fwdjList.length">
        <emptyContent></emptyContent>
      </div>
    </div>

    <el-dialog title="修改承诺结束日期" :visible.sync="dialogVisible" width="500px">
      <div class="pannelPadding-10">
        <div>
          <span class="filter-weight">承诺结束日期：</span>
          <el-date-picker
            v-model="date"
            :picker-options="pickerBeginDateBefore"
            size="mini"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </div>
        <br />
        <div text-right>
          <el-button size="mini" type="primary" @click="handleChangeCnrq">确 定</el-button>
          <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>

    <bjDialog :show.sync="bjShow" :wid="fwdjInfo.wid" @handleCommitBj="handleCommitBj"></bjDialog>
    <!-- 办结 -->
    <hfDialog :show.sync="hfShow" :wid="fwdjInfo.wid" @handleCommitHf="handleCommitHf"></hfDialog>
    <!-- 回访 -->

    <el-dialog title="编辑" :visible.sync="editVisible" width="700px">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="editContent"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleCommitEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bjDialog from "@/views/BusinessPage/serviceCounter/bj-dialog";
import hfDialog from "@/views/BusinessPage/serviceCounter/hf-dialog";
import emptyContent from "@/components/BusinessPage/emptyContent";
import comment from "@/views/BusinessPage/serviceCounter/comment";
export default {
  data() {
    return {
      dialogVisible: false, //承诺结束日期显示
      editVisible: false,
      bjShow: false, //办结显示
      hfShow: false, //回访
      keyword: "",
      sm: "", // 输入说明
      date: "",
      sfls: false,

      editContent: "", //编辑内容
      // chaxun
      currentPage: 1,
      pageSize: 10,
      records: 0,
      fwdjList: [],
      fwdjInfo: {},
      lcList: [
        {
          zt: 1,
          lcjdmc: "登记",
          id: "0"
        },
        {
          zt: 1,
          lcjdmc: "处理中",
          id: "1"
        },
        {
          zt: 1,
          lcjdmc: "待验证",
          id: "2"
        },
        {
          zt: 1,
          lcjdmc: "办结",
          id: "3"
        }
      ],
      activeName: 1,
      groupTag: "",
      curLog: {},
      pickerBeginDateBefore: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  mounted() {
    if (
      !!sessionStorage.getItem("isJZuser") &&
      sessionStorage.getItem("isJZuser") == 1
    ) {
      this.sfls = true;
    }

    if (!!sessionStorage.getItem("userInfo")) {
      this.groupTag = JSON.parse(
        sessionStorage.getItem("userInfo")
      ).userGroupTag;
    }

    if (!!this.$route.query.id) {
      this.getServiceDesk();
    }
  },
  methods: {
    handleCommitEdit() {
      this.$post(this.API.updateServiceDeskProcess, {
        wid: this.curLog.wid,
        content: this.editContent
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "保存成功", type: "success" });
          this.getServiceDesk();
          this.editContent = "";
          this.editVisible = false;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 编辑 删除
    handleOprateFwt(type, params) {
      if (type == "edit") {
        this.curLog = params;
        this.editVisible = true;
      } else {
        this.$confirm("是否删除此条回复?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post(this.API.deleteServiceDeskProcess, {
              wid: item.wid
            }).then(res => {
              if (res.state == "success") {
                this.$message({ message: "删除成功", type: "success" });
                this.getServiceDesk();
              } else {
                this.$alert(res.msg, "提示", {
                  confirmButtonText: "确定",
                  type: "error"
                });
              }
            });
          })
          .catch(() => {});
      }
    },
    // 折叠板子
    handleChangeCollapse(value) {
      if (!value) return;
    },

    // 条连接搜索
    handleSearch() {
      this.pageServiceDeskWithoutAuth();
    },

    /**
     *
     */
    // 办结
    handleCommitBj() {
      if (!!this.$route.query.id) {
        this.getServiceDesk();
      } else {
        this.pageServiceDeskWithoutAuth();
      }
    },
    // 回访
    handleCommitHf() {
      this.getServiceDesk();
    },
    // 修改承诺结束日期
    handleChangeCnrq() {
      this.$post(this.API.updatePromisedTime, {
        zbwid: this.fwdjInfo.wid,
        date: this.date
      }).then(res => {
        if (res.state == "success") {
          this.getServiceDesk();
          this.$message({ message: "提交成功", type: "success" });
          this.dialogVisible = false;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    // 按钮操作
    handleOperateBtn(type, params) {
      if (!!params) this.fwdjInfo = params;
      if (type == "hf" || type == "cb") {
        if (type == "hf" && /^[\s]*$/.test(this.sm)) {
          this.$message({ message: "请输入回复内容", type: "warning" });
          return;
        }
        this.$post(
          type == "hf" ? this.API.replyServiceDesk : this.API.remindServiceDesk,
          {
            zbwid: this.fwdjInfo.wid,
            sm: this.sm
          }
        ).then(res => {
          if (res.state == "success") {
            this.$message({
              message: type == "hf" ? "回复成功" : "催办成功",
              type: "success"
            });
            if (!!this.$route.query.id) {
              this.getServiceDesk();
            } else {
              this.pageServiceDeskWithoutAuth();
            }
            this.sm = "";
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
        // 转金智,待金智验证
      } else if (type == "zjz" || type == "dtbryz") {
        this.$confirm(
          type == "zjz" ? "是否确定转到金智？" : "您确定要提交待用户验证？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.$post(
              type == "zjz"
                ? this.API.becomeAssistantQuestion
                : this.API.waitForUserVerification,
              {
                zbwid: this.fwdjInfo.wid
              }
            ).then(res => {
              if (res.state == "success") {
                this.getServiceDesk();
                this.$message({
                  message: type == "zjz" ? "已转至金智问题系统" : "提交成功",
                  type: "success"
                });
              } else {
                this.$alert(res.msg, "提示", {
                  confirmButtonText: "确定",
                  type: "error"
                });
              }
            });
          })
          .catch(() => {});

        // 承诺日期
      } else if (type == "cnsj") {
        this.dialogVisible = true;
        // 办结
      } else if (type == "bj") {
        this.bjShow = true;
        // 用户回访
      } else if (type == "yhhf") {
        this.hfShow = true;
      }
    },
    // 获取单个服务台
    getServiceDesk() {
      this.$get(this.API.getServiceDesk, {
        wid: this.$route.query.id
      }).then(res => {
        if (res.state == "success") {
          this.fwdjInfo = res.data;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    // 单个链接搜索
    pageServiceDeskWithoutAuth() {
      this.$get(this.API.pageServiceDeskWithoutAuth, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        fwbhOrLxfs: this.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.fwdjList = res.data.rows;
          } else {
            this.fwdjList = [];
          }
          this.records = res.data.records;
        } else {
        }
      });
    }
  },

  components: { bjDialog, hfDialog, emptyContent, comment }
};
</script>

<style scoped lang="scss">
.questionList {
  h4 {
    font-weight: 700;
    margin: 10px 0;
  }
  .questionList-info {
    border-top: 1px solid rgb(236, 235, 235);
    flex-wrap: wrap;
    padding: 20px 0;
    p {
      width: 30%;
      span {
        display: inline-block;
        width: 110px;
        text-align: left;
      }
    }
  }
  .questionList-content {
    padding: 10px;
    border-top: 1px solid rgb(236, 235, 235);
    border-bottom: 1px solid rgb(236, 235, 235);
  }
  .questionList-reply {
    > div {
      padding: 10px 0;
      border-bottom: 1px solid rgb(236, 235, 235);
    }
  }
  .questionList-reply_title {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    margin: 0 20px 0 0;
    background: #499597;
  }
}
</style>
