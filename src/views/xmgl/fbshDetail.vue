<template>
	<div>
		<div class="fbdetail_container">
			<div class="fb_info">
				<div>
					<div text-right v-if="(fbjbxx.fbzt == '02'||fbjbxx.fbzt == '03'||fbjbxx.fbzt == '04') && !$route.query.r">
						<el-button type="primary" @click="handleVerify('1')">审核通过</el-button>
						<el-button type="danger" @click="handleVerify('0')">审核不通过</el-button>
					</div>
					<div text-right v-if="(fbjbxx.fbzt == '04' || fbjbxx.fbzt == '05') && !$route.query.r">
						<el-tag :type="fbjbxx.fbzt == '04' ? 'danger' : 'success'">{{ fbjbxx.fbzt == '04' ? '审核不通过' : '审核通过' }}</el-tag>
					</div>
					<div>
						<h5>合同基本信息</h5>
						<table>
							<tr>
								<th>项目编号</th>
								<td>{{ htjbxx.xmbh }}</td>
								<th>项目名称</th>
								<td colspan="3">{{ htjbxx.xmmc }}</td>
							</tr>
							<tr>
								<th>合同编号</th>
								<td>{{ htjbxx.htbh }}</td>
								<th>项目类别</th>
								<td>{{ htjbxx.xmlbmc }}</td>
								<th>项目状态</th>
								<td>{{ htjbxx.xmxz }}</td>
							</tr>
							<tr>
								<th>合同金额（元）</th>
								<td>{{ !htjbxx.htje ? 0 : htjbxx.htje }}</td>
								<th>合同毛收入（元）</th>
								<td>{{ !htjbxx.htmsr ? 0 : htjbxx.htmsr }}</td>
								<th>到款率（%）</th>
								<td>{{ !htjbxx.dkl ? 0 : htjbxx.dkl }}</td>
							</tr>
							<tr>
								<th>合同性质</th>
								<td>{{ htjbxx.sfzt == 'A' ? '正式' : htjbxx.sfzt == 'B' ? '内部' : '在谈' }}</td>
								<th>是否购销</th>
								<td>{{ htjbxx.sfgx == '0' ? '否' : '是' }}</td>
								<th>财年</th>
								<td>{{ htjbxx.cn }}</td>
							</tr>
							<tr>
								<th>项目经理</th>
								<td>{{ htjbxx.xmjl }}</td>
								<th>客户经理</th>
								<td>{{ htjbxx.khjl }}</td>
								<th>学校</th>
								<td>{{ htjbxx.xx }}</td>
							</tr>
							<tr>
								<th>甲方</th>
								<td>{{ htjbxx.yh }}</td>
								<th>签署方</th>
								<td>{{ htjbxx.qsfmc }}</td>
								<th>签署日期</th>
								<td>{{ htjbxx.qssj }}</td>
							</tr>
							<tr>
								<th>生效日期</th>
								<td>{{ htjbxx.sxrq }}</td>
								<th>立项日期</th>
								<td>{{ htjbxx.lxrq }}</td>
								<th>启动日期</th>
								<td>{{ htjbxx.qdrq }}</td>
							</tr>
							<tr>
								<th>承诺验收日期</th>
								<td>{{ htjbxx.cnysrq }}</td>
								<th>整体验收报告日期</th>
								<td>{{ htjbxx.ztysbgsj }}</td>
								<th>整体验收结束日期</th>
								<td>{{ htjbxx.ztysjssj }}</td>
							</tr>
							<tr>
								<th>服务开始日期</th>
								<td>{{ htjbxx.fwksrq }}</td>
								<th>服务年限（月）</th>
								<td>{{ htjbxx.fwqx }}</td>
								<th>过保日期</th>
								<td>{{ htjbxx.gbsj }}</td>
							</tr>
							<tr>
								<th>工程区域</th>
								<td>{{ htjbxx.qy }}</td>
								<th>工程战队</th>
								<td>{{ htjbxx.qyzd }}</td>
								<th>是否延长售后</th>
								<td>{{ htjbxx.gcfwzt == 1 ? '是' : '否' }}</td>
							</tr>
							<tr>
								<th>延长截止日期</th>
								<td>{{ htjbxx.ycfwqx }}</td>
								<th>延长说明</th>
								<td colspan="3">{{ htjbxx.gcfwztsm }}</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>合同内容</h5>
						<el-table :data="htnrData" border style="width: 100%" max-height="400">
							<el-table-column prop="ywx" label="业务线" min-width="120"></el-table-column>
							<el-table-column prop="app" label="合同内容" show-overflow-tooltip min-width="150"></el-table-column>
							<el-table-column prop="zb" label="占比(%)" width="80"></el-table-column>
							<el-table-column prop="sm" label="说明" min-width="150" show-overflow-tooltip></el-table-column>
							<el-table-column prop="rjcpmc" label="产品归属" min-width="150"></el-table-column>
							<el-table-column prop="ssry" label="实施人月" width="100"></el-table-column>
							<el-table-column prop="kfry" label="二开人月" width="120"></el-table-column>
							<el-table-column prop="xmlb" label="项目类别" width="120"></el-table-column>
						</el-table>
					</div>
					<div>
						<h5>分包基本信息</h5>
						<table>
							<tr>
								<th>项目编号</th>
								<td>{{ $route.query.xmbh }}</td>
								<th>项目名称</th>
								<td colspan="3">{{ htjbxx.xmmc }}</td>
							</tr>
							<tr>
								<th>分包名称</th>
								<td colspan="5">{{ fbjbxx.fbmc }}</td>
							</tr>
							<tr>
								<th>分包日期</th>
								<td>{{ fbjbxx.fbrq }}</td>
								<th>计划开始日期</th>
								<td>{{ fbjbxx.jhksrq }}</td>
								<th>计划结束日期</th>
								<td>{{ fbjbxx.jhjsrq }}</td>
							</tr>
							<tr>
								<th>实施费用（元）</th>
								<td>{{ fbjbxx.ssfy }}</td>
								<th>二开费用（元）</th>
								<td>{{ fbjbxx.ekfy }}</td>
								<th>可变费用（元）</th>
								<td>{{ fbjbxx.kbfy }}</td>
							</tr>
							<tr>
								<th>实施费用标准（元）</th>
								<td>{{ fbjbxx.ssbz }}</td>
								<th>二开费用标准（元）</th>
								<td>{{ fbjbxx.ekbz }}</td>
								<th></th>
								<td></td>
							</tr>
							<tr height="100px">
								<th rowspan="2">分包说明</th>
								<td colspan="5" rowspan="2">{{ fbjbxx.fbsm }}</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>业务域分包统计</h5>
						<el-table :data="ywyData" border style="width: 100%">
							<el-table-column prop="ywymc" label="业务域" min-width="200"></el-table-column>
							<el-table-column prop="zb" label="占比" width="110"></el-table-column>
							<el-table-column prop="htssry" label="实施人月(合同)" min-width="140"></el-table-column>
							<el-table-column prop="fbssry" label="实施人月(分包)" min-width="140"></el-table-column>
							<el-table-column prop="htekry" label="二开人月(合同)" min-width="140"></el-table-column>
							<el-table-column prop="fbekry" label="二开人月(分包)" min-width="140"></el-table-column>
							<el-table-column prop="ssfy" label="实施费用" min-width="100"></el-table-column>
							<el-table-column prop="erfy" label="二开费用" min-width="100"></el-table-column>
						</el-table>
					</div>
					<div>
						<h5>分包内容</h5>
						<el-table :data="fbData" border style="width: 100%">
							<el-table-column prop="ywymc" label="业务域" min-width="160" show-overflow-tooltip></el-table-column>
							<el-table-column prop="cpmc" label="合同内容" min-width="150" show-overflow-tooltip></el-table-column>
							<el-table-column prop="zb" label="占比(%)" width="90"></el-table-column>
							<el-table-column prop="htsm" label="内容说明" width="150" show-overflow-tooltip></el-table-column>
							<el-table-column prop="xmlb" label="项目类别" width="100"></el-table-column>
							<el-table-column prop="htssry" label="实施人月(合同)" min-width="90"></el-table-column>
							<el-table-column prop="fbssry" label="实施人月(分包)" min-width="90"></el-table-column>
							<el-table-column prop="htekry" label="二开人月(合同)" min-width="90"></el-table-column>
							<el-table-column prop="fbekry" label="二开人月(分包)" min-width="90"></el-table-column>
							<el-table-column prop="ssfy" label="实施费用" min-width="100"></el-table-column>
							<el-table-column prop="erfy" label="二开费用" min-width="100"></el-table-column>
							<el-table-column prop="fbsm" label="说明" min-width="150"></el-table-column>
						</el-table>
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
			fbjbxx: {},
			fbData: [], //分包信息
			ywyData: [],
			ywyTotal: {}, //业务域数据合计
			fbnrlist: [],
			htjbxx: {},
			htnrData: [],
			isSave: false
		};
	},
	mounted() {
		this.queryFbYwxData();
		this.getLxxx();
	},
	methods: {
		handleVerify(params) {
			if (params == '1') {
				this.verifyFb(this.$route.query.fbbh, params);
			} else {
				this.$prompt('请输入说明内容', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '请输入说明内容',
					inputPlaceholder: '请输入说明内容'
				})
					.then(({ value }) => {
						this.verifyFb(this.$route.query.fbbh, params, value);
					})
					.catch(() => {});
			}
		},

		queryFbYwxData() {
			this.$get(this.API.queryFbYwxData, {
				xmbh: this.$route.query.xmbh,
				fbbh: !this.$route.query.fbbh ? '' : this.$route.query.fbbh
			}).then(res => {
				if (res.state == 'success') {
					this.fbjbxx = res.data.fbxx;
					this.ywyData = res.data.fbywy;
					this.fbData = res.data.fbnr;
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		},
		getLxxx() {
			this.$get(this.API.queryLxxx, { xmbh: this.$route.query.xmbh }).then(res => {
				if (res.state == 'success') {
					this.htjbxx = res.data.lxxx;
					this.htnrData = !res.data.lxxx_htnr ? [] : res.data.lxxx_htnr;
				}
			});
		},
		// 审核
		verifyFb(fbbh, shjg, sm) {
			this.$get(this.API.verifyFb, {
				fbbh: fbbh,
				shjg: shjg,
				sm: sm || ''
			}).then(res => {
				if (res.state == 'success') {
					this.$message({
						message: shjg == '1' ? '已提交为 "审核通过" ~' : '已提交为 "审核不通过" ~',
						type: 'success'
					});
					this.queryFbYwxData();
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		}
	},
	activated() {},
	components: {}
};
</script>
<style scoped>
.fbdetail_container {
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
	width: 150px;
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
</style>
