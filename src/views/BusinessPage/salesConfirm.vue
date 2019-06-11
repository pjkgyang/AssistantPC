<template>
	<div class="mg15">
		<div class="pannelPaddingBg-10">
			<div>
				<div class="mg-12">
					<span class="filter-weight  width120">关键字查询：</span>
					<el-input
						v-model="filterData.keyword"
						size="mini"
						placeholder="请输入合同编号/项目编号/项目名称/项目内容/里程碑描述/销售确认人"
						style="width: 586px;"
					></el-input>
					&#x3000;
					<el-button size="mini" type="primary" @click="handleCheck">查询</el-button>
				</div>
				<div class="mg-12">
					<span class="filter-weight  width120">是否确认：</span>
					<el-radio-group v-model="filterData.sfqr" @change="handleChangeSfqr">
						<el-radio :label="1">已确认</el-radio>
						<el-radio :label="0">未确认</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div>
				<div class="mg-12">
					<el-button size="mini" type="primary" v-if="!filterData.sfqr">确认</el-button>
					<el-button size="mini" type="danger" v-if="!!filterData.sfqr">驳回</el-button>
					<el-button size="mini" type="primary">导出</el-button>
				</div>
				<div>
					<el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="date" label="日期" width="180"></el-table-column>
						<el-table-column prop="name" label="姓名" width="180"></el-table-column>
						<el-table-column prop="address" label="地址"></el-table-column>
					</el-table>
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[15, 30, 50, 100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total"
					></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentPage: 1,
			pageSize: 15,
			total: 0,
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			],
			widsArr:[],
			filterData: {
				keyword: '',
				sfqr: 1
			}
		};
	},
	mounted() {},
	methods: {
		handleCheck() {
			this.currentPage = 1;
			this.querySaleConfirmMilestone();
		},
		handleSizeChange(data) {
			this.currentPage = data;
			this.querySaleConfirmMilestone();
		},
		handleCurrentChange(data) {
			this.currentPage = 1;
			this.pageSize = data;
			this.querySaleConfirmMilestone();
		},
		handleChangeSfqr() {
			this.currentPage = 1;
			this.querySaleConfirmMilestone();
		},
		// 复选里程碑
		handleSelectionChange(val){
			console.log(val)
		},
		querySaleConfirmMilestone() {
			this.$get(this.API.querySaleConfirmMilestone, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				sfqr: this.filterData.sfqr,
				keyword: this.filterData.keyword
			}).then(res => {
				if (res.state == 'success') {
				} else {
				}
			});
		}
	}
};
</script>

<style></style>
