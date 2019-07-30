<template>
  <div class="dialog-container">
    <el-dialog
      title="应用配置管理维护"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="layout">
        <el-form
          style="width:950px;margin:0 auto"
          class="demo-ruleForm"
          :model="fwdjData"
          :inline="true"
          size="mini"
          label-width="135px"
        >
          <el-form-item label="项目名称" required>
            <el-input
              size="mini"
              type="text"
              :style="{ width: 800 + 'px' }"
              v-model="fwdjData.xmmc"
              readonly
              placeholder="请选择项目"
            >
              <el-button
                slot="append"
                icon="el-icon-circle-plus-outline"
                style="width:30px;padding:0 12px;"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="应用名称" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbr" ></el-input>
          </el-form-item>
          <el-form-item label="使用部门" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs" ></el-input>
          </el-form-item>
          <el-form-item label="业务部门联系人" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs" ></el-input>
          </el-form-item>
          <el-form-item label="业务部门联系方式" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs" ></el-input>
          </el-form-item>
          <el-form-item label="信息中心联系人" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs" ></el-input>
          </el-form-item>
          <el-form-item label="信息中心联系方式" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs" ></el-input>
          </el-form-item>
          <el-form-item label="上线日期" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="fwdjData.qwsjwcrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="服务到期日期" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="fwdjData.qwsjwcrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="使用对象" required>
            <el-select
              v-model="fwdjData.sfsx"
              size="mini"
              placeholder="请选择服务请求来源"
              style="width:325px"
            >
              <el-option
                v-for="(item, index) in sfxsList"
                :key="index"
                :label="item.mc"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="承建单位" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.tbfs" ></el-input>
          </el-form-item>

           <el-form-item label="单位联系人" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.dwlxr" ></el-input>
          </el-form-item>
           <el-form-item label="单位联系方式" required>
            <el-input size="mini" type="text" style="width:325px" v-model="fwdjData.lxfs" ></el-input>
          </el-form-item>


          <el-form-item label="访问地址" required>
            <el-input
              size="mini"
              v-model="fwdjData.bt"
              type="text"
              placeholder="标题"
              style="width:800px;"
            ></el-input>
          </el-form-item>
           <el-form-item label="备注" required>
            <el-input
              size="mini"
              v-model="fwdjData.bt"
              type="textarea"
              placeholder="标题"
              style="width:800px;"
            ></el-input>
          </el-form-item>
       </el-form>

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

export default {
  data() {
    return {
      visible: this.show,
      sfxsList:[],
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
  components: {},
  methods: {


    //提交需求
    handleCommit() {
      if (!this.valiDate()) return;
      this.$post(this.API.submitlayout, this.fwdjData).then(res => {
        if (res.state == "success") {
          this.$message({ message: "提交成功", type: "success" });
          $("#summernoteTT").summernote("code", "");
          this.isClearFile = !this.isClearFile;
          this.visible = false;
          this.$emit("handleCommitlayout", this.Type);
        } else {
          this.$message({ message: res.msg, type: "warning" });
        }
      });
    },

    valiDate() {
      if (!this.fwdjData.xmbh) {
        this.$message({ message: "请选择项目编号", type: "warning" });
        return false;
      }
      if (!this.fwdjData.xqfl) {
        this.$message({ message: "请选择需求分类", type: "warning" });
        return false;
      }
      if (!this.fwdjData.teacherData) {
        this.$message({ message: "请选择提出老师", type: "warning" });
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
        this.$message({ message: "请选择CROWD业务线", type: "warning" });
        return false;
      }
      if (!this.fwdjData.crowdcpbh) {
        this.$message({ message: "请选择CROWD产品", type: "warning" });
        return false;
      }
      if (!this.fwdjData.qwsjwcrq) {
        this.$message({ message: "请选择期望设计完成日期", type: "warning" });
        return false;
      }
      if (!this.fwdjData.qwkfjfrq) {
        this.$message({ message: "请选择期望开发交付日期", type: "warning" });
        return false;
      }
      if (this.fwdjData.xqfl != 1 && !this.fwdjData.glxqWid) {
        this.$message({ message: "请选择关联的需求", type: "warning" });
        return false;
      }
      if (!this.fwdjData.xqfjwid) {
        this.$message({ message: "请上传附件", type: "warning" });
        return false;
      }
      if (!this.fwdjData.bt) {
        this.$message({ message: "请填写需求标题", type: "warning" });
        return false;
      }
      if (!this.fwdjData.nr || this.fwdjData.nr == "<p><br></p>") {
        this.$message({ message: "请填写需求内容", type: "warning" });
        return false;
      }
      return true;
    }
  },
  watch: {
    show() {
      this.visible = this.show;
      if (this.show) {

      } else {
      }
    }
  }
};
</script>
<style scoped lang="scss">
.layout {
  padding: 10px 0;
}

div.el-form-item {
  margin-bottom: 8px !important;
}

.layout-textarea {
  width: 950px;
  margin: 0 auto;
}

.layout-textarea > p {
  width: 125px;
  text-align: right;
  padding-right: 12px;
  font-weight: 700;
}

.layout-textarea > p::before {
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

</style>
