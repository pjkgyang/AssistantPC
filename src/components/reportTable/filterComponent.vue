<template>
    <div>
       <div class="query-condition">
            <div v-if="filterList.includes('keyword')">
                <p>
                <p class="query-title">高级搜索:</p>
                <el-input v-model="filterWord.keyword" size="mini" style="width:260px;" :placeholder="placeholder" @change="handleSearch"></el-input>&#x3000;
                <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
             </p>
           </div>
           <div v-if="filterList.includes('date')">
                <p class="query-title">日期:</p>
                <p>
                <el-date-picker
                        v-model="filterWord.date"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd"
                        @change="handleDatepick"
                        >
                    </el-date-picker>
                </p>
            </div>
           <div v-if="filterList.includes('qygc')">
            <p class="query-title">区域工程:</p>
            <p class="query-list"  @click="handleGCZD">
               <span data-type = ""  :class="{'bg-active':filterWord.gczd == ''}">全部</span>
               <span v-for="(gcqy,index) in gczdList" :data-type="gcqy.label" :key="index" :class="{'bg-active':filterWord.gczd == gcqy.label}">{{gcqy.mc}}</span>
              </p>
           </div>   
           <div v-if="filterList.includes('dwlx')">
              <p class="query-title">单位类型:</p>
              <p class="query-list" @click="handleDWLX">
                  <span data-type="" :class="{'bg-active':filterWord.dwlx == ''}" >全部</span>
                  <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':filterWord.dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
                  </p>
           </div>
           <div v-if="filterList.includes('cpx')">
              <p class="query-title">产品线:</p>
              <p class="query-list" @click="handleCPX">
                  <span  data-type="" :class="{'bg-active':filterWord.cpx == ''}">全部</span>
                  <span v-for="(cpxl,index) in cpxline" :data-mc="cpxl.mc" :data-type="cpxl.label" :class="{'bg-active':filterWord.cpx == cpxl.label}">{{cpxl.mc}}</span>
                  </p>
           </div>
           <div v-if="filterList.includes('sjlb')">
              <p class="query-title">时间类别:</p>
              <p class="query-list" @click="handleSJLB">
                   <span data-type="0" :class="{'bg-active':filterWord.sjlb == '0'}">按当前环节</span>
                   <span data-type="1" :class="{'bg-active':filterWord.sjlb == '1'}">按提问时间</span>
                </p>
           </div>
            <div v-if="filterList.includes('jjzt')">
              <p class="query-title">解决状态:</p>
              <p class="query-list" @click="handleJJZT">
                  <span data-type="" :class="{'bg-active':filterWord.jjzt == ''}" >全部</span>
                  <span v-for="(jjztz,index) in jjztList" :data-type="jjztz.label" :class="{'bg-active':filterWord.jjzt == jjztz.label}">{{jjztz.mc}}</span>
                </p>
           </div>
            <div v-if="filterList.includes('xmlx')">
              <p class="query-title">项目类型:</p>
              <p class="query-list" @click="handleXMLX">
                  <span data-type = "" :class="{'bg-active':filterWord.xmlx == ''}">全部</span>
                  <span v-for="(xmlxx,index) in xmlxList" :data-type="xmlxx.label" :class="{'bg-active':filterWord.xmlx == xmlxx.label}">{{xmlxx.mc}}</span>
                </p>
           </div>
           <div v-if="filterList.includes('xmlb')">
              <p class="query-title">项目类别:</p>
              <p class="query-list" @click="handleXMLB">
                  <span data-type = "" :class="{'bg-active':filterWord.xmlb == ''}">全部</span>
                  <span v-for="(xmlbx,index) in xmlbList" :data-type="xmlbx.label" :class="{'bg-active':filterWord.xmlb == xmlbx.label}">{{xmlbx.mc}}</span>
                </p>
           </div>
            <div v-if="filterList.includes('sfzt')">
              <p class="query-title">是否在谈:</p>
              <p class="query-list" @click="handleSFZT">
                <span data-type = "" :class="{'bg-active':filterWord.sfzt == ''}">全部</span>
                  <span data-type = "true" :class="{'bg-active':filterWord.sfzt == 'true'}">是</span>
                  <span data-type = "false" :class="{'bg-active':filterWord.sfzt == 'false'}">否</span> 
                </p>
           </div>
       </div>
    </div>    
</template>
<script>
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    return {
      gczdList: [],
      cpxline: [],
      xmlxList:[],
      dwlxList: [
        {label: "1",mc: "学校"},
        {label: "0", mc: "金智"},
        {label: "2",mc: "合作伙伴"}
      ],
      jjztList: [{label: "1",mc: "已关闭"},
                 {label: "2",mc: "申请关闭中"}],
      xmlbList: [
        { mc: "软件", label: "软件" },
        { mc: "集成", label: "集成" },
        { mc: "服务", label: "服务" }
      ],
      filterWord:{
        sfzt:"",
        jjzt: "",
        cpxmc: "",
        gczd: "",
        dwlx: "",
        sjlb: "",
        cpx: "",
        xmlx:"",
        date:"",
        xmlb:'',
        keyword: "",
      },
    };
  },
  props:{
    filterList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    placeholder:{
      type:String,
      default:'请输入项目名称/项目编号'
    }
  },
  methods: {
    handleSearchBtn() {
      this.$emit('handleChangeFilter',this.filterWord)   
    },
    handleSearch() {
      this.$emit('handleChangeFilter',this.filterWord)   
    },
    handleDatepick(){
      this.$emit('handleChangeFilter',this.filterWord)   
    },
    handleDWLX(e) {
      // 单位类型
      let dwlx = e.target.getAttribute("data-type");
      if (dwlx == null) return;
      this.filterWord.dwlx = dwlx;
      this.$emit('handleChangeFilter',this.filterWord)   
    },
    handleGCZD(e) {
      // 工程战队
      let gczd = e.target.getAttribute("data-type");
      if (gczd == null) return;
      this.filterWord.gczd = gczd;
      this.$emit('handleChangeFilter',this.filterWord)
    },
    handleCPX(e) {
      // 产品线
      let cpx = e.target.getAttribute("data-type");
      this.filterWord.cpxmc = e.target.getAttribute("data-mc");
      if (cpx == null) return;
      this.filterWord.cpx = cpx;
      this.$emit('handleChangeFilter',this.filterWord)   
    },
    handleSJLB(e) {
      // 时间类别
      let sjlb = e.target.getAttribute("data-type");
      if (sjlb == null) return;
      this.filterWord.sjlb = sjlb;
      this.$emit('handleChangeFilter',this.filterWord)   
    },
    handleJJZT(e) {
      // 解决状态
      let jjzt = e.target.getAttribute("data-type");
      if (jjzt == null) return;
      this.filterWord.jjzt = jjzt;
      this.$emit('handleChangeFilter',this.filterWord)   
    },
    handleXMLX(e){
        let xmlx = e.target.getAttribute('data-type');  
        if(xmlx == null) return;
        this.filterWord.xmlx = xmlx;
        this.$emit('handleChangeFilter',this.filterWord)
    },
    handleXMLB(e){
        let xmlb = e.target.getAttribute('data-type');  
        if(xmlb == null) return;
        this.filterWord.xmlb = xmlb;
        this.$emit('handleChangeFilter',this.filterWord)
    },
    handleSFZT(e){
        let sfzt = e.target.getAttribute('data-type');  
        if(sfzt == null) return;
        this.filterWord.sfzt = sfzt;
        this.$emit('handleChangeFilter',this.filterWord)
    }
   
    // queryCostStat(curPage){      //区域学校用户
    //         this.$get('http://172.16.40.61:8080/emap/sys/etender/api/report/queryCostStat.do',{
    //             curPage:curPage,
    //             pageSize:13,
    //       }).then(res=>{
    //             this.$emit('queryCostStat',res.data)
    //      })
    //   },
  },
  mounted() {
    if (!getSession("ProjectCustomStatus")||getSession("cpx")||getSession("gczd")) {
      getMenu("cpx", this.cpxline, true); // 获取产品线
      getMenu('ProjectCustomStatus',this.xmlxList,'');//获取工程战队   
      getMenu("gczd", this.gczdList, true); // 获取工程战队
    } else {
      this.cpxline = getSession("cpx");
      this.gczdList = getSession("gczd");
      this.xmlxList = getSession('ProjectCustomStatus');  
    }
  },
  activated() {},
  watch: {},
  components: {}
};
</script>
<style scope>

</style>
