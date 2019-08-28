<template>
  <div class="pd-10">
    <div class="bgfff">
      <div flex>
        <p class="query-title">高级查询:</p>
        <p>
          <el-input
            v-model="keyword"
            style="width:493px;"
            size="mini"
            placeholder="请输入问题标题/问题编号/发布人"
            @change="handleSearch"
          ></el-input>&#x3000;
          <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
        </p>
      </div>
      <div flex style="margin:10px 0">
        <p class="query-title">月份:</p>
        <p>
          <el-date-picker
            @change="handleChangeYf"
            size="mini"
            v-model="yf"
            value-format="yyyy-MM"
            type="month"
            placeholder="选择月"
          ></el-date-picker>
        </p>
      </div>
      <!-- 结算状态 -->
      <div flex>
        <p class="query-title">结算状态:</p>
        <p class="query-list">
          <span :class="{'bg-active':jszts == ''}" @click="handleFilterJSZT('')">全部</span>
          <span
            v-for="jszt in jsztMenu"
            :class="{'bg-active':jszts == jszt.label}"
            :key="jszt.id"
            @click="handleFilterJSZT(jszt.label)"
          >{{jszt.mc}}</span>
        </p>
      </div>
      <div text-right>
        <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
      </div>
      <reportTable
        :type="shgs"
        :tableData="dataList"
        :pageShow="true"
        :currentPage="currentPage"
        :pageSize="pageSize"
        @handleCurrentChange="handleCurrentChange"
        :exportShow="false"
        :indexArr="[]"
        :widthArr="[3]"
        :rowWidth="'300'"
        :Width="'140'"
        :Height="320"
        @handleXxwt="handleXxwt"
      ></reportTable>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="500px">
      <div class="jszt-dialog">
        <h4>请选择结算标志:</h4>
        <el-radio-group v-model="jsztRadio">
          <el-radio v-for="(zt,index) in jsztMenu" :key="index" :label="zt.label">{{zt.mc}}</el-radio>
        </el-radio-group>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleCommit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import reportTable from "@/components/reportTable/tableComponents.vue";
import { getMenu, getSession, getPreMonth } from "@/utils/util.js";
export default {
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 18,
      dataList: {},
      routePath: "",
      queryMark: "",

      jsztRadio: "0", //结算状态 单选
      jsztMenu: [],
      keyword: "",
      jszts: "", //结算状态
      yf: "",

      wid: "", //问题wid
      rygh: "", //人员工号
      index: ""
    };
  },
  props: {
    isJsqd: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSearch() {
      this.ydwtshgsxqb();
    },
    // 结算状态
    handleFilterJSZT(data) {
      this.jszts = data;
      this.ydwtshgsxqb();
    },
    handleCommit() {
      this.xgjszt();
    },
    handleXxwt(data, i, params) {
      this.wid = data[0];
      this.rygh = data[1];
      this.index = i;
      let url;
      if (params[i].zh == "问题标题") {
        url = "/questionDetail";
        let routeData = this.$router.resolve({
          path: url,
          query: { wid: data[0] }
        });
        window.open(routeData.href, "_blank");
      }
      if (params[i].zh == "结算状态") {
        this.$get(this.API.nfxgjszt, {
          rygh: data[1],
          wid: data[0]
        }).then(res => {
          if (res.state == "success") {
            if (!!res.data) {
              this.dialogVisible = true;
            } else {
              this.$alert(
                "对不起，您无权修改结算状态!如有疑问，请联系管理员",
                "提示",
                {
                  confirmButtonText: "确定",
                  type: "warning"
                }
              );
            }
          }
        });
      }
      if (params[i].zh == "核准工时" && !!this.isJsqd) {
        this.$get(this.API.nfxggs, {
          rygh: data[1],
          wid: data[0]
        }).then(res => {
          if (res.state == "success") {
            if (!res.data) {
              this.$alert(
                "对不起，您无权修改工时!如有疑问，请联系管理员;",
                "提示",
                { confirmButtonText: "确定", type: "warning" }
              );
            } else {
              this.$prompt("请输入工时", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPattern: /^\d+(\.\d+)?$/,
                inputErrorMessage: "工时格式不正确"
              })
                .then(({ value }) => {
                  this.$get(this.API.xggs, {
                    wid: data[0],
                    rygh: data[1],
                    gs: value
                  }).then(res => {
                    if (res.state == "success") {
                      this.$alert("修改成功", "提示", {
                        confirmButtonText: "确定",
                        callback: action => {
                          this.ydwtshgsxqb();
                        }
                      });
                    }
                  });
                })
                .catch(() => {});
            }
          }
        });
      }
    },
    // 修改结算状态
    xgjszt() {
      this.$get(this.API.xgjszt, {
        yf: this.yf,
        wid: this.wid,
        rygh: this.rygh,
        jszt: this.jsztRadio
      }).then(res => {
        if (res.state == "success") {
          // 当选择不结算和后续结算后，自动修改核准工时为0；
          if (this.jsztRadio != "0") {
            this.ydwtshgsxqb();
          }
          this.$message({
            showClose: true,
            message: "保存成功~",
            type: "success"
          });
          this.dialogVisible = false;
        }
      });
    },
    // 导出
    handleExport() {
      window.open(
        window.baseurl +
          "assessment/exportYdwtshgsxqb.do?yf=" +
          this.yf +
          "&keyword=" +
          this.keyword +
          "&jszt=" +
          this.jszts +
          "&isPersonal=true"
      );
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.ydwtshgsxqb();
    },
    handleChangeYf() {
      this.ydwtshgsxqb();
    },
    // 售后个人工时详情
    ydwtshgsxqb() {
      this.$get(this.API.ydwtshgsxqb, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        isPersonal: this.isJsqd ? false : true,
        yf: this.yf,
        jszt: this.jszts,
        keyword: this.keyword
      }).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    }
  },
  mounted() {
    if (!getSession("wtgsjszt")) {
      getMenu("wtgsjszt", this.jsztMenu, true); //获取产品线
    } else {
      this.jsztMenu = getSession("wtgsjszt");
    }

    let date =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1);
    this.yf = getPreMonth(date);
    this.ydwtshgsxqb();
  },
  components: { reportTable }
};
</script>

<style lang="scss" scoped>
.bgfff {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  h4 {
    margin: 10px 0 !important;
    font-weight: 700;
  }
}
.jszt-dialog {
  padding: 20px;
  h4 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px !important;
  }
}
</style>
