<template>
  <div>
    <div style="margin:10px 0;">
      搜索项目:
      <el-input style="width:400px;" size="mini" placeholder="请输入项目编号/项目名称/合同编号" v-model="xMkeyword" @change="queryComplainItem"></el-input>&#x3000;
      <el-button size="mini" type="primary" @click="queryItem">查询</el-button>
    </div>
    <el-table :data="allfbData" style="width: 100%" border>
      <el-table-column
        fixed="left"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small">选择</el-button>
        </template>
    </el-table-column>
      <!-- <el-table-column label="项目名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <div slot="reference" style="display:flex">
            <p @click="handleEdit(scope.$index, scope.row)" :title="scope.row.xmmc" class="name-wrapper">
              <span> {{scope.row.xmmc}} </span>
            </p>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="xmmc" label="项目名称" min-width="160" show-overflow-tooltip></el-table-column>
      <el-table-column prop="xmzt" label="项目状态" width="90"></el-table-column>
      <el-table-column prop="dwmc" label="学校" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="htbh" label="合同编号" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="xmbh" label="项目编号" width="110" show-overflow-tooltip></el-table-column>
    </el-table>
    <div style="text-align:right;padding:10px 0 0 0;">
      <pagination :currentPage="currentPage" v-if="xMtotal>10 && xMtotal != null" :total="xMtotal" :pageSize="xMpageSize" @handleCurrentChange="handleChooseItem"></pagination>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/BusinessPage/pagination.vue";
import { queryProcess, getProjects } from "@/api/xmkb.js";
export default {
  data() {
    return {
      allfbData: [],
      xMpageSize: 10,
      xMtotal: null,
      xMkeyword: "",
      currentPage: null,
      JzUser: ""
    };
  },
  props: {
    sfts: {
      type: Boolean,
      default: false
    },
		isCq:{
			type: Boolean,
			default: false
		}
  },
  methods: {
    handleChooseItem(data) {
      this.getProjects(data);
    },
    // 查询项目
    queryItem() {
      this.getProjects(1);
      this.currentPage = 1;
    },
    // 查询项目确定
    queryComplainItem() {
      this.getProjects(1);
      this.currentPage = 1;
    },
    // 选择项目(2018-12-05 修改 过保且售后服务状态未启动，不能提问，不能投诉。)
    handleEdit(index, row, cell, event) {
      if (row.ztztmc == "已过保" && row.gcfwzt == "0") {
        this.$alert("项目已过保，请尽快联系项目经理续签维保合同", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      this.$emit("handleEdit", row);
    },
    getProjects(curPage) {
      getProjects({
        curPage: curPage,
        pageSize: this.xMpageSize,
        keyword: this.xMkeyword,
        xmlb: "",
        sfgx: "",
        // xmzt: "1,2,3",
				xmztzt: !!this.isCq?'0,6,4,5,7':'0,1,4,5,7',
        pl: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.allfbData = data.data.rows;
          this.xMtotal = data.data.records;
        }
      });
    }
  },
  mounted() {
    this.getProjects(1);
    this.JzUser = sessionStorage.getItem("isJZuser");
  },
  components: { pagination }
};
</script>
<style scoped>
.name-wrapper {
  color: #409eff;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
