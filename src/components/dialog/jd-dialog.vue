<template>
 <div>
      <el-dialog
            title="新增进度"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-jd">
              <el-form ref="form" :model="form"  label-width="100px" size="small" style="padding-right:15px;">
                  <!-- <el-form-item label="计划工时">
                    <el-input v-model="form.gs" placeholder="请输入计划工时" ></el-input>
                  </el-form-item> -->
                  <el-form-item label="是否完成" v-if="isweekzj">
                        <el-switch v-model="form.zt" active-color="#13ce66" @change="changeSwitch"></el-switch>&nbsp;
                        <span class="month-plan-explain">{{!form.zt?'否':'是'}}</span>
                  </el-form-item>
                  <el-form-item label="工作内容" required>
                     <el-input type="textarea" :maxlength="300" placeholder="请输入工作内容(最大300字)" v-model="form.gzms" :rows="5" :cols="69"></el-input>
                  </el-form-item>
                  <el-form-item label="未完成原因" required v-if="isweekzj && !form.zt">
                     <el-input type="textarea" :maxlength="300" placeholder="请输入未完成原因(最大300字)" v-model="form.wwcyy" :rows="3" :cols="69"></el-input>
                  </el-form-item>
                  <el-form-item label="后续措施" required  v-if="isweekzj && !form.zt">
                     <el-input type="textarea" :maxlength="300"  placeholder="请输入后续措施(最大300字)" v-model="form.hxcs" :rows="3" :cols="69"></el-input>
                  </el-form-item>
                  <div flex>
                      <p style="min-width:100px;text-align:right;font-weight:700;padding-right:12px;white-space:nowrap">
                        <!-- <span class="el-icon-question" title="注 : 项目任务必须关联任务，非项目任务无须关联任务"></span> 关联任务 -->
                        <span class="before-require">关联任务</span>
                      </p>
                      <p >
                          <span v-if="isaddTask" class="el-icon-circle-plus" style="font-size:18px;" title="添加任务" @click="addDailyTasks"></span>
                          <span style="color:#999">{{taskName}}</span>    
                      </p>
                    </div>

                    <div style="text-align:right;padding:10px;">
                      <el-button size="small" @click="resetForm('formData')">重置</el-button>
                      <el-button size="small" type="primary"  @click="submitForm('formData')">保存</el-button>
                    </div>
                </el-form>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="dialogTaskVisible" title="关联任务" width="900px" :append-to-body="true" :close-on-click-modal="false">
            <dialogTask :dialogTaskVisible="dialogTaskVisible" @chooseRevelenceTask="chooseRevelenceTask"></dialogTask>
        </el-dialog> 
 </div>
</template>

<script>
import dialogTask from '@/components/BusinessPage/dialogTask.vue'

export default {
  data() {
    return {
      dialogTaskVisible:false,
      visible: this.show,
      form:{
        zt:false,
        gzms:'',
        xmbh:'',
        rwbh:'',
        lcbbh:'',
        wwcyy:'',
        hxcs:''
      },
      taskName:'',
    };
  },
  props:{
      show: {
        type: Boolean,
        default: false
      },
      taskInfo:{
        type:Object,
        default:function(){
          return {}
        }
      },
      isweekzj:{
        type: Boolean,
        default: false
      },
      isaddTask:{
        type: Boolean,
        default: true
      }
  },
  methods: {
    changeSwitch(){

    },
    handleClose() {
      this.visible = false;
    },
    handleClickSure() {
      this.$emit("handleClickSure", this.pznr);
    },
    addDailyTasks(){  //选择任务
        this.dialogTaskVisible = !this.dialogTaskVisible
    },
    submitForm(){
        if(!this.validate()) return;
        this.form.zt = !this.form.zt?0:1
        this.$emit('handleSubmit',this.form)
    },
    resetForm(){ 
      this.form.gzms = '';
      this.form.wwcyy = '';
      this.form.hxcs = '';
      this.taskName = ''
    },

    chooseRevelenceTask(data){ //选择任务（确定）
      this.taskName = data.rwmc
      this.form.xmbh = data.xmbh;
      this.form.rwbh = data.rwbh;
      this.form.lcbbh = data.lcbbh;
      this.dialogTaskVisible = !this.dialogTaskVisible 
    },
    validate(){
        if(!this.form.gzms){
              this.$alert('请填写工作内容','提示', {confirmButtonText: '确定',type:"warning",callback: action => {}});
              return false;
        }
        if(!!this.isweekzj){
          if(!this.form.zt){
              if(!this.form.wwcyy || !this.form.hxcs){
                this.$alert(!this.form.wwcyy?'请填写未完成原因':'请填写后续措施','提示', {confirmButtonText: '确定',type:"warning",callback: action => {}});
                return false;
              }
          }else{
             this.form.wwcyy = '';
             this.form.hxcs = '';
          }          
        }
        if(!this.taskName){
              this.$alert('请选择关联任务','提示', {confirmButtonText: '确定',type:"warning",callback: action => {}});
              return false;
        }
      return true;
    }
  },

  watch: {
    show(n,o) {
      this.visible = this.show;
      if(n){
        if(this.taskInfo.xmbh){
           if(!!this.isweekzj){
             this.form.zt = this.taskInfo.zt==0?false:true
             if(!this.form.zt){
               this.form.wwcyy = this.taskInfo.wwcyy
               this.form.hxcs = this.taskInfo.hxcs
             }else{
               this.form.wwcyy = '';
               this.form.hxcs = '';
             }
           }
          this.form.gzms = this.taskInfo.gzms
          this.form.xmbh = this.taskInfo.xmbh
          this.form.rwbh = this.taskInfo.rwbh
          this.form.lcbbh = this.taskInfo.lcbbh
          this.taskName = this.taskInfo.xmmc+'—'+this.taskInfo.cpmc+'—'+this.taskInfo.rwmc
        }else{
          this.form.gzms = ''
          this.taskName = ''
          this.form.wwcyy = '';
          this.form.hxcs = '';
          this.form.zt = false
       }
      }
    }
  },
  components: {dialogTask}
};
</script>

<style scoped>
.dialog-jd{
  padding: 10px 0;
}
.el-icon-circle-plus:hover{
  cursor: pointer;
}
.el-form-item{
  margin-bottom:10px;
}
.el-icon-question{
  color: #f00;
}
</style>
