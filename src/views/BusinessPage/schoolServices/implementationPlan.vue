<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <div class="mg-12">
        <el-button size="mini" type="primary" @click="handleAddFwsx">添加服务事项计划</el-button>
      </div>
      <div class="mg-12">
        <span class="filter-weight">填写日期：</span>
         <el-date-picker
          size="mini"
          @change="handleChangeTxrq"
          v-model="filterData.txrqStart"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker> 至
         <el-date-picker
          size="mini"
           @change="handleChangeTxrq"
          v-model="filterData.txrqEnd"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="txrq" label="填写日期" width="110"></el-table-column>
        <el-table-column prop="dwmc" label="学校" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fwmc" label="服务事项名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bmmc" label="部门名称" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fwdx" label="服务对象" min-width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="fwlb" label="服务类别" min-width="100"></el-table-column>
        <el-table-column prop="xxhzc" label="信息化支持" min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.xxhzc==1?'是':'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="fwznzrr" label="服务指南责任人" width="120"></el-table-column>
        <el-table-column prop="fwznwcsj" label="服务指南完成时间" width="140"></el-table-column>
        <el-table-column prop="kfzrr" label="开发责任人" width="100"></el-table-column>
        <el-table-column prop="kfwcsj" label="开发完成时间" width="110"></el-table-column>
        <el-table-column prop="sszrr" label="实施责任人" width="100"></el-table-column>
        <el-table-column prop="sswcsj" label="实施完成时间" width="110"></el-table-column>
        <el-table-column fixed="left" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditSsjh(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color:#f00" @click="handleDeleteSsjh(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
        layout="total, prev, pager, next" :total="records">
      </el-pagination>
    </div>

    <el-dialog title="添加实施计划" :visible.sync="dialogVisible" width="1200px">
      <div>
        <serviceItem :isPlan="true" @handleAddSsjh="handleAddSsjh"></serviceItem>
      </div>
    </el-dialog>
    <ssjhDailog :show.sync="ssjhShow" :curData="curData" @handleCommitSSjh="handleCommitSSjh" :zbwid="curData.zbwid"></ssjhDailog>
  </div>
</template>

<script>
  import serviceItem from '@/views/BusinessPage/schoolServices/serviceitem';
  import ssjhDailog from '@/views/BusinessPage/schoolServices/ssjh-dialog.vue';
  export default {
    data() {
      return {
        ssjhShow: false,
        dialogVisible: false,
        currentPage: 1,
        pageSize: 15,
        records: 0,
        filterData:{
          txrqStart:'',
          txrqEnd:''
        },
        tableData: [],
        curData: {} //当前计划
      }
    },
    mounted() {
      this.pageServiceItemPlan();
    },
    methods: {
      handleChangeTxrq(){
        this.currentPage = 1;
        this.pageServiceItemPlan();
      },
      // 添加服务事项计划
      handleAddSsjh(data) {
        this.curData = {};
        this.curData.zbwid = data.wid;
        this.ssjhShow = true;
      },

      // 编辑实施计划
      handleEditSsjh(data) {
        this.curData = data;
        this.ssjhShow = true;
      },
      // 删除实施计划
      handleDeleteSsjh(data){
        this.$confirm('是否确认删除此计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.$post(this.API.deleteServiceItemPlan,{
           wid:data.wid
         }).then(res=>{
           if(res.state == 'success'){
             this.$message({message:'删除成功',type:'success'});
             this.pageServiceItemPlan();
           }else{
             this.$message({message: res.msg, type: 'error'});
           }
         })
        }).catch(() => {});
      },
      
      // 提交计划
      handleCommitSSjh(params) {
        let formData = params;
        formData.zbwid = this.curData.zbwid;
        // formData.wid = this.curData.wid;
        this.saveServiceItemPlan(formData);
      },

      // x
      handleAddFwsx() {
        this.dialogVisible = true;
      },

      handleCurrentChange(data) {
        this.currentPage = data;
        this.pageServiceItemPlan();
      },

      // 服务计划
      saveServiceItemPlan(data) {
        this.$post(this.API.saveServiceItemPlan, data).then(res => {
          if (res.state == 'success') {
            this.pageServiceItemPlan();
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            if(JSON.stringify(this.curData) != '{}'){
                this.ssjhShow = false;
            }
            // this.ssjhShow = false;
            // this.dialogVisible = false;
          } else {
            this.$message({message: res.msg, type: 'error'});
          }
        })
      },

      // 获取服务事项计划列表
      pageServiceItemPlan() {
        this.$get(this.API.pageServiceItemPlan, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          txrqStart:!this.filterData.txrqStart?'':this.filterData.txrqStart,
          txrqEnd:!this.filterData.txrqEnd?'':this.filterData.txrqEnd
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
    components: {
      serviceItem,
      ssjhDailog
    },
  }
</script>

<style>
</style>
