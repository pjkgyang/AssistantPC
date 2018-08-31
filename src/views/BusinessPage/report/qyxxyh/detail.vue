<template>
  <div class="pd-10">
      <tableLayout :title="title">
          <div slot="bottom" >
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                :max-height="tableHeight">
                  <el-table-column v-for="(data,index) in headData" :key="index"  :label="data.zh"
                    show-overflow-tooltip :width="data.zh=='项目经理'||data.zh=='是否在谈'||data.zh=='是否购销'?100:data.zh=='项目名称'?300:''">
                        <template slot-scope="scope" >
                            <span @click="handleScope(scope,data)">{{scope.row[index]}}</span>
                    </template>
                 </el-table-column>
            </el-table>
            <div class="project-fbtable mg-12" text-right>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 70, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
          </div>
      </tableLayout>
 </div>
</template>

<script>
import tableLayout from '@/components/layout/tableLayout.vue'
 export default {
   data () {
     return {
         tableHeight: window.innerHeight - 120,
         tableData:[],
          currentPage:1,
          pageSize:50,
          total:0,
          Data:{},
          id:'',
          headData:[],
          title:''
     }
   },
   mounted(){
       switch(this.$route.params.id){
           case 'school':
            this.title = '区域学校用户 — 学校列表';
            document.title = '区域学校用户 — 学校'
           break;
           case 'user':
            this.title = '区域学校用户 — 用户列表';
            document.title = '区域学校用户 — 用户列表'
           break;
           case 'project':
             this.title = '区域学校用户 — 项目列表';
             document.title = '区域学校用户 — 项目列表'
           break;
           default:
           break;
       }
      
       this.getDetailData(1);
   },
   methods:{
       handleScope(data,params){
           console.log(data)
           console.log(params)
       },
       getDetailData(curPage){ 
            this.Data = this.$route.query;
            this.Data.curPage = curPage
            this.Data.pageSize = this.pageSize
            this.queryRegionSchoolDetailData(this.Data);
       },
       queryRegionSchoolDetailData(obj){
            this.$get(this.API.queryRegionSchoolDetailData,obj).then(res=>{
                if(res.state == 'success'){
                    this.tableData = res.data.body.rows
                    this.headData = res.data.head
                    this.total =  res.data.body.records
                }
            })
       },
       handleCurrentChange(data){
           this.currentPage = data;
           this.getDetailData(data);
       },
       handleSizeChange(data){
           this.pageSize = data;
           this.currentPage = 1;
           this.getDetailData(1);
       }
   },
   components: {tableLayout}
 }
</script>

<style scoped>

 
</style>
