<template>
    <div>
        <div text-right class="addBtn">
            <el-button size="small" type="danger" @click="handleAddyj">添加补充意见</el-button>
        </div>
        <div >
            <steps-component :jdList="jdList"  @handleSucess="handleSucess"></steps-component>
            <div v-if="!jdList.length" text-center class="mg-12">
                暂无记录
            </div>
        </div>
        <div text-right v-if="!!jdList.length">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import stepsComponent from '@/components/resource/steps' 
export default {
  data() {
    return {
      activeName: "9",
    };
  },

  props: {
    jdList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileCounts: {
      type: Object,
      default: () => {
        return {};
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 15
    },
    total: {
      type: Number,
      default: 0
    },
    isSvn:{
        type:Boolean,
        default:false
    }
  },
  methods: {
    handleSucess(){
      this.$emit('handleSucess','')
    },
    handleAddyj(){
      this.$emit('handleAddyj','')
    },
    handleClick(tab, event) {
      this.$emit("hadnleChangeTab", this.activeName);
    },
    handleSizeChange(data) {
      this.$emit("hadnleChange", data, "size");
    },
    handleCurrentChange(data) {
      this.$emit("hadnleChange", data, "cur");
    }
  },
  components: {stepsComponent}
};
</script>

<style lang="scss" scoped>
.addBtn{
    padding: 12px 0;
    margin: 12px 0;
    border-top: 1px solid #e4e7ed;
}
</style>
