<template>
	<div class="pannelPadding-10">
		<div class="pannelPaddingBg-10">
			<div>
				<div>
					<span class="query-title" >建设年份:</span>
					从 <el-input size="mini" v-model="qsnf" placeholder="请输入年份" style="width:150px"></el-input> 
					到 <el-input size="mini" v-model="jsnf" placeholder="请输入年份" style="width:150px"></el-input>
					
					<el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
				</div>
			</div>
			<div class="pd-10">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="date" label="日期" width="180"></el-table-column>
					<el-table-column prop="name" label="姓名" width="180"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			qsnf:'',
			jsnf:'',
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			]
		};
	},
	methods: {
		handleSearch() {},
		handleExport() {}
	}
};
</script>

<style></style>
