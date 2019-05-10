<template>
	<div>
		<div style="padding: 15px 0;">
			<div flex>
				<p class="query-title">时间格式选择:</p>
				<p flex>
					<el-button @click="handleChooseDate(0)" :type="dateType == 0 ? 'primary' : 'default'" size="mini">按周期</el-button>
					<el-button @click="handleChooseDate(1)" :type="dateType == 1 ? 'primary' : 'default'" size="mini">按时间段</el-button>
				</p>
			</div>
			<br />
			<div flex v-if="dateType == 0">
				<p class="query-title">周期:</p>
				<p class="query-list">
					<span v-for="(period, index) in periodList" @click="hanleCheckDateZq(period.label)" :key="index" :class="{ 'bg-active': filterWord.period == period.label }">
						{{ period.mc }}
					</span>
				</p>
			</div>
			<div flex v-if="dateType == 1">
				<p class="query-title">提问时间:</p>
				<p>
					<el-date-picker
						v-model="startDateFw"
						@change="handleChangeStartDate"
						size="mini"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
					></el-date-picker>
					至
					<el-date-picker
						v-model="endDateFw"
						@change="handleChangeEndDate"
						size="mini"
						type="date"
						placeholder="选择日期"
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
					></el-date-picker>
					<el-button size="mini" type="primary" @click="handleSearchDate">查询</el-button>
				</p>
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
				:widthArr="[1]"
				:rowWidth="'200'"
				:Width="'60'"
				:Height="250"
				:indexArr="[]"
			></tableComponents>
		</div>
	</div>
</template>
<script>
import { getResponsibleTaskList } from '@/api/common.js';
import { userBehaviorReport } from '@/api/report.js';
import { getMenu, getSession ,GetDateStr,getLastMonthDay} from '@/utils/util.js';
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
			periodList: [{ mc: '本日', label: 1 }, { mc: '本周', label: 2 }, { mc: '本月', label: 3 }, { mc: '本年', label: 4 }],
			filterWord: {
				period: 1
			},
			userInfo:{},
			currentPage: 1,
			pageSize: 20,
			dateType:0,
			startDate:"",
			endDate:'',
			startDateFw:"",
			endDateFw:"",
		};
	},
	props: {
		isXxkb: {
			type: Boolean,
			default: false
		},
	},
	methods: {
		exportTable() {
			let startDate = this.dateType==0?this.startDate:this.startDateFw;
			let endDate = this.dateType==0?this.endDate:this.endDateFw;
			window.open(window.baseurl + 'report/exportQuestionProgressSummaryReport.do?startDate='+ 
			startDate +'&endDate=' +endDate +'&dwbh='+this.userInfo.unit);
		},
		// 
		handleXxwt(data, i, params) {
			let obj = {
		        userQuestionStartDt:this.dateType==0?this.startDate:this.startDateFw,
				userQuestionEndDt:this.dateType==0?this.endDate:this.endDateFw,
				dwbh:this.userInfo.unitnum,
				cpbh:data[0]
		    }
			if (params[i].en.indexOf(",") != -1) {
			  let key = params[i].en.split(",")[0],
			      value = params[i].en.split(",")[1];
			  obj[key] = value;
			}
			  let routeData = this.$router.resolve({
				path: "/report-list/detail.html",
				query:obj
			  });
			  window.open(routeData.href, "_blank");
		},
		handleSearchDate(){
			this.currentPage = 1;
			this.questionProgressSummaryReport();
		},
		// 开始日期（范围）
		handleChangeStartDate(date){
			this.startDateFw = date;
		},
		// 结束日期（范围）
		handleChangeEndDate(date){
			this.endDateFw = date;
		},
		handleChooseDate(data){
			this.dateType = data;
			this.currentPage = 1;
			this.questionProgressSummaryReport();
		},
		hanleCheckDateZq(data){
			this.filterWord.period = data;
			switch (data){
				case 1:
				 this.startDate = this.endDate =  GetDateStr(0);
					break;
				case 2:
				 this.startDate = new Date(Date.now()).getDay()==0?GetDateStr(-6):
				 new Date(Date.now()).getDay()==1?GetDateStr(0):
				 GetDateStr(-(new Date(Date.now()).getDay() - 1));

				 this.endDate = (new Date(Date.now()).getDay()) == 0?GetDateStr(0):GetDateStr( 7 - (new Date(Date.now()).getDay()));
					break;
				case 3:
				 this.startDate = new Date().getFullYear() +'-'+(new Date().getMonth()+1<10?('0'+(new Date().getMonth()+1)):new Date().getMonth()+1) +'-'+ '01'
				 this.endDate = getLastMonthDay(new Date().getFullYear(),new Date().getMonth()+1);
					break;
				case 4:
				 this.startDate = new Date().getFullYear() +'-01-01';
				  this.endDate = new Date().getFullYear() +'-12-31';
					break;
				default:
					break;
			}
			this.currentPage = 1;
			this.questionProgressSummaryReport();

		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.questionProgressSummaryReport();
		},
		// handleChangeFilter(data) {
		//   this.currentPage = 1;
		//   this.filterDate = data;
		//   this.userBehaviorReport();
		// },
		// 用户登录统计报表
		questionProgressSummaryReport(curPage) {
			this.$get(this.API.questionProgressSummaryReport, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				startDate:this.dateType==0?this.startDate:this.startDateFw,
				endDate:this.dateType==0?this.endDate:this.endDateFw,
				dwbh:this.userInfo.unitnum
			}).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}else{
					this.$alert(res.msg, '提示', {
					  confirmButtonText: '确定',
					  type:'error'
					});
				}
			});
		}
	},
	mounted() {
		this.dateType = 0;
		this.startDate = this.endDate = GetDateStr(0);
		if(!!this.isXxkb){
			this.startDateFw = '2018-01-10';
			this.endDateFw = GetDateStr(0);	
		}else{
			this.startDateFw = this.endDateFw = GetDateStr(0);
		}
		this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
		this.questionProgressSummaryReport();
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
