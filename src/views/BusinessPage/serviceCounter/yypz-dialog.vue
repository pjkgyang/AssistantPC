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
          ref="ruleForm"
          :model="yypzData"
          :inline="true"
          size="mini"
          label-width="135px"
        >
          <div class="table_title">
            <h5>基本信息</h5>
          </div>
          <el-form-item label="应用名称" required>
            <el-input
              size="mini"
              type="text"
              placeholder="请输入应用名称"
              style="width:325px"
              v-model="yypzData.yymc"
            ></el-input>
          </el-form-item>

          <el-form-item label="上线日期">
            <el-date-picker
              :clearable="false"
              size="mini"
              v-model="yypzData.sxrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="使用对象" required>
            <el-select v-model="yypzData.sydx" multiple placeholder="请选择使用对象" style="width:325px">
              <el-option
                v-for="(sfdx,index) in sydxList"
                :key="index"
                :label="sfdx.text"
                :value="sfdx.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="系统状态">
            <el-select
              v-model="yypzData.xtzt"
              size="mini"
              placeholder="请选择系统状态"
              style="width:325px"
            >
              <el-option
                v-for="(item, index) in xxztList"
                :key="index"
                :label="item.mc"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="承建单位" required>
            <el-select
              v-model="yypzData.cjdw"
              size="mini"
              placeholder="请选择承建单位"
              style="width:325px"
              @change="handleChangeCjdw"
            >
              <el-option
                v-for="(item, index) in cjdwList"
                :key="index"
                :label="item.mc"
                :value="item.wid"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="服务到期日期">
            <el-date-picker
              :clearable="false"
              size="mini"
              v-model="yypzData.fwdqrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:325px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="承建单位联系人">
            <el-input
              v-if="sfjz != '1'"
              size="mini"
              type="text"
              placeholder="请输入单位联系方式"
              style="width:325px"
              v-model="yypzData.cjdwlxr"
            ></el-input>

            <el-select
              v-if="sfjz == '1'"
              v-model="yypzData.cjdwlxrgh"
              size="mini"
              placeholder="请选择单位联系人(可搜索)"
              style="width:325px"
              filterable
              @change="handleChangeDwlxr"
            >
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :label="item.username"
                :value="item.usercode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位联系方式">
            <el-input
              size="mini"
              type="text"
              placeholder="请输入单位联系方式"
              style="width:325px"
              v-model="yypzData.cjdwlxfs"
            ></el-input>
          </el-form-item>

          <el-form-item label="业务部门联系人">
            <el-input
              size="mini"
              type="text"
              placeholder="请输入业务部门联系人"
              style="width:325px"
              v-model="yypzData.ywbmlxr"
            ></el-input>
          </el-form-item>
          <el-form-item label="业务部门联系方式">
            <el-input
              size="mini"
              type="text"
              placeholder="请输入业务部门联系方式"
              style="width:325px"
              v-model="yypzData.ywbmlxfs"
            ></el-input>
          </el-form-item>
          <el-form-item label="信息中心联系人">
            <el-input
              size="mini"
              type="text"
              placeholder="请输入信息中心联系人"
              style="width:325px"
              v-model="yypzData.xxzxlxr"
            ></el-input>
          </el-form-item>
          <el-form-item label="信息中心联系方式">
            <el-input
              size="mini"
              type="text"
              placeholder="请输入信息中心联系方式"
              style="width:325px"
              v-model="yypzData.xxzxlxfs"
            ></el-input>
          </el-form-item>

          <el-form-item label="访问地址" prop="fwdz">
            <el-input
              size="mini"
              v-model="yypzData.fwdz"
              type="text"
              style="width:800px"
              placeholder="必须是(http或https)地址"
            ></el-input>
          </el-form-item>

          <el-form-item label="使用情况">
            <el-radio-group v-model="yypzData.syqk">
              <el-radio label="好">好</el-radio>
              <el-radio label="差">差</el-radio>
            </el-radio-group>
          </el-form-item>

          <div class="table_title">
            <h5>部署信息</h5>
          </div>

          <el-form-item label="用途">
            <el-select v-model="yypzData.yt" size="mini" placeholder="请选择用途" style="width:325px">
              <el-option
                v-for="(item, index) in ytList"
                :key="index"
                :label="item.mc"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作系统">
            <el-select
              v-model="yypzData.czxtlx"
              size="mini"
              placeholder="请选择操作系统"
              style="width:325px"
            >
              <el-option
                v-for="(item, index) in czxtList"
                :key="index"
                :label="item.mc"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务器ip">
            <el-input
              size="mini"
              v-model="yypzData.fwqip"
              type="text"
              style="width:325px"
              placeholder="请输入服务器ip"
            ></el-input>
          </el-form-item>
          <el-form-item label="服务器名称">
            <el-input
              size="mini"
              v-model="yypzData.fwqmc"
              type="text"
              style="width:325px"
              placeholder="请输入服务器名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="端口">
            <el-input
              size="mini"
              v-model="yypzData.fwqdk"
              type="text"
              style="width:325px"
              placeholder="请输入端口"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              size="mini"
              v-model="yypzData.fwqyhm"
              type="text"
              style="width:325px"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <div id="summernoteYy"></div>
          </el-form-item>

          <el-form-item>
            <div style="width:950px;text-align:right">
              <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
              <el-button @click="visible = false">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    // var fwdzValid = (rule, value, callback) => {
    //   if (!!value && !/(http|https):\/\/([\w.]+\/?)\S*/.test(value)) {
    //     return callback(new Error("请输入正确地址"));
    //   }
    // };
    // var ywbmlxfsValid = (rule, value, callback) => {
    //   if (
    //     !!value &&
    //     (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value) ||
    //       !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))
    //   ) {
    //     return callback(new Error("请输入正确联系方式"));
    //   }
    // };

    return {
      visible: this.show,
      sydxList: [], //使用对象
      cjdwList: [], //承建单位列表
      czxtList: [
        { mc: "UNIX", label: "1" },
        { mc: "LINUX", label: "2" },
        { mc: "MacOS", label: "3" },
        { mc: "Windows", label: "4" }
      ], //操作系统列表
      ytList: [
        { mc: "应用服务", label: "1" },
        { mc: "数据库服", label: "2" },
        { mc: "文件服务", label: "3" },
        { mc: "备份", label: "4" }
      ],
      xxztList: [{ label: "0", mc: "已完成" }, { label: "1", mc: "未完成" }],
      userList: [],
      yypzData: {
        yymc: "",
        ssbm: "",
        sxrq: "", //上线日期
        fwdqrq: "", //服务到期日期
        sydx: [],
        cjdw: "",
        cjdwbh: "",
        cjdwlxr: "", //承建单位联系人
        cjdwlxfs: "", //承建单位联系方式
        cjdwlxrgh:"",
        fwdz: "http://", //访问地址
        xtzt: "", //系统状态
        syqk:"",

        ywbmlxr: "", //业务部门联系人
        ywbmlxfs: "", //业务部门联系方式
        xxzxlxr: "", //信息中心人
        xxzxlxfs: "", //信息中心联系方式
        bz: "", //备注
        yt: "", //用途
        czxtlx: "", //操作系统类型
        czxtbb: "", //操作系统版本
        fwqip: "", //服务器ip
        fwqmc: "", //服务器名称
        fwqdk: "", //服务器端口
        fwqyhm: "" //服务器用户名
      },
      sfjz: "", //是否金智
      // rules: {
      //   yymc: [{ required: true, message: "请输入应用名称", trigger: "blur" }],
      //   ssbm: [{ required: true, message: "请输入所属部门", trigger: "blur" }],
      //   sydx: [
      //     { required: true, message: "请选择使用对象", trigger: "change" }
      //   ],
      //   cjdw: [
      //     { required: true, message: "请选择承建单位", trigger: "change" }
      //   ],
      //   fwdz: [{ validator: fwdzValid, trigger: "blur" }],
      //   ywbmlxfs: [{ validator: ywbmlxfsValid, trigger: "blur" }],
      //   xxzxlxfs: [{ validator: ywbmlxfsValid, trigger: "blur" }]
      // },
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
    detailInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {},
  methods: {
    submitForm(formName) {
      if (!this.valiDate()) return;
      this.yypzData.bz = $("#summernoteYy").summernote("code");
      this.$emit("handleCommitYypz", this.yypzData);

    },
    // 单位联系人
    handleChangeDwlxr(val) {
      let obj = {};
      obj = this.userList.find(item => {
        return item.usercode == val; //筛选出匹配数据
      });
      this.yypzData.cjdwlxr = obj.username;
      this.yypzData.cjdwlxfs = obj.mobile;
    },

    // 选择承建单位
    handleChangeCjdw(val) {
      let obj = {};
      obj = this.cjdwList.find(item => {
        return item.wid == val; //筛选出匹配数据
      });
      this.yypzData.cjdw = obj.mc;
      this.yypzData.cjdwbh = obj.wid;
      this.sfjz = obj.sfjz;
      this.yypzData.cjdwlxr = ""; //承建单位联系人
      this.yypzData.cjdwlxrgh = ""; //承建单位联系人工号
      this.yypzData.cjdwlxfs = ""; //承建单位联系方式

      if (obj.sfjz == "1") {
        this.getUsers();
      }
    },
    getUsers() {
      this.$get(this.API.getUsers, {
        curPage: 1,
        pageSize: 9999,
        unitType: 0,
        keyword: "",
        dept: "01AM"
      }).then(res => {
        if (res.state == "success") {
          this.userList = res.data.rows;
        } else {
        }
      });
    },
    //获取承建单位列表
    pageCjdw(doSuccess) {
      this.$get(this.API.serviceObjects, {}).then(res => {
        if (res.state == "success") {
          this.sydxList = res.data;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });

      this.$get(this.API.pageCjdw, {
        curPage: 1,
        pageSize: 999
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.cjdwList = [];
          } else {
            this.cjdwList = res.data.rows;
          }
          doSuccess(this.cjdwList);
        } else {
        }
      });
    },

    valiDate() {
      if (!this.yypzData.yymc) {
        this.$message({ message: "请输入应用名称", type: "warning" });
        return false;
      }
      if (!this.yypzData.sydx.length) {
        this.$message({ message: "请选择使用对象", type: "warning" });
        return false;
      }
      if (!this.yypzData.cjdw) {
        this.$message({ message: "请选择承建单位", type: "warning" });
        return false;
      }
      if (
        !!this.yypzData.fwdz &&
        !/(http|https):\/\/([\w.]+\/?)\S*/.test(this.yypzData.fwdz)
      ) {
        this.$message({ message: "请输入正确访问地址", type: "warning" });
        return false;
      }
      if (
        !!this.yypzData.ywbmlxfs &&
        (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.yypzData.ywbmlxfs) ||
          !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.yypzData.ywbmlxfs))
      ) {
        this.$message({
          message: "请输入正确业务部门联系方式",
          type: "warning"
        });
        return false;
      }
      if (
        !!this.yypzData.xxzxlxfs &&
        (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.yypzData.xxzxlxfs) ||
          !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.yypzData.xxzxlxfs))
      ) {
        this.$message({
          message: "请输入正确信息中心联系方式",
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
          $("#summernoteYy").summernote({
            dialogsInBody: true,
            placeholder: "请输入内容",
            focus: true,
            height: 200,
            width: 800,
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
          if (JSON.stringify(this.detailInfo) != "{}") {
            $("#summernoteYy").summernote("code", this.detailInfo.bz);
          }
        });

        this.pageCjdw((data)=>{
          if(JSON.stringify(this.detailInfo) != "{}"){
            let obj = data.find(item=>{
              return item.wid == this.detailInfo.cjdwbh;
            })
            this.sfjz = obj.sfjz;
          }
        });

        if (JSON.stringify(this.detailInfo) != "{}") {
          this.getUsers();
          this.yypzData.yymc = this.detailInfo.yymc;
          this.yypzData.ssbm = this.detailInfo.ssbm;
          this.yypzData.sxrq = this.detailInfo.sxrq;
          this.yypzData.fwdqrq = this.detailInfo.fwdqrq;
          this.yypzData.cjdw = this.detailInfo.cjdw;
          this.yypzData.cjdwbh = this.detailInfo.cjdwbh;
          this.yypzData.cjdwlxrgh = this.detailInfo.cjdwlxrgh;; //承建单位联系人工号
          
          this.yypzData.syqk = this.detailInfo.syqk;
          this.yypzData.cjdwlxr = this.detailInfo.cjdwlxr;
          this.yypzData.cjdwlxfs = this.detailInfo.cjdwlxfs;
          this.yypzData.fwdz = this.detailInfo.fwdz;
          this.yypzData.sydx = !this.detailInfo.fwdxwid?[]:this.detailInfo.fwdxwid.split(",");

          this.yypzData.xtzt = this.detailInfo.xtzt;
          this.yypzData.ywbmlxr = this.detailInfo.ywbmlxr;
          this.yypzData.ywbmlxfs = this.detailInfo.ywbmlxfs;
          this.yypzData.xxzxlxr = this.detailInfo.xxzxlxr;
          this.yypzData.xxzxlxfs = this.detailInfo.xxzxlxfs;

          this.yypzData.yt = this.detailInfo.yt;
          this.yypzData.czxtlx = this.detailInfo.czxtlx;
          this.yypzData.fwqip = this.detailInfo.fwqip;

          this.yypzData.fwqmc = this.detailInfo.fwqmc;
          this.yypzData.fwqdk = this.detailInfo.fwqdk;
          this.yypzData.fwqyhm = this.detailInfo.fwqyhm;
          this.yypzData.wid = this.detailInfo.wid;
        }
      } else {
          this.yypzData.yymc = "";
          this.yypzData.ssbm = "";
          this.yypzData.sxrq = "";
          this.yypzData.fwdqrq = "";
          this.yypzData.cjdw = "";
          this.yypzData.cjdwbh = "";
          this.yypzData.cjdwlxr = "";
          this.yypzData.cjdwlxfs = "";
          this.yypzData.syqk = "";


          this.yypzData.cjdwlxrgh = "";
          this.yypzData.fwdz = "";
          this.yypzData.sydx = [];

          this.yypzData.xtzt = "";
          this.yypzData.ywbmlxr = "";
          this.yypzData.ywbmlxfs = "";
          this.yypzData.xxzxlxr = "";
          this.yypzData.xxzxlxfs = "";

          this.yypzData.yt = "";
          this.yypzData.czxtlx = "";
          this.yypzData.fwqip = "";

          this.yypzData.fwqmc = "";
          this.yypzData.fwqdk = "";
          this.yypzData.fwqyhm = "";
          this.yypzData.wid = "";
          $("#summernoteYy").summernote("code", '');
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
