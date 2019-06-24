<template>
	<div class="dialog-container xmtz_info">
		<el-dialog :title="type=='tz'?'停滞申请':'停滞重启'" width="1000px" top="30px" :visible.sync="visible" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
			<div class="Question pd-10">
				<table>
					<tr>
						<th class="before-require">选择项目</th>
						<td colspan="3">
							<el-input size="mini" type="text" style="width: 100%;" v-model="formData.xmmc" readonly placeholder="请选择项目">
								<el-button slot="append" icon="el-icon-circle-plus-outline" style="width:30px;padding:0 12px;" @click="addQuestiontItem"></el-button>
							</el-input>
						</td>
					</tr>
					<tr v-show="!!formData.xmmc">
						<th>项目状态</th>
						<td>{{ xmInfo.xmzt }}</td>
						<th>学校</th>
						<td>{{ xmInfo.dwmc }}</td>
					</tr>
					<tr v-show="!!formData.xmmc">
						<th>项目类别</th>
						<td>{{ xmInfo.xmlb }}</td>
						<th>甲方责任人</th>
						<td>{{ !xmInfo.jfzrrxm ? '无' : xmInfo.jfzrrxm }}</td>
					</tr>
					<tr v-show="!!formData.xmmc">
						<th>项目经理</th>
						<td>{{ xmInfo.yfzrrxm }}</td>
						<th>客户经理</th>
						<td>{{ xmInfo.khjl }}</td>
					</tr>
					<tr v-show="!!formData.xmmc">
						<th>签署日期</th>
						<td>{{ xmInfo.qssj }}</td>
						<th>启动日期</th>
						<td>{{ xmInfo.qdrq }}</td>
					</tr>
					<tr v-show="!!formData.xmmc">
						<th>服务开始日期</th>
						<td>{{ xmInfo.fwksrq }}</td>
						<th>服务期限（月）</th>
						<td>{{ xmInfo.fwqx }}</td>
					</tr>
					<tr v-show="!!formData.xmmc">
						<th>合同编号</th>
						<td>{{ xmInfo.htbh }}</td>
						<th>合同金额（元）</th>
						<td>{{ xmInfo.htje }}</td>
					</tr>
					<tr v-if="type == 'tz'">
						<th class="before-require">停滞到</th>
						<td colspan="3">
							<el-date-picker
								size="mini"
								style="width:100%"
								v-model="formData.tzrq"
								type="date"
								placeholder="选择日期"
								format="yyyy 年 MM 月 dd 日"
								value-format="yyyy-MM-dd"
							></el-date-picker>
						</td>
					</tr>
					
					<tr v-if="type == 'cq' && !!formData.xmmc">
						<th>停滞到</th>
						<td colspan="3">
							{{xmInfo.htje}}
						</td>
					</tr>
					
					<tr v-if="type == 'tz'">
						<th>上传附件</th>
						<td colspan="3">
							<uploadFile ></uploadFile>
						</td>
					</tr>
					<tr>
						<th class="before-require" style="vertical-align: top;">停滞详情</th>
						<td colspan="3">
							<div id="summernote"></div>
						</td>
					</tr>
				</table>

				<div text-right class="pd-10">
					<el-button size="small" type="primary" @click="handleCommit">确定</el-button>&nbsp;
					<el-button size="small" @click="handleCancel">取消</el-button>
				</div>
			</div>
		</el-dialog>

		<el-dialog title="选择项目" :visible.sync="dialogQuestionVisible" :close-on-click-modal="false" width="800px" top="30px" append-to-body>
			<div style="padding:10px;"><itemChoose @handleEdit="handleEdit"></itemChoose></div>
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios';
import itemChoose from '@/components/BusinessPage/itemChoose.vue';
import uploadFile from '@/components/BusinessPage/upload';

export default {
	data() {
		return {
			dialogQuestionVisible: false,
			visible: false,
			xmInfo: {},
			formData: {
				xmmc: '',
				xmbh: '',
				tzrq: '',
				sm:''
			}
		};
	},
	props: {
		show: {
			type: Boolean,
			default: false
		},
		type:{
			type:String,
			default:''
		}
	},

	methods: {
		handleEdit(data) {
			this.xmInfo = data;
			this.formData.xmmc = data.xmmc;
			this.formData.xmbh = data.xmbh;
			this.dialogQuestionVisible = false;
		},
		//选择项目
		addQuestiontItem() {
			this.dialogQuestionVisible = true;
		},
		handleCommit(){
			if(!this.validate()) return;
			this.formData.sm = $("#summernote").summernote("code");
		},
		handleCancel() {
			//关闭dialog
			this.visible = false;
			$("#summernote").summernote("code","");
			this.formData.sm = '';
			this.formData.xmmc = '';
			this.formData.tzrq = '';
		},
		
		validate(){
			if(!this.formData.xmmc){
				this.$message({
					message:'请选择项目',
					type:'warning'
				})
				return false;
			}
			if(!this.formData.tzrq){
				this.$message({
					message:'请选择停滞日期',
					type:'warning'
				})
				return false;
			}
			if(!this.formData.tzrq){
				this.$message({
					message:'请选择停滞日期',
					type:'warning'
				})
				return false;
			}
			if(this.formData.sm == '<p><br></p>' || !/[\u4e00-\u9fa5]/.test(this.formData.sm)){
				this.$message({
					message:'请填写正确停滞说明',
					type:'warning'
				})
				return false;
			}
			return true;
		}
	},
	watch: {
		show() {
			this.visible = this.show;
			if (this.show) {
				this.$nextTick(() => {
					$('#summernote').summernote({
						dialogsInBody: true,
						placeholder: '请输入内容',
						focus: true,
						height: 200,
						width: 100 + '%',
						minHeight: 260,
						lang: 'zh-CN',
						toolbar: [
							['style', ['bold', 'italic', 'underline', 'clear']],
							['font', ['strikethrough', 'superscript', 'subscript']],
							['fontsize', ['fontsize']],
							['color', ['color']],
							['para', ['ul', 'ol', 'paragraph']],
							['height', ['height']],
							['picture'],
							['link', ['linkDialogShow', 'unlink']]
						]
					});
				});
			} else {
			}
		}
	},
	components: {
		itemChoose,
		uploadFile
	}
};
</script>
<style scoped>
.xmtz_info {
	padding: 15px 20px;
}
.xmtz_info h6 {
	color: #999;
	font-size: 13px;
	margin: 10px 0 !important;
	font-weight: 700;
}

.xmtz_info a {
	color: #2196f3;
}

.xmtz_info table {
	width: 100%;
	border-collapse: collapse;
	border: 1px solid #e9ecf4;
	font-size: 14px;
}
.xmtz_info table th {
	font-size: 14px;
	text-align: center;
	width: 150px;
	background: #f4f6f9;
	color: #4d4d4d;
}
.xmtz_info table td,
.xmtz_info table th {
	text-align: left;
	border: 1px solid #e9ecf4 !important;
	padding: 5px 10px;
}
.xmtz_info h4 {
	border-left: 5px solid #cd69c9;
	padding: 0 5px;
	font-weight: 700;
	margin-bottom: 10px !important;
}

.xmtz_info h6 {
	margin: 10px 0;
}

.table_center tr th,
.table_center tr td {
	text-align: center;
}
</style>
