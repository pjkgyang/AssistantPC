<template>
    <div>
       <div class="query-condition">
           <div>
                <p>
                <p class="query-title">高级搜索</p>
                <el-input v-model="keyword" size="mini" style="width:260px;" placeholder="请输入单位名称" @change="handleSearch"></el-input>&#x3000;
                <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
             </p>
           </div>
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
        <div>
            <report-xxhzhb :tableData="xxhzhbList" :title="title" @handleXxwt="handleXxwt"></report-xxhzhb>
            <div style="text-align:right">
                <pagination :currentPage="currentPage" :pageSize="20" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
            </div>
        </div>
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { wtztqkReport,ylWtReportByCpx } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import pagination from '@/components/BusinessPage/pagination.vue'
import reportXxhzhb from "@/components/reportTable/report-xxhzhb.vue";
export default {
    data(){
        return{
             reportType:'wtgz',
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
             dwlx:'1',
             cpx:'',
             cpxmc:"",
             sjlb:'0',
             xxhzhbList:[],             
             total:null,
             keyword:"",
             title:"学校合作伙伴",
             currentPage:null,
             thList:[]
        }
    },
    methods:{
         handleXxwt(param){  // 产品响应跟踪 报表
           param['qyzd'] = this.gczd;
           param['dwlx'] = this.dwlx;
           param['cpxbh'] = this.cpx;
           param['sjlb'] =  this.sjlb;
           param['lx'] = 4;
           let routeData = this.$router.resolve({
                path: "/report-list/questionlist.html",
                query:param
          });
          window.open(routeData.href, "_blank");  
        },
        exportTable(){
             window.open(window.baseurl+'report/exportylWtReportByCpx.do?dwlx='+this.dwlx+'&qyzd='+this.gczd+'&cpxbh='+this.cpxbh+'&cpxmc='+this.cpxmc+'&sjlb='+this.sjlb+'&lx=4'+'&keyword'+this.keyword);  
        },
        handleSearch(){
            this.ylWtReportByCpx(1,15,4);    //学校报表
            this.currentPage = 1
        },
        handleSearchBtn(){
            this.ylWtReportByCpx(1,15,4);    //学校报表
            this.currentPage = 1
        },
        handleCurrentChange(data){
            this.ylWtReportByCpx(data,15,4);
        },
        handleDWLX(e){
            let dwlx = e.target.getAttribute('data-type')  
            if(dwlx==null) return;
            this.dwlx = dwlx
            this.currentPage = 1
            this.ylWtReportByCpx(1,15);  // 学校合作伙伴
        },
        handleGCZD(e){
            let gczd = e.target.getAttribute('data-type')  
            if(gczd==null) return;
            this.gczd = gczd
            this.currentPage = 1
            this.ylWtReportByCpx(1,15);  // 学校合作伙伴
        },
        handleCPX(e){
            let cpx = e.target.getAttribute('data-type')  
            this.cpxmc = e.target.getAttribute('data-mc')  
            if(cpx==null) return;
            this.cpx = cpx
            this.currentPage = 1
            this.ylWtReportByCpx(1,15);  // 学校合作伙伴
        },
        handleSJLB(e){
            let sjlb = e.target.getAttribute('data-type')  
            if(sjlb==null) return;
            this.sjlb = sjlb
            this.currentPage = 1
            this.ylWtReportByCpx(1,15);  // 学校合作伙伴
        },

      //    遗留问题报表  //问题跟踪报表
      ylWtReportByCpx(curPage,pageSize){
          ylWtReportByCpx({
            curPage:curPage,
            pageSize:pageSize,
            qyzd:this.gczd,
            dwlx:this.dwlx,
            cpxbh:this.cpx,
            sjlb:this.sjlb,
            lx:4,
            keyword:this.keyword
          }).then(({data})=>{
            if(data.state == 'success'){
                this.xxhzhbList = data.data.rows
                this.total = data.data.records
                if(curPage == 1){
                    this.thList = data.data.rows[0]
                }else{
                    this.xxhzhbList.unshift(this.thList);
                }
                
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
            this.ylWtReportByCpx(1,15);    //学校报表      

      },
      activated(){
          
      },
      watch:{ },
      components: {
          pagination,
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
