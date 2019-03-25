<template>
  <div class="item_task_tabel">
      <el-table
    :data="tableData"
    style="width: 100%"
    @cell-click="cellClick"
    border
    :max-height="tableInnerHeight">
     <el-table-column
      fixed="left"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <div style="white-space:nowrap;" flex-align class="spacearound">
          <el-button @click="handleDailyParper(scope.row)" type="text" size="small">填写日报</el-button> &#x3000;
          <el-button v-if="scope.row.lx == 1||scope.row.lx == 2" @click="handleCommitTask(scope.row)" type="text" size="small">提交里程碑</el-button>
         <span v-else class="task-switch task-log"  title="关闭/重启任务" :class="{'el-icon-check':scope.row.zt==2,'task-close':scope.row.zt==2}" :data-info="scope.row.rwbh+'&'+scope.row.zt" @click="changetaskState"></span>
         </div>
      </template>
    </el-table-column>
    <el-table-column prop="rwmc_display" label="任务名称" show-overflow-tooltip width="280"></el-table-column>    
    <el-table-column prop="cpmc_display" label="产品名称" show-overflow-tooltip width="160"></el-table-column>
    <el-table-column prop="lcbms_display" label="里程碑名称" show-overflow-tooltip width="280" ></el-table-column>
    <el-table-column prop="zt_display" label="任务状态" show-overflow-tooltip width="100"></el-table-column>
    <el-table-column prop="yxj_display" label="优先级" show-overflow-tooltip width="100"></el-table-column>
    <el-table-column prop="cjrxm" label="发起人" show-overflow-tooltip width="80"></el-table-column>
    <el-table-column prop="jhksrq" label="计划开始日期"show-overflow-tooltip width="130"></el-table-column>
    <el-table-column prop="jhjsrq" label="计划结束日期"show-overflow-tooltip width="130"></el-table-column>
    <el-table-column prop="cyr" label="参与人" show-overflow-tooltip ></el-table-column>
  </el-table>
      <div class="item-task-tjlcb">
        <el-dialog
        title="提报里程碑"
        :close-on-click-modal="false"
        width="600px"
        top="50px"
        :append-to-body="true"
        :visible.sync="milestoneVisible">
        <commitMilestone :shown="milestoneVisible" :taskDetail="taskDetail" @handleCommitMilestone="handleCommitMilestone"></commitMilestone>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import commitMilestone from "@/components/BusinessPage/commitMilestone.vue";
export default {
  data() {
    return {
      milestoneVisible: false,
      tableInnerHeight: window.innerHeight - 200,
      taskDetail: {}
    };
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    handleCommitMilestone() {
      this.milestoneVisible = false;
    },
    handleDailyParper(data) {
      this.$emit("handleDailyParper", data);
    },
    handleCommitTask(data) {
      this.taskDetail = data;
      this.milestoneVisible = !this.milestoneVisible;
      // this.$emit('handleCommitTask',data);
    },
    changetaskState(e) {
      this.$emit("changeTaskStaus", e.target.getAttribute("data-info"));
    },
    cellClick(row, column, cell, event) {
      if (column.label == "任务名称") {
        this.$emit("handleCell", row);
      }
    }
  },
  components: { commitMilestone }
};
</script>
<style scoped>
.item_task_tabel {
  height: 100%;
}
.task-log {
  margin-top: 5px;
}
</style>
