<template>
  <div>
    <div class="query-condition">
      <div v-if="filterList.includes('keyword')" flex>
        <p>
          <p class="query-title">
          <span @click="handleExpand" :title="this.sfzk?'点击收起筛选条件':'点击展开筛选条件'" :class="{'expandIcon':true,'el-icon-arrow-up':this.sfzk==true,'el-icon-arrow-down':this.sfzk == false}"></span>&#x3000;高级搜索:</p>
          <el-input v-model="filterWord.keyword" size="mini" style="width:487px;" :placeholder="placeholder" @change="handleSearch"></el-input>&#x3000;
          <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
        </p>
        <div v-if="filterList.includes('ismine') && unitType == 0" colcenter>
              <span class="query-title">责任人是我:</span>
              <p>
                <el-checkbox v-model="filterWord.ismine" true-label="1" false-label="0" @change="handleChangeIsmine">是</el-checkbox>
              </p>
        </div>
      </div>
      <transition name="el-zoom-in-top">
        <section v-if="sfzk" class="query-condition">

          <div v-if="filterList.includes('date')">
            <span class="query-title">计划开始日期:</span>
            <p>
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhksrqmin" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhksrqmax" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </p>
          </div>

          <div v-if="filterList.includes('date1')">
            <span class="query-title">计划结束日期:</span>
            <p>
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhjsrqmin" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhjsrqmax" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </p>
          </div>

          <!-- <div v-if="filterList.includes('cp')" flex>
            <span class="query-title">产品:</span>
            <p class="query-list" style="width:90%" @click="handleCp">
              <span data-type="" :class="{'bg-active':filterWord.cpbh == ''}">全部</span>
              <span v-for="(cpx,index) in cpList" :data-index="index" :data-type="cpx.id" :key="index" :class="{'bg-active':filterWord.cpbh == cpx.id&&filterWord.cpmc == cpx.text}">{{cpx.text}}</span>
            </p>
          </div> -->


          <div v-if="filterList.includes('fwnr') && unitType == 0" >
            <span class="query-title">服务内容:</span>
            <p class="query-list" @click="handleFwnr">
              <span data-type="" :class="{'bg-active':filterWord.fwnr == ''}">全部</span>
              <span v-for="(fwnrl,index) in fwnrList" :data-type="fwnrl.id" :key="index" :class="{'bg-active':filterWord.fwnr == fwnrl.id}">{{fwnrl.text}}</span>
            </p>
          </div>

            <div v-if="filterList.includes('fwzt') && unitType == 0" flex>
              <span class="query-title">服务状态:</span>
              <p class="query-list" @click="handleZt" style="width: 550px;">
                <span data-type="" :class="{'bg-active':filterWord.fwzt == ''}">全部</span>
                <span v-for="(ztl,index) in ztList" :data-type="ztl.lable" :key="index" :class="{'bg-active':filterWord.fwzt == ztl.lable}">{{ztl.mc}}</span>
              </p>
          </div>

          <div v-if="filterList.includes('fxdj') && unitType == 0" flex>
              <span class="query-title">风险:</span>
              <p class="query-list" @click="handleFx">
                <span v-for="(fxdj,index) in fxList" :data-type="fxdj.lable" :key="index" :class="{'bg-active':filterWord.fxdj == fxdj.lable}">{{fxdj.mc}}</span>
              </p>
          </div>

           <div v-if="filterList.includes('wtzt') && unitType == 0" flex>
              <span class="query-title">问题状态:</span>
              <p class="query-list" style="width: 550px;">
                <span v-for="(wtzt,index) in wtztList" @click="handleWTZT(wtzt.lable)" :key="index" :class="{'bg-active':filterWord.wtzt == wtzt.lable}">{{wtzt.mc}}</span>
              </p>
            </div>

            <div v-if="filterList.includes('fxzt') && unitType == 0" flex>
              <span class="query-title">风险状态:</span>
              <p class="query-list">
                <span v-for="(fxzt,index) in wtztList" @click="handleFXZT(fxzt.lable)" :key="index" :class="{'bg-active':filterWord.fxzt == fxzt.lable}">{{fxzt.mc}}</span>
              </p>
            </div>

          <div flex v-if="unitType == 0">
            <div v-if="filterList.includes('xmzt')" flex>
              <span class="query-title">项目状态:</span>
              <p class="query-list" @click="handleXmzt" style="width: 550px;">
                <span data-type="" :class="{'bg-active':filterWord.xmzt == ''}">全部</span>
                <span v-for="(xmzt,index) in xmztList" :data-type="xmzt.lable" :key="index" :class="{'bg-active':filterWord.xmzt == xmzt.lable}">{{xmzt.mc}}</span>
              </p>
            </div>

           
          </div>

          <div v-if="filterList.includes('sfgq') && unitType == 0">
            <span class="query-title">是否过期:</span>
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
  import {
    getLastMonthDay
  } from "@/utils/util.js";
  export default {
    data() {
      return {
        cpList: [],
        fwnrList: [],
        ztList: [{
            lable: "0",
            mc: "计划中"
          },
          {
            lable: "3",
            mc: "已驳回"
          },
          {
            lable: "1",
            mc: "完成待确认"
          },
          {
            lable: "2",
            mc: "关闭"
          }
        ],
        fxList: [{
            lable: "",
            mc: "全部"
          },
          {
            lable: "0",
            mc: "有风险"
          },
          {
            lable: "1",
            mc: "S1"
          },
          {
            lable: "2",
            mc: "S2"
          },
          {
            lable: "3",
            mc: "S3"
          }
        ],
        lbList: [{
            lable: "",
            mc: "全部"
          },
          {
            lable: "1",
            mc: "标准服务计划"
          },
          {
            lable: "0",
            mc: "自定义服务计划"
          }
        ],
        xmztList: [{
            lable: "已过保",
            mc: "已过保"
          },
          {
            lable: "已终止",
            mc: "已终止"
          },
          {
            lable: "历史结项",
            mc: "历史结项"
          },
          {
            lable: "已验收",
            mc: "已验收"
          },
          {
            lable: "验收结项",
            mc: "验收结项"
          },
          {
            lable: "已启动",
            mc: "已启动"
          },
          {
            lable: "未启动",
            mc: "未启动"
          }
        ],
        gqList: [{
            lable: "",
            mc: "全部"
          },
          {
            lable: "0",
            mc: "未过期"
          },
          {
            lable: "1",
            mc: "过期"
          },
          {
            lable: "2",
            mc: "超期"
          }
        ],
        wtztList: [{
            lable: "",
            mc: "全部"
          },
          {
            lable: "0",
            mc: "待处理"
          },
          {
            lable: "1",
            mc: "已处理"
          },
        ],
        unitType: '',
        filterWord: {
          keyword: "",
          fwnr: "",
          cpbh: "",
          cpmc: "",
          fwzt: "",
          lb: "",
          xmzt: "",
          jhksrqmin: "",
          jhksrqmax: "",
          jhjsrqmin:"",
          jhjsrqmax:"",
          sfgq: "",
          fxdj: "",
          wtzt: "",
          fxzt: "",
          ismine: "1"
        },
        groupTag: "",
        sfzk: true
      };
    },
    props: {
      filterList: {
        type: Array,
        default: () => {
          return ["keyword", "cp", "fwnr", "fwzt", 'fxdj', "xmzt", "lb", "date", "date1","sfgq", "wtzt", "fxzt", "ismine"];
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
      handleChangeIsmine() {
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
      // 问题状态
      handleWTZT(data) {
        this.filterWord.wtzt = data;
        this.$emit("handleChangeFilter", this.filterWord);
      },
      // 风险状态
      handleFXZT(data) {
        console.log(data);
        this.filterWord.fxzt = data;
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
          cpbh:'',
          cpmc:''
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
      this.listFwnrByCp();//获取服务内容
      this.groupTag = JSON.parse(sessionStorage.getItem("userInfo")).userGroupTag;
      if (this.groupTag.includes("ZDSFWGLY")) {
        this.filterWord.jhksrqmin = this.filterWord.jhksrqmax = "";
      }
      this.unitType = JSON.parse(sessionStorage.getItem('userInfo')).unitType;
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
