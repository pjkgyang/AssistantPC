<template>
	<div class="zdsfw-layout">
		<div class="filter">
			<span class="filter-weight">关键字查询:</span>
			<el-input style="width: 50%;" @change="handleSearchKeyword" type="text" size="mini" v-model="keyword" placeholder="项目编号/项目名称/学校"></el-input>
		</div>
		<!-- :max-height="height" -->
		<el-table :data="tableData" border style="width: 100%" >
			<el-table-column prop="xx" label="学校" min-width="160" show-overflow-tooltip></el-table-column>
			<el-table-column prop="xmbh" label="项目编号" width="90" show-overflow-tooltip></el-table-column>
			<el-table-column prop="xmmc" label="项目名称" min-width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="cpmc" label="产品名称" min-width="200" show-overflow-tooltip></el-table-column>
			<el-table-column prop="fwnr" label="服务内容" min-width="140" show-overflow-tooltip></el-table-column>
			<el-table-column prop="tbsj" label="提报时间" width="160"></el-table-column>
			<el-table-column prop="zrr" label="责任人"></el-table-column>
			<el-table-column prop="fxms" label="风险描述" width="200" show-overflow-tooltip></el-table-column>
			 <el-table-column label="风险等级(解决情况)" width="150">
			  <template slot-scope="scope">
			      <a href="javaScript:;;" v-if="scope.row.fxdj != '-'" @click="handleCheck(scope.row)">
			        <el-tag size="mini" :class="{'zdsfw-fxdj-s1':scope.row.fxdj==1,'zdsfw-fxdj-s2':scope.row.fxdj==2,'zdsfw-fxdj-s3':scope.row.fxdj==3}" >{{scope.row.fxdj==1?'S1':scope.row.fxdj==2?'S2':'S3'}}</el-tag>&nbsp;
			      </a>
			      <span v-if="scope.row.fxdj == '-'">{{scope.row.fxdj}}</span>
			      <span style="font-size:12px">{{scope.row.fxsfcl==0?'(无需处理)':scope.row.fxsfcl==1?'(已处理)':scope.row.fxsfcl}}</span>
			  </template>
			</el-table-column>
			<el-table-column label="风险状态" show-overflow-tooltip>
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
			pageSize:18,
			total:0,
			keyword: ''
		};
	},
	methods: {
		handleSizeChange(data){
			this.curPage = 1;
			this.pageSize = data;
			this.pageActiveServiceRisk();
		},
		handleCurrentChange(data){
			this.curPage = data;
			this.pageActiveServiceRisk();
		},
		handleSearchKeyword() {
			this.curPage = 1;
			this.pageActiveServiceRisk();
		},
		pageActiveServiceRisk() {
			this.$get(this.API.pageActiveServiceRisk, {
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
		this.pageActiveServiceRisk();
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
