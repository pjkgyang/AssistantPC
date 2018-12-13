<template>
    <div>
        <el-dialog title="文档改进记录" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-pj">
                <wdjlSteps :jdList="jlList" ></wdjlSteps>
                <div v-if="!total" text-center class="mg-12">
                    暂无数据
                </div>
            </div>
            <div text-right v-if="total">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> 
            <div text-right class="pd-10">
                <el-button size="small" @click="visible = false">关闭</el-button>
           </div>
        </el-dialog>
    </div>
</template>

<script>
import wdjlSteps from "@/components/resource/wdjlSteps";
export default {
  data() {
    return {
      visible: this.show,
      wdjlShow: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      jlList: []
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleSizeChange(data){
        this.currentPage = data;
        this.pageFjGjjh();
    },
    handleCurrentChange(data){
        this.currentPage = 1;
        this.pageSize = data;
        this.pageFjGjjh();
    },
    pageFjGjjh() {
      this.$get(this.API.pageFjGjjh, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        wid: this.wid
      }).then(res => {
        if (res.state == "success") {
          if (!res.data || !res.data.rows.length) {
            this.jlList = [];
          } else {
            this.jlList = res.data.rows;
          }
          this.total = res.data.records;
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    wid: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {

      } else {
         this.pageFjGjjh(); 
      }
    }
  },
  components: { wdjlSteps }
};
</script>

<style scoped>
.dialog-pj {
  padding: 8px 10px;
}
.dialog-pj section:nth-of-type(2) {
  margin: 10px 0;
}
.pj-title {
  font-weight: 700;
  width: 14%;
}
.pj-content {
  width: 86%;
}
.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
