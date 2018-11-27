<template>
  <div @click="selectHide">
    <div style="height:540px;">
      <!-- <div class="task-detail-dialog-header">
           <h4 class="task-detail-dialog-header-mc">{{taskForm.cpmc}} · {{taskLcbmc}}</h4>
          </div> -->
      <div style="padding:10px 20px 0 0;border-bottom: 1px solid #ccc; ">
        <el-form size="small" label-width="110px">
          <el-form-item label="关联里程碑">
            <el-select v-model="taskLcbmc" style="width:100%" placeholder="请选择" @change="handleLcbtask">
              <el-option v-for="(item,index) in lcbrw" :key="item.lcbbh" :label="item.rwmc" :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务名称">
            <el-input v-model="taskForm.rwmc"></el-input>
          </el-form-item>
          <el-form-item label="开始日期">
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="taskForm.jhksrq" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col style="text-align:center" :span="4">结束日期</el-col>
            <el-col :span="10">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="taskForm.jhjsrq" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="实施人员">
            <el-col :span="10">
              <el-select v-model="taskForm.ssrxm" @change="chooseSSry" style="width:100%" placeholder="请选择实施人员">
                <el-option v-for="(item,index) in ssryArr" :key="index" :label="item.userName" :value="item.userId+'&'+item.userName">
                </el-option>
              </el-select>
            </el-col>
            <el-col style="text-align:center" :span="4">工时(小时)</el-col>
            <el-col :span="10">
              <el-input v-model="taskForm.jhgs" placeholder="请输入工时"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="优先级">
            <el-select v-model="taskForm.yxj" style="width:41.5%" placeholder="请选择优先级">
              <el-option label="高" value="1"></el-option>
              <el-option label="中" value="2"></el-option>
              <el-option label="低" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务内容">
            <el-input type="textarea" :rows=4 resize="none" v-model="taskForm.rwxq"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="detail-activities-wrap">
        <div class="involve-view">
          <p>参与者</p>
          <div flex flexwrap>
              <el-tag size="small" style="margin-bottom:4px" :key="index" v-for="(tag,index) in dynamicTags" :closable="true" :disable-transitions="false" @close="handleClose(tag)">
                {{tag.userName}}
              </el-tag>
            <div style="position:relative">
              <el-popover placement="right" width="230" trigger="hover">
                <ul class="task_participant">
                  <li>
                    <el-input style="width:180px" v-model="name" placeholder="搜索姓名" @focus="searchPerson"></el-input>
                  </li>
                  <ul style="height:180px;overflow-y:auto">
                    <li v-for="(list,index) in listt0" :data-label="list.userName+'&'+list.userId+'&'+index" :key="index" @click="addTaskParty">
                      <span style="display:inline-block;width:50px;">{{list.userName}} </span>
                      <span>{{list.userCode}}</span>
                      <span class="el-icon-check" style="float:right;margin-top:5px" v-if="partyArr.indexOf(index) != -1"></span>
                    </li>
                  </ul>
                  <!-- <li class="invite_newPerson">
                  <span class="el-icon-circle-plus"></span> 邀请新成员
                </li> -->
                </ul>
                <el-button slot="reference" class="button-new-tag" type="primary">+</el-button>
              </el-popover>
            </div>
          </div>
        </div>
      </div>

      <div style="text-align:right;position:absolute;bottom:0;width:100%;padding:10px ;0">
        <el-button size="small" type="primary" @click="handleCommit">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { addOrUpdateTask } from "@/api/task.js";
import {
  querytaskParticipant,
  addTaskParticipant,
  deleteTaskParticipant,
  queryProjectParticipant
} from "@/api/personal.js";

export default {
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      listt0: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      list0: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      name: "",
      partyArr: [],
      dynamicTags: [],
      selectShow: false,
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
      taskCpmc: "",
      taskLcbmc: "",
      editTaskInfo: {},
      taskForm: {},
      isSesion: true,
      taskCyz: []
    };
  },
  props: {
    lcbrw: {
      type: Array,
      default: function() {
        return [];
      }
    },
    taskData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dialog: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.partyArr = [];
    this.listt0.forEach((ele, i, input) => {
      if (this.dynamicTags.indexOf(this.listt0[i].label) != -1) {
        this.partyArr.push(i);
      }
    });
  },
  methods: {
    // 删除任务相关用户
    handleClose(tag) {
      this.$confirm("是否删除此参与者?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTaskParticipant({
            xmbh: this.taskData.xmbh,
            rwbh: this.taskData.rwbh,
            yhbh: tag.userId
          }).then(({ data }) => {
            if (data.state == "success") {
              this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            }
          });
        })
        .catch(() => {});
    },
    addUser(e) {
      e.stopPropagation();
      this.selectShow = !this.selectShow;
    },
    selectHide(e) {
      if (e.target.className != "el-input__inner") {
        this.selectShow = false;
        this.userListShow = false;
      }
    },
    searchPerson(event) {
      event.cancelBubble = true;
      this.selectShow = true;
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
        return;
      } else {
        addTaskParticipant({
          xmbh: this.taskData.xmbh,
          rwbh: this.taskData.rwbh,
          yhbh: yhbh,
          yhxm: yhxm
        }).then(({ data }) => {
          if (data.state == "success") {
            this.dynamicTags.push(this.listt0[index]);
          }
        });
      }

      this.selectShow = !this.selectShow;
    },
    // 选择关联里程碑
    handleLcbtask(data) {
      this.taskLcbmc = this.lcbrw[data].rwmc;
      this.taskForm.lcbbh = this.lcbrw[data].lcbbh;
    },
    // 选择实施人员
    chooseSSry(data) {
      this.taskForm.ssrbh = data.split("&")[0];
      this.taskForm.ssrxm = data.split("&")[1];
    },

    // 提交任务
    handleCommit() {
      if (!this.validate()) return true;
      this.editTaskInfo = {
        // wid:this.taskForm.wid,
        lcbbh: this.taskForm.lcbbh,
        xmbh: this.taskForm.xmbh,
        rwmc: this.taskForm.rwmc,
        rwbh:this.taskForm.rwbh,
        jhksrq: this.taskForm.jhksrq,
        jhjsrq: this.taskForm.jhjsrq,
        ssrxm: this.taskForm.ssrxm,
        ssrbh: this.taskForm.ssrbh,
        yxj: this.taskForm.yxj,
        rwxq: this.taskForm.rwxq,
        jhgs: this.taskForm.jhgs,
        cpmc: this.taskForm.cpmc,
        cpbh: this.taskForm.cpbh
      };
      addOrUpdateTask(this.editTaskInfo).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.isSesion = true;
              this.$emit("handleEditTaskSuc", "");
            }
          });
        }
      });
    },

    validate() {
      if (!this.taskForm.rwmc) {
        this.$alert("请填写任务名称", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      } else if (!this.taskForm.jhksrq) {
        this.$alert("请选择开始日期", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      } else if (!this.taskForm.jhjsrq) {
        this.$alert("请选择结束日期", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      } else if (!this.taskForm.ssrxm) {
        this.$alert("请选择实施人员", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      } else if (!this.taskForm.rwxq) {
        this.$alert("请填写任务内容", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    dialog(n, o) {
      if (!n) {
        if (!this.isSesion) {
          let task = JSON.parse(sessionStorage.getItem("taskInfo"));
          (this.taskForm.wid = task.wid),
            (this.taskForm.fbbh = task.fbbh),
            (this.taskForm.lcbbh = task.lcbbh),
            (this.taskForm.xmbh = task.xmbh),
            (this.taskForm.rwmc = task.rwmc),
            (this.taskForm.jhksrq = task.jhksrq),
            (this.taskForm.jhjsrq = task.jhjsrq),
            (this.taskForm.ssrxm = task.ssrxm),
            (this.taskForm.ssrbh = task.ssrbh),
            (this.taskForm.yxj = task.yxj),
            (this.taskForm.rwxq = task.rwxq);
          this.taskForm.jhgs = task.jhgs;
        }
        this.selectShow = false;
      }
    },
    lcbrw(n, o) {
      this.isSesion = false;
      sessionStorage.setItem("taskInfo", JSON.stringify(this.taskData));
      this.taskForm = this.taskData;
      let mc = this.taskForm.lcbms;
      this.taskLcbmc = mc;
      // 获取任务相关人员
      querytaskParticipant({
        rwbh: this.taskData.rwbh,
        xmbh: this.taskData.xmbh
      }).then(({ data }) => {
        this.taskCyz = [];
        if (data.state == "success") {
          data.data.forEach((ele, i, arr) => {
            if (ele.roleName == "参与者") {
              this.taskCyz.push(ele);
              this.dynamicTags = this.taskCyz;
            }
          });
        }
      });
      // 获取项目相关人员
      queryProjectParticipant({
        xmbh: this.taskData.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.length != 0 && data.data != null) {
            this.list0 = data.data;
            this.listt0 = data.data;
            this.ssryArr = data.data;
          }
        }
      });

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
    }
  },
  activated() {}
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 10px;
}
.task-detail-dialog-header {
  padding: 0 20px;
}
.task-detail-dialog-header h4 {
  margin: 10px 0 !important;
  font-size: 16px;
  font-weight: 700;
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
  /* position: fixed; */
  /* background: #fff; */
  /* width: 220px; */
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
  /* padding-top: 10px; */
  /* z-index: 50000; */
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
</style>
