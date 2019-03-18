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
                    <el-table :data="tableDatas" style="width: 100%" :max-height="580" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="userName" label="姓名"></el-table-column>
                    <el-table-column prop="userCode" label="工号"></el-table-column>
                    <el-table-column prop="dept" label="部门"></el-table-column>
                </el-table>
                </section>
                <section slot="bottom" text-right class="pd-10">
                    <el-button size="mini" type="primary" @click="hanldeCommitUser">确定</el-button>
                    <el-button size="mini" @click="visible = false">取消</el-button>
                </section>
            </tableLayout>
      </el-dialog>
 </div>
</template>

<script>
 import tableLayout  from '@/components/layout/tableLayout.vue';

 export default {
   data () {
     return {
          visible:this.show,
          tableData: [],
          tableDatas:[],
          multipleId: [],
          multipleName:[]
     }
   },
   methods:{
       handleSelectionChange(val) {
        this.multipleId = [];
        this.multipleName = [];
        val.forEach(ele=>{
          this.multipleId.push(ele.userId);
          this.multipleName.push(ele.userName);
        })

       },
       hanldeCommitUser(){
           this.$emit('hanldeCommitUser',this.multipleId,this.multipleName)
       },
    
        queryProjectParticipantMap(){
            this.$get(this.API.queryProjectParticipantMap,{
                xmbh:this.xmbh  
            }).then(res=>{
               if (res.state == "success") {
                    if (!!res.data.yf) {
                        this.tableData.push(res.data.yf);
                    }
                    if (!!res.data.jf) {
                        this.tableData.push(res.data.jf);
                    }
                    if (!!res.data.qt) {
                        this.tableData = this.tableData.concat(res.data.qt);
                    }

                    this.tableData.forEach((ele,i,arr)=>{
                        if(ele.unitType == 0){
                          this.tableDatas.push(ele);
                        }
                    })
                }
            })
        }
   },
   props:{
       show:{
           type:Boolean,
           default:false
       },
       xmbh:{
         type:String,  
         default:''
       }
   },
     watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              this.multipleSelection = [];
            }else{
              this.queryProjectParticipantMap();
            }
        }
    },
   components: {tableLayout}
 }
</script>

<style scoped>

 
</style>
