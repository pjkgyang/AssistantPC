<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <tableLayout>
        <section slot="top">
          <filterCondition :filterList="filterList" :placeholder="'请输入问题标题 / 版本号'"></filterCondition>
        </section>
        <section slot="bottom">
          <div text-right>
            <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
          </div>
          <div style="margin:10px 0">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed="left" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button type="success" size="mini" @click="handleTrain">培训</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
              <el-table-column prop="pxzt" label="培训主题" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="pxxs" label="培训形式" min-width="200" show-overflow-tooltip></el-table-column>
              <el-table-column prop="jhrq" label="计划日期" width="110"></el-table-column>
              <el-table-column prop="fxrxm" label="分享人" width="110"></el-table-column>
              <el-table-column prop="cjrq" label="创建日期" width="180"></el-table-column>
              <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
              <el-table-column prop="nrjhwts" label="纳入计划问题数" width="150"></el-table-column>
            </el-table>
          </div>
        </section>
      </tableLayout>
    </div>
    <sspx-dialog :show.sync="sspxShow"></sspx-dialog>
  </div>
</template>

<script>
import filterCondition from "@/components/wtfp/Filter.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import sspxDialog from "@/components/dialog/wtfp/sspx-dialog.vue";
export default {
  data() {
    return {
      sspxShow: false,
      filterList: ["keyword", "cp", "jhcjrq", "fbrq", "sjpxrq", "jhzt", "sfyq"],
      tableData: [
        {
          cpmc: "产品",
          pxzt: "王小虎",
          pxxs: "上海市普陀区金沙江路 1518 弄",
          jhrq: "2018-08-08",
          fxrxm: "张三",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        },
        {
          cpmc: "产品",
          pxzt: "王小虎",
          pxxs: "上海市普陀区金沙江路 1518 弄",
          jhrq: "2018-08-08",
          fxrxm: "张三",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        }
      ],
    };
  },
  methods: {
    handleExport(){

    },
    handleTrain() {
      this.sspxShow = !this.sspxShow;
    }
  },
  components: { filterCondition, tableLayout, sspxDialog }
};
</script>

<style scoped>
</style>
