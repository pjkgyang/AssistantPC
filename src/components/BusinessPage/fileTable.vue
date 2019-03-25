<template>
  <div style="width:80%;margin:10px auto 0;padding:20px 10px;background:#fff;border-radius:5px;box-shadow:0 0 5px #ccc;">
    <section text-right style="margin-bottom:12px;">
      <el-button :type="catalogue == 'file'?'primary':''" size="small" @click="catalogue = 'file'">文件目录</el-button>
      <el-button :type="catalogue == 'record'?'primary':''" size="small" @click="catalogue = 'record'">操作记录</el-button>
      <el-button  :type="catalogue == 'suggest'?'primary':''" size="small" @click="catalogue = 'suggest'">补充建议</el-button>
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
            <div class="upload-files">
              <el-button size="mini" @click="handlechangeSVN">修改svn地址</el-button>
              <el-button size="mini" @click="handlecheckout" v-if="fileList.length == 0 || fileList == null">检出</el-button>
              <el-button size="mini" @click="handleUpdateFile" v-if="fileList.length != 0 && fileList != null">更新</el-button>

              <el-upload class="upload-demo" ref="upload" multiple :action="uploadAction" 
              :before-upload="beforeUpload" :on-remove="handleRemove" :on-change="handleChange" 
              :file-list="fileListArr" :show-file-list="false" :auto-upload="false">
                <el-button slot="trigger" size="mini" style="border: none" icon="el-icon-circle-plus">上传</el-button>
              </el-upload>
            </div>
          </div>
          <div class="file-header" flex>
            <p class="file-name">文件名</p>
            <p class="file-size">文件大小</p>
            <p class="file-cjsj" style="padding-right:30px">修改时间</p>
            <p class="file-evaluate"></p>
          </div>
          <li :data-fjbh="fileList.parentwid" data-type="back" @click="handleFile" class="file-back" v-if="fileList.parentwid != '-1' && JSON.stringify(fileList)!='{}'">
            <div style="padding:10px 20px">
              <span><img src="static/img/back.png" alt="" style="float:left;">
                <span style="float:left;margin-top:10px;">上一级</span>
              </span>
            </div>
          </li>
          <li v-for="(file,index) in fileList.files" style="padding:0 20px;display:flex" :data-fj="file.fjmc+'&'+file.sfwjml" :data-fjbh="file.fjbh" @click="handleFile" @mouseover="fileIndex = index">
            <div style="width:40%;padding:6px 0">
              <div v-if="file.sfwjml == 1">
                <span><img style="float:left" src="static/img/files.png" alt="">
                  <span style="float:left;margin-top:10px">{{file.fjmc}}</span>
                </span>
              </div>
              <div v-if="file.sfwjml == 0">
                <a :href="baseUrl+'attachment/downloadXmFile.do?xmbh='+xmbh+'&path='+file.fjbh" target="blank">
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
                <span @click="handlePraise($event,'1',file.fjbh)"><span class="appraise-hp"></span>({{file.good}})</span>&nbsp;
                <span @click="handlePraise($event,'0',file.fjbh)"><span class="appraise-cp"></span>({{file.bad}})</span>&#x3000;
                <a href="javaScript:;;" @click="handlePraise($event,'2',file.fjbh)">查看记录</a>
              </div>
            </div>
          </li>
           <div v-if="!fileList.files" text-center class="mg-12">
                暂无记录
            </div>
        </ul>
      </section>
    </el-collapse-transition>
    <el-collapse-transition>
      <section v-if="catalogue == 'record'">
        <oprateRecord :jdList="jdList" :fileCounts="fileCounts" :isSvn="true" @hadnleChangeTab="hadnleChangeTab" @hadnleChange="hadnleChange" :currentPage="currentPage" :pageSize="pageSize" :total="total"></oprateRecord>
      </section>
    </el-collapse-transition>
    <!-- 补充建议 -->
    <el-collapse-transition>
      <section v-if="catalogue == 'suggest'">
        <suggest :jdList="suggestList" @hadnleChange="handleChangejy" :currentPage="currentPagejy"
        :pageSize="pageSizejy" :total="totaljy" @handleSucess="handleSucess" @handleAddyj="handleAddyj"></suggest>
      </section>
    </el-collapse-transition>

    <el-dialog title="修改svn地址" :visible.sync="dialogVisible" :close-on-click-modal="false" width="500px">
      <div style="padding:20px 10px ">
        <p style="font-size:18px">svn地址:</p>
        <el-input v-model="SVNValue" placeholder="请输入SVN地址"></el-input>
        <p style="text-align:right;padding:10px 0">
          <el-button type="primary" size="small" @click="handleCommitSVN">提交</el-button>
        </p>
      </div>
    </el-dialog>

    <pjsmDialog :show.sync="pjsmShow" @handleClickSure="handleClickSure" :title="dialogTitle"></pjsmDialog>
  </div>
</template>


<script>
import {
  getTemplateFolder,
  openFolder,
  openRealFolder,
  checkout,
  downloadXmFile,
  updateSvn
} from "@/api/TaskProcess.js";
import { updateSvnUrl, getXmFileUrl } from "@/api/xmfz.js";
import pjsmDialog from "@/components/dialog/resource/pjsm-dialog";
import oprateRecord from "@/components/resource/record.vue";
import suggest from "@/components/resource/suggest.vue";
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
      fileList: {},
      fileBread: [],
      fjbh: "",
      fjobj: {},
      uploadAction: "",
      fileListArr: [],
      fileData: [],
      filesData: [],
      filesArr: [],
      suggestList: [], //建议列表
      dialogVisible: false,
      pjsmShow: false,
      SVNValue: "",
      baseUrl: null,
      catalogue: "file",
      fjPath: "",
      fileIndex: "",
      appraiseType: "",
      currentPage: 1,
      pageSize: 15,
      currentPagejy: 1, //建议分页
      pageSizejy: 15, //建议分页数
      total: 0,
      totaljy: 0,
      jdList: [],
      logTabName: "",
      logsFjpath: "",
      oldFjpath: "", //记录根目录路径
      fileCounts: {},
      dialogTitle: ""
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.openRealFolder();
    this.baseUrl = window.baseurl;
    getXmFileUrl({
      xmbh: this.xmbh
    }).then(({ data }) => {
      if (data.state == "success") {
        this.SVNValue = data.data.svn;
      }
    });
    window.onerror = function() {
      return true;
    };
  },

  methods: {
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

    // 分页切换
    hadnleChange(data, type) {
      if (type == "size") {
        this.currentPage = 1;
        this.pageSize = data;
      } else {
        this.currentPage = data;
      }
      this.getLogs();
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
          lx: 4,
          nr: data,
          xmbh: this.xmbh
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
          xmbh: this.xmbh,
          path: this.fjPath,
          lx: 4,
          sm: data
        }).then(res => {
          if (res.state == "success") {
            this.pjsmShow = !this.pjsmShow;
            this.$alert("评价成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.openRealFolder();
              }
            });
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
    handlePraise(e, param, data) {
      e.stopPropagation();
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
    // 更新 SVN
    handleUpdateFile() {
      updateSvn({
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("更新成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.openRealFolder();
            }
          });
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // svn提交(修改)
    handleCommitSVN() {
      updateSvnUrl({
        xmbh: this.xmbh,
        svn: this.SVNValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("修改成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.openRealFolder();
              this.dialogVisible = false;
            }
          });
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
        }
      });
    },
    // 切换SVN
    handlechangeSVN() {
      this.dialogVisible = true;
    },
    handlecheckout() {
      //检出文件
      checkout({
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("检出成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.openRealFolder();
            }
          });
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        }
      });
    },
    // 查看全部目录
    handleAllfile() {
      this.openRealFolder();
      this.fileBread = [];
      this.logsFjpath = "";
    },

    // 面包屑导航
    handleBreadFile(e) {
      let fjbh = e.currentTarget.getAttribute("data-fjbh");
      if (fjbh == this.fjbh) return;
      openRealFolder({
        path: fjbh,
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if (!data.data) {
            this.fileList = [];
          } else {
            this.fileList = data.data;
            this.fileBread.forEach((ele, i, arr) => {
              if (ele.fjbh.includes(fjbh)) {
                this.fileBread.splice(i + 1, 9999);
              }
            });
          }
        }
      });
    },

    handleFile(e) {
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
      openRealFolder({
        path: fjbh,
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if (!data.data) {
            this.fileList = [];
          } else {
            this.fileList = data.data;
            this.oldFjpath = this.fileList.wid;
            if (type == "back") {
              this.fileBread.pop();
            } else {
              if (fj.split("&")[1] == 1) {
                this.fileBread.push(this.fjobj);
              }
            }
          }
        }
      });
    },

    // 获取文件夹
    openRealFolder(fjbh) {
      openRealFolder({
        path: fjbh,
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if (!data.data) {
            this.fileList = [];
          } else {
            this.fileList = data.data;
          }
        } else {
          checkout({
            xmbh: this.xmbh
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("检出成功", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  openRealFolder({
                    path: "",
                    xmbh: this.xmbh
                  }).then(({ data }) => {
                    if (data.state == "success") {
                      if (!data.data) {
                        this.fileList = [];
                      } else {
                        this.fileList = data.data;
                      }
                    }
                  });
                }
              });
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error",
                callback: action => {}
              });
            }
          });
        }
      });
    },

    //上传附件
    // 删除文件
    handleRemove(file, fileList) {
      this.fileData.forEach((ele, i, arr) => {
        if (ele.includes(file.name)) this.fileData.splice(i, 1);
      });
    },

    beforeUpload(file) {
      if (this.filesArr.length > 0) {
        if (this.filesArr[0].name == file.name) return;
      }
      this.filesArr.push(file);
      let fd = new FormData();

      fd.append("fileUpload", file);
      fd.append("xmbh", this.xmbh);
      fd.append("path", this.fjbh);

      axios
        .post(window.baseurl + "attachment/uploadXmFile.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.state == "success") {
            openRealFolder({
              path: this.fjbh,
              xmbh: this.xmbh
            }).then(({ data }) => {
              if (data.state == "success") {
                this.fileList = data.data;
              }
            });
          }
          // this.$alert("上传成功", "提示", {
          //   confirmButtonText: "确定",
          //   type: "success",
          //   callback: action => {
          //     openRealFolder({
          //       path: this.fjbh,
          //       xmbh: this.xmbh
          //     }).then(({ data }) => {
          //       if (data.state == "success") {
          //         this.fileList = data.data;
          //       }
          //     });
          //   }
          // });
        });
      return false;
    },
    handleChange(file, fileList) {
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
    //  获取记录
    getLogs() {
      this.$get(this.API.logs, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        path: this.logsFjpath,
        lx: 4,
        xmbh: this.xmbh,
        czlx: this.logTabName
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.jdList = [];
          } else {
            this.jdList = res.data.rows;
          }
          this.total = res.data.records;
        }
      });
    },
    // 获取记录数
    getCount() {
      this.$get(this.API.getCount, {
        path: this.logsFjpath,
        lx: 4,
        xmbh: this.xmbh
      }).then(res => {
        if (res.state == "success") {
          this.fileCounts = res.data;
        }
      });
    },
    // 获取反馈分页列表
    pageFeedback() {
      this.$get(this.API.pageFeedback, {
        curPage: this.currentPagejy,
        pageSize: this.pageSizejy,
        path: this.logsFjpath,
        lx: 4,
        xmbh: this.xmbh
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
  components: { oprateRecord, pjsmDialog, suggest }
};
</script>


<style lang="scss" scoped>
.file-list {
  content: "";
  display: block;
  clear: both;
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
      background: rgb(245, 248, 248);
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
  width: 30%;
  text-align: right;
}
.upload-files {
  float: right;
  font-size: 13px;
  display: flex;
}
.upload-files .el-icon-circle-plus {
  color: #409eff;
}
.upload-files:hover {
  cursor: pointer;
  color: #409eff;
}
.file-evaluate {
  width: 15%;
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
  // img {
  //   width: 16px;
  //   height: 16px;
  //   margin: 0 0 0 5px !important;
  // }
}
</style>