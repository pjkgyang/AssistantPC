<template>
 <div>
      <el-dialog
            title="战队维护"
            width="80%"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-zdwh">
                <tableLayout :title="'战队成员管理'">
                    <section slot="top">
                        <el-button type="primary" size="mini" @click.native='handleAddUser'>添加成员</el-button>
                        <el-button type="danger" size="mini" @click.native='handleDeleteUser'>删除成员</el-button>
                    </section>
                    <section slot="bottom">
                          <el-table
                            ref="multipleTable"
                            :data="memberData"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            :max-height="270"
                            @selection-change="handleSelectionChangeUser">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column label="日期" width="120">
                                 <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column prop="name" label="姓名"  width="120"></el-table-column>
                            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div text-right>
                              <el-pagination
                                @current-change="handleCurrentChangeUser"
                                :current-page="currentPageItem"
                                :page-size="pageSize"
                                 layout="total,  prev, pager, next, jumper"
                                :total="userTotal">
                             </el-pagination>
                        </div>
                    </section>
                </tableLayout>
                <tableLayout :title="'战队项目管理'">
                    <section slot="top">
                        <el-button type="primary" size="mini" @click.native='handleAddItem'>添加项目</el-button>
                        <el-button type="danger" size="mini" @click.native='handleDeleteItem'>删除项目</el-button>
                    </section>
                    <section slot="bottom">
                          <el-table
                            ref="multipleTable"
                            :data="memberData"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            :max-height="270"
                            @selection-change="handleSelectionChangeItem">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column label="日期" width="120">
                                 <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column prop="name" label="姓名"  width="120"></el-table-column>
                            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div text-right>
                          <el-pagination
                              @current-change="handleCurrentChangeItem"
                              :current-page="currentPageUser"
                              :page-size="pageSize"
                               layout="total,prev, pager, next, jumper"
                              :total="itemTotal">
                          </el-pagination>
                       </div>
                    </section>
                </tableLayout>
            </div>
        </el-dialog>
      
 </div>
</template>

<script>
 import tableLayout  from '@/components/layout/tableLayout.vue'

 export default {
   data () {
     return {
         visible:this.show,
         memberData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        pageSize:10,
        currentPageUser:1,
        userTotal:0,
        multipleUserList: [],
        currentPageItem:1,
        itemTotal:0,
        multipleItemList: []
     }
   },
   methods:{
       handleSelectionChangeUser(val){
          this.multipleUserList = val;
       },
       handleSelectionChangeItem(){
          this.multipleItemList = val;
       },
       handleCurrentChangeUser(data){   // 用户分页

       },
       handleCurrentChangeItem(data){   // 项目分页

       },
       handleAddUser(){
           this.$emit('handleAddUser','');
       },
       handleDeleteUser(){
          
       },
       handleAddItem(){
           this.$emit('handleAddItem','');
       },
       handleDeleteItem(){

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

            }
        }
    },
   components: { tableLayout }
 }
</script>

<style scoped>
.dialog-zdwh{
    padding: 8px 10px;
}

</style>
