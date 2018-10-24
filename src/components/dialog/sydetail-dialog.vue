<template>
  <div>
    <el-dialog :title="title" width="1000px" top="0" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-jd">
        <p>{{sm}}</p>
        <tableComponents :tableData="tableData" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" 
        @handleCurrentChange="handleCurrentChange" :indexArr='[]' :widthArr="[0,1,2]" :Width="'120'" :Height="300"
        :exportShow="false"></tableComponents>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableComponents from "@/components/reportTable/tableComponents.vue";
export default {
  data() {
    return {
      visible: this.show,
      tableHeight: window.innerHeight - 210
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tableData: {
      tyep: Object,
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
    title:{
      type:String,
      default:''
    },
    sm:{
      type:String,
      default:''  
    }
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleCurrentChange(data) {
      this.$emit("handleCurrentChange", data);
    }
  },

  watch: {
    show(n, o) {
      this.visible = this.show;
    }
  },
  components: { tableComponents }
};
</script>

<style scoped>
.dialog-jd {
  padding: 10px;
}
</style>
