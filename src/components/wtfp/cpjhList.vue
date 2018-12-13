<template>
    <div class="pannelPadding-10">
        <div class="pannelPaddingBg-10">
            <tableLayout>
                <section slot="top">
                    <filterCondition :placeholder="'请输入问题标题 / 版本号'" @handleChangeFilter="handleChangeFilter"></filterCondition>
                </section>
                <section slot="bottom">
                    <div text-right>
                        <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
                    </div>
                    <div style="margin:10px 0">
                        <el-table :data="tableData" border style="width: 100%">
                            <el-table-column fixed="left" label="操作" width="220">
                                <template slot-scope="scope">
                                    <el-button type="success" size="mini" @click="handleRelease(scope.row)">发布</el-button>
                                    <el-button type="primary" size="mini" @click="handlePlnrjh(scope.row)" >批量纳入计划</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
                            <el-table-column prop="wtfx" label="问题分析" min-width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="xybjh" label="下一步计划" min-width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="jhwcsj" label="计划完成日期" width="110"></el-table-column>
                            <el-table-column prop="zrrxm" label="责任人" width="110"></el-table-column>
                            <el-table-column prop="jjbbh" label="解决版本号" width="110"></el-table-column>
                            <el-table-column prop="fbsj" label="发版日期" width="150"></el-table-column>
                            <el-table-column prop="cjsj" label="创建日期" width="150"></el-table-column>
                            <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
                            <el-table-column  label="纳入计划问题数" width="130">
                              <template slot-scope="scope">
                                    <a href="javaScript:;;" @click="handleCehckwts(scope.row.wid)">{{scope.row.jhwtzs}}</a>
                              </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </section>
            </tableLayout>
            <div text-right>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <cpfb-dialog :show.sync="cpfbShow" :planData="planData" @handleCommit="handleCommit"></cpfb-dialog>
        <wtfplist-dialog :show.sync="wtfpShow" :jhData="jhData" :lx="1"  @handleNrsuccess="handleNrsuccess"></wtfplist-dialog>
    </div>
</template>

<script>
import filterCondition from "@/components/wtfp/Filter.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import cpfbDialog from "@/components/dialog/wtfp/cpfb-dialog.vue";
import wtfplistDialog from "@/components/dialog/wtfp/wtfplist-dialog.vue";
export default {
  data() {
    return {
      cpfbShow: false,
      wtfpShow:false,
      tableData: [],
      jhData:{},
      currentPage: 1,
      pageSize: 15,
      total: 0,
      filterWord: {
        keyword: "",
        cpbh: "",
        cpmc: "",
        bbh:"",
        jhcjrq: [],
        fbrq: [],
        jhzt: "",
        sfyq: 0
      },
      planData: {}
    };
  },
  methods: {
     // 批量纳入成功
    handleNrsuccess(){
      this.pageProductPlan();
    },
      // 跳转 
    handleCehckwts(data){
      let routeData = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query:{
          jhwid:data,
          jhlx:'1'
        }
      });
      window.open(routeData.href, "_blank");
    },
    handleCommit() {
      this.pageProductPlan();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.pageProductPlan();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageProductPlan();
    },
    handleChangeFilter(data) {
      this.filterWord = data;
      this.pageProductPlan();
    },
    handleRelease(data) {
      this.planData = data;
      this.cpfbShow = !this.cpfbShow;
    },
    // 批量纳入计划
    handlePlnrjh(data){
      this.jhData = data;
      this.wtfpShow = !this.wtfpShow
    },
    handleExport() {
      window.open(
        window.baseurl +
          "wtgj/exportProductPlan.do?cpbh=" +
          this.filterWord.cpbh +
          "&bbh=" +
          this.filterWord.bbh +
          "&zt=" +
          this.filterWord.jhzt +
          "&pxxs=" +
          this.filterWord.pxxs +
          "&cjsjStart=" +
          this.filterWord.jhcjrq[0] +
          "&cjsjEnd=" +
          this.filterWord.jhcjrq[1] +
          "&fbsjStart=" +
          this.filterWord.fbrq[0] +
          "&fbsjEnd=" +
          this.filterWord.fbrq[1] +
          "&sfyq=" +
          this.filterWord.sfyq +
          "&keyword=" +
          this.filterWord.keyword
      );
    },
    // 获取产品类列表
    pageProductPlan() {
      this.$get(this.API.pageProductPlan, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        cpbh: this.filterWord.cpbh,
        bbh:this.filterWord.bbh,
        zt: this.filterWord.jhzt,
        cjsjStart: this.filterWord.jhcjrq[0],
        cjsjEnd: this.filterWord.jhcjrq[1],
        fbsjStart: this.filterWord.fbrq[0],
        fbsjEnd: this.filterWord.fbrq[1],
        sfyq: this.filterWord.sfyq,
        keyword: this.filterWord.keyword
      })
        .then(res => {
          if (res.state == "success") {
            if (!!res.data.rows) {
              this.tableData = res.data.rows;
            } else {
              this.tableData = [];
            }
            this.total = res.data.records;
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.pageProductPlan();
  },
  components: { filterCondition, tableLayout, cpfbDialog ,wtfplistDialog}
};
</script>

<style scoped>
</style>
