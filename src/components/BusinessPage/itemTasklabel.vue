<template>
  <div>
    <ul class="Lcbtask_task">
      <li v-for="(detailList,index) in TaskDatas" :key="index" v-if=" TaskDatas != null" style="position:relative">
        <div class="task_label lcb_task" :data-rwbh="detailList.rwbh" v-if="detailList.lx == 1" :class="{'gb-active':detailList.zt == 5}">
          <div class="lcb_task_top" @click="handleTaskinfo($event,index)">
            <div style="font-size:13px;">
              <p class="task_content" :title="detailList.rwmc_display"> {{detailList.rwmc_display}} </p>
              <p>
                <span class="lcb-task-type">里程碑任务</span>
              </p>
              <p class="lcb_task_info">
                <span>
                  <span class="el-icon-erp-yonghu Lcbtask_task-titleTip"> 责任人 :&nbsp;</span>{{detailList.ssrxm == ''?'暂无':detailList.ssrxm}}</span>
                <span>
                  <span class="el-icon-circle-check-outline Lcbtask_task-titleTip"> 甲方确认 :&nbsp;</span>
                  <span>{{detailList.sfjfqr==0?'未确认':'已确认'}} </span>
                </span>
              </p>
              <p class="lcb_task_info">
                <span>
                  <span class="el-icon-document Lcbtask_task-titleTip"> {{detailList.lx == 1?'里程碑状态':'任务状态'}} : </span>
                  <span :class="{'lcb-gb':detailList.zt_display=='关闭','lcb-zc':detailList.zt_display!='关闭'}">{{detailList.zt_display}}</span>
                </span>
                <span>
                  <span class="el-icon-sort Lcbtask_task-titleTip"> 优先级 :&nbsp;</span>
                  <span :class="{'task-yxj':true,'task-yxj-fcjj':detailList.yxj == 1,'task-yxj-jj':detailList.yxj == 2,'task-yxj-zc':detailList.yxj == 3}">{{detailList.yxj_display}}</span>
                </span>
              </p>
              <p class="lcb_task_info">
                <span>
                  <span class="el-icon-date Lcbtask_task-titleTip"> 期望完成日期 :&nbsp;</span>{{detailList.jhjsrq}}</span>
                <span>
                  <span class="el-icon-date Lcbtask_task-titleTip"> 实际完成日期 :&nbsp;</span>{{detailList.sjjsrq}}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="task_label_bottom">
            <!-- <span data-lx="1"  :data-type="'changeDate&'+index" style="border-left:none"> 调整计划</span> -->
            <el-button v-if="detailList.sfjfqr != 1 && userCode == cpData.jfzrrbh" @click="handleTask($event,'jfqy',index)">甲方确认</el-button>
            <!-- <el-button  @click="handleTask($event,'commit',index)" v-if="detailList.zt != 5"> 提交里程碑</el-button> -->
            <el-button @click="handleTask($event,'daily',index)"> 填写日报</el-button>
            <!-- <el-button  @click="handleTask($event,'edit',index)">编辑任务</el-button> -->
          </div>
          <div :class="{'task-priority':true,'task-priority-1':true}"></div>
        </div>

        <div class="task_label" :class="{'task-ywc':detailList.zt == 2}" :data-rwbh="detailList.rwbh" v-else>
          <div class="task_label_top" @click="handleTaskinfo($event,index)">
            <div style="font-size:12px;width:100%;">
              <p class="task_content">
                <span class="task-switch" title="关闭/重启任务" :class="{'el-icon-check':detailList.zt==2,'task-close':detailList.zt==2}" :data-info="detailList.rwbh+'&'+detailList.zt" @click="changeTaskState($event,detailList)"></span>
                {{detailList.rwmc_display}}</p>
              <p>
                <span class="lcb-task-type">{{detailList.lx_dispaly}}</span>
              </p>
              <p class="lcb_task_info">
                <span>
                  <span class="el-icon-date Lcbtask_task-titleTip"> 期望完成日期 : </span>{{detailList.jhjsrq}}
                </span>
                <span>
                  <span class="el-icon-date Lcbtask_task-titleTip"> 实际完成日期 :&nbsp;</span>{{detailList.sjjsrq}}
                </span>
              </p>
              <p class="lcb_task_info">
                <span>
                  <span class="el-icon-document Lcbtask_task-titleTip"> {{detailList.lx == 1?'里程碑状态':'任务状态'}} :</span>
                  <span :class="{'rw-gb':detailList.zt==2||3,'rw-zc':detailList.zt != 2 && detailList.zt !=3}">{{detailList.zt_display}}</span>
                </span>
                <span>
                  <span class="el-icon-sort Lcbtask_task-titleTip"> 优先级 : </span>
                  <span :class="{'task-yxj':true,'task-yxj-fcjj':detailList.yxj == 1,'task-yxj-jj':detailList.yxj == 2,'task-yxj-zc':detailList.yxj == 3}">{{detailList.yxj_display}}</span>
                </span>
              </p>
              <p class="lcb_task_info">
                <span>
                  <span class="el-icon-erp-yonghu Lcbtask_task-titleTip"> 责任人：</span><span :style="{'color':detailList.lx == 5?'#3ba7f5':''}">{{detailList.ssrxm == ''?'暂无':detailList.ssrxm}}</span>
                </span>
                <!-- <span> -->
                <span style="font-size:12px;" class="el-icon-erp-yonghu" v-if="detailList.lx != 3 && detailList.lx != 5">
                  <span class="Lcbtask_task-titleTip">创建人 : </span>{{detailList.cjrxm == ''?'暂无':detailList.cjrxm}}</span>
                <!-- </span> -->
              </p>
            </div>
          </div>
          <div class="task_label_bottom">
            <!-- <span v-if="(detailList.lx == 3 || detailList.lx == 5) && detailList.zt != 2"  data-lx="1" :data-type="'changeDate&'+index" class="el-icon-date"> 调整计划</span> -->
            <el-button v-if="detailList.zt == 2 && detailList.lx == 3?userCode == cpData.jfzrrbh:detailList.lx == 5?userCode == cpData.yfzrrbh:userCode == detailList.cjrbh" @click="handleTask($event,'jfqy',index)" :disabled="detailList.zt == 3">{{detailList.lx == 3?'甲方确认':detailList.lx == 5?'乙方确认':'创建人确认'}}</el-button>
            <el-button v-if="detailList.lx == 9 && detailList.zt != 2 && userCode == detailList.cjrbh " @click="handleTask($event,'delete',index)">删除任务</el-button>
            <el-button v-if="detailList.lx == 9 && detailList.zt != 2 && userCode == detailList.cjrbh" @click="handleTask($event,'edit',index)">编辑任务</el-button>
            <el-button @click="handleTask($event,'daily',index)"> 填写日报</el-button>
          </div>
          <div :class="{'task-priority':true,'task-priority-1':true}"></div>
        </div>
      </li>
      <li v-if="TaskDatas == null" class="empty-task">
        暂无任务
      </li>
    </ul>

    <el-dialog title="完成任务" :visible.sync="taskVisible" width="50%" :append-to-body="true">
      <div>
        &#x3000;
        <span class="filter-weight before-require">实际完成日期:</span>
        <el-date-picker size="mini" v-model="wcsj" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleCommit" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { changeTaskStatus } from "@/api/task.js";
export default {
  data() {
    return {
      checked: false,
      userCode: "",
      taskVisible: false,
      wcsj: "",
      taskInfo: {},
			cpData:{}
    };
  },
  props: {
    TaskDatas: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {
    this.userCode = JSON.parse(sessionStorage.getItem('userInfo')).uid ;
		this.cpData = window.cpData;
  },
  methods: {
    // 关闭弹出层
    handClose() {
      this.wcsj = "";
      this.taskVisible = !this.taskVisible;
    },
    // 确定
    handleCommit() {
      if (!this.wcsj) {
        this.$alert("请选择完成时间", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.$confirm("您确定完成了本任务吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          changeTaskStatus({
            rwbh: this.taskInfo.rwbh,
            state: this.taskInfo.zt == 1 ? "2" : "1",
            wcsj: this.wcsj
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$emit("changeTaskstate", "");
            }
          });
        })
        .catch(() => {});
      this.taskVisible = !this.taskVisible;
    },
    handleTaskinfo(e, param) {
      let data = this.TaskDatas[param];
      this.TaskDatas[param].index = param;
      this.$emit("handleTaskinfo", data);
    },


    handleTask(e, type, index) {
      e.stopPropagation();
      let task = this.TaskDatas[index];
      task.type = type;
      this.$emit("handleTaskDialog", task);
    },

    changeTaskState(e, params) {
      e.stopPropagation();
      let groupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
      this.taskInfo = params;
      if (params.zt == 1) {
        this.taskVisible = true;
        return;
      }
      // 关闭 开启任务
      if (params.zt == 1) {
        this.$confirm("您确定完成了本任务吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            changeTaskStatus({
              rwbh: params.rwbh,
              state: params.zt == 1 ? "2" : "1"
            }).then(({ data }) => {
              if (data.state == "success") {
                this.$emit("changeTaskstate", "");
              }
            });
          })
          .catch(() => {});
      } else {
        // 个人任务
        if (params.lx == 9) {
          if (
            params.sfjfqr == "0" &&
            (this.userCode == params.cjrbh || this.userCode == params.ssrbh)
          ) {
            changeTaskStatus({
              rwbh: params.rwbh,
              state: params.zt == 1 ? "2" : "1"
            }).then(({ data }) => {
              if (data.state == "success") {
                this.$emit("changeTaskstate", "");
              }
            });
          } else {
            this.$alert(
              "对不起,您没有操作权限！(如有问题，请联系管理员)",
              "提示",
              { confirmButtonText: "确定", type: "warning" }
            );
          }
        } else {
          if (groupTag.includes("ProblemAdmin")) {
            changeTaskStatus({
              rwbh: params.rwbh,
              state: params.zt == 1 ? "2" : "1"
            }).then(({ data }) => {
              if (data.state == "success") {
                this.$emit("changeTaskstate", "");
              }
            });
          } else {
            this.$alert(
              "对不起,您没有操作权限！(如有问题，请联系管理员)",
              "提示",
              { confirmButtonText: "确定", type: "warning" }
            );
          }
        }
      }
    }
  }
};
</script>
<style scoped>
.task_label {
  width: 340px;
  background: #fff;
  font-size: 14px;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 3px #ccc;
  margin: 8px 0;
}
.task_label_top {
  display: flex;
}
.task_mark {
  width: 30px;
  height: 30px;
  border: 1px solid #000;
}
.task-infos {
  display: inline-block;
  font-size: 12px;
  color: #000;
  margin: 2px 6px 0 0;
}
.task_content {
  font-size: 14px;
  margin-bottom: 3px;
  color: #363748 !important;
  padding: 10px 0 5px 0;
  font-weight: 700;
}
.task_label_bottom {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  width: 100%;
  border-top: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.task_label_bottom > button {
  padding: 8px 0;
  border-left: 1px solid #e5e5e5 !important;
  text-align: center;
  width: 100%;
  margin-left: 0;
  border-radius: 0px !important;
}
.task_label_bottom > button:first-child {
  border-left: none !important;
}
.task_label_bottom button {
  background: none;
  border: none;
}
.empty-task {
  text-align: center;
  line-height: 100px;
}
.task_label:hover {
  cursor: pointer;
}

.task-yxj {
  display: inline-block;
  /* padding: 1px 2px 2px; */
  height: 20px;
  line-height: 20px;
  border-radius: 2px;
  width: 40px;
  text-align: center;
}
.task-ywc {
  background: #f4f4f4;
}

.Lcbtask_task {
  padding-left: 10px;
}
.gb-active {
  background: #f4f4f4;
}
.lcb-gb,
.rw-gb {
  background: #3ba7f5;
  color: #fff;
  border-radius: 2px;
  padding: 3px 4px !important;
}
.lcb-zc,
.rw-zc {
  background: #e6443c;
  color: #fff;
  border-radius: 2px;
  padding: 3px 4px !important;
}

.lcb_task_top,
.task_label_top {
  padding: 5px 5px;
}
.lcb_task_top .lcb_task_info,
.task_label_top .lcb_task_info {
  width: 100%;
  margin-bottom: 6px !important;
}
.lcb_task_top .lcb_task_info > span,
.task_label_top .lcb_task_info > span {
  display: inline-block;
  width: 49%;
  white-space: nowrap;
  font-size: 12px;
}
.lcb-task-type {
  background: rgb(207, 238, 248);
  color: #879797;
  border: 1px solid #81aeaf;
  border-radius: 2px;
  display: inline-block;
  padding: 1px 2px;
  font-size: 12px;
  margin: 2px 0 5px 0 !important;
}
.lcb_task_top > div > .el-icon-service,
.lcb_task_top > div > .el-icon-document {
  color: #a8a8a8;
  color: #a8a8a8 !important;
}
.lcb_task_top > div > .el-icon-date,
.lcb_task_top > div > .el-icon-sort {
  color: #a8a8a8 !important;
}
.Lcbtask_task-titleTip {
  color: #a8a8a8;
  font-size: 12px;
}
</style>
