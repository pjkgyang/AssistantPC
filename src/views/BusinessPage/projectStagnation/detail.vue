<template>
	<div class="pd-10 projectStagnation">
		<div class="pannelPaddingBg-10">
			<div>
				<h5>当前流程：</h5><br>
				<el-steps :active="2" align-center>
				  <el-step title="步骤1" description=""></el-step>
				  <el-step title="步骤2" description=""></el-step>
				  <el-step title="步骤3" description=""></el-step>
				  <el-step title="步骤4" description=""></el-step>
				</el-steps>
			</div>
			<el-divider></el-divider>
			<div class="mg-12">
				<h5  class="mg-12">详情内容：</h5>
				按时大大实打实
			</div>
			<el-divider></el-divider>
			<div>
				<h5  class="mg-12">详情：</h5>
				<div class="block">
					 <el-timeline>
						<el-timeline-item
						  v-for="(activity, index) in activities"
						  :key="index"
						  type="primary"
						  :size="activity.size"
						  :timestamp="activity.timestamp">
						  {{activity.content}}
						</el-timeline-item>
					  </el-timeline>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				    activities: [{
					  content: '2018-04-12 20:46',
					  timestamp: '',
					}, {
					  content: '2018-04-03 20:46',
					  timestamp: '',
					}, {
					  content: '2018-04-03 20:46',
					  timestamp: '',
					}, {
					  content: '2018-04-03 20:46',
					  timestamp: ''
					}]
			}
		},
		methods:{
			// 获取项目停滞重启详情
			getProjectStopVO(){
				this.$get(this.API.getProjectStopVO,{
					wid:this.$route.query.wid
				}).then(res=>{
					if(res.state == 'success'){
						
					}else{
						
					}
				})
			},
			// 获取流程节点
			listWorkFlowNodes(){
				this.$get(this.API.listWorkFlowNodes,{
					wid:this.$route.query.wid
				}).then(res=>{
					if(res.state == 'success'){
						
					}else{
						
					}
				})
			},
			// 流程日志列表
			logs(){
				this.$get(this.API.logs,{
					wid:this.$route.query.wid
				}).then(res=>{
					if(res.state == 'success'){
						
					}else{
						
					}
				})
			}
		},
		components: {
			
		},
	}
</script>

<style scoped lang="scss">
	.projectStagnation h5{
		font-weight: 700;
		border-left:5px solid darkorchid;
		padding-left: 5px;
	}
</style>
