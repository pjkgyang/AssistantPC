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

		<div flex style="margin:10px 0;">
			<span class="query-title">区域工程:</span>
			<p class="query-list" style="width:90%">
				<span :class="{ 'bg-active': filterData.gczd == '' }" @click="CheckGcdz('')">全部</span>
				<span v-for="gczd in gczdList" :class="{ 'bg-active': gczd.label == filterData.gczd }" :key="gczd.id" @click="CheckGcdz(gczd.label)">{{ gczd.mc }}</span>
			</p>
		</div>

		<div flex>
			<span class="query-title">是否审核:</span>
			<p class="query-list">
				<span v-for="sfsh in sfshList" :class="{ 'bg-active': sfsh.id == filterData.sfsh }" :key="sfsh.id" @click="CheckSfsh(sfsh.id)">{{ sfsh.label }}</span>
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
				<el-table-column prop="name" label="项目编号"></el-table-column>
				<el-table-column prop="name" label="项目名称" min-width="200"></el-table-column>
				<el-table-column prop="name" label="合同编号" min-width="130"></el-table-column>
				<el-table-column prop="name" label="项目整体状态" width="110"></el-table-column>
				<el-table-column prop="name" label="学校" min-width="200"></el-table-column>
				<el-table-column prop="name" label="甲方"></el-table-column>
				<el-table-column prop="name" label="分包编号" min-width="130"></el-table-column>
				<el-table-column prop="name" label="分包名称" min-width="200"></el-table-column>
				<el-table-column prop="name" label="是否中标" width="120"></el-table-column>
				<el-table-column prop="date" label="分包金额" width="120"></el-table-column>
				<el-table-column prop="date" label="实施金额" width="120"></el-table-column>
				<el-table-column prop="date" label="实施人月" width="120"></el-table-column>

				<el-table-column prop="date" label="二开金额" width="120"></el-table-column>
				<el-table-column prop="name" label="二开人月" width="120"></el-table-column>
				<el-table-column prop="name" label="可变金额" width="110"></el-table-column>
				<el-table-column prop="name" label="投标个数" width="110"></el-table-column>
				<el-table-column prop="name" label="中标人" width="110"></el-table-column>
				<el-table-column prop="name" label="中标金额" width="110"></el-table-column>
				<el-table-column prop="name" label="中标实施金额" width="110"></el-table-column>
				<el-table-column prop="name" label="中标实施人月" width="110"></el-table-column>
				<el-table-column prop="name" label="中标二开金额" width="110"></el-table-column>
				<el-table-column prop="name" label="中标二开人月" width="110"></el-table-column>
				<el-table-column prop="name" label="中标可变费用" width="110"></el-table-column>
				<el-table-column prop="name" label="团队总费用" width="110"></el-table-column>
			</el-table>
			<div text-right>
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[20, 50, 70, 100]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				></el-pagination>
			</div>
		</div>

		<div>
			<el-dialog title="提示" :visible.sync="dialogVisible" width="1150px">
				<div class="pd-10">
					<el-table :data="tableData" style="width: 100%" border>
						 <el-table-column
							  fixed="left"
							  label="操作"
							  width="120">
							  <template slot-scope="scope">
								<el-button type="text" size="small">设为中标</el-button>
								<el-button type="text" size="small">详情</el-button>
							  </template>
							</el-table-column>
						<el-table-column prop="date" label="是否中标" width="110"></el-table-column>
						<el-table-column prop="date" label="分包编号" width="110"></el-table-column>
						<el-table-column prop="name" label="分包名称" min-width="180"></el-table-column>
						<el-table-column prop="name" label="投标人" width="110"></el-table-column>
						<el-table-column prop="name" label="投标时间" width="110"></el-table-column>
						<el-table-column prop="name" label="投标实施金额" width="120"></el-table-column>
						<el-table-column prop="name" label="投标二开金额" width="120"></el-table-column>
						<el-table-column prop="name" label="投标可变金额" width="120"></el-table-column>
					</el-table>
				</div>
				<span slot="footer" class="dialog-footer"><el-button @click="dialogVisible = false" size="mini">取 消</el-button></span>
			</el-dialog>
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
			pageSize: 20,
			total: 0,
			filterData: {
				keyword: '',
				gczd: '',
				sfsh: ''
			},
			gczdList: [],
			sfshList: [{ label: '全部', id: '' }, { label: '已审核', id: '1' }, { label: '未审核', id: '2' }],
			tableData: []
		};
	},
	mounted() {
		if (getSession('gczd') == null) {
			getMenu('gczd', this.gczdList, true); //获取工程战队
		} else {
			this.gczdList = getSession('gczd');
		}
	},
	methods: {
		handleSearch() {},
		handleExport() {},
		SearchItem() {},
		CheckGcdz() {},
		CheckSfsh() {},
		handleCurrentChange() {},
		handleSizeChange() {},
		handleClick() {
			this.dialogVisible = !this.dialogVisible;
			// let routeData = this.$router.resolve({
			// 	path: '/projectfbmx',
			// 	query: {
			// 		v: 'fbsh'
			// 	}
			// });
			// window.open(routeData.href, '_blank');
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
