<template>
	<div>
		<div>
			<tableComponents
				:tableData="dataList"
				:pageShow="true"
				:currentPage="currentPage"
				:pageSize="pageSize"
				@handleCurrentChange="handleCurrentChange"
				@exportTable="exportTable"
				:widthArr="[0]"
				:indexArr="[0]"
				:Width="'150'"
				:Height="0"
			></tableComponents>
		</div>
	</div>
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js';
import { userBehaviorReport } from '@/api/report.js';
import { getMenu, getSession } from '@/utils/util.js';
import tableComponents from '@/components/reportTable/tableComponents.vue';
import filterComponent from '@/components/reportTable/filterComponent.vue';
export default {
	data() {
		return {
			gczdList: [],
			xmlxList: [],
			xmlx: '',
			gczd: '',
			dataList: {},
			headList: [],
			keyword: '',
			filterList: ['keyword'],
			filterDate: {
				keyword: ''
			},
			currentPage: 1,
			pageSize: 30
		};
	},
	methods: {
		exportTable() {
			window.open(window.baseurl + 'usageReport/exportUserBehaviorReport.do');
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.userBehaviorReport();
		},
		// handleChangeFilter(data) {
		//   this.currentPage = 1;
		//   this.filterDate = data;
		//   this.userBehaviorReport();
		// },
		// 用户登录统计报表
		userBehaviorReport(curPage) {
			this.$get(this.API.userBehaviorReport, {
				curPage: this.currentPage,
				pageSize: this.pageSize
			}).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		}
	},
	mounted() {
		this.userBehaviorReport();
	},
	activated() {},
	watch: {},
	components: {
		filterComponent,
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
