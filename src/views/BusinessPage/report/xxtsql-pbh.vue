<template>
    <div>
       <div>
           <filterComponent  :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入学校名称'"
           ></filterComponent>
       </div>
        <div>
            <tableComponent :tableData="dataList" :tableHead="headList" :pageShow="true" :currentPage="currentPage"  @handleCurrentChange="handleCurrentChange"
            :height="'532px'" @handleXxwt="handleXxwt" @exportTable="exportTable"></tableComponent>
            <!-- <tableComponents :tableData="dataList" :tableHead="headList" :pageShow="false"></tableComponents> -->
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
             dataList:{},   
             headList:[],          
             filterList:['keyword','qygc','date'],
             filterDate:{
                keyword:"",
                gczd: "",
                date:"",
             },
             currentPage:1
        }
    },
    methods:{
        exportTable(){
            let startDt = !this.filterDate.date?'':this.filterDate.date[0];
            let endDt = !this.filterDate.date?'':this.filterDate.date[1];
            window.open(window.baseurl+'report/exportDwtsqlReport.do?qyzd='+this.filterDate.gczd+'&startDt='+startDt+'&endDt='+endDt+'&keyword='+this.filterDate.keyword);
        },
        handleCurrentChange(data){
            this.dwtsqlReport(data);
            this.currentPage = data;
        },
        handleChangeFilter(data){
            this.filterDate = data;
            this.dwtsqlReport();
            this.currentPage = 1;
        },
        dwtsqlReport(){    
            this.$get(this.API.dwtsqlReport,{
                curPage:this.currentPage,
                pageSize:14,
                qygc:this.filterDate.gczd,
                startDt:!this.filterDate.date?'':this.filterDate.date[0],
                endDt:!this.filterDate.date?'':this.filterDate.date[1],
                keyword:this.filterDate.keyword
            }).then(res=>{
                if(res.state == 'success'){
                    this.dataList = res.data
                    //  this.dataList = res.data.body;
                    //  this.headList = res.data.head;
                }else{
                     this.$alert(res.msg, '提示', {confirmButtonText: '确定',type:'error'});
                }
               
            })
        },
        handleXxwt(data,i,params){
             let obj = {
                qyzd:this.filterDate.gczd,
                startDt:!this.filterDate.date?'':this.filterDate.date[0],
                endDt:!this.filterDate.date?'':this.filterDate.date[1],
                keyword:this.filterDate.keyword
            }
            obj['dwmc'] = data[1]
            if(params[i].en.indexOf(',') != -1){
                    let arr = params[i].en.split(',');
                    arr.forEach((ele,i,arr)=>{
                        if(i == 0){
                            obj[ele] = arr[1]   
                        }
                    })
                }
                let routeData = this.$router.resolve({
                    path: params[i].zh == '学校'?"/xxtsql":"/report-list/questionlist.html",
                    query:params[i].zh == '学校'?{dwmc:escape(data[i])}:obj
                });
                window.open(routeData.href, "_blank");
        },
    },
      mounted(){ 
           this.$nextTick(()=>{
                this.dwtsqlReport();
           })
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
