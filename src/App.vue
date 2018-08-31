<template>
  <div id="app">
    <!-- <keep-alive>     -->
      <router-view/>
    <!-- </keep-alive> -->
    <div class="footerBar">
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

<style scoped>

#app{
    position:relative;  
    width:100%;
    height:100%; 
}
.footerBar{
    position:absolute;
    bottom:0px;
    left:0px;
    width: 100%;
}

</style>
