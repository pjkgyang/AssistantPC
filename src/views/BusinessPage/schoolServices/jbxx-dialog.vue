<template>
	<div>
		<el-dialog title="服务事项基本信息" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show" width="1000px">
			<el-form ref="form" :model="form" label-width="110px"  size="mini"  style="padding: 10px;">
				<div flex>
					<el-form-item label="服务名称" required><el-input v-model="form.fwmc" placeholder="请输入服务名称"  style="width:380px"></el-input></el-form-item>
					<el-form-item label="服务对象" required>
						<el-select v-model="form.fwdx" multiple placeholder="请选择服务对象" style="width:380px">
							<el-option v-for="(fwdx,index) in fwdxList" :key="index" :label="fwdx.text" :value="fwdx.id"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div flex>
					<el-form-item label="联系方式" required><el-input v-model="form.lxfs" type="number" placeholder="请输入联系方式"   style="width:380px"></el-input></el-form-item>
					<el-form-item label="办事依据" required><el-input v-model="form.bsyj" placeholder="请输入办事依据"   style="width:380px"></el-input></el-form-item>
				</div>
				<div flex>
					<el-form-item label="服务指南" required>
						<el-radio-group v-model="form.fwzn"  style="width:380px">
							<el-radio  label="1">有</el-radio>
							<el-radio  label="0">无</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="信息化支持" required>
						<el-radio-group v-model="form.xxhzc"  style="width:380px">
							<el-radio  label="1">有</el-radio>
							<el-radio  label="0">无</el-radio>
						</el-radio-group>
					</el-form-item>
				</div>
				<el-form-item label="服务指南说明" v-if="!!form.fwzn" required><el-input type="textarea" placeholder="服务指南说明"  v-model="form.fwznsm"></el-input></el-form-item>
				<el-form-item label="服务类别" >
					<el-select v-model="form.fwlb"  placeholder="请选择服务类别" style="width:100%">
						<el-option v-for="(fwlb,index) in fwlbList" :key="index" :label="fwlb.text" :value="fwlb.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="服务内容" ><el-input type="textarea" placeholder="请输入服务内容"  v-model="form.fwnr"></el-input></el-form-item>
				
				<el-form-item text-right>
					<el-button  type="primary" @click="onSubmit">保存</el-button>
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
			fwlbList:[],
			// 服务对象
			fwdxList:[],
			form: {
				fwmc:'',
				fwdx:[],
				lxfs:'',
				bsyj:'',
				fwzn:'0',
				xxhzc:'0',
				fwznsm:'',
				fwlb:'',
				fwnr:''
			}
		};
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		formData:{
			type:Object,
			default:()=>{
				return {}
			}
		}
	},
	watch: {
		show(n, o) {
			if(!!n){
				this.getService();
				if(JSON.stringify(this.formData) != '{}'){
					this.form.fwmc = this.formData.fwmc;
					this.form.fwdx = this.formData.fwdxwid.split(',');
					this.form.lxfs = this.formData.lxfs;
					this.form.bsyj = this.formData.bsyj;
					this.form.fwzn = this.formData.fwzn;
					this.form.xxhzc = this.formData.xxhzc;
					this.form.fwznsm = this.formData.fwznsm;
					this.form.fwlb = this.formData.fwlbwid;
					this.form.fwnr = this.formData.fwnr;
				}else{
					this.form = {};
					this.form.fwdx = [];
					this.form.fwzn = '0';
					this.form.xxhzc = '0';
				}
			}else{
				this.form.fwdx = [];
			}
			this.dialogVisible = this.show;
		}
	},
	methods: {
		getService(){
			// 获取服务对象下拉列表
			this.$get(this.API.serviceObjects,{}).then(res=>{
				if(res.state == 'success'){
					this.fwdxList = res.data;
				}else{
					this.$message({message:res.msg,type:'error'});
				}
			})
			// 获取服务类别下拉列表
			this.$get(this.API.serviceCatalogs,{}).then(res=>{
				if(res.state == 'success'){
					this.fwlbList = res.data;
				}else{
					this.$message({message:res.msg,type:'error'});
				}
			})
		},
		onSubmit() {
			if(!this.valiDate()) return;
		    this.$emit('handleCommitService',this.form);
		},
		
		valiDate(){
			if(!this.form.fwmc){
				this.$message({
					message:'请填写服务名称',
					type:'warning'
				})
				return false;
			}
			if(!this.form.fwdx.length){
				this.$message({
					message:'请选择服务对象',
					type:'warning'
				})
				return false;
			}
			if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.form.lxfs) || !(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.form.lxfs))){
				this.$message({
					message:'请填写正确联系方式',
					type:'warning'
				})
				return false;
			}
			if(!this.form.bsyj){
				this.$message({
					message:'请填写联系方式',
					type:'warning'
				})
				return false;
			}
			if(!!this.form.fwzn && !this.form.fwznsm){
				this.$message({
					message:'请填写服务指南说明',
					type:'warning'
				})
				return false;
			}
			if(!this.form.fwlb){
				this.$message({
					message:'请选择服务类别',
					type:'warning'
				})
				return false;
			}
			if(!/\S/.test(this.form.fwnr)){
				this.$message({
					message:'请填写服务内容',
					type:'warning'
				})
				return false;
			}
			return true;
		},
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
