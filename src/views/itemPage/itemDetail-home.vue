<template>
  <div style="height:100%;min-height:100%;">
    <div v-if="navshow">
        <div class="main_TopNav" >
           <img src="../../../static/img/logo2.png" alt="">
           <span>金智教育工程小助手</span>
        </div>
        <div style="height:50px"></div>
    </div>
    <div style="100%" class="main_page">
             <router-view></router-view>
    </div>
  </div>
</template>
<script>
import headerUser from '@/components/BusinessPage/header.vue'
export default {
  data(){
      return{
         loginShow:true,
         userNav:[],
         navshow:true
      }
  },
  methods:{

  },
  mounted(){
     
  },

  components:{headerUser}
}
</script>
<style scoped>
.main_TopNav{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 188;
    height: 50px;
    background: #fff;
    padding: 0 20px;
    line-height: 50px;
    box-shadow: 0 1px 1px #ccc;
}
.main_TopNav span{
    color:#444;
    font-weight: 700;
    font-size: 18px;
    margin-left: 15px;
}
.main_Content{
    width: 1280px;
    margin: 0 auto;
    box-shadow: 0 1px 2px #ccc;
}

</style>
