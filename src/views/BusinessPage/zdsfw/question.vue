<template>
	<div class="zdsfw-layout">
		<div class="filter">
			<span class="filter-weight">关键字查询:</span>
			<el-input style="width: 50%;" @change="handleSearchKeyword" type="text" size="mini" v-model="keyword" placeholder="项目编号/项目名称/学校"></el-input>
		</div>
		<el-table :data="tableData" border style="width: 100%" :max-height="height">
			<el-table-column prop="xx" label="学校" min-width="160" show-overflow-tooltip></el-table-column>
			<el-table-column prop="xmbh" label="项目编号" width="90" show-overflow-tooltip></el-table-column>
			<el-table-column prop="xmmc" label="项目名称" min-width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="cpmc" label="产品名称" min-width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="fwnr" label="服务内容" min-width="140" show-overflow-tooltip></el-table-column>
			<el-table-column prop="tbsj" label="提报时间" width="160"></el-table-column>
			<el-table-column prop="zrr" label="责任人"></el-table-column>
			<el-table-column prop="wtms" label="问题描述" width="200" show-overflow-tooltip></el-table-column>
			<el-table-column label="问题状态" show-overflow-tooltip>
				<template slot-scope="scope">
					<el-tag size="mini" :type="scope.row.zt == '1' ? 'success' : 'primary'">
						{{ scope.row.zt == '0' ? '待处理' : scope.row.zt == '1' ? '已处理' : '无需处理' }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="clsj" label="处理时间" width="160"></el-table-column>
			<el-table-column prop="gs" label="工时"></el-table-column>
		</el-table>
		<br>
		<div text-right>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="curPage"
				:page-sizes="[20, 40, 70, 100]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			></el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			height:window.innerHeight -200,
			tableData: [],
			curPage: 1,
			pageSize: 18,
			total:0,
			keyword: ''
		};
	},
	methods: {
		handleSizeChange(data){
			this.curPage = 1;
			this.pageSize = data;
			this.pageActiveServiceProblem();
		},
		handleCurrentChange(data){
			this.curPage = data;
			this.pageActiveServiceProblem();
		},
		handleSearchKeyword() {
			this.curPage = 1;
			this.pageActiveServiceProblem();
		},
		pageActiveServiceProblem() {
			this.$get(this.API.pageActiveServiceProblem, {
				curPage: this.curPage,
				pageSize: this.pageSize,
				keyword: this.keyword
			}).then(res => {
				if (res.state == 'success') {
					if (!!res.data.rows) {
						this.tableData = res.data.rows;
					} else {
						this.tableData = [];
					}
					this.total = res.data.records
				} else {
					this.$message({
					  message: res.msg,
					  type: 'error'
					});
				}
			});
		}
	},
	mounted() {
		this.pageActiveServiceProblem();
	}
};
</script>

<style lang="scss" scoped>
.zdsfw-layout {
	margin: 15px;
	padding: 10px 20px;
	background: #fff;
	border-radius: 4px;
	.filter {
		margin: 10px 0;
	}
}
</style>
