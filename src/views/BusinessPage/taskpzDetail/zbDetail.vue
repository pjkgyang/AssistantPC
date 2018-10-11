<template>
    <div class="rbpzDetail">
        <div>
            <div>
                <zbTable :tableData="tableData" @handleCheckpzDetail="handleCheckpzDetail"></zbTable>
            </div>
            <div text-right>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 70, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <pzxqDialog :show.sync="show"></pzxqDialog>
    </div>
</template>

<script>
import zbTable from "@/components/xmjdTable/zbList.vue";
import pzxqDialog from '@/components/dialog/pzdetail/pzxq-dialog.vue'
export default {
  data() {
    return {
      show:false,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [{
            cjrxm:'张三',
            xmbh:'uk123123',
            xmmc:'卡仕达金坷垃华盛顿科技阿什顿'
        }]
    };
  },
  methods: {
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    handleCheckpzDetail(data){
        this.show = !this.show
    }
  },
  components: { zbTable,pzxqDialog }
};
</script>

<style lang="scss" scoped>
.rbpzDetail {
  padding: 15px;
  >div{
      background: #fff;
      padding: 10px;
      border-radius: 4px;
  }
}
</style>
