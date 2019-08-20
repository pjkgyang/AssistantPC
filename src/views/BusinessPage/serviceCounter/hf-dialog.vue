<template>
  <div>
    <el-dialog
      title="用户回访"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-bj">
        <section>
          
          <div flex>
              <span class="filter-weight before-require">是否解决：</span>
              <el-radio-group v-model="filterData.sfjj">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
          </div>

          <!-- <div flex class="mg-12  before-require">
            <span class="filter-weight">服务评价：</span>
            <el-rate v-model="filterData.pf" :texts="texts" show-text></el-rate>
          </div> -->

          <p class="pj-content">
            <span class="filter-weight">说明：</span>
            <el-input
              v-model="filterData.nr"
              type="textarea"
              :rows="5"
              :maxlength="500"
              style="width:670px"
              placeholder="请输入说明内容"
            ></el-input>
          </p>
        </section>
        <section class="pj-btn-group" text-right>
          <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
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
        pf: 5,
        sfjj:"1"
      }
    };
  },
  props:{
    show: {
      type: Boolean,
      default: false
    },
    wid:{
      type:String,
      default:''
    }
  },
  methods: {
    handleClickSure() {
      // if (!this.validate()) return;
      this.$post(this.API.returnVisit,{
        zbwid:this.wid,
        sm:this.filterData.nr,
        // pf:this.filterData.pf,
        sfjj:this.filterData.sfjj
      }).then(res=>{
        if(res.state == 'success'){
           this.$message({message: "提交成功",type: "success" });
           this.filterData.nr = '';
           this.filterData.pf = 5;
           this.filterData.sfjj = "1";
           this.visible = false;
           this.$emit('handleCommitHf','')
        }else{
          this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
          });
        }
      })
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

<style scoped lang="scss">
.dialog-bj {
  padding: 8px 10px;
}
.dialog-bj section:nth-of-type(2) {
  margin: 10px 0;
}
.pj-title {
  font-weight: 700;
  width: 14%;
}
.pj-content {
  width: 86%;
}

</style>
