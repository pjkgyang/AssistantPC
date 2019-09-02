<template>
  <div>
    <el-dialog
      title="编辑"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-qrfw">
        <el-form ref="form" :model="form" label-width="110px" size="mini">
          <!-- <el-form-item label="计划开始日期" required v-if="!plxgZrr">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              v-model="form.jhksrq"
              style="width:100%;"
            ></el-date-picker>
          </el-form-item> -->
          <el-form-item label="计划结束日期" required v-if="!plxgZrr">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              v-model="form.jhjssj"
              style="width:100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="金智责任人">
            <el-select
              v-model="form.jzfzrbh"
              placeholder="请选择责任人(可按姓名搜索)"
              filterable
              style="width:100%;"
              @change="handleChangeJzZrr"
            >
              <el-option
                v-for="item in jzzrrList"
                :key="item.userid"
                :label="item.username+' ( '+ item.usercode +' )'"
                :value="item.userid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学校责任人">
            <el-select
              v-model="form.xxfzrbh"
              placeholder="请选择责任人(可按姓名搜索)"
              filterable
              style="width:100%;"
              @change="handleChangeZrr"
            >
              <el-option
                v-for="item in xxzrrList"
                :key="item.userid"
                :label="item.username+' ( '+ item.usercode +' )'"
                :value="item.userid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item text-right>
            <el-button size="mini" type="primary" @click="handleCommit">提交</el-button>
            <el-button size="mini" @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      jzzrrList: [],
      xxzrrList: [],
      form: {
        // jhksrq: "",
        jhjssj: "",
        jzfzrxm: "",
        jzfzrbh: "",
        xxfzrxm: "",
        xxfzrbh: "",
      },
      pickerBeginDate: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    handleChangeJzZrr(val){
      this.form.jzfzrbh = val;
      this.jzzrrList.forEach(ele => {
        if (ele.userid == val) {
          this.form.jzfzrxm = ele.username;
        }
      });
    },
    // 更换责任人
    handleChangeZrr(val) {
      this.form.xxfzrbh = val;
      this.xxzrrList.forEach(ele => {
        if (ele.userid == val) {
          this.form.xxfzrxm = ele.username;
        }
      });
    },
    handleCommit() {
      if (!this.validate()) return;
      this.$emit("handleCommitEdit", this.form);
    },
    handleClose() {
      this.visible = false;
    },
    getUsers(unitType) {
      this.$get(this.API.getUsers, {
        curPage: 1,
        pageSize: 9999,
        unitType: unitType,
        keyword: "",
        dept: ""
      }).then(res => {
        if (res.state == "success") {
          if (unitType == 1) {
            this.xxzrrList = res.data.rows;
          } else {
            this.jzzrrList = res.data.rows;
          }
        } else {
        }
      });
    },
    validate() {
      // if (!this.form.jhksrq && !this.plxgZrr) {
      //   this.$alert("请选择计划开始日期", "提示", {
      //     confirmButtonText: "确定",
      //     type: "warning"
      //   });
      //   return false;
      // }
      if (!this.form.jhjssj && !this.plxgZrr) {
        this.$alert("请填写计划结束日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.jzfzrbh ) {
        this.$alert("请选择金智责任人", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.xxfzrbh ) {
        this.$alert("请选择学校责任人", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      return true;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    plxgZrr: {
      type: Boolean,
      default: false
    },
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.jzfzrbh =   "";
        this.form.jzfzrxm = "";
        this.form.xxfzrbh = "";
        this.form.xxfzrxm = "";
        this.form.jhjssj = "";
      } else {
        this.getUsers(0);
        this.getUsers(1);

        this.form.jhjssj = this.dataInfo.jhjssj == "-"?"":this.dataInfo.jhjssj;
        this.form.jzfzrbh = this.dataInfo.jzfzrbh;
        this.form.jzfzrxm = this.dataInfo.jzfzrxm;
        this.form.xxfzrbh = this.dataInfo.xxfzrbh == "-" ? "" : this.dataInfo.xxfzrbh;
        this.form.xxfzrxm = this.dataInfo.xxfzrxm == "-" ? "" : this.dataInfo.xxfzrxm;
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-qrfw {
  padding: 15px 30px;
  .qrfw-title {
    display: inline-block;
    width: 155px !important;
    font-weight: 700;
    text-align: right;
  }
}
</style>
