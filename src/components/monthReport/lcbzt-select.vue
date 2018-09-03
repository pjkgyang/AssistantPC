<template>
 <div>
      <el-select :style="{width:'160px'}"  v-model="multipleLcbzt" size="small" multiple   collapse-tags placeholder="请选择里程碑状态" @change="handleChangeLcbzt">
        <el-option v-for="item in lcbztList"  :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         lcbztList:[
             {label:'计划中',value:1},
             {label:'处理中',value:2},
             {label:'已完成',value:3},
            //  {label:'停滞',value:4},
            //  {label:'关闭',value:5},
            //  {label:'取消',value:6},
            //  {label:'待定',value:7},
            //  {label:'完成待确认',value:9},
         ],
         multipleLcbzt:this.multipleLcbztList
     }
   },
   props:{
       width:{
           type:String,
           default:'300px'
       },
       multipleLcbztList:{
           type:Array,
           default:function(){
               return []
           }
       }
   },
   methods:{
       handleChangeLcbzt(val){
           this.$emit('handleChangeLcbzt',val);
       }
   },
   components: {}
 }
</script>

<style scoped>


</style>
