<template>
    <div style="padding-top:10px">
        <div class="complain-detail">
          <section>
            <div style="padding:0 10px;margin-top:10px">
              <div class="question-steps">
                    <el-steps align-center finish-status="success">
                      <el-step v-for="(complaint,index) in complaintProcess" :status='complaint.status'  :key="index" :title="complaint.mc">
                          <i v-if="complaint.flag == 1" class="el-icon-time" slot="icon"></i>
                        </el-step>
                    </el-steps>
                </div>
              <div style="overflow:hidden;">
                <div class="complain-detail-cont">
                  <div style="margin:0 20px;">
                     <img src="static/img/tousu.png" alt="" v-if="complain.zt != 3">
                     <span class="el-icon-success" style="color:#67C23A;font-size:32px;" v-if="complain.zt == 3"></span>
                  </div>
                  <div style="width:80%">
                    <p style="color:#000;margin:0">{{complain.tsbt}}</p>    
                    <p style="font-size: 12px;color: #363748;">{{complain.tssj}}</p>
                    <p class="complain-detail-bt">
                      <span><span class="complain-detail-front">投诉人单位 : </span>{{complain.ssdwmc}} </span>
                      <span><span class="complain-detail-front">投诉人 : </span>{{complain.tsrxm}}</span>
                    </p>
                    <p class="complain-detail-bt">
                       <span><span class="complain-detail-front">项目 : </span>{{complain.xmmc}} </span>
                    </p>
                     <p class="complain-detail-bt">
                       <span><span class="complain-detail-front">产品 : </span>{{complain.cpmc}} </span>
                    </p>
                     <p class="complain-detail-bt">
                       <span><span class="complain-detail-front">投诉对象 : </span><span v-for="ry in complain.ryTsData">{{ry.yhxm}}&#x3000;</span></span>
                    </p>
                  </div>
                </div>
                <div class="complain-info" v-html="complain.tsnr"></div>
              </div>
              </div>

              <div class="complain-detail-reply" >
                  <div v-for="(item,index) in comments">
                       <div style="background: #F5F7FA;color: #363748;margin-top:10px;height:44px;line-height:44px">
                        <span>{{item.hflx ==1?"回复":item.hflx ==2?"催办":item.hflx ==3?"产品":item.hflx ==4?"指定":item.hflx ==5?'关闭':item.hflx ==6?'受理':'回答'}}</span>
                        <!-- <span>{{item.hflx ==1?"回":item.hflx ==2?"催":item.hflx ==3?"产":item.hflx ==4?"责":item.hflx ==5?'关':item.hflx ==6?'受':'答'}}</span> -->
                        <span style="font-size: 12px;color: #A8A8A8;">回复人:</span>{{item.hfrxm}}&#x3000;&#x3000;
                        <span style="font-size: 12px;color: #A8A8A8;">所属单位:</span>{{item.ssdw}}&#x3000;&#x3000;{{item.hfsj}}
                        <span style="font-size: 12px;color: #A8A8A8;margin-left:60px;" v-if="item.hflx ==3||item.hflx ==4">{{item.hflx ==3?'产品接口人':'责任人'}} ：</span>
                          <span v-for="ry in item.ryTsData">{{ry.yhxm}}</span>
                       </div>
                     <div  class="complain-info" v-html="item.hfnr"></div>
                </div>
              </div>
            </section>
            <div class="quilleditor" > 
             <div id="summernoteT"> </div>
            </div>
            <div style="text-align:right;padding:10px 15px;">
                <el-button type="primary" size="mini" @click="handleCommitSL" v-if="tsBtnAuth.sl">受理</el-button>
                <el-button type="primary" size="mini" @click="handleCommitFK"  v-if="tsBtnAuth.fk">投诉反馈</el-button>
                <el-button type="primary" size="mini" @click="handleCommitCpjkr" v-if="tsBtnAuth.zdrcp">指定产品接口人</el-button>
                <el-button type="primary" size="mini" @click="handleCommitZdfzr"  v-if="tsBtnAuth.zdrjjr">指定解决人</el-button>
                <el-button type="primary" size="mini" @click="handleCommitReminder" v-if="tsBtnAuth.cb">催办</el-button>
                <el-button type="primary" size="mini" @click="handleCommitReply" v-if="tsBtnAuth.hf" :disabled="HFbtnDisabled">回复</el-button>
                <el-button type="danger" size="mini" @click="handleCloseComplain" v-if="tsBtnAuth.gb">关闭投诉</el-button>
            </div>
            
        <el-dialog
            :title="zdTitle"
            :visible.sync="ZDcpjkrVisible"
            :close-on-click-modal="false"
            width="800px"
            top="50px"
            append-to-body>
            <div style="padding:10px;">
              <zdfzrChoose :tableData="tableData" :zdTitle="zdTitle" :jkrTotal="jkrTotal" @handleClose="handleClose" @handleCommitZdr="handleCommitZdr" @queryComplainZRR="queryComplainZRR" @queryComplainUser="queryComplainUser" @handleCurrentChange="handleZrrChange"></zdfzrChoose>
            </div>
          </el-dialog>  
        </div>     
        </div>
</template>
<script>
import pagination from "@/components/BusinessPage/pagination.vue";
import {
  complain,
  getComplaint,
  reply,
  getComments,
  closeComplaint,
  editComplain,
  deleteComplain,
  tsBtnAuth
} from "@/api/complain.js";
import {  queryProcess, showQuestionCondition } from "@/api/xmkb.js";
import { getProjectCatalog } from "@/api/xmfz.js";
import {
  queryZjCpData,
  queryUser
} from "@/api/personal.js";
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
import zdfzrChoose from "@/components/BusinessPage/zdfzrChoose.vue";
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    return {
      note: {
        backgroundImage:
          "url(" + require("../../../static/img/replyIcon.png") + ")"
      },
      total: null,
      pageSize: 10,
      keyword: "",
      complain: [],
      comments: [],
      replyContent: "",
      complainContent: "",
      wid: "",
      complainType: null,
      pageData: 1,
      windowUnitType: "",
      complaintProcess: [],
      ZDcpjkrVisible: false,
      zdTitle: "指定产品接口人",
      cpjkrValue: "",
      zdzrrValue: "",
      cpKeyword: "",
      tableData: [],
      jkrTotal: null,
      tsBtnAuth: {},
      HFbtnDisabled: false,
      showCondition: "",
      queryLJshow: true
    };
  },
  mounted() {
    this.wid = this.$route.query.wid
    if(window.location.hash.includes('h=1')){
        sessionStorage.setItem('Detailpannel',window.location.hash)
    }else{
        sessionStorage.removeItem('Detailpannel');
    }

    this.windowUnitType = sessionStorage.getItem("isJZuser");
    
    showQuestionCondition().then(({ data }) => {
      //提问展示
      this.showCondition = data.data;
    });

     $("#summernoteT").summernote({
              dialogsInBody: true,
              placeholder: "请输入投诉内容",
              height: 200,
              width: 100 + "%",
              minHeight: 250,
              maxHeight:'',
              lang: "zh-CN",
              focus: true,
              toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["picture"],
                ["link", ["linkDialogShow", "unlink"]]
        ]
    });

      this.queryProcess(this.wid);
      this.complantBtnAuth(this.wid);
      this.getComplaint(this.wid);
      document.title =  '投诉详情'

  },
  computed: {},
  methods: {
    // 催办
    handleCommitReminder() {
      this.reply(2, "", "催办成功");
    },
    // 指定解决人
    handleCommitZdfzr() {
      this.ZDcpjkrVisible = true;
      this.zdTitle = "指定解决人";
      this.queryUser(1);
    },
    // 指定产品接口人
    handleCommitCpjkr() {
      this.ZDcpjkrVisible = true;
      this.zdTitle = "指定产品接口人";
      this.queryCpData(1);
    },
    // 受理
    handleCommitSL() {
      if($('#summernoteT').summernote('code') == '<p><br></p>' || $('#summernoteT').summernote('code') == ''){
          this.$alert('请填写受理内容', '提示', {
          confirmButtonText: '确定',
          type:'warning',
          callback: action => {}
        });
        return;
      }
      this.reply(6, "", "受理成功");
    },
    // 反馈
    handleCommitFK() {
      this.reply(7, "", "反馈成功");
    },
    // 分页
    handleZrrChange(data) {
      if (this.zdTitle == "指定产品接口人") {
        this.queryCpData(data);
      } else if (this.zdTitle == "指定解决人") {
        this.queryUser(data);
      }
    },
    // 查询投诉责任人
    queryComplainZRR(data) {
      this.cpKeyword = data;
      if (this.zdTitle == "指定产品接口人") {
        this.queryCpData(1);
      } else if (this.zdTitle == "指定解决人") {
        this.queryUser(1);
      }
    },
    queryComplainUser(data) {
      this.cpKeyword = data;
      if (this.zdTitle == "指定产品接口人") {
        this.queryCpData(1);
      } else if (this.zdTitle == "指定解决人") {
        this.queryUser(1);
      }
    },
    // 选择人员
    handleCommitZdr(data) {
      if (this.zdTitle == "指定产品接口人") {
        this.reply(3, data.cymc + "," + data.userId, "操作成功", data.nr);
      } else if (this.zdTitle == "指定解决人") {
        this.reply(4, data.nickName + "," + data.uid, "操作成功", data.nr);
      }
      this.ZDcpjkrVisible = false;
    },
    handleClose() {
      this.ZDcpjkrVisible = false;
    },

    queryUser(curPage) {
      queryUser({
        curPage: curPage,
        pageSize: 10,
        Isexternal: "",
        keyword: this.cpKeyword
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data.rows;
          this.jkrTotal = data.data.records;
        }
      });
    },
    // 获取产品指定人
    queryCpData(curPage) {
      queryZjCpData({
        curPage: curPage,
        pageSize: 10,
        rylb: 1,
        keyword: this.cpKeyword
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data.rows;
          this.jkrTotal = data.data.records;
        }
      });
    },
    handleCommitReply(){  // 回复
      this.replyContent = $('#summernoteT').summernote('code');
      if(this.replyContent=="<p><br></p>" || this.replyContent==""){
          this.$alert('请输入回复内容', '提示', {
            confirmButtonText: '确定',
            type:'warning',
          });
      }else{
        this.HFbtnDisabled = true
        reply({
          tswid:this.wid,
          tslx:1,
          content:this.replyContent
        }).then(({data})=>{
          if(data.state == 'success'){
            this.HFbtnDisabled = false
              this.$alert('回复成功', '提示', {
              confirmButtonText: '确定',
              type:'success',
              callback: action => {
                this.queryProcess(this.wid);
                $('#summernoteT').summernote('code','');
                this.getComments();
              }
            });
          }else{
              this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                type:'error',
              })
            this.HFbtnDisabled = false
          }
        })
      }
    },
    // 关闭投诉
    handleCloseComplain() {
      this.$confirm("是否关闭该投诉?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.reply(5, "", "关闭成功！", "");
        })
        .catch(() => {});
    },

    reply(tslx, ryData, msg, content) {
      reply({
        tswid: this.wid,
        tslx: tslx,
        ryData: ryData,
        content:tslx == 3 || tslx == 4? content: $("#summernoteT").summernote("code")
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert(msg, "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              if (tslx == 5) {
              } else if (tslx == 6 || tslx == 7) {
                this.complantBtnAuth(this.wid);
              }
              $("#summernoteT").summernote("code", "");
              this.queryProcess(this.wid);
              this.getComments();
            }
          });
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    
    // 获取投诉
    getComplaint(wid) {
      getComplaint({
        wid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.complain = data.data;
          this.getComments();
          if (this.complain.zt == 3) {
               $("#summernoteT").summernote("destroy");
          } 
        }
      });
    },
    // 获取投诉按钮权限
    complantBtnAuth(wid) {
      tsBtnAuth({
        tswid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tsBtnAuth = data.data;
        }
      });
    },
    // 查询投诉进展
    queryProcess(wid) {
      // this.complaintProcess = [];
      queryProcess({
        wid: wid,
        isTs: true
      }).then(({ data }) => {
        if (data.state == "success") {
          this.complaintProcess = data.data;
          this.complaintProcess.forEach((ele, i, arr) => {
            if (ele.flag == 1) {
              this.complaintProcess[i].status = "process";
            } else if (ele.flag == 2) {
              this.complaintProcess[i].status = "success";
            }
          });
        }
      });
    },
    // 获取评论
    getComments() {
      getComments({
        curPage: 1,
        pageSize: 99999,
        tswid: this.wid
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data != null && data.data.length != 0) {
            this.comments = data.data.rows;
          }
        }
      });
    },
    closeComplaint() {
      this.$confirm("是否确定关闭该条投诉?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          closeComplaint({
            tswid: this.wid
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("投诉已经关闭，感谢您的支持！", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                }
              });
            }
          });
        })
        .catch(() => {});
    }
    //  获取枚举
  },
  watch: {},
  activated() {
  },
  components: {
    pagination,
    itemChoose,
    zdfzrChoose
  }
};
</script>
<style scoped>
.complain-detail {
    width: 95%;
    margin: 0px auto;
    padding: 10px;
    background: #fff;
}
.complain-detail-cont {
  display: flex;
  border-bottom: 1px solid #f1f1f1;
  align-items: center;
}
.complain-detail-cont .complain-detail-bt {
  display: flex;
  justify-content: space-between;
}
.complain-detail-cont .complain-detail-bt .complain-detail-front {
  color: #a8a8a8 !important;
}
.complain-detail-cont > p:nth-of-type(1),
.complain-detail-cont span {
  color: #000;
}
.complain-detail-reply {
  padding: 0 10px;
}
.complain-detail-reply span:nth-of-type(1) {
  display: inline-block;
  height: 26px;
  width: 38px;
  background: #3ba7f5;
  border-radius: 3px;
  color: #fff;
  line-height: 26px;
  text-align: center;
  margin: 0 10px;
}
.complain-info {
  width: 100%;
  min-height: 30px;
  background: #fff;
  padding: 0 10px;
  margin: 5px 0;
  border-bottom: 1px solid #f1f1f1;
  padding-left: 60px;
}
.quilleditor {
  padding: 0 5px;
  margin: 15px 0;
}

.lx-wcl {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.2);
}
.lx-clz {
  color: #ff9400;
  background: rgba(255, 148, 0, 0.2);
}
.lx-ycl {
  color: #7ece64 !important;
  background: rgba(126, 206, 100, 0.2);
}
.complain-list ul li:hover .complainOprater {
  opacity: 1;
}
.complainOprater > span:hover {
  text-decoration: underline #888;
}
.complainOprater {
  opacity: 0;
  font-size: 13px;
}
.question-reply {
  display: inline-block;
  width: 28px;
  height: 28px;
  border: 1px solid #ccc;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
  background: #67c23a;
  color: #fff;
  background-size: cover;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}
.question-steps {
  padding: 5px 10px;
  background: #f4f6f9;
}
.name-wrapper span {
  color: #409eff;
}
.name-wrapper span:hover {
  cursor: pointer;
}

.complain-textarea {
  display: flex;
}
.complain-textarea > span {
  width: 90px;
  padding-right: 12px;
  font-weight: 700;
  text-align: right;
}
.complain-textarea > span::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.isshown-query:hover {
  cursor: pointer;
}
</style>
