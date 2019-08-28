<template>
  <div class="personal-setting-xgmm">
    <el-form
      :model="pswForm"
      status-icon
      :rules="rules2"
      ref="pswForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码" prop="oldpass" required>
        <el-input size="small" type="password" v-model.number="pswForm.oldpass"></el-input>
      </el-form-item>
      <p class="remark" v-if="unitType == 0">注：初始密码为【wisedu@2018】</p>
      <el-form-item label="新密码" prop="pass" required>
        <el-input size="small" type="password" v-model="pswForm.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input size="small" type="password" v-model="pswForm.checkPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('pswForm')" size="small">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changeLoginUserPwd } from "@/api/system.js";
export default {
  data() {
    var validatePass3 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.pswForm.checkPass !== "") {
          this.$refs.pswForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pswForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      pswForm: {
        pass: "",
        checkPass: "",
        oldpass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        oldpass: [{ validator: validatePass3, trigger: "blur" }]
      },
      unitType: ""
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          changeLoginUserPwd({
            // 修改密码
            oldPwd: this.pswForm.oldpass,
            newPwd: this.pswForm.pass,
            rePwd: this.pswForm.checkPass
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("修改成功", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  window.location.href =
                    window.baseurl +
                    "sys/logout.do?from=" +
                    encodeURIComponent("http://careful.wisedu.com/#/");
                }
              });
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error",
                callback: action => {}
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    console.log(sessionStorage.getItem("isJZuser"));
    this.unitType = sessionStorage.getItem("isJZuser");
  },
  components: {}
};
</script>

<style scoped>
.personal-setting-xgmm {
  width: 50%;
  margin: 5% auto 0;
}
.demo-ruleForm {
  position: relative;
}
.remark {
  position: absolute;
  top: 40px;
  right: 10px;
  font-size: 12px;
  color: #f00;
}
</style>
