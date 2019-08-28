<template>
  <div class="dialog-container">
    <el-dialog
      title="添加服务计划"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="addPlan">
        <el-form
          style="width:950px;margin:0 auto"
          class="demo-ruleForm"
          :model="fwdjData"
          :inline="true"
          size="mini"
          label-width="135px"
        >
          <el-form-item label="项目名称" required>
            <el-input placeholder="请选择" readonly v-model="fwdjData.xmmc" style="width:800px">
              <el-button
                slot="append"
                icon="el-icon-circle-plus-outline"
                @click="chooseItemShow = true"
              ></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="项目编号" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请选择项目"
              readonly
              v-model="fwdjData.xmbh"
            ></el-input>
          </el-form-item>

          <el-form-item label="服务类型" required>
            <el-select
              v-model="fwdjData.cpxwids"
              size="mini"
              placeholder="请选择服务类型"
              style="width:325px"
              @change="handleChangeFwlx"
            >
              <el-option
                v-for="(item, index) in fwlxList"
                :key="index"
                :label="item.cpxmc"
                :value="item.cpxwid"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="服务项" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请填写服务项"
              v-model="fwdjData.fwxmc"
            ></el-input>
          </el-form-item>

          <el-form-item label="服务阶段" required>
            <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请填写服务阶段"
              v-model="fwdjData.fwjd"
            ></el-input>
          </el-form-item>

          <el-form-item label="金智责任人" required>
            <el-input placeholder="请选择" readonly v-model="fwdjData.zrrxm" style="width:325px">
              <el-button
                slot="append"
                icon="el-icon-circle-plus-outline"
                @click="handleChooseUser('0')"
              ></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="学校责任人" required>
            <el-input placeholder="请选择" readonly v-model="fwdjData.xxfzrxm" style="width:325px">
              <el-button
                slot="append"
                icon="el-icon-circle-plus-outline"
                @click="handleChooseUser('1')"
              ></el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="计划结束日期" required>
            <el-date-picker
              :picker-options="pickerBeginDateBefore"
              :clearable="false"
              size="mini"
              v-model="fwdjData.jhjsrq"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:800px;"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="服务内容" required>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="fwdjData.fwnr"
              style="width:800px"
            ></el-input>
          </el-form-item>

          <el-form-item label="交付物" required>
             <el-input
              size="mini"
              type="text"
              style="width:325px"
              placeholder="请填写服务项"
              v-model="fwdjData.jfw"
            ></el-input>
          </el-form-item>
        </el-form>

        <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
          <el-button size="small" type="primary" @click="handleCommit">确认提交</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="选择项目"
      :visible.sync="chooseItemShow"
      :close-on-click-modal="false"
      width="800px"
      top="30px"
      append-to-body
    >
      <div style="padding:10px;">
        <itemChoose @handleEdit="handleChooseItem"></itemChoose>
      </div>
    </el-dialog>

    <userDialog :show.sync="userShow" :unitType="unitType" @addUserSuccess="addUserSuccess"></userDialog>
  </div>
</template>

<script>
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
import userDialog from "@/components/dialog/user-dialog.vue";

export default {
  data() {
    return {
      chooseItemShow: false,
      userShow: false, //
      unitType: "",
      visible: this.show,
      itemInfo: {},
      fwlxList: [], // 服务类型
      fwxList: [], // 服务项
      fwjdList: [], // 服务阶段
      jzzrrList: [],
      xxzrrList: [], //学校责任人
      curPage: 1,
      pageSize: 12,
      fwdjData: {
        xmmc: "",
        xmbh: "",
        cpxwids: "",
        fwxmc: "", //服务项
        fwjd:"",
        jhjsrq: "",
        zrrxm: "",
        zrrbh: "",
        xxfzrxm: "",
        xxfzrbh: "",
        fwnr: "",
        jfw:'',
        jhlx:0
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
    itemChoose,
    userDialog
  },
  methods: {
    // 选择项目
    handleChooseItem(data) {
      this.fwdjData.xmmc = data.xmmc;
      this.fwdjData.xmbh = data.xmbh;
      this.chooseItemShow = !this.chooseItemShow;
    },
    // 添加成功
    addUserSuccess(params, user) {
      if (params == "0") {
        this.fwdjData.zrrbh = user.userid;
        this.fwdjData.zrrxm = user.username;
      } else {
        this.fwdjData.xxfzrxm = user.username;
        this.fwdjData.xxfzrbh = user.userid;
      }
      this.userShow = false;
    },
    // // 选择服务类型
    handleChangeFwlx(val) {
      // this.getSpecialServiceFWX(val.join(","));
    },
    handleChooseUser(data) {
      this.unitType = data;
      this.userShow = true;
    },
    //提交需求
    handleCommit() {
      if (!this.valiDate()) return;
      this.$post(this.API.generateSpecialService, this.fwdjData).then(res => {
        if (res.state == "success") {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          $("#summernoteTT").summernote("code", "");
          this.visible = false;
          this.$emit("handleCommitZdyjh", "");
        } else {
          this.$message({
            message: res.msg,
            type: "warning"
          });
        }
      });
    },

    // // 获取服务项
    // getSpecialServiceFWX(cpxwid) {
    //   this.fwxList = [];
    //   this.$get(this.API.getSpecialServiceFWX, {
    //     cpxwid: cpxwid
    //   }).then(res => {
    //     if (res.state == "success") {
    //       this.fwxList = res.data;
    //     } else {
    //     }
    //   });
    // },

    valiDate() {
      if (!this.fwdjData.xmbh) {
        this.$message({
          message: "请选择项目",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.cpxwids) {
        this.$message({
          message: "请选择服务类型",
          type: "warning"
        });
        return false;
      }

      if (!this.fwdjData.fwxmc) {
        this.$message({
          message: "请填写服务项",
          type: "warning"
        });
        return false;
      }

      if (!this.fwdjData.fwjd) {
        this.$message({
          message: "请填写服务阶段",
          type: "warning"
        });
        return false;
      }

      if (!this.fwdjData.zrrxm) {
        this.$message({
          message: "请选择金智责任人",
          type: "warning"
        });
        return false;
      }
      if (!this.fwdjData.xxfzrxm) {
        this.$message({
          message: "请选择学校负责人",
          type: "warning"
        });
        return false;
      }
      if (/^[\s]*$/.test(this.fwdjData.fwnr)) {
        this.$message({
          message: "请填写服务内容",
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
        this.fwlxList = JSON.parse(sessionStorage.getItem("fwlx"));
      } else {
        this.fwlxList = [];
      }
    }
  }
};
</script>
<style scoped lang="scss">
.addPlan {
  padding: 10px 0;
}

div.el-form-item {
  margin-bottom: 8px !important;
}

.addPlan-textarea {
  width: 950px;
  margin: 0 auto;
}

.addPlan-textarea > p {
  width: 125px;
  text-align: right;
  padding-right: 12px;
  font-weight: 700;
}

.addPlan-textarea > p::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
</style>
