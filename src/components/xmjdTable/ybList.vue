<template>
    <div>
        <el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
            <el-table-column label="批注" width="120">
                <template slot-scope="scope">
                    <span class="spanHover" @click="handleCheckpzDetail(scope.row)">0人批注</span>
                </template>
            </el-table-column>
            <el-table-column prop="cjrxm" label="填写人" width="80"></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip  width="120"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip width="260"></el-table-column>
            <el-table-column prop="gcms" label="内容" show-overflow-tooltip min-width="500"></el-table-column>
            <el-table-column prop="cpmc_display" label="产品名称" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="rwmc_display" label="任务名称" show-overflow-tooltip width="150"></el-table-column>
            <el-table-column prop="gcrq" label="日报日期" width="110" sortable></el-table-column>
            <el-table-column prop="cjsj" label="填写时间" width="160" sortable></el-table-column>
            <el-table-column prop="gs" label="工时(小时)" width="90"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
        tableHeight:window.innerHeight - 120
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
  methods:{
      handleCheckpzDetail(data){
          this.$emit('handleCheckpzDetail',data)
      }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.spanHover{
    color: #409EFF;
    &:hover{ 
        cursor: pointer;
    }
}
</style>
