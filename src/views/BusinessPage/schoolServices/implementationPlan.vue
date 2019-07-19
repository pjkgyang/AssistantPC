<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <div class="mg-12">
        <el-button size="mini" type="primary" @click="handleAddFwsx">添加服务事项计划</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="fwmc" label="服务事项名称"></el-table-column>
        <el-table-column prop="bmmc" label="部门名称"></el-table-column>
        <el-table-column prop="fwdx" label="服务对象"></el-table-column>
        <el-table-column prop="fwlb" label="服务类别"></el-table-column>
        <el-table-column prop="xxhzc" label="信息化支持">
          <template slot-scope="scope">
            <span>{{scope.row.xxhzc==1?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fwznzrr" label="服务指南责任人"></el-table-column>
        <el-table-column prop="fwznwcsj" label="服务指南完成时间"></el-table-column>
        <el-table-column prop="kfzrr" label="开发责任人"></el-table-column>
        <el-table-column prop="kfwcsj" label="开发完成时间"></el-table-column>
        <el-table-column prop="sszrr" label="实施责任人"></el-table-column>
        <el-table-column prop="sswcsj" label="实施完成时间"></el-table-column>
        <el-table-column fixed="left" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditSsjh(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        layout="total, prev, pager, next" :total="records">
      </el-pagination>
    </div>

    <el-dialog title="添加实施计划" :visible.sync="dialogVisible" width="1200px">
      <div>
        <serviceItem :isPlan="true" @handleAddSsjh="handleAddSsjh"></serviceItem>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <ssjhDailog :show.sync="ssjhShow" @handleCommitSSjh="handleCommitSSjh" :zbwid="curData.zbwid"></ssjhDailog>
  </div>
</template>

<script>
  import serviceItem from '@/views/BusinessPage/schoolServices/serviceitem';
  import ssjhDailog from '@/views/BusinessPage/schoolServices/ssjh-dialog.vue';
  export default {
    data() {
      return {
        ssjhShow: false,
        dialogVisible: false,
        currentPage: 1,
        pageSize: 15,
        records: 0,
        tableData: [],
        curData: {}
      }
    },
    mounted() {
      this.pageServiceItemPlan();
    },
    methods: {
      // 添加服务事项计划
      handleAddSsjh(data) {
        this.saveServiceItemPlan({
          zbwid: data.wid
        });
      },
      // 编辑实施计划
      handleEditSsjh(data) {
        this.curData = data;
        this.ssjhShow = true;
      },
      // 提交计划
      handleCommitSSjh(params) {
        let formData = params;
        formData.zbwid = this.curData.zbwid;
        formData.wid = this.curData.wid;
        this.saveServiceItemPlan(formData);
      },
      // x
      handleAddFwsx() {
        this.dialogVisible = true;
      },

      handleCurrentChange(data) {
        this.currentPage = data;
        this.pageServiceItemPlan();
      },
      saveServiceItemPlan(data) {
        this.$post(this.API.saveServiceItemPlan, data).then(res => {
          if (res.state == 'success') {
            this.pageServiceItemPlan();
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.ssjhShow = false;
            this.dialogVisible = false;
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

      // 获取服务事项计划列表
      pageServiceItemPlan() {
        this.$get(this.API.pageServiceItemPlan, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.tableData = []
            } else {
              this.tableData = res.data.rows;
            }
            this.records = res.data.records;
          } else {

          }
        })
      }
    },
    components: {
      serviceItem,
      ssjhDailog
    },
  }
</script>

<style>
</style>
