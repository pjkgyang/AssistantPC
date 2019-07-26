<template>
  <div >
      <section >
        <el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
          <el-table-column prop="wid" label="单据编号" show-overflow-tooltip  width="140">
          </el-table-column>
          <el-table-column prop="rwmc" label="任务名称" show-overflow-tooltip  min-width="240" >
          </el-table-column>
          <el-table-column prop="kfxzmc" label="开发性质" width="120">
          </el-table-column>
          <el-table-column prop="fwlxmc" label="服务类型"  width="120">
          </el-table-column>
          <el-table-column prop="ztmc" label="状态"  width="120">
          </el-table-column>
          <el-table-column prop="fbsj" label="发布时间"  width="160">
          </el-table-column>
          <el-table-column prop="xqfmc" label="需求方"  width="120">
          </el-table-column>
          <el-table-column prop="zbrmc" label="中标方"  width="120">
          </el-table-column>
          <el-table-column prop="zbje" label="中标金额"  width="120">
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
