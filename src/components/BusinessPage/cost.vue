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
							<th>项目进度（%）</th>
							<td>{{!Number(costData.xmjd)?0:costData.xmjd}}</td>
							<th></th>
							<td></td>
						</tr>
						<tr>
							<th>实施分包人月（人/月）</th>
							<td>{{ costData.ssfbry }}</td>
							<th>工时人月（人/月）</th>
							<td>{{!Number(costData.gsry)?0:costData.gsry}}</td>
							<th>实施投入比例（%）</th>
							<td :class="{'command':Number(costData.sstrbl)>100}">{{ !Number(costData.sstrbl)?0:costData.sstrbl}}</td>
						</tr>
						<tr>
							<th>二开分包金额（元）</th>
							<td>{{ costData.ekfbje }}</td>
							<th>二开提报金额（元）</th>
							<td><a :href="'#/erssdetail?xmbh='+xmbh+'&xz=0'" target="_blank">{{ costData.ektbje }}</a></span></td>
							<th>二开投入比例（%）</th>
							<td :class="{'command':Number(costData.ektrbl)>100}">{{!Number(costData.ektrbl)?0:costData.ektrbl}}</td>
						</tr>
						<tr>
							<th>可变分包金额（元）</th>
							<td>{{ costData.kbfbje }}</td>
							<th>可变提报金额（元）</th>
							<td><a :href="'#/erssdetail?xmbh='+xmbh" target="_blank">{{ costData.kbtbje }}</a></td>
							<th>可变投入比例（%）</th>
							<td><span :class="{'command':Number(costData.kbtrbl)>100}">{{!Number(costData.kbtrbl)?0:costData.kbtrbl}}</span></td>
						</tr>
					</table>
				</div>
				<div class="mg-12 table_title">
					<h5 class="mg-12">实施工时</h5>
					<rbgsPannel :iscb="true" :xmbh="xmbh" :xmmc="xmmc" :exportShow="false"></rbgsPannel>
				</div>
			</div>
			
			<div v-if="activeName == 'sh'">
				<div  colcenter spacebetween>
					<p class="mg-12"> 售后结算金额（元）：{{costData.shjsje}}</p>
					<p>
						<span class="query-title">售后状态:</span>
						<span class="query-list">
							<span v-for="shzt in shztList" :class="{ 'bg-active': shzt.id == filterWord.shzt }" @click="CheckShzt(shzt.id)">{{ shzt.mc }}</span>
						</span>
					</p>
				</div>
				
				<div>
						<tableComponents
						:tableData="dataList"
						:pageShow="false"
						:exportShow="false"
						:currentPage="currentPage"
						:pageSize="pageSize"
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
				shzt: ''
			},
			currentPage: 1,
			pageSize: 20,
			shztList:[{id:'',mc:'全部'},{id:'1',mc:'在保'},{id:'2',mc:'过保'}]
	
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
			if(this.activeName == 'sh'){
				this.afterSalesSettlementQuestion();
			}
		},
		
		
		exportTable(){
			
		},
		// 售后状态
		CheckShzt(data){
			this.filterWord.shzt = data;
			this.afterSalesSettlementQuestion();
		},
		// 查看详情
		handleXxwt(data, i, params) {
			let obj = {
		        shwtxmbh:this.xmbh,
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
		},
		
		// 售后工时
		afterSalesSettlementQuestion(){
			this.$get(this.API.afterSalesSettlementQuestion,{
				shwtxmbh:this.xmbh,
				shzt:this.filterWord.shzt
			}).then(res=>{
				if(res.state == 'success'){
					this.dataList = res.data;
				}
			})
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
.command{
	font-weight:700;
	color: #f00;
}
</style>
