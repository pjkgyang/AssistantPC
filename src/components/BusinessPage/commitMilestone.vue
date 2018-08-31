<template>
  <div>
      <div style="overflow-y:auto">
          <div class="task-detail-dialog-header" v-if="JSON.stringify(taskDetail) != '{}'">
            <p class="task-detail-dialog-header-mc">{{taskDetail.lcbms}} </p>
             <div style="display:flex">
              <h2>{{taskDetail.rwmc}}</h2>
             </div>
            <p class="task-detail-dialog-header-time">
              <span>开始日期</span> <span class="el-icon-date"></span> {{taskDetail.jhksrq==null?taskDetail.cnkssj:taskDetail.jhksrq}} - 
              <span>结束日期</span> <span class="el-icon-date"></span> {{taskDetail.jhjsrq==null?taskDetail.cnjssj:taskDetail.jhjsrq}}
            </p>
          </div>
          <div class="task-detail-scenario-infos-wrap" v-if="lcblx != 3">
              <p><span style="display:inline-block;width:120px" class="el-icon-date"> 签字日期</span><span>
                   <el-date-picker v-if="lcblx != 3"  size="small" v-model="signDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </span>
               </p>
              <p  v-if="lcblx != 3 && lcblx != 2"><span style="display:inline-block;width:120px" class="el-icon-date"> 服务开始时间</span><span>
                  <el-date-picker size="small" v-model="startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
                </span>
              </p>
              <p v-if="lcblx != 3 && lcblx != 2"><span style="display:inline-block;width:120px" class="el-icon-edit-outline"> 销售确认人</span><span>
                    <el-select v-model="valueXSQRR" size="small"  placeholder="请选择">
                        <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.userName"
                        :value="item.userId+'&'+item.userName">
                        </el-option>
                    </el-select>
                </span>
               </p>
           </div>
            <!-- <div class="milestone-ml-choose">
                <p><span style="display:inline-block;width:120px;margin-right:20px">里程碑上传目录：</span> 
                <el-select v-model="valueSCML" size="small" @change="chooseLCBscml" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in lcbMLArr"
                    :key="index"
                    :label="item.fname"
                    :value="item.uploadPath+'&'+item.wid">
                    </el-option>
                </el-select>
                </p>
                <p>
                  <span style="display:inline-block;width:120px;margin-right:20px">里程碑文档模板：</span> 
                   <a class="lcb-wdmb" v-for="(wdmb,index) in lcbWDMB" :href="baseUrl+'attachment/downloadTemplateFile.do?path='+wdmb.mblj">{{wdmb.mblj.split('/')[2]}}</a>
                </p>
            </div> -->
            <div style="padding:20px">
                 <p style="display:flex"><span style="display:inline-block;width:140px">说明:</span>
                    <el-input
                    type="textarea"
                    :rows="5"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="textarea">
                    </el-input>
                 </p>
            </div>
            <div class="activity-creator">
                <el-button type="primary" size="small" @click="handleCommitMilestone">提交</el-button>
          </div>
        </div>
  </div>
</template>
<script>
import { getLcbFolders ,getChildren } from '@/api/TaskProcess.js'
import { getMilestoneSubmitType ,submitMilestone } from '@/api/milestone.js'
import { queryProjectParticipant } from '@/api/personal.js'
export default {
  data(){
      return{
        signDate:"",
        startDate:"",
        valueSCML:"",
        ProcessValue:"",
        valueXSQRR:"",
        options:[],
        lcbMLArr:[],
        lcbWDMB:[],
        fileList:[],
        baseUrl:"",
        lcblx:"",
        lcbbhArr:[],
        textarea:"",
        lcbtaskDetail:{}
      }
  },
  props:{
     taskDetail:{
         type:Object,
         default:function(){
             return {}
         }
     },
     xmbh:{
         type:String,
         default:''
     },
     shown:{
        type:Boolean,
        default:false
     },
     taskLcbbhArr:{
         type:Array,
         default:function(){
              return []
         }
     },
  },
  mounted(){
      // 获取里程碑类型
               getMilestoneSubmitType({
                    xmbh:this.xmbh,
                    lcbbh:this.taskLcbbhArr.join(',')
                }).then(({data})=>{
                    if(data.state == 'success'){
                       this.lcblx = data.data.lcbType
                     
                       if(data.data.lcbType != 2 && data.data.lcbType !=3){
                           //  获取项目相关人员
                        queryProjectParticipant({
                            xmbh:this.xmbh?this.xmbh:data.data.xmbh
                        }).then(({data})=>{
                            if(data.state == 'success'){
                                this.options = data.data
                                this.options.forEach((ele,i,arr)=>{
                                if(ele.userName == ''){
                                    this.options.splice(i,1)
                                    }
                                })
                            }
                         })
                     }
                 }
            })
  },
  methods:{
      chooseLCBscml(val){
          this.getChildren(val.split('&')[1]);
      },

      handleCommitMilestone(){ //提交里程碑
         submitMilestone({
             xmbh:this.xmbh,
             lcbbh:this.taskLcbbhArr.join(','),
             fjData:"",
             sm:this.textarea,
             qzsj:this.signDate,
             fwsj:this.startDate,
             yhbh:"",
             yhxm:""
         }).then(({data})=>{
           if(data.state == 'success'){
                this.$alert('提报成功', '提示', {
                confirmButtonText: '确定',
                type:'success',
                callback: action => {
                  this.$emit('handleCommitMilestone','')
                }
             });
           }
         })
      },
       // 获取子模板
        getChildren(wid){
            getChildren({
              parentwid:wid
            }).then(({data})=>{
                if(data.state == 'success'){
                    this.lcbWDMB = data.data
                }
            })
        },
   },
   watch:{
       shown(n,o){
           if(n){
                this.baseUrl = window.baseurl
                // 获取里程碑类型
               getMilestoneSubmitType({
                    xmbh:this.xmbh,
                    lcbbh:this.taskLcbbhArr.join(',')
                }).then(({data})=>{
                    if(data.state == 'success'){
                       this.lcblx = data.data.lcbType
                     
                       if(data.data.lcbType != 2 && data.data.lcbType !=3){
                           //  获取项目相关人员
                        queryProjectParticipant({
                            xmbh:this.xmbh?this.xmbh:data.data.xmbh
                        }).then(({data})=>{
                            if(data.state == 'success'){
                                this.options = data.data
                                this.options.forEach((ele,i,arr)=>{
                                if(ele.userName == ''){
                                    this.options.splice(i,1)
                                    }
                                })
                            }
                         })
                     }
                 }
            })
        }
       },
   }
}
</script>
<style  scoped>
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
.task-detail-scenario-infos-wrap p{
  margin: 10px 0 !important;
}
.task-detail-scenario-infos-wrap p>span:nth-of-type(1){
  margin-right: 20px;
  color: #555;
}

.milestone-ml-choose{
    padding: 10px 20px;
}
.milestone-ml-choose p{
    margin: 5px 0 !important;
}

.activity-creator{
  padding: 10px 20px;
  text-align:right
}
.lcb-wdmb{
    margin-right:15px;
    font-size:13px;
    color:#409EFF
}
.lcb-wdmb:hover{
    text-decoration: underline;
}
</style>
