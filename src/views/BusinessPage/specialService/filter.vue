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
      </div>
      <transition name="el-zoom-in-top">
        <section v-if="sfzk" class="query-condition">

          <div v-if="filterList.includes('date')">
            <span class="query-title">计划日期:</span>
            <p>
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhksrq" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhjsrq" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </p>
          </div>

          <div v-if="filterList.includes('cp')" flex>
            <span class="query-title">产品:</span>
            <p class="query-list" style="width:90%" @click="handleCp">
              <span data-type="" :class="{'bg-active':filterWord.cpxbh == ''}">全部</span>
              <span v-for="(cpx,index) in cpList" :data-index="index" :data-type="cpx.cpxwid" :key="index" :class="{'bg-active':filterWord.cpxbh == cpx.cpxwid}">{{cpx.cpxmc}}</span>
            </p>
          </div>

            <div v-if="filterList.includes('fwzt')" flex>
              <span class="query-title">服务状态:</span>
              <p class="query-list" @click="handleZt" style="width: 550px;">
                <span data-type="" :class="{'bg-active':filterWord.fwzt == ''}">全部</span>
                <span v-for="(ztl,index) in ztList" :data-type="ztl.lable" :key="index" :class="{'bg-active':filterWord.fwzt == ztl.lable}">{{ztl.mc}}</span>
              </p>
          </div>

          <div v-if="filterList.includes('sfgq')">
            <span class="query-title">是否过期:</span>
            <p class="query-list" @click="handleSfgq">
              <span v-for="(gq,index) in gqList" :data-type="gq.lable" :key="index" :class="{'bg-active':filterWord.sfgq == gq.lable}">{{gq.mc}}</span>
            </p>
          </div>

          <div v-if="filterList.includes('jhksrq')">
              <span class="query-title">计划开始日期:</span>
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhksrqmin" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhksrqmax" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
          </div>

          <div v-if="filterList.includes('jhksrq')">
              <span class="query-title">计划结束日期:</span>
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhjsrqmin" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.jhjsrqmax" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
          </div>

           <div v-if="filterList.includes('tbrq')">
              <span class="query-title">提报日期:</span>
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.tbksrq" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.tbjsrq" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
          </div>

          <div v-if="filterList.includes('qrrq')" colcenter>
              <span class="query-title">确认日期:</span>
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.qrksrq" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini" @change="changeDate" v-model="filterWord.qrjsrq" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
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
            mc: "驳回"
          },
          {
            lable: "1",
            mc: "已完成"
          },
          {
            lable: "2",
            mc: "关闭"
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
        filterWord: {
          cpxmc:"",
          cpxbh:"",
          fwzt:"",
          sfgq:"",
          jhksrq:"",//计划开始日期
          jhjsrq:"",//计划结束日期

          jhksrqmin: "",
          jhksrqmax: "",
          jhjsrqmin:"",
          jhjsrqmax:"",
          tbksrq:"",//提报开始日期
          tbjsrq:"",//提报结束日期
        },
        groupTag: "",
        sfzk: true
      };
    },
    props: {
      filterList: {
        type: Array,
        default: () => {
          return ["keyword","date","cp","fwzt","sfgq"];
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

      handleCp(e) {
        let cpbh = e.target.getAttribute("data-type");
        let index = e.target.getAttribute("data-index");
        if (!cpbh) {
          this.filterWord.cpxbh = "";
          this.filterWord.cpxmc = "";
        } else {
          this.filterWord.cpxbh = cpbh;
          this.filterWord.cpxmc = this.cpList[index].cpxmc;
        }
        this.$emit("handleChangeFilter", this.filterWord);
      },

      handleZt(e) {
        let zt = e.target.getAttribute("data-type");
        if (zt == null) return;
        this.filterWord.fwzt = zt;
        this.$emit("handleChangeFilter", this.filterWord);
      },

      handleSfgq(e) {
        let gq = e.target.getAttribute("data-type");
        if (gq == null) return;
        this.filterWord.sfgq = gq;
        this.$emit("handleChangeFilter", this.filterWord);
      },
      
            // 获取服务类型
      getSpecialServiceCPX(){
        this.$get(this.API.getSpecialServiceCPX,{}).then(res=>{
          if(res.state == 'success'){
             this.cpList = res.data;
             sessionStorage.setItem('fwlx',JSON.stringify(this.cpList));
          }else{

          }
        })
      },
    },
    mounted() {
     this.getSpecialServiceCPX();
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
