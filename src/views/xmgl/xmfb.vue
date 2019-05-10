<template>
	<div>
		<div class="fbdetail_container">
			<div class="fb_info">
				<div>
					<h4>合同内容</h4>
					<div>
						<h5>分包基本信息</h5>
						<div text-right>
							<el-button size="small" style="margin: 10px 0;" type="danger">保存</el-button>
						</div>
						<table>
							<tr>
								<th>项目编号</th>
								<td>{{ htjbxx.htje }}</td>
								<th>项目名称</th>
								<td colspan="3"></td>
							</tr>
							<tr>
								<th>分包名称</th>
								<td colspan="5">
							  	   <input v-model="fbxxInfo.fbmc" style="width: 100%;"></input>
								</td>
							</tr>
							<tr>
								<th>分包日期</th>
								<td>
									<el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="fbxxInfo.fbrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker>
								</td>
								<th>计划开始日期</th>
								<td><el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="fbxxInfo.fbrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker></td>
								<th>计划结束日期</th>
								<td><el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="fbxxInfo.fbrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker></td>
							</tr>
							<tr>
								<th >实施费用（元）</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>二开费用（元）</th>
								<td>{{ htjbxx.xmlb }}</td>
								<th>可变费用（元）</th>
								<td>{{ htjbxx.xmlb }}</td>
							</tr>
							<tr >
								<th>实施费用标准（元）</th>
								<td>{{ htjbxx.xmxz }}</td>
								<th>二开费用标准（元）</th>
								<td>{{ htjbxx.xmlb }}</td>
								<th></th>
								<td></td>
							</tr>
							<tr height="100px">
								<th rowspan="2">分包说明</th>
								<td colspan="5" rowspan="2">
								    <textarea style="width:100%;padding:4px 8px;resize: none;" rows="4" ></textarea>
								</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>合同内容</h5>
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
						<h5>分包内容</h5>
						<div text-right>
							<el-button size="mini" style="margin: 10px 0;" type="primary">计算</el-button>
						</div>
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
								<td><input type="text"></td>
								<td>只读</td>
								<td><input type="text"></td>
							</tr>
							<tr>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td>只读</td>
								<td><input type="text"></td>
								<td>只读</td>
								<td><input type="text"></td>
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
			htjbxx:{},
			fbxxInfo:{
			   fbmc:'哈哈哈哈哈',
			   fbrq:'2019-08-06'
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

.table_center tr th,.table_center tr td{
	text-align: center;
}
</style>
