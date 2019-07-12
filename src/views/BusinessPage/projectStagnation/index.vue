<template>
	<div class="pd-10">
		<div class="pannelPaddingBg-10">
			<div>
				<div>
					<span class="query-title">高级查询:</span>
					<el-input
						size="mini"
						style="width:463px"
						placeholder="请输入项目编号/项目名称/里程碑描述/项目内容/项目经理/责任人"
						v-model="formdata.keyword"
						@change="handleSearchLcb"
					></el-input>
					&#x3000;
					<el-button size="mini" type="primary" @click="handleSearchLcb">查询</el-button>
				</div>

				<div class="mg-12" flex>
					<p class="query-title">日期:</p>
					<p>
						<el-date-picker
							size="mini"
							v-model="formdata.ksrq"
							type="date"
							placeholder="开始日期"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
						></el-date-picker>
						至
						<el-date-picker
							size="mini"
							v-model="formdata.jsrq"
							type="date"
							placeholder="结束日期"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</p>
				</div>

				<div>
					<p class="query-title">申请类别:</p>
					<el-radio-group v-model="formdata.sqlb" @change="handleChangeSqlb">
						<el-radio :label="0">全部</el-radio>
						<el-radio :label="1">项目停滞</el-radio>
						<el-radio :label="2">项目重启</el-radio>
					</el-radio-group>
				</div>

				<div flex>
					<p class="query-title">状态:</p>
					<p class="query-list">
						<span v-for="(zt, index) in ztList" :key="index" :class="{ 'bg-active': formdata.zt == zt.id }" @click="handleCheckZt(zt.id)">{{ zt.mc }}</span>
					</p>
				</div>
			</div>

			<div class="pd-10">
				<div class="mg-12">
					<el-button size="mini" type="primary" @click="handleApply('tz')">发起项目停滞</el-button>
					<el-button size="mini" type="danger" @click="handleApply('cq')">发起项目重启</el-button>
					<el-button size="mini" type="primary" @click="handleExport">导出</el-button>
				</div>
				<!--  @selection-change="handleSelectionChange" -->
				<el-table :data="tableData" style="width: 100%" border>
					<!-- <el-table-column type="selection" width="55"></el-table-column> -->
					<el-table-column fixed="left" label="操作" width="220">
						<template slot-scope="scope">
							<el-button v-if="scope.row.canRestart == 1 && scope.row.lx==1" type="text" size="small" @click="handleApply('tz', scope.row)">重启项目停滞</el-button>
							<el-button v-if="scope.row.canRestart == 1 && scope.row.lx==2" type="text" size="small" @click="handleApply('cq', scope.row)">重启项目重启</el-button>
							<el-button v-if="scope.row.canOper == 1" @click="handleClick(scope.row, 'pass')" type="text" size="small">审批通过</el-button>
							<el-button v-if="scope.row.canOper == 1" type="text" size="small" @click="handleClick(scope.row, 'reject')">审批不通过</el-button>
							<el-button type="text" size="small" @click="handleClick(scope.row, 'process')">查看进度</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="xmmc" fixed="left" label="项目名称" min-width="300" show-overflow-tooltip></el-table-column>
					<el-table-column prop="xx" label="学校" min-width="260"></el-table-column>
					<el-table-column prop="fqrxm" label="申请人" width="110"></el-table-column>
					<el-table-column prop="tzsj" label="停滞截止日期" width="130"></el-table-column>
					<el-table-column prop="mc" label="申请类别" width="130"></el-table-column>
					<el-table-column prop="zt_display" label="状态" width="110"></el-table-column>
					<el-table-column prop="dqlc" label="当前流程" width="110"></el-table-column>
					<el-table-column prop="dqlczt_display" label="当前流程状态" width="110"></el-table-column>
					<el-table-column prop="xmlb" label="项目类别" width="140"></el-table-column>
					<el-table-column prop="xmztzt" label="整体状态" width="180"></el-table-column>
					<el-table-column prop="khjl" label="客户经理" width="110"></el-table-column>
					<el-table-column prop="xmjl" label="项目经理" width="110"></el-table-column>
					<el-table-column prop="jfzrr" label="甲方责任人" width="110"></el-table-column>
					<el-table-column prop="htje" label="合同金额" width="140"></el-table-column>
					<el-table-column prop="htbh" label="合同编号" width="140"></el-table-column>
					<el-table-column prop="xmbh" label="项目编号" width="140"></el-table-column>
					<el-table-column prop="htxz" label="合同性质" width="120"></el-table-column>
				</el-table>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="total,prev, pager, next, jumper"
					:total="records"
				></el-pagination>
			</div>
		</div>

		<tzDialog :show.sync="show" :type="type" @handleCommit="handleCommitTzOrCq" :xmData="xmData"></tzDialog>
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
			currentPage: 1,
			pageSize: 15,
			records: 0,
			ztList: [{ mc: '全部', id: '' },{ mc: ' 流程中', id: 1 }, { mc: '审批通过', id: 2 }, { mc: '审批不通过', id: 3 }],
			formdata: {
				keyword: '',
				ksrq: '',
				jsrq: '',
				sqlb: 0,
				zt: 1
			},
			type: 'tz', //停滞 重启
			wid: '', //主表wid
			dqwid: '', //当前流程wid
			xmData: {}, //重启 停滞流程 项目信息
			isRestart: false, //是否重新发起
			tableData: [{}]
		};
	},
	mounted() {
		this.pageProjectStopWorkflow();
	},
	methods: {
		handleCurrentChange(data) {
			this.currentPage = data;
			this.pageProjectStopWorkflow();
		},
		// 关键字查询
		handleSearchLcb() {
			this.currentPage = 1;
			this.pageProjectStopWorkflow();
		},
		// 选择 复选
		handleSelectionChange() {},
		
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
			if (!!this.isRestart) {
				formdata.wid = this.wid;
				if (this.type == 'tz') {
					url = this.API.restartProjectStopProgress;
				} else {
					url = this.API.restartProjectRestartProgress;
				}
			} else {
				if (this.type == 'tz') {
					url = this.API.startProjectStopProgress;
				} else {
					url = this.API.startProjectRestartProgress;
				}
			}
			this.$post(url, formdata).then(res => {
				if (res.state == 'success') {
					this.$message({
						message: '提交成功',
						type: 'success'
					});
					this.show = false;
					this.pageProjectStopWorkflow();
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		},

		// 审批通过，不通过，进度
		handleClick(row, type) {
			this.wid = row.wid;
			if (type == 'process') {
				let routeData = this.$router.resolve({
					path: '/projectStagnationDetail',
					query: {
						wid: row.wid
					}
				});
				window.open(routeData.href, '_blank');
			} else if (type == 'pass') {
				this.$confirm('是否确定审批通过?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
					.then(() => {
						this.agreeOrreject('pass', row.dqlcwid);
					})
					.catch(() => {});
			} else {
				this.dqwid = row.dqlcwid;
				this.smShow = true;
			}
		},
		// 说明（审批不通过）
		handleCommitSm(sm) {
			this.agreeOrreject('reject', this.dqwid, sm);
		},
		// 申请类别
		handleChangeSqlb() {
			this.currentPage = 1;
			this.pageProjectStopWorkflow();
		},
		// 查看状态
		handleCheckZt(data) {
			if (this.formdata.zt == data) {
				return;
			}
			this.formdata.zt = data;
			this.currentPage = 1;
			this.pageProjectStopWorkflow();
		},
		// 导出
		handleExport() {
			this.formdata.sqlb = !this.formdata.sqlb ? '': this.formdata.sqlb;
			window.open(
				this.API.exportProjectStopWorkflow + '?fqsjStart=' + this.formdata.ksrq + 
				'&fqsjEnd=' + this.formdata.jsrq + 
				'&lx=' + this.formdata.sqlb + 
				'&zt=' + this.formdata.zt + 
				'&keyword=' + this.formdata.keyword
			);
		},
		// 停滞，重启
		handleApply(data, params) {
			this.type = data;
			if (!!params) {
				this.wid = params.wid; //主键wid
				this.xmData = params;
				this.isRestart = true;
			} else {
				this.xmData = {};
				this.isRestart = false;
			}
			this.show = true;
		},
		agreeOrreject(type, lcwid, sm) {
			this.$post(type == 'pass' ? this.API.agree : this.API.reject, {
				wid: this.wid,
				lcwid: lcwid,
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
					this.pageProjectStopWorkflow();
				}else{
					this.$message({
						message: res.msg,
						type: 'warning'
					});
					this.pageProjectStopWorkflow();
				}
			});
		},

		// 获取页面列表
		pageProjectStopWorkflow() {
			this.$get(this.API.pageProjectStopWorkflow, {
				curPage: this.currentPage,
				pageSize: this.pageSize,
				fqsjStart: this.formdata.ksrq,
				fqsjEnd: this.formdata.jsrq,
				lx: !this.formdata.sqlb ? '' : this.formdata.sqlb,
				zt: this.formdata.zt,
				keyword: this.formdata.keyword
			}).then(res => {
				if (res.state == 'success') {
					this.tableData = !res.data.rows ? [] : res.data.rows;
					this.records = res.data.records;
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		}
	},
	components: {
		tzDialog,
		smDialog
	}
};
</script>

<style></style>
