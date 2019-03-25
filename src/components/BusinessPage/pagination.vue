<template>
  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total,prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleSizeChange(val) {}
  }
};
</script>
<style scoped>
</style>
