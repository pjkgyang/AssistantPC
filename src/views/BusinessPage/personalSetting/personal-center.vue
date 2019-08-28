<template>
  <div class="personal-setting-grzx">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.nickName" size="small" readonly></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="请选择活动区域" size="small">
          <el-option label="未知" value="1"></el-option>
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="form.telNum" size="small" readonly></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" size="small" readonly></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="form.unit" size="small" readonly></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="form.dept" size="small" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        sex: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  mounted() {
    this.form = JSON.parse(sessionStorage.getItem("userInfo"));
  },
  components: {}
};
</script>

<style scoped>
.personal-setting-grzx {
  width: 50%;
  margin: 5% auto 0;
}
.el-form-item {
  margin-bottom: 12px !important;
}
</style>
