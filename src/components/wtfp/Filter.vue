<template>
    <div>
        <div class="query-condition">
            <div v-if="filterList.includes('keyword')">
                <p>
                    <p class="query-title">
                        <span @click="handleExpand" :title="this.sfzk?'点击收起筛选条件':'点击展开筛选条件'" :class="{'expandIcon':true,'el-icon-arrow-up':this.sfzk==true,'el-icon-arrow-down':this.sfzk == false}"></span>&#x3000;高级搜索:</p>
                    <el-input v-model="filterWord.keyword" size="mini" style="width:348px;" :placeholder="placeholder" @change="handleSearch"></el-input>&#x3000;
                    <el-button size="mini" type="primary" @click="handleSearch">查询</el-button>
                </p>
            </div>
            <transition name="el-zoom-in-top">
                <section v-if="sfzk" class="query-condition">
                  <div v-if="filterList.includes('bbh')">
                        <p class="query-title">版本号:</p>
                        <p>
                           <el-input v-model="filterWord.bbh" size="mini" style="width:348px;" placeholder="请输入版本号" @change="handleSearch"></el-input>&#x3000;
                        </p>
                    </div>
                    <div v-if="filterList.includes('cp')">
                        <p class="query-title">产品:</p>
                        <p class="query-list" @click="handleCp">
                            <span data-type="" :class="{'bg-active':filterWord.cpbh == ''}">全部</span>
                            <span v-for="(cpx,index) in cplist" :data-index="index" :data-type="cpx.label" :key="index" :class="{'bg-active':filterWord.cpbh == cpx.label&&filterWord.cpmc == cpx.mc}">{{cpx.mc}}</span>
                        </p>
                    </div>
                    <div v-if="filterList.includes('pxks')">
                        <p class="query-title">培训课时:</p>
                        <p class="query-list" @click="handleKs">
                            <span data-type="" :class="{'bg-active':filterWord.pxsc == ''}">全部</span>
                            <span v-for="(pxks,index) in pxkslist" :data-index="index" :data-type="pxks.label" :key="index" :class="{'bg-active':filterWord.pxsc == pxks.label}">{{pxks.mc}}</span>
                        </p>
                    </div>
                     <div v-if="filterList.includes('pxxs')">
                        <p class="query-title">培训形式:</p>
                        <p class="query-list" @click="handlePxxs">
                            <span data-type="" :class="{'bg-active':filterWord.pxxs == ''}">全部</span>
                            <span v-for="(pxxs,index) in pxxslist" :data-index="index" :data-type="pxxs.label" :key="index" :class="{'bg-active':filterWord.pxxs == pxxs.label&&filterWord.cpmc == pxxs.mc}">{{pxxs.mc}}</span>
                        </p>
                    </div> 
                    <div v-if="filterList.includes('jhcjrq')">
                        <p class="query-title">计划创建日期:</p>
                        <p class="query-list">
                            <el-date-picker @change="changeDate" value-format="yyyy-MM-dd" size="mini" v-model="filterWord.jhcjrq" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                    </div>

                    <div v-if="filterList.includes('jhpxrq')">
                        <p class="query-title">{{filterList.includes('pxxs')?'计划培训日期':'计划发版日期'}}:</p>
                        <p class="query-list">
                            <el-date-picker @change="changeDateFbrq" value-format="yyyy-MM-dd" size="mini" v-model="filterWord.jhpxrq" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                    </div>

                    <div v-if="filterList.includes('sjpxrq')">
                        <p class="query-title">实际培训日期:</p>
                        <p class="query-list">
                            <el-date-picker @change="changeDateSjpxrq" value-format="yyyy-MM-dd" size="mini" v-model="filterWord.sjpxrq" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </p>
                    </div>

                    <div v-if="filterList.includes('jhzt')">
                        <p class="query-title">计划状态:</p>
                        <p class="query-list" @click="handleJhzt">
                            <span v-for="(ztl,index) in jhztList" :data-type="ztl.lable" :key="index" :class="{'bg-active':filterWord.jhzt == ztl.lable}">{{ztl.mc}}</span>
                        </p>
                    </div>

                    <div  v-if="filterList.includes('sfyq')">
                        <p class="query-title">是否延期:</p>
                        <p style="padding:5px 0">
                            <el-radio-group v-model="filterWord.sfyq" @change="handleSfyq">
                                <el-radio :label="2">全部</el-radio>
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="0">否</el-radio>
                            </el-radio-group>
                        </p>
                    </div>

                </section>
            </transition>
        </div>
    </div>
</template>
<script>
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    return {
      cplist: [],
      jhztList: [
        { lable: "", mc: "全部" },
        { lable: "1", mc: "未完成" },
        { lable: "2", mc: "已完成" }
      ],
      pxxslist:[
        {label:1,mc:'线上直播'},
        {label:2,mc:'线下培训'},
        {label:3,mc:'线上加线下'}
      ],
      pxkslist:[
        {label:1,mc:'1小时以内'},
        {label:2,mc:'1小时~2小时'},
        {label:3,mc:'2小时~3小时'},
        {label:4,mc:'3小时以上'}
      ],
      filterWord: {
        keyword: "",
        cpbh: "",
        cpmc: "",
        bbh:"",
        jhcjrq: [],
        jhpxrq: [],
        sjpxrq:[],
        jhzt:'',
        sfyq:0,
        pxxs:'',
        pxsc:''
      },
      groupTag: "",
      sfzk: true
    };
  },
  props: {
    filterList: {
      type: Array,
      default: () => {
        return ["keyword", "cp",'jhcjrq','jhpxrq','jhzt','sfyq','bbh'];
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
    handleSearch() {
      this.$emit("handleChangeFilter", this.filterWord);
    },
    changeDate(val) {
      if(!val) this.filterWord.jhcjrq = [];
      this.$emit("handleChangeFilter", this.filterWord);
    },
    changeDateFbrq(val){
      if(!val) this.filterWord.jhpxrq = [];
      this.$emit("handleChangeFilter", this.filterWord);
    },
    changeDateSjpxrq(val){
      if(!val) this.filterWord.sjpxrq = [];
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleCp(e) {
      let cp = e.target.getAttribute("data-type");
      if (cp == null) return;
      this.filterWord.cpbh = cp;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    // 培训时长
    handleKs(e) {
      let cpks = e.target.getAttribute("data-type");
      if (cpks == null) return;
      this.filterWord.pxsc = cpks;
      this.$emit("handleChangeFilter", this.filterWord);
    },

    handlePxxs(e){
      let pxxs = e.target.getAttribute("data-type");
      if (pxxs == null) return;
      this.filterWord.pxxs = pxxs;
      this.$emit("handleChangeFilter", this.filterWord);
    },
    handleSfyq(){
        this.$emit("handleChangeFilter", this.filterWord);
    },
    handleJhzt(e) {
      let jhzt = e.target.getAttribute("data-type");
      if (jhzt == null) return;
      this.filterWord.jhzt = jhzt;
      this.$emit("handleChangeFilter", this.filterWord);
    }
  },
  mounted() {
    if (!getSession("cp") ) {
      getMenu("cp", this.cplist, true);
    } else {
      this.cplist = getSession("cp");
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
