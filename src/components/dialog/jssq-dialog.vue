<template>
    <div>
        <el-dialog title="项目结算" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-jssq">
                <section flex >
                    <span class="jssq-title">分包名称：</span>
                    <span class="jssq-content">
                        <el-input readonly size="mini" v-model="data.fbmc" style="width:500px;"></el-input>
                    </span>
                </section>
                <section flex>
                    <span class="jssq-title before-require">结算点：</span>
                    <span class="jssq-content">
                        <el-select size="mini" v-model="form.jsd" placeholder="请选择" style="width:500px;">
                            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                     </span>
                </section>
                <section flex>
                    <span class="jssq-title before-require">实施开始时间：</span>
                    <span class="jssq-content">
                        <el-date-picker style="width:500px;" size="mini" v-model="form.sskssj" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </span>
                </section>
                <section flex>
                    <span class="jssq-title before-require">实施结束时间：</span>
                    <span class="jssq-content">
                        <el-date-picker style="width:500px;" size="mini" v-model="form.ssjssj" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </span>
                </section>
                <section flex>
                    <span class="jssq-title before-require">结算申请说明：</span>
                    <span class="jssq-content">
                        <el-input style="width:500px;" type="textarea" :rows="2"  placeholder="请输入结算说明" v-model="form.sqjssm"></el-input>
                    </span>
                </section>
                <section class="jssq-btn-group">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
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
      options: [],
      form: {
        jsd: "",
        sskssj: "",
        ssjssj: "",
        sqjssm: ""
      }
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleClickSure() {
      if (!this.validate()) return;
      this.$emit("handleClickSure", this.form);
    },
    validate() {
      if (!this.form.jsd) {
        this.$alert("请选择结算点", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.sskssj) {
        this.$alert("请选择开始时间", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.ssjssj) {
        this.$alert("请选择结束时间", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.sqjssm) {
        this.$alert("请填写结算说明", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
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
    data: {
      type: Object,
      default: () => {
        return {
          fbmc: "",
          fbbh: "",
          xmbh: ""
        };
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
          this.form.jsd = '';
          this.form.sskssj = '';
          this.form.ssjssj = '';
          this.form.sqjssm = '';
      } else {
          this.$get(this.API.settlementPoints,{
              xmbh:this.data.xmbh,
              fbbh:this.data.fbbh
          }).then(res=>{
              if(res.state == 'success'){
                  if(!res.data){
                     this.options = []
                  }else{
                     this.options = res.data
                  }
              }
          })
      }
    }
  },
  components: {}
};
</script>

<style   scoped>
.dialog-jssq {
  padding: 8px 10px;
}
.dialog-jssq section {
  margin: 10px 0;
}
.jssq-title {
  font-weight: 700;
  width: 20%;
  text-align: right;
}
.jssq-content {
  width: 86%;
}
.jssq-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
