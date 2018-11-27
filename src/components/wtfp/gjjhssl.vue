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
                  <el-button type="text" size="mini" @click="handleTrain">培训</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
              <el-table-column prop="pxzt" label="培训主题" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="pxxs" label="培训形式" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jhrq" label="计划日期" width="110"></el-table-column>
              <el-table-column prop="fxrxm" label="分享人" width="110"></el-table-column>
              <el-table-column prop="cjrq" label="创建日期" width="180"></el-table-column>
              <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
              <el-table-column prop="nrjhwts" label="纳入计划问题数" width="150"></el-table-column>
            </el-table>
          </div>
        </section>
      </tableLayout>
    </div>
    <xjjh-dialog :show.sync="xjjhShow"></xjjh-dialog>
    <sspx-dialog :show.sync="sspxShow"></sspx-dialog>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import xjjhDialog from "@/components/dialog/wtfp/newPlan-ss.vue";
import sspxDialog from "@/components/dialog/wtfp/sspx-dialog.vue";
export default {
  data() {
    return {
      xjjhShow: false,
      sspxShow:false,
      tableData: [
        {
          cpmc: "产品",
          pxzt: "王小虎",
          pxxs: "上海市普陀区金沙江路 1518 弄",
          jhrq: "2018-08-08",
          fxrxm: "张三",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        },
        {
          cpmc: "产品",
          pxzt: "王小虎",
          pxxs: "上海市普陀区金沙江路 1518 弄",
          jhrq: "2018-08-08",
          fxrxm: "张三",
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
    // 能力培训
    handleTrain(){
      this.sspxShow = !this.sspxShow;  
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
  components: { tableLayout, xjjhDialog,sspxDialog }
};
</script>

<style scoped>
</style>
