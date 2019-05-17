<template>
	<div>
		<div class="jsdetail_container">
			<div class="fb_info">
				<div>
					<h4>项目结算审核</h4>
					<div text-right>
						<el-button size="small"  type="primary">审核通过</el-button>
						<el-button size="small"  type="danger">审核不通过</el-button>
					</div>
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
								<td>1</td>
								<th>预留二开费用（元）</th>
								<td>1</td>
								<th>预留可变费用（元）</th>
								<td>1</td>
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
								<td>1</td>
								<th>本次结算二开费用（元）</th>
								<td>1</td>
								<th>本次结算可变费用（元）</th>
								<td>1</td>
							</tr>
							<tr>
								<th>预留说明</th>
								<td colspan="5" >1</td>
							</tr>
							<tr>
								<th>奖励金额（元）</th>
								<td >1</td>
								<th>惩罚金额（元）</th>
								<td colspan="3" >1</td>
							</tr>
							<tr>
								<th>奖惩说明</th>
								<td colspan="5" >1</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>本次团队结算信息</h5>
						<p style="color:#f00;font-size: 12px;">
							个人结算二开费用=结算二开费用 * 5400 / 8800   个人结算可变费用= 结算可变费用 * 70%; <br>
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
							<tr>
								<td></td>
								<td>2</td>
								<td>3</td>
								<td>4</td>
								<td>5</td>
								<td>6</td>
								<td>1</td>
								<td>8</td>
								<td>9</td>
								<td>1</td>
								<td>11</td>
								<td>12</td>
								<td>1</td>
								<td>1</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			htjbxx:{},
			fbxxInfo:{
			   fbmc:'哈哈哈哈哈',
			   fbrq:'2019-08-06',
			},//分包信息
			fbcpData: [],
			tbje: null,
			zbxx: ''
		};
	},
	mounted() {

	},
	methods: {
	
	},
	activated() {
	
	},
	components: {  }
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
	font-weight: 700;;
}

.fb_info a {
	color: #2196f3;
}

.fb_info table {
	width: 100%;
	border-collapse: collapse;
	border: 1px solid #E9ECF4;
	font-size: 14px;
}
.fb_info table th {
	font-size: 14px;
	text-align: center;
	width: 180px;
	background: #F4F6F9;
	color: #4d4d4d;
}
.fb_info table td,
.fb_info table th {
	text-align: left;
	border: 1px solid #E9ECF4 !important;
	padding: 5px 10px;
}
.fb_info h4 {
	border-left: 5px solid #cd69c9;
	padding: 0 5px;
	font-weight: 700;
	margin-bottom: 10px !important;
}

.table_center tr th,.table_center tr td{
	text-align: center;
}
</style>
