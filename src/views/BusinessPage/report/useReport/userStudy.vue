<template>
	<div>
		<div>
			<div class="mg-12">
				<span class="filter-weight  width120">关键字查询：</span>
				<el-input v-model="filterData.keyword" size="mini" placeholder="请输入用户姓名/学校" style="width: 586px;"></el-input>
				&#x3000;
				<el-button size="mini" type="primary" @click="handleCheck">查询</el-button>
			</div>
			<div class="mg-12">
				<span class="filter-weight width120">首次学习开始日期：</span>
				<el-date-picker
					v-model="filterData.scxxksrq"
					type="date"
					placeholder="选择日期"
					size="mini"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
				></el-date-picker>
				&#x3000;
				<span class="filter-weight width120">首次学习结束日期：</span>
				<el-date-picker
					v-model="filterData.scxxjsrq"
					type="date"
					size="mini"
					placeholder="选择日期"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
				></el-date-picker>
			</div>
			<div class="mg-12">
				<span class="filter-weight width120">最近学习开始日期：</span>
				<el-date-picker
					v-model="filterData.zjxxksrq"
					type="date"
					placeholder="选择日期"
					size="mini"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
				></el-date-picker>
				&#x3000;
				<span class="filter-weight width120">最近学习结束日期：</span>
				<el-date-picker
					v-model="filterData.zjxxjsrq"
					type="date"
					size="mini"
					placeholder="选择日期"
					format="yyyy 年 MM 月 dd 日"
					value-format="yyyy-MM-dd"
				></el-date-picker>
			</div>
		</div>
		<div>
			<tableComponents
				:tableData="dataList"
				:pageShow="true"
				:currentPage="currentPage"
				:pageSize="pageSize"
				@handleCurrentChange="handleCurrentChange"
				@exportTable="exportTable"
				@handleXxwt="handleXxwt"
				:indexArr="[0]"
				:widthArr="[]"
				:Width="'160'"
				:Height="290"
			></tableComponents>
		</div>
	</div>
</template>
<script>
import tableComponents from '@/components/reportTable/tableComponents.vue';
export default {
	data() {
		return {
			filterData: {
				keyword: '',
				scxxksrq: '',
				scxxjsrq: '',
				zjxxksrq: '',
				zjxxjsrq: ''
			},
			dataList: {},
			headList: [],
			currentPage: 1,
			pageSize: 18
		};
	},
	methods: {
		exportTable() {
			this.filterData.scxxksrq = !this.filterData.scxxksrq ? '' : this.filterData.scxxksrq;
			this.filterData.scxxjsrq = !this.filterData.scxxjsrq ? '' : this.filterData.scxxjsrq;
			this.filterData.zjxxksrq = !this.filterData.zjxxksrq ? '' : this.filterData.zjxxksrq;
			this.filterData.zjxxjsrq = !this.filterData.zjxxjsrq ? '' : this.filterData.zjxxjsrq;
			
			window.open(window.baseurl + 'userstudyreport/exportUserStudyReport.do?conditions=' + this.filterData.keyword 
			+'&startDateFirst=' + this.filterData.scxxksrq  
			+'&endDateFirst=' + this.filterData.scxxjsrq  
			+'&startDateLast=' + this.filterData.zjxxksrq  
			+'&endDateLast=' + this.filterData.zjxxjsrq  
			);
		},
		handleCheck() {
			this.currentPage = 1;
			this.queryUserStudyReport();
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.queryUserStudyReport();
		},
		handleChangeFilter(data) {
			this.currentPage = 1;
			this.filterDate = data;
			this.queryUserStudyReport();
		},
		// 用户学习行为报表
		queryUserStudyReport(curPage) {
			this.$get(this.API.queryUserStudyReport, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				conditions: this.filterData.keyword,
				startDateFirst: !this.filterData.scxxksrq ? '' : this.filterData.scxxksrq,
				endDateFirst: !this.filterData.scxxjsrq ? '' : this.filterData.scxxjsrq,
				startDateLast: !this.filterData.zjxxksrq ? '' : ththis.filterData.zjxxjsrqis.filterData.zjxxksrq,
				endDateLast: !this.filterData.zjxxjsrq ? '' : this.filterData.zjxxjsrq
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
		this.queryUserStudyReport();
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
