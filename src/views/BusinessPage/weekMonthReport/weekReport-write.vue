<template>
 <div>
     <layout :title="''" :shown="shown">
          <!-- v-if="dayNum > 1 && dayNum < 4"  -->
          <div slot="btn">
            <el-button  type="danger" size="small" @click="handleFormulate">保存</el-button>
          </div>
          <header slot="header"> 
         </header>   
         <article slot="content">
             <section class="weekly-now">
                 <h4 class="filter-weight">本周工作总结  <span class="weekly-now-date">( {{monthly}}　{{'第'+(zcValue==1?'一':zcValue==2?'二':zcValue==3?'三':zcValue==4?'四':'五')+'周'}}　{{weekDay}})</span> </h4>
                 <hr class="weekly-hr">
                 <div>
                      <tableLayout :title="'里程碑工作总结'">
                        <div slot="bottom">
                            <div flex class="mg-12">
                                <el-input style="width:300px" @change="handleEnterSearch"  size="small" v-model="keyword" placeholder="请输入项目编号/项目名称"></el-input>&#x3000;
                                    <div class="colcenter">
                                        <span class="filter-weight">里程碑状态:&nbsp;</span>
                                        <lcbztSelect :multipleLcbztList="BzlcbztList" @handleChangeLcbzt="handleChangeLcbzt"></lcbztSelect>&#x3000;
                                    </div>
                           </div> 
                           <section class="month-plan-condition mg-12" >
                            <!-- <el-button type="primary" size="small" @click="handleAdded('lcb-bz')">新增</el-button> -->
                            <el-button v-if="!isBlocked" :disabled="!multipleBzLcb.length" size="small" @click="handleEditofBatch('bz')">批量编辑</el-button>
                          </section>
                            <WeekLcbTable :tableData="LcbList" @handleClickPz="handleBzLcbPz" @handleClickCheck="handleBzLcbCheck" @handleCurrentChange="handleBzLcbChange" 
                         @handleSizeChange="handleBzlcbSizeChange" @handleSelectionChange="handleSelectionBzlcb" @handleClickDelete="handleDeleteBzLcb" @handleClickEdit="handleEditBzLcb" :wordShow="true" 
                         :gznrShow="true" :isSelect="true" :isEdit="!isBlocked" :ispz='false' :pageSize="bzlcbPageSize" :records="LcbRecords" :currentPage="currentNowLcbPage"
                         :bjWordShow="true" :isDelete="false"></WeekLcbTable>
                        </div>
                    </tableLayout>    
                    <tableLayout :title="'进度任务总结'">
                        <div slot="bottom">
                             <div class="weekly-addbtn"><el-button type="primary" size="small" @click="handleAdded('rwjd-bz')">新增</el-button></div>
                            <processTable :tableData="ProcessList"  @handleClickEdit="handleEditBzJd" @handleClickPz="handleBzJdPz" @handleClickCheck="handleBzJdCheck" @handleCurrentChange="handleBzJdChange"
                        @handleSizeChange="handleBzjdSizeChange" @handleClickDelete="handleDeleteBzjd" :isPz="false" :pageSize="bzjdPageSize" :records="JdRecords" :gznrShow="true" :currentPage="currentNextLcbPage"
                         :bjWordShow="true" :deleteShow="!isBlocked"  :isEdit="!isBlocked" :wordShow="true"></processTable>
                        </div>
                    </tableLayout>    
                    <tableLayout :title="'问题处理总结'">
                        <div slot="bottom">
                          <section class="mg-12">
                            <el-input style="width:300px" @change="handleBzWtEnterSearch"  size="small" v-model="bzwtKeyword" placeholder="请输入项目编号/项目名称/问题标题/提问人"></el-input>&#x3000;
                            <span>
                                <span class="filter-weight">问题状态：</span>
                                <el-select v-model="wtztValue" size="small" placeholder="请选择" multiple @change="handleSelectWtzt">
                                    <el-option v-for="item in wtztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </span>
                            <span>
                                <span class="filter-weight">异常状态：</span>
                                <el-select v-model="ycztValue" size="small" placeholder="请选择" @change="handleSelectYczt">
                                    <el-option v-for="item in ycztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </span>
                          </section>
                          <section class="month-plan-condition mg-12" >
                            <el-button type="primary" size="small" @click="handleAdded('wtcl-bz')">新增</el-button>
                            <el-button v-if="!isBlocked" :disabled="!multipleBzWt.length" size="small" @click="handleEditofBatchWt">批量编辑</el-button>
                          </section>
                            <div class="weekly-addbtn"></div>
                            <MonthWeekQuestionTable :tableData="QuestionList" @handleClickDelete="handleDeleteBzwt" @handleClickEdit="handleEditBzWt" @handleClickCheck="handleBzWtCheck"
                        @handleSizeChange="handleBzwtSizeChange" @handleCurrentChange="handleBzwtChange"  @handleSelectionChange="handleSelectionBzwt" :isSelect="true" :isPz="false" 
                        :bjWordShow="true" :isEdit="!isBlocked" :deleteShow="!isBlocked" :show="false" :pageSize="bzwtPageSize" :records="WtRecords" :currentPage="currentNowWtPage"></MonthWeekQuestionTable>
                        </div>
                    </tableLayout>  
                 </div>
             </section>
         </article> 
         
          <article slot="contentBottom">
              <section class="weekly-next">
                 <h4 class="filter-weight">下周工作计划 <span class="weekly-now-date">( {{NextMonth}}　{{'第'+(NextweekValue==1?'一':NextweekValue==2?'二':NextweekValue==3?'三':NextweekValue==4?'四':'五')+'周'}}　{{nextWeekDay}})</span> </h4>
                 <hr class="weekly-hr">
                 <div>
                      <tableLayout :title="'里程碑工作计划'">
                        <div slot="bottom">
                            <section class="monthReport-plan-filter mg-12" flex>
                                <div>
                                    <el-input style="width:300px" @change="handleXzLcbEnterSearch"  size="small" v-model="xzlcbkeyword" placeholder="请输入项目编号/项目名称"></el-input>&#x3000;
                                    <span class="filter-weight">项目类别:</span>
                                    <el-select v-model="xmlbValue" size="small" placeholder="请选择" collapse-tags multiple @change="handleSelectXmlb">
                                        <el-option v-for="(xmlb,i) in xmlbList" :key="i" :label="xmlb" :value="xmlb"></el-option>
                                    </el-select>
                                </div>&#x3000;
                                <div>
                                    <span class="filter-weight">产品线:</span>
                                    <el-select v-model="cpxValue" size="small" placeholder="请选择" collapse-tags multiple @change="handleSelectCpx">
                                        <el-option v-for="cpx in cpxList" :key="cpx.id" :label="cpx.name" :value="cpx.id"></el-option>
                                    </el-select>
                                </div>&#x3000;
                                    <div class="colcenter">
                                        <span class="filter-weight">里程碑状态:&nbsp;</span>
                                        <lcbztSelect :multipleLcbztList="XzlcbztList" @handleChangeLcbzt="handleChangeXzLcbzt"></lcbztSelect>&#x3000;
                                    </div>
                           </section> 
                           <section class="month-plan-condition mg-12" >
                               <el-button type="primary" size="small" @click="handleAdded('lcb-xz')">新增</el-button>
                                <el-button v-if="!isNextBlocked" :disabled="!multipleXzLcb.length" size="small" @click="handleEditofBatch('xz')">批量编辑</el-button>
                          </section>
                            <WeekLcbTable :tableData="nextLcbList" :pageSize="xzlcbPageSize" :records="nextLcbRecords" @handleClickPz="handleXzLcbPz" @handleClickCheck="handleXzLcbCheck" @handleCurrentChange="handleXzLcbChange"
                          @handleClickEdit="handleEditXzLcb" @handleSelectionChange="handleSelectionXzlcb" @handleSizeChange="handleXzlcbSizeChange" @handleClickDelete="handleDeleteXzLcb" :isSelect="true"  :gznrShow="true"  :wordShow="false" :ispz='false' 
                        :bjWordShow="false" :isZj="false" :isDelete="!isNextBlocked" :isEdit="!isNextBlocked"  :currentPage="currentNextLcbPage"></WeekLcbTable>
                        </div>
                    </tableLayout>    
                    <tableLayout :title="'进度任务计划'">
                        <div slot="bottom">
                            <div class="weekly-addbtn"><el-button type="primary" size="small" @click="handleAdded('rwjd-xz')">新增</el-button></div>
                            <processTable :tableData="nextProcessList"  @handleClickPz="handleXzJdPz"  @handleClickEdit="handleEditXzJd" @handleClickCheck="handleXzJdCheck" @handleCurrentChange="handleXzJdChange"
                          @handleSizeChange="handleXzjdSizeChange" @handleClickDelete="handleDeleteXzjd" :isPz="false" :pageSize="xzjdPageSize" :records="nextJdRecords" :currentPage="currentNextJdPage"
                          :bjWordShow="true" :isZj="false" :deleteShow="!isNextBlocked" :isEdit="!isNextBlocked" ></processTable>
                        </div>
                    </tableLayout>    
                    <tableLayout :title="'问题处理计划'">
                        <div slot="bottom">
                            <section class="mg-12">
                                    <el-input style="width:300px" @change="handleXzWtEnterSearch"  size="small" v-model="xzwtKeyword" placeholder="请输入项目编号/项目名称/问题标题/提问人"></el-input>&#x3000;
                            <span>
                                <span class="filter-weight">问题状态：</span>
                                <el-select v-model="xzwtztValue" size="small" placeholder="请选择" multiple @change="handleSelectXzWtzt">
                                    <el-option v-for="item in wtztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </span>
                            <span>
                                <span class="filter-weight">异常状态：</span>
                                <el-select v-model="xzycztValue" size="small" placeholder="请选择" @change="handleSelectXzYczt">
                                    <el-option v-for="item in ycztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </span>
                          </section>
                            <div class="weekly-addbtn"></div>
                            <section class="month-plan-condition mg-12" >
                                <el-button type="primary" size="small" @click="handleAdded('wtcl-xz')">新增</el-button>
                                <el-button v-if="!isNextBlocked" :disabled="!multipleXzWt.length"  size="small" @click="handleEditofBatchNextWt">批量编辑</el-button>
                            </section>
                             <!-- v-if="!isNextBlocked" -->
                            <MonthWeekQuestionTable :tableData="nextQuestionList" @handleClickDelete="handleDeleteXzwt" @handleCurrentChange="handleXzwtChange" @handleClickEdit="handleEditXzWt" @handleClickCheck="handleXzWtCheck" :currentPage="currentNextWtPage"
                           @handleSizeChange="handleXzwtSizeChange" @handleSelectionChange="handleSelectionXzwt" :othShow="false" :isSelect="true" :pageSize="xzwtPageSize" :records="nextWtRecords"  :isPz="false"  :show="false"
                           :bjWordShow="true" :isZj="false" :deleteShow="!isNextBlocked" :isEdit="!isNextBlocked"></MonthWeekQuestionTable>
                        </div>
                    </tableLayout>  
                    <tableLayout :title="''">
                        <div slot="bottom">
                            <div  style="text-align:right">
                              <el-button  type="danger" size="small" @click="handleFormulate">保存</el-button>
                            </div>
                        </div>
                    </tableLayout>  
                 </div>
             </section>
         </article>    
     </layout>

     <wtDialog :show.sync="wtShow" :lastDay="cnjssj" @handleClickSure="handleWtClickSure"></wtDialog>
     <jdDialog :taskInfo="taskInfo"  :show.sync="jdShow" @handleSubmit="handleSubmit" :isweekzj="isweekzj" :isaddTask="isaddTask"></jdDialog>
     <pzDialog :show.sync="pzShow"></pzDialog>
     <lcbDialog :show.sync="lcbShow" :lastDay="cnjssj"  :month="monthly" @handleClickSure="handleLCbClickSure"></lcbDialog>
     <bjDialog :data="bjInfo" :isShow="gznrShow" :isCljh="isCljh" :yycsShow="yycsShow" :show.sync="editShow" @handleClickSure="handleClickEditSure"></bjDialog>
     <detailDialog :show.sync="detailShow" :title="detailTitle" :detailType="detailType"></detailDialog>
 </div>
</template>

<script>
import { EventBus,getMenu, getSession,getWeeks,getLastMonth,GetNextDate,getNextMonth } from '@/utils/util.js'
import layout from "@/components/layout/MonthWeekLayout.vue";
import WeekLcbTable from "@/components/BusinessPage/MonthWeekTable.vue";
import MonthWeekQuestionTable from "@/components/BusinessPage/MonthWeekQuestionTable.vue";
import processTable from "@/components/weekReport/processTable.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import wtDialog from '@/components/dialog/addwt-dialog.vue'
import jdDialog from '@/components/dialog/jd-dialog.vue'
import pzDialog from '@/components/dialog/pz-dialog.vue'
import lcbDialog from '@/components/dialog/lcb-dialog.vue'
import bjDialog from "@/components/dialog/bj-dialog.vue";
import lcbztSelect from '@/components/monthReport/lcbzt-select.vue'
import detailDialog from "@/components/dialog/detail-dialog.vue";
import { saveWeeklyReport,addWeekWorkPlan,deleteWeekWork,addWeekQuestionPlan,pageWeekWork,pageWeekQuestion,
 pageWeeklyReport,deleteWeeklyReport,deleteWeekQuestion,saveWeekQuestionm,isWeekPlanBlocked,mapLcbxxForPlan,
 pageQuestionForWeekPlan,getCpx,batchUpdateWeekQuestionCljh,batchUpdateWeekWork,batchUpdateWeekQuestion,batchUpdateWeekWorkAll,
 batchUpdateWeekQuestionAll,batchUpdateWeekWorkGznr,allowSaveWeekPlan} from '@/api/weekMonthReport.js'

export default {
  data() {
    return {
      xmlbList: ['软件','集成','软件服务','集成服务'],
      cpxList:[],
      wtztList:[
                {value: '0',label: '处理中'},
                {value: '2',label: '已申请关闭'},
                ],
      ycztList:[{value: '',label: '全部'},
                {value: '0',label: '超期'},
                {value: '1',label: '未超期'},],
      cpxValue:[],
      ycztValue:'',
      wtztValue:[],
      xzwtztValue:[],
      xzycztValue:'',
      xmlbValue:['软件'],
      BzlcbztList:[],
      XzlcbztList:[1],
      keyword:'',       //本周里程碑
      bzwtKeyword:'',   //本周问题
      xzlcbkeyword:'',  //下周里程碑
      xzwtKeyword:'',   //下周问题
      LcbList:[],
      LcbRecords:null,
      QuestionList:[],
      WtRecords:null,
      ProcessList:[],
      JdRecords:null,
      nextLcbList:[],
      nextLcbRecords:null,
      nextQuestionList:[],
      nextWtRecords:null,
      nextProcessList:[],
      nextJdRecords:null,
      bzlcbPageSize:10,
      bzjdPageSize:10,
      bzwtPageSize:10,
      xzlcbPageSize:10,
      xzjdPageSize:10,
      xzwtPageSize:10,
      shown: true,
      monthly:'',
      weeksNum:'',
      zcValue:1,
      wtShow:false,
      jdShow:false,
      pzShow:false,
      lcbShow:false,
      editShow:false,
      detailShow:false,  // 详情弹窗
      detailTitle:'',
      detailType:{},
      yhbh:'',
      NextweekValue:1,
      NextMonth:null,
      isNextWeek:false,
      taskInfo:{},
      bjInfo:{},
      Wid:'',
      wtWid:'',
      index:'',
      weekDay:'',
      nextWeekDay:'',
      isBlocked:false,
      isNextBlocked:false,
      currentNowLcbPage:1,
      currentNextLcbPage:1,
      currentNowJdPage:1,
      currentNextJdPage:1,
      currentNowWtPage:1,
      currentNextWtPage:1,
      multipleBzLcb:[],
      multipleBzWt:[],
      multipleXzLcb:[],
      multipleXzWt:[],
      firstWeekDate:'',
      yycsShow:false,
      gznrShow:false,
      isPlan:false,
      isCljh:true,
      cnjssj:'',
      bzJssj:'',
      groupTag:'',
      isweekzj:false,
      paramObj:this.dateObj,
      prevMinDate:'',
      prevMaxDate:'',
      isaddTask:true,
      nextWeeksNum:''
    };
  },
  mounted(){
        EventBus.$on("handleClickAddzb", param => {
            this.paramObj = param;
            let year = this.paramObj.month.split('-')[0];
            let month =  this.paramObj.month.split('-')[1];
            this.monthly = year+'-'+month
            this.yhbh = JSON.parse(getSession('userInfo').uid);
            this.weeksNum = this.paramObj.weeksNum
            this.zcValue = this.paramObj.weekValue
            this.weekDay = this.getWeekDate(year,month-1,this.zcValue); //当前周日期
            if(this.zcValue == this.weeksNum){
                    this.NextweekValue = 1
                    this.NextMonth =  getNextMonth(this.monthly);  //下个月
            }else{
                this.NextweekValue = this.zcValue+1;
                this.NextMonth = this.monthly
            }
                this.bzJssj = this.getWeekDate(year,month-1,this.weeksNum).split('至')[1]; 
                this.nextWeeksNum = getWeeks(this.NextMonth.split('-')[0],this.NextMonth.split('-')[1]);
                this.nextWeekDay = this.getWeekDate(this.NextMonth.split('-')[0],this.NextMonth.split('-')[1]-1==0?this.NextMonth.split('-')[1]:this.NextMonth.split('-')[1]-1,this.NextweekValue);
                this.isWeekPlanBlocked(this.monthly,this.zcValue,false);         // 本周
                this.isWeekPlanBlocked(this.NextMonth,this.NextweekValue,true);  // 下周
                this.promise().then((value)=>{
                   this.getWeekPlanData();             // 获取周计划填写
                })
        });
      
      this.groupTag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
      let year = this.dateObj.month.split('-')[0];
      let month =  this.dateObj.month.split('-')[1];
      this.monthly = year+'-'+month
      this.yhbh = JSON.parse(getSession('userInfo').uid);
      this.weeksNum = this.dateObj.weeksNum
      this.zcValue = this.dateObj.weekValue
      this.weekDay = this.getWeekDate(year,month-1,this.zcValue); //当前周日期
      if(this.zcValue == this.weeksNum){
            this.NextweekValue = 1
            this.NextMonth =  getNextMonth(this.monthly);  //下个月
       }else{
           this.NextweekValue = this.zcValue+1;
           this.NextMonth = this.monthly
       }
        this.bzJssj = this.getWeekDate(year,month-1,this.weeksNum).split('至')[1]; 
        this.nextWeeksNum = getWeeks(this.NextMonth.split('-')[0],this.NextMonth.split('-')[1]);
        this.nextWeekDay = this.getWeekDate(this.NextMonth.split('-')[0],this.NextMonth.split('-')[1]-1==0?this.NextMonth.split('-')[1]:this.NextMonth.split('-')[1]-1,this.NextweekValue);
        this.isWeekPlanBlocked(this.monthly,this.zcValue,false);         // 本周
        this.isWeekPlanBlocked(this.NextMonth,this.NextweekValue,true);  // 下周
        this.promise().then((value)=>{
           this.getWeekPlanData();             // 获取周计划填写
      })
  },
  props:{
      dateObj:{
          type:Object,
          defualt:()=>{
              return {}
          }
      },
  },
  activated(){

  },
  methods: {
      handleFormulate(){
         allowSaveWeekPlan({
            month:this.monthly,
            zxh:this.zcValue,
            yhbh:this.yhbh
         }).then(({data})=>{
             if(data.state == 'success'){
                 if(!!data.data){
                    this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success',
                      callback: action => {
                            this.$emit('handleFormulate','');
                     }});
                 }else{
                    this.$alert('未完成原因、后续措施为必填项，请填写', '提示', {confirmButtonText: '确定',type:'warning',
                    callback: action => {
                         
                    }});   
                 }
             }
         })
      },
      handleBzlcbSizeChange(data){  // 本周里程碑（每页数据）
        this.bzlcbPageSize = data
        this.pageWeekWork(1,this.monthly,this.zcValue,false);
        this.currentNowLcbPage = 1;
      },    
      handleBzjdSizeChange(data){   
        this.bzjdPageSize = data;
        this.pageWeeklyReport(1,this.monthly,this.zcValue,false);  
        this.currentNowJdPage = 1;  
      },
      handleBzwtSizeChange(data){
        this.bzwtPageSize = data;
        this.pageWeekQuestion(1,this.monthly,this.zcValue,false);
        this.currentNowWtPage = 1;
      },
      handleXzlcbSizeChange(data){
        this.xzlcbPageSize = data;
        this.pageWeekWork(1,this.monthly,this.NextweekValue,true);
        this.currentNextLcbPage = 1;
      },
      handleXzjdSizeChange(data){
        this.xzjdPageSize = data;
        this.pageWeeklyReport(1,this.monthly,this.NextweekValue,true);
        this.currentNextJdPage = 1; 
      },
      handleXzwtSizeChange(data){
        this.xzwtPageSize = data;
        this.pageWeekQuestion(1,this.monthly,this.NextweekValue,true);
        this.currentNextWtPage = 1;
      },
    handleAdded(param){                  // 进度 新增
        this.Wid = '';
        if(param == 'rwjd-bz' || param == 'rwjd-xz'){
            this.jdShow = true; 
            this.taskInfo = {};
            this.isaddTask = true
            if(param == 'rwjd-bz'){
                this.isweekzj = true;
            }else{
                this.isweekzj = false; 
            }
        }else if(param == 'wtcl-bz' || param == 'wtcl-xz'){
            this.wtShow = true; 
            if(param == 'wtcl-xz'){
              this.cnjssj = this.getWeekDate(this.NextMonth.split('-')[0],this.NextMonth.split('-')[1]-1,this.nextWeeksNum).split('至')[1];
            }else{
              this.cnjssj = this.bzJssj
            }
        }else if(param == 'lcb-bz' || param == 'lcb-xz'){ 
            this.lcbShow = true;
            if(param == 'lcb-xz'){
              this.cnjssj = this.getWeekDate(this.NextMonth.split('-')[0],this.NextMonth.split('-')[1]-1,this.nextWeeksNum).split('至')[1];
            }else{
              this.cnjssj = this.bzJssj  
            }
        }   
        if(param == 'rwjd-bz'||param == 'wtcl-bz'||param == 'lcb-bz'){
            this.isNextWeek = false
        }else{
            this.isNextWeek = true
        }
    },
    handleSubmit(data){                 //进度确定
          data.yhbh = this.yhbh;
          data.wid = this.Wid;
       if(!this.isNextWeek){
          data.yf = this.monthly;
          data.zxh = this.zcValue;     
       }else{
          data.yf = this.NextMonth;
          data.zxh = this.NextweekValue; 
          data.zt = ''
       }
        this.saveWeeklyReport(data);
    },
    handleBzLcbPz(data){},              // （本周里程碑）批注
    handleBzJdPz(data){},               // （本周进度）批注
    handleDeleteBzLcb(data){      // （本周里程碑）删除
        this.handleDeleteLcb(data,false);
    }, 
    handleDeleteBzjd(data){       // 本周进度  删除
        this.handleDeletejd(data,false);
    },
    handleDeleteBzwt(data){       // 本周问题  删除
        this.handleDeleteWt(data,false);
    },

    handleBzLcbChange(data){           // （本周里程碑）分页
       this.pageWeekWork(data,this.monthly,this.zcValue,false);
       this.currentNowLcbPage = data;
    },
    handleBzJdChange(data){            // （本周进度）分页
        this.pageWeeklyReport(data,this.monthly,this.zcValue,false);
        this.currentNowJdPage = data;
    },
    handleBzwtChange(data){            // （本周问题）分页
        this.pageWeekQuestion(data,this.monthly,this.zcValue,false);
        this.currentNowWtPage = data;
    },
    handleSelectionBzwt(zwtwids,wtwids){  //  本周问题 复选
        this.multipleBzWt = zwtwids
    },
    handleSelectionBzlcb(val){              //  本周里程碑 复选
        this.multipleBzLcb = val 
    },
    handleSelectionXzlcb(val){              //  下周里程碑 复选
        this.multipleXzLcb = val;
    },
    handleEnterSearch(){
        this.pageWeekWork(data,this.monthly,this.zcValue,false);     // 本周里程碑（关键字）
        this.currentNowLcbPage =1 ;
    },
    handleBzWtEnterSearch(){                                         // 本周问题（关键字）
        this.pageWeekQuestion(data,this.monthly,this.zcValue,false);
        this.currentNowWtPage = 1;
    },

    handleChangeLcbzt(val){                                      // 选择里程碑状态
        this.BzlcbztList = val;
        this.pageWeekWork(data,this.monthly,this.zcValue,false);     // 周里程碑
        this.currentNowLcbPage = 1 ;
    },
    handleEditofBatch(data){               // 批量 本周编辑里程碑
        this.Wid = ''
        this.isPlan = true;
        this.isCljh =  false;
        if(data=='bz'){
            this.gznrShow = false;           // 显示工作内容
            this.yycsShow = true;
            this.isNextWeek = false;            
        }else{
            this.gznrShow = false;          // 显示工作内容
            this.yycsShow = false;
            this.isNextWeek = true;            
        }
        this.bjInfo.wwcyy = '';
        this.bjInfo.hxcs = '';
        this.bjInfo.gznr = '';
        this.editShow = true; 
    },
    handleEditofBatchWt(){                   // 批量 本周编辑问题
        this.Wid = ''
        this.isPlan = false;
        this.bjInfo.wwcyy = '';
        this.bjInfo.hxcs = '';
        this.bjInfo.gznr = '';
        this.isNextWeek = false;         //是否本月
        this.yycsShow = true;
        this.gznrShow = true;
        this.isCljh = true;
        this.editShow = true; 
    },
    handleSelectWtzt(){                // 选择 本周问题状态
        this.pageWeekQuestion(data,this.monthly,this.zcValue,false);
        this.currentNowWtPage = 1;
    },  
    handleSelectYczt(){                // 选择 本周异常状态
        this.pageWeekQuestion(data,this.monthly,this.zcValue,false);
        this.currentNowWtPage = 1;        
    },

    // ************ 下周
    handleXzLcbEnterSearch(){          // 下周里程碑（关键字）
        this.pageWeekWork(1,this.NextMonth,this.NextweekValue,true);
        this.currentNextLcbPage = 1;  
    },
    handleChangeXzLcbzt(val){             // 下周里程碑（状态）
        this.XzlcbztList = val;
        this.pageWeekWork(1,this.NextMonth,this.NextweekValue,true);
        this.currentNextLcbPage = 1; 
    },
     handleSelectXmlb(){               // 下周项目类别
        this.pageWeekWork(1,this.NextMonth,this.NextweekValue,true);
        this.currentNextLcbPage = 1; 
    },
    handleSelectCpx(){                  // 下周产品线
        this.pageWeekWork(1,this.NextMonth,this.NextweekValue,true);
        this.currentNextLcbPage = 1; 
    },
    handleEditofBatchNextWt(){          // 下周问题 批量编辑
        this.Wid = ''
        this.isPlan = false;
        this.bjInfo.gznr = '';
        this.isNextWeek = true; //是否本月
        this.yycsShow = false;
        this.gznrShow = true;
        this.isCljh = true;
        this.editShow = true; 
    },
    handleXzWtEnterSearch(){           // 下周问题（关键字）
        this.pageWeekQuestion(1,this.NextMonth,this.NextweekValue,true);
        this.currentNextWtPage = 1;
    },
    handleSelectXzWtzt(val){              // 下周问题状态
        this.pageWeekQuestion(1,this.NextMonth,this.NextweekValue,true);
        this.currentNextWtPage = 1;    
    },
    handleSelectXzYczt(){              // 下周异常状态
        this.pageWeekQuestion(1,this.NextMonth,this.NextweekValue,true);
        this.currentNextWtPage = 1;  
    },
    handleXzLcbPz(data){},             // （下周里程碑）批注
    handleXzJdPz(data){},              // （下周进度）批注

    handleDeleteXzLcb(data){     // （下周里程碑）删除
        this.handleDeleteLcb(data,true);
    },
    handleDeleteXzjd(data){      //  下周进度 删除
        this.handleDeletejd(data,true);
    },
    handleDeleteXzwt(data){      //  下周问题 删除
        this.handleDeleteWt(data,true);
    },
    
    handleXzLcbChange(data){           // （下周里程碑）分页
        this.pageWeekWork(data,this.NextMonth,this.NextweekValue,true);
        this.currentNextLcbPage = data;
    },
    handleXzJdChange(data){            // （下周进度）分页
         this.pageWeeklyReport(data,this.NextMonth,this.NextweekValue,true);
         this.currentNextJdPage = data;
    },
    handleXzwtChange(data){            // （下周问题）分页
        this.pageWeekQuestion(data,this.NextMonth,this.NextweekValue,true);
        this.currentNextWtPage = data;
    },
    handleSelectionXzwt(zwtwids,wtwids){            // 下周问题 复选
         this.multipleXzWt = wtwids    
    },
    handleEditBzLcb(data){            // 本周里程碑 编辑    
       this.isNextWeek = false;
       this.isPlan = true;
       this.yycsShow = true;
       this.gznrShow = false;
       this.isCljh = false;   
       this.Wid = data.zgzWid;
       this.bjInfo.wwcyy = data.wwcyy;
       this.bjInfo.hxcs = data.hxcs;
       this.bjInfo.gznr = data.gznr;
       this.editShow = true; 
    },
    handleEditXzLcb(data){            // 下周里程碑 编辑    
       this.isNextWeek = true;
       this.isPlan = true;
       this.yycsShow = false;
       this.gznrShow = true;
       this.isCljh = false;   
       this.Wid = data.zgzWid;
       this.bjInfo.gznr = data.gznr;
       this.editShow = true; 
    },
    handleEditBzWt(data){   // 本周问题 编辑
       this.isNextWeek = false;
       this.isPlan = false;
       this.yycsShow = true;
       this.gznrShow = true;
       this.isCljh = true;
       this.Wid = data.zwtWid;
       this.wtWid = data.wtwid;
       this.bjInfo.wwcyy = data.wwcyy;
       this.bjInfo.hxcs = data.hxcs;
       this.bjInfo.gznr = data.cljh;
       this.editShow = true; 
    },
    handleEditXzWt(data){   // 下周问题 编辑
       this.yycsShow = false;
       this.gznrShow = true;
       this.isCljh = true;
       this.isNextWeek = true;
       this.isPlan = false;
       this.Wid = data.wtwid;
       this.bjInfo.gznr = data.cljh;
       this.editShow = true; 
    },
    handleEditBzJd(data){        // （本周进度）编辑  
        this.isNextWeek = false;     
        this.taskInfo = data;
        if(new Date(data.cjsj).getTime() < this.prevMinDate){
            this.isaddTask = false
        }else{
            this.isaddTask = true
        }
        this.Wid = data.wid;
        this.isweekzj = true;
        this.jdShow = true;
    },
    handleEditXzJd(data){        // （下周进度）编辑                            
        this.isNextWeek = true;
        this.isaddTask = true
        this.taskInfo = data;
        this.Wid = data.wid;
        this.isweekzj = false;
        this.jdShow = true;  
    },
      handleClickEditSure(data){          //编辑确定
            if(!this.isNextWeek){      
                if(this.isPlan){         // 本周 里程碑
                    batchUpdateWeekWorkAll({
                        zgzwids:this.Wid?this.Wid:this.multipleBzLcb.join(','),
                        wwcyy:data.wwcyy,
                        hxcs:data.hxcs,
                        gznr:data.gznr
                    }).then(({data})=>{
                        if(data.state == 'success'){
                            this.editShow = false;
                            this.$alert('保存成功', '提示', {confirmButtonText: '确定',type:'success'});
                            this.pageWeekWork(this.currentNowLcbPage,this.monthly,this.zcValue,false);      
                         }else{
                             this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});  
                         }
                    })     
                }else{
                    batchUpdateWeekQuestionAll({
                        zwtwids:this.Wid?this.Wid:this.multipleBzWt.join(','),
                        yhbh:this.yhbh,
                        month:this.monthly,
                        zxh:this.zcValue,
                        wwcyy:data.wwcyy,
                        hxcs:data.hxcs,
                        cljh:data.gznr
                    }).then(({data})=>{
                        if(data.state == 'success'){
                           this.editShow = false;
                           this.$alert('保存成功', '提示', {confirmButtonText: '确定',type:'success'});
                           this.pageWeekQuestion(this.currentNowWtPage,this.monthly,this.zcValue,false);      
                         }else{
                            this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});  
                         }
                    }) 
                }
            }else{
               if(!this.isPlan){
                   batchUpdateWeekQuestionCljh({
                        wtwids:this.Wid?this.Wid:this.multipleXzWt.join(','),
                        cljh:data.gznr,
                        yhbh:this.yhbh,
                        month:this.NextMonth,
                        zxh:this.NextweekValue
                    }).then(({data})=>{
                        if(data.state == 'success'){
                            this.editShow = false;
                           this.$alert('保存成功', '提示', {confirmButtonText: '确定',type:'success'});
                           this.pageWeekQuestion(this.currentNextWtPage,this.NextMonth,this.NextweekValue,true);    
                         }else{
                           this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});  
                         }
                    })  
               }else{
                    batchUpdateWeekWorkGznr({
                        zgzwids:this.Wid?this.Wid:this.multipleXzLcb.join(','),
                        gznr:data.gznr
                    }).then(({data})=>{
                        if(data.state == 'success'){
                            this.editShow = false;
                            this.$alert('保存成功', '提示', {confirmButtonText: '确定',type:'success'});
                            this.pageWeekWork(this.currentNextLcbPage,this.NextMonth,this.NextweekValue,true);      
                         }else{
                             this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});  
                         }
                    })
               } 
            }
    },
    handleDeletejd(data,isNextWeek){     // （进度）删除   
        this.$confirm('是否确定删除该任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteWeeklyReport({
                 wid:data.wid
            }).then(({data})=>{
              if(data.state == 'success'){
                  if(isNextWeek){
                    this.pageWeeklyReport(this.currentNextJdPage,this.monthly,this.NextweekValue,true);
                  }else{
                    this.pageWeeklyReport(this.currentNowJdPage,this.monthly,this.zcValue,false);
                  }
                   this.$alert('删除成功！', '提示', {confirmButtonText: '确定',type:'success'});
               }else{
                   this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});  
               }
            })
        }).catch(() => {});      
    },
    handleDeleteWt(data,isNextWeek){    //删除 问题
       this.$confirm('是否确定删除该问题?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteWeekQuestion({
              zwtWid:data.zwtWid
            }).then(({data})=>{
              if(data.state == 'success'){
                  if(isNextWeek){
                      this.pageWeekQuestion(this.currentNextWtPage,this.monthly,this.NextweekValue,true);
                  }else{
                      this.pageWeekQuestion(this.currentNowWtPage,this.monthly,this.zcValue,false);
                  }
                 this.$alert('删除成功！', '提示', {confirmButtonText: '确定',type:'success'});
               }else{
                 this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'}); 
               }
            })
        }).catch(() => {}); 
    },  
    handleBzJdCheck(data){          // （进度）查看
       this.detailTitle = '进度任务详情'
       this.detailType.type = 'zbjhbzJd';
       this.detailType.wid = data.wid;
       this.detailShow = true;
    },  
    handleXzJdCheck(data){
       this.detailTitle = '进度任务详情'
       this.detailType.type = 'zbjhxzJd';
       this.detailType.wid = data.wid;
       this.detailShow = true;
    },
    handleBzLcbCheck(data){
       this.detailTitle = '里程碑工作详情'
       this.detailType.type = 'zbjhbzLcb';
       this.detailType.wid = data.zgzWid;
       this.detailShow = true;
    },
    handleXzLcbCheck(data){  // （里程碑）查看
       this.detailTitle = '里程碑工作详情'
       this.detailType.type = 'zbjhxzLcb';
       this.detailType.wid = data.zgzWid;
       this.detailShow = true;
    },
    handleBzWtCheck(data){       // 问题 查看
       this.detailTitle = '问题处理详情'
       this.detailType.type = 'zbjhbzWt';
       this.detailType.wid = data.zwtWid;
       this.detailShow = true;
    //     let routeData = this.$router.resolve({
    //         name: "MonthReportDetail",
    //         query: {
    //         wid:data.zwtWid,
    //         planType:4,
    //         p:1
    //       }
    //     });
    //   window.open(routeData.href, "_blank");
    },
    handleXzWtCheck(data){
       this.detailTitle = '问题处理详情'
       this.detailType.type = 'zbjhxzWt';
       this.detailType.wid = data.zwtWid;
       this.detailShow = true;
    },
    handleDeleteLcb(data,isNextWeek){      // （里程碑）删除
       this.$confirm('是否确定删除该工作计划?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteWeekWork({
             zgzWid:data.zgzWid
            }).then(({data})=>{
              if(data.state == 'success'){
                   if(isNextWeek){
                       this.pageWeekWork(this.currentNextLcbPage,this.NextMonth,this.NextweekValue,true);
                   }else{
                       this.pageWeekWork(this.currentNowLcbPage,this.monthly,this.zcValue,false);
                   }
                   this.$alert('删除成功！', '提示', {confirmButtonText: '确定',type:'success'});
               }else{
                   this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'}); 
               }
            })
        }).catch(() => {});   
    },

    handleWtClickSure(data){    // （问题新增） 提交
        if(this.isNextWeek){
            this.addWeekQuestionPlan(data,this.NextMonth,this.NextweekValue);   
        }else{
            this.addWeekQuestionPlan(data,this.monthly,this.zcValue); 
        }
    },
    handleLCbClickSure(data){   // 新增里程碑工作总结（提交）
        if(this.isNextWeek){
            this.addWeekWorkPlan(data,this.NextMonth,this.NextweekValue);
        }else{
            this.addWeekWorkPlan(data,this.monthly,this.zcValue);  
        }   
    },
    saveWeeklyReport(obj){          // 保存进度
        saveWeeklyReport(obj).then(({data})=>{
            if(data.state == 'success'){
               if(this.isNextWeek){
                    this.pageWeeklyReport(1,this.NextMonth,this.NextweekValue,true);
                }else{
                    this.pageWeeklyReport(1,this.monthly,this.zcValue,false); 
                }
                this.jdShow = false
                this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success'});
            }else{
                this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'}); 
            }
        })
     },
    //  saveWeekQuestion(yf,zxh,cljh){
    //      saveWeekQuestion({
    //         wid:this.Wid,
    //         yhbh:this.yhbh,
    //         yf:yf,
    //         zxh:zxh,
    //         wwcyy:'',
    //         hxcs:'',
    //         wtWid:this.wtWid,
    //         cljh:cljh
    //      }).then(({data})=>{
    //          if(data.state == 'success'){
    //              if(this.isNextWeek){
    //                 this.nextQuestionList[this.index].cljh = cljh 
    //              }else{
    //                 this.QuestionList[this.index].cljh = cljh
    //              }
    //             this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success'});
    //             this.editShow = false
    //          }else{
    //             this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'}); 
    //          }
    //      })
    //  },
     addWeekQuestionPlan(wids,month,zxh){  // 添加周问题
        addWeekQuestionPlan({
            wids:wids,
            month:month,
            zxh:zxh,
            yhbh:this.yhbh
        }).then(({data})=>{
          if(data.state == 'success'){
                if(this.isNextWeek){
                    this.pageWeekQuestion(1,this.NextMonth,this.NextweekValue,true);
                }else{
                    this.pageWeekQuestion(1,this.monthly,this.zcValue,false); 
                }
               this.wtShow = false
               this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success'});
           }else{
               this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'}); 
           }
        })
     },
     addWeekWorkPlan(lcbbhs,month,zxh){  // 添加里程碑工作
        addWeekWorkPlan({
            lcbbhs:lcbbhs,
            yhbh:this.yhbh,
            month:month,
            zxh:zxh,
        }).then(({data})=>{
            if(data.state == 'success'){
                 if(this.isNextWeek){
                    this.pageWeekWork(1,this.NextMonth,this.NextweekValue,true);
                 }else{
                    this.pageWeekWork(1,this.monthly,this.zcValue,false);  
                 }
               
                this.lcbShow = false
                this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success'});
            }else{
                 this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'}); 
            }
        })
     },
       pageWeekWork(curPage,month,zxh,isNext){  //获取周工作计划的列表
        pageWeekWork({
            curPage:curPage,
            pageSize:!isNext?this.bzlcbPageSize:this.xzlcbPageSize,
            qygc:'',
            month:month,
            zxh:zxh,
            yhbh:this.yhbh,
            keyword:isNext?this.xzlcbkeyword:this.keyword,
            xmlb:isNext?this.xmlbValue.join(','):'',
            cpxs:isNext?this.cpxValue.join(','):'',
            zts:isNext?this.XzlcbztList.join(','):this.BzlcbztList.join(',')
        }).then(({data})=>{
            if(data.state == 'success'){
                if(isNext){
                    this.nextLcbList = data.data.rows
                    this.nextLcbRecords = data.data.records
                }else{
                    this.LcbList = data.data.rows
                    this.LcbRecords = data.data.records
                }
            }else{
                this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});
            }
        })
    },
    
    pageWeekQuestion(curPage,month,zxh,isNext){  //获取周问题计划的列表
      pageWeekQuestion({
          curPage:curPage,
          pageSize:!isNext?this.bzwtPageSize:this.xzwtPageSize,
          qygc:'',
          month:month,
          zxh:zxh,
          yhbh:this.yhbh,
          keyword:isNext?this.xzwtKeyword:this.bzwtKeyword,
          wtzt:isNext?this.xzwtztValue.join(','):this.wtztValue.join(','),
          yczt:isNext?this.xzycztValue:this.ycztValue
      }).then(({data})=>{
          if(data.state == 'success'){
            if(isNext){
                this.nextQuestionList = data.data.rows
                this.nextWtRecords = data.data.records
            }else{
                data.data.rows.forEach(ele=>{
                    if(new Date(ele.cjsj).getTime() >= this.prevMinDate){
                       ele.szjh = false
                    }else{
                       ele.szjh = true
                    }
                })
                this.QuestionList = data.data.rows
                this.WtRecords = data.data.records
            } 
          }else{
            this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});
          }
      })
    },
    pageWeeklyReport(curPage,month,zxh,isNext){  //获取周进度计划的列表
      pageWeeklyReport({
          curPage:curPage,
          pageSize:!isNext?this.bzjdPageSize:this.xzjdPageSize,
          qygc:'',
          month:month,
          zxh:zxh,
          yhbh:this.yhbh
      }).then(({data})=>{
          if(data.state == 'success'){
            if(isNext){
                this.nextProcessList = data.data.rows
                this.nextJdRecords = data.data.records
            }else{
                 let _this = this;
                 this.ProcessList = data.data.rows.map(function (ele) {
                      if(new Date(ele.cjsj).getTime() >= _this.prevMinDate){
                            ele.szjh = false
                        }else{
                            ele.szjh = true
                        }
                    return ele;
                 });
                this.JdRecords = data.data.records
            }
          }else{
            this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});
          }
      })
    },
     isWeekPlanBlocked(month,zxh,isNextWeek){         // 是否封存
            isWeekPlanBlocked({
                month:month,
                zxh:zxh
            }).then(({data})=>{
                if(data.state == 'success'){
                    if(isNextWeek){
                        this.isNextBlocked = false
                        // this.isNextBlocked = data.data.block;
                    }else{
                        this.isBlocked = false
                        // this.isBlocked = data.data.block;
                        this.prevMinDate = new Date(data.data.min).getTime();
                        this.prevMaxDate = new Date(data.data.max).getTime();
                    } 
                }
            })
    },
    getWeekDate(year,month,val){ // 获取周具体日期
       let weekStartDate = GetNextDate(getLastMonth(year,month),(val-1)*7)
       let weekEndDate = GetNextDate(weekStartDate,6);
       return weekStartDate+' 至 '+weekEndDate
    },
    promise () {
            let _this = this;
            return new Promise ( function (resolve, reject) {
                    getCpx().then(({data})=>{
                        if(data.state=='success'){
                            _this.cpxList = data.data
                            data.data.forEach((ele,i,arr)=>{
                                if(ele.selected){
                                    _this.cpxValue.push(ele.id);
                                }
                            })
                        }
                        resolve(data.data)
                   })
            } )
        },
    getWeekPlanData(){
        this.pageWeekWork(1,this.monthly,this.zcValue,false);
        this.pageWeekQuestion(1,this.monthly,this.zcValue,false);
        this.pageWeeklyReport(1,this.monthly,this.zcValue,false);
        
        this.pageWeekWork(1,this.NextMonth,this.NextweekValue,true);
        this.pageWeekQuestion(1,this.NextMonth,this.NextweekValue,true);
        this.pageWeeklyReport(1,this.NextMonth,this.NextweekValue,true);
        this.currentNowLcbPage = 1;
        this.currentNextLcbPage = 1;
        this.currentNowJdPage = 1;
        this.currentNextJdPage = 1;
        this.currentNowWtPage = 1;
        this.currentNextWtPage = 1;
    }
  },
  components: {
    layout,
    WeekLcbTable,
    MonthWeekQuestionTable,
    tableLayout,
    processTable,
    wtDialog,
    jdDialog,
    pzDialog,
    lcbDialog,
    bjDialog,
    lcbztSelect,
    detailDialog
  }
};
</script>

<style scoped>
.weekly-addbtn {
  margin-bottom: 12px;
}
.weekly-now-date{
    font-size: 14px;
    color: rgb(153, 153, 153);
}
</style>

