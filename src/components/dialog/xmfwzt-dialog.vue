<template>
    <div>
        <el-dialog title="修改项目配置" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-pz">
                <section class="pd-10 itemSet-group">
                    <p>
                        <span class="filter-weight">项目服务状态：{{value?'启动':'停止'}}</span>
                        <span>
                            <el-switch v-model="value" active-color="#13ce66" inactive-color="#dcdfe6">
                            </el-switch>
                        </span>
                    </p>
                    <p>
                        <span class="filter-weight before-require">{{value?'启动说明:':'停止说明:'}}</span>
                        <span>
                            <el-input type="textarea" :rows="4" :placeholder="value?'请输入启动说明:':'请输入停止说明:'" v-model="textarea">
                            </el-input>
                        </span>
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
      value: false,
      textarea: ""
    };
  },
  methods: {
    handleCommit() {
      if (!this.textarea) {
        this.$alert("请填写停止说明", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      } else {
        this.$confirm(this.value?"您是否确定启动服务？":"您是否确定停止服务？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
            this.$post(
              this.value
                ? this.API.startAfterSalesService
                : this.API.stopAfterSalesService,
              {
                xmbh: this.xmbh,
                sm:this.textarea
              }
            ).then(res => {
              if (res.state == "success") {
                this.$alert("保存成功", "提示", {
                  confirmButtonText: "确定",
                  type: "success"
                });
                this.visible = false;
              }
            });
          }).catch(() => {});
      }
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
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
      } else {
         this.textarea = '';  
        if (this.xmDetail.gcfwzt == "0") {
          this.value = false;
        } else {
          this.value = true;
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
