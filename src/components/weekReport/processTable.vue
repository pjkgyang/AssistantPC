<template>
  <div class="weekTable-process-table">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="weekTable-process"
       @selection-change="handleSelectionChange">
      <el-table-column v-if="isSelect" type="selection"  width="55"></el-table-column>
      <el-table-column fixed="left" label="操作" width="150">
        <template slot-scope="scope">
          <span v-if="isPz"><el-button  @click="handleClickPz(scope.row)" type="text" size="small">批注 丨 </el-button></span>
          <span v-if="deleteShow && scope.row.szjh"><el-button style="color:red"  @click="handleClickDelete(scope.row,scope.$index)" type="text" size="small">删除 丨 </el-button></span>
          <!-- <span v-if="isEdit && !bjWordShow"><span class="table-hr"> 丨 </span><el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button></span> -->
          <span v-if="isEdit && bjWordShow"><el-button @click="handleClickEdit(scope.row)" type="text" size="small">{{isZj?'总结':'计划'}} 丨 </el-button></span>
          <span><el-button @click="handleClickCheck(scope.row)" type="text" size="small">查看</el-button></span>
        </template>
      </el-table-column>
      <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
      <el-table-column prop="xmmc" label="项目名称" width="350" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cpmc_display" label="产品名称" width="350" show-overflow-tooltip></el-table-column>
      <el-table-column prop="rwmc_display" label="任务名称"  width="200" show-overflow-tooltip></el-table-column>
      <el-table-column prop="gzms" label="工作内容" min-width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="wwcyy" label="未完成原因" min-width="200" v-if="wordShow" show-overflow-tooltip></el-table-column>
      <el-table-column prop="hxcs" label="后续措施" min-width="200" v-if="wordShow" show-overflow-tooltip></el-table-column>
      <el-table-column prop="cjrxm" label="创建人" width="100"></el-table-column>
      <el-table-column prop="zrrxm" label="责任人" width="100"></el-table-column>
      <el-table-column  label="批注" width="120" v-if="isPz">
        <template slot-scope="scope">
          <span>{{scope.row.pzzs==0?'无':scope.row.pzzs+'人次批注'}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="records > 0">
      <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="records">
          </el-pagination>
    </div>
  </div>
</template>

<script>
  import pagination from '@/components/BusinessPage/pagination.vue'
  export default {
    data() {
      return {
       
      }
    },
    props:{
      tableData:{
        type:Array,
        default:function(){
          return []
        }
      },
      pageSize:{
        type:Number,
        default:10
      },
      records:{
        type:Number,
        default:20
      },
      currentPage:{
        type:Number,
        default:1
      },
      isPz:{
        type:Boolean,
        default:true
      },
      isEdit:{
        type:Boolean,
        default:true
      },
      deleteShow:{
        type:Boolean,
        default:true
      },
      isSelect:{
        type:Boolean,
        defaule:false
      },
      bjWordShow:{
        type:Boolean,
        default:false
      },
      isZj:{
        type:Boolean,
        default:true
      },
      wordShow:{
        type:Boolean,
        default:false
      }
    },
    methods: {
      handleSizeChange(data){       // 每页条数
         this.$emit('handleSizeChange',data);
      },
      handleCurrentChange(data){ // （进度）分页
        this.$emit('handleCurrentChange',data);
      },
      handleClickCheck(row) { // （进度）查看
        this.$emit('handleClickCheck',row);
      },
      handleClickPz(row){ // （进度）批注
        this.$emit('handleClickPz',row);
      },
      handleClickDelete(row,index){
        this.$emit('handleClickDelete',row,index);
      },
      handleClickEdit(row){
        this.$emit('handleClickEdit',row);
      },
      handleSelectionChange(val){
        let widArr = [];
        val.forEach((ele,i,arr)=>{
             widArr.push(ele.wid)
        })
        this.$emit('handleSelectionChange',widArr)
      }
    },
    components:{pagination}
  }
</script>
<style scoped>
.weekTable-process .el-button{
    margin-left: 0px;
}
.weekTable-process .table-hr{
 color: #409EFF !important;
}

</style>