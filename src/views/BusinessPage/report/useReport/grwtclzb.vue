<template>
	<div>
		<div>
		  <filterComponent :filterList="filterList" @handleChangeFilter="handleChangeFilter" :placeholder="'请输入姓名/工号'" 
		  :dateTip="'受理'"></filterComponent>
		</div>
		<div>
			 <tableComponents :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" 
			@handleXxwt="handleXxwt" @exportTable="exportTable" :indexArr='[2,3]' :widthArr="[]" :Width="'150'" 
			:Height="380" ></tableComponents>
		</div>
	</div>
</template>

<script>
	import tableComponents from "@/components/reportTable/tableComponents.vue";
	import filterComponent from "@/components/reportTable/filterComponent.vue";
	import { getLastMonthDay} from "@/utils/util.js";
	export default {
		data(){
			return {
				dataList:{},
				currentPage:1,
				pageSize:15,
				filterList:["keyword", "bm","rylx","date"],
				filterData: {
				  keyword: "",
				  bm:"",
				  rylx:[],
				  date:[]
				},
			}
		},
		mounted() {
			let month = new Date().getMonth();
			month = month + 1;
			this.filterData.date = ['2019-'+(month<10?('0'+month):month)+'-01',getLastMonthDay('2019',month)]
			this.personalProblemHandleIndicator();
		},
		methods:{
			handleXxwt(data, i, params){
				this.filterData.date[0] = !this.filterData.date[0]?'':this.filterData.date[0];
				this.filterData.date[1] = !this.filterData.date[1]?'':this.filterData.date[1];
				let arr = params[i].en.split(",");
				let obj = {
				  rywid: data[0],
				  slStarDt:this.filterData.date[0],
				  slEndDt:this.filterData.date[1]
				};	
				if (!!params[i].canRedirect) {
				  if (arr[0] == arr[1] || arr.length == 1) {
				    obj[arr[0]] = data[i];
				  } else {
				    arr.forEach((ele, i, arr) => {
				      if (i == 0) {
				        obj[ele] = arr[1];
				      }
				    });
				  }
				}
				let routeData = this.$router.resolve({
				  path: '/report-list/userphi.html',
				  query: obj
				});
				window.open(routeData.href, "_blank");		  
			},
			handleChangeFilter(data){
				 this.filterData = data;
				 this.currentPage = 1;
				 this.personalProblemHandleIndicator();
			},
			handleCurrentChange(data){
				this.currentPage = data;
				this.personalProblemHandleIndicator(); 
			},
			exportTable(){
				 this.filterData.date = !this.filterData.date?[]:this.filterData.date;
				 this.filterData.date[0] = !this.filterData.date[0]?'':this.filterData.date[0];
				 this.filterData.date[1] = !this.filterData.date[1]?'':this.filterData.date[1];
				 window.open(window.baseurl + 'assessment/exportPersonalProblemHandleIndicator?slStarDt='+
				   this.filterData.date[0]+
				  '&slEndDt='+ this.filterData.date[1] +
				  '&bm='+ this.filterData.bm +
				  '&rylx='+ this.filterData.rylx.join(',') +
				  '&keyword='+ this.filterData.keyword 
				  )
			},
			personalProblemHandleIndicator(){
				 this.filterData.date = !this.filterData.date?[]:this.filterData.date;
				 this.$get(this.API.personalProblemHandleIndicator,{
					 curPage:this.currentPage,
					 pageSize:this.pageSize,
					 slStarDt:!this.filterData.date[0]?'':this.filterData.date[0],
					 slEndDt:!this.filterData.date[1]?'':this.filterData.date[1],
					 bm:this.filterData.bm,
					 rylx:this.filterData.rylx.join(','),
					 keyword:this.filterData.keyword
				 }).then(res=>{
					 if(res.state == 'success'){
						 this.dataList = res.data
					 }else{
						 this.$message({
							 message:res.msg,
							 type:'error'
						 })
					 }
				 })
			 }
		},
		components:{filterComponent,tableComponents}
	}
</script>

<style>
</style>
