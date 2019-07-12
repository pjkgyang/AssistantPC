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
				<table>
					<tr >
						<th>建设年份</th>
						<td>{{jhData.jsnf}}</td>
						<th>承建公司</th>
						<td>{{jhData.cjgs}}</td>
						<th>建设状态</th>
						<td>{{jhData.jszt==1?'在建':jhData.jszt==2?'售后':'过保'}}</td>
					</tr>
					<tr >
						<th>信息中心对接老师</th>
						<td>{{jhData.xxzxdjls}}</td>
						<th>业务部门对接老师</th>
						<td>{{jhData.ywbmdjls}}</td>
						<th>上线时间</th>
						<td>{{jhData.sxsj}}</td>
					</tr>
					<tr >
						<th>服务指南整理责任人</th>
						<td>{{jhData.fwznzrr}}</td>
						<th>服务指南完成状态</th>
						<td>{{jhData.fwznwczt}}</td>
						<th>服务指南完成时间</th>
						<td>{{jhData.fwznwcsj}}</td>
					</tr>
					<tr >
						<th>实施责任人</th>
						<td>{{jhData.sszrr}}</td>
						<th>实施完成状态</th>
						<td>{{jhData.sswczt}}</td>
						<th>实施完成时间</th>
						<td>{{jhData.sswcsj}}</td>
					</tr>
					<tr >
						<th>开发责任人</th>
						<td>{{jhData.kfzrr}}</td>
						<th>开发完成状态</th>
						<td>{{jhData.kfwczt}}</td>
						<th>开发完成时间</th>
						<td>{{jhData.kfwcsj}}</td>
					</tr>
					<tr>
						<th>实现方式</th>
						<td colspan="3">{{jhData.sxfs}}</td>
						<th>使用情况</th>
						<td colspan="3">{{jhData.syqk}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				fwData:{},
				jhData:{}
			}
		},
		mounted(){
			this.getService();
		},
		methods: {
			getService() {
				this.$get(this.API.getServiceItem,{
					wid:this.$route.query.id
				}).then(res=>{
					if(res.state == 'success'){
						this.fwData = res.data;
					}else{
						
					}
				})
				this.$get(this.API.getServiceItemPlan,{
					zbwid:this.$route.query.id
				}).then(res=>{
					if(res.state == 'success'){
						this.jhData = res.data;
					}else{
						
					}
				})
			}
		},
	}
</script>

<style>
	
</style>
