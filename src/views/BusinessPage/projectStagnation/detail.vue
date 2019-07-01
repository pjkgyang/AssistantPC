<template>
	<div class="pd-10 projectStagnation">
		<div class="pannelPaddingBg-10">
			<div>
				<h5>流程节点</h5>
				<br />
				<el-steps  finish-status="success" simple>
					<el-step v-for="(lc, index) in lcList" :key="index" :status="lc.zt==1?'process ':lc.zt==2?'success':lc.zt==3?'error':'wait'" :title="lc.lcjdmc + '(' + lc.clrxm + ')'"></el-step>
				</el-steps>
			</div>
			<el-divider></el-divider>
			<div class="mg-12 table_grid">
				<h5 class="mg-12">详情内容</h5>
				<table>
					<tr>
						<th>项目编号</th>
						<td>{{ xmInfo.xmbh }}</td>
						<th>项目名称</th>
						<td>{{ xmInfo.xmmc }}</td>
						<th>学校</th>
						<td>{{ xmInfo.xx }}</td>
					</tr>
					<tr>
						<th>申请人</th>
						<td>{{ xmInfo.fqrxm }}</td>
						<th>申请类别</th>
						<td>{{ xmInfo.mc }}</td>
						<th>停滞截止日期</th>
						<td>{{ xmInfo.tzsj }}</td>
					</tr>
					<tr>
						<th>状态</th>
						<td>{{ xmInfo.zt_display }}</td>
						<th>当前流程</th>
						<td>{{ xmInfo.dqlc }}</td>
						<th>当前流程状态</th>
						<td>{{ xmInfo.dqlczt_display }}</td>
					</tr>
					<tr>
						<th>客户经理</th>
						<td>{{ xmInfo.khjl }}</td>
						<th>项目经理</th>
						<td>{{ xmInfo.xmjl }}</td>
						<th>甲方责任人</th>
						<td>{{ xmInfo.jfzrr }}</td>
					</tr>
					<tr>
						<th>合同金额（元）</th>
						<td>{{ xmInfo.htje }}</td>
						<th>项目类别</th>
						<td>{{ xmInfo.xmlb }}</td>
						<th>合同编号</th>
						<td>{{ xmInfo.htbh }}</td>
					</tr>
					<tr>
						<th>整体状态</th>
						<td>{{ xmInfo.xmztzt }}</td>
						<th>合同性质</th>
						<td>{{ xmInfo.htxz }}</td>
					</tr>
				</table>
			</div>
			<div class="file_list">
				<p class="mg-12 filter-weight">附件列表</p>
				<p v-if="!!xmInfo.files">
					<a v-for="file in xmInfo.files" :href="API.downloadFile + '?fjId=' + file.fjbh" target="_blank">{{ file.fjmc }}</a>
				</p>
				<p v-else text-center>暂无附件</p>
			</div>
			<div class="file_list">
				<p class="mg-12 filter-weight">{{xmInfo.lx==1?'停滞详情:':'重启详情:'}}</p>
				<div v-html="xmInfo.sm"></div>
			</div>
			<el-divider></el-divider>
			<div>
				<h5 class="mg-12">流程日志</h5>
				<div class="block pd-10">
					<div class="radio" colcenter>
						<span class="filter-weight">排序：</span>
						<el-radio-group v-model="reverse">
							<el-radio :label="false">正序</el-radio>
							<el-radio :label="true">倒序</el-radio>
						</el-radio-group>
					</div>
					<el-timeline v-if="!!activities.length" :reverse="reverse">
						<el-timeline-item v-for="(activity, index) in activities" :key="index" type="primary" :timestamp="activity.cjsj" placement="top">
							<el-card>
								<div colcenter>
									<h6>{{ activity.czmc }}</h6>
									&#x3000;
									<div v-show="(xmInfo.canOper == 1 || xmInfo.canRestart == 1) && index == activities.length - 1">
										<el-button type="primary" size="mini" v-show="xmInfo.canOper == 1 " @click="handleApproval('pass')">审批通过</el-button>
										<el-button type="danger" size="mini" v-show="xmInfo.canOper == 1" @click="handleApproval('reject')">审批不通过</el-button>
										<el-button type="primary" size="mini" v-show="xmInfo.canRestart == 1 && xmInfo.lx == 1" @click="handleApply('tz'.xmInfo)">
											重启项目停滞
										</el-button>
										<el-button type="primary" size="mini" v-show="xmInfo.canRestart == 1 && xmInfo.lx == 2" @click="handleApply('cq', xmInfo)">
											重启项目重启
										</el-button>
									</div>
								</div>
								<br />
								<div v-html="activity.cznr"></div>
							</el-card>
						</el-timeline-item>
					</el-timeline>
					<p v-if="!activities.length" text-center>暂无内容</p>
				</div>
			</div>
		</div>

		<tzDialog :show.sync="show" :type="type" @handleCommit="handleCommitTzOrCq" :xmData="xmInfo"></tzDialog>
		<smDialog :show.sync="smShow" @handleClickSure="handleCommitSm"></smDialog>
	</div>
</template>

<script>
	import tzDialog from '@/components/dialog/xmtz/tz-dialog.vue';
	import smDialog from '@/components/dialog/smDialog.vue';
export default {
	data() {
		return {
			show: false,
			smShow: false,
			reverse: false, //倒叙 正序
			activities: [],
			lcList: [],
			xmInfo: {},
			type: '', //类型
		};
	},
	mounted() {
		this.getProjectStopVO();
		this.listWorkFlowNodes();
		this.logs();
	},
	methods: {
		// 申请停滞获取重启
		handleCommitTzOrCq(data) {
			let formdata = {};
			let url = '';
			if (this.type == 'tz') {
				formdata.xmbh = data.xmbh;
				formdata.tzsj = data.tzrq;
				formdata.fjData = data.fjData;
				formdata.sm = data.sm;
			} else {
				formdata.xmbh = data.xmbh;
				formdata.sm = data.sm;
			}
			// 是否重启
			formdata.wid = this.$route.query.wid;
			if (this.type == 'tz') {
				url = this.API.restartProjectStopProgress;
			} else {
				url = this.API.restartProjectRestartProgress;
			}
			this.$post(url, formdata).then(res => {
				if (res.state == 'success') {
					this.$message({
						message: '提交成功',
						type: 'success'
					});
					this.show = false;
					this.getProjectStopVO();
					this.listWorkFlowNodes();
					this.logs();
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		},

		// 审批通过，不通过，进度
		handleApproval( type) {
		   if (type == 'pass') {
				this.$confirm('是否确定审批通过?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.agreeOrreject('pass');
					})
					.catch(() => {});
			} else {
				this.smShow = true;
			}
		},
		// 说明（审批不通过）
		handleCommitSm(sm) {
			this.agreeOrreject('reject', sm);
		},
		// 停滞，重启
		handleApply(data, params) {
			this.type = data;
			this.show = true;
		},
		// 审批通过、不通过
		agreeOrreject(type, sm) {
			this.$post(type == 'pass' ? this.API.agree : this.API.reject, {
				wid: this.$route.query.wid,
				lcwid: this.xmInfo.dqlcwid,
				sm: sm
			}).then(res => {
				if (res.state == 'success') {
					this.$message({
						message: '审批结果已提交',
						type: 'success'
					});
					if (type != 'pass') {
						this.smShow = false;
					}
					this.getProjectStopVO();
					this.listWorkFlowNodes();
					this.logs();
				}else{
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		},

		// 获取项目停滞重启详情
		getProjectStopVO() {
			this.$get(this.API.getProjectStopVO, {
				wid: this.$route.query.wid
			}).then(res => {
				if (res.state == 'success') {
					this.xmInfo = res.data;
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		},
		// 获取流程节点
		listWorkFlowNodes() {
			this.$get(this.API.listWorkFlowNodes, {
				wid: this.$route.query.wid
			}).then(res => {
				if (res.state == 'success') {
					this.lcList = res.data;
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		},
		// 流程日志列表
		logs() {
			this.$get(this.API.logs, {
				wid: this.$route.query.wid
			}).then(res => {
				if (res.state == 'success') {
					this.activities = !res.data ? [] : res.data;
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		}
	},
	components: {tzDialog,smDialog}
};
</script>

<style scoped lang="scss">
.projectStagnation h5 {
	font-weight: 700;
	border-left: 5px solid darkorchid;
	padding-left: 5px;
}
.block h6 {
	font-weight: 700;
	color: #a16bfe;
	font-size: 14px;
}
.radio label {
	padding-left: 0px;
}

.file_list {
	a {
		margin-right: 25px;
	}
}
</style>
