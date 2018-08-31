<template>
  <div>
      <el-popover
        ref="popover4"
        placement="left"
        width="200"
        trigger="click">
        <div>
            <h1>  === </h1>
        </div>
      </el-popover>
  </div>
</template>
<script>
export default {
  props:{
      popver:{
          type:String,
          default:''
      }
  }
}
</script>
<style scoped>

</style>
