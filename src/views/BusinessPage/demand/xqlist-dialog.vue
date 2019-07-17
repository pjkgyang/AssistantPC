<template>
  <div>
    <el-dialog title="选择需求" width="1000px" top="30px" :visible.sync="visible" :append-to-body="true"
      :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-xqqr">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="日期" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleChooseDemand(scope.row)">{{scope.row.date}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>

        <section class="pj-btn-group">
          <el-button size="small" @click="visible = false">取消</el-button>
        </section>

        <el-pagination v-if="!!tableData.length" @current-change="handleCurrentChange" :current-page.sync="currentPage"
          :page-size="pageSize" layout="total, prev, pager, next" :total="records"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: this.show,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentPage: 1,
        pageSize: 15,
        records: 0
      };
    },
    methods: {
      handleChooseDemand(data) {
        this.$emit('handleChooseDemand', data);
        this.visible = false;
      },
      handleCurrentChange(data){
        this.currentPage = data;
        this.queryPageDemands();
      },
      queryPageDemands() {
        this.$get(this.API.queryPageDemands, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          xqxglx: '',
          xqlx: 3,
          qygc: '',
          cpbh: '',
          keyword: ''
        }).then(res => {
          if (res.state == 'success') {
            if (!!res.data.rows) {
              this.tableData = res.data.rows
            } else {
              this.tableData = [];
            }
            this.records = res.data.records;
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show(n, o) {
        this.visible = this.show;
        if (!n) {

        } else {

        }
      }
    },
    components: {}
  };
</script>

<style scoped lang="scss">
  .dialog-xqqr {
    padding: 8px 10px;
  }

  .dialog-xqqr section:nth-of-type(2) {
    margin: 10px 0;
  }

  .pj-title {
    font-weight: 700;
    width: 14%;
  }

  .pj-content {
    width: 86%;
  }

  .pj-btn-group {
    text-align: right;
    padding: 10px 0;
  }
</style>
