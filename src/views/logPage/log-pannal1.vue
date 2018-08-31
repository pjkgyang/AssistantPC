<template>
<div class="qyrb-pannal1">
    <div class="out-table">
      <div class="query-condition">
         <div>
            <p class="query-title">日期:</p>
            <p>
                  <el-date-picker
                    v-model="date"
                    align="right"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                    @change="handleDatePicker"
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
         <div>
            <p class="query-title">人员范围:</p>
            <p class="query-list"  @click="handleRYFW">
               <span data-type = ""  :class="{'bg-active':ryfw == ''}">全部</span>
               <span v-for="(ry,index) in ryfwList" :data-type="ry.label" :key="index" :class="{'bg-active':ryfw == ry.label}">{{ry.mc}}</span>
              </p>
         </div>
        <div v-if="tag.includes('JYGL')||tag.includes('QYZ') || tag.includes('ZDDZ')">
            <p class="query-title">区域战队:</p>
            <p class="query-list"  @click="handleQYZD">
               <span data-type = ""  :class="{'bg-active':qyzd == ''}">全部</span>
               <span v-for="(zd,index) in qyzdList" :data-type="zd.id" :key="index" :class="{'bg-active':qyzd == zd.id}">{{zd.text}}</span>
              </p>
         </div>
       </div>
        <div style="text-align:right;margin:10px 0">
           <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
        </div>
        <table class="table" >
            <caption>区域日报统计明细表</caption>
                <thead>
                  <tr>
                    <th>区域名称</th>
                    <th>区域工程总</th>
                    <th>战队名称</th>
                    <th>战队队长</th>
                    <th>战队成员</th>
                    <th>填写日报总数</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="qyrbmx in qyrbmxList">
                    <td :title="qyrbmx.qymc">{{qyrbmx.qymc}}</td>
                    <td :title="qyrbmx.qyzxm">{{qyrbmx.qyzxm}}</td>
                    <td :title="qyrbmx.qyzd">{{qyrbmx.qyzd}}</td>
                    <td :title="qyrbmx.zddzxm">{{qyrbmx.zddzxm}}</td>
                    <td :title="qyrbmx.cyxm">{{qyrbmx.cyxm}}</td>
                    <td><span @click="handleGrmx(qyrbmx.cyuid)" class="router-mx">{{qyrbmx.rbzs}}</span></td>
                    <td :title="qyrbmx.bz">{{qyrbmx.bz}}</td>
                </tr>
                <tr v-if="qyrbmxList.length == 0">
                     <td>暂无内容</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
</template>
<script>
import { qyRbMxReport ,getQyzd} from '@/api/report.js'
import { GetDateStr,getMenu,getSession } from '@/utils/util.js'

export default {
   data(){
       return{
          qygcList:[],  
          qyrbmxList:[],
          qyzdList:[],
          qymc:'',
          date:'',
          ryfw:'',
          qyzd:'',
          ryfwList:[{label:'1',mc:'应填人员'},
                    {label:'2',mc:'请假人员'},
                    {label:'3',mc:'未填报人员'},
                    {label:'4',mc:'补填人员'},
                    {label:'5',mc:'战队队长未阅人员'},
                    {label:'6',mc:'区域总未阅人员'},
                   ],
          pickerBeginDateBefore:{
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
        },
         tag:''
       }
   },
   updated(){

   },
   mounted(){
        document.title = '区域日报-统计明细'
        window.onerror = function(){return true;}
         if(getSession('gczd') == null){
            getMenu('gczd',this.qygcList,true);//获取工程战队    
        }else{
            this.qygcList = getSession('gczd');      
        }   
        this.tag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag
        this.date = this.$route.query.qyrq
        this.qymc = decodeURIComponent(this.$route.query.qymc)
        this.ryfw = this.$route.query.ryfw
        this.qyzd = this.$route.query.zdwid
        this.qyRbMxReport();
        this.getQyzd(this.qymc);  
   },

   methods:{
       exportTable(){
            window.open(window.baseurl+'report/exportQyRbMxReport.do?rq='+this.date+'&qymc='+this.qymc+'&zdwid='+this.qyzd+'&ryfw='+this.ryfw);
       },
       handleDatePicker(){  //日期筛选
            this.qyRbMxReport();   
       },
       handleQY(e){  //区域工程
            let qymc = e.target.getAttribute('data-type')  
            if(qymc==null) return;
            this.qymc = qymc
            this.qyzd = '';
            this.qyRbMxReport();
            this.getQyzd(this.qymc);
       },
       handleRYFW(e){  // 人员范围
            let ryfw = e.target.getAttribute('data-type')  
            if(ryfw==null) return;
            this.ryfw = ryfw
            this.qyRbMxReport();
       },
       handleQYZD(e){ // 区域战队
            let qyzd = e.target.getAttribute('data-type')  
            if(qyzd==null) return;
            this.qyzd = qyzd
            this.qyRbMxReport();
       },
       handleGrmx(param){
           let routeData = this.$router.resolve({
            name: "LogPannal2",
            query:{
                yhbh:param,
                rq:this.date
            }
         });
        window.open(routeData.href, '_blank'); 
       },

       qyRbMxReport(){  //获取明细报表
        qyRbMxReport({
           rq:this.date,
           qymc:this.qymc,
           ryfw:this.ryfw,
           zdwid:this.qyzd
        }).then(({data})=>{
           if(data.state == 'success'){
               if(data.data == null){
                  this.qyrbmxList = []
               }else{
                  this.qyrbmxList = data.data
               }
           }
        })
       },
       getQyzd(qymc){
            getQyzd({
                qymc:qymc
            }).then(({data})=>{
                if(data.data != null){
                    this.qyzdList = data.data
                }
            })
       }

   },
   props:{
     
   },
   watch:{
     
   }
}
</script>
<style scoped>
.qyrb-pannal1{
  background: #fff;
  height: 100%;
}
.out-table{
    padding: 10px 15px;
    height: 100%;
    overflow-y: auto;
}
.table{
    border: 1px solid #ddd;
    width: 100%;
}
.table thead {
    width: calc( 100% - 1.2em ) !important;
}
.table thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;
}
.table tbody{
    display: block;
    height:66vh;
    width: 100%;
    overflow-y: scroll;
}

.table caption{
    border: 1px solid #ddd;
    border-bottom: none;
    text-align: center;
    background: #eee !important;
    font-size:18px;
    font-weight: 700;
    color: #000;
}
.table tr,.table th{
    height: 37px !important;
    text-align:center;
    border-right: 1px solid #ddd;
    padding: 0;
    margin: 0;
    vertical-align:middle;
}
.table tr:last-child{
   border-bottom: 1px solid #ddd; 
}
.table td{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-right: 1px solid #ddd;
}


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
.router-mx{
    color: rgb(61, 126, 211);
}
.router-mx:hover{
    cursor: pointer;
    text-decoration: underline;
}
</style>
