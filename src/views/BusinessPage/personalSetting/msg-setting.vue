<template>
 <div>
      <div class="personal-setting-xxsz">
          <div>
            <h4>接收消息渠道 </h4>
              <el-checkbox :title="sort.text" v-for="(sort,i) in checkboxGroup" :key="i" :checked="sort.value" :label="sort.text" size="small" border
               @change="changeMessageSort(sort)"></el-checkbox>

          </div>
           <br>
          <div class="personal-setting-type">
            <h4>接收消息类别 </h4>
            <div v-for="(val, key, index) in checkboxGroupType">
              <h5>{{key}}</h5>
              <el-checkbox :title="type.text" v-for="(type,i) in val" :key="i" :checked="type.value" :label="type.text" size="small" border
                @change="changeMessageType(type)"></el-checkbox>
           </div>
          </div>
     </div>
 </div>
</template>

<script>
import {getMessageSwitch,saveMessageSwitch,getMessageTypeSwitch,saveMessageTypeSwitch} from '@/api/system.js'
 export default {
   data () {
     return {
       checkboxGroup:[],
       checkboxGroupType:{}
     }
   },
   mounted(){
       getMessageSwitch().then(({data})=>{ //获取消息分类设置
          if(data.state == 'success'){
            this.checkboxGroup = data.data
          }else{
            this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:"error",callback: action => {}});
          }
       })
       getMessageTypeSwitch().then(({data})=>{ //获取消息类型设置
          if(data.state == 'success'){
            this.checkboxGroupType = data.data
          }else{
            this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:"error",callback: action => {}});
          }
       })
   },
   methods:{
      changeMessageSort(param){  // 消息分类设置
        if(param.value){
          param.value = false
        }else{
          param.value = true
        }
        saveMessageSwitch({
          id:param.id,
          value:param.value
        }).then(({data})=>{
           if(data.state == 'success'){
              this.$message({message:param.value?'已成功开启 '+param.text:'已成功关闭 '+param.text,type: 'success'});
           }else{
              this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:"error",callback: action => {}});
           }
        })
      },
      changeMessageType(param){  // 消息类型设置
        if(param.value){
          param.value = false
        }else{
          param.value = true
        }
        saveMessageTypeSwitch({
          id:param.id,
          value:param.value
        }).then(({data})=>{
           if(data.state == 'success'){
              this.$message({message:param.value?'已成功开启 '+param.text:'已成功关闭 '+param.text,type: 'success'});
           }else{
              this.$alert(data.msg, '提示', {confirmButtonText: '确定',type:"error",callback: action => {}});
           }
        })
      }
   },
   components: {}
 }
</script>

<style scoped>
.personal-setting-xxsz{
   width: 85%;
   margin:5% auto 0;
}
.personal-setting-xxsz>div{
  margin-bottom: 10px;
}
.personal-setting-xxsz h4{
  font-size: 15px;
  font-weight: 700;
  margin:15px 0 5px 0 !important;
  border-bottom: 1px dotted #aaa;
  padding-bottom: 8px;
  margin-bottom:20px !important;
}
.personal-setting-type h5{
  font-weight: 700;
  margin: 10px 0 !important;

}

</style>
