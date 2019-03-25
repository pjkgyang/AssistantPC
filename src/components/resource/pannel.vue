<template>
  <div class="zczx-pannel">
    <section text-right>
      <!-- v-if="userTag.includes('NLPXZJ')" -->
      <el-input style="width:300px;" v-model="seachVal" placeholder="请搜索文件名称/目录"  @change="handleSearchFile"></el-input>
      <el-button v-if="userTag.includes('NLPXZJ') && catalogue != 'search'" size="small" @click="handledir">新建文件夹</el-button>
      <el-button v-if="userTag.includes('NLPXZJ') && catalogue != 'search'" size="small" @click="handleUpload">上传文件</el-button>
      <el-button :type="catalogue == 'file'?'primary':''" size="small" @click="catalogue = 'file'">文件目录</el-button>
      <el-button v-if="catalogue != 'search'" :type="catalogue == 'record'?'primary':''" size="small" @click="catalogue = 'record'">操作记录</el-button>
      <el-button :type="catalogue == 'suggest'?'primary':''" size="small" @click="catalogue = 'suggest'">补充建议</el-button>
      <el-button v-if="userTag.includes('NLPXZJ')" size="small" title="用于全文搜索索引" @click="handleSync">刷新文件索引</el-button>
    </section>
    <el-collapse-transition>
      <section v-if="catalogue == 'file'">
        <ul class="file-list">
          <div style="padding-bottom:10px;border-bottom:1px solid #ccc">
            <span class="file-breadcrumb" @click="handleAllfile">全部目录（{{resourceType==1?'模板':resourceType==2?'课件':'新人专区'}}）</span>
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
            <div  style="width:40%;padding:6px 0">
              <div v-if="file.sfwjml == 1" flex>
                  <img style="float:left" src="static/img/files.png" alt="">
                  <span style="float:left;margin-top:10px">{{file.fjmc}}</span>
              </div>
              <div v-if="file.sfwjml == 0">
                <a href="javaScript:;;" @click.stop="handleDownload(file.fjbh,index)" style="display:flex;align-items:center">
                  <span >
                    <img :src="file.fjmc.includes('.txt')?
                    txt:file.fjmc.includes('.pdf')?
                    pdf:file.fjmc.includes('.png')?
                    png:file.fjmc.includes('.jpg')?
                    jpg:file.fjmc.includes('.doc'||'.docx')?
                    word:file.fjmc.includes('.pptx')?
                    pptx:file.fjmc.includes('.wmv')?
                    wmv:file.fjmc.includes('.zip')?zip:FilePng" alt="">
                  </span>
                  <span >{{file.fjmc}}</span>
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
              <div flex colcenter v-if="fileIndex == index">
                <span v-if="file.sfwjml == '0'" @click="handlePraise($event,'1',file.fjbh,index,'list')"><span class="appraise-hp"></span> ({{file.good}})</span>&nbsp;
                <span v-if="file.sfwjml == '0'" @click="handlePraise($event,'0',file.fjbh,index,'list')"><span class="appraise-cp"></span> ({{file.bad}})</span>
                <span v-if="file.sfwjml == '0'" style="display:flex;justify-content:center"><span class="appraise-download"></span> ({{file.download}})</span>&#x3000;
                <a v-if="file.sfwjml == '0'" href="javaScript:;;" @click="handlePraise($event,'2',file.fjbh)">查看记录</a>&#x3000;
                <a v-if="userTag.includes('NLPXZJ')" href="javaScript:;;" style="color:#f00" @click.stop="handleDelete(file.fjbh,index,file.sfwjml)">删除</a>
                <!-- v-if="userTag.includes('NLPXZJ')" -->
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

    <el-collapse-transition>
      <section v-if="catalogue == 'suggest'">
        <suggest :jdList="suggestList" @hadnleChange="handleChangejy" :currentPage="currentPage"
        :pageSize="pageSize" :total="totaljy" @handleSucess="handleSucess" @handleAddyj="handleAddyj"></suggest>
      </section>
    </el-collapse-transition>

    <el-collapse-transition>
      <section v-if="catalogue == 'search'">
        <div>共检索 {{searchTotal}} 条记录&#x3000;耗时 {{elapsedTime}} 毫秒：</div>
        <ul class="file-list">
          <div class="file-header" flex>
            <p class="file-search-name">文件名</p>
            <p class="file-search-size">文件大小</p>
            <p class="file-search-path">目录</p>
            <p class="file-search-cjsj" style="padding-right:30px">修改时间</p>
            <p class="file-search-evaluate"></p>
          </div>

          <li v-for="(file,index) in searchList" style="padding:0 20px;" colcenter  @mouseover="fileIndex = index">
            <div class="file-search-name" style="padding:6px 0">
                <a href="javaScript:;;" @click.stop="handleDownload(file.wid,index,'input')" colcenter>
                  <img :src="file.name.includes('.txt')?
                    txt:file.name.includes('.pdf')?
                    pdf:file.name.includes('.png')?
                    png:file.name.includes('.jpg')?
                    jpg:file.name.includes('.doc'||'.docx')?
                    word:file.name.includes('.pptx')?
                    pptx:file.name.includes('.wmv')?
                    wmv:file.name.includes('.zip||.rar')?zip:FilePng" alt="">
                  <span class="fjmc" v-html="file.name"></span>
                </a>
            </div>
            <div class="file-search-size" >
              {{file.size_display}}
            </div>
            <div class="file-search-path" v-html="file.dir"> </div>
            <div class="file-search-cjsj" style="padding-right:30px">
              {{file.time == null?'-.-':file.time}}
            </div>
            <div class="file-evaluate">
              <div flex colcenter v-if="fileIndex == index">
                <span  @click="handlePraise($event,'1',file.wid,index,'input')"><span class="appraise-hp"></span> ({{file.good}})</span>&nbsp;
                <span  @click="handlePraise($event,'0',file.wid,index,'input')"><span class="appraise-cp"></span> ({{file.bad}})</span>
                <span  style="display:flex;justify-content:center"><span class="appraise-download"></span> ({{file.download}})</span>&#x3000;
                <!-- <a  href="javaScript:;;" @click="handlePraise($event,'2',file.wid)">查看记录</a>&#x3000; -->
                <!-- <a v-if="userTag.includes('NLPXZJ')" href="javaScript:;;" style="color:#f00" @click.stop="handleDelete(file.wid,index,0,'input')">删除</a> -->
                <!-- v-if="userTag.includes('NLPXZJ')" -->
              </div>
            </div>
          </li>
        </ul>
        <div v-if="searchTotal > 10">
            <el-pagination
              background
              @current-change="handleSearchCurrentChange"
              :current-page="searchCurpage"
              layout="prev, pager, next"
              :total="searchTotal">
            </el-pagination>
        </div>
        <div v-if="!searchList.length" class="emptyContent">
          <img src="static/img/kong.png" alt="">
          <p>暂无数据</p>
        </div>
      </section>
    </el-collapse-transition>
   

    <pjsmDialog :show.sync="pjsmShow" @handleClickSure="handleClickSure" :title="dialogTitle"></pjsmDialog>
    <uploadDialog :show.sync="uploadShow" :lx="resourceType" :filePath="oldFjpath" @handleCommit="handleCommitUpload"></uploadDialog>
  </div>
</template>


<script>
import pjsmDialog from "@/components/dialog/resource/pjsm-dialog";
import oprateRecord from "@/components/resource/record.vue";
import uploadDialog from "@/components/dialog/resource/upload-dialog";
import suggest from "@/components/resource/suggest.vue";
import png from "../../../static/img/png.png";
import jpg from "../../../static/img/jpg.png";
import pptx from "../../../static/img/pptx.png";
import pdf from "../../../static/img/pdf.png";
import word from "../../../static/img/word.png";
import wmv from "../../../static/img/wmv.png";
import txt from "../../../static/img/txt.png";
import FilePng from "../../../static/img/FilePng.png";
import zip from "../../../static/img/zip.png";
export default {
  data() {
    return {
      png: png,
      jpg: jpg,
      pptx: pptx,
      pdf: pdf,
      word: word,
      wmv: wmv,
      txt: txt,
      zip: zip,
      FilePng: FilePng,

      pjsmShow: false,
      uploadShow: false, // 上传显示
      fileList: {},
      fileBread: [],
      fjbh: "",
      fjobj: {},
      catalogue: "file",
      fileIndex: null,
      appraiseType: "", //评价类型
      fjPath: "",
      currentPage: 1,
      pageSize: 15,
      total: 0,

      currentPagejy: 1,
      pageSizejy: 15,
      totaljy: 0,

      jdList: [],
      suggestList: [], //补充建议列表
      logTabName: "",
      logsFjpath: "",
      oldFjpath: "", //记录根目录路径
      fileCounts: {},
      dialogTitle: "",
      praiseObj:{},//好评类型
      userTag: "",
      // 文件搜索
      seachVal: "", // 高级搜索文件
      searchList: [],
      searchCurpage: 1,
      searchPageSize: 10,
      searchTotal: 0,
      searchKeyword: "",
      elapsedTime:""
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
    this.openFolder();
    this.userTag = JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag;
  },
  methods: {
    handleSync(){
      this.$get(this.API.refreshFileIndex,{
      }).then(res=>{
        if(res.state == 'success'){
          this.$message({
            message: '文件同步成功~',
            type: 'success'
          });
        }else{
          this.$message({
            message: '文件同步失败~',
            type: 'error'
          });
        }
      })
    },

    // 文件搜索
    handleSearchFile(val) {
      this.searchKeyword = val;
      this.searchCurpage = 1;
      this.catalogue = "search";
      this.searchFiles();
    },
    // 搜索 切换分页
    handleSearchCurrentChange(data) {
      this.searchCurpage = data;
      this.searchFiles();
    },
    searchFiles() {
      if(!this.searchKeyword){
        this.$message({
              message: "搜索文件名不能为空~",
              type: "warning"
        });
        return;
      };
      this.$get(this.API.searchFiles, {
        keyword: this.searchKeyword,
        curPage: this.searchCurpage,
        pageSize: this.searchPageSize,
        lx: this.resourceType
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.datas) {
            this.searchList = [];
          } else {
            this.searchList = res.data.datas;
          }
          this.searchTotal = res.data.totalHits;
          this.elapsedTime = res.data.elapsedTime;
        }
      });
    },
    // 下载
    handleDownload(fjbh,index,types) {
      let str = fjbh.replace(/&/g, encodeURIComponent("&"));
      let newstr = str.replace(/\+/g, encodeURIComponent("+"));
      if(types == 'input'){
        this.searchList[index].download += 1;
      }else{
        this.fileList.files[index].download += 1;
      }
      window.open(
        window.baseurl +
          "attachment/downloadTemplateFile.do?path=" +
          newstr +
          "&lx=" +
          this.resourceType
      );
    },
    // 上传成功
    handleCommitUpload() {
      this.openFolder(this.oldFjpath);
    },
    // 上传附件
    handleUpload() {
      this.uploadShow = !this.uploadShow;
    },
    // 新建文件夹
    handledir() {
      this.$prompt("请输入文件夹名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        inputErrorMessage: "请输入文件夹名称"
      })
        .then(({ value }) => {
          this.$post(this.API.addDir, {
            path: this.oldFjpath,
            lx: this.resourceType,
            name: value
          }).then(res => {
            if (res.state == "success") {
              this.$message({
              message: "添加成功~",
              type: "success"
            });
              this.openFolder(this.oldFjpath);
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    handleCommit() {
      if (this.catalogue == "file") {
        this.openFolder();
      } else if (this.catalogue == "record") {
        this.getLogs();
      }
    },
    // 分页切换(记录)
    hadnleChange(data, type) {
      if (type == "size") {
        this.currentPage = 1;
        this.pageSize = data;
      } else {
        this.currentPage = data;
      }
      this.getLogs();
    },
    /**
     *
     * 添加补充意见
     */

    // 分页切换(建议)
    handleChangejy(data, type) {
      if (type == "size") {
        this.currentPagejy = 1;
        this.pageSizejy = data;
      } else {
        this.currentPagejy = data;
      }
      this.pageFeedback();
    },

    // 添加建议
    handleAddyj() {
      this.dialogTitle = "添加补充建议";
      this.pjsmShow = true;
    },
    // 提交成功
    handleSucess() {
      this.pageFeedback();
    },

    // 切换tab
    hadnleChangeTab(data) {
      if (data == 9) {
        this.logTabName = "";
      } else {
        this.logTabName = data;
      }
      this.currentPage = 1;
      this.getLogs();
    },

    // 评价提交
    handleClickSure(data) {
      if (this.dialogTitle == "添加补充建议") {
        this.$post(this.API.feedback, {
          lx: this.resourceType,
          nr: data
        }).then(res => {
          if (res.state == "success") {
            this.pjsmShow = !this.pjsmShow;
            this.$message({
              message: "添加成功~",
              type: "success"
            });
            this.pageFeedback();
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      } else {
        this.$post(this.appraiseType == 1 ? this.API.good : this.API.bad, {
          path: this.fjPath,
          lx: this.resourceType,
          sm: data
        }).then(res => {
          if (res.state == "success") {
            this.pjsmShow = !this.pjsmShow;
            this.$message({
              message: "评价成功~",
              type: "success"
            });
            if(this.praiseObj.type == 'list'){
              if(this.appraiseType == 1){
                this.fileList.file[this.praiseObj.index].good += 1
              }else{
                this.fileList.file[this.praiseObj.index].bad += 1
              }
            }else{
              if(this.appraiseType == 1){
                this.searchList[this.praiseObj.index].good += 1
              }else{
                this.searchList[this.praiseObj.index].bad += 1
              }
            }
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      }
    },
    // 评价
    handlePraise(e, param, data,index,types) {
      e.stopPropagation();
      this.praiseObj.type = types;
      this.praiseObj.index = index;
      this.appraiseType = param;
      this.fjPath = data;
      if (param == 2) {
        this.logsFjpath = data;
        this.catalogue = "record";
        return;
      }
      if (param == 1) {
        this.dialogTitle = "点赞说明";
      } else if (param == 0) {
        this.dialogTitle = "优化建议";
      }
      this.pjsmShow = !this.pjsmShow;
    },
    // 删除文件
    handleDelete(data, index, params, types) {
      this.$confirm("您确定要删除该文件吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post(params == 0 ? this.API.deleteFile : this.API.deleteDir, {
            path: data,
            lx: this.resourceType
          }).then(res => {
            if (res.state == "success") {
              this.$message({
                message: "删除成功~",
                type: "success"
              });
              if (types == "input") {
                this.searchList.splice(index, 1);
              } else {
                this.fileList.files.splice(index, 1);
              }
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    // 打开文件
    openFolder(path) {
      this.$get(this.API.openTemplateFolder, {
        path: path || "",
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
      this.logsFjpath = this.oldFjpath = "";
    },

    // 面包屑导航
    handleBreadFile(e) {
      let fjbh = e.currentTarget.getAttribute("data-fjbh"),
        str = fjbh.replace(/&/g, encodeURIComponent("&")),
        newstr = str.replace(/\+/g, encodeURIComponent("+")),
        formatstr = "";
      if (fjbh == this.fjbh) return;
      this.$get(this.API.openTemplateFolder, {
        path: newstr,
        lx: this.resourceType
      }).then(res => {
        if (res.state == "success") {
          formatstr = this.fileList.wid
            .replace(/&/g, encodeURIComponent("&"))
            .replace(/\+/g, encodeURIComponent("+"));
          this.fileList = res.data;
          this.oldFjpath = formatstr;
          this.fileBread.forEach((ele, i, arr) => {
            if (ele.fjbh.includes(fjbh)) {
              this.fileBread.splice(i + 1, 9999);
            }
          });
        }
      });
    },
    // 查看文件
    handleFile(e, wid) {
      let type = e.currentTarget.getAttribute("data-type"),
          fjbh = e.currentTarget.getAttribute("data-fjbh"),
          fj = e.currentTarget.getAttribute("data-fj"),
          str = fjbh.replace(/&/g, encodeURIComponent("&")),
          newstr = str.replace(/\+/g, encodeURIComponent("+"));
      // 获取记录需要的附件路径
      this.logsFjpath = newstr;
      if (fj != null && fj.split("&")[1] == 0) return;
      if (type == null) {
        this.fjbh = newstr;
        this.fjobj = {
          fjmc: fj.split("&")[0],
          fjbh: newstr
        };
      }
      this.$get(this.API.openTemplateFolder, {
        path: newstr,
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
    getLogs() {
      this.$get(this.API.logs, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        path: this.logsFjpath,
        lx: this.resourceType,
        czlx: this.logTabName
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.jdList = [];
          } else {
            this.jdList = res.data.rows;
          }
          this.total = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 获取记录数
    getCount() {
      this.$get(this.API.getCount, {
        path: this.logsFjpath,
        lx: this.resourceType
      }).then(res => {
        if (res.state == "success") {
          this.fileCounts = res.data;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    // 获取反馈分页列表
    pageFeedback() {
      this.$get(this.API.pageFeedback, {
        curPage: this.currentPagejy,
        pageSize: this.pageSizejy,
        path: this.logsFjpath,
        lx: this.resourceType
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.suggestList = [];
          } else {
            this.suggestList = res.data.rows;
          }
          this.totaljy = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    }
  },
  watch: {
    catalogue(n, o) {
      if (n == "suggest") {
        this.pageFeedback();
      }
      if (n == "record") {
        this.logTabName = "";
        this.getLogs();
        this.getCount();
      } else {
        this.logsFjpath = this.oldFjpath;
      }
    }
  },
  components: { pjsmDialog, oprateRecord, uploadDialog, suggest }
};
</script>


<style lang="scss" scoped>
.zczx-pannel{
  width: 90%;
  margin: 10px auto 0;
  padding: 20px 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
}
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
  .appraise-hp {
    display: inline-block;
    margin-bottom: -3px;
    width: 16px;
    height: 16px;
    background: url("../../../static/img/appraiseImg.png");
    background-position: 0 -16px;
  }
  .appraise-hp:hover {
    background-position: 0 -48px;
  }
  .appraise-cp {
    display: inline-block;
    margin-bottom: -3px;
    width: 16px;
    height: 16px;
    background: url("../../../static/img/appraiseImg.png");
  }
  .appraise-cp:hover {
    background-position: 0 -32px;
  }
  .appraise-download {
    display: inline-block;
    margin-bottom: -3px;
    width: 20px;
    height: 20px;
    background: url("../../../static/img/download.png");
    background-size: 100% 100%;
  }
}
.file-search-name {
  width: 32%;
  .fjmc {
    display: inline-block;
    width: 88%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

.file-search-size {
  width: 10%;
  text-align: center;
}
.file-search-path {
  width: 23%;
  text-align: center;
  span {
    display: inline-block;
    width: 95%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
.file-search-cjsj {
  width: 15%;
  text-align: center;
}
</style>