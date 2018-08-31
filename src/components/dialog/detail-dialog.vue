<template>
 <div>
      <el-dialog
            :title="title"
            width="75%"
            min-width="700px"
            top="30px"
            class="detail-dialog"
            :append-to-body="true"
            :visible.sync="visible"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog">
                <layout>
                    <article slot="content">
                        <tableLayout :title="'详情'">
                            <div slot="bottom">
                               <weekPLantable :itemData="itemTable" :filedsShow="filedsShow" :pzShow="detailType.type == 'zbzlLcb'?true:false" v-if="detailType.type == 'zbzlLcb'||detailType.type == 'zbjhbzLcb'"></weekPLantable>
                               <weekProcesstable :itemData="itemTable" v-if="detailType.type == 'zbzlJd'"></weekProcesstable>
                               <weekQuestiontable :itemData="itemTable" :pzShow="detailType.type == 'zbzlWt'||detailType.type == 'ybzlWt'?true:false" v-if="detailType.type == 'zbzlWt' ||detailType.type == 'zbjhbzWt'||
                               detailType.type=='ybzlWt'||detailType.type=='ybjhsyWt'"></weekQuestiontable>
                               <weekPlanProcesstable :itemData="itemTable" v-if="detailType.type == 'zbjhbzJd'||detailType.type == 'zbjhxzJd'"></weekPlanProcesstable>
                               <planQuestiontable :itemData="itemTable" v-if="detailType.type == 'zbjhxzWt'||detailType.type =='ybjhbyWt'"></planQuestiontable>
                               <planLcbtable :itemData="itemTable" v-if="detailType.type == 'zbjhxzLcb'"></planLcbtable>

                               <monthPlantable :itemData="itemTable" :pzShow="detailType.type == 'ybzlLcb'?true:false" v-if="detailType.type == 'ybzlLcb'||detailType.type =='ybjhsyLcb'"></monthPlantable>
                               <monthPlanLcbtable :itemData="itemTable" v-if="detailType.type == 'ybjhbyLcb'"></monthPlanLcbtable>
                            </div>  
                        </tableLayout> 
                        <tableLayout :title="'历史批注'" v-if="detailType.type == 'zbzlLcb'||detailType.type == 'zbzlJd'||detailType.type == 'zbzlWt'||
                        detailType.type == 'ybzlLcb'|| detailType.type == 'ybzlWt'">
                            <div slot="bottom">
                                <el-table
                                    :data="pzList"
                                    height="300"
                                    border
                                    style="width:100%">
                                    <el-table-column prop="yhxm" label="姓名" width="90"> </el-table-column>
                                    <el-table-column prop="createTime" label="日期" width="160"> </el-table-column>
                                    <el-table-column prop="comment" label="批注内容" show-overflow-tooltip> </el-table-column>
                            </el-table>
                            </div> 
                        </tableLayout>
                    </article>
                </layout>
               <section class="btn-group">
                    <el-button size="small" @click="handleClose">关闭</el-button>
                </section>
            </div>
        </el-dialog>
 </div>
</template>

<script>
import layout from "@/components/layout/MonthWeekLayout.vue";
import tableLayout from "@/components/layout/tableLayout.vue";

import weekPLantable from '@/components/weekReport/weekPLan-table'
import weekProcesstable from '@/components/weekReport/weekProcess-table'
import weekPlanProcesstable from '@/components/weekReport/weekPlanProcess-table'
import weekQuestiontable from '@/components/monthReport/prevMonthPlanWt-table'
import planQuestiontable from '@/components/weekReport/planQuestion-table'
import planLcbtable from '@/components/weekReport/planLcb-table'

import monthPlantable from '@/components/monthReport/prevMonthPlanLcb-table'  //月总结里程碑表格
import monthPlanLcbtable from '@/components/monthReport/monthPlanLcb-table'   //月计划里程碑表格

import { getMonthWork,listComments,getMonthQuestion,getLcbxx ,getWeekWork,
getWeeklyReport,getWeekQuestion,getQuestion,getQuestionForWeekPlan} from '@/api/weekMonthReport.js'
 export default {
   data () {
     return {
         visible:this.show,
         pzList:[],
         itemTable:{}
 
     }
   },
   methods:{
       handleClose(){
           this.visible = false
       },
       getListComments(oid,planType){  // 获取批注列表
            listComments({
                oid:oid,
                planType:planType
            }).then(({data})=>{
                if(data.state == 'success'){
                    if(data.data && data.data.length){
                        this.pzList = data.data
                    }else{
                        this.pzList = []
                    }
                }else{
                    this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});
                }
            })    
        },
        getMonthWork(ygzWid){  // 获取（月工作计划）详情
            getMonthWork({
              ygzWid:ygzWid  
            }).then(({data})=>{
              if(data.state == 'success'){
                if(data.data){
                  this.itemTable = data.data
                }else{
                  this.itemTable = {}
                }
              }
            })
        },
        getMonthQuestion(ywtWid){   // 获取 问题（详情）
          getMonthQuestion({
              ywtWid:ywtWid  
            }).then(({data})=>{
              if(data.state == 'success'){
                if(data.data){
                  this.itemTable = data.data
                }else{
                  this.itemTable = {}
                }
              }
            })
        },
        getLcbxx(lcbbh,month){  // 获取里程碑
          getLcbxx({
            lcbbh:lcbbh,
            month:month
          }).then(({data})=>{
            if(data.state == 'success'){
              if(data.data){
                this.itemTable = data.data
              }else{
                this.itemTable = {}
              }
            }else{
               this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});
            }
          })
        },
        getWeekWork(zgzWid){
          getWeekWork({
              zgzWid:zgzWid  
            }).then(({data})=>{
              if(data.state == 'success'){
                if(data.data){
                  this.itemTable = data.data
                }else{
                  this.itemTable = {}
                }
              }
            })
         },
        getWeeklyReport(wid){
          getWeeklyReport({
              wid:wid  
            }).then(({data})=>{
              if(data.state == 'success'){
                if(data.data){
                  this.itemTable = data.data
                }else{
                  this.itemTable = {}
                }
              }
          })
        },
        getWeekQuestion(zwtWid){
          getWeekQuestion({
              zwtWid:zwtWid  
            }).then(({data})=>{
              if(data.state == 'success'){
                if(data.data){
                  this.itemTable = data.data
                }else{
                  this.itemTable = {}
                }
              }
          })
        },
        getQuestion(wtwid,month){
          getQuestion({
              wtwid:wtwid,
              month:month
            }).then(({data})=>{
              if(data.state == 'success'){
                if(data.data){
                  this.itemTable = data.data
                }else{
                  this.itemTable = {}
                }
              }
          })
        },
        getQuestionForWeekPlan(wtwid,month,zxh){
          getQuestionForWeekPlan({
              wtwid:wtwid,
              month:month,
              zxh:zxh
            }).then(({data})=>{
              if(data.state == 'success'){
                if(data.data){
                  this.itemTable = data.data
                }else{
                  this.itemTable = {}
                }
              }
          })
        }
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        },
        detailType:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        filedsShow:{
          type:Boolean,
          default:true
       }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(n){
                 if(this.detailType.type == 'zbzlLcb' || this.detailType.type == 'zbjhbzLcb' || this.detailType.type == 'zbjhxzLcb'){      // 周里程碑
                       this.getWeekWork(this.detailType.wid);
                    if(this.detailType.type == 'zbzlLcb'){
                       this.getListComments(this.detailType.wid,this.detailType.planType);     
                    }
                }else if(this.detailType.type == 'zbzlJd' || this.detailType.type == 'zbjhbzJd' ||this.detailType.type == 'zbjhxzJd'){   // 周进度
                    this.getWeeklyReport(this.detailType.wid);
                    if(this.detailType.type == 'zbzlJd'){
                        this.getListComments(this.detailType.wid,this.detailType.planType);
                    }
                }else if(this.detailType.type == 'zbzlWt' || this.detailType.type == 'zbjhbzWt' ||this.detailType.type == 'zbjhxzWt'){
                       this.getWeekQuestion(this.detailType.wid);
                    if(this.detailType.type == 'zbzlWt'){
                       this.getListComments(this.detailType.wid,this.detailType.planType);
                    }
                }else if(this.detailType.type == 'ybzlLcb' || this.detailType.type == 'ybjhsyLcb'){
                        this.getMonthWork(this.detailType.wid);
                      if(this.detailType.type == 'ybzlLcb'){
                        this.getListComments(this.detailType.wid,this.detailType.planType);
                      } 
                }else if(this.detailType.type == 'ybzlWt' ||　this.detailType.type =='ybjhsyWt'){
                          this.getMonthQuestion(this.detailType.wid);
                      if(this.detailType.type == 'ybzlWt'){
                         this.getListComments(this.detailType.wid,this.detailType.planType);
                      }
                }else if(this.detailType.type == 'ybjhbyLcb'){
                       this.getLcbxx(this.detailType.lcbbh,this.detailType.month);
                }else if(this.detailType.type == 'ybjhbyWt'){
                       this.getQuestion(this.detailType.wid,this.detailType.month);
                }
            }
        }
    },
   components: {
       layout,
       tableLayout,
       weekPLantable,
       weekProcesstable,
       weekPlanProcesstable,
       weekQuestiontable,
       planQuestiontable,
       planLcbtable,
       monthPlantable,
       monthPlanLcbtable
   }
 }
</script>

<style scoped>

.btn-group{
    padding: 10px ;
    float: right;
}
 
</style>
