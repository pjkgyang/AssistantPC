<template>
 <div>
     <el-dialog
            title="人员列表"
            width="1000px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <tableLayout style="padding:0 10px;">
                <section slot="top">
                     <el-input size="mini"  placeholder="请搜索人员姓名/工号/部门"  suffix-icon="el-icon-search" v-model="keyword" @change="handleSearchUser"></el-input>
                </section>
                <section slot="bottom">
                <el-table :data="tableData" style="width: 100%" :max-height="580" border>
                    <el-table-column prop="username" label="姓名" ></el-table-column>
                    <el-table-column prop="usercode" label="工号" ></el-table-column>
                    <el-table-column prop="dept" label="部门" ></el-table-column>
                    <el-table-column label="操作" width="110">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
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
 import {  getUsers } from "@/api/personal.js";
 export default {
   data () {
     return {
          visible:this.show,
          keyword:'',
          currentPage:1,
          pageSize:15,
          total:200,
          tableData: []
     }
   },
   methods:{
       handleCurrentChange(data){
           this.currentPage = data;
           this.getUsers();
       },
       handleSizeChange(data){
           this.pageSize = data;
           this.currentPage = 1;
           this.getUsers();
       },
       handleSearchUser(){
           this.getUsers();
       },
       handleAdd(index,row){        //添加
          
       },
       getUsers(){
           getUsers({
            curPage: this.currentPage,
            pageSize: this.pageSize,
            unitType:0,
            keyword: this.keyword
        }).then(({ data }) => {
            if (data.state == "success") {
            if(!data.data || !data.data.rows.length){
                this.total  = 0
                this.tableData = []
            }else{
                this.total = data.data.records;
                this.tableData = data.data.rows;
              }
            }
        });
       }
   },
   props:{
       show:{
           type:Boolean,
           default:false
       }
   },
     watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{
                this.getUsers();
            }
        }
    },
   components: {tableLayout}
 }
</script>

<style scoped>

 
</style>
