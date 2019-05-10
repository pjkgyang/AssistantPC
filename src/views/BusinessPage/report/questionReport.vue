<template>
	<div class="pd-10">
		<div class="layout-bgf">
			<h4 text-center>问题统计</h4>
			<questionReport :isXxkb="true"></questionReport>
		</div>
	</div>
</template>

<script>
	import questionReport from '@/views/BusinessPage/report/useReport/userQuestion'
	export default {
		data(){
			return {
				
			}
		},
		methods: {
		
		},
		components: {
			questionReport
		},
	}
</script>

<style scoped lang="scss">
	.layout-bgf{
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 10px;
		background: #fff;
		position: relative;
		h4{
			font-weight: 700;
			margin: 20px;
		}
	}
</style>
