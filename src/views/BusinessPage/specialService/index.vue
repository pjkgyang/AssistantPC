<template>
  <div class="myitem-zxfw">
    <tableLayout class="zxfw-content" flex-column>
      <section slot="top" style="border-bottom:1px solid #EBEEF5" col=1>
        <zxfwFilter :placeholder="'学校名称/项目名称/项目编号/合同编号'" @handleChangeFilter="handleChangeFilter"></zxfwFilter>
      </section>
      <section slot="bottom" col=2>
        <section>
          <div flex spacebetween class="mb-12">
            <div>
              <el-button type="primary" size="mini" @click="handleClick('bzjh')">生成标准计划</el-button>
              <el-button :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('zdyjh')">新增自定义计划</el-button>
              <el-button :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('edit')">批量修改</el-button>
              <el-button :disabled="!multipleSelection.length" type="danger" size="mini" @click="handleClick('delete')">删除</el-button>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="handleClick('export')">导出</el-button>
            </div>
          </div>
          <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border
            @selection-change="handleSelectionChange">
            <el-table-column fixed="left" type="selection" width="55"></el-table-column>
            <el-table-column fixed="left" label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button type="text" size="mini" @click="handleCheckDetail(scope.row)">详情</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="yh" label="学校名称" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cpmc" label="产品" min-width="240" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fwnr" label="服务内容" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="zrrxm" label="责任人" width="80"></el-table-column>
            <el-table-column label="服务状态" width="100">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.zt=='0'?'primary':scope.row.zt=='1'?'success':'danger'">{{scope.row.zt=='0'?'计划中':scope.row.zt==1?'完成待确认':scope.row.zt==3?'已驳回':'关闭'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="jhksrq" label="计划开始日期" width="150"></el-table-column>
            <el-table-column prop="jhjsrq" label="计划结束日期" width="150"></el-table-column>
            <el-table-column prop="tbrxm" label="提报人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tbsj" label="提报时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfgq" label="是否过期" width="100">
              <template slot-scope="scope">
                <el-tag size="mini" :type="scope.row.sfgq=='0'?'primary':'danger'">{{scope.row.sfgq=='0'?'未过期':scope.row.sfgq=='1'?'过期':'超期完成'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column v-if="isJzuser == '0'" prop="xjgs" label="巡检工时(小时)" width="120"></el-table-column>
            <el-table-column v-if="isJzuser == '0'" prop="fxgs" label="风险工时(小时)" width="120"></el-table-column>
            <el-table-column v-if="isJzuser == '0'" prop="wtgs" label="问题工时(小时)" width="120"></el-table-column>
            <el-table-column prop="sjjsrq" label="实际结束日期" width="150"></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="htbh" label="合同编号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" min-width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmlb" label="项目类别" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfzt" label="合同性质" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sfgx" label="是否购销" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dkl" label="到款率" min-width="80" show-overflow-tooltip></el-table-column>

            <el-table-column prop="qrrxm" label="确认人" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="qrsj" label="确认时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="pf" label="评分" width="80"></el-table-column>
            

            
            
            <el-table-column label="风险等级(解决情况)" width="150">
              <template slot-scope="scope">
                <a href="javaScript:;;" v-if="scope.row.fxdj != '-'" @click="handleCheck(scope.row)">
                  <el-tag size="mini" :class="{'zxfw-fxdj-s1':scope.row.fxdj==1,'zxfw-fxdj-s2':scope.row.fxdj==2,'zxfw-fxdj-s3':scope.row.fxdj==3}">{{scope.row.fxdj==1?'S1':scope.row.fxdj==2?'S2':'S3'}}</el-tag>&nbsp;
                </a>
                <span v-if="scope.row.fxdj == '-'">{{scope.row.fxdj}}</span>
                <span style="font-size:12px">{{scope.row.fxsfcl==0?'(待处理)':scope.row.fxsfcl==1?'(已处理)':''}}</span>
              </template>
            </el-table-column>
            <el-table-column label="问题总数" width="150">
              <template slot-scope="scope">
                <a href="javaScript:;;" v-if="scope.row.wtzs != '0' && scope.row.wtzs != '-'" @click="handleCheckWt(scope.row)">
                  {{scope.row.wtzs}}
                </a>
                <span v-if="scope.row.wtzs == '-' || scope.row.wtzs == '0' || !scope.row.wtzs">- -</span>
                <span v-if="scope.row.wtzs != '0' && scope.row.wtzs != '-'" style="font-size:12px">({{scope.row.wtsfcl}})</span>
              </template>
            </el-table-column>
            
          </el-table>
        </section>
        <div text-right style="margin-top:2px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </section>
    </tableLayout>

    <serviceType :show.sync="serviceTypeShow"></serviceType>
    <editDialog :show.sync="editShow"></editDialog>
  </div>
</template>

<script>
  import zxfwFilter from "@/views/BusinessPage/specialService/filter.vue";
  import tableLayout from "@/components/layout/tableLayout.vue";
  import serviceType from "@/views/BusinessPage/specialService/serviceType.vue";
  import editDialog from "@/views/BusinessPage/specialService/edit-dialog.vue";

  import {
    getLastMonthDay
  } from "@/utils/util.js";

  export default {
    data() {
      return {
        serviceTypeShow:false,
        editShow:false,
        title: "",
        currentPage: 1,
        pageSize: 15,
        total: 0,
        tableData: [],
        multipleSelection: [],
        widsArr: [],
        wids: "",
        cpobj: {},
        rowsData: "",
        filterData: {
          keyword: "",
          cpbh: "",
          cpmc: "",
          fwzt: "",
          jhksrq: "",
          jhjsrq: "",
          sfgq: ""
        },
        isJzuser: "",
        userGroupTag: "",
        username: "",

        rowData: {},
        isMultiple: false
      };
    },
    methods: {

      // 筛选条件
      handleChangeFilter(data) {
        this.filterData = data;
        this.currentPage = 1;
        this.pageActiveService();
      },

      //复选
      handleSelectionChange(val) {
        this.widsArr = [];
        this.multipleSelection = val;
        if (val.length == 1) {
          this.isMultiple = true;
        } else {
          this.isMultiple = false;
        }
        val.forEach(ele => {
          this.widsArr.push(ele.wid);
        });
      },

      handleClick(data, params) {
        switch (data) {
          case "bzjh":
            this.serviceTypeShow = !this.serviceTypeShow;
            break;
          case "export":
            
            break;
          default:
            break;
        }
      },
      handleSizeChange(data) {
        this.pageSize = data;
        this.currentPage = 1;
        this.pageActiveService();
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        this.pageActiveService();
      },
      // 编辑
      handleEdit(){
        this.editShow = !this.editShow;
      },
      // 查看详情
      handleCheckDetail(data) {
        let {
          href
        } = this.$router.resolve({
          name: "ZdsfwDetail",
          query: {
            wid: data.wid
          }
        });
        window.open(href, "_blank");
      },
      // 获取产品
      listXmZdsfwCp() {
        this.$get(this.API.listXmZdsfwCp, {
          xmbh: ""
        }).then(res => {
          if (res.state == "success") {
            if (!res.data) {
              this.cpList = [];
            } else {
              this.cpList = res.data;
            }
          }
        });
      },
      // 获取服务内容
      listFwnrByCp() {
        this.$get(this.API.listFwnrByCp, {
          cpbh: this.cpbh,
          cpmc: this.cpmc
        }).then(res => {
          if (res.state == "success") {
            if (!res.data) {
              this.fwnrList = [];
            } else {
              this.fwnrList = res.data;
            }
          }
        });
      },
      pageActiveService() {
        this.$get(this.API.pageActiveService, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          cpbh: this.filterData.cpbh,
          cpmc: this.filterData.cpmc,
          zt: this.filterData.fwzt,
          jhksrq: this.filterData.jhksrq,
          jhjsrq: this.filterData.jhjsrq,
          sfgq: this.filterData.sfgq,
          keyword: this.filterData.keyword
        }).then(res => {
          if (res.state == "success") {
            this.tableData = res.data.rows;
            this.total = res.data.records;
          }
        });
      },
      getFirstDay() {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;
        month = month < 10 ? "0" + month : month;
        return year + "-" + month + "-" + "01";
      }
    },
    mounted() {
      this.listXmZdsfwCp();
      this.isJzuser = sessionStorage.isJZuser;
      this.userGroupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
      this.username = JSON.parse(sessionStorage.userInfo).nickName;
      // uid 人员编号
    },
    props: {},
    components: {
      tableLayout,
      zxfwFilter,
      serviceType,
      editDialog
    }
  };
</script>

<style lang="scss" scoped>
  .myitem-zxfw {
    padding: 10px 20px;
  }

  .pannel-cpmc:hover {
    text-decoration: underline !important;
  }

  .zxfw-content {
    padding: 10px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    overflow-y: auto;
  }
</style>
