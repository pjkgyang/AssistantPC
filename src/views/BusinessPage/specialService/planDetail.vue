<template>
  <div class="fwjh-Detail">
    <div class="fwjh-Detail-content">
      <tableLayout>
        <section slot="top">
          <h5>专项服务</h5>
          <div class="contentMark">
            <table>
              <tr>
                <th class="contenTitle">项目名称</th>
                <td>{{planData.xmmc}}</td>
                <th class="contenTitle">项目编号</th>
                <td>{{planData.xmbh}}</td>
              </tr>
              <tr>
                <th class="contenTitle">计划开始日期</th>
                <td>{{planData.jhkssj}}</td>
                <th class="contenTitle">计划结束日期</th>
                <td>{{planData.jhjssj}}</td>
              </tr>
              <tr>
                <th class="contenTitle">服务阶段</th>
                <td>{{planData.fwjd}}</td>
                <th class="contenTitle">服务项</th>
                <td>{{planData.fwx}}</td>
              </tr>
              <tr>
                <th class="contenTitle">金智责任人</th>
                <td>{{planData.jzfzrxm}}</td>
                <th class="contenTitle">学校责任人</th>
                <td>{{planData.xxfzrxm}}</td>
              </tr>
              <tr>
                <th class="contenTitle">服务内容</th>
                <td colspan="3">{{planData.fwnr}}</td>
              </tr>
            </table>
          </div>
        </section>
        <section slot="bottom">
          <div class="contetnProgress">
            <h5>计划进度</h5>
            <div class="contentMark">
              <!-- <el-scrollbar style="height:calc(100vh - 300px);"> -->
              <div
                v-if="!!jdList.length"
                v-for="(jd,index) in jdList"
                :class="{'progress-dot':true,'progress-dot-last':index == (jdList.length-1)}"
              >
                <div>
                  <span>
                    {{jd.cjsj}}&#x3000;
                    <span
                      style="color:rgb(21, 145, 202)"
                    >{{!jd.czrxm?'':jd.czrxm}}</span>
                    &#x3000;{{jd.czlxmc}}
                  </span>
                  <div :class="{'jd-content':jd.czlx == 4}" v-html="jd.cznr"></div>
                </div>
              </div>
              <div v-if="!jdList.length" class="emptyContent">
                <img src="static/img/empty.png" alt />
                <p>暂无日志记录</p>
              </div>
              <!-- </el-scrollbar> -->
            </div>
          </div>
          <br />
          <div class="contetnProgress">
            <h5>记录项</h5>
            <div class="contentMark">
              <!-- <el-scrollbar style="height:calc(100vh - 300px);"> -->
              <div v-if="!!jlList.length">
                <div                  
                  v-for="(jl,index) in jlList"
                  :class="{'progress-dot':true,'progress-dot-last':index == (jlList.length-1)}"
                  :key="index"
                >
              </div>
                <div>
                  <span>
                    {{jl.jlsj}}&#x3000;
                    <span
                      style="color:rgb(21, 145, 202)"
                    >{{!jl.jlrxm?'':jl.jlrxm}}</span>
                    &#x3000;服务日期：{{jl.fwrq}}&#x3000;工时：{{jl.trgs}}
                  </span>
                  <div v-html="jl.nr"></div>
                </div>
              </div>
              <div v-if="!jlList.length" class="emptyContent">
                <img src="static/img/empty.png" alt />
                <p>暂无日志记录</p>
              </div>
              <!-- </el-scrollbar> -->
            </div>
          </div>

          <div class="mg-12" v-if="!!$route.query.jl">
            <div flex>
              <p>
                <span class="filter-weight before-require">服务日期：</span>
                <el-date-picker
                  type="date"
                  size="mini"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  v-model="formData.fwrq"
                ></el-date-picker>
              </p>&#x3000;&#x3000;
              <p colcenter>
                <span class="filter-weight before-require" style="width:110px">投入工时：</span>
                <el-input size="mini" type="text" placeholder="请填写投入工时" v-model="formData.trgs"></el-input>
              </p>
            </div>
            <div>
              <span class="filter-weight">过程记录：</span>
              <el-input
                v-model="formData.nr"
                type="textarea"
                :rows="3"
                :maxlength="500"
                style="width:100%"
                placeholder="请输入过程记录"
              ></el-input>
            </div>
            <br />
            <div text-right>
              <el-button size="mini" type="primary" @click="handleClick('tj')">提交</el-button>
              <el-button size="mini" @click="handleClick('qx')">取消</el-button>
            </div>
          </div>
        </section>
      </tableLayout>
    </div>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
export default {
  data() {
    return {
      baseUrl: "",
      jdList: [], //进度
      jlList: [], //记录
      planData: {},
      formData: {
        fwrq: "",
        trgs: 0,
        nr: ""
      }
    };
  },
  methods: {
    handleClick(type) {
      switch (type) {
        case "tj":
          if (!/^\d+(\.\d+)?$/.test(this.formData.trgs)) {
            this.$message({ message: "请填写正确工时", type: "warning" });
            return;
          }
          this.$post(this.API.addSpecailServiceJL, {
            wid: this.$route.query.wid,
            nr: this.formData.nr,
            fwrq: this.formData.fwrq,
            trgs: this.formData.trgs
          }).then(res => {
            if (res.state == "success") {
              this.$message({ message: "保存成功", type: "success" });
              this.formData.fwrq = "";
              this.formData.trgs = 0;
              this.formData.nr = "";
              this.findSpecailServiceJL();
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
          break;
        case "qx":
          this.$emit("handleCloseDialog", "");
          break;
        default:
          break;
      }
    },
    //  获取专项服务
    getSpecialService() {
      this.$get(this.API.getSpecialService, {
        wid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          this.planData = res.data;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 获取记录日志
    listOperationLog() {
      this.$get(this.API.listOperationLogZxfw, {
        wid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data) {
            this.jdList = res.data;
          } else {
            this.jdList = [];
          }
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 获取记录日志
    findSpecailServiceJL() {
      this.$get(this.API.findSpecailServiceJL, {
        wid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data) {
            this.jlList = res.data;
          } else {
            this.jlList = [];
          }
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    }
  },

  mounted() {
    this.getSpecialService();
    this.listOperationLog();
    this.findSpecailServiceJL();
  },
  components: {
    tableLayout
  }
};
</script>

<style lang="scss" scoped>
.fwjh-Detail {
  padding: 10px 0;
  height: 100%;

  .fwjh-Detail-content {
    width: 90%;
    background: #fff;
    border-radius: 5px;
    margin: 0 auto;
    padding: 10px 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    h5,
    h6 {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 10px !important;
      padding-left: 5px;
      border-left: 4px solid rgb(177, 55, 214);
    }

    h6 {
      font-size: 12px;
    }
  }

  .contentMark {
    padding: 0 30px;

    .emptyContent {
      width: 200px;
      text-align: center;
      padding: 20px 0;

      img {
        width: 100px;
        height: 100px;
      }

      p {
        margin: 5px 0 !important;
      }
    }

    table {
      margin: 15px 0;
      width: 100%;
      border-color: #ccc;

      td,
      th {
        border: 1px solid rgb(233, 230, 230);
        padding: 5px;
      }
      th {
        text-align: center;
      }

      tr > td:nth-child(even) {
        width: 35%;
      }
    }
  }
}
.contetnProgress {
  border-bottom: 1px solid rgb(233, 230, 230);
}
.contenTitle {
  width: 15% !important;
  font-weight: 700;
  color: #807e7e;
  background: rgb(247, 244, 244);
}

.progress-dot {
  padding: 0 30px 10px;
  position: relative;
  min-height: 60px;

  div {
    color: #636161;
    font-size: 13px;
  }
}

.progress-dot:before {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 2px;
  width: 20px;
  height: 20px;
  background: #2a82e4;
  border-radius: 50%;
}

.progress-dot::after {
  content: "";
  width: 1px;
  height: calc(100% - 20px);
  position: absolute;
  top: 22px;
  left: 10px;
  border-left: 1px solid #2a82e4;
}

.progress-dot-ywc::before {
  background: #2a82e4;
}

.progress-dot-ywc::after {
  border-color: #2a82e4;
}

.progress-dot-last:after {
  display: none;
}

.option-list {
  border-bottom: 1px dashed #999;
  margin: 10px 0px;
  font-size: 12px;
  padding: 0 10px 5px;

  .option-list-index {
    margin-right: 10px;

    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid rgb(54, 54, 54);
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
    }
  }
}

.jd-content {
  // font-weight: 700;
  color: rgb(21, 145, 202) !important;
}
</style>
