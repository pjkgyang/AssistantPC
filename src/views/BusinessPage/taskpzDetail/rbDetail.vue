<template>
    <div class="rbpzDetail">
        <div>
            <div>
                <rbTable :tableData="tableData" @handleCheckpzDetail="handleCheckpzDetail"></rbTable>
            </div>
            <div text-right>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 70, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <pzxqDialog :show.sync="show" :tableData="pzxqData" :rbshow="true"></pzxqDialog>
    </div>
</template>

<script>
import rbTable from "@/components/xmjdTable/rbList.vue";
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
        }],
      pzxqData:[]
    };
  },
  mounted(){
      this.pageProjectPanelWorkLogs();
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
        this.getLogCommentsForHomePageDetail(data);
        this.show = !this.show
    },
    pageProjectPanelWorkLogs(){
        this.$get(this.API.pageProjectPanelWorkLogs,{
            curPage:this.currentPage,
            pageSize:this.pageSize,
            xmbh:this.$route.query.xmbh,
            isAll:this.$route.query.isAll,
        }).then((res)=>{
            if(res.state == 'success'){
                if(!res.data.rows){
                    this.tableData = []
                }else{
                    this.tableData = res.data.rows
                }
                this.total = res.data.records
            }
        })
    },
    getLogCommentsForHomePageDetail(wid){
        this.$get(this.API.getLogCommentsForHomePageDetail,{
            wid:wid,
            isAll:this.$route.query.isAll
        }).then((res)=>{
            if(res.state == 'success'){
               if(!res.data){
                  this.pzxqData = []
               }else{
                  this.pzxqData = res.data
               }
            }
        })
    },
  },
  components: { rbTable,pzxqDialog }
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
