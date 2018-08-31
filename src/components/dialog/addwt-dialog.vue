<template>
 <div>
      <el-dialog
            title="添加问题"
            width="900px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-ydwt">
                <section class="mg-12">
                            <span>
                                <el-input size="mini" style="width:300px;" placeholder="请输入问题标题/项目编号/项目名称/提问人" suffix-icon="el-icon-search" v-model="keyword"
                                @change="handleSearchQuestion"></el-input>
                            </span>
                            <span>
                                <span class="filter-weight">问题状态：</span>
                                <el-select v-model="wtztValue" size="small" style="width:200px;" placeholder="请选择" multiple @change="handleSelectWtzt">
                                    <el-option v-for="item in wtztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </span>
                            <span>
                                <span class="filter-weight">异常状态：</span>
                                <el-select v-model="ycztValue" size="small"  style="width:200px;" placeholder="请选择" @change="handleSelectYczt">
                                    <el-option v-for="item in ycztList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </span>
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
                        <el-table-column prop="bt" label="问题标题" width="200" show-overflow-tooltip fixed="left"> </el-table-column>
                        <el-table-column prop="fbrxm" label="发布人姓名" width="100"></el-table-column>
                        <el-table-column prop="dwmc" label="所属单位" width="150" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="xmmc" label="所属项目" width="200" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="cpmc" label="所属产品" width="150" show-overflow-tooltip> </el-table-column>
                        <el-table-column prop="wtlb" label="问题类别" width="150"> </el-table-column>
                        <el-table-column prop="sfjj" label="是否紧急" width="150"> </el-table-column>
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
import { pageQuestionForWeekPlan} from '@/api/weekMonthReport.js'

 export default {
   data () {
     return {
        wtztList:[
                    {value: '0',label: '处理中'},
                    {value: '2',label: '已申请关闭'},
                 ],
        ycztList:[{value: '',label: '全部'},
                    {value: '0',label: '超期'},
                    {value: '1',label: '未超期'},],
        ycztValue:'',
        wtztValue:['0'],
        tableData:[],
        checkedQuestions:[],
        visible:this.show,
        qyValue:'', 
        keyword:'',
        pageSize:10,
        gczdList:[],
        records:null,
        currentPage:1
     }
   },
   methods:{
       handleSearchQuestion(){
          this.pageQuestionForWeekPlan(1);  
          this.currentPage = 1;
       }, 
        handleSelectWtzt(){                // 选择 本周问题状态
           this.pageQuestionForWeekPlan(1);  
           this.currentPage = 1;
        },  
        handleSelectYczt(){                // 选择 本周异常状态
           this.pageQuestionForWeekPlan(1);  
           this.currentPage = 1;       
        },
        handleSelectQy(){
          this.pageQuestionForWeekPlan(1);  
          this.currentPage = 1;
       },
       handleSelectionChange(val){
           this.checkedQuestions = val;
       },
       handleCurrentChange(data){
           this.pageQuestionForWeekPlan(data); 
           this.currentPage = data;
       },
       handleSizeChange(data){
           this.pageSize = data;
           this.pageQuestionForWeekPlan(1); 
           this.currentPage = 1;
       },
       handleClose(){  
           this.visible = false
       },
       handleClickSure(){
            let widsArr = new Array();
             this.checkedQuestions.forEach((ele,i,arr)=>{
                 widsArr.push(ele.wtWid);
             })
           this.$emit('handleClickSure',widsArr.join(','))
       },
        pageQuestionForWeekPlan(curPage){  //新增问题 弹出层
            pageQuestionForWeekPlan({
                curPage:curPage,
                pageSize:this.pageSize,
                qygc:this.qyValue,
                cnjssj:this.lastDay.trim(),
                keyword:this.keyword,
                wtzt:this.wtztValue.join(','),
                yczt:this.ycztValue
            }).then(({data})=>{
                 if(data.state == 'success'){
                    this.tableData = data.data.rows
                    this.records = data.data.records
                 }    
            })
        },
   },
   props:{
    show: {
      type: Boolean,
      default:false
    },
    lastDay:{
      type:String,
      default:''
    }
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(n){
                // this.gczdList = getSession("gczd");
                // this.qyValue = this.gczdList[0].label
                this.pageQuestionForWeekPlan(1);
                this.currentPage = 1;
            }
        }
    },
   components: {pagination}
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
 
</style>
