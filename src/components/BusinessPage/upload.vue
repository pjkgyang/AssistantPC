<template>
	<div class="upload_file">
		<div flex>
			<div>
				<el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :before-upload="beforeUpload" :on-change="handleChange" :multiple="isMultiple">
					<el-button size="mini" type="primary">上传附件</el-button>
					<!-- <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div> -->
				</el-upload>
				<p v-if="!!fileList.length" v-for="(item, index) in fileList" flex colcenter spacebetween>
					<span>{{ item }}</span>
					<i class="el-icon-close" @click="handleRemove(index)"></i>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
	data() {
		return {
			upload_url: '123',
			uploadForm: new FormData(),
			fileList: [], //文件集合
			files: [],
			fileName: null,
			uploadAction: '123'
		};
	},
	props: {
		istb: {
			type: Boolean,
			default: false
		},
		isMultiple: {
			type: Boolean,
			default: false
		},
		isCrowd: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		istb(newValue, oldValue) {
			this.fileList = [];
			this.files = [];
		}
	},
	methods: {
		// 删除文件
		handleRemove(index, edit) {
			this.files.splice(index, 1);
			this.fileList.splice(index, 1);
			this.$emit('handleUploadFile', this.files);
		},
		beforeUpload(file) {
			if (!this.isMultiple) {
				this.fileList = [];
				this.files = [];
			}
			this.uploadForm = new FormData();
			if (!this.isCrowd) {
				this.uploadForm.append('fileUpload', file);
			} else {
				this.uploadForm.append('uploadCrowd', file);
			}
			axios.post(window.baseurl + (!this.isCrowd ? 'attachment/uploadAttach.do' : 'external/uploadCrowd.do'), this.uploadForm, {
					headers: { 'Content-Type': 'multipart/form-data' }
				})
				.then(res => {
					if (res.data.state == 'success') {
						this.files.push(res.data.data.split('|')[0]);
						if (!this.isCrowd) {
							this.fileList.push(res.data.data.split('|')[1]);
						} else {
							this.fileList.push(file.name);
						}
						this.$emit('handleUploadFile', this.files);
					}
				});
			return true;
		},
		handleChange(file, fileList) {}
	},
	components: {}
};
</script>

<style lang="scss" scoped>
.upload_file {
	p {
		border: 1px solid rgb(235, 234, 234);
		padding: 2px 6px;
		border-radius: 3px;
		width: 900px;
		margin-top: 4px !important;
		&:hover {
			background: rgba(216, 214, 214, 0.5);
		}
		i:hover {
			cursor: pointer;
			color: #f00;
		}
	}
}
</style>
