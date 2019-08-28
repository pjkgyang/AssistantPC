<template>
  <div class="myitem-zxfw">
    <tableLayout class="zxfw-content" flex-column>
      <section slot="top" style="border-bottom:1px solid #EBEEF5" col="1">
        <zxfwFilter :placeholder="'学校名称/项目名称/项目编号/合同编号'" @handleChangeFilter="handleChangeFilter"></zxfwFilter>
      </section>
      <section slot="bottom" col="2">
        <section>
          <div flex spacebetween class="mb-12">
            <div>
              <el-button
                v-if="userGroupTag.includes('ZXFWGLY')"
                type="primary"
                size="mini"
                @click="handleClick('bzjh')"
              >生成标准计划</el-button>
              <el-button
                v-if="userGroupTag.includes('ZXFWGLY')"
                type="primary"
                size="mini"
                @click="handleClick('zdyjh')"
              >新增自定义计划</el-button>
              <!-- 专项服务管理员 -->
              <el-button
                v-if="userGroupTag.includes('ZXFWGLY')"
                :disabled="!widsArr.length"
                type="primary"
                size="mini"
                @click="handleClick('edit')"
              >批量修改责任人</el-button>
              <el-button
                v-if="userGroupTag.includes('ZXFWGLY')"
                :disabled="!widsArr.length"
                type="danger"
                size="mini"
                @click="handleClick('delete')"
              >删除</el-button>
              <!-- <el-button :disabled="!widsArr.length" type="primary" size="mini" @click="handleClick('qr')">批量确认</el-button> -->
              <!-- <el-button :disabled="!widsArr.length" type="danger" size="mini" @click="handleClick('bh')">批量驳回</el-button> -->
              <el-button
                :disabled="!widsArr.length"
                type="primary"
                size="mini"
                @click="handleClick('fb')"
              >发布</el-button>
            </div>
            <div>
              <el-button type="primary" size="mini" @click="handleClick('export')">导出</el-button>
            </div>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column fixed="left" type="selection" width="55"></el-table-column>
            <el-table-column
              fixed="left"
              label="操作"
              :width="userGroupTag.includes('ZXFWGLY')?240:160"
            >
              <template slot-scope="scope">
                <!-- 专项服务管理员 , 金智负责人 -->
                <el-button
                  v-if="(userGroupTag.includes('ZXFWGLY') || userid == scope.row.jzfzrbh) && scope.row.fwzt == -1"
                  type="text"
                  size="mini"
                  @click="handleOprater(scope.row,'fb')"
                >发布</el-button>
                <!-- 确认2记录不显示 -->
                <el-button
                  v-if="(userGroupTag.includes('ZXFWGLY') || userid == scope.row.jzfzrbh) && scope.row.fwzt != 2"
                  type="text"
                  size="mini"
                >
                  <a
                    :href="'#/specialservice/detail'+'?wid='+scope.row.wid+'&jl=1'"
                    target="_blank"
                  >记录</a>
                </el-button>

                <!-- 发布后待提报（0） -->
                <el-button
                  v-if="(userGroupTag.includes('ZXFWGLY') || userid == scope.row.jzfzrbh) && scope.row.fwzt == '0'"
                  type="text"
                  size="mini"
                  @click="handleOprater(scope.row,'tb')"
                >提报</el-button>
                <el-button
                  v-if="userGroupTag.includes('ZXFWGLY')"
                  type="text"
                  size="mini"
                  @click="handleEdit(scope.row)"
                >编辑</el-button>
                <el-button type="text" size="mini">
                  <a :href="'#/specialservice/detail'+'?wid='+scope.row.wid" target="_blank">详情</a>
                </el-button>
                 <el-button
                  v-if="scope.row.fwzt=='-1'"
                  type="text"
                  size="mini"
                  style="color:#f00"
                  @click="handleOprater(scope.row,'sc')"
                >删除</el-button>
                <!-- 没有确认，当前用户为学校责任人 提报后待确认（1） -->
                <el-button
                  v-if="scope.row.fwzt=='1' && userid == scope.row.xxfzrbh"
                  type="text"
                  size="mini"
                  @click="handleOprater(scope.row,'qr')"
                >确认</el-button>
                <el-button
                  v-if="scope.row.fwzt=='1'&& userid == scope.row.xxfzrbh"
                  type="text"
                  size="mini"
                  @click="handleOprater(scope.row,'bh')"
                >驳回</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="yh" label="学校名称" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmmc" label="项目名称" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="xmbh" label="项目编号" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="htbh" label="合同编号" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cpxmc" label="产品" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fwzt" label="服务状态" min-width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-tag
                  size="mini"
                  :type="scope.row.fwzt==1?'success':scope.row.fwzt==2?'danger':scope.row.fwzt==-1?'info':'primary'"
                >{{scope.row.fwzt==0?'计划中':scope.row.fwzt==1?'已完成':scope.row.fwzt==2?'关闭':scope.row.fwzt==3?'驳回':'待发布'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="fwjd" label="服务阶段" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fwx" label="服务项" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="fwnr" label="服务内容" min-width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jhkssj" label="开始日期" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jhjssj" label="结束日期" min-width="100" show-overflow-tooltip></el-table-column>
          </el-table>
        </section>
        <div text-right style="margin-top:2px">
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
      </section>
    </tableLayout>

    <el-dialog
      title="选择项目"
      :visible.sync="chooseItemShow"
      :close-on-click-modal="false"
      width="800px"
      top="30px"
      append-to-body
    >
      <div style="padding:10px;">
        <itemChoose @handleEdit="handleChooseItem"></itemChoose>
      </div>
    </el-dialog>

    <!-- 服务类型 -->
    <serviceType
      :show.sync="serviceTypeShow"
      :xmbh="curItem.xmbh"
      @handleAddservice="handleAddservice"
    ></serviceType>
    <!-- 编辑 -->
    <editDialog
      :show.sync="editShow"
      :plxgZrr="plxgZrr"
      :dataInfo="curRow"
      @handleCommitEdit="handleCommitEdit"
    ></editDialog>
    <!-- 确认 -->
    <qrfwDialog :show.sync="qrfwShow" @handleClickSure="handleClickSureQrfw"></qrfwDialog>
    <!-- 添加计划 -->
    <addplan :show.sync="zjyShow" @handleCommitZdyjh="handleCommitZdyjh"></addplan>
    <!-- 驳回 -->
    <bhDialog :show.sync="bhShow" @handleClickSure="handleClickSureBhfw"></bhDialog>
    <!-- 提报 -->
    <tbDialog :show.sync="tbShow" :wid="curRow.wid" @handleCommitTb="handleCommitTb"></tbDialog>
  </div>
</template>

<script>
import zxfwFilter from "@/views/BusinessPage/specialService/filter.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import serviceType from "@/views/BusinessPage/specialService/serviceType.vue";
import addplan from "@/views/BusinessPage/specialService/addPlan.vue";
import editDialog from "@/views/BusinessPage/specialService/edit-dialog.vue";
import qrfwDialog from "@/views/BusinessPage/specialService/qrfw-dialog.vue";
import tbDialog from "@/views/BusinessPage/specialService/tb-dialog.vue"; //提报附件
import bhDialog from "@/components/dialog/smDialog.vue";
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
import { getLastMonthDay } from "@/utils/util.js";

export default {
  data() {
    return {
      chooseItemShow: false,
      serviceTypeShow: false,
      editShow: false,
      qrfwShow: false, //确认服务
      bhShow: false, //驳回服务
      zjyShow: false, //自定义计划
      tbShow: false, //提报显示
      title: "",
      currentPage: 1,
      pageSize: 15,
      total: 0,
      tableData: [],
      widsArr: [], //计划 复选租
      wids: "",
      cpobj: {},
      rowsData: "",
      curItem: {}, //当前选择项目
      plxgZrr: false, //是否批量修改
      isjl: false, //是否为记录操作
      curRow: {}, //当前选择记录
      filterData: {
        keyword: "",
        cpxmc: "",
        fwzt: "",
        jhksrq: "",
        jhjsrq: "",
        sfgq: ""
      },
      isJzuser: "",
      userGroupTag: "",
      userid: "", //用户编号 当前用户
      rowData: {},
      isMultiple: false
    };
  },
  methods: {
    // 确认提交
    handleClickSureQrfw(data) {
      this.$post(this.API.confirmSpecialService, {
        wids: !!this.curRow.wid ? this.curRow.wid : this.widsArr,
        pf: data.pf,
        sm: data.sm
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "提交成功", type: "success" });
          this.pageSpecialService();
          this.qrfwShow = false;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },

    // 驳回服务
    handleClickSureBhfw(data) {
      this.$post(this.API.rejectSpecialService, {
        wids: !!this.curRow.wid ? this.curRow.wid : this.widsArr,
        sm: data.sm
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "驳回成功", type: "success" });
          this.pageSpecialService();
          this.bhShow = false;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 提报
    handleCommitTb() {
      this.pageSpecialService();
    },
    // 编辑提交
    handleCommitEdit(data) {
      this.$post(this.API.updateZxfws, {
        wids: !this.plxgZrr ? this.curRow.wid : this.widsArr,
        jzfzrbh: data.jzfzrbh,
        jzfzrxm: data.jzfzrxm,
        xxfzrxm: data.xxfzrxm,
        xxfzrbh: data.xxfzrbh,
        jhkssj: data.jhksrq,
        jhjssj: data.jhjsrq
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "保存成功", type: "success" });
          this.pageSpecialService();
          this.editShow = false;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 关闭记录dialog
    handleCloseDialog() {
      this.recrordShow = !this.recrordShow;
    },

    // 生成自定义服务(标准)
    handleCommitZdyjh() {
      this.pageSpecialService();
    },
    // 生成服务(标准)
    handleAddservice(params, date) {
      this.$post(this.API.generateSpecialService, {
        xmbh: this.curItem.xmbh,
        cpxwids: params.join(","),
        jhlx: 1
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "保存成功", type: "success" });
          this.serviceTypeShow = !this.serviceTypeShow;
          this.pageSpecialService();
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 选择项目
    handleChooseItem(data) {
      this.curItem = data;
      this.serviceTypeShow = !this.serviceTypeShow;
    },
    // 筛选条件
    handleChangeFilter(data) {
      this.filterData = data;
      this.currentPage = 1;
      this.pageSpecialService();
    },

    //复选
    handleSelectionChange(val) {
      this.widsArr = [];
      val.forEach(ele => {
        this.widsArr.push(ele.wid);
      });
    },
    // 记录，提报
    handleOprater(params, type) {
      this.curRow = params;
      switch (type) {
        // 记录
        case "jl":
          let { href } = this.$router.resolve({
            name: "specialserviceDetail",
            query: {
              wid: params.wid,
              jl: 1
            }
          });
          window.open(href, "_blank");
          break;
        // 详情
        case "xq":
          let { hrefxq } = this.$router.resolve({
            name: "specialserviceDetail",
            query: {
              wid: params.wid
            }
          });
          window.open(hrefxq, "_blank");
          break;

        // 提报
        case "tb":
          this.tbShow = !this.tbShow;
          break;
        // 发布
        case "fb":
          this.releaseSpecialService(params.wid);
          break;
        // 确认
        case "qr":
          this.qrfwShow = true;
          break;
        // 驳回
        case "bh":
          this.bhShow = true;
          break;
        // 删除
        case "sc":
          this.$post(this.API.deleteSpecialService, {
            wids: params.wid
          }).then(res => {
            if (res.state == "success") {
              this.$message({ message: "删除成功", type: "success" });
              this.pageSpecialService();
            }
          });
          break;
        default:
          break;
      }
    },

    handleClick(data, params) {
      switch (data) {
        case "bzjh":
          this.chooseItemShow = !this.chooseItemShow;
          break;
        case "export":
          break;
        // 批量修改
        case "edit":
          this.plxgZrr = true;
          this.editShow = !this.editShow;
          break;
        // 自定义计划
        case "zdyjh":
          this.zjyShow = !this.zjyShow;
          break;

        // 删除
        case "delete":
          this.$confirm("是否删除此计划?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.$post(this.API.deleteSpecialService, {
                wids: this.widsArr
              }).then(res => {
                if (res.state == "success") {
                  this.$message({ message: "删除成功", type: "success" });
                  this.pageSpecialService();
                }
              });
            })
            .catch(() => {});
          break;

        // 批量确认
        case "qr":
          this.qrfwShow = true;
          break;
        // 批量驳回
        case "bh":
          this.bhShow = true;
          break;
        // 发布
        case "fb":
          this.releaseSpecialService(this.widsArr);
          break;
        default:
          break;
      }
    },
    handleSizeChange(data) {
      this.pageSize = data;
      this.currentPage = 1;
      this.pageSpecialService();
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      this.pageSpecialService();
    },

    // 编辑（单条）
    handleEdit(data) {
      this.curRow = data;
      this.plxgZrr = false;
      this.editShow = !this.editShow;
    },

    // 查看详情
    handleCheckDetail(data) {
      let { href } = this.$router.resolve({
        name: "ZdsfwDetail",
        query: {
          wid: data.wid
        }
      });
      window.open(href, "_blank");
    },

    // 获取专项服务列表
    pageSpecialService() {
      this.$get(this.API.pageSpecialService, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        cpxmc: this.filterData.cpxmc,
        fwzt: this.filterData.fwzt,
        jhksrqmax: this.filterData.jhksrq,
        jhjsrqmax: this.filterData.jhjsrq,
        sfgq: this.filterData.sfgq,
        keyword: this.filterData.keyword
      }).then(res => {
        if (res.state == "success") {
          this.tableData = res.data.rows;
          this.total = res.data.records;
        } else {
          this.$alert(res.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    // 发布
    releaseSpecialService(wids) {
      this.$post(this.API.releaseSpecialService, {
        wids: wids
      }).then(res => {
        if (res.state == "success") {
          this.$message({ message: "发布成功", type: "success" });
          this.pageSpecialService();
        } else {
        }
      });
    }
  },
  mounted() {
    this.pageSpecialService();
    this.isJzuser = sessionStorage.isJZuser;
    this.userGroupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
    this.userid = JSON.parse(sessionStorage.userInfo).uid;
    // uid 人员编号
  },
  props: {},
  components: {
    tableLayout,
    zxfwFilter,
    serviceType,
    editDialog,
    itemChoose,
    addplan,
    qrfwDialog,
    bhDialog,
    tbDialog
  }
};
</script>

<style lang="scss" scoped>
.myitem-zxfw {
  padding: 10px 20px;
  a {
    color: #409eff;
  }
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
