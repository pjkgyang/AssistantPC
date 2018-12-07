<template>
    <div>
        <el-dialog title="催办详情" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-cbxq">
                <section class="cbxq-list">
                    <div v-for="(list,index) in cbList" class="cbxq-list_top" flex>
                        <div>
                            <p>
                                催办人姓名：<span class="list_color">{{list.cjrxm}}</span>&#x3000;
                                催办时间：<span class="list_color">{{list.cjsj}}</span>
                            </p>
                            <p>
                                催办说明：<span class="list_color">{{list.sm}}</span></p>
                        </div>
                    </div>
                    <div v-if="!cbList.length" text-center class="filter-weight mg-12">
                        暂无数据
                    </div>
                </section>
                <div text-right v-if="!!cbList.length">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                 </div>
                <section text-right class="cbxq-btn-group">
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
      currentPage: 1,
      pageSize: 10,
      total: 20,
      cbList: [ ]
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleSizeChange(data) {},
    handleCurrentChange(data) {},
    handleClickSure() {}
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.sm = "";
      } else {
        this.$get(this.API.pageProjectReminder, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          xmbh: this.xmbh
        }).then(res => {
          if (res.state == "success") {
            if(!res.data.rows){
                this.cbList = []
            }else{
                this.cbList = res.data.rows
            }
            this.total = res.data.records;
          }
        });
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-cbxq {
  padding: 8px 10px;
  .cbxq-list {
    padding: 0 15px;
    max-height: 500px;
    overflow-y:auto;
    .cbxq-list_top {
      background: rgba(168, 199, 192, 0.1);
      border-radius: 4px;
      padding: 2px 10px;
      margin-bottom: 3px;
      .list_color {
        color: #333;
        font-weight: 700;
      }
    }
  }
  .cbxq-btn-group {
    margin: 12px !important;
  }
  .cbxq-title {
    font-weight: 700;
    width: 14%;
  }
  .cbxq-content {
    width: 86%;
  }
}
</style>
