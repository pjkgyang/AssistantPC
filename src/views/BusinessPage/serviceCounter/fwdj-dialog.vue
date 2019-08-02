<template>
  <div class="dialog-container" @click="hanldeHideCp($event)">
    <el-dialog title="服务请求登记" width="1000px" top="30px" :visible.sync="visible" :close-on-click-modal="false" @close="$emit('update:show', false)"
      :show="show">
      <div class="demand">
        <el-form style="width:950px;margin:0 auto" class="demo-ruleForm" :model="fwdjData" :inline="true" size="mini"
          label-width="135px">
          <el-form-item label="项目名称" required>
            <el-input size="mini" type="text" :style="{ width: 800 + 'px' }" v-model="fwdjData.xmmc" readonly
              placeholder="请选择项目">
              <el-button slot="append" icon="el-icon-circle-plus-outline" style="width:30px;padding:0 12px;"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="提报人" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbr"></el-input>
          </el-form-item>
          <el-form-item label="提报方式" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs"></el-input>
          </el-form-item>

          <el-form-item label="提报人部门" required>
            <el-select v-model="fwdjData.xqfl" size="mini" placeholder="请选择需求分类" style="width:325px">
              <el-option v-for="(item, index) in xqflList" :key="index" :label="item.mc" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提报人职务" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs"></el-input>
          </el-form-item>


          <el-form-item label="提报时间" required>
            <el-date-picker :picker-options="pickerBeginDateBefore" :clearable="false" size="mini" v-model="fwdjData.qwsjwcrq"
              type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:325px;"></el-date-picker>
          </el-form-item>

          <el-form-item label="服务请求来源" required>
            <el-select v-model="fwdjData.sfsx" size="mini" placeholder="请选择服务请求来源" style="width:325px">
              <el-option v-for="(item, index) in sfxsList" :key="index" :label="item.mc" :value="item.label"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="信息系统" required>
            <el-select v-model="fwdjData.crowdywxbh" size="mini" placeholder="请选择CROWD业务线" style="width:325px">
              <el-option v-for="(ywx, index) in crowdywxList" :key="index" :label="ywx.lbmc" :value="ywx.lbdm"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="承建单位" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.cjdw"></el-input>
          </el-form-item>
          <el-form-item label="单位联系人" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.dwlxr"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.lxfs"></el-input>
          </el-form-item>


          <el-form-item label="问题级别" required>
            <el-select v-model="fwdjData.crowdcpbh" size="mini" placeholder="请选择CROWD产品" style="width:325px">
              <el-option v-for="(cp, index) in crowdcpList" :key="index" :label="cp.lbmc" :value="cp.lbdm"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="期望解决日期" required>
            <el-date-picker :picker-options="pickerBeginDateBefore" :clearable="false" size="mini" v-model="fwdjData.qwsjwcrq"
              type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:325px;"></el-date-picker>
          </el-form-item>


          <el-form-item label="标题" required>
            <el-input size="mini" v-model="fwdjData.bt" type="text" placeholder="标题" style="width:800px;"></el-input>
          </el-form-item>

          <el-form-item label="需求附件" required>
            <uploadFile :Type="'demand'" :istb="isClearFile" @handleUploadFile="handleUploadFile"></uploadFile>
            <p class="file" v-if="!!fwznfjMc && Type.includes('edit')">
              {{fwznfjMc}}
              <i class="el-icon-close" @click="handleRemoveFwznfj"></i>
            </p>
          </el-form-item>
        </el-form>
        <div class="demand-textarea">
          <p>需求描述</p>
          <div id="summernoteTT"></div>
        </div>

        <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
          <el-button size="small" type="primary" @click="handleCommit">确认提交</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import axios from "axios";
  import uploadFile from "@/components/BusinessPage/upload.vue";


  export default {
    data() {
      return {
        isInnerItem: false, // 是否为内部项目
        dialogdemandVisible: false,
        demandListVisible: false, //需求列表
        visible: this.show,
        isClearFile: false, //清除附件
        cpTreeShow: false,
        defaultProps: {
          value: "id",
          label: "title"
        },
        options: [], //产品树选项
        xmmc: "",
        xmbh: "",
        xmzt: "",
        xqflList: [],
        xmcpList: [], //项目产品
        tclsList: [], //提出老师
        sfxsList: [{
            mc: "是",
            label: "1"
          },
          {
            mc: "否",
            label: "0"
          }
        ], //是否线上
        crowdywxList: [], //crowd业务线
        crowdcpList: [], //crowd产品
        cpData: [], //当前产品树 选择产品
        val: [],
        teacherData: [],
        fwznfjMc: "", //编辑附件名称
        glxqMc: "", //关联需求名称
        fwdjData: {
          xmbh: "",
          xmmc: "",
          xqfl: "",
          teacherData: "",
          sfsx: "0",
          cpbjbh: "",
          cpbjmc: "",
          crowdywxbh: "", //crowd 业务线编号
          crowdywxmc: "", //crowd 业务线名称
          crowdcpbh: "", //crowd 产品编号
          crowdcpmc: "", //crowd 产品名称
          qwsjwcrq: "",
          qwkfjfrq: "",
          glxqWid: "",
          bt: "",
          xqfjwid: "",
          xqfjmc: ""
        },
        pickerBeginDateBefore: {
          disabledDate(time) {
            let curDate = new Date().getTime();
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {
      uploadFile
    },
    methods: {
      // 上传附件
      handleUploadFile(data) {
        this.fwznfjMc = "";
        if (!!data.length) {
          this.fwdjData.xqfjwid = data[0].split("|")[0];
          this.fwdjData.xqfjmc = data[0].split("|")[1];
        } else {
          this.fwdjData.xqfjwid = "";
          this.fwdjData.xqfjmc = "";
        }
      },

      //提交需求
      handleCommit() {
        if (!this.valiDate()) return;
        this.$post(this.API.submitDemand, this.fwdjData).then(res => {
          if (res.state == "success") {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            $("#summernoteTT").summernote("code", "");
            this.isClearFile = !this.isClearFile;
            this.visible = false;
            this.$emit("handleCommitDemand", this.Type);
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
      },

      valiDate() {
        if (!this.fwdjData.xmbh) {
          this.$message({
            message: "请选择项目编号",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.xqfl) {
          this.$message({
            message: "请选择需求分类",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.teacherData) {
          this.$message({
            message: "请选择提出老师",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.cpbjbh) {
          this.$message({
            message: "请选择产品或产品选择有误（请注意需选择到模块级~）",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.crowdywxbh) {
          this.$message({
            message: "请选择CROWD业务线",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.crowdcpbh) {
          this.$message({
            message: "请选择CROWD产品",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.qwsjwcrq) {
          this.$message({
            message: "请选择期望设计完成日期",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.qwkfjfrq) {
          this.$message({
            message: "请选择期望开发交付日期",
            type: "warning"
          });
          return false;
        }
        if (this.fwdjData.xqfl != 1 && !this.fwdjData.glxqWid) {
          this.$message({
            message: "请选择关联的需求",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.xqfjwid) {
          this.$message({
            message: "请上传附件",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.bt) {
          this.$message({
            message: "请填写需求标题",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.nr || this.fwdjData.nr == "<p><br></p>") {
          this.$message({
            message: "请填写需求内容",
            type: "warning"
          });
          return false;
        }
        return true;
      }
    },
    watch: {
      show() {
        this.visible = this.show;
        if (this.show) {
          this.$nextTick(() => {
            $("#summernoteTT").summernote({
              dialogsInBody: true,
              placeholder: "请输入内容",
              focus: true,
              height: 200,
              width: 100 + "%",
              minHeight: 300,
              lang: "zh-CN",
              toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["picture"],
                ["link", ["linkDialogShow", "unlink"]]
              ]
            });
          });
        } else {}
      }
    }
  };
</script>
<style scoped lang="scss">
  .demand {
    padding: 10px 0;
  }

  div.el-form-item {
    margin-bottom: 8px !important;
  }

  .demand-textarea {
    width: 950px;
    margin: 0 auto;
  }

  .demand-textarea>p {
    width: 125px;
    text-align: right;
    padding-right: 12px;
    font-weight: 700;
  }

  .demand-textarea>p::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }

  .file {
    padding: 2px 6px;
    border-radius: 3px;
    margin-top: 4px !important;

    &:hover {
      background: rgba(216, 214, 214, 0.5);
    }

    i {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;

      &:hover {
        color: #f00;
        cursor: pointer;
        background: rgba(255, 0, 0, 0.25);
      }
    }
  }

  .cptree {
    position: absolute;
    top: 0;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    top: 40px;
    z-index: 10200;
    width: 325px;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: auto;
  }
</style>
