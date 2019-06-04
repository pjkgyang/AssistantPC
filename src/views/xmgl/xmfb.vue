<template>
	<div>
		<div class="fbdetail_container">
			<div class="fb_info">
				<div>
					<h4>合同内容</h4>
					<div>
						<div text-right v-if="((!htjbxx.fbzt || htjbxx.fbzt=='02') && !this.$route.query.fbbh) || (!!this.$route.query.fbbh) ">
							<el-button size="small" style="margin: 10px 0;" type="danger" @click="handleSaveFb">保存</el-button>
						</div>
						<h5>分包基本信息</h5>
						<table>
							<tr>
								<th>项目编号</th>
								<td>{{ $route.query.xmbh }}</td>
								<th>项目名称</th>
								<td colspan="3">{{ $route.query.xmmc }}</td>
							</tr>
							<tr>
								<th>分包编号</th>
								<td>{{htjbxx.fbbh}}</td>
								<th class="before-require">分包名称</th>
								<td colspan="3"><input v-model="htjbxx.fbmc" style="width: 100%;height:25px" placeholder="请输入分包名称"></input></td>
							</tr>
							<tr>
								<th>分包日期</th>
								<td>{{htjbxx.fbrq}}
									<!-- <el-date-picker
									  readonly
									  style="width: 100%;"
									  size="mini"
									  v-model="htjbxx.fbrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker> -->
								</td>
								<th  class="before-require">计划开始日期</th>
								<td><el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="htjbxx.jhksrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker></td>
								<th class="before-require">计划结束日期</th>
								<td><el-date-picker
									  style="width: 100%;"
									  size="mini"
									  v-model="htjbxx.jhjsrq"
									  type="date"
									  placeholder="选择日期"
									  format="yyyy 年 MM 月 dd 日"
									  value-format="yyyy-MM-dd">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<th >实施费用（元）</th>
								<td>{{ !htjbxx.ssfy?0:htjbxx.ssfy }}</td>
								<th>二开费用（元）</th>
								<td>{{ !htjbxx.ekfy?0:htjbxx.ekfy }}</td>
								<th  class="before-require">可变费用（元）</th>
								<td><input v-model="htjbxx.kbfy" type="text" style="width:100%;height: 25px;" placeholder="请输入金额"></td>
							</tr>
							<tr >
								<th>实施费用标准（元）</th>
								<td>{{ htjbxx.ssbz }}</td>
								<th>二开费用标准（元）</th>
								<td>{{ htjbxx.ekbz }}</td>
								<th>分包总费用</th>
								<td>{{ htjbxx.sjzfy = Number(htjbxx.ssfy)+Number(htjbxx.ekfy)+Number(htjbxx.kbfy)}}</td>
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
						  <el-table-column prop="htssry" label="实施人月(合同)" min-width="100"></el-table-column>
						  <el-table-column prop="fbssry" label="实施人月(分包)" min-width="100"></el-table-column>
						  <el-table-column prop="htekry" label="二开人月(合同)" min-width="100"></el-table-column>
						  <el-table-column prop="fbekry" label="二开人月(分包)" min-width="100"></el-table-column>
						  <el-table-column prop="ssfy" label="实施费用" min-width="100"></el-table-column>
						  <el-table-column prop="ekfy" label="二开费用" min-width="100"></el-table-column>
						</el-table>
					</div>
					<div>
						<h5>分包内容</h5>
						<el-table
						  :data="fbData"
						  border
						  style="width: 100%">
						  <el-table-column prop="ywymc" label="业务域" min-width="130" fixed="left" show-overflow-tooltip></el-table-column>
						  <el-table-column prop="cpmc" label="合同内容" min-width="130" fixed="left" show-overflow-tooltip></el-table-column>
						  <el-table-column prop="zb" label="占比(%)" width="80"></el-table-column>
						  <el-table-column prop="htsm" label="内容说明"  min-width="130" show-overflow-tooltip></el-table-column>
						  <el-table-column prop="xmlb" label="项目类别" width="90" show-overflow-tooltip></el-table-column>
						  <el-table-column prop="htssry" label="实施人月(合同)" min-width="80"></el-table-column>
						  <el-table-column label="实施人月(分包)" min-width="80">
							<template slot-scope="scope">
								<input v-model="scope.row.fbssry"  type="text" style="width:100%;height:25px" placeholder="请输入金额" @input="handleInputSSry(scope.row.ywybh,scope.$index)">
							</template>   
						  </el-table-column>
						  <el-table-column prop="htekry" label="二开人月(合同)" min-width="80"></el-table-column>
						  <el-table-column  label="二开人月(分包)" min-width="80">
							<template slot-scope="scope">
								<input v-model="scope.row.fbekry"  type="text" style="width:100%;height:25px" placeholder="请输入金额" @input="handleInputEKry(scope.row.ywybh,scope.$index)">
							</template>  
						  </el-table-column>
						  <el-table-column prop="ssfy" label="实施费用" min-width="90"></el-table-column>
						  <el-table-column prop="ekfy" label="二开费用" min-width="90"></el-table-column>
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
	import {GetDateStr} from '@/utils/util'
	export default {
	data() {
		return {
			htjbxx:{},
			fbData:[],//分包信息
			ywyData: [],
			ywyTotal:{},//业务域数据合计
			fbnrlist:[],
		};
	},
	mounted() {
		this.queryFbYwxData();
	},
	methods: {
		handleSaveFb(){
			if(!this.validate()) return;
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
						this.queryFbYwxData();
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
		handleInputSSry(bh,index){
			let ssryTotal = 0, //业务域分包 实施人月合计
				fbssfy = 0,
			    ssry = 0;      //分包内容 实施人月合计
			this.htjbxx.ssfy = 0;
			this.fbData.forEach((ele,i,arr)=>{
				if(i == index){
					this.fbData[index].ssfy = Number(ele.fbssry) * this.htjbxx.ssbz;
				}
				if(ele.ywybh == bh){
				   ssry += Number(ele.fbssry  * 1000); //计算实施人月
				   this.htjbxx.ssfy += (Number(ele.fbssry) * this.htjbxx.ssbz); //实施总费用（分包基本信息）实施人月 * 实施标准
				}
			});
			
			this.ywyData.forEach(ele=>{
				if(ele.ywybh == bh){
					ele.fbssry = ssry / 1000;
					ele.ssfy = this.htjbxx.ssfy; //计算实施费用
				}
				if(!!ele.ywybh){
					ssryTotal += !ele.fbssry?0:Number(ele.fbssry * 1000);
					fbssfy += ele.ssfy;
				}
				if(!ele.ywybh){
					ele.fbssry = ssryTotal/1000; //实施人月
					ele.ssfy = fbssfy;//实施费用
				}
			})
			this.htjbxx.ssfy = fbssfy;
		},
		// 计算二开人月
		handleInputEKry(bh,index){
			let ekryTotal = 0, //业务域分包 二开人月合计
				erssfy = 0,
			    ekry = 0;//分包内容 二开人月合计
			this.htjbxx.ekfy = 0;
			this.fbData.forEach((ele,i,arr)=>{
				if(i == index){
					this.fbData[index].ekfy = Number(ele.fbekry) * this.htjbxx.ekbz;
				}
				if(ele.ywybh == bh){
				  ekry += Number(ele.fbekry * 1000); //计算二开人月
				  this.htjbxx.ekfy += (Number(ele.fbekry) * this.htjbxx.ekbz); //二开总费用（分包基本信息）二开人月 * 二开标准
				}
			});
			this.ywyData.forEach(ele=>{
				if(ele.ywybh == bh){
					ele.fbekry = ekry / 1000;	//计算二开人月
					ele.ekfy = this.htjbxx.ekfy; //计算二开费用
				}
				if(!!ele.ywybh){
					ekryTotal += !ele.fbekry?0:Number(ele.fbekry * 1000);
					erssfy += ele.ekfy;
				}
				if(!ele.ywybh){
					ele.fbekry = ekryTotal/1000;
					ele.ekfy = erssfy; // 实施费用
				}
			})
			this.htjbxx.ekfy = erssfy;
		},
		
		// 查询分包
		queryFbYwxData(){
			this.$get(this.API.queryFbYwxData,{
				xmbh:this.$route.query.xmbh,
				fbbh:!this.$route.query.fbbh?'':this.$route.query.fbbh
			}).then(res=>{
				if(res.state == 'success'){
					this.htjbxx = res.data.fbxx;
					this.htjbxx.kbfy = !this.htjbxx.kbfy?0:this.htjbxx.kbfy;
					this.htjbxx.fbrq = !this.htjbxx.fbrq?GetDateStr(0):this.htjbxx.fbrq;
					
					this.ywyData = !res.data.fbywy?[]:res.data.fbywy;
					this.fbData = res.data.fbnr;
					
					if(!!this.ywyData.length){
						this.htjbxx.ssfy = this.ywyData[this.ywyData.length - 1].ssfy;
						this.htjbxx.ekfy = this.ywyData[this.ywyData.length - 1].ekfy;
					}
					
				}else{
					this.$message({
					  message: res.msg,
					  type: 'error'
					});
				}
			})
		},
		
		validate(){
			if(!this.htjbxx.fbmc){
				 this.$message({ message: '请输入分包名称',type: 'warning'});
				return false;
			}
			if(!this.htjbxx.jhksrq){
				this.$message({ message: '请选择计划开始日期',type: 'warning'});
				return false;
			}
			if(!this.htjbxx.jhjsrq){
				this.$message({ message: '请选择计划结束日期',type: 'warning'});
				return false;
			}
			if(!this.htjbxx.kbfy){
				this.$message({ message: '请填写可变费用',type: 'warning'});
				return false;
			}
			return true;
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
	padding:0 10px;
	height: 30px;
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
