<template>
    <div class="pannelPadding-10">
        <div class="pannelPaddingBg-10">
            <tableLayout>
                <section slot="top">
                    <filterCondition :placeholder="'请输入问题标题 / 版本号'"></filterCondition>
                </section>
                <section slot="bottom">
                    <div text-right>
                        <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
                    </div>
                    <div style="margin:10px 0">
                        <el-table :data="tableData" border style="width: 100%" >
                            <el-table-column fixed="left" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button type="success" size="mini" @click="handleRelease">发布</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
                            <el-table-column prop="wtfx" label="问题分析" min-width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="xybjh" label="下一步计划" min-width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="jhwcrq" label="计划完成日期" width="110"></el-table-column>
                            <el-table-column prop="zrrxm" label="责任人" width="110"></el-table-column>
                            <el-table-column prop="jjbbh" label="解决版本号" width="110"></el-table-column>
                            <el-table-column prop="fbrq" label="发版日期" width="150"></el-table-column>
                            <el-table-column prop="cjrq" label="创建日期" width="180"></el-table-column>
                            <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
                            <el-table-column prop="nrjhwts" label="纳入计划问题数" width="150"></el-table-column>
                        </el-table>
                    </div>
                </section>
            </tableLayout>
        </div>
        <cpfb-dialog :show.sync="cpfbShow"></cpfb-dialog>
    </div>
</template>

<script>
import filterCondition from "@/components/wtfp/Filter.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import cpfbDialog from "@/components/dialog/wtfp/cpfb-dialog.vue";
export default {
  data() {
    return {
      cpfbShow: false,
      tableData: [
        {
          cpmc: "产品",
          wtfx: "王小虎",
          xybjh: "上海市普陀区金沙江路 1518 弄",
          jhwcrq: "2018-08-08",
          zrrxm: "张三",
          jjbbh: "V1.0.3",
          fbrq: "2018-08-08",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        },
        {
          cpmc: "产品",
          wtfx: "王小虎",
          xybjh: "上海市普陀区金沙江路 1518 弄",
          jhwcrq: "2018-08-08",
          zrrxm: "张三",
          jjbbh: "V1.0.3",
          fbrq: "2018-08-08",
          cjrq: "2018-08-08 12:00:00",
          cjrxm: "李四",
          nrjhwts: 11
        }
      ],
    };
  },
  methods: {
    handleRelease() {
      this.cpfbShow = !this.cpfbShow;
    },
    handleExport() {}
  },
  components: { filterCondition, tableLayout, cpfbDialog }
};
</script>

<style scoped>
</style>
