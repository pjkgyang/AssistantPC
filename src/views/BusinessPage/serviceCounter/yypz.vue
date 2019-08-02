<template>
	<div class="pannelPadding-10">
	<div class="pannelPaddingBg-10 jh-pannel ">
		<div>
			<div class="tree">
        <chooseSchool @handleChangeUnit="handleChangeUnit"></chooseSchool>
        <tree-table ref="recTree" :list.sync="treeDataSource" @handlerExpand="handlerExpand" @handlerChooseModel="handlerChooseModel"></tree-table>
      </div>
			<div class="form">
        <!-- v-if="!!curDept.parentId" -->
				<div v-if="!!curDept.parentId"><el-button size="mini" type="primary"  @click="handleAddService">添加应用系统</el-button></div>
				<div style="margin:10px 0"><el-input size="mini" v-model="keyword" placeholder="关键字查询" @change="handleSearch"></el-input></div>
        <el-table :data="tableData" border width="100%">
					<el-table-column fixed="left" label="操作" width="100"  >
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="handleOperate('edit', scope.row)">编辑</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="yymc" label="应用系统名称" min-width="160"></el-table-column>
					<el-table-column prop="bmmc" label="所属部门" width="150"></el-table-column>
					<el-table-column prop="sydx" label="使用对象" width="120"></el-table-column>
          <el-table-column prop="yt_display" label="用途" width="120"></el-table-column>
          <el-table-column prop="fwqip" label="服务器ip" width="120"></el-table-column>
          <el-table-column prop="fwqmc" label="服务器名称" width="100"></el-table-column>
					<el-table-column prop="czxtlx_display" label="操作系统" width="100"></el-table-column>
          <el-table-column prop="sxrq" label="上线日期" width="100"></el-table-column>
					<el-table-column prop="fwdqrq" label="服务到期日期" width="130"></el-table-column>
					<el-table-column prop="cjdw" label="承建公司" width="120"></el-table-column>
					<el-table-column prop="fwdz" label="访问地址" width="150" show-overflow-tooltip></el-table-column>

          <el-table-column prop="ywbmlxr" label="业务部门联系人" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="ywbmlxfs" label="业务部门联系方式" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xxzxlxr" label="信息化部门联系人" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="xxzxlxfs" label="信息化部门联系方式" width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cjdwlxr" label="承建公司联系人" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cjdwlxfs" label="承建公司联系方式" width="160" show-overflow-tooltip></el-table-column>
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


		<yypzDiloag :show.sync="yypzShow" :detailInfo="detailInfo" @handleCommitYypz="handleCommitYypz" ></yypzDiloag>
	</div>
</template>

<script>
import treeTable from "@/components/tree/tree-table.vue";
import yypzDiloag from '@/views/BusinessPage/serviceCounter/yypz-dialog';
import chooseSchool from "@/components/BusinessPage/chooseSchool.vue";

export default {
  data() {
    return {
      yypzShow: false,
      Type: "",
      treeDataSource: [],
      currentPage: 1,
      pageSize: 15,
      records: 0,
      tableData: [],
      unit: {}, //单位
      curDept: {}, //当前部门
      wid: "", //当前服务事项
      prevTree: {},
      detailInfo:{},
      keyword:'',
      userInfo:{}
    };
  },
  props: {
    isPlan: {
      type: Boolean,
      default: false
    }
  },
  mounted(){
    this.userInfo = JSON.parse( sessionStorage.getItem('userInfo'));
  },
  methods: {
    // 更换单位
    handleChangeUnit(params) {
      this.curDept = {};
      this.unit = params;
      this.treeDept();
      this.pageApps();
    },
    // 提交计划
    handleCommitSSjh(params) {
      let formData = params;
      formData.zbwid = this.curData.wid;

      this.$post(this.API.updateServiceItemPlan, params).then(res => {
        if (res.state == "success") {
          this.pageApps();
          this.$message({ message: "保存成功", type: "success" });
          this.ssjhShow = false;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },
    // 提交服务
    handleCommitYypz(params) {
      let formData = params;
      formData.sydx = params.sydx.join(',');
      formData.dwbh = this.unit.dwbh;
      formData.dwmc = this.unit.dwmc;
      formData.bmbh = this.curDept.id;
      formData.bmmc = this.curDept.title;
    
      formData.cjdwlxrgh = this.userInfo.unitType==0?this.userInfo.userName:'';

      this.$post(this.API.saveApp, formData).then(res => {
        if (res.state == "success") {
          this.pageApps();
          this.$message({ message: "添加成功", type: "success" });
          this.yypzShow = false;
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },

    // 分页
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageApps();
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
      this.pageApps();
    },

    handleSearch(){
      this.currentPage = 1;
      this.pageApps();
    },

    // 添加服务事项
    handleAddService() {
      this.yypzShow = true;
    },

    // 添加
    handleAddSsjh(params) {
      this.$emit("handleAddSsjh", params);
    },

    // 编辑，查看，编辑计划
    handleOperate(type, params) {
      this.detailInfo = params;
      this.yypzShow = true;
    },
    // 获取服务事项列表
    pageApps() {
      this.$get(this.API.pageApps, {
        curPage: this.currentPage,
        pageSize:!this.isPlan?this.pageSize:10,
        dwbh: this.unit.dwbh,
        bmbh: !this.curDept.id ? "" : this.curDept.id,
        keyword :this.keyword
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
    yypzDiloag,
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
