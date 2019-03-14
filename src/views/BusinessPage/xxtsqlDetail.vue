<template>
    <div class="pd-10">
        <div class="dialog-jd">
            <h4>统计情况 - {{$route.query.lx == 'zj'?'在建':$route.query.lx == 'zj'?'售后':$route.query.lx == 'gb'?'过保':$route.query.lx == 'xms'?'项目列表':$route.query.lx == 'fk'?'付款详情':'延期任务'}}</h4>
            <div v-if="$route.query.lx == 'zj'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="ssyh-table">
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sxrq" label="合同签订年份" width="200"></el-table-column>
                    <el-table-column prop="ztztmc" label="当前状态" width="200"></el-table-column>
                    <el-table-column label="问题数" width="100">
                        <template slot-scope="scope">
                            <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'zj')">{{scope.row.wtzs}}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-if="$route.query.lx == 'sh'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sxrq" label="合同签订年份" width="150"></el-table-column>
                    <el-table-column prop="ysrq" label="验收日期" width="120"></el-table-column>
                    <el-table-column prop="gbrq" label="过保日期" width="120"></el-table-column>
                    <el-table-column prop="zbts" label="在保天数" width="100"></el-table-column>
                    <el-table-column label="问题数" width="100">
                        <template slot-scope="scope">
                            <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'sh')">{{scope.row.wtzs}}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-if="$route.query.lx == 'gb'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="sxrq" label="合同签订年份" width="150"></el-table-column>
                    <el-table-column prop="ysrq" label="验收日期" width="120"></el-table-column>
                    <el-table-column prop="gbts" label="在保天数" width="100"></el-table-column>
                    <el-table-column label="问题数" width="100">
                        <template slot-scope="scope">
                            <a href="javaScript:;;" @click="handleCheckDetail('wtzs',scope.row.wtzs,scope.row,'gb')">{{scope.row.wtzs}}</a>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div v-if="$route.query.lx == 'yq'">
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="tableHeight" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" width="150"></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" min-width="260" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="rwmc" label="任务名称" min-width="260" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cnjrsj" label="承诺完成时间" width="160" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="yqts" label="延期天数" width="100"></el-table-column>
                </el-table>
            </div>

            <div v-if="$route.query.lx == 'xms'">
                 <div class="xxtsqlDetail-filter">
                    <div>
                      <p class="query-title">高级查询:</p>
                      <p>
                        <el-input v-model="filter.keyword" style="width:493px;" size="mini" placeholder="请输入项目编号/项目名称/合同编号/甲方负责人/乙方负责人" @change="handleSearchXm"></el-input>&#x3000;
                        <el-button size="mini" type="primary" @click="handleSearchXm">查询</el-button>
                      </p>
                    </div>
                    <!-- 项目状态 -->
                    <div>
                          <p class="query-title">项目状态:</p>
                          <p class="query-list">
                            <span data-type="" :class="{'bg-active':filter.xmzt == ''}" @click="handleFilterXMZT('')">全部</span>
                            <span  v-for="xmzt in xmztMenu"  :class="{'bg-active':filter.xmzt == xmzt.id}"
                    :key="xmzt.id" @click="handleFilterXMZT(xmzt.id)">{{xmzt.mc}}</span>
                          </p>
                    </div>
                    <!-- 项目类别 -->
                     <div>
                          <p class="query-title">项目类别:</p>
                          <p class="query-list">
                            <span data-type="" :class="{'bg-active':filter.xmlb == ''}" @click="handleFilterXMLB('')">全部</span>
                            <span  v-for="xmlb in xmlbMenu"  :class="{'bg-active':filter.xmlb == xmlb.id}"
                    :key="xmlb.id" @click="handleFilterXMLB(xmlb.id)">{{xmlb.mc}}</span>
                          </p>
                    </div>
                    <div>
                       <p class="query-title">签署日期:</p>
                       <p>
                          <el-date-picker  v-model="filter.qsDate" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handlePickQsDate">
                          </el-date-picker>
                       </p>
                    </div>
                    <div>
                       <p class="query-title">过保日期:</p>
                       <p>
                          <el-date-picker  v-model="filter.gbDate" size="mini" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="handlePickGbDate">
                          </el-date-picker>
                       </p>
                    </div>
                    <div v-if="isJZuser != 1">
                       <p class="query-title">区域:</p>
                       <p class="query-list">
                           <span @click="handleFilterQy('')" :class="{'bg-active':filter.qygc == ''}">全部</span>
                           <span v-for="(gcqy,index) in gczdList"  :key="index" @click="handleFilterQy(gcqy.label)" :class="{'bg-active':filter.qygc == gcqy.label}">{{gcqy.mc}}</span>
                       </p>
                    </div>
                   <div>
                      <p class="query-title">欠款状态:</p>
                      <p class="query-list">
                        <span v-for="qkzt in qkztList" @click="handleFilterQk(qkzt.id)"  :class="{'bg-active':filter.qkzt == qkzt.id}">{{qkzt.mc}}</span>
                      </p>
                    </div>
                </div>
                <el-table :data="tableData" border style="width: 100%" :min-height="500" :max-height="innerHeight - 420" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" width="100" ></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" min-width="260" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmlb" label="项目类别" width="100" ></el-table-column>
                    <el-table-column  label="项目状态" sortable width="110" >
                      <template slot-scope="scope">
                        <el-tag size="mini" type="primary">
                          {{scope.row.gczt_display}}
                        </el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="xmjd" label="整体进度" width="100" ></el-table-column>
                    <el-table-column prop="qssj" label="签署日期" sortable min-width="110" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="htje" label="合同金额(元)" min-width="110" ></el-table-column>
                    <el-table-column label="待付款(元)" min-width="100" >
                      <template slot-scope="scope">
                          <span>{{!scope.row.dfk?'-':scope.row.dfk}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="已付款(元)" min-width="100" >
                      <template slot-scope="scope">
                          <span>{{!scope.row.yfk?'-':scope.row.yfk}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column  label="采购产品" min-width="100" >
                      <template slot-scope="scope">
                        <a href="javaScript:void(0)" @click="handleCheckCgcp(scope.row.xmbh)">{{scope.row.cpzs}}</a>
                      </template>
                    </el-table-column>
                    <el-table-column prop="qdrq" label="启动日期" min-width="100" ></el-table-column>
                    <el-table-column prop="ztysjssj" label="整体验收日期" min-width="110" ></el-table-column>
                    <el-table-column prop="jszq" label="建设周期(月)" min-width="110" ></el-table-column>
                    <el-table-column prop="fwqx" label="服务期限(月)" min-width="110" ></el-table-column>
                    <el-table-column prop="gbsj" label="过保日期" sortable min-width="110" ></el-table-column>
                    <el-table-column prop="jfzrr" label="甲方负责人" min-width="100" ></el-table-column>
                    <el-table-column prop="xmjl" label="乙方责任人" min-width="100" ></el-table-column>
                </el-table>
            </div>

            <div v-if="$route.query.lx == 'fk'"> 
                 <el-table :data="tableData" border style="width: 100%"  :max-height="tableHeight" key="jdqr-table" >
                    <el-table-column prop="xmbh" label="项目编号" min-width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="htbh" label="合同编号" min-width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xmmc" label="项目名称" min-width="260" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="htje" label="合同金额(元)" min-width="130"></el-table-column>
                    <el-table-column prop="ysje" label="应收金额(元)" min-width="130"></el-table-column>
                    <el-table-column prop="dkje" label="到款金额(元)" min-width="130"></el-table-column>
                    <el-table-column prop="dsk" label="待收款(元)" min-width="130"></el-table-column>
                    <el-table-column prop="ye" label="余额(元)" min-width="130"></el-table-column>
                </el-table>  
            </div>

            <div text-right class="mg-12" v-if="total > 0">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 35, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>

        <div>
          <cgcpDialog :show.sync="cgcpShow" :xmbh="xmbh"></cgcpDialog>
        </div>
    </div>
</template>

<script>
import { getProject } from "@/api/xmkb.js";
import { getMenu, getSession ,getPreMonth} from "@/utils/util.js";
import { confirmMilestone } from "@/api/task.js";
import cgcpDialog from '@/components/dialog/xxkbxmlb/cgcpDialog';

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 120,
      innerHeight: window.innerHeight,
      currentPage: 1,
      pageSize: 20,
      total: 0,
      tableData: [],

      xmztMenu: [
        { mc: "在建", id: "1" },
        { mc: "售后", id: "2" },
        { mc: "过保", id: "3" },
        { mc: "已关闭", id: "4" }
      ],
      xmlbMenu: [
        { mc: "软件", id: "软件" },
        { mc: "集成", id: "集成" },
        { mc: "服务", id: "服务" }
      ],
      qkztList:[
        { mc: "全部", id: "" },
        { mc: "欠款", id: "1" },
      ],
      gczdList:[], //工程战队
      xmbh:'',
      filter: {
        keyword: "",
        xmzt: "",
        xmlb: "",
        qygc:"",
        qsDate: [],
        gbDate: [],
        qkzt:""
      },
      cgcpShow:false, //采购产品列表
      isJZuser:''
    };
  },
  props: {},
  mounted() {
    this.isJZuser = sessionStorage.getItem('isJZuser')
    if(this.$route.query.lx == 'xms'){
      if (!getSession("gczd")) {
        getMenu("gczd", this.gczdList, true); //获取工程战队
      } else {
        this.gczdList = getSession("gczd");
      }
      this.pageUnitProjects();
    }else if(this.$route.query.lx == 'fk'){
      this.listXxdk();
    }else{
      this.getDetail();
    }
  },
  methods: {
    handleSearchXm() {
      this.currentPage = 1;
      this.pageUnitProjects();
    },
    // 项目列表筛选
    handleFilterXMZT(data) {
      this.filter.xmzt = data;
      this.currentPage = 1;
      this.pageUnitProjects();
    },
    // 项目类别
    handleFilterXMLB(data) {
      this.filter.xmlb = data;
      this.currentPage = 1;
      this.pageUnitProjects();
    },
    // 付款
    handleFilterQk(data){
      this.filter.qkzt = data
      this.currentPage = 1;
      this.pageUnitProjects();
    },
    // 区域
    handleFilterQy(data){
      this.filter.qygc = data;
      this.currentPage = 1;
      this.pageUnitProjects();
    },
    handlePickQsDate(date) {
      this.filter.qsDate = !date ? [] : date;
      this.filter.qsDate[0] = !this.filter.qsDate[0]
        ? ""
        : this.filter.qsDate[0];
      this.filter.qsDate[1] = !this.filter.qsDate[1]
        ? ""
        : this.filter.qsDate[1];
        this.currentPage = 1;
      this.pageUnitProjects()
    },
    handlePickGbDate(date) {
      this.filter.gbDate = !date ? [] : date;
      this.filter.gbDate[0] = !this.filter.gbDate[0]
        ? ""
        : this.filter.gbDate[0];
      this.filter.gbDate[1] = !this.filter.gbDate[1]
        ? ""
        : this.filter.gbDate[1];
      this.currentPage = 1;
      this.pageUnitProjects()
    },
    // 查看采购产品列表
    handleCheckCgcp(data){
      this.xmbh = data;
      this.cgcpShow = true;
    },



    handleCheckDetail(key, value, params, type) {
      let obj = {};
      obj["dwmc"] = this.$route.query.dwmc;
      if (!!params) {
        obj["xmbh"] = params.xmbh;
        obj["wtxmlx"] = type == "gb" ? 3 : type == "sh" ? 2 : 1;
      }
      obj[key] = value;
      let { href } = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query: obj
      });
      window.open(href, "_blank");
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      if(this.$route.query.lx == 'xms'){
        this.pageUnitProjects()
      }else{
        this.getDetail();
      }
    },
    handleCurrentChange(data) {
      this.currentPage = data;
      if(this.$route.query.lx == 'xms'){
        this.pageUnitProjects()
      }else{
        this.getDetail();
      }
    },
    // 获取明细
    getDetail() {
      this.$get(
        this.$route.query.lx == "zj"
          ? this.API.pageZjWtxm
          : this.$route.query.lx == "sh"
            ? this.API.pageShWtxm
            : this.$route.query.lx == "gb"
              ? this.API.pageGbWtxm
              : this.API.pageYqRwxm,
        {
          dwmc: this.$route.query.dwmc,
          curPage: this.currentPage,
          pageSize: this.pageSize
        }
      ).then(res => {
        if (res.state == "success") {
          this.tableData = res.data.rows;
          this.total = res.data.records;
        } else {
          this.$alert(res.msg, '提示', {
          confirmButtonText: '确定',
          type:'error'
         });
        }
      });
    },

    // 付款明细
    listXxdk(){
      this.$get(this.API.listXxdk,{
        dwmc: this.$route.query.dwmc
      }).then(res=>{
        if(res.state == 'success'){
          if(!res.data){
            this.tableData = []
          }else{
            this.tableData = res.data
          }
        }else{
          this.$alert(res.msg, '提示', {
          confirmButtonText: '确定',
          type:'error'
         });
        }
      })
    },

    pageUnitProjects(){
      this.$get(this.API.pageUnitProjects,{
        curPage:this.currentPage,
        pageSize: this.pageSize,
        dwmc: this.$route.query.dwmc,
        gczt :this.filter.xmzt,
        xmlb:this.filter.xmlb,
        qssjStart:!this.filter.qsDate[0]?'':this.filter.qsDate[0],
        qssjEnd:!this.filter.qsDate[1]?'':this.filter.qsDate[1],
        gbsjStart :!this.filter.gbDate[0]?'':this.filter.gbDate[0],
        gbsjEnd :!this.filter.gbDate[1]?'':this.filter.gbDate[1],
        qygc :this.filter.qygc,
        qkzt :this.filter.qkzt,
        keyword :this.filter.keyword
      }).then(res=>{
        if(res.state == 'success'){
          if(!res.data.rows){
            this.tableData = []
          }else{
            this.tableData = res.data.rows;
          }
          this.total = res.data.records;
        }else{
          this.$alert(res.msg, '提示', {
          confirmButtonText: '确定',
          type:'error'
         });
        }
      })
    }


  },

  watch: {
    show(n, o) {}
  },
  components: {cgcpDialog}
};
</script>

<style lang="scss" scoped>
.dialog-jd {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  h4 {
    margin: 10px 0 !important;
    font-weight: 700;
  }

  .xxtsqlDetail-filter {
    margin: 20px 0;
    > div {
      display: flex;
      margin: 5px 0;
    }
  }
}
</style>
