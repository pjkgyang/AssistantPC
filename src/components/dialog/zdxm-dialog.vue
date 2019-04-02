<template>
  <div>
    <el-dialog
      title="项目列表"
      width="1300px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <tableLayout style="padding:0 10px;">
        <section slot="top">
          <div project_more_table>
            <div flex>
              <p class="query-title">高级搜索:</p>
              <p>
                <el-input
                  size="mini"
                  placeholder="请搜索项目编号/项目名称"
                  suffix-icon="el-icon-search"
                  v-model="keyword"
                  @change="handleSearchUser"
                  style="width:500px"
                ></el-input>
              </p>
            </div>

            <!-- <div flex>
              <p class="query-title">区域工程:</p>
              <p class="query-list"  >
                <span :class="{'bg-active':qygc == ''}" @click="handleGCZD('')">全部</span>
                <span
                  @click="handleGCZD(gcqy.label)"
                  v-for="(gcqy,index) in gczdList"
                  :key="index"
                  :class="{'bg-active':qygc == gcqy.label}"
                >{{gcqy.mc}}</span>
              </p>
            </div> -->

            <div>
              <div flex>
                <span class="query-title">项目状态:</span>
                <p class="query-list">
                  <span :class="{'bg-active':xmztC == ''}" @click="CheckXmzt('')">全部</span>
                  <span
                    v-for="xmzt in xmztMenu"
                    :class="{'bg-active':xmzt.id == xmztC}"
                    :key="xmzt.id"
                    @click="CheckXmzt(xmzt.id)"
                  >{{xmzt.mc}}</span>
                </p>
              </div>
              <div flex>
                <span class="query-title">项目类别:</span>
                <p class="query-list">
                  <span :class="{'bg-active':xmlbC == ''}" data-xmlb @click="CheckXmlb">全部</span>
                  <span
                    v-for="xmlb in xmlbMenu"
                    :data-xmlb="xmlb.id"
                    :class="{'bg-active':xmlb.id == xmlbC}"
                    :key="xmlb.id"
                    @click="CheckXmlb"
                  >{{xmlb.mc}}</span>
                </p>
              </div>
            </div>

            <div>
              <div flex>
                <p class="query-title">是否购销合同:</p>
                <p class="query-list">
                  <span :class="{'bg-active':gxhtC == ''}" data-gxht @click="CheckGxht">全部</span>
                  <span
                    v-for="gxht in gxhtMenu"
                    :data-gxht="gxht.id"
                    :class="{'bg-active':gxht.id == gxhtC}"
                    :key="gxht.id"
                    @click="CheckGxht"
                  >{{gxht.mc}}</span>
                </p>
              </div>

              <div flex>
                <p colcenter>
                  <span class="query-title">合同性质:</span>
                  <el-checkbox-group v-model="htxzList" @change="handleHtxz">
                    <el-checkbox label="A">正式</el-checkbox>
                    <!-- <el-checkbox label="B">B类</el-checkbox> -->
                    <el-checkbox label="C">在谈</el-checkbox>
                  </el-checkbox-group>
                </p>&#x3000;&#x3000;&#x3000;
                <p>
                  <span class="query-title">是否续签:</span>
                  <el-radio-group v-model="sfxqC" @change="handleChooseSfxq">
                    <el-radio label>全部</el-radio>
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </p>
              </div>
            </div>

            <div flex>
              <p class="query-title">过保日期:</p>
              <p>
                <el-date-picker
                  @change="handleChangeDate"
                  size="mini"
                  style="200px !important"
                  value-format="yyyy-MM-dd"
                  v-model="gbksrqValue"
                  type="date"
                  placeholder="过保开始日期"
                ></el-date-picker>至
                <el-date-picker
                  @change="handleChangeDate"
                  size="mini"
                  style="200px !important"
                  value-format="yyyy-MM-dd"
                  v-model="gbjsrqValue"
                  type="date"
                  placeholder="过保结束日期"
                ></el-date-picker>
              </p>
            </div>
          </div>
        </section>
        <section slot="bottom">
          <div style="margin:10px 0">
            <el-button
              :disabled="!multipleXmbh.length"
              type="primary"
              size="mini"
              @click="handleMultipleAdd"
            >批量添加</el-button>
          </div>
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
            <el-table-column prop="xmmc" label="项目名称"></el-table-column>
            <el-table-column prop="qyzd" label="所属战队" width="200"></el-table-column>
            <el-table-column label="操作" width="110">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  :disabled="scope.row.ytj == 0"
                  @click="handleAdd(scope.$index, scope.row)"
                >{{!scope.row.ytj?'已添加':'添加'}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </tableLayout>
      <div text-right class="pd-10">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import { getProjects } from "@/api/xmkb.js";
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    return {
      visible: this.show,
      keyword: "",
      currentPage: 1,
      pageSize: 15,
      total: 0,
      filters: [
        { text: "在建", value: "在建" },
        { text: "售后", value: "售后" },
        { text: "过保", value: "过保" },
        { text: "已关闭", value: "已关闭" }
      ],
      xmlbMenu: [
        { mc: "软件", id: "软件" },
        { mc: "集成", id: "集成" },
        { mc: "服务", id: "服务" }
      ],
      gxhtMenu: [{ mc: "是", id: "1" }, { mc: "否", id: "0" }],
      xmztMenu: [
        { mc: "在建", id: "1" },
        { mc: "售后", id: "2" },
        { mc: "过保", id: "3" },
        { mc: "已关闭", id: "4" }
      ],
      gczdList:[],
      xmztC: "",
      xmlbC: "",
      gxhtC: "",
      htxzList: [], //合同性质
      sfxqC: "", //是否续签
      qygc:"",//区域工程
      gbksrqValue: "",
      gbjsrqValue: "",
      tableData: [],
      multipleXmbh: [] //批量
    };
  },
  methods: {
    //  批量添加
    handleMultipleAdd() {
      this.addTeamProject(this.multipleXmbh.join(","), true);
    },
    handleSelectionChange(val) {
      this.multipleXmbh = [];
      val.forEach(ele => {
        this.multipleXmbh.push(ele.xmbh);
      });
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.getTeamProjects();
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.getTeamProjects();
    },
    handleSearchUser() {
      this.currentPage = 1;
      this.getTeamProjects();
    },
    // 工程战队
    // handleGCZD(data){
    //   this.qygc = data;
    //   this.currentPage = 1;
    //   this.getTeamProjects();  
    // },
    // 项目类别
    CheckXmlb(e) {
      let xmlb = e.target.getAttribute("data-xmlb");
      this.xmlbC = xmlb;
      this.currentPage = 1;
      this.getTeamProjects();
    },
    // 项目状态
    CheckXmzt(param) {
      this.xmztC = param;
      this.currentPage = 1;
      this.getTeamProjects();
    },
    // 购销合同
    CheckGxht(e) {
      let gxht = e.target.getAttribute("data-gxht");
      this.gxhtC = gxht;
      this.currentPage = 1;
      this.getTeamProjects();
    },
    // 项目标签
    CheckXmbq(e) {
      let xmbq = e.target.getAttribute("data-xmbq");
      this.xmbqC = xmbq;
      this.currentPage = 1;
      this.getTeamProjects();
    },
    // 是否续签
    handleChooseSfxq() {
      this.currentPage = 1;
      this.getTeamProjects();
    },
    // 合同性质
    handleHtxz() {
      this.currentPage = 1;
      this.getTeamProjects();
    },
    // 过保日期
    handleChangeDate() {
      this.currentPage = 1;
      this.getTeamProjects();
    },

    handleAdd(index, row) {
      this.addTeamProject(row.xmbh);
    },
    addTeamProject(xmbh, dialogShow) {
      //添加
      this.$post(this.API.addTeamProject, {
        xmbh: xmbh,
        qyzdwid: this.qyzdwid
      }).then(res => {
        if (res.state == "success") {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          if (!dialogShow) {
            row.ytj = 0;
          } else {
            this.visible = false;
          }
          this.$emit("addProjectSuccess", "");
        }
      });
    },
    getTeamProjects() {
      // 获取项目列表
      this.$get(this.API.pageTeamProjects, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        qyzdwid: "",
        xmlb: this.xmlbC,
        sfgx: this.gxhtC,
        xmzt: this.xmztC,
        gbsjStart: this.gbksrqValue,
        gbsjEnd: this.gbjsrqValue,
        htxz: this.htxzList.join(","),
        sfxq: this.sfxqC,
        // qygc:this.qygc,
        keyword: this.keyword
      }).then(res => {
        if (res.state == "success") {
          if (!!res.data.rows) {
            res.data.rows.forEach(element => {
              element.ytj = 1;
            });
            this.tableData = res.data.rows;
          } else {
            this.tableData = [];
          }
          this.total = res.data.records;
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    qyzdwid: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;

      if (!n) {
      } else {
        // if (!getSession("gczd")) {
        //     getMenu("gczd", this.gczdList, true); //获取工程战队
        // } else {
        // this.gczdList = getSession("gczd");
        // }
        this.currentPage = 1;
        this.getTeamProjects();
      }
    }
  },
  components: { tableLayout }
};
</script>

<style scoped>
.project_more_table .table-menu-name {
  display: inline-block;
  width: 120px;
  color: #666;
  margin: 5px 0;
  font-size: 14px;
  font-weight: 700;
}
</style>
