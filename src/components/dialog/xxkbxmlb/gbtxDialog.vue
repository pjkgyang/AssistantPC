<template>
  <div >
    <el-dialog title="过保提醒" width="1100px" top="30px" :visible.sync="visible" :append-to-body="true" 
    :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
    <div style="padding:10px 15px">
        
          <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border :max-height="tableHeight">
            <el-table-column fixed type="selection" width="55">
              
            </el-table-column>
            <el-table-column label="角色" min-width="200">
              <template slot-scope="scope">
                <span v-for="role in scope.row.roleName.split(',')">
                  <el-tag  size="mini" type="primary">{{role}}</el-tag>&nbsp;
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="姓名" width="140"></el-table-column>
            <el-table-column prop="twr" label="工号/手机号" width="140">
              <template slot-scope="scope">
                <span>{{scope.row.userCode[0]==0?scope.row.userCode:scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="cpmc" label="单位类型" width="180">
              <template slot-scope="scope">
                <span>{{scope.row.unitType == 0?'金智':scope.row.unitType == 1?'学校成员':'合作伙伴'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="dept" label="部门" width="190"></el-table-column>
          </el-table>
        <!-- <div text-right v-if="!!tableData.length">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div> -->
        <div  class="mg-12" flex spacebetween>
          <el-button size="mini" type="primary" @click="handleSendRemind">发送提醒</el-button>
          <el-button size="mini" @click="visible = false">取消</el-button>
        </div>
    </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      idArr: [],
      tableHeight: window.innerHeight - 350
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: ""
    }
  },
  methods: {
    // 发送提醒
    handleSendRemind() {
      this.$post(this.API.sendServiceExpired, {
        xmbh: this.xmbh,
        ids: this.idArr.join(",")
      }).then(res => {
        if (res.state == "success") {
          this.$message({
            message: "发送成功~",
            type: "success"
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      }).catch(error=>{

      });
    },

    handleSelectionChange(val) {
      this.idArr = [];
      val.forEach(ele => {
        this.idArr.push(ele.userId);
      });
    },

    // 获取参与者
    queryProjectParticipantMap() {
      this.$get(this.API.queryProjectParticipantMap, {
        xmbh: this.xmbh
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.yf) {
            this.tableData.push(res.data.yf);
          }
          if (!!res.data.jf) {
            this.tableData.push(res.data.jf);
          }
          if (!!res.data.qt) {
            this.tableData = this.tableData.concat(res.data.qt);
          }
        }
      });
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
      } else {
        this.queryProjectParticipantMap();
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-xjjh {
  padding: 8px 10px;
}
</style>
