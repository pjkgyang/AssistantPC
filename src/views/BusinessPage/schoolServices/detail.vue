<template>
	<div class="pannelPadding-10">
		<div class="pannelPaddingBg-10 table_grid table_title">
			<div>
				<h5 class="mg-12">服务事项</h5>
				<table>
					<tr >
						<th>服务名称</th>
						<td>{{ fwData.fwmc }}</td>
						<th>服务对象</th>
						<td>{{ fwData.fwdx }}</td>
						<th>联系方式</th>
						<td>{{ fwData.lxfs }}</td>
					</tr>
					<tr >
						<th>办事依据</th>
						<td>{{ fwData.bsyj }}</td>
						<th>服务指南</th>
						<td>{{ fwData.fwzn=='0'?'无':'有' }}</td>
						<th>联系方式</th>
						<td>{{ fwData.xxhzc=='0'?'无':'有' }}</td>
					</tr>
					<tr v-if="fwData.fwzn=='1'">
						<th>服务指南说明</th>
						<td colspan="5">
						    {{fwData.fwznsm}}
						</td>
					</tr>
					<tr>
						<th>服务类别</th>
						<td>{{ fwData.fwlb }}</td>
						<th>服务内容</th>
						<td colspan="3">{{ fwData.fwnr }}</td>
					</tr>
				</table>
			</div>
			<div>
				<h5 class="mg-12">服务事项实施计划</h5>
				<div v-for="jhData in jhList">
					<br>
					<span class="filter-weight">填写日期：</span>{{jhData.txrq}}
					<table style="margin-bottom:10px">
						<tr >
							<th>建设年份</th>
							<td>{{jhData.xxhjsnf}}</td>
							<th>承建公司</th>
							<td>{{jhData.xxhcjgs}}</td>
							<th>实现方式</th>
							<td colspan="3">{{jhData.sxfs}}</td>
						</tr>
						<tr >
							<th>信息中心对接老师</th>
							<td>{{jhData.xxzxdjr}}</td>
							<th>业务部门对接老师</th>
							<td>{{jhData.ywbmdjr}}</td>
							<th>上线时间</th>
							<td>{{jhData.xxhsxsj}}</td>
						</tr>
						<tr >
							<th>服务指南整理责任人</th>
							<td>{{jhData.fwznzrr}}</td>
							<th>服务指南完成状态</th>
							<td>{{jhData.fwznwczt==1?'已完成':'未完成'}}</td>
							<th>服务指南完成时间</th>
							<td>{{jhData.fwznwcsj}}</td>
						</tr>
						<tr >
							<th>实施责任人</th>
							<td>{{jhData.sszrr}}</td>
							<th>实施完成状态</th>
							<td>{{jhData.sswczt==1?'已完成':'未完成'}}</td>
							<th>实施完成时间</th>
							<td>{{jhData.sswcsj}}</td>
						</tr>
						<tr >
							<th>开发责任人</th>
							<td>{{jhData.kfzrr}}</td>
							<th>开发完成状态</th>
							<td>{{jhData.kfwczt==1?'已完成':'未完成'}}</td>
							<th>开发完成时间</th>
							<td>{{jhData.kfwcsj}}</td>
						</tr>
						<tr>
							<th>使用情况</th>
							<td colspan="5"  :title="jhData.syqk">{{!jhData.syqk?'':jhData.syqk.length > 100?jhData.syqk.substring(0,100)+'...':jhData.syqk}}</td>
						</tr>
					</table>
				</div>
				<emptyContent v-if="records == 0"></emptyContent>
				<!-- <div v-if="records > 0">
					<el-pagination
					@current-change="handleCurrentChange"
					:current-page.sync="currentPage"
					:page-size="pageSize"
					layout="total, prev, pager, next"
					:total="records">
					</el-pagination>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
  import emptyContent from '@/components/BusinessPage/emptyContent';
  export default {
  data() {
    return {
      fwData: {},
      currentPage: 1,
      pageSize: 10,
      records: 0,
      jhList: []
    };
  },
  mounted() {
	this.getService();
	this.pageServiceItemPlan();
  },
  components:{emptyContent},
  methods: {
	handleCurrentChange(data){
		this.currentPage = data;
		this.pageServiceItemPlan();
	},
  getService() {
      this.$get(this.API.getServiceItem, {
        wid: this.$route.query.id
      }).then(res => {
        if (res.state == "success") {
			this.fwData = res.data;
        } else {

        }
    });
	},
	pageServiceItemPlan(){
 		this.$get(this.API.pageServiceItemPlan, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
				zbwid: this.$route.query.id,
				onlyNewest: 1
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.jhList = res.data.rows;
          } else {
            this.jhList = [];
          }
          this.records = res.data.records;
        } else {
        }
      });
	}
	
  }
};
</script>

<style>
</style>
