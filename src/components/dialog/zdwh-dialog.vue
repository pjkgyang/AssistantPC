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
                        <el-button :disabled="!multipleUserList.length" type="danger" size="mini" @click.native='handleDeleteUser'>删除成员</el-button>
                    </section>
                    <section slot="bottom">
                          <el-table
                            ref="multipleTable"
                            :data="userData"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            :max-height="300"
                            @selection-change="handleSelectionChangeUser">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="cyid" label="成员工号"></el-table-column>
                            <el-table-column prop="cyxm" label="成员姓名"></el-table-column>
                            <el-table-column prop="qyzd" label="战队名称" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="zddz" label="战队队长" show-overflow-tooltip></el-table-column>
                        </el-table>
                        
                    </section>
                </tableLayout>
                <tableLayout :title="'战队项目管理'">
                    <section slot="top">
                        <el-button type="primary" size="mini" @click.native='handleAddItem'>添加项目</el-button>
                        <el-button :disabled="!multipleItemList.length" type="danger" size="mini" @click.native='handleDeleteItem'>删除项目</el-button>
                    </section>
                    <section slot="bottom">
                          <el-table
                            ref="multipleTable"
                            :data="itemData"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            :max-height="300"
                            @selection-change="handleSelectionChangeItem">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="xmbh" label="项目编号" width="110"></el-table-column>
                            <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="xmjl" label="项目经理" width="100"></el-table-column>
                            <el-table-column prop="lxrq" label="立项日期" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="fwqx" label="服务期限" width="100"></el-table-column>
                        </el-table>
                        <div text-right>
                          <el-pagination
                              @current-change="handleCurrentChangeItem"
                              :current-page="currentPageItem"
                              :page-size="pageSize"
                               layout="total,prev, pager, next, jumper"
                              :total="itemTotal">
                          </el-pagination>
                       </div>
                    </section>
                </tableLayout>
            </div>
        </el-dialog>

       <zdxm-dialog :show.sync="zdxmShow" :qyzdwid="qyzdwid" @addProjectSuccess="addProjectSuccess"></zdxm-dialog>
       <user-dialog :show.sync="userShow" :qyzdwid="qyzdwid" @addUserSuccess="addUserSuccess"></user-dialog>
 </div>
</template>

<script>
 import tableLayout  from '@/components/layout/tableLayout.vue'
 import userDialog  from '@/components/dialog/user-dialog.vue'
 import zdxmDialog  from '@/components/dialog/zdxm-dialog.vue'

 export default {
   data () {
     return {
        visible:this.show,
        zdxmShow:false,
        userShow:false,
        userData: [],
        itemData:[],
        pageSize:10,
        multipleUserList: [],
        currentPageItem:1,
        itemTotal:0,
        multipleItemList: []
     }
   },
   methods:{
       addProjectSuccess(){   // 添加项目成功
          this.currentPageItem = 1;
          this.getTeamProjects();
       },
       addUserSuccess(){      // 添加用户成功
            this.getListQyzdCy(); 
       },
       handleSelectionChangeUser(val){
          this.multipleUserList = [];
          val.forEach(ele=>{
              this.multipleUserList.push(ele.wid);
          })
       },
       handleSelectionChangeItem(val){
          this.multipleItemList = [];
          val.forEach(ele=>{
              this.multipleItemList.push(ele.xmbh);
          })
       },
       handleCurrentChangeItem(data){   // 项目分页
            this.currentPageItem = data;
            this.getTeamProjects();
       },
       handleAddUser(){
            this.userShow = !this.userShow;
       },
        handleAddItem(){
            this.zdxmShow = !this.zdxmShow;
        },
       handleDeleteUser(){   //删除成员
           this.deleteZdcy();
       },
       handleDeleteItem(){   //删除项目
           this.deleteTeamProject();
       },
       getListQyzdCy(){         // 获取战队成员
           this.$get(this.API.listQyzdCy,{
               qyzdwid:this.qyzdwid
           }).then((res)=>{
               if(res.state == 'success'){
                  if(!!res.data){
                      this.userData = res.data
                  }else{
                      this.userData = []
                  }
               }
           })
       },
       getTeamProjects(){      // 获取项目列表
          this.$get(this.API.pageTeamProjects,{
               curPage:this.currentPageItem,
               pageSize:this.pageSize,
               qyzdwid:this.qyzdwid,
               keyword:''
           }).then((res)=>{
               if(res.state == 'success'){
                  if(!!res.data.rows && !!res.data){
                     this.itemData = res.data.rows
                     this.itemTotal = res.data.records
                  }else{
                     this.itemData = []
                     this.itemTotal = 0
                  }
               }
           }) 
       },
       deleteZdcy(){   
        this.$confirm('请确定是否删除该成员?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.$post(this.API.deleteZdcy,{
               wids:this.multipleUserList.join(',')
           }).then((res)=>{
               if(res.state == 'success'){
                   this.$alert('删除成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                        this.getListQyzdCy();
                    }
                  });
               }
           })
        }).catch(() => {});
      },
      deleteTeamProject(){
       this.$confirm('请确定是否删除该项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.$post(this.API.deleteTeamProject,{
               xmbh:this.multipleItemList.join(',')
           }).then((res)=>{
               if(res.state == 'success'){
                   this.$alert('删除成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                        this.getTeamProjects();
                    }
                  });
               }
           })
        }).catch(() => {});
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
     }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){

            }else{
             this.getListQyzdCy();
             this.getTeamProjects();
            }
        }
    },
   components: { tableLayout,userDialog,zdxmDialog }
 }
</script>

<style scoped>
.dialog-zdwh{
    padding: 8px 10px;
}

</style>
