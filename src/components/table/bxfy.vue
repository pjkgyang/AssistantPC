<template>
  <div >
      <section >
        <el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
          <el-table-column prop="wid" label="单据编号" show-overflow-tooltip  width="320">
          </el-table-column>
          <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip  width="140">
          </el-table-column>
          <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip min-width="240">
          </el-table-column>
          <el-table-column prop="kmmc" label="科目名称" width="120">
          </el-table-column>
          <el-table-column prop="bxrmc" label="报销人"  width="120">
          </el-table-column>
          <el-table-column prop="bxsqrq" label="报销申请时间"  width="120">
          </el-table-column>
          <el-table-column prop="bxwcrq" label="报销完成时间"  width="160">
          </el-table-column>
          <el-table-column prop="fycdrmc" label="费用承担人"  width="120">
          </el-table-column>
          <el-table-column prop="je" label="报销金额"  width="120">
          </el-table-column>
        </el-table>
      </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight:window.innerHeight - 150
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄"
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄"
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄"
          }
        ];
      }
    }
  },
  components: {  }
};
</script>

<style scoped>

</style>
