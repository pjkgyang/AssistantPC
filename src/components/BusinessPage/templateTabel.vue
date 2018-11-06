<template>
  <div style="width:80%;margin:10px auto 0;padding:20px 10px;background:#fff;border-radius:5px;box-shadow:0 0 5px #ccc;">
    <ul class="file-list">
      <div style="padding-bottom:10px;border-bottom:1px solid #ccc">
        <span class="file-breadcrumb" @click="handleAllfile">全部目录</span>
        <span v-for="(file,index) in fileBread" class="file-breadcrumb" :data-fjbh="file.fjbh" @click="handleBreadFile">
          <span class="el-icon-arrow-right"></span>
          <span>{{file.fjmc}}</span>
        </span>
      </div>
      <div class="file-header">
        <p class="file-name">文件名</p>
        <p class="file-size">文件大小</p>
        <p class="file-cjsj" style="padding-right:30px">修改时间</p>
      </div>
      <li :data-fjbh="fileList.parentwid" data-type="back" @click="handleFile" class="file-back" v-if="fileList.parentwid != '-1' && JSON.stringify(fileList)!='{}'">
        <div style="padding:10px 20px">
          <span><img src="static/img/back.png" alt="" style="float:left;">
            <span style="float:left;margin-top:10px;">上一级</span>
          </span>
        </div>
      </li>
      <li v-for="(file,index) in fileList.files" style="padding:0 20px;display:flex" :data-fj="file.fjmc+'&'+file.sfwjml" :data-fjbh="file.fjbh" @click="handleFile">
        <div style="width:40%;padding:6px 0">
          <div v-if="file.sfwjml == 1">
            <span><img style="float:left" src="static/img/files.png" alt="">
              <span style="float:left;margin-top:10px">{{file.fjmc}}</span>
            </span>
          </div>
          <div v-if="file.sfwjml == 0">
            <a :href="baseUrl+'attachment/downloadTemplateFile.do?path='+file.fjbh" target="blank">
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
      </li>
    </ul>
  </div>
</template>


<script>
import { downloadXmFile} from "@/api/TaskProcess.js";
export default {
  data() {
    return {
      fileList: {},
      fileBread: [],
      fjbh: "",
      fjobj: {},
      baseUrl: null
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.baseUrl = window.baseurl;
    this.openTemplateFolder();
  },

  methods: {
    openTemplateFolder(path) {
      this.$get(this.API.openTemplateFolder, {
        path: path
      }).then(res => {
        if (res.state == "success") {
          this.fileList = res.data;
        }
      });
    },
    // 查看全部目录
    handleAllfile() {
      this.openTemplateFolder();
      this.fileBread = [];
    },

    // 面包屑导航
    handleBreadFile(e) {
      let fjbh = e.currentTarget.getAttribute("data-fjbh");
      if (fjbh == this.fjbh) return;

      this.$get(this.API.openTemplateFolder, {
        path: fjbh
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

    handleFile(e) {
      let type = e.currentTarget.getAttribute("data-type");
      let fjbh = e.currentTarget.getAttribute("data-fjbh");
      let fj = e.currentTarget.getAttribute("data-fj");
      if (fj != null && fj.split("&")[1] == 0) return;
      if (type == null) {
        this.fjbh = fjbh;
        this.fjobj = {
          fjmc: fj.split("&")[0],
          fjbh: fjbh
        };
      }

      this.$get(this.API.openTemplateFolder, {
        path: fjbh
      }).then(res => {
        if (res.state == "success") {
          this.fileList = res.data;
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
  }
};
</script>


<style scoped>
.file-list li > div:after {
  content: "";
  display: block;
  clear: both;
}

.file-list li {
  border-bottom: 1px solid #ccc;
  font-size: 13px;
}
.file-list li img {
  margin: 0 10px 0 0;
}
.file-list li:hover {
  cursor: pointer;
  background: rgb(245, 248, 248);
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
.file-header:after {
  content: "";
  display: block;
  clear: both;
}
.file-header {
  padding: 10px 20px;
  color: #888;
  border-bottom: 1px solid #ccc;
}
.file-header .file-name {
  width: 40%;
}
.file-size {
  width: 20%;
  text-align: center;
}
.file-cjsj {
  width: 40%;
  text-align: right;
}
.file-header > p {
  float: left;
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
</style>