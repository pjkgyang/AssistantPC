<template>
 <div>
      <el-dialog
            title="批注"
            width="700px"
            top="30px"
            :visible.sync="visible"
            :append-to-body="true"
            :close-on-click-modal="false"
            @close="$emit('update:show', false)"
            :show="show">
            <div class="dialog-pz">
                <section flex>
                    <span class="pz-title before-require">批注内容</span>
                    <span class="pz-content">
                        <el-input type="textarea" :maxlength="500" rows="10" :cols="90" laceholder="请输入内容" v-model="pznr"></el-input>
                    </span>
                </section>
                <section flex v-if="pzlbShow">
                    <span class="pz-title pz-history-title">历史批注</span>
                    <span class="pz-content">
                         <el-table
                            :data="tableData" max-height="250"
                            border
                            style="width: 100%">
                            <el-table-column prop="yhxm" label="姓名" width="90"> </el-table-column>
                            <el-table-column prop="createTime" label="日期" width="160"> </el-table-column>
                            <el-table-column prop="comment" label="批注内容" show-overflow-tooltip> </el-table-column>
                        </el-table>
                    </span>
                </section>
                <section class="pz-btn-group">
                    <el-button size="small" @click="handleClose">取消</el-button>
                    <el-button size="small" type="primary"  @click="handleClickSure">确定</el-button>
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
      pznr: ""
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleClickSure() {
      this.$emit("handleClickSure", this.pznr);
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    pzlbShow:{
      type: Boolean,
      default: true
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    show(n,o) {
      this.visible = this.show;
      if(!n){
          this.pznr = ''
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
.dialog-pz section:nth-of-type(2) {
  margin: 10px 0;
}
.pz-history-title::before {
  content: "";
  padding: 0 4px;
}
.pz-title {
  font-weight: 700;
  width: 12%;
}
.pz-content {
  width: 88%;
}
.pz-btn-group {
  text-align: right;
  padding-top: 10px 0;
}
</style>
