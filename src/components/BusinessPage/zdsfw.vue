<template>
 <div class="myitem-zdsfw">
     <tableLayout class="zdsfw-content">
         <section slot="top" style="border-bottom:1px solid #EBEEF5">
           <div class="mb-12"> 
            <span class="query-title">产品:</span>
            <span class="query-list"  @click="handleCp">
               <span data-type = ""  :class="{'bg-active':cp == ''}">全部</span>
               <span v-for="(cpx,index) in cpList" :data-type="cpx.cpbh" :key="index" :class="{'bg-active':cp == cpx.cpbh}">{{cpx.cp}}</span>
            </span>
           </div> 
           <div class="mb-12">
            <span class="query-title">服务内容:</span>
            <span class="query-list"  @click="handleFwnr">
               <span data-type = ""  :class="{'bg-active':fwnr == ''}">全部</span>
               <span v-for="(fwnrl,index) in fwnrList" :data-type="fwnrl.cpbh" :key="index" :class="{'bg-active':fwnrl == fwnrl.bh}">{{fwnrl.cp}}</span>
            </span>
           </div>   
           <div class="mb-12">
            <span class="query-title">状态:</span>
            <span class="query-list"  @click="handleZt">
               <span data-type = ""  :class="{'bg-active':zt == ''}">全部</span>
               <span v-for="(ztl,index) in ztList" :data-type="ztl.lable" :key="index" :class="{'bg-active':zt == ztl.lable}">{{ztl.mc}}</span>
            </span>
           </div> 
           <div class="mb-12">
            <span class="query-title">类别:</span>
            <span class="query-list"  @click="handleLb">
               <span v-for="(lbl,index) in lbList" :data-type="lbl.lable" :key="index" :class="{'bg-active':lb == lbl.lable}">{{lbl.mc}}</span>
            </span>
           </div> 
         </section>
         <section slot="bottom" > 
            <div flex spacebetween class="mb-12">
               <div>
                    <el-button type="primary" size="mini" @click="handleClick('tbfw')">提报服务</el-button>
                    <el-button type="primary" size="mini" @click="handleClick('qrfw')">确认服务</el-button>
                    <el-button type="danger" size="mini" @click="handleClick('bhfw')">驳回服务</el-button>
                    <el-button type="primary" size="mini" @click="handleClick('xzjh')">新增自定义服务计划</el-button>
                    <el-button type="danger" size="mini" @click="handleClick('scjh')">删除自定义服务计划</el-button>
               </div>
               <div>
                   <el-button type="primary" size="mini"  @click="handleClick('export')">导出</el-button>
               </div>
           </div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border
                :max-height="tableHeight"
                @selection-change="handleSelectionChange">
                <el-table-column  type="selection"  width="55"></el-table-column>
                <el-table-column   label="产品" min-width="300">
                     <template slot-scope="scope">
                         <a href="javaScript:;;" class="pannel-cpmc" @click="handleCheckDetail(scope.row)">{{scope.row.cpmc}}</a>
                     </template>
                </el-table-column>
                <el-table-column  prop="fwnr" label="服务内容" min-width="300"  show-overflow-tooltip></el-table-column>
                <el-table-column  prop="zt" label="状态" width="100"></el-table-column>
                <el-table-column  label="计划完成时间" width="140">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="zrrxm" label="责任人" width="100"></el-table-column>
                <el-table-column prop="tbrxm" label="提报人" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="tbsj" label="提报时间" width="140"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="qrrxm" label="确认人" width="100"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="qrsj" label="确认时间" width="140"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="pf" label="评分" width="100"  ></el-table-column>
            </el-table>
            <div text-right class="mg-12">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[20, 35, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                 </el-pagination>
            </div>
        </section>
     </tableLayout>
     <tbfwDialog :show.sync='tbfwShow'></tbfwDialog>
     <wcsjDialog :show.sync='qrfwShow'></wcsjDialog>
     <qrbhfwDialog :show.sync='qrbhfwShow' :title="title"></qrbhfwDialog>
     <fwjhDialog :show.sync='fwjhShow'></fwjhDialog>
 </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import { getProjectCatalog } from "@/api/xmfz.js";
import tbfwDialog from "@/components/dialog/zdsfw/tbfw-dialog.vue";
import wcsjDialog from "@/components/dialog/zdsfw/wcsj-dialog.vue";
import qrbhfwDialog from "@/components/dialog/zdsfw/qrbhfw-dialog.vue";
import fwjhDialog from "@/components/dialog/zdsfw/fwjh-dialog.vue";

export default {
  data() {
    return {
      tbfwShow: false,
      qrfwShow: false,
      qrbhfwShow: false,
      fwjhShow: false,
      title: "",
      tableHeight: window.innerHeight - 430,
      cpList: [],
      cp: "",
      fwnrList: [{ cp: "xxxxx", cpbh: "sssss" }],
      fwnr: "",
      ztList: [
        { lable: "1", mc: "计划中" },
        { lable: "2", mc: "已完成" },
        { lable: "0", mc: "关闭" }
      ],
      zt: "",
      lbList: [
        { lable: "0", mc: "标准服务计划" },
        { lable: "1", mc: "自定义服务计划" }
      ],
      lb: "0",
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          cpmc: "售后服务",
          fwnr: "xxxxx",
          zt: "已完成",
          zrrxm: "张三",
          tbrxm: "历史",
          tbsj: "2018-08-08 12:00:00",
          qrrxm: "张三",
          qrsj: "2018-08-08 12:00:00",
          pf: 5
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          cpmc: "售后服务",
          fwnr: "xxxxx",
          zt: "已完成",
          zrrxm: "张三",
          tbrxm: "历史",
          tbsj: "2018-08-08 12:00:00",
          qrrxm: "张三",
          qrsj: "2018-08-08 12:00:00",
          pf: 5
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          cpmc: "售后服务",
          fwnr: "xxxxx",
          zt: "已完成",
          zrrxm: "张三",
          tbrxm: "历史",
          tbsj: "2018-08-08 12:00:00",
          qrrxm: "张三",
          qrsj: "2018-08-08 12:00:00",
          pf: 5
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCp(e) {
      let cp = e.target.getAttribute("data-type");
      if (cp == null) return;
      this.cp = cp;
    },
    handleFwnr(e) {
      let fwnr = e.target.getAttribute("data-type");
      if (fwnr == null) return;
      this.fwnr = fwnr;
    },
    handleZt(e) {
      let zt = e.target.getAttribute("data-type");
      if (zt == null) return;
      this.zt = zt;
    },
    handleLb(e) {
      let lb = e.target.getAttribute("data-type");
      if (lb == null) return;
      this.lb = lb;
    },
    handleClick(data) {
      switch (data) {
        case "tbfw":
          this.tbfwShow = true;
          break;
        case "qrfw":
          this.qrbhfwShow = true;
          this.title = "确认服务";
          break;
        case "bhfw":
          this.qrbhfwShow = true;
          this.title = "驳回服务";
          break;
        case "xzjh":
          this.fwjhShow = true;
          break;
        case "export":
          break;
        default:
          break;
      }
    },
    handleSizeChange(data) {
      this.pageSize = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    handleCheckDetail(data) {
      console.log(data);
      let {href} = this.$router.resolve({
        name: "ZdsfwDetail",
        params:{
          wid: '1231231' 
        }
      });
      window.open(href, "_blank");
    },
    getProjectCatalog() {
      getProjectCatalog({ xmbh: this.xmbh }).then(({ data }) => {
        if (data.state == "success") {
          if (!!data.data) {
            this.cpList = data.data;
          }
        }
      });
    }
  },
  mounted() {
    this.getProjectCatalog();
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    xmmc: {
      type: String,
      default: ""
    }
  },
  components: { tableLayout, tbfwDialog, wcsjDialog, qrbhfwDialog, fwjhDialog }
};
</script>

<style lang="scss" scoped>
.myitem-zdsfw {
  height: calc(100vh - 110px);
  padding: 10px 20px;
}
.pannel-cpmc:hover {
  text-decoration: underline !important;
}
.zdsfw-content {
  padding: 10px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
}
</style>
