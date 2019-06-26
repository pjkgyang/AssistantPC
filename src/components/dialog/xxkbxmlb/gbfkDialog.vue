<template>
	<div class="dialog-xmfk">
		<el-dialog
			title="过保反馈"
			width="1000px"
			top="30px"
			:visible.sync="visible"
			:append-to-body="true"
			:close-on-click-modal="false"
			@close="$emit('update:show', false)"
			:show="show"
		>
			<div style="padding:10px 15px">
				<el-form ref="form" :model="form" label-width="140px" class="xmfk-form">
					<el-form-item label="过保策略" required>
						<el-radio-group v-model="form.gbcl">
							<el-radio v-for="(item, index) in gbclList" :key="index" :label="item.label">{{ item.mc }}</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="责任人" required>
						<el-select v-model="form.region" size="mini" placeholder="请选择责任人" @change="handleSelect"> 
							<el-option v-for="(item, index) in zrrList" :key="index" :label="item.cymc" :value="item.cybh"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="预计签单日期">
						<el-date-picker size="mini" type="date" placeholder="选择日期" v-model="form.yjqdrq" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-form-item>
					<el-form-item label="预计签单金额"><el-input size="mini" v-model="form.yjqdje" placeholder="请输入预计签单金额"></el-input></el-form-item>
					<el-form-item label="当前跟踪状态">
						<el-radio-group v-model="form.gbgzzt">
							<el-radio v-for="(item, index) in gzztList" :key="index" :label="item.label">{{ item.mc }}</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="续保合同">
						<el-input size="mini" type="text" style="width:100%" v-model="form.xbxmmc" readonly placeholder="请选择项目">
							<el-button slot="append" icon="el-icon-circle-plus-outline" @click="addQuestiontItem"></el-button>
						</el-input>
					</el-form-item>

					<el-form-item label="说明"><el-input type="textarea" v-model="form.sm"></el-input></el-form-item>

					<el-form-item text-right>
						<el-button type="primary" size="mini" @click="onSubmit">保存</el-button>
						<el-button size="mini" @click="visible = false">关闭</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>

		<el-dialog title="选择项目" :visible.sync="dialogQuestionVisible" :close-on-click-modal="false" width="800px" top="30px" append-to-body>
			<div style="padding:10px;"><itemChoose @handleEdit="handleChooseItem"></itemChoose></div>
		</el-dialog>
	</div>
</template>

<script>
import { getMenu, getSession } from '@/utils/util.js';
import itemChoose from '@/components/BusinessPage/itemChoose.vue';
export default {
	data() {
		return {
			dialogQuestionVisible: false,
			visible: this.show,
			gbclList: [], //过保策略
			zrrList: [], //责任人
			gzztList: [], //跟踪状态
			form: {
				gbcl: '',
				gbgzzt: '',
				zrrbh: '',
				zrrxm: '',
				yjqdrq: '',
				yjqdje: '',
				xbxmbh: '',
				xbxmmc: '',
				sm: ''
			}
		};
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		xmbh: {
			type: String,
			default: ''
		}
	},
	methods: {
		onSubmit() {
			if(!this.validate()) return;
			this.$emit('handleSubmit', this.form);
		},
		handleSelect(val){
			this.zrrList.forEach(ele=>{
				if(val == ele.cybh){
					this.form.zrrxm = ele.cymc
				}
			})
		},
		// 选择项目
		addQuestiontItem() {
			this.dialogQuestionVisible = true;
		},
		// 选择项目
		handleChooseItem(data) {
			this.form.xbxmmc = data.xmmc;
			this.form.xbxmbh = data.xmbh;
			this.dialogQuestionVisible = false;
		},
		getTeamMembers() {
			this.$get(this.API.getTeamMembers, {
				xmbh: this.xmbh
			}).then(res => {
				if (res.state == 'success') {
					this.zrrList = !res.data ? [] : res.data;
				} else {
					this.$message({
						message: res.msg,
						type: 'error'
					});
				}
			});
		},
		validate() {
			if (!this.form.gbcl) {
				this.$message({
					message: '请选择过保策略',
					type: 'warning'
				});
				return false;
			}
			if (!this.form.zrrbh) {
				this.$message({
					message: '请选择责任人',
					type: 'warning'
				});
				return false;
			}
			// if (/^[\s]*$/.test(this.form.sm)) {
			// 	this.$message({
			// 		message: '请填写说明内容',
			// 		type: 'warning'
			// 	});
			// 	return; 
			// }
			return true;
		}
	},
	watch: {
		show(n, o) {
			this.visible = this.show;

			if (!n) {
			} else {
				this.gbclList = [];
				this.gzztList = [];
				if (!getSession('gbcl')) {
					getMenu('OverProtectionStrategy', this.gbclList, ''); //获取过保策略
				} else {
					this.gbclList = getSession('gbcl');
				}

				if (!getSession('gzzt')) {
					getMenu('OverProtectionTrackStatus', this.gzztList, ''); //获取跟踪状态
				} else {
					this.gzztList = getSession('gzzt');
				}

				this.getTeamMembers();
			}
		}
	},
	components: { itemChoose }
};
</script>

<style scoped>
.dialog-xjjh {
	padding: 8px 10px;
}
.el-form-item {
	margin: 0 !important;
}
</style>
