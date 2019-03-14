<template>
  <div >
    <el-dialog title="提醒记录" width="1000px" top="30px" :visible.sync="visible" :append-to-body="true" 
    :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
    <div style="padding:10px 15px">
        
          <el-table :data="tableData" style="width: 100%"  border :max-height="tableHeight">
             <el-table-column type="index" width="50" label="序号" ></el-table-column>
            <el-table-column prop="cjrxm" label="操作人" ></el-table-column>
            <el-table-column prop="cjsj" label="操作日期" ></el-table-column>
            <el-table-column prop="gcms" label="提醒对象" show-overflow-tooltip></el-table-column>
          </el-table>

        <div text-right class="mg-12">
          <el-button size="mini" @click="visible = false">关闭</el-button>
        </div>
    </div>
    
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableHeight: window.innerHeight - 350,

    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: ''
    },
  },
  methods: {
  
    // 分页
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.planImprovementProblemList();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.planImprovementProblemList();
    },

    listServiceExpired(){
      this.$get(this.API.listServiceExpired,{
        xmbh:this.xmbh
      }).then(res=>{
        if(res.state == 'success'){
            if(!res.data){
              this.tableData = []
            }else{
              this.tableData = res.data
            }
        }else{
           this.$message({
            message: res.msg,
            type: "error"
          });
        }
      })
    },

  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
      } else {
        this.listServiceExpired();
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
