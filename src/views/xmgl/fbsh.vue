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

		<div flex style="margin:10px 0;" v-if="userGroup.indexOf('GCZJ') == -1">
			<span class="query-title">工程大区:</span>
			<p class="query-list" style="width:90%">
				<span v-for="gcdq in gcdqList" :class="{ 'bg-active': gcdq.id == filterData.gcdq }"  @click="CheckGcdz(gcdq.id)"  >{{ gcdq.label }}</span>
			</p>
		</div>

		<div flex>
			<span class="query-title">是否审核:</span>
			<p class="query-list">
				<span v-for="sfsh in sfshList" :class="{ 'bg-active': sfsh.id == filterData.shzt }" :key="sfsh.id" @click="CheckSfsh(sfsh.id)">{{ sfsh.label }}</span>
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
				<el-table-column prop="date" label="是否审核" width="120">
					<template slot-scope="scope">
						<el-tag size="mini" :type="scope.row.shzt==1?'success':scope.row.shzt==2?'danger':'info'">
						{{scope.row.shzt==1?'审核通过':scope.row.shzt==2?'审核不通过':'未审核'}}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="xmbh" label="项目编号" width="120"></el-table-column>
				<el-table-column prop="xmmc" label="项目名称" min-width="280" show-overflow-tooltip></el-table-column>
				<el-table-column prop="htbh" label="合同编号" width="150"></el-table-column>
				<el-table-column prop="fbmc" label="分包名称" min-width="280" show-overflow-tooltip></el-table-column>
				<el-table-column prop="fbrxm" label="分包人" width="110"></el-table-column>
				<el-table-column prop="fbrq" label="分包时间" width="110"></el-table-column>
				<el-table-column prop="ssfy" label="分包实施金额" width="110"></el-table-column>
				<el-table-column prop="ekfy" label="分包二开金额" width="110"></el-table-column>
				<el-table-column prop="kbfy" label="分包可变金额" width="110"></el-table-column>
			</el-table>
			<div>
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
				gcdq: '',
				shzt: ''
			},
			gcdqList: [{label:'全部',id:''},{label:'南区',id:'南区'},{label:'北区',id:'北区'},{label:'其他',id:'其他'}],
			sfshList: [{label:'全部',id:''},{label:'已审核',id:'1'},{label:'未审核',id:'0'}],
			tableData: [],
			userGroup:''
		};
	},
	mounted() {
		// if (getSession('SHZT') == null) {
		// 	getMenu('SHZT', this.sfshList); //获取审核状态
		// } else {
		// 	this.sfshList = getSession('SHZT');
		// }
		this.getFbshList();
		this.userGroup = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
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
		handleExport() {
			window.open(
			  window.baseurl +
			    "fbxx/exportFbManage.do?keyword=" +
			    this.filterData.keyword +
			    "&gczq=" +
			    this.filterData.gcdq +
			    "&shzt=" +
			    this.filterData.shzt +
				"&isfb=1"
			);
		},
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
					}else{
						this.tableData  = [];
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
	margin: 12px 20px;
	padding: 15px 15px 5px ;
	background: #ffffff;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
