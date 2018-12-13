<template>
  <div>
    <el-dialog title="项目设置" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-pz">
        <section class="pd-10 itemSet-group">
          <p>
              <span class="filter-weight">甲方：</span> 
              <span>{{!xmData.yh?'无':xmData.yh}}</span>
          </p>
          <p>
              <span class="filter-weight">学校：</span>
              <span>{{xmData.dwmc?xmData.dwmc:xmData.xx}}</span>
          </p>
          <p>
               <span class="filter-weight">是否直签：{{value?'是':'否'}}</span>&#x3000;
               <el-switch v-model="value" active-color="#13ce66" inactive-color="#dcdfe6"></el-switch>
          </p>
        </section>
        <section text-right class="pd-10">
          <el-button type="primary" size="mini" @click="handleCommit">保存</el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      xmData:{},
      value: false,
    };
  },
  methods: {
    handleCommit() {
          this.$post(this.API.updateProjectSignType,{
              xmbh: this.xmbh,
              sfzq:this.value?1:0
            }).then(res => {
            if (res.state == "success") {
              this.visible = false;
              this.$alert("保存成功", "提示", {confirmButtonText: "确定",type: "success",
              callback: action => {
                  this.$emit('handleSuccess',this.value)
              }});
            }else{
               this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"}); 
            }
          });
     },
    handleClose() {
      this.visible = false;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: false
    },
    xmDetail: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted(){
   
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
       
      } else {
        this.xmData = this.xmDetail;
        if(this.xmData.sfzq == 1){
            this.value = true
        }else{
            this.value = false
        }
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-pz {
  padding: 8px 10px;
}
</style>
