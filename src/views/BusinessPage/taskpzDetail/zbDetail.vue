<template>
    <div class="rbpzDetail">
        <div>
            <tableLayout>
                <section slot="top">
                    <h4>周报 - 里程碑工作</h4>
                </section>
                <section slot="bottom">
                    <el-table :data="tableDataLcb" border style="width: 100%">
                        <el-table-column label="批注" width="120">
                            <template slot-scope="scope">
                                <a href="javaScript:;;" @click="handleCheckpzDetail(scope.row.zgzWid,3)">{{scope.row.pzzs}}人批注</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" width="350" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmnr_display" label="项目内容" min-width="300" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="lcbms_display" label="里程碑描述" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cnjssj" label="承诺完成时间" width="120"></el-table-column>
                        <el-table-column prop="jhjssj" label="计划完成时间" width="120"></el-table-column>
                        <el-table-column prop="zt_display" label="完成状态" width="120"></el-table-column>
                        <el-table-column prop="wwcyy" label="未完成原因" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="hxcs" label="后续措施" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wglg" label="完工量（元）" width="120"></el-table-column>
                        <el-table-column prop="yhmc" label="创建人" width="100"></el-table-column>
                        <el-table-column prop="cjsj" label="创建时间" width="155"></el-table-column>
                        <el-table-column prop="xmjlxm" label="项目经理" width="100"></el-table-column>
                        <el-table-column prop="zddzxm" label="战队队长" width="100"></el-table-column>
                        <el-table-column prop="zrrxm" label="责任人" width="100"></el-table-column>
                    </el-table>
                    <div text-right>
                        <el-pagination @size-change="handleSizeChangeLcb" @current-change="handleCurrentChangeLcb" :current-page="currentPageLcb" :page-sizes="[15, 25, 35, 50]" :page-size="pageSizeLcb" layout="total, sizes, prev, pager, next, jumper" :total="totalLcb">
                        </el-pagination>
                    </div>
                </section>
            </tableLayout>
            <tableLayout>
                <section slot="top">
                    <h4>周报 - 进度任务</h4>
                </section>
                <section slot="bottom">
                    <el-table :data="tableDataJd" border style="width: 100%">
                        <el-table-column label="批注" width="120">
                            <template slot-scope="scope">
                                <a href="javaScript:;;" @click="handleCheckpzDetail(scope.row.wid,5)">{{scope.row.pzzs}}人批注</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                        <el-table-column prop="xmmc" label="项目名称" width="350" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cpmc_display" label="产品名称" width="350" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="rwmc_display" label="任务名称" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="gzms" label="工作内容" min-width="300" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wwcyy" label="未完成原因" min-width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="hxcs" label="后续措施" min-width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cjrxm" label="创建人" width="100"></el-table-column>
                        <el-table-column prop="cjsj" label="创建时间" width="155"></el-table-column>
                        <el-table-column label="添加阶段" width="120">
                            <template slot-scope="scope">
                                <el-tag size="mini" :type="!scope.row.tjjd?'danger':''">
                                    {{scope.row.tjjd == 1?'计划中':scope.row.tjjd == 2?'总结时':scope.row.tjjd == 3?'增补':'未知'}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="zrrxm" label="责任人" width="100"></el-table-column>
                    </el-table>
                    <div text-right>
                        <el-pagination @size-change="handleSizeChangeJd" @current-change="handleCurrentChangeJd" :current-page="currentPageJd" :page-sizes="[15, 25, 35, 50]" :page-size="pageSizeJd" layout="total, sizes, prev, pager, next, jumper" :total="totalJd">
                        </el-pagination>
                    </div>
                </section>
            </tableLayout>
            <tableLayout>
                <section slot="top">
                    <h4>周报 - 问题</h4>
                </section>
                <section slot="bottom">
                    <el-table :data="tableDataWt" border style="width: 100%">
                        <el-table-column label="批注" width="120">
                            <template slot-scope="scope">
                                <a href="javaScript:;;" @click="handleCheckpzDetail(scope.row.zwtWid,4)">{{scope.row.pzzs}}人批注</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="wtbt" label="问题标题" width="250" fixed="left" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="fbrxm" label="发布人" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="fbrssdw" label="发布人所属单位" width="300" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="xmmc" label="所属项目" width="300" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cpmc" label="所属产品" width="300" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wtlb_display" label="问题类别" width="120"></el-table-column>
                        <el-table-column prop="sfjj_display" label="是否紧急" width="120"></el-table-column>
                        <el-table-column prop="wtlc" label="当前处理环节" width="140"></el-table-column>
                        <el-table-column prop="qwjjsj" label="期望解决时间" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cnjjsj" label="承诺解决时间" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="zt_display" label="问题状态" width="120" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="wwcyy" label="未完成原因" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="hxcs" label="后续措施" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="yhmc" label="创建人" width="100" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cjsj" label="创建时间" width="155"></el-table-column>
                        <!-- <el-table-column label="添加阶段" width="120" v-if="tjjd">
                        <template slot-scope="scope">
                            <el-tag size="mini" :type="!scope.row.tjjd?'danger':''">
                                {{scope.row.tjjd == 1?'计划中':scope.row.tjjd == 2?'总结时':scope.row.tjjd == 3?'增补':'未知'}}
                            </el-tag>
                        </template>
                    </el-table-column> -->
                        <el-table-column prop="cljh" label="处理计划" width="200" show-overflow-tooltip></el-table-column>
                    </el-table>
                    <div text-right>
                        <el-pagination @size-change="handleSizeChangeWt" @current-change="handleCurrentChangeWt" :current-page="currentPageWt" :page-sizes="[100, 200, 300, 400]" :page-size="pageSizeWt" layout="total, sizes, prev, pager, next, jumper" :total="totalWt">
                        </el-pagination>
                    </div>
                </section>
            </tableLayout>
        </div>
        <pzxqDialog :show.sync="show" :tableData="pzxqData"></pzxqDialog>
    </div>
</template>

<script>
import pzxqDialog from "@/components/dialog/pzdetail/pzxq-dialog.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
export default {
  data() {
    return {
      show: false,
      currentPageLcb: 1,
      pageSizeLcb: 15,
      totalLcb: 0,

      currentPageJd: 1,
      pageSizeJd: 15,
      totalJd: 0,

      currentPageWt: 1,
      pageSizeWt: 15,
      totalWt: 0,

      tableDataLcb: [],
      tableDataJd: [],
      tableDataWt: [],

      pzxqData: [],
      xmbh: "",
      isAll: ""
    };
  },
  mounted() {
    this.pageHomePageWeekWorkDetail();
    this.pageHomePageWeeklyReportDetail();
    this.pageHomePageWeekQuestionDetail();
  },
  methods: {
    handleSizeChangeLcb(data) {
      this.pageSizeLcb = data;
      this.currentPageLcb = 1;
      this.pageHomePageWeekWorkDetail();
    },
    handleCurrentChangeLcb(data) {
      this.currentPageLcb = data;
      this.pageHomePageWeekWorkDetail();
    },

    handleSizeChangeJd(data) {
      this.pageSizeJd = data;
      this.currentPageJd = 1;
      this.pageHomePageWeeklyReportDetail();
    },
    handleCurrentChangeJd(data) {
      this.currentPageJd = data;
      this.pageHomePageWeeklyReportDetail();
    },

    handleSizeChangeWt(data) {
      this.pageSizeWt = data;
      this.currentPageWt = 1;
      this.pageHomePageWeekQuestionDetail();
    },
    handleCurrentChangeWt(data) {
      this.currentPageWt = data;
      this.pageHomePageWeekQuestionDetail();
    },

    // 周工作
    pageHomePageWeekWorkDetail() {
      this.$get(this.API.pageHomePageWeekWorkDetail, {
        curPage: this.currentPageLcb,
        pageSize: this.pageSizeLcb,
        xmbh: this.$route.query.xmbh,
        isAll: !this.$route.query.isAll ? "" : this.$route.query.isAll,
        yf: !this.$route.query.yf ? "" : this.$route.query.yf,
        rybh: !this.$route.query.rybh ? "" : this.$route.query.rybh,
        sfbt: !this.$route.query.sfbt ? "" : this.$route.query.sfbt,
        sfglpz: !this.$route.query.sfglpz ? "" : this.$route.query.sfglpz
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.tableDataLcb = [];
          } else {
            this.tableDataLcb = res.data.rows;
          }
          this.totalLcb = res.data.records;
        }
      });
    },
    // 周进度
    pageHomePageWeeklyReportDetail() {
      this.$get(this.API.pageHomePageWeeklyReportDetail, {
        curPage: this.currentPageJd,
        pageSize: this.pageSizeJd,
        xmbh: this.$route.query.xmbh,
        isAll: !this.$route.query.isAll ? "" : this.$route.query.isAll,
        yf: !this.$route.query.yf ? "" : this.$route.query.yf,
        rybh: !this.$route.query.rybh ? "" : this.$route.query.rybh,
        sfbt: !this.$route.query.sfbt ? "" : this.$route.query.sfbt,
        sfglpz: !this.$route.query.sfglpz ? "" : this.$route.query.sfglpz
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.tableDataJd = [];
          } else {
            this.tableDataJd = res.data.rows;
          }
          this.totalJd = res.data.records;
        }
      });
    },
    // 周问题
    pageHomePageWeekQuestionDetail() {
      this.$get(this.API.pageHomePageWeekQuestionDetail, {
        curPage: this.currentPageWt,
        pageSize: this.pageSizeWt,
        xmbh: this.$route.query.xmbh,
        isAll: !this.$route.query.isAll ? "" : this.$route.query.isAll,
        yf: !this.$route.query.yf ? "" : this.$route.query.yf,
        rybh: !this.$route.query.rybh ? "" : this.$route.query.rybh,
        sfbt: !this.$route.query.sfbt ? "" : this.$route.query.sfbt,
        sfglpz: !this.$route.query.sfglpz ? "" : this.$route.query.sfglpz
      }).then(res => {
        if (res.state == "success") {
          if (!res.data.rows) {
            this.tableDataWt = [];
          } else {
            this.tableDataWt = res.data.rows;
          }
          this.totalWt = res.data.records;
        }
      });
    },

    listPlanCommentForHomePageDetail(oid, planType) {
      this.$get(this.API.listPlanCommentForHomePageDetail, {
        oid: oid,
        planType: planType,
        isAll: !this.$route.query.isAll ? "" : this.$route.query.isAll,
      }).then(res => {
        if (res.state == "success") {
          if (!res.data) {
            this.pzxqData = [];
          } else {
            this.pzxqData = res.data;
          }
        }
      });
    },
    handleCheckpzDetail(oid, planType) {
      this.listPlanCommentForHomePageDetail(oid, planType);
      this.show = !this.show;
    }
  },
  components: { tableLayout, pzxqDialog }
};
</script>

<style lang="scss" scoped>
.rbpzDetail {
  padding: 15px;
  > div {
    background: #fff;
    padding: 10px;
    border-radius: 4px;
  }
  h4 {
    font-size: 15px;
    font-weight: 700;
    margin: 10px 0 !important;
  }
}
</style>
