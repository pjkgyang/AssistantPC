<template>
    <div>
       <div class="query-condition"> 
           <div>
                <p>
                <p class="query-title">高级搜索</p>
                <el-input v-model="keyword" size="mini" style="width:260px;" placeholder="请输入工号/姓名" @change="handleSearch"></el-input>&#x3000;
                <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
             </p>
           </div>
           <div>
                 <p class="query-title">关闭时间:</p>
                 <p>
                    <el-date-picker size="mini" v-model="ksrqValue" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>&#x3000;  
                    至&#x3000; <el-date-picker size="mini" v-model="jsrqValue" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker> 
                 </p>&#x3000; 
                 <el-button type="primary" size="mini" @click="handleCheckDate">查询</el-button>
           </div>
            <div>
            <p class="query-title">区域工程:</p>
            <p class="query-list"  @click="handleGCZD">
               <span data-type = ""  :class="{'bg-active':gczd == ''}">全部</span>
               <span v-for="(gcqy,index) in gczdList" :data-type="gcqy.label" :key="index" :class="{'bg-active':gczd == gcqy.label}">{{gcqy.mc}}</span>
              </p>
           </div>   
           <div>
              <p class="query-title">产品线:</p>
              <p class="query-list" @click="handleCPX">
                  <span  data-type="" :class="{'bg-active':cpx == ''}">全部</span>
                  <span v-for="(cpxl,index) in cpxline" :data-mc="cpxl.mc" :data-type="cpxl.label" :class="{'bg-active':cpx == cpxl.label}">{{cpxl.mc}}</span>
                  </p>
           </div>
           <div>
              <p class="query-title">单位类型:</p>
              <p class="query-list" @click="handleDWLX">
                  <span data-type="" :class="{'bg-active':dwlx == ''}">全部</span>
                  <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
                </p>
           </div>
           <div>
              <p class="query-title">项目类型:</p>
              <p class="query-list" @click="handleXMLX">
                  <span data-type="" :class="{'bg-active':xmlx == ''}">全部</span>
                  <span v-for="(xmlxx,index) in xmlxList" :data-type="xmlxx.label" :class="{'bg-active':xmlx == xmlxx.label}">{{xmlxx.mc}}</span>
                </p>
           </div>
       </div>
        <div style="text-align:right;margin:10px 0">
           <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
        </div>
        <div>
            <tablexjpmGr :tableData="grpmList" @handleWtpfQy="handleWtpfQy" :nowPage="nowPage"></tablexjpmGr> 
             <div style="text-align:right">
                <pagination  :currentPage="currentPage" :pageSize="10" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
            </div>
        </div>
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { wtztqkReport,WtReportOrderStar } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import tablexjpmGr from "@/components/reportTable/table-xjpm-gr.vue";
import pagination from '@/components/BusinessPage/pagination.vue'
export default {
    data(){
        return{
             gczdList:[],
             cpxline:[],
             dwlxList:[{
                 label:'1',
                 mc:'学校'
              },{
                label:'2',
                mc:'合作伙伴'
              }],
              xmlxList:[],
             gczd:'',
             xmlx:'',
             dwlx:'1',
             cpx:'',
             cpxmc:"",
             sjlb:'0',
             grpmList:[],
             ksrqValue:'',
             jsrqValue:'',
             keyword:"",
             currentPage:1,
             total:null,
             nowPage:null
        }
    },
    methods:{
        handleCheckDate(){
            this.nowPage = 0
            this.WtReportOrderStar(1); 
        },
        handleCurrentChange(data){
            this.WtReportOrderStar(data);  
            this.nowPage = data - 1 
        },
        handleSearch(){
            this.nowPage = 0
            this.WtReportOrderStar(1);   
        },
        handleSearchBtn(){
            this.nowPage = 0
            this.WtReportOrderStar(1);   
        },
        handleWtpfQy(param){ //问题受理人报表
           param['gbsjStart'] =  this.ksrqValue;
           param['gbsjEnd'] =  this.jsrqValue;
           param['keyword'] =  this.keyword;
           param['qyzd'] = this.gczd;
           param['cpxbh'] = this.cpx;
           param['dwlx'] = this.dwlx;
           param['xmlx'] =  this.xmlx;
           param['lx'] = 5;
           let routeData = this.$router.resolve({
                path: "/report-list/questionPflist.html",
                query:param
           });
          window.open(routeData.href, "_blank");      
        }, 
        exportTable(){  // 导出
         window.open(window.baseurl+'report/exportWtReportOrderStar.do?gbsjStart='+this.ksrqValue+'&gbsjEnd='+this.jsrqValue+
            '&dwlx='+this.dwlx+'&cpxbh='+this.cpx+'&xmlx='+this.xmlx+'&qyzd='+this.gczd+'&lx=5'+'&keyword='+this.keyword);
        },
        handleGCZD(e){
            let gczd = e.target.getAttribute('data-type')  
            if(gczd==null) return;
            this.gczd = gczd
            this.nowPage = 0
            this.WtReportOrderStar(1); 
        },
        handleDWLX(e){
            let dwlx = e.target.getAttribute('data-type')  
            if(dwlx==null) return;
            this.dwlx = dwlx
            this.nowPage = 0
            this.WtReportOrderStar(1);    
        },
        handleXMLX(e){
            let xmlx = e.target.getAttribute('data-type')  
            if(xmlx==null) return;
            this.xmlx = xmlx
            this.nowPage = 0
            this.WtReportOrderStar(1);     
        },
        handleCPX(e){
            let cpx = e.target.getAttribute('data-type')  
            this.cpxmc = e.target.getAttribute('data-mc')  
            if(cpx==null) return;
            this.cpx = cpx
            this.nowPage = 0
            this.WtReportOrderStar(1); 
        },

      //    遗留问题报表  //问题跟踪报表
      WtReportOrderStar(curPage){
          this.$get(this.API.WtReportOrderStar,{
            curPage:curPage,
            pageSize:10,
            gbsjStart:this.ksrqValue,
            gbsjEnd:this.jsrqValue,
            lx:5,
            qyzd:this.gczd,
            cpxbh:this.cpx,
            dwlx:this.dwlx,
            xmlx:this.xmlx, 
            keyword:this.keyword
           }).then(res=>{
              if(res.state == 'success'){
                    this.grpmList = res.data.rows
                    this.total = res.data.records
                    if(curPage == 1){
                        this.currentPage =  1
                    }
                }else{
                 this.$alert(res.msg, '提示', {confirmButtonText: '确定',type:'error',callback: action => {}}); 
                }     
           })
       },
    },
      mounted(){
        if(getSession('cpx') == null){
                 getMenu('cpx',this.cpxline,true);//获取产品线
                 getMenu('gczd',this.gczdList,true);//获取工程战队   
                 getMenu('ProjectCustomStatus',this.xmlxList,'');//获取工程战队     
        }else{
                this.cpxline = getSession('cpx');
                this.gczdList = getSession('gczd');    
                this.xmlxList = getSession('ProjectCustomStatus');      
        }
        this.WtReportOrderStar(1);      
      },
      activated(){},
      watch:{},
      components: { tablexjpmGr,pagination }
}
</script>
<style scope>
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
</style>
