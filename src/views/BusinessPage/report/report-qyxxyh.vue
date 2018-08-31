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
                        >
                    </el-date-picker>
                </p>
            </div>
           <div>
              <p class="query-title">项目类型:</p>
              <p class="query-list" @click="handleXMLX">
                  <span data-type = "" :class="{'bg-active':xmlx == ''}">全部</span>
                  <span v-for="(xmlxx,index) in xmlxList" :data-type="xmlxx.label" :class="{'bg-active':xmlx == xmlxx.label}">{{xmlxx.mc}}</span>
                </p>
           </div>
       </div>
        <div style="text-align:right;margin:10px 0">
           <el-button size="mini" type="primary" @click="exportTable">导出</el-button>
        </div>
        <div>
            <report-qyxxyh :tableData="qyxxyhList" :title="title" @handleQyxxyh="handleQyxxyh"></report-qyxxyh>
        </div>
    </div>    
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js'
import { queryregionSchoolQuestionLst } from '@/api/report.js'
import {getMenu,getSession} from '@/utils/util.js'
import reportQyxxyh from "@/components/reportTable/report-qyxxyh.vue";
export default {
    data(){
        return{
             date:[,],
             xmlxList:[],
             xmlx:'',
             qyxxyhList:[],             
             title:"区域学校用户",
        }
    },
    methods:{
         handleQyxxyh(param,word){  // 产品响应跟踪 报表
           param['xmlx'] = this.xmlx;
           param['startDate'] = !this.date?'':this.date[0];
           param['endDate'] = !this.date?'':this.date[1];
           let path;
            if(word == 'xxs'||word =='yjrxxs'||word =='wjrxxs'||word =='zcxxs'||word =='twxxs'||word =='hyxxszb'||word =='twxxzb'||word =='hyxxs'||word =='jrwsyxxs'){
               param['lx'] = 1;
               path = "/qyxxyhReport/school";
            }else if(word=='xxyhs'||word=='xxwtyhs'||word=='xxhyyhs'||word=='xxtwyhszb'||word=='xxhyyhszb'||word=='jrwsyyhs'){
               param['lx'] = 2;
               path = "/qyxxyhReport/user";  
            }else if(word=='yjrxms'||word=='wjrxms'){
               param['lx'] = 3;
               path = "/qyxxyhReport/project";      
            }else{
               param['lx'] = '';
               path = "/report-list/questionlist.html";   
            }

           let routeData = this.$router.resolve({
                path: path,
                query:param
          });
          window.open(routeData.href, "_blank");  
        },
        exportTable(){
            let startDate = !this.date[0]?'':this.date[0]
            let endDate = !this.date[1]?'':this.date[1]
            window.open(window.baseurl+'report/exportregionSchoolQuestionLst.do?xmlx='+this.xmlx+'&startDate='+startDate+'&endDate='+endDate);
        },
        handleDatepick(){
           this.queryregionSchoolQuestionLst();  //区域学校用户
        },
        handleXMLX(e){
            let xmlx = e.target.getAttribute('data-type');  
            if(xmlx == null) return;
            this.xmlx = xmlx;
            this.queryregionSchoolQuestionLst();
        },
   
        queryregionSchoolQuestionLst(){      //区域学校用户
                queryregionSchoolQuestionLst({
                    xmlx:this.xmlx,
                    startDate:!this.date?'':this.date[0],
                    endDate:!this.date?'':this.date[1]
                }).then(({data})=>{
                    if(data.state == 'success'){
                             this.qyxxyhList = data.data
                        if(!data.data){
                            this.qyxxyhList = [];
                        }
                    }else{
                        
                        this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:'error'});
                    }
            })  
        },
    },
      mounted(){
            if(getSession('ProjectCustomStatus') == null){
                getMenu('ProjectCustomStatus',this.xmlxList,'');//获取工程战队    
            }else{
                this.xmlxList = getSession('ProjectCustomStatus');  
            }  
            this.queryregionSchoolQuestionLst();
      },
      activated(){
          
      },
      watch:{ },
      components: {
          reportQyxxyh
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
