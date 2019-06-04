<template>
	<div>
		<section class="project_more_table">
			<div>
				<div class="project_more_choose">
					<div>
						<span class="table-menu-name" style="padding:2px 4px;margin-right:10px">高级查询:</span>
						<el-input
							class="search-input"
							placeholder="请输入项目编号/项目名称/合同编号/项目经理/学校"
							prefix-icon="el-icon-search"
							size="small"
							v-model="keyword"
							@change="SearchItem"
						></el-input>
						&#x3000;
						<el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
						<el-button type="primary" size="mini" @click="handleExport">导出</el-button>
					</div>
					<div>
						<p>
							<span class="table-menu-name">项目标签:</span>
							<span :class="{ 'bg-active': xmbqC == '' }" data-xmbq @click="CheckXmbq">全部</span>
							<span v-for="xmbq in xmbqMenu" :data-xmbq="xmbq.id" :class="{ 'bg-active': xmbq.id == xmbqC }" :key="xmbq.id" @click="CheckXmbq">{{ xmbq.mc }}</span>
						</p>
						<div flex>
							<p>
								<span class="table-menu-name">项目状态:</span>
								<span :class="{ 'bg-active': xmztC == '' }" @click="CheckXmzt('')">全部</span>
								<span v-for="xmzt in xmztMenu" :class="{ 'bg-active': xmzt.id == xmztC }" :key="xmzt.id" @click="CheckXmzt(xmzt.id)">{{ xmzt.mc }}</span>
							</p>
							<p>
								<span class="table-menu-name">项目类别:</span>
								<span :class="{ 'bg-active': xmlbC == '' }" data-xmlb @click="CheckXmlb">全部</span>
								<span v-for="xmlb in xmlbMenu" :data-xmlb="xmlb.id" :class="{ 'bg-active': xmlb.id == xmlbC }" :key="xmlb.id" @click="CheckXmlb">
									{{ xmlb.mc }}
								</span>
							</p>
						</div>
						<div flex>
							<p>
								<span class="table-menu-name">是否购销合同:</span>
								<span :class="{ 'bg-active': gxhtC == '' }" data-gxht @click="CheckGxht">全部</span>
								<span v-for="gxht in gxhtMenu" :data-gxht="gxht.id" :class="{ 'bg-active': gxht.id == gxhtC }" :key="gxht.id" @click="CheckGxht">
									{{ gxht.mc }}
								</span>
							</p>
							<p colcenter>
								<span class="table-menu-name">合同性质:</span>
								<el-checkbox-group v-model="htxzList" @change="handleHtxz">
									<el-checkbox label="A">正式</el-checkbox>
									<!-- <el-checkbox label="B">B类</el-checkbox> -->
									<el-checkbox label="C">在谈</el-checkbox>
								</el-checkbox-group>
							</p>
						</div>
						<div flex>
							<p>
								<span class="table-menu-name">是否分包:</span>
								<span v-for="sffb in sffbMenu" :class="{ 'bg-active': sffb.id == sffbc }" :key="sffb.id" @click="CheckSffb(sffb.id)">{{ sffb.mc }}</span>
							</p>
						</div>
						<p v-if="!userGroup.includes('QYZ')">
							<span class="table-menu-name">区域工程:</span>
							<span :class="{ 'bg-active': gczdC == '' }" data-gczd @click="CheckGcdz('')">全部</span>
							<span v-for="gczd in gczdList" :class="{ 'bg-active': gczd.label == gczdC }" :key="gczd.id" @click="CheckGcdz(gczd.label)">{{ gczd.mc }}</span>
						</p>
					</div>
				</div>
				<div class="project-fbtable">
					<el-table :data="allfbData" border style="width:100%" min-width="1000" :max-height="height"> 
						<el-table-column fixed="left" label="操作" width="150">
							<template slot-scope="scope">
								<el-button @click.native.prevent="handleCommand('1', scope.row)" type="text" size="mini">立项信息</el-button>
								<el-button v-if="scope.row.fbgs <= 0 || !scope.row.fbgs" @click.native.prevent="handleCommand('2', scope.row)" type="text" size="mini">
									项目分包
								</el-button>
							</template>
						</el-table-column>
						<el-table-column prop="xmmc" label="项目名称" width="320" fixed="left" show-overflow-tooltip></el-table-column>
						<el-table-column label="分包个数" width="100">
							<template slot-scope="scope">
								<span>{{ !scope.row.fbgs ? 0 : scope.row.fbgs }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="dwmc" label="学校" show-overflow-tooltip width="280"></el-table-column>
						<el-table-column prop="xmlb" label="项目类别" width="100"></el-table-column>
						<el-table-column prop="xmzt" label="项目状态" width="100"></el-table-column>
						<el-table-column prop="ztztmc" label="整体状态" width="100"></el-table-column>
						<el-table-column prop="khjl" label="客户经理" width="100"></el-table-column>
						<el-table-column prop="yfzrrxm" label="项目经理" width="100"></el-table-column>
						<el-table-column prop="jfzrrxm" label="甲方责任人" width="100" show-overflow-tooltip></el-table-column>
						<el-table-column prop="qssj" label="签署日期" width="100"></el-table-column>
						<el-table-column prop="lxrq" label="立项日期" width="100"></el-table-column>
						<el-table-column prop="qdrq" label="启动日期" width="100"></el-table-column>
						<el-table-column prop="yssj" label="整体验收时间" width="120"></el-table-column>
						<el-table-column prop="fwksrq" label="服务开始日期" width="120"></el-table-column>
						<el-table-column prop="fwqx" label="服务期限" width="90"></el-table-column>
						<el-table-column prop="gbsj" label="过保日期" width="120"></el-table-column>
						<el-table-column prop="htje" label="合同金额(元)" width="120"></el-table-column>
						<el-table-column prop="xqwb" label="是否续签" width="100">
							<template slot-scope="scope">
								<span>{{ scope.row.xqwb == 1 ? '是' : '否' }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="htxz" label="合同性质" show-overflow-tooltip width="100"></el-table-column>
						<el-table-column prop="htbh" label="合同编号" show-overflow-tooltip width="150"></el-table-column>
						<el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip width="100"></el-table-column>
						<!-- <el-table-column prop="wglv" label="完工率(%)" width="100"></el-table-column> -->
						<!-- <el-table-column prop="wglg" label="完工量(元)" width="100"></el-table-column> -->
					</el-table>
					<pagination v-if="totalNum > 10" :pageSize="pageSize" :total="totalNum" @handleCurrentChange="handleCurrentChange"></pagination>
				</div>
			</div>
		</section>

		<xmfkDialog :xmData="xmData" :show.sync="xmfkShow" @handleSubmit="handleSubmit"></xmfkDialog>
	</div>
</template>

<script>
import gbtxDialog from '@/components/dialog/xxkbxmlb/gbtxDialog';
import gbtxjlDialog from '@/components/dialog/xxkbxmlb/gbtxjlDialog';
import xmfkDialog from '@/components/dialog/xxkbxmlb/xmfkDialog';

import { exportXmData, changeXbZt, getMyProjects, getProjects } from '@/api/xmkb.js';
import pagination from '@/components/BusinessPage/pagination.vue';
import { getMenu, getSession } from '@/utils/util.js';

export default {
	data() {
		return {
			height:window.innerHeight - 330,
			xmData: {},
			tableHeight: window.innerHeight - 390,
			xmlbMenu: [{ mc: '软件', id: '软件' }, { mc: '集成', id: '集成' }, { mc: '服务', id: '服务' }],
			gxhtMenu: [{ mc: '是', id: '1' }, { mc: '否', id: '0' }],
			xmbqMenu: [
				{ mc: '收藏项目', id: '1' },
				{ mc: '高风险项目', id: '2' },
				{ mc: '我拥有的项目', id: '3' },
				{ mc: '我参与的项目', id: '4' },
				{ mc: '已关闭的项目', id: '5' }
			],
			xmztMenu: [{ mc: '在建', id: '1' }, { mc: '售后', id: '2' }, { mc: '过保', id: '3' }, { mc: '已关闭', id: '4' }],
			sffbMenu: [{ mc: '全部', id: '' }, { mc: '是', id: '1' }, { mc: '否', id: '0' }],
			gczdList: [],
			htxzList: [], //合同性质
			keyword: '',
			xmztC: '',
			xmlbC: '',
			gxhtC: '',
			xmbqC: '',
			gczdC: '',
			sfxqC: '',
			sffbc: '', //是否分包
			allfbData: [],
			curPage: 1,
			pageSize: 15,
			totalNum: null,
			baseUrl: null,
			xmkbkeyword: '',
			isNone: false,
			myItemData: {},
			emptyArray: [],
			urlData: {},
			xmfkShow: false, //项目反馈
			userGroup: '',
			xmbh: '',
			gbrqValue: [], //过保日期Value
			gbksrqValue: '',
			gbjsrqValue: ''
		};
	},
	mounted() {
		if (getSession('gczd') == null) {
			getMenu('gczd', this.gczdList, true); //获取工程战队
		} else {
			this.gczdList = getSession('gczd');
		}

		this.baseUrl = window.baseurl;
		let shown = JSON.parse(sessionStorage.getItem('shown'));
		this.userGroup = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
		this.getProjects(1);
	},
	methods: {
		// 跳转学校看板
		handleRouterXxkb(params) {
			let routeData = this.$router.resolve({
				path: '/xxtsql',
				query: { dwmc: escape(params) }
			});
			window.open(routeData.href, '_blank');
		},
		handleSubmit(params) {
			this.$post(this.API.projectFeedback, {
				xmbh: this.xmData.xmbh,
				sm: params.sm,
				sfxq: params.sfxq
			}).then(res => {
				if (res.state == 'success') {
					this.xmfkShow = false;
					this.getProjects(this.curPage);
					this.$message({
						message: '保存成功~',
						type: 'success'
					});
				}
			});
		},
		// 导出
		handleExport() {
			this.gbksrqValue = !this.gbksrqValue ? '' : this.gbksrqValue;
			this.gbjsrqValue = !this.gbjsrqValue ? '' : this.gbjsrqValue;
			window.open(
				this.baseUrl +
					'project/exportXmData.do?keyword=' +
					this.keyword +
					'&xmzt=' +
					this.xmztC +
					'&xmlb=' +
					this.xmlbC +
					'&sfgx=' +
					this.gxhtC +
					'&projectLabel=' +
					this.xmbqC +
					'&qygc=' +
					this.gczdC +
					'&sffb=' +
					this.sffbc +
					'&htxz=' +
					this.htxzList.join(',')
			);
		},
		// 立项信息 ， 项目分包
		handleCommand(params, data) {
			this.xmbh = data.xmbh;
			if (params == 2) {
				let routeData = this.$router.resolve({
					path: '/projectXmfb',
					query: {
						xmbh: data.xmbh,
						xmmc: data.xmmc
					}
				});
				window.open(routeData.href, '_blank');
				// this.$get(this.API.canProjectSubcontract, { xmbh: data.xmbh }).then(res => {
				// 	if (res.state == 'success') {
				// 		if (!!res.data) {
				// 			let routeData = this.$router.resolve({
				// 				path: '/projectXmfb',
				// 				query: {
				// 					xmbh: data.xmbh,
				// 					xmmc: data.xmmc
				// 				}
				// 			});
				// 			window.open(routeData.href, '_blank');
				// 		} else {
				// 			this.$alert('该项目已分包~', '提示', {
				// 				confirmButtonText: '确定',
				// 				type: 'warning'
				// 			});
				// 		}
				// 	}
				// });
			} else {
				let routeData = this.$router.resolve({
					path: '/projectfbmx',
					query: {
						xmbh: data.xmbh
					}
				});
				window.open(routeData.href, '_blank');
			}
		},
		// 项目反馈
		handleCommandXmfk(data) {
			this.xmData = data;
			this.xmfkShow = true;
		},

		// 跳转到详情（进度）
		handlePage(data) {
			let xbxm = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
			if (event.target.className.includes('el-icon-star')) {
				//添加星标
				changeXbZt({
					xmbh: data.xmbh
				}).then(({ data }) => {
					if (data.state == 'success') {
						this.getMyProjects(1);
					}
				});
			} else {
				data.isAll = false;
				this.$router.push({ name: 'Task', params: { data: data } });
			}
		},
		// 过保日期
		handleChangeDate(val) {
			this.getProjects(1);
		},
		// 获取所有项目
		getProjects(curPage) {
			this.$get(this.API.getProjects, {
				curPage: curPage,
				pageSize: this.pageSize,
				keyword: this.keyword,
				xmzt: this.xmztC,
				xmlb: this.xmlbC,
				sfgx: this.gxhtC,
				pl: this.xmbqC,
				sffb: this.sffbc,
				htxz: this.htxzList.join(','),
				qygc: this.gczdC
			}).then(res => {
				if (res.state == 'success') {
					this.allfbData = res.data.rows;
					this.totalNum = res.data.records;
				}
			});
		},
		// 搜索关键字
		handleSearch() {
			this.getProjects(1);
		},
		// 搜索关键字（回车）
		SearchItem() {
			this.getProjects(1);
		},
		// 项目类别
		CheckXmlb(e) {
			let xmlb = e.target.getAttribute('data-xmlb');
			this.xmlbC = xmlb;
			this.getProjects(1);
		},
		// 项目状态
		CheckXmzt(param) {
			this.xmztC = param;
			this.getProjects(1);
		},
		// 购销合同
		CheckGxht(e) {
			let gxht = e.target.getAttribute('data-gxht');
			this.gxhtC = gxht;
			this.getProjects(1);
		},
		// 项目标签
		CheckXmbq(e) {
			let xmbq = e.target.getAttribute('data-xmbq');
			this.xmbqC = xmbq;
			this.getProjects(1);
		},
		// 是否续签
		handleChooseSfxq() {
			this.getProjects(1);
		},
		// 合同性质
		handleHtxz() {
			this.getProjects(1);
		},
		// 工程战队
		CheckGcdz(data) {
			this.gczdC = data;
			this.getProjects(1);
		},
		// 是否分包
		CheckSffb(data) {
			this.sffbc = data;
			this.getProjects(1);
		},
		handleCurrentChange(data) {
			this.curPage = data;
			this.getProjects(data);
		},
		//  表格 跳转 详情页
		handleEdit(index, row, cell, event) {
			this.$router.push({ name: 'Task', params: { data: row } });
		},
		handleAddXB(index, row, cell, event) {
			changeXbZt({
				xmbh: row.xmbh
			}).then(({ data }) => {
				if (data.state == 'success') {
					if (event.target.className.includes('el-icon-star-off')) {
						row.isxb = true;
					} else if (event.target.className.includes('el-icon-star-on')) {
						row.isxb = false;
					}
					if (this.xmbqC == 1) {
						this.getProjects(1);
					}
				}
			});
		}
	},
	components: { pagination, gbtxDialog, gbtxjlDialog, xmfkDialog }
};
</script>

<style scoped>
.project_more_table {
	margin: 20px 50px;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	padding: 10px;
}
.project_more_table .project_more_choose {
	margin-bottom: 10px;
}
.project_more_table .project_more_choose .arrow:hover {
	cursor: pointer;
}

.project_more_table > div .search-input {
	width: 450px;
}
.project_more_table .project_more_choose p {
	font-size: 15px;
	color: #637d8a;
}
.project_more_table .table-menu-name {
	display: inline-block;
	width: 120px;
	color: #666;
	margin: 5px 0;
	font-size: 14px;
	font-weight: 700;
	text-align: right;
}
.project_more_table .project_more_choose p span {
	margin-right: 10px;
	padding: 2px 4px;
	border-radius: 3px;
	font-size: 14px;
}
.bg-active {
	background: #1874cd;
	color: #fff;
}

.project_more_table p span:nth-of-type(n + 2):hover {
	cursor: pointer;
}
.name-wrapper {
	color: #409eff;
	cursor: pointer;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}
.xb-star {
	margin-right: 5px;
}
.xb-star:hover {
	cursor: pointer;
}
.el-icon-star-on {
	color: #e6a23c;
}
</style>
