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
					<p>招标截止 {{ fbxxData.zbjzrq }}</p>
					<a href="javaScript:;;" @click="handleToubiao" v-if="!istb && !!tbzt">我要投标</a>
					<el-tag v-if="!!istb && !!tbzt"  type="success">已投标</el-tag>
					<el-button size="mini" type="primary"  v-if="!!istb && !!tbzt" @click="handleToubiao">编辑投标</el-button>
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
								<td>{{ htjbxx.gcqy }}</td>
								<th>工程战队</th>
								<td>{{ htjbxx.gczd }}</td>
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
						<el-table :data="htnrData" border style="width: 100%" max-height="400">
							<el-table-column prop="ywx" label="业务线" min-width="120"></el-table-column>
							<el-table-column prop="app" label="合同内容" show-overflow-tooltip min-width="150"></el-table-column>
							<el-table-column prop="zb" label="占比(%)" width="80"></el-table-column>
							<el-table-column prop="sm" label="说明" min-width="150" show-overflow-tooltip></el-table-column>
							<el-table-column prop="ejcpmc" label="产品归属" min-width="150"></el-table-column>
							<el-table-column prop="ssry" label="实施人月" width="100"></el-table-column>
							<el-table-column prop="kfry" label="二开人月" width="120"></el-table-column>
							<el-table-column prop="kfry" label="项目类别" width="120"></el-table-column>
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
									<td>{{ fbxxData.fbxz == '01' ? '在建' : fbxxData.fbxz == '02' ? '售后服务' : '过保' }}</td>
									<th>自助打印</th>
									<td>{{ fbxxData.zzdy }}</td>
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
							<el-table
							  :data="fbnrData"
							  border
							  style="width: 100%">
							  <el-table-column prop="ywymc" label="业务域" min-width="200" show-overflow-tooltip></el-table-column>
							  <el-table-column prop="cpmc" label="合同内容" width="160" show-overflow-tooltip></el-table-column>
							  <el-table-column prop="zb" label="占比(%)" width="90"></el-table-column>
							  <el-table-column prop="htsm" label="说明"  width="160" show-overflow-tooltip></el-table-column>
							  <el-table-column prop="xmlb" label="项目类别" width="100"></el-table-column>
							  
							  <el-table-column prop="htssry" label="实施人月(合同)" min-width="90"></el-table-column>
							  <el-table-column prop="ssckbz" label="实施参考标准" min-width="90"></el-table-column>
							  <el-table-column prop="fbssry" label="实施人月(分包)" min-width="90"></el-table-column>
							  <el-table-column prop="htekry" label="二开人月(合同)" min-width="90"></el-table-column>
							  <el-table-column prop="fbekry" label="二开人月(分包)" min-width="90"></el-table-column>
							  <el-table-column prop="fbsm" label="说明" min-width="160" ></el-table-column>
							</el-table>
						</div>
					</div>
				</div>
			</div>

			<el-dialog title="我要投标" :visible.sync="dialogTableVisible" width="1000px" :close-on-click-modal="false">
				<div style="padding:0 20px;">
					<div style="margin:10px 0;position:relative;">
						<span class="filter-weight">投标说明：</span>
						<el-input type="textarea" maxlength="200" resize="none" v-model="tbly" rows="3"></el-input>
						<span style="position:absolute;bottom:0;right:10px;font-size:12px;">
							<span :class="{ 'max-length': tbly.length >= 200 }">( {{ tbly.length }}</span>
							/ 200 )
						</span>
					</div>
					<table border width="100%" class="tb-table tdfp-table">
						<tr>
							<th>科目名称</th>
							<th>总金额（元）</th>
						</tr>
						<tr>
							<td>实施费用</td>
							<td>{{ssfyTotalkm}}</td>
						</tr>
						<tr>
							<td>二开费用</td>
							<td>{{ekfyTotalkm}}</td>
						</tr>
						<tr>
							<td>可变费用</td>
							<td>{{kbfyTotalkm}}</td>
						</tr>
					</table>

					<br />
						<div>
						<span class="filter-weight">创建团队：</span>
						<div style="margin: 10px 0">
							<el-button size="mini" type="primary" @click="handleAddUser">添加成员</el-button>
						</div>
						<el-table :data="userData" border style="width: 100%">
							<el-table-column fixed="left" label="操作" width="80">
								<template slot-scope="scope">
									<el-button type="danger" size="mini" @click="hanldeDelete(scope.$index)">删除</el-button>
								</template>
							</el-table-column>
							<el-table-column prop="usercode" label="工号" width="100"></el-table-column>
							<el-table-column prop="username" label="姓名" width="100"></el-table-column>
							<el-table-column prop="ywx" label="负责业务线"></el-table-column>
							<el-table-column prop="ssfy" label="分配实施金额"></el-table-column>
							<el-table-column prop="ekfy" label="分配二开金额"></el-table-column>
							<el-table-column prop="kbfy" label="分配可变金额"></el-table-column>
						</el-table>
					</div>
					<div>
						<span class="filter-weight" style="margin: 10px 0">团队分配：</span>
						<table width="100%" class="tb-table tdfp-table">
							<tr>
								<th>业务域</th>
								<th>合同内容</th>
								<th>占比</th>
								<th>说明</th>
								<th>项目类别</th>
								<th>责任人</th>
								<th>实施金额</th>
								<th>二开金额</th>
								<th>可变金额</th>
							</tr>
							<tr v-for="(item,index) in ywyData" :key="index">
								<td>{{item.ywymc}}</td>
								<td>{{item.cpmc}}</td>
								<td>{{item.zb}}</td>
								<td >{{item.htsm}}</td>
								<td>{{item.xmlb}}</td>
								<td width="100px" style="position: relative;">
									<el-select v-model="item.zrrbh" size="mini" placeholder="请选择" style="border: none;" @change="handleSeleteUser">
										<el-option v-for="(item,index) in userData"  :key="index" :label="item.username" :value="item.usercode"></el-option>
									</el-select>
								</td>
								<td width="80px"><input type="number" v-model="item.ssfy"  @input="handleChangefy(index,'ss',item.zrrbh)"/></td>
								<td width="80px"><input type="number" v-model="item.ekfy"  @input="handleChangefy(index,'ek',item.zrrbh)"/></td>
								<td width="80px"><input type="number" v-model="item.kbfy"  @input="handleChangefy(index,'kb',item.zrrbh)"/></td>
							</tr>
						</table>
						<br>
						<div>
							<span class="filter-weight" style="margin: 10px 0">项目文件：</span>
							<uploadComponent @handleUploadFile="handleUploadFile"></uploadComponent>
						</div>
					</div>
				</div>
				<div style="margin:10px 0;text-align:right;padding:10px 20px;"><button class="tbcommit" @click="handleCommit">提交</button></div>
			</el-dialog>
		</div>
		<userDialog :show.sync="show" :isdept="false" @addUserSuccess="addUserSuccess"></userDialog>
	</div>
</template>
<script>
import { queryXmTbxx, queryFbxx, tbxq, saveTbxx } from '@/api/toubiao.js';
import { EventBus, returnFloat } from '../../utils/util.js';
import userDialog from '@/components/dialog/user-dialog.vue';
import uploadComponent from '@/components/BusinessPage/upload'

export default {
	data() {
		return {
			dialogTableVisible: false,
			show: false,
			tbly: '',//投标理由
			xmbh: '',
			fbData: '',
			htjbxx: {},
			htnrData: [],

			tbfyData: [],
			istb: '',
			tbzt: '',
			fbxxData: {},//分包信息
			fbnrData:[],//分包内容
			fbcpData: [],
			tbje: null,
			zbxx: '',
			userData: [], //团队成员
			ywyData:[{
				ssje:0,
				ekje:0,
				kbje:0,
				zrrbh:""
			},{
				ssje:0,
				ekje:0,
				kbje:0,
				zrrbh:""
			}],//业务域列表
			
			ssfyTotal:0,
			ywxArr:[],
			ekfyTotal:0,
			kbfyTotal:0,
			
			ssfyTotalkm:0,
			ekfyTotalkm:0,
			kbfyTotalkm:0,

			fileList:[]
			
		};
	},
	mounted() {
		EventBus.$on('hoshRouter', param => {
			this.$router.push({ name: 'DataTab' });
		});
	},
	methods: {
		handleAddUser() {
			this.show = true;
		},

		// 添加成员
		addUserSuccess(data) {
			let i = false;
			if(!this.userData.length){
				this.userData.push(data);
			}else{
				this.userData.forEach(ele=>{
					if(ele.usercode == data.usercode){
						i = true;
						this.$message({
							message:'该用户已添加~',
							type:'warning'
						})
					}	
				})
				if(!!i){
					return;
				}else{
					this.userData.push(data);
				}
			}
		},
		// 删除团队成员
		hanldeDelete(index) {
			this.ywyData.forEach((ele,i,arr)=>{
				if(ele.zrrbh == this.userData[index].usercode){
					this.$set(this.ywyData[i],'zrrbh','');
					this.$set(this.ywyData[i],'zrrxm','');

					this.ssfyTotalkm = this.ssfyTotalkm - this.ywyData[i].ssfy;
					this.ekfyTotalkm = this.ekfyTotalkm - this.ywyData[i].ekfy;
					this.kbfyTotalkm = this.kbfyTotalkm - this.ywyData[i].kbfy;

					this.$set(this.ywyData[i],'ssfy',0);
					this.$set(this.ywyData[i],'ekfy',0);
					this.$set(this.ywyData[i],'kbfy',0);
				}
			})
			this.userData.splice(index,1);
		},
		// 上传附件
		handleUploadFile(data){
			this.fileList = data;
		},

		//   获取投标费用
		handleToubiao() {
			let userList = [];
			tbxq({fbbh:this.$route.query.fbbh}).then(({data})=>{
				if(data.state == 'success'){
					this.ywyData = data.data.htnrfy;
					if(!!data.data.tbxx){
						this.ssfyTotalkm = data.data.tbxx.ssfy;
						this.ekfyTotalkm = data.data.tbxx.ekfy;
						this.kbfyTotalkm = data.data.tbxx.kbfy;
						this.tbly = data.data.tbxx.tbly;
					}
					if(!!data.data.tdfy){
						data.data.tdfy.forEach((ele,i,arr)=>{
							userList.push({
								username:ele.zrrxm,
								usercode:ele.zrrbh,
								ywx:ele.ywymc,
								ssfy:ele.ssfy,
								ekfy:ele.ekfy,
								kbfy:ele.kbfy
							})
						})
					this.userData = userList;
					}
				}
			})
			this.dialogTableVisible = !this.dialogTableVisible;
		},

		// 分配用户
		handleSeleteUser(val){
			this.ywxArr = [];
			this.userData.forEach((element,i,arr)=>{
				if(element.usercode == val){
						this.ywyData.forEach((ele,i,arr)=>{
							if(val == ele.zrrbh ){
								this.$set(this.ywyData[i],'zrrxm',element.username);
								if(!this.ywxArr.includes(ele.ywymc)){
									this.ywxArr.push(ele.ywymc);
								}
							}
						})
					this.$set(this.userData[i],'ywx',this.ywxArr.join(','));
				}
			})
		},
		// 实施费用
		handleChangefy(index,type,yhbh){
			if(!this.ywyData[index].zrrbh){
				this.$alert('请先选择责任人', ' 提示', {
				  type:'warning',
				  confirmButtonText: '确定',
				});
				return;
			}
			switch (type){
				case 'ss':
					this.ssfyTotal = 0;
					this.ssfyTotalkm = 0;
					this.ywyData.forEach(ele=>{
						if(ele.zrrbh == yhbh){
							this.ssfyTotal += Number(ele.ssfy);
						}
					})
					this.userData.forEach((ele,i,arr)=>{
						if(ele.usercode == yhbh){
							this.$set(this.userData[i],'ssfy',this.ssfyTotal);
						}
						this.ssfyTotalkm += !this.userData[i].ssfy?0:this.userData[i].ssfy;
					})
					break;
				case 'ek':
					this.ekfyTotal = 0;
					this.ekfyTotalkm = 0;
					this.ywyData.forEach(ele=>{
						if(ele.zrrbh == yhbh){
							this.ekfyTotal += Number(ele.ekfy);
						}
					})
					this.userData.forEach((ele,i,arr)=>{
						if(ele.usercode == yhbh){
							this.$set(this.userData[i],'ekfy',this.ekfyTotal);
						}
						this.ekfyTotalkm += !this.userData[i].ekfy?0:this.userData[i].ekfy;
					})
					break;
				case 'kb':
					this.kbfyTotal = 0;
					this.kbfyTotalkm = 0;
					this.ywyData.forEach(ele=>{
						if(ele.zrrbh == yhbh){
							this.kbfyTotal += Number(ele.kbfy);
						}
					})
					this.userData.forEach((ele,i,arr)=>{
						if(ele.usercode == yhbh){
							this.$set(this.userData[i],'kbfy',this.kbfyTotal);
						}
						this.kbfyTotalkm += !this.userData[i].kbfy?0:this.userData[i].kbfy;
					})
					break;
				default:
					break;
			}
		},
		// 提交投标
		handleCommit() {
			let tdList = [],
			    zrrnull = false;
			this.ywyData.forEach(ele=>{
				if(!ele.zrrbh){
					zrrnull = true;
				}
				tdList.push({
					htnrwid:ele.htnrwid,
					zrrbh:ele.zrrbh,
					zrrxm:ele.zrrxm,
					ssfy:ele.ssfy,
					ekfy:ele.ekfy,
					kbfy:ele.kbfy
				})
			})
			if(!!zrrnull){
				  this.$message({
							message:'请先选择所属责任人~',
							type:'warning'
					})
					return;
			}
			this.$post(this.API.saveTbxx,{
					fbbh:this.$route.query.fbbh,
					tbly:this.tbly,
					fjwid:this.fileList.join(','),
					ssfy:this.ssfyTotalkm,
					ekfy:this.ekfyTotalkm,
					kbfy:this.kbfyTotalkm,
					tbtdlist:JSON.stringify(tdList)
				}).then(res=>{
					if(res.state == 'success'){
						this.$message({
							message:'投标成功',
							type:'success'
						})
						this.dialogTableVisible = !this.dialogTableVisible;
						this.istb = true;
						this.tbzt = true;
					}else{
						this.$message({
							message:res.msg,
							type:'error'
						})
					}
				})
		}
	},
	activated() {
		//  查询合同内容
		queryXmTbxx({
			xmbh: this.$route.query.xmbh,
			fbbh: this.$route.query.fbbh
		}).then(({ data }) => {
			if (data.state == 'success') {
				this.htjbxx = data.data.lxxx;//合同信息
				this.htnrData = data.data.lxxx_htnr;//合同内容
				this.fbxxData = data.data.fbxx;//分包信息
				this.fbnrData = !data.data.fbnr?[]:data.data.fbnr;//分包内容
				this.istb = data.data.istb;
				this.tbzt = data.data.tbzt;
			} else {
				this.$message({
					message: data.msg,
					type: 'error'
				});
			}
		});
		
		// 		//   查询分包信息
		// 		queryFbxx({
		// 			fbbh: this.$route.query.fbbh
		// 		}).then(({ data }) => {
		// 			if (data.state == 'success') {
		// 				this.fbxxData = data.data.fbxx;
		// 				let fbnrArr = data.data.fbcp;
		//
		// 				// 格式化 完工率 完工量
		// 				fbnrArr.forEach((val, index, arr) => {
		// 					arr[index].wglv = returnFloat(val.wglv);
		// 					arr[index].wgl = returnFloat(val.wgl);
		// 				});
		// 				this.fbcpData = fbnrArr;
		// 			} else {
		// 				this.$message({
		// 					message: data.msg,
		// 					type: 'error'
		// 				});
		// 			}
		// 		});
	},
	components: { userDialog,uploadComponent }
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
/* .fbdetail_container .close-page{
        position:absolute;
        right:0;
        top:0;
        font-size:18px;
        background:rgba(0, 0, 0, 0.1);
        color: #000;
        padding: 5px 10px;
    }
    .fbdetail_container .close-page:hover{
        cursor: pointer;
        color: #ccc;
    } */
.tdfp-table td {
	text-align: center;
}
.max-length {
	color: #f00;
}
</style>
