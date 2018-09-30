<template>
 <div class="xxts-pannel">
     <section flex spacearound>
            <h4>学校名称：<span class="fontRed">{{detailData.dw}}</span></h4>
            <h4>问题总数：<a href="javaScript:;;" class="fontRed" @click="handleCheckDetail('wtzs',detailData.wtzs)">{{detailData.wtzs}}</a></h4>
            <h4>消耗工时总计：<span class="fontRed">{{detailData.hjgs}}</span></h4>
     </section><br>
     <tableLayout>
         <section slot="top">
              <div flex>
                  <h5>改进学校环境问题总数/占比: <span class="fontRed">{{detailData.w02}}/{{detailData.w02zb}}</span></h5>&#x3000;&#x3000;
                  <h5>改进学校环境问题处理工时: <span class="fontRed">{{detailData.w02gs}}</span></h5>
              </div>
         </section>
         <section slot="bottom">
             <table border width="100%" class="table">
                 <tr>
                    <th>改进学校服务器环境</th>
                    <th>改进学校数据库环境</th>
                    <th>改进学校网络环境</th>
                    <th>改进学校中间件环境</th>
                 </tr>
                 <tr>
                     <td><a href="javaScript:;;" @click="handleCheckDetail('wtbq','50')">{{detailData.bq50}}</a></td>
                     <td><a href="javaScript:;;" @click="handleCheckDetail('wtbq','51')">{{detailData.bq51}}</a></td>
                     <td><a href="javaScript:;;" @click="handleCheckDetail('wtbq','52')">{{detailData.bq52}}</a></td>
                     <td><a href="javaScript:;;" @click="handleCheckDetail('wtbq','53')">{{detailData.bq53}}</a></td>
                 </tr>
             </table>
         </section>
     </tableLayout>
     <tableLayout>
         <section slot="top">
              <div flex>
                  <h5>加强学校培训问题总数/占比: <span class="fontRed">{{detailData.w04}}/{{detailData.w04zb}}</span></h5>&#x3000;&#x3000;
                  <h5>加强学校培训问题处理工时: <span class="fontRed">{{detailData.w04gs}}</span></h5>
              </div>
         </section>
         <section slot="bottom">
             <table border width="100%" class="table">
                 <tr>
                    <th>帮用户导数据</th>
                    <th>帮用户开权限</th>
                    <th>加强用户培训</th>
                 </tr>
                 <tr>
                     <td><a href="javaScript:;;" @click="handleCheckDetail('wtbq','61')">{{detailData.bq61}}</a></td>
                     <td><a href="javaScript:;;" @click="handleCheckDetail('wtbq','62')">{{detailData.bq62}}</a></td>
                     <td><a href="javaScript:;;" @click="handleCheckDetail('wtbq','63')">{{detailData.bq63}}</a></td>
                 </tr>
             </table>
         </section>
     </tableLayout>
          <tableLayout>
         <section slot="top">
              <div flex>
                  <h5>过保阶段问题数/占比: <span class="fontRed">{{detailData.gbxmwt}}/{{detailData.gbxmwtzb}}</span></h5>&#x3000;&#x3000;
                  <h5>过保阶段问题处理工时: <span class="fontRed">{{detailData.gbxmwtgs}}</span></h5>
              </div>
         </section>
         <section slot="bottom">
            <el-table
                :data="gbData"
                border
                style="width: 100%"
                :max-height="500">
                <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sxrq" label="合同签订年份" width="150"></el-table-column>
                <el-table-column prop="ysrq" label="验收日期" width="120"></el-table-column>
                <el-table-column prop="gbrq" label="过保日期" width="120"></el-table-column>
                <el-table-column prop="gbts" label="在保天数" width="100"></el-table-column>
                <el-table-column label="问题数" width="100">
                   <template slot-scope="scope">
                      <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'gb')">{{scope.row.wtzs}}</a>
                   </template>
                </el-table-column>
            </el-table>
            <div text-right>
                 <el-pagination
                    @size-change="handleGbSizeChange"
                    @current-change="handleGbCurrentChange"
                    :current-page="gbPage"
                    :page-sizes="[10, 20, 35, 50]"
                    :page-size="gbPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="gbTotal">
                   </el-pagination>
            </div>
         </section>
     </tableLayout>
          <tableLayout>
         <section slot="top">
              <div flex>
                  <h5>售后阶段问题数/占比: <span class="fontRed">{{detailData.shxmwt}}/{{detailData.shxmwtzb}}</span></h5>&#x3000;&#x3000;
                  <h5>售后阶段问题处理工时: <span class="fontRed">{{detailData.shxmwtgs}}</span></h5>
              </div>
         </section>
         <section slot="bottom">
             <el-table
                :data="shData"
                border
                style="width: 100%"
                :max-height="500">
                <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sxrq" label="合同签订年份" width="150"></el-table-column>
                <el-table-column prop="ysrq" label="验收日期" width="120"></el-table-column>
                <el-table-column prop="gbrq" label="过保日期" width="120"></el-table-column>
                <el-table-column prop="gbts" label="在保天数" width="100"></el-table-column>
                <el-table-column label="问题数" width="100">
                    <template slot-scope="scope">
                      <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'sh')">{{scope.row.wtzs}}</a>
                   </template>
                </el-table-column>
            </el-table>
            <div text-right>
                 <el-pagination
                    @size-change="handleShSizeChange"
                    @current-change="handleShCurrentChange"
                    :current-page="shPage"
                    :page-sizes="[10, 20, 35, 50]"
                    :page-size="shPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="shTotal">
                   </el-pagination>
            </div>
         </section>
     </tableLayout>
      <tableLayout>
         <section slot="top">
              <div flex>
                  <h5>在建阶段问题数/占比: <span class="fontRed">{{detailData.zjxmwt}}/{{detailData.zjxmwtzb}}</span></h5>&#x3000;&#x3000;
                  <h5>在建阶段问题处理工时: <span class="fontRed">{{detailData.zjxmwtgs}}</span></h5>
              </div>
         </section>
         <section slot="bottom">
            <el-table
                :data="zjData"
                border
                style="width: 100%"
                :max-height="500">
                <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sxrq" label="合同签订年份" width="200"></el-table-column>
                <el-table-column prop="ztztmc" label="当前状态" width="200"></el-table-column>
                <el-table-column label="问题数" width="100">
                    <template slot-scope="scope">
                      <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'zj')">{{scope.row.wtzs}}</a>
                   </template>
                </el-table-column>
            </el-table>
            <div text-right>
                 <el-pagination
                    @size-change="handleZjSizeChange"
                    @current-change="handleZjCurrentChange"
                    :current-page="zjPage"
                    :page-sizes="[10, 20, 35, 50]"
                    :page-size="zjPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="zjTotal">
                   </el-pagination>
            </div>
         </section>
      </tableLayout>
      <tableLayout>
         <section slot="top">
              <div>
                  <h5>延期任务数: <span class="fontRed">{{detailData.yqrws}}</span></h5>
              </div>
         </section>
         <section slot="bottom">
            <el-table
                :data="yqData"
                border
                style="width: 100%"
                :max-height="500">
                <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="sxrq" label="合同签订年份" width="200"></el-table-column>
                <el-table-column prop="ztztmc" label="当前状态" width="200"></el-table-column>
            </el-table>
            <div text-right>
                 <el-pagination
                    @size-change="handleYqSizeChange"
                    @current-change="handleYqCurrentChange"
                    :current-page="yqPage"
                    :page-sizes="[10, 20, 35, 50]"
                    :page-size="yqPageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="yqTotal">
                   </el-pagination>
            </div>
         </section>
     </tableLayout>
 </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
export default {
  data() {
    return {
      dwmc: "",
      detailData: {},
      gbData: [],
      gbPage: 1,
      gbPageSize: 10,
      gbTotal: 0,

      shData: [],
      shPage: 1,
      shPageSize: 10,
      shTotal: 0,

      zjData: [],
      zjPage: 1,
      zjPageSize: 10,
      zjTotal: 0,

      yqData: [],
      yqPage: 1,
      yqPageSize: 10,
      yqTotal: 0
    };
  },
  methods: {
    handleCheckDetail(key,value,params,type) {
      let obj = {};
      if(!params){
         obj['dwmc'] = this.detailData.dw;
      }else{
         obj['xmbh'] = params.xmbh;
         obj['wtxmlx'] = type=='gb'?3:type=='sh'?2:1
      }
       obj[key] = value;
      let { href } = this.$router.resolve({
        path:"/report-list/questionlist.html",
        query:obj
      });
      window.open(href, "_blank");
    },
    //   过保 每页条数
    handleGbSizeChange(data) {
      this.gbPageSize = data;
      this.gbPage = 1;
      this.pageGbWtxm();
    },
    //   过保 分页
    handleGbCurrentChange(data) {
      this.gbPage = data;
      this.pageGbWtxm();
    },
    //   售后 每页条数
    handleShSizeChange(data) {
      this.shPageSize = data;
      this.shPage = 1;
      this.pageShWtxm();
    },
    //   售后 分页
    handleShCurrentChange(data) {
      this.shPage = data;
      this.pageShWtxm();
    },
    //   在建
    handleZjSizeChange(data) {
      this.zjPageSize = data;
      this.zjPage = 1;
      this.pageZjWtxm();
    },
    handleZjCurrentChange(data) {
      this.zjPage = data;
      this.pageZjWtxm();
    },
    //  延期
    handleYqSizeChange(data) {
      this.yqPageSize = data;
      this.yqPage = 1;
      this.pageYqRwxm();
    },
    handleYqCurrentChange(data) {
      this.yqPage = data;
      this.pageYqRwxm();
    },

    dwtsqlmxReport() {
      this.$get(this.API.dwtsqlmxReport, {
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.detailData = res.data;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 过保
    pageGbWtxm() {
      this.$get(this.API.pageGbWtxm, {
        curPage: this.gbPage,
        pageSize: this.gbPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.gbData = res.data.rows;
          this.gbTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 售后
    pageShWtxm() {
      this.$get(this.API.pageShWtxm, {
        curPage: this.shPage,
        pageSize: this.shPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.shData = res.data.rows;
          this.shTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 在建
    pageZjWtxm() {
      this.$get(this.API.pageZjWtxm, {
        curPage: this.zjPage,
        pageSize: this.zjPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.zjData = res.data.rows;
          this.zjTotal = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 延期任务
    pageYqRwxm() {
      this.$get(this.API.pageYqRwxm, {
        curPage: this.yqPage,
        pageSize: this.yqPageSize,
        dwmc: this.dwmc
      }).then(res => {
        if (res.state == "success") {
          this.yqData = res.data.rows;
          this.yqTotal = res.data.records;
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
    if (!!this.$route.query.dwmc) {
      this.dwmc = unescape(this.$route.query.dwmc);
    } else {
      this.dwmc = JSON.parse(sessionStorage.userInfo).unit;
    }
    this.dwtsqlmxReport();
    this.pageGbWtxm(); //过保
    this.pageShWtxm(); //售后
    this.pageZjWtxm(); //在建
    this.pageYqRwxm(); //延期
  },
  components: { tableLayout }
};
</script>

<style lang='scss' scoped>
.xxts-pannel {
  width: 90%;
  margin: 15px auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1);
  h4,
  h5 {
    font-weight: 700;
  }
  .fontRed {
    color: rgb(182, 74, 74);
  }
  .table {
    border: none;
    tr {
      height: 37px;
      text-align: center;
    }
    th {
      background: #f5f7fa;
      text-align: center;
    }
  }
}
</style>
