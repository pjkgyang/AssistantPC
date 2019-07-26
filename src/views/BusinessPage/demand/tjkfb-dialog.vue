<template>
  <div>
    <el-dialog
      title="提交开发包"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-xqqr">
        <section>
          <div class="mg-12">
            <p class="pj-content" flex>
            <span class="filter-weight before-require">发包原因：</span>
            <el-input
              size="mini"
              type="text"
              style="width:650px"
              placeholder="请输入发包原因"
              v-model="filterData.fbyy"
            ></el-input>
           </p>     
           <p class="pj-content">
            <span class="filter-weight before-require">发包说明：</span>
            <el-input
              type="textarea"
              :rows="5"
              :maxlength="500"
              style="width:670px"
              placeholder="请输入备注内容"
              v-model="filterData.fbsm"
            ></el-input>
           </p>
           <p class="pj-content">
            <span class="filter-weight before-require">附件：</span>
            <uploadFile :Type="'demand'" :istb="isClearFile" @handleUploadFile="handleUploadFile"></uploadFile>
            </p>
          </div>

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
      isClearFile:false,
      filterData: {
        fbyy: "",
        fbsm:"",
        fjwid:"",
        fjmc:""
      }
    };
  },
  methods: {
    handleUploadFile(data) {
        this.filterData.fjwid = data[0].split('|')[0];
        this.filterData.fjmc = data[0].split('|')[1];
    },

    handleClickSure() {
		this.filterData.zbwid = this.zbwid;
		this.filterData.btnbh = this.btnbh;
      if (!this.validate()) return;

      this.$post(this.API.submitDemandFile, this.filterData).then(res => {
        if (res.state == "success") {
          this.$message({ message: "提交成功", type: "success" });
          this.filterData.fbyy =  this.filterData.fbsm = "";
          this.filterData.fjwid =  this.filterData.fjmc = "";
          this.visible = false;
          this.isClearFile = !this.isClearFile;
          this.$emit("handleClickSure", "");
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    validate() {
      if (/^[\s]*$/.test(this.filterData.fbsm)) {
        this.$alert("请输入说明内容", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (/^[\s]*$/.test(this.filterData.fbyy)) {
        this.$alert("请输入原因", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.filterData.fjwid) {
        this.$alert("请上传附件", "提示", {
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
	zbwid: {
      type: String,
      default: ""
    },
    btnbh: {
      type: String,
      default: ""
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
  components: {uploadFile}
};
</script>

<style scoped lang="scss">
.dialog-xqqr {
  padding: 8px 10px;
  section {
    div {
      > span {
      }
    }
  }
}
.dialog-xqqr section:nth-of-type(2) {
  margin: 10px 0;
}
.pj-title {
  font-weight: 700;
  width: 14%;
}
.pj-content {
  >span{
      display: inline-block;
      width: 100px;
  }
}
.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
