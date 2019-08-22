<template>
  <div>
    <div class="query-condition">
      <div flex v-if="filterArr.includes('keyword')">
        <p>
          <p class="query-title">
          <span @click="handleExpand" :title="this.sfzk?'点击收起筛选条件':'点击展开筛选条件'" :class="{'expandIcon':true,'el-icon-arrow-up':this.sfzk==true,'el-icon-arrow-down':this.sfzk == false}"></span>&#x3000;高级搜索:</p>
          <el-input v-model="filterWord.keyword" size="mini" style="width:487px;" placeholder="请输入会议主题，会议人员，会议地点" @change="handleSearch"></el-input>&#x3000;
          <el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button>
        </p>
      </div>
      <transition name="el-zoom-in-top">
        <section v-if="sfzk" class="query-condition">

          <div flex>
            <span class="query-title">会议开始时间:</span>
            <p>
              <el-date-picker size="mini"  v-model="filterWord.startDateTime" type="date" placeholder="选择开始日期"
                format="yyyy-MM-dd"  value-format="yyyy-MM-dd">
              </el-date-picker>
              &#x3000;至&#x3000;
              <el-date-picker size="mini"  v-model="filterWord.endDateTime" type="date" placeholder="选择结束日期"
                format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </p>&#x3000;
            <span v-if="type == 'meetingStatic'"><el-button size="mini" type="primary" @click="handleSearchBtn">查询</el-button></span>
          </div>


          <div flex v-if="filterArr.includes('hylx')">
            <span class="query-title">会议类型:</span>
            <p flex>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="hylx" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(hylx,index) in hylxList" :label="hylx.label" :key="index">{{hylx.mc}}</el-checkbox>
            </el-checkbox-group>
            </p>
          </div>

          <div flex>
              <span class="query-title">会议形式:</span>
              <p class="query-list">
                <span :class="{'bg-active':filterWord.meetingFormat == ''}" @click="handleHyxs('')">全部</span>
                <span v-for="(hyxs,index) in hyxsList"  :key="index" :class="{'bg-active':filterWord.meetingFormat == hyxs.label}" @click="handleHyxs(hyxs.label)">{{hyxs.mc}}</span>
              </p>
          </div>

          <div flex>
            <span class="query-title">事项完成状态:</span>
            <p class="query-list" >
              <span :class="{'bg-active':filterWord.meetingStatus == ''}" @click="handleWczt('')">全部</span>
              <span v-for="(zt,index) in ztList" :key="index" :class="{'bg-active':filterWord.meetingStatus == zt.label}" @click="handleWczt(zt.label)">{{zt.mc}}</span>
            </p>
          </div>

          <div flex>
            <span class="query-title">内部会议:</span>
            <p class="query-list" >
              <span v-for="(nbhy,index) in nbhyList" :key="index" :class="{'bg-active':filterWord.internalMeeting == nbhy.label}" @click="handleNbhy(nbhy.label)">{{nbhy.mc}}</span>
            </p>
          </div>
        </section>
      </transition>
    </div>
  </div>
</template>
<script>
  import { getMenu, getSession} from "@/utils/util.js";
  export default {
    data() {
      return {
        // hylxList: [{
        //   lable: "0",
        //   mc: "区域工程例会"
        // },{
        //   lable: "1",
        //   mc: "区域协同例会"
        // },{
        //   lable: "2",
        //   mc: "项目例会"
        // }],
        hylxList: [],
        hyxsList: [],
        ztList: [],
        nbhyList:[
          {
            label: "",
            mc: "全部"
          },
          {
            label: "1",
            mc: "是"
          },
          {
            label: "0",
            mc: "否"
          }
        ],
        checkAll: false,
        isIndeterminate: true,
        hylx:[],//会议类型
        filterWord: {
          keyword:"",
          meetingTypes:'',
          meetingFormat:"",
          meetingStatus:"",
          internalMeeting:"",
          startDateTime:"",//计划开始日期
          endDateTime:"",//计划结束日期

        },
        groupTag: "",
        sfzk: true
      };
    },
    props: {
      filterArr:{
        type:Array,
        default:()=>{
          return ['keyword','hylx']
        }
      },
      type:{
        type:String,
        default:''
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

      handleCheckAllChange(val) {
        if(val){
          this.hylx =  this.hylxList.map(ele=>{
            return ele.label;
          })
          this.filterWord.meetingTypes = this.hylx.join(',');
        }else{
          this.hylx = [];
          this.filterWord.meetingTypes = '';
        }
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.hylxList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.hylxList.length;
        this.filterWord.meetingTypes = value.join(',');
      },
      // 内部会议
      handleNbhy(data){
        this.filterWord.internalMeeting = data;
        this.$emit("handleChangeFilter", this.filterWord);
      },
      // 会议形式
      handleHyxs(data){
        this.filterWord.meetingFormat = data;
        this.$emit("handleChangeFilter", this.filterWord);
      },
      // 完成状态
      handleWczt(data){
        this.filterWord.meetingStatus = data;
        this.$emit("handleChangeFilter", this.filterWord);
      }
    },
    mounted() {
      this.hylxList =   [];
      this.hyxsList =  [];
      this.ztList = [];
      if(!getSession("MeetingType")){
         getMenu("MeetingType", this.hylxList, ""); //会议类型
      }else{
        this.hylxList = getSession("MeetingType");
      }

      if(!getSession("MeetingFormat")){
        getMenu("MeetingFormat", this.hyxsList, ""); //会议形式
      }else{
        this.hyxsList = getSession("MeetingFormat");
      }

      if(!getSession("MeetingStatus")){
         getMenu("MeetingStatus", this.ztList, ""); //会议状态
      }else{
        this.ztList = getSession("MeetingStatus");
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
