<template>
    <div>
        <el-dialog title="提报服务" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
            <div class="dialog-tbfw">
                <div class="dialog-tbfw-option">
                  <!-- rowData.length == 1 -->
                  <!-- isMultiple -->
                  <div v-if="">
                    <div>
                        <span class="filter-weight before-require">问题：</span>
                        <span>
                            <el-button style="padding:10px" size="mini" type="primary" icon="el-icon-plus" circle @click="handleAddOption('wt')"></el-button>
                        </span>
                        <div v-if="!!wtList.length" v-for="(wt,index) in wtList" class="option-list" flex colcenter spacearound>
                            <section class="option-list-left">
                                <span class="option-list-index">{{index+1}}</span>
                                <span class="el-icon-close" title="删除" @click="handleDelete('wt',wt,index)"></span>
                            </section>
                            <section class="option-list-right">
                                <p>问题描述：{{wt.wtms}}</p>
                                <p>处理结果：{{wt.cljg}}</p>
                            </section>
                        </div>
                    </div><br>
                    <div>
                        <span class="filter-weight before-require">风险：</span>
                        <span>
                            <el-button style="padding:10px" size="mini" type="primary" icon="el-icon-plus" circle @click="handleAddOption('fx')"></el-button>
                        </span>
                        <div v-if="!!fxList.length" v-for="(fx,index) in fxList" class="option-list" flex colcenter spacearound>
                            <section class="option-list-left">
                                <span class="option-list-index">{{index+1}}</span>
                                <span class="el-icon-close" title="删除" @click="handleDelete('fx',fx,index)"></span>
                            </section>
                            <section class="option-list-right">
                                <p>风险描述:{{fx.fxms}}</span></p>
                                <p>风险等级:{{fx.fxdj==1?'S1':fx.fxdj==2?'S2':'S3'}}</p>
                                <p>处理建议:{{fx.cljy}}</p>
                            </section>
                        </div>
                    </div><br>
                    </div>
                    <form action="">
                        <div flex>
                            <span class="filter-weight before-require">提报说明：</span>
                            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.sm" style="width:550px"></el-input>
                        </div><br>
                        <div flex>
                            &#x3000;&#x3000;&nbsp;&nbsp;
                            <span class="filter-weight">附件：</span>
                            <div>
                                <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" 
                                :before-upload="newFiles" :on-remove="handleRemove" multiple :file-list="files">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <!-- <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div> -->
                                </el-upload>
                            </div>
                        </div>

                    </form>
                </div>
                <div text-right>
                    <el-button size="mini" type="primary" @click="handleCommit">提交</el-button>&#x3000;
                    <el-button size="mini" @click="handleClose">取消</el-button>
                </div>
            </div>
        </el-dialog>

        <wtDialog :show.sync='wtShow' @handleAddWt="handleAddWt" :rowData="rowData"></wtDialog>
        <fxDialog :show.sync='fxShow' @handleAddFx="handleAddFx" :rowData="rowData"></fxDialog>
    </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import wtDialog from "@/components/dialog/zdsfw/wt-dialog.vue";
import fxDialog from "@/components/dialog/zdsfw/fx-dialog.vue";
export default {
  data() {
    return {
      wtShow: false,
      fxShow: false,
      visible: this.show,
      upload_url: "123",
      uploadForm: new FormData(),
      form: {
        sm: "",
        fileList: ""
      },
      files: [],

      wtList: [],
      fxList: []
    };
  },
  methods: {
    handleClose() {
      this.visible = false;
    },
    // 添加
    handleAddOption(params) {
      if (params == "wt") {
        this.wtShow = !this.wtShow;
      } else {
        this.fxShow = !this.fxShow;
      }
    },
    // 添加问题
    handleAddWt(data) {
      this.$post(this.API.addActiveServiceProblem,{
        zbwid:this.rowData.wid,
        wtms:data.ms,
        cljg:data.jg,
      }).then(res=>{
        if(res.state == 'success'){
          this.$message({message: '添加成功~',type: 'success'});
          this.pageActiveServiceProblem();
          this.wtShow = !this.wtShow; 
        }
      })
    },
    // 添加风险
    handleAddFx(data) {
     this.$post(this.API.addActiveServiceRisk,{
        zbwid:this.rowData.wid,
        fxms:data.fxms,
        fxdj:data.fxdj,
        cljy:data.cljy, 
      }).then(res=>{
        if(res.state == 'success'){
          this.$message({message: '添加成功~',type: 'success'});
          this.pageActiveServiceRisk();
          this.fxShow = !this.fxShow;
        }
      })
    },
    // 删除
    handleDelete(params, data,index) {
       this.$confirm('确定删除该条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.$post(params == "wt"?this.API.deleteActiveServiceProblem:this.API.deleteActiveServiceRisk,{
              wid:data.wid
            }).then(res=>{
              if(res.state == 'success'){
                this.$message({message: '删除成功~',type: 'success'});
                if(params == "wt"){
                  this.wtList.splice(index, 1); 
                }else{
                  this.fxList.splice(index, 1);
                }
              }else{
                 this.$alert(res.msg, "提示", { confirmButtonText: "确定",type: "error"});
              }
            })
        }).catch(() => {});
      
    },
    // 移除附件
    handleRemove(file, fileList) {
      this.uploadForm.append("fileUpload", "");
    },
    handleCommit() {
      if (!this.validate()) return;
      if (this.wids.split(",").length == 1) {
        this.$refs.uploadfile.submit();
      }
      if (!!this.files.length) {
        axios
          .post(
            window.baseurl + "attachment/uploadAttach.do",
            this.uploadForm,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
          .then(res => {
            if (res.data.state == "success") {
              this.form.fileList = res.data.data;
              this.$emit("handleCommitTB", this.form);
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          })
          .catch(error => {});
      } else {
        this.$emit("handleCommitTB", this.form);
      }
    },
    newFiles(file) {
      this.files = [];
      this.files.push(file);
      this.uploadForm.append("fileUpload", file);
      return true;
    },
    // 获取服务问题分页列表
    pageActiveServiceProblem(){
      this.$get(this.API.pageActiveServiceProblem,{
        curPage:1,
        pageSize:9999,
        cpbh:this.rowData.cpbh,
        zbwid:this.rowDatawid
      }).then(res=>{
        if(res.state=='success'){
          if(!res.data.rows){
            this.wtList = []
          }else[
            this.wtList = res.data.rows
          ]
        }
      })
    },
    // 获取服务风险分页列表
    pageActiveServiceRisk(){
      this.$get(this.API.pageActiveServiceRisk,{
        curPage:1,
        pageSize:9999,
        cpbh:this.rowData.cpbh,
        zbwid:this.rowData.wid
      }).then(res=>{
        if(res.state=='success'){
          if(!res.data.rows){
            this.fxList = []
          }else[
            this.fxList = res.data.rows
          ]
        }
      })
    },
    validate() {
      if (!this.form.sm) {
        this.$alert("请填写提报说明!", "提示", {
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
    wids: {
      type: String,
      default: ""
    },
    rowData:{
      type: Object,
      default:()=>{
        return {}
      }
    },
    isMultiple:{
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        this.form.sm = "";
        this.form.fileList = [];
        this.files = [];
        this.uploadForm.append("fileUpload", "");
      } else {
        this.pageActiveServiceProblem();
        this.pageActiveServiceRisk();
      }
    }
  },
  components: { wtDialog, fxDialog }
};
</script>

<style lang="scss" scoped>
.dialog-tbfw {
  padding: 15px 20px;
  .dialog-tbfw-option {
    max-height: calc(100vh - 250px);
    overflow-y: auto;
  }
  .option-list {
    margin: 5px 15px;
    border-bottom: 1px dashed #999;
    font-size: 12px;
    
    &:hover{
      .option-list-index{
        display: none;
      }
      .el-icon-close{
        display: inline-block !important;
      }
    }
    
    .option-list-left {
      width: 10%;
      text-align: center;
      span{
          display: inline-block;
          width: 20px;
          height: 20px;
          color: #ccc;
          border: 1px solid #ccc;
          text-align: center;
          line-height: 20px;
          border-radius: 50%;
      }
      .el-icon-close{
          color: #f00;
          border: 1px solid #f00;  
          display: none;
          &:hover{
            cursor: pointer;
          }
      }
    }
    .option-list-right {
      width: 90%;
    }
  }
}
</style>
