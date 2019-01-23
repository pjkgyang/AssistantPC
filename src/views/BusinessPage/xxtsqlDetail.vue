<template>
    <div class="pd-10">
        <div class="dialog-jd">
            <h4>项目分类 -- {{$route.query.lx == 'zj'?'在建':$route.query.lx == 'zj'?'售后':$route.query.lx == 'gb'?'过保':'延期任务'}}</h4>
            <div v-if="$route.query.lx == 'zj'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="ssyh-table">
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
            </div>

            <div v-if="$route.query.lx == 'sh'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sxrq" label="合同签订年份" width="150"></el-table-column>
                    <el-table-column prop="ysrq" label="验收日期" width="120"></el-table-column>
                    <el-table-column prop="gbrq" label="过保日期" width="120"></el-table-column>
                    <el-table-column prop="zbts" label="在保天数" width="100"></el-table-column>
                    <el-table-column label="问题数" width="100">
                        <template slot-scope="scope">
                            <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'sh')">{{scope.row.wtzs}}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-if="$route.query.lx == 'gb'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sxrq" label="合同签订年份" width="150"></el-table-column>
                    <el-table-column prop="ysrq" label="验收日期" width="120"></el-table-column>
                    <el-table-column prop="gbts" label="在保天数" width="100"></el-table-column>
                    <el-table-column label="问题数" width="100">
                        <template slot-scope="scope">
                            <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'gb')">{{scope.row.wtzs}}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-if="$route.query.lx == 'yq'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sxrq" label="合同签订年份" width="200"></el-table-column>
                    <el-table-column prop="ztztmc" label="当前状态" width="200"></el-table-column>
                </el-table>
            </div>

            <div text-right class="mg-12" v-if="total > 0">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 35, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getProject } from "@/api/xmkb.js";
import { confirmMilestone } from "@/api/task.js";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 150,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: []
    };
  },
  props: {},
  mounted() {
    this.getDetail();
  },
  methods: {
    handleCheckDetail(key, value, params, type) {
      let obj = {};
      obj["dwmc"] = this.$route.query.dwmc;
      if (!!params) {
        obj["xmbh"] = params.xmbh;
        obj["wtxmlx"] = type == "gb" ? 3 : type == "sh" ? 2 : 1;
      }
      obj[key] = value;
      let { href } = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query: obj
      });
      window.open(href, "_blank");
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.getDetail();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getDetail();
    },
    getDetail() {
      this.$get(
        this.$route.query.lx == "zj"
          ? this.API.pageZjWtxm : this.$route.query.lx == "sh"
          ? this.API.pageShWtxm : this.$route.query.lx == "gb" 
          ? this.API.pageGbWtxm :  this.API.pageYqRwxm,
        {
          dwmc: this.$route.query.dwmc,
          curPage: this.currentPage,
          pageSize: this.pageSize
        }
      ).then(res => {
        if (res.state == "success") {
          this.tableData = res.data.rows;
          this.total = res.data.records;
        } else {
          alert(res.msg);
        }
      });
    }
  },

  watch: {
    show(n, o) {}
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dialog-jd {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  h4 {
    margin: 10px 0 !important;
    font-weight: 700;
  }
}
</style>
