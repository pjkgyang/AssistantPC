<template>
  <div>
    <div class="query-condition">
      <div v-if="filterList.includes('keyword')">
        <p>
          <p class="query-title">高级搜索:</p>
          <el-input v-model="filterWord.keyword" size="mini" style="width:350px;" :placeholder="placeholder" @change="handleSearch"></el-input>&#x3000;
          <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
        </p>
      </div>
      <div v-if="filterList.includes('date')">
        <p class="query-title">{{dateTip+'日期'}}:</p>
        <p>
          <el-date-picker  v-model="filterWord.date" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handleDatepick">
          </el-date-picker>
        </p>
      </div>
      <div v-if="filterList.includes('yf')">
        <p class="query-title">月份:</p>
        <p>
          <el-date-picker @change="handleChangeYf" size="mini" v-model="filterWord.yf" value-format="yyyy-MM" type="month" placeholder="选择月"> </el-date-picker>
        </p>
      </div>

      <div v-if="filterList.includes('yfDate')">
        <p class="query-title">区间月份:</p>
        <p>
          <el-date-picker @change="handleChangeYfstartDate" size="mini" v-model="filterWord.startMonth" value-format="yyyy-MM" type="month" placeholder="选择月"> </el-date-picker>
          至
          <el-date-picker @change="handleChangeYfendDate" size="mini" v-model="filterWord.endMonth" value-format="yyyy-MM" type="month" placeholder="选择月"> </el-date-picker>
        </p>
      </div>

      <div v-if="filterList.includes('zdsfwzt')">
        <p class="query-title">状态:</p>
        <p class="query-list" @click="handleZt">
          <span v-for="(zdszt,index) in zdsfwList" :data-type="zdszt.label" :key="index" :class="{'bg-active':filterWord.zdsfwzt == zdszt.label}">{{zdszt.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('lb')">
        <p class="query-title">类别:</p>
        <p class="query-list" @click="handleLB">
          <span v-for="(lbx,index) in lbList" :data-type="lbx.label" :key="index" :class="{'bg-active':filterWord.lb == lbx.label}">{{lbx.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('qygc') && filterShow">
        <p class="query-title">区域工程:</p>
        <p class="query-list" @click="handleGCZD" style="width: 90%;">
          <span data-type="" :class="{'bg-active':filterWord.gczd == ''}">全部</span>
          <span v-for="(gcqy,index) in gczdList" :data-type="gcqy.label" :key="index" :class="{'bg-active':filterWord.gczd == gcqy.label}">{{gcqy.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('bm') && filterShow">
        <p class="query-title">部门:</p>
        <p class="query-list" @click="handleBM">
          <span data-type="" :class="{'bg-active':filterWord.bm == ''}">全部</span>
          <span v-for="(bm,index) in bmList" :data-type="bm.label" :key="index" :class="{'bg-active':filterWord.bm == bm.label}">{{bm.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('cp')">
        <p class="query-title">产品:</p>
        <p class="query-list" @click="handleCP">
          <span data-type="" :class="{'bg-active':filterWord.cp == ''}">全部</span>
          <span v-for="(cpl,index) in cplist" :data-type="cpl.label" :class="{'bg-active':filterWord.cp == cpl.label}">{{cpl.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('dwlx')">
        <p class="query-title">单位类型:</p>
        <p class="query-list" @click="handleDWLX">
          <span data-type="" :class="{'bg-active':filterWord.dwlx == ''}">全部</span>
          <span v-for="(dwlxx,index) in dwlxList" :data-type="dwlxx.label" :class="{'bg-active':filterWord.dwlx == dwlxx.label}">{{dwlxx.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('cpx')">
        <p class="query-title">产品线:</p>
        <p class="query-list" @click="handleCPX">
          <span data-type="" :class="{'bg-active':filterWord.cpx == ''}">全部</span>
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
          <span data-type="" :class="{'bg-active':filterWord.jjzt == ''}">全部</span>
          <span v-for="(jjztz,index) in jjztList" :data-type="jjztz.label" :class="{'bg-active':filterWord.jjzt == jjztz.label}">{{jjztz.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('xmlx')">
        <p class="query-title">项目类型:</p>
        <p class="query-list" @click="handleXMLX">
          <span data-type="" :class="{'bg-active':filterWord.xmlx == ''}">全部</span>
          <span v-for="(xmlxx,index) in xmlxList" :data-type="xmlxx.label" :class="{'bg-active':filterWord.xmlx == xmlxx.label}">{{xmlxx.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('lcbxmlx')">
        <p class="query-title">项目类型:</p>
        <p class="query-list" @click="handleLCBXMLX">
          <span data-type="" :class="{'bg-active':filterWord.lcbxmlx == ''}">全部</span>
          <span v-for="(xmlxx,index) in lcbxmlxList" :data-type="xmlxx.label" :class="{'bg-active':filterWord.lcbxmlx == xmlxx.label}">{{xmlxx.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('xmlb')">
        <p class="query-title">项目类别:</p>
        <p class="query-list" @click="handleXMLB">
          <span data-type="" :class="{'bg-active':filterWord.xmlb == ''}">全部</span>
          <span v-for="(xmlbx,index) in xmlbList" :data-type="xmlbx.label" :class="{'bg-active':filterWord.xmlb == xmlbx.label}">{{xmlbx.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('sfzt')">
        <p class="query-title">是否在谈:</p>
        <p class="query-list" @click="handleSFZT">
          <span data-type="" :class="{'bg-active':filterWord.sfzt == ''}">全部</span>
          <span data-type="true" :class="{'bg-active':filterWord.sfzt == 'true'}">是</span>
          <span data-type="false" :class="{'bg-active':filterWord.sfzt == 'false'}">否</span>
        </p>
      </div>
      <div v-if="filterList.includes('rylx')" >
        <p class="query-title">人员类型:</p>
        <!-- <p class="query-list"> -->
          <el-checkbox-group v-model="filterWord.rylx" @change="handleCheckedCitiesChange" style="padding:3px 0">
            <el-checkbox v-for="rylx in rylxList" :label="rylx.label" :key="rylx.label">{{rylx.mc}}</el-checkbox>
          </el-checkbox-group>
        <!-- </p> -->
      </div>
       <div v-if="filterList.includes('fbxz')">
        <p class="query-title">分包性质:</p>
        <p class="query-list" @click="handleFBXZ">
          <span data-type="" :class="{'bg-active':filterWord.fbxz == ''}">全部</span>
          <span v-for="(fbxzx,index) in fbxzList" :key="index" :data-type="fbxzx.label" :class="{'bg-active':filterWord.fbxz == fbxzx.label}">{{fbxzx.mc}}</span>
        </p>
      </div>
      <div v-if="filterList.includes('rzjb')">
        <p class="query-title">任职级别:</p>
        <p class="query-list" @click="handleRZJB">
					<span data-type="" :class="{'bg-active':filterWord.rzjb == ''}">全部</span>
          <span v-for="(rzjb,index) in rzjbList" :key="index" :data-type="rzjb.label" :class="{'bg-active':filterWord.rzjb == rzjb.label}">{{rzjb.mc}}</span>
        </p>
      </div>
			
			<div v-if="filterList.includes('rzdj')">
			  <p class="query-title">任职等级:</p>
			  <p class="query-list" @click="handleRZDJ">
					<span data-type="" :class="{'bg-active':filterWord.rzdj == ''}">全部</span>
			    <span v-for="(rzdj,index) in rzdjList" :key="index" :data-type="rzdj.label" :class="{'bg-active':filterWord.rzdj == rzdj.label}">{{rzdj.mc}}</span>
			  </p>
			</div>
			
			<div v-if="filterList.includes('xllx')">
			  <p class="query-title">序列类型:</p>
			  <p class="query-list" @click="handleXllx">
					<span data-type="" :class="{'bg-active':filterWord.xllx == ''}">全部</span>
			    <span v-for="(xllx,index) in xllxList" :key="index" :data-type="xllx.label" :class="{'bg-active':filterWord.xllx == xllx.label}">{{xllx.mc}}</span>
			  </p>
			</div>
    </div>
  </div>
</template>
<script>
import { getMenu, getSession ,getPreMonth,getLastMonthDay} from "@/utils/util.js";
export default {
  data() {
    return {
      gczdList: [],
      cpxline: [],
      xmlxList: [],
      lcbxmlxList: [],
      cplist: [],
      fbxzList:[],//分包性质
      dwlxList: [
        { label: "1", mc: "学校" },
        { label: "0", mc: "金智" },
        { label: "2", mc: "合作伙伴" }
      ],
      lbList: [{ label: "1", mc: "完工" }, { label: "2", mc: "验收" }],
      jjztList: [
        { label: "1", mc: "已关闭" },
        { label: "2", mc: "申请关闭中" }
      ],
      xmlbList: [
        { mc: "软件", label: "软件" },
        { mc: "集成", label: "集成" },
        { mc: "服务", label: "服务" }
      ],
      zdsfwList: [
        { label: '', mc: "全部" },
        { label: '0', mc: "待生成" },
        { label: '1', mc: "待发布" },
        { label: '2', mc: "已发布" }
      ],
      rzjbList: [
   
      ],
			rzdjList:[],//任职等级
      rylxList:[],
			xllxList:[],//序列类型
      bmList: [],
      filterWord: {
        sfzt: "",
        jjzt: "",
        cpxmc: "",
        gczd: "",
        bm: "",
        cp: "",
        dwlx: "",//单位类型
        sjlb: "",
        cpx: "",
        xmlx: "",
        date: "",
        xmlb: "",
        keyword: "",
        lb: 2,
        lcbxmlx: "",
        yf:'',
        startMonth:"",
        endMonth:"",
        rylx:[],
        zdsfwzt:'',
        fbxz:'',
				rzjb:'',//任职级别
        rzdj:'',//任职等级
				xllx:'' //序列类型
      }
    };
  },
  props: {
    filterList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: "请输入项目名称/项目编号"
    },
    filterShow:{
         type:Boolean,
         default:true
    },
		dateTip:{
			 type: String,
			 default: ""
		}
  },
  methods: {
    handleSearchBtn() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleSearch() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleDatepick(val) {
      if(!val) this.filterWord.date = '';
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleChangeYf(val){
      if(!val){
          this.filterWord.yf = '';
      }
      this.$emit("handleChangeFilter", this.filterWord,'yf');
    },
    handleChangeYfstartDate(val){
      if(!val) this.filterWord.startMonth = '';
    },
    handleChangeYfendDate(val){
      if(!val) this.filterWord.endMonth = '';
    },
    handleDWLX(e) {
      // 单位类型
      let dwlx = e.target.getAttribute("data-type");
      if (dwlx == null) return;
      this.filterWord.dwlx = dwlx;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleZt(e){
      // 主动式服务状态
      let zt = e.target.getAttribute("data-type");
      if (zt == null) return;
      this.filterWord.zdsfwzt = zt;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleLB(e) {
      // 类别
      let lb = e.target.getAttribute("data-type");
      if (lb == null) return;
      this.filterWord.lb = lb;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleGCZD(e) {
      // 工程战队
      let gczd = e.target.getAttribute("data-type");
      if (gczd == null) return;
      this.filterWord.gczd = gczd;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleBM(e) {
      // 部门
      let bm = e.target.getAttribute("data-type");
      if (bm == null) return;
      this.filterWord.bm = bm;
      this.$emit("handleChangeFilter", this.filterWord,'bm');
    },
    handleCP(e) {
      // 产品
      let cp = e.target.getAttribute("data-type");
      if (cp == null) return;
      this.filterWord.cp = cp;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleCPX(e) {
      // 产品线
      let cpx = e.target.getAttribute("data-type");
      this.filterWord.cpxmc = e.target.getAttribute("data-mc");
      if (cpx == null) return;
      this.filterWord.cpx = cpx;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleSJLB(e) {
      // 时间类别
      let sjlb = e.target.getAttribute("data-type");
      if (sjlb == null) return;
      this.filterWord.sjlb = sjlb;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleJJZT(e) {
      // 解决状态
      let jjzt = e.target.getAttribute("data-type");
      if (jjzt == null) return;
      this.filterWord.jjzt = jjzt;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleXMLX(e) {
      let xmlx = e.target.getAttribute("data-type");
      if (xmlx == null) return;
      this.filterWord.xmlx = xmlx;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleLCBXMLX(e) {
      let xmlx = e.target.getAttribute("data-type");
      if (xmlx == null) return;
      this.filterWord.lcbxmlx = xmlx;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleXMLB(e) {
      let xmlb = e.target.getAttribute("data-type");
      if (xmlb == null) return;
      this.filterWord.xmlb = xmlb;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleSFZT(e) {
      let sfzt = e.target.getAttribute("data-type");
      if (sfzt == null) return;
      this.filterWord.sfzt = sfzt;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleCheckedCitiesChange(){
       this.$emit("handleChangeFilter", this.filterWord);
    },
    handleFBXZ(e){
      let fbxz = e.target.getAttribute("data-type");
      if (fbxz == null) return;
      this.filterWord.fbxz = fbxz;
      this.$emit("handleChangeFilter", this.filterWord); 
    },
    handleRZJB(e){
      let rzjb = e.target.getAttribute("data-type");
      if (rzjb == null) return;
      this.filterWord.rzjb = rzjb;
      this.$emit("handleChangeFilter", this.filterWord); 
    },
		handleRZDJ(e){
			let rzdj = e.target.getAttribute("data-type");
			if (rzdj == null) return;
			this.filterWord.rzdj = rzdj;
			this.$emit("handleChangeFilter", this.filterWord); 
		},
		handleXllx(e){
			let xllx = e.target.getAttribute("data-type");
			if (xllx == null) return;
			this.filterWord.xllx = xllx;
			this.$emit("handleChangeFilter", this.filterWord); 
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
    this.fbxzList = [];
		let month = new Date().getMonth();
		month = month + 1;
		if(!!this.dateTip){
			this.filterWord.date = ['2019-'+(month<10?('0'+month):month)+'-01',getLastMonthDay('2019',month)]
		}
    // 上个月
     let date = new Date().getFullYear()+'-'+(new Date().getMonth()+1<10?('0'+(new Date().getMonth()+1)):new Date().getMonth()+1)
     this.filterWord.yf = getPreMonth(date);
		 
    if (!getSession("ProjectCustomStatus") && this.filterList.includes('xmlx')) {
      getMenu("ProjectCustomStatus", this.xmlxList, ""); //获取项目类型
    } else {
      this.xmlxList = getSession("ProjectCustomStatus");
    }

    if (!getSession("MilestoneProjectType")  && this.filterList.includes('lcbxmlx')) {
      getMenu("MilestoneProjectType", this.lcbxmlxList, ""); //获取里程碑类型
    } else {
      this.lcbxmlxList = getSession("MilestoneProjectType");
    }

    if (!getSession("cpx")  && this.filterList.includes('cpx')) {
      getMenu("cpx", this.cpxline, true); //获取产品线
    } else {
      this.cpxline = getSession("cpx");
    }

    if (!getSession("gczd")) {
      getMenu("gczd", this.gczdList, true); //获取工程战队
    } else {
      this.gczdList = getSession("gczd");
    }

    if (!getSession("cp") && this.filterList.includes('cp')) {
      getMenu("cp", this.cplist, true); //获取产品
    } else {
      this.cplist = getSession("cp");
    }

    if (!getSession("bm") && this.filterList.includes('bm')) {
      getMenu("bm", this.bmList, true); //获取部门
    } else {
      this.bmList = getSession("bm");
    }

    if (!getSession("rylx") && this.filterList.includes('rylx')) {
      getMenu("ProblemPersonType", this.rylxList, ""); //获取人员类型
    } else {
      this.rylxList = getSession("rylx");
    }
		
		
    if (!getSession("FbXz") && this.filterList.includes('fbxz')) {
      getMenu("FbXz", this.fbxzList, ""); //获取分包性质
    } else {
      this.fbxzList = getSession("FbXz");
    }
		
		if (!getSession("rzdj") && this.filterList.includes('rzdj')) {
		  getMenu("StaffQualificationLevel", this.rzdjList, ""); //获取任职等级
		} else {
		  this.rzdjList = getSession("rzdj");
		}
		
		if (!getSession("rzjb") && this.filterList.includes('rzjb')) {
		  getMenu("StaffLevel", this.rzjbList, ""); //获取任职级别
		} else {
		  this.rzjbList = getSession("rzjb");
		}
		
		if (!getSession("xllx") && this.filterList.includes('xllx')) {
		  getMenu("JobSequence", this.xllxList, ""); //获取序列类型
		} else {
		  this.xllxList = getSession("xllx");
		}
		
		
  },
  activated() {},
  watch: {},
  components: {}
};
</script>
<style scope>
</style>
