<template>
  <div  class="emptyContent">
  	<img src="static/img/empty.png" alt="" />
  	<p class="filter-weight">暂无内容</p>
  </div>
</template>

<script>
  export default{
    data(){
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  .emptyContent{
    text-align:center;
    padding:30px 0;
    color: #999;
    img{
      width: 100px !important;
      height: 100px !important;
    }
  }
</style>
