<template>
  <div class="header">
    <!--BusinessPage 页面 header -->
    <div class="header-left">
      <div class="title_menu">
        <p>
          <img src="static/img/logo2.png" alt="logo">&#x3000;
          <span>金智教育工程小助手</span>
        </p>
      </div>
      <div class="header-navmenu">
        <ul class="header_nav" @click="handleRouter" v-if="false">
          <li v-for="menu in menuList">
            <div :class="{'nav_active':title == menu.url}" :data-router="menu.url">{{menu.privname}}</div>
          </li>
        </ul>
        <div class="header-navmenu-elmenu">
          <el-menu text-color="#708087" :active-text-color="'#CD3333'" ref="navbar" :router='true' :default-active="onRoutes" @select="handleSelect" mode="horizontal" menu-trigger="hover" unique-opened>
            <nav-item :routes="menuList" navIndex=""></nav-item>
            
          </el-menu>
        </div>
      </div>
    </div>
    <div style="display:flex;align-items:center;">
      <div style="margin-right:15px;position:relative">
        <input v-if="title == '/businesspage/dataTab'" type="text" class="searchKeyword" v-model="inputValue" placeholder="请输入搜索内容" @keyup="getInputVal">
        <input v-if="title == '/businesspage/projects'" type="text" class="searchKeyword" v-model="inputValue" placeholder="请输入搜索内容" @keyup="getInputXmKB">
        <span v-if="title == '/businesspage/dataTab' ||title == '/businesspage/projects'" class="el-icon-search" style="position:absolute;top:6px;left:5px;"></span>
      </div>
      <div>
        <p class="notice" @click="handleNotice">
          <el-badge :value="noticNum == 0?'':noticNum" class="item" :max="99">
            <span class="el-icon-bell" title="通知" style="font-size:20px"></span>
          </el-badge>
        </p>
      </div>

      <div style="margin:0 8px;font-size:13px;color:#f00" v-if="jf != -1">
        <span>积分:</span>{{jf}}
      </div>

      <div v-if="shown" class="userLogin">
        <img src="static/img/avatar1.png">
        <a href="javascript:;;" @click="homeLogin">登录</a>
      </div>

      <div v-if="!shown" class="info">
        <el-col :span="12">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="userInfo.logo" :onerror="errorImg">
              <span style="color:#000;white-space:nowrap;">&nbsp;{{userInfo.nickName}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(sys,index) in userNav" :key='index' :command="sys.homepage+'&&'+sys.privid">{{sys.privname}}</el-dropdown-item>
              <el-dropdown-item command="个人中心" :divided="userNav.length != 0">个人中心</el-dropdown-item>
              <el-dropdown-item command="退出" :divided="userNav.length != 0">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </div>
    </div>
  </div>
</template>
<script>
import { encryptByDES,EventBus } from '@/utils/util.js'
import { getMessages } from "@/api/notice.js";
import { queryHomePage, querySysPrivs } from "@/api/system.js";
import { queryIntegral } from "@/api/personal.js";
import NavBarItem from "@/components/layout/navMenu.vue";
import navItem from "@/components/layout/navitem.1.vue";

export default {
  data() {
    return {
      menus: [
        { dropName: "跳转到xxx", path: "http://www.baidu.com" },
        { dropName: "跳转到xxx", path: "" }
      ],
      navActive: "/businesspage/projects",
      title: "",
      inputValue: "",
      errorImg:
        'this.src="' + require("../../../static/img/defaultAvatar.png") + '"',
      baseUrl: "",
      noticNum: "",
      noticeList: "",
      total: null,
      visible: false,
      noticeVisible: false,
      menuList: [],
      jf: "",
      menuData: [],
      routesArr:''
    };
  },
  computed: {
    onRoutes() {
      if (this.$route.path.includes("/businesspage/report")) {
        return "/businesspage/report";
      } else if (this.$route.path.includes("/businesspage/task")) {
        return "/businesspage/projects";
      } else if (this.$route.path.includes("/businesspage/toplist")) {
        return "/businesspage/toplist";
      } else {
        return this.$route.path;
      }
    }
  },
  props: {
    userInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    shown: {
      type: Boolean,
      default: true
    },
    input: {
      type: String,
      default: ""
    },
    userNav: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  mounted() {
    if (window.location.hash.includes("/businesspage/report")) {
      this.title = "/businesspage/report";
    } else if (window.location.hash.includes("/businesspage/task")) {
      this.title = "/businesspage/projects";
    } else {
      this.title = window.location.hash.split("#")[1];
      // this.title = window.location.pathname
    }
    this.baseUrl = window.baseurl;
    this.getMessages();
    EventBus.$on("changeNoticeNum", param => {
      // this.getMessages();
    });
    EventBus.$on("readAllMessages", param => {
      this.noticNum = 0;
    });

    querySysPrivs().then(({ data }) => {
      //获取导航 菜单
      if (data.state == "success") {
        if (data.data != null && data.data.length != 0) {
          this.menuList = data.data;
          //  if (!window.location.hash)
          //  if (window.location.hash == "#/")
          if (window.location.hash == "#/") {
            if (!data.data[0].url) {
              if (data.data[0].childNodes[0].url) {
                this.$router.push({ path: data.data[0].childNodes[0].url });
              } else {
                this.$router.push({
                  path: data.data[0].childNodes[0].childNodes[0].url
                });
              }
            } else {
              this.$router.push({ path: data.data[0].url });
            }
          }
          sessionStorage.setItem("menuList", JSON.stringify(this.menuList));
        } else {
          this.$router.push({ path: "/" });
        }
      }
    });

    //获取积分
    queryIntegral().then(({ data }) => {
      if (data.state == "success") {
        this.jf = data.data;
      }
    });
  },
  watch: {
    $route(from, to) {
      this.routesArr = '';
      //切换header title
      // this.getMessages();
      this.navActive = window.location.hash.split("#")[1];
      if (window.location.hash.includes("/businesspage/report")) {
        this.title = "/businesspage/report";
      } else if (window.location.hash.includes("/businesspage/task")) {
        this.title = "/businesspage/projects";
      } else {
        this.title = window.location.hash.split("#")[1];
        // this.title = window.location.pathname
      }

      //  JSON.parse(sessionStorage.getItem('menuList')).forEach(ele=>{
      //    this.jugeRouter(ele);
      //  })
      //  if(!this.routesArr.includes(this.navActive)){
      //     alert('对不起，您暂无权限访问该页面~');
      //     window.location.href = 'http://localhost:9000/#'+to.path;
      //   }

      // if (from.name != "MonthReportWrite") {
      //   document.title = "金智教育工程小助手";
      // } else {
      //   document.title = "月报-月计划制订";
      // }
    }
  },
  methods: {
    handleSelect(index, indexPath) {
      if (index.indexOf("http://") != -1 || index.indexOf("https://") != -1) {
         let des = encryptByDES('assistant'+window.userId,'WISEDUUSER');
         window.open(index.includes('?')?(index+'&sign='+des):(index+'?sign='+des));
        return;
      }
      window.menu = null;
      this.menuList.forEach((ele, i, arr) => {
        if (ele.url == index) {
          window.menu = ele;
        }
      });
    },
    handleNotice() {
      this.$router.push({ path: "/businesspage/systemMsg" });
      this.title = "/businesspage/systemMsg";
    },
    handleCommand(data) {
      //导航切换
      this.$emit("handleCommand", data);
    },
    handleRouter(e) {
      //切换页面
      let path = e.target.getAttribute("data-router");
      this.$router.push({ path: path });
    },
    getInputVal(e) {
      if (e.keyCode == "13") {
        EventBus.$emit("searchInfo", this.inputValue);
        EventBus.$emit("hoshRouter", this.inputValue);
      }
    },
    getInputXmKB(e) {
      if (e.keyCode == "13") {
        this.$router.push({ path: "/businesspage/projects" });
        EventBus.$emit("searchXMKB", this.inputValue);
      }
    },
    homeLogin() {
      window.location.href =
        "http://careful.wisedu.com/emap/sys/assistantauth/home/login.do?redirect_url=" +
        encodeURIComponent("http://careful.wisedu.com/#/");
    },
    getMessages() {
      getMessages({
        curPage: 1,
        pageSize: 10,
        isread: 0
      }).then(({ data }) => {
        if (data.state == "success") {
          this.noticNum = data.data.records;
        }
      });
    },

    jugeRouter(obj,navActive){
      if(!obj.childNodes.length){
        //  if(obj.url == navActive){
        //    return false;
        //  }else{
        //    return true;
        //  }
        this.routesArr += obj.url + ','
      }else{
        obj.childNodes.forEach(ele=>{
          this.jugeRouter(ele);
        })
      }
    }
  },
  components: { NavBarItem, navItem }
};
</script>
<style scoped>
.header {
  min-width: 1300px;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 1);
}
.header .header-left {
  display: flex;
  align-items: center;
}
.header .title_menu {
  height: 50px;
  padding-left: 15px;
}
.header .title_menu > p {
  float: left;
  display: flex;
  align-items: center;
  line-height: 50px;
  height: 50px;
}
.header .title_menu > p span:nth-of-type(1) {
  color: #444;
  font-weight: 700;
  font-size: 18px;
}

.header .header-navmenu ul {
  float: left;
  height: 50px;
  margin-left: 15px;
  margin-bottom: 0;
}
.header .header-navmenu .header-navmenu-elmenu {
  margin-left: 20px;
}
.header .header-navmenu ul li {
  float: left;
  color: #f00;
}
.header .header-navmenu ul li > div {
  height: 50%;
  line-height: 25px;
  padding: 0 15px;
  margin: 13px 0 0 10px;
  border: 1px solid #f00;
  font-size: 14px;
}
.header .header-navmenu ul li > div:hover {
  background: #f00;
  color: #fff;
}
.header .header-navmenu span {
  font-weight: 700;
  color: #666;
  font-size: 18px;
  margin-left: 15px;
}
.header .header-navmenu:hover {
  cursor: pointer;
}
.header a {
  color: #fff;
  text-decoration: none;
}
.header a:hover {
  color: lightskyblue;
  text-decoration: underline;
}

.info {
  height: 100%;
  margin: 0 15px;
}
.info img {
  height: 30px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  margin-top: 3px;
}
.el-dropdown-link:hover {
  cursor: pointer;
}
.el-dropdown-menu__item {
  line-height: 25px;
}
.userLogin {
  float: right;
  line-height: 50px;
  margin-right: 20px;

  display: flex;
  align-items: center;
}
.userLogin a {
  color: #000;
}
.userLogin img {
  height: 30px;
}
.nav_active {
  color: #fff;
  background: #f00;
}
.searchKeyword {
  padding: 4px 10px 4px 25px;
  border-radius: 20px;
  border: 1px solid #ccc;
  outline: none;
  width: 170px;
}
.searchKeyword::-webkit-input-placeholder {
  font-size: 12px;
}

.el-dropdown-menu li a {
  width: 100%;
  display: inline-block;
}
.notice {
  margin: 0px 10px 0 0 !important;
  cursor: pointer;
}
.active {
  background-color: #eaeaea !important;
  color: #f00 !important;
}
</style>
