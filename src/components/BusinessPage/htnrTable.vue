<template>
  <div>
    <div v-if="show">
        <el-table
            :data="htnrData"
            border
            style="width: 100%"
            max-height="400">
            <el-table-column prop="ywx" label="业务线" min-width="150"></el-table-column>
            <!-- <el-table-column prop="app" label="产品" show-overflow-tooltip   width="200"></el-table-column> -->
            <el-table-column prop="app" label="合同内容" show-overflow-tooltip  ></el-table-column>
            <el-table-column prop="zb" label="占比(%)" min-width="100"></el-table-column>
            <el-table-column prop="sm" label="说明" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="rjcpmc" label="二级产品名称" width="120"></el-table-column>
            <el-table-column prop="ssry" label="实施人月" width="100"></el-table-column>
            <el-table-column prop="kfry" label="二开人月" width="120"></el-table-column>
        </el-table>
    </div>
    <div v-if="!show">
         <el-table
            :data="fbnrData"
            border
            style="width: 100%"
            max-height="400">
            <el-table-column prop="cpxmc" label="产品线名称" width="300"></el-table-column>
            <el-table-column prop="cp" label="产品" ></el-table-column>
            <el-table-column prop="wglv" label="完工率(%)" min-width="120"></el-table-column>
            <el-table-column prop="wgl" label="完工量(元)" min-width="120"></el-table-column>
          
        </el-table>
  </div>

</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    htnrData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    show: {
      type: Boolean,
      default: true
    },
    fbnrData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    allfbData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>
<style scoped>
</style>
