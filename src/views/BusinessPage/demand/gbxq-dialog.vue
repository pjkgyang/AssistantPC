<template>
	<div>
		<el-dialog
			title="关联需求"
			width="700px"
			top="30px"
			:visible.sync="visible"
			:append-to-body="true"
			:close-on-click-modal="false"
			@close="$emit('update:show', false)"
			:show="show"
		>
			<div class="dialog-xqqr">

				<section class="pj-btn-group">
					<el-button size="small" @click="visible = false">取消</el-button>
				</section>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			visible: this.show
		};
	},
	methods: {

	},
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		show(n, o) {
			this.visible = this.show;
			if (!n) {

			} else {

			}
		}
	},
	components: {}
};
</script>

<style scoped lang="scss">
.dialog-xqqr {
	padding: 8px 10px;
	section{
		div{
			>span{

			}
		}
	}
}
.dialog-xqqr section:nth-of-type(2) {
	margin: 10px 0;
}
.pj-title {
	font-weight: 700;
	width: 14%;
}
.pj-content {
	width: 86%;
}
.pj-btn-group {
	text-align: right;
	padding: 10px 0;
}
</style>
