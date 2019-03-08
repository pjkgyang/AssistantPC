<template>
  <div>
    <el-dialog title="培训" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-xjjh">
        <el-form ref="form" :model="form" label-width="115px" size="mini" :inline="true">
          <el-form-item label="产品" required>
            <el-input :disabled="true" v-model="form.cpmc" placeholder="" style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="培训主题" required>
            <el-input  v-model="form.pxzt" placeholder="" style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="培训形式" required>
            <el-select v-model="form.pxxs" placeholder="请选择" style="width:550px">
                <el-option v-for="item in pxxsList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item><br>
          <el-form-item label="计划培训日期" required>
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.jhpxsj" style="width:210px"></el-date-picker>
          </el-form-item>
          <el-form-item label="分享人" required>
            <el-input  v-model="form.fxrxm" placeholder="" style="width:213px" @focus="handleChooseZrr"></el-input>
          </el-form-item><br>
          <el-form-item label="实际完成时间">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="form.sjwcsj" style="width:550px"></el-date-picker>
          </el-form-item><br>
          <el-form-item label="培训视频" >
            <el-input type="textarea" v-model="form.pxsp" placeholder='请输入视频地址(用英文逗号 " , " 隔开)' style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="培训课时(小时)" >
            <el-input  v-model="form.pxsc" placeholder="请输入培训时长" style="width:550px"></el-input>
          </el-form-item><br>
          <el-form-item label="培训课件" >
            <div>
              <el-upload class="upload-demo" ref="uploadfile" :action="upload_url" :auto-upload="false" :before-upload="newFiles" :on-remove="handleRemove" multiple>
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">上传单个文件不能超过10M</div> -->
              </el-upload>
            </div>
          </el-form-item><br>
          <el-form-item label="参加人员" required>
            <el-button size="mini" type="primary" @click="handleAddtjry">添加</el-button>
            <div class="out-table" v-if="!!tableData.length">
              <table class="table table-top" border>
                <thead>
                  <tr v-if="tableData.length != 0">
                    <th>工号</th>
                    <th>姓名</th>
                    <th>部门</th>
                    <th>观看直播时长</th>
                    <th>观看回放时长</th>
                    <th>观看总时长</th>
                    <th>提示</th>
                  </tr>
                </thead>
              </table>
              <div class="tbody-table">
                <table class="table" border>
                  <tr v-for="(table,i) in tableData" :key="i" :class="{'errorActive':!table.success}">
                    <td>{{table.data.gh}}</td>
                    <td>{{table.data.xm}}</td>
                    <td>{{table.data.bm}}</td>
                    <td>{{table.data.zbsc}}</td>
                    <td>{{table.data.hfsc}}</td>
                    <td>{{table.data.zsc}}</td>
                    <td>{{table.msg}}</td>
                  </tr>
                </table>
              </div>
              <p>已验证成功人员：{{ryNum}}</p>
            </div>
          </el-form-item><br>
          <el-form-item style="float:right">
            <div>
              <el-button size="mini" type="primary" @click="handleCommit">保存</el-button>
              <el-button size="mini" @click="handleClose">取消</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <zrrDialog :show.sync="zrrShow" @handleAddZrr="handleAddZrr"></zrrDialog>
    <cjryDialog :show.sync="tjryDialog" :wid="itemData.wid" @handleUploadSuccess="handleUploadSuccess"></cjryDialog>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
import zrrDialog from "@/components/dialog/wtfp/zrr-dialog.vue";
import cjryDialog from "@/components/dialog/wtfp/cjry-dialog.vue";
export default {
  data() {
    return {
      visible: this.show,
      zrrShow:false,
      form: {
        cpmc: "",
        pxzt: "",
        pxxs: "",
        jhpxsj: "",
        sjwcsj: "",
        fxrxm: "",
        fxrbh:"",
        pxsp: "",
        fileList: "",
        pxsc:"",
        ry: ""
      },
      pxxsList: [
        {
          value: "1",
          label: "线上直播"
        },
        {
          value: "2",
          label: "线下培训"
        },
        {
          value: "3",
          label: "线上加线下"
        },
      ],
      upload_url: "123",
      uploadForm: new FormData(),
      files: [],
      tjryDialog: false,
      tableData: [],
      ryNum: ""
    };
  },
  methods: {
    handleChooseZrr(){
      this.zrrShow = !this.zrrShow
    },
    handleAddZrr(data){
      this.form.fxrbh = data.userid;
      this.form.fxrxm = data.username;
      this.zrrShow = !this.zrrShow;
    },
    // 人员列表
    handleUploadSuccess(data) {
      this.tableData = data.data;
      this.form.ry = data.ry;
      this.ryNum = data.count;
    },
    handleClose() {
      this.visible = false;
    },
    // 添加人员
    handleAddtjry() {
      this.tjryDialog = !this.tjryDialog;
    },
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
          )
          .then(res => {
            if (res.data.state == "success") {
              this.form.fileList = res.data.data;
              this.$emit("handleCommitSave", this.form);
            } else {
              this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          })
          .catch(error => {});
      } else {
        this.$emit("handleCommitSave", this.form);
      }
    },
    newFiles(file) {
      this.files = [];
      if (file.size / 1024 / 1024 < 100) {
        this.files.push(file);
        this.uploadForm.append("fileUpload", file);
        return true;
      } else {
        this.$message({
          message: '上传文件大小不能超过100MB',
          type: 'warning'
        });
        return false;
      }
    },

    validate() {
      if (!this.form.pxzt) {
        this.$alert("请选择培训主题", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.pxxs) {
        this.$alert("请选择培训形式", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.jhpxsj) {
        this.$alert("请选择计划培训时间", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (!this.form.fxrbh) {
        this.$alert("请选择分享人编号", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      // if (!this.form.sjwcsj) {
      //   this.$alert("请选择实际完成日期", "提示", {
      //     confirmButtonText: "确定",
      //     type: "warning"
      //   });
      //   return false;
      // }
      // if (!/^\d+(\.\d+)?$/.test(this.form.pxsc)) {
      //   this.$alert("请输入正确培训时长", "提示", {
      //     confirmButtonText: "确定",
      //     type: "warning"
      //   });
      //   return false;
      // }
      return true;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    itemData: {
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
        this.form.sjwcsj = "";
        this.form.pxsp = "";
        this.files = [];
        this.tableData = [];
        this.form.fileList = '';
        this.form.pxsc = '';
        this.uploadForm = new FormData();
        this.form.jhpxsj = "";
      } else {
        this.form.cpmc = this.itemData.cpmc;
        this.form.pxzt = this.itemData.pxzt;
        this.form.pxxs = this.itemData.pxxs
        this.form.jhpxsj = this.itemData.jhpxsj;
        this.form.fxrxm = this.itemData.fxrxm;
        this.form.fxrbh = this.itemData.fxrbh;
        
        this.form.sjwcsj = this.itemData.sjpxsj=='-'?'':this.itemData.sjpxsj;
        this.form.pxsp = this.itemData.pxsp=='-'?'':this.itemData.pxsp;
        this.form.pxsc = this.itemData.pxsc=='-'?'':this.itemData.pxsc;
      }
    }
  },
  components: { cjryDialog,zrrDialog }
};
</script>

<style lang="scss" scoped>
.dialog-xjjh {
  padding: 8px 10px;
  .el-form-item {
    margin-bottom: 10px;
  }
  .errorActive {
    background: rgba(240, 6, 6, 0.2) !important;
  }
  .out-table {
    width: 550px;
  }
  .table {
    border: 1px solid #ebeef5;
    margin: 0;
    tr,
    th {
      text-align: center;
      border-bottom: 1px solid #ebeef5;
    }
    // th:nth-of-type(3),
    // td:nth-of-type(3) {
    //   width: 30%;
    // }
  }
  .table.table-top {
    width: calc(100% - 1.2em) !important;
  }
  .table th,
  table td {
    width: 13%;
  }

  .tbody-table {
    max-height: 260px;
    overflow-y: scroll;
  }
}
</style>
