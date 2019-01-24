<template>
     <div class="side-nav" >
      <layout>
          <div slot="menu" class="menu report-menu">
            <el-menu background-color="#fff" text-color="#708087"  :active-text-color="'#409EFF'" ref="navbar" :router='true' :default-active='defActive'  :default-openeds='openeds' menu-trigger="click" @select="selectMenu"  unique-opened>
                <nav-bar-item v-for="(item, n) in navList" :urlIndex="item.url" :item="item" :navIndex="String(n+1)" :key="n"></nav-bar-item>
               
                <!-- <el-menu-item index="6" :route="{path:'/businesspage/report/khbb/grrzsj'}"><i class="el-icon-menu"></i> <span slot="title">任职</span></el-menu-item>  -->
                <!-- <el-menu-item index="5" :route="{path:'/businesspage/report/use/userlogin'}"><i class="el-icon-menu"></i> <span slot="title">用户登录</span></el-menu-item>  -->
            
                <!-- <el-submenu index="8">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>完工验收</span>
                  </template>
                  <el-menu-item index="8-1" :route="{path:'/businesspage/toplist/qareport/qyyswg'}"><i class="el-icon-menu"></i> <span slot="title">区域验收</span></el-menu-item>
                  <el-menu-item index="8-2" :route="{path:'/businesspage/toplist/qareport/xxyswg'}"><i class="el-icon-menu"></i> <span slot="title">学校验收</span></el-menu-item> 
                  <el-menu-item index="8-3" :route="{path:'/businesspage/toplist/qareport/xmyswg'}"><i class="el-icon-menu"></i> <span slot="title">项目验收</span></el-menu-item> 
                  <el-menu-item index="8-4" :route="{path:'/businesspage/toplist/qareport/gryswg'}"><i class="el-icon-menu"></i> <span slot="title">个人验收</span></el-menu-item> 
                </el-submenu> -->
            </el-menu>
            <!-- item.url.split('qareport/')[1] -->
        <!-- <div v-if="this.navMode == 'horizontal'" v-s.how="navBgShow" class="full-screen-navBg" @click.self="closeAll"></div> -->
        </div>
          <div slot="content" class="layout-content">
            <keep-alive>
             <router-view></router-view>
            </keep-alive>
          </div>
      </layout>
    </div>
</template>
<script>
import NavBarItem from "@/components/layout/navMenu.vue";
import layout from "@/components/layout/navitem.vue";
import reportTable from "@/components/reportTable/report-table.vue";
import { EventBus } from "@/utils/util.js"; //事件总线
export default {
  data() {
    return {
      defActive:'1-1',
      openeds:['1'],
      navList:[],
    }
  },
  mounted(){
      try{
        if(this.$route.path.includes('/businesspage/toplist')){
          //  this.navList = window.menuTop.childNodes
           this.navList = window.menu.childNodes
           this.getUrl(this.navList);
        }else if(this.$route.path.includes('/businesspage/report')){
           this.navList = window.menu.childNodes
            this.getUrl(this.navList);
        }else if(this.$route.path.includes('/businesspage/wtfp')){
           this.navList = window.menu.childNodes
            this.getUrl(this.navList);
        }
      }catch(err){
          JSON.parse(sessionStorage.getItem('menuList')).forEach((ele,i,arr)=>{
             if(ele.url== '/businesspage/toplist' && this.$route.path.includes('/businesspage/toplist')){
               this.navList = ele.childNodes
               this.getUrl(this.navList);
             }else if(ele.url == '/businesspage/report' && this.$route.path.includes('/businesspage/report')){
               this.navList = ele.childNodes
               this.getUrl(this.navList);   
             }else if(ele.url == '/businesspage/wtfp'){
             }
          })
      } 
  },
  beforeMount(){},
  activated(){},
  methods: {
    selectMenu(index,indexPath,e) {
      if(e.route.path.includes('/businesspage/toplist')){
      }
    },
    getUrl(obj){
      if(obj[0].url){
        this.$router.push({path:obj[0].url});
        this.defActive = '1'
        return;
      }
      if(obj[0].childNodes.length){
         obj.forEach((ele,i,arr)=>{
          if(ele.isexpand == 'true'){
            this.openeds = [JSON.stringify(i+1)];
            this.defActive = i+1+'-1'
            this.$router.push({path:obj[i].childNodes[0].url});
          }else{
            this.openeds =  ['1'];
            this.$router.push({path:obj[0].childNodes[0].url}); 
          }
         })
      }else{
        this.getUrl(obj[0].childNodes);
      }
    },
    getExpand(arrList){
      arrList.forEach((ele,i,arr)=>{
          if(ele.isexpand){
            this.openeds = ['1'];
          }else{
            this.openeds =  ['1'];
          }
      })
    }
  },
  watch:{
       $route(from,to){
          if(from.redirectedFrom == '/businesspage/toplist'){
            // this.navList = window.menuTop.childNodes
            this.navList = window.menu.childNodes  
            this.defActive = '1'
          }else if(from.redirectedFrom == '/businesspage/report'){
            this.navList = window.menu.childNodes
            this.getUrl(this.navList);
          }
       }
  },
  computed: {
    // 首次进入页面时展开当前页面所属的菜单
    // defActive() {
    //   // return this.$route.params.id;
    //   return this.$route.path;
    // }
    menu(){
       return window.menu;
    }
  },

  components: { NavBarItem, layout,reportTable }
};
</script>
<style>

.layout-content{
  padding:5px 10px; 
  border-radius: 5px;
}
</style>