<template>
  <div >
      <section >
        <el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
        <!--  <el-table-column prop="wid" label="单据编号" show-overflow-tooltip  width="320">
          </el-table-column> -->
          <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip  >
          </el-table-column>
          <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="kmmc" label="科目名称" >
          </el-table-column>
          <el-table-column prop="bxrmc" label="报销人"  >
          </el-table-column>
          <el-table-column prop="bxsqrq" label="报销申请时间"  >
          </el-table-column>
          <el-table-column prop="bxwcrq" label="报销完成时间"  >
          </el-table-column>
          <el-table-column prop="fycdrmc" label="费用承担人"  >
          </el-table-column>
          <el-table-column prop="je" label="报销金额" >
          </el-table-column>
          <el-table-column prop="sy" label="事由" >
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
        return [];
      }
    }
  },
  components: {  }
};
</script>

<style scoped>

</style>
