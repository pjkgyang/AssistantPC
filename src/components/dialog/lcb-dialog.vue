<template>
 <div>
      <el-dialog
            title="添加周工作计划"
            width="900px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-ydwt">
                <section>
                  <span class="ydwt-title">搜索:&nbsp;</span>
                  <span>
                     <el-input size="mini" style="width:300px;" placeholder="请输入项目名称/项目编号" suffix-icon="el-icon-search" v-model="keyword"
                     @change="handleSearchQuestion"></el-input>
                   </span>
                </section>
                <section class="monthReport-plan-filter" flex>
                            <div>
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
                <section class="lcb-dialog-total">
                    <h5>( 合计完工: <span class="je-red">{{wgTotal}}</span> 合计验收: <span class="je-red">{{ysTotal}}</span> )</h5>
                </section>
                <section >
                    <el-table
                        :data="tableData" max-height="500"
                        border
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            fixed="left"
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column prop="xmbh" label="项目编号" width="100"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" width="200" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="xmnr" label="项目内容" width="250" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="lcbms" label="里程碑描述" width="150" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="cnjssj" label="承诺完成时间" width="150"> </el-table-column>
                        <el-table-column prop="jhjssj" label="计划完成时间" width="150"> </el-table-column>
                        <el-table-column prop="zt_display" label="完成状态" width="100"> </el-table-column>

                    </el-table>
                    <div class="ydwt-btn-pagination" v-if="records > 0">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="records">
                         </el-pagination>
                    </div>
                </section>
                <section class="ydwt-btn-group">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary"  @click="handleClickSure">确定</el-button>
                </section>
            </div>
        </el-dialog>
 </div>
</template>

<script>
 import pagination from '@/components/BusinessPage/pagination.vue'
import {  getSession } from "@/utils/util.js";
import lcbztSelect from '@/components/monthReport/lcbzt-select.vue'
import { mapLcbxxForWeekPlan,getCpx} from '@/api/weekMonthReport.js'

 export default {
   data () {
     return {
        xmlbList: ['软件','集成','软件服务','集成服务'],
        xmlbValue:['软件','软件服务'],
        XzlcbztList:[1],
        cpxValue:[],
        cpxList:[],
        tableData:[],
        checkedQuestions:[],
        visible:this.show,
        pageSize:10,
        keyword:'',
        gczdList:[],
        records:null,
        currentPage:1,
        wgTotal:'',
        ysTotal:''
     }
   },
   methods:{
       handleChangeXzLcbzt(data){             // 下周里程碑（状态）
           this.XzlcbztList = data
           this.mapLcbxxForWeekPlan(1); 
           this.currentPage = 1; 
        },
        handleSelectXmlb(){
            this.mapLcbxxForWeekPlan(1);  
            this.currentPage = 1;
        },
        handleSelectCpx(){
            this.mapLcbxxForWeekPlan(1);  
            this.currentPage = 1;
        },
       handleSearchQuestion(){
          this.mapLcbxxForWeekPlan(1);  
          this.currentPage = 1;
       }, 
       handleSearchEnter(){
          this.mapLcbxxForWeekPlan(1);  
          this.currentPage = 1;
       },

       handleSelectionChange(val){
           this.checkedQuestions = val;
       },
       handleCurrentChange(data){
           this.mapLcbxxForWeekPlan(data); 
           this.currentPage = data;
       },
       handleSizeChange(data){
           this.pageSize = data;
           this.mapLcbxxForWeekPlan(1); 
           this.currentPage = 1;
       },
       handleClose(){  
           this.visible = false
       },
       handleClickSure(){
            let lcbbhsArr = new Array();
            this.checkedQuestions.forEach((ele,i,arr)=>{
                 lcbbhsArr.push(ele.lcbbh);
            })
           this.$emit('handleClickSure',lcbbhsArr.join(','))
       },
       promise () {
            let _this = this;
            return new Promise ( function (resolve, reject) {
                    getCpx().then(({data})=>{
                        if(data.state=='success'){
                            _this.cpxList = data.data
                            _this.cpxValue = [];
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
        mapLcbxxForWeekPlan(curPage){  //新增问题 弹出层
            mapLcbxxForWeekPlan({
                curPage:curPage,
                pageSize:this.pageSize,
                cnjssj:this.lastDay.trim(),
                keyword:this.keyword,
                xmlb:this.xmlbValue.join(','),
                cpxs:this.cpxValue.join(','),
                zts:this.XzlcbztList.join(',')
            }).then(({data})=>{
                 if(data.state == 'success'){
                    this.tableData = data.data.page.rows
                    this.records = data.data.page.records
                    this.wgTotal = data.data.wg
                    this.ysTotal = data.data.ys
                 }    
            })
        },
   },
   props:{
    show: {
      type: Boolean,
      default:false
    },
    month:{
      type:String,
      default:''
    },
    lastDay:{
      type:String,
      default:''
    }
   },
   watch: {
        show(n,o) {
            this.visible = this.show;
            if(n){
                this.promise().then(()=>{
                    this.mapLcbxxForWeekPlan(1);
                })
                this.currentPage = 1;
            }
        }
    },
   components: {pagination,lcbztSelect}
 }
</script>

<style scoped>
.dialog-ydwt{
    padding: 8px 10px;
}
.dialog-ydwt section:nth-of-type(2){
    margin: 10px 0;
}

.ydwt-title{
    display:inline-block;
    font-weight: 700;
}
.ydwt-content{
    width: 88%;
}
.ydwt-btn-group{
    text-align: right;
    padding:10px 0 ;
}
.ydwt-btn-pagination{
    padding: 10px 0;
}
.lcb-dialog-total h5{
    font-weight: 700;
    padding:5px 0;
}
.lcb-dialog-total .je-red{
    color: #f00;
}
</style>
