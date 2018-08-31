<template>
  <div>
      <el-select v-model="value" placeholder="请选择" @change="handleSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
  </div>
</template>
<script>
export default {
  data(){
      return{
        value:1,        
      }
  },
  props:{
      options:{
          type:Array,
          default:function(){
              return []
          }
      },
    //   value:{
    //        type:Number,
    //        default:1
    //   }
  },
  methods:{
      handleSelect(data){
            this.$emit("handleSelect",data)
      }
  }
}
</script>
<style scoped>

</style>
