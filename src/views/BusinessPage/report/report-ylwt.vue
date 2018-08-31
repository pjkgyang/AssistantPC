<template>
    <div>
       <div class="query-condition">
           <div>
            <p class="query-title">区域工程:</p>
            <p class="query-list"  @click="handleGCZD">
               <span data-type = ""  :class="{'bg-active':gczd == ''}">全部</span>
               <span v-for="(gcqy,index) in gczdList" :data-type="gcqy.label" :key="index" :class="{'bg-active':gczd == gcqy.label}">{{gcqy.mc}}</span>
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
              <p class="query-title">产品线:</p>
              <p class="query-list" @click="handleCPX">
                  <span  data-type="" :class="{'bg-active':cpx == ''}">全部</span>
                  <span v-for="(cpxl,index) in cpxline" :data-mc="cpxl.mc" :data-type="cpxl.label" :class="{'bg-active':cpx == cpxl.label}">{{cpxl.mc}}</span>
                  </p>
           </div>
           <div>
              <p class="query-title">时间类别:</p>
              <p class="query-list" @click="handleSJLB">
                   <span data-type="0" :class="{'bg-active':sjlb == '0'}">按当前环节</span>
                   <span data-type="1" :class="{'bg-active':sjlb == '1'}">按提问时间</span>
                </p>
           </div>
       </div>
        <div style="text-align:right;margin:10px 0">
           <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
        </div>
        <div class="table-wtslrgz">
            <report-ylwt :tableData="ylwtList" @handleWtslrgz="handleWtslrgz"></report-ylwt> 
        </div>
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { wtztqkReport,ylWtReportByCpx } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import reportYlwt from "@/components/reportTable/report-ylwt.vue";
export default {
    data(){
        return{
             gczdList:[],
             cpxline:[],
             dwlxList:[{
              label:'1',
              mc:'学校'
              },{
                label:'0',
                mc:'金智'
              },{
                label:'2',
                mc:'合作伙伴'
              }],
             gczd:'',
             dwlx:'',
             cpx:'',
             cpxmc:"",
             sjlb:'0',
             ylwtList:[],
        }
    },
    methods:{
        handleWtslrgz(param){ //问题受理人报表
           param['qyzd'] = this.gczd;
           param['dwlx'] = this.dwlx;
           param['cpxbh'] = this.cpx;
           param['sjlb'] =  this.sjlb;
           param['lx'] = 1;
           let routeData = this.$router.resolve({
                path: "/report-list/questionlist.html",
                query:param
           });
          window.open(routeData.href, "_blank");    
        }, 
        exportTable(){  // 导出
           window.open(window.baseurl+'report/exportylWtReportByCpx.do?dwlx='+this.dwlx+'&qyzd='+this.gczd+'&cpxbh='+this.cpxbh+'&cpxmc='+this.cpxmc+'&sjlb='+this.sjlb+'&lx=1');
        },
        handleDWLX(e){
            let dwlx = e.target.getAttribute('data-type');  
            if(dwlx==null) return;
            this.dwlx = dwlx
            this.ylWtReportByCpx();   
        },
        handleGCZD(e){
            let gczd = e.target.getAttribute('data-type');  
            if(gczd==null) return;
            this.gczd = gczd
            this.ylWtReportByCpx(); 
        },
        handleCPX(e){
            let cpx = e.target.getAttribute('data-type');  
            this.cpxmc = e.target.getAttribute('data-mc')  
            if(cpx==null) return;
            this.cpx = cpx
            this.ylWtReportByCpx(); 
        },
        handleSJLB(e){
            let sjlb = e.target.getAttribute('data-type'); 
            if(sjlb==null) return;
            this.sjlb = sjlb
           this.ylWtReportByCpx(); 
        },

      //    遗留问题报表  //问题跟踪报表
      ylWtReportByCpx(){
          ylWtReportByCpx({
            curPage:1,
            pageSize:99999,
            qyzd:this.gczd,
            dwlx:this.dwlx,
            cpxbh:this.cpx,
            sjlb:this.sjlb,
            lx:1,
            keyword:''
          }).then(({data})=>{
            if(data.state == 'success'){
                this.ylwtList = data.data
            }else{
               this.$alert(data.msg, '提示', {
                confirmButtonText: '确定',
                type:'error',
                callback: action => {}
                }); 
            }
          })
      },
    },
      mounted(){
        if(getSession('cpx') == null){
                 getMenu('cpx',this.cpxline,true);//获取产品线
                 getMenu('gczd',this.gczdList,true);//获取工程战队    
        }else{
                this.cpxline = getSession('cpx');
                this.gczdList = getSession('gczd');      
        }
        this.ylWtReportByCpx();      
      },
      activated(){},
      watch:{},
      components: {reportYlwt}
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
