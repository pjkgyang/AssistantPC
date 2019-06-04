<template>
    <div>
        <div class="layout-bgf">
            <el-card shadow="hover">
                 <filterComponent :filterList="filterList" :placeholder="'请输入战队队长工号/姓名'" @handleChangeFilter="handleChangeFilter"></filterComponent>
            </el-card>
        </div>
        <div class="layout-bgf" >
             <el-card shadow="hover" style="padding:0 20px">
               <div class="mb-12" v-if="limitShow">
                  <el-button type="primary" size="small" @click="handleAddzd">添加战队</el-button>
               </div>
                <el-table :data="tableData" border >
                    <el-table-column fixed="left" label="操作" width="220">
                        <template slot-scope="scope">
                            <el-button @click="handleClickDelete(scope.row)" type="danger" size="mini" v-if="limitShow">删除</el-button>
                            <el-button @click="handleClickEdit(scope.row)" size="mini" v-if="limitShow">编辑</el-button>
                            <el-button @click="handleClickMaintain(scope.row)" size="mini">维护</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="qygc" label="区域工程" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qyzd" label="战队名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="qyzddzxm" label="战队队长" width="120"></el-table-column>
                    <el-table-column prop="sjzgxm" label="上级领导姓名" width="120"></el-table-column>
                </el-table>
                <div text-right class="pd-10">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                      </el-pagination>
                </div>
            </el-card>
        </div>
        <zdwh-dialog :show.sync="show" :qyzdwid="qyzdwid" ></zdwh-dialog>
        <addzd-dialog :show.sync="addzdShow" :data="zdData" :title="title" @handleAddSuccess="handleAddSuccess"></addzd-dialog>
    </div>
</template>

<script>
import filterComponent from "@/components/reportTable/filterComponent.vue";
import zdwhDialog from "@/components/dialog/zdwh-dialog.vue";
import addzdDialog from "@/components/dialog/addzd-dialog.vue";
export default {
  data() {
    return {
      show: false,
      userShow: false,
      addzdShow: false,
      filterList: ["keyword"],
      tableHeight: window.innerHeight - 300,
      currentPage: 1,
      pageSize: 15,
      total: 0,
      filterData: "",
      qyzdwid: "", //区域战队wid
      userGroupTag: "",
      limitShow: false,
      zdData: {},
      tableData: [],
      title: ""
    };
  },
  mounted() {
    this.userGroupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
    if (this.userGroupTag.indexOf("JYGL") != -1 || this.userGroupTag.indexOf("ZDDZ") != -1 || this.userGroupTag.indexOf("QYZ") == -1) {
      this.limitShow = true;
    }
    if (this.userGroupTag.indexOf("JYGL") != -1) {
      this.filterList.push("qygc");
    }
    this.getPageQyzd();
  },
  methods: {
    handleAddSuccess() {
      //添加 战队成功
      this.currentPage = 1;
      this.getPageQyzd();
    },
    handleAddzd() {
      //添加 战队
      this.zdData = {};
      this.title = "添加战队";
      this.addzdShow = !this.addzdShow;
    },
    handleChangeFilter(data) {
      this.filterData = data;
      this.getPageQyzd();
    },
    handleClickEdit(row) {
      // 编辑
      this.zdData = row;
      this.title = "编辑战队";
      this.addzdShow = !this.addzdShow;
    },
    handleClickMaintain(row) {
      // 维护
      this.qyzdwid = row.wid;
      this.show = !this.show;
    },
    handleClickDelete(row) {
      //删除
      this.$confirm("请确定是否删除该战队?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post(this.API.deleteQyzd, {
            wid: row.wid
          }).then(res => {
            if (res.state == "success") {
              this.$alert("删除成功", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.getPageQyzd();
                }
              });
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },

    handleCurrentChange(data) {
      this.currentPage = data;
      this.getPageQyzd();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.getPageQyzd();
    },
    getPageQyzd() {
      this.$get(this.API.pageQyzd, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qygc: this.filterData.gczd ? this.filterData.gczd : "",
        keyword: this.filterData.keyword ? this.filterData.keyword : ""
      }).then(res => {
        if (res.state == "success") {
          this.tableData = res.data.rows;
          this.total = res.data.records;
        }
      });
    }
  },
  components: { filterComponent, zdwhDialog, addzdDialog }
};
</script>

<style scoped>
.layout-bgf {
  width: 95%;
  margin: 10px auto;
}
</style>
