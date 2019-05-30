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
				@change="handleSearch"
			></el-input>
			&#x3000;
			<el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
			<el-button type="primary" size="mini" @click="handleExport">导出</el-button>
		</div>

		<div flex style="margin:10px 0;" v-if="userGroup.indexOf('JYGL') != -1">
			<span class="query-title">工程大区:</span>
			<p class="query-list" style="width:90%">
				<span v-for="gcdq in gcdqList" :class="{ 'bg-active': gcdq.id == filterData.gcdq }" @click="CheckGcdz(gcdq.id)">{{ gcdq.label }}</span>
			</p>
		</div>

		<div flex>
			<span class="query-title">是否中标:</span>
			<p class="query-list">
				<span v-for="sfzb in sfzbList" :class="{ 'bg-active': sfzb.id == filterData.sfzb }" :key="sfzb.id" @click="CheckSfsh(sfzb.id)">{{ sfzb.label }}</span>
			</p>
		</div>
		<br />
		<div>
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed="left" label="操作" width="120">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="handleClick(scope.row)">详情</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="xmbh" label="项目编号"></el-table-column>
				<el-table-column prop="xmmc" label="项目名称" min-width="260" show-overflow-tooltip></el-table-column>
				<el-table-column prop="htbh" label="合同编号" min-width="130" show-overflow-tooltip></el-table-column>
				<el-table-column prop="ztztmc" label="项目整体状态" width="110"></el-table-column>
				<el-table-column prop="xx" label="学校" min-width="200"></el-table-column>
				<el-table-column prop="jf" label="甲方" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="fbbh" label="分包编号" min-width="130"></el-table-column>
				<el-table-column prop="fbmc" label="分包名称" min-width="260" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sfzb" label="是否中标" width="120"></el-table-column>
				<el-table-column prop="fbje" label="分包金额" width="120"></el-table-column>
				<el-table-column prop="ssfy" label="实施金额" width="120"></el-table-column>
				<el-table-column prop="ekfy" label="二开金额" width="120"></el-table-column>
				<el-table-column prop="kbfy" label="可变金额" width="110"></el-table-column>
				<el-table-column prop="tbgs" label="投标个数" width="110"></el-table-column>
				<el-table-column prop="zbrxm" label="中标人" width="110"></el-table-column>
				<el-table-column prop="zbje" label="中标金额" width="110"></el-table-column>
				<el-table-column prop="zbssfy" label="中标实施金额" width="110"></el-table-column>
				<el-table-column prop="zbekfy" label="中标二开金额" width="110"></el-table-column>
				<el-table-column prop="zbkbfy" label="中标可变费用" width="110"></el-table-column>
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
			dialogVisible: false,
			currentPage: 1,
			pageSize: 15,
			total: 0,
			records: 0,
			filterData: {
				keyword: '',
				gcdq: '',
				sfzb: ''
			},
			gcdqList: [{ label: '全部', id: '' }, { label: '南区', id: '南区' }, { label: '北区', id: '北区' }, { label: '其他', id: '其他' }],
			sfzbList: [{ label: '全部', id: '' }, { label: '已中标', id: '1' }, { label: '未中标', id: '0' }],
			tableData: [],
			userGroup: ''
		};
	},
	mounted() {
		this.fbManage();
		this.userGroup = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
	},
	methods: {
		handleSearch() {
			this.fbManage();
		},
		// 导出
		handleExport() {
			window.open(window.baseurl + 'fbxx/exportFbManage.do?keyword=' + this.filterData.keyword + '&gcdq=' + this.filterData.gcdq + '&sfzb=' + this.filterData.sfzb + '&isfb=0');
		},
		CheckGcdz(data) {
			this.filterData.gcdq = data;
			this.currentPage = 1;
			this.fbManage();
		},
		CheckSfsh(data) {
			this.filterData.sfzb = data;
			this.currentPage = 1;
			this.fbManage();
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.fbManage();
		},
		handleSizeChange(data) {
			this.currentPage = 1;
			this.pageSize = data;
			this.fbManage();
		},
		handleClick(data) {
			this.dialogVisible = !this.dialogVisible;
			let routeData = this.$router.resolve({
				path: '/projectbiddetail',
				query: {
					fbbh: data.fbbh,
					xmmc:data.xmmc
				}
			});
			window.open(routeData.href, '_blank');
		},
		// 中标管理
		fbManage() {
			this.$get(this.API.fbManage, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				sfzb: this.filterData.sfzb,
				gcdq: this.filterData.gcdq,
				isfb:0,
				keyword: this.filterData.keyword
			}).then(res => {
				if (res.state == 'success') {
					if (!!res.data.rows) {
						this.tableData = res.data.rows;
					} else {
						this.tableData = [];
					}
					this.total = res.data.total;
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
.project_fbsh {
	margin: 12px 20px;
	padding: 15px 15px 5px;
	background: #ffffff;
	border-radius: 4px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
