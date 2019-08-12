<template>
 <!-- style="height:100%;min-height:100%;overflow-y:auto;" -->
  <div  class="page-component__scroll">
    <div v-if="navshow">
        <div class="main_TopNav" >
            <header-user :userNav="userNav" :userInfo="userInfo" :shown="loginShow" @handleCommand="handleCommand" ></header-user>
        </div>
    </div>
    <div :class="{'main_page':$route.path == '/questionDetail','main_page-questionDetail':$route.path == '/questionDetail'}">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
			<!-- <el-backtop target=".page-component__scroll" :bottom="100"></el-backtop> -->
  </div>
</template>
<script>
import headerUser from "@/components/BusinessPage/header.vue";
import { getLoginUser, querySystem } from "@/api/system.js";

export default {
  data() {
    return {
      loginShow: true,
      userInfo: {},
      userNav: [],
      navshow: true,
      disabled: false
    };
  },
  methods: {

    handleCommand(data) {
      if (data.split("&&")[0] == "退出") {
        window.location.href =
          window.baseurl +
          "sys/logout.do?from=" +
          encodeURIComponent("http://careful.wisedu.com/#/");
        sessionStorage.clear();
      } else if (data.split("&&")[0] == "个人中心") {
        this.$router.push({ path: "/businesspage/personalSetting" });
      } else {
        if (data.split("&&")[0] == "../home/main.do") {
          window.open(
            "http://careful.wisedu.com/emap/sys/assistantauth/home/main.do?sid=" +
              data.split("&&")[1]
          );
        } else {
          window.open(data.split("&&")[0]);
        }
      }
    }
  },
  mounted() {
    let _this = this;
    //  || this.$route.path == "/zdsfw" || this.$route.path == "/zdsfwDetail"
    if ((this.$route.path == "/questionDetail") && !window.location.hash.includes("h=1")) {
      this.navshow = false;
      return;
    }
    // 获取当前用户
    getLoginUser().then(res => {
      if (res.status == 200) {
        if (res.data.state == "success") {
          this.userInfo = res.data.data;
          this.loginShow = false;
          window.userId = res.data.data.userName;
          window.logo = res.data.data.logo;
          window.uid = res.data.data.uid;

          sessionStorage.setItem("username", res.data.data.nickName);
          // sessionStorage.setItem('UserGroup',res.data.data.userGroupTag);
          sessionStorage.setItem("isJZuser", res.data.data.unitType);
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
        } else {
          this.$alert(res.data.msg + "获取用户失败,请联系管理员 ", "提示", {
            confirmButtonText: "确定",
            type: 'error',
            callback: action => {
              window.location.href =
                window.baseurl +
                "sys/logout.do?from=" +
                encodeURIComponent("http://careful.wisedu.com/#/");
            }
          });
        }
      }
    });

    // 获取用户系统
    querySystem().then(({ data }) => {
      if (data.state == "success") {
        if (data.data.length != 0 && data.data != null) {
          this.userNav = data.data;
          this.userNav.forEach((ele, i, arr) => {
            if (ele.privid == 84) {
              this.userNav.splice(i, 1);
            }
          });
        }
      }
    });
  },
  components: { headerUser }
};
</script>
<style scoped>

.main_TopNav {
  width: 100%;
  box-shadow: 0px 1px 6px #ddd;
  overflow-x: auto;
}
.main_Content {
  width: 1280px;
  margin: 0 auto;
  box-shadow: 0 1px 2px #ccc;
}

</style>
