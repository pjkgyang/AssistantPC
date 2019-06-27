<template>
	<div>
		<div>
			<filterComponent
				:filterList="filterList"
				@handleChangeFilter="handleChangeFilter"
				:placeholder="'请输入姓名/工号'"
			></filterComponent>
		</div>
		<div>
			 <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" 
			 @handleCurrentChange="handleCurrentChange"  @exportTable="exportTable" 
			:indexArr='[20]' :widthArr="[]" :Width="'130'" :Height="0" :archiveShow="archiveShow"></tableComponents>
		</div>
	</div>
</template>
<script>
import tableComponents from '@/components/reportTable/tableComponents.vue';
import filterComponent from '@/components/reportTable/filterComponent.vue';

export default {
	data() {
		return {
			dataList: {},
			archiveShow: false,
			tableHeight: window.innerHeight - 300,
			filterList: ['keyword',  'bm', 'rzdj', 'rzjb', 'date','xllx'],
			filterData: {
				keyword: '',
				bm: '',
				rzdj: '',
				rzjb: '',
				date: '',
				xllx:''
			},
			currentPage: 1,
			pageSize: 15,
			total: 0,
			userGroupTag: '' //用户标签
		};
	},
	methods: {
		exportTable() {
			let rzrqStart = !this.filterData.date[0] ? '' : this.filterData.date[0],
				rzrqEnd = !this.filterData.date[1] ? '' : this.filterData.date[1];
			window.open(
				window.baseurl +
					'personnel/exportJobQualification.do?rzjb=' +
					this.filterData.rzjb +
					'&rzdj=' +
					this.filterData.rzdj +
					'&bm=' +
					this.filterData.bm +
					'&xllx=' +
					this.filterData.xllx +
					'&rzrqStart=' +
					rzrqStart +
					'&rzrqEnd=' +
					rzrqEnd +
					'&keyword=' +
					this.filterData.keyword
			);
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.jobQualificationQuery();
		},
		handleChangeFilter(data) {
			this.filterData = data;
			this.currentPage = 1;
			this.jobQualificationQuery();
		},

		// 任职资格查询
		jobQualificationQuery() {
			this.$get(this.API.jobQualificationQuery, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				rzjb: this.filterData.rzjb,
				rzdj: this.filterData.rzdj,
				bm:this.filterData.bm,
				xllx:this.filterData.xllx,
				rzrqStart: !this.filterData.date[0] ? '' : this.filterData.date[0],
				rzrqEnd: !this.filterData.date[1] ? '' : this.filterData.date[1],
				keyword: this.filterData.keyword
			}).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data
					this.total = res.data.records;
				} else {
					this.$alert(res.msg, '提示', {
						confirmButtonText: '确定',
						type: 'error'
					});
				}
			});
		}
	},
	mounted() {
		this.userGroupTag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
		this.jobQualificationQuery();
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
