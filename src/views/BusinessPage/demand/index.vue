<template>
	<div class="demand-pannel" >
		<div  class="list pull-left">
			<div class="pannelPaddingBg-10 ">
				<div>
					<span class="query-title">
						<span :class="{ 'isshown-query': true, 'el-icon-arrow-up': !queryLJshow, 'el-icon-arrow-down': queryLJshow }" @click="handleQueryShow"></span>
						&nbsp;高级查询
					</span>
					<el-input
						v-model="filterData.keyword"
						style="width:493px;"
						size="mini"
						placeholder="请输入问题提出人姓名/工号/手机号/标题/项目编号/项目名称/学校名称"
						@change="handleQuery"
					></el-input>
					&#x3000;
					<el-button type="primary" size="mini" @click="handleQuery">查询</el-button>
				</div>
				<div v-show="queryLJshow">
					<div class="mg-12">
						<p class="query-title">需求分类:</p>
						<p class="query-list">
							<span data-type="" :class="{ 'bg-active': filterData.xqfl == '' }">全部</span>
							<span v-for="(xqfl, index) in xqflList" :data-type="xqfl.label" :key="index" :class="{ 'bg-active': filterData.wtfl == xqfl.label }">
								{{ xqfl.mc }}
							</span>
						</p>
					</div>
					<div>
						<p class="query-title">查询状态:</p>
						<p class="query-list">
							<span data-type="" :class="{ 'bg-active': filterData.xqfl == '' }">全部</span>
							<span v-for="(xqfl, index) in xqflList" :data-type="xqfl.label" :key="index" :class="{ 'bg-active': filterData.wtfl == xqfl.label }">
								{{ xqfl.mc }}
							</span>
						</p>
					</div>
					<div class="mg-12">
						<p class="query-title">需求类型:</p>
						<p class="query-list">
							<span data-type="" :class="{ 'bg-active': filterData.xqfl == '' }">全部</span>
							<span v-for="(xqfl, index) in xqflList" :data-type="xqfl.label" :key="index" :class="{ 'bg-active': filterData.wtfl == xqfl.label }">
								{{ xqfl.mc }}
							</span>
						</p>
					</div>
					<div>
						<p class="query-title">产品:</p>
						<p class="query-list">
							<span data-type="" :class="{ 'bg-active': filterData.xqfl == '' }">全部</span>
							<span v-for="(xqfl, index) in xqflList" :data-type="xqfl.label" :key="index" :class="{ 'bg-active': filterData.wtfl == xqfl.label }">
								{{ xqfl.mc }}
							</span>
						</p>
					</div>
					<div flex class="mg-12">
						<p class="query-title">区域工程:</p>
						<p class="query-list" style="width:90%;">
							<span data-type="" :class="{ 'bg-active': filterData.gczd == '' }">全部</span>
							<span v-for="(gcqy, index) in gczdList" :data-type="gcqy.label" :key="index" :class="{ 'bg-active': filterData.gczd == gcqy.label }">
								{{ gcqy.mc }}
							</span>
						</p>
					</div>
				</div>
			</div>

			<div class="pannelPaddingBg-10 mg-12">
				<ul class="demand-list">
					<li flex v-for="(item, index) in dataList" :key="index">
						<div class="demand-list_bgimg" center>学工</div>
						<div class="demand-list-info" flex-column spacebetween>
							<a href="#">背景大学</a>
							<p>
								2020-20-20 &#x3000; 张三 &#x3000;&#x3000;
								<span class="title">需求编号：</span>
								196646546 &#x3000;&#x3000;
								<el-tag key="1" type="success" effect="plain" size="mini">需求设计-分配开发</el-tag>
							</p>
							<p>
								<span class="title">提出人：</span>
								王健&#x3000;华南师范大学 &#x3000;&#x3000;
								<span class="title">类型：</span>
								需求&#x3000;&#x3000;
								<span class="title">产品：</span>
								奖学金
							</p>
						</div>
					</li>
				</ul>
				<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="total, prev, pager, next"
					:total="records"
				></el-pagination>
			</div>
		</div>
		<div class="pannelPaddingBg-10 guid pull-right" >
			<h5>需求工作指南</h5>
			<div>
				<step></step>
			</div>
			<section text-center>
				<el-button type="small" @click="handleSendDemand">我要提需求</el-button>
			</section>
		</div>
		
		<xqDialog :show.sync="xqShow"></xqDialog>
	</div>
</template>

<script>
import { getMenu, getSession } from '@/utils/util.js';
import step from '@/components/demand/step';
import xqDialog from '@/views/BusinessPage/demand/xq-dialog';
export default {
	data() {
		return {
			xqShow:false,
			xqflList: [], //需求分类
			gczdList: [], //区域工程
			queryLJshow: true,
			currentPage: 1,
			pageSize: 10,
			records: 0,
			dataList: [{}, {}],
			filterData: {
				xqfl: '',
				gczd: '',
				keyword: ''
			}
		};
	},
	mounted() {
		if (!getSession('gczd')) {
			getMenu('gczd', this.gczdList, true); //获取工程战队
		} else {
			this.gczdList = getSession('gczd');
		}
	},
	methods: {
		handleSendDemand(){
			this.xqShow = true;
		},
		handleQueryShow() {
			this.queryLJshow = !this.queryLJshow;
		},

		handleQuery() {},

		handleCurrentChange() {}
	},
	components: {step,xqDialog}
};
</script>

<style scoped lang="scss">
.demand-pannel {
	width: 85%;
	margin: 20px auto 0;
	.isshown-query {
		&:hover {
			cursor: pointer;
		}
	}
	.demand-list {
		li {
			border-bottom: 1px solid #dddddd;
			padding: 20px 12px;
		}
		.demand-list_bgimg {
			width: 114px;
			height: 74px;
			background: url('../../../../static/img/demand-bg.png') no-repeat;
			color: #fff;
			font-weight: 700;
			font-size: 18px;
			padding: 0 5px;
		}
		.demand-list-info {
			padding: 0 20px;
			a {
				font-size: 16px;
			}
			.title {
				color: #999;
			}
		}
	}
	
	.list{
		width: 75%;
	}
	.guid{
		min-width: 20%;
		h5{
			border-bottom: 1px solid #999;
			text-align: center;
			padding: 10px 0;
			font-weight: 700 !important;
		}
		>div{
			padding:20px 0 0 20px;
		}
	}
}
</style>
