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
              <p class="query-title">单位类型:</p>
              <p class="query-list" @click="handleDWLX">
                  <span data-type="" :class="{'bg-active':dwlx == ''}" >全部</span>
                  <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
                  </p>
           </div>
            <div>
              <p class="query-title">解决状态:</p>
              <p class="query-list" @click="handleJJZT">
                  <span data-type="" :class="{'bg-active':jjzt == ''}" >全部</span>
                  <span v-for="(jjztz,index) in jjztList" :data-type="jjztz.label" :class="{'bg-active':jjzt == jjztz.label}">{{jjztz.mc}}</span>
                  </p>
           </div>
       </div>
        <div style="text-align:right;margin:10px 0">
           <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
        </div>
        <div>
             <report-qyjjqk :tableData="qyjjqkList" @handleQyjjqk="handleQyjjqk" ></report-qyjjqk>
        </div>              
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { wtztqkReport,ylWtReportByCpx } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import reportQyjjqk from "@/components/reportTable/report-qyjjqk.vue";
export default {
    data(){
        return{
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
             jjztList:[{
               label:'1',
               mc:'已关闭'
              },{
                label:'2',
                mc:'申请关闭中'
              }],
             jjzt:'',
             cpx:'',
             dwlx:'',
             cpxmc:"",
             qyjjqkList:[],             
        }
    },
    methods:{
        handleQyjjqk(param){
            param['cpxbh'] = this.cpx;
            param['dwlx'] = this.dwlx;
            param['wtzt'] = this.jjzt;
            param['lx'] = 7;
            let routeData = this.$router.resolve({
                path: "/report-list/questionlist.html",
                query:param
            });
          window.open(routeData.href, "_blank");       
        },
        exportTable(){  // 导出
            window.open(window.baseurl+'report/exportylWtReportByCpx.do?dwlx='+this.dwlx+'&cpxbh='+this.cpx+'&wtzt='+this.jjzt+'&lx=7');  
        }, 
        handleCPX(e){
            let cpx = e.target.getAttribute('data-type')  
            this.cpxmc = e.target.getAttribute('data-mc')  
            if(cpx==null) return;
            this.cpx = cpx
            this.ylWtReportByCpx();  // 区域所属学校
        },
        handleDWLX(e){
            let dwlx = e.target.getAttribute('data-type')  
            if(dwlx==null) return;
            this.dwlx = dwlx
            this.ylWtReportByCpx();  
        },
        handleJJZT(e){
            let jjzt = e.target.getAttribute('data-type')  
            if(jjzt==null) return;
            this.jjzt = jjzt
            this.ylWtReportByCpx();  
        },

      //    遗留问题报表  //问题跟踪报表
      ylWtReportByCpx(){
          ylWtReportByCpx({
            curPage:1,
            pageSize:99999,
            qyzd:'',
            dwlx:this.dwlx,
            cpxbh:this.cpx,
            sjlb:'',
            wtzt:this.jjzt,
            lx:7,
            keyword:''
          }).then(({data})=>{
            if(data.state == 'success'){
                this.qyjjqkList = data.data  
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
        }else{
                this.cpxline = getSession('cpx');
        }
        this.ylWtReportByCpx();     

      },
      activated(){
          
      },
      watch:{},
      components: {
          reportQyjjqk
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
