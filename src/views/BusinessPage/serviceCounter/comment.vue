<template>
 <div>
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="sm"></el-input>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         sm:''
     }
   },
   props:{
       istj:{
           type:Boolean,
           default:false
       }
   },
   watch:{
       istj(n,o){
           this.sm = '';
       }
   },   
   components: {}
 }
</script>

<style scoped>

 
</style>
