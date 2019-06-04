<template>
	<div class="pd-10">
		<div class="bgfff">
			<h4>
				{{ $route.params.id == 'ydjlwtxq' || queryMark == 1 ? '月度奖励' : $route.params.id == 'shgs' ? '售后工时' : '月度考核' }}报表 -{{
					$route.params.id.includes('ts')
						? '投诉详情'
						: $route.params.id.includes('wt')
						? '问题详情'
						: $route.params.id.includes('lcbxq')
						? '里程碑详情'
						: $route.params.id.includes('shgs')
						? '售后工时详情'
						: $route.params.id.includes('ydjlwtxq')
						? '问题详情'
						: '详情'
				}}
			</h4>
			<div v-if="$route.params.id.includes('shgs')">
				<div flex>
					<p class="query-title">高级查询:</p>
					<p>
						<el-input v-model="keyword" style="width:493px;" size="mini" placeholder="请输入问题标题/问题编号/发布人" @change="handleSearch"></el-input>
						&#x3000;
						<el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
					</p>
				</div>
				<!-- 结算状态 -->
				<div flex>
					<p class="query-title">结算状态:</p>
					<p class="query-list">
						<span :class="{ 'bg-active': jszts == '' }" @click="handleFilterJSZT('')">全部</span>
						<span v-for="jszt in jsztMenu" :class="{ 'bg-active': jszts == jszt.label }" :key="jszt.id" @click="handleFilterJSZT(jszt.label)">{{ jszt.mc }}</span>
					</p>
				</div>
			</div>
			<div text-right><el-button size="mini" type="primary" @click="handleExport">导出</el-button></div>
			<reportTable
				:type="$route.params.id"
				:tableData="dataList"
				:pageShow="true"
				:currentPage="currentPage"
				:pageSize="pageSize"
				@handleCurrentChange="handleCurrentChange"
				:exportShow="false"
				:indexArr="[]"
				:widthArr="$route.params.id == 'shgs' ? [3] : $route.params.id == 'wt' || $route.params.id == 'ydjlwtxq'? [1,4]:$route.params.id == 'ts'?[1,3] : [2, 6]"
				:rowWidth="$route.params.id == 'shgs' ? '300' : '300'"
				:Width="'140'"
				:Height="$route.params.id == 'shgs' ? 240 : 180"
				@handleXxwt="handleXxwt"
			></reportTable>
		</div>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="500px">
			<div class="jszt-dialog">
				<h4>请选择结算标志:</h4>
				<el-radio-group v-model="jsztRadio">
					<el-radio v-for="(zt, index) in jsztMenu" :key="index" :label="zt.label">{{ zt.mc }}</el-radio>
				</el-radio-group>
				<div v-if="jsztRadio != '0'">
					<h4 class="before-require" >结算说明:</h4>
					<el-input type="textarea" :rows="2" placeholder="请输入结算说明" v-model="jssm"></el-input>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="handleCommit">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import reportTable from '@/components/reportTable/tableComponents.vue';
import { getMenu, getSession, getPreMonth } from '@/utils/util.js';
export default {
	data() {
		return {
			currentPage: 1,
			pageSize: 25,
			dataList: {},
			queryData: {},
			routePath: '',
			queryMark: '',

			dialogVisible: false,
			jsztMenu: [],
			jsztRadio: '0', //结算状态单选
			jssm: '',
			jszts: '',
			wid: '',
			rygh: '',
			keyword: ''
		};
	},
	methods: {
		handleExport() {
			let url = '';
			let param = '';
			// 考核报表详情
			if (this.$route.params.id == 'lcbxq') {
				// 里程碑(奖励，考核)
				url = 'assessment/exportYdkhlcbxqb.do';
				param = window.location.hash.split('?')[1];
				if (param.indexOf('&ydjl=1') != -1) {
					param = param.replace('&ydjl=1', '');
				}
			}
			if (this.$route.params.id == 'wt') {
				// 问题
				url = 'assessment/exportYdkhwtxqb.do';
				param = window.location.hash.split('?')[1];
			}
			if (this.$route.params.id == 'ts') {
				// 投诉
				url = 'assessment/exportYdkhtsxqb.do';
				param = 'yf=' + this.queryData.yf + '&rywid=' + this.queryData.rywid;
			}
			// 售后工时详情
			if (this.$route.params.id == 'shgs') {
				//售后工时
				url = 'assessment/exportYdwtshgsxqb.do';
				param = window.location.hash.split('?')[1] + '&jszt=' + this.jszts + '&keyword=' + this.keyword;
			}
			// 月度奖励详情
			if (this.$route.params.id == 'ydjlwtxq') {
				//问题
				url = 'assessment/exportYdjlwtxqb.do';
				param = window.location.hash.split('?')[1];
			}
			window.open(window.baseurl + url + '?' + param);
		},

		// 提交
		handleCommit() {
			if (this.jsztRadio != '0' && !this.jssm) {
				this.$message({ message: '请填写结算说明', type: 'warning' });
				return;
			}
			this.xgjszt();
		},

		handleXxwt(data, i, params) {
			this.wid = data[0];
			this.rygh = data[1];
			if (
				window.location.hash.includes('/khbbdetail/wt') ||
				window.location.hash.includes('/khbbdetail/ydjlwtxq') ||
				window.location.hash.includes('/khbbdetail/ts') ||
				(window.location.hash.includes('/khbbdetail/shgs') && params[i].zh == '问题标题')
			) {
				let routeData = this.$router.resolve({
					path: window.location.hash.includes('/khbbdetail/ts') ? '/complaintDetail' : '/questionDetail',
					query: {
						wid: data[0]
					}
				});
				window.open(routeData.href, '_blank');
				return;
			}
			if (this.$route.params.id == 'shgs') {
				if (params[i].zh == '核准工时') {
					this.$get(this.API.nfxggs, {
						rygh: data[1],
						wid: data[0]
						// yf: this.queryData.yf
					}).then(res => {
						if (res.state == 'success') {
							if (!res.data) {
								this.$alert('对不起，您无权修改工时!如有疑问，请联系管理员;', '提示', { confirmButtonText: '确定', type: 'warning' });
							} else {
								this.$prompt('请输入工时', '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									inputPattern: /^\d+(\.\d+)?$/,
									inputErrorMessage: '工时格式不正确'
								})
									.then(({ value }) => {
										this.$get(this.API.xggs, {
											wid: data[0],
											rygh: data[1],
											gs: value
										}).then(res => {
											if (res.state == 'success') {
												this.$alert('修改成功', '标题名称', {
													confirmButtonText: '确定',
													callback: action => {
														this.ydwtshgsxqb();
													}
												});
											}
										});
									})
									.catch(() => {});
							}
						}
					});
				} else if (params[i].zh == '结算状态') {
					this.$get(this.API.nfxgjszt, {
						wid: data[0],
						rygh: data[1]
					}).then(res => {
						if (res.state == 'success') {
							if (!!res.data) {
								this.dialogVisible = true;
							} else {
								this.$alert('对不起，您无权修改结算状态!如有疑问，请联系管理员;', '提示', { confirmButtonText: '确定', type: 'warning' });
							}
						}
					});
				}
			}
		},
		// 修改结算状态
		xgjszt() {
			this.$get(this.API.xgjszt, {
				yf: this.queryData.yf,
				wid: this.wid,
				rygh: this.rygh,
				jszt: this.jsztRadio,
				jssm: this.jssm
			}).then(res => {
				if (res.state == 'success') {
					// 当选择不结算和后续结算后，自动修改核准工时为0；
					// if(this.jsztRadio != '0'){
					this.ydwtshgsxqb();
					// }
					this.$message({
						showClose: true,
						message: '保存成功~',
						type: 'success'
					});
					this.dialogVisible = false;
				}
			});
		},

		handleCurrentChange(data) {
			this.queryData.curPage = data;
			this.routeGo();
		},
		getTsxqb() {
			this.$get(this.API.ydkhtsxqb, this.queryData).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		},
		getLcbxqb() {
			this.$get(this.API.ydkhlcbxqb, this.queryData).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		},
		getWtxqb() {
			this.$get(this.API.ydkhwtxqb, this.queryData).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		},
		// 月度奖励问题详情
		ydjlwtxqb() {
			this.$get(this.API.ydjlwtxqb, this.queryData).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		},

		// 售后问题详情
		ydwtshgsxqb() {
			this.$get(this.API.ydwtshgsxqb, {
				curPage: this.queryData.curPage,
				pageSize: this.pageSize,
				yf: this.queryData.yf,
				rywid: this.queryData.rywid,
				jszt: this.jszts,
				keyword: this.keyword
			}).then(res => {
				if (res.state == 'success') {
					this.dataList = res.data;
				}
			});
		},

		routeGo() {
			switch (this.$route.params.id) {
				case 'ts':
					this.getTsxqb();
					break;
				case 'wt':
					this.getWtxqb();
					break;
				case 'shgs':
					this.ydwtshgsxqb();
					break;
				case 'lcbxq':
					this.getLcbxqb();
					break;
				case 'ydjlwtxq':
					this.ydjlwtxqb();
					break;
				default:
					break;
			}
		},
		handleSearch() {
			this.ydwtshgsxqb();
		},
		// 查询结算状态
		handleFilterJSZT(data) {
			this.jszts = data;
			this.ydwtshgsxqb();
		}
	},
	mounted() {
		if (!getSession('wtgsjszt')) {
			getMenu('wtgsjszt', this.jsztMenu, true); //获取产品线
		} else {
			this.jsztMenu = getSession('wtgsjszt');
		}
		// this.queryData = JSON.parse(
		//   window.atob(this.$route.params.id.split("&")[1])
		// );
		this.queryData = this.$route.query;
		this.queryData.curPage = 1;
		this.queryData.pageSize = this.pageSize;
		if (this.queryData.ydjl) {
			this.queryMark = this.queryData.ydjl;
			delete this.queryData.ydjl;
		} else {
			this.queryMark = '';
		}
		this.routeGo();
	},
	components: { reportTable }
};
</script>

<style lang="scss" scoped>
.bgfff {
	padding: 10px;
	background: #fff;
	border-radius: 4px;
	h4 {
		margin: 10px 0 !important;
		font-weight: 700;
	}
}
.jszt-dialog {
	padding: 20px;
	h4 {
		font-size: 14px;
		font-weight: 700;
		margin-bottom: 10px !important;
	}
}
</style>
