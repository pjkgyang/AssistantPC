<template>
    <div>
        <el-dialog title="评价及查看" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-pj">
                <div class="mg-12">
                    <el-button size="mini" type="primary" :disabled="!multipleSelection.length">批量好评</el-button>
                    <el-button size="mini" type="danger" :disabled="!multipleSelection.length">批量差评</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="80">
                    </el-table-column>

                    <el-table-column prop="name" label="姓名" min-width="180">
                        <template slot-scope="scope">
                            <div>
                                <span>{{scope.row.name}}</span>&#x3000;
                                <span>
                                    <span title="点击好评" class="zjlist-pj" @click="handlePraise('1')"><img src="static/img/praise.png" alt="">(0)</span>&nbsp;
                                    <span title="点击差评" class="zjlist-pj" @click="handlePraise('0')"><img src="static/img/nopraise.png" alt="">(1)</span>
                                </span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleClick">查看记录</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <section class="pj-btn-group">
                    <el-button size="small" @click="handleClose">取消</el-button>
                </section>
            </div>
        </el-dialog>

        <el-dialog title="评价记录" width="700px" :visible.sync="dialogVisible"  :append-to-body="true" :close-on-click-modal="false" >
            <div style="margin:0 30px">
                <setpsComponent :jdList='recordList'></setpsComponent>   
                <div text-right class="mg-12">
                    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
               </div> 
            </div>
        </el-dialog>

    </div>
</template>

<script>
import setpsComponent from "@/components/BusinessPage/steps";
export default {
  data() {
    return {
      visible: this.show,
      dialogVisible:false,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎"
        },
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        },
        {
          date: "2016-05-08",
          name: "王小虎"
        },
        {
          date: "2016-05-06",
          name: "王小虎"
        },
        {
          date: "2016-05-07",
          name: "王小虎"
        }
      ],
      recordList: [
        { czrxm: "zhangsan", czlx: 2, cjsj: 3, cznr: "asdasdas" },
        {  czrxm: "zhangsan", czlx: 2, cjsj: 3, cznr: "asdasdas"  },
        {  czrxm: "zhangsan", czlx: 2, cjsj: 3, cznr: "asdasdas"  }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    handleClick() {
     this.dialogVisible = !this.dialogVisible
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
      } else {
      }
    }
  },
  components: { setpsComponent }
};
</script>

<style  scoped>
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
.zjlist-pj {
  cursor: pointer;
}
.zjlist-pj:hover{
   font-weight: 700;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
