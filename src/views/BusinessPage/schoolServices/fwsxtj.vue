<template>
  <div class="fwsxtj-pannel">
    <div class="pannelPaddingBg-10">
      <div v-if="!$route.query.id">
        <div style="padding: 12px 40px;">
          <chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool>
        </div>
        <div flex >
          <span class="query-title" style="padding:2px 4px;margin-right:10px">高级查询:</span>
          <el-input style="width:300px" class="search-input" placeholder="请输入项目编号/项目名称/合同编号/项目经理/学校" prefix-icon="el-icon-search"
            size="mini" v-model="filterData.keyword" @change="handleSearch"></el-input>
          &#x3000;
          <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
          <el-button type="primary" size="mini" @click="handleExport">导出</el-button>
        </div>

        <div colcenter class="mg-12">
          <span class="query-title">服务对象:</span>
          <p style="width:90%" flex>
            <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
            <el-checkbox-group v-model="filterData.fwdx" @change="handleCheckedFwdxChange">
              <el-checkbox v-for="(fwdx,index) in fwdxList" :label="fwdx.id" :key="index">{{fwdx.text}}</el-checkbox>
            </el-checkbox-group>
            <!-- <span :class="{ 'bg-active':filterData.fwdx == '' }">全部</span>
						<span v-for="(fwdx,index)  in fwdxList" :class="{ 'bg-active': fwdx.id == filterData.fwdx }" :key="index" @click="CheckGcdz(fwdx.id)">{{ fwdx.text }}</span> -->
          </p>
        </div>

        <div flex class="mg-12">
          <span class="query-title">服务类别:</span>
          <p class="query-list">
            <span :class="{ 'bg-active':filterData.fwlb == '' }">全部</span>
            <span v-for="(fwlb,index) in fwlbList" :class="{ 'bg-active': fwlb.id == filterData.fwlb }" :key="index"
              @click="CheckFwlb(fwlb.id)">{{ fwlb.text }}</span>
          </p>
        </div>

        <div flex class="mg-12">
          <span class="query-title">服务指南:</span>
          <p class="query-list">
            <span v-for="(fwzn,index) in fwznList" :class="{ 'bg-active': fwzn.id == filterData.fwzn }" :key="index"
              @click="CheckFwzn(fwzn.id)">{{ fwzn.label }}</span>
          </p>
        </div>
        <div flex class="mg-12">
          <span class="query-title">信息化支持:</span>
          <p class="query-list">
            <span v-for="(xxhzc,index) in xxhzcList" :class="{ 'bg-active': xxhzc.id == filterData.xxhzc }" :key="index"
              @click="CheckXxhzc(xxhzc.id)">{{ xxhzc.label }}</span>
          </p>
        </div>
        <div flex class="mg-12">
          <span class="query-title">在建状态:</span>
          <p class="query-list">
            <span v-for="(jszt,index) in jsztList" :class="{ 'bg-active': jszt.id == filterData.jszt }" :key="index"
              @click="CheckZt(jszt.id)">{{ jszt.label }}</span>
          </p>
        </div>
        <div flex class="mg-12">
          <span class="query-title">建设年份:</span>
          <p class="query-list">
            <el-date-picker size="mini" v-model="filterData.jsnfStart" align="right" type="year" placeholder="选择开始年">
            </el-date-picker> 到
            <el-date-picker size="mini" v-model="filterData.jsnfEnd" align="right" type="year" placeholder="选择结束年">
            </el-date-picker>
          </p>
        </div>
      </div>
      <div class="pd-10">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed="left" label="操作" width="100"  >
            <template slot-scope="scope">
                <a :href="'#/schoolSeivice/detail?id='+scope.row.zbwid" target="_blank">查看</a>
            </template>
          </el-table-column>
          <el-table-column prop="fwmc" label="服务名称" min-width="220"></el-table-column>
          <el-table-column prop="bmmc" label="部门名称" width="120"></el-table-column>
          <el-table-column prop="bsyj" label="办事依据" min-width="150"></el-table-column>
          <el-table-column prop="fwdx" label="服务对象" min-width="180"></el-table-column>
          <el-table-column prop="fwlb" label="服务类别" width="120"></el-table-column>
          <el-table-column prop="fwzn" label="服务指南" width="120">
            <template slot-scope="scope">
              <span>{{scope.row.fwzn=='0'?'无':'有'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="xxhzc" label="信息化支持" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.xxhzc=='0'?'无':'有'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="xxhsxsj" label="上线时间" width="120"></el-table-column>
          <el-table-column prop="xxhjszt" label="建设状态" width="120"></el-table-column>
          <el-table-column prop="cjgs" label="承建公司" width="180"></el-table-column>
          <el-table-column prop="syqk" label="使用情况" width="200" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"
          layout="total, prev, pager, next" :total="records">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import chooseSchool from "@/components/BusinessPage/chooseSchool.vue";
export default {
  data() {
    return {
      fwdxList: [], //服务对象
      fwlbList: [], //服务类别
      fwznList: [
        {
          id: "",
          label: "全部"
        },
        {
          id: '1',
          label: "有"
        },
        {
          id: '0',
          label: "无"
        }
      ], //服务指南
      xxhzcList: [
        {
          id: "",
          label: "全部"
        },
        {
          id: '1',
          label: "有"
        },
        {
          id: '0',
          label: "无"
        }
      ],
      jsztList: [
        {
          id: "",
          label: "全部"
        },
        {
          id: 1,
          label: "在建"
        },
        {
          id: 2,
          label: "售后"
        },
        {
          id: 3,
          label: "服务"
        }
      ],
      filterData: {
        fwlb: "",
        fwdx: [],
        bmbh: "",
        fwzn: "",
        xxhzc: "",
        jszt: "",
        jsnfStart: "",
        jsnfEnd: "",
        keyword: ""
      },
      checkAll: false,
      isIndeterminate: true,
      unitData: {},
      tableData: [],
      props: {
        value: "id",
        label: "title"
      },
      options: [], //部门
      currentPage: 1,
      pageSize: 15,
      records: 0
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.pageSize = 20;
      this.filterData.bmbh = this.$route.query.id;
      this.unitData.dwbh = this.$route.query.bh; //单位编号
      this.filterData.xxhzc = !this.$route.query.xxh
        ? ""
        : this.$route.query.xxh;
      this.filterData.fwzn = !this.$route.query.fwzn
        ? ""
        : this.$route.query.fwzn;
      this.filterData.jsnfStart = this.$route.query.s;
      this.filterData.jsnfEnd = this.$route.query.e;
      this.pageServiceItem();
    } else {
      this.getService();
    }
  },
  methods: {
    handleSearch() {
      this.currentPage = 1;
      this.pageServiceItem();
    },
    handleExport() {},

    handleCheckAllChange() {},
    // 服务对象
    handleCheckedFwdxChange() {},
    // 服务类别
    CheckFwlb(id) {
      this.currentPage = 1;
      this.filterData.fwlb = id;
      this.pageServiceItem();
    },
    // 服务类别
    CheckFwzn(id) {
      this.currentPage = 1;
      this.filterData.fwzn = id;
      this.pageServiceItem();
    },
    //信息化支持
    CheckXxhzc(id) {
      this.currentPage = 1;
      this.filterData.xxhzc = id;
      this.pageServiceItem();
    },
    // 建设状态
    CheckZt(id) {
      this.currentPage = 1;
      this.filterData.jszt = id;
      this.pageServiceItem();
    },

    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageServiceItem();
    },
    // 选择单位
    handleChangeUnit(prams) {
      this.unitData = prams;
      this.treeDept();
      this.pageServiceItem();
    },
    pageServiceItem() {
      this.$get(this.API.pageServiceItemPlan, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        dwbh: this.unitData.dwbh,
        bmbh: this.filterData.bmbh,
        fwdx: this.filterData.fwdx.join(","),
        fwlb: this.filterData.fwlb,
        fwzn: this.filterData.fwzn,
        xxhzc: this.filterData.xxhzc,
        jszt: this.filterData.jszt,
        jsnfStart: this.filterData.jsnfStart,
        jsnfEnd: this.filterData.jsnfEnd,
        keyword: this.filterData.keyword,
        onlyNewest: 1
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.tableData = res.data.rows;
          } else {
            this.tableData = [];
          }
          this.records = res.data.records;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },

    getService() {
      // 获取服务对象下拉列表
      this.$get(this.API.serviceObjects, {}).then(res => {
        if (res.state == "success") {
          this.fwdxList = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
      // 获取服务类别下拉列表
      this.$get(this.API.serviceCatalogs, {}).then(res => {
        if (res.state == "success") {
          this.fwlbList = res.data;
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    treeDept() {
      this.$get(this.API.treeDeptWithUnit, {
        dwbh: this.unitData.dwbh,
        dwmc: this.unitData.dwmc,
        zts: "1,3"
      }).then(res => {
        if (res.state == "success") {
          this.options = res.data;
        }
      });
    }
  },
  components: {
    chooseSchool
  }
};
</script>

<style>
.fwsxtj-pannel {
  margin: 20px 50px 0;
}
</style>
