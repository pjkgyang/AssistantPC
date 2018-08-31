<template>
<div style="height:100%;overflow-x:auto">
  <div class="myItem-top-bread">
    <user-banner :shown="false" :Operatepower="Operatepower"  :bannerACtive="tabsLabel" :itemMc="'['+xmkbInfo.xmbh+']'+xmkbInfo.xmmc" :fbdetail="true" :userNum="itemUserNum" @handleAddDDgroup="handleAddDDgroup" @handleItemUser="userListShow = !userListShow" @handleTabsClick="handleTabsClick"></user-banner>
    <el-collapse-transition>
     <div v-if="userListShow" class="project-item-people">
         <addItemUser :dwmc="xmkbInfo.dwmc" :xmbh="xmbh" @addItemuser="addItemuser"></addItemUser>
     </div>
     </el-collapse-transition>
  </div>
  <div style="height:40px"></div>
  <!-- 项目进度 -->
  <div class="project_task_detail" @click.stop="selectHide">
    <div  v-if="tabsLabel == 'process'" style="display:flex">
    <div  class="project_task_detail_taskbar">
          <div class="project_info">
            <div style="margin-bottom:5px;">
             任务类型:
              <el-select v-model="rwlxValue" placeholder="请选择任务类型" size="mini" @change="handleChangeRwlx">
                <el-option v-for="item in rwlxOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
             </el-select>
             </div>
              <div>
             任务状态:
              <el-select v-model="rwztValue" placeholder="请选择任务状态" size="mini" @change="handleChangeRwzt">
                <el-option v-for="item in rwztOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
             </el-select>
              </div>
          </div>

            <ul class="task_list" >
              <div>
                <li v-if="taskList.length != 0 && taskList != null" :class="{'list-active':shownindex === index}" v-for="(task,index) of taskList" :key="index"  @click="getTaskinfo(task,index)">
                  <p>
                    <strong :title="task.cp" :class="{'on_active':shownindex === index,'project_task_detail_cpmc':true}">{{task.cp_display}}</strong><br>
                    <span style="display:inline-block;width:40px;">{{task.ywcrwzs}}/{{task.rwzs}}</span>&#x3000;
                    <span class="item_zrr ">甲</span> <span>{{task.jfzrrxm == ''?'暂无':task.jfzrrxm}}</span>&nbsp;&nbsp;
                    <span class="item_zrr item_zrr_YF">乙</span> <span>{{task.yfzrrxm}}</span>
                    <span @click.prevent="changeZrr($event,index)"  title="编辑人员" style="float:right;margin-top:3px;">
                      <img src="static/img/usergl.png" alt="">
                    </span>
                  </p>

                  <div style="margin:5px 0;">
                    <el-progress  :show-text='false' :percentage="task.rwzs == 0?0:task.ywcrwzs == 0?0:(task.ywcrwzs/task.rwzs)*100" status="success"></el-progress>
                  </div>
                </li>
                <li v-if="taskList.length == 0 || taskList == null" style="text-align:center;font-weight:700">
                     暂无产品
                </li>
                </div>
            </ul>
     
         <ul class="task_list task_complete_status">
           <li  @click="checkMyTask" data-type="Mytask" :class="{'task-active':taskActive == 'Mytask'}"><span class="el-icon-news"></span> 我的任务</li>
         </ul>
      </div>

       <!-- 任务展示 -->
       <div class="project_task_milestone">
        <div style="height:100%;" class="milestone-list" v-if="ViewTransition">
          <div v-for="(milestone,index) in milestones" :key="index" v-if="taskList.length != 0 && taskList != null">
            <itemTask  :rwlx="rwlxValue" :rwzt="rwztValue" :TaskDatas="milestone.tasks.rows" :index="index" :milestone="milestone" @handleDialog="handleDialog" @handleTaskinfo="handleTaskinfo" @addItemTask="addItemTask"></itemTask>   
          </div> 
          <div v-if="taskList.length == 0 || taskList == null" style="text-align:center;padding-top:150px;width:100%">
             <img src="static/img/empty.png" alt="">
              <p>暂无里程碑</p>
          </div>
        </div>


        <!-- 表格形式 表格-->
        <div v-if="!ViewTransition" style="padding:0 10px;min-width:1040px;background:#fff;margin:0 10px;border-radius:5px">
          <div style="display:flex;justify-content:space-between;border-bottom:2px solid #e4e7ed;height:40px;margin:0 0 20px 10px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="今天的任务" name="first"></el-tab-pane>
            <el-tab-pane label="所有任务" name="second"></el-tab-pane>
          </el-tabs>
            <div>
              <div class="select_one">
                  <itemSelect :options="options" @handleSelect="handleSelectWc"></itemSelect>
              </div>
              <div  class="select_two">
                  <itemSelect :options="optionsSort"  @handleSelect="handleSelectSort"></itemSelect>
              </div>
           </div>
          </div>
              <itemtable :tableData="myTaskArr" @handleDailyParper="handleDailyParper" @changeTaskStaus="changeTaskStaus"  @handleCell="handleCell"></itemtable>
            <div style="text-align:right;margin-top:20px;">
              <!-- 分页 -->
              <pagination v-if="records != 0 && records != null" :pageSize="pageSize" :total="records" @handleCurrentChange="handleCurrentChange"></pagination>  
            </div>
        </div>
      </div>
      <!-- 任务详情弹出层 -->
      <el-dialog title="任务详情" :visible.sync="dialogTableVisible" width="700px" :close-on-click-modal="false"> 
        <div>
          <div class="task-detail-dialog-header">
            <p class="task-detail-dialog-header-mc">{{fbcpmc}}</p>
             <div style="display:flex">
              <!-- <el-checkbox v-model="checked2" :disabled="checked2 == true"></el-checkbox> -->
              <h4>{{lcbTasks.rwmc_display}}</h4>
             </div>
            <p class="task-detail-dialog-header-time">
              <span>
              <span>开始日期</span> 
              <span><span class="el-icon-date"></span> {{lcbTasks.jhksrq}}</span>
              <!-- <el-date-picker type="date" placeholder="选择日期" v-model="lcbTasks.jhksrq" size="mini" style="width:120px"></el-date-picker> -->
              </span>
              - 
              <span>
                <span>结束日期</span>
                <span><span class="el-icon-date"></span> {{lcbTasks.jhjsrq}}</span>
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="lcbTasks.jhjsrq" size="mini" style="width:120px"></el-date-picker> -->
              </span>
            </p>

          </div>
          <div class="task-detail-scenario-infos-wrap">
              <p><span style="display:inline-block;width:90px" class="el-icon-service"> 责任人</span><span>{{lcbTasks.ssrxm == ''?'暂无':lcbTasks.ssrxm}}&#x3000;</span>
               <span v-if="lcbTasks.lx != 1 && Operatepower">
                <span v-if="!xgssry">
                      <el-select v-model="value8" size='mini' filterable :filter-method="filterSearch" @change="getTaskssry" placeholder="请选择/搜索用户姓名/编号">
                          <el-option
                            v-for="(item,index) in taskSSry"
                            :key="index"
                            :label="item.userName"
                            :value="item.userName+'&'+item.userId">
                          </el-option>
                        </el-select>
                </span>
                <el-button size="mini" @click="changeTaskSSry">{{xgssry == true?'修改':'取消修改'}}</el-button>
                <el-button v-if="!xgssry" size="mini" @click="CommitChangeTaskSSry">确定修改</el-button>
                </span>
              </p>
              <p><span style="display:inline-block;width:90px" class="el-icon-news"> 任务状态</span><span>{{lcbTasks.zt_display}}</span></p>
              <p><span style="display:inline-block;width:90px" class="el-icon-sort"> 优先级</span><span>{{lcbTasks.yxj_display}}</span></p>
              <p><span style="display:inline-block;width:90px" class="el-icon-time"> 工时</span><span>{{lcbTasks.jhgs}}&#x3000;</span>              
              <p><span style="display:inline-block;width:90px" class="el-icon-document"> 备注</span><span>{{lcbTasks.rwxq==''?'无':lcbTasks.rwxq}}</span></p>
              <p><span style="display:inline-block;width:90px" class="el-icon-document" v-if="lcbTasks.lx != 9">{{lcbTasks.lx==1?'里程碑模板':'模板'}}</span>
                <a v-if="lcbTasks.lx != 9 && TemplateFile.mblj.split('.')[1] != undefined" class="LcbTemplate" v-for="(TemplateFile,index) in lcbTemplateFile" :key="index" :href="baseUrl+'attachment/downloadTemplateFile.do?path='+TemplateFile.mblj" target="blank">
                  {{TemplateFile.wdmc+'.'+TemplateFile.mblj.split('.')[TemplateFile.mblj.split('.').length-1]}}</a>
                <span  v-if="lcbTasks.lx != 9 &&(lcbTemplateFile.length == 0 || lcbTemplateFile == null)">暂无</span>
              </p>
          </div>
          
           <div class="detail-activities-wrap">
             <div class="involve-view">
                  <p>参与者</p>
                   <el-tag
                      :key="index"
                      v-for="(tag,index) in dynamicTags"
                      :closable="tag.del"
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag.userName}}
                   </el-tag>
                   <el-button  class="button-new-tag" type="primary" @click="addUser" v-if="tasksInfo.lx != 1 && Operatepower">+</el-button>
                   <transition name="fade">
                    <ul class="task_participant" v-if="selectShow">
                          <li><el-input v-model="name" placeholder="搜索姓名" @focus="searchPerson"></el-input></li>
                          <ul style="height:180px;overflow-y:auto">
                            <li v-for="(list,index) in listt0" :data-label="list.userName+'&'+list.userId+'&'+index" :key="index" @click="addTaskParty">
                              <span style="display:inline-block;width:50px;">{{list.userName}} </span>
                              <span>{{list.userCode}}</span>
                              <span class="el-icon-check" style="float:right;margin-top:5px" v-if="partyArr.indexOf(index) != -1"></span>
                            </li>
                          </ul>
                    </ul>
                  </transition>
             </div>
             <div class="activities-list-wrap">
               <ul>
                 <li v-if="taskDetailProcess.length != 0 && taskDetailProcess != null" class="task-detail-process" v-for="(process,index) in taskDetailProcess">
                    <div v-if="process.gclx == 5" style="padding:3px 0;">
                       <div>
                        <p><span :title="process.gcms" :class="{'el-icon-plus':process.czlx==1,'el-icon-delete':process.czlx==2,'el-icon-refresh':process.czlx==3}" class="process-daily">
                            {{process.gcms}}</span>
                          <span style="float:right;color:#aaa">{{process.cjsj}}</span></p>
                      </div>
                    </div>
                     <div v-if="process.gclx != 5">
                       <div>
                        <p style="line-height:32px;">
                          <span style="float:left;height:32px;"><img src="static/img/defaultAvatar.png" :onerror="errorImg">&nbsp;</span> 
                          <span style="float:left;color:#999;"> {{process.cjrxm}}  &#x3000;{{process.userCode}}
                            <span v-if="process.gclx == 2 ||process.gclx == 3" :class="{'process-gclx':true,'gclx-rz':process.gclx == 2,'gclx-cb':process.gclx == 3}">{{process.gclx == 2?'日报':'催办'}}</span>
                          </span>
                          <span style="float:right;color:#aaa">{{process.cjsj}}</span>
                        </p>
                          <p style="text-align:left;margin:5px;">{{process.gcms}}</p>
                           <p>
                             <a class="process-fjlist" v-for="(fj,index) in process.fjData" :key="index" :href="baseUrl + 'attachment/downloadFile.do?fjId='+fj.fjbh" target="blank">{{fj.fjmc}}</a>
                           </p>
                      </div>
                    </div>
                  </li>
                  <li v-if="taskDetailProcess.length == 0 || taskDetailProcess == null">
                       <p style="text-align:center">暂无任务过程</p>  
                  </li>
               </ul>
               <div class="taskProcess-tips" v-if="taskDetailProcess.length != 0 && taskDetailProcess != null">
                 <a v-if="(taskProcessNum - curPageNum) > 0" @click="showAllprocess">显示较早的 {{taskProcessNum - curPageNum}} 条动态</a>
               </div>
             </div>
          </div>
       
        </div>
          <div class="activity-creator">
                <div class="activity-creator-content">
                  <div>
                    <div ref="fileContent"></div>
                    <el-input v-model="ProcessValue" placeholder="请输入内容"></el-input>
                  </div>
                    <div class="activity-creator-operate">
                          <el-upload
                              class="upload-demo"
                              ref="upload"
                              action="dis"
                               multiple
                              :before-upload="beforeUpload"
                              :on-remove="handleRemove"
                              :on-change="handleChange"
                              :file-list="fileList"
                              :auto-upload="false">
                              <span class="el-icon-upload" title="上传附件" style="font-size:18px;"></span>
                            </el-upload>
                            <div>
                              <el-button type="primary" size="mini" @click="remindeTaskProcess">催办</el-button>
                              <el-button type="primary" size="mini" @click="commitTaskProcess">发布</el-button>
                            </div>
                    </div>
                </div>
          </div>
      </el-dialog>
  <!-- 日报弹出层 -->
    <el-dialog title="填写日报" :visible.sync="dialogDailyVisible" @close="closeDailyParper" :close-on-click-modal="false"> 
        <dailyParper @handleSubmit="handleSubmit" :taskName="taskName" :xmbh="xmbh" :closeDialogNum="closeDialogNum"></dailyParper> 
    </el-dialog>
    <!-- 编辑产品 -->
    <el-dialog title="修改产品信息" :visible.sync="dialogEditTaskVisible" :close-on-click-modal="false"> 
        <enditTaskInfo @changeCPzrr="changeCPzrr" :xmbh="xmbh" :cpinfo="cpinfo" @handleCommit="handleEditTaskCommit" :dialogEditTaskVisible="dialogEditTaskVisible"></enditTaskInfo>
    </el-dialog>
    <!-- 编辑任务 -->
    <el-dialog title="编辑任务" @close="closeDialog" :visible.sync="dialogEditLcbTaskVisible" :close-on-click-modal="false"> 
        <editLcbTasks :dialog="dialog" @handleEditTaskSuc="handleEditTaskSuc" :lcbrw="LcbrwArr" :taskData="editTaskInfo"></editLcbTasks>
    </el-dialog>
    <!-- 提报里程碑 -->
     <el-dialog title="提报里程碑"  :visible.sync="commitlcbVisible" top="50px" width="600px" :close-on-click-modal="false"> 
       <commitMilestone :shown="commitlcbVisible" :taskDetail="lcbTaskDetail" @handleCommitMilestone="handleCommitMilestone"></commitMilestone>
    </el-dialog>
    </div>
    <!-- 概览 -->
    <div v-if="tabsLabel == 'overview'">
         <overview :isAll="isAll" :xmbh="xmbh" :label="tabsLabel" @checkSkipDetail="checkSkipDetail"></overview>
    </div>
    <!-- 模板 -->
    <div v-if="tabsLabel == 'template'">
         <templateTabel></templateTabel>
    </div>
    <!-- 文件 -->
    <div v-if="tabsLabel == 'files'">
        <fileTable :xmbh="xmbh"></fileTable>
    </div>
    <!-- 里程碑管理 -->
    <div v-if="tabsLabel == 'milestone'">
      <milestoneGl :xmbh="xmbh"></milestoneGl>
    </div>
    <!-- 问题 -->
    <div v-if="tabsLabel == 'question'">
        <question :xmbh="xmbh" :xmmc="xmkbInfo.xmmc" :isAll="isAll"></question>
    </div>
     <!-- 投诉 -->
    <div v-if="tabsLabel == 'complain'">
       <complain :xmbh="xmbh" :xmmc="xmkbInfo.xmmc"></complain>
    </div>
    <!-- 团队 -->
    <div v-if="tabsLabel == 'teamwork'">
       <teamWork :xmbh="xmbh" :xmmc="xmkbInfo.xmmc" :dwmc="xmkbInfo.dwmc"></teamWork>
    </div>
  </div>


  <el-dialog title="钉钉群"  :visible.sync="dingdingGroupVisible"  width="400px" :close-on-click-modal="false"> 
      <div class="newadd-ddgroup">
        <el-tabs v-model="activeName2" type="card">
          <el-tab-pane label="已有钉钉群" name="first">
            <span>钉钉群id:</span>
            <el-input size="mini" style="width:50%;" placeholder="请输入钉钉群id" v-model="chatId"></el-input>
          </el-tab-pane>
          <el-tab-pane label="新建钉钉群" name="second" :disabled="dingdingShow">
            <span>钉钉群名称:</span>
            <el-input size="mini" style="width:50%;" placeholder="请输入钉钉群名称"  v-model="chatName"></el-input>
          </el-tab-pane>
        </el-tabs>
        <div style="text-align:right;padding:10px;">
          <el-button type="primary" size="mini" @click="handleSaveChat">保存</el-button>
        </div>
      </div>
    </el-dialog> 
  </div>
</template>
<script>
import Scrollbar from 'smooth-scrollbar';
import itemTask from '@/components/BusinessPage/itemTask.vue'
import itemtable from '@/components/BusinessPage/tabel.vue'
import itemSelect from '@/components/BusinessPage/itemSelect.vue'
import pagination from '@/components/BusinessPage/pagination.vue'
import dailyParper from '@/components/BusinessPage/dailyParper.vue'
import enditTaskInfo from '@/components/BusinessPage/editTaskinfo.vue'
import UserBanner from '@/components/BusinessPage/itemUserBanner.vue'
import addItemUser from '@/components/BusinessPage/addItemUser.vue'
// import addItemTask from '@/components/BusinessPage/addItemTask.vue'
import editLcbTasks from '@/components/BusinessPage/editLcbTasks.vue'
import  templateTabel from '@/components/BusinessPage/templateTabel.vue'
import  fileTable from '@/components/BusinessPage/fileTable.vue'
import  milestoneGl from '@/components/BusinessPage/milestoneGl.vue'
import  commitMilestone from '@/components/BusinessPage/commitMilestone.vue'
import  question from '@/components/BusinessPage/question.vue'
import  complain from '@/components/BusinessPage/complain.vue'
import  overview from '@/components/BusinessPage/overview.vue'
import  teamWork from '@/components/BusinessPage/teamWork.vue'
import { getProjectCatalog } from '@/api/xmfz.js'
import { getMilestoneCatalog  } from '@/api/milestone.js'
import { getTasksByCatalog ,addOrUpdateTask ,getTasks,getTaskDto ,getTaskLogs ,deleteTask ,changeTaskStatus,confirmMilestone} from '@/api/task.js'
import { addOrUpdateTaskProcess ,queryTaskProcess ,getChildrenByLcbms ,getTemplateByRwbh} from '@/api/TaskProcess.js'
import { querytaskParticipant ,queryUser ,queryProjectParticipant ,queryProjectParticipantMap, addTaskParticipant,deleteTaskParticipant ,modifyTaskLeader ,queryProductParticipant} from '@/api/personal.js'
import { getChatId , updateChatId ,createChat} from '@/api/xmkb.js'
import { isVisibleXmtd } from '@/api/xmtd.js'
import axios from 'axios'
import Qs from 'qs'
import { getMyDate } from '../../utils/util.js'; 

export default {
  data(){
    return{
        errorImg:'this.src="' + require('../../../static/img/defaultAvatar.png') + '"',
        value8:"",
        taskSSry:[],
        options:[{
          label:"未完成",
          value:1
        },{
          label:"已完成",
          value:2
        }],
        optionsSort:[{
          label:"按优先级排序",
          value:'1'
        },{
          label:"按截止时间排序",
          value:'2'
        },{
          label:"按创建时间最近排序",
          value:'3'
        },{
          label:"按项目名称排序",
          value:'4'
        }],
        rwlxOptions:[{
          label:"全部",
          value:''
        },{
          label:"里程碑任务",
          value:'1'
        },{
          label:"工程任务",
          value:'3'
        },{
          label:"客户任务",
          value:'5'
        },{
          label:"个人任务",
          value:'9'
        }],
        rwztOptions:[{
          label:"全部",
          value:''
        },{
          label:"已完成",
          value:'2'
        },{
          label:"未完成",
          value:'1'
        }],
        rwlxValue:"",
        rwztValue:"",        
        activeName2:"first",
        chatId:"",
        chatName:"",
        taskList:[],
        listt0: [],
        list0: [],
        fileList:[],
        value5: [],
        value11: [],
        shownindex:0,
        dialogTableVisible:false,
        dialogDailyVisible:false,
        dialogCommitTaskVisible:false,
        dialogEditTaskVisible:false,
        dialogItemUserVisible:false,
        dialogAddTaskVisible:false,
        dialogEditLcbTaskVisible:false,
        dialogchangeDateVisible:false,
        commitlcbVisible:false,
        dingdingGroupVisible:false,
        dynamicTags: [],
        selectShow:false,
        ProcessValue:"",
        name:"",
        checkShwon:false,
        partyArr:[],
        activeName: 'first',
        wcValue:0,
        sortValue:1,
        ViewTransition:true,
        formValue:'',
        taskName:"测试任务1111",
        checked2:true,
        userListShow:false,
        fbbh:"",
        xmbh:'',
        milestones:[],
        TaskDatas:[],
        taskActive:"",
        indexArr:[],
        LcbrwArr:[],
        addTaskCPxx:{},  //里程碑信息
        editlcbArr:[],
        myTaskArr:[],
        taskState:1,
        orderby:1,
        pageSize:12,
        records:null,
        tasksInfo:{},
        lcbTasks:{},
        editTaskInfo:{},
        dialog:true,
        TaskProcess:{},
        cpinfo:{},
        userKeyword:"",
        taskCyz:[],
        xgssry:true,
        xztaskSSry:{},
        fbcpmc:'',
        fbcpbh:'',
        xmkbInfo:{},
        itemUserNum:null,
        taskDetailProcess:[],
        taskProcessNum:0,
        processTipshow:true,
        fileList:[],
        lcbTaskInfo:{},
        taskcurPage:1,
        taskpageSize:8,
        curPageNum:0,
        tabsLabel:'',
        lcbTaskDetail:{},
        filesArr:[],  //附件
        fileData:[],  // 附件id
        filesData:[],
        date:"",
        closeDialogNum:1,
        dingdingShow:false,
        lcbTemplateFile:[],
        baseUrl:"",
        gcFiles:[],
        Operatepower:true,
        isAll:null,
        xmtdShow:true,
        tagGroup:'',
        cpData:{}

    }
  },
  mounted(){

  },
  methods:{
    handleChangeRwlx(val){
      this.getProjectCatalog();
    },
    handleChangeRwzt(val){
      this.getProjectCatalog();
    },
     checkSkipDetail(data){ // 查看详情
      this.tabsLabel = data
      if(this.tabsLabel == 'process'){
         this.getProjectCatalog();
       }  
    },
    // 提交里程碑
    handleCommitMilestone(){
       this.getMilestone(this.fbcpmc,this.fbcpbh);
       this.commitlcbVisible = false
    },
    // 进度 模块 文件切换
    handleTabsClick(data){
        this.tabsLabel = data
        if(data == 'process'){
          // 获取项目产品目录
           this.getProjectCatalog();
        }
    },

    //  发布任务过程
    commitTaskProcess(){
        this.date =  new Date().getFullYear()+ '-' + 
              ("0" + (new Date().getMonth() + 1)).slice(-2)+'-'+ ("0" + new Date().getDate()).slice(-2);
        if(!this.ProcessValue){
            this.$alert('请输入过程内容', '提示', {
              confirmButtonText: '确定',
              type:'warning'
          });
          return ;
        }
        this.commitProcess(1);
    },
    // 催办投诉
    remindeTaskProcess(){
        this.date =  new Date().getFullYear()+ '-' + 
              ("0" + (new Date().getMonth() + 1)).slice(-2)+'-'+ ("0" + new Date().getDate()).slice(-2);
        this.commitProcess(3);
    },

    //  提交任务过程
     commitProcess(gclx){
        if(this.fileData.length != 0 && this.fileData != null){      
          this.fileData.forEach((ele,i,arr)=>{
              this.gcFiles.push({
                'fjbh':ele.split('|')[0],
                'fjmc':ele.split('|')[1],
                })
            })
         }
          addOrUpdateTaskProcess({
            xmbh:this.tasksInfo.xmbh,
            rwbh:this.tasksInfo.rwbh,
            gclx:gclx,
            gcms:this.ProcessValue,
            gcrq:this.date,
            gs:"",
            hfrbh:window.userName,
            hfrxm:window.userId,
            fjdata:this.fileData.join(',')
        }).then(({data})=>{
          if(data.state == 'success'){
            let obj = {
                cjrxm:window.userName,
                cjrbh:window.userId,
                cjsj:getMyDate(new Date()),
                gcms:this.ProcessValue,
                logo:window.logo,
                gclx:gclx,       
                fjData:this.gcFiles
            }
            this.$alert(gclx==1?'发布成功':'催办成功', '提示', {
              confirmButtonText: '确定',
              type:'success',
               callback: action => {
                 this.taskDetailProcess.unshift(obj);
                 this.ProcessValue = ""
                 this.fileList = [];
                 this.fileData = [];
                 this.gcFiles = [];
                 this.filesData = [];
               }
            });
          }else{
             this.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              type:'error'
          });
          }
        })
     },
     
    //  上传附件

      // 删除文件
      handleRemove(file, fileList) {
          this.fileData.forEach((ele,i,arr)=>{
            if(ele.includes(file.name)) this.fileData.splice(i,1);
          })
      },

      beforeUpload(file){
        if(this.filesArr.length > 0){
          if(this.filesArr[0].name == file.name)  return;
        }
        this.filesArr.push(file)

        let fd = new FormData();
        fd.append('fileUpload',file);
        fd.append('xmbh',this.xmbh)


        axios.post(window.baseurl+'attachment/uploadAttach.do',fd,{
          headers:{'Content-Type':'multipart/form-data'} 
        }).then((res)=>{
           this.fileData.push(res.data.data)
        })
            
         return true
      },
      handleChange(file, fileList){
        let r = []; 
         this.filesData.push(file);
          for(var i = 0, l = this.filesData.length; i < l; i++) { 
          for(var j = i + 1; j < l; j++) 
            if (this.filesData[i].name === this.filesData[j].name) j = ++i; 
          r.push(this.filesData[i]); 
        } 
        this.fileList =  r
        this.$refs.upload.submit();
      },

    closeDialog(){
      this.dialog = false
    },
    handleEditTaskSuc(){
     this.dialogEditLcbTaskVisible = !this.dialogEditLcbTaskVisible
    },
    selectHide(e){
      if(e.target.className != 'el-input__inner'){
          this.selectShow=false
          this.userListShow=false
      }
    },
    searchPerson(event){
       event.cancelBubble = true;
       this.selectShow = true
    },
    // 获取产品 里程碑
    getTaskinfo(data,params){
        this.cpData = data;
        this.fbcpmc = data.cp
        this.fbcpbh = data.cpbh
        this.getMilestone(this.fbcpmc,this.fbcpbh);
        this.ViewTransition = true;
        this.shownindex = params;
        this.taskActive = " "
    },
    // 显示隐藏修改 产品责任人列表
    changeZrr(e,params){      
        e.stopPropagation();
        this.cpinfo = this.taskList[params]
        this.dialogEditTaskVisible = !this.dialogEditTaskVisible
    },
    // 修改产品责任人
    changeCPzrr(data){
       this.dialogEditTaskVisible = false
       if(!data.isJf){
          this.milestones.forEach((ele,i,arr)=>{
             ele.tasks.rows.forEach((ele,i,arr)=>{
               if(ele.lx == 5){
                  if(!ele.ssrxm){
                    ele.ssrxm = data.xm
                  }
               }
             })
          })
       }
    },

    // 提交任务 填写日志对话框
    handleDialog(data){  
      let param = data;
      if(typeof(data) == 'object' && data.type == 'daily'){ //填写日报
        this.taskName = data.rwmc
        this.TaskProcess = data
        this.dialogDailyVisible = !this.dialogDailyVisible

      }else if(typeof(data) == 'object' && data.type == 'commit'){  //提交里程碑
        this.lcbTaskDetail = data
        this.commitlcbVisible = !this.commitlcbVisible

      }else if(typeof(data) == 'object' && data.type == 'edit'){
         this.getTasksByCatalog(data.catalog,data.catalogId,data.cpbh,data.cpmc,data.catalogType); //获取里程碑任务 
         this.editTaskInfo = data
         this.dialog = true
         this.dialogEditLcbTaskVisible = !this.dialogEditLcbTaskVisible
      }else if(data.type == 'jfqy'){         // 甲方确认   
           if(data.lx == 1){
             if(window.userName != this.cpData.jfzrrxm){
              this.$alert('对不起,您没有操作权限！', '提示', {confirmButtonText: '确定',type:'warning'});
              return;
             }
            this.$confirm('您确定要确认任务完成吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                confirmMilestone({
                  lcbbh:data.lcbbh
                }).then(({data})=>{
                    if(data.state == 'success'){
                      this.getMilestone(this.cpData.cp,this.cpData.cpbh);
                    }
                })
            }).catch(()=>{});
           }else{
              if(data.lx == 3 && window.userName != this.cpData.jfzrrxm) {
                 this.$alert('对不起,您没有操作权限！', '提示', {confirmButtonText: '确定',type:'warning'});
                 return;
              }
              if(data.lx == 5 && window.userName != this.cpData.yfzrrxm){
                 this.$alert('对不起,您没有操作权限！', '提示', {confirmButtonText: '确定',type:'warning'});
                 return; 
              }
              if(data.lx == 9 && window.userName != data.cjrxm){
                this.$alert('对不起,您没有操作权限！', '提示', {confirmButtonText: '确定',type:'warning'});
                return;
              }
              this.$confirm('您确定要确认任务完成吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                changeTaskStatus({
                  rwbh:data.rwbh,
                  state:3,
               }).then(({data})=>{
                  if(data.state == 'success'){
                    this.getMilestone(this.cpData.cp,this.cpData.cpbh);
                  }
               })
            }).catch(()=>{});
           }
        }
     },

    // 任务操作 详情模态框
      handleTaskinfo(data){    
       this.tasksInfo = data
       this.taskDetailProcess = [];
       this.curPageNum = 0
       this.taskcurPage = 1
        getTaskDto({  //获取任务DTO
          rwbh:this.tasksInfo.rwbh
        }).then(({data})=>{
          if(data.state == 'success'){
            this.lcbTasks = data.data
          }
        })

        if(this.tasksInfo.lx != 9){
           queryProductParticipant({  //获取产品相关人员
             xmbh:this.xmbh,
             cpbh:this.fbcpbh,
             cpmc:this.fbcpmc
           }).then(({data})=>{
              if(data.state == 'success'){
                this.taskCyz = []
                if(data.state == 'success'){
                    data.data.forEach((ele,i,arr) => {
                          if(ele.roleName == '参与者'){
                              this.taskCyz.push(ele)
                              this.dynamicTags = this.taskCyz
                          }
                    });      
                }
              } 
           })

           getTemplateByRwbh({    // 获取里程碑模板文件
            rwbh:this.tasksInfo.rwbh
          }).then(({data})=>{
            if(data.state == 'success'){
              if(data.data != null && data.data.length != 0){
                  this.lcbTemplateFile = data.data
              }else{
                 this.lcbTemplateFile = []
              }
            }
          })
        }else{
          // 获取任务相关人员
          querytaskParticipant({
            rwbh:this.tasksInfo.rwbh,
            xmbh:this.tasksInfo.xmbh
          }).then(({data})=>{
            this.taskCyz = []
            if(data.state == 'success'){
                data.data.forEach((ele,i,arr) => {
                      if(ele.roleName == '参与者'){
                          this.taskCyz.push(ele)
                          this.dynamicTags = this.taskCyz
                      }
                });      
            }
          })
        }
        // 获取项目用户
       this.queryProjectParticipant();

        //  获取任务过程(分页)
       this.queryTaskProcess();       
       this.processTipshow = true    
       this.dialogTableVisible = !this.dialogTableVisible
     },

    showAllprocess(){
       this.taskcurPage += 1
       this.queryTaskProcess();
       this.processTipshow = false  
       
    },
     //  获取任务过程(分页)
    queryTaskProcess(){
        queryTaskProcess({
          curPage:this.taskcurPage,
          pageSize:this.taskpageSize,
          rwbh:this.tasksInfo.rwbh,
        }).then(({data})=>{
            if(data.state == 'success'){
              if(data.data.rows != null){
                this.taskDetailProcess = this.taskDetailProcess.concat(data.data.rows);
                this.taskProcessNum = data.data.records
                this.curPageNum +=  data.data.rows.length
              }
            }
        })   
    },

    //  获取项目用户
     queryProjectParticipant(){
       queryProjectParticipant({
         xmbh:this.xmbh,
       }).then(({data})=>{
          if(data.state == 'success'){
            data.data.forEach((ele,i,arr)=>{
              if(ele.userName == ''){
                data.data.splice(i,1);
              }
            })
             this.list0 = data.data
             this.listt0 = data.data
          }
       }) 
     },
    //  删除用户
      handleClose(tag) {
        this.$confirm('是否删除此参与者?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                deleteTaskParticipant({
                  xmbh:this.tasksInfo.xmbh,
                  rwbh:this.tasksInfo.rwbh,
                  yhbh:tag.userId
                }).then(({data})=>{
                    if(data.state == 'success'){
                        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                    }
                })
              }).catch(() => {

        });

       
      },
      addUser(e) {
        e.stopPropagation();
        this.selectShow = !this.selectShow;
      },


     //表格 提交日报
      handleDailyParper(data){  
        // console.log(data)
        this.taskName = data.rwmc
        this.dialogDailyVisible = !this.dialogDailyVisible
      },
      // 提交里程碑（表格）
      handleCommitTask(data){
       
      },
      // 更改任务状态(表格)
      changeTaskStaus(data){
        let state = ''
        if(data.split('&')[1]==1){
          state = 2
        }else{
          state = 1
        }
        changeTaskStatus({
           rwbh:data.split('&')[0],
           state:state,
        }).then(({data})=>{
            if(data.state == 'success'){
               this.getTasks(1);
            }
        })
      },
      //  添加任务
      addItemTask(data){
          this.addTaskCPxx = data
          this.getTasksByCatalog(data.catalog,data.catalogId,data.cpbh,data.cpmc,data.catalogType);// 获取里程碑任务
          this.dialogAddTaskVisible = !this.dialogAddTaskVisible  
      },

      //添加任务提交
      AddTaskCommit(data){  
       addOrUpdateTask(JSON.parse(data)).then(({data})=>{
              if(data.state == 'success'){
                 this.dialogAddTaskVisible = false         
                 this.$alert('添加任务成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                      
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

      // 添加参与者
      addTaskParty(e){    

           let label = e.currentTarget.getAttribute('data-label');
           let index = label.split('&')[2]
           let yhbh = label.split('&')[1]
           let yhxm = label.split('&')[0]
           let userArr = []
           this.dynamicTags.forEach((ele,i,arr)=>{
              userArr.push(this.dynamicTags[i].userName)
           })
           if(userArr.includes(label.split('&')[0])){
                return ;
           }else{
             addTaskParticipant({
               xmbh:this.xmbh,
               rwbh:this.tasksInfo.rwbh,
               yhbh:yhbh,
               yhxm:yhxm
             }).then(({data})=>{
                if(data.state == 'success'){
                  this.dynamicTags.push(this.listt0[index]);
                }
             })
           }
 
              this.selectShow = !this.selectShow
      },


      // 表格任务切换
       handleClick(tab, event) {         
        this.getTasks(1);
      },
      // 已完成 下拉筛选
      handleSelectWc(data){      
          this.taskState = data
          this.getTasks(1);
      },
      // 分类 下拉筛选
      handleSelectSort(data){   
        this.orderby = data
        this.getTasks(1);
      },
      //我的任务 分页切换
      handleCurrentChange(data){   
       this.getTasks(data);
      },

      // 填写日报 保存
      handleSubmit(data){         
        // console.log(data)
        addOrUpdateTaskProcess({
              xmbh:this.TaskProcess.xmbh,
              rwbh:this.TaskProcess.rwbh,
              gclx:2,
              gcms:data.gcms,
              gcrq:data.gcrq,
              gs:data.gs,
              fjdata:data.fjdata
        }).then(({data})=>{
          if(data.state == 'success'){
              this.$alert('添加成功', '提示', {
              confirmButtonText: '确定',
              type:'success',
            });
            this.dialogDailyVisible = !this.dialogDailyVisible
          }
        })
      },
      closeDailyParper(){
        this.closeDialogNum += 1
      },
      // 表格行 弹出任务详情
      handleCell(data){       
        getTaskDto({  //获取任务DTO
          rwbh:data.rwbh
        }).then(({data})=>{
          if(data.state == 'success'){
            this.lcbTasks = data.data
          }
        })
        // 获取任务相关人员
        querytaskParticipant({
           rwbh:data.rwbh,
           xmbh:data.xmbh
        }).then(({data})=>{
          this.taskCyz = []
          if(data.state == 'success'){
            if(data.data.length != 0 ){
              data.data.forEach((ele,i,arr) => {
                    if(ele.roleName == '参与者'){
                        this.taskCyz.push(ele)
                        this.dynamicTags = this.taskCyz
                    }
              });  
            }else{
               this.dynamicTags = []
            }
          }
        })

        // 获取用户
          queryProjectParticipant({
              xmbh:data.xmbh
          }).then(({data})=>{
            if(data.state == 'success'){
               this.taskSSry = data.data
            }
          })

        this.dialogTableVisible = !this.dialogTableVisible;
      },

      // 我的任务
      checkMyTask(e){
        let type = e.currentTarget.getAttribute('data-type');
        this.ViewTransition = false;
        this.shownindex = ''
        this.taskActive =  type
        this.getTasks(1);
      },

      // 提交 编辑任务信息
      handleEditTaskCommit(data){
        // console.log(data)
        this.dialogEditTaskVisible = false;
      },

      // 新建钉钉群
      handleAddDDgroup(){
        this.dingdingGroupVisible = !this.dingdingGroupVisible
        this.activeName2 = 'first'
        getChatId({  // 获取钉钉群ID
          xmbh:this.xmbh
        }).then(({data})=>{
           if(data.state == 'success'){
             if(data.data != ""){
               this.chatId = data.data
               this.dingdingShow = true
             }
           }
        })
      },
      handleSaveChat(){  //保存（钉钉群id）
         if(this.activeName2 == 'first'){
           if(this.chatId == ''){
              this.$alert('请输入钉钉群ID', '提示', {
                confirmButtonText: '确定',
                type:'warning'
              });
           }else{
              updateChatId({
                xmbh:this.xmbh,
                chatId:this.chatId
              }).then(({data})=>{
                if(data.state == 'success'){
                  this.dingdingGroupVisible  = false
                  this.$alert('更新成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                  });
                }
              })
           }
         }else if(this.activeName2 == 'second'){
             if(this.chatName == ''){
              this.$alert('请输入钉钉群名称', '提示', {
                confirmButtonText: '确定',
                type:'warning'
              });
            }else{
              createChat({
                xmbh:this.xmbh,
                name:this.chatName
              }).then(({data})=>{
                if(data.state == 'success'){
                  this.dingdingGroupVisible  = false
                  this.$alert('创建成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                  });
                }
              })
           }
         }
      },
      // 获取里程碑目录
      getMilestone(cpmc,cpbh){
                getMilestoneCatalog({
                      xmbh:this.xmbh,
                      cpbh:cpbh,
                      cpmc:cpmc,
                      curPage:1,
                      pageSize:99999,
                      taskType:this.rwlxValue,
                      rwzt:this.rwztValue,
                      keyword:""
                      }).then(({data})=>{
                        if(data.state == 'success'){
                          this.milestones = data.data 
                      }
                })
      },
      // 获取任务列表（项目看板）
      getTasks(curPage){
          getTasks({
                  curPage:curPage,
                  pageSize:12,
                  startDt:"",
                  endDt:this.activeName == 'first'?new Date().getFullYear()+ '-' + ("0" + (new Date().getMonth() + 1)).slice(-2)+'-'+ ("0" + new Date().getDate()).slice(-2):"",
                  state:this.taskState,
                  xmbh:this.xmbh,
                  orderby:this.orderby,
                  keyword:""
                }).then(({data})=>{
                   if(data.state == 'success'){
                      this.records = data.data.records
                      this.myTaskArr = data.data.rows
                   }         
            })
      },

      // 修改实施人员
      changeTaskSSry(){
        this.xgssry = !this.xgssry
        if(!this.xgssry){
          queryProjectParticipant({
              xmbh:this.xmbh
          }).then(({data})=>{
            if(data.state == 'success'){
               this.taskSSry = data.data
            }
          })
        }
      },
// 搜索人员 （任务责任人）
      filterSearch(val){
          queryUser({
            curPage:1,
            pageSize:9999,
            xmbh:this.xmbh,
            Isexternal:"",
            keyword:val
          }).then(({data})=>{
            if(data.state == 'success'){
              this.taskSSry = data.data.rows
            }
          })
      },
      getTaskssry(val){ 
       this.xztaskSSry.userName = val.split('&')[0]
       this.xztaskSSry.userId = val.split('&')[1]
      },

      // 确定修改实施人员
      CommitChangeTaskSSry(){
        // console.log( this.xztaskSSry)
        if(JSON.stringify(this.xztaskSSry) === '{}'){
          this.$alert('请选择责任人修改', '提示', {
            confirmButtonText: '确定',
            type:"warning"
          });
         return false;
        }else if(this.xztaskSSry.userId == ""||this.xztaskSSry.userName == ""){
           this.$alert('选择责任人有误', '提示', {
            confirmButtonText: '确定',
            type:"warning"
          });
          return false;
        }
        
          modifyTaskLeader({
            xmbh:this.xmbh,
            rwbh:this.tasksInfo.rwbh,
            yhbh:this.xztaskSSry.userId,
            yhxm:this.xztaskSSry.userName
          }).then(({data})=>{
             if(data.state == 'success'){
              this.lcbTasks.ssrxm = this.xztaskSSry.userName
              this.xgssry = true
              this.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                type:"success",
                callback:action =>{
                    let index = this.tasksInfo.index
                    this.milestones[this.tasksInfo.lcbindex].tasks.rows[index].ssrxm = this.xztaskSSry.userName
                }
              });   
             }
          })
      },


    // 修改甲方成功 (刷新看板)
    addItemuser(){
        this.getProjectCatalog();
        this.getItemUserNum();
    },

    // 获取项目产品目录
    getProjectCatalog(){
          getProjectCatalog({xmbh:this.xmbh}).then(({data})=>{
            if(data.state == 'success'){
              this.taskList = data.data 
              if(data.data !=null && data.data.length !=0 ){
                this.fbcpmc = this.fbcpmc == ''?data.data[0].cp:this.fbcpmc
                this.fbcpbh = this.fbcpbh == ''?data.data[0].cpbh:this.fbcpbh
                this.cpData = data.data[0]
                    // 获取里程碑目录
                    this.getMilestone(this.fbcpmc,this.fbcpbh);
               }
            }
       })
    },  
    // 获取里程碑目录任务
    getTasksByCatalog(catalog,catalogId,cpbh,cpmc,catalogType){
        getTasksByCatalog({
            xmbh:this.xmbh,
            catalog:catalog,
            catalogId:catalogId,
            cpbh:cpbh,
            cpmc:cpmc,
            catalogType:catalogType,
            curPage:1,
            pageSize:99999,
            taskType:"1",
            rwzt:"",
            keyword:""
          }).then(({data})=>{
            if(data.state == 'success'){
              this.LcbrwArr = data.data.rows
            }
        })
    },
             
    // 获取项目人员总数
      getItemUserNum(){
       queryProjectParticipant({
         xmbh:this.xmbh,
       }).then(({data})=>{
          if(data.state == 'success'){
              data.data.forEach((ele,i,arr)=>{
                if(ele.userName == ''){
                  data.data.splice(i,1);
                }
              })
               this.itemUserNum = data.data.length
          }
       }) 
       } 
    },

    watch:{
        name(n,o){
                  var _this=this;
                         var tab = this['list0'];
                         if(this.name){                                     
                            _this['listt0']=[];                     
                                tab.forEach(function (item,i,input){
                                    if(tab[i].userId.indexOf(_this.name) >= 0 ||tab[i].userName.indexOf(_this.name) >= 0) {
                                        _this['listt0'].push(tab[i]);
                                    }
                                });
                         }else{
                             _this['listt0'] = tab
                         };
  
        },
        dialogTableVisible(n,o){
          if(n){
                this.$nextTick(function(){
                 this.$refs.fileContent.appendChild(this.$refs.upload.$children[1].$el)
               });

                this.partyArr = [];
                  this.listt0.forEach((ele,i,input)=>{
                    if(JSON.stringify(this.dynamicTags).indexOf(JSON.stringify(this.listt0[i])) != -1){
                       this.partyArr.push(i)
                     }
                })
            }     
        },
        dynamicTags(n,o){
          this.partyArr = [];
                  this.listt0.forEach((ele,i,input)=>{       
                    if(JSON.stringify(this.dynamicTags).indexOf(JSON.stringify(this.listt0[i])) != -1){
                       this.partyArr.push(i)
                     }
                })
        },
    },


  activated(){
      this.fbcpmc = '';
      this.fbcpbh = '';
      this.userListShow = false
      this.baseUrl = window.baseurl
      this.shownindex = 0;
      this.taskActive = '';
      this.ViewTransition = true;
      this.tagGroup = JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag;
      if(this.$route.params.data == undefined){
        this.xmbh = JSON.parse(sessionStorage.getItem('xmbh'));
        this.xmkbInfo  = JSON.parse(sessionStorage.getItem('xmData')); 
        if(this.tagGroup.includes('JZFGCRY')){
           this.isAll = true           
        }else{
           this.isAll = this.xmkbInfo.isAll 
        }
      }else{
        sessionStorage.setItem('xmbh',JSON.stringify(this.$route.params.data.xmbh))
        sessionStorage.setItem('xmData',JSON.stringify(this.$route.params.data))
        this.xmbh = this.$route.params.data.xmbh ||  this.xmbh
        this.xmkbInfo = this.$route.params.data;
        if(this.tagGroup.includes('JZFGCRY')){
            this.isAll = true     
        }else{
            this.isAll = this.$route.params.data.isAll;
        }
      }
      this.tabsLabel = 'overview';
      if(window.userName != null){
        if(window.userName != this.xmkbInfo.yfzrrxm){
          this.Operatepower = false
        }else{
          this.Operatepower = true
        }
      }else{
        window.userName = sessionStorage.getItem('username');
        if(window.userName != this.xmkbInfo.yfzrrxm){
          this.Operatepower = false
        }else{
          this.Operatepower = true
        }
      }
      
      this.getItemUserNum();// 获取项目人员总数
      isVisibleXmtd({ // 是否显示 团队成员
         xmbh:this.xmbh
      }).then(({data})=>{
         if(data.state == 'success'){
             this.xmtdShow  = data.data
         }
     }) 
    },
  components:{
    itemTask,
    itemtable,
    itemSelect,
    pagination,
    dailyParper,
    enditTaskInfo,
    UserBanner,
    addItemUser,
    editLcbTasks,
    templateTabel,
    fileTable,
    milestoneGl,
    commitMilestone,
    question,
    complain,
    overview,
    teamWork
    }
}
</script>
<style scoped>
.project-item-people{
  position:absolute;
  right:20px;
  top:44px;
  z-index:100;
  border: 1px solid rgb(218, 217, 217);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
  border-radius: 5px;
  overflow: hidden;

}
.project_task_detail:after{
  content: "";
  display: block;
  clear: both;
}
.project_task_detail{
  min-height: calc(100% - 50px);
  /* display: flex; */
  font-size: 15px;
}
.project_task_detail_taskbar{
  width:300px;
  height:100%;
  position: fixed;
  border-right: 1px solid #ccc;
  background: #fff;
  overflow-y: auto;
}
.project_task_detail_taskbar ul.task_list{
  border-bottom: 1px solid #ccc;
  padding:0 0 12px 0 !important;
  max-height:600px;
  overflow-y: auto;
}
 .project_info{
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
  font-size:14px;   
  
}

.project_task_detail_taskbar ul.task_list li{
  padding: 5px 10px;
  position: relative;
  width: 100%;
}
.project_task_detail_taskbar ul.task_list li p{
  text-overflow: ellipsis;
  overflow: hidden;
}
.project_task_detail_taskbar ul.task_list li:hover{
  cursor: pointer;
  background: #eee;
}
.project_task_detail_taskbar ul.task_list li span{
  color: #363748;
  font-size: 14px;
}

.project_task_detail_taskbar  ul.task_complete_status li{
  padding: 10px;
  font-weight: 700;

}

.project_task_milestone{
  padding:10px 0;
  overflow-x: auto;
  height: calc(100vh - 80px);
  width:calc(100% - 300px);
  position: fixed;
  left: 300px;
}
.project_task_milestone .milestone-list{
   width: 100%;
   display: flex;
   overflow-x: auto;
}

.on_active{
  color:#3da8f5;
}

.project_task_detail .item_zrr{
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 20px;
  border-radius:50%;
  text-align: center;
  background: #3BA7F5;
  color: #fff !important;  
  font-size: 12px !important;
}
.project_task_detail .item_zrr_YF{
  background: #7ECE64;
}

.task-detail-dialog-header{
  border-bottom: 1px solid #ccc;
  padding:  0 20px;
}
.task-detail-dialog-header p{
  margin: 10px 0 !important;
}
.task-detail-dialog-header h2{
 font-weight: normal;
}
.task-detail-scenario-infos-wrap{
  border-bottom: 1px solid #ccc;
  padding:  0 20px;
}
.task-detail-scenario-infos-wrap>p{
  margin: 10px 0 !important;
}
.task-detail-scenario-infos-wrap p>span:nth-of-type(1){
  margin-right: 20px;
  color: #a6a6a6;
}
.detail-activities-wrap{
  background: #f5f5f5;
  padding:  0 20px;
}
.involve-view{
  border-bottom: 1px solid #ccc;
  padding: 10px 0 20px 0;
}
.involve-view button{
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 20px;
}
.el-tag{
  margin-right: 5px;
}
.activities-list-wrap{
  padding-bottom: 120px;
}
.activities-list-wrap .taskProcess-tips{
  text-align:center;
}
.activities-list-wrap .taskProcess-tips>a:hover{
  cursor: pointer;
   color: #8da8f5!important;
}
.activities-list-wrap .taskProcess-tips>a{
  display: block;
  color: #3da8f5;
  margin: 5px 20px;
}

.activities-list-wrap ul .task-detail-process{
  border-bottom: 1px solid #ccc;
}
.activities-list-wrap ul .task-detail-process p{
  font-size: 13px;

}
.activities-list-wrap ul li{
  padding:0 10px 5px 20px; 
}
.activities-list-wrap ul li p::after{
  content: "";
  display: block;
  clear: both;
}
/* .activities-list-wrap ul li>div>p:nth-of-type(1){
  float: left;
  border: 1px solid #000;
}
.activities-list-wrap ul li>div>p:nth-of-type(2){
  float: right;
} */
.activity-creator{
  width: 100%;
  background: #e5e5e5;
  position: absolute;
  bottom: 0;
}
.activity-creator .activity-creator-content{
  margin: 14px 20px 13px 15px;
}
.activity-creator-operate{
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  border-top: none;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
}
/* .activity-creator-operate:after{
    content: "";
  display: block;
  clear: both;
} */
.activity-creator-operate button.el-button{
  width: 60px;
  height: 30px;
  margin-top:5px;
  padding: 0 ;
  margin-left:0;
}
.task_participant{
  position: fixed;
  background: #fff;
  width: 220px;
  box-shadow: 0 0 5px #ccc;
  padding-top: 10px;
  z-index:1000;
}

.task_participant li:hover{
  background: #e5e5e5;
  cursor: pointer;
}
.task_participant li{
  padding: 2px 15px;
}
.task_participant .invite_newPerson{
  color: #549EF6;
  font-weight: 700;
}
.task_participant  .invite_newPerson span{
  display: inline-block;
  vertical-align: middle;
  font-size: 26px;
  color: #549EF6;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/*责任人*/
.project_task_zrr{
 box-shadow: 0 0 5px #999;
 background: #fff;
 width:50%;
 position: absolute;
 right: 0;
 z-index: 333;
}
.project_task_zrr li{
  font-size: 14px;
  color: #666;
  margin: 5px 0;
  display: flex;
}
.project_task_zrr li input{
  width:60%;
  background: #eee;
  outline: none;
  border: none;
}
.project_task_detail_cpmc{
  white-space: nowrap;
}
.process-daily{
   width:470px;
   overflow:hidden;
   white-space: nowrap;
   text-overflow: ellipsis;
   float:left;
   margin-top:7px;
   font-size:12px;
   color:#999;
}
.LcbTemplate{
  color:#549EF6;
  margin-right: 20px;
}
.LcbTemplate:hover{
  cursor: pointer;
  text-decoration: underline;
}
.process-fjlist{
  margin-right:20px;
  color: #549EF6;
}
.process-fjlist:hover{
  cursor: pointer;
  text-decoration: underline;
}
.process-gclx{
  font-size:12px;
  border-radius: 3px;
}
.gclx-rz{
  background: rgba(59, 167, 245, 0.2);
  color:#3BA7F5;
  border: 1px solid #3BA7F5;
}
.gclx-cb{
  background: rgba(245, 108, 108, 0.2);
  color:#F56C6C;
  border: 1px solid #F56C6C;
}
.myItem-top-bread{
  position: absolute;
  width:100%;
  z-index:100;
}
</style>
