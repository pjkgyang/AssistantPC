<template>
	<div>
		<div class="fbdetail_container">
			<div class="fb_name">
				<div>
					<p class="project__name">
						{{ $route.query.xmbh }} {{ $route.query.fbmc }}
						<el-tag size="mini" :type="!!tbzt ? 'success' : 'danger'">{{ !!tbzt ? '投标中' : '招标结束' }}</el-tag>
					</p>
					<p class="project__label">￥{{ fbxxData.zfy }}</p>
				</div>
				<div class="project__extra">
					<b>已有 {{ $route.query.r }} 人投标</b>
					<p>招标截止日期： {{ fbxxData.zbjzrq }}</p>
					<a href="javaScript:;;" @click="handleToubiao('tb')" v-if="(!istb && !!tbzt) || !tbzt">我要投标</a>
					<el-tag v-if="!!istb && !!tbzt" type="success">已投标</el-tag>
					<el-button size="mini" type="primary" v-if="!!istb && !!tbzt" @click="handleToubiao('edit')">编辑投标</el-button>
				</div>
			</div>
			<div class="fb_info">
				<div>
					<h4>合同内容</h4>
					<div>
						<h6>合同基本信息</h6>
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
								<td>{{ htjbxx.yh }}</td>
							</tr>
							<tr>
								<th>签署日期</th>
								<td>{{ htjbxx.qssj }}</td>
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
						<h6>合同内容</h6>
						<el-table :data="htnrData" border style="width: 100%" >
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
				</div>

				<!-- 分包 -->
				<div>
					<div>
						<h4>分包信息</h4>
						<div>
							<h6>分包基本信息</h6>
							<table>
								<tr>
									<th>合同编号</th>
									<td>{{ fbxxData.htbh }}</td>
									<th>分包名称</th>
									<td>{{ fbxxData.fbmc }}</td>
									<th>分包人姓名</th>
									<td>{{ fbxxData.fbrxm }}</td>
								</tr>
								<tr>
									<th>分包日期</th>
									<td>{{ fbxxData.fbrq }}</td>
									<th>分包性质</th>
									<td colspan="3">{{ fbxxData.fbxz == '01' ? '在建' : fbxxData.fbxz == '02' ? '售后服务' : '过保' }}</td>
								</tr>
								<tr>
									<th>计划开始日期</th>
									<td>{{ fbxxData.jhksrq }}</td>
									<th>计划结束日期</th>
									<td>{{ fbxxData.jhjsrq }}</td>
									<th>招标截止日期</th>
									<td>{{ fbxxData.zbjzrq }}</td>
								</tr>
								<tr>
									<th>实施费用 (元)</th>
									<td>{{ fbxxData.ssfy }}</td>
									<th>二开费用 (元)</th>
									<td>{{ fbxxData.ekfy }}</td>
									<th>可变费用 (元)</th>
									<td>{{ fbxxData.kbfy }}</td>
								</tr>
								<tr>
									<th>分包说明</th>
									<td colspan="5">{{ fbxxData.fbsm }}</td>
								</tr>
								<tr>
									<th>审核人编号</th>
									<td>{{ fbxxData.shrbh }}</td>
									<th>审核人姓名</th>
									<td>{{ fbxxData.shrmc }}</td>
									<th>审核日期</th>
									<td>{{ fbxxData.shrq }}</td>
								</tr>
								<tr>
									<th>审核意见</th>
									<td colspan="5">{{ !fbxxData.shyj ? '无' : fbxxData.shyj }}</td>
								</tr>
							</table>
						</div>
						<div>
							<h6>分包内容</h6>
							<el-table :data="fbnrData" border style="width: 100%">
								<el-table-column prop="ywymc" label="业务域" min-width="200" show-overflow-tooltip></el-table-column>
								<el-table-column prop="cpmc" label="合同内容" min-width="160" show-overflow-tooltip></el-table-column>
								<el-table-column prop="zb" label="占比(%)" width="90"></el-table-column>
								<el-table-column prop="htsm" label="说明" min-width="160" show-overflow-tooltip></el-table-column>
								<el-table-column prop="xmlb" label="项目类别" width="100"></el-table-column>

								<!-- <el-table-column prop="htssry" label="实施人月(合同)" min-width="90"></el-table-column> -->
								<el-table-column prop="ssckbz" label="实施参考标准" min-width="90"></el-table-column>
								<el-table-column prop="fbssry" label="实施人月(分包)" min-width="90"></el-table-column>
								<!-- <el-table-column prop="htekry" label="二开人月(合同)" min-width="90"></el-table-column> -->
								<el-table-column prop="fbekry" label="二开人月(分包)" min-width="90"></el-table-column>
								<el-table-column prop="fbsm" label="说明" min-width="160"></el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</div>
		</div>

		<toubiaoDialog :show.sync="toubiaoShow" :title="title" :type="curType" :fbbh="$route.query.fbbh" @handleCommitToubiao="handleCommitToubiao"></toubiaoDialog>
	</div>
</template>
<script>
import { queryXmTbxx, queryFbxx} from '@/api/toubiao.js';
import { EventBus, returnFloat } from '../../utils/util.js';
import toubiaoDialog from '@/components/dialog/toubiao-dialog.vue';

export default {
	data() {
		return {
			toubiaoShow:false,
			show: false,
			title:'',
			tbly: '', //投标理由
			xmbh: '',
			fbData: '',
			htjbxx: {},
			htnrData: [],

			tbfyData: [],
			istb: '',
			tbzt: '',
			fbxxData: {}, //分包信息
			fbnrData: [], //分包内容



			fbxx:{},  //分包信息
			curType:''
		};
	},
	mounted() {
		EventBus.$on('hoshRouter', param => {
			this.$router.push({ name: 'DataTab' });
		});
	},
	methods: {
		//   获取投标费用
		handleToubiao(type) {
			this.curType = type;
			if(type=="tb"){
				this.title = '我要投标'
			}else{
				this.title = ' 编辑投标信息'
			}
			this.toubiaoShow = !this.toubiaoShow;
		},
		//提交成功
		handleCommitToubiao(){
			this.istb = true;
			this.tbzt = true;
			this.toubiaoShow = false;
		},
	},
	activated() {
		//  查询合同内容
		queryXmTbxx({
			xmbh: this.$route.query.xmbh,
			fbbh: this.$route.query.fbbh
		}).then(({ data }) => {
			if (data.state == 'success') {
				this.htjbxx = data.data.lxxx; //合同信息
				this.htnrData = data.data.lxxx_htnr; //合同内容
				this.fbxxData = data.data.fbxx; //分包信息
				this.fbnrData = !data.data.fbnr ? [] : data.data.fbnr; //分包内容
				this.istb = data.data.istb;
				this.tbzt = data.data.tbzt;
			} else {
				this.$message({
					message: data.msg,
					type: 'error'
				});
			}
		});
	},
	components: {toubiaoDialog }
};
</script>
<style scoped>
.fbdetail_container {
	width: 90%;
	margin: 20px auto;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	border-radius: 4px;
	padding: 0;
	background: #fff;
	position: relative;
}
.fbdetail_container .fb_name {
	height: 220px;
	padding: 30px 20px;
	border-bottom: 1px solid #efecea;
}
.fbdetail_container .fb_name:after {
	content: '';
	display: block;
	clear: both;
}
.fbdetail_container .fb_name > div:nth-child(1) {
	float: left;
}
.fbdetail_container .fb_name > div:nth-child(2) {
	float: right;
}
.project__name {
	font-size: 20px;
	width: 800px;
}
.project__label {
	font-size: 36px;
	margin-top: 40px;
}
.project__name span {
	font-size: 14px;
}
.project__extra {
	text-align: right;
}
.project__extra b {
	font-size: 20px;
	font-weight: normal;
}
.project__extra p {
	margin: 10px 0 20px 0;
	font-size: 14px;
}
.project__extra a {
	height: 32px;
	width: 100px;
	text-align: center;
	line-height: 32px;
	font-size: 18px;
	background: #f00;
	color: #fff;
	padding: 5px 8px;
	border-radius: 2px;
}
.project__extra a:hover {
	background: #cd1515;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28);
	transition: box-shadow 0.3s linear;
	color: #fff;
}

.fb_info {
	padding: 15px 20px;
}
.fb_info h6 {
	color: #999;
	font-size: 13px;
	margin: 5px 0 !important;
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
	margin: 15px 0 !important;
}

.fb_info h6 {
	margin: 10px 0;
}
.tb-table {
	border-collapse: collapse;
}
.tb-table th {
	background: #f5f7fa;
	color: #999;
	text-align: center;
	padding: 5px 0;
}
.tb-table th,
.tb-table td {
	border: 1px solid #ebeef5;
}
.tb-table td:nth-of-type(1) {
	padding: 0 10px;
}
.tb-table td input {
	width: 100%;
	padding: 5px;
}

.tbcommit {
	background: #409eff;
	border: none;
	color: #fff;
	padding: 6px 10px;
	border-radius: 5px;
}
.tbcommit:hover {
	cursor: pointer;
}
.tbfy_table td {
	padding: 5px 8px !important;
	border: 1px solid #000;
}
.tdfp-table td {
	text-align: center;
}
.max-length {
	color: #f00;
}
p.upload_file-p {
	border: 1px solid rgb(235, 234, 234);
	padding: 2px 6px;
	border-radius: 3px;
	width: 900px;
	margin-top: 4px !important;
}
p.upload_file-p:hover {
	background: rgba(216, 214, 214, 0.5);
}
p.upload_file-p i:hover {
	cursor: pointer;
	color: #f00;
}
</style>
