<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10 ">
      <div class="table_grid table_title">
        <h5 class="mg-12">待办事项基本信息</h5>
        <table>
          <tr>
            <th>待处理事项</th>
            <td colspan="3">{{ dataInfo.clsxmc }}</td>
          </tr>
          <tr>
            <th>计划完成时间</th>
            <td>{{ dataInfo.jhwcsj }}</td>
            <th>实际完成时间</th>
            <td>{{ dataInfo.sjwcsj }}</td>
          </tr>
          <tr>
            <th>责任方</th>
            <td colspan="3">{{dataInfo.zrf}}</td>
          </tr>
          <tr>
            <th>公司责任人</th>
            <td colspan="3">{{dataInfo.gszrr}}</td>
          </tr>
          <tr>
            <th>学校责任人</th>
            <td colspan="3">{{dataInfo.xxzrr}}</td>
          </tr>
          <tr>
            <th>第三方责任人</th>
            <td colspan="3">{{dataInfo.dsfzrr}}</td>
          </tr>
          <tr>
            <th>关注人</th>
            <td colspan="3">{{dataInfo.gzr}}</td>
          </tr>
        </table>
      </div>
      <div>
        <div class="table_title">
         <h5 class="mg-12">待办事项反馈</h5>
        </div>
        <div>
          <el-button class="mg-12" size="mini" type="success" @click="fkShow = true">添加反馈</el-button>
          <el-table :data="fkList" border style="width: 100%">
            <el-table-column prop="cjsj" label="反馈时间"></el-table-column>
            <el-table-column prop="cjrxm" label="反馈人" ></el-table-column>
            <el-table-column  label="反馈说明">
              <template slot-scope="scope">
                <div v-html="scope.row.fksm"></div>
              </template>
            </el-table-column>
            <el-table-column  label="完成状态">
               <template slot-scope="scope">
                <span>{{scope.row.wczt == 1?"已完成":"未完成"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="jhwcsj" label="计划完成时间"></el-table-column>
          </el-table>
        </div>
      </div>
      <div text-right>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="records"
        ></el-pagination>
      </div>
    </div>

     <fkDialog :show.sync="fkShow" :wid="$route.query.wid" @handleCommitFk="handleCommitFk"></fkDialog>   
  </div>
</template>

<script>
import fkDialog from "@/views/BusinessPage/meetOnline/fk-dialog.vue";
export default {
  data() {
    return {
      fkShow:false,
      dataInfo: {},
      currentPage: 1,
      pageSize: 10,
      records: 0,
      fkList: []
    };
  },
  mounted() {
     this.pageMatterFeedback();
     this.queryMatter();
  },
  components: {fkDialog},

  methods: {
    //   反馈成功
    handleCommitFk(){
       this.pageMatterFeedback();
    },
    //  分页
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageMatterFeedback();
    },

    // 获取待处理事项
    queryMatter() {
      this.$get(this.API.queryMatter, {
        matteWid: this.$route.query.wid
      }).then(res => {
        if (res.state == "success") {
          this.dataInfo = res.data;
        } else {
        }
      });
    },

    // 反馈列表
    pageMatterFeedback() {
      this.$get(this.API.pageMatterFeedback, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        matterWid: this.$route.query.wid,
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            this.fkList = res.data.rows;
          } else {
            this.fkList = [];
          }
          this.records = res.data.records;
        } else {
        }
      });
    }
  }
};
</script>

<style>
</style>
