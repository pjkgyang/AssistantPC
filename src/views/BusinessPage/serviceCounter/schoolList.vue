<template>
  <div>
    <el-dialog
      title="选择学校"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="pd-10">
        <div class="mg-12">
          <el-input
            style="width:100%;"
            size="mini"
            placeholder="请输入学校名称"
            v-model="keyword"
            @change="queryItem"
          ></el-input>
        </div>
        <el-table :data="unitList" style="width: 100%" border max-height="500">
          <el-table-column fixed="left" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleCommit(scope.row)">选择</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="mc" label="学校名称" show-overflow-tooltip></el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: this.show,
      unitList: [],
      pageSize: 10,
      total: 0,
      keyword: "",
      currentPage: 1,
      JzUser: ""
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getDwUser();
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.getDwUser();
    },
    // 查询项目
    queryItem() {
      this.currentPage = 1;
      this.getDwUser();
    },

    handleCommit(row) {
      this.$emit("handleCommit", row);
    },

    getDwUser(keyword) {
      this.$get(this.API.getDwByUser, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        dwlx: "",
        keyword: keyword
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.unitList = res.data.rows;
          } else {
            this.unitList = [];
          }
          this.total = res.data.records;
        } else {
        }
      });
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
        this.getDwUser();
      } else {
      }
    }
  },
  components: {}
};
</script>
<style scoped>

</style>
