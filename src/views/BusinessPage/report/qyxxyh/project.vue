<template>
  <div class="pd-10">
      <tableLayout :title="'区域学校用户 — 用户列表'">
          <div slot="bottom">
            <el-table
                :data="tableData"
                border
                style="width: 100%:background:#fff"
                :max-height="tableHeight">
                <el-table-column prop="qymc"  label="区域工程"></el-table-column>
                <el-table-column prop="dwmc" label="学校名称" ></el-table-column>
                <el-table-column prop="yhmc" label="用户名称"></el-table-column>
                <el-table-column prop="userid" label="用户账号（手机号）"></el-table-column>
                <el-table-column prop="email" label="用户邮箱"></el-table-column>
                <el-table-column prop="cjrq" label="创建日期"></el-table-column>
                <el-table-column prop="sex" label="性别"></el-table-column>
                <el-table-column prop="bm" label="部门"></el-table-column>
                <el-table-column prop="dlrq" label="最后登录日期"></el-table-column>
            </el-table>
            <div class="project-fbtable mg-12" text-right >
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 50, 70, 100]"
                    :page-size="50"
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
         tableData: [{
            qymc: '2016-05-02',
            dwmc: '王小虎',
            yhmc: '上海市普陀区金沙江路 1518 弄',
            userid:'111111111',
            email:'378846587@qq.com',
            cjrq:'1888-08-08',
            sex:'男',
            bm:'部门',
            dlrq:'2088-08-08'
          }, {
            qymc: '2016-05-02',
            dwmc: '王小虎',
            yhmc: '上海市普陀区金沙江路 1518 弄',
            userid:'111111111',
            email:'378846587@qq.com',
            cjrq:'1888-08-08',
            sex:'男',
            bm:'部门',
            dlrq:'2088-08-08'
          }, {
            qymc: '2016-05-02',
            dwmc: '王小虎',
            yhmc: '上海市普陀区金沙江路 1518 弄',
            userid:'111111111',
            email:'378846587@qq.com',
            cjrq:'1888-08-08',
            sex:'男',
            bm:'部门',
            dlrq:'2088-08-08'
          }, {
            qymc: '2016-05-02',
            dwmc: '王小虎',
            yhmc: '上海市普陀区金沙江路 1518 弄',
            userid:'111111111',
            email:'378846587@qq.com',
            cjrq:'1888-08-08',
            sex:'男',
            bm:'部门',
            dlrq:'2088-08-08'
          },],
          currentPage:1,
          total:200
     }
   },
   mounted(){
       document.title = '区域学校用户 — 项目'
   },
   methods:{
       handleCurrentChange(data){

       },
       handleSizeChange(data){

       }
   },
   components: {tableLayout}
 }
</script>

<style scoped>

 
</style>
