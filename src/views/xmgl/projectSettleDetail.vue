<template>
	<div>
		<div class="jsdetail_container">
			<div class="fb_info">
				<div>
					<h4>项目结算详情</h4>
					<div text-right v-if="jsxx.jszt != 1">
						<el-button size="small" type="danger" @click='handleSave'>保存</el-button>
					</div>
					<div>
						<h5>历史结算信息</h5>
						<table>
							<tr>
								<th>分包结算次数</th>
								<td>{{ jsxx.jscs }}</td>
								<th>中标总金额（元）</th>
								<td>{{ jsxx.zbzfy }}</td>
								<th>已结算金额（元）</th>
								<td>{{ jsxx.yjszfy }}</td>
							</tr>
							<tr>
								<th>剩余结算金额（元）</th>
								<td>{{ jsxx.syjsje }}</td>
								<th>团队结算金额（元）</th>
								<td>{{ jsxx.yjstdfy }}</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>结算申请信息</h5>
						<table>
							<tr>
								<th>项目名称</th>
								<td colspan="5">{{jsxx.xmmc}}</td>
							</tr>
							<tr>
								<th>分包名称</th>
								<td colspan="5">{{jsxx.fbmc}}</td>
							</tr>
							<tr>
								<th>中标人</th>
								<td>{{jsxx.zbrmc}}</td>
								<th>申请人</th>
								<td>{{jssqData.jsrmc}}</td>
								<th>申请时间</th>
								<td>{{jssqData.jsrq}}</td>
							</tr>
							<tr>
								<th>实际开始日期</th>
								<td>{{jssqData.sjkssj}}</td>
								<th>实际结束日期</th>
								<td>{{jssqData.sjjssj}}</td>
								<th>结算点</th>
								<td>{{jssqData.sjkssj}}</td>
							</tr>
							<tr>
								<th>申请说明</th>
								<td colspan="5" height="80px">{{jssqData.sm}}</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>本次结算信息</h5>
						<table>
							<tr>
								<th>本次结算总金额（元）</th>
								<td colspan="5"><input style="width:100%" type="number" v-model="jsxx.jsje" ></td>
							</tr>
							<tr>
								<th>中标实施费用（元）</th>
								<td>{{jsxx.zbssfy}}</td>
								<th>中标二开费用（元）</th>
								<td>{{jsxx.zbekfy}}</td>
								<th>中标可变费用（元）</th>
								<td>{{jsxx.zbkbfy}}</td>
							</tr>
							<tr>
								<th>已结算实施费用（元）</th>
								<td>{{jsxx.yjsssfy}}</td>
								<th>已结算二开费用（元）</th>
								<td>{{jsxx.yjsekfy}}</td>
								<th>已结算可变费用（元）</th>
								<td>{{jsxx.yjskbfy}}</td>
							</tr>
							<tr>
								<th>预留实施费用（元）</th>
								<td><input v-model="jsxx.ylssfy" style="width: 100%;"  type="number" @input="handleInputfy('0')"/></td>
								<th>预留二开费用（元）</th>
								<td><input v-model="jsxx.ylekfy" style="width: 100%;"  type="number" @input="handleInputfy('1')"/></td>
								<th>预留可变费用（元）</th>
								<td><input v-model="jsxx.ylkbfy" style="width: 100%;"  type="number" @input="handleInputfy('2')"/></td>
							</tr>
							<tr>
								<th>实施调用费用（元）</th>
								<td colcenter spacebetween style="border:none !important"><span>{{!jsxx.rlssfy?0:jsxx.rlssfy}}</span><i title="设置费用"  class="el-icon-edit-outline" @click="handleSettleMoney('0')"></i></td>
								<th>二开调用费用（元）</th>
								<td colcenter spacebetween style="border:none !important"><span>{{!jsxx.rlekfy?0:jsxx.rlekfy}}</span><i title="设置费用"  class="el-icon-edit-outline" @click="handleSettleMoney('1')"></i></td>
								<th>可变报销费用（元）</th>
								<td colcenter spacebetween style="border:none !important"><span>{{!jsxx.rlkbfy?0:jsxx.rlkbfy}}</span><i title="设置费用"  class="el-icon-edit-outline" @click="handleSettleMoney('2')"></i></td>
							</tr>
							<tr>
								<th>本次结算实施费用（元）</th>
								<td>{{jsxx.jsssfy}}</td>
								<th>本次结算二开费用（元）</th>
								<td>{{jsxx.jsekfy}}</td>
								<th>本次结算可变费用（元）</th>
								<td>{{jsxx.jskbfy}}</td>
							</tr>
							<tr>
								<th>预留说明</th>
								<td colspan="5">
									<textarea v-model="jsxx.sm" placeholder="请输入预留说明" style="width: 100%;padding: 5px;" rows="3"></textarea>
								</td>
							</tr>
							<tr>
								<th>奖励金额（元）</th>
								<td><input style="width: 100%;" type="number" v-model="jsxx.jlje" @input="handleInputfy"></td>
								<th>惩罚金额（元）</th>
								<td colspan="3"><input style="width: 100%;" type="number" v-model="jsxx.cfje" @input="handleInputfy"></td>
							</tr>
							<tr>
								<th>奖惩说明</th>
								<td colspan="5">
									<textarea v-model="jsxx.jlsm" placeholder="请输入奖惩说明" style="width: 100%;padding: 5px;" rows="3"></textarea>
								</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>本次团队结算信息</h5>
						<p style="color:#f00;font-size: 12px;">
							个人结算二开费用 = 结算二开费用 * 5400 / 8800; 个人结算可变费用 = 结算可变费用 * 70%;
							<br />
							结算总金额包含团队结算费用; 实际实施费用指二开实施费用；实际二开费用指二开开发费用；实际可变费用指报销费用;
						</p>
						<table class="table_center">
							<tr>
								<th>业务域</th>
								<th>合同内容</th>
								<th>当前进度</th>
								<th>责任人</th>
								<th>中标实施费用(元)</th>
								<th>已结算实施费用(元)</th>
								<th>本次结算实施费用(元)</th>
								<th>中标二开费用(元)</th>
								<th>已结算二开费用(元)</th>
								<th>本次结算二开费用(元)</th>
								<th>中标可变费用(元)</th>
								<th>已结算可变费用(元)</th>
								<th>本次结算可变费用(元)</th>
								<th>本次合计结算</th>
							</tr>
							<tr v-if="!tdxxData.length">
								<td colspan="14">暂无内容</td>
							</tr>
							<tr v-for="(item, index) in tdxxData" :key="index">
								<td>{{item.ywymc}}</td>
								<td style="width: 300px;">{{item.cpmc}}</td>
								<td style="width: 240px;">{{item.dqjd}}</td>
								<td >{{item.cymc}}</td>
								<td>{{item.zbssfy}}</td>
								<td>{{item.yjsssfy}}</td>
								<td><input v-model="item.jsssfy" type="number" style="width: 80px;" @input="handleChangeInput(index,'ss')" /></td>
								<td>{{item.zbekfy}}</td>
								<td>{{item.yjsekfy}}</td>
								<td><input v-model="item.jsekfy" type="number" style="width: 80px;" @input="handleChangeInput(index,'ek')" /></td>
								<td>{{item.zbkbfy}}</td>
								<td>{{item.yjskbfy}}</td>
								<td><input v-model="item.jskbfy" type="number" style="width: 80px;" @input="handleChangeInput(index,'kb')" /></td>
								<td>{{ !item.jsje?0:item.jsje }}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>

		<el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
			<div class="pd-10">
				<div>
					<span class="filter-weight">承担人：</span>
					<el-radio-group v-model="cdradio">
						<el-radio :label="0">区域承担</el-radio>
						<el-radio :label="1">分包扣除</el-radio>
					</el-radio-group>
					&#x3000;
					<el-button :disabled="!wids.length" type="primary" size="mini" @click="handleMultipleSet">批量设置</el-button>
				</div>
				<p style="color: #f00;margin:10px 0 !important; ">总金额：{{!cdfyData.zje?0:cdfyData.zje}}元，区域承担：{{!cdfyData.qycd?0:cdfyData.qycd}}元，分包扣除：{{!cdfyData.fbcd?0:cdfyData.fbcd}}元</p>
				<el-table v-if="jsSource != 2" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column  label="承担人" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.rlzt=='0'?'区域承担':scope.row.rlzt=='1'?'分包扣除':''}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="djbh" label="单据编号" width="180"></el-table-column>
					<el-table-column prop="name" label="开发性质" width="100"></el-table-column>
					<el-table-column prop="fwlxmc" label="服务类型" width="100"></el-table-column>
					<el-table-column prop="ztmc" label="状态" width="100"></el-table-column>
					<el-table-column prop="ssywxmc" label="业务线" min-width="250"></el-table-column>
					<el-table-column prop="ysje" label="金额" width="100"></el-table-column>
					<el-table-column prop="xqfmc" label="需求方" width="100"></el-table-column>
					<el-table-column prop="zbjzrq" label="招标截止日期" width="140"></el-table-column>
					<el-table-column prop="jfrq" label="交付日期" width="140"></el-table-column>
					<el-table-column prop="zbrmc" label="中标人" width="100"></el-table-column>
					<el-table-column prop="zbsj" label="中标时间" width="140"></el-table-column>
				</el-table>
				
				<el-table v-if="jsSource == 2" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column  label="承担人" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.rlzt=='0'?'区域承担':scope.row.rlzt=='1'?'分包扣除':''}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="djbh" label="单据编号" width="120"></el-table-column>
					<el-table-column prop="djzt" label="状态" width="100"></el-table-column>
					<el-table-column prop="kmbh" label="科目编号" width="100"></el-table-column>
					<el-table-column prop="kmmc" label="科目名称" min-width="250" show-overflow-tooltip></el-table-column>
					<el-table-column prop="je" label="金额" width="100"></el-table-column>
					<el-table-column prop="bxsqrq" label="申请日期" width="110"></el-table-column>
					<el-table-column prop="bxwcrq" label="完成日期" width="110"></el-table-column>
					<el-table-column prop="bxrmc" label="报销人" width="90"></el-table-column>
					<el-table-column prop="bxrbmmc" label="报销人部门" width="150" show-overflow-tooltip></el-table-column>
					<el-table-column prop="fycdrmc" label="承担人" width="90"></el-table-column>
					<el-table-column prop="fycdrbmmc" label="承担人部门" width="150" show-overflow-tooltip></el-table-column>
				</el-table>
				
				<br>
				<div slot="footer" text-right>
					<el-button size="mini" @click="dialogVisible = false">取 消</el-button>
					<el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {xxs} from '@/utils/util'
	export default {
	data() {
		return {
			dialogVisible: false,
			title:'',
			tableData: [],
			jsxx:{},//结算详情
			jssqData:{},//结算申请
			tdxxData: [],
			tbje: null,
			zbxx: '',
			// 承担费用
			cdradio: 0, //承担
			wids: [],
			jsSource:'',
			url:'',
			cdfyData:{}
			
		};
	},
	mounted() {
		this.queryJsxq();
	},
	methods: {
		// 计算总金额
		handleInputfy(type){
			switch (type){
				case '0':
				this.jsxx.jsssfy = (Number(this.jsxx.zbssfy) - Number(this.jsxx.yjsssfy) - Number(this.jsxx.ylssfy) - Number(!this.jsxx.rlssfy?0:this.jsxx.rlssfy));
					break;
				case '1':
				this.jsxx.jsekfy = (Number(this.jsxx.zbekfy) - Number(this.jsxx.yjsekfy) - Number(this.jsxx.ylekfy) - Number(!this.jsxx.rlekfy?0:this.jsxx.rlekfy));
					break;
				case '2':
				this.jsxx.jskbfy = (Number(this.jsxx.zbkbfy) - Number(this.jsxx.yjskbfy) - Number(this.jsxx.ylkbfy) - Number(!this.jsxx.rlkbfy?0:this.jsxx.rlkbfy));
					break;
				default:
					break;
			}
			this.jsxx.jsje = (this.jsxx.jsssfy + this.jsxx.jsekfy + this.jsxx.jskbfy + Number(this.jsxx.jlje) - Number(this.jsxx.cfje));
		},
		// 保存
		handleSave(){
			let xmtdData = [],
			    erfy = 0,
				kbfy = 0;
			this.tdxxData.forEach(ele=>{
				xmtdData.push({
					fbbh:ele.fbbh,
					lcbbbh:ele.lcbbh,
					lcbmc:ele.lcbmc,
					tdwid:ele.tdwid,
					cpbh:ele.cybh,
					cpmc:ele.cymc,
					jsssfy:ele.jsssfy,
					jsekfy:ele.jsekfy,
					jskbfy:ele.jskbfy
				})
				erfy += Number(ele.jsekfy);
				kbfy += Number(ele.jskbfy);
			})
			this.$message.close();
			// 个人结算二开费用=结算二开费用 * 5400 / 8800
			if((this.jsxx.jsekfy *  5400 / 8800) > erfy){
				this.$message({
					message:'金额错误',
					type:'warning'
				})
				return;
			}
			// 个人结算可变费用= 结算可变费用 * 70%; 
			if((this.jsxx.jskbfy *  0.7) > kbfy){
				this.$message({
					message:'金额错误',
					type:'warning'
				})
				return;
			}
			this.$post(this.API.saveJsFeeData,{
				fbbh:this.jssqData,
				lcbbh:this.jssqData.lcbbh,
				lcbmc:this.jssqData.lcbmc,
				jsje:this.jsxx.jsje,
				sm:xxs(this.jsxx.sm),
				jlsm:xxs(this.jsxx.jlsm),
				ylssfy:this.jsxx.ylssfy,
				jsekfy:this.jsxx.jsekfy,
				jskbfy:this.jsxx.jskbfy,
				rlssfy:this.jsxx.rlssfy,
				rlekfy:this.jsxx.rlekfy,
				rlkbfy:this.jsxx.rlkbfy,
				jsssfy:this.jsxx.jsssfy,
				jsekfy:this.jsxx.jsekfy,
				jskbfy:this.jsxx.jskbfy,
				teamFeeListZ:JSON.stringify(xmtdData)
			}).then(res=>{
				if(res.state == 'success'){
					this.$message({
						message:'保存成功',
						type:'success'
					})
					this.jsxx.jszt = 1;
				}else{
					this.$message({
						message:res.msg,
						type:'error'
					})
				}
			})
		},
		
		// 批量设置
		handleSelectionChange(val){
			val.forEach(ele=>{
				this.wids.push(ele.wid);
			})
		},
		handleMultipleSet(){
			this.$post(this.API.batchSetJsFySource,{
				wids:this.wids.join(','),
				jssqwid:this.jssqData.wid,
				cdlx:this.cdradio,
				jsFySource:this.jsSource
			}).then(res=>{
				if(res.state == 'success'){
					this.$message({
						message:'保存成功',
						type:'success'
					})
					this.querySettleMoney(this.jsSource);
				}else{
					this.$message({
						message:res.msg,
						type:'error'
					})
				}
			})
		},
		// 计算结算费用
		handleSettleMoney(data){
			this.jsSource = data;
			switch (data){
				case '0':
					this.title = '本次结算实施费用';
					this.url = this.API.querySsfy;
					break;
				case '1':
					this.title = '本次结算二开费用';
					this.url = this.API.queryEkfy;
					break;
				case '2':
					this.title = '本次结算可变费用';
					this.url = this.API.queryBxfy;
					break;
				default:
					break;
			}
			this.querySettleMoney(data);
			this.dialogVisible = !this.dialogVisible;
		},
		// 金额计算
		querySettleMoney(type){
			this.$get(this.url,{
				xmbh:'UK19138',//this.jsxx.xmbh,
				jssqwid:this.jssqData.wid
			}).then(res=>{
				if(res.state == 'success'){
						this.cdfyData = res.data;
						this.tableData = !res.data.tableData?[]:es.data.tableData;
						if(type == '0'){
							this.jsxx.rlssfy = !this.cdfyData.zje?0:this.cdfyData.zje;
						}else if(type == '1'){
							this.jsxx.rlekfy = !this.cdfyData.zje?0:this.cdfyData.zje;
						}else{
							this.jsxx.rlkbfy = !this.cdfyData.zje?0:this.cdfyData.zje;
						}
						this.handleInputfy(type);
				}else{
					this.$message({
						message:res.msg,
						type:'error'
					})
				}
			})
		},
		handleChangeInput(index,type) {
			switch (type){
				case 'ss':
					break;
				default:
					break;
			}
			this.tdxxData[index].jsje = Number(this.tdxxData[index].jsssfy) + Number(this.tdxxData[index].jsekfy) + Number(this.tdxxData[index].jskbfy);
		},
		
		// 获取结算申请详情
		queryJsxq(){
			this.$get(this.API.queryJsxq,{
				jssqwid:this.$route.query.wid,
				fbbh:this.$route.query.fbbh
			}).then(res=>{
				if(res.state == 'success'){
					this.jssqData = res.data.jssqData;
					this.tdxxData = !res.data.jstdData?[]:res.data.jstdData;
					this.jsxx = res.data.jsxx;
				}
			})
		}
	},
	activated() {},
	components: {}
};
</script>
<style scoped>
.jsdetail_container {
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
	width: 180px;
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

.el-icon-edit-outline:hover{
	cursor: pointer;
}
</style>
