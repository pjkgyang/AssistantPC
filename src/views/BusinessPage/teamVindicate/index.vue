<template>
    <div>
        <div class="layout-bgf">
            <el-card shadow="hover">
                 <filterComponent :filterList="filterList"></filterComponent>
            </el-card>
        </div>
        <div class="layout-bgf">
             <el-card shadow="hover">
                <el-table :data="tableData" border style="width:98%;margin:0 auto" :max-height="tableHeight">
                    <el-table-column fixed="left" label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button @click="handleClickDelete(scope.row)" type="danger" size="mini">删除</el-button>
                            <el-button @click="handleClickEdit(scope.row)" size="mini">编辑</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="qygc" label="区域工程" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zdmc" label="战队名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="zddzxm" label="战队队长" width="120"></el-table-column>
                    <el-table-column prop="sjldxm" label="上级领导姓名" width="120"></el-table-column>
                </el-table>
                <div text-right class="pd-10">
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
            </el-card>
        </div>
        <zdwh-dialog :show.sync="show" @handleAddUser="handleAddUser" @handleAddItem="handleAddItem"></zdwh-dialog>
        <user-dialog :show.sync="userShow"></user-dialog>
        <zdxm-dialog :show.sync="zdxmShow"></zdxm-dialog>
    </div>
</template>

<script>
 import filterComponent from "@/components/reportTable/filterComponent.vue";
 import zdwhDialog from "@/components/dialog/zdwh-dialog.vue";
 import userDialog  from '@/components/dialog/user-dialog.vue'
 import zdxmDialog  from '@/components/dialog/zdxm-dialog.vue'
 export default {
   data () {
     return {
         show:false,
         userShow:false,
         zdxmShow:false,
         filterList:['keyword','qygc'],
         tableHeight:window.innerHeight - 300,
         currentPage:1,
         pageSize:15,   
         total:0,
         tableData: [{
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }, {
          qygc: '上海区域工程',
          zdmc: 'xxx战队',
          zddzxm: 'xxx',
          sjldxm: '普陀区',
        }]
     }
   },
   methods: {
      handleClickEdit(row) {
        console.log(row)
        this.show = !this.show;
      },
      handleClickDelete(row){
          console.log(row)
      },
      handleAddUser(){
        this.userShow = !this.userShow;
      },
      handleAddItem(){
        this.zdxmShow = !this.zdxmShow;
      },
      handleCurrentChange(){

      },
      handleSizeChange(){

      },
    },
   components: { filterComponent,zdwhDialog,userDialog,zdxmDialog }
 }
</script>

<style scoped>
.layout-bgf{
    width: 95%;
    margin:10px auto;
}
 
</style>
