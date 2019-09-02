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
                <el-table :data="tableData" style="width: 100%" :max-height="500" border>
                    <el-table-column prop="username" label="姓名" ></el-table-column>
                    <el-table-column prop="usercode" label="工号" ></el-table-column>
                    <el-table-column prop="dept" label="部门" ></el-table-column>
                    <el-table-column label="操作" min-width="110">
                        <template slot-scope="scope">
                            <el-button size="mini" :disabled="scope.row.ytj == 0" @click="handleAdd(scope.$index,scope.row)">{{!scope.row.ytj?'已添加':'添加'}}</el-button>
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
          tableData: [],
		  userDatas:[],
          inx:''
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
          if(!this.unitType){

	       if(!this.isdept){
			   this.userDatas[index].ytj = 0;
			   this.$set(this.tableData,index, this.userDatas[index]);
				this.$emit('addUserSuccess',row);
		   }else{
			  this.$post(this.API.saveZdcy,{
			     wid:'',
			     cyid:row.usercode,
			     cyxm:row.username,
			     qyzdwid:this.qyzdwid
			 }).then((res)=>{
			     if(res.state == 'success'){
			         this.$alert('添加成功', '提示', {
			         confirmButtonText: '确定',
			         type:'success',
			         callback: action => {
			            this.userDatas[index].ytj = 0;
			            this.$set(this.tableData,index, this.userDatas[index]);
			            this.$emit('addUserSuccess','');
			         }
			       });
			     }else{
                     this.$alert(res.msg, '提示', {
			         confirmButtonText: '确定',
			         type:'error'
			       });
                 }
			 })  
           }
          }else{
             this.$emit('addUserSuccess',this.unitType,row); 
          }
       },
       getUsers(){
           this.$get(this.API.getProjectUsers,{
                curPage: this.currentPage,
                pageSize: this.pageSize,
                unitType:!this.unitType?0:this.unitType,
                keyword: this.keyword,
                dept:!!this.isdept?'01AM':'',
                xmjldj:this.xmjldj
           }).then(res=>{
            if (res.state == "success") {
            if(!res.data || !res.data.rows){
                this.total  = 0
                this.tableData = []
            }else{
                 this.total = res.data.records;
                 this.tableData = res.data.rows;
                 this.tableData.forEach(ele=>{
                    ele.ytj = 1
                })
				this.userDatas = this.tableData;
              }
            }
           })
       }
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       qyzdwid:{
           type:String,
           default:''
       },
	   isdept:{
		   type:Boolean,
		   default:true
       },
       unitType:{
		   type:String,
		   default:''
       },
       xmjldj:{
          type:String,
		  default:'' 
       },
       dwbh:{
          type:String,
		  default:''  
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
