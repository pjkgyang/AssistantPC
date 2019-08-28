<template>
  <div>
    <el-dialog
      title="驳回"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-pj">
        <section flex>
          <span class="filter-weight">附件：</span>
          <p class="pj-content">
            <uploadFile
              :Type="'demand'"
              :isClearFile="isClearFile"
              @handleUploadFile="handleUploadFile"
            ></uploadFile>
          </p>
        </section>

        <section>
          <p class="pj-content">
            <el-input
              type="textarea"
              :rows="5"
              :maxlength="500"
              style="width:670px"
              placeholder="请输入说明内容"
              v-model="formData.sm"
            ></el-input>
          </p>
        </section>
        <section class="pj-btn-group">
          <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import uploadFile from "@/components/BusinessPage/upload.vue";
export default {
  data() {
    return {
      visible: this.show,
      isClearFile: false,
      formData: {
        sm: "",
        fjwid: "",
        fjmc: ""
      }
    };
  },
  methods: {
    handleUploadFile(data) {
      this.formData.fjmc = data[0].split("|")[1];
      this.formData.fjwid = data[0].split("|")[0];
      console.log(this.formData);
    },

    handleClickSure() {
      if (!this.validate()) return;
      this.$emit("handleClickSure", this.formData);
    },
    validate() {
      if (/^[\s]*$/.test(this.formData.sm)) {
        this.$alert("请填写说明内容", "提示", {
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
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.formData.sm = "";
        this.formData.fjwid = "";
        this.formData.fjmc = "";
        this.isClearFile = !this.isClearFile;
      } else {
      }
    }
  },
  components: { uploadFile }
};
</script>

<style scoped>
.dialog-pj {
  padding: 8px 10px;
}
.dialog-pj section:nth-of-type(2) {
  margin: 10px 0;
}
.pj-title {
  font-weight: 700;
  width: 14%;
}
.pj-content {
  width: 86%;
}
.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
