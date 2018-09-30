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
                         <el-select v-model="cpbh" placeholder="请选择产品" style="width:100%;" @change="handleChangeCpValue">
                            <el-option v-for="(cp,index) in cpList" :key="index" :label="cp.text" :value="cp.id+'&'+cp.text"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务内容" required>
                        <el-select v-model="form.fwnr" placeholder="请选择服务内容" style="width:100%;">
                           <el-option v-for="(fwnr,index) in fwnrList" :key="index" :label="fwnr.text" :value="fwnr.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计划完成时间" required>
                         <el-date-picker :picker-options="pickerBeginDate"  type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhjsrq" style="width:100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="说明" required>
                        <el-input type="textarea" v-model="form.sm" placeholder="请填写说明内容" :rows="6"></el-input>
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
      fwnrList:[],
      form: {
        cpbh: "",
        cpmc:"",
        fwnr: "",
        jhjsrq: "",
        sm: ""
      },
      cpbh:'',
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
    handleChangeCpValue(value) {
      this.form.cpbh = value.split('&')[0];
      this.form.cpmc = value.split('&')[1];
      this.listFwnrByCp();
    },
    handleClose() {
      this.visible = false;
    },
    handleCommit() {
      if(!this.validate()) return;
      this.$emit('handleCommitFWJH',this.form)
    },

        // 获取服务内容
    listFwnrByCp(){
      this.$get(this.API.listFwnrByCp,{
        cpbh:this.form.cpbh,
        cpmc:this.form.cpmc,
      }).then(res=>{
        if(res.state == 'success'){
           this.fwnrList = res.data;
        }
      })  
    },

    validate(){
        if(!this.cpbh){
            this.$alert('请选择产品!', '提示', {confirmButtonText: '确定',type:'warning'});
            return false;
        }
        if(!this.form.fwnr){
            this.$alert('请选择服务内容!', '提示', {confirmButtonText: '确定',type:'warning'});
            return false;
        }
        if(!this.form.jhjsrq){
            this.$alert('请选择计划完成日期!', '提示', {confirmButtonText: '确定',type:'warning'});
            return false;
        }
        if(!this.form.sm){
            this.$alert('请填写说明内容!', '提示', {confirmButtonText: '确定',type:'warning'});
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
    cpList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    show(n, o) {
        this.visible = this.show;
      if (!n) {
        this.fwnrList = [];
        this.cpbh = '';
        this.form.fwnr = '';
        this.form.jhjsrq = '';
        this.form.sm = ''
      } else {

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
