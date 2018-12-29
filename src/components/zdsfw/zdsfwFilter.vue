<template>
  <div>
    <div class="query-condition">
      <div v-if="filterList.includes('keyword')">
        <p>
          <p class="query-title">
            <span @click="handleExpand" :title="this.sfzk?'点击收起筛选条件':'点击展开筛选条件'" :class="{'expandIcon':true,'el-icon-arrow-up':this.sfzk==true,'el-icon-arrow-down':this.sfzk == false}"></span>&#x3000;高级搜索:</p>
          <el-input v-model="filterWord.keyword" size="mini" style="width:348px;" :placeholder="placeholder" @change="handleSearch"></el-input>&#x3000;
          <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
        </p>
      </div>
      <transition name="el-zoom-in-top">
        <section v-if="sfzk" class="query-condition">
          <div v-if="filterList.includes('date')">
            <p class="query-title">计划日期:</p>
            <p>
              <!-- <el-date-picker @change="changeDate" value-format="yyyy-MM-dd" size="mini" v-model="filterWord.date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker> -->
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhksrq" type="date" placeholder="选择开始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhjsrq" type="date" placeholder="选择结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </p>
          </div>

          <div v-if="filterList.includes('cp')">
            <p class="query-title">产品:</p>
            <p class="query-list" @click="handleCp">
              <span data-type="" :class="{'bg-active':filterWord.cpbh == ''}">全部</span>
              <span v-for="(cpx,index) in cpList" :data-index="index" :data-type="cpx.id" :key="index" :class="{'bg-active':filterWord.cpbh == cpx.id&&filterWord.cpmc == cpx.text}">{{cpx.text}}</span>
            </p>
          </div>

          <div v-if="filterList.includes('fwnr')">
            <p class="query-title">服务内容:</p>
            <p class="query-list" @click="handleFwnr">
              <span data-type="" :class="{'bg-active':filterWord.fwnr == ''}">全部</span>
              <span v-for="(fwnrl,index) in fwnrList" :data-type="fwnrl.id" :key="index" :class="{'bg-active':filterWord.fwnr == fwnrl.id}">{{fwnrl.text}}</span>
            </p>
          </div>

          <div v-if="filterList.includes('fwzt')">
            <p class="query-title">服务状态:</p>
            <p class="query-list" @click="handleZt">
              <span data-type="" :class="{'bg-active':filterWord.fwzt == ''}">全部</span>
              <span v-for="(ztl,index) in ztList" :data-type="ztl.lable" :key="index" :class="{'bg-active':filterWord.fwzt == ztl.lable}">{{ztl.mc}}</span>
            </p>
          </div>

          <div v-if="filterList.includes('fxdj')">
            <p class="query-title">风险:</p>
            <p class="query-list" @click="handleFx">
              <span v-for="(fxdj,index) in fxList" :data-type="fxdj.lable" :key="index" :class="{'bg-active':filterWord.fxdj == fxdj.lable}">{{fxdj.mc}}</span>
            </p>
          </div>

          <div v-if="filterList.includes('xmzt')">
            <p class="query-title">项目状态:</p>
            <p class="query-list" @click="handleXmzt">
              <span data-type="" :class="{'bg-active':filterWord.xmzt == ''}">全部</span>
              <span v-for="(xmzt,index) in xmztList" :data-type="xmzt.lable" :key="index" :class="{'bg-active':filterWord.xmzt == xmzt.lable}">{{xmzt.mc}}</span>
            </p>
          </div>
<!-- 
          <div v-if="filterList.includes('lb')">
            <p class="query-title">类别:</p>
            <p class="query-list" @click="handleLb">
              <span v-for="(lbl,index) in lbList" :data-type="lbl.lable" :key="index" :class="{'bg-active':filterWord.lb == lbl.lable}">{{lbl.mc}}</span>
            </p>
          </div> -->

          <div v-if="filterList.includes('sfgq')">
            <p class="query-title">是否过期:</p>
            <p class="query-list" @click="handleSfgq">
              <span v-for="(gq,index) in gqList" :data-type="gq.lable" :key="index" :class="{'bg-active':filterWord.sfgq == gq.lable}">{{gq.mc}}</span>
            </p>
          </div>
        </section>
      </transition>
    </div>
  </div>
</template>
<script>
import { getLastMonthDay } from "@/utils/util.js";
export default {
  data() {
    return {
      cpList: [],
      fwnrList: [],
      ztList: [
        { lable: "0", mc: "计划中" },
        { lable: "3", mc: "已驳回" },
        { lable: "1", mc: "完成待确认" },
        { lable: "2", mc: "关闭" }
      ],
      fxList:[
        { lable: "", mc: "全部" },
        { lable: "0", mc: "有风险" },
        { lable: "1", mc: "S1" },
        { lable: "2", mc: "S2" },
        { lable: "3", mc: "S3" }
      ],
      lbList: [
        { lable: "", mc: "全部" },
        { lable: "1", mc: "标准服务计划" },
        { lable: "0", mc: "自定义服务计划" }
      ],
      xmztList: [
        { lable: "已过保", mc: "已过保" },
        { lable: "已终止", mc: "已终止" },
        { lable: "历史结项", mc: "历史结项" },
        { lable: "已验收", mc: "已验收" },
        { lable: "验收结项", mc: "验收结项" },
        { lable: "已启动", mc: "已启动" },
        { lable: "未启动", mc: "未启动" }
      ],
      gqList: [
        { lable: "", mc: "全部" },
        { lable: "0", mc: "未过期" },
        { lable: "1", mc: "过期" }
      ],
      filterWord: {
        keyword: "",
        fwnr: "",
        cpbh: "",
        cpmc: "",
        fwzt: "",
        lb: "",
        xmzt: "",
        jhksrq:"",
        jhjsrq:"",
        // date: [
        //   this.getFirstDay(),
        //   getLastMonthDay(
        //     new Date().getFullYear(),
        //     new Date().getMonth() + 1 < 10
        //       ? "0" + (new Date().getMonth() + 1)
        //       : new Date().getMonth() + 1
        //   )
        // ],
        sfgq: "",
        fxdj:""
      },
      groupTag: "",
      sfzk: true
    };
  },
  props: {
    filterList: {
      type: Array,
      default: () => {
        return ["keyword", "cp", "fwnr", "fwzt",'fxdj', "xmzt", "lb", "date", "sfgq"];
      }
    },
    placeholder: {
      type: String,
      default: "请输入项目名称/项目编号"
    },
    xmbh: {
      type: String,
      default: ""
    },
    filterShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleExpand() {
      this.sfzk = !this.sfzk;
    },
    handleSearchBtn() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleSearch() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    changeDate(val) {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    changeSfcq() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleCp(e) {
      let cpbh = e.target.getAttribute("data-type");
      let index = e.target.getAttribute("data-index");
      if (!cpbh) {
        this.filterWord.cpbh = "";
        this.filterWord.cpmc = "";
      } else {
        this.filterWord.cpbh = cpbh;
        this.filterWord.cpmc = this.cpList[index].text;
      }
      this.filterWord.fwnr = "";
      this.listFwnrByCp();
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleFwnr(e) {
      let fwnr = e.target.getAttribute("data-type");
      if (fwnr == null) return;
      this.filterWord.fwnr = fwnr;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleZt(e) {
      let zt = e.target.getAttribute("data-type");
      if (zt == null) return;
      this.filterWord.fwzt = zt;
      this.$emit("handleChangeFilter", this.filterWord);
    },
  handleFx(e) {
      let fxdj = e.target.getAttribute("data-type");
      if (fxdj == null) return;
      this.filterWord.fxdj = fxdj;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleXmzt(e) {
      let zt = e.target.getAttribute("data-type");
      if (zt == null) return;
      this.filterWord.xmzt = zt;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleLb(e) {
      let lb = e.target.getAttribute("data-type");
      if (lb == null) return;
      this.filterWord.lb = lb;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleSfgq(e) {
      let gq = e.target.getAttribute("data-type");
      if (gq == null) return;
      this.filterWord.sfgq = gq;
      this.$emit("handleChangeFilter", this.filterWord);
    },

    listXmZdsfwCp() {
      this.$get(this.API.listXmZdsfwCp, {
        xmbh: this.xmbh
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
    listFwnrByCp() {
      this.$get(this.API.listFwnrByCp, {
        cpbh: this.filterWord.cpbh,
        cpmc: this.filterWord.cpmc
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
    getFirstDay() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      return year + "-" + month + "-" + "01";
    }
  },
  mounted() {
    this.listXmZdsfwCp();
    this.groupTag = JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag;
    if (this.groupTag.includes("ZDSFWGLY")) {
      this.filterWord.jhksrq = this.filterWord.jhjsrq = "";
    }
  },
  activated() {},
  watch: {},
  components: {}
};
</script>
<style scope>
.nomargin span {
  margin: 3px 0 !important;
}
</style>
