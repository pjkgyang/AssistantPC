<template>
  <div>
    <el-dialog
      title="关闭需求"
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
            <span class="filter-weight">原型附件：</span>
            <a
              v-if="!!demandDetail.yxfjmc"
               :href="demandDetail.yxfjurl+'&USERID='+userInfo.userName+'&USRNAME='+userInfo.nickName+'&SIGN='+des+'#/fbxq'"
            >{{demandDetail.yxfjmc}}</a>
            <span v-if="!demandDetail.yxfjmc">无</span>
          </div>
          <div>
            <span class="filter-weight">开发包附件：</span>
            <a
              v-if="!!demandDetail.kffjmc"
              :href="demandDetail.kffjurl+'&USERID='+userInfo.userName+'&USRNAME='+userInfo.nickName+'&SIGN='+des+'#/fbxq'"
            >{{demandDetail.kffjmc}}</a>
            <span v-if="!demandDetail.kffjmc">无</span>
          </div>
          <div flex class="mg-12">
            <span class="filter-weight">评价：</span>
            <el-rate v-model="filterData.pj" :texts="texts" show-text></el-rate>
          </div>
          <p class="pj-content">
            <span class="filter-weight">备注：</span>
            <el-input
              type="textarea"
              :rows="5"
              :maxlength="500"
              style="width:670px"
              placeholder="请输入备注内容"
              v-model="filterData.nr"
            ></el-input>
          </p>
        </section>
        <section class="pj-btn-group">
          <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
          <el-button size="small" @click="handleClose">取消</el-button>
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
      texts: ["1分", "2分", "3分", "4分", "5分"],
      filterData: {
        nr: "",
        pf: 5
      },
      userInfo:{},
      des:''
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleClickSure() {
      this.filterData.zbwid = this.zbwid;
      this.filterData.btnbh = this.btnbh;
      if (!this.validate()) return;

      this.$post(this.API.confirmDvpt, this.filterData).then(res => {
        if (res.state == "success") {
          this.$message({ message: "提交成功", type: "success" });
          this.filterData.nr = "";
          this.filterData.pf = 5;
          this.visible = false;
          this.$emit("handleClickSure", "");
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    validate() {
      if (/^[\s]*$/.test(this.filterData.nr)) {
        this.$alert("请输入备注内容", "提示", {
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
    },
    demandDetail: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
          this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
          this.des = encryptByDES("assistant" + this.userInfo.userName, "WISEDUUSER");
      } else {
      }
    }
  },
  components: {}
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
  width: 86%;
}
.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
