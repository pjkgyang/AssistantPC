<template>
  <div class="dialog-container">
    <el-dialog
      title="服务请求登记"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="demand">
        <el-form
          style="width:950px;margin:0 auto"
          class="demo-ruleForm"
          ref="fwdjForm"
          :model="fwdjData"
          :inline="true"
          size="mini"
          label-width="135px"
        >
          <el-form-item label="学校名称" required v-if="userInfo.unitType == '0'">
            <el-input placeholder="请选择" readonly v-model="fwdjData.dwmc" style="width:800px">
              <el-button
                slot="append"
                icon="el-icon-circle-plus-outline"
                @click="schoolShow = true"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="提报人" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请输入提报人姓名"
              v-model="fwdjData.tbr"
            ></el-input>
          </el-form-item>
          <el-form-item label="提报人联系方式" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请输入提报联系方式"
              v-model="fwdjData.lxfs"
            ></el-input>
          </el-form-item>

          <el-form-item label="提报人部门" required>
            <el-input placeholder="请选择" readonly v-model="fwdjData.bmmc" style="width:325px">
              <el-button slot="append" icon="el-icon-circle-plus-outline" @click="tbrbmShow = true"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="提报人职务" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请输入提报人职务"
              v-model="fwdjData.tbrzw"
            ></el-input>
          </el-form-item>

          <el-form-item label="提报时间" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="fwdjData.tbsj"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="服务请求来源" required>
            <el-select
              v-model="fwdjData.qqly"
              size="mini"
              placeholder="请选择服务请求来源"
              style="width:325px"
            >
              <el-option
                v-for="(item, index) in fwqqlyList"
                :key="index"
                :label="item.mc"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="信息系统" required>
            <el-select
              v-model="fwdjData.yybh"
              size="mini"
              placeholder="请选择信息系统"
              style="width:325px"
              @change="handleChangeYyxt"
            >
              <el-option
                v-for="(xxxt, index) in xxxtList"
                :key="index"
                :label="xxxt.yymc"
                :value="xxxt.yybh"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="承建单位" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请选择信息系统"
              readonly
              v-model="fwdjData.cjdw"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位联系人" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请优先选择信息系统"
              readonly
              v-model="fwdjData.dwlxr"
            ></el-input>
          </el-form-item>
          <el-form-item label="单位联系方式" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请优先选择信息系统"
              v-model="fwdjData.dwlxfs"
            ></el-input>
          </el-form-item>

          <el-form-item label="问题级别" required>
            <el-select
              v-model="fwdjData.wtjb"
              size="mini"
              placeholder="请选择问题级别"
              style="width:325px"
            >
              <el-option
                v-for="(wtjb, index) in wtjbList"
                :key="index"
                :label="wtjb.mc"
                :value="wtjb.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="期望解决日期" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="fwdjData.qwjjrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="标题" required>
            <el-input
              size="mini"
              v-model="fwdjData.bt"
              type="text"
              placeholder="标题"
              style="width:800px;"
            ></el-input>
          </el-form-item>

          <el-form-item label="附件">
            <uploadFile :istb="isClearFile" @handleUploadFile="handleUploadFile"></uploadFile>
            <p class="file" v-if="!!fjList.length && !!wid" v-for="(fj,index) in fjList">
              {{fj.fjmc}}
              <i class="el-icon-close" @click="handleRemovefj(index)"></i>
            </p>
          </el-form-item>

          <el-form-item label="详情" required>
            <div style="width:800px;">
              <div id="summernoteTT"></div>
            </div>
          </el-form-item>
        </el-form>

        <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
          <el-button size="small" type="primary" @click="handleCommit">确认提交</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

    <tbrbmDialog
      :show.sync="tbrbmShow"
      :dwbh="fwdjData.dwbh"
      :dwmc="fwdjData.dwmc"
      @handleChooseDept="handleChooseDept"
    ></tbrbmDialog>
    <schoolList :show.sync="schoolShow" @handleCommit="handleCommitSchool"></schoolList>
  </div>
</template>

<script>
import uploadFile from "@/components/BusinessPage/upload.vue";
import tbrbmDialog from "@/views/BusinessPage/serviceCounter/tbrbm-dialog.vue";
import schoolList from "@/views/BusinessPage/serviceCounter/schoolList.vue";

export default {
  data() {
    return {
      tbrbmShow: false,
      schoolShow: false,
      userInfo: {},
      visible: this.show,
      isClearFile: false, //清除附件
      unitList: [],
      wtjbList: [
        { mc: "一般", label: "0" },
        { mc: "紧急", label: "1" },
        { mc: "宕机", label: "2" }
      ], // 问题级别
      xxxtList: [], // 信息系统
      fwqqlyList: [
        { mc: "电话", label: "0" },
        { mc: "邮件", label: "1" },
        { mc: "面谈", label: "2" },
        { mc: "QQ", label: "3" },
        { mc: "微信", label: "4" },
        { mc: "短信", label: "5" }
      ], // 服务请求来源

      xqflList: [],
      sfxsList: [
        {
          mc: "是",
          label: "1"
        },
        {
          mc: "否",
          label: "0"
        }
      ], //是否线上
      fjList: [], //编辑附件名称
      fwdjData: {
        dwbh: "",
        dwmc: "",
        tbr: "",
        lxfs: "",
        tbrzw: "",
        tbsj: "", //提报时间
        bmmc: "", //提报人部门
        bmbh: "", //提报人部门编号
        qqly: "", //请求来源
        yymc: "",
        yybh: "",
        cjdw: "", //承建单位
        cjdwbh: "", //承建单位编号
        dwlxr: "", //单位联系人
        dwlxfs: "", //单位联系方式
        wtjb: "",
        qwjjrq: "",
        bt: "",
        fjStr: "", //附件
        sm: ""
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
    },
    wid: {
      type: String,
      default: ""
    }
  },
  components: {
    uploadFile,
    tbrbmDialog,
    schoolList
  },
  methods: {
    handleRemovefj() {},
    // 选择部门
    handleChooseDept(data) {
      this.fwdjData.bmmc = data.title;
      this.fwdjData.bmbh = data.id;
      this.tbrbmShow = false;
    },

    // 更换应用系统
    handleChangeYyxt(val) {
      if (!val) return;
      let obj = {};
      obj = this.xxxtList.find(item => {
        return item.yybh === val;
      });
      this.fwdjData.yymc = obj.yymc; //应用名称
      this.fwdjData.cjdw = obj.cjdw;
      this.fwdjData.cjdwbh = obj.cjdwbh;
      this.fwdjData.dwlxr = obj.dwlxr;
      this.fwdjData.dwlxrgh = obj.dwlxrgh;
      this.fwdjData.dwlxfs = obj.dwlxfs;
    },
    // 更换单位
    handleCommitSchool(data) {
      if (!data) return;
      this.fwdjData.dwbh = data.wid;
      this.fwdjData.dwmc = data.mc;
      this.fwdjData.bmmc = "";
      this.getApp(this.fwdjData.dwbh);
      this.schoolShow = false;
    },
    // 上传附件
    handleUploadFile(data) {
      this.fjList = [];
      if (!!data.length) {
        this.fwdjData.fjStr = data[0];
      } else {
        this.fwdjData.fjStr = "";
      }
    },

    //提交需求
    handleCommit() {
      this.fwdjData.sm = $("#summernoteTT").summernote("code");
      if (!this.valiDate()) return;
      this.$post(this.API.saveServiceDesk, this.fwdjData).then(res => {
        if (res.state == "success") {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          $("#summernoteTT").summernote("code", "");
          this.isClearFile = !this.isClearFile;
          this.visible = false;
          this.$emit("handleCommitFwdj", "");
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },

    // 获取信息系统
    getApp(dwbh) {
      this.xxxtList = [];
      this.$get(this.API.appSelect, {
        dwbh: dwbh
      }).then(res => {
        if (res.state == "success") {
          this.xxxtList = res.data;
        } else {
        }
      });
    },

    // 获取单个服务台
    getServiceDesk(wid) {
      this.$get(this.API.getServiceDesk, {
        wid: wid
      }).then(res => {
        if (res.state == "success") {
          let files = [];
          if(!!res.data.files){
            res.data.files.forEach(element => {
              files.push(element.fjbh + "|" + element.fjmc);
            });
          }
          this.getApp(res.data.dwbh);
          this.fwdjData.wid = res.data.wid;
          this.fwdjData.dwbh = res.data.dwbh;
          this.fwdjData.dwmc = res.data.dwmc;
          this.fwdjData.tbr = res.data.tbr;
          this.fwdjData.lxfs = res.data.lxfs;
          this.fwdjData.tbrzw = res.data.tbrzw;
          this.fwdjData.tbsj = res.data.tbsj; //提报时间
          this.fwdjData.bmmc = res.data.bmmc; //提报人部门
          this.fwdjData.bmbh = res.data.bmbh; //提报人部门编号
          this.fwdjData.qqly = res.data.qqly; //请求来源
          this.fwdjData.yymc = res.data.yymc;
          this.fwdjData.yybh = res.data.yybh;
          this.fwdjData.cjdw = res.data.cjdw; //承建单位
          this.fwdjData.cjdwbh = res.data.cjdwbh; //承建单位编号
          this.fwdjData.dwlxr = res.data.dwlxr; //单位联系人
          this.fwdjData.dwlxfs = res.data.dwlxfs; //单位联系方式
          this.fwdjData.wtjb = res.data.wtjb;
          this.fwdjData.qwjjrq = res.data.qwjjrq;
          this.fwdjData.bt = res.data.bt;
          this.fwdjData.fjStr = files.join(","); //附件
          this.fwdjData.sm = res.data.sm;
          this.fjList = res.data.files;
          $("#summernoteTT").summernote("code", res.data.sm);
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    valiDate() {
      if (!this.fwdjData.dwmc) {
        this.$message({
          message: "请选择学校",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.tbr) {
        this.$message({
          message: "请输入提报人姓名",
          type: "warning"
        });
        return false;
      }
      if (
        !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.fwdjData.lxfs) ||
        !/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.fwdjData.lxfs)
      ) {
        this.$message({
          message: "请填写正确提报人联系方式",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.bmmc) {
        this.$message({
          message: "请选择提报人部门",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.tbsj) {
        this.$message({
          message: "请选择提报时间",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.qqly) {
        this.$message({
          message: "请选择服务请求来源",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.yymc) {
        this.$message({
          message: "请选择信息系统",
          type: "warning"
        });
        return false;
      }

      if (!this.fwdjData.wtjb) {
        this.$message({
          message: "请选择问题级别",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.qwjjrq) {
        this.$message({
          message: "请选择期望解决日期",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.bt) {
        this.$message({
          message: "请填写标题",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.sm || this.fwdjData.sm == "<p><br></p>") {
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

        if (!this.wid) {
          this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          if (this.userInfo.unitType != "0") {
            this.fwdjData.dwbh = this.userInfo.unitnum;
            this.fwdjData.dwmc = this.userInfo.unit;
          }
        } else {
          this.getServiceDesk(this.wid);
        }
      } else {
        this.fwdjData.wid = "";
        this.fwdjData.dwbh = this.fwdjData.dwmc = this.fwdjData.tbr = this.fwdjData.lxfs = this.fwdjData.tbrzw = this.fwdjData.tbsj = this.fwdjData.bmmc = this.fwdjData.bmbh = this.fwdjData.qqly = this.fwdjData.yymc = this.fwdjData.yybh = this.fwdjData.cjdw = this.fwdjData.cjdwbh = this.fwdjData.dwlxr = this.fwdjData.dwlxfs = this.fwdjData.wtjb = this.fwdjData.qwjjrq = this.fwdjData.bt = this.fwdjData.fjStr = this.fwdjData.sm =
          "";
        $("#summernoteTT").summernote("code", "");
        this.isClearFile = !this.isClearFile;
      }
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

.demand-textarea > p {
  width: 125px;
  text-align: right;
  padding-right: 12px;
  font-weight: 700;
}

.demand-textarea > p::before {
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
