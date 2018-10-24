<template>
  <div>
    <div style="overflow-y:auto">
      <div class="task-detail-dialog-header" v-if="JSON.stringify(taskDetail) != '{}'">
        <p class="task-detail-dialog-header-mc">{{taskDetail.lcbms}} </p>
        <div style="display:flex">
          <h3>{{taskDetail.rwmc}}</h3>
        </div>
        <p class="task-detail-dialog-header-time">
          <span>开始日期</span> <span class="el-icon-date"></span> {{taskDetail.jhksrq==null?taskDetail.cnkssj:taskDetail.jhksrq}} -
          <span>结束日期</span> <span class="el-icon-date"></span> {{taskDetail.jhjsrq==null?taskDetail.cnjssj:taskDetail.jhjsrq}}
        </p>
      </div>
      <div class="task-detail-scenario-infos-wrap" v-if="lcblx != 3">
        <p><span style="display:inline-block;width:120px" class="el-icon-date"> 签字日期</span><span>
            <el-date-picker v-if="lcblx != 3" size="small" v-model="signDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </span>
        </p>
        <div v-if="lcblx != 3 && lcblx != 2">
          <p><span style="display:inline-block;width:120px" class="el-icon-date"> 服务开始时间</span><span>
              <el-date-picker size="small" v-model="startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </span>
          </p>
          <p><span style="display:inline-block;width:120px" class="el-icon-edit-outline"> 销售确认人</span><span>
              <el-select v-model="valueXSQRR" size="small" placeholder="请选择" style="width:220px">
                <el-option v-for="(item,index) in options" v-if="item.roleName.indexOf('销售') != -1" :key="index" :label="item.userName" :value="item.userCode+'&'+item.userName">
                </el-option>
              </el-select>
              <p style="color:#bbb;font-size:12px">无销售人员或销售人员不正确，请联系项目经理在团队里修改销售责任人。</p>
            </span>
          </p>
          <p>
            <el-checkbox v-model="sfbwValue">是否备忘</el-checkbox>
          </p>
          <div flex v-if="sfbwValue">
            <span style="display:inline-block;width:120px;margin-right:20px">附件：</span>
            <div>
              <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" :on-change="handleChangeFile" :before-upload="newFiles" :on-remove="handleRemove" multiple>
                <el-button size="mini" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div> -->
              </el-upload>
            </div>
          </div>
          <p v-if="sfbwValue">
            <span style="display:inline-block;width:120px">备忘承诺完成时间: </span>
            <el-date-picker size="mini" v-model="cnwcrq" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
          </p>
        </div>
      </div>
      <div style="padding:20px">
        <p style="display:flex"><span style="display:inline-block;width:40px">说明:</span>
          <el-input type="textarea" :rows="5" resize="none" placeholder="请输入说明内容" v-model="textarea">
          </el-input>
        </p>
      </div>
      <div class="activity-creator">
        <el-button type="primary" size="small" @click="handleCommitMilestone">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
import { getLcbFolders, getChildren } from "@/api/TaskProcess.js";
import { getMilestoneSubmitType, submitMilestone } from "@/api/milestone.js";
import { queryProjectParticipant } from "@/api/personal.js";
export default {
  data() {
    return {
      signDate: "",
      startDate: "",
      valueSCML: "",
      ProcessValue: "",
      valueXSQRR: "",
      options: [],
      lcbMLArr: [],
      lcbWDMB: [],
      fileList: [],
      baseUrl: "",
      lcblx: "",
      lcbbhArr: [],
      textarea: "",
      lcbtaskDetail: {},

      sfbwValue: false,
      cnwcrq: "",
      upload_url: "123",
      uploadForm: new FormData(),
      form: {
        fileList: ""
      },
      files: []
    };
  },
  props: {
    taskDetail: {
      type: Object,
      default: function() {
        return {};
      }
    },
    xmbh: {
      type: String,
      default: ""
    },
    shown: {
      type: Boolean,
      default: false
    },
    taskLcbbhArr: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {
    // 获取里程碑类型
    getMilestoneSubmitType({
      xmbh: this.xmbh,
      lcbbh: this.taskLcbbhArr.join(",")
    }).then(({ data }) => {
      if (data.state == "success") {
        this.lcblx = data.data.lcbType;
        this.valueXSQRR = "";
        this.startDate = "";
        this.signDate = "";
        this.textarea = "";
        if (data.data.lcbType != 2 && data.data.lcbType != 3) {
          //  获取项目相关人员
          queryProjectParticipant({
            xmbh: this.xmbh ? this.xmbh : data.data.xmbh
          }).then(({ data }) => {
            if (data.state == "success") {
              this.options = data.data;
              this.options.forEach((ele, i, arr) => {
                if (ele.userName == "") {
                  this.options.splice(i, 1);
                }
              });
            }
          });
        }
      }
    });
  },
  methods: {
    handleRemove(file, fileList) {
      this.files = fileList;
      this.uploadForm.append("fileUpload", "");
    },
    handleChangeFile(file, fileList) {
      this.files = fileList;
    },
    newFiles(file) {
      this.files = [];
      this.files.push(file);
      this.uploadForm.append("fileUpload", file);
      return true;
    },
    chooseLCBscml(val) {
      this.getChildren(val.split("&")[1]);
    },

    handleCommitMilestone() {
      if (this.lcblx != 3 && this.lcblx != 2 && !this.valueXSQRR) {
        this.$alert("请选择销售确认人", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.sfbwValue && !this.files.length) {
        this.$alert("请务必上传备忘附件", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.sfbwValue && !this.cnwcrq) {
        this.$alert("请选择备忘承诺日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.sfbwValue) {
        this.$refs.uploadfile.submit();
      }else{
        this.submitMilestone();
      }
      if (!!this.files.length) {
        axios.post(
            window.baseurl + "attachment/uploadAttach.do",
            this.uploadForm,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
          .then(res => {
            if (res.data.state == "success") {
              this.form.fileList = res.data.data;
             this.submitMilestone();
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          })
          .catch(error => {});
      } 
    },
    // 获取子模板
    getChildren(wid) {
      getChildren({
        parentwid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.lcbWDMB = data.data;
        }
      });
    },
    submitMilestone(){
      //提交里程碑
      submitMilestone({
        xmbh: this.xmbh,
        lcbbh: this.taskLcbbhArr.join(","),
        fjData: "",
        sm: this.textarea,
        qzsj: this.signDate,
        fwsj: this.startDate,
        yhbh: !this.valueXSQRR ? "" : this.valueXSQRR.split("&")[0],
        yhxm: !this.valueXSQRR ? "" : this.valueXSQRR.split("&")[1],
        fj: this.form.fileList,
        bwcnwcsj: this.cnwcrq
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("提报成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$emit("handleCommitMilestone", "");
            }
          });
        }
      });
    }
  },
  watch: {
    shown(n, o) {
      if (n) {
        this.baseUrl = window.baseurl;
        // 获取里程碑类型
        getMilestoneSubmitType({
          xmbh: this.xmbh,
          lcbbh: this.taskLcbbhArr.join(",")
        }).then(({ data }) => {
          if (data.state == "success") {
            this.lcblx = data.data.lcbType;

            if (data.data.lcbType != 2 && data.data.lcbType != 3) {
              //  获取项目相关人员
              queryProjectParticipant({
                xmbh: this.xmbh ? this.xmbh : data.data.xmbh
              }).then(({ data }) => {
                if (data.state == "success") {
                  this.options = data.data;
                  this.options.forEach((ele, i, arr) => {
                    if (ele.userName == "") {
                      this.options.splice(i, 1);
                    }
                  });
                }
              });
            }
          }
        });
      }
    },
    sfbwValue(n,o){
      if(!n){
        this.files = [];
        this.cnwcrq = '';
      }
    }
  }
};
</script>
<style  scoped>
.task-detail-dialog-header {
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
}
.task-detail-dialog-header p {
  margin: 10px 0 !important;
}
.task-detail-dialog-header h3 {
  font-weight: normal;
}
.task-detail-scenario-infos-wrap {
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
}
.task-detail-scenario-infos-wrap p {
  margin: 10px 0 !important;
}
.task-detail-scenario-infos-wrap p > span:nth-of-type(1) {
  margin-right: 20px;
  color: #555;
}

.milestone-ml-choose {
  padding: 10px 20px;
}
.milestone-ml-choose p {
  margin: 5px 0 !important;
}

.activity-creator {
  padding: 10px 20px;
  text-align: right;
}
.lcb-wdmb {
  margin-right: 15px;
  font-size: 13px;
  color: #409eff;
}
.lcb-wdmb:hover {
  text-decoration: underline;
}
</style>
