<template>
  <div>
    <el-dialog
      title="分配开发工程师"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="pd-10">
        <el-form :model="crowdxqData" :rules="rules" ref="crowdxqData" class="demo-ruleForm">
          <el-form-item>
            <div class="send-crowd_topic">分配开发工程师</div>
          </el-form-item>

          <el-form-item label>
            <el-select
              size="mini"
              v-model="crowdxqData.kfData"
              filterable
              remote
              reserve-keyword
              placeholder="请选择开发工程师(可搜索)"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width:100%;"
            >
              <el-option
                v-for="(item,index) in kfgcsList"
                :key="item.uid"
                :label="item.nickName"
                :value="item.uid+','+item.nickName"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label>
            <!-- <div id="summernoteT"></div> -->
            <el-input type="textarea" placeholder="请输入说明内容" v-model="crowdxqData.nr"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="send-crowd_topic">请完善需求的基本信息</div>
          </el-form-item>
          <el-form-item prop="rwmc">
            <el-input size="mini" v-model="crowdxqData.rwmc" placeholder="一个清晰的名字能帮助开发者快速的了解需求"></el-input>
          </el-form-item>

          <!-- 预算金额 -->
          <el-form-item>
            <el-input size="mini" v-model="crowdxqData.xmysje" placeholder="请输入预算金额(元)"></el-input>
          </el-form-item>

          <!-- 需求描述 -->
          <el-form-item prop="xqms">
            <el-input type="textarea" placeholder="请输入需求描述" v-model="crowdxqData.xqms"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="send-crowd_topic">请选择需求客户/学校/个人的期望交付日期，该日期仅作数据记录使用</div>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              :picker-options="pickerJfrqDateBefore"
              value-format="yyyy-MM-dd"
              size="mini"
              type="date"
              placeholder="请输入学校或个人期望交付日期，仅作数据记录使用 "
              v-model="crowdxqData.qwjfrq"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="send-crowd_topic" flex spacebetween>
              <span>请选择需求的招标/交付日期</span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              @change="handleChoosejfDate2"
              value-format="yyyy-MM-dd"
              :picker-options="pickerJfrqDateBefore"
              size="mini"
              type="date"
              placeholder="请输入预期交付日期日期，中标者将严格按照该日期交付需求相关信息"
              v-model="crowdxqData.jfrq"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item text-right>
            <el-button size="mini" type="primary" @click="sendSubmitForm('crowdxqData')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadFile from "@/components/BusinessPage/upload.vue";
import { queryUser } from "@/api/personal.js";
import { GetDateStr } from "@/utils/util.js";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (
        !/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(value) &&
        crowdxqData.rwlx != "2"
      ) {
        callback(new Error("请填写正确金额"));
      } else {
        callback();
      }
    };
    return {
      dateruleVisible: false, //日期规则
      visible: this.show,
      pickerJfrqDateBefore: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      loading: false, //开发工程师查询loading
      kfgcsData: [], //开发工程师
      kfgcsList: [], //开发工程师列表

      rules: {
        rwmc: [
          {
            required: true,
            message: "请输入基本信息",
            trigger: "blur"
          }
        ],
        xmysje: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        zbjzrq: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      crowdxqData: {
        kfData: "",
        rwmc: "", //需求基本信息
        xmysje: 0,
        zbjzrq: "", //招标截止日期
        qwjfrq: "", //期望交付日期
        jfrq: "", //交付日期
        nr: ""
      }
    };
  },
  methods: {
    // 提交需求
    sendSubmitForm(formName) {
      if (!this.crowdxqData.rwmc) {
        this.$alert("请填写需求名称", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (
        this.crowdxqData.rwlx != "2" &&
        !/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(this.crowdxqData.xmysje)
      ) {
        this.$alert("请填写正确金额", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.crowdxqData.xqms) {
        this.$alert("请填写需求描述", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.crowdxqData.jfrq || !this.crowdxqData.zbjzrq) {
        this.$alert("请填写招标日期/交付日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }

      this.$confirm("您确定分配任务给【王凯】吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("handleCommitKfgcs", this.crowdxqData);
        })
        .catch(() => {});
    },

    // 截止日期（1）
    handleChoosejfDate(val) {
      if (val > this.crowdxqData.jfrq) {
        this.$alert("招标截止日期不能大于交付日期，请重新选择", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        this.crowdxqData.zbjzrq = "";
      }
    },
    // 交付日期
    handleChoosejfDate2(val) {
      if (val < this.crowdxqData.zbjzrq) {
        this.$alert("招标截止日期不能大于交付日期，请重新选择", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        this.crowdxqData.jfrq = "";
      }
    },

    // 关键字查询
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        this.queryUser(query);
      } else {
        this.kfgcsList = [];
      }
    },
    // 查询用户
    queryUser(keyword) {
      queryUser({
        curPage: 1,
        pageSize: 10,
        Isexternal: false,
        keyword: keyword
      }).then(({ data }) => {
        if (data.state == "success") {
          this.kfgcsList = data.data.rows;
          this.loading = false;
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (this.show) {
        this.crowdxqData.zbjzrq = GetDateStr(0);
        this.$nextTick(() => {
          $("#summernoteT").summernote({
            dialogsInBody: true,
            placeholder: "请输入内容",
            focus: true,
            height: 200,
            width: 100 + "%",
            minHeight: 200,
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
        this.queryUser();
      } else {
        this.crowdxqData.kfData = "";
        this.crowdxqData.rwmc = "";
        this.crowdxqData.xmysje = 0;
        this.crowdxqData.xqms = "";
        this.crowdxqData.zbjzrq = "";
        this.crowdxqData.qwjfrq = "";
        this.crowdxqData.jfrq = "";
        this.crowdxqData.nr = "";
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.send_crowd img {
  width: 100%;
}

.send-crowd_topic {
  border: 1px solid #e4eaec;
  background: #f3f7f9;
  border-radius: 3px;
  height: 40px;
  line-height: 40px;
  padding: 0 6px;
}

.crowd-rqgz h4 {
  font-weight: 700;
  font-size: 13px;
  margin: 10px 0 !important;
}

.crowd-rqgz p {
  font-size: 12px;
  text-indent: 2em;
}
</style>
