<template>
    <div>
        <el-dialog :title="title" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-xjjh">
                <el-form ref="form" :model="form" label-width="110px" size="mini" :inline="true">
                    <el-form-item label="问题标题" required>
                        <el-input :disabled="true" v-model="form.wtbt" placeholder="" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="产品" required>
                        <el-input :disabled="true" v-model="form.cpmc" placeholder="" style="width:213px"></el-input>
                    </el-form-item>
                    <el-form-item label="提出日期" required>
                        <el-input :disabled="true" v-model="form.fbrq" placeholder="" style="width:213px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="问题分析" required>
                        <el-input type="textarea" v-model="form.wtfx" placeholder="请输入问题分析(1000字以内)" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="下一步计划" required>
                        <el-input type="textarea" v-model="form.xybjh" placeholder="请输入下一步计划(100字以内)" style="width:550px"></el-input>
                    </el-form-item><br>
                    <el-form-item label="计划完成时间" required>
                        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhwcsj" style="width:213px"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="责任人" required>
                        <el-input v-model="form.zrrxm" placeholder="请选择责任人" style="width:213px" @focus="handleChooseZrr"></el-input>
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
        <zrrDialog :show.sync="zrrShow" @handleAddZrr="handleAddZrr"></zrrDialog>
    </div>
</template>

<script>
import zrrDialog from "@/components/dialog/wtfp/zrr-dialog.vue";
export default {
  data() {
    return {
      visible: this.show,
      title:'新建计划',
      zrrShow: false,
      form: {
        wtbt: "",
        cpmc: "",
        fbrq: "",
        wtfx: "",
        xybjh: "",
        jhwcsj: "",
        zrrxm: "",
        zrrbh: ""
      },
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
        if(!this.valiDate()) return;
        this.$post(this.API.addOrUpdateProductPlan,{
            wid:this.isEdit?this.questionData.wid:'',
            wtwid:!this.questionData.wtwid?this.questionData.wid:this.questionData.wtwid,
            cpbh:this.questionData.cpbh,
            cpmc:this.questionData.cpmc,
            wtfx:this.form.wtfx,
            xybjh:this.form.xybjh,
            jhwcsj:this.form.jhwcsj,
            zrrbh:this.form.zrrbh,
            zrrxm:this.form.zrrxm
        }).then(res=>{
            if(res.state == 'success'){
                this.visible = false;
                this.$alert(this.isEdit?"编辑成功":"新建成功", "提示", {confirmButtonText: "确定",type:'success',
                callback:action=>{
                     this.$emit('handleSavesuccess','')
                   }
                });
            }else{
                this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
            }
        })
    },
    handleChooseZrr() {
      this.zrrShow = !this.zrrShow;
    },
    handleAddZrr(data) {
      this.form.zrrbh = data.userid;
      this.form.zrrxm = data.username;
      this.zrrShow = !this.zrrShow;
    },

    valiDate() {
      if (!this.form.wtfx) {
        this.$alert("请输入问题分析", "提示", {confirmButtonText: "确定",type:'warning'});
        return false;
      }
      if (!this.form.xybjh) {
        this.$alert("请输入下一步计划", "提示", { confirmButtonText: "确定",type:'warning'});
        return false;
      }
      if (!this.form.jhwcsj) {
        this.$alert("请选择计划完成日期", "提示", { confirmButtonText: "确定",type:'warning'});
        return false;
      }
      if (!this.form.zrrbh) {
        this.$alert("请选择责任人", "提示", { confirmButtonText: "确定",type:'warning'});
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
    questionData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    isEdit:{
      type: Boolean,
      default: false  
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.wtfx = '';
        this.form.xybjh = '';
        this.form.jhwcsj = '';
        this.form.zrrxm = '';
        this.form.zrrbh = '';
      } else {
          this.form.cpmc = this.questionData.cpmc
          this.form.fbrq = this.questionData.fbrq; 
        if(!this.isEdit){
          this.wid = '';
          this.form.wtbt = this.questionData.bt;
        }else{
          this.wid = this.questionData.wid;
          this.form.wtbt = this.questionData.wtbt;
          this.form.wtfx = this.questionData.wtfx;
          this.form.xybjh = this.questionData.xybjh;
          this.form.jhwcsj = this.questionData.jhwcsj;
          this.form.zrrbh = this.questionData.zrrbh;
          this.form.zrrxm = this.questionData.zrrxm;
        }
      }
    },
    isEdit(n,o){
      if(n){
        this.title = '编辑计划'
      }else{
        this.title = '新建计划'
      }
    }
  },
  components: { zrrDialog }
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
