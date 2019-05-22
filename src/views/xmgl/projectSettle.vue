<template>
	<div class="project_settle">
		<div flex>
			<span class="query-title" style="padding:2px 4px;margin-right:10px">高级查询:</span>
			<el-input
				style="width:500px"
				class="search-input"
				placeholder="请输入项目编号/项目名称/合同编号/项目经理/学校"
				prefix-icon="el-icon-search"
				size="small"
				v-model="filterData.keyword"
				@change="handleSearch"
			></el-input>
			&#x3000;
			<el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
			<el-button type="primary" size="mini" @click="handleExport">导出</el-button>
		</div>

		<div flex style="margin:10px 0;">
			<span class="query-title">工程大区:</span>
			<p class="query-list" style="width:90%">
				<span v-for="gcdq in gcdqList" :class="{ 'bg-active': gcdq.id == filterData.gcdq }" :key="gcdq.id" @click="CheckGcdz(gcdq.id)">{{ gcdq.label }}</span>
			</p>
		</div>

		<div flex>
			<span class="query-title">是否审核:</span>
			<p class="query-list">
				<span :class="{ 'bg-active': filterData.jszt == '' }">全部</span>
				<span v-for="sfsh in jsztList" :class="{ 'bg-active': sfsh.label == filterData.jszt }" :key="sfsh.label" @click="CheckSfsh(sfsh.label)">{{ sfsh.mc }}</span>
			</p>
		</div>
		<br />
		<div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed="left" label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
					</template>
				</el-table-column>
				<el-table-column  label="是否结算" width="120">
					<template slot-scope="scope">
						<el-tag size="mini" :type="scope.row.jszt=='01'?'primary':scope.row.jszt=='05'||scope.row.jszt=='04'?'danger':'success'">
							{{scope.row.jszt=='01'?'申请中':scope.row.jszt=='02'?'已结算':scope.row.jszt=='03'?'审核通过':scope.row.jszt=='04'?'审核不通过':scope.row.jszt=='05'?'申请不通过':'已冲账'}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="xmbh" label="项目编号" width="120"></el-table-column>
				<el-table-column prop="xmmc" label="项目名称" min-width="260" show-overflow-tooltip></el-table-column>
				<el-table-column prop="fbbh" label="合同编号" width="160"></el-table-column>
				<el-table-column prop="fbmc" label="分包名称" min-width="260" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sqjsrxm" label="申请人" width="110"></el-table-column>
				<el-table-column prop="sqjsrq" label="申请时间" width="110"></el-table-column>
				<el-table-column prop="zbssfy" label="中标实施金额" width="110"></el-table-column>
				<el-table-column prop="zbekfy" label="中标二开金额" width="110"></el-table-column>
				<el-table-column prop="zbkbfy" label="中标可变金额" width="110"></el-table-column>
				<el-table-column prop="jsssfy" label="结算实施金额" width="110"></el-table-column>
				<el-table-column prop="jsekfy" label="结算二开金额" width="110"></el-table-column>
				<el-table-column prop="jskbfy" label="结算可变金额" width="110"></el-table-column>
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
			records: 0,
			filterData: {
				keyword: '',
				gcdq: '',
				jszt: ''
			},
			gcdqList: [{ label: '全部', id: '' }, { label: '南区', id: '南区' }, { label: '北区', id: '北区'},{ label: '其他', id: '其他'}],
			jsztList: [],
			tableData: []
		};
	},
	mounted() {
		this.jsztList = [];
		getMenu('SettlementStatus',this.jsztList);
		this.queryJsData();
	},
	methods: {
		handleSearch() {
			this.currentPage = 1;
			this.queryJsData();
		},
		handleExport() {},
		CheckGcdz(data) {
			this.filterData.gcdq = data;
			this.currentPage = 1;
			this.queryJsData();
		},
		CheckSfsh(data) {
			this.filterData.jszt = data;
			this.currentPage = 1;
			this.queryJsData();
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.queryJsData();
		},
		handleSizeChange(data) {
			this.currentPage = 1;
			this.pageSize = data;
			this.queryJsData();
		},
		handleClick() {
			let routeData = this.$router.resolve({
				path: '/projectsettledetail',
				query: {}
			});
			window.open(routeData.href, '_blank');
		},
		queryJsData(){
			this.$get(this.API.queryJsData,{
				curPage:this.currentPage,
				pageSize:this.pageSize,
				gcdq:this.filterData.gcdq,
				jszt:this.filterData.jszt,
				keyword:this.filterData.keyword
			}).then(res=>{
				if(res.state == 'success'){
					if(!!res.data.rows){
						this.tableData = res.data.rows
					}
					this.records = res.data.records;
				}else{
					this.$message({
						message:res.msg,
						type:'error'
					})
				}
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.project_settle {
	margin: 20px;
	padding: 15px;
	background: #ffffff;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
