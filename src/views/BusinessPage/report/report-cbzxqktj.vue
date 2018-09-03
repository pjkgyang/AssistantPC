<template>
    <div>
       <div>
           <filterComponent  :filterList="filterList" @handleChangeFilter="handleChangeFilter"></filterComponent>
       </div>
        <div style="margin:5px 0" colcenter spacebetween>
            <div>
                <p class="month-plan-explain">注：日报工时成本 = 日报工时 * 120（元/小时）；二开提报 = 二开中标费用 / 8800 * 18000</p>
            </div>
           <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
        </div>
        <div>
            <tableComponent :tableData="dataList" :tableHead="headList" :currentPage="currentPage"  @handleCurrentChange="handleCurrentChange"></tableComponent>
            <!-- <tableComponent :tableData="dataList" :tableHead="headList"   @handleCurrentChange="handleCurrentChange"></tableComponent> -->
        </div>
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { queryCostStat } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import tableComponent from "@/components/reportTable/tableComponent.vue";
import tableComponents from "@/components/reportTable/tableComponents.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";
export default {
    data(){
        return{
             gczdList:[],
             xmlxList:[],
             xmlx:'',
             gczd:'',
             dataList:{},   
             headList:[],          
             keyword:'',
             filterList:['qygc','xmlb','date','sfzt','keyword','xmlx'],
             filterDate:{
                sfzt:"",
                gczd: "",
                date:"",
                xmlb:'',
                keyword: "",
             },
             currentPage:1
        }
    },
    methods:{
        exportTable(){
            let startDt = !this.filterDate.date?'':this.filterDate.date[0];
            let endDt = !this.filterDate.date?'':this.filterDate.date[1];
            window.open(window.baseurl+'report/exportCostStat.do?qygc='+this.filterDate.gczd+'&xmlb='+
            this.filterDate.xmlb+'&sfzt='+this.filterDate.sfzt+'&startDt='+startDt+'&endDt='+endDt+'&keyword='+this.filterDate.keyword);
        },
        handleCurrentChange(data){
            this.queryCostStat(data);
            this.currentPage = data;
        },
        handleChangeFilter(data){
            this.filterDate = data;
            this.queryCostStat(1);
            this.currentPage = 1;
        },
        queryCostStat(curPage){      //成本执行统计
            this.$get(this.API.queryCostStat,{
                curPage:curPage,
                pageSize:10,
                qygc:this.filterDate.gczd,
                xmlb:this.filterDate.xmlb,
                sfzt:this.filterDate.sfzt,
                startDt:!this.filterDate.date?'':this.filterDate.date[0],
                endDt:!this.filterDate.date?'':this.filterDate.date[1],
                xmlx:this.filterDate.xmlx,
                keyword:this.filterDate.keyword,
            }).then(res=>{
                this.dataList = res.data
                // this.dataList = res.data.body;
                // this.headList = res.data.head;
            })
        },
    },
      mounted(){
            if(getSession('gczd') == null){
                getMenu('gczd',this.gczdList,true);//获取工程战队    
            }else{
                this.gczdList = getSession('gczd');  
            }  
            this.queryCostStat(1);
            window.onerror = function(){ return true };
      },
      activated(){
          
      },
      watch:{ },
      components: {
          tableComponent,
          filterComponent,
          tableComponents
    }
}
</script>
<style scope>
.query-condition>div{
    display: flex;
    align-items: flex-start;
    margin:10px 0;
    font-size: 13px;
}  
/* .query-title{
    font-size: 14px;
    width: 100px;
    white-space: nowrap;
    text-align:left;
    padding: 3px 10px 0;
    font-weight: 700;
} */
.query-list{
    width: 95%;
}
.query-list span:hover{
    cursor: pointer;
}
.query-list span{
    display: inline-block;
    padding: 0px 5px;
    color: #637D8A;
    border-radius: 3px;
    margin:5px 10px 0 0;
}
.bg-active{
    background: #1997D7;
    color: #fff !important;
}
</style>
