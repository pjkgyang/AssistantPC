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

		<div flex style="margin:10px 0;" v-if="userGroup.indexOf('JYGL') != -1">
			<span class="query-title">工程大区:</span>
			<p class="query-list" style="width:90%">
				<span v-for="gcdq in gcdqList" :class="{ 'bg-active': gcdq.id == filterData.gcdq }" :key="gcdq.id" @click="CheckGcdz(gcdq.id)">{{ gcdq.label }}</span>
			</p>
		</div>
		<div flex>
			<span class="query-title">是否审核:</span>
			<p class="query-list">
				<span v-for="shzt in shztList" :class="{ 'bg-active': shzt.id == filterData.shzt }" :key="shzt.id" @click="CheckSfsh(shzt.id)">{{ shzt.label }}</span>
			</p>
		</div>
		<br />
		<div>
			<el-button size="mini" type="danger" @click="handleSetCz" :disabled="!jssqwidArr.length">设置冲账</el-button><br><br>
			<el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" :selectable="checkboxInit"></el-table-column>
				<el-table-column fixed="left" label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
					</template>
				</el-table-column>
				<el-table-column label="是否审核" width="120">
					<template slot-scope="scope">
						<el-tag size="mini" :type="scope.row.shzt == '未审核'||scope.row.shzt == '审核不通过' ? 'info' : 'success'">{{ scope.row.shzt }}</el-tag>
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
			records: 0,
			filterData: {
				keyword: '',
				gcdq: '',
				shzt: ''
			},
			gcdqList: [{ label: '全部', id: '' }, { label: '南区', id: '南区' }, { label: '北区', id: '北区' }, { label: '其他', id: '其他' }],
			shztList: [{ label: '全部', id: '' }, { label: '未审核', id: '0' },{ label: '审核通过', id: '1' },{ label: '审核不通过', id: '2' }, { label: '已冲账', id: '3' }],
			tableData: [],
			userGroup: '', //用户权限
			jssqwidArr: [] //冲账结算申请
		};
	},
	mounted() {
		this.queryJsData();
		this.userGroup = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
	},
	methods: {
		// 设置冲账
		handleSetCz() {
			this.$post(this.API.setCz,{
				jssqwids:this.jssqwidArr.join(',')
			}).then(res=>{
				if(res.state == 'success'){
					this.$message({message:'设置成功',type:'success'});
					this.queryJsData();
				}else{
					this.$message({message:'设置成功',type:'success'});
				}
			})
		},
		// 复选设置冲账
		handleSelectionChange(val) {
			this.jssqwidArr = [];
			val.forEach(ele=>{
				this.jssqwidArr.push(ele.jssqwid);
			})
		},
		// 未审核禁用
		checkboxInit(row, index) {
			if (row.shzt == '审核通过') {
				return true;
			} else {
				return false;
			}
		},
		// 关键字查询
		handleSearch() {
			this.currentPage = 1;
			this.queryJsData();
		},
		handleExport() {
			window.open(window.baseurl + 'jsxx/exportJsData.do?keyword=' + this.filterData.keyword + '&gcdq=' + this.filterData.gcdq + '&shzt=' + this.filterData.shzt +'&isReview=1');
		},
		CheckGcdz(data) {
			this.filterData.gcdq = data;
			this.currentPage = 1;
			this.queryJsData();
		},
		CheckSfsh(data) {
			this.filterData.shzt = data;
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
		handleClick(data) {
			let routeData = this.$router.resolve({
				path: '/projectSettleAuditDetail',
				query: {
					wid: data.jssqwid,
					fbbh: data.fbbh
				}
			});
			window.open(routeData.href, '_blank');
		},
		queryJsData() {
			this.$get(this.API.queryJsData, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				gcdq: this.filterData.gcdq,
				shzt: this.filterData.shzt,
				isReview:1, //是否审核页面（审核页面传1）
				keyword: this.filterData.keyword
			}).then(res => {
				if (res.state == 'success') {
					if (!!res.data.rows) {
						this.tableData = res.data.rows;
					} else {
						this.tableData = [];
					}
					this.records = res.data.records;
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.project_settle {
	margin: 12px 20px;
	padding: 15px 15px 5px;
	background: #ffffff;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
