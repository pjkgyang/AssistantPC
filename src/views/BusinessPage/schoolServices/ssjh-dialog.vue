<template>
	<div>
		<el-dialog
			title="实施计划"
			:visible.sync="dialogVisible"
			:append-to-body="true"
			:close-on-click-modal="false"
			@close="$emit('update:show', false)"
			:show="show"
			width="1000px"
		>
			<el-form ref="form" :model="form" :rules="rules" label-width="110px" size="mini" style="padding: 10px;">
				<div flex>
					<el-form-item label="建设年份" required><el-input v-model="form.jsnf" placeholder="请输入建设年份" style="width:216px"></el-input></el-form-item>
					<el-form-item label="承建公司" required><el-input v-model="form.cjgs" placeholder="请输入承建公司" style="width:216px"></el-input></el-form-item>
					<el-form-item label="建设状态" required>
						<el-select v-model="form.jszt" placeholder="请选择建设状态" style="width:216px">
							<el-option label="在建" value="1"></el-option>
							<el-option label="售后" value="2"></el-option>
							<el-option label="服务" value="3"></el-option>
						</el-select>
					</el-form-item>
				</div>

				<div flex>
					<el-form-item label="信息中心对接老师" required>
						<el-input v-model="form.xxzxdjls" placeholder="请输入信息中心对接老师" style="width:216px"></el-input>
					</el-form-item>
					<el-form-item label="业务部门对接老师" required>
						<el-input v-model="form.ywbmdjls" placeholder="请输入业务部门对接老师" style="width:216px"></el-input>
					</el-form-item>
					<el-form-item label="上线时间"><el-date-picker type="date" placeholder="选择日期" v-model="form.sxsj" style="width: 216px;"></el-date-picker></el-form-item>
				</div>

				<el-form-item label="实现方式"><el-input v-model="form.sxfs" placeholder="请输入实现方式" style="width:100%"></el-input></el-form-item>

				<div flex>
					<el-form-item label="服务指南整理责任人"><el-input v-model="form.fwznzrr" placeholder="请输入服务指南整理责任人" style="width:216px"></el-input></el-form-item>
					<el-form-item label="完成状态">
						<el-select v-model="form.fwznwczt" placeholder="请选择完成状态" style="width:216px">
							<el-option label="已完成" value="1"></el-option>
							<el-option label="未完成" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="完成时间"><el-date-picker type="date" placeholder="选择日期" v-model="form.fwznwcsj" style="width: 216px;"></el-date-picker></el-form-item>
				</div>

				<div flex>
					<el-form-item label="实施责任人"><el-input v-model="form.sszrr" placeholder="请输入实施责任人" style="width:216px"></el-input></el-form-item>
					<el-form-item label="完成状态">
						<el-select v-model="form.sswczt" placeholder="请选择完成状态" style="width:216px">
							<el-option label="已完成" value="1"></el-option>
							<el-option label="未完成" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="完成时间"><el-date-picker type="date" placeholder="选择日期" v-model="form.sswcsj" style="width: 216px;"></el-date-picker></el-form-item>
				</div>
				<div flex>
					<el-form-item label="开发责任人"><el-input v-model="form.kfzrr" placeholder="请输入开发责任人" style="width:216px"></el-input></el-form-item>
					<el-form-item label="完成状态">
						<el-select v-model="form.kfwczt" placeholder="请选择完成状态" style="width:216px">
							<el-option label="已完成" value="1"></el-option>
							<el-option label="未完成" value="0"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="完成时间"><el-date-picker type="date" placeholder="选择日期" v-model="form.kfwcsj" style="width: 216px"></el-date-picker></el-form-item>
				</div>
				<el-form-item label="使用情况"><el-input type="textarea" rows="4" placeholder="请输入使用情况" v-model="form.syqk"></el-input></el-form-item>

				<!-- <el-form-item label="活动形式"><el-input type="textarea" v-model="form.desc"></el-input></el-form-item> -->
				<el-form-item text-right>
					<el-button type="primary" @click="submitForm('form')">保存</el-button>
					<el-button @click="dialogVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: this.show,
			// 服务类别
			fwlbList: [
				{
					mc: '服务类别',
					label: 1
				}
			],
			// 服务对象
			fwdxList: [
				{
					mc: '服务类别',
					label: 1
				}
			],
			form: {
				jsnf: '',
				cjgs: '',
				jszt: '',
				xxzxdjls: '',
				ywbmdjls: '',
				sxsj: '',
				sxfs: '',
				fwznzrr: '',
				fwznwczt: '',
				fwznwcsj: '',
				sszrr: '',
				sswczt: '',
				sswcsj: '',
				kfzrr: '',
				kfwczt: '',
				kfwcsj: '',
				syqk: ''
			},
			rules: {
				jsnf: [{ required: true, message: '请输入建设年份', trigger: 'blur' }],
				cjgs: [{ required: true, message: '请输入承建公司', trigger: 'blur' }],
				jszt: [{ required: true, message: '请选择建设状态', trigger: 'change' }],
				xxzxdjls: [{ required: true, message: '请输入信息中心对接老师', trigger: 'blur' }],
				ywbmdjls: [{ required: true, message: '请输入业务部门对接老师', trigger: 'blur' }]
			}
		};
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		zbwid:{
			type:String,
			default:''
		}
	},
	watch: {
		show(n, o) {
			if(!!n){
				this.getServicePlan();
			}
			this.dialogVisible = this.show;
		}
	},
	methods: {
		submitForm(formName) {
			if(!this.valiDate()) return;
			this.$emit('handleCommitSSjh',this.form);
		},
		getServicePlan(){
			this.$get(this.API.getServiceItemPlan,{
				zbwid:this.zbwid
			}).then(res=>{
				if(res.state == 'success'){
					if(!!res.data){
						this.form = res.data;
					}else{
						this.form = {};
					}
				}else{
					
				}
			})
		},
		valiDate(){
			if(!this.form.jsnf){
				this.$message({message:'请输入建设年份',type:'warning'})
				return false;
			}
			if(!this.form.cjgs){
				this.$message({message:'请输入承建公司',type:'warning'})
				return false;
			}
			if(!this.form.jszt){
				this.$message({message:'请选择建设状态',type:'warning'})
				return false;
			}
			if(!this.form.xxzxdjls){
				this.$message({message:'请输入信息中心对接老师',type:'warning'})
				return false;
			}
			if(!this.form.ywbmdjls){
				this.$message({message:'请输入业务部门对接老师',type:'warning'})
				return false;
			}
			return true;
		}
	}
};
</script>

<style>
.title {
	font-weight: 700;
	padding: 0 10px;
	margin: 10px 0;
	border-left: 4px solid blueviolet;
}
</style>
