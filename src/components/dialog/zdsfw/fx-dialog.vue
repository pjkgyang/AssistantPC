<template>
  <div>
    <el-dialog title="添加风险" width="700px" top="30px" :visible.sync="visible" :append-to-body="true"
      :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-tjfx">
        <h5>添加风险</h5>
        <el-form ref="form" :model="form" label-width="90px" size="mini">
          <el-form-item label="风险状态" required>
            <el-radio-group v-model="form.zt">
              <el-radio :label="0">待处理</el-radio>
              <el-radio :label="1">已处理</el-radio>
              <el-radio :label="2">无需处理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="风险描述" required>
            <el-autocomplete v-model="form.fxms" style="width:550px;" :fetch-suggestions="remoteMethod" placeholder="请输入内容"
              @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item label="风险等级" required>
            <el-radio-group v-model="form.fxdj">
              <el-radio :label="1">S1</el-radio>
              <el-radio :label="2">S2</el-radio>
              <el-radio :label="3">S3</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="处理工时" :required="form.zt == 1">
            <el-input type="text" style="width:100%" v-model="form.gs" placeholder="请输入工时(不能小于0)"></el-input>
          </el-form-item>
          <el-form-item label="处理建议" :required="form.zt == 0">
            <el-input type="textarea" rows="3" v-model="form.cljy" placeholder="请输入处理建议"></el-input>
          </el-form-item>
          <el-form-item label="处理结果" :required="form.zt != 0">
            <el-input type="textarea" rows="3" v-model="form.cljg" placeholder="请输入处理结果"></el-input>
          </el-form-item>
          <el-form-item label="上传附件">
            <div>
              <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" :before-upload="newFiles"
                :on-remove="handleRemove" multiple :file-list="files">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </div>
          </el-form-item>
        </el-form>
        <h5>历史风险</h5>
        <div class="history-fx">
          <div class="option-list" v-for="fx in fxList">
            <p class="filter-weight">{{fx.cpmc}}&#x3000;{{fx.fwnr}}</p>
            <p>
              <span class="filter-weight">风险描述：</span>
              <span style="color:#f00">{{fx.fxms}}</span>
            </p>
            <p>
              <span class="filter-weight">处理建议：</span>
              <span style="color:green">{{fx.cljy}}</span>
            </p>
            <p>
               <span class="filter-weight">是否处理：</span>
              <span style="color:green">{{fx.zt==0?'待处理':'已处理'}} &#x3000;
                <span v-if="fx.zt==1">{{fx.cljg}}</span>
              </span>
            </p>
            <p v-if="!!fx.fjList"><span>相关附件：</span>
              <a style="margin-right:30px;" v-for="fj in fx.fjList" :href="baseUrl+'attachment/downloadFile.do?fjId='+fj.fjbh">{{fj.fjmc}}</a>
            </p>
          </div>
        </div>
        <div text-center v-if="total > currentPage">
          <a href="javaScript:;;" @click="handleCheckMore">查看更多内容...</a>
        </div>
        <div text-right>
          <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </div>
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
        visible: this.show,
        upload_url: "123",
        uploadForm: new FormData(),
        files: [],
        baseUrl: '',
        form: {
          fxms: "",
          cljy: "",
          cljg: "",
          fxdj: 1,
          zt: 0,
          gs: "",
          fileList: ""
        },
        restaurants: [],
        // loading: false,
        fxmsList: [],
        fxList: [],
        currentPage: 1,
        total: 0
      };
    },
    methods: {
      // 查看更多
      handleCheckMore() {
        this.currentPage = 1;
        this.pageActiveServiceProblem();
      },
      // 风险描述搜索
      remoteMethod(queryString, callback) {
        this.fxmsList = []
        this.$get(this.API.pageRiskSets, {
          curPage: 1,
          pageSize: 10,
          fxdj: this.form.fxdj,
          keyword: queryString
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.fxmsList = []
            } else {
              this.fxmsList = res.data.rows
            }
            this.fxmsList.forEach(ele => {
              ele.value = ele.fxms
            })
            callback(this.fxmsList);
          }
        })
      },
      handleSelect(item) {

      },
      handleClose() {
        this.visible = false;
      },
      handleCommit() {
        if (!this.validate()) return;
        this.$refs.uploadfile.submit();
        if (!!this.files.length) {
          axios.post(
              window.baseurl + "attachment/uploadAttach.do",
              this.uploadForm, {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              }
            ).then(res => {
              if (res.data.state == "success") {
                this.form.fileList = res.data.data;
                this.$emit("handleAddFx", this.form);
              } else {
                this.$alert(res.data.msg, "提示", {
                  confirmButtonText: "确定",
                  type: "error"
                });
              }
            })
            .catch(error => {});
        } else {
          this.$emit("handleAddFx", this.form);
        }
      },

      // 移除附件
      handleRemove(file, fileList) {
        this.uploadForm.append("fileUpload", "");
      },

      newFiles(file) {
        this.files = [];
        this.files.push(file);
        this.uploadForm.append("fileUpload", file);
        return true;
      },

      //获取服务风险分页列表
      pageActiveServiceRisk() {
        this.$get(this.API.pageActiveServiceRisk, {
          curPage: this.currentPage,
          pageSize: 6,
          cpbh: this.rowData.cpbh,
          xmbh: this.rowData.xmbh
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.fxList = []
            } else {
              if (this.currentPage == 1) {
                this.fxList = res.data.rows
              } else {
                this.fxList = this.fxList.concat(res.data.rows);
              }
            }
            this.total = res.data.total
          }
        })
      },
      // 风险库
      pageRiskSets(keyword) {
        this.$get(this.API.pageRiskSets, {
          curPage: 1,
          pageSize: 10,
          fxdj: this.form.fxdj,
          keyword: keyword
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.fxmsList = []
            } else {
              this.fxmsList = res.data.rows
            }
          }
        })
      },
      validate() {
        if (!this.form.fxms) {
          this.$alert("请输入风险描述!", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return false;
        }
        if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(this.form.gs) && this.form.zt == 1) {
          this.$alert('请输入正确工时', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if (!this.form.cljy && this.form.zt == '0') {
          this.$alert("请输入处理建议", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return false;
        }
        if (!this.form.cljg && this.form.zt != '0') {
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
      rowData: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    watch: {
      show(n, o) {
        this.visible = this.show;
        if (!n) {
          this.form.fxms = "";
          this.form.cljy = this.form.cljg = this.form.gs = "";
        } else {
          this.baseUrl = window.baseurl;
          this.currentPage = 1;
          this.pageActiveServiceRisk();
        }
      }
    },
    components: {}
  };
</script>

<style lang="scss" scoped>
  .dialog-tjfx {
    padding: 15px 30px;

    h5 {
      margin: 8px 0 !important;
      font-weight: 700;
      border-left: 4px solid rgb(157, 75, 224);
      padding: 0 5px;
    }

    .history-fx {
      max-height: calc(100vh - 420px);
      overflow-y: auto;
      margin-bottom: 10px;
    }

    .option-list {
      border-bottom: 1px dashed #999;
      margin: 5px 15px;
      font-size: 12px;
    }
  }

  .el-form-item--mini.el-form-item {
    margin-bottom: 4px;
  }
</style>
