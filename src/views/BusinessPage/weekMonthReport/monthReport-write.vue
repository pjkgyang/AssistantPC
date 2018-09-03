<template>
 <div>
   <layout :title="''" :shown='true'>
        <!-- v-if="dayNum > 1 && dayNum < 4"  -->
       <div slot="btn" v-if="groupTag.indexOf('JYGL') == -1">
            <el-button  type="danger" size="mini" @click="handleFormulate">保存</el-button>
       </div>
        <header slot="header" v-if="groupTag.indexOf('JYGL') != -1"> 
              <section>
                    <span>
                      <span class="filter-weight">区域:&nbsp;</span>
                      <el-select v-model="qyValue" size="mini" placeholder="请选择" @change="handleSelectQy">
                        <el-option v-for="item in gczdList" :key="item.label" :label="item.mc" :value="item.label"></el-option>
                     </el-select>
                    </span>&#x3000;
              </section>
         </header>  
         <article slot="content">
                 <h4 class="filter-weight">上月工作总结 <span style="font-size:15px;color:#999">( {{lastMonth}} )</span></h4>
                 <hr class="weekly-hr">
                 <div>
                     <tableLayout :title="'月度工作总结'">
                        <div slot="bottom">
                             <section class="monthReport-plan-filter">
                                <div flex>
                                    <el-input style="width:300px;" @change="handleEnterSearch"  size="mini" v-model="keyword" placeholder="请输入项目编号/项目名称"></el-input>&#x3000;
                                    <div class="colcenter">
                                        <span class="filter-weight">里程碑状态:</span>
                                        <lcbztSelect :multipleLcbztList="prevlcbztList"  @handleChangeLcbzt="handleChangePrevLcbzt"></lcbztSelect>&nbsp;
                                    </div>
                                    <div class="colcenter">
                                        <span class="filter-weight">计划状态：&nbsp;</span>
                                        <el-select style="width:200px" v-model="ztValue" size="mini" placeholder="请选择" @change="handleSelectZt">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </div>&#x3000;
                                </div> 
                           </section>
                            <section style="margin:12px 0" v-if="!isBlockedOfsy && groupTag.indexOf('JYGL') == -1">
                                <el-button  :disabled="!multiplePrevPlan.length"  size="mini" @click="handleEditofBatchPrevPlan">批量编辑</el-button>
                            </section>
                            <WeekLcbTable :tableData="PrevmonthWorkList"  @handleClickCheck="handleCheckDetail" @handleCurrentChange="handlePrevPlanChange" @handleSizeChange="handlePrevPlanSizeChange" @handleSelectionChange="handleSelectPrevPlan" 
                           @handleClickEdit="handleEditPrevPlan"  :pageSize="prevPlanpageSize" :records="records" :currentPage="currentPrevPlanPage"
                           :otherShow="true" :isEdit="false" :bjWordShow="true" :wordShow="true" :ispz="false" :isSelect="true" ></WeekLcbTable>
                        </div>
                    </tableLayout>  
                    <tableLayout :title="'月度问题处理总结'">
                        <div slot="bottom">
                             <section style="margin:10px 0">
                                  <el-input style="width:300px" @change="handleEnterPrevWtSearch"  size="mini" v-model="prevWtKeyword" placeholder="请输入项目编号/项目名称/问题标题/提问人"></el-input>&#x3000;
                                 <span>
                                    <span class="filter-weight">问题状态：</span>
                                    <el-select v-model="wtztValue" size="mini" placeholder="请选择" multiple @change="handleSelectWtzt">
                                        <el-option v-for="item in wtztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </span>
                                <span>
                                    <span class="filter-weight">异常状态：</span>
                                    <el-select v-model="ycztValue" size="mini" placeholder="请选择" @change="handleSelectYczt">
                                        <el-option v-for="item in ycztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </span>&nbsp;
                            </section>
                            <section style="margin:12px 0" v-if="!isBlockedOfsy && groupTag.indexOf('JYGL') == -1">
                                <el-button  :disabled="!multiplePrevWt.length"  size="mini" @click="handleEditofBatchPrevWt">批量编辑</el-button>
                            </section>
                            <MonthWeekQuestionTable :tableData="PrevquestionList" @handleClickPz="handleQuestionPz" @handleClickEdit="handleEditPrevWt" @handleClickCheck="handleQuestionDetail"  @handleCurrentChange="handlePrevWtChange" @handleSizeChange="handlePrevWtSizeChange"
                            @handleSelectionChange="handleSelectPrevWt"  :isSelect="true" :show="false" :othShow="true"  :pageSize="prevWtpageSize" :records="PrevQuestionRecords" :isPz="false" :deleteShow="false" 
                           :bjWordShow="true" :isEdit="true" :currentPage="currentPrevQuestionPage" ></MonthWeekQuestionTable>
                        </div>
                    </tableLayout>  
                 </div>
         </article>  

         <article slot="contentBottom">
                <div>
                    <h4 class="filter-weight">本月工作计划 <span style="font-size:15px;color:#999">( {{monthly}} )</span></h4> 
                </div>
                 <hr class="weekly-hr">

                   <div  flex >
                       <el-input style="width:300px;" @change="handleEnterPlanSearch"  size="mini" v-model="gzKeyword" placeholder="请输入项目编号/项目名称"></el-input>
                        <div class="colcenter">
                            <span class="filter-weight"> 计划状态：</span>
                            <el-select style="width:180px" v-model="byztValue" size="mini" placeholder="请选择" @change="handleSelectByZt">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                      </div>&#x3000;              
                    <!-- <div>
                        <span class="filter-weight">项目类别:</span>
                        <el-select v-model="xmlbValue" size="mini" placeholder="请选择" collapse-tags multiple @change="handleSelectXmlb">
                            <el-option v-for="(xmlb,i) in xmlbList" :key="i" :label="xmlb" :value="xmlb"></el-option>
                        </el-select>
                    </div>&#x3000;
                    <div>
                        <span class="filter-weight">产品线:</span>
                        <el-select v-model="cpxValue" size="mini" placeholder="请选择" collapse-tags multiple @change="handleSelectCpx">
                            <el-option v-for="cpx in cpxList" :key="cpx.id" :label="cpx.name" :value="cpx.id"></el-option>
                        </el-select>
                    </div>&#x3000;
                    <div class="colcenter" >
                        <span class="filter-weight">里程碑状态:</span>
                        <lcbztSelect :multipleLcbztList="nowlcbztList"  @handleChangeLcbzt="handleChangeNowLcbzt"></lcbztSelect>
                    </div>&nbsp; -->
                </div>
                <div style="padding:10px 0">
                    <p class="month-plan-explain" >查询仅供当前查看，不影响最终月度计划的指定</p>  
                </div>
                 <div>
                     <tableLayout :title="'月度工作计划 '+'( 合计完工: '+'<span style=color:#f00>'+Nowwg+'</span>'+'　 合计验收：'+'<span style=color:#f00>'+Nowys+'</span>'+' )'">
                        <div slot="bottom">
                            <WeekLcbTable :tableData="NowmonthWorkList"  @handleClickCheck="handleCheckDetailPlan" @handleCurrentChange="handleNowPlanChange" 
                            @handleSizeChange="handleNowPlanSizeChange" :selectShow="true" :pageSize="NowPlanpageSize" :records="Nowrecords" :currentPage="currentNowPlanPage"
                            :otherShow="true" :wordShow="false" :ispz="false"></WeekLcbTable>
                        </div>
                    </tableLayout>  
                    <tableLayout :title="'月度问题处理计划'">
                        <div slot="bottom">
                            <section style="margin:10px 0">
                                <el-input style="width:300px" @change="handleEnterWtSearch"  size="mini" v-model="wtKeyword" placeholder="请输入项目编号/项目名称/问题标题/提问人"></el-input>&#x3000;
                                <!-- <span>
                                    <span class="filter-weight">问题状态：</span>
                                    <el-select v-model="NowwtztValue" size="mini" placeholder="请选择" multiple @change="handleSelectNowWtzt">
                                        <el-option v-for="item in wtztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </span> -->
                                <!-- <span>
                                    <span class="filter-weight">异常状态：</span>
                                    <el-select v-model="NowycztValue" size="mini" placeholder="请选择" @change="handleSelectNowYczt">
                                        <el-option v-for="item in ycztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </span> -->
                            </section>
                            <section style="margin:12px 0" v-if="!isBlocked && groupTag.indexOf('JYGL') == -1"> 
                                <el-button  :disabled="!multipleNowWt.length"  size="mini" @click="handleEditofBatchNowWt">批量编辑</el-button>
                            </section>
                            <MonthQuestionForPlan :tableData="NowquestionList" @handleClickPz="handleQuestionPz" @handleClickEdit="handleEditNowWt" @handleClickCheck="handleByQuestionDetail"  @handleCurrentChange="handleNowWtChange"
                            @handleSelectionChange="handleSelectNowWt"  @handleSizeChange="handleNowWtSizeChange" :isSelect="true" :show="false" :pageSize="NowWtpageSize" :records="NowQuestionRecords" :isPz="false" :deleteShow="false" :currentPage="currentNowQuestionPage"
                            :isEdit="!isBlocked && groupTag.indexOf('JYGL') == -1"></MonthQuestionForPlan>
                        </div>
                    </tableLayout>  
                    <tableLayout :title="''"  v-if="groupTag.indexOf('JYGL') == -1">
                        <div slot="bottom">
                            <div style="text-align:right">
                               <el-button  type="danger" size="mini" @click="handleFormulate">保存</el-button>
                            </div>
                        </div>
                    </tableLayout>  

                 </div>
         </article> 
    </layout> 
     <!-- <addwtDialog :show.sync="wtShow" :lastDay="lastDay"   @handleClickSure="handleQuestionSure" ></addwtDialog> -->
     <bjDialog :yycsShow="yycsShow"  :isShow="!yycsShow" :isCljh='true' :show.sync="bjShow" :data="data" @handleClickSure="handleBjSure"></bjDialog>
     <pzDialog :show.sync="pzShow" @handleClickSure="handlePzSure"></pzDialog>

     <detailDialog :show.sync="detailShow" :title="detailTitle" :detailType="detailType"></detailDialog>
 </div>
</template>

<script>
import layout from "@/components/layout/MonthWeekLayout.vue";
import WeekLcbTable from "@/components/BusinessPage/MonthWeekTable.vue";
import MonthWeekQuestionTable from "@/components/BusinessPage/MonthWeekQuestionTable.vue";
import MonthQuestionForPlan from '@/components/monthReport/MonthQuestionForPlan.vue'
import tableLayout from "@/components/layout/tableLayout.vue";
// import addwtDialog from "@/components/dialog/addwt-dialog.vue";
import bjDialog from '@/components/dialog/bj-dialog.vue'
import pzDialog from '@/components/dialog/pz-dialog.vue'
import lcbztSelect from '@/components/monthReport/lcbzt-select.vue'
import detailDialog from "@/components/dialog/detail-dialog.vue";

import { getMenu, getSession,getLastMonthDay  } from "@/utils/util.js";
import { pageQuestionForPlan,mapLcbxxForPlan,pageMonthQuestion,addMonthQuestionPlan,
saveMonthQuestion,deleteMonthQuestion,generateMonthWork,isMonthPlanBlocked,getCpx,pageMonthWork,
batchUpdateMonthWork,batchUpdateMonthQuestion,batchUpdateMonthQuestionCljh} from '@/api/weekMonthReport.js'

 export default {
   data () {
     return {
        prevWtKeyword:'',
        wtKeyword:'',
        gzKeyword:'',
        xmlbList: ['软件','集成','软件服务','集成服务'],
        cpxList:[],
        options: [{value: '0',label: '完工计划'}, 
                    {value: '1',label: '验收计划'}],
        wtztList:[
                     {value: '0',label: '处理中'},
                     {value: '2',label: '已申请关闭'},
                     ],
        ycztList:[{value: '',label: '全部'},
                    {value: '0',label: '超期'},
                    {value: '1',label: '未超期'},],
        ycztValue:'',
        wtztValue:['0'],
        ztValue:'',
        byztValue:'',
        NowwtztValue:['0'],
        NowycztValue:'',
        xmlbValue:['软件','软件服务'],
        cpxValue:[],
        gczdList:[],
        monthly:new Date(),
        wtShow:false,
        bjShow:false,
        pzShow:false,
        yycsShow:true,
        cljhShow:false,
        isPlan:false,
        isCurmonth:false,   //是否本月
        detailShow:false,   //详情弹窗
        detailTitle:'',
        detailType:{},
        qyValue:'',
        lastDay:'',
        lastMonthDay:'',    //上个月最后一天
        lastMonth:"",       //上个月
        dayNum:'',          //当前 日
        data:{
            gznr:'',
            wwcyy:'',
            hxcs:''
        },
        Wid:'',
        wtInfo:'',
        index:null,
        Nowys:'',            // 验收
        Nowwg:'',            // 完工
        prevlcbztList:[1],   // 里程碑状态
        nowlcbztList:[1],
        prevPlanpageSize:10,
        prevWtpageSize:10,
        NowPlanpageSize:10,
        NowWtpageSize:10,
        records:0,
        Nowrecords:0,
        wtPageSize:10,
        wtRecords:0,
        PrevmonthWorkList:[],
        NowmonthWorkList:[],
        NowquestionList:[],
        PrevquestionList:[],
        PrevQuestionRecords:0,
        NowQuestionRecords:0,
        currentPrevPlanPage:1, 
        currentNowPlanPage:1,
        currentPrevQuestionPage:1,
        currentNowQuestionPage:1,
        multiplePrevPlan:[],
        multiplePrevWt:[],
        multipleNowPlan:[],
        multipleNowWt:[],
        isBlocked:false,
        isBlockedOfsy:false,
        groupTag:'',
        keyword:'',
        isJzuser:""
     }
   },
   
    methods:{ 
        handleEnterPrevWtSearch(){                   // 上月问题查询
            this.getMonthQuestionList(1);            // 月问题计划
            this.currentPrevQuestionPage = 1
        },
        handleEnterWtSearch(){                       // 月问题查询
            this.pageQuestionForPlan(1);             // 月问题计划
            this.currentNowQuestionPage = 1
        },

        handleEnterPlanSearch(){                      // 月计划 本月 
            this.mapLcbxxForPlan(1);
            this.currentNowPlanPage = 1; 
        },
        handleEnterSearch(){
           this.getMonthWorkList(1);            // 月工作计划(上月)
           this.currentPrevPlanPage =1 ;
        },
       handleChangePrevLcbzt(val){              // 选择里程碑状态(上月)
           this.prevlcbztList = val;
           this.getMonthWorkList(1);            // 月工作计划
           this.currentPrevPlanPage =1 ;
       },
       handleSelectZt(){                        // 上月计划状态
           this.getMonthWorkList(1);            // 月工作计划
           this.currentPrevPlanPage =1 ;     
       },
        // handleChangeDate(val){               //月度日期
        //    this.isMonthPlanBlocked(val);     //是否封存
        //    this.lastDay = getLastMonthDay(val.split('-')[0],Number(val.split('-')[1]));
        //    this.mapLcbxxForPlan(1);          //获取月工作;
        //    this.getMonthQuestionList(1);     //获取月制作 问题;
        //    this.currentPrevPlanPage = 1
        // },
        handleSelectQy(){
            this.mapLcbxxForPlan(1);                       //获取本月(计划)工作;
            this.getMonthWorkList(1);                      //获取上月工作;
            this.getMonthQuestionList(1);                  //获取上月制作 问题;
            this.pageQuestionForPlan(1);                   //获取本月计划 问题;     
            this.currentPrevPlanPage = 1
            this.currentNowPlanPage = 1
            this.currentPrevQuestionPage = 1
            this.currentNowQuestionPage = 1
        },

        handleFormulate(){                      // 制订月度计划 
            generateMonthWork({
                qygc:this.qyValue,
                month:this.monthly,
                gzKeyword:'',
                xmlb:this.xmlbValue.join(','),
                cpxs:this.cpxValue.join(','),
                zts:this.nowlcbztList.join(','),
                wtKeyword:'',
                wtzt:this.NowwtztValue.join(','),
                yczt:''
            }).then(({data})=>{
                if(data.state == 'success'){
                   this.$alert('制订成功！', '提示', {confirmButtonText: '确定',type:'success',
                    callback: action => {
                        this.$emit('handleFormulate','')
                    }});
                }else{
                    this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'}); 
                }
            })
        },
        handlePrevPlanChange(data){             //上月度制作（分页）
            this.currentPrevPlanPage = data;
            this.getMonthWorkList(data);
        },
        handlePrevPlanSizeChange(data){         //上月计划每页条数（分页）
            this.prevPlanpageSize = data;
            this.getMonthWorkList(1);
            this.currentPrevPlanPage = 1;
        },
        handlePrevWtSizeChange(data){           //上月问题每页条数（分页）
            this.prevWtpageSize = data;
            this.getMonthQuestionList(1); 
            this.currentPrevQuestionPage = 1;
        },
        handlePrevWtChange(data){               // 上月问题（分页）
            this.currentPrevQuestionPage = data;
            this.getMonthQuestionList(data);  
        },
        handleSelectPrevPlan(val){              // 上月计划复选（批量）
            this.multiplePrevPlan = val;
        },
        handleSelectPrevWt(val){                // 上月问题复选（批量）
            this.multiplePrevWt = val; 
        },
        handleSelectNowWt(val){                 // 本月问题复选 （批量）
            this.multipleNowWt = val;     
        },
        handleEditPrevPlan(data){               // 上月计划编辑
            this.Wid = data.ygzWid;
            this.yycsShow = true;
            this.isPlan = true;
            this.bjShow = true;
        },
        handleEditPrevWt(data){                 // 上月问题编辑
            this.Wid = data.ywtWid;
            this.wtInfo = data;
            this.isCurmonth = false;//是否本月
            this.isPlan = false;
            this.bjShow = true;
        },
        handleEditNowWt(data,index){              //（本月问题）编辑
            // this.data.gznr = '';
            // this.data.wwcyy = '';
            // this.data.cs = '';
            this.Wid = data.wtWid;
            this.isCurmonth = true;//是否本月
            this.isPlan = false;
            this.wtInfo = data;
            this.yycsShow = false;
            this.index = index;
            this.bjShow = true;
        },
        handleEditofBatchPrevPlan(){            // 上月计划编辑（批量）  
            this.Wid = '';
            this.isPlan = true;
            this.yycsShow = true;
            this.bjShow = true;
        },
        handleEditofBatchPrevWt(){               // 上月问题编辑（批量） 
            this.Wid = '';
            this.isPlan = false;
            this.isCurmonth = false;             // 是否本月
            this.bjShow = true;   
        },
        handleSelectByZt(){
             this.mapLcbxxForPlan(1);            // 获取本月(计划)工作;
             this.currentNowPlanPage = 1
        },
        handleEditofBatchNowWt(){               // 本月问题编辑（批量） 
            this.Wid = '';
            this.isPlan = false;
            this.isCurmonth = true; //是否本月
            this.yycsShow = false;
            this.bjShow = true;  
        },
        handleSelectWtzt(){                    // 问题状态 筛选
            this.getMonthQuestionList(1);
            this.currentPrevQuestionPage = 1;
        },
        handleSelectYczt(){                    // 问题状态 筛选
            this.getMonthQuestionList(1);
            this.currentPrevQuestionPage = 1;
        },
        handleCheckDetail(data){
             this.detailTitle = '里程碑工作详情'
             this.detailType.type = 'ybjhsyLcb';
             this.detailType.wid = data.ygzWid;
             this.detailShow = true;
        },
        handleCheckDetailPlan(data){
             this.detailTitle = '里程碑工作详情'
             this.detailType.type = 'ybjhbyLcb';
             this.detailType.lcbbh = data.lcbbh;
             this.detailType.month = this.monthly;
             this.detailShow = true;
        },
// ************************* wen ti 
        handleSelectXmlb(){
            this.mapLcbxxForPlan(1);
            this.currentNowPlanPage = 1;   
        },
        handleSelectCpx(){
            this.mapLcbxxForPlan(1);
            this.currentNowPlanPage = 1;   
        },
        handleNowPlanChange(data){             // 本月度计划（分页）     
            this.currentNowPlanPage = data;
            this.mapLcbxxForPlan(data);
        },
        handleNowPlanSizeChange(data){         // 本月计划每页条数（分页）
            this.NowPlanpageSize = data;
            this.mapLcbxxForPlan(1);           // 获取本月(计划)工作;
            this.currentNowPlanPage = 1;
        },
        handleChangeNowLcbzt(val){             //  本月 里程碑状态
            this.nowlcbztList = val;
            this.mapLcbxxForPlan(1);
            this.currentNowPlanPage = 1;
        },

        handleNowWtChange(data){               // 本月问题（分页）
            this.currentNowQuestionPage = data;
            this.pageQuestionForPlan(data);
        },
        handleNowWtSizeChange(data){           // 上月问题每页条数（分页）  
            this.NowWtpageSize = data;
            this.pageQuestionForPlan(1);
            this.currentNowQuestionPage = 1
        },
        handleQuestionPz(data){                //（问题）批注
            this.pzShow=true
        },
        handleSelectNowWtzt(){                 //（问题）问题状态     
            this.currentNowQuestionPage = 1;
            this.pageQuestionForPlan(1);
        },
        handleSelectNowYczt(){                 //（问题）异常状态     
            this.currentNowQuestionPage = 1;
            this.pageQuestionForPlan(1);
        },
        handleQuestionDetail(data){            //（问题）详情
             this.detailTitle = '问题处理详情'
             this.detailType.type = 'ybjhsyWt';
             this.detailType.wid = data.ywtWid;
             this.detailShow = true;
        },
        handleByQuestionDetail(data){            //（问题）详情
             this.detailTitle = '问题处理详情'
             this.detailType.type = 'ybjhbyWt';
             this.detailType.wid = data.wtWid;
             this.detailType.month = this.monthly
             this.detailShow = true;
        },
        
        handleBjSure(param){   //(编辑) 提交
            if(this.isPlan){ 
                    batchUpdateMonthWork({    // 批量编辑 工作计划
                        ygzwids:this.Wid?this.Wid:this.multiplePrevPlan.join(','),
                        wwcyy:param.wwcyy,
                        hxcs:param.hxcs,
                    }).then(({data})=>{
                        if(data.state == 'success'){
                            this.bjShow = false;
                            this.getMonthWorkList(this.currentPrevPlanPage);
                            this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success'});
                        }
                   })
                
            }else{
                if(!this.isCurmonth){
                    batchUpdateMonthQuestion({    // 批量编辑 工作计划
                        ywtwids:this.Wid?this.Wid:this.multiplePrevWt.join(','),
                        wwcyy:param.wwcyy,
                        hxcs:param.hxcs,
                    }).then(({data})=>{
                        if(data.state == 'success'){
                            this.bjShow = false;
                            this.getMonthQuestionList(this.currentPrevQuestionPage); 
                            this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success'});
                        }
                    })  
                }else{
                     batchUpdateMonthQuestionCljh({    // 批量编辑 处理计划
                        wtwids:this.Wid?this.Wid:this.multipleNowWt.join(','),
                        cljh:param.gznr,
                        month:this.monthly,
                        qygc:this.qyValue
                    }).then(({data})=>{
                        if(data.state == 'success'){
                            this.bjShow = false;
                            this.pageQuestionForPlan(this.currentNowQuestionPage);
                            this.$alert('保存成功！', '提示', {confirmButtonText: '确定',type:'success'});
                        }
                   })
                } 
            }
        },
        // handleDeleteQuestion(data){  // 删除问题
        //         this.$confirm('是否删除该问题?', '提示', {
        //             confirmButtonText: '确定',
        //             cancelButtonText: '取消',
        //             type: 'warning'
        //         }).then(() => {
        //             deleteMonthQuestion({
        //                 ywtWid:data.ywtWid
        //             }).then(({data})=>{
        //                 if(data.state == 'success'){
        //                    this.$alert('删除成功！', '提示', {confirmButtonText: '确定',type:'success'}); 
        //                    this.getMonthQuestionList(this.currentPrevQuestionPage);
        //                 }
        //             }) 
        //     }).catch(() => {});
        // },

        handlePzSure(param){        //(批注) 提交
            this.pzShow=false
        },

        getMonthWorkList(curPage){  //获取月工作计划(总览)列表
            pageMonthWork({
                curPage:curPage,
                pageSize:this.prevPlanpageSize,
                qygc:this.qyValue,
                month:this.lastMonth,
                planType:this.ztValue,
                keyword:this.keyword,
                zts:this.prevlcbztList.join(',')
            }).then(({data})=>{
                if(data.state == 'success'){
                    if(data.data.rows.length && data.data){
                        this.PrevmonthWorkList = data.data.rows
                        this.records = data.data.records
                    }else{
                        this.PrevmonthWorkList = []
                        this.records = 0 
                    }
                }
            })
        },
        getMonthQuestionList(curPage){  //获取月问题计划（总览）列表
            pageMonthQuestion({
                curPage:curPage,
                pageSize:this.prevWtpageSize,
                qygc:this.qyValue,
                month:this.lastMonth,
                wtzt:this.wtztValue.join(','),
                yczt:this.ycztValue,
                keyword:this.prevWtKeyword
            }).then(({data})=>{
                if(data.state == 'success'){
                    if(data.data.rows.length && data.data){
                        this.PrevquestionList = data.data.rows
                        this.PrevQuestionRecords = data.data.records
                    }else{
                        this.PrevquestionList = []
                        this.PrevQuestionRecords = 0
                    }
                }
            })
        },
        mapLcbxxForPlan(curPage){  // 月度计划（map）
            mapLcbxxForPlan({
                curPage:curPage,
                pageSize:this.NowPlanpageSize,
                qygc:this.qyValue,
                cnjssj:this.lastDay,
                keyword:this.gzKeyword,
                planType:this.byztValue,  // 计划分类
                xmlb:this.xmlbValue.join(','),
                cpxs:this.cpxValue.join(','),
                zts:this.nowlcbztList.join(',')
            }).then(({data})=>{
                if(data.state == 'success'){
                   if(data.data.page){
                         this.NowmonthWorkList = data.data.page.rows
                         this.Nowrecords = data.data.page.records
                         this.Nowwg = data.data.wg 
                         this.Nowys = data.data.ys
                      
                   }else{
                       this.NowmonthWorkList = []
                       this.Nowrecords = 0 
                   }
                }
            })
        },
        pageQuestionForPlan(curPage){        //本月计划 问题
            pageQuestionForPlan({
                curPage:curPage,
                pageSize:this.NowWtpageSize,
                qygc:this.qyValue,
                cnjssj:this.lastDay,
                keyword:this.wtKeyword,
                wtzt:this.NowwtztValue.join(','),
                yczt:this.NowycztValue
            }).then(({data})=>{
                 if(data.state == 'success'){
                    this.NowquestionList = data.data.rows
                    this.NowQuestionRecords = data.data.records
                 }
            })
        },
        // addMonthQuestionPlan(wids){
        //     addMonthQuestionPlan({
        //         wids:wids,
        //         month:this.monthly
        //     }).then(({data})=>{
        //         if(data.state == 'success'){
        //             this.wtShow = false;
        //             this.getMonthQuestionList(1);  //获取月制作 问题;
        //             this.$alert('添加成功！', '提示', {confirmButtonText: '确定',type:'success'});
        //         }else{
        //             this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});
        //         }
        //     })
        // },
        isMonthPlanBlocked(month,isPrev){         // 是否封存
            isMonthPlanBlocked({
                month:month
            }).then(({data})=>{
                if(data.state == 'success'){
                    if(isPrev){
                        this.isBlockedOfsy = false;
                        // this.isBlockedOfsy = data.data;
                    }else{
                        this.isBlocked = false;
                        // this.isBlocked =data.data;
                    }
                }
            })
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
    },
    beforeMount(){
       if (getSession("gczd") == null) {
          getMenu("gczd", this.gczdList, true); //获取工程战队
        } else {
          this.gczdList = getSession("gczd");
        }
        
    },
    watch:{
        bjShow(n,o){
            if(!n){
                this.data.gznr = '';
                this.data.wwcyy = '';
                this.data.hxcs = '';
            }
        }
    },
    mounted(){
        this.isJzuser = sessionStorage.isJZuser
        this.groupTag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag
        if(this.groupTag.indexOf('JYGL') != -1){
            this.qyValue = this.gczdList[0].label
        }else{
             this.qyValue = ''
        }
        this.promise().then((value)=>{
            this.mapLcbxxForPlan(1);            //获取本月(计划)工作;
        })
        let year = this.monthly.getFullYear();
        let month = (this.monthly.getMonth()+1);
        this.dayNum = this.monthly.getDate();  //天数
        this.monthly = year+'-'+(month>10?month:'0'+month);
        this.lastMonth = year+'-'+((month-1)>10?(month-1):'0'+(month-1));
        this.lastDay = getLastMonthDay(year,month);
        this.lastMonthDay = getLastMonthDay(year,month-1)
        this.getMonthWorkList(1);                                       //获取上月工作;
        this.getMonthQuestionList(1);                                   //获取上月制作 问题;
        this.pageQuestionForPlan(1);                                    //获取本月计划 问题;     
        this.isMonthPlanBlocked(this.lastMonth,true);                        //上月是否封存
        this.isMonthPlanBlocked(this.monthly,false);                          //本月是否封存
        document.title='月报-月度计划制订'
    },
    components: {
        layout,
        MonthWeekQuestionTable,
        MonthQuestionForPlan,
        tableLayout,
        WeekLcbTable,
        bjDialog,
        pzDialog,
        lcbztSelect,
        detailDialog
     }
 }
</script>

<style scoped>
 .monthly-addbtn, .monthReport-plan-filter{
    margin-bottom: 12px;
 }
 .monthReport-plan-filter >span{
    display:inline-block;
    margin-bottom: 10px;
 }
 .monthReport-plan-filter .filter-weight{
     width: 80px;
     white-space: nowrap;
 }
</style>
