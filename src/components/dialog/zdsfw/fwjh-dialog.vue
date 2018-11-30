<template>
  <div>
    <el-dialog title="新增服务计划" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-qrbhfw">
        <el-form ref="form" :model="form" label-width="110px" size="mini">
          <el-form-item label="产品" required>
            <el-select v-model="cpbh" placeholder="请选择产品" style="width:100%;" @change="handleChangeCpValue">
              <el-option v-for="(cp,index) in cpList" :key="index" :label="cp.text" :value="cp.id+'&'+cp.text"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务内容" required>
            <el-select v-model="form.fwnr" placeholder="请选择服务内容" style="width:100%;">
              <el-option v-for="(fwnr,index) in fwnrList" :key="index" :label="fwnr.text" :value="fwnr.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="计划完成时间" required>
                         <el-date-picker :picker-options="pickerBeginDate"  type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhjsrq" style="width:100%;"></el-date-picker>
                    </el-form-item> -->
          <el-form-item label="服务开始日期" required>
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.fwksrq" style="width:100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="服务期限(月)" required>
            <el-input v-model="form.fwqx" placeholder="请输入服务期限（仅限正整数）"></el-input>
          </el-form-item>
          <el-form-item label="服务次数" required>
            <el-input v-model="form.fwcs" placeholder="请输入服务次数（仅限正整数）"></el-input>
          </el-form-item>
          <el-form-item label="责任人" required>
             <el-select v-model="form.zrrbh" placeholder="请选择责任人" style="width:100%;" @change="handleChangeZrr">
              <el-option v-for="item in zrrList" :key="item.userCode" :label="item.userName+' ( '+ item.userCode +' )'" :value="item.userId">
              </el-option>
              </el-select>
          </el-form-item><br>
          <el-form-item text-right>
            <el-button type="primary" @click="handleCommit">保存</el-button>
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryProjectParticipant } from "@/api/personal.js";
export default {
  data() {
    return {
      visible: this.show,
      fwnrList: [],
      cpList: [],
      zrrList: [],
      form: {
        cpbh: "",
        cpmc: "",
        fwnr: "",
        fwksrq: "",
        fwqx: "",
        zrrxm: "",
        zrrbh: "",
        fwcs: ""
      },
      cpbh: "",
      pickerBeginDate: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    handleChangeZrr(val) {
      this.form.zrrbh = val;
      this.zrrList.forEach(ele => {
        if (ele.userId == val) {
          this.form.zrrxm = ele.userName;
        }
      });
    },
    handleChangeCpValue(value) {
      this.form.cpbh = value.split("&")[0];
      this.form.cpmc = value.split("&")[1];
      this.cpList.forEach((ele, i, arr) => {
        if (this.form.cpbh == ele.id) {
          this.form.zrrxm = ele.zrrxm;
          this.form.zrrbh = ele.zrrbh;
        }
      });
      this.listFwnrByCp();
    },
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
      if (!this.validate()) return;
      this.$emit("handleCommitFWJH", this.form);
    },
    // 获取服务内容
    listFwnrByCp() {
      this.$get(this.API.listFwnrByCp, {
        cpbh: this.form.cpbh,
        cpmc: this.form.cpmc
      }).then(res => {
        if (res.state == "success") {
          this.fwnrList = res.data;
        }
      });
    },

    validate() {
      if (!this.cpbh) {
        this.$alert("请选择产品!", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.fwnr) {
        this.$alert("请选择服务内容!", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.fwksrq) {
        this.$alert("请选择服务开始日期!", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.fwqx || !/^[1-9]\d*$/.test(this.form.fwqx)) {
        this.$alert("请填写服务期限或格式有误!", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.fwcs || !/^[1-9]\d*$/.test(this.form.fwcs)) {
        this.$alert("请填写服务次数或格式有误!", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
       if (!this.form.zrrbh) {
        this.$alert("请选择责任人", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      return true;
    },
    // 获取产品
    listXmZdsfwCp() {
      this.$get(this.API.listXmZdsfwCp, {
        xmbh:''
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.cpList = [];
          } else {
            this.cpList = res.data;
          }
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.fwnrList = [];
        this.cpbh = "";
        this.form.fwnr = "";
        this.form.jhjsrq = "";
        this.form.fwksrq = "";
        this.form.fwqx = "";
        this.form.zrrxm = "";
        this.form.zrrbh = "";
        this.form.fwcs = "";
      } else {
        queryProjectParticipant({
          xmbh: this.xmbh,
          sfjz: 1
        }).then(({ data }) => {
          if (data.state == "success") {
            this.zrrList = data.data;
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type:'error'
            });
          }
        });
        this.listXmZdsfwCp();
      }
    }
  },
  components: {  }
};
</script>

<style scoped>
.dialog-qrbhfw {
  padding: 15px 30px;
}
.el-form-item--mini.el-form-item {
  margin-bottom: 8px;
}
</style>
