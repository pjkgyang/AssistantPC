<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <tableLayout>
        <section slot="top">
          <el-input placeholder="请输入产品版本号" size="mini" @input="handleSearchEnter" style="width:300px"></el-input>
          <el-button type="primary" size="mini">查询</el-button>
        </section>
        <section slot="bottom" style="margin-top:30px">
          <el-button type="primary" size="mini" @click="handleXjjh">新建计划</el-button>
          <el-button type="primary" size="mini" @click="handleNrjh">纳入计划</el-button>
          <el-button type="primary" size="mini">删除计划</el-button>
          <div style="margin:10px 0">
            <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column fixed="left" label="操作" width="130">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">编辑</el-button>
                  <el-button type="text" size="mini" style="color:red !important">删除</el-button>
                  <el-button type="text" size="mini" @click="handleRelease">发布</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
              <el-table-column prop="wtfx" label="问题分析" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="xybjh" label="下一步计划" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jhwcrq" label="计划完成日期" width="110"></el-table-column>
              <el-table-column prop="zrrxm" label="责任人" width="110"></el-table-column>
              <el-table-column prop="jjbbh" label="解决版本号" width="110"></el-table-column>
              <el-table-column prop="fbrq" label="发版日期" width="150"></el-table-column>
              <el-table-column prop="cjrq" label="创建日期" width="180"></el-table-column>
              <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
              <el-table-column prop="nrjhwts" label="纳入计划问题数" width="150"></el-table-column>
            </el-table>
          </div>
        </section>
      </tableLayout>
    </div>
    <xjjh-dialog :show.sync="xjjhShow"></xjjh-dialog>
    <cpfb-dialog :show.sync="cpfbShow"></cpfb-dialog>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import xjjhDialog from "@/components/dialog/wtfp/newPlan-cp.vue";
import cpfbDialog from "@/components/dialog/wtfp/cpfb-dialog.vue";
export default {
  data() {
    return {
      xjjhShow: false,
      cpfbShow: false,
      tableData: [
        {
          cpmc: "产品",
          wtfx: "王小虎",
          xybjh: "上海市普陀区金沙江路 1518 弄",
          jhwcrq: "2018-08-08",
          zrrxm: "张三",
          jjbbh: "V1.0.3",
          fbrq: "2018-08-08",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        },
        {
          cpmc: "产品",
          wtfx: "王小虎",
          xybjh: "上海市普陀区金沙江路 1518 弄",
          jhwcrq: "2018-08-08",
          zrrxm: "张三",
          jjbbh: "V1.0.3",
          fbrq: "2018-08-08",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleSearchEnter() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 新建计划
    handleXjjh() {
      this.xjjhShow = !this.xjjhShow;
    },
    // 发布
    handleRelease(){
      this.cpfbShow = !this.cpfbShow;
    },
    // 纳入计划
    handleNrjh() {
      this.$confirm("是否将此问题纳入计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          
      }).catch(() => {});
    }
  },
  components: { tableLayout, xjjhDialog,cpfbDialog }
};
</script>

<style scoped>
</style>
