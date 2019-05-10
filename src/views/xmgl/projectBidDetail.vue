<template>
	<div class="project_fbsh">
		<div text-center>
			<h4>项目中标详情</h4>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed="left" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click="handleClick(scope.row)" type="text" size="small">设为中标</el-button>
					<el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="是否中标" width="120"></el-table-column>
			<el-table-column prop="name" label="分包名称" min-width="240"></el-table-column>
			<el-table-column prop="name" label="投标人" width="110"></el-table-column>
			<el-table-column prop="name" label="投标时间" min-width="130"></el-table-column>
			<el-table-column prop="name" label="投标实施金额" min-width="110"></el-table-column>
			<el-table-column prop="name" label="投标二开金额" min-width="110"></el-table-column>
			<el-table-column prop="name" label="投标可变金额" min-width="110"></el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[
					{
						name:'hhh'
					}
				]	
			}
		},
		methods: {
			handleClick() {
				
			}
		},
	}
</script>

<style scoped lang="scss">
	.project_fbsh {
		margin: 20px;
		padding: 15px;
		background: #ffffff;
		border-radius: 4px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		h4{
			margin: 10px 0 !important;
			font-weight: 700;
		}
	}
</style>
