<template>
  <div style="width:90%;margin:0 auto;padding:20px 0;">
   <el-form   ref="formData" label-width="80px" class="demo-formData" :inline="true">
    <el-form-item label="日志日期" required>
      <el-form-item >
        <el-date-picker type="date"  value-format="yyyy-MM-dd" placeholder="选择日期" v-model="date" style="width:172px;"></el-date-picker>
      </el-form-item>
  </el-form-item>

  <el-form-item label="工时" required>
    <el-input v-model="gs" style="width:172px;"></el-input>
  </el-form-item>

  <el-form-item label="日志内容" required>
    <el-input type="textarea" v-model="desc" :rows="12" style="width:450px"></el-input>
  </el-form-item>

  <el-form-item  label="上传附件">
    <el-upload
        class="upload-demo"
        ref="upload"
        multiple
        :action="uploadAction"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="fileList"
        :show-file-list="true"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    </el-upload>
   </el-form-item>
    <div flex>
     <p style="min-width:80px;text-align:right;font-weight:700;padding-right:12px;white-space:nowrap">
       <!-- <span class="el-icon-question" title="注 : 项目任务必须关联任务，非项目任务无须关联任务"></span> 关联任务 -->
       <span class="before-require">关联任务</span>
     </p>
     <p >
        <span class="el-icon-circle-plus" style="font-size:18px;" title="添加任务" @click="addDailyTasks" v-if="addBtnShow"></span>
        <span style="color:#999">{{taskname}}</span>    
     </p>
   </div>

  <div style="text-align:right">
    <el-button type="primary" size="small" :disabled="disabled == 1" @click="submitForm('formData')">保存</el-button>
    <el-button size="small" @click="resetForm('formData')">重置</el-button>
  </div>
  </el-form>
  </div>
</template>
<script>
import {addTaskProcess,uploadAttach} from '@/api/TaskProcess.js'
import dialogTask from '@/components/BusinessPage/dialogTask.vue'
import axios from 'axios'
import Qs from 'qs'

export default {
  data() {
      return {
          dialogTaskVisible:false,
          fileList: [],
          gs: '',
          date:'',
          desc: '',
          fileData:[],
          uploadAction:'https://jsonplaceholder.typicode.com/posts/',
          filesData:[],
          filesArr:[],
          taskname:this.taskName,
          glxmbh:'',
          glrwbh:''
      };
    },
    props:{
       taskName:{
         type:String,
         default:""
       },
       addBtnShow:{
         type:Boolean,
         default:false
       },
       taskCheck:{
         type:Boolean,
         default:false
       },
       xmbh:{
         type:String,
         default:""
       },
       closeDialogNum:{
          type:Number,
          default:1
       },
       logInfo:{
         type:Object,
         default:function(){
           return {}
         }
       },
       sign:{
          type:Number,
          default:1
       },
       disabled:{
          type:Number,
          default:0
       }
    },
    mounted(){
      window.onerror = function(){return true;}
      this.date = this.logInfo.gcrq
      this.gs = this.logInfo.gs
      this.desc = this.logInfo.gcms
      this.taskname =  this.logInfo.xmmc==undefined?'':this.logInfo.xmmc==''?'':this.logInfo.xmmc+'——'+this.logInfo.cpmc+'——'+this.logInfo.rwmc
   },
    computed:{
      taskLogInfo(){
        return this.sign
      }
    },
    methods: {
      submitForm(formName) {

       if(!this.date){
          this.$alert('请选择日期', '提示', {confirmButtonText:'确定',type:'error',
            callback:cancel=>{}
          });
          return false;
       }else if(!/^\d+(\.\d+)?$/.test(this.gs)){
          this.$alert('请输入正确工时', '提示', {confirmButtonText:'确定',type:'error',
           callback:cancel=>{}
           });
          return false;
       }else if(!this.desc){
          this.$alert('请输入日志内容', '提示', {confirmButtonText:'确定',type:'error',
           callback:cancel=>{}
          });
          return false;
       }else if(!this.taskname){
          this.$alert('请选择关联任务', '提示', {confirmButtonText:'确定',type:'error',
           callback:cancel=>{}
          });
          return false;
       }

       let obj = {
          gcms:this.desc,
          gcrq:this.date,
          gs:this.gs,
          fjdata:this.fileData,
          wid:this.logInfo.wid,
          rwbh:this.logInfo.rwbh,
          xmbh:this.logInfo.xmbh
        }
        this.$emit('handleSubmit',obj);

      },
      resetForm(formName) {
        this.gs = "";
        this.date = "";
        this.desc = "";
        this.fileList = [];
        this.fileData = [];
        this.filesData = []
        this.$emit('resetForm',"")
      },
      // 删除文件
      handleRemove(file, fileList) {
          this.fileData.forEach((ele,i,arr)=>{
            if(ele.includes(file.name)) this.fileData.splice(i,1);
          })
      },

      beforeUpload(file){
        if(this.filesArr.length > 0){
          if(this.filesArr[0].name == file.name)  return;
        }
        this.filesArr.push(file)

        let fd = new FormData();
        fd.append('fileUpload',file);
        fd.append('xmbh',this.xmbh)


        axios.post(window.baseurl+'attachment/uploadAttach.do',fd,{
          headers:{'Content-Type':'multipart/form-data'} 
        }).then((res)=>{
           this.fileData.push(res.data.data)
        })
            
         return true
      },
      handleChange(file, fileList){
        let r = []; 
         this.filesData.push(file);
          for(var i = 0, l = this.filesData.length; i < l; i++) { 
          for(var j = i + 1; j < l; j++) 
            if (this.filesData[i].name === this.filesData[j].name) j = ++i; 
          r.push(this.filesData[i]); 
        } 
        this.fileList =  r
        this.$refs.upload.submit();
      },
      addDailyTasks(){       //添加日报关联任务
         this.$emit('addDailyTasks','')
        // this.dialogTaskVisible = true;
      },
      // 选择关联任务
      // chooseRevelenceTask(data){
      //   this.taskname  = data.rwmc
      //   this.glxmbh = data.xmbh;
      //   this.rwbh = data.rwbh;
      //   this.dialogTaskVisible = !this.dialogTaskVisible
      // }, 
    },
    watch:{
      closeDialogNum(n,o){
        this.gs = "";
        this.date = "";
        this.desc = "";
        this.fileList = [];
        this.fileData = [];
        this.filesData = [];
        this.taskname = ''
      },
      taskLogInfo(n,o){
          if(n > o){
            this.date = this.logInfo.gcrq
            this.gs = this.logInfo.gs
            this.desc = this.logInfo.gcms
            this.taskname = this.logInfo.xmmc==''?'':this.logInfo.xmmc+'—'+this.logInfo.cpmc+'—'+this.logInfo.rwmc
          }
      },
      taskName(){
        this.taskname = this.taskName
      }
    },
    components:{dialogTask}
}
</script>
<style scoped>
.el-icon-circle-plus:hover{
  cursor: pointer;
}
.el-form-item{
  margin-bottom:10px;
}
.el-icon-question{
  color: #f00;
}
</style>
