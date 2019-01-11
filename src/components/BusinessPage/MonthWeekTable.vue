<template>
 <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      class="table-first"
      @selection-change="handleSelectionChange">
      <el-table-column v-if="isSelect" type="selection"  width="55"></el-table-column>
      <el-table-column fixed="left" label="操作" width="150" v-if="selectShow">
        <template slot-scope="scope">
          <span v-if="ispz"><el-button @click="handleClickPz(scope.row)" type="text" size="small">批注 丨 </el-button></span>
          <span v-if="isDelete"><el-button style="color:red"  type="text" size="small"  @click="handleClickDelete(scope.row,scope.$index)">删除 丨 </el-button></span>
          <!-- <span v-if="!bjWordShow"><span class="table-hr" v-if="isDelete || ispz"> 丨 </span><el-button  type="text" size="small"  @click="handleClickEdit(scope.row,scope.$index)">编辑</el-button></span> -->
          <span v-if="bjWordShow"><el-button  type="text" size="small"  @click="handleClickEdit(scope.row,scope.$index)">{{isZj?'总结':'计划'}} 丨 </el-button></span>
          <span><el-button @click="handleClickCheck(scope.row)" type="text" size="small">查看</el-button></span>
        </template>
      </el-table-column>
      <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
      <el-table-column prop="xmmc" label="项目名称" width="350" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="lcbbh" label="里程碑编号" width="150" show-overflow-tooltip></el-table-column> -->
      <el-table-column prop="xmnr_display" label="项目内容" min-width="300" show-overflow-tooltip></el-table-column>
      <el-table-column prop="lcbms_display" label="里程碑描述"  width="180" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="gznr" label="工作内容"  width="180" show-overflow-tooltip v-if="gznrShow"></el-table-column> -->
      <el-table-column prop="cnjssj" label="承诺完成时间" width="120"></el-table-column>
      <el-table-column prop="jhjssj" label="计划完成时间" width="120"></el-table-column>
      <el-table-column prop="zt_display" label="完成状态" width="120"></el-table-column>
      <el-table-column prop="wwcyy" label="未完成原因" width="120" show-overflow-tooltip v-if="wordShow"></el-table-column>
      <el-table-column prop="hxcs" label="后续措施" width="120" show-overflow-tooltip v-if="wordShow"></el-table-column>
      <el-table-column prop="wglg" label="完工量（元）" width="120" v-if="otherShow"></el-table-column>
      <el-table-column prop="yhmc" label="创建人" width="100" ></el-table-column>
      <el-table-column prop="cjsj" label="创建时间" width="155" ></el-table-column>
      <!-- 2019.1.11 xiugai -->
      <el-table-column prop="zhxgsj" label="操作时间" width="155" ></el-table-column> 
      <el-table-column prop="xmjlxm" label="项目经理" width="100"></el-table-column>
      <el-table-column prop="zddzxm" label="战队队长" width="100"></el-table-column>
      <el-table-column prop="zrrxm" label="责任人" width="100" ></el-table-column>
      <el-table-column prop="htje" label="合同金额(元)" width="110" v-if="otherShow"></el-table-column>
      <el-table-column prop="htmsr" label="合同毛收入(元)" width="120" v-if="otherShow"></el-table-column>
      <el-table-column label="批注" width="100" v-if="ispz">
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
          <!-- <pagination :pageSize="pageSize" :total="records" :currentPage="currentPage" @handleCurrentChange="handleCurrentChange"></pagination> -->
    </div>
  </div>
</template>

<script>
  import pagination from '@/components/BusinessPage/pagination.vue'
  export default {
    data() {
      return {
          widArr:[]
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
      ispz:{
        type:Boolean,
        default:true
      },
      isEdit:{
        type:Boolean,
        default:false
      },
      isDelete:{
        type:Boolean,
        default:false
      },
      wordShow:{
         type:Boolean,
         default:true
      },
      isSelect:{
        type:Boolean,
        default:false
      },
      otherShow:{
        type:Boolean,
        default:false
      },
      gznrShow:{
        type:Boolean,
        default:false
      },
      selectShow:{
        type:Boolean,
        default:true
      },
      isZj:{
        type:Boolean,
        default:true
      },
      bjWordShow:{
        type:Boolean,
        default:false
      },
    },
    methods: {
      handleSizeChange(val){
         this.$emit('handleSizeChange',val);
      },
      handleCurrentChange(data){
         this.$emit('handleCurrentChange',data)
      },
      handleClickCheck(row) {
        this.$emit('handleClickCheck',row)
      },
      handleClickPz(row){
        this.$emit('handleClickPz',row)
      },
      handleClickEdit(row,index){
         this.$emit('handleClickEdit',row,index)
      },
      handleClickDelete(row,index){
         this.$emit('handleClickDelete',row,index)
      },
      handleSelectionChange(val){
         this.widArr = [];
         val.forEach((ele,i,arr)=>{
           if(ele.ygzWid){
              this.widArr.push(ele.ygzWid)
           }else if(ele.zgzWid){
              this.widArr.push(ele.zgzWid)
           }
           
         })
         this.$emit('handleSelectionChange',this.widArr)
      }
    },
    components:{pagination}
  }
</script>
<style>
.table-first .el-button{
    margin-left: 0px;
}
.table-first .table-hr{
 color: #409EFF !important;
}
</style>