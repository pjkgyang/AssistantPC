<template>
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(data,index) in crumb" :key="index" :to="{path:data.path}" :title="data.mc">{{data.mc}}</el-breadcrumb-item>
         </el-breadcrumb>
  </div>
</template>
<script>
export default {
  
  props:{
    crumb:{
        type:Array,
        default:function(){
            return []
        }
    }  
  }
}
</script>
<style>

</style>
