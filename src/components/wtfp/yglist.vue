<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
			<div text-center>
				<h4 class="filter-weight pd-10">实施提升计划--参与人数详情</h4>
			</div>
      <div>
        <el-input v-model="keyword" style="width:500px;" size="mini" placeholder="请输入工号/部门名称/一级部门名称/姓名/区域战队" @change="handleSearch"></el-input>
        <el-button @click="handleSearch" size="mini" type="primary">查询</el-button>
      </div><br>
      <div class="mg-12" text-right>
        <el-button size="mini" @click="handleExport" type="primary">导出</el-button>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%" :max-height="tableHeight">
          <el-table-column prop="xm" label="姓名" width="90"></el-table-column>
          <el-table-column prop="bh" label="工号" width="90"></el-table-column>
          <el-table-column prop="ssbm" label="所属部门" width="140"></el-table-column>
          <el-table-column prop="ssyjbm" label="所属一级部门" width="140"></el-table-column>
          <el-table-column prop="cpx" label="产品线" show-overflow-tooltip min-width="130"></el-table-column>
          <el-table-column prop="rzdj" label="任职等级" width="100"></el-table-column>

          <el-table-column prop="gkzbsc" label="观看直播时长" width="120" v-if="this.$route.query.type == 1"></el-table-column>
          <el-table-column prop="gkhfsc" label="观看回放时长" width="120" v-if="this.$route.query.type == 1"></el-table-column>
          <el-table-column prop="gkzsc" label="观看总时长" width="120" v-if="this.$route.query.type == 1"></el-table-column>

          <el-table-column prop="zt" label="状态" width="80"></el-table-column>
          <el-table-column prop="rzrq" label="入职日期" width="110"></el-table-column>
          <el-table-column prop="lzrq" label="离职日期" width="110"></el-table-column>
          <el-table-column prop="sj" label="手机" width="110"></el-table-column>
          <el-table-column prop="qyzd" label="区域战队" width="180" show-overflow-tooltip></el-table-column>
          <el-table-column prop="zxmc" label="职系名称" width="100" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="ygmc" label="用工名称"  width="100" ></el-table-column>
                    <el-table-column prop="xlmc" label="学历"  width="140" ></el-table-column>
                    <el-table-column prop="byyx" label="毕业院校" min-width="180" show-overflow-tooltip></el-table-column> -->
        </el-table>
        <div text-right>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 50, 70, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 160,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      keyword: ""
    };
  },
  methods: {
    handleExport() {
      window.open(
        window.baseurl + "personnel/exportStaff.do?keyword=" +
        this.keyword +
        '&type=' +
        this.$route.query.type +
        '&nljhwid=' +
        this.$route.query.nljhwid +
        '&cpbh=' +
        this.$route.query.cpbh
      );
    },
    //   搜索
    handleSearch() {
      this.currentPage = 1;
      this.pageStaff();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.pageStaff();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageStaff();
    },
    pageStaff() {
      this.$get(this.API.pageStaff, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        nljhwid: this.$route.query.nljhwid,
        type: this.$route.query.type,
        cpbh: this.$route.query.cpbh
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
  mounted() {
    this.pageStaff();

    console.log();
  },
  components: {}
};
</script>

<style scoped>
</style>
