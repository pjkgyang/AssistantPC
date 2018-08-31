<template>
    <div>
       <div class="query-condition">
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
        <div>
             <report-xxhzhb :tableData="xxhzhbList" :title="title" @handleXxwt="handleXxwt" ></report-xxhzhb>
        </div>              
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { wtztqkReport,ylWtReportByCpx } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import reportXxhzhb from "@/components/reportTable/report-xxhzhb.vue";
export default {
    data(){
        return{
             cpxline:[],
             gczd:'',
             cpx:'',
             dwlx:'',
             cpxmc:"",
             sjlb:'0',
             title:'区域所属学校',
             xxhzhbList:[],             
        }
    },
    methods:{
        handleXxwt(param){  // 产品响应跟踪 报表
           param['cpxbh'] = this.cpx;
           param['sjlb'] =  this.sjlb;
           param['lx'] = 5;
           let routeData = this.$router.resolve({
                path: "/report-list/questionlist.html",
                query:param
          });
          window.open(routeData.href, "_blank");  
        },
        exportTable(){ //导出
             window.open(window.baseurl+'report/exportylWtReportByCpx.do?cpxbh='+this.cpx+'&cpxmc='+this.cpxmc+'&sjlb='+this.sjlb+'&lx=5');
        },
        handleCPX(e){
            let cpx = e.target.getAttribute('data-type')  
            this.cpxmc = e.target.getAttribute('data-mc')  
            if(cpx==null) return;
            this.cpx = cpx
            this.ylWtReportByCpx();  // 区域所属学校
        },
        handleSJLB(e){
            let sjlb = e.target.getAttribute('data-type')  
            if(sjlb==null) return;
            this.sjlb = sjlb
            this.ylWtReportByCpx();  // 区域所属学校
        },

      //    遗留问题报表  //问题跟踪报表
      ylWtReportByCpx(){
          ylWtReportByCpx({
            curPage:1,
            pageSize:99999,
            qyzd:'',
            dwlx:'',
            cpxbh:this.cpx,
            sjlb:this.sjlb,
            lx:5,
            keyword:''
          }).then(({data})=>{
            if(data.state == 'success'){
                this.xxhzhbList = data.data  // 区域所属学校
            }else{
                
            }
          })
      },
    },
      mounted(){
        if(getSession('cpx') == null){
                 getMenu('cpx',this.cpxline,true);//获取产品线
        }else{
                this.cpxline = getSession('cpx');
        }
        this.ylWtReportByCpx();    //区域所属学校        

      },
      activated(){
          
      },
      watch:{},
      components: {
          reportXxhzhb
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
