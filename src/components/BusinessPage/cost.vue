<template>
	<div class="project-teamwork">
		<div class="project-teamwork-content">
			<div class="tabs">
				<span :class="{'active':activeName == 'zj'}" @click="handleClick('zj')">在建</span>
				<span :class="{'active':activeName == 'sh'}" @click="handleClick('sh')">售后</span>
			</div>
			<div v-if="activeName == 'zj'">
				<div class="table_grid table_title mg-12">
					<h5 class="mg-12">分包执行</h5>
					<table>
						<tr>
							<th>项目状态</th>
							<td>{{ costData.xmzt }}</td>
							<th>项目进度</th>
							<td >{{ costData.xmjd }}</td>
							<th></th>
							<td></td>
						</tr>
						<tr>
							<th>实施分包人月（人/月）</th>
							<td>{{ costData.ssfbry }}</td>
							<th>工时人月（人/月）</th>
							<td>{{ costData.gsry }}</td>
							<th>实施投入比例（%）</th>
							<td>{{ costData.sstrbl }}</td>
						</tr>
						<tr>
							<th>二开分包金额（元）</th>
							<td>{{ costData.ekfbje }}</td>
							<th>二开提报金额（元）</th>
							<td>{{ costData.ektbje }}</td>
							<th>二开投入比例（%）</th>
							<td>{{ costData.ektrbl }}</td>
						</tr>
						<tr>
							<th>可变分包金额（元）</th>
							<td>{{ costData.kbfbje }}</td>
							<th>可变提报金额（%）</th>
							<td>{{ costData.kbtbje }}</td>
							<th>可变投入比例（%）</th>
							<td>{{ costData.kbtrbl }}</td>
						</tr>
					</table>
				</div>
				<div class="mg-12 table_title">
					<h5 class="mg-12">实施工时</h5>
					<rbgsPannel :iscb="true" :xmbh="xmbh" :xmmc="xmmc"></rbgsPannel>
				</div>
			</div>
			<div v-if="activeName == 'sh'">
				<p class="mg-12"> 售后结算金额（元）：{{costData.shjsje}}</p>
				<div>
						<tableComponents
						:tableData="dataList"
						:pageShow="false"
						:exportShow="false"
						:currentPage="currentPage"
						:pageSize="pageSize"
						@handleCurrentChange="handleCurrentChange"
						@exportTable="exportTable"
						@handleXxwt="handleXxwt"
						:widthArr="[1,12]"
						:rowWidth="'100'"
						:Width="'60'"
						:Height="250"
						:indexArr="[]"
					></tableComponents>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import rbgsPannel from '@/views/BusinessPage/report/cbzxqktj/rbgs';
	import tableComponents from '@/components/reportTable/tableComponents.vue';
	export default {
	data() {
		return {
			activeName: 'zj',
			costData: {},
			dataList: {},
			filterWord: {
				period: 1
			},
			currentPage: 1,
			pageSize: 20,
	
		};
	},
	mounted() {
		if(this.activeName == 'zj'){
			this.getCost();
		}
	},
	props: {
		xmbh: {
			type: String,
			default: ''
		},
		xmmc:{
			type: String,
			default: ''
		}
	},
	methods: {
		handleClick(tabName) {
			this.activeName = tabName;
		},
		
		
		exportTable(){
			
		},
		// 
		handleXxwt(data, i, params) {
			let obj = {
		        userQuestionStartDt:this.dateType==0?this.startDate:this.startDateFw,
				userQuestionEndDt:this.dateType==0?this.endDate:this.endDateFw,
				dwbh:!!this.$route.query.bh?this.$route.query.bh:this.userInfo.unitnum,
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
		
		getCost(){
			this.$get(this.API.getCost,{
				xmbh:this.xmbh
			}).then(res=>{
				if(res.state == 'success'){
					this.costData = res.data;
				}else{
					this.$message({
						message:res.msg,
						type:'error'
					})
				}
			})
		},
		// 用户登录统计报表
		questionProgressSummaryReport(curPage) {
			this.$get(this.API.questionProgressSummaryReport, {
				
			}).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}else{
					this.$message({
						message:res.msg,
						type:'error'
					})
				}
			});
		}
	},
	components: {rbgsPannel,tableComponents}
};
</script>

<style scoped>
.project-teamwork {
	padding: 20px;
}
.project-teamwork-content {
	background: rgba(255, 255, 255, 1);
	border-radius: 5px;
	padding: 10px;
	/* height: calc(100vh - 150px); */
}
.el-tab-pane {
	max-height: calc(100vh - 230px);
	overflow-y: auto;
	margin: 8px 0;
}

.tabs{
	border-bottom: 1px solid #eee;
	display: flex;
}
.tabs span{
	display: block;
	width: 140px;
	height: 40px;
	text-align: center;
	line-height: 40px;
}
.tabs span:hover{
	cursor: pointer;
}
.active{
	font-weight:700;
	border-bottom: 2px solid #0074D9;
	color: #0074D9;
	font-size: 18px;
}
</style>
