<template>
 <div>
     <div class="query-condition">
         <div>
            <p class="query-title">日期:</p>
            <p>
              <el-date-picker
                    v-model="date"
                    size="small"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="handleDatepick"
                    :picker-options="pickerBeginDateBefore">
                </el-date-picker>
            </p>
         </div>
         <div v-if="tag.includes('JYGL')">
            <p class="query-title">区域工程:</p>
            <p class="query-list"  @click="handleQY">
               <span data-type = ""  :class="{'bg-active':qymc == ''}">全部</span>
               <span v-for="(qy,index) in qygcList" :data-type="qy.label" :key="index" :class="{'bg-active':qymc == qy.label}">{{qy.mc}}</span>
              </p>
         </div>  
       </div>
       <div class="qyrb-table">
            <reportLog :tableData="qyrbList" :total="total" :qy="qymc"></reportLog>
       </div>
 </div>
</template>

<script>
import { GetDateStr,getMenu,getSession } from '@/utils/util.js'
import reportLog from "@/components/reportTable/report-qylog.vue";
import { qyRbReport } from '@/api/report.js'
 export default {
   data () {
     return {
          qygcList:[],  
          qymc:'',
          date:[GetDateStr(-1),GetDateStr(0)],
          pickerBeginDateBefore:{
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            onPick(date){

            }
        },
        qyrbList:[],
        total:{
            zdzrs:0,
            ytrbzs:0,
            qjzrs:0,
            wtrbzrs:0,
            btrbzrs:0,
            zddzwyrs:0,
            qyzwyrs:0
        },
        tag:''
     }
   },
   methods:{
       handleQY(e){
            let qymc = e.target.getAttribute('data-type')  
            if(qymc==null) return;
            this.qymc = qymc
            this.qyRbReport();
       },
       handleDatepick(){
            this.qyRbReport();
       },
     //   区域日报报表
       qyRbReport(){
           qyRbReport({
               startDt:this.date[0],
               endDt:this.date[1],
               qymc:this.qymc
           }).then(({data})=>{
               if(data.state == 'success'){
                   this.total.zdzrs= this.total.ytrbzs=this.total.qjzrs = this.total.wtrbzrs = this.total.btrbzrs =
                   this.total.zddzwyrs = this.total.qyzwyrs = 0;
                   
                   if(data.data == null || data.data.length == 0){
                       this.qyrbList = []
                   }else{
                        this.qyrbList = data.data
                        data.data.forEach((ele,i,arr)=>{
                           this.total.zdzrs +=  parseFloat(ele.zdryzs);
                           this.total.ytrbzs += parseFloat(ele.ytzs);
                           this.total.qjzrs += parseFloat(ele.qjzs);
                           this.total.wtrbzrs += parseFloat(ele.wtrbzs);
                           this.total.btrbzrs += parseFloat(ele.btrbzs);
                           this.total.zddzwyrs += parseFloat(ele.zddzwys);
                           this.total.qyzwyrs += parseFloat(ele.qyzwys);
                        })
                   }
               }else{
                    
               }
           })
       }
   },
   mounted(){
       if(getSession('gczd') == null){
            getMenu('gczd',this.qygcList,true);//获取工程战队    
        }else{
            this.qygcList = getSession('gczd');      
        }   
   },
   activated(){
       this.qyRbReport();  
       this.tag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag
   },
   components: {reportLog}
 }
</script>

<style scoped>
.query-condition>div{
    display: flex;
    align-items: flex-start;
    margin:10px 0;
    font-size: 13px;
}  
.query-title{
    font-size: 14px;
    width: 100px;
    white-space: nowrap;
    text-align:left;
    padding: 3px 10px 0;
    font-weight: 700;
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
.qyrb-table{
    overflow-y: auto;
 }
</style>
