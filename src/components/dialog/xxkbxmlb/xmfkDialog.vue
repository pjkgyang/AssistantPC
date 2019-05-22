<template>
  <div class="dialog-xmfk">
    <el-dialog
      title="项目反馈"
      width="1000px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div style="padding:10px 15px">
        <el-form ref="form" :model="form" label-width="140px" class="xmfk-form">
          <el-form-item label="当前项目续签状态：">
           <span>{{xmData.xqwb==1?'是':'否'}}</span>
          </el-form-item>
          <el-form-item label="当前项目续签说明：">
           <span>{{!xmData.xqwbsm?'无':xmData.xqwbsm}}</span>
          </el-form-item>
          <el-form-item label="是否续签">
            <el-radio-group v-model="form.sfxq">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="说明" :required="form.sfxq == '0'">
            <el-input type="textarea" v-model="form.sm"></el-input>
          </el-form-item>

          <el-form-item text-right>
            <el-button type="primary" size="mini" @click="onSubmit">保存</el-button>
            <el-button size="mini" @click="visible = false">关闭</el-button>
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
      form:{
        sfxq:"0",
        sm:""
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
      onSubmit(){
				if(this.form.sfxq == '0' && /^[\s]*$/.test(this.form.sm)){
						this.$message({
							message:'请填写说明内容',
							type:"warning"
						})
						return;
				}
        this.$emit('handleSubmit',this.form);
      }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {

      } else {

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
.el-form-item__content{
    margin: 0 !important;
}
</style>
