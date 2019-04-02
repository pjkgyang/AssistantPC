<template>
  <div @click="selectHide">
    <div style="height:540px;">
      <div class="task-detail-dialog-header">
        <h4 class="task-detail-dialog-header-mc">{{lcbinfo.cpmc}} · {{taskLcbmc}}</h4>
      </div>
      <div style="padding:0 20px 0 0;border-bottom: 1px solid #ccc;" class="detail-content">
        <el-form ref="formLabelAlign" size="small" label-width="110px" :model="formLabelAlign">
          <el-form-item label="关联里程碑" required>
            <el-select v-model="formLabelAlign.lcbmc" style="width:100%" placeholder="请选择" @change="handleLcbtask">
              <el-option v-for="(item,index) in lcbrw" :key="item.lcbbh" :label="item.rwmc" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称" required>
            <el-input v-model="formLabelAlign.rwmc" placeholder="请输入任务名称"></el-input>
          </el-form-item>
          <!-- 2019/4/1 修改 -->
          <el-form-item label="期望完成日期" required>
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formLabelAlign.endDate" style="width:100%"></el-date-picker>
            <!-- <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formLabelAlign.startDate" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col style="text-align:center;font-weight:700" :span="4" required class="task-gs-date">结束日期</el-col>
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="formLabelAlign.endDate" style="width: 100%;"></el-date-picker>
            </el-col> -->
          </el-form-item>
          <el-form-item label="责任人" required>
            <el-col :span="10">
              <el-select v-model="formLabelAlign.ssry" @change="chooseSSry" style="width:100%" placeholder="请选择责任人">
                <el-option v-for="(item,index) in ssryArr" :key="index" :label="item.userName" :value="item.userName+'&'+item.userId">
                </el-option>
              </el-select>
            </el-col>
            <el-col style="text-align:center;font-weight:700" :span="4" class="task-gs-date" required>工时(小时)</el-col>
            <el-col :span="10">
              <el-input v-model="formLabelAlign.jhgsValue" placeholder="请输入工时"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="优先级" required>
            <el-select v-model="formLabelAlign.yxj" style="width:41.5%" placeholder="请选择优先级">
              <el-option label="高" value="1"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="低" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务内容" required>
            <el-input type="textarea" :rows=4 resize="none" v-model="formLabelAlign.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="detail-activities-wrap">
        <div class="involve-view">
          <p>参与者</p>
          <div>
            <div flex flexwrap>
              <el-tag :key="index" v-for="(tag,index) in dynamicTags" :closable="true" :disable-transitions="false" @close="handleClose(tag)">
                {{tag.userName}}
              </el-tag>
              <div style="position:relative">
                <el-popover placement="right" width="230" trigger="hover">
                  <ul class="task_participant">
                    <li>
                      <el-input v-model="name" placeholder="搜索姓名"></el-input>
                    </li>
                    <ul style="height:180px;overflow-y:auto">
                      <li v-for="(list,index) in listt0" class="cyz-list" :data-label="list.userName+'&'+list.userId+'&'+index" :key="index" @click="addTaskParty">
                        <span class="cyz-list" style="display:inline-block;width:50px;">{{list.userName}} </span>
                        <span class="cyz-list">{{list.userCode}}</span>
                        <span class="el-icon-check cyz-list" style="float:right;margin-top:5px" v-if="partyArr.indexOf(index) != -1"></span>
                      </li>
                    </ul>
                  </ul>
                  <el-button slot="reference" class="button-new-tag" type="primary">+</el-button>
                </el-popover>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="text-align:right;position:absolute;bottom:0;width:100%;padding:10px ;0">
        <el-button size="small" type="primary" @click="handleAddTask">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  queryUser,
  queryProjectParticipant,
  addTaskParticipant,
  deleteTaskParticipant,
  modifyTaskLeader
} from "@/api/personal.js";
export default {
  data() {
    return {
      listt0: [],
      list0: [],
      name: "",
      partyArr: [],
      dynamicTags: [],
      selectShow: false,
      formLabelAlign: {
        lcbmc: "",
        rwmc: "",
        ssry: "",
        type: "",
        startDate: "",
        jhgsValue: "",
        yxj: "3",
        Jfzrr: "",
        Yfzrr: "",
        endDate: "",
        desc: ""
      },
      lcbTask: [],
      ssryArr: [
        {
          value: "选项1",
          label: "人员1"
        },
        {
          value: "选项2",
          label: "人员2"
        },
        {
          value: "选项3",
          label: "人员3"
        },
        {
          value: "选项4",
          label: "人员4"
        },
        {
          value: "选项5",
          label: "人员5"
        }
      ],
      taskLcbmc: "",
      cyry: []
    };
  },
  props: {
    lcbrw: {
      type: Array,
      default: function() {
        return [];
      }
    },
    lcbinfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {
    // 删除参与者
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    addUser(e) {
      e.stopPropagation();
      this.selectShow = !this.selectShow;
    },

    selectHide(e) {
      if (
        e.target.className == "el-input__inner" &&
        e.target.getAttribute("placeholder") == "搜索姓名"
      ) {
        this.selectShow = true;
      } else if (e.target.className == "cyz-list") {
        this.selectShow = true;
      } else {
        this.selectShow = false;
      }
    },

    // 添加参与者
    addTaskParty(e) {
      let label = e.currentTarget.getAttribute("data-label");
      let index = label.split("&")[2];
      let yhbh = label.split("&")[1];
      let yhxm = label.split("&")[0];
      let userArr = [];

      this.dynamicTags.forEach((ele, i, arr) => {
        userArr.push(this.dynamicTags[i].userName);
      });
      if (userArr.includes(label.split("&")[0])) {
        this.dynamicTags.forEach((ele, i, arr) => {
          if (ele.userName == yhxm) {
            this.dynamicTags.splice(i, 1);
          }
        });
      } else {
        this.dynamicTags.push(this.listt0[index]);
      }
    },
    // 选择关联里程碑
    handleLcbtask(data) {
      this.lcbTask = this.lcbrw[data];
      this.taskLcbmc = this.lcbrw[data].rwmc;
    },
    // 选择实施人员
    chooseSSry(data) {
      this.formLabelAlign.ssry = data;
    },

    // 提交任务
    handleAddTask() {
      this.dynamicTags.forEach((ele, i, arr) => {
        this.cyry.push(ele.userId + "," + ele.userName);
      });
      if (!this.validate()) return true;
      let obj = {
        xmbh: this.lcbTask.xmbh,
        lcbbh: this.lcbTask.lcbbh,
        rwmc: this.formLabelAlign.rwmc,
        yxj: this.formLabelAlign.yxj,
        jhgs: this.formLabelAlign.jhgsValue,
        // gq:this.formLabelAlign.jhgsValue,
        rwxq: this.formLabelAlign.desc,
        // lcbmlsy:this.lcbinfo.lcbmlsy,
        // jhksrq: this.formLabelAlign.startDate,
        jhjsrq: this.formLabelAlign.endDate, //期望完成日期
        ssrbh: this.formLabelAlign.ssry.split("&")[1],
        ssrxm: this.formLabelAlign.ssry.split("&")[0],
        cpbh: this.lcbinfo.cpbh,
        cpmc: this.lcbinfo.cpmc,
        ryData: this.cyry.join("|")
      };
      this.$emit("AddTaskCommit", JSON.stringify(obj));
    },
    validate() {
      if (!this.formLabelAlign.rwmc) {
        this.$alert("请填写任务名称", "提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
        return false;
      }  else if (!this.formLabelAlign.endDate) {
        this.$alert("请选择期望完成日期", "提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
        return false;
      } else if (!this.formLabelAlign.ssry) {
        this.$alert("请选择实施人员", "提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
        return false;
      } else if (!this.formLabelAlign.desc) {
        this.$alert("请填写任务详情", "提示", {
          confirmButtonText: "确定",
          type: "error",
          callback: action => {}
        });
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    lcbrw(n, o) {
      this.formLabelAlign.lcbmc = n[0].rwmc;
      this.lcbTask = n[0];
      this.taskLcbmc = n[0].rwmc;
      // 获取任务相关人员
      queryProjectParticipant({
        xmbh: this.lcbTask.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.ssryArr = data.data;
          this.listt0 = data.data;
          this.list0 = data.data;
        }
      });
    },
    name(n, o) {
      var _this = this;
      var tab = this["list0"];
      if (this.name) {
        _this["listt0"] = [];
        tab.forEach(function(item, i, input) {
          if (
            tab[i].userId.indexOf(_this.name) >= 0 ||
            tab[i].userName.indexOf(_this.name) >= 0
          ) {
            _this["listt0"].push(tab[i]);
          }
        });
      } else {
        _this["listt0"] = tab;
      }
    },
    dialogVisible(n, o) {
      if (n) {
        this.partyArr = [];
        this.listt0.forEach((ele, i, input) => {
          if (
            JSON.stringify(this.dynamicTags).indexOf(
              JSON.stringify(this.listt0[i])
            ) != -1
          ) {
            this.partyArr.push(i);
          }
        });
      } else {
        this.selectShow = false;
      }
    },
    dynamicTags(n, o) {
      this.partyArr = [];
      this.listt0.forEach((ele, i, input) => {
        if (
          JSON.stringify(this.dynamicTags).indexOf(
            JSON.stringify(this.listt0[i])
          ) != -1
        ) {
          this.partyArr.push(i);
        }
      });
    },
    dialogVisible(n, o) {
      //提交成功
      this.formLabelAlign.rwmc = "";
      this.formLabelAlign.yxj = "";
      this.formLabelAlign.jhgsValue = "";
      // this.lcbinfo.lcbmlsy = ""
      this.formLabelAlign.startDate = "";
      this.formLabelAlign.endDate = "";
      this.formLabelAlign.ssry = "";
      this.formLabelAlign.desc = "";
      this.cyry = [];
      this.dynamicTags = [];
    }
  },
  activated() {
    this.formLabelAlign.lcbbh = this.lcbrw[0].lcbbh;
  }
};
</script>
<style scoped>
.detail\-content .el-form-item {
  margin-bottom: 8px !important;
}
.task-detail-dialog-header {
  padding: 0 20px;
}
.task-detail-dialog-header h4 {
  margin: 10px 0;
}
.task-detail-scenario-infos-wrap {
  border-bottom: 1px solid #ccc;
  padding: 0 20px;
}
.task-detail-scenario-infos-wrap p {
  margin: 20px 0;
}
.task-detail-scenario-infos-wrap p > span:nth-of-type(1) {
  margin-right: 20px;
  color: #a6a6a6;
}
.detail-activities-wrap {
  background: #f5f5f5;
  padding: 0 20px;
}
.involve-view {
  padding: 10px 0 20px 0;
}
.involve-view button {
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 20px;
}
.el-tag {
  margin-right: 5px;
}

.task_participant {
  width: 100%;
  /* position: fixed;
  background: #fff;
  width: 220px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  padding-top: 10px;
  margin-top: 10px; */
}
.task_participant li:hover {
  background: #e5e5e5;
  cursor: pointer;
}
.task_participant li {
  padding: 4px 20px;
}
.task_participant .invite_newPerson {
  color: #549ef6;
  font-weight: 700;
}
.task_participant .invite_newPerson span {
  display: inline-block;
  vertical-align: middle;
  font-size: 26px;
  color: #549ef6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.task-gs-date::before,
.task-gs-date::before {
  content: "*";
  color: #f56c6c;
  padding: 0 2px;
}
.task-detail-dialog-header-mc {
  margin: 10px 0 !important;
  font-size: 15px;
}
</style>
