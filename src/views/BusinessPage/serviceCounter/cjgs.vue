<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <div class="mg-12">
        <chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool>  
        <br>
        <el-button size="mini" type="primary" @click="handleAddCjgs">添加承建单位</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="mc" label="承建公司"></el-table-column>
        <el-table-column prop="cjrxm" label="创建人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cjsj" label="创建时间"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="bmmc" label="是否金智" >
          <template slot-scope="scope">
            <span>{{scope.row.sfjz=='0'?'否':'是'}}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="left" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditCjgs(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color:#f00" @click="handleDeleteCjgs(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        layout="total, prev, pager, next" :total="records">
      </el-pagination>
    </div>

	<cjgsDiloag :show.sync="cjgsShow" :dataInfo="curData" :curDept="curDept" @handleCommit="handleCommit"></cjgsDiloag>
  
  </div>
</template>

<script>
  import cjgsDiloag from '@/views/BusinessPage/serviceCounter/cjgs-dialog';
  import chooseSchool from "@/components/BusinessPage/chooseSchool.vue";
  export default {
    data() {
      return {
        cjgsShow: false,
        currentPage: 1,
        pageSize: 15,
        records: 0,
        filterData:{
          txrqStart:'',
          txrqEnd:''
        },
        tableData: [],
        curData: {},
        curDept:{}
      }
    },
    mounted() {
      this.pageCjdw();
    },
    methods: {
       // 更换单位
      handleChangeUnit(params) {
        this.curDept = params;
      },
      // 添加承建公司
      handleCommit(){
        this.currentPage = 1;
        this.pageCjdw();
      },
         // x
      handleAddCjgs() {
        this.curData = {};
        this.cjgsShow = true;
      },

      handleEditCjgs(data) {
        this.curData = data;
        this.cjgsShow = true;
      },

      // 删除实施计划
      handleDeleteCjgs(data){
        this.$confirm('是否确认删除此计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.$post(this.API.deleteCjdw,{
           wid:data.wid
         }).then(res=>{
           if(res.state == 'success'){
             this.$message({message:'删除成功',type:'success'});
             this.pageCjdw();
           }else{
             this.$message({message: res.msg, type: 'error'});
           }
         })
        }).catch(() => {});
      },


      handleCurrentChange(data) {
        this.currentPage = data;
        this.pageCjdw();
      },

      pageCjdw() {
        this.$get(this.API.pageCjdw, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          dwmc:this.curDept.dwmc,
          dwbh:this.curDept.dwbh
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.tableData = []
            } else {
              this.tableData = res.data.rows;
            }
            this.records = res.data.records;
          } else {

          }
        })
      }
    },
    components: {cjgsDiloag,chooseSchool},
  }
</script>

<style>
</style>
