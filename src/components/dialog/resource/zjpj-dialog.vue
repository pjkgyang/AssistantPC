<template>
  <div>
    <el-dialog title="评价及查看" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-pj">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="姓名" min-width="180">
            <template slot-scope="scope">
              <div flex style="width:70%;margin:0 auto;">
                <span style="width:30%;">{{scope.row.xm}}</span>&#x3000;
                <span>
                  <span title="点击好评" class="zjlist-pj zjlist-pj-hp" @click="handlePraise(scope.row,'1')">
                    <span></span> ({{scope.row.good}})</span>&nbsp;
                  <span title="点击差评" class="zjlist-pj zjlist-pj-cp" @click="handlePraise(scope.row,'0')">
                    <span></span> ({{scope.row.bad}})</span>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="180" >
            <template slot-scope="scope">
              <el-button size="mini" @click="handleClick(scope.row)" v-if="userGroupTag.includes('JYGL')">查看记录</el-button>
              <span v-else>暂无操作权限</span>
            </template>
          </el-table-column>
        </el-table>
        <section class="pj-btn-group">
          <el-button size="small" @click="handleClose">关闭</el-button>
        </section>
      </div>
    </el-dialog>

    <el-dialog title="评价记录" width="700px" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false">
      <div style="margin:10px 30px">
        <el-tabs v-model="czlx" type="card" @tab-click="handleClickTab">
          <el-tab-pane :label="'全部'" name="0"></el-tab-pane>
          <el-tab-pane :label="'好评'" name="1"></el-tab-pane>
          <el-tab-pane :label="'差评'" name="2"></el-tab-pane>
        </el-tabs>
        <div style="max-height:450px;overflow-y:auto">
          <setpsComponent :jdList='recordList' :zjlbShow="true"></setpsComponent>
          <div v-if="!recordList.length" text-center>
              暂无内容
          </div>
        </div>
        <div text-right v-if="!!recordList.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
        <div text-right class="mg-12">
          <el-button @click="dialogVisible = false" size="mini">关闭</el-button>
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
      dialogVisible: false,
      recordList: [],
      multipleSelection: [],
      currentPage: 1,
      pageSize: 10,
      total:0,
      keyword: "",
      czlx: 0,
      ryInfo: {},
      userGroupTag:""
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // },
    // 分页（页数）
    handleSizeChange(data){
      this.pageSize = data;
      this.currentPage = 1;
      this.getExperlogs();
    },
    // 切换分页
    handleCurrentChange(data){
      this.currentPage = 1;
      this.getExperlogs();
    },
    // 好评 差评
    handlePraise(params, type) {
      this.$emit("handlePraise", params, type);
    },
    // 切换tab
    handleClickTab() {
      this.getExperlogs();
    },
    handleClick(params) {
      this.ryInfo = params;
      this.getExperlogs();
      this.dialogVisible = !this.dialogVisible;
    },
    getExperlogs() {
      this.$get(this.API.experlogs, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        czlx: this.czlx == 0 ? "" : this.czlx,
        rybh: this.ryInfo.bh,
        cpbh: this.ryInfo.cpbh,
        rylx: this.rylx
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.recordList = res.data.rows;
          } else {
            this.recordList = [];
          }
          this.total = res.data.records;
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {

      } else {
        this.userGroupTag = JSON.parse(sessionStorage.userInfo).userGroupTag
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
.zjlist-pj-hp span {
  display: inline-block;
  margin-bottom: -3px;
  width: 16px;
  height: 16px;
  background: url("../../../../static/img/appraiseImg.png");
  background-position: 0 -16px;
}
.zjlist-pj-hp:hover > span {
  background-position: 0 -48px;
}
.zjlist-pj-cp span {
  display: inline-block;
  margin-bottom: -3px;
  width: 16px;
  height: 16px;
  background: url("../../../../static/img/appraiseImg.png");
}
.zjlist-pj-cp:hover > span {
  background-position: 0 -32px;
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
