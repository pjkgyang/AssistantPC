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
            <report-ylwt2 :tableData2="ylwtList2"  :cpx="cpxline.length" @handleWtxygz="handleWtxygz"></report-ylwt2>
        </div>
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { wtztqkReport,ylWtReportByCpx } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import reportYlwt2 from "@/components/reportTable/report-ylwt2.vue";
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
             sjlb:'0',
             ylwtList2:[],
        }
    },
    methods:{
         handleWtxygz(param){  //问题响应跟踪 报表
           param['qyzd'] = this.gczd;
           param['dwlx'] = this.dwlx;
           param['sjlb'] =  this.sjlb;
           param['lx'] = 2;
           let routeData = this.$router.resolve({
                path: "/report-list/questionlist.html",
                query:param
          });
          window.open(routeData.href, "_blank");  
        },
        exportTable(){  // 导出
         window.open(window.baseurl+'report/exportylWtReportByCpx.do?dwlx='+this.dwlx+'&qyzd='+this.gczd+'&sjlb='+this.sjlb+'&lx=2');
        },
        handleDWLX(e){
            let dwlx = e.target.getAttribute('data-type')  
            if(dwlx==null) return;
            this.dwlx = dwlx
            this.ylWtReportByCpx();
        },
        handleGCZD(e){
            let gczd = e.target.getAttribute('data-type')  
            if(gczd==null) return;
            this.gczd = gczd
            this.ylWtReportByCpx();
        },
        handleSJLB(e){
            let sjlb = e.target.getAttribute('data-type')  
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
            cpxbh:'',
            sjlb:this.sjlb,
            lx:2,
            keyword:''
          }).then(({data})=>{
            if(data.state == 'success'){
                this.ylwtList2 = data.data
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
      activated(){
          
      },
      watch:{},
      components: {
          reportYlwt2,
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
