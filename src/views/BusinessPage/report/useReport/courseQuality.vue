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
				<span class="filter-weight width120">最近学习开始日期：</span>
				<el-date-picker v-model="filterData.zjxxksrq" type="date" placeholder="选择日期" size="mini" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
				&#x3000;
				<span class="filter-weight width120">最近学习结束日期：</span>
				<el-date-picker v-model="filterData.zjxxjsrq" type="date" size="mini" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
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
				:widthArr="[0]"
				:Width="'130'"
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
				zjxxksrq:"",
				zjxxjsrq:""
			},
			dataList: {},
			headList: [],
			currentPage: 1,
			pageSize: 18
		};
	},
	methods: {
		exportTable() {
			this.filterData.zjxxksrq = !this.filterData.zjxxksrq ? '' : this.filterData.zjxxksrq;
			this.filterData.zjxxjsrq = !this.filterData.zjxxjsrq ? '' : this.filterData.zjxxjsrq;
			
			window.open(window.baseurl + 'userstudyreport/exportCourseQualityReport.do?conditions=' + this.filterData.keyword 
			+'&startDate=' + this.filterData.zjxxksrq  
			+'&endDate=' + this.filterData.zjxxjsrq  
			);
		},
		handleCheck() {
			this.currentPage = 1;
			this.queryCourseQualityReport();
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.queryCourseQualityReport();
		},
		handleChangeFilter(data) {
			this.currentPage = 1;
			this.filterDate = data;
			this.queryCourseQualityReport();
		},
		// 用户学习行为报表
		queryCourseQualityReport(curPage) {
			this.$get(this.API.queryCourseQualityReport, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				conditions:this.filterData.keyword,
				startDate:!this.filterData.zjxxksrq?'':this.filterData.zjxxksrq,
				endDate:!this.filterData.zjxxjsrq?'':this.filterData.zjxxjsrq
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
		this.queryCourseQualityReport();
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
