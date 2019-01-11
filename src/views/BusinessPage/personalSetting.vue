<template>
 <div>
    <layout>
        <div slot="menu" class="personal-setting-menu">
           <el-menu  background-color="#fff" text-color="#708087"  :active-text-color="'#409EFF'" ref="navbar" :router='true' @select="hanldeSelete" :default-active='defActive'  :default-openeds='openeds' menu-trigger="click"   unique-opened>
                <nav-bar-item v-for="(item, n) in navList" :urlIndex="item.url" :item="item" :navIndex="String(n+1)" :key="n"
                v-if="!item.tag || tagGroup.indexOf(item.tag) != -1"></nav-bar-item>
            </el-menu>
        </div>
        <div slot="content"  class="personal-setting-content">
              <!-- <h4>{{navContent}}</h4> -->
              <div>
                 <transition name="el-zoom-in-center">
                     <router-view></router-view>
                  </transition>
             </div>
        </div>
    </layout>
 </div>
</template>

<script>
import NavBarItem from "@/components/layout/navMenu.vue";
import layout from "@/components/layout/navitem.vue";
 export default {
  data() {
    return {
      defActive:'1',
      openeds:['1'],
      navList: [
        {
          privname: "个人信息",
          url:'/businesspage/personalSetting/grzx',
          icon:'el-icon-erp-yonghu',
          childNodes: [],
          tag:''
        },
        {
          privname: "修改密码",
          url:'/businesspage/personalSetting/xgmm',
          icon:'el-icon-erp-mimaicon',
          childNodes: [],
          tag:''
        },
        {
          privname: "消息设置",
          url:'/businesspage/personalSetting/xxsz',
          icon:'el-icon-erp-btnMsg',
          childNodes: [],
          tag:''
        },
        {
          privname: "个人结算",
          url:'/businesspage/personalSetting/grjs',
          icon:'el-icon-erp-baobiaoguanli',
          childNodes: [],
          tag:'JZGCRY'
        },
        {
          privname: "项目结算",
          url:'/businesspage/personalSetting/xmjs',
          icon:'el-icon-erp-baobiaoguanli',
          childNodes: [],
        },
        {
          privname: "任职等级",
          url:'/businesspage/personalSetting/grrzdj',
          icon:'el-icon-erp-baobiaoguanli',
          childNodes: [],
        },
      ],
      navContent:'个人信息',
      tagGroup:''
    }
  },
  methods:{
   hanldeSelete(index,indexPath){
      switch(index){
        case '1':
        this.navContent = '个人信息';
        break;
        case '2':
        this.navContent = '修改密码';
        break;
        case '3':
        this.navContent = '消息设置';
        break;
        case '4':
        this.navContent = '个人结算';
        break;
      }
   }
  },
  computed:{},
  activated(){
      this.tagGroup = JSON.parse(sessionStorage.userInfo).userGroupTag
      this.navContent = '个人信息'
      // $('.el-menu-item:eq(0)').css('color','rgb(64, 158, 255)').siblings('.el-menu-item').css('color','rgb(112, 128, 135)');
  },
   components: {layout,NavBarItem}
 }
</script>

<style scoped>
.personal-setting-content{
  padding: 10px 20px;
}
.personal-setting-content h4{
  font-size: 16px;
  font-weight: 700;
  border-left:3px solid rgb(153, 50, 236);
  padding-left: 5px;
  color: #555;
}

</style>
