<template>
	<div>
		<div class="jsdetail_container">
			<div class="fb_info">
				<div>
					<div text-right v-if="jssqData.jszt == '02'||jssqData.jszt == '03'||jssqData.jszt == '04'">
						<el-button type="primary" @click="handleAudit('1')">审核通过</el-button>
						<el-button type="danger" @click="handleAudit('0')">审核不通过</el-button>
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
								<td>{{jssqData.lcbmc}}</td>
							</tr>
							<tr>
								<th>申请说明</th>
								<td colspan="5" height="80px">{{jssqData.sm}}</td>
							</tr>
							<tr>
								<th>审核人</th>
								<td>{{ jssqData.shrmc }}</td>
								<th>审核时间</th>
								<td colspan="3">{{ jssqData.shrq }}</td>
							</tr>
							<tr>
								<th>审核意见</th>
								<td colspan="5">{{ jssqData.shsm }}</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>本次结算信息</h5>
						<table>
							<tr>
								<th>本次结算总金额（元）</th>
								<td colspan="5">{{jsxx.sjzfy}}</td>
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
								<td>{{jsxx.ylssfy}}</td>
								<th>预留二开费用（元）</th>
								<td>{{jsxx.ylekfy}}</td>
								<th>预留可变费用（元）</th>
								<td>{{jsxx.ylkbfy}}</td>
							</tr>
							<tr>
								<th>实施调用费用（元）</th>
								<td>{{!jsxx.rlssfy?0:jsxx.rlssfy}}</i></td>
								<th>二开调用费用（元）</th>
								<td>{{!jsxx.rlekfy?0:jsxx.rlekfy}}</td>
								<th>可变报销费用（元）</th>
								<td>{{!jsxx.rlkbfy?0:jsxx.rlkbfy}}</td>
							</tr>
							<tr>
								<th>本次结算实施费用（元）</th>
								<td>{{jsxx.sjssfy}}</td>
								<th>本次结算二开费用（元）</th>
								<td>{{jsxx.sjekfy}}</td>
								<th>本次结算可变费用（元）</th>
								<td>{{jsxx.sjkbfy}}</td>
							</tr>
							<tr>
								<th>预留说明</th>
								<td colspan="5">{{jsxx.sm}}</td>
							</tr>
							<tr>
								<th>奖励金额（元）</th>
								<td>{{jsxx.jlje}}</td>
								<th>惩罚金额（元）</th>
								<td colspan="3">{{jsxx.cfje}}</td>
							</tr>
							<tr>
								<th>奖惩说明</th>
								<td colspan="5">{{jsxx.jlsm}}</td>
							</tr>
						</table>
					</div>
					 <div>
					  <h5>个人结算信息</h5>
					  <table class="table_center">
					    <tr>
					      <th>工号</th>
					      <th>姓名</th>
					      <th>负责业务线</th>
					      <th>结算实施金额</th>
					      <th>结算二开金额</th>
					      <th>结算可变金额</th>
						  <th>奖励金额</th>
						  <th>惩罚金额</th>
					      <th>合计</th>
						  <th>折算实施费用</th>
						  <th>折算二开费用</th>
						  <th>折算可变费用</th>
						  <th>折算合计费用</th>
					    </tr>
					    <tr v-for="(item,index) in tdywyData" :key="index">
					      <td :colspan="item.cybh == '合计'?3:0">{{item.cybh}}</td>
					      <td v-if="item.cybh != '合计'">{{item.cymc}}</td>
					      <td v-if="item.cybh != '合计'">{{item.ywymc}}</td>
					      <td>{{item.jsssfy}}</td>
					      <td>{{item.jsekfy}}</td>
					      <td>{{item.jskbfy}}</td>
						  <td>{{item.jlje}}</td>
						  <td>{{item.cfje}}</td>
					      <td>{{!item.jsje?0:item.jsje}}</td>
						  <td>{{ !item.zsssfy?0:item.zsssfy }}</td>
							<td>{{ !item.zsekfy?0:item.zsekfy }}</td>
							<td>{{ !item.zskbfy?0:item.zskbfy }}</td>
							<td>{{ !item.zsje?0:item.zsje }}</td>
					    </tr>
					    <tr v-if="!tdywyData.length">
					      <td colspan="7">暂无内容</td>
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
								<th>折算实施费用</th>
								<th>折算二开费用</th>
								<th>折算可变费用</th>
								<th>折算合计费用</th>
							</tr>
							<tr v-if="!tdxxData.length">
								<td colspan="14">暂无内容</td>
							</tr>
							<tr v-for="(item, index) in tdxxData" :key="index">
								<td>{{item.ywymc}}</td>
								<td>{{item.cpmc}}</td>
								<td>{{item.cymc}}</td>
								<td>{{item.zbssfy}}</td>
								<td>{{item.yjsssfy}}</td>
								<td>{{item.jsssfy}}</td>
								<td>{{item.zbekfy}}</td>
								<td>{{item.yjsekfy}}</td>
								<td>{{item.jsekfy}}</td>
								<td>{{item.zbkbfy}}</td>
								<td>{{item.yjskbfy}}</td>
								<td>{{item.jskbfy}}</td>
								<td>{{ !item.jsje?0:item.jsje }}</td>
								<td>{{ !item.zsssfy?0:item.zsssfy }}</td>
								<td>{{ !item.zsekfy?0:item.zsekfy }}</td>
								<td>{{ !item.zskbfy?0:item.zskbfy }}</td>
								<td>{{ !item.zsje?0:item.zsje }}</td>
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
			dialogVisible: false,
			title:'',
			cdradio: 1, //承担
			tableData: [],
			multipleSelection: [],
			jsxx:{},//结算详情
			jssqData:{},//结算申请
			tdxxData: [],
			tdywyData:[],
			tbje: null,
			zbxx: '',
			
		};
	},
	mounted() {
		this.queryJsxq();
	},
	methods: {
		handleAudit(data){
			 // 审核通过
			 if(data == '1'){
				this.jsReview(data);
			 }else{
				 this.$prompt('请输入说明内容', '提示', {
				   confirmButtonText: '确定',
				   cancelButtonText: '取消',
				   inputPattern: /\S/,
				   inputErrorMessage: '请输入说明内容',
				   inputPlaceholder:'请输入说明内容'
				 }).then(({ value }) => {
				   this.jsReview(data,value);
				 }).catch(() => {});
			 }
		},
		// 结算审核
		jsReview(shjg,sm){
			this.$post(this.API.jsReview,{
				jssqwid:this.jssqData.wid,
				shjg:shjg,
				sm:sm||""
			}).then(res=>{
				if(res.state == 'success'){
					this.$message({
					  message: shjg=='1'?'已提交为 "审核通过" ~':'已提交为 "审核不通过" ~',
					  type: 'success'
					});
					this.queryJsxq();
				}else{
					this.$message({
					  message: res.msg,
					  type: 'error'
					});
				}
			})
		},
		// 结算详情
		queryJsxq(){
			this.$get(this.API.queryJsxq,{
				jssqwid:this.$route.query.wid,
				fbbh:this.$route.query.fbbh
			}).then(res=>{
				if(res.state == 'success'){
					this.jssqData = res.data.jssqData;
					this.tdxxData = !res.data.jstdData?[]:res.data.jstdData;
					this.jsxx = res.data.jsxx;
					this.tdywyData = !res.data.jstdYwyData ? [] : res.data.jstdYwyData;
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
