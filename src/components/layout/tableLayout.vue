<template>
    <div class="month-content-layout">
        <div class="month-content-top"  >
            <h5 class="filter-conditions" v-html="title"></h5>
            <slot name="top"></slot>  
        </div>
        <div class="month-content-bottom">
             <slot name="bottom"></slot> 
        </div>
    </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   props:{
       title:{
            type:String,
            default:''
       }
   },
   components: {}
 }
</script>

<style scoped>
.month-content-layout{
    padding-bottom:12px;
}
 .month-content-top{
    margin-bottom: 8px;
}
.month-content-bottom{
    margin-top: 8px;
}
.filter-conditions{
    font-weight:800;
    font-size: 15px;
    margin-bottom: 8px !important;
    color: #464C5B;
}
</style>

