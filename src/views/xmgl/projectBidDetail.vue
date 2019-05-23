<template>
	<div class="project_fbsh">
		<div text-center>
			<h4>项目中标详情</h4>
		</div>
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column fixed="left" label="操作" width="120">
				<template slot-scope="scope">
					<el-button v-if="scope.row.sfswzb == '1'" @click="handleClick(scope.row,'swzb')" type="text" size="small">设为中标</el-button>
					<el-button @click="handleClick(scope.row,'xq')" type="text" size="small">详情</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="sfzb" label="是否中标" width="120"></el-table-column>
			<el-table-column prop="fbmc" label="分包名称" min-width="240"></el-table-column>
			<el-table-column prop="tbrxm" label="投标人" width="110"></el-table-column>
			<el-table-column prop="tbrq" label="投标时间" min-width="130"></el-table-column>
			<el-table-column prop="tbssfy" label="投标实施金额" min-width="110"></el-table-column>
			<el-table-column prop="tbekfy" label="投标二开金额" min-width="110"></el-table-column>
			<el-table-column prop="tbkbfy" label="投标可变金额" min-width="110"></el-table-column>
		</el-table>
		<div text-right>
			<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[20, 50, 70, 100]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="records"
			></el-pagination>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				tableData:[],
				currentPage:1,
				pageSize:20,
				records:0
			}
		},
		mounted(){
			this.tbManage();
		},
		methods: {
			handleClick(data,type) {
				if(type == 'swzb'){
					this.$confirm('是否确认设为中标?', '提示', {
					  cancelButtonText: '再想想',
					  confirmButtonText: '确定',
					  type: 'warning'
					}).then(() => {
						this.$post(this.API.setBid,{
							fbbh:this.$route.query.fbbh,
							tbbh:data.tbbh
						}).then(res=>{
							if(res.state == 'success'){
								this.$message({message:'已设为中标',type:'success'});
								this.tbManage();
							}else{
								this.$message({message:res.msg,type:'warning'})
							}
						})
					}).catch(() => {});
				}else{
					let routeData = this.$router.resolve({
						path: '/biddetail',
						query: {
							fbbh:data.fbbh,
							tbbh:data.tbbh
						}
					});
					window.open(routeData.href, '_blank');
				}
			},
			handleCurrentChange(data){
				this.currentPage = data;
				this.tbManage();
			},
			handleSizeChange(data){
				this.currentPage = 1;
				this.pageSize = data;
				this.tbManage();
			},
			tbManage(){
				this.$get(this.API.tbManage,{
					curPage:this.currentPage,
					pageSize:this.pageSize,
					fbbh:this.$route.query.fbbh
				}).then(res=>{
					if(res.state == 'success'){
						if(!!res.data.rows){
							this.tableData = res.data.rows
						}else{
						this.tableData  = [];
					}
						this.records = res.data.records;
					}
				})
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
