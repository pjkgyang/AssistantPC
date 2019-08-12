<template>
  <div id="app">
      <!-- <keep-alive>     -->
        <router-view/>
        <!-- </keep-alive> -->
        <el-backtop target="#app" :bottom="100"></el-backtop>
    </div>
  </div>
</template>

<script>
import style from './style.scss'
export default {
  name: 'App',
  data(){
   return{
     
   }
  },

  methods:{ },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>

#app{
    position:relative;  
    width:100%;
    height:100%; 
    overflow-y: auto;
}
.el-icon-arrow-up {
  color: #fff;
}
</style>
