<template>
    <div>
        <tableLayout>
            <section slot="top">
                <h4>周报 - 里程碑工作</h4>
            </section>
            <section slot="bottom">
                <el-table :data="tableDatalcb" border style="width: 100%" :max-height="tableHeight">
                    <el-table-column label="批注" width="120">
                        <template slot-scope="scope">
                            <span class="spanHover" @click="handleCheckpzDetail(scope.row)">0人批注</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" width="350" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmnr_display" label="项目内容" min-width="300" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lcbms_display" label="里程碑描述" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cnjssj" label="承诺完成时间" width="120"></el-table-column>
                    <el-table-column prop="jhjssj" label="计划完成时间" width="120"></el-table-column>
                    <el-table-column prop="zt_display" label="完成状态" width="120"></el-table-column>
                    <el-table-column prop="wwcyy" label="未完成原因" width="120" show-overflow-tooltip v-if="wordShow"></el-table-column>
                    <el-table-column prop="hxcs" label="后续措施" width="120" show-overflow-tooltip v-if="wordShow"></el-table-column>
                    <el-table-column prop="wglg" label="完工量（元）" width="120" v-if="otherShow"></el-table-column>
                    <el-table-column prop="yhmc" label="创建人" width="100"></el-table-column>
                    <el-table-column prop="cjsj" label="创建时间" width="155"></el-table-column>
                    <el-table-column prop="xmjlxm" label="项目经理" width="100"></el-table-column>
                    <el-table-column prop="zddzxm" label="战队队长" width="100"></el-table-column>
                    <el-table-column prop="zrrxm" label="责任人" width="100"></el-table-column>
                    <el-table-column prop="htje" label="合同金额(元)" width="110" v-if="otherShow"></el-table-column>
                    <el-table-column prop="htmsr" label="合同毛收入(元)" width="120" v-if="otherShow"></el-table-column>
                    <el-table-column label="批注" width="100" v-if="ispz">
                        <template slot-scope="scope">
                            <span>{{scope.row.pzzs==0?'无':scope.row.pzzs+'人次批注'}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                    </el-pagination>
                </div>
            </section>
        </tableLayout>
        <tableLayout>
            <section slot="top">
                <h4>周报 - 进度任务</h4>
            </section>
            <section slot="bottom">
                <el-table :data="tableDatajd" border style="width: 100%" :max-height="tableHeight">
                    <el-table-column label="批注" width="120">
                        <template slot-scope="scope">
                            <span class="spanHover" @click="handleCheckpzDetail(scope.row)">0人批注</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" width="350" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cpmc_display" label="产品名称" width="350" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="rwmc_display" label="任务名称" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="gzms" label="工作内容" min-width="300" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="wwcyy" label="未完成原因" min-width="200" v-if="wordShow" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="hxcs" label="后续措施" min-width="200" v-if="wordShow" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cjrxm" label="创建人" width="100"></el-table-column>
                    <el-table-column prop="cjsj" label="创建时间" width="155"></el-table-column>
                    <el-table-column label="添加阶段" width="120" v-if="isPz">
                        <template slot-scope="scope">
                            <el-tag size="mini" :type="!scope.row.tjjd?'danger':''">
                                {{scope.row.tjjd == 1?'计划中':scope.row.tjjd == 2?'总结时':scope.row.tjjd == 3?'增补':'未知'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="zrrxm" label="责任人" width="100"></el-table-column>
                    <el-table-column label="批注" width="120" v-if="isPz">
                        <template slot-scope="scope">
                            <span>{{scope.row.pzzs==0?'无':scope.row.pzzs+'人次批注'}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
        </tableLayout>
        <tableLayout>
            <section slot="top">
                <h4>周报 - 问题</h4>
            </section>
            <section slot="bottom">
                <el-table :data="tableDatawt" border style="width: 100%" :max-height="tableHeight">
                    <el-table-column label="批注" width="120">
                        <template slot-scope="scope">
                            <span class="spanHover" @click="handleCheckpzDetail(scope.row)">0人批注</span>
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
                    <el-table-column prop="zt_display" label="问题状态" width="120" show-overflow-tooltip v-if="othShow"></el-table-column>
                    <el-table-column prop="wwcyy" label="未完成原因" width="200" show-overflow-tooltip v-if="othShow"></el-table-column>
                    <el-table-column prop="hxcs" label="后续措施" width="200" show-overflow-tooltip v-if="othShow"></el-table-column>
                    <el-table-column prop="yhmc" label="创建人" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cjsj" label="创建时间" width="155"></el-table-column>
                    <el-table-column label="添加阶段" width="120" v-if="tjjd">
                        <template slot-scope="scope">
                            <el-tag size="mini" :type="!scope.row.tjjd?'danger':''">
                                {{scope.row.tjjd == 1?'计划中':scope.row.tjjd == 2?'总结时':scope.row.tjjd == 3?'增补':'未知'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cljh" label="处理计划" width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column label="批注" width="120" v-if="show">
                        <template slot-scope="scope">
                            <span>{{scope.row.pzzs==0?'无':scope.row.pzzs+'人次批注'}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </section>
        </tableLayout>

    </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 320
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    handleCheckpzDetail(data) {
      this.$emit("handleCheckpzDetail", data);
    }
  },
  components: { tableLayout }
};
</script>

<style lang="scss" scoped>
.spanHover {
  color: #409eff;
  &:hover {
    cursor: pointer;
  }
}
</style>
