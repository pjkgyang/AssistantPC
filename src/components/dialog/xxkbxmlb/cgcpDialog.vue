<template>
  <div >
    <el-dialog title="采购产品详情" width="1100px" top="30px" :visible.sync="visible" :append-to-body="true" 
    :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
    <div style="padding:10px 15px">
        
          <el-table :data="tableData" style="width: 100%"  border :max-height="tableHeight">
            <el-table-column prop="ywx" label="业务线" ></el-table-column>
            <el-table-column prop="cpmc" label="产品名称" show-overflow-tooltip></el-table-column>
          </el-table>
        <!-- <div text-right v-if="!!tableData.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div> -->
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
      multipleSelection: [],
      wtwidArr: [],
      tableHeight: window.innerHeight - 350,

    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh:{
        type:String,
        dafault:''
    }
  },
  methods: {

    listHtnrApp(){
      this.$get(this.API.listHtnrApp,{
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
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
      } else {
       this.listHtnrApp();
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
