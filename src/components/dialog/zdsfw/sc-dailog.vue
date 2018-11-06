<template>
 <div>
      <el-dialog
            title="生成条件"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-qrbhfw">
                <el-form ref="form" :model="form" label-width="110px" size="mini">
                     <el-form-item label="服务开始日期" required>
                         <el-date-picker   type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.fwksrq" style="width:100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="服务期限(月)" required>
                        <el-input v-model="form.fwqx" placeholder="请输入服务期限（仅限正整数）"></el-input>
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
  data() {
    return {
      visible: this.show,
      form: {
        fwksrq:"",
        fwqx:"",
      },
      pickerBeginDate: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          return (
            time.getTime() < Date.now() - 8.64e7
          );
        }
      },
    };
  },
  methods: {
   
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
      if(!this.validate()) return;
      this.$emit('handleScSuccess',this.form);
    },
    
    validate(){
        if(!this.form.fwksrq){
            this.$alert('请选择服务开始日期!', '提示', {confirmButtonText: '确定',type:'warning'});
            return false;
        }
        if(!this.form.fwqx || !/^[1-9]\d*$/.test(this.form.fwqx)){
            this.$alert('请填写服务期限或格式有误!', '提示', {confirmButtonText: '确定',type:'warning'});
            return false;
        }
        return true;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmData:{
        type:Object,
        default:()=>{
            return {}
        }
    }
  },
  watch: {
    show(n, o) {
        this.visible = this.show;
      if (!n) {
        this.form.fwksrq = '';
        this.form.fwqx = '';
      } else {
        this.form.fwqx = this.xmData.fwqx
        this.form.fwksrq = this.xmData.fwksrq
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-qrbhfw {
  padding: 15px 30px;
}
.el-form-item--mini.el-form-item {
  margin-bottom: 8px;
}
</style>
