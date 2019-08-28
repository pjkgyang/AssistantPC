<template>
  <div>
    <el-dialog
      title="选择人员"
      width="800px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-pj">
        <div class="mg-12">
            <el-input v-model="keyword" size="mini" placeholder="请输入用户姓名/工号/手机号" @change="handleSearchName"></el-input>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
                <el-button  @click="handleClick(scope.row,scope.$index)" :disabled="!!scope.row.added" type="text" size="small">{{!!scope.row.added?'已添加':'添加'}}</el-button>
            </template>
            </el-table-column>
          <el-table-column prop="username" label="姓名" width="120"></el-table-column>
          <el-table-column prop="usercode" label="工号/手机号" width="120"></el-table-column>
          <el-table-column prop="unitname" label="单位"></el-table-column>
        </el-table>
        <div>
             <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="total">
             </el-pagination>
        </div>
        <section class="pj-btn-group">
          <el-button size="small" @click="visible = false">关闭</el-button>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      currentPage:1,
      pageSize:10,
      total:0,
      tableData:[],
      keyword:''
    };
  },
  methods: {
    handleSearchName(){
        this.currentPage = 1;
        this.getUsers();
    },
    handleClick(data,index){
        this.$set(this.tableData[index],'added',true);
        this.$emit('handleAdduser',data);
    },
    handleCurrentChange(data){
        this.currentPage = data;
        this.getUsers();
    },
     //  获取金智用户
    getUsers() {
      this.$get(this.API.getUsers, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        unitType: this.unitType,
        keyword: this.keyword,
        dept: "01AM"
      }).then(res => {
        if (res.state == "success") {
            if(!!res.data.rows){
                this.tableData = res.data.rows;
            }else{
                this.tableData = []
            }
            this.total = res.data.records;
        } else {
        }
      });
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    unitType:{
        type:String,
        default:'0'
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
          this.keyword = '';
          this.getUsers();
      } else {
          
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-pj {
  padding: 8px 10px;
}
.dialog-pj section:nth-of-type(2) {
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
