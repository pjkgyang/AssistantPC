<template>
	<div style="padding:20px;">
		<div class="pannelPaddingBg-10">
			<div>
				<p><span class="filter-weight tips">投标说明：</span> {{tbxxData.tbly}}</p>
			</div>
			<table border width="100%" class="tb-table ">
				<tr>
					<th>科目名称</th>
					<th>总金额（元）</th>
				</tr>
				<tr>
					<td>实施费用</td>
					<td>{{ tbxxData.ssfy }}</td>
				</tr>
				<tr>
					<td>二开费用</td>
					<td>{{ tbxxData.ekfy }}</td>
				</tr>
				<tr>
					<td>可变费用</td>
					<td>{{ tbxxData.kbfy }}</td>
				</tr>
			</table>

			<br />
			<div>
				<span class="filter-weight tips">创建团队：</span>
				<el-table :data="userData" border style="width: 100%">
					<el-table-column prop="usercode" label="工号" width="100"></el-table-column>
					<el-table-column prop="username" label="姓名" width="100"></el-table-column>
					<el-table-column prop="ywx" label="负责业务线"></el-table-column>
					<el-table-column prop="ssfy" label="分配实施金额"></el-table-column>
					<el-table-column prop="ekfy" label="分配二开金额"></el-table-column>
					<el-table-column prop="kbfy" label="分配可变金额"></el-table-column>
				</el-table>
			</div>
			<div>
				<span class="filter-weight tips" style="margin: 10px 0">团队分配：</span>
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
					<tr v-for="(item, index) in ywyData" :key="index">
						<td>{{ item.ywymc }}</td>
						<td>{{ item.cpmc }}</td>
						<td>{{ item.zb }}</td>
						<td>{{ item.htsm }}</td>
						<td>{{ item.xmlb }}</td>
						<td width="100px" style="position: relative;">
							{{ item.zrrxm }}
						</td>
						<td width="80px">{{ item.ssfy }}</td>
						<td width="80px">{{ item.ekfy }}</td>
						<td width="80px">{{ item.kbfy }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import { tbxq } from '@/api/toubiao.js';
	export default {
		data(){
			return {
				tbxxData:{},
				userData:[],
				ywyData:[]
			}
		},
		methods:{
			
		},
		mounted(){
			tbxq({fbbh:this.$route.query.fbbh}).then(({data})=>{
				if(data.state == 'success'){
					this.ywyData = data.data.htnrfy;
					if(!!data.data.tbxx){
						this.tbxxData = data.data.tbxx
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
		}
	}
</script>

<style scoped>
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
		text-align: center;
		padding: 5px 0 !important;
	}
	.tb-table td:nth-of-type(1) {
		padding: 0 10px;
	}
	.tb-table td input {
		width: 100%;
		padding: 5px;
	}
	.tips{
		display: inline-block;
		margin-bottom: 10px !important;
	}
</style>
