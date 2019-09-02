<template>
  <div class="dialog-container">
    <el-dialog
      title="待处理事项"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="pd-10">
        <div>
          <el-button size="mini" type="success" @click="handleAddDclsx" v-if="!zt || zt == '0' ">添加待处理事项</el-button>
        </div><br>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed="left" label="操作" width="100">
              <template slot-scope="scope">
                  <el-button v-if="scope.row.editBtn == '1'" type="text" size="mini" @click="handleOprate('edit',scope.row,scope.$index)">编辑</el-button>
                  <el-button v-if="scope.row.delBtn == '1'" type="text" size="mini" style="color:#f00" @click="handleOprate('delete',scope.row,scope.$index)">删除</el-button>
              </template>
           </el-table-column>
          <el-table-column prop="clsxmc" label="待处理事项" min-width="180"></el-table-column>
          <el-table-column prop="gszrr" label="公司责任人" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xxzrr" label="学校责任人" width="100" show-overflow-tooltip></el-table-column>
          <el-table-column prop="dsfzrr" label="第三方责任人" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="jhwcsj" label="计划完成时间" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sjwcsj" label="实际完成时间" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="sxwczt_display" label="完成状态" width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="gzr" label="关注人" width="180" show-overflow-tooltip></el-table-column>
        </el-table>

        <div text-right>
           <el-pagination  @current-change="handleCurrentChange" :current-page="currentPage"
            :page-size="pageSize" layout="total,  prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EventBus } from "@/utils/util.js";
export default {
  data() {
    return {
      visible: this.show,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      tableData:[]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    wid: {
      type: String,
      default: ""
    },
    zt: {
      type: String,
      default: ""
    }
  },
  mounted(){
   
  },
  components: {},
  methods: {

      // 编辑或删除
      handleOprate(type,params,index){
        if(type == 'edit'){
          this.$emit('handleAddDclsx',params.matterWid);
        }else{
          this.$confirm('是否删除此条事项?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$post(this.API.deleteMatter,{
              mattergwid:params.matterWid
            }).then(res=>{
              if(res.state == 'success'){
                this.$message({message: "删除成功", type: "success"});
                this.tableData.splice(index,1);
              }else{
                this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
              }
            })
          }).catch(() => {});
        }
      },
      // 添加待处理事项
      handleAddDclsx(){
        this.$emit('handleAddDclsx','')
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.pageMatter();
      },
      //获取待处理事项列表
      pageMatter(){
        this.$get(this.API.pageMatter,{
          curPage:this.currentPage,
          pageSize:this.pageSize,
          meetingWid:this.wid
        }).then(res=>{
          if(res.state == 'success'){
            if(!!res.data.rows){
               this.tableData = res.data.rows;
            }else{
              this.tableData = []
            }
            this.total = res.data.records;
          }else{
             this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});  
          }
        })
      }
  },
  watch: {
    show(n,o) {
      this.visible = this.show;
      if(!!n){
        this.pageMatter();
         EventBus.$on("handleCommitDclsx", param => {
            this.pageMatter();
        });
      }else{
        EventBus.$off('handleCommitDclsx', '');
      }
    }
  }
};
</script>
<style scoped lang="scss">
</style>
