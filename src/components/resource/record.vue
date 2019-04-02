<template>
    <div>
        <div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane :label="'全部 ( '+ ( !fileCounts.all?0:fileCounts.all ) + ' ) '" name="9"></el-tab-pane>
                <el-tab-pane :label="'上传 ( '+ (!fileCounts.upload?0:fileCounts.upload) +' ) '" name="1"></el-tab-pane>
                <el-tab-pane :label="'下载 ( '+ (!fileCounts.download?0:fileCounts.download)+' ) '" name="0"></el-tab-pane>
                <el-tab-pane :label="'好评 ( '+ (!fileCounts.good?0:fileCounts.good)+' ) '" name="2"></el-tab-pane>
                <el-tab-pane :label="'差评 ( '+ (!fileCounts.bad?0:fileCounts.bad)+' ) '" name="3"></el-tab-pane>
                <el-tab-pane :label="'删除 ( '+ (!fileCounts.delete?0:fileCounts.delete)+' ) '" name="6"></el-tab-pane>
                <el-tab-pane v-if="isSvn" :label="'检出SVN ( '+(!fileCounts.checkout?0:fileCounts.checkout)+' ) '" name="4"></el-tab-pane>
                <el-tab-pane v-if="isSvn" :label="'更新SVN ( '+(!fileCounts.updatesvn?0:fileCounts.updatesvn)+' ) '" name="5"></el-tab-pane>
            </el-tabs>
        </div>
        <div >
            <!-- <el-table :data="jdList" style="width: 100%" :max-height="tableHeight">
                <el-table-column prop="czrxm" label="姓名" width="90">
                </el-table-column>
                <el-table-column prop="cjsj" label="日期" width="150">
                </el-table-column>
                <el-table-column label="类型" width="90">
                    <template slot-scope="scope">
                        <el-tag size="small" :type="scope.row.czlx == 0||scope.row.czlx == 1||scope.row.czlx == 4||scope.row.czlx == 5 ? 'primary':scope.row.czlx == 3 ? 'danger':'success'" disable-transitions>{{scope.row.czlxmc}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="cznr" label="说明" min-width="400" >
                </el-table-column>
            </el-table> -->
            <steps-component :jdList="jdList"  @handleCommit="handleCommit"></steps-component>
            <div v-if="!jdList.length" text-center class="mg-12">
                暂无记录
            </div>
        </div>
        <div text-right v-if="!!jdList.length">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

    </div>
</template>

<script>
import stepsComponent from '@/components/BusinessPage/steps' 
export default {
  data() {
    return {
      activeName: "9",
      tableHeight: window.innerHeight - 260
    };
  },
  props: {
    jdList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileCounts: {
      type: Object,
      default: () => {
        return {};
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 15
    },
    total: {
      type: Number,
      default: 0
    },
    isSvn:{
        type:Boolean,
        default:false
    }
  },
  mounted(){
  
  },
  methods: {
    handleCommit(){
      this.$emit('handleCommit','')
    },
    handleClick(tab, event) {
      this.$emit("hadnleChangeTab", this.activeName);
    },
    handleSizeChange(data) {
      this.$emit("hadnleChange", data, "size");
    },
    handleCurrentChange(data) {
      this.$emit("hadnleChange", data, "cur");
    }
  },
  components: {stepsComponent}
};
</script>

<style lang="scss" scoped>
</style>
