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
      <div class="task-detail-scenario-infos-wrap" v-if="lcbType != 3">
        <p><span style="display:inline-block;width:120px" class="el-icon-date"> 签字日期</span><span>
            <el-date-picker v-if="lcbType != 3" size="small" :picker-options="curMonth==4||curMonth==6?pickerOptionsCurMonth:pickerOptionsQzrq" v-model="signDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          </span>
        </p>
        <div v-if="lcbType != 3 && lcbType != 2">
          <p><span style="display:inline-block;width:120px" class="el-icon-date"> 服务开始时间</span><span>
              <el-date-picker size="small" v-model="startDate" :picker-options="pickerOptionsFwrq" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
          <div v-if="sfbwValue">
            <div>
                <span style="display:inline-block;width:120px">备忘承诺完成时间: </span>
                <el-date-picker size="mini" v-model="cnwcrq" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
                <span style="display:inline-block;width:100px">备忘性质: </span>
                <el-radio-group v-model="bwxz">
                  <el-radio label="1">非集成接口</el-radio>
                  <el-radio label="0">集成接口</el-radio>
                </el-radio-group>
            </div>
            
            <div class="cpList-option" v-for="(item,index) in cpDataList" flex>
              <div flex>
                <p>
                   <span class="before-require filter-weight">选择产品</span>
                    <el-select size="mini" v-model="item.cp"  placeholder="请选择" >
                    <el-option
                      v-for="(cp,index) in cpList"
                      :key="index"
                      :label="cp.cpmc"
                      :value="cp.cpdm+'&'+cp.cpmc">
                    </el-option>
                  </el-select>
                 </p>
                  <p>
                   <span class="before-require filter-weight">实施工作量(人/月)</span>
                   <el-input  size="mini"  placeholder="请输入实施工作量" v-model="item.ssgzl"></el-input>
                 </p>
                  <p>
                   <span class="before-require filter-weight">二开工作量(人/月)</span>
                   <el-input size="mini" placeholder="请输入二开工作量" v-model="item.ekgzl"></el-input>
                 </p>
                  <p>
                   <span class="before-require filter-weight">可变费用(元)</span>
                   <el-input size="mini" placeholder="请输入可变费用" v-model="item.kbgzl"></el-input>
                 </p>
              </div>
               <div class="cpList-delete" >
                  <span v-if="index > 0" @click="handleDelete(index)" title="删除"  class="el-icon-error"></span>
              </div>
            </div>
            <div>
              <a href="jvaScript:;;" @click="handleAddcp"><span class="el-icon-circle-plus"></span>新增选择产品</a>
            </div>
          </div>
        </div>
      </div>
      <div style="padding:20px">
        <p style="display:flex"><span style="display:inline-block;width:40px">说明:</span>
          <el-input type="textarea" :rows="5" resize="none" placeholder="请输入说明内容" v-model="textarea">
          </el-input>
        </p>
      </div>

      <div class="activity-creator">
        <el-button type="primary" size="mini" @click="handleCommitMilestone">提交</el-button>
        <el-button size="mini" @click="handleClose">取消</el-button>
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
import { GetDateStr } from "@/utils/util.js";


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
      lcbbhArr: [],
      textarea: "",
      lcbtaskDetail: {},

      sfbwValue: false,
      cnwcrq: "",
      bwxz:'1',//项目性质

      isValid: false,
      cpList: [],
      cps: "",
      cpDataList: [
        {
          cp: "",
          cpbh: "",
          cpmc: "",
          ssgzl: 0,
          ekgzl: 0,
          kbgzl: 0
        }
      ],
      curMonth:"",
      // 签字日期 6月和12月
      pickerOptionsCurMonth: {
          disabledDate(time) {
            let year = new Date().getFullYear();
            let month = (new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1;
            let lastDay = new Date(year,month,0).getTime();
            let firstDay = new Date('2019-08-01').getTime();
            return time.getTime() < firstDay - 8.64e7 || time.getTime() > lastDay;;
          }
        },  
      // 签字日期 两个月之前
      pickerOptionsQzrq:{
        disabledDate(time) {
            let curDate = (new Date()).getTime();
            let two = -60 * 24 * 3600 * 1000;
            let twoMonths = curDate + two;
            return time.getTime() > twoMonths;
          }
      },
      // 服务日期 大于等于当日并小于当日+1个月
      pickerOptionsFwrq:{
        disabledDate(time) {
            let curDate = (new Date()).getTime();
            let one = 31 * 24 * 3600 * 1000;
            let oneMonths = curDate + one;
            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > oneMonths;
          }
      },
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
    },
    lcbType: {
      type: String,
      default: ""
    }
  },

  mounted() {

    this.curMonth = new Date().getMonth()+1;

    // 获取里程碑类型
    this.valueXSQRR = "";
    this.startDate = "";
    this.signDate = "";
    this.textarea = "";
    if (this.lcbType == 1) {
      this.listHtnrApp(this.xmbh ? this.xmbh : "");
      this.queryProjectParticipant();
    }
  },
  methods: {
    // 6月和12月，签字日期必须是当月，服务开始时期必须大于等于当日并小于当日+1个月
    // 其他月份，签字日期必须<当月-2个月，服务开始时期必须大于等于当日并小于当日+1个月
    handleQzrqDate(){
      let self = this;
        return {
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let two = -60 * 24 * 3600 * 1000;
            let twoMonths = curDate + two;
            return time.getTime() > twoMonths;
          }
        };
    },
    // 
    handleFocusDate() {
        let self = this;
        return {
          disabledDate(time) {
            let curDate = (new Date()).getTime();
            let one = 31 * 24 * 3600 * 1000;
            let oneMonths = curDate + one;
            return time.getTime() < Date.now()  || time.getTime() > oneMonths;
          }
        };
    },


    handleClose() {
      this.$emit("handleClose", "");
    },
    // 添加列
    handleAddcp() {
      this.cpDataList.push({
        cp: "",
        cpbh: "",
        cpmc: "",
        ssgzl: 0,
        ekgzl: 0,
        kbgzl: 0
      });
    },
    // 删除
    handleDelete(index) {
      this.cpDataList.splice(index, 1);
    },

    chooseLCBscml(val) {
      this.getChildren(val.split("&")[1]);
    },

    handleCommitMilestone() {
      this.valiaDate();
      if (!this.isValid && this.sfbwValue) return;
      if (this.lcbType != 3 && this.lcbType != 2 && !this.valueXSQRR) {
        this.$alert("请选择销售确认人", "提示", {
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
      this.submitMilestone();
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
    //提交里程碑
    submitMilestone() {
      submitMilestone({
        xmbh: this.xmbh,
        lcbbh: this.taskLcbbhArr.join(","),
        fjData: "",
        sm: this.textarea,
        qzsj: this.signDate,
        fwsj: this.startDate,
        yhbh: !this.valueXSQRR ? "" : this.valueXSQRR.split("&")[0],
        yhxm: !this.valueXSQRR ? "" : this.valueXSQRR.split("&")[1],
        fj: "",
        bwcnwcsj: this.sfbwValue?this.cnwcrq:'',
        bwxz:this.sfbwValue ?this.bwxz:"",
        cps: this.sfbwValue ? this.cps : ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("提报成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$emit("handleCommitMilestone", "");
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
    valiaDate() {
      this.cps = "";
      this.cpDataList.forEach(ele => {
        ele.cpmc = ele.cp.split("&")[1];
        ele.cpbh = ele.cp.split("&")[0];
        if (this.sfbwValue && !ele.cp) {
          //解决bug 未选择备忘时，不需要校验备忘产品 -huang  2018-12-21 13:40:46
          this.$alert("请选择产品", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          this.isValid = false;
          return;
        }
        if (!/^[0-9]+\d*$/.test(ele.ssgzl)) {
          this.$alert("请输入正确实施工作量", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          this.isValid = false;
          return;
        }
        if (!/^[0-9]+\d*$/.test(ele.ekgzl)) {
          this.$alert("请输入正确二开工作量", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          this.isValid = false;
          return;
        }
        if (ele.kbgzl == "") {
          ele.kbgzl = 0;
        } else if (!/^\d+(\.\d+)?$/.test(ele.kbgzl)) {
          this.$alert("请输入正确可变工作量", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          this.isValid = false;
          return;
        }
        this.isValid = true;
        this.cps +=
          ele.cpbh +
          String.fromCharCode(1) +
          ele.cpmc +
          String.fromCharCode(1) +
          ele.ssgzl +
          String.fromCharCode(1) +
          ele.ekgzl +
          String.fromCharCode(1) +
          ele.kbgzl +
          String.fromCharCode(2);
      });
    },

    // 获取合同产品
    listHtnrApp(xmbh) {
      this.$get(this.API.listHtnrApp, {
        xmbh: xmbh
      }).then(res => {
        if (res.state == "success") {
          this.cpList = res.data;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    },
    //  获取项目相关人员
    queryProjectParticipant() {
      queryProjectParticipant({
        xmbh: this.xmbh ? this.xmbh : ""
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
  },
  watch: {
    shown(n, o) {
      if (n) {
        this.baseUrl = window.baseurl;
        if (this.lcbType == 1) {
          this.queryProjectParticipant();
          this.listHtnrApp(this.xmbh ? this.xmbh : "");
        }
      } else {
        this.valueXSQRR = "";
        this.startDate = "";
        this.signDate = "";
        this.textarea = "";
        this.cpDataList = [
          {
            cp: "",
            cpbh: "",
            cpmc: "",
            ssgzl: 0,
            ekgzl: 0,
            kbgzl: 0
          }
        ];
      }
    },
  }
};
</script>
<style   scoped>
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
.cpList-option {
  border-bottom: 1px dashed #999;
}
.cpList-delete {
  width: 30px !important;
  line-height: 72px;
}
.cpList-delete span {
  color: #f00;
}
.cpList-delete span:hover {
  cursor: pointer;
}
</style>
