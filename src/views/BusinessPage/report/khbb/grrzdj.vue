<template>
  <div>
    <div>
      <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'" :filterShow="!userGroupTag.includes('QYZ')"></filterComponent>
    </div>
    <div>
      <div text-right class="mg-12">
        <el-button type="primary" size="mini" @click="exportTable">导出</el-button>
      </div>
      <el-table :data="dataList" style="width: 100%"  border :max-height="tableHeight">
        <el-table-column prop="gh" label="工号" width="120"></el-table-column>
        <el-table-column prop="xm" label="姓名" width="90"></el-table-column>
				<el-table-column prop="dwlx" label="单位类型" width="90"></el-table-column>
				<el-table-column prop="dwmc" label="所属单位" min-width="200" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpx" label="产品" min-width="200"></el-table-column>
				<el-table-column prop="rzjb" label="任职级别" min-width="90"></el-table-column>
        <el-table-column prop="rzdj" label="任职等级" min-width="90"></el-table-column>
        <el-table-column prop="rzrq" label="任职日期" min-width="100"></el-table-column>
      </el-table>
      <div text-right>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import tableComponents from "@/components/reportTable/tableComponents.vue";
import filterComponent from "@/components/reportTable/filterComponent.vue";

export default {
  data() {
    return {
      dataList: [],
      archiveShow: false,
      tableHeight: window.innerHeight - 300,
      filterList: ["keyword", "qygc","dwlx", "cpx", "rzdj","rzjb", "date"],
      filterData: {
        keyword: "",
        cpx: "",
        rzdj: "",
        gczd: "",
				dwlx: "",
				rzjb: "",
        date: ""
      },
      currentPage: 1,
      pageSize: 20,
      total: 0,
			userGroupTag:""//用户标签
    };
  },
  methods: {
    exportTable() {
      let rzrqStart = !this.filterData.date[0] ? "" : this.filterData.date[0],
        rzrqEnd = !this.filterData.date[1] ? "" : this.filterData.date[1];
      window.open(
        window.baseurl +
          "personnel/exportPositionLevel.do?rzjb=" +
          this.filterData.rzjb +
					"&rzdj="+
					this.filterData.rzdj +
          "&cpx=" +
          this.filterData.cpx +
					"&dwlx="+
					this.filterData.dwlx+
          "&qygc=" +
          this.filterData.gczd +
          "&rzrqStart=" +
          rzrqStart +
          "&rzrqEnd=" +
          rzrqEnd +
          "&keyword=" +
          this.filterData.keyword
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pagePositionLevel();
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.pagePositionLevel();
    },
    handleChangeFilter(data) {
      this.filterData = data;
      this.currentPage = 1;
      this.pagePositionLevel();
    },

    // 任职等级分页列表
    pagePositionLevel() {
      this.$get(this.API.pagePositionLevel, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        rzjb: this.filterData.rzjb,
				rzdj: this.filterData.rzdj,
        cpx: this.filterData.cpx,
        qygc: this.filterData.gczd,
				dwlx:this.filterData.dwlx,
        rzrqStart: !this.filterData.date[0] ? "" : this.filterData.date[0],
        rzrqEnd: !this.filterData.date[1] ? "" : this.filterData.date[1],
        keyword: this.filterData.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.dataList = [];
          } else {
            this.dataList = res.data.rows;
          }
          this.total = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    }
  },
  mounted() {
		this.userGroupTag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
		
    this.pagePositionLevel();
  },
  activated() {},
  watch: {},
  components: {
    filterComponent,
    tableComponents
  }
};
</script>
<style scope>
.query-condition > div {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 13px;
}
.query-list {
  width: 95%;
}
.query-list span:hover {
  cursor: pointer;
}
.query-list span {
  display: inline-block;
  padding: 0px 5px;
  color: #637d8a;
  border-radius: 3px;
  margin: 5px 10px 0 0;
}
.bg-active {
  background: #1997d7;
  color: #fff !important;
}
</style>
