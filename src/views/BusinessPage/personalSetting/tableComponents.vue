<template>
  <div>
    <div text-right class="mb-12">
      <el-button
        type="primary"
        size="mini"
        @click="handleArchive"
        v-if="archiveShow"
      >{{indexArr[0]==20?'确认':'封存'}}</el-button>
      <el-button type="primary" size="mini" @click="exportTable" v-if="exportShow">导出</el-button>
    </div>
    <div class="out-table">
      <el-table
        :data="bodyData"
        border
        class="report-ele-table"
        width="100%"
        :max-height="Height==0?'auto':tableHeight"
      >
        <el-table-column
          v-for="(th,index) in tableData.head"
          :key="index"
          :label="th.zh"
          v-if="!th.hidden"
          :min-width="widthArr.includes(index)?rowWidth:index==0?200:Width"
          show-overflow-tooltip
          :fixed="indexArr.includes(index)?true:false"
        >
          <template slot-scope="scope">
            <span v-if="!th.canRedirect">{{scope.row[index]}}</span>
            <a
              v-else
              href="javaScript:void(0)"
              @click="handleRouter(scope.row,index,'sqjs')"
            >{{scope.row[index]==""?'结算申请':scope.row[index]}}</a>
            <a
              v-if="scope.row[index] == ''"
              href="javaScript:void(0)"
              @click="handleRouter(scope.row,index,'jscx')"
            >&#x3000;&#x3000;结算申请查询</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="text-align:right;" v-if="pageShow">
      <pagination
        :currentPage="currentPage"
        :pageSize="pageSize"
        :total="total"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>
</template>
<script>
import pagination from "@/components/BusinessPage/pagination.vue";

export default {
  data() {
    return {
      total: 0,
      bodyData: [],
      tableHeight: window.innerHeight - this.Height
    };
  },
  updated() {
    // if(!this.tableData.body.rows){
    //     this.bodyData = this.tableData.body.rows
    //     this.total = this.tableData.body.records
    // }else{
    //     this.bodyData = this.tableData.body
    //     this.total = 0
    // }
    // this.$nextTick(function(){
    //     if(!!this.tableData.body.rows){
    //         this.bodyData = this.tableData.body.rows
    //         this.total = this.tableData.body.records
    //     }else{
    //         this.bodyData = this.tableData.body
    //         this.total = 0
    //     }
    // })
  },

  methods: {
    exportTable() {
      this.$emit("exportTable", "");
    },
    handleArchive() {
      this.$emit("handleArchive", "");
    },
    handleRouter(data, i, params) {
      this.$emit("handleXxwt", data, i, params);
    },
    handleCurrentChange(data) {
      this.$emit("handleCurrentChange", data);
    }
  },
  computed: {},
  props: {
    tableData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 13
    },
    pageShow: {
      type: Boolean,
      default: true
    },
    indexArr: {
      type: Array,
      default: () => {
        return [0, 2];
      }
    },
    Height: {
      type: Number,
      default: 350
    },
    widthArr: {
      type: Array,
      default: () => {
        return [2, 3, 4, 9];
      }
    },
    Width: {
      type: String,
      default: "190"
    },
    rowWidth: {
      type: String,
      default: "240"
    },
    exportShow: {
      type: Boolean,
      default: true
    },
    archiveShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    tableData(n, o) {
      let data = n.body;
      if (!!data.rows) {
        this.bodyData = data.rows;
        this.total = data.records;
      } else {
        this.bodyData = data;
        this.total = 0;
      }
    }
  },
  components: { pagination }
};
</script>
<style scoped>
.out-table {
  overflow-x: auto;
  width: 100%;
}
.table {
  border: 1px solid #ddd;
  margin-bottom: 10px !important;
}
.table caption {
  border: 1px solid #ddd;
  border-bottom: none;
  text-align: center;
  background: #eee;
  font-size: 18px;
  font-weight: 700;
  color: #000;
}
.table tr,
.table th {
  height: 40px;
  text-align: center;
  white-space: nowrap;
  padding: 0 10px;
}
.table td {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 10px;
}
</style>
