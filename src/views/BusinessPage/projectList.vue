<template>
	<div>
		<section class="project_more_table">
			<div>
				<div class="project_more_choose">
					<div>
						<span class="table-menu-name" style="padding:2px 4px;margin-right:10px">高级查询:</span>
						<el-input
							class="search-input"
							placeholder="请输入项目编号/项目名称/合同编号/项目经理/学校/过保责任人"
							prefix-icon="el-icon-search"
							size="small"
							v-model="keyword"
							@change="SearchItem"
						></el-input>
						&#x3000;
						<el-button type="primary" size="mini" @click="handleCheckGbtj">过保条件</el-button>
						<el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
						<a class="project_more_export" href="javaScript:void(0)" @click="handleExport">导出</a>
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
							<p style="width: 382px;">
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
									<el-checkbox label="C">在谈</el-checkbox>
								</el-checkbox-group>
							</p>
							&#x3000;&#x3000;&#x3000;
							<!--          <p>
                <span class="table-menu-name">续签维保合同:</span>
                <el-radio-group v-model="sfxqC" @change="handleChooseSfxq">
                  <el-radio label>全部</el-radio>
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </p> -->
						</div>
						<div v-if="gbtjShow">
							<div flex>
								<p>
									<span class="table-menu-name">过保日期:</span>
									<span>
										<el-date-picker
											@change="handleChangeDate"
											size="mini"
											style="200px !important"
											value-format="yyyy-MM-dd"
											v-model="gbksrqValue"
											type="date"
											placeholder="过保开始日期"
										></el-date-picker>
									</span>
									至 &nbsp;
									<span>
										<el-date-picker
											@change="handleChangeDate"
											size="mini"
											style="200px !important"
											value-format="yyyy-MM-dd"
											v-model="gbjsrqValue"
											type="date"
											placeholder="过保结束日期"
										></el-date-picker>
									</span>
								</p>
								&#x3000;
							</div>
							<!-- 过保策略 -->
							<div flex>
								  <p>
										<span class="table-menu-name">过保策略:</span>
										<span :class="{'bg-active':gbcl == ''}"  @click="CheckGbcl('')">全部</span>
										<span :class="{'bg-active':gbcl == item.label}" v-for="(item,index) in gbclList"  :key="index" @click="CheckGbcl(item.label)">{{item.mc}}</span>
									</p>
									<p>
										<span class="table-menu-name">过保有无责任人:</span>
										<span :class="{'bg-active':ywzrr == item.id}"  v-for="(item,index) in ywzrrList" :key="index" @click="CheckYwzrr(item.id)" >{{item.label}}</span>
									</p>
							</div>
							
							<!-- 预计签单日期 -->
							<div flex>
								  <p>
										<span class="table-menu-name">预计签单日期:</span>
										<span  v-for="(item,index) in qdrqList" :key="index" :class="{'bg-active':yjqdrq == item.id}" @click="CheckYjqdrq(item.id)" >{{item.label}}</span>
										<el-date-picker
											  v-if="yjqdrq == 2"
											  value-format="yyyy-MM-dd"
												size="mini"
												v-model="qdrq"
												type="daterange"
												range-separator="至"
												start-placeholder="开始日期"
												end-placeholder="结束日期">
											</el-date-picker>
									</p>
							</div>
							
							<!-- 预计签单金额 -->
							<div flex>
								<p>
									<span class="table-menu-name">过保预计签单金额:</span>
									从&#x3000;<el-input-number size="mini" v-model="minqdje" :step="1"></el-input-number>&#x3000;到&#x3000;
									 <el-input-number size="mini" v-model="maxqdje" :step="1"></el-input-number>
								</p>
							</div>
							<!-- 当前跟踪状态 -->
							<div flex>
								<p>
									<span class="table-menu-name">当前跟踪状态:</span>
									<span :class="{'bg-active':gzzt == ''}"  @click="CheckGzzt('')">全部</span>
									<span :class="{'bg-active':gzzt == item.label}" v-for="(item,index) in gzztList"  :key="index" @click="CheckGzzt(item.label)">{{item.mc}}</span>
								</p>
							</div>
						</div>
						
						<p>
							<span class="table-menu-name">区域工程:</span>
							<span :class="{ 'bg-active': gczdC == '' }" data-gczd @click="CheckGcdz('')">全部</span>
							<span v-for="gczd in gczdList" :class="{ 'bg-active': gczd.label == gczdC }" :key="gczd.id" @click="CheckGcdz(gczd.label)">{{ gczd.mc }}</span>
						</p>
					</div>
				</div>
				<div class="project-fbtable">
					<el-table :data="allfbData" border style="width:100%" min-width="1000">
						<el-table-column
							fixed="left"
							label="操作"
							width="200"
							v-if="
								(userGroup.includes('XXLDZ') || userGroup.includes('JZGCRY') || userGroup.includes('JZFGCRY')) && (xmztC == '1' && xmlbC == '软件' ? false : true)
							"
						>
							<template slot-scope="scope">
								<el-button
									v-if="(userGroup.includes('XXLDZ') || userGroup.includes('JZGCRY')) && (scope.row.xmzt == '在建' && scope.row.xmlb == '软件' ? false : true)"
									@click.native.prevent="handleCommand('1', scope.row.xmbh)"
									type="text"
									size="mini"
								>
									过保提醒
								</el-button>
								<el-button
									v-if="(userGroup.includes('XXLDZ') || userGroup.includes('JZGCRY')) && (scope.row.xmzt == '在建' && scope.row.xmlb == '软件' ? false : true)"
									@click.native.prevent="handleCommand('2', scope.row.xmbh)"
									type="text"
									size="mini"
								>
									提醒记录
								</el-button>
<!-- 							<el-button
									v-if="(userGroup.includes('JZFGCRY') || userGroup.includes('JZGCRY')) && (scope.row.xmzt == '在建' && scope.row.xmlb == '软件' ? false : true)"
									@click.native.prevent="handleCommandXmfk(scope.row)"
									type="text"
									size="mini"
								>
									项目反馈
								</el-button> -->
								
								<el-button
									v-if="(userGroup.includes('JZFGCRY') || userGroup.includes('JZGCRY')) && (scope.row.xmzt == '在建' && scope.row.xmlb == '软件' ? false : true)"
									@click.native.prevent="handleCommandGbfk(scope.row)"
									type="text"
									size="mini"
							  	>
									过保反馈
								</el-button>
							</template>
						</el-table-column>

						<el-table-column label="项目名称" width="320" fixed="left">
							<template slot-scope="scope">
								<div slot="reference" style="display:flex">
									<p>
										<span
											title="添加收藏"
											@click="handleAddXB(scope.$index, scope.row, scope.cell, $event)"
											:class="{ 'xb-star': true, 'el-icon-star-on': scope.row.isxb, 'el-icon-star-off': !scope.row.isxb }"
										></span>
									</p>
									<p @click="handleEdit(scope.$index, scope.row)" :title="scope.row.xmmc" class="name-wrapper">
										<span>{{ scope.row.xmmc }}</span>
									</p>
								</div>
							</template>
						</el-table-column>

						<el-table-column label="学校" show-overflow-tooltip width="280">
							<template slot-scope="scope">
								<span class="name-wrapper" @click="handleRouterXxkb(scope.row)">{{ scope.row.dwmc }}</span>
							</template>
						</el-table-column>
						<el-table-column prop="cn" label="财年" width="100"></el-table-column>
						<el-table-column prop="gczd" label="区域工程" min-width="150"></el-table-column>
						<el-table-column prop="xmlb" label="项目类别" width="100"></el-table-column>
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
						<el-table-column prop="xqwb" label="续签维保合同" width="120">
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

		<gbtxDialog :xmbh="xmbh" :show.sync="gbtxShow"></gbtxDialog>
		<gbtxjlDialog :xmbh="xmbh" :show.sync="gbtxjlShow"></gbtxjlDialog>
		<xmfkDialog :xmData="xmData" :show.sync="xmfkShow" @handleSubmit="handleSubmit"></xmfkDialog>
		<gbfkDialog  :show.sync="gbfkShow" :xmbh="xmbh" @handleSubmit="handleSubmitGbfk"></gbfkDialog>
	</div>
</template>

<script>
import gbtxDialog from '@/components/dialog/xxkbxmlb/gbtxDialog';
import gbtxjlDialog from '@/components/dialog/xxkbxmlb/gbtxjlDialog';
import xmfkDialog from '@/components/dialog/xxkbxmlb/xmfkDialog';
import gbfkDialog from '@/components/dialog/xxkbxmlb/gbfkDialog';

import { exportXmData, changeXbZt, getMyProjects, getProjects } from '@/api/xmkb.js';
import pagination from '@/components/BusinessPage/pagination.vue';
import { getMenu, getSession } from '@/utils/util.js';

export default {
	data() {
		return {
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
			ywzrrList: [{ id: '', label: '全部' }, { id: '1', label: '有' }, { id: '0', label: '无' }],
			qdrqList: [{ id: '0', label: '当年' }, { id: '1', label: '明年' }, { id: '2', label: '自定义' }],
			gczdList: [],
			htxzList: [], //合同性质
			gbclList:[],//过保策略
			gzztList:[],//跟踪状态
			keyword: '',
			xmztC: '',
			xmlbC: '',
			gxhtC: '',
			xmbqC: '',
			gczdC: '',
			sfxqC: '',
			gbcl: '', //过保策略
			ywzrr: '', //有无责任人
			yjqdrq: '2', //预计签单日期
			yjqdksrq:'',//签单开始日期
			yjqdjsrq:'',//签单结束日期
			qdrq:[],//自定义签单日期
			minqdje:0,//签单开始金额
			maxqdje:0,//签单结束金额
			gzzt:'',//跟踪状态
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
			gbtxShow: false, //过保提醒
			gbtxjlShow: false, //过保提醒记录
			xmfkShow: false, //项目反馈
			gbfkShow:false,//过保反馈
			userGroup: '',
			xmbh: '',
			gbrqValue: [], //过保日期Value
			gbksrqValue: '',
			gbjsrqValue: '',
			gbtjShow:false //过保条件显示
			
		};
	},
	mounted() {
		if (!getSession('gczd')) {
			getMenu('gczd', this.gczdList, true); //获取工程战队
		} else {
			this.gczdList = getSession('gczd');
		}
		
		if (!getSession('gbcl')) {
			getMenu('OverProtectionStrategy', this.gbclList, ''); //获取过保策略
		} else {
			this.gbclList = getSession('gbcl');
		}
		
		if (!getSession('gzzt')) {
			getMenu('OverProtectionTrackStatus', this.gzztList, ''); //获取跟踪状态
		} else {
			this.gzztList = getSession('gzzt');
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
				query: { dwmc: escape(params.dwmc), bh: params.wid }
			});
			window.open(routeData.href, '_blank');
		},
		// 过保反馈
		handleSubmitGbfk(data){
			data.xmbh = this.xmbh;
			this.$post(this.API.overProtectionFeedback,data).then(res=>{
				if(res.state == 'success'){
					this.$message({
						message: '提交成功~',
						type: 'success'
					});	
					this.getProjects(this.curPage);
					this.gbfkShow = false;
				}else{
					this.$message({
						message: res.msg,
						type: 'error'
					});	
				}
			})
		},
		// 项目反馈
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
				}else{
					this.$message({
						message: res.msg,
						type: 'error'
					});	
				}
			});
		},
		// 导出
		handleExport() {
			this.gbksrqValue = !this.gbksrqValue ? '' : this.gbksrqValue;
			this.gbjsrqValue = !this.gbjsrqValue ? '' : this.gbjsrqValue;
			this.minqdje = !this.minqdje?'':this.minqdje;
			this.maxqdje = !this.maxqdje?'':this.maxqdje;
			
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
					'&gbsjStart=' +
					this.gbksrqValue +
					'&gbsjEnd=' +
					this.gbjsrqValue +
					'&qygc=' +
					this.gczdC +
					'&sfxq=' +
					this.sfxqC +
					'&htxz=' +
					this.htxzList.join(',') +
					'&gbcl=' +
					this.gbcl +
					'&gbzrr=' +
					this.ywzrr +
					'&yjqdksrq=' +
					this.yjqdksrq +
					'&yjqdjsrq=' +
					this.yjqdjsrq +
					'&minqdje=' +
					this.minqdje +
					'&maxqdje=' +
					this.maxqdje +
					'&gbgzzt=' +
					this.gzzt
			);
		},
		// 过保提醒
		handleCommand(params, data) {
			this.xmbh = data;
			if (params == 1) {
				this.gbtxShow = true;
			} else {
				this.gbtxjlShow = true;
			}
		},
		// 项目反馈
		handleCommandXmfk(data) {
			this.xmData = data;
			this.xmfkShow = true;
		},
		// 过保反馈
		handleCommandGbfk(data){
			this.xmbh = data.xmbh;
			this.gbfkShow = true;
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
			this.yjqdksrq = this.yjqdrq=='0'?(new Date().getFullYear()+'-01-01'):this.yjqdrq=='1'?((new Date().getFullYear()+1)+'-01-01'):(!this.qdrq[0]?'':this.qdrq[0]);
			this.yjqdjsrq = this.yjqdrq=='0'?(new Date().getFullYear()+'-12-31'):this.yjqdrq=='1'?((new Date().getFullYear()+1)+'-12-31'):(!this.qdrq[1]?'':this.qdrq[1]);
			getProjects({
				curPage: curPage,
				pageSize: this.pageSize,
				keyword: this.keyword,
				xmzt: this.xmztC,
				xmlb: this.xmlbC,
				sfgx: this.gxhtC,
				pl: this.xmbqC,
				sfxq: this.sfxqC,
				htxz: this.htxzList.join(','),
				qygc: this.gczdC,
				gbsjStart: this.gbksrqValue,
				gbsjEnd: this.gbjsrqValue,
				gbcl:this.gbcl,
				gbzrr:this.ywzrr,
				yjqdksrq:this.yjqdksrq,
				yjqdjsrq:this.yjqdjsrq,
				minqdje:!this.minqdje?'':this.minqdje,
				maxqdje:!this.maxqdje?'':this.maxqdje,
				gbgzzt:this.gzzt
			}).then(({ data }) => {
				if (data.state == 'success') {
					this.allfbData = data.data.rows;
					this.totalNum = data.data.records;
				}
			});
		},
		// 过保条件显示
		handleCheckGbtj(){
			this.gbtjShow = !this.gbtjShow;
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
		// 过保策略
		CheckGbcl(data) {
			this.gbcl = !data?'':data;
			this.getProjects(1);
		},
		// 有无责任人
		CheckYwzrr(data) {
			this.ywzrr = data;
			this.getProjects(1);
		},
		CheckYjqdrq(data){
			this.yjqdrq = data;
			this.getProjects(1);
		},
		// 跟踪状态
		CheckGzzt(data){
			this.gzzt = !data?'':data;
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
	components: { pagination, gbtxDialog, gbtxjlDialog, xmfkDialog,gbfkDialog }
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
	width: 130px;
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

.project_more_export {
	background: forestgreen;
	color: #fff;
	padding: 6px 16px;
	font-size: 12px;
	border-radius: 3px;
	line-height: 25px;
	margin: 0 10px;
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
