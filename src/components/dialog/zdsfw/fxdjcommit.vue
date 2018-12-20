<template>
    <div>
        <el-dialog title="风险等级" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-fxdj">
                <div class="option-list" v-for="fx in fxList" @click="handleCommitfxdj(fx)" title="点击添加风险等级">
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
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="处理结果" required>
                        <el-input style="width:90%" type="textarea" rows="3" v-model="form.cljg" placeholder="请输入处理结果"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件" required>
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
      dialogVisible:false,
      visible: this.show,
      upload_url: "123",
      uploadForm: new FormData(),
      form: {
        cljg: "",
        sfcl: 1,
        fileList:""
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
        sfcl:this.form.sfcl,
        fjData:this.form.fileList
      }).then(res=>{
        if(res.state == 'success'){
          this.$message({message: '提交成功~',type: 'success'});
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
      if (!this.form.cljg) {
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
    padding: 0 0 0 32px;
    margin: 5px 0 ;
    border: 1px solid #ddd;
    font-size: 12px;
    border-radius: 4px;
    transition: 0.5s;
    &:hover{
      transform: translateX(5px);
      cursor: pointer;
      background: rgba(150, 148, 148, 0.1);
    }
  }
}
.el-form-item--mini.el-form-item {
  margin-bottom: 4px;
}
</style>
