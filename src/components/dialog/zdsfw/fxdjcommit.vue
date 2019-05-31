<template>
    <div>
        <el-dialog title="风险处理" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-fxdj">
                <div class="option-list" v-for="(fx,index) in fxList" @click="handleCommitfxdj(fx)" title="点击处理风险" :key="index">
                    <p>
                       <span  class="filter-weight">
                         {{fx.cpmc}}&#x3000;{{fx.fwnr}}
                        </span>&#x3000;
                       <el-tag size="mini" :class="{'zdsfw-fxdj-s1':fx.fxdj==1,'zdsfw-fxdj-s2':fx.fxdj==2,'zdsfw-fxdj-s3':fx.fxdj==3}" >{{fx.fxdj==1?'S1':fx.fxdj==2?'S2':'S3'}}</el-tag>&nbsp;
                    </p>
                    <p>
                        <span class="filter-weight">风险描述&nbsp;&nbsp;</span>
                        <span style="color:#f00">{{fx.fxms}}</span>
                    </p>
                    <p>
                        <span class="filter-weight">处理建议&nbsp;&nbsp;</span>
                        <span style="color:green">{{fx.cljy}}</span>
                    </p>
										<p v-if="isJZuser == 0">
										    <span class="filter-weight">风险工时&nbsp;&nbsp;</span>
										    <span style="color:green">{{fx.gs}}</span>
										</p>
										<p>
											 <span class="filter-weight">处理时间&nbsp;&nbsp;</span>
									 	    <span style="color:green">{{fx.clsj}}</span>&#x3000;
										    <span class="filter-weight">处理结果&nbsp;&nbsp;</span>
										    <span style="color:green">{{fx.cljg}}</span>
										</p>
										
										<div :class="{'fxdj-badge':true,'fx_ycl':fx.zt == '1'}">
											{{fx.zt=='0'?'待处理':fx.zt=='1'?'已处理':'无需处理'}}
										</div>
                </div>
            </div>
             <div text-right>
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size="pageSize"
                      layout="prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
                </div>

            <div text-right style="padding:15px 30px">
                <el-button size="mini" @click="handleClose">关闭</el-button>
            </div>
        </el-dialog>

        <el-dialog
              title="提交风险"
              :visible.sync="dialogVisible"
              width="700px" 
               top="30px"
               :append-to-body="true" 
               :close-on-click-modal="false">
               <el-form ref="form" :model="form" label-width="100px" size="mini">
                    <el-form-item label="是否已处理" required>
                        <el-radio-group v-model="form.sfcl">
                            <el-radio :label="1">已处理</el-radio>
                            <el-radio :label="2">无需处理</el-radio>
                        </el-radio-group>
                    </el-form-item>
										<el-form-item label="处理工时" :required="form.sfcl == 1">
										  <el-input type="text" style="width:90%" v-model="form.gs" placeholder="请输入工时(不能小于0)"></el-input>
										</el-form-item>
                    <el-form-item label="处理结果" :required="form.sfcl == 1">
                        <el-input style="width:90%" type="textarea" rows="3" v-model="form.cljg" placeholder="请输入处理结果"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件">
                        <div>
                            <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" 
                            :before-upload="newFiles" :on-remove="handleRemove" multiple :file-list="files">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </div>
                    </el-form-item>
                </el-form>
                <div text-right style="padding:15px 30px">
                     <el-button size="mini"  type="primary" @click="handleCommit">提 交</el-button>
                     <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  data() {
    return {
			isJZuser:0,
      dialogVisible:false,
      visible: this.show,
      upload_url: "123",
      uploadForm: new FormData(),
      form: {
        cljg: "",
        sfcl: 1,
        fileList:"",
				gs:''
      },
      files: [],
      fxList:[],
      total:0,
      currentPage:1,
      pageSize:6,
      fxData:{}
    };
  },
  methods: {
    // 关闭弹出框
    handleClose() {
      this.visible = false;
    },
    handleCommitfxdj(data){
      this.fxData = data;
			if(data.zt == 1) {
				 this.$message({message: '该风险已处理，无需处理~',type: 'warning'});
				 return;
			}
      this.dialogVisible = !this.dialogVisible
    },
    // 切换分页
    handleSizeChange(data){
      this.pageSize = data;
      this.currentPage = 1;
      this.pageActiveServiceRisk();
    },
    // 切换页数
    handleCurrentChange(data){
      this.currentPage = data;
      this.pageActiveServiceRisk();
    },
     // 移除附件
    handleRemove(file, fileList) {
      this.uploadForm.append("fileUpload", "");
    },
    handleCommit() {
      if (!this.validate()) return;
      this.$refs.uploadfile.submit();
      if (!!this.files.length) {
        axios.post(
            window.baseurl + "attachment/uploadAttach.do",
            this.uploadForm,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          ).then(res => {
            if (res.data.state == "success") {
              this.form.fileList = res.data.data;
              this.submitActiveServiceRisk();
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          })
          .catch(error => {});
      }else {
        this.submitActiveServiceRisk();
      }
    },
    newFiles(file) {
      this.files = [];
      this.files.push(file);
      this.uploadForm.append("fileUpload", file);
      return true;
    },
    submitActiveServiceRisk(){
      this.$post(this.API.submitActiveServiceRisk,{
        wid:this.fxData.wid,
        cljg:this.form.cljg,
        zt:this.form.sfcl,
        fjData:this.form.fileList,
				gs:this.form.gs
      }).then(res=>{
        if(res.state == 'success'){
          this.$message({message: '提交成功~',type: 'success'});
					this.pageActiveServiceRisk();
          this.dialogVisible = !this.dialogVisible
        }else{
          this.$alert(res.msg, "提示", { confirmButtonText: "确定",type: "error"});
        }
      })
    },
      // 获取服务风险分页列表
    pageActiveServiceRisk(){
      this.$get(this.API.pageActiveServiceRisk,{
        curPage:this.currentPage,
        pageSize:this.pageSize,
        cpbh:this.rowData.cpbh,
        zbwid:this.rowData.wid
      }).then(res=>{
        if(res.state=='success'){
          if(!res.data.rows){
            this.fxList = []
          }else{
            this.fxList = res.data.rows
          }
          this.total = res.data.records
        }
      })
    },
    validate() {
			if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(this.form.gs)  && this.form.sfcl == 1) {
			  this.$alert("请输入正确工时", "提示", {
			    confirmButtonText: "确定",
			    type: "warning"
			  });
			  return false;
			}
      if (!this.form.cljg && this.form.sfcl == 1) {
        this.$alert("请输入处理结果!", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
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
    rowData:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
			this.isJZuser = sessionStorage.getItem('isJZuser');
      if (!n) {
        this.form.cljg = "";
        this.form.fileList = "";
        this.uploadForm = new FormData();
        this.files = [];
      } else {
        this.pageActiveServiceRisk();
      }
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-fxdj {
  padding: 15px 30px;
  max-height: calc(100vh - 350px);
  overflow-y: auto;
  .option-list {
    padding: 0 65px 0 15px;
    margin: 5px 0 ;
    border: 1px solid #ddd;
    font-size: 12px;
    border-radius: 4px;
    transition: 0.5s;
		position: relative;
		overflow: hidden;
    &:hover{
      transform: translateX(5px);
      cursor: pointer;
      background: rgba(150, 148, 148, 0.1);
    }
  }
	
	.fxdj-badge{
		position: absolute;
		width: 96px;
		height: 26px;
		right: -25px;
		top: 10px;
		transform: rotate(45deg);
		text-align: center;
		background: rgba(64,158,255,.1);
		line-height: 26px;
		color: #409eff;
	}
}
.fx_ycl{
	background: rgba(103,194,58,.1) !important;
	color: #67c23a !important;
}
.el-form-item--mini.el-form-item {
  margin-bottom: 4px;
}
</style>
