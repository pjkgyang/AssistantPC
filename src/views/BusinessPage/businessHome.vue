<template>
  <div style="height:100%;min-height:100%;">
    <div v-if="navshow">
        <div class="main_TopNav" >
            <header-user :userNav="userNav" :userInfo="userInfo" :shown="loginShow" @handleCommand="handleCommand" ></header-user>  
        </div>
        <!-- <div style="height:50px"></div> -->
    </div>
    <div :class="{'main_page':!hash.includes('questionDetail'),'main_page-questionDetail':hash.includes('questionDetail')}">
        <!-- <div style="height:auto"> -->
            <keep-alive>
                 <router-view></router-view>
            </keep-alive>
        <!-- </div> -->
        <transition name="scroll-fade" mode="out-in">
            <div v-if="disabled" class="scrollTop" @click="handleBtn" title="回到顶部">
            <i class="el-icon-arrow-up"></i>
            </div>
        </transition>
    </div>
  </div>
</template>
<script>
import headerUser from '@/components/BusinessPage/header.vue'
import { getLoginUser,querySystem } from '@/api/system.js'

export default {
  data(){
      return{
         loginShow:true,
         userInfo:{},
         userNav:[],
         navshow:true,
         disabled:false,
         hash:''
      }
  },
  methods:{
      handleScroll () { 
      var scrollTop = window.pageYOffset || $('.main_page').scrollTop() || document.body.scrollTop
        if(scrollTop > 200){
          this.disabled = true;
        }else{
           this.disabled = false;
        }
      },
      handleBtn(){        //滚动到顶部
       var gotoTop= function(){
          var currentPosition = $('.main_page').scrollTop() || document.body.scrollTop;
          currentPosition -= 50;
          if (currentPosition > 0) {
            $('.main_page').scrollTop(currentPosition);
          }else {
            $('.main_page').scrollTop(0);
            clearInterval(timer);
            timer = null;
          }
        }
        var timer = setInterval(gotoTop,0.1);
      },
       handleCommand(data){
           if(data.split('&&')[0] == '退出'){
               window.location.href = window.baseurl+'sys/logout.do?from='+ encodeURIComponent('http://careful.wisedu.com/#/');
               sessionStorage.clear();
           }else if(data.split('&&')[0] == '个人中心'){
               this.$router.push({path:'/businesspage/personalSetting'});
           }else{
              if(data.split('&&')[0] == '../home/main.do'){
                window.open('http://careful.wisedu.com/emap/sys/assistantauth/home/main.do?sid='+data.split('&&')[1]);
              }else{
                window.open(data.split('&&')[0]); 
              }
           }
     }
  },
  mounted(){
      this.hash = window.location.hash
      let _this = this;
      if((window.location.hash.includes('questionDetail')||this.$route.path == '/zdsfw') && !window.location.hash.includes('h=1')){
          this.navshow = false;  return;
       }
        // 获取当前用户
       getLoginUser().then((res)=>{
           if(res.status == 200){
                if(res.data.state == 'success'){
                    this.userInfo = res.data.data;
                    this.loginShow = false;
                    window.userId = res.data.data.userName;
                    window.logo = res.data.data.logo;
                    window.uid = res.data.data.uid;

                    sessionStorage.setItem('username',res.data.data.nickName);
                    // sessionStorage.setItem('UserGroup',res.data.data.userGroupTag);
                    sessionStorage.setItem('isJZuser',res.data.data.unitType);
                    sessionStorage.setItem('userInfo',JSON.stringify(res.data.data));
              }else{
                  this.$alert(data.msg+'获取用户失败,请联系管理员 ', '提示', {
                        confirmButtonText: '确定',
                        type:error,
                        callback: action => {
                            window.location.href = window.baseurl+'sys/logout.do?from='+ encodeURIComponent('http://careful.wisedu.com/#/');
                        }
                 });
              }
           }
       })
       


        // 获取用户系统
        querySystem().then(({data})=>{
            if(data.state == 'success'){
                if(data.data.length !=0 && data.data!=null ){
                    this.userNav = data.data
                    this.userNav.forEach((ele,i,arr)=>{
                        if(ele.privid == 84){
                           this.userNav.splice(i,1);
                        }
                    })
                }
            }
        }) 
     $('.main_page').scroll(function() {  
         _this.handleScroll();
     });
  },

  components:{headerUser}
}
</script>
<style scoped>
.main_page{
    height:calc(100vh - 50px);
    overflow-y: auto;
}
.main_page-questionDetail{
    height:100vh;
    overflow-y: auto;
}
.main_TopNav{
    /* position: fixed; */
    /* top: 0; */
    /* left: 0; */
    width: 100%;
    box-shadow: 0px 1px 6px #ddd;
    /* z-index: 188; */
    overflow-x: auto;
}
.main_Content{
    width: 1280px;
    margin: 0 auto;
    box-shadow: 0 1px 2px #ccc;
}
.scrollTop{
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  position: fixed;
  right:35px;
  bottom:50px;
  font-size: 20px;
  background: rgba(0,0,0,.6);
  box-shadow:0 0px 3px #666;
  border-radius: 50%;
  z-index: 333;
}
.scrollTop:hover{
  cursor: pointer;
  background: rgba(0, 0, 0,0.4);
}
.el-icon-arrow-up{
  color:#fff;
   /* #409eff; */
}
</style>
