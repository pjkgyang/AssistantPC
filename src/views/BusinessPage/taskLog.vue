<template>
  <div class="task-log">
    <div class="task-log-addDailyPaper">
      <el-button type="primary" @click="handleDailyPaper">
        <span class="el-icon-circle-plus"></span> 添加日报
      </el-button>
    </div>
    <div class="task-log-date">
      <el-date-picker
        style="width:130px"
        v-model="startDate"
        type="date"
        size="small"
        placeholder="开始日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>至
      <el-date-picker
        style="width:130px"
        v-model="endDate"
        type="date"
        size="small"
        placeholder="结束日期"
        value-format="yyyy-MM-dd"
      ></el-date-picker>&nbsp;
      <span style="font-size:14px;">阅读状态 :</span>
      <el-select v-model="ydztValue" style="width:80px" @change="changeTaskydzt">
        <el-option label="全部" value></el-option>
        <el-option label="已读" value="1"></el-option>
        <el-option label="未读" value="0"></el-option>
      </el-select>&nbsp;
      <span style="font-size:14px;" v-if="isJzuser == 0">区域 :</span>
      <el-select
        v-if="isJzuser == 0"
        v-model="gcqyValue"
        style="width:130px"
        @change="changeTaskgcqy"
      >
        <el-option label="全部" value></el-option>
        <el-option v-for="(qy,index) in gczdList" :key="index" :label="qy.mc" :value="qy.label"></el-option>
      </el-select>&nbsp;
      <span style="font-size:14px;">范围 :</span>
      <el-select v-model="fwValue" style="width:100px" @change="changeTaskscope">
        <el-option v-for="(fw,index) in fwList" :label="fw.label" :value="fw.value" :key="index"></el-option>
      </el-select>
      <el-input
        v-model="keyword"
        size="small"
        placeholder="项目编号/项目名称/填写人姓名"
        style="width:200px;"
        @change="handleEnterlog"
      ></el-input>
      <el-button type="info" @click="checkTaskLog">查询</el-button>&nbsp;&nbsp;
      <a href="javaScript:void(0)" @click="handleExport">导出</a>
    </div>

    <div class="task-log-tabel">
      <el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <div flex spacearound>
              <el-button
                type="text"
                size="mini"
                @click="handleTasklogDetail(scope.$index, scope.row)"
              >批注</el-button>
              <el-button
                v-if="scope.row.editable"
                type="text"
                size="mini"
                @click="handleEditDetail(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                v-if="scope.row.editable"
                type="text"
                size="mini"
                style="color:#f00"
                @click="handleDeleteDetail(scope.$index, scope.row)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="阅读状态" width="90">
          <template slot-scope="scope">
            <div slot="reference">
              <span
                title="点击设为已阅"
                class="tasklog-ydzt tasklog-ydzt-wy"
                v-if="scope.row.ydzt == 0"
                @click="handleReadlog(scope.$index, scope.row)"
              >{{scope.row.ydzt_display}}</span>
              <span
                :class="{'tasklog-ydzt':true,'tasklog-ydzt-yy':scope.row.ydzt==1}"
                v-if="scope.row.ydzt!=0"
              >{{scope.row.ydzt ==1?'已阅':scope.row.ydzt_display}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cjrxm" label="填写人" width="80"></el-table-column>
        <el-table-column prop="xmbh" label="项目编号"  sortable width="110"></el-table-column>
        <el-table-column prop="xmmc" label="项目名称"  width="260"></el-table-column>
        <el-table-column prop="gcms" label="内容" width="500" ></el-table-column>
        <el-table-column prop="cpmc_display" label="产品名称"  width="180"></el-table-column>
        <el-table-column prop="rwmc_display" label="任务名称"  width="150"></el-table-column>
        <el-table-column prop="gcrq" label="日报日期" width="110" sortable></el-table-column>
        <el-table-column prop="cjsj" label="填写时间" width="160" sortable></el-table-column>
        <el-table-column prop="gs" label="工时(小时)" width="90"></el-table-column>
        <el-table-column label="附件" width="300">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <div @click="handleDownFile(scope.$index, scope.row,$event)">
                <span
                  title="点击下载"
                  v-for="(fj,index) in scope.row.fjData"
                  :key="index"
                  :data-fj="fj.fjbh"
                >{{fj.fjmc}}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;margin:10px 0;" v-if="records > 15">
        <pagination
          :pageSize="pageSize"
          :total="records"
          @handleCurrentChange="handleCurrentChange"
        ></pagination>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogDialyVisible"
      title="添加日志"
      @close="handleCloseDialy"
      width="600px"
      :close-on-click-modal="false"
    >
      <daily-parper
        :disabled="isDisabled"
        :sign="sign"
        :logInfo="logDetail"
        @resetForm="resetForm"
        @handleSubmit="handleSubmit"
        @addDailyTasks="addDailyTasks"
        :taskName="taskName"
        :closeDialogNum="closeDialogNum"
        :addBtnShow="true"
      ></daily-parper>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogTaskVisible"
      title="关联任务"
      width="900px"
      :close-on-click-modal="false"
    >
      <dialogTask :dialogTaskVisible="dialogTaskVisible" @chooseRevelenceTask="chooseRevelenceTask"></dialogTask>
    </el-dialog>
    <el-dialog
      :visible.sync="tasklogDetailVisible"
      title="日志详情"
      width="700px"
      :close-on-click-modal="false"
    >
      <div class="tasklog-detail">
        <p>
          <span>日报日期 :</span>
          <span>{{taskDetail.gcrq}}</span>
        </p>
        <p>
          <span>填写时间 :</span>
          <span>{{taskDetail.cjsj}}</span>
        </p>
        <p>
          <span>项目名称 :</span>
          <span>{{taskDetail.xmmc == ''?'无':taskDetail.xmmc}}</span>
        </p>
        <p>
          <span>产品名称 :</span>
          <span>{{taskDetail.cpmc == ''?'无':taskDetail.cpmc}}</span>
        </p>
        <p>
          <span>关联任务 :</span>
          <span>{{taskDetail.rwmc == ''?'无':taskDetail.rwmc}}</span>
        </p>
        <p>
          <span>工时(小时) :</span>
          <span>{{taskDetail.gs}}</span>
        </p>
        <p>
          <span>日志内容 :</span>
          <span>{{taskDetail.gcms}}</span>
        </p>
        <p>
          <span>附件列表 :</span>
          <span class="name-wrapper">
            <span
              v-for="(fj,index) in taskDetail.fjData"
              :key="index"
              :data-fj="fj.fjbh"
              @click="handleDownFile('','',$event)"
            >{{fj.fjmc}}</span>
          </span>
        </p>
        <p style="border:none" v-if="taskDetail.ydzt == 2||isJzuser == 0">
          <el-table :data="pzList" border max-height="300" style="width:100%">
            <el-table-column prop="yhxm" label="姓名" width="80"></el-table-column>
            <el-table-column prop="ydsj" label="阅读日期" width="155"></el-table-column>
            <el-table-column prop="bz" label="批注" show-overflow-tooltip></el-table-column>
          </el-table>
        </p>
        <p flex style="border:none" v-if="taskDetail.ydzt != 2">
          <span>批注:</span>
          <el-input type="textarea" :rows="5" placeholder="请输入批注内容" v-model="pzValue" resize="none"></el-input>
        </p>
        <div style="text-align:right">
          <el-button
            size="mini"
            type="primary"
            v-if="taskDetail.ydzt != 2"
            @click="handleSaveDetail"
          >更新批注</el-button>
          <el-button size="mini" type="info" @click="handleCloseDetail">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dailyParper from "@/components/BusinessPage/dailyParper.vue";
import dialogTask from "@/components/BusinessPage/dialogTask.vue";
import pagination from "@/components/BusinessPage/pagination.vue";
import {
  addOrUpdateTaskProcess,
  queryLogTaskProcess,
  exportPersonnelLog,
  readLog,
  getLogComment,
  commentLog,
  deleteTaskProcess,
  getLogComments
} from "@/api/TaskProcess.js";
import { queryTdcy, queryVisiblePerson } from "@/api/personal.js";
import { getMenu, getSession, getPreMonth } from "@/utils/util.js";

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 200,
      fwList: [
        { label: "全部", value: "" },
        { label: "战队（组织结构）", value: "0" },
        { label: "学校成员", value: "2" },
        { label: "合作伙伴", value: "3" },
        { label: "项目", value: "1" }
      ],
      startDate: "",
      endDate: "",
      tableData: [],
      dialogDialyVisible: false,
      dialogTaskVisible: false,
      tasklogDetailVisible: false,
      taskName: "",
      relevanceTask: false,
      dailyValue: {},
      pageSize: 17,
      records: null,
      options: [],
      value: "",
      ydztValue: "", //阅读状态
      gcqyValue: "", //工程区域
      gczdList: [], //区域
      fwValue: "",
      TaskRelevance: {},
      rwgc: {},
      total: "",
      baseUrl: "",
      isRead: "",
      keyword: "",
      closeDialogNum: 0,
      taskDetail: {},
      pzValue: "",
      logDetail: {},
      isedit: true,
      rwbh: "",
      xmbh: "",
      sign: 0,
      nowPage: 1,
      pzList: [],
      isJzuser: "",
      isDisabled: 0
    };
  },
  mounted() {},
  methods: {
    handleReadlog(index, row) {
      // 阅读日志
      if (row.ydzt == 0) {
        readLog({
          wid: row.wid
        }).then(({ data }) => {
          if (data.state == "success") {
            row.ydzt = 1;
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      }
    },
    handleCloseDetail() {
      this.tasklogDetailVisible = false;
    },
    // 保存批注
    handleSaveDetail() {
      commentLog({
        wid: this.taskDetail.wid,
        bz: this.pzValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tasklogDetailVisible = false;
          this.$alert("保存成功", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        }
      });
    },
    //  切换填写人
    handleChoosetxr() {
      this.queryLogTaskProcess(1);
    },
    //  切换阅读状态
    changeTaskydzt() {
      this.queryLogTaskProcess(1);
    },
    // 工程区域
    changeTaskgcqy() {
      this.queryLogTaskProcess(1);
    },
    //  范围
    changeTaskscope() {
      this.queryLogTaskProcess(1);
    },
    // 查看日志详情
    handleTasklogDetail(index, row) {
      this.tasklogDetailVisible = true;
      this.taskDetail = row;
      if (row.ydzt == 0) {
        readLog({
          wid: row.wid
        }).then(({ data }) => {
          if (data.state == "success") {
            row.ydzt = 1;
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      }
      if (row.ydzt == 2 || this.isJzuser == 0) {
        this.getLogComments(this.taskDetail.wid);
      }
      this.getLogComment(this.taskDetail.wid);
    },
    // 编辑日报
    handleEditDetail(index, row) {
      this.logDetail = row;
      this.sign += 1;
      this.isedit = true;
      this.dialogDialyVisible = true;
    },
    // 添加日报
    handleDailyPaper() {
      this.dialogDialyVisible = !this.dialogDialyVisible;
      this.closeDialogNum += 1;
      this.sign -= 1;
      this.isedit = false;
      this.taskName = "";
    },
    //  删除日志
    handleDeleteDetail(index, row) {
      this.$confirm("是否删除该条日志?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteTaskProcess({
            wid: row.wid
          }).then(({ data }) => {
            if (data.state == "success") {
              this.queryLogTaskProcess(this.nowPage);
              this.$alert("删除成功", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
            }
          });
        })
        .catch(() => {});
    },
    //日报提交
    handleSubmit(data) {
      // this.rwgc.xmbh = this.TaskRelevance.xmbh
      // this.rwgc.rwbh = this.TaskRelevance.rwbh
      this.isDisabled = 1;
      this.rwgc.gclx = 2;
      this.rwgc.gcms = data.gcms;
      this.rwgc.gcrq = data.gcrq;
      this.rwgc.gs = data.gs;
      this.rwgc.fjdata = data.fjdata.join(",");
      this.rwgc.wid = data.wid;
      if (this.isedit) {
        this.rwgc.xmbh = this.xmbh == "" ? data.xmbh : this.xmbh;
        this.rwgc.rwbh = this.rwbh == "" ? data.rwbh : this.rwbh;
        this.addOrUpdateTaskProcess(this.rwgc);
      } else {
        this.rwgc.wid = "";
        this.rwgc.xmbh = this.xmbh;
        this.rwgc.rwbh = this.rwbh;
        this.addOrUpdateTaskProcess(this.rwgc);
      }
    },
    // 重置任务
    resetForm() {
      this.taskName = "";
      this.rwgc.xmbh = "";
      this.rwgc.rwbh = "";
    },
    // 添加日报（关联任务）
    addDailyTasks() {
      this.dialogTaskVisible = !this.dialogTaskVisible;
    },
    // 选择关联任务
    chooseRevelenceTask(data) {
      this.taskName = data.rwmc;
      // this.TaskRelevance = data
      this.xmbh = data.xmbh;
      this.rwbh = data.rwbh;
      this.dialogTaskVisible = !this.dialogTaskVisible;
    },

    handleCloseDialy() {},

    
    handleExport() {
      let startDate = !this.startDate?'':this.startDate;
      let endDate = !this.endDate?'':this.endDate;
      window.open(
        this.baseUrl +
          "process/exportPersonnelLog.do?startDay=" +
           startDate +
          "&endDay=" +
           endDate +
          "&isRead=" +
          this.ydztValue +
          "&gcqy=" +
          this.gcqyValue +
          "&cybh=" +
          this.value +
          "&fw=" +
          this.fwValue +
          "&keyword=" +
          this.keyword
      );
    },
    //查询
    checkTaskLog() {
      let oDate1 = new Date(this.startDate);
      let oDate2 = new Date(this.endDate);
      if (oDate1.getTime() > oDate2.getTime()) {
        this.$alert("开始时间必须大于结束时间!", "错误提示", {
          confirmButtonText: "确定",
          type: "error"
        });
        return;
      }
      this.queryLogTaskProcess(1);
    },
    handleEnterlog() {
      this.checkTaskLog();
    },

    //切换分页
    handleCurrentChange(data) {
      this.nowPage = data;
      this.queryLogTaskProcess(data);
    },

    //下载附件
    handleDownFile(index, row, e) {
      let fjbh = e.target.getAttribute("data-fj");
      window.open(window.baseurl + "attachment/downloadFile.do?fjId=" + fjbh);
    },
    // 格式日期
    GetDateStr(DayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + DayCount); //获取DayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      var s = y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
      return s;
    },
    // 获取任务过程
    queryLogTaskProcess(curPage) {
      queryLogTaskProcess({
        curPage: curPage,
        pageSize: this.pageSize,
        startDay: !this.startDate?'':this.startDate,
        endDay: !this.endDate?'':this.endDate,
        cybh: this.value,
        isRead: this.ydztValue,
        qygc: this.gcqyValue,
        keyword: this.keyword,
        fw: this.fwValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data.rows;
          this.records = data.data.records;
          this.total = data.data.total;
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            callback: cancel => {}
          });
        }
      });
    },
    //  获取批注
    getLogComment(wid) {
      getLogComment({
        wid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.pzValue = data.data;
        }
      });
    },
    // 获取所有批注
    getLogComments(wid) {
      getLogComments({
        wid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data != null && data.data.length != 0) {
            this.pzList = data.data;
          } else {
            this.pzList = [];
          }
        }
      });
    },
    addOrUpdateTaskProcess(rwgc) {
      addOrUpdateTaskProcess(rwgc).then(({ data }) => {
        if (data.state == "success") {
          this.isDisabled = 0;
          this.$alert("添加成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.taskName = "";
              this.xmbh = "";
              this.rwbh = "";
              this.closeDialogNum += 1;
              this.queryLogTaskProcess(1);
              this.dialogDialyVisible = !this.dialogDialyVisible;
            }
          });
        } else {
          this.isDisabled = 0;
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        }
      });
    }
  },
  activated() {
    this.isJzuser = sessionStorage.getItem("isJZuser");
    this.baseUrl = window.baseurl;
    this.endDate =
      new Date().getFullYear() +
      "-" +
      ("0" + (new Date().getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + new Date().getDate()).slice(-2);
    this.startDate = this.GetDateStr(-7);
    this.queryLogTaskProcess(1);

    if (!getSession("gczd")) {
      getMenu("gczd", this.gczdList, true); //获取工程战队
    } else {
      this.gczdList = getSession("gczd");
    }
  },
  components: { dailyParper, dialogTask, pagination }
};
</script>
<style scoped>
.task-log {
  min-width: 1280px;
  width: 90%;
  margin: 10px auto 0;
  padding: 10px 10px 0;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.task-log-addDailyPaper {
  float: right;
  margin-top: 10px;
}
.task-log-addDailyPaper button {
  height: 35px;
  padding: 0 20px;
}
.task-log .task-log-date {
  margin: 10px 0;
}
.task-log .task-log-date button {
  padding: 5px 10px;
  border: 1px solid #409eff;
  background: #409eff;
}
.task-log-date .el-select {
  width: 120px;
  vertical-align: top;
}

.task-log-date .el-date-editor {
  width: 160px;
}
.task-log-date a {
  background: forestgreen;
  color: #fff;
  padding: 6px 13px;
  font-size: 12px;
  border-radius: 3px;
}
.name-wrapper span:hover {
  cursor: pointer;
  text-decoration: underline;
}
.name-wrapper span {
  color: #409eff !important;
  margin-right: 15px;
}
.name-wrapper span:hover {
  cursor: pointer;
}
.tasklog-detail {
  padding: 10px;
}
.tasklog-detail p {
  margin: 10px 0 !important;
  border-bottom: 1px dashed #ccc;
}
.tasklog-detail p > span:nth-child(1) {
  display: inline-block;
  width: 80px;
  font-weight: 700;
  text-align: right;
  margin-right: 10px;
}
</style>
