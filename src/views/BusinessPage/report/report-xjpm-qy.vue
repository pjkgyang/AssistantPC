<template>
    <div>
       <div class="query-condition"> 
           <div>
                 <p class="query-title">关闭时间:</p>
                 <p>
                   <el-date-picker  size="mini" v-model="ksrqValue" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker>&#x3000;  
                   至&#x3000; <el-date-picker  size="mini" v-model="jsrqValue" type="date" placeholder="选择日期"  value-format="yyyy-MM-dd"></el-date-picker> 
                 </p>&#x3000; 
                 <el-button type="primary" size="mini" @click="handleCheckDate">查询</el-button>
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
            <tablexjpmQy :tableData="qypmList" :total="total" @handleWtpfQy="handleWtpfQy"></tablexjpmQy> 
        </div>
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { WtReportOrderStar } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import tablexjpmQy from "@/components/reportTable/table-xjpm-qy.vue";
export default {
    data(){
        return{
             cpxline:[],
             dwlxList:[{
              label:'1',
              mc:'学校'
              },{
                label:'2',
                mc:'合作伙伴'
              }],
              xmlxList:[],
             xmlx:'',
             dwlx:'1',
             cpx:'',
             cpxmc:"",
             sjlb:'0',
             qypmList:[],
             ksrqValue:'',
             jsrqValue:'',
             total:{}
        }
    },
    methods:{
        handleWtpfQy(param){ //问题受理人报表
           param['gbsjStart'] =  this.ksrqValue;
           param['gbsjEnd'] =  this.jsrqValue;
           param['dwlx'] = this.dwlx;
           param['cpxbh'] = this.cpx;
           param['xmlx'] =  this.xmlx;
           param['lx'] = 1;
           let routeData = this.$router.resolve({
                path: "/report-list/questionPflist.html",
                query:param
           });
          window.open(routeData.href, "_blank");    
        }, 
        exportTable(){  // 导出
           window.open(window.baseurl+'report/exportWtReportOrderStar.do?gbsjStart='+this.ksrqValue+'&gbsjEnd='+this.jsrqValue+'&cpxbh='+this.cpx+'&xmlx='+this.xmlx+'&dwlx='+this.dwlx+'&lx=1');
        },
        // handleStartDate(){
        //    this.WtReportOrderStar();
        // },
        // handleEndDate(){
        //     this.WtReportOrderStar();
        // },
        // 查看日期
        handleCheckDate(){
           this.WtReportOrderStar(); 
        },
        handleDWLX(e){
            let dwlx = e.target.getAttribute('data-type')  
            if(dwlx==null) return;
            this.dwlx = dwlx  
            this.WtReportOrderStar();
        },
        handleXMLX(e){
            let xmlx = e.target.getAttribute('data-type')  
            if(xmlx==null) return;
            this.xmlx = xmlx   
            this.WtReportOrderStar();
        },
        handleCPX(e){
            let cpx = e.target.getAttribute('data-type')  
            this.cpxmc = e.target.getAttribute('data-mc')  
            if(cpx==null) return;
            this.cpx = cpx
            this.WtReportOrderStar();
        },

      //    
      WtReportOrderStar(){
           this.$get(this.API.WtReportOrderStar,{
            curPage:1,
            pageSize:9999,
            gbsjStart:this.ksrqValue,
            gbsjEnd:this.jsrqValue,
            lx:1,
            dwlx:this.dwlx,
            cpxbh:this.cpx,
            xmlx:this.xmlx, 
           }).then(res=>{
              if(res.state == 'success'){
                    this.total = res.data.rows.pop()
                    this.qypmList = res.data.rows
                }else{
                   this.$alert(res.msg, '提示', {confirmButtonText: '确定',type:'error',callback: action => {}}); 
                }     
           })
      },
    },
      mounted(){
        if(getSession('cpx') == null){
            getMenu('ProjectCustomStatus',this.xmlxList,'');//获取工程战队 
            getMenu('cpx',this.cpxline,true);               //获取产品线
        }else{
            this.cpxline = getSession('cpx');
            this.xmlxList = getSession('ProjectCustomStatus');    
        }
        this.WtReportOrderStar();      
      },
      activated(){},
      watch:{},
      components: { tablexjpmQy }
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
</style>
