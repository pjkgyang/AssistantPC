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
          <p>登记时间：{{fwdjInfo.cjsj}} &#x3000;&#x3000; 登记人：{{fwdjInfo.cjrxm}} &#x3000;&#x3000; <span class="filter-weight">服务编号：{{fwdjInfo.fwbh}}</span></p>
        </div>
        <div class="mg-12 questionList-info" flex spacearound>
          <p><span class="baseText">提报日期：</span>{{fwdjInfo.tbsj}}</p>
          <p><span class="baseText">提报人：</span>{{fwdjInfo.tbr}}</p>
          <p><span class="baseText">提报人单位：</span>{{fwdjInfo.dwmc}}</p>

          <p><span class="baseText">请求来源：</span>{{fwdjInfo.qqly_display}}</p>
          <p><span class="baseText">信息系统：</span>{{fwdjInfo.yymc}}</p>
          <p><span class="baseText">承建单位：</span>{{fwdjInfo.cjdw}}</p>

          <p><span class="baseText">问题级别：</span>{{fwdjInfo.wtjb_display}}</p>
          <!-- </div> -->
          <p><span class="baseText">处理状态：</span>{{fwdjInfo.zt_display}}</p>
          <p class="date"><span class="baseText">期望解决日期：</span>{{fwdjInfo.qwjjrq}}</p>


          <p class="date"><span class="baseText">单位联系人：</span>{{fwdjInfo.dwlxr}}</p>
          <p class="date"><span class="baseText">单位联系方式：</span>{{fwdjInfo.dwlxrfs}}</p>
          <p class="date"></p>
        </div>
        <div class="questionList-content" v-html="fwdjInfo.sm"></div>
        <div class="questionList-reply" v-for="(item,index) in fwdjInfo.logs">
          <div colcenter>
            <span class="questionList-reply_title">{{item.lxms}}</span>
            <div>
              <p>
                <span class="baseText">处理人：</span>
                {{item.cjrxm}}&#x3000;&#x3000;
                <span class="baseText">环节：</span>
                {{item.dqztmc}}&#x3000;&#x3000; {{item.cjsj}}
              </p>
              <br />
              <p>{{item.gcms}}</p>
            </div>
          </div>
        </div>
        <div class="mg-12">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="sm"></el-input>
        </div>
        <div text-right>
          <el-button
            type="primary"
            size="mini"
            v-if="fwdjInfo.zt  == '0'"
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
              <p><span class="baseText">登记时间：</span>{{fwdj.cjsj}} &#x3000;&#x3000; 登记人：{{fwdj.cjrxm}} &#x3000;&#x3000; <span class="filter-weight baseText">服务编号：{{fwdjInfo.fwbh}}</span></p>
            </div>
            <div class="mg-12 questionList-info" flex spacebetween>
              <p><span class="baseText">提报日期：</span>{{fwdj.tbsj}}</p>
              <p><span class="baseText">提报人：</span>{{fwdj.tbr}}</p>
              <p><span class="baseText">提报人单位：</span>{{fwdj.dwmc}}</p>

              <p><span class="baseText">请求来源：</span>{{fwdj.qqly_display}}</p>
              <p><span class="baseText">信息系统：</span>{{fwdj.yymc}}</p>
              <p><span class="baseText">承建单位：</span>{{fwdj.cjdw}}</p>

              <p><span class="baseText">问题级别：</span>{{fwdj.wtjb_display}}</p>
              <!-- </div> -->
              <p><span class="baseText">处理状态：</span>{{fwdj.zt_display}}</p>
              <p class="date"><span class="baseText">期望解决日期：</span>{{fwdj.qwjjrq}}</p>


              <p class="date"><span class="baseText">单位联系人：</span>{{fwdj.dwlxr}}</p>
              <p class="date"><span class="baseText">单位联系方式：</span>{{fwdj.dwlxrfs}}</p>
              <p class="date"></p>
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
            <div class="mg-12">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="sm"></el-input>
            </div>
            <div text-right>
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
      bjShow: false, //办结显示
      hfShow: false, //回访
      keyword: "",
      sm: "", // 输入说明
      date: "",

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
      pickerBeginDateBefore: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  mounted() {
    if (!!this.$route.query.id) {
      this.getServiceDesk();
    }
  },
  methods: {
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
        this.$post(type == "hf" ? this.API.reply : this.API.remind, {
          zbwid: this.fwdjInfo.wid,
          sm: this.sm
        }).then(res => {
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
        wid: this.$route.query.wid
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
    flex-wrap: wrap;
    border-bottom: 1px solid rgb(236, 235, 235);
    border-top: 1px solid rgb(236, 235, 235);
    padding: 20px 0;
    p {
      width: 30%;
      span{
        display: inline-block;  
        width: 110px;
        text-align: left;
      }
    }
  }
  .questionList-content {
    padding: 10px;
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
