
<template>
  <div class="task-log">
          <div class="task-log-tabel">
              <el-table :data="tableData" border style="width: 100%" height="calc(100vh - 30px)"> 
                 <el-table-column label="操作" width="120">
                    <template slot-scope="scope">
                      <div flex spacearound> 
                        <el-button type="text" size="mini"  @click="handleTasklogDetail(scope.$index, scope.row)">批注</el-button>
                        <el-button v-if="scope.row.editable" type="text" size="mini"  @click="handleEditDetail(scope.$index, scope.row)">编辑</el-button>
                        <el-button v-if="scope.row.editable" type="text" size="mini" style="color:#f00" @click="handleDeleteDetail(scope.$index, scope.row)">删除</el-button>
                      </div>
                    </template>
              </el-table-column>
                  <el-table-column label="阅读状态" width="90" >
                      <template slot-scope="scope">
                         <div slot="reference">
                           <span title="点击设为已阅" class="tasklog-ydzt tasklog-ydzt-wy" v-if="scope.row.ydzt == 0" @click="handleReadlog(scope.$index, scope.row)" >{{scope.row.ydzt_display}}</span>
                           <span :class="{'tasklog-ydzt':true,'tasklog-ydzt-yy':scope.row.ydzt==1}" v-if="scope.row.ydzt!=0">{{scope.row.ydzt ==1?'已阅':scope.row.ydzt_display}}</span>
                         </div>
                      </template>
                  </el-table-column>
                  <el-table-column prop="cjrxm"  label="填写人" width="80"  ></el-table-column>
                  <el-table-column prop="xmbh" label="项目编号"  show-overflow-tooltip  sortable  width="110"></el-table-column>
                  <el-table-column prop="xmmc" label="项目名称"  show-overflow-tooltip  width="260"></el-table-column>
                  <el-table-column prop="gcms" label="内容" show-overflow-tooltip width="500"></el-table-column>
                  <el-table-column prop="cpmc_display" label="产品名称"  show-overflow-tooltip width="180"></el-table-column>
                  <el-table-column prop="rwmc_display" label="任务名称"  show-overflow-tooltip width="150"></el-table-column>
                  <el-table-column prop="gcrq" label="日报日期" width="110" sortable></el-table-column>
                  <el-table-column prop="cjsj" label="填写时间" width="160" sortable></el-table-column>
                  <el-table-column prop="gs"  label="工时(小时)" width="90" ></el-table-column>
                  <el-table-column  label="附件">
                      <template slot-scope="scope">
                         <div slot="reference" class="name-wrapper">
                           <div @click="handleDownFile(scope.$index, scope.row,$event)">
                             <span title="点击下载" v-for="(fj,index) in scope.row.fjData" :key="index" :data-fj="fj.fjbh">{{fj.fjmc}}</span>
                           </div>
                        </div>
                      </template>
                  </el-table-column>
              </el-table>
         </div>  
        <el-dialog :visible.sync="tasklogDetailVisible" title="日志详情" width="650px" :close-on-click-modal="false">
             <div class="tasklog-detail">
                <p><span>日志日期 :</span><span>{{taskDetail.gcrq}}</span></p> 
                <p><span>项目名称 :</span><span>{{taskDetail.xmmc == ''?'无':taskDetail.xmmc}}</span></p> 
                <p><span>产品名称 :</span><span>{{taskDetail.cpmc_display == ''?'无':taskDetail.cpmc_display}}</span></p> 
                <p><span>关联任务 :</span><span>{{taskDetail.rwmc_display == ''?'无':taskDetail.rwmc_display}}</span></p>    
                <p><span>工时(小时) :</span><span>{{taskDetail.gs}}</span></p> 
                <p><span>日志内容 :</span><span>{{taskDetail.gcms}}</span></p> 
                <p><span>附件列表 :</span><span  class="name-wrapper">
                  <span v-for="(fj,index) in taskDetail.fjData" :key="index" :data-fj="fj.fjbh" @click="handleDownFile('','',$event)">{{fj.fjmc}}</span></span>
                </p> 
                 <p  style="border:none" v-if="taskDetail.ydzt == 2||isJzuser == 0"> 
                  <el-table
                  :data="pzList"
                  border
                  max-height="300"
                  style="width:100%">
                  <el-table-column  prop="yhxm" label="姓名" width="80"></el-table-column>
                  <el-table-column  prop="ydsj" label="阅读日期" width="155"></el-table-column>
                  <el-table-column  prop="bz" label="批注" show-overflow-tooltip></el-table-column>
                  </el-table>
                </p>
                <p flex style="border:none" v-if="taskDetail.ydzt != 2"> 
                  <span>批注:</span>
                  <el-input type="textarea" :rows="5" placeholder="请输入批注内容" v-model="pzValue" resize="none"></el-input>
                </p>
                <div style="text-align:right">
                  <el-button size="mini" type="primary" v-if="taskDetail.ydzt != 2" @click="handleSaveDetail">更新批注</el-button>
                  <el-button size="mini" type="info" @click="handleCloseDetail">取消</el-button>
                </div>
             </div>
        </el-dialog>
  </div>
</template>
<script>
import { readLog,getLogComment,commentLog,deleteTaskProcess,getLogComments} from '@/api/TaskProcess.js'
import { queryTdcy,queryVisiblePerson } from '@/api/personal.js'
import { getPersonalWorkLog} from '@/api/report.js'
import {GetDateStr} from '@/utils/util.js'



export default {
  data(){
      return {
          startDate:GetDateStr(-7),
          endDate:GetDateStr(0),
          tableData: [],
          tasklogDetailVisible:false,
          value: '',
          ydztValue:'',
          fwValue:'',
          baseUrl:"",
          isRead:"",
          taskDetail:{},
          pzValue:"",
          logDetail:{},
          isedit:true,
          pzList:[],
          isJzuser:"",
          data:{}
      }
  },
  mounted(){
        document.title = '个人日报明细'     
        this.isJzuser = sessionStorage.getItem('isJZuser')
        this.baseUrl = window.baseurl
        this.data = this.$route.query
        this.getPersonalWorkLog();
  },
  methods:{
     handleReadlog(index,row){ // 阅读日志
      if(row.ydzt == 0){
         readLog({
          wid:row.wid
          }).then(({data})=>{
            if(data.state == 'success'){
               row.ydzt = 1
            }else{
              this.$alert(data.msg, '提示', {
              confirmButtonText: '确定',
              type:'error',
             });
          }
        })
       }
    },
    handleCloseDetail(){
       this.tasklogDetailVisible = false
    },
    handleSaveDetail(){         // 保存批注
          commentLog({
            wid:this.taskDetail.wid,
            bz:this.pzValue
          }).then(({data})=>{
             if(data.state == 'success'){
                this.tasklogDetailVisible = false
                this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                type:'success'
               });
             }
          })  
    },

    handleTasklogDetail(index,row){    // 查看日志详情
       this.tasklogDetailVisible = true
       this.taskDetail = row
       if(row.ydzt == 0){
         readLog({
          wid:row.wid
          }).then(({data})=>{
            if(data.state == 'success'){
               row.ydzt = 1
            }
        })
       }
       if(row.ydzt == 2 || this.isJzuser == 0){
        this.getLogComments(this.taskDetail.wid);
       }
       this.getLogComment(this.taskDetail.wid);
    },

    //  下载附件
    handleDownFile(index,row,e){
       let fjbh = e.target.getAttribute('data-fj');
       window.open(window.baseurl + 'attachment/downloadFile.do?fjId='+fjbh);   
   },
  //  删除日志
    handleDeleteDetail(index,row){
       this.$confirm('是否删除该条日志?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTaskProcess({
            wid:row.wid
          }).then(({data})=>{
              if(data.state == 'success'){
                this.$alert('删除成功', '提示', {
                      confirmButtonText: '确定',
                      type:'success'
                });
              }
          })
        }).catch(() => {});
    },

  //  获取批注
    getLogComment(wid){
      getLogComment({
        wid:wid,
      }).then(({data})=>{
        if(data.state == 'success'){
          this.pzValue = data.data
        }
      })
    },  
    // 获取所有批注
    getLogComments(wid){
      getLogComments({
        wid:wid
      }).then(({data})=>{
         if(data.state == 'success'){
           if(data.data!=null && data.data.length!=0){
              this.pzList = data.data
           }else{
              this.pzList = [] 
           }
        }
      })
    },
    
   getPersonalWorkLog(){ // 获取个人日报 (任务过程)
      getPersonalWorkLog({
        yhbh:this.data.yhbh,
        rq:this.data.rq
      }).then(({data})=>{
        if(data.state == 'success'){
          if( data.data != null){
             this.tableData = data.data
          }else{
             this.tableData = []
          }
        }
      })
   },
  },
  activated(){

  },
  components:{}
}
</script>
<style scoped>
.task-log{
 width: 90%;
 margin: 0 auto 0;
 padding: 10px;
 background: #fff;
 box-shadow: 0 0 3px #999;
}

.name-wrapper span:hover{
  cursor: pointer;
  text-decoration: underline;
}
.name-wrapper span{
  color: #409EFF !important;
  margin-right:15px;
}
.name-wrapper span:hover{
  cursor: pointer;
}
.tasklog-detail{
  padding: 10px;
}
.tasklog-detail p{
  margin: 10px 0 !important;
  border-bottom: 1px dashed #ccc;
}
.tasklog-detail p>span:nth-child(1){
  display: inline-block;
  width:80px;
  font-weight: 700;
  text-align:right;
  margin-right:10px;
}

</style>
