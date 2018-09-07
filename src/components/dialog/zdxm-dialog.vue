<template>
 <div>
     <el-dialog
            title="项目列表"
            width="1000px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <tableLayout style="padding:0 10px;">
                <section slot="top">
                     <el-input size="mini"  placeholder="请搜索项目编号/项目名称"  suffix-icon="el-icon-search" v-model="keyword" @change="handleSearchUser"></el-input>
                </section>
                <section slot="bottom">
                <el-table :data="tableData" style="width: 100%" :max-height="580" border>
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" ></el-table-column>
                    <el-table-column label="操作" width="110">
                        <template slot-scope="scope">
                            <el-button size="mini" :disabled="scope.row.ytj == 0" @click="handleAdd(scope.$index, scope.row)">{{!scope.row.ytj?'已添加':'添加'}}</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </section>
            </tableLayout>
            <div text-right class="pd-10">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                 </el-pagination>
            </div>
      </el-dialog>
 </div>
</template>

<script>
 import tableLayout  from '@/components/layout/tableLayout.vue'
 import {  getProjects } from "@/api/xmkb.js";
 export default {
   data () {
     return {
          visible:this.show,
          keyword:'',
          currentPage:1,
          pageSize:15,
          total:0,
          filters:[
                { text: "在建", value: "在建" },
                { text: "售后", value: "售后" },
                { text: "过保", value: "过保" },
                { text: "已关闭",value: "已关闭" },
            ],
          tableData: []
     }
   },
   methods:{
       handleCurrentChange(data){
           this.currentPage = data;
           this.getTeamProjects();
       },
       handleSizeChange(data){
           this.pageSize = data;
           this.currentPage = 1;
           this.getTeamProjects();
       },
       handleSearchUser(){
          this.currentPage = 1;
          this.getTeamProjects();
       },
       handleAdd(index,row){        //添加
            this.$post(this.API.addTeamProject,{
                xmbh:row.xmbh,
                qyzdwid:this.qyzdwid
            }).then((res)=>{
                if(res.state == 'success'){
                    this.$alert('添加成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                       row.ytj = 0
                       this.$emit('addProjectSuccess','')
                    }
                  });
                }
            })
       },
        getTeamProjects(){      // 获取项目列表
            this.$get(this.API.pageTeamProjects,{
                curPage:this.currentPage,
                pageSize:this.pageSize,
                qyzdwid:'',
                keyword:this.keyword
            }).then((res)=>{
                if(res.state == 'success'){
                    if(!!res.data.rows){
                        res.data.rows.forEach(element => {
                            element.ytj = 1
                        });
                        this.tableData = res.data.rows
                        this.total = res.data.records
                    }
                }
            }) 
        },
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       qyzdwid:{
           type:String,
           default:''
       }
   },
     watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{
                this.currentPage = 1;
               this.getTeamProjects();
            }
        }
    },
   components: {tableLayout}
 }
</script>

<style scoped>

 
</style>
