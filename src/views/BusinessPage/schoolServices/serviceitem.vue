<template>
	<div class="pannelPadding-10">
	<div class="pannelPaddingBg-10 jh-pannel ">
		<!-- <div class="mg-12">
			<chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool>
		</div> -->
		<div>
			<div class="tree">
        <chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool>
        <tree-table ref="recTree" :list.sync="treeDataSource" @handlerExpand="handlerExpand" @handlerChooseModel="handlerChooseModel"></tree-table>
      </div>
			<div class="form">
				<div v-if="!!curDept.parentId" style="padding-bottom:10px"><el-button size="mini" type="primary"  @click="handleAddService">添加服务事项</el-button></div>
				<el-table :data="tableData" border :style="{'width':!isPlan?'100%':'760px' }">
					<el-table-column fixed="left" label="操作" width="110"  >
						<template slot-scope="scope">
							<el-button v-if="!isPlan" type="text" size="small" @click="handleOperate('edit', scope.row)">编辑</el-button>
							<a v-if="!isPlan" :href="'#/schoolSeivice/detail?id='+scope.row.wid" target="_blank">查看</a>
              <el-button v-if="!!isPlan" type="text" size="small" @click="handleAddSsjh(scope.row)">添加</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="fwmc" label="服务名称" min-width="220"></el-table-column>
					<el-table-column prop="bmmc" label="部门名称" width="180"></el-table-column>
					<el-table-column prop="bsyj" label="办事依据" width="180"></el-table-column>
					<el-table-column prop="fwdx" label="服务对象" width="180"></el-table-column>
					<el-table-column prop="fwlb" label="服务类别" width="120"></el-table-column>
					<el-table-column prop="fwzn" label="服务指南" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.fwzn=='0'?'无':'有'}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="xxhzc" label="信息化支持" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.xxhzc=='0'?'无':'有'}}</span>
						</template>
					</el-table-column>
				</el-table>
				 <el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="total, prev, pager, next"
					:total="records">
				</el-pagination>
			</div>
		</div>
		</div>


		<jbxxDailog :show.sync="jbxxShow" @handleCommitService="handleCommitService" :wid="wid" :Type="Type"></jbxxDailog>
	</div>
</template>

<script>
import treeTable from "@/components/tree/tree-table.vue";
import jbxxDailog from "@/views/BusinessPage/schoolServices/jbxx-dialog.vue";
import chooseSchool from "@/components/BusinessPage/chooseSchool.vue";
export default {
  data() {
    return {
      jbxxShow: false,
      ssjhShow: false,
      Type: "",
      treeDataSource: [],
      currentPage: 1,
      pageSize: 15,
      records: 0,
      tableData: [],
      unit: {}, //单位
      curDept: {}, //当前部门
      wid: "", //当前服务事项
      prevTree: {}
    };
  },
  props: {
    isPlan: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 更换单位
    handleChangeUnit(params) {
      this.curDept = {};
      this.unit = params;
      this.treeDept();
      this.pageServiceItem();
    },
    // 提交计划
    handleCommitSSjh(params) {
      let formData = params;
      formData.zbwid = this.curData.wid;

      this.$post(this.API.updateServiceItemPlan, params).then(res => {
        if (res.state == "success") {
          this.pageServiceItem();
          this.$message({ message: "保存成功", type: "success" });
          this.ssjhShow = false;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    // 提交服务
    handleCommitService(params) {
      let formData = params;
      formData.fwdx = params.fwdx.join(",");
      formData.dwbh = this.unit.dwbh;
      formData.dwmc = this.unit.dwmc;
      formData.bmbh = this.curDept.id;
      formData.bmmc = this.curDept.title;

      this.$post(this.API.saveServiceItem, formData).then(res => {
        if (res.state == "success") {
          this.pageServiceItem();
          this.$message({ message: "添加成功", type: "success" });
          this.jbxxShow = false;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },

    // 分页
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageServiceItem();
    },
    // 展开
    handlerExpand(m) {
      m.isExpand = !m.isExpand;
    },
    // 选中
    handlerChooseModel(m) {
      if (JSON.stringify(this.prevTree) != "{}") {
        this.$set(this.prevTree, "Experience", "无");
      }
      this.$set(m, "Experience", "1");
      this.prevTree = m;
      this.curDept = m;
      this.currentPage = 1;
      this.pageServiceItem();
    },
    // 添加服务事项
    handleAddService() {
      this.Type = "";
      this.jbxxShow = true;
    },

    // 添加
    handleAddSsjh(params) {
      this.$emit("handleAddSsjh", params);
    },

    // 编辑，查看，编辑计划
    handleOperate(type, params) {
      if (type == "edit") {
        this.wid = params.wid;
        this.Type = "edit";
        this.jbxxShow = true;
      } else if (type == "ssjh") {
        this.ssjhShow = true;
      }
    },
    // 获取服务事项列表
    pageServiceItem() {
      this.$get(this.API.pageServiceItem, {
        curPage: this.currentPage,
        pageSize:!this.isPlan?this.pageSize:10,
        dwbh: this.unit.dwbh,
        bmbh: !this.curDept.id ? "" : this.curDept.id
      }).then(res => {
        if (res.state == "success") {
          if (!res.data || !res.data.rows) {
            this.tableData = [];
          } else {
            this.tableData = res.data.rows;
          }
          this.records = res.data.records;
        } else {
        }
      });
    },
    // 获取树
    treeDept() {
      this.$get(this.API.treeDeptWithUnit, {
        dwbh: this.unit.dwbh,
        dwmc: this.unit.dwmc,
        zts: "1,3"
      }).then(res => {
        if (res.state == "success") {
          this.treeDataSource = res.data;
        }
      });
    }
  },
  components: {
    treeTable,
    jbxxDailog,
    chooseSchool
  }
};
</script>

<style>
.jh-pannel {
  min-width: 1300px;
  max-width: 95%;
  margin: 0 auto;
}
.jh-pannel:after {
  content: "";
  display: block;
  clear: both;
}
.tree {
  width: 370px;
  float: left;
}
.form {
  width: calc(100% - 390px);
  padding: 0 10px;
  background: #fff;
  float: right;
}
.form a {
  color: #409eff;
  font-size: 12px;
  margin-left: 10px;
}
</style>
