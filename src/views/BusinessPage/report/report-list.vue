<template>  
  <div class="project-question">
       <div class="project-question-detailList">
        <ul class="project-question-list">
            <li v-for="(question,index) in questionList">
               <section class="spacearound colcenter" >
                <div :class="{'question-type':true}">
                    <span :class="{'el-icon-question':question.fbzt != 1,'el-icon-success':question.fbzt == 1}"></span>
                    <p class="questionOperate" >   
                        <!-- question.isdel -->
                        <span class="el-icon-edit" :data-wid="question.wid"  v-if="false" @click="editQuestion"><span style="color:#409EFF"> 编辑</span></span>&nbsp;
                        <span class="el-icon-delete" :data-wid="question.wid"  v-if="false" @click="deleteQuestion"><span style="color:#f00"> 删除</span></span>
                    </p>
                </div>
                <div class="question-info">
                    <span class="question-info-bt" @click="handleQuestionDetail(question.wid)" :data-wid="question.wid">{{question.bt}}</span><br>
                    <span style="color:#363748;font-size:12px;">{{question.fbrq}}</span>&#x3000;
                    <span class="question-tag-ysqgb" v-if="question.sqgbCount > 0 && question.fbzt != 1">已申请关闭</span>&#x3000;
                    <p>
                        <span><span class="question-info-front"></span>发布人 : {{question.fbrxm}}</span>
                        <span><span class="question-info-front">所属单位 : </span>{{question.ssbm == null?'无':question.ssbm}}</span>
                        <span><span class="question-info-front">问题类别 : </span>{{question.wtlb==null?'无':question.wtlb}}</span>
                    </p>
                    <p>
                        <span><span class="question-info-front">产品 : </span>{{question.cpbh}}</span>
                        <span><span class="question-info-front">是否紧急 : </span>{{question.jjyf == null?'无':question.jjyf == '1'?'是':'否'}}</span>
                        <span><span class="question-info-front">版本号 : </span>{{question.bbh}}</span>
                    </p>
                </div>
                <div class="question-state">
                    <span style="font-size:14px;color:#f00;" :class="{'ygb-color':question.fbzt == 1,'clz-color':question.fbzt != 1}">{{question.lcMc}}</span><br>
                    <span style="font-size:14px;color:#7ECE64;margin-top:5px;"><span style="font-size:12px;color:#A8A8A8">回复数</span> &#x3000;{{question.replyCount}}</span><br>
                    <span style="font-size:12px;color:#A8A8A8" v-if="question.fbzt != 1 && question.qwjjrq">
                        {{new Date().getTime() < new Date(question.qwjjrq).getTime()?Math.round((new Date(question.qwjjrq).getTime() - new Date().getTime())/(1000 * 60 * 60 * 24))+' 天到期':'过期 '+Math.round((new Date().getTime() - new Date(question.qwjjrq).getTime())/(1000 * 60 * 60 * 24))+' 天'}}
                    </span>
                </div>
                </section>
                <section text-center  class="pull-right"  style="width:13%;" v-if="question.sqgbCount > 0 && isJZuser == 1 && question.fbzt != 1 && username == question.fbrxm">
                    <el-button type="primary" size="mini" @click="handleReject(question,index)">驳回</el-button>
                    <el-button type="danger" size="mini" @click="handleClose(question,index)">关闭</el-button>
                </section>
            </li>
            <div v-if="questionList.length == 0" style="text-align:center;padding-top:50px;">
                <img src="static/img/empty.png" alt="">
                <p>暂无问题</p>
            </div>
        </ul>
      <div style="padding:5px 10px 10px 0;text-align:right" v-if="total > 10">
        <pagination  :total="total" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
    </div>
     <gxrDialog :show.sync="gxrShow"  :wtInfo="wtInfo" @closeQuestion="closeQuestion"></gxrDialog>
  </div>
</template>
<script>
import gxrDialog from "@/components/dialog/gxr-dialog.vue";
import pagination from '@/components/BusinessPage/pagination.vue'
import { queryReportQuestionLst,applyDismiss} from '@/api/xmkb.js'

export default {
  data(){
      return{
          gxrShow:false,
          wtInfo:{},
          index:'',
          questionList:[],
          curPage:1,
          pageSize:10,
          CurrentPage:1,
          total:null,
          Data:{},
          queryId:"",
          isJZuser:'',
          username:""
    }
  },
  props:{
     
  },
  mounted(){
    this.isJZuser = sessionStorage.getItem("isJZuser");
    this.username = sessionStorage.username;
    this.queryId = this.$route.params.id
    this.getReportQuestion(1);  //获取报表问题
    document.title = '问题报表-问题列表'     
  },

  methods:{ 
     handleReject(params,index){   // 驳回
    //  if(this.username != params.fbrxm){
    //     this.$alert('对不起，您无权驳回', '提示', {confirmButtonText: '确定',type:'warning'});
    //     return;
    //   }
      this.$confirm("确定驳回该申请, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          applyDismiss({
            wid:'',
            zbwid: params.wid
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("已成功驳回！", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  //  this.queryAllQuestions(this.CurrentPage);
                  this.questionList[index].sqgbCount = 0
                }
              });
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    handleClose(params,index){ //关闭问题
      this.wtInfo = params;
      this.index = index;
      this.gxrShow = !this.gxrShow;
    },
    closeQuestion(){
      this.gxrShow = !this.gxrShow
      this.questionList[this.index].fbzt = 1
      this.questionList[this.index].sqgbCount = 0 
    },
      getReportQuestion(curPage){ 
            this.Data = this.$route.query;
            this.Data.curPage = curPage
            this.Data.pageSize = this.pageSize
            this.queryReportQuestionList(this.Data);
      },

      queryReportQuestionList(obj){ //获取报表问题列表
          this.$get(this.queryId=='questionPflist'?this.API.WtReportOrderStarLst:this.API.queryReportQuestionLst,obj).then(res=>{
            if(res.state == 'success'){
                    if(res.data.rows !=null){
                        this.questionList = res.data.rows
                    }
                    this.total = res.data.records
                }else{
                 this.$alert(res.msg, '提示', {
                 confirmButtonText: '确定',
                 type:'error',
                 callback: action => {}
                });
              }
         })
      },
      
       handleCurrentChange(data){       // 分页切换
         this.CurrentPage = data
         this.getReportQuestion(data); 
       },

       handleQuestionDetail(wid){    // 跳转详情
            let routeData = this.$router.resolve({
            name: "questionDetail",
            query: { wid: wid}
        });
        window.open(routeData.href, "_blank");
       },

  },
  watch:{},
  activated(){},
  components:{pagination,gxrDialog}
}
</script>
<style scoped>

.project-question{
    width:90%;
    margin: 0 auto;
    padding: 10px;
}
.project-question .project-question-detailList{
    border-radius: 4px;
    background: #fff;  
    min-height:calc(100vh - 30px);

}
.project-question-list>li{
    border-bottom: 1px dotted #999;
    padding: 8px 5px;
}
.project-question-list>li::after{
    content: '';
    display: block;
    clear: both;
}
.project-question-list>li:hover{
    cursor: pointer;
    background: #f5f7fa;
}
.project-question-list>li:hover .questionOperate{
    opacity: 1;
}
.question-type{
    text-align:center;
    width:100px;
}
.questionOperate{
    font-size: 12px;
    white-space: nowrap;
    opacity: 0;
}
.questionOperate>span:hover{
    text-decoration: underline #888;
}

.question-type span.el-icon-question{
    font-size:32px;
    color: #F56C6C;
}
.question-type span.el-icon-success{
    font-size:30px;
    color: #67C23A;
}

.project-question-list .question-info{
    width: 80%;
}
.project-question-list .question-info .question-info-front{
    color: #A8A8A8;
    font-size:12px;
}
.project-question-list .question-info>p{
    margin: 3px 0 !important;
    width: 100%;
    white-space: nowrap;
}
.project-question-list .question-info>p>span{
    display: inline-block;
    width: 25%;
    white-space: nowrap;
    font-size: 14px;
    color: #363748;
}
.project-question-list .question-info>p>span:nth-of-type(2){
    width: 40%;
}
.project-question-list .question-info>span{
    font-size: 16px;
    color: #409EFF;
}
.project-question-list .question-info>span.question-info-bt:hover{
    text-decoration: underline;
}
.project-question-list .question-info>p{
    font-size: 14px;
    color: #888;
}

div.el-form-item{
    margin-bottom:8px !important;
}

.isshown-query:hover{
   cursor: pointer;
}

.bg-active{
    background: #1997D7;
    color: #fff !important;
}
.question-state{
    text-align: center;
    width: 13%;
}
.question-state>span:nth-of-type(1){
    padding: 3px 8px;
    border-radius: 2px;
    font-size: 14px;
    display: inline-block;
}
.ygb-color{
    color: #7ECE64  !important;
    background:rgba(126, 206, 100, 0.2);
}
.clz-color{
    color: #F56C6C;
    background:rgba(245, 108, 108, 0.2);
}

</style>
