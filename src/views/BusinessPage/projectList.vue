<template>
 <div>
  <section class="project_more_table">
        <div>
          <div class="project_more_choose">
              <div>&nbsp;
                  <span class="table-menu-name">
                    高级查询</span> 
                  <el-input class="search-input" placeholder="请输入项目编号/项目名称/合同编号/项目经理" prefix-icon="el-icon-search" size="small" v-model="keyword" @change="SearchItem"></el-input>&#x3000;
                  <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                  <a class="project_more_export" 
                  :href="baseUrl+'project/exportXmData.do?keyword='+this.keyword+'&xmzt='+this.xmztC+'&xmlb='+xmlbC+'&sfgx='+this.gxhtC+'&projectLabel='+xmbqC+'&gbsjStart='+this.gbksrqValue+'&gbsjEnd='+this.gbjsrqValue" 
                  target="blank">导出</a>
              </div>
              <div>
                  <p>
                      <span class="table-menu-name">项目标签:</span> 
                      <span :class="{'bg-active':xmbqC == ''}" data-xmbq="" @click="CheckXmbq">全部</span>
                      <span  v-for="xmbq in xmbqMenu" :data-xmbq="xmbq.id" :class="{'bg-active':xmbq.id == xmbqC}"
                      :key="xmbq.id" @click="CheckXmbq">{{xmbq.mc}}</span>
                  </p>
                  <p>
                      <span class="table-menu-name">项目状态:</span> 
                      <span :class="{'bg-active':xmztC == ''}"  @click="CheckXmzt('')">全部</span>
                      <span  v-for="xmzt in xmztMenu"  :class="{'bg-active':xmzt.id == xmztC}"
                      :key="xmzt.id" @click="CheckXmzt(xmzt.id)">{{xmzt.mc}}</span>
                  </p>
                  <p>
                      <span class="table-menu-name">项目类别:</span> 
                      <span :class="{'bg-active':xmlbC == ''}" data-xmlb="" @click="CheckXmlb">全部</span>
                      <span v-for="xmlb in xmlbMenu" :data-xmlb="xmlb.id" :class="{'bg-active':xmlb.id == xmlbC}"
                      :key="xmlb.id" @click="CheckXmlb">{{xmlb.mc}}</span>
                  </p>
                  <p>
                      <span class="table-menu-name">是否购销合同:</span> 
                      <span :class="{'bg-active':gxhtC == ''}" data-gxht="" @click="CheckGxht">全部</span>
                      <span v-for="gxht in gxhtMenu" :data-gxht="gxht.id" :class="{'bg-active':gxht.id == gxhtC}"
                      :key="gxht.id" @click="CheckGxht">{{gxht.mc}}</span>
                  </p>
                  <p>
                    <span class="table-menu-name">过保开始日期:</span>   
                    <span>
                      <el-date-picker @change="handleChangeDate" size="mini" style="200px !important" value-format="yyyy-MM-dd" v-model="gbksrqValue" type="date" placeholder="选择过保开始日期"></el-date-picker>
                    </span>
                  </p>
                  <p>
                    <span class="table-menu-name">过保结束日期:</span>   
                    <span>
                      <el-date-picker @change="handleChangeDate" size="mini" style="200px !important"  value-format="yyyy-MM-dd" v-model="gbjsrqValue" type="date" placeholder="选择过保结束日期"></el-date-picker>
                    </span>
                  </p>
              </div>
          </div>
          <div class="project-fbtable">
                  <el-table
                      :data="allfbData"
                      border
                      style="width:100%"
                      min-width="1000"
                      :height="tableHeight"
                      >
                      <el-table-column
                      fixed="left"
                      label="操作"
                      width="160"
                      v-if="userGroup.includes('XXLDZ') ||　userGroup.includes('JZGCRY')"
                      >
                      <template slot-scope="scope">
                        <el-button @click.native.prevent="handleCommand('1',scope.row.xmbh)" type="text" size="mini">
                          过保提醒
                        </el-button>
                        <el-button @click.native.prevent="handleCommand('2',scope.row.xmbh)" type="text" size="mini">
                          提醒记录
                        </el-button>
                      </template>
                    </el-table-column> 
                      <el-table-column prop="htbh" label="合同编号" show-overflow-tooltip width="150"></el-table-column>
                      <el-table-column prop="xmbh" label="项目编号" show-overflow-tooltip width="100"></el-table-column>
                      <el-table-column label="项目名称" width="320">
                          <template slot-scope="scope">
                              <div slot="reference"  style="display:flex">
                                  <p>
                                      <span title="添加收藏" @click="handleAddXB(scope.$index,scope.row,scope.cell,$event)"  :class="{'xb-star':true,'el-icon-star-on':scope.row.isxb,'el-icon-star-off':!scope.row.isxb}"> </span>
                                  </p>
                                  <p @click="handleEdit(scope.$index, scope.row)" :title="scope.row.xmmc" class="name-wrapper">
                                      <span> {{scope.row.xmmc}} </span> 
                                  </p>
                              </div>
                          </template>
                      </el-table-column>
                      
                      <el-table-column prop="dwmc" label="学校" show-overflow-tooltip width="280"></el-table-column>
                      <el-table-column prop="xmzt" label="项目状态" width="100"></el-table-column>
                      <el-table-column prop="ztztmc" label="整体状态" width="100"></el-table-column>
                      <el-table-column prop="yfzrrxm" label="项目经理" width="100"></el-table-column>
                      <el-table-column prop="jfzrrxm" label="甲方责任人" width="100" show-overflow-tooltip></el-table-column>
                      <el-table-column prop="qssj" label="签署日期" width="100"></el-table-column>
                      <el-table-column prop="lxrq" label="立项日期" width="100"></el-table-column>
                      <el-table-column prop="qdrq" label="启动日期" width="100"></el-table-column>
                      <el-table-column prop="yssj" label="整体验收时间" width="120"></el-table-column>
                      <el-table-column prop="fwksrq" label="服务开始日期" width="120"></el-table-column>
                      <el-table-column prop="fwqx" label="服务期限" width="90"></el-table-column>
                      <el-table-column prop="gbsj" label="过保日期" width="120"></el-table-column>
                      <el-table-column prop="htje" label="合同金额(元)" width="120"></el-table-column>
                      <!-- <el-table-column prop="wglv" label="完工率(%)" width="100"></el-table-column> -->
                      <!-- <el-table-column prop="wglg" label="完工量(元)" width="100"></el-table-column> -->
                  </el-table>
                  <pagination v-if="totalNum > 10 " :pageSize="pageSize" :total="totalNum" @handleCurrentChange="handleCurrentChange"></pagination>
          </div>
      </div>
    </section>
   <gbtxDialog :xmbh="xmbh" :show.sync="gbtxShow"></gbtxDialog>
   <gbtxjlDialog :xmbh="xmbh" :show.sync="gbtxjlShow"></gbtxjlDialog>
 </div>
</template>

<script>
import gbtxDialog from "@/components/dialog/xxkbxmlb/gbtxDialog";
import gbtxjlDialog from "@/components/dialog/xxkbxmlb/gbtxjlDialog";
import { getProjects } from "@/api/xmkb.js";
import pagination from "@/components/BusinessPage/pagination.vue";
export default {
  data() {
    return {
      tableHeight:window.innerHeight - 390,
      xmlbMenu: [
        { mc: "软件", id: "软件" },
        { mc: "集成", id: "集成" },
        { mc: "服务", id: "服务" }
      ],
      gxhtMenu: [{ mc: "是", id: "1" }, { mc: "否", id: "0" }],
      xmbqMenu: [
        { mc: "收藏项目", id: "1" },
        { mc: "高风险项目", id: "2" },
        { mc: "我拥有的项目", id: "3" },
        { mc: "我参与的项目", id: "4" },
        { mc: "已关闭的项目", id: "5" }
      ],
      xmztMenu: [
        { mc: "在建", id: "1" },
        { mc: "售后", id: "2" },
        { mc: "过保", id: "3" },
        { mc: "已关闭", id: "4" }
      ],
      keyword: "",
      xmztC: "",
      xmlbC: "",
      gxhtC: "",
      xmbqC: 1,
      allfbData: [],
      pageSize: 14,
      totalNum: null,
      baseUrl: null,
      xmkbkeyword: "",
      isNone: false,
      myItemData: {},
      emptyArray: [],
      urlData: {},
      gbtxShow: false, //过保提醒
      gbtxjlShow: false, //过保提醒记录
      userGroup: "",
      xmbh: "",
      gbrqValue: [], //过保日期Value
      gbksrqValue: "",
      gbjsrqValue: ""
    };
  },
  mounted() {
    this.baseUrl = window.baseurl;
    let shown = JSON.parse(sessionStorage.getItem("shown"));
    this.userGroup = JSON.parse(
      sessionStorage.getItem("userInfo")
    ).userGroupTag;
    this.getProjects(1);
  },
  methods: {
    // 过保提醒
    handleCommand(params, data) {
      this.xmbh = data;
      if (params == 1) {
        this.gbtxShow = true;
      } else {
        this.gbtxjlShow = true;
      }
    },

    // 跳转到详情（进度）
    handlePage(data) {
      let xbxm =
        event.currentTarget.parentNode.parentNode.parentNode.parentNode;
      if (event.target.className.includes("el-icon-star")) {
        //添加星标
        changeXbZt({
          xmbh: data.xmbh
        }).then(({ data }) => {
          if (data.state == "success") {
            this.getMyProjects(1);
          }
        });
      } else {
        data.isAll = false;
        this.$router.push({ name: "Task", params: { data: data } });
      }
    },
    // 过保日期
    handleChangeDate() {
      this.getProjects(1);
    },
    // 获取所有项目
    getProjects(curPage) {
      getProjects({
        curPage: curPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        xmzt: this.xmztC,
        xmlb: this.xmlbC,
        sfgx: this.gxhtC,
        pl: this.xmbqC,
        gbsjStart: this.gbksrqValue,
        gbsjEnd: this.gbjsrqValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.allfbData = data.data.rows;
          this.totalNum = data.data.records;
        }
      });
    },

    // 搜索关键字
    handleSearch() {
      this.getProjects(1);
    },
    // 搜索关键字（回车）
    SearchItem() {
      this.getProjects(1);
    },
    // 项目类别
    CheckXmlb(e) {
      let xmlb = e.target.getAttribute("data-xmlb");
      this.xmlbC = xmlb;
      this.getProjects(1);
    },
    // 项目状态
    CheckXmzt(param) {
      this.xmztC = param;
      this.getProjects(1);
    },
    // 购销合同
    CheckGxht(e) {
      let gxht = e.target.getAttribute("data-gxht");
      this.gxhtC = gxht;
      this.getProjects(1);
    },
    // 项目标签
    CheckXmbq(e) {
      let xmbq = e.target.getAttribute("data-xmbq");
      this.xmbqC = xmbq;
      this.getProjects(1);
    },
    handleCurrentChange(data) {
      this.getProjects(data);
    }
  },
  components: {pagination, gbtxDialog, gbtxjlDialog }
};
</script>

<style scoped>
.project_more_table {
  margin: 20px 50px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}
.project_more_table .project_more_choose {
  margin-bottom: 10px;
}
.project_more_table .project_more_choose .arrow:hover {
  cursor: pointer;
}

.project_more_table > div .search-input {
  width: 450px;
}
.project_more_table .project_more_choose p {
  font-size: 15px;
  color: #1874cd;
}
.project_more_table .table-menu-name {
  display: inline-block;
  width: 120px;
  color: #666;
  margin: 5px 0;
  font-size: 14px;
  font-weight: 700;
}
.project_more_table .project_more_choose p span {
  margin-right: 10px;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 14px;
}

.project_more_export {
  background: forestgreen;
  color: #fff;
  padding: 6px 16px;
  font-size: 12px;
  border-radius: 3px;
  line-height: 25px;
  margin: 0 10px;
}
.bg-active {
  background: #1874cd;
  color: #fff;
}

.project_more_table p span:nth-of-type(n + 2):hover {
  cursor: pointer;
}
.name-wrapper {
  color: #409eff;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.xb-star {
  margin-right: 5px;
}
.xb-star:hover {
  cursor: pointer;
}
.el-icon-star-on {
  color: #e6a23c;
}
</style>
