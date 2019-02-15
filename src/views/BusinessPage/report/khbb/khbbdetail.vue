<template>
  <div class="pd-10">
    <div class="bgfff">
      <h4>{{$route.params.id == 'ydjlwtxq'||queryMark == 1?'月度奖励':$route.params.id == 'shgs'?'售后工时':'月度考核'}}报表 -{{$route.params.id.includes('ts')?'投诉详情': $route.params.id.includes('wt')?'问题详情': $route.params.id.includes('lcbxq')?'里程碑详情': $route.params.id.includes('shgs')?'售后工时详情': $route.params.id.includes('ydjlwtxq')?'问题详情':'详情'}}
      </h4>
      <div text-right>
        <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
      </div>
      <reportTable :type="$route.params.id" :tableData="dataList" :pageShow="true" :currentPage="currentPage" :pageSize="pageSize" @handleCurrentChange="handleCurrentChange" :exportShow="false" :indexArr='[]' :widthArr="$route.params.id == 'shgs'?[3]:$route.params.id == 'wt'||$route.params.id == 'ydjlwtxq'||$route.params.id == 'ts'?[1,3]:[2,6]" :rowWidth="$route.params.id == 'shgs'?'300':'300'" :Width="'140'" :Height="180" @handleXxwt="handleXxwt"></reportTable>
    </div>
  </div>
</template>

<script>
import reportTable from "@/components/reportTable/tableComponents.vue";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 25,
      dataList: {},
      queryData: {},
      routePath: "",
      queryMark: ""
    };
  },
  methods: {
    handleExport() {
      let url = '';
      let param = '';
      // 考核报表详情
      if (this.$route.params.id == "lcbxq") {  // 里程碑(奖励，考核)
        url = 'assessment/exportYdkhlcbxqb.do'
        param = window.location.hash.split('?')[1]
        if(param.indexOf('&ydjl=1') != -1){
         param = param.replace('&ydjl=1','')
        }
      }
      if(this.$route.params.id == "wt"){       // 问题
        url = 'assessment/exportYdkhwtxqb.do'
        param = window.location.hash.split('?')[1]
      }
      if(this.$route.params.id == "ts"){        // 投诉
        url = 'assessment/exportYdkhtsxqb.do'
        param = 'yf='+this.queryData.yf+'&rygh='+this.queryData.rygh
      }
      // 售后工时详情
      if(this.$route.params.id == "shgs"){      //售后工时
        url = 'assessment/exportYdwtshgsxqb.do'
        param = window.location.hash.split('?')[1]
      }
      // 月度奖励详情
      if(this.$route.params.id == "ydjlwtxq"){  //问题
        url = 'assessment/exportYdjlwtxqb.do'
        param = window.location.hash.split('?')[1]
      }
      window.open(
          window.baseurl + url+"?"+param
      );
    },
    handleXxwt(data, i, params) {
      if (
        window.location.hash.includes("/khbbdetail/wt") ||
        window.location.hash.includes("/khbbdetail/ydjlwtxq") ||
        window.location.hash.includes("/khbbdetail/ts") ||
        (window.location.hash.includes("/khbbdetail/shgs") &&
          params[i].zh == "问题标题")
      ) {
        let routeData = this.$router.resolve({
          path: window.location.hash.includes("/khbbdetail/ts")
            ? "/complaintDetail"
            : "/questionDetail",
          query: {
            wid: data[0]
          }
        });
        window.open(routeData.href, "_blank");
        return;
      }
      if (this.$route.params.id == "shgs") {
        this.$get(this.API.nfxggs, {
          rygh: data[1],
          yf: this.queryData.yf
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
                    gs: value,
                  }).then(res => {
                    if (res.state == "success") {
                      this.$alert("修改成功", "标题名称", {
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
    handleCurrentChange(data) {
      this.queryData.curPage = data;
      this.routeGo();
    },
    getTsxqb() {
      this.$get(this.API.ydkhtsxqb, this.queryData).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    },
    getLcbxqb() {
      this.$get(this.API.ydkhlcbxqb, this.queryData).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    },
    getWtxqb() {
      this.$get(this.API.ydkhwtxqb, this.queryData).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    },
    // 月度奖励问题详情
    ydjlwtxqb() {
      this.$get(this.API.ydjlwtxqb, this.queryData).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    },

    ydwtshgsxqb() {
      this.$get(this.API.ydwtshgsxqb, this.queryData).then(res => {
        if (res.state == "success") {
          this.dataList = res.data;
        }
      });
    },
    routeGo() {
      switch (this.$route.params.id) {
        case "ts":
          this.getTsxqb();
          break;
        case "wt":
          this.getWtxqb();
          break;
        case "shgs":
          this.ydwtshgsxqb();
          break;
        case "lcbxq":
          this.getLcbxqb();
          break;
        case "ydjlwtxq":
          this.ydjlwtxqb();
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    // this.queryData = JSON.parse(
    //   window.atob(this.$route.params.id.split("&")[1])
    // );
    this.queryData = this.$route.query;
    this.queryData.curPage = 1;
    this.queryData.pageSize = this.pageSize;
    if (this.queryData.ydjl) {
      this.queryMark = this.queryData.ydjl;
      delete this.queryData.ydjl;
    } else {
      this.queryMark = "";
    }
    this.routeGo();
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
</style>
