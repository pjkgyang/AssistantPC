<template>
  <div>
    <el-dialog title="问题列表" width="1100px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-xjjh">
        <div class="mg-12">
          <div>
            <span class="query-title">高级搜索:</span>
            <el-input style="width:300px;margin:12px 0" size="mini" placeholder="请输入问题标题/问题标签" v-model="keyword" @change="handleSearch"></el-input>
            <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
          </div>
          <div flex>
            &nbsp;&nbsp;<p class="query-title">是否BUG:</p>
            <p class="query-list" >
              <span v-for="item in sfbugList" :class="{'bg-active':sfbug == item.label}" @click="handleSFBUG(item.label)">{{item.mc}}</span>
            </p>
          </div>
        </div>
        <div>
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border :max-height="tableHeight">
            <el-table-column fixed type="selection" width="55"></el-table-column>
            <el-table-column fixed prop="wtbt" label="问题标题" width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="twsj" label="时间" width="170"></el-table-column>
            <el-table-column prop="twr" label="发布人"></el-table-column>
            <el-table-column prop="cpmc" label="产品" width="180"></el-table-column>
            <el-table-column prop="bqmc" label="标签" width="190"></el-table-column>
            <el-table-column prop="twrdw" label="所属单位" width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="wtlb" label="问题类别" width="110"></el-table-column>
            <el-table-column prop="dbqr" label="打标签人"></el-table-column>
            <el-table-column prop="sfbug" label="是否bug"></el-table-column>
          </el-table>
        </div>
        <div text-right v-if="!!tableData.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <div text-right class="mg-12">
          <el-button size="mini" @click="handleClose">取消</el-button>
          <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      wtwidArr: [],
      tableHeight: window.innerHeight - 350,
      sfbugList:[{mc:'全部',label:''},{mc:'是',label:'1'},{mc:'否',label:'0'}],
      keyword: "",
      sfbug:""
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    lx: {
      type: Number,
      default: 0
    },
    jhData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    // 关键字搜索
    handleSearch() {
      this.currentPage = 1;
      this.planImprovementProblemList();
    },
    handleSFBUG(data) {
      this.sfbug = data;
      this.currentPage = 1;
      this.planImprovementProblemList();
    },
    handleCommit() {
      this.$confirm("是否将此问题纳入计划?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post(this.API.addInPlan, {
            lx: this.lx,
            wtwid: this.wtwidArr.join(","),
            wid: this.jhData.wid
          }).then(res => {
            if (res.state == "success") {
              this.visible = false;
              this.$alert("纳入成功", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.$emit("handleNrsuccess", "");
                }
              });
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    // 分页
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.planImprovementProblemList();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.planImprovementProblemList();
    },
    handleSelectionChange(val) {
      this.wtwidArr = [];
      val.forEach(ele => {
        this.wtwidArr.push(ele.wtwid);
      });
    },
    // 问题列表
    planImprovementProblemList() {
      this.$get(this.API.planImprovementProblemList, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        cpbh: this.jhData.cpbh,
        // jhwid:this.jhData.wid,
        jhlx: this.lx,
        sfnr: 0,
        fbqbh: this.lx == 2 ? "W03" : "W05",
        sfbug:this.sfbug,
        keyword:this.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.tableData = [];
          } else {
            this.tableData = res.data.rows;
          }
          this.total = res.data.records;
        }
      });
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
      } else {
        this.planImprovementProblemList();
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
