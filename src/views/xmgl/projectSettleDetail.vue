<template>
	<div>
		<div class="jsdetail_container">
			<div class="fb_info">
				<div>
					<h4>项目结算详情</h4>
					<div text-right><el-button size="small" type="danger">保存</el-button></div>
					<div>
						<h5>历史结算信息</h5>
						<table>
							<tr>
								<th>分包结算次数</th>
								<td>{{ htjbxx.htje }}</td>
								<th>中标总金额（元）</th>
								<td>{{ htjbxx.htje }}</td>
								<th>已结算金额（元）</th>
								<td>{{ htjbxx.htje }}</td>
							</tr>
							<tr>
								<th>剩余结算金额（元）</th>
								<td>{{ htjbxx.htje }}</td>
								<th>团队结算金额（元）</th>
								<td>{{ htjbxx.htje }}</td>
								<th>团队剩余金额（元）</th>
								<td>{{ htjbxx.htje }}</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>结算申请信息</h5>
						<table>
							<tr>
								<th>项目名称</th>
								<td colspan="5"></td>
							</tr>
							<tr>
								<th>分包名称</th>
								<td colspan="5"></td>
							</tr>
							<tr>
								<th>中标人</th>
								<td>1</td>
								<th>申请人</th>
								<td>1</td>
								<th>申请时间</th>
								<td>1</td>
							</tr>
							<tr>
								<th>实际开始日期</th>
								<td>1</td>
								<th>实际结束日期</th>
								<td>1</td>
								<th>结算点</th>
								<td>1</td>
							</tr>
							<tr>
								<th>申请说明</th>
								<td colspan="5" height="80px">1</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>本次结算信息</h5>
						<table>
							<tr>
								<th>本次结算总金额（元）</th>
								<td colspan="5"></td>
							</tr>
							<tr>
								<th>中标实施费用（元）</th>
								<td>1</td>
								<th>中标二开费用（元）</th>
								<td>1</td>
								<th>中标可变费用（元）</th>
								<td>1</td>
							</tr>
							<tr>
								<th>已结算实施费用（元）</th>
								<td>1</td>
								<th>已结算二开费用（元）</th>
								<td>1</td>
								<th>已结算可变费用（元）</th>
								<td>1</td>
							</tr>
							<tr>
								<th>预留实施费用（元）</th>
								<td><input style="width: 100%;" value="0" type="number" /></td>
								<th>预留二开费用（元）</th>
								<td><input style="width: 100%;" value="0" type="number" /></td>
								<th>预留可变费用（元）</th>
								<td><input style="width: 100%;" value="0" type="number" /></td>
							</tr>
							<tr>
								<th>实施调用费用（元）</th>
								<td>1</td>
								<th>二开调用费用（元）</th>
								<td>1</td>
								<th>可变报销费用（元）</th>
								<td>1</td>
							</tr>
							<tr>
								<th>本次结算实施费用（元）</th>
								<td style="text-align: right;"><i title="设置费用" class="el-icon-edit-outline" @click="handleSettleMoney('ss')"></i></td>
								<th>本次结算二开费用（元）</th>
								<td style="text-align: right;"><i title="设置费用" class="el-icon-edit-outline" @click="handleSettleMoney('ek')"></i></td>
								<th>本次结算可变费用（元）</th>
								<td style="text-align: right;"><i title="设置费用" class="el-icon-edit-outline" @click="handleSettleMoney('kb')"></i></td>
							</tr>
							<tr>
								<th>预留说明</th>
								<td colspan="5">1</td>
							</tr>
							<tr>
								<th>奖励金额（元）</th>
								<td>1</td>
								<th>惩罚金额（元）</th>
								<td colspan="3">1</td>
							</tr>
							<tr>
								<th>奖惩说明</th>
								<td colspan="5">1</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>本次团队结算信息</h5>
						<p style="color:#f00;font-size: 12px;">
							个人结算二开费用=结算二开费用 * 5400 / 8800 个人结算可变费用= 结算可变费用 * 70%;
							<br />
							结算总金额包含团队结算费用; 实际实施费用指二开实施费用；实际二开费用指二开开发费用；实际可变费用指报销费用;
						</p>
						<table class="table_center">
							<tr>
								<th>业务域</th>
								<th>合同内容</th>
								<th>当前进度</th>
								<th>责任人</th>
								<th>中标实施费用(元)</th>
								<th>已结算实施费用(元)</th>
								<th>本次结算实施费用(元)</th>
								<th>中标二开费用(元)</th>
								<th>已结算二开费用(元)</th>
								<th>本次结算二开费用(元)</th>
								<th>中标可变费用(元)</th>
								<th>已结算可变费用(元)</th>
								<th>本次结算可变费用(元)</th>
								<th>本次合计结算</th>
							</tr>
							<tr v-for="(item, index) in testArr">
								<td>1</td>
								<td>2</td>
								<td>3</td>
								<td>4</td>
								<td>5</td>
								<td>6</td>
								<td><input v-model="item.fy1" type="number" style="width: 80px;" @input="handleChangeInput(index)" /></td>
								<td>8</td>
								<td>9</td>
								<td><input v-model="item.fy2" type="number" style="width: 80px;" @input="handleChangeInput(index)" /></td>
								<td>11</td>
								<td>12</td>
								<td><input v-model="item.fy3" type="number" style="width: 80px;" @input="handleChangeInput(index)" /></td>
								<td>{{ Number(item.fy1) + Number(item.fy2) + Number(item.fy3) }}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>

		<el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
			<div class="pd-10">
				<div>
					<span class="filter-weight">承担人：</span>
					<el-radio-group v-model="cdradio">
						<el-radio :label="1">区域承担</el-radio>
						<el-radio :label="2">分包承担</el-radio>
					</el-radio-group>
					&#x3000;
					<el-button type="primary" size="mini">批量设置</el-button>
				</div>
				<p style="color: #f00;margin:10px 0 !important; ">总金额：3000元，区域承担：1000元，分包扣除：2000元</p>
				<el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="name" label="承担人" width="100"></el-table-column>
					<el-table-column prop="date" label="单据编号" width="180"></el-table-column>
					<el-table-column prop="name" label="开发性质" width="100"></el-table-column>
					<el-table-column prop="name" label="服务类型"></el-table-column>
					<el-table-column prop="name" label="状态" width="100"></el-table-column>
					<el-table-column prop="name" label="业务线" min-width="150"></el-table-column>
					<el-table-column prop="name" label="金额" width="100"></el-table-column>
					<el-table-column prop="name" label="需求方" width="100"></el-table-column>
					<el-table-column prop="name" label="招标截止日期"></el-table-column>
					<el-table-column prop="name" label="交付日期"></el-table-column>
					<el-table-column prop="name" label="中标人" width="100"></el-table-column>
					<el-table-column prop="name" label="中标时间"></el-table-column>
				</el-table>
				<div slot="footer" text-right>
					<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
					<el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dialogVisible: false,
			title:'',
			cdradio: 1, //承担
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			  }, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1517 弄'
			  }, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1519 弄'
			  }, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1516 弄'
			  }],
			  multipleSelection: [],
		 	htjbxx: {},
			fbxxInfo: {
				fbmc: '哈哈哈哈哈',
				fbrq: '2019-08-06'
			}, //分包信息
			testArr: [
				{
					fy1: 0,
					fy2: 0,
					fy3: 0,
					hj: 0
				},
				{
					fy1: 0,
					fy2: 0,
					fy3: 0,
					hj: 0
				}
			],
			fbcpData: [],
			tbje: null,
			zbxx: ''
		};
	},
	mounted() {},
	methods: {
		handleSelectionChange(){

		},
		// 计算结算费用
		handleSettleMoney(data){
			switch (data){
				case 'ss':
					this.title = '本次结算实施费用'
					break;
				case 'ek':
					this.title = '本次结算二开费用'
					break;
				case 'kb':
					this.title = '本次结算可变费用'
					break;
				default:
					break;
			}
			this.dialogVisible = !this.dialogVisible
		},
		handleChangeInput(index) {
			this.testArr[index].hj = Number(this.testArr[index].fy1) + Number(this.testArr[index].fy2) + Number(this.testArr[index].fy3);
		}
	},
	activated() {},
	components: {}
};
</script>
<style scoped>
.jsdetail_container {
	width: 90%;
	margin: 20px auto;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	padding: 0;
	background: #fff;
	position: relative;
}

.fb_info {
	padding: 15px 20px;
}
.fb_info h5 {
	color: #999;
	font-size: 13px;
	margin: 10px 0 !important;
	font-weight: 700;
}

.fb_info a {
	color: #2196f3;
}

.fb_info table {
	width: 100%;
	border-collapse: collapse;
	border: 1px solid #e9ecf4;
	font-size: 14px;
}
.fb_info table th {
	font-size: 14px;
	text-align: center;
	width: 180px;
	background: #f4f6f9;
	color: #4d4d4d;
}
.fb_info table td,
.fb_info table th {
	text-align: left;
	border: 1px solid #e9ecf4 !important;
	padding: 5px 10px;
}
.fb_info h4 {
	border-left: 5px solid #cd69c9;
	padding: 0 5px;
	font-weight: 700;
	margin-bottom: 10px !important;
}

.table_center tr th,
.table_center tr td {
	text-align: center;
}

.el-icon-edit-outline:hover{
	cursor: pointer;
}
</style>
