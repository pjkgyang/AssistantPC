<template>
 <div>
      <ul class="project-question-list">
          <li v-for="(question,index) in questionList" >
            <section class="spacearound colcenter" >
              <div :class="{'question-type':true}">
                  <span :class="{'el-icon-question':question.fbzt != 1,'el-icon-success':question.fbzt == 1}"></span>
                  <p class="questionOperate" v-if="bjscShow">   
                      <span class="el-icon-edit" :data-wid="question.wid"  v-if="question.isdel" @click="editQuestion(question)"><span style="color:#409EFF"> 编辑</span></span>&nbsp;
                      <span class="el-icon-delete" :data-wid="question.wid"  v-if="question.isdel" @click="deleteQuestion(question)"><span style="color:#f00"> 删除</span></span>
                  </p>
             </div>
              <div class="question-info">
                  <span class="question-info-bt" :title="question.bt" @click="handleQuestionDetail(question)" :data-wid="question.wid">{{question.bt}}</span><br>
                  <span>
                      <span style="color:#363748;font-size:12px;">{{question.fbrq}}</span>&#x3000;
                      <span style="color:#363748;font-size:12px;">问题编号：{{question.wtbh}}</span>&#x3000;
                      <span v-if="gjjhShow && (wtfbq=='W03' || wtfbq=='W05')" class="question-gjjhzt question-tag-ysqgb">{{question.gjzt==0?'未纳入计划':question.gjzt==1?'计划中':'计划已改进'}}</span>
                  </span>&#x3000;
                  <span class="question-tag-ysqgb" v-if="question.sqgbCount > 0 && question.fbzt != 1">已申请关闭</span>&#x3000;&#x3000;
                  <p>
                      <span><span class="question-info-front"></span>发布人 : {{question.fbrxm}}</span>
                      <span><span class="question-info-front">所属单位 : </span>{{question.ssbm == null?'无':question.ssbm}}</span>
                      <span><span class="question-info-front">问题类别 : </span>{{question.wtlb==null?'无':question.wtlb}}</span>
                  </p>
                  <p>
                     <span><span class="question-info-front">产品 : </span>{{question.cpmc}}</span>
                     <span><span class="question-info-front">是否紧急 : </span>{{question.jjyf == null?'无':question.jjyf == '1'?'是':'否'}}</span>
                     <span><span class="question-info-front">版本号 : </span>{{question.bbh}}</span>
                  </p>
                  <div v-if="wtbqShow">
                    <span>
                      <span class="question-info-front">标签 : </span>
                      <span v-if="!!question.bqMc" v-for="bq in question.bqMc.split(',')" class="question-info-wtbq">{{bq}}&nbsp; </span>
                      <span v-else v-for="bq in question.bqMc.split(',')" >无</span>
                      </span>
                  </div>
              </div>
              <div class="question-state">
                  <span style="font-size:14px;color:#f00;" :class="{'ygb-color':question.fbzt == 1,'clz-color':question.fbzt != 1}">{{question.lcMc}}</span><br>
                  <span style="font-size:14px;color:#7ECE64;margin-top:5px;"><span style="font-size:12px;color:#A8A8A8">回复数</span> &#x3000;{{question.replyCount}}</span><br>
                  <span style="font-size:12px;color:#A8A8A8" >
                    <!-- <span v-if="question.fbzt != 1 && question.cnjsrq">
                          {{new Date().getTime() < new Date(question.cnjsrq).getTime()?Math.round((new Date(question.cnjsrq).getTime() - new Date().getTime())/(1000 * 60 * 60 * 24))+' 天到期':'过期 '+Math.round((new Date().getTime() - new Date(question.cnjsrq).getTime())/(1000 * 60 * 60 * 24))+' 天'}}
                    </span> -->
                    <!-- question.fbzt == 1 &&  -->
                    <span v-if="question.cnjsrq">
                          {{(question.sqgbsj?new Date(question.sqgbsj).getTime():
                          question.gbsj?new Date(question.gbsj).getTime():
                          new Date().getTime()) < new Date(question.cnjsrq+' 23:59:59').getTime()?
                          Math.round((new Date(question.cnjsrq+' 23:59:59').getTime() - (question.sqgbsj?new Date(question.sqgbsj).getTime():
                          question.gbsj?new Date(question.gbsj).getTime():new Date().getTime()))/(1000 * 60 * 60 * 24))+' 天到期':'过期 '+Math.ceil(((question.sqgbsj?new Date(question.sqgbsj).getTime():question.gbsj?new Date(question.gbsj).getTime():new Date().getTime()) - new Date(question.cnjsrq+' 23:59:59').getTime())/(1000 * 60 * 60 * 24))+' 天'}}
                    </span>
                  </span><br>
                  <span v-if="!bjscShow && gjjhShow">
                     <el-button size="mini" type='primary' @click="handleImprovementPlan(question)">改进计划</el-button>
                  </span>
              </div>     
            </section>     
            <section text-center  class="pull-right"  style="width:15%" v-if="question.sqgbCount > 0  && question.fbzt != 1 && username==question.fbrxm && isShow">
               <el-button type="primary" size="mini" @click="handleReject(question,index)">驳回</el-button>
               <el-button type="danger" size="mini" @click="handleClose(question,index)">关闭</el-button>
            </section>
          </li>
          <div v-if="questionList.length == 0" style="text-align:center;padding-top:50px;">
              <img src="static/img/empty.png" alt="">
              <p>暂无问题</p>
          </div>
      </ul>
 </div>
</template>

<script>
export default {
  data() {
    return {
        username:'',
    };
  },
  props: {
    questionList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isShow:{
        type:Boolean,
        default:true
    },
    wtbqShow:{
       type:Boolean,
       default:false
    },
    bjscShow:{
       type:Boolean,
       default:true
    },
    gjjhShow:{
       type:Boolean,
       default:false 
    },
    wtfbq:{
      type:String,
      default:''
    }
  },
  mounted(){
      this.username = sessionStorage.username;
  },
  methods:{
      handleImprovementPlan(params){
          this.$emit('handleImprovementPlan',params);
      },
      handleQuestionDetail(params){
          this.$emit('handleQuestionDetail',params);
      },
      handleReject(params,index){         // 驳回
          this.$prompt('请输入驳回说明', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputType:'textarea',
                    inputPattern: /^\S/,
                    inputErrorMessage: '请输入驳回说明（必填）'
          }).then(({ value }) => {
             this.$emit('handleReject',params,index,value); 
          }).catch(() => {});
      },
      handleClose(params,index){
          this.$emit('handleClose',params,index);   
      },
      editQuestion(params){
          this.$emit('editQuestion',params);  
      },
      deleteQuestion(params){
         this.$emit('deleteQuestion',params);  
      }
  },
  components: {}
};
</script>

<style scoped>
.project-question-list > li {
  border-bottom: 1px dotted #999;
  padding: 8px 0 5px;
}
.project-question-list > li::after {
  content: "";
  display: block;
  clear: both;
}
.project-question-list > li:hover {
  background: #f5f7fa;
}
.project-question-list > li:hover .questionOperate {
  opacity: 1;
}
.question-type {
  text-align: center;
  width: 100px;
}
.questionOperate {
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
}
.questionOperate > span:hover {
  text-decoration: underline #888;
  cursor: pointer;
}

.question-type span.el-icon-question {
  font-size: 32px;
  color: #f56c6c;
}
.question-type span.el-icon-success {
  font-size: 30px;
  color: #67c23a;
}

.project-question-list .question-info {
  width:78%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.project-question-list .question-info .question-info-front,
.question-content .question-info-front {
  color: #a8a8a8;
  font-size: 12px;
}
.project-question-list .question-info > p {
  margin: 3px 0 !important;
  width: 100%;
  white-space: nowrap;
}
.project-question-list .question-info > p > span {
  display: inline-block;
  width: 25%;
  white-space: nowrap;
  font-size: 14px;
  color: #363748;
}
.project-question-list .question-info > p > span:nth-of-type(2) {
  width: 40%;
}
.project-question-list .question-info .question-info-bt {
  font-size: 16px;
  color: #409eff;
}

.project-question-list .question-info > span.question-info-bt:hover {
  text-decoration: underline;
  cursor: pointer;
}
.project-question-list .question-info > p {
  font-size: 14px;
  color: #888;
}
.question-state {
  text-align: center;
  width: 15%;
}
.question-state > span:nth-of-type(1) {
  padding: 3px 8px;
  border-radius: 2px;
  font-size: 14px;
  display: inline-block;
}
.ygb-color {
  color: #7ece64 !important;
  background: rgba(126, 206, 100, 0.2);
}
.clz-color {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.2);
}
.question-info-wtbq{
   background: rgb(81, 133, 230);
   color: #fff;
   padding: 1px 2px;
   border-radius: 2px;
}
.question-gjjhzt{
   background: rgb(55, 146, 82) !important;
}
</style>
