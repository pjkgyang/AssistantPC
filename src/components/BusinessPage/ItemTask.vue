<template>
  <div class="milestone_stage">
      <div class="milestone_stage_top">
        <h4 :title="milestone.catalog">{{milestone.catalog}}</h4>
        <span style="font-size:14px;color:#409EFF;" class="el-icon-circle-plus" title="添加任务" :data-indx="index" @click="addItemTask">新增</span>
      </div>
      <div style="height:95%;overflow-y:auto;overflow-x:hidden;" :id="'my-scrollbar'+index">
          <task-label @changeTaskstate='changeTaskstate' :TaskDatas="LcbTaskDatas"  @handleTaskDialog="handleTaskDialog" @handleTaskinfo="handleTaskinfo"></task-label>
      </div>
        <!-- 添加任务 -->
      <el-dialog title="添加任务" :visible.sync="dialogAddTaskVisible" append-to-body width="650px" :close-on-click-modal="false"> 
            <addItemTask :lcbrw="LcbArr" :dialogVisible="commitSuccess" :lcbinfo="milestone"  @AddTaskCommit="AddTaskCommit"></addItemTask>
      </el-dialog>
          <!-- 修改承诺时间 -->
    <el-dialog title="调整计划"  :visible.sync="dialogchangeDateVisible" append-to-body :close-on-click-modal="false"> 
        <el-form ref="form" :model="form" label-width="120px" style="padding:10px 20px 10px 0">
                <el-form-item label="承诺开始日期">
                    <el-date-picker v-model="form.startDate" type="date" size="small" placeholder="开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                     </el-date-picker>
                </el-form-item>
                 <el-form-item label="承诺结束日期">
                    <el-date-picker v-model="form.endDate" type="date" size="small" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                     </el-date-picker>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type="textarea" v-model="form.sm" resize="none" :rows="5"></el-input>
                </el-form-item>
                <div style="text-align:right">
                    <el-button type="primary" size="small" @click="handleCommitTZJH">提交</el-button>
                    <el-button type="info" size="small" @click="handleCloseTZJH">取消</el-button>
                </div>
            </el-form> 
    </el-dialog>
  </div>
</template>
<script>
import { getTasksByCatalog ,deleteTask ,addOrUpdateTask} from '@/api/task.js'
import {  ModifyMilestoneCommitmentDate } from '@/api/milestone.js'
import addItemTask from '@/components/BusinessPage/addItemTask.vue'
import TaskLabel from '@/components/BusinessPage/itemTasklabel.vue'
import Scrollbar from 'smooth-scrollbar';
export default {
  data(){
    return{
      dialogAddTaskVisible:false,
      dialogchangeDateVisible:false,
      form:{
          startDate:"",
          endDate:"",
          sm:""
      },
      lcbTask:{},
      data:[],
      indexArr:[],
      LcbArr:[],
      LcbTaskDatas:this.TaskDatas,
      commitSuccess:false

    }
  },
  props:{
      milestone:{
          type:Object,
          default:function(){
            return {}
          }
      },
      index:{
        type:Number,
        default:""
      },
      TaskDatas:{
          type:Array,
          default:function(){
            return []
          }
      },
      rwlx:{
        type:String,
        default:""
      },
      rwzt:{
        type:String,
        default:""
      }
  },
  mounted(){
         Scrollbar.init(document.querySelector('#my-scrollbar'+this.index));
  },
  methods:{
     handleTaskDialog(data){    //提交任务 日志对话框
      if(typeof(data) == 'object'){ 
        data.catalogId =  this.milestone.catalogId
        data.catalog =  this.milestone.catalog
        data.cpmc = this.milestone.cpmc
        data.catalogType = this.milestone.catalogType
        if(data.type == 'delete'){
              this.$confirm('是否删除该任务?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                deleteTask({
                rwbh:data.rwbh
              }).then(({data})=>{
                  if(data.state == 'success'){
                    this.$alert('删除成功', '提示', {
                        confirmButtonText: '确定',
                        type:'success',
                        callback: action => {
                            this.getTasksByCatalog(this.rwlx);
                        }
                    })
                  }
              })
            }).catch(() => {});
          }else if(data.type == 'changeDate'){
            this.form.startDate = data.jhksrq
            this.form.endDate = data.jhjsrq
            this.dialogchangeDateVisible = !this.dialogchangeDateVisible
            this.lcbTask = data  //获取任务信息
          }
          // else if(data.type == 'jfqy'){
          //   console.log(data)
          // }
       }
      this.$emit('handleDialog',data);
    },
    //新增任务
    AddTaskCommit(data){    
        addOrUpdateTask(JSON.parse(data)).then(({data})=>{
              if(data.state == 'success'){
                 this.dialogAddTaskVisible = false         
                 this.$alert('添加任务成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                       this.getTasksByCatalog(this.rwlx);
                       this.commitSuccess = !this.commitSuccess
                    }
                  });
              }else{
                this.$alert(data.msg, '提示', {
                    confirmButtonText: '确定',
                    type:'error',
                  });
              }
         })
    },
    // 修改承诺时间
    handleCommitTZJH(){
       this.$confirm('请慎重修改此日期', '提示', {
          confirmButtonText: '确定修改',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ModifyMilestoneCommitmentDate({
            xmbh:this.lcbTask.xmbh,
            lcbbh:this.lcbTask.lcbbh,
            startDate:this.form.startDate,
            endDate:this.form.endDate,
            sm:this.form.sm
          }).then(({data})=>{
          if(data.state == 'success'){
                this.dialogchangeDateVisible = false
                this.getTasksByCatalog(this.rwlx);                
                this.$alert('修改成功', '提示', {
                 confirmButtonText: '确定',
                 type:'success',
                 callback: action => {
                   this.form.sm = ''
                 }
              });      
            }
          })
      }).catch(() => {}); 
    },
    handleCloseTZJH(){
          this.dialogchangeDateVisible = !this.dialogchangeDateVisible
    },
    handleTaskinfo(data){      //任务详情模态框
       data.lcbindex = this.index
       this.$emit('handleTaskinfo',data)
    },
    addItemTask(e){
      let index = e.target.getAttribute('data-indx')
      this.data = this.milestone
      this.dialogAddTaskVisible = !this.dialogAddTaskVisible
      this.getTasksByCatalog("1",true);
      // this.$emit('addItemTask',this.data)
    },
    changeTaskstate(data){  //改变任务状态
      this.getTasksByCatalog(this.rwlx);
    },

    getTasksByCatalog(taskType,type){
      getTasksByCatalog({
            xmbh:this.milestone.xmbh,
            catalog:this.milestone.catalog,
            catalogId:this.milestone.catalogId,
            cpmc:this.milestone.cpmc,
            cpbh:this.milestone.cpbh,
            catalogType:this.milestone.catalogType,
            curPage:1,
            pageSize:99999,
            taskType:taskType||"",
            rwzt:this.rwzt||"",
            keyword:""
          }).then(({data})=>{
            if(data.state == 'success'){
                  if(!type){
                    this.LcbTaskDatas = data.data.rows
                  }
                 if(taskType == '1'){
                   this.LcbArr = data.data.rows
                 }
            }
        })
    },
  },
 watch:{
   TaskDatas(n,o){
    this.LcbTaskDatas = n
   }
 },
  components:{TaskLabel,addItemTask}
}
</script>
<style scoped>
.milestone_stage{
    width: 360px;
    height: 99%;
    /* min-height: 99%; */
    background: #dddddd;;
    border-radius: 5px;
    margin:0 10px;
    overflow-y: hidden;
}
.milestone_stage .milestone_stage_top{
  padding: 0 10px;
}
.milestone_stage .milestone_stage_top:after{
  content: "";
  display: block;
  clear: both;
}
.milestone_stage .milestone_stage_top h4{
  margin:10px 0 !important; 
  font-size: 15px;
  color: #666;
  height: 3%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width:85%;
  float: left;
  font-weight:700;
  font-size: 14px;
}
.milestone_stage .milestone_stage_top>span{
 float: right;
 margin-top: 10px;
 font-weight: 700;
}
.milestone_stage .milestone_stage_top>span:hover{
  cursor: pointer;
  color: #409EFF;
}
.milestone_stage ul {
  padding: 0 4px;
}
</style>
