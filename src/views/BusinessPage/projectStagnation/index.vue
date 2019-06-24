<template>
	<div class="pd-10">
		<div class="pannelPaddingBg-10">
			<div>
				<div>
					<span class="query-title">高级查询:</span>
					<el-input
						size="mini"
						style="width:463px"
						placeholder="请输入项目编号/项目名称/里程碑描述/项目内容/项目经理/责任人"
						v-model="formdata.keyword"
						@change="handleSearchLcb"
					></el-input>
					&#x3000;
					<el-button size="mini" type="primary" @click="handleSearchLcb">查询</el-button>
				</div>

				<div class="mg-12">
					<p class="query-title">日期:</p>
					<p class="query-list">
						<el-date-picker
							size="mini"
							v-model="formdata.ksrq"
							type="date"
							placeholder="开始日期"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
						></el-date-picker>
						至
						<el-date-picker
							size="mini"
							v-model="formdata.jsrq"
							type="date"
							placeholder="结束日期"
							format="yyyy 年 MM 月 dd 日"
							value-format="yyyy-MM-dd"
						></el-date-picker>
					</p>
				</div>

				<div>
					<p class="query-title">申请类别:</p>
					<el-radio-group v-model="formdata.sqlb">
						<el-radio :label="0">项目停滞</el-radio>
						<el-radio :label="1">项目重启</el-radio>
					</el-radio-group>
				</div>

				<div>
					<p class="query-title">状态:</p>
					<p class="query-list">
						<span v-for="(zt, index) in ztList" :key="index" :class="{ 'bg-active': formdata.zt == zt.id }">{{ zt.mc }}</span>
					</p>
				</div>
			</div>

			<div class="pd-10">
				<div class="mg-12">
					<el-button size="mini" type="primary" @click="handleApply('tz')">停滞申请</el-button>
					<el-button size="mini" type="danger" @click="handleApply('cq')">停滞重启</el-button>
					<el-button size="mini" type="primary">导出</el-button>
				</div>
				<el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column
					  fixed="left"
					  label="操作"
					  width="220">
					  <template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">审批通过</el-button>
						<el-button type="text" size="small">审批不通过</el-button>
						<el-button type="text" size="small">查看进度</el-button>
					  </template>
					</el-table-column>
					<el-table-column prop="date" label="项目名称" min-width="220"></el-table-column>
					<el-table-column prop="name" label="学校"  min-width="220"></el-table-column>
					<el-table-column prop="name" label="项目类别" width="140"></el-table-column>
					<el-table-column prop="date" label="项目状态" width="180"></el-table-column>
					<el-table-column prop="name" label="整体状态" width="180"></el-table-column>
					<el-table-column prop="name" label="客户经理" width="110"></el-table-column>
					<el-table-column prop="date" label="项目经理" width="110"></el-table-column>
					<el-table-column prop="name" label="甲方责任人" width="110"></el-table-column>
					<el-table-column prop="name" label="停滞截止日期" width="130"></el-table-column>
					<el-table-column prop="date" label="申请类别" width="130"></el-table-column>
					<el-table-column prop="name" label="申请人" width="110"></el-table-column>
					<el-table-column prop="name" label="状态" width="110"></el-table-column>
					<el-table-column prop="name" label="合同金额" width="140"></el-table-column>
					<el-table-column prop="name" label="合同编号" width="140"></el-table-column>
					<el-table-column prop="name" label="项目编号" width="140"></el-table-column>
					<el-table-column prop="name" label="合同性质" width="120"></el-table-column>
				</el-table>
			</div>
		</div>
		
		
		<tzDialog :show.sync="show" :type="type"></tzDialog>
	</div>
</template>

<script>
	import tzDialog from '@/components/dialog/xmtz/tz-dialog.vue';
    export default {
	data() {
		return {
			show:false,
			ztList: [{ mc: '发起', id: 0 }, { mc: '审批中', id: 1 }, { mc: '已完成', id: 2 }],
			formdata: {
				keyword: '',
				ksrq: '',
				jsrq: '',
				sqlb:0,
				zt: 0
			},
			type:'tz',//停滞 重启
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}
			]
		};
	},
	mounted(){},
	methods: {
		handleSearchLcb(){
			
		},
		handleSelectionChange() {
			
		},
		// 停滞，重启
		handleApply(data){
			this.type = data;
			this.show = true;
		}
	},
	components: {
		tzDialog
	},
};
</script>

<style></style>
