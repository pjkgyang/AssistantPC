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
        <p class="file-evaluate"></p>
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
            <a :href="baseUrl+'attachment/downloadCoursewareFile.do?path='+file.fjbh" target="blank">
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
          <div flex colcenter v-if="fileIndex == index">
             <img title="好评" src="static/img/praise.png" alt="好评">
             <img title="差评" src="static/img/nopraise.png" alt="差评">
          </div>
        </div>
      </li>
    </ul>
     <div v-if="JSON.stringify(fileList) === '{}'" class="emptyContent">
        <img src="static/img/kong.png" alt="">
        <p>暂无数据</p>
    </div>
    <pjsmDialog :show.sync="pjsmShow" @handleClickSure="handleClickSure"></pjsmDialog>
  </div>
</template>


<script>
import { downloadXmFile} from "@/api/TaskProcess.js";
import pjsmDialog from '@/components/dialog/resource/pjsm-dialog'
export default {
  data() {
    return {
      pjsmShow:false,
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
    this.openCoursewareFolder();
  },

  methods: {
     // 评价提交
    handleClickSure(data){
      console.log(data)
      this.pjsmShow = !this.pjsmShow
    },
    // 评价
    handlePraise(e,param){
      e.stopPropagation();
      this.pjsmShow = !this.pjsmShow;
    },
    openCoursewareFolder(path) {
      this.$get(this.API.openCoursewareFolder, {
        path: path
      }).then(res => {
        if (res.state == "success") {
          if(!res.data){
            this.fileList = {}
          }else{
            this.fileList = res.data;
          }
        }
      });
    },
    // 查看全部目录
    handleAllfile() {
      this.openCoursewareFolder();
      this.fileBread = [];
    },

    // 面包屑导航
    handleBreadFile(e) {
      let fjbh = e.currentTarget.getAttribute("data-fjbh");
      if (fjbh == this.fjbh) return;

      this.$get(this.API.openCoursewareFolder, {
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

      this.$get(this.API.openCoursewareFolder, {
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
  },
  components:{pjsmDialog}
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
  width: 20%;
  text-align: center;
}
.file-cjsj {
  width: 35%;
  text-align: right;
}
.file-evaluate{
  width: 5%;
  text-align: right;
  justify-content: flex-end;
  div{
    height:100%;
    justify-content:flex-end;
  }
  img{
    width: 16px;
    height: 16px;
    margin: 0 0 0 5px !important;
  }
}
</style>