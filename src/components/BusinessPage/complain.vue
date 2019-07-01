<template>
  <div style="background:#EAEAEA;height:calc(100vh - 90px)">
    <div class="complain-list">
      <div class="complain-query">
        <p style="font-size:14px !important;margin-bottom:10px !important;">
          &nbsp;&nbsp;
          <span :class="{'isshown-query':true,'el-icon-arrow-up':!queryLJshow,'el-icon-arrow-down':queryLJshow}" @click="handleQueryShow"></span>&#x3000;
          <span style="font-weight:700">高级查询</span>&nbsp;&nbsp;
          <el-input v-model="keyword" size="mini" style="width:300px" placeholder="请输入投诉人工号/手机号/项目编号/项目名称" @change="searchComplant"></el-input>&#x3000;
          <el-button size="mini" type="primary" @click="handlequeryComplant">查询</el-button>
        </p>
        <div v-if="queryLJshow">
          <div flex>
            <span class="query-title">查询状态:</span>
            <p class="query-list">
              <span data-type="" :class="{'bg-active':cxzt == ''}" @click="handleCXZT">全部</span>
              <span data-type="1" :class="{'bg-active':cxzt == '1'}" @click="handleCXZT">未处理</span>
              <span data-type="2" :class="{'bg-active':cxzt == '2'}" @click="handleCXZT">处理中</span>
              <span data-type="3" :class="{'bg-active':cxzt == '3'}" @click="handleCXZT">已关闭</span>
            </p>
          </div>
          <div flex>
            <span class="query-title">是否催办:</span>
            <p class="query-list">
              <span data-type="" :class="{'bg-active':sfcb == ''}" @click="handleSFCB">全部</span>
              <span data-type="1" :class="{'bg-active':sfcb == '1'}" @click="handleSFCB">是</span>
              <span data-type="0" :class="{'bg-active':sfcb == '0'}" @click="handleSFCB">否</span>
            </p>
          </div>
          <div flex>
            <span class="query-title">投诉类别:</span>
            <p class="query-list">
              <span data-type="" :class="{'bg-active':tslb == ''}" @click="handleTSLB">全部</span>
              <span v-for="(complain,index) in complaintType" :data-type="complain.label" :key="index" :class="{'bg-active':tslb == complain.label}" @click="handleTSLB">{{complain.mc}}</span>
            </p>
          </div>
          <div v-if="showCondition == 2" flex>
            <span class="query-title">区域战队:</span>
            <p class="query-list" style="width: 90%;">
              <span data-type="" :class="{'bg-active':gczd == ''}" @click="handleGCZD">全部</span>
              <span v-for="(gcqy,index) in gczdList" :data-type="gcqy.label" :key="index" :class="{'bg-active':gczd == gcqy.label}" @click="handleGCZD">{{gcqy.mc}}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- 2018-12-05 修改：过保且售后服务状态未启动，不能提问，不能投诉。 -->
      <div style="background:#fff; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top:10px;padding:10px;border-radius:4px;">
        <el-button type="danger" @click="handleComplain" :disabled="xmkbInfo.ztztmc=='已过保' && xmkbInfo.gcfwzt=='0'">
          {{xmkbInfo.ztztmc=='已过保' && xmkbInfo.gcfwzt=='0'?'过保且售后服务状态未启动，不能投诉':'我要投诉'}}
        </el-button>
        <!-- v-if="windowUnitType == 1" -->
        <hr style="border-top:1px solid #eee;margin:8px 0 0 0 !important">
        <ul>
          <li v-for="(complain,index) in complainList">
            <div class="complain-logo">
              <img src="static/img/tousu.png" alt="" v-if="complain.zt == 1 || complain.zt == 2">
              <span class="el-icon-success" v-if="complain.zt == 3"></span>
            </div>
            <div class="complain-content">
              <p :data-wid="complain.wid" @click="getComplaint">
                <span>{{complain.tsbt}}</span>
              </p>
              <p style="color:#363748;font-size:12px">{{complain.tssj}}</p>
              <p style="white-space:nowrap;">
                <span style="display:inline-block;width:50%">
                  <span class="complain-content-info-front">投诉人单位：</span>{{complain.ssdwmc}}</span>
                <span style="display:inline-block;width:50%">
                  <span class="complain-content-info-front">投诉人：</span>{{complain.tsrxm}}</span>
              </p>
              <p class="complain-content-info">
                <span class="complain-content-tscp" :title="complain.cpmc">
                  <span class="complain-content-info-front">投诉产品 : </span>{{complain.cpmc}}</span>
                <span>
                  <span class="complain-content-info-front">投诉类别 : </span>{{complain.tslbmc}}</span>
              </p>
              <p>
                <span style="display:inline-block;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" :title="complain.xmmc">
                  <span class="complain-content-info-front">投诉项目 : </span>{{complain.xmmc}}</span>
              </p>
              <p class="complainOprater">
                <span class="el-icon-edit" v-if="complain.edita" @click="complainEdit(index)">
                  <span style="color:#409EFF"> 编辑</span>
                </span>&#x3000;
                <span class="el-icon-delete" v-if="complain.edita" :data-wid="complain.wid" @click="complainDelect">
                  <span style="color:#f00"> 删除</span>
                </span>
              </p>
            </div>
            <div class="complain-oprate">
              <span style="font-size:16px;color:#f00;" :class="{'lx-wcl':complain.zt==1,'lx-clz':complain.zt == 2,'lx-ycl':complain.zt == 3}">{{complain.zt == 1?'未处理':complain.zt == 2?'处理中':'已关闭'}}</span><br>
              <!-- <span v-if="windowUnitType==0||windowUnitType==2" style="font-size:14px;color:#7ECE64;margin-top:5px;"><span style="font-size:12px;color:#A8A8A8">回复数</span> &#x3000;{{complain.commentCount}}</span> -->
            </div>
          </li>
          <div v-if="complainList.length == 0" style="text-align:center;font-size:20px;padding-top:100px">
            <img src="static/img/empty.png" alt="">
            <p>暂无投诉</p>
          </div>
        </ul>
      </div>
    </div>

    <div style="text-align:center;padding:20px 0;">
      <pagination v-if="total>8 && total != null" :total="total" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange"></pagination>
    </div>

    <el-dialog title="投诉内容" :close-on-click-modal="false" :visible.sync="complainVisible" width="800px">
      <div style="padding:10px;" class="complain-cplist">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="投诉类别" style="margin-bottom:15px;" required>
            <el-select v-model="form.tslb" placeholder="请选择投诉类别" size="mini" style="width:100%">
              <el-option v-for="(complain,index) in complaintType" :key="complain.label" :label="complain.mc" :value="complain.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称" style="margin-bottom:15px;" required>
            <el-input size="mini" placeholder="请选择项目" v-model="xmmc" readonly></el-input>
          </el-form-item>
          <el-form-item label="产品" style="margin-bottom:15px;">
            <el-select ref="selects" v-model="form.cp" placeholder="请选择产品 / 搜索产品名称" size="mini" filterable style="width:100%"  @change="handleChoose">
              <el-option v-for="(cp,index) in cpList" :key="index" :label="cp.mc" :value="cp.mc+'&'+cp.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投诉对象" style="margin-bottom:15px;">
            <el-select v-model="form.object" multiple placeholder="请选择投诉对象（可多选）" size="mini" style="width:100%">
              <el-option v-for="(item,index) in tsdxList" :key="index" :label="item.userName" :value="item.userName+','+item.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" style="margin-bottom:15px;line-height:3" required>
            <el-input v-model="form.title" placeholder="请输入投诉标题" size="mini"></el-input>
          </el-form-item>
        </el-form>
        <div class="complain-textarea">
          <span>投诉内容</span>
          <div id="summernote"> </div>
        </div>
        <div style="width:100%;text-align:right">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pagination from "@/components/BusinessPage/pagination.vue";
import {
  complain,
  complaintList,
  editComplain,
  deleteComplain
} from "@/api/complain.js";
import { showQuestionCondition, queryResponsibleProduct } from "@/api/xmkb.js";
import { queryProjectParticipant, queryZjCpData } from "@/api/personal.js";
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    return {
      note: {
        backgroundImage:
          "url(" + require("../../../static/img/replyIcon.png") + ")"
      },
      total: null,
      pageSize: 8,
      currentPage: 1,
      keyword: "",
      complainVisible: false,
      dialogComplainVisible: false,
      complainList: [],
      complain: [],
      comments: [],
      form: {
        cp: "",
        cpbh: "",
        tslb: "",
        title: "",
        object: [],
        content: ""
      },
      wid: "",
      complainType: null,
      windowUnitType: "",
      cxzt: "",
      sfcb: "",
      tslb: "",
      gczd: "",
      complaintType: [],
      allfbData: [],
      tsdxList: [],
      gczdList: [],
      cpList: [],
      xmcpList: [],
      showCondition: "",
      queryLJshow: true
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    xmmc: {
      type: String,
      default: ""
    },
    xmkbInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.windowUnitType = sessionStorage.getItem("isJZuser");
    showQuestionCondition().then(({ data }) => {
      //提问展示
      this.showCondition = data.data;
    });
    if (
      !getSession("ComplaintType") ||
      !getSession("kycp") ||
      !getSession("gczd")
    ) {
      getMenu("kycp", this.cpList, true); //获取产品
      getMenu("gczd", this.gczdList, true); //获取工程战队
      getMenu("ComplaintType", this.complaintType); //未响应状态
    } else {
      this.complaintType = getSession("ComplaintType");
      this.cpList = getSession("kycp");
      this.gczdList = getSession("gczd");
    }
    this.queryResponsibleProduct(this.xmbh); // 获取项目对应产品
    this.complaintList(1);
  },
  computed: {},
  methods: {
    searchComplant() {
      this.complaintList(1);
      this.currentPage = 1;
    },
    handlequeryComplant() {
      this.complaintList(1);
      this.currentPage = 1;
    },
    handleQueryShow() {
      // 查询条件显示
      this.queryLJshow = !this.queryLJshow;
    },
    handleCXZT(e) {
      //查询状态
      let cxzt = e.target.getAttribute("data-type");
      this.cxzt = cxzt;
      this.complaintList(1);
      this.currentPage = 1;
    },
    handleSFCB(e) {
      //是否催办
      let sfcb = e.target.getAttribute("data-type");
      this.sfcb = sfcb;
      this.complaintList(1);
      this.currentPage = 1;
    },
    handleTSLB(e) {
      //投诉类别
      let tslb = e.target.getAttribute("data-type");
      this.tslb = tslb;
      this.complaintList(1);
      this.currentPage = 1;
    },
    handleGCZD(e) {
      let gczd = e.target.getAttribute("data-type");
      this.gczd = gczd;
      this.complaintList(1);
      this.currentPage = 1;
    },
    //  产品
    handleChoose(val) {
      this.$get(this.API.questionLimitProduct, {
        xmbh: this.xmbh,
        cpbh: val.split("&")[1]
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.$alert(
              "该项目未采购 " +
                val.split("&")[0] +
                " 专项基础环境运维服务,请联系销售采购对应的服务",
              "提示",
              {
                confirmButtonText: "确定",
                type: "warning"
              }
            );
            this.$refs.selects.blur();
          }
        }
      });
    },

    // 分页
    handleCurrentChange(data) {
      this.currentPage = data;
      this.complaintList(data);
    },
    //  编辑
    complainEdit(param) {
      this.complainType = "edit";
      this.form.object = [];
      this.complainVisible = true;
      this.$nextTick(() => {
        $("#summernote").summernote({
          dialogsInBody: true,
          placeholder: "请输入投诉内容",
          height: 200,
          width: 100 + "%",
          minHeight: 200,
          maxHeight: 200,
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
        $("#summernote").summernote("code", this.complainList[param].tsnr);
      });

      this.queryProjectParticipant();

      this.wid = this.complainList[param].wid;
      this.form.title = this.complainList[param].tsbt;
      this.form.cp = this.complainList[param].cpmc;
      this.form.cpbh = this.complainList[param].cpdm;
      this.form.content = this.complainList[param].content;
      this.form.tslb = this.complainList[param].tslb;
      if (this.complainList[param].ryTsData != null) {
        this.complainList[param].ryTsData.forEach((ele, i, arr) => {
          this.form.object.push(ele.yhxm + "," + ele.yhbh);
        });
      }
    },

    // 删除评论
    complainDelect(e) {
      let wid = e.currentTarget.getAttribute("data-wid");
      this.$confirm("是否删除该投诉?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteComplain({
            wid: wid
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("删除成功！", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.complaintList(1);
                }
              });
            }
          });
        })
        .catch(() => {});
    },

    // 获取投诉
    getComplaint(e) {
      let wid = e.currentTarget.getAttribute("data-wid");
      this.wid = wid;
      let routeData = this.$router.resolve({
        name: "complaintDetail",
        query: { wid: wid }
      });
      window.open(routeData.href, "_blank");
    },

    handleComplain() {
			 this.$confirm('您可以先进入“问题”页面提问，如处理不满意，可继续投诉处理', '提示', {
			   cancelButtonText: '继续投诉',
			  	confirmButtonText: '去提问',
			   type: 'warning'
			 }).then(() => {
					this.$emit('handleComplanit','')
			 }).catch(() => {
					//我要投诉
					this.complainType = "complain";
					this.form.title = "";
					this.form.object = [];
					$("#summernote").summernote("code", "");
					this.complainVisible = true;
					this.$nextTick(() => {
						$("#summernote").summernote({
							dialogsInBody: true,
							placeholder: "请输入投诉内容",
							height: 200,
							width: 100 + "%",
							minHeight: 200,
							maxHeight: 200,
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
					});
					this.queryProjectParticipant();
			})
    },
    // 获取甲方
    queryProjectParticipant() {
      queryProjectParticipant({
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tsdxList = data.data;
          this.tsdxList.forEach((ele, i, arr) => {
            if (!ele.userId || !ele.userName) {
              this.tsdxList.splice(i, 1);
            }
          });
        }
      });
    },
    // 提交 投诉
    submitForm(form) {
      this.form.content = $("#summernote").summernote("code");
      if (!this.form.tslb) {
        this.$alert("请选择投诉类别", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return;
      } else if (!this.xmbh) {
        this.$alert("请选择项目", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return;
      } else if (!this.form.title) {
        this.$alert("请填写投诉标题", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return;
      } else if (!this.form.content || this.form.content == "<p><br></p>") {
        this.$alert("请填写投诉内容", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return;
      }

      if (this.complainType == "complain") {
        // 用户投诉
        complain({
          tslb: this.form.tslb,
          xmmc: this.xmmc,
          xmbh: this.xmbh,
          cpdm: this.form.cp.split("&")[1],
          cpmc: this.form.cp.split("&")[0],
          tsbt: this.form.title,
          tsnr: this.form.content,
          tsdxData: this.form.object.join("|")
        }).then(({ data }) => {
          if (data.state == "success") {
            this.$alert("投诉成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.complainVisible = !this.complainVisible;
                this.complaintList(1);
              }
            });
          } else {
            this.$alert("提交失败!", "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      } else if (this.complainType == "edit") {
        complain({
          wid: this.wid,
          tslb: this.form.tslb,
          xmmc: this.xmmc,
          xmbh: this.xmbh,
          cpdm: this.form.cp.split("&")[1] || this.form.cpbh,
          cpmc: this.form.cp.split("&")[0],
          tsbt: this.form.title,
          tsnr: this.form.content,
          tsdxData: this.form.object.join("|"),
          isedite: true
        }).then(({ data }) => {
          if (data.state == "success") {
            this.$alert("修改成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.complainVisible = false;
                this.complaintList(this.currentPage);
              }
            });
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
    // 获取评论列表
    complaintList(curPage) {
      complaintList({
        curPage: curPage,
        pageSize: 8,
        xmbh: this.xmbh,
        keyword: this.keyword,
        type: this.tslb,
        state: this.cxzt,
        qyzd: this.gczd,
        cb: this.sfcb
      }).then(({ data }) => {
        if (data.state == "success") {
          this.complainList = data.data.rows;
          this.total = data.data.records;
        }
      });
    },
    // 获取项目对应的产品
    queryResponsibleProduct(xmbh) {
      this.xmcpList = [];
      queryResponsibleProduct({
        xmbh: xmbh
      }).then(res => {
        if (res.data.state == "success") {
          if (JSON.stringify(res.data.data) == "{}") {
            this.xmcpList = this.cpList;
          } else {
            let Arr = Object.keys(res.data.data);
            let McArr = Object.values(res.data.data);
            for (var i = 0; i < Arr.length; i++) {
              this.xmcpList.push({
                label: Arr[i],
                mc: McArr[i]
              });
            }
          }
        }
      });
    }
  },
  watch: {},
  activated() {
    this.complaintList(1);
  },
  components: {
    pagination,
    itemChoose
  }
};
</script>
<style scoped>
.complain-list {
  padding: 10px;
  width: 90%;
  margin: 0 auto;
  position: relative;
}
.complain-list ul {
  margin: 0 0 10px 0;
}
.complain-list ul li {
  border-bottom: 1px dotted #999;
  padding: 5px 10px 5px;
}
.complain-list ul li:hover {
  cursor: pointer;
  background: #f5f7fa;
}
.complain-list ul li:after {
  content: "";
  display: block;
  clear: both;
}
.complain-list ul li .complain-content {
  margin: 0 15px;
  color: #999;
  float: left;
  font-size: 14px;
  width: 80%;
}
.complain-query {
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
}
/* .complain-query .query-list span{
    display: inline-block;
    padding: 0px 5px;
    color: #637D8A;
    border-radius: 3px;
    margin:0px 10px 5px 0;
    font-size: 14px;
}
.complain-query .query-list span:not(:first-child):hover{
  cursor: pointer;
}
.complain-query .query-list .query-title{
    width: 80px;
    white-space: nowrap;
    text-align:right;
    padding: 0 10px;
    color: #000;
    font-weight: 700;
} */
.complain-content-info {
  width: 100%;
  white-space: nowrap;
  display: flex;
}
.complain-content-info-front {
  font-size: 12px;
  color: #a8a8a8 !important;
}
.complain-content-tscp {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.complain-content .complain-content-info > span:nth-of-type(1) {
  width: 46%;
}
.complain-content .complain-content-info > span {
  display: inline-block;
  white-space: nowrap;
  width: 20%;
  margin-right: 30px;
}
.complain-list ul li .complain-content p:nth-child(1) {
  font-size: 16px;
}
.complain-list ul li .complain-content p:nth-child(1) span {
  font-size: 16px;
  color: #409eff;
}
.complain-list ul li .complain-content p:nth-child(1):hover {
  text-decoration: underline;
}
.complain-list ul li .complain-content span {
  color: #000;
}
.complain-list .complain-oprate {
  float: right;
  font-size: 16px;
  color: #888;
  margin-top: 10px;
  text-align: center;
}
.complain-oprate > span:nth-of-type(1) {
  padding: 3px 8px;
  border-radius: 2px;
  font-size: 14px;
  display: inline-block;
}

.complain-list ul li .complain-logo {
  width: 30px;
  height: 30px;
  margin: 40px 20px 0;
  float: left;
  border-radius: 50%;
}
.complain-list ul li .complain-logo span {
  color: #67c23a;
  font-size: 32px;
}
.complain-detail {
  overflow-x: hidden;
  padding-bottom: 10px;
}
/* .complain-detail section{
  height: 500px;
  overflow-y:auto;
} */
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
  /* margin: 0 15px; */
  margin: 0 10px;
}
.complain-info {
  width: 100%;
  min-height: 30px;
  background: #fff;
  padding: 0 10px;
  margin: 5px 0;
  border-bottom: 1px solid #f1f1f1;
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
