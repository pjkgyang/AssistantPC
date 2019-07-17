<template>
	<div>
		<el-dialog
			title="确认需求"
			width="700px"
			top="30px"
			:visible.sync="visible"
			:append-to-body="true"
			:close-on-click-modal="false"
			@close="$emit('update:show', false)"
			:show="show"
		>
			<div class="dialog-xqqr">
				<section>
					<div class="mg-12">
						<span class="filter-weight">附件：</span>
						<a href="#">xxxxxxxxxx</a>
					</div>

					<div flex>
						<span class="filter-weight">评价：</span>
						<el-rate v-model="filterData.pj" :texts="texts" show-text></el-rate>
					</div>
					<div class="mg-12">
						<span class="filter-weight">期望开发交付日期：</span>
						<el-date-picker size="mini" v-model="filterData.jfrq" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
					</div>
					<p class="pj-content">
						<span class="filter-weight">备注：</span>
						<el-input type="textarea" :rows="5" :maxlength="500" style="width:670px" placeholder="请输入备注内容" v-model="filterData.sm"></el-input>
					</p>
				</section>
				<section class="pj-btn-group">
					<el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
					<el-button size="small" @click="handleClose">取消</el-button>
				</section>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			visible: this.show,
			texts:['1分','2分','3分','4分','5分'],
			filterData: {
				sm: '',
				pj: 5,
				jfrq:''
			}
		};
	},
	methods: {
		handleClose() {
			this.visible = false;
		},
		handleClickSure() {
			if (!this.validate()) return;
			this.$emit('handleClickSure', this.filterData);
		},
		validate() {
			if (!this.filterData.jfrq) {
				this.$alert('请选择交付日期', '提示', { confirmButtonText: '确定', type: 'warning' });
				return false;
			}
			if (/^[\s]*$/.test(this.filterData.sm)) {
				this.$alert('请输入备注内容', '提示', { confirmButtonText: '确定', type: 'warning' });
				return false;
			}
			return true;
		}
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: '说明'
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
