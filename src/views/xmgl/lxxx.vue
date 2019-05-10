<template>
	<div>
		<div class="fbdetail_container">
			<div class="fb_info">
				<div>
					<h4>合同内容</h4>
					<div>
						<h6>合同基本信息</h6>
						<table>
							<tr>
								<th>项目编号</th>
								<td>{{ htjbxx.htje }}</td>
								<th>项目名称</th>
								<td colspan="3"></td>
							</tr>
							<tr>
								<th>合同编号</th>
								<td>{{ htjbxx.sxrq }}</td>
								<th>项目类别</th>
								<td>{{ htjbxx.lxrq }}</td>
								<th>项目状态</th>
								<td>{{ !htjbxx.fwksrq ? '无' : htjbxx.fwksrq }}</td>
							</tr>
							<tr>
								<th>合同金额（元）</th>
								<td>{{ !htjbxx.fwqx ? '无' : htjbxx.fwqx }}</td>
								<th>合同毛收入（元）</th>
								<td>{{ !htjbxx.khjl ? '无' : htjbxx.khjl }}</td>
								<th>到款率（%）</th>
								<td>{{ !htjbxx.xmjl ? '无' : htjbxx.xmjl }}</td>
							</tr>
							<tr>
								<th>合同性质</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>是否购销</th>
								<td>{{ htjbxx.xmlb }}</td>
								<th>财年</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr>
								<th>项目经理</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>客户经理</th>
								<td>{{ htjbxx.xmlb }}</td>
								<th>学校</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr>
								<th>甲方</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>签署方</th>
								<td>金智教育</td>
								<th>签署日期</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr>
								<th>生效日期</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>立项日期</th>
								<td>‘</td>
								<th>启动日期</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr>
								<th>承诺验收日期</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>整体验收报告日期</th>
								<td>‘</td>
								<th>整体验收结束日期</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr>
								<th>服务开始日期</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>服务年限</th>
								<td>‘</td>
								<th>过保日期</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr>
								<th>工程区域</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>工程战队</th>
								<td>‘</td>
								<th>是否延长售后</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr>
								<th>延长截止日期</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>延长说明</th>
								<td colspan="3">‘</td>
							</tr>
						</table>
					</div>
					<div>
						<h6>合同内容</h6>
						<el-table :data="htnrData" border style="width: 100%" max-height="400">
							<el-table-column prop="ywx" label="业务线" min-width="120"></el-table-column>
							<el-table-column prop="app" label="合同内容" show-overflow-tooltip min-width="150"></el-table-column>
							<el-table-column prop="zb" label="占比(%)" width="80"></el-table-column>
							<el-table-column prop="sm" label="说明" min-width="150" show-overflow-tooltip></el-table-column>
							<el-table-column prop="rjcpmc" label="产品归属" min-width="150"></el-table-column>
							<el-table-column prop="ssry" label="实施人月" width="100"></el-table-column>
							<el-table-column prop="kfry" label="二开人月" width="120"></el-table-column>
							<el-table-column prop="kfry" label="项目类别" width="120"></el-table-column>
						</el-table>
					</div>
				</div>

				<div v-if="!!$route.query.v">
					<div>
						<h6>分包基本信息</h6>
						<table>
							<tr>
								<th>项目编号</th>
								<td>1</td>
								<th>项目名称</th>
								<td colspan="3"></td>
							</tr>
							<tr>
								<th>分包名称</th>
								<td colspan="5">1</td>
							</tr>
							<tr>
								<th>分包日期</th>
								<td>1</td>
								<th>计划开始日期</th>
								<td>1</td>
								<th>计划结束日期</th>
								<td>1</td>
							</tr>
							<tr>
								<th>实施费用（元）</th>
								<td>1</td>
								<th>二开费用（元）</th>
								<td>1</td>
								<th>可变费用（元）</th>
								<td>1</td>
							</tr>
							<tr>
								<th>实施费用标准（元）</th>
								<td>1</td>
								<th>二开费用标准（元）</th>
								<td>1</td>
								<th></th>
								<td></td>
							</tr>
							<tr height="50px">
								<th rowspan="2">分包说明</th>
								<td colspan="5" rowspan="2">11</td>
							</tr>
						</table>
					</div>

					<div>
						<h6>业务域分包统计</h6>
						<table class="table_center">
							<tr>
								<th>业务域</th>
								<th>占比</th>
								<th>实施人月（合同）</th>
								<th>实施参考标准</th>
								<th>实施人月（分包）</th>
								<th>二开人月（合同）</th>
								<th>二开人月（分包）</th>
							</tr>
							<tr>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
							</tr>
							<tr>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
							</tr>
							<tr>
								<th colspan="2" style="text-align: center;">总计</th>
								<td>1</td>
								<td>2</td>
								<td>3</td>
								<td>4</td>
								<td>5</td>
							</tr>
						</table>
					</div>

					<div>
						<h6>分包内容</h6>
						<table class="table_center">
							<tr>
								<th>业务域</th>
								<th>合同内容</th>
								<th>占比</th>
								<th>说明</th>
								<th>项目类别</th>
								<th>实施人月（合同）</th>
								<th>实施参考（标准）</th>
								<th>实施人月（分包）</th>
								<th>二开人月（合同）</th>
								<th>二开人月（分包）</th>
							</tr>
							<tr>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
							</tr>
							<tr>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
							</tr>
							<tr>
								<th colspan="5" style="text-align: center;">总计</th>
								<td>1</td>
								<td>2</td>
								<td>3</td>
								<td>4</td>
								<td>5</td>
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
			htjbxx: {},
			htnrData: []
		};
	},
	mounted() {},
	methods: {},
	activated() {},
	components: {}
};
</script>
<style scoped>
.fbdetail_container {
	min-width: 1200px;
	max-width: 80%;
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
.fb_info h6 {
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
	border: 1px solid #c9ece7;
	font-size: 14px;
}
.fb_info table th {
	font-size: 14px;
	text-align: center;
	width: 150px;
	background: #eee;
	color: #4d4d4d;
}
.fb_info table td,
.fb_info table th {
	text-align: left;
	border: 1px solid #ccc !important;
	padding: 5px 10px;
}
.fb_info h4 {
	border-left: 5px solid #cd69c9;
	padding: 0 5px;
	font-weight: 700;
	margin-bottom: 10px !important;
}

.fb_info h6 {
	margin: 10px 0;
}

.table_center tr th,
.table_center tr td {
	text-align: center;
}
</style>
