<template>
    <div class="dialog-container">
        <el-dialog
            :title="questionTitle"
            width="800px"
            top="30px"
            :visible.sync="visible"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="Question">
            <el-form  style="width:750px;margin:0 auto"  class="demo-ruleForm"  :model="question" :inline="true" label-width="125px">
                <el-form-item label="项目名称" required v-if="chooseableItem">
                    <el-input size="mini" type="text" style="width:520px;" v-model="xmmc" readonly placeholder="请选择项目">
                        <el-button slot="append" icon="el-icon-circle-plus-outline" style="width:30px;padding:0 12px;" @click="addQuestiontItem"></el-button>
                    </el-input>
                </el-form-item>
                 <el-form-item label="项目名称" required v-if="!chooseableItem">
                     <el-input size="mini" type="text" style="width:520px" v-model="xmmc" readonly></el-input>
                </el-form-item>
                <el-form-item label="问题类别"  required v-if="(showCondition==1||showCondition==2)">
                    <el-select v-model="question.wtlb" size="mini" placeholder="请选择问题类别" style="width:192px">
                    <el-option
                        v-for="(item,index) in wtlb"
                        :key="index"
                        :label="item.mc"
                        :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否紧急" required >
                    <el-select v-model="question.sfjj" size="mini" placeholder="请选择是否紧急" style="width:192px">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="问题级别" required v-if="(showCondition==1||showCondition==2)"> 
                    <el-select v-model="question.wtjb" size="mini" placeholder="请选择问题级别" style="width:192px">
                        <el-option label="不严重" value="不严重"></el-option>
                        <el-option label="一般" value="一般"></el-option>
                        <el-option label="严重" value="严重"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品" required>
                    <el-select v-model="question.cp" size="mini" placeholder="请选择产品" style="width:192px" @change="handleChangeCp">
                        <el-option 
                        v-for="(cp,index) in xmcpList"
                        :key="index"
                        :label="cp.mc"
                        :value="cp.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="影响范围" required v-if="(showCondition==1||showCondition==2)">
                    <el-select v-model="question.yxfw" size="mini" placeholder="请选择影响范围" style="width:192px">
                        <el-option label="影响局部" value="影响局部"></el-option>
                        <el-option label="影响整体" value="影响整体"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否bug" required v-if="(showCondition==1||showCondition==2)">
                    <el-select v-model="question.sfbug" size="mini" placeholder="请选择是否bug" style="width:192px">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本号" required v-if="(showCondition==1||showCondition==2)">
                <el-input size="mini" v-model="question.bbh" type="text" placeholder="请填写版本号" style="width:193px;"></el-input>
                </el-form-item>

                <el-form-item label="期望解决日期" required v-if="!accreditShow">
                    <el-date-picker  :picker-options="pickerBeginDateQw"   :clearable="false" size="mini" v-model="question.qwjjrq" type="date"  placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" style="width:193px;"></el-date-picker>
                </el-form-item>
                <el-form-item label="期望解决日期" required v-if="accreditShow">
                    <el-input size="mini"  style="width:193px;" readonly v-model="question.qwjjrqO"></el-input>
                </el-form-item>

            <el-form-item  label="环境信息" v-if="isJZuser != 1"> 
                    <el-upload
                        style="width:510px;"
                        class="upload-demo"
                        ref="upload"
                        :limit='1'
                        :action="uploadAction"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove"
                        :on-change="handleChange"
                        :file-list="fileList"
                        :show-file-list="true"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="承诺解决日期" required v-if="accreditShow">
                    <el-date-picker :picker-options="pickerBeginDateBefore" :clearable="false" size="mini" v-model="question.cnjsrq" type="date"  placeholder="选择日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" style="width:193px;"></el-date-picker>
                </el-form-item>

                <el-form-item label="标题" required v-if="!accreditShow">
                <el-input size="mini" v-model="question.title" type="text" placeholder="标题" style="width:520px;"></el-input>
                </el-form-item>
                </el-form>
                <div class="question-textarea" v-if="!accreditShow">
                    <p>详情</p>
                    <div id="summernote"> </div>         
                </div>   
                
                <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
                    <el-button size="small" type="primary" @click="handleCommit"  v-if="!accreditShow">确认提交</el-button>
                    <el-button size="small" type="primary" @click="handleAccredit"  v-if="accreditShow">确认受理</el-button>
                    <el-button size="small" type="info" @click="handleCancel">取消</el-button>  
                </div>
            </div>
        </el-dialog>

        <el-dialog
            title="选择项目"
            :visible.sync="dialogQuestionVisible"
            :close-on-click-modal="false"
            width="800px"
            top="30px"
            append-to-body>
            <div style="padding:10px;">
                <itemChoose @handleEdit="handleEdit"></itemChoose>
            </div>
        </el-dialog> 
    </div>
</template>

<script>
import axios from "axios";
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
import {
  saveQuestion,
  customerQuestion,
  showQuestionCondition,
  queryResponsibleProduct,
  queryProductSolutionTime
} from "@/api/xmkb.js";
import {
  formatTime,
  getMenu,
  getSession,
  getMyDate,
  GetDateStr
} from "@/utils/util.js";
export default {
  data() {
    return {
      dialogQuestionVisible: false,
      visible: this.show,
      xmmc: "",
      xmbh: "",
      showCondition: "",
      question: {
        wtlb: "",
        sfjj: "",
        wtjb: "",
        cp: "",
        yxfw: "",
        sfbug: "",
        bbh: "",
        title: "",
        nr: "",
        wid: "",
        qwjjrq: "",
        qwjjrqO: "",
        cnjsrq: ""
      },
      cplist: [],
      wtlb: [],
      uploadAction: "https://jsonplaceholder.typicode.com/posts/",
      fileList: [],
      fileData: [],
      filesData: [],
      pickerBeginDateBefore: this.handleFocusDate(),
      pickerBeginDateQw: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let three = 30 * 24 * 3600 * 1000;
          let threeMonths = curDate + three;
          return (
            time.getTime() < Date.now() - 8.64e7 || time.getTime() > threeMonths
          );
        }
      },
      isJZuser: null,
      xmcpList: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    questionTitle: {
      type: String,
      default: ""
    },
    accreditShow: {
      type: Boolean,
      default: false
    },
    wid: {
      type: String,
      default: ""
    },
    slContent: {
      type: String,
      default: ""
    },
    questionInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    chooseableItem: {
      type: Boolean,
      default: true
    },
    itemInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    guid: {
      type: String,
      default: ""
    }
  },
  components: { itemChoose },
  methods: {
    handleFocusDate() {
      let self = this;
      return {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let delayHs = JSON.parse(self.questionInfo.cphs) * 24 * 3600 * 1000;
          let delayDate = curDate + delayHs;
          return (
            time.getTime() < Date.now() - 8.64e7 || time.getTime() > delayDate
          );
        }
      };
    },
    handleEdit(data) {
      // //选择项目（）
      // if(data.gcfwzt == '0'){
      //   this.$alert(data.gcfwztsm,'提示',{type:'warning',confirmButtonText: '确定'});
      //   return;
      // }
      if (this.questionTitle == "我要提问") {
        this.queryResponsibleProduct(data.xmbh);
      }
      (this.xmbh = data.xmbh), (this.xmmc = data.xmmc);
      this.dialogQuestionVisible = false;
    },
    addQuestiontItem() {
      //选择项目
      this.dialogQuestionVisible = true;
    },
    handleCancel() {
      //关闭dialog
      this.visible = false;
    },

    // 根据产品切换承诺结束日期范围（9.26）
    handleChangeCp(val) {
      if (!!this.accreditShow) {
        queryProductSolutionTime({ cpbh: val }).then(({ data }) => {
          if (data.state == "success") {
            // this.question.cnjsrq = GetDateStr(data.data);
            this.questionInfo.cphs = data.data;
            this.question.cnjsrq = ''
          }
        });
      }
    },
    handleAccredit() {
      //确认受理
      if (
        !this.xmbh ||
        !this.question.wtlb ||
        !this.question.sfjj ||
        !this.question.wtjb ||
        !this.question.cp ||
        !this.question.yxfw ||
        !this.question.sfbug ||
        !this.question.bbh ||
        !this.question.cnjsrq
      ) {
        this.$alert("受理选项全部为必填项，请填写完整", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      this.$confirm(
        "期望解决日期:" +
          this.questionInfo.qwjjrq +
          "你的承诺解决日期:" +
          this.question.cnjsrq +
          ",确认受理吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          customerQuestion({
            wtlb: this.question.wtlb,
            jjyf: this.question.sfjj,
            wtjb: this.question.wtjb,
            cpbh: this.question.cp,
            yxfw: this.question.yxfw,
            sfbg: this.question.sfbug,
            bbh: this.question.bbh,
            qwjjrq: this.questionInfo.qwjjrq,
            cnjsrq: this.question.cnjsrq,
            xmmc: this.xmmc,
            xmbh: this.xmbh,
            wid: this.wid,
            Guid: this.guid,
            hjfjwid:
              this.fileData.length == 0 ? "" : this.fileData[0].split("|")[0],
            nr: this.slContent //受理内容
          }).then(({ data }) => {
            if (data.state == "success") {
              this.visible = false;
              this.$alert("受理成功！", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.$emit("handleSLsuccess", "");
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
        })
        .catch(() => {});
    },

    handleCommit() {
      //提交问题
      this.question.nr = $("#summernote").summernote("code");
      if (this.showCondition == 1 || this.showCondition == 2) {
        if (this.xmmc == "") {
          this.$alert("请先选择关联项目", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        } else if (
          this.question.wtlb == "" ||
          this.question.sfjj == "" ||
          this.question.wtjb == "" ||
          this.question.cp == "" ||
          this.question.yxfw == "" ||
          this.question.sfbug == "" ||
          this.question.bbh == "" ||
          this.question.qwjjrq == "" ||
          this.question.title == "" ||
          this.question.nr == "" ||
          this.question.nr == "<p><br></p>"
        ) {
          this.$alert("问题选项全部为必填项，请填写完整", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
        saveQuestion({
          wtlb: this.question.wtlb,
          jjyf: this.question.sfjj,
          wtjb: this.question.wtjb,
          cpbh: this.question.cp,
          yxfw: this.question.yxfw,
          sfbg: this.question.sfbug,
          bbh: this.question.bbh,
          bt: this.question.title,
          qwjjrq: this.question.qwjjrq,
          xmmc: this.xmmc,
          xmbh: this.xmbh,
          nr: this.question.nr,
          hjfjwid:
            this.fileData.length == 0 ? "" : this.fileData[0].split("|")[0],
          wid: this.question.wid
        }).then(({ data }) => {
          if (data.state == "success") {
            this.visible = false;
            (this.fileList = []),
              (this.fileData = []),
              (this.filesData = []),
              this.$alert("问题提交成功！", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.$emit("handleTWsuccess", "");
                }
              });
          } else {
            this.$alert(data.msg + ",提交失败!", "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      } else if (this.showCondition == 0) {
        // 老师提问
        if (
          this.question.title == "" ||
          this.question.nr == "" ||
          this.question.cp == "" ||
          this.question.qwjjrq == "" ||
          this.question.sfjj == "" ||
          this.question.xmbh == ""
        ) {
          this.$alert("请将信息填写完整!", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
        customerQuestion({
          bt: this.question.title,
          nr: this.question.nr,
          wid: this.question.wid,
          cpbh: this.question.cp,
          qwjjrq: this.question.qwjjrq,
          hjfjwid:
            this.fileData.length == 0 ? "" : this.fileData[0].split("|")[0],
          jjyf: this.question.sfjj,
          xmmc: this.xmmc, //老师提问新增项目编号
          xmbh: this.xmbh
        }).then(({ data }) => {
          if (data.state == "success") {
            this.visible = false;
            this.$alert("问题提交成功！", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$emit("handleTWsuccess", "");
              }
            });
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      }
    },
    // 删除文件
    handleRemove(file, fileList) {
      this.fileData = [];
      this.fileList = [];
      this.filesData = [];
    },

    beforeUpload(file) {
      let fd = new FormData();
      fd.append("fileUpload", file);
      fd.append("xmbh", this.xmbh);

      axios
        .post(window.baseurl + "attachment/uploadAttach.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.state == "success") {
            this.fileData.push(res.data.data); //文件 list Arr
          } else {
            this.$alert(res.data.msg, "提示", {
              confirmButtonText: "确定"
            });
          }
        });
      return true;
    },

    handleChange(file, fileList) {
      let r = [];
      this.filesData.push(file);
      for (var i = 0, l = this.filesData.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
          if (this.filesData[i].name === this.filesData[j].name) j = ++i;
        r.push(this.filesData[i]);
      }
      this.fileList = r;
      this.$refs.upload.submit();
    },
    queryResponsibleProduct(xmbh) {
      // 获取项目对应的产品
      this.xmcpList = [];
      queryResponsibleProduct({
        xmbh: xmbh
      }).then(res => {
        if (res.data.state == "success") {
          if (JSON.stringify(res.data.data) == "{}") {
            this.xmcpList = this.cplist;
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
  watch: {
    show() {
      this.visible = this.show;
      if (this.show) {
        this.$nextTick(() => {
          $("#summernote").summernote({
            dialogsInBody: true,
            placeholder: "请输入内容",
            focus: true,
            height: 200,
            width: 100 + "%",
            minHeight: 200,
            maxHeight: 200,
            lang: "zh-CN",
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
        showQuestionCondition().then(({ data }) => {
          //提问展示
          this.showCondition = data.data;
        });
        if (getSession("ProblemType") == null) {
          getMenu("ProblemType", this.wtlb, "");
          getMenu("cp", this.cplist, true);
        } else {
          this.wtlb = getSession("ProblemType");
          this.cplist = getSession("cp");
        }
        this.fileList = [];
        this.fileData = [];
        this.filesData = [];
        if (this.questionTitle == "我要提问") {
          this.xmcpList = [];
          this.question.wtlb = "";
          this.question.sfjj = "";
          this.question.wtjb = "";
          this.question.cp = "";
          this.question.yxfw = "";
          this.question.sfbug = "";
          this.question.bbh = "";
          this.question.title = "";
          this.question.wid = "";
          this.question.nr = "";
          $("#summernote").summernote("code", "");
          if (this.chooseableItem) {
            this.xmmc = "";
            this.xmbh = "";
          } else {
            this.xmmc = this.itemInfo.xmmc;
            this.xmbh = this.itemInfo.xmbh;
            this.queryResponsibleProduct(this.xmbh);
          }
        } else {
          this.xmcpList = this.cplist;
          this.question.title = this.questionInfo.bt;
          this.question.cp = this.questionInfo.cpbh;
          this.question.wtlb = this.questionInfo.wtlb;
          this.question.sfjj = this.questionInfo.jjyf;
          this.question.wtjb = this.questionInfo.wtjb;
          this.question.yxfw = this.questionInfo.yxfw;
          this.question.sfbug = this.questionInfo.sfbg;
          this.question.bbh = this.questionInfo.bbh;
          this.question.qwjjrqO = this.questionInfo.qwjjrqO;
          this.question.cnjsrq =
            this.questionInfo.cnjsrq == ""
              ? this.questionInfo.qwjjrqO
              : this.questionInfo.cnjsrqO;
          this.question.qwjjrq = this.questionInfo.qwjjrq;
          this.question.wid = this.questionInfo.wid;
          this.xmmc = this.questionInfo.xmmc;
          this.xmbh = this.questionInfo.xmbh;
          this.$nextTick(() => {
            $("#summernote").summernote("code", this.questionInfo.nr);
          });
        }
      }
    }
  }
};
</script>
<style scoped>
.Question {
  padding: 10px 0;
}
div.el-form-item {
  margin-bottom: 8px !important;
}
.question-textarea {
  width: 750px;
  margin: 0 auto;
}
.question-textarea > p {
  width: 125px;
  text-align: right;
  padding-right: 12px;
  font-weight: 700;
}
.question-textarea > p::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
