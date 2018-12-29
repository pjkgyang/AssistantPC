<template>
  <div>   
              <div v-if="zdTitle == '运营人员转发'" colcenter style="margin:5px 0;">
                <div v-if="!lshjShown" flex>
                    <p class="query-title">类型:</p>
                    <p class="query-list"  @click="handleYYRYLX">
                        <span data-type=""  :class="{'bg-active':lx == ''}">全部</span>
                        <span v-for="(yylx,index) in yyryLx" :data-type="yylx.label" :key="index" :class="{'bg-active':lx == yylx.label}">{{yylx.mc}}</span>
                    </p>
                 </div>
                 <div v-if="lshjShown" flex>
                    <p class="query-title" style="width:110px;">流程环节:</p>
                    <el-select v-model="lchj" placeholder="请选择" size="mini" style="width:223px;">
                      <el-option v-for="lcbj in lchjList" :key="lcbj.value" :label="lcbj.mc" :value="lcbj.bh"></el-option>
                    </el-select>
                 </div>&#x3000;
                  <el-button type="info" size="mini" plain @click="chooseLchj">{{!lshjShown?'选择流程环节':'选择类型'}}</el-button>
              </div>
              <div  flex class="mg-12" v-if="zdTitle == '运营人员转发' || zdTitle == '指定解决人'">
                    <p>
                       <span class="query-title before-require" style="width:110px;">期望解决日期:</span>
                       <el-date-picker size="mini" v-model="qwjjrqZf"  type="date" placeholder="选择期望解决日期"  value-format="yyyy-MM-dd"></el-date-picker> 
                    </p>
              </div>
              <el-input v-if="zdTitle !== '运营人员转发' || !lshjShown" size="mini" v-model="cpKeyword" :placeholder="zdTitle === '运营人员转发'?'请输入责任人姓名/编号/产品线':'请输入责任人姓名/编号'" style="width:80%;margin:0 0 5px 0" @change="queryComplainUser"></el-input> &#x3000;
              <el-button v-if="zdTitle !== '运营人员转发' || !lshjShown" size="mini" type="primary" @click="queryComplainZRR">查询</el-button>
              <div v-if="zdTitle === '指定产品接口人'">
                  <el-table
                    :data="tableData"
                    border
                    height="400px"
                    style="width: 100%">
                    <el-table-column label="选择" width="50">
                      <template slot-scope="scope">
                        <div slot="reference" class="radio-wrapper">
                          <el-radio  v-model="radio" :label="scope.$index"  @change.native="getCurrentRow(scope.$index,scope.row)">&nbsp;</el-radio>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="cymc" label="姓名" width="180"></el-table-column>
                    <el-table-column  prop="cybh" label="编号" width="180"></el-table-column>
                    <el-table-column  prop="cpxmc" label="产品线名称"></el-table-column>
                  </el-table>
                  <div text-right>
                   <pagination v-if="jkrTotal>8 && jkrTotal != null" :total="jkrTotal" :pageSize="10" @handleCurrentChange="handleCurrentChange"></pagination>
                  </div>   
              </div>
              
              <div v-if="zdTitle === '指定解决人'">
                <el-table
                    :data="tableData"
                    border
                    height="400px"
                    style="width: 100%">
                    <el-table-column label="选择" width="50">
                      <template slot-scope="scope">
                        <div slot="reference" class="radio-wrapper">
                          <el-radio  v-model="radio" :label="scope.$index"  @change.native="getCurrentRow(scope.$index,scope.row)">&nbsp;</el-radio>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="nickName" label="姓名" ></el-table-column>
                    <el-table-column  prop="userName" label="编号" ></el-table-column>
                  </el-table>
                  <div text-right>
                <pagination v-if="jkrTotal>8 && jkrTotal != null" :total="jkrTotal" :pageSize="10" @handleCurrentChange="handleCurrentChange"></pagination>
                </div> 
              </div>
              
              <div v-if="zdTitle === '运营人员转发' && !lshjShown" class="choose-yyryzf">
                  <el-table
                    :data="tableData"
                    border
                    height="400px"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column  prop="cymc" label="姓名" width="180"></el-table-column>
                    <el-table-column  prop="cybh" label="编号" width="180"></el-table-column>
                    <el-table-column  prop="cpxmc" label="产品线名称"></el-table-column>
                  </el-table>
                  <div text-right>
                <pagination v-if="jkrTotal>8 && jkrTotal != null" :total="jkrTotal" :pageSize="10" @handleCurrentChange="handleCurrentChange"></pagination>      
                </div> 
              </div>

              <div v-if="zdTitle === '选择催办人'" class="choose_cbr">
                  <el-table
                    :data="tableData"
                    border
                    height="400px"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column  prop="nickname" label="姓名" ></el-table-column>
                    <el-table-column  prop="userbh" label="编号"></el-table-column>
                  </el-table>
              </div>
              <div v-if="zdTitle != '选择催办人'" class="zdfzr-note">
                    <div id="summernoteZrr"> </div>
              </div>
              <div style="text-align:right">
                <el-button size="mini" type="primary" @click="handleCommitZdr">提交</el-button>
                <el-button size="mini" type="info" @click="handleClose">取消</el-button>
              </div>
        </div>
</template>
<script>
import pagination from "@/components/BusinessPage/pagination.vue";
export default {
  data() {
    return {
      cpKeyword: "",
      radio: "",
      ryData: {},
      multipleSelection: [],
      lx: "",
      placeholder: "请输入责任人姓名/编号",
      lchj: "",
      yyryLx: [
        {
          label: "0",
          mc: "总部工程专家"
        },
        {
          label: "1",
          mc: "总部产品专家"
        },
        {
          label: "2",
          mc: "产品经理"
        }
      ],
      lshjShown: false,
      qwjjrqZf:""
    };
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    yyryzfData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    zdTitle: {
      type: String,
      default: ""
    },
    jkrTotal: {
      type: Number,
      default: 1
    },
    visible: {
      type: Boolean,
      default: true
    },
    lchjList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    chooseLchj() {
      this.lshjShown = !this.lshjShown;
      if (this.lshjShown) {
        this.multipleSelection = [];
      } else {
        this.lchj = "";
      }
    },
    handleYYRYLX(e) {
      let lx = e.target.getAttribute("data-type");
      if (lx == null) return;
      this.lx = lx;
      this.multipleSelection = [];
      this.$emit("handleYYRYLX", lx);
    },
    // 复选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 查询投诉责任人
    queryComplainZRR() {
      this.$emit("queryComplainZRR", this.cpKeyword);
      this.radio = "";
      if (this.zdTitle == "指定产品接口人") {
        this.ryData.cymc = "";
      } else if (this.zdTitle == "指定解决人") {
        this.ryData.nickName = "";
      } else if (this.zdTitle == "运营人员转发") {
        this.ryData.cymc = "";
        this.multipleSelection = [];
      } else if (this.zdTitle == "选择催办人") {
        this.ryData.username = "";
        this.multipleSelection = [];
      }
    },
    
    queryComplainUser() {
      this.$emit("queryComplainUser", this.cpKeyword);
      this.radio = "";
      if (this.zdTitle == "指定产品接口人") {
        this.ryData.cymc = "";
      } else if (this.zdTitle == "指定解决人") {
        this.ryData.nickName = "";
      } else if (this.zdTitle == "运营人员转发") {
        this.ryData.cymc = "";
        this.multipleSelection = [];
      } else if (this.zdTitle == "选择催办人") {
        this.ryData.username = "";
        this.multipleSelection = [];
      }
    },
    //分页
    handleCurrentChange(data) {
      this.$emit("handleCurrentChange", data);
    },
    // 获取单选
    getCurrentRow(index, row) {
      this.ryData = row;
    },
    handleCommitZdr() {
      this.ryData.nr = $("#summernoteZrr").summernote("code") == "<p><br></p>"? "": $("#summernoteZrr").summernote("code");
      let yyry = [];
      this.multipleSelection.forEach((ele, i, arr) => {
        if (this.zdTitle == "选择催办人") {
          yyry.push(ele.username);
        } else {
          yyry.push(ele.cymc + "," + ele.cybh);
        }
      });
      this.ryData.yyryData = yyry;
      this.ryData.lchj = this.lchj; // 流程环节
      if (this.zdTitle == "指定产品接口人" && !this.ryData.cymc) {
        this.$alert("请选择" + this.zdTitle, "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      } else if (this.zdTitle == "指定解决人") {
        if(!this.ryData.nickName){
          this.$alert("请选择" + this.zdTitle, "提示", {confirmButtonText: "确定",type: "warning"});
          return;
        }
        if(!this.qwjjrqZf){
          this.$alert("请选择期望解决日期", "提示", { confirmButtonText: "确定", type: "warning"});
          return;
        }
        this.ryData.qwjjrq = this.qwjjrqZf
      } else if (this.zdTitle == "运营人员转发") {
        if (!this.lshjShown && this.multipleSelection.length == 0) {
          this.$alert("请选择" + this.zdTitle, "提示", {confirmButtonText: "确定",type: "warning"});
          return;
        } else if (this.lshjShown && this.lchj == "") {
          this.$alert("请选择流程环节", "提示", {confirmButtonText: "确定",type: "warning"});
          return;
        }else if(!this.qwjjrqZf){
          this.$alert("请选择期望解决日期", "提示", { confirmButtonText: "确定", type: "warning"});
          return;
        }
        this.ryData.qwjjrq = this.qwjjrqZf
      } else if (
        this.zdTitle == "选择催办人" &&
        this.multipleSelection.length == 0
      ) {
        this.$alert(this.zdTitle, "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.$emit("handleCommitZdr", this.ryData);
    },
    handleClose() {
      this.$emit("handleClose", "");
    },
    getSummernote() {
      this.$nextTick(() => {
        $("#summernoteZrr").summernote({
          dialogsInBody: true,
          placeholder: "请输入内容",
          height: 200,
          width: 780,
          minHeight: 200,
          maxHeight: 200,
          lang: "zh-CN",
          focus: true,
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
    }
  },
  mounted() {
    this.getSummernote();
  },
  watch: {
    visible(n, o) {
      if (!n) {
        this.radio = "";
        this.ryData = {};
        this.multipleSelection = [];
        this.cpKeyword = "";
        $("#summernoteZrr").summernote("code",'');
      }
    },
    zdTitle(n, o) {
      if (n == "选择催办人") {
        $("#summernoteZrr").summernote("destroy");
      } else {
        this.getSummernote();
      }
    }
  },
  components: { pagination }
};
</script>
<style scoped>
.name-wrapper span {
  color: #409eff;
}
.name-wrapper span:hover {
  cursor: pointer;
}
.radio-wrapper {
  padding-left: 5px;
}
.query-title {
  font-size: 14px;
  width: 50px;
  white-space: nowrap;
  text-align: left;
  padding: 3px 5px 0;
  font-weight: 700;
}
.query-list span:hover {
  cursor: pointer;
}
.query-list span {
  display: inline-block;
  padding: 0px 5px;
  color: #637d8a;
  border-radius: 3px;
  margin: 5px 10px 0 0;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}

</style>
