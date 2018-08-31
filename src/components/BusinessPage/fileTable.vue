<template>
   <div style="width:80%;margin:10px auto 0;padding:20px 10px;background:#fff;border-radius:5px;box-shadow:0 0 5px #ccc;">
      <ul class="file-list">
        <div style="padding-bottom:10px;border-bottom:1px solid #ccc">
              <span class="file-breadcrumb" @click="handleAllfile">全部目录</span>
              <span v-for="(file,index) in fileBread" class="file-breadcrumb" :data-fjbh="file.fjbh" @click="handleBreadFile">
                <span class="el-icon-arrow-right"></span><span>{{file.fjmc}}</span>
              </span>
            <div class="upload-files">
              <el-button size="mini"  @click="handlechangeSVN">修改svn地址</el-button>
              <el-button size="mini"  @click="handlecheckout" v-if="fileList.length == 0 || fileList == null">检出</el-button>
              <el-button size="mini"  @click="handleUpdateFile" v-if="fileList.length != 0 && fileList != null">更新</el-button>

              <el-upload
                  class="upload-demo"
                  ref="upload"
                  multiple
                  :action="uploadAction"
                  :before-upload="beforeUpload"
                  :on-remove="handleRemove"
                  :on-change="handleChange"
                  :file-list="fileListArr"
                  :show-file-list="false"
                  :auto-upload="false">
                  <el-button slot="trigger" size="mini" style="border: none" icon="el-icon-circle-plus">上传</el-button>
              </el-upload>
            </div>
         </div>
         <div class="file-header">
           <p class="file-name">文件名</p>
           <p class="file-size">文件大小</p>
           <p class="file-cjsj" style="padding-right:30px">修改时间</p>
         </div>
         <li :data-fjbh="fileList.parentwid" data-type="back" @click="handleFile" class="file-back" v-if="fileList.parentwid != '-1' && JSON.stringify(fileList)!='{}'">
            <div style="padding:10px 20px">
              <span><img src="static/img/back.png" alt="" style="float:left;"><span style="float:left;margin-top:10px;">上一级</span></span>
            </div>
         </li>  
         <li v-for="(file,index) in fileList.files" style="padding:0 20px;display:flex" :data-fj="file.fjmc+'&'+file.sfwjml" :data-fjbh="file.fjbh" @click="handleFile">
           <div style="width:40%;padding:6px 0">
             <div v-if="file.sfwjml == 1">
                <span><img style="float:left" src="static/img/files.png" alt=""><span style="float:left;margin-top:10px">{{file.fjmc}}</span></span> 
             </div>
             <div v-if="file.sfwjml == 0" >
               <a :href="baseUrl+'attachment/downloadXmFile.do?xmbh='+xmbh+'&path='+file.fjbh" target="blank">
                 <span class="el-icon-document" style="font-size:32px;margin: 0 10px 0 0;"></span><span style="margin-top:10px">{{file.fjmc}}</span>
               </a>
             </div>
            </div>
            <div class="file-size" style="line-height:44px">
              {{file.fjdx_display}}
            </div>
            <div class="file-cjsj" style="line-height:44px">
              {{file.xgsj == null?'--':file.xgsj}}
            </div>
         </li>
      </ul>

      <el-dialog
        title="修改svn地址"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="500px" >
         <div style="padding:20px 10px ">
           <p style="font-size:18px">svn地址:</p>
           <el-input v-model="SVNValue" placeholder="请输入SVN地址"></el-input>
           <p style="text-align:right;padding:10px 0">
             <el-button type="primary" size="small" @click="handleCommitSVN">提交</el-button>
           </p>
         </div>

      </el-dialog>
  </div>
</template>


<script>
import { getTemplateFolder ,openFolder,openRealFolder,checkout,downloadXmFile ,updateSvn } from '@/api/TaskProcess.js'
import { updateSvnUrl,getXmFileUrl } from '@/api/xmfz.js'
import axios from 'axios'
import Qs from 'qs'
  export default {
    data() {
      return {
        fileList:{},
        fileBread:[],
        fjbh:"",
        fjobj:{},
        uploadAction:'',
        fileListArr:[],
        fileData:[],
        filesData:[],
        filesArr:[],
        dialogVisible:false,
        SVNValue:"",
        baseUrl:null,

      }
    },
    props:{
      xmbh:{
        type:String,
        default:''
      }
    },
    mounted(){
      this.openRealFolder();
      this.baseUrl = window.baseurl 
      getXmFileUrl({
        xmbh:this.xmbh
      }).then(({data})=>{
        if(data.state == 'success'){
          this.SVNValue = data.data.svn
        }
      })
       window.onerror = function(){return true;}
    },

    methods:{
      handleUpdateFile(){    // 更新 SVN
        updateSvn({
          xmbh:this.xmbh
        }).then(({data})=>{
             if(data.state == 'success'){
              this.$alert('更新成功', '提示', {
                 confirmButtonText: '确定',
                 type:'success',
                 callback: action => {
                   this.openRealFolder();
                 }
              })
           }else{
             this.$alert(data.msg, '提示', {
                 confirmButtonText: '确定',
                 type:'error',
              })
            }    
        })
      },

      handleCommitSVN(){  // svn提交(修改)
          updateSvnUrl({
            xmbh:this.xmbh,
            svn:this.SVNValue
          }).then(({data})=>{
              if(data.state == 'success'){
                 this.$alert('修改成功！', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {

                      this.dialogVisible = false 
                    }
                 })
              }else{
                  this.$alert(data.msg, '提示', {
                    confirmButtonText: '确定',
                    type:'warning'
                  })
              }
          })
      },
      handlechangeSVN(){ 
          this.dialogVisible = !this.dialogVisible
      },
      handlecheckout(){  //检出文件
        checkout({
          xmbh:this.xmbh
        }).then(({data})=>{
           if(data.state == 'success'){
              this.$alert('检出成功', '提示', {
                 confirmButtonText: '确定',
                 type:'success',
                 callback: action => {
                    this.openRealFolder();
                 }
              })
           }else{
             this.$alert(data.msg, '提示', {
                 confirmButtonText: '确定',
                 type:'error',
                 callback: action => {
                                    
                 }
              })
           }
        })
      },
      // 查看全部目录
      handleAllfile(){
        this.openRealFolder();
        this.fileBread = [];
      },

      // 面包屑导航
      handleBreadFile(e){
          let fjbh = e.currentTarget.getAttribute('data-fjbh');
          if(fjbh == this.fjbh) return;
          openRealFolder({
            path:fjbh,
            xmbh:this.xmbh
          }).then(({data})=>{
            if(data.state == 'success'){
              this.fileList = data.data
                this.fileBread.forEach((ele,i,arr)=>{
                if(ele.fjbh.includes(fjbh)){
                  this.fileBread.splice(i+1,9999)
                }
              }) 
            }
          })
      },
      
      handleFile(e){
        let type = e.currentTarget.getAttribute('data-type');
        let fjbh = e.currentTarget.getAttribute('data-fjbh');
        let fj = e.currentTarget.getAttribute('data-fj');
        if(fj != null && fj.split('&')[1] == 0) return;
        if(type == null){
            this.fjbh = fjbh
            this.fjobj = {
                  fjmc:fj.split('&')[0],
                  fjbh:fjbh
            }
        }
        openRealFolder({
          path:fjbh,
          xmbh:this.xmbh
        }).then(({data})=>{
           if(data.state == 'success'){
             this.fileList = data.data
                if(type == 'back'){
                  this.fileBread.pop();
                }else{
                  if(fj.split('&')[1] == 1){
                    this.fileBread.push(this.fjobj);
                  }
              }
           }
        })
      },

      // 获取文件夹
      openRealFolder(fjbh){
        openRealFolder({
          path:fjbh,
          xmbh:this.xmbh
        }).then(({data})=>{
           if(data.state == 'success'){
             this.fileList = data.data
           }else{
                 checkout({
                   xmbh:this.xmbh
                }).then(({data})=>{
                  if(data.state == 'success'){
                  this.$alert('检出成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                      openRealFolder({
                      path:'',
                      xmbh:this.xmbh
                      }).then(({data})=>{
                        if(data.state == 'success'){
                          this.fileList = data.data
                        }
                      })
                    }
                  })
                  }else{
                     this.$alert(data.msg, '提示', {
                         confirmButtonText: '确定',
                         type:'error',  
                         callback: action => {}
                     })
                  }
                })   
           }
        })
      },
      
      //上传附件
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
        fd.append('path',this.fjbh)


        axios.post(window.baseurl+'attachment/uploadXmFile.do',fd,{
          headers:{'Content-Type':'multipart/form-data'} 
        }).then((res)=>{
            this.$alert('上传成功', '提示', {
            confirmButtonText: '确定',
            type:'success',
            callback: action => {
                openRealFolder({
                      path:this.fjbh,
                      xmbh:this.xmbh
                  }).then(({data})=>{
                      if(data.state == 'success'){
                        this.fileList = data.data
                      }
                })
            }
          });
        })
         return false
      },
      handleChange(file, fileList){
        // let r = []; 
        //  this.filesData.push(file);
        //   for(var i = 0, l = this.filesData.length; i < l; i++) { 
        //   for(var j = i + 1; j < l; j++) 
        //     if (this.filesData[i].name === this.filesData[j].name) j = ++i; 
        //   r.push(this.filesData[i]); 
        // } 
        // this.fileListArr =  r
        this.$refs.upload.submit();
      },
    }
  }
</script>


<style scoped>

  .file-list li>div:after{
    content:"";
    display: block;
    clear: both;
  }
  
  .file-list li{
    border-bottom: 1px solid #ccc;
    font-size:13px;
  }
   .file-list li img{
     margin: 0 10px 0 0;
   }
  .file-list li:hover{
    cursor: pointer;
    background: rgb(245, 248, 248);
  }
  .file-breadcrumb{
    font-weight: 700;
    font-size: 14px;
  }
  .file-breadcrumb:not(:last-of-type):hover{
    cursor: pointer;
    color: #409EFF;
  }
  .file-breadcrumb:last-of-type{
    font-weight: 500;
    color: #606266;
  }
  .file-header:after{
    content:"";
    display: block;
    clear: both;
  }
  .file-header{
    padding: 10px 20px;
    color: #888;
    border-bottom:1px solid #ccc;
  }
  .file-header .file-name{
    width: 40%;
  }
  .file-size{
    width: 20%;
    text-align: center;
  }
   .file-cjsj{
     width: 40%;
     text-align: right;
  }
  .file-header>p{
    float: left;
  }

  .upload-files{
      float:right;
      font-size:13px;
      display:flex;
  }
  .upload-files .el-icon-circle-plus{
    color: #409EFF;
  }
  .upload-files:hover{
    cursor: pointer;
    color: #409EFF;
  }
</style>