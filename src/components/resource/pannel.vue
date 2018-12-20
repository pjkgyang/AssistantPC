<template>
  <div style="width:80%;margin:10px auto 0;padding:20px 10px;background:#fff;border-radius:5px;box-shadow:0 0 5px #ccc;">
    <section text-right>
      <!-- <el-button v-if="userTag.includes('NLPXZJ')" size="small" @click="handleUpload">上传文件</el-button> -->
      <el-button :type="catalogue == 'file'?'primary':''" size="small" @click="catalogue = 'file'">文件目录</el-button>
      <el-button :type="catalogue == 'record'?'primary':''" size="small" @click="catalogue = 'record'">操作记录</el-button>
    </section>
    <el-collapse-transition>
      <section v-if="catalogue == 'file'">
        <ul class="file-list">
          <div style="padding-bottom:10px;border-bottom:1px solid #ccc">
            <span class="file-breadcrumb" @click="handleAllfile">全部目录</span>
            <span v-for="(file,index) in fileBread" class="file-breadcrumb" :data-fjbh="file.fjbh" @click="handleBreadFile">
              <span class="el-icon-arrow-right"></span>
              <span>{{file.fjmc}}</span>
            </span>
          </div>
          <div class="file-header" flex>
            <p class="file-name">文件名</p>
            <p class="file-size">文件大小</p>
            <p class="file-cjsj" style="padding-right:30px">修改时间</p>
            <p class="file-evaluate"></p>
          </div>
          <li :data-fjbh="fileList.parentwid" data-type="back" @click="handleFile($event,fileList.wid)" class="file-back" v-if="fileList.parentwid != '-1' && JSON.stringify(fileList)!='{}'">
            <div style="padding:10px 20px">
              <span><img src="static/img/back.png" alt="" style="float:left;">
                <span style="float:left;margin-top:10px;">上一级</span>
              </span>
            </div>
          </li>
          <li v-for="(file,index) in fileList.files" style="padding:0 20px;display:flex" :data-fj="file.fjmc+'&'+file.sfwjml" :data-fjbh="file.fjbh"
           @click="handleFile" @mouseover="fileIndex = index">
            <div style="width:40%;padding:6px 0">
              <div v-if="file.sfwjml == 1">
                <span><img style="float:left" src="static/img/files.png" alt="">
                  <span style="float:left;margin-top:10px">{{file.fjmc}}</span>
                </span>
              </div>
              <div v-if="file.sfwjml == 0">
                <a :href="baseUrl+'attachment/downloadTemplateFile.do?path='+file.fjbh+'&lx='+resourceType" target="blank">
                  <span class="el-icon-document" style="font-size:32px;margin: 0 10px 0 0;"></span>
                  <span style="margin-top:10px">{{file.fjmc}}</span>
                </a>
              </div>
            </div>
            <div class="file-size" style="line-height:44px">
              {{file.fjdx_display}}
            </div>
            <div class="file-cjsj" style="line-height:44px">
              {{file.xgsj == null?'--':file.xgsj}}
            </div>
            <div class="file-evaluate">
              <div flex colcenter v-if="fileIndex == index && file.sfwjml == '0'">
                <span @click="handlePraise($event,'1',file.fjbh)"><span class="appraise-hp"></span> ({{file.good}})</span>&nbsp;
                <span @click="handlePraise($event,'0',file.fjbh)"><span class="appraise-cp"></span> ({{file.bad}})</span>&#x3000;
                <a href="javaScript:;;" @click="handlePraise($event,'2',file.fjbh)">查看记录</a>&#x3000;
                <!-- <a v-if="userTag.includes('NLPXZJ')" href="javaScript:;;" style="color:#f00" @click="handleDelete(file.fjbh)">删除</a> -->
              </div>
            </div>
          </li>
        </ul>
        <div v-if="JSON.stringify(fileList) === '{}'" class="emptyContent">
          <img src="static/img/kong.png" alt="">
          <p>暂无数据</p>
        </div>
      </section>
    </el-collapse-transition>
    <el-collapse-transition>
      <section v-if="catalogue == 'record'">
        <oprateRecord :jdList="jdList" :fileCounts="fileCounts" @hadnleChangeTab="hadnleChangeTab" @hadnleChange="hadnleChange" :currentPage="currentPage"
        :pageSize="pageSize" :total="total" @handleCommit="handleCommit"></oprateRecord>
      </section>
    </el-collapse-transition>
    <pjsmDialog :show.sync="pjsmShow" @handleClickSure="handleClickSure" :title="dialogTitle"></pjsmDialog>
    <uploadDialog :show.sync="uploadShow" :lx="resourceType" :filePath="logsFjpath" @handleCommit="handleCommitUpload"></uploadDialog>
  </div>
</template>


<script>
import pjsmDialog from "@/components/dialog/resource/pjsm-dialog";
import oprateRecord from "@/components/resource/record.vue";
import uploadDialog from '@/components/dialog/resource/upload-dialog';
export default {
  data() {
    return {
      pjsmShow: false,
      uploadShow:false, // 上传显示
      fileList: {},
      fileBread: [],
      fjbh: "",
      fjobj: {},
      baseUrl: null,
      catalogue: "file",
      fileIndex: "",
      appraiseType: "", //评价类型
      fjPath:'',
      currentPage:1,
      pageSize:15,
      total:0,
      jdList:[],
      logTabName:'',
      logsFjpath:'',
      oldFjpath:'',//记录根目录路径
      fileCounts:{},
      dialogTitle:'',
      
      userTag:""
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    resourceType: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.baseUrl = window.baseurl;
    this.openFolder();
    this.userTag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag

  },
  methods: {
    // 上传成功
    handleCommitUpload(){
       this.openFolder(this.logsFjpath); 
    } ,
    // 上传附件 
    handleUpload(){
      this.uploadShow =  !this.uploadShow
    },
    handleCommit(){
      if(this.catalogue == 'file'){
        this.openFolder(); 
      }else{
        this.getLogs();
      }
    },
    // 分页切换
    hadnleChange(data, type) {
      if(type == 'size'){
        this.currentPage = 1;
        this.pageSize = data;
      }else{
        this.currentPage = data;
      }
      this.getLogs();
    },
    // 切换tab
    hadnleChangeTab(data) {
      if(data == 9){
        this.logTabName = '';
      }else{
        this.logTabName = data;
      }
      this.currentPage = 1;
      this.getLogs();
    },
    // 评价提交
    handleClickSure(data) {
      this.$post(this.appraiseType == 1 ? this.API.good : this.API.bad, {
        path: this.fjPath,
        lx: this.resourceType,
        sm: data
      }).then(res => {
        if (res.state == "success") {
          this.pjsmShow = !this.pjsmShow;
          this.$alert("评价成功", "提示", {
            confirmButtonText: "确定",
            type:'success',
            callback: action => {}
          });
        }else{
          this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
        }
      });
    },
    // 评价
    handlePraise(e, param,data) {
      e.stopPropagation();
      this.appraiseType = param;
      this.fjPath = data;
      if(param == 2){
        this.logsFjpath = data;
        this.catalogue = 'record';
        return;
      }
      if(param == 1){
        this.dialogTitle = '点赞说明'
      }else if(param == 0){
        this.dialogTitle = '优化建议'  
      }
      this.pjsmShow = !this.pjsmShow;
    },
    // 删除文件
    handleDelete(data){
      console.log(data);
    },
    // 打开文件
    openFolder(path) {
      this.$get(this.API.openTemplateFolder, {
        path:path||"",
        lx: this.resourceType
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.fileList = {};
          } else {
            this.fileList = res.data;
          }
        }
      });
    },
    // 查看全部目录
    handleAllfile() {
      this.openFolder();
      this.fileBread = [];
      this.logsFjpath = '';
    },

    // 面包屑导航
    handleBreadFile(e) {
      let fjbh = e.currentTarget.getAttribute("data-fjbh");
      if (fjbh == this.fjbh) return;
      this.$get(this.API.openTemplateFolder, {
        path: fjbh,
        lx: this.resourceType
      }).then(res => {
        if (res.state == "success") {
          this.fileList = res.data;
          this.fileBread.forEach((ele, i, arr) => {
            if (ele.fjbh.includes(fjbh)) {
              this.fileBread.splice(i + 1, 9999);
            }
          });
        }
      });
    },
    // 查看文件
    handleFile(e,wid) {
      let type = e.currentTarget.getAttribute("data-type");
      let fjbh = e.currentTarget.getAttribute("data-fjbh");
      let fj = e.currentTarget.getAttribute("data-fj");
      // 获取记录需要的附件路径
      this.logsFjpath = fjbh;
      if (fj != null && fj.split("&")[1] == 0) return;
      if (type == null) {
        this.fjbh = fjbh;
        this.fjobj = {
          fjmc: fj.split("&")[0],
          fjbh: fjbh
        };
      }

      this.$get(this.API.openTemplateFolder, {
        path: fjbh,
        lx: this.resourceType
      }).then(res => {
        if (res.state == "success") {
           this.fileList = res.data;
           this.oldFjpath = this.fileList.wid;
          if (type == "back") {
            this.fileBread.pop();
          } else {
            if (fj.split("&")[1] == 1) {
              this.fileBread.push(this.fjobj);
            }
          }
        }
      });
    },




    //  获取记录
    getLogs(){
        this.$get(this.API.logs,{
          curPage:this.currentPage,
          pageSize:this.pageSize,
          path:this.logsFjpath,
          lx:this.resourceType,
          czlx:this.logTabName
        }).then(res=>{
          if(res.state == 'success'){
            if(!res.data.rows){
              this.jdList = []
            }else{
              this.jdList = res.data.rows
            }
            this.total = res.data.records
          }else{
            this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
          }
      })
    },
    // 获取记录数
    getCount(){
      this.$get(this.API.getCount,{
        path:this.logsFjpath,
        lx:this.resourceType
      }).then(res=>{
        if(res.state == 'success'){
          this.fileCounts = res.data
        }else{
           this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'}); 
        }
      })
    }
  },
  watch:{
    catalogue(n,o){
      if(n == 'record'){
        this.logTabName = '';
        this.getLogs();
        this.getCount();
      }else{
        this.logsFjpath = this.oldFjpath;

      }
    }
  },
  components: { pjsmDialog, oprateRecord,uploadDialog }
};
</script>


<style lang="scss" scoped>
.file-list {
  li {
    border-bottom: 1px solid #ccc;
    font-size: 13px;
    > div:after {
      content: "";
      display: block;
      clear: both;
    }
    img {
      margin: 0 10px 0 0;
    }
    &:hover {
      cursor: pointer;
      background: rgba(174, 192, 194, 0.2);
    }
  }
}
.file-breadcrumb {
  font-weight: 700;
  font-size: 14px;
}
.file-breadcrumb:not(:last-of-type):hover {
  cursor: pointer;
  color: #409eff;
}
.file-breadcrumb:last-of-type {
  font-weight: 500;
  color: #606266;
}
.file-header {
  padding: 10px 20px;
  color: #888;
  border-bottom: 1px solid #ccc;
  > p {
    float: left;
  }

  &:after {
    content: "";
    display: block;
    clear: both;
  }
}
.file-name {
  width: 40%;
}
.file-size {
  width: 15%;
  text-align: center;
}
.file-cjsj {
  width: 25%;
  text-align: right;
}
.file-evaluate {
  width: 20%;
  text-align: right;
  justify-content: flex-end;
  div {
    height: 100%;
    justify-content: flex-end;
  }
  .appraise-hp{
    display:inline-block;
    margin-bottom: -3px;
    width:16px;
    height:16px;
    background:url('../../../static/img/appraiseImg.png');
    background-position:0 -16px;
  }
  .appraise-hp:hover{
    background-position:0 -48px;
  }
  .appraise-cp{
    display:inline-block;
    margin-bottom: -3px;
    width:16px;
    height:16px;
    background:url('../../../static/img/appraiseImg.png');
  }
  .appraise-cp:hover{
    background-position:0 -32px;
  }
}
</style>