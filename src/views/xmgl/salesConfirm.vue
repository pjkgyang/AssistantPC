<template>
	<div class="project_fbsh">
		<div flex>
			<span class="query-title" style="padding:2px 4px;margin-right:10px">高级查询:</span>
			<el-input
				style="width:500px"
				class="search-input"
				placeholder="请输入项目编号/项目名称/合同编号/项目经理/学校"
				prefix-icon="el-icon-search"
				size="small"
				v-model="filterData.keyword"
				@change="SearchItem"
			></el-input>
			&#x3000;
			<el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
			<el-button type="primary" size="mini" @click="handleExport">导出</el-button>
		</div>

		<div flex>
			<span class="query-title">确认状态:</span>
			<p class="query-list">
				<span v-for="qrzt in qrztList" :class="{ 'bg-active': qrzt.label == filterData.qrzt }" :key="qrzt.label" @click="CheckQrzt(qrzt.label)">{{ qrzt.mc }}</span>
			</p>
		</div>
		<br />
		<div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed="left" label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">确认</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="xmbh" label="项目编号" width="120"></el-table-column>
				<el-table-column prop="xmmc" label="项目名称" min-width="280" show-overflow-tooltip></el-table-column>
				<el-table-column prop="xmnr" label="项目内容" min-width="280"></el-table-column>
				<el-table-column prop="qzrq" label="签字日期" width="110" show-overflow-tooltip></el-table-column>
				<el-table-column prop="jhksrq" label="售后计划开始时间" width="140"></el-table-column>
				<el-table-column prop="zt" label="状态" width="110"></el-table-column>
				<el-table-column prop="htje" label="合同金额" width="110"></el-table-column>
				<el-table-column prop="htmsr" label="合同毛收入" width="110"></el-table-column>
				<el-table-column prop="czsj" label="操作时间" width="110"></el-table-column>
				<el-table-column prop="tjrxm" label="提交人" width="110"></el-table-column>
				<el-table-column prop="tjrq" label="提交日期" width="110"></el-table-column>
			</el-table>
			<div text-right>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[15, 30, 50, 100]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="records"
				></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
import { getMenu, getSession } from '@/utils/util.js';
export default {
	data() {
		return {
			currentPage: 1,
			pageSize: 15,
			records:0,
			filterData: {
				keyword: '',
				qrzt: ''
			},
			qrztList: [{label:'',mc:'全部'},{label:'0',mc:'未确认'},{label:'1',mc:'已确认'}],
			tableData: [{},{}]
		};
	},
	mounted() {
	
	},
	methods: {
		handleSearch() {
			this.currentPage = 1;
			this.getFbshList();
		},
		SearchItem() {
			this.currentPage = 1;
			this.getFbshList();
		},
		handleExport() {},
		// 工程大区
		CheckGcdz(params) {
			this.currentPage = 1;
			this.filterData.gcdq = params;
			this.getFbshList();
		},
		// 审核状态
		CheckSfsh(params) {
			this.currentPage = 1;
			this.filterData.shzt = !params?'':params;
			this.getFbshList();
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.getFbshList();
		},
		handleSizeChange(data) {
			this.currentPage = 1;
			this.pageSize = data;
			this.getFbshList();
		},
		handleClick(data) {
			let routeData = this.$router.resolve({
				path: '/projectfbshdetail',
				query: {
					xmbh:data.xmbh,
					fbbh:data.fbbh
				}
			});
			window.open(routeData.href, '_blank');
		},
		getFbshList(){
			this.$get(this.API.fbManage,{
				curPage:this.currentPage,
				pageSize:this.pageSize,
				gczq:this.filterData.gcdq,
				shzt:this.filterData.shzt,
				keyword:this.filterData.keyword
			}).then(res=>{
				if(res.state == 'success'){
					if(!!res.data.rows){
						this.tableData = res.data.rows;
					}
					this.records = res.data.records;
				}else{
					 this.$message({
					  message: res.msg,
					  type: 'error'
					});
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.project_fbsh {
	margin: 20px;
	padding: 15px;
	background: #ffffff;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
