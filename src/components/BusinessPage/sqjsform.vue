<template>
  <div>
      <el-form ref="form" :model="form" label-width="80px" size="mini">
                    <el-form-item label="难易程度">
                     <el-select v-model="form.nycd" placeholder="请选择">
                        <el-option label="高" value="4"></el-option>
                        <el-option label="中" value="3"></el-option>
                        <el-option label="一般" value="2"></el-option>
                        <el-option label="低" value="1"></el-option>
                    </el-select>
                  </el-form-item>   
                  <el-form-item label="是否紧急">
                     <el-select v-model="form.sfjj" placeholder="请选择">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>   
                  <el-form-item label="工时">
                      <el-input v-model="gs" placeholder="工时 例如:2.5" style="width:174px" readonly></el-input>
                      <span style="color:#A8A8A8;font-size:14px;margin-left:25px">提示:该工时为回复累加工时,不能修改！</span>
                  </el-form-item>   
                   <el-form-item label="是否bug">
                      <el-switch v-model="form.sfbg"></el-switch>
                  </el-form-item>  
                   <el-form-item label="关闭说明">
                        <el-input type="textarea" v-model="form.gbsm" resize="none" rows="4"></el-input>
                    </el-form-item>
                     <el-form-item style="text-align:right">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                        <el-button type="info" @click="closeForm">取消</el-button>
                    </el-form-item>
        </el-form> 
  </div>
</template>
<script>
export default {
  data(){
      return {
            form:{
             nycd:'4',
             sfjj:'0',
             gs:0,
             sfbg:false,
             gbsm:""
          },
      }
  },
  props:{
      gs:{
        type:Number,
        default:0
      }  
  },
  methods:{
    submitForm(){
         let reg = /^\d+(\.\d+)?$/;
            if(!reg.test(this.form.gs)){
                this.$alert('请填写正确工时', '提示', {
                confirmButtonText: '确定',
                type:'warning'
            });
            return;
        }
        this.form.gs = this.gs
       this.$emit('submitForm',this.form);
    },
    closeForm(){
       this.$emit('closeForm','');
    },
  }
}
</script>
<style scoped>

</style>
