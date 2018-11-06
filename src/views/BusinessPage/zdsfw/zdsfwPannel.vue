<template>
 <div>
     <zdsfwPannel :nxmbh="$route.query.xmbh"></zdsfwPannel>
 </div>
</template>

<script>
import zdsfwPannel from '@/components/zdsfw/zdsfw.vue'
 export default {
   data () {
     return {
         xmbh:''
     }
   },
   beforeMount(){
      
   },
   components: {zdsfwPannel}
 }
</script>

<style scoped>

 
</style>
