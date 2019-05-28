<template>
	<div>
		<div class="fbdetail_container">
			<div class="fb_info">
				<div>
					<h4>合同内容</h4>
					<div>
						<h5>分包基本信息</h5>
						<div text-right v-if="!!isSave">
							<el-button size="small" style="margin: 10px 0;" type="danger" @click="handleSaveFb">保存</el-button>
						</div>
						<table>
							<tr>
								<th>项目编号</th>
								<td>{{ $route.query.xmbh }}</td>
								<th>项目名称</th>
								<td colspan="3">{{ $route.query.xmmc }}</td>
							</tr>
							<tr>
								<th>分包名称</th>
								<td colspan="5">
							  	   <input v-model="htjbxx.fbmc" style="width: 100%;" placeholder="请输入分包名称"></input>
								</td>
							</tr>
							<tr>
								<th>分包日期</th>
								<td>
									<el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="htjbxx.fbrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker>
								</td>
								<th>计划开始日期</th>
								<td><el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="htjbxx.jhksrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker></td>
								<th>计划结束日期</th>
								<td><el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="htjbxx.jhjsrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker></td>
							</tr>
							<tr>
								<th >实施费用（元）</th>
								<td>{{ !htjbxx.ssfy?0:htjbxx.ssfy }}</td>
								<th>二开费用（元）</th>
								<td>{{ !htjbxx.ekfy?0:htjbxx.ekfy }}</td>
								<th>可变费用（元）</th>
								<td><input v-model="htjbxx.kbfy" type="text" style="width:100%" placeholder="请输入金额"></td>
							</tr>
							<tr >
								<th>实施费用标准（元）</th>
								<td>{{ htjbxx.ssbz }}</td>
								<th>二开费用标准（元）</th>
								<td>{{ htjbxx.ekbz }}</td>
								<th></th>
								<td></td>
							</tr>
							<tr height="100px">
								<th rowspan="2">分包说明</th>
								<td colspan="5" rowspan="2">
								    <textarea v-model="htjbxx.fbsm" style="width:100%;padding:4px 8px;resize: none;" rows="4" placeholder="请输入说明"></textarea>
								</td>
							</tr>
						</table>
					</div>
					<div>
						<h5>业务域分包统计</h5>
						 <el-table
						  :data="ywyData"
						  border
						  style="width: 100%">
						  <el-table-column prop="ywymc" label="业务域" min-width="200"></el-table-column>
						  <el-table-column prop="zb" label="占比" width="110"></el-table-column>
						  <el-table-column prop="htssry" label="实施人月(合同)" min-width="140"></el-table-column>
						  <el-table-column prop="ssckbz" label="实施参考标准" min-width="140"></el-table-column>
						  <el-table-column prop="fbssry" label="实施人月(分包)" min-width="140"></el-table-column>
						  <el-table-column prop="htekry" label="二开人月(合同)" min-width="140"></el-table-column>
						  <el-table-column prop="fbekry" label="二开人月(分包)" min-width="140"></el-table-column>
						</el-table>
					</div>
					<div>
						<h5>分包内容</h5>
						<el-table
						  :data="fbData"
						  border
						  style="width: 100%">
						  <el-table-column prop="ywymc" label="业务域" min-width="200" show-overflow-tooltip></el-table-column>
						  <el-table-column prop="cpmc" label="合同内容" width="160" show-overflow-tooltip></el-table-column>
						  <el-table-column prop="zb" label="占比(%)" width="90"></el-table-column>
						  <el-table-column prop="htsm" label="说明"  width="160" show-overflow-tooltip></el-table-column>
						  <el-table-column prop="xmlb" label="项目类别" width="100"></el-table-column>
						  
						  <el-table-column prop="htssry" label="实施人月(合同)" min-width="90"></el-table-column>
						  <el-table-column prop="ssckbz" label="实施参考标准" min-width="90"></el-table-column>
						  <el-table-column  label="实施人月(分包)" min-width="90">
							<template slot-scope="scope">
								<input v-model="scope.row.fbssry"  type="text" style="width:100%" placeholder="请输入金额" @input="handleInputSSry(scope.row.ywybh)">
							</template>   
						  </el-table-column>
						  <el-table-column prop="htekry" label="二开人月(合同)" min-width="90"></el-table-column>
						  <el-table-column  label="二开人月(分包)" min-width="90">
							<template slot-scope="scope">
								<input v-model="scope.row.fbekry"  type="text" style="width:100%" placeholder="请输入金额" @input="handleInputEKry(scope.row.ywybh)">
							</template>  
						  </el-table-column>
						  <el-table-column  label="说明" min-width="160" >
							  <template slot-scope="scope">
								<textarea v-model="scope.row.fbsm" style="width:100%;padding:4px 8px;" placeholder="请输入说明"></textarea>
							  </template>
						  </el-table-column>
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
			htjbxx:{},
			fbData:[],//分包信息
			ywyData: [],
			ywyTotal:{},//业务域数据合计
			fbnrlist:[],
			isSave:true
		};
	},
	mounted() {
		this.queryFbYwxData();
	},
	methods: {
		handleSaveFb(){
			this.fbnrlist = [];
			this.fbData.forEach(ele=>{
				this.fbnrlist.push({
					htnrwid:ele.htnrwid,
					fbssry:Number(ele.fbssry),
					fbekry:Number(ele.fbekry),
					fbsm:ele.fbsm
				})
			})
			this.$post(this.API.saveFbxx,{
				xmbh:this.$route.query.xmbh,
				fbbh:!this.htjbxx.fbbh?'':this.htjbxx.fbbh,
				fbmc:this.htjbxx.fbmc,
				fbrq:this.htjbxx.fbrq,
				jhksrq:this.htjbxx.jhksrq,
				jhjsrq:this.htjbxx.jhjsrq,
				ssfy:this.htjbxx.ssfy,
				ekfy:this.htjbxx.ekfy,
				kbfy:this.htjbxx.kbfy,
				ssbz:this.htjbxx.ssbz,
				ekbz:this.htjbxx.ekbz,
				fbsm:this.htjbxx.fbsm,
				fbnrlist:JSON.stringify(this.fbnrlist)
			}).then(res=>{
				if(res.state == 'success'){
					this.$message({
						message:'保存成功~',
						type:'success'
					})
					if(!this.$route.query.fbbh){
						this.isSave = false;
					}
				}else{
					this.$message({
						message:res.msg,
						type:'error'
					})
				}
			})
		},
		// 计算实施人月
		handleInputSSry(bh){
			let ssryTotal = 0;
			this.htjbxx.ssfy = 0;
			this.fbData.forEach(ele=>{
				if(ele.ywybh == bh){
				  this.htjbxx.ssfy += Number(ele.fbssry)
				}
			});
			this.ywyData.forEach(ele=>{
				if(ele.ywybh == bh){
					ele.fbssry = this.htjbxx.ssfy;
				}
				if(!!ele.ywybh){
					ssryTotal += !ele.fbssry?0:ele.fbssry;
				}
				if(!ele.ywybh){
					ele.fbssry = this.htjbxx.ssfy =  ssryTotal;
				}
			})
		},
		// 计算二开人月
		handleInputEKry(bh){
			let ekryTotal = 0;
			this.htjbxx.ekfy = 0;
			this.fbData.forEach(ele=>{
				if(ele.ywybh == bh){
				  this.htjbxx.ekfy += Number(ele.fbekry)
				}
			});
			this.ywyData.forEach(ele=>{
				if(ele.ywybh == bh){
					ele.fbekry = this.htjbxx.ekfy;
				}
				if(!!ele.ywybh){
					ekryTotal += !ele.fbekry?0:ele.fbekry;
				}
				if(!ele.ywybh){
					ele.fbekry = this.htjbxx.ekfy = ekryTotal;
				}
			})
		},
		queryFbYwxData(){
			this.$get(this.API.queryFbYwxData,{
				xmbh:this.$route.query.xmbh,
				fbbh:!this.$route.query.fbbh?'':this.$route.query.fbbh
			}).then(res=>{
				if(res.state == 'success'){
					this.htjbxx = res.data.fbxx;
					this.htjbxx.kbfy = !this.htjbxx.kbfy?0:this.htjbxx.kbfy;
					this.ywyData = res.data.fbywy;
					this.fbData = res.data.fbnr;
				}else{
					this.$message({
					  message: res.msg,
					  type: 'error'
					});
				}
			})
		}
	},
	activated() {
	
	},
	components: {  }
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
	font-weight: 700;;
}

.fb_info a {
	color: #2196f3;
}

.fb_info table {
	width: 100%;
	border-collapse: collapse;
	border: 1px solid #E9ECF4;
	font-size: 14px;
}
.fb_info table th {
	font-size: 14px;
	text-align: center;
	width: 150px;
	background: #F4F6F9;
	color: #4d4d4d;
}
.fb_info table td,
.fb_info table th {
	text-align: left;
	border: 1px solid #E9ECF4 !important;
	padding: 5px 10px;
}
.fb_info h4 {
	border-left: 5px solid #cd69c9;
	padding: 0 5px;
	font-weight: 700;
	margin-bottom: 10px !important;
}

.table_center tr th,.table_center tr td{
	text-align: center;
}
</style>
