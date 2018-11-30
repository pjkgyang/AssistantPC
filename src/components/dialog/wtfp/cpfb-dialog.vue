<template>
    <div>
        <el-dialog title="发布" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-xjjh">
                <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true">
                    <el-form-item label="产品" required>
                        <el-input :disabled="true" v-model="form.cpmc" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="发布说明" required>
                         <el-input type="textarea" v-model="form.sm" placeholder='请输入发布说明' style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="解决版本号" required>
                        <el-input  v-model="form.jjbbh" placeholder="" style="width:213px"></el-input>
                    </el-form-item>
                    <el-form-item label="发版日期" required>
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.fbsj" style="width:213px"></el-date-picker>
                    </el-form-item><br>
                    <el-form-item style="float:right">
                        <div>
                            <el-button type="primary" @click="handleCommit">保存</el-button>
                            <el-button @click="handleClose">取消</el-button>
                        </div>
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
        cpmc: "",
        sm:'',
        jjbbh:'',
        fbsj:''
      },
      pxxsList: []
    };
  },
  props:{
     show: {
      type: Boolean,
      default: false
    },
    planData:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
        if(!this.validate()) return;
        this.$confirm("确定要发布计划吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(this.API.publishProduct,{
          wid:this.planData.wid,
          fbsm:this.form.sm,
          jjbbh:this.form.jjbbh,
          fbsj:this.form.fbsj
        }).then(res=>{
          if(res.state == 'success'){
            this.visible = false;
            this.$alert("发布成功", "提示", {confirmButtonText: "确定",type:'success',
            callback:action=>{
               this.$emit('handleCommit','')  
            }});
          }
        })
      }).catch(() => {});
    },
    validate() {
      if (!this.form.sm) {
        this.$alert("请填写解决说明", "提示", {confirmButtonText: "确定",type:'warning'});
        return false;
      }
      if (!this.form.jjbbh) {
        this.$alert("请填写解决版本号", "提示", {confirmButtonText: "确定",type:'warning'});
        return false;
      }
      if (!this.form.fbsj) {
        this.$alert("请选择发版日期", "提示", {confirmButtonText: "确定",type:'warning'});
        return false;
      }
      return true;
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.sm = this.form.jjbbh = this.form.fbsj = '';
      } else {
        this.form.cpmc = this.planData.cpmc
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
