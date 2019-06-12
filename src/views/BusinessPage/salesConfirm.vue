<template>
	<div class="mg15">
		<div class="pannelPaddingBg-10">
			<div>
				<div class="mg-12">
					<span class="filter-weight  width120">关键字查询：</span>
					<el-input
						v-model="filterData.keyword"
						size="mini"
						placeholder="请输入合同编号/项目编号/项目名称/项目内容/里程碑描述/销售确认人"
						style="width: 586px;"
					></el-input>
					&#x3000;
					<el-button size="mini" type="primary" @click="handleCheck">查询</el-button>
				</div>
				<div class="mg-12">
					<span class="filter-weight  width120">是否确认：</span>
					<el-radio-group v-model="filterData.sfqr" @change="handleChangeSfqr">
						<el-radio :label="1">已确认</el-radio>
						<el-radio :label="0">未确认</el-radio>
					</el-radio-group>
				</div>
			</div>
			<div>
				<div class="mg-12">
					<el-button size="mini" type="primary" :disabled="!widsArr.length" v-show="!filterData.sfqr" @click="handleConfirmOrReject(1)">确认</el-button>
					<el-button size="mini" type="danger" :disabled="!widsArr.length" v-show="!filterData.sfqr" @click="handleConfirmOrReject(0)">打回</el-button>
					<el-button size="mini" type="primary" @click="handleExport">导出</el-button>
				</div>
				<div>
					<el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
						<el-table-column type="selection" width="55"></el-table-column>
						<el-table-column prop="xmbh" label="项目编号" width="120"></el-table-column>
						<el-table-column prop="xmmc" label="项目名称" min-width="240" show-overflow-tooltip></el-table-column>
						<el-table-column prop="xmnr" label="项目内容" min-width="200" show-overflow-tooltip></el-table-column>
						<el-table-column prop="qzsj" label="签字时间" width="140"></el-table-column>
						<el-table-column prop="shjhkssj" label="售后计划开始时间" width="140"></el-table-column>
						<el-table-column prop="zt" label="状态" width="100">
							<template slot-scope="scope">
								<el-tag size="mini" :type="scope.row.zt==3?'success':scope.row.zt==5?'danger':''">{{scope.row.zt==3?'已完成':scope.row.zt==5?'关闭':'完成待确认'}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column prop="htje" label="合同金额(元)" width="120"></el-table-column>
						<el-table-column prop="htmsr" label="合同毛收入(元)" width="120"></el-table-column>
						<el-table-column prop="czsj" label="操作时间" width="160"></el-table-column>
						<el-table-column prop="tjr" label="提交人" width="100"></el-table-column>
						<el-table-column prop="sjjssj" label="实际结束时间" width="140"></el-table-column>
					</el-table>
					<el-pagination
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[15, 30, 50, 100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="total"
					></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentPage: 1,
			pageSize: 15,
			total: 0,
			tableData: [],
			widsArr:[],
			showAlert:false,
			filterData: {
				keyword: '',
				sfqr: 1
			}
		};
	},
	mounted() {
		this.querySaleConfirmMilestone();
		
	},
	methods: {
		// 确认or打回
		handleConfirmOrReject(data){
			if(!!this.showAlert){
				this.$alert('状态非 “完成待确认” 的不能确认或打回~', '提示', {
				  confirmButtonText: '确定',
				  type:'warning'
				});
				return;
			}
			this.$confirm('您确定要'+(!!data?'确认':'打回')+'里程碑吗?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
			  this.$post(this.API.saleConfirmMilestone,{
			  	wids:this.widsArr.join(','),
			  	isConfirm:data
			  }).then(res=>{
			  	this.$message({
				  message: '提交成功~',
				  type: 'success'
				});
				this.currentPage = 1;
				this.querySaleConfirmMilestone();
			  })
			}).catch(() => {});
		},
		// 导出
		handleExport(){
			window.open(window.baseurl+
			'milestone/exportSaleConfirmMilestone.do?keyword='+this.filterData.keyword+
			'&sfqr='+this.filterData.sfqr)	
		},
		// 查询确认里程碑 列表
		handleCheck() {
			this.currentPage = 1;
			this.querySaleConfirmMilestone();
		},
		// 获取每页 条数
		handleSizeChange(data) {
			this.currentPage = data;
			this.querySaleConfirmMilestone();
		},
		// 分页
		handleCurrentChange(data) {
			this.currentPage = 1;
			this.pageSize = data;
			this.querySaleConfirmMilestone();
		},
		// 是否确认 筛选
		handleChangeSfqr() {
			this.currentPage = 1;
			this.querySaleConfirmMilestone();
		},
		// 复选里程碑
		handleSelectionChange(val){
			this.widsArr = [];
			val.forEach(ele=>{
				this.widsArr.push(ele.wid);
				if(ele.zt != 9 ){
					this.showAlert = true;
				}
			})
		},
		// 查询里程碑列表
		querySaleConfirmMilestone() {
			this.$get(this.API.querySaleConfirmMilestone, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				sfqr: this.filterData.sfqr,
				keyword: this.filterData.keyword
			}).then(res => {
				if (res.state == 'success') {
					if(!!res.data.rows){
					  this.tableData = res.data.rows
					}else{
					  this.tableData = [];	
					}
					this.total = res.data.records;
				} else {}
			});
		}
	}
};
</script>

<style>
	
</style>
