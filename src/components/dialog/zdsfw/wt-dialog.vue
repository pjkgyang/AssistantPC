<template>
  <div>
    <el-dialog title="添加问题" width="700px" top="30px" :visible.sync="visible" :append-to-body="true"
      :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-wt">
        <h5>添加问题</h5>
        <el-form ref="form" :model="formData" label-width="90px" size="mini">
          <el-form-item label="问题状态">
            <el-radio-group v-model="formData.zt">
              <el-radio :label="0">待处理</el-radio>
              <el-radio :label="1">已处理</el-radio>
              <el-radio :label="2">无需处理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="问题描述" required>
            <el-autocomplete v-model="formData.ms" style="width:550px;" :fetch-suggestions="remoteMethod" placeholder="请输入问题描述"
              @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item label="处理工时" :required="formData.zt == 1">
            <el-input type="text" style="width:100%" v-model="formData.gs" placeholder="请输入工时(不能小于0)"></el-input>
          </el-form-item>
          <el-form-item label="处理建议" :required="formData.zt == 0">
            <el-input type="textarea" rows="3" v-model="formData.jy" placeholder="请输入处理建议"></el-input>
          </el-form-item>
          <el-form-item label="处理结果" :required="formData.zt != 0">
            <el-input type="textarea" rows="3" v-model="formData.jg" placeholder="请输入处理结果"></el-input>
          </el-form-item>
        </el-form>
        <h5>历史问题</h5>
        <div class="history-wt">
          <div class="option-list" v-for="wt in wtList">
            <p class="filter-weight">{{wt.cpmc}}&#x3000;{{wt.fwnr}}</p>
            <p>
              <span class="filter-weight">问题描述：</span>
              <span style="color:#f00">{{wt.wtms}}</span>
            </p>
            <p>
              <span class="filter-weight">处理结果：</span>
              <span style="color:green">{{wt.cljg}}</span>
            </p>
            <p>
              <span class="filter-weight">处理建议：</span>
              <span style="color:green">{{wt.clyj}}</span>
            </p>
          </div>
          <div text-center v-if="total > currentPage">
            <a href="javaScript:;;" @click="handleCheckMore">查看更多内容...</a>
          </div>
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
  export default {
    data() {
      return {
        visible: this.show,
        formData: {
          ms: "",
          jy: "",
          jg: "",
          zt: 0,
          gs: ""
        },
        currentPage: 1,
        loading: false,
        wtmsList: [], //问题描述关键字
        wtList: [],
        total: 0
      };
    },
    methods: {
      // 查看更多
      handleCheckMore() {
        this.currentPage += 1;
        this.pageActiveServiceProblem();
      },
      // 搜索问题库
      remoteMethod(queryString, callback) {
        this.wtmsList = []
        this.$get(this.API.pageProblemSets, {
          curPage: 1,
          pageSize: 10,
          keyword: queryString
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.wtmsList = []
            } else {
              this.wtmsList = res.data.rows
            }
            this.wtmsList.forEach(ele => {
              ele.value = ele.wtms
            })
            callback(this.wtmsList);
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
        this.$emit("handleAddWt", this.formData);
      },
      //获取服务问题分页列表
      pageActiveServiceProblem() {
        this.$get(this.API.pageActiveServiceProblem, {
          curPage: this.currentPage,
          pageSize: 8,
          cpbh: this.rowData.cpbh,
          xmbh: this.rowData.xmbh
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.wtList = []
            } else {
              if (this.currentPage == 1) {
                this.wtList = res.data.rows
              } else {
                this.wtList = this.wtList.concat(res.data.rows)
              }
            }
            this.total = res.data.total
          }
        })
      },
      // 问题库
      pageProblemSets(keyword) {
        this.$get(this.API.pageProblemSets, {
          curPage: 1,
          pageSize: 10,
          keyword: keyword
        }).then(res => {
          if (res.state == 'success') {
            if (!res.data.rows) {
              this.wtmsList = []
            } else [
              this.wtmsList = res.data.rows
            ]
          }
        })
      },
      validate() {
        if (!this.formData.ms) {
          this.$alert("请输入问题描述!", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return false;
        }
        if (!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(this.formData.gs) && this.formData.zt == 1) {
          this.$alert('请输入正确工时', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
          return false;
        }
        if (!this.formData.jy && this.formData.zt == '0') {
          this.$alert("请输入处理建议", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return false;
        }
        if (!this.formData.jg && this.formData.zt != '0') {
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
          this.formData.ms = this.formData.jg = this.formData.jy = this.formData.gs = ''
        } else {
          this.currentPage = 1;
          this.pageActiveServiceProblem();
        }
      }
    },
    components: {}
  };
</script>

<style lang="scss" scoped>
  .dialog-wt {
    padding: 15px 30px;

    h5 {
      margin: 8px 0 !important;
      font-weight: 700;
      border-left: 4px solid rgb(157, 75, 224);
      padding: 0 5px;
    }

    .history-wt {
      max-height: calc(100vh - 350px);
      overflow-y: auto;
      font-size: 12px;
    }

    .option-list {
      border-bottom: 1px dashed #999;
      margin: 5px 15px;
    }
  }

  .el-form-item--mini.el-form-item {
    margin-bottom: 8px;
  }
</style>
