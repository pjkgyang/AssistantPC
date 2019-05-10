<template>
	<div class="pannelPadding-10">
		<div class="pannelPaddingBg-10">
			<h4 text-center>日报工时详情</h4>
			<h4>【{{$route.query.xmbh}}】{{$route.query.xmmc}}&#x3000;</h4>
			<tableComponents
				:tableData="dataList"
				:pageShow="false"
				:currentPage="currentPage"
				:pageSize="pageSize"
				@handleCurrentChange="handleCurrentChange"
				@exportTable="exportTable"
				@handleXxwt="handleXxwt"
				:indexArr="[0, 1]"
				:widthArr="[0]"
				:Width="'80'"
				:Height="0"
			></tableComponents>
		</div>
	</div>
</template>

<script>
import tableComponents from "@/components/reportTable/tableComponents.vue";
export default {
	data() {
		return {
			dataList: {},
			currentPage: 1,
			pageSize: 20,
			total: 0
		};
	},
	methods: {
		exportTable(){
			window.open(window.baseurl +'report/exportMilestoneStageWorkHour.do?xmbh='+this.$route.query.xmbh);
		},
		
		handleXxwt(data, i, params) {
			let obj = {
		       xmbh:this.$route.query.xmbh,
			   xmmc:this.$route.query.xmmc,
				cpmc:data[0]
		    }
			if (params[i].en.indexOf(",") != -1) {
			  let key = params[i].en.split(",")[0],
			      value = params[i].en.split(",")[1];
			  obj[key] = value;
			}
			  let routeData = this.$router.resolve({
					name: "LogPannal2",
					query: obj
			  });
			  window.open(routeData.href, "_blank");
		},
		handleSizeChange(data) {
			this.currentPage = 1;
			this.pageSize = data;
			this.queryMilestoneStageWorkHour();
		},
		handleCurrentChange(data) {
			this.currentPage = data;
			this.queryMilestoneStageWorkHour();
		},
		queryMilestoneStageWorkHour() {
			this.$get(this.API.queryMilestoneStageWorkHour, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				xmbh: this.$route.query.xmbh
			}).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		}
	},
	mounted() {
		this.queryMilestoneStageWorkHour();
	},
	components: { tableComponents }
};
</script>

<style scoped>
h4 {
	font-weight: 700;
	margin: 10px 0 !important;
}
</style>
