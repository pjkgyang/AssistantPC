<template>
 <div　style="padding:0 10px">
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        :max-height="tableHeight"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" fixed="left" :selectable='checkboxInit' v-if="!!rwzt"></el-table-column>
        <el-table-column label="操作"  fixed="left" width="150">
        <template slot-scope="scope" >

            <el-button size="mini" type="text" v-if="scope.row.lx == 9 && scope.row.zt == '2' && userName == scope.row.cjrxm" @click="handlejfqr(scope.row)">创建人确认</el-button>
            <el-button size="mini" type="text" v-if="scope.row.lx == 5 && scope.row.zt == '2' && userName == scope.row.yfzrrxm" @click="handlejfqr(scope.row)">乙方确认</el-button>
            <el-button size="mini" type="text" v-if="scope.row.lx == 3 && scope.row.zt == '2' && userName == scope.row.jfzrrxm" @click="handlejfqr(scope.row)">甲方确认</el-button>
            <el-button size="mini" type="text" v-if="scope.row.lx == 1 && scope.row.sfjfqr == 0 && userName == scope.row.jfzrrxm" @click="handlejfqr(scope.row)">甲方确认</el-button>
            <el-button size="mini" type="text" @click="handletask(scope.row)">填写日报</el-button>
        </template>
        </el-table-column>
        <el-table-column prop="cpmc" label="产品名称"  width="200" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="jdmc" label="里程碑名称"  width="300" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="rwmc_display" label="任务名称" min-width="300" show-overflow-tooltip></el-table-column>
        <el-table-column prop="lx_dispaly" label="任务类型" width="120"></el-table-column>
        <el-table-column prop="ssrxm" label="责任人" width="90" ></el-table-column>
        <el-table-column prop="cjrxm" label="创建人" width="90" ></el-table-column>
        <el-table-column prop="rwqrr" label="确认人" width="90" ></el-table-column>
        <el-table-column  label="状态" width="90" >
           <template slot-scope="scope">
              <el-tag :type="scope.row.zt == 5 ? 'danger' :scope.row.zt == 3?'success': 'primary'"  size="mini"
          disable-transitions>{{scope.row.zt_display}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="zt_display" label="是否确认" width="90">
          <template slot-scope="scope">
              <el-tag v-if="scope.row.lx == 1" :type="scope.row.sfjfqr == '0' ? 'primary' : 'success'"  size="mini"
          disable-transitions>{{scope.row.sfjfqr == '0'?'未确认':'已确认'}}</el-tag>
          
           <el-tag v-else  :type="scope.row.zt == '3' ? 'success' : 'primary'"  size="mini"
          disable-transitions>{{scope.row.zt == '3'?'已确认':'未确认'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="yxj_display" label="优先级" width="90"></el-table-column>
        <el-table-column prop="sjjsrq" label="实际结束日期" width="120"></el-table-column>
        <el-table-column prop="jhjsrq" label="计划结束日期" width="120"></el-table-column>
    </el-table>
  <div>
  </div>
 </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 220,
      userName: ""
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rwzt: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.userName = window.userName;
  },
  methods: {
    checkboxInit(row, index) {
      if (row.lx == "1" && this.rwzt == "1") {
        return 0;
      } else if (row.lx == "1" && this.rwzt == "2" && row.sfjfqr != 0) return 0;
      else return 1;
    },
    handlejfqr(data) {
      data.type = "jfqr";
      // console.log(data)
      this.$emit("handlejfqr", data);
    },
    handletask(data) {
      data.type = "daily";
      this.$emit("handletask", data);
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    }
  },
  components: {}
};
</script>

<style scoped>
</style>
