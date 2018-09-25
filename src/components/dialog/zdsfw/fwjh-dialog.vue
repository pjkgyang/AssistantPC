<template>
 <div>
      <el-dialog
            title="新增服务计划"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-qrbhfw">
                <el-form ref="form" :model="form" label-width="110px" size="mini">
                    <el-form-item label="产品" required>
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="服务内容" required>
                        <el-select v-model="form.region" placeholder="请选择活动区域" style="width:100%;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计划完成时间" required>
                             <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.date" style="width:100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动形式" prop="desc" required>
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item text-right>
                        <el-button type="primary" @click="handleCommit">保存</el-button>
                        <el-button @click="handleClose">取消</el-button>
                    </el-form-item>
                    </el-form>  
            </div>
        </el-dialog>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         visible:this.show,
         form: {
          name: '',
          region: '',
          date: '',
          desc: ''
        }
     }
   },
   methods:{
       handleClose(){  
           this.visible = false
       },
       handleCommit(){
           console.log(this.form)
       },
   },
   props:{
        show: {
            type: Boolean,
            default:false
        },
   },
   watch: {
        show (n,o) {
            this.visible = this.show;
            if(!n){
              
            }else{

            }
        }
    },
   components: {}
 }
</script>

<style scoped>
.dialog-qrbhfw{
    padding:15px 30px;
}
.el-form-item--mini.el-form-item{
    margin-bottom:8px;
}
 
</style>
