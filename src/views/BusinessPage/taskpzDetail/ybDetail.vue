<template>
    <div class="rbpzDetail">
        <div>
           <tableLayout>
            <section slot="top">
                <h4>月报 - 里程碑工作</h4>
            </section>
            <section slot="bottom">
                <el-table :data="tableDataLcb" border style="width: 100%" >
                    <el-table-column label="批注" width="120">
                        <template slot-scope="scope">
                            <a href="javaScript:;;" @click="handleCheckpzDetail(scope.row.zgzWid)">{{scope.row.pzzs}}人批注</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" width="350" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmnr_display" label="项目内容" min-width="300" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lcbms_display" label="里程碑描述" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cnjssj" label="承诺完成时间" width="120"></el-table-column>
                    <el-table-column prop="jhjssj" label="计划完成时间" width="120"></el-table-column>
                    <el-table-column prop="zt_display" label="完成状态" width="120"></el-table-column>
                    <el-table-column prop="wwcyy" label="未完成原因" width="200" show-overflow-tooltip ></el-table-column>
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
                <h4>月报 - 问题</h4>
            </section>
            <section slot="bottom">
                <el-table :data="tableDataWt" border style="width: 100%" >
                    <el-table-column label="批注" width="120">
                        <template slot-scope="scope">
                             <a href="javaScript:;;" @click="handleCheckpzDetail(scope.row.wid)">{{scope.row.pzzs}}人批注</a>
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
                    <el-table-column prop="zt_display" label="问题状态" width="120" show-overflow-tooltip ></el-table-column>
                    <el-table-column prop="wwcyy" label="未完成原因" width="200" show-overflow-tooltip ></el-table-column>
                    <el-table-column prop="hxcs" label="后续措施" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="yhmc" label="创建人" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cjsj" label="创建时间" width="155"></el-table-column>
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

      currentPageWt: 1,
      pageSizeWt: 15,
      totalWt: 0,

      tableDataLcb: [],
      tableDataWt: [],

      pzxqData: [],
      xmbh: "",
      isAll: ""
    };
  },
  mounted() {
    this.pageHomePageMonthWorkDetail();
    this.pageHomePageMonthQuestionDetail();
  },
  methods: {
    handleSizeChangeLcb(data) {
      this.pageSizeLcb = data;
      this.currentPageLcb = 1;
      this.pageHomePageMonthWorkDetail();
    },
    handleCurrentChangeLcb(data) {
      this.currentPageLcb = data;
      this.pageHomePageMonthWorkDetail();
    },

    handleSizeChangeWt(data) {
      this.pageSizeWt = data;
      this.currentPageWt = 1;
      this.pageHomePageMonthQuestionDetail();
    },
    handleCurrentChangeWt(data) {
      this.currentPageWt = data;
      this.pageHomePageMonthQuestionDetail();
    },

    // 周工作
    pageHomePageMonthWorkDetail() {
      this.$get(this.API.pageHomePageMonthWorkDetail, {
        curPage: this.currentPageLcb,
        pageSize: this.pageSizeLcb,
        xmbh: this.$route.query.xmbh,
        isAll: this.$route.query.isAll
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
    // 周问题
    pageHomePageMonthQuestionDetail() {
      this.$get(this.API.pageHomePageMonthQuestionDetail, {
        curPage: this.currentPageWt,
        pageSize: this.pageSizeWt,
        xmbh: this.$route.query.xmbh,
        isAll: this.$route.query.isAll
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

    getLogCommentsForHomePageDetail(wid) {
      this.$get(this.API.getLogCommentsForHomePageDetail, {
        wid: wid,
        isAll: this.$route.query.isAll
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
    handleCheckpzDetail(data) {
      this.getLogCommentsForHomePageDetail(data);
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
