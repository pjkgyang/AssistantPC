<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <tableLayout>
        <section slot="top">
          <el-input placeholder="请输入产品版本号" size="mini" @input="handleSearchEnter" style="width:300px"></el-input>
          <el-button type="primary" size="mini">查询</el-button>
        </section>
        <section slot="bottom" style="margin-top:30px">
          <el-button type="primary" size="mini" @click="handleXjjh">新建计划</el-button>
          <!-- <el-button type="primary" size="mini" @click="handleNrjh">纳入计划</el-button> -->
          <!-- <el-button type="primary" size="mini">删除计划</el-button> -->
          <div style="margin:10px 0">
            <el-table :data="tableData" border style="width: 100%" >
              <el-table-column fixed="left" label="操作" width="220">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="mini" style="color:red !important" @click="handleDelete(scope.row)">删除</el-button>
                  <el-button v-if="scope.row.sfnr =='0'" type="text" size="mini" @click="handleNrjhOrTcjh(scope.row,'nrjh')">纳入计划</el-button>
                  <el-button v-if="scope.row.sfnr =='1' && scope.row.wtwid != questionData.wid" type="text" size="mini" style="color:red !important" @click="handleNrjhOrTcjh(scope.row,'tcjh')">剔除计划</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
              <el-table-column prop="pxzt" label="培训主题" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column  label="培训形式" min-width="200" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.pxxs==1?'线上直播':scope.row.pxxs==2?'线下培训':'线上加线下'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="jhpxsj" label="计划日期" width="110"></el-table-column>
              <el-table-column prop="fxrxm" label="分享人" width="110"></el-table-column>
              <el-table-column label="参与人员" width="110">
                 <template slot-scope="scope">
                      <a href="javaScript:;;" @click="handleCehckCyry(scope.row.wid)">{{scope.row.cyrs}}</a>
                  </template>
              </el-table-column>
              <el-table-column prop="cjsj" label="创建日期" width="180"></el-table-column>
              <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
              <el-table-column  label="纳入计划问题数" width="130">
                <template slot-scope="scope">
                      <a href="javaScript:;;" @click="handleCehckwts(scope.row.wid)">{{scope.row.jhwtzs}}</a>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
      </tableLayout>
       <div text-right>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <xjjh-dialog :show.sync="xjjhShow"  :isEdit="isEdit" :questionData="wtData" @handleSavesuccess="handleSavesuccess"></xjjh-dialog>
    <sspx-dialog :show.sync="sspxShow"></sspx-dialog>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import xjjhDialog from "@/components/dialog/wtfp/newPlan-ss.vue";
import sspxDialog from "@/components/dialog/wtfp/sspx-dialog.vue";
export default {
  data() {
    return {
      xjjhShow: false,
      sspxShow:false,
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total:0,
      keyword: "",

      wtData:this.questionData,
      isEdit:false
      
    };
  },
  props: {
    questionData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.pageCapacityPlan();
  },
  watch: {
    show(n, o) {
      if (n) {

        this.pageCapacityPlan();
      }
    }
  },
  methods: {
    // 参与人员
    handleCehckCyry(data){
       let routeData = this.$router.resolve({
        path: "/stafflist",
        query:{
          nljhwid:data
        }
      });
      window.open(routeData.href, "_blank");
    },
     // 跳转 
    handleCehckwts(data){
      let routeData = this.$router.resolve({
        path: "/report-list/gjjh",
        query:{
          jhwid:data,
          jhlx:'2'
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 纳入或剔除
     handleNrjhOrTcjh(params,param){
      this.$confirm(param=='nrjh'?"是否将此问题纳入计划?":"确定要剔除 "+this.questionData.bt+' 问题的改进计划吗?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(param=='nrjh'?this.API.addInPlan:this.API.removeFromPlan,{
          lx:2,
          wtwid:this.questionData.wid,
          wid:params.wid
        }).then(res=>{
          if(res.state == 'success'){
             this.$alert(param=='nrjh'?'纳入成功':'剔除成功', "提示", {confirmButtonText: "确定",type:'success'});
             this.pageCapacityPlan(); 
          }else{
            this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
          }
        })
      }).catch(() => {});
    },
    // 编辑
    handleEdit(data){
      this.isEdit = true;
      this.wtData = data;
      this.wtData.wtwid = this.questionData.wid;
      this.wtData.wtbt = this.questionData.bt;
      this.xjjhShow = !this.xjjhShow;
    },
    // 删除
    handleDelete(params){
       this.$confirm("是否确定将此计划删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(this.API.deleteCapacityPlan,{
          wid:params.wid
        }).then(res=>{
          if(res.state == 'success'){
             this.$alert('删除成功', "提示", {
              confirmButtonText: "确定",
              type:'success'
             });
            this.pageCapacityPlan();
          }else{
             this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
          }
        })
      }).catch(() => {});
    },
    // 新建成功
    handleSavesuccess(){
      this.pageCapacityPlan();
    },
    handleSizeChange(data){
      this.pageSize = data;
      this.currentPage = 1;
      this.pageCapacityPlan();
    },
    handleCurrentChange(data){
      this.currentPage = data;
      this.pageCapacityPlan();
    },
    handleSearchEnter() {
      this.currentPage = 1;
      this.pageCapacityPlan();
    },  


    // 新建计划
    handleXjjh() {
      this.isEdit = false;
      this.xjjhShow = !this.xjjhShow;
    },
    // 能力培训
    handleTrain(){
      this.sspxShow = !this.sspxShow;  
    },
    // 纳入计划
    handleNrjh() {
      this.$confirm("是否将此问题纳入计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          
      }).catch(() => {});
    },
    
    // 能力培训列表
    pageCapacityPlan() {
      this.$get(this.API.pageCapacityPlan, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        cpbh:this.questionData.cpbh,
        keyword: this.keyword,
        wtwid:this.questionData.wid
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.tableData = res.data.rows;
          } else {
            this.tableData = [];
          }
         this.total = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type:'error'
          });
        }
      });
    }
  },
  components: { tableLayout, xjjhDialog,sspxDialog }
};
</script>

<style scoped>
</style>
