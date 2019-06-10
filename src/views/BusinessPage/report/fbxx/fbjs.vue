<template>
	<div>
		<div>
			<div class="mg-12">
				<span class="filter-weight  width120">关键字查询：</span>
				<el-input v-model="filterData.keyword" size="mini" placeholder="请输入课程名称" style="width: 586px;"></el-input>
				&#x3000;
				<el-button size="mini" type="primary" @click="handleCheck">查询</el-button>
			</div>
			<div class="mg-12">
				<span class="filter-weight  width120">结算类型：</span>
				<el-radio-group v-model="filterData.jstype" @change="handleChangeRodio">
					<el-radio :label="0">按分包结算</el-radio>
					<el-radio :label="1">按个人结算</el-radio>
				</el-radio-group>
			</div>
		</div>
		<div>
			<tableComponents
				:pageShow="true"
				:currentPage="currentPage"
				:pageSize="pageSize"
				:tableData="dataList"
				@exportTable="exportTable"
				@handleXxwt="handleXxwt"
				:Height="240"
			></tableComponents>
		</div>
	</div>
</template>
<script>
import tableComponents from '@/components/reportTable/tableComponents.vue';
export default {
	data() {
		return {
			filterData:{
				keyword: '',
				jstype:0
			},
			dataList: {},
			headList: [],
			currentPage: 1,
			pageSize: 18
		};
	},
	methods: {
		handleChangeRodio(){
			this.currentPage = 1;
			this.queryFbjsMonthReport();
		},
		exportTable() {
			window.open(window.baseurl + 'fbxx/exportFbjsMonthReport.do?conditions=' + this.filterData.keyword 
			+'&jstype=' + this.filterData.jstype  
			);
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.queryFbjsMonthReport();
		},
		// 关键字查询
		handleCheck() {
			this.currentPage = 1;
			this.queryFbjsMonthReport();
		},
		// 用户学习行为报表
		queryFbjsMonthReport(curPage) {
			this.$get(this.API.queryFbjsMonthReport, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				conditions:this.filterData.keyword,
				jstype:this.filterData.jstype
			}).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		},
		handleXxwt(data, i, params) {
			// let routeData = this.$router.resolve({
			//   path: "/userDetail",
			//   query:{
			//       bh:data[0]
			//   }
			// });
			// window.open(routeData.href, "_blank");
		}
	},
	mounted() {
		this.queryFbjsMonthReport();
	},
	activated() {},
	watch: {},
	components: {
		tableComponents
	}
};
</script>
<style scope>
.query-condition > div {
	display: flex;
	align-items: flex-start;
	margin: 10px 0;
	font-size: 13px;
}
.query-list {
	width: 95%;
}
.query-list span:hover {
	cursor: pointer;
}
.query-list span {
	display: inline-block;
	padding: 0px 5px;
	color: #637d8a;
	border-radius: 3px;
	margin: 5px 10px 0 0;
}
.bg-active {
	background: #1997d7;
	color: #fff !important;
}
</style>
