<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    class="table-second"
    @selection-change="handleSelectionChange">
    <el-table-column v-if="isSelect" type="selection"  width="55"></el-table-column>
    <el-table-column fixed="left" label="操作" width="150">
      <template slot-scope="scope">
        <span v-if="deleteShow && scope.row.szjh" ><el-button @click="handleClickDelete(scope.row,scope.$index)" type="text" style="color:red" size="small" >删除 丨 </el-button></span>
        <span v-if="!deleteShow && isPz"><el-button @click="handleClickPz(scope.row)" type="text" size="small">批注 丨 </el-button></span>
        <span v-if="isEdit && bjWordShow"><el-button @click="handleClickEdit(scope.row,scope.$index)" type="text" size="small">{{isZj?'总结':'计划'}} 丨 </el-button></span>
        <span><el-button @click="handleClickCheck(scope.row)" type="text" size="small">查看</el-button></span>
      </template>
    </el-table-column>
    <el-table-column prop="wtbt" label="问题标题" width="250" fixed="left" ></el-table-column>
    <el-table-column prop="fbrxm" label="发布人" width="100" ></el-table-column>
    <el-table-column prop="fbrssdw" label="发布人所属单位" width="300" ></el-table-column>
    <el-table-column prop="xmmc" label="所属项目"  width="300" ></el-table-column>
    <el-table-column prop="cpmc" label="所属产品" width="300" ></el-table-column>
    <el-table-column prop="wtlb_display" label="问题类别" width="120"></el-table-column>
    <el-table-column prop="sfjj_display" label="是否紧急" width="120"></el-table-column>
    <el-table-column prop="wtlc" label="当前处理环节" width="140"></el-table-column>
    <el-table-column prop="qwjjsj" label="期望解决时间" width="120" ></el-table-column>
    <el-table-column prop="cnjjsj" label="承诺解决时间" width="120" ></el-table-column>
    <el-table-column prop="zt_display" label="问题状态" width="120" v-if="othShow"></el-table-column>
    <el-table-column prop="wwcyy" label="未完成原因" width="200"  v-if="othShow"></el-table-column>
    <el-table-column prop="hxcs" label="后续措施" width="200"  v-if="othShow"></el-table-column>   
    <el-table-column prop="yhmc" label="创建人" width="100" ></el-table-column> 
    <el-table-column prop="cjsj" label="创建时间" width="155" ></el-table-column>
    <!-- 2019.1.14 xiugai -->
    <el-table-column prop="zjsj" label="总结时间" width="155" ></el-table-column>

    <el-table-column  label="添加阶段" width="120" v-if="tjjd">
        <template slot-scope="scope">
          <el-tag size="mini" :type="!scope.row.tjjd?'danger':''">
            {{scope.row.tjjd == 1?'计划中':scope.row.tjjd == 2?'总结时':scope.row.tjjd == 3?'增补':'未知'}}
          </el-tag>
        </template>
    </el-table-column>
    <el-table-column prop="cljh" label="处理计划" width="200" ></el-table-column>
    <el-table-column label="批注" width="120" v-if="show">
       <template slot-scope="scope">
          <span>{{scope.row.pzzs==0?'无':scope.row.pzzs+'人次批注'}}</span>
        </template>
    </el-table-column>
  </el-table>
    <div v-if="records > 0">
       <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="records">
          </el-pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@/components/BusinessPage/pagination.vue";
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    show: {
      type: Boolean,
      default: true
    },
    othShow: {
      type: Boolean,
      default: true
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    deleteShow: {
      type: Boolean,
      default: false
    },
    isPz: {
      type: Boolean,
      default: true
    },
    isSelect: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10
    },
    records: {
      type: Number,
      default: 20
    },
    currentPage: {
      type: Number,
      default: 1
    },
    bjWordShow: {
      type: Boolean,
      default: false
    },
    isZj: {
      type: Boolean,
      default: true
    },
    tjjd: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(data) {
      this.$emit("handleCurrentChange", data);
    },
    handleClickCheck(row) {
      // (问题) 查看
      this.$emit("handleClickCheck", row);
    },
    handleClickPz(row) {
      // (问题)  批注
      this.$emit("handleClickPz", row);
    },
    handleClickDelete(row, index) {
      this.$emit("handleClickDelete", row, index);
    },
    handleClickEdit(row, index) {
      // (问题)  编辑
      this.$emit("handleClickEdit", row, index);
    },
    handleSelectionChange(val) {
      this.widArr = [];
      let wtArr = [];
      val.forEach((ele, i, arr) => {
        if (ele.ywtWid) {
          this.widArr.push(ele.ywtWid);
        } else {
          this.widArr.push(ele.zwtWid);
        }
        if (ele.wtwid) {
          wtArr.push(ele.wtwid);
        }
      });
      this.$emit("handleSelectionChange", this.widArr, wtArr);
    }
  },
  components: { pagination }
};
</script>
<style>
.table-second .el-button {
  margin-left: 0px;
}
.table-second .table-hr {
  color: #409eff !important;
}
</style>