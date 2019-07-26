<template>
  <div class="dialog-container" >
    <el-dialog
      title="我要提需求"
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
          :model="demandData"
          :inline="true"
          size="mini"
          label-width="135px"
        >
          <el-form-item label="项目名称" required>
            <el-input
              size="mini"
              type="text"
              :style="{ width: 800 + 'px' }"
              v-model="demandData.xmmc"
              readonly
              placeholder="请选择项目"
            >
              <el-button
                :disabled="Type == 'disabled'"
                slot="append"
                icon="el-icon-circle-plus-outline"
                style="width:30px;padding:0 12px;"
                @click="adddemandtItem"
              ></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="项目状态" required>
            <el-input size="mini" type="text" style="width:325px" v-model="xmzt" readonly></el-input>
          </el-form-item>
          <el-form-item label="需求分类" required>
            <el-select
              :disabled="Type == 'disabled'||Type == 'editDisabled'"
              v-model="demandData.xqfl"
              size="mini"
              placeholder="请选择需求分类"
              style="width:325px"
            >
              <el-option
                v-for="(item, index) in xqflList"
                :key="index"
                :label="item.mc"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="提出老师" required>
            <el-select
              v-model="teacherData"
              size="mini"
              multiple
              placeholder="请选择提出老师"
              style="width:800px"
            >
              <el-option
                v-for="(tcls, index) in tclsList"
                :key="index"
                :label="tcls.username"
                :value="tcls.userid+','+tcls.username"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否线上" required>
            <el-select
              v-model="demandData.sfsx"
              size="mini"
              placeholder="请选择是否线上"
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

          <el-form-item label="模块" required>
            <el-cascader size="mini" style="width:325px" v-model="val" :props="defaultProps" :options="options" @change="handleItemChange"
            :show-all-levels="false"></el-cascader>
            <!-- <div>
              <el-input
                size="mini"
                style="width:325px"
                v-model="demandData.cpbjmc"
                readonly
                ref="inputcp"
                placeholder="请选择模块"
                @focus="handleShowCp"
              
              ></el-input>
              <div class="cptree" v-show="cpTreeShow">
                <cpTree @handleNodeClick="handleNodeClick"></cpTree>
              </div>
            </div> -->
          </el-form-item>

          <el-form-item label="CROWD业务线" required>
            <el-select
              v-model="demandData.crowdywxbh"
              size="mini"
              placeholder="请选择CROWD业务线"
              style="width:325px"
              @change="handleChangeCrowdYwx"
            >
              <el-option
                v-for="(ywx, index) in crowdywxList"
                :key="index"
                :label="ywx.lbmc"
                :value="ywx.lbdm"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="CROWD产品" required>
            <el-select
              v-model="demandData.crowdcpbh"
              size="mini"
              placeholder="请选择CROWD产品"
              style="width:325px"
              @change="handleChangeCrowdCp"
            >
              <el-option
                v-for="(cp, index) in crowdcpList"
                :key="index"
                :label="cp.lbmc"
                :value="cp.lbdm"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="期望设计完成日期" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="demandData.qwsjwcrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="期望开发交付日期" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="demandData.qwkfjfrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="关联需求" required v-if="demandData.xqfl != 1">
            <el-input
              type="text"
              style="width: 800px"
              v-model="glxqMc"
              readonly
              placeholder="请选择需求"
            >
              <!-- 发布需求禁用 -->
              <el-button
                :disabled="Type == 'disabled'||Type == 'editDisabled' || !demandData.xmbh"
                slot="append"
                icon="el-icon-circle-plus-outline"
                style="width:30px;padding:0 12px;"
                @click="handleRelaseDemand"
              ></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="需求标题" required>
            <el-input
              size="mini"
              v-model="demandData.bt"
              type="text"
              placeholder="标题"
              style="width:800px;"
            ></el-input>
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

    <el-dialog
      title="选择项目"
      :visible.sync="dialogdemandVisible"
      :close-on-click-modal="false"
      width="800px"
      top="30px"
      append-to-body
    >
      <div style="padding:10px;">
        <itemChoose @handleEdit="handleEdit"></itemChoose>
      </div>
    </el-dialog>

    <xqlistDilog :show.sync="demandListVisible" :xmbh="demandData.xmbh" @handleChooseDemand="handleChooseDemand"></xqlistDilog>
    
  </div>
</template>

<script>
import axios from "axios";
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
import uploadFile from "@/components/BusinessPage/upload.vue";
import { getProjects } from "@/api/xmkb.js";
import xqlistDilog from "@/views/BusinessPage/demand/xqlist-dialog.vue";
import cpTree from "@/views/BusinessPage/demand/cpTree.vue";

import {
  formatTime,
  getMenu,
  getSession,
  getMyDate,
  GetDateStr
} from "@/utils/util.js";

export default {
  data() {
    return {
      isInnerItem: false, // 是否为内部项目
      dialogdemandVisible: false,
      demandListVisible: false, //需求列表
      visible: this.show,
      isClearFile: false, //清除附件
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
      crowdywxList: [], //crowd业务线
      crowdcpList: [], //crowd产品
      cpData:[],//当前产品树 选择产品
      val: [],
      teacherData: [],
      fwznfjMc: "", //编辑附件名称
      glxqMc: "", //关联需求名称
      demandData: {
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
    },
    demandInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    Type: {
      type: String,
      default: ""
    },
    btnbh:{
      type: String,
      default: ""
    }
  },
  components: {
    itemChoose,
    uploadFile,
    xqlistDilog,
    cpTree
  },
  methods: {
    // 编辑附件
    handleRemoveFwznfj() {
      this.fwznfjMc = "";
      this.demandData.xqfjwid = "";
      this.demandData.xqfjmc = "";
    },
    // 选择产品
    handleNodeClick(data){
      if(!data.children && !!data.isOptional){
         this.demandData.cpbjbh = data.id;
         this.demandData.cpbjmc = data.title;
         this.cpTreeShow = false;
      }
    },
    // 选择产品
    handleItemChange() {
      this.cpData = this.getCascaderObj(this.val, this.options);
      
      if(!this.cpData[this.cpData.length-1].isOptional){
        this.$alert('模块选择有误，请选择到产品模块~', '提示', {
          confirmButtonText: '确定',
          type:'warning',
          callback: action => {}
        });
        this.cpData = [];
      }
    },

    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.id == value) {
            opt = itm.children;
            return itm;
          }
        }
        return null;
      });
    },
    // 上传附件
    handleUploadFile(data) {
      this.fwznfjMc = "";
      if (!!data.length) {
        this.demandData.xqfjwid = data[0].split("|")[0];
        this.demandData.xqfjmc = data[0].split("|")[1];
      } else {
        this.demandData.xqfjwid = "";
        this.demandData.xqfjmc = "";
      }
    },

    // 选择crowd业务线
    handleChangeCrowdYwx(val) {
      this.crowdywxList.forEach(ele => {
        if (ele.lbdm == val) {
          this.demandData.crowdywxmc = ele.lbmc;
        }
      });
      // 获取产品
      this.getCrowdCp(val);
    },

    // 选择crowd产品
    handleChangeCrowdCp(val) {
      this.crowdcpList.forEach(ele => {
        if (ele.lbdm == val) {
          this.demandData.crowdcpmc = ele.lbmc;
        }
      });
    },

    // 添加项目
    handleEdit(data) {
      this.xmzt = data.xmzt;
      this.demandData.xmbh = data.xmbh;
      this.demandData.xmmc = data.xmmc;
      this.getUsers();
      this.dialogdemandVisible = false;
    },
    // 选择关联需求
    handleChooseDemand(data) {
      this.glxqMc = "[" + data.xqbh + "]" + data.bt;
      this.demandData.glxqWid = data.wid;
    },

    //选择项目
    adddemandtItem() {
      this.dialogdemandVisible = true;
    },
    // 选择需求
    handleRelaseDemand() {
      this.demandListVisible = true;
    },

    //提交需求
    handleCommit() {
      if (this.demandData.xqfl == 1) {
        this.demandData.glxqWid = "";
      }
      if (!!this.demandInfo.wid && this.Type.includes('edit')) {
        this.demandData.wid = this.demandInfo.wid;
      }
      if(!!this.btnbh){
        this.demandData.btnbh = this.btnbh;
      }
    
      this.demandData.cpbjbh = !this.cpData.length?'':this.cpData[this.cpData.length - 1].id;
      this.demandData.cpbjmc = !this.cpData.length?'':this.cpData[this.cpData.length - 1].title;
      this.demandData.teacherData = this.teacherData.join("|");
      this.demandData.nr = $("#summernoteTT").summernote("code");

      if (!this.valiDate()) return;
      this.$post(this.API.submitDemand, this.demandData).then(res => {
        if (res.state == "success") {
          this.$message({ message: "提交成功", type: "success" });
          $("#summernoteTT").summernote("code", "");
          this.isClearFile = !this.isClearFile;
          this.visible = false;
          this.$emit("handleCommitDemand", this.Type);
        } else {
          this.$message({ message: res.msg, type: "warning" });
        }
      });
    },

    // 获取项目对应的产品
    queryDemandProductTree(dosuccess) {
      this.xmcpList = [];
      this.$get(this.API.demandProductTree, {}).then(res => {
        if (res.state == "success") {
          this.options = res.data;
          dosuccess();
        } else {
        }
      }),
        // 获取业务线
        this.$get(this.API.getCrowdYwx, {}).then(res => {
          if (res.state == "success") {
            this.crowdywxList = res.data;
          }
        });
    },

    // 获取产品
    getCrowdCp(ywxbm) {
      this.$get(this.API.getCrowdCp, {
        ywxbm: ywxbm
      }).then(res => {
        if (res.state == "success") {
          this.crowdcpList = res.data;
        }
      });
    },

    // 获取学校老师
    getUsers() {
      this.$get(this.API.getUsers, {
        curPage: 1,
        pageSize: 999,
        xmbh: this.demandData.xmbh,
        unitType: 1
      }).then(res => {
        if (res.state == "success") {
          this.tclsList = res.data.rows;
        } else {
        }
      });
    },

    // 获取项目
    getProjects() {
      getProjects({
        curPage: 1,
        pageSize: 2,
        keyword: "",
        xmlb: "",
        sfgx: "",
        xmzt: "1,2,3",
        pl: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.records == 1 && data.data.rows[0].xmzt != "过保") {
            this.xmzt = data.data.rows[0].xmzt;
            this.xmmc = data.data.rows[0].xmmc;
            this.xmbh = data.data.rows[0].xmbh;
          }
        }
      });
    },

    valiDate() {
      if (!this.demandData.xmbh) {
        this.$message({ message: "请选择项目编号", type: "warning" });
        return false;
      }
      if (!this.demandData.xqfl) {
        this.$message({ message: "请选择需求分类", type: "warning" });
        return false;
      }
      if (!this.demandData.teacherData) {
        this.$message({ message: "请选择提出老师", type: "warning" });
        return false;
      }
      if (!this.demandData.cpbjbh) {
        this.$message({ message: "请选择产品或产品选择有误（请注意需选择到模块级~）", type: "warning" });
        return false;
      }
      if (!this.demandData.crowdywxbh) {
        this.$message({ message: "请选择CROWD业务线", type: "warning" });
        return false;
      }
      if (!this.demandData.crowdcpbh) {
        this.$message({ message: "请选择CROWD产品", type: "warning" });
        return false;
      }
      if (!this.demandData.qwsjwcrq) {
        this.$message({ message: "请选择期望设计完成日期", type: "warning" });
        return false;
      }
      if (!this.demandData.qwkfjfrq) {
        this.$message({ message: "请选择期望开发交付日期", type: "warning" });
        return false;
      }
      if (this.demandData.xqfl != 1 && !this.demandData.glxqWid) {
        this.$message({ message: "请选择关联的需求", type: "warning" });
        return false;
      }
      if (!this.demandData.xqfjwid) {
        this.$message({ message: "请上传附件", type: "warning" });
        return false;
      }
      if (!this.demandData.bt) {
        this.$message({ message: "请填写需求标题", type: "warning" });
        return false;
      }
      if (!this.demandData.nr || this.demandData.nr == "<p><br></p>") {
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
          if (this.Type == "edit" || this.Type == "editDisabled") {
            $("#summernoteTT").summernote("code", this.demandInfo.nr);
          }
        });

        //获取需求分类
        if (!getSession("DemandType")) {
          getMenu("DemandType", this.xqflList); //获取需求分类
        } else {
          this.xqflList = getSession("DemandType");
        }
        this.queryDemandProductTree(()=>{
          if(this.Type == "edit" || this.Type == "editDisabled"){
            this.val = this.demandInfo.syfjcpbh.split(',').reverse();
            this.cpData = this.getCascaderObj(this.val, this.options);
          }
        });
        this.teacherData = [];
        // 编辑
        if (this.Type == "edit" || this.Type == "editDisabled") {
          $("#summernoteTT").summernote("code", this.demandInfo.nr);
          this.xmzt = this.demandInfo.xmzt;
          this.demandData.xmbh = this.demandInfo.xmbh;
          this.demandData.xmmc = this.demandInfo.xmmc;
          this.demandData.xqfl = this.Type == "editDisabled"?'3':this.demandInfo.xqfl;
          this.demandData.sfsx = this.demandInfo.sfsx;
          this.demandData.cpbjbh = this.demandInfo.cpbjbh;
          this.demandData.cpbjmc = this.demandInfo.cpbjmc;
          this.demandData.crowdywxbh = this.demandInfo.crowdywxbh;
          this.demandData.crowdywxmc = this.demandInfo.crowdywxmc;
          this.getCrowdCp(this.demandInfo.crowdywxbh);
          this.demandData.crowdcpbh = this.demandInfo.crowdcpbh;
          this.demandData.crowdcpmc = this.demandInfo.crowdcpmc;
          this.demandData.qwsjwcrq = this.demandInfo.qwsjwcrq;
          this.demandData.qwkfjfrq = this.demandInfo.qwkfjfrq;
          this.demandData.bt = this.demandInfo.bt;
          this.demandData.xqfjwid = this.demandInfo.xqfjwid;
          this.demandData.xqfjmc = this.demandInfo.xqfjmc;
          this.fwznfjMc = this.demandInfo.xqfjmc;
          this.glxqMc = !this.demandInfo.glxqbh?'':("[" + this.demandInfo.glxqbh + "]" + this.demandInfo.glxqbt);//关联需求名称
          this.demandData.glxqWid = this.demandInfo.glxqwid;//关联需求wid
          this.getUsers();
          let tclsbh = this.demandInfo.tclsbh.split(',');
          let tclsxm = this.demandInfo.tcls.split(',');  
          
          tclsbh.forEach((ele,i,arr)=>{
            this.teacherData.push(tclsbh[i]+','+tclsxm[i])
          })
          
        }
        // 发布需求
        if(this.Type == "disabled"){
          this.demandData.xqfl = '3';
          this.xmzt = this.demandInfo.xmzt;
          this.demandData.xmbh = this.demandInfo.xmbh;
          this.demandData.xmmc = this.demandInfo.xmmc;
          this.glxqMc = "["+ this.demandInfo.xqbh + "]" + this.demandInfo.bt;//关联需求名称
          this.demandData.glxqWid = this.demandInfo.wid;//关联需求wid
          this.getUsers();
        }

      } else {
        // $('#summernoteTT').summernote('destroy');
        this.xmzt = this.glxqMc = "";
        this.demandData.cpbjbh = "";
        this.demandData.teacherData = "";
        this.demandData.xmbh = "";
        this.demandData.xmmc = "";
        this.demandData.xqfl = "";
        this.demandData.teacherData = "";
        this.demandData.sfsx = "0";
        this.demandData.cpbjbh = "";
        this.demandData.cpbjmc = "";
        this.demandData.crowdywxbh = ""; //crowd 业务线编号
        this.demandData.crowdywxmc = ""; //crowd 业务线名称
        this.demandData.crowdcpbh = ""; //crowd 产品编号
        this.demandData.crowdcpmc = ""; //crowd 产品名称
        this.demandData.qwsjwcrq = "";
        this.demandData.qwkfjfrq = "";
        this.demandData.glxqWid = "";
        this.demandData.bt = "";
        this.demandData.xqfjwid = "";
        this.demandData.xqfjmc = "";
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
.cptree{
  position: absolute;
  top: 0;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #E4E7ED;
  border-radius:4px;
  top: 40px;
  z-index: 10200;
  width: 325px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: auto;
}
</style>
