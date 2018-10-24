<template>
<div > 
    <div v-if="show">
        <UserBanner :shown='true' :fbdetail="true" @handleBack="handleBack"></UserBanner>
    </div>
  <section class="Project_detail" v-if="!show">
      <!-- 项目分类 -->
      <div class="Project_detail_highrisk" v-for="(item,key,index) in myItemData" v-if="item.rows.length"> 
        <h4>{{key==1?'收藏项目':key==3?'我拥有的项目':key==4?'我参与的项目':key==5?'已关闭的项目':''}}</h4>
        <div class="project_detail_card_group">
            <itemListCard :datas="item.rows"  :show="key==1" @handlePage="handlePage" @handleMore="handleGFXMore(key)"></itemListCard>
        </div>
     </div>
     <div style="width:100%;text-align:center;padding:20px 0;" v-if="isNone">
           <img src="static/img/kong.png" alt="" style="width:300px;">
           <p style="font-size:18px">暂 无 项 目</p>
     </div>
  </section>

  <section class="project_more_table" v-if="show">
      <div>
        <div class="project_more_choose">
         <div>
                <span class="table-menu-name">
                    <i class="el-icon-arrow-down arrow"  v-if="showList" @click="showList = !showList"></i>
                    <i class="el-icon-arrow-up arrow"  v-if="!showList" @click="showList = !showList"></i>
                  高级查询</span> 
                <el-input placeholder="请输入项目编号/项目名称/合同编号/项目经理" prefix-icon="el-icon-search" size="small" v-model="keyword" @change="SearchItem"></el-input>&#x3000;
                <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                <a class="project_more_export" :href="baseUrl+'project/exportXmData.do?keyword='+this.keyword+'&xmzt='+this.xmztC+'&xmlb='+xmlbC+'&sfgx='+this.gxhtC+'&projectLabel='+xmbqC" target="blank">导出</a>
        </div>
            <div v-if="showList">
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
            </div>
        </div>
        <div class="project-fbtable">
                <el-table
                    :data="allfbData"
                    border
                    style="width:100%"
                    min-width="1000"
                    height="523"
                    >
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
                    <el-table-column prop="jfzrrxm" label="甲方责任人" width="100"></el-table-column>
                    <el-table-column prop="yssj" label="整体验收时间" width="120"></el-table-column>
                    <el-table-column prop="lxrq" label="立项日期" width="100"></el-table-column>
                    <el-table-column prop="qdrq" label="启动日期" width="100"></el-table-column>
                    <el-table-column prop="qssj" label="签署日期" width="100"></el-table-column>
                    <el-table-column prop="htje" label="合同金额(元)" width="120"></el-table-column>
                    <el-table-column prop="fwqx" label="服务期限" width="100"></el-table-column>
                    
                </el-table>
                <pagination v-if="totalNum > 10 " :pageSize="pageSize" :total="totalNum" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
    </div>
  </section>
  </div>
</template>
<script>
import itemListCard from "@/components/BusinessPage/itemListCard.vue";
import {
  exportXmData,
  changeXbZt,
  getMyProjects,
  getProjects
} from "@/api/xmkb.js";
import pagination from "@/components/BusinessPage/pagination.vue";
import UserBanner from "@/components/BusinessPage/itemUserBanner.vue";
import { EventBus } from "../../utils/util.js";
import axios from 'axios'

export default {
  data() {
    return {
      particeItem: [],
      show: false,
      showList: true,
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
      xmztMenu:[
        { mc: "在建", id: "1" },
        { mc: "售后", id: "2" },
        { mc: "过保", id: "3" },
        { mc: "已关闭", id: "4" },
      ],
      keyword: "",
      xmztC:"",
      xmlbC: "",
      gxhtC: "",
      xmbqC: 1,
      allfbData: [],
      pageSize: 13,
      totalNum: null,
      baseUrl: null,
      xmkbkeyword: "",
      isNone:false,
      myItemData:{},
      emptyArray:[],
      urlData:{}
    };
  },
  methods: {
    // 跳转到详情（进度）
    handlePage(data) {
      let xbxm = event.currentTarget.parentNode.parentNode.parentNode.parentNode;
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
        data.isAll = false
        this.$router.push({ name: "Task", params: { data: data } });
      }
    },
  
    getMyProjects(curPage){  // 获取我的项目
      this.emptyArray = []
      getMyProjects({
          curPage:curPage,
          pageSize:11,
          keyword: this.xmkbkeyword,
          xmlb: this.xmlbC,
          sfgx: this.gxhtC,
          pl:''
      }).then(({data})=>{
        if(data.state == 'success'){
          if(!!data.data){
              this.myItemData = data.data
          }else{
              this.myItemData = {}
          }
          Object.values(data.data).forEach((ele,i,arr)=>{
            if(ele.rows.length == 0){
              this.emptyArray.push(ele);
            }
          })
          if(this.emptyArray.length == Object.values(data.data).length){
            this.isNone = true
          }else{
             this.isNone = false
          }
        }
      })
    },
    getProjects(curPage){  // 获取所有项目
      getProjects({
        curPage: curPage,
        pageSize: this.pageSize,
        keyword: this.keyword,
        xmzt:this.xmztC,
        xmlb: this.xmlbC,
        sfgx: this.gxhtC,
        pl: this.xmbqC
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
    CheckXmzt(param){
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
    },
    // 查看更多 
    handleGFXMore(param) {
      this.show = !this.show;
      this.xmbqC = param;
      this.getProjects(1);
      sessionStorage.setItem("shown", JSON.stringify(this.show));
    },
          
    handleBack() {  // 返回项目看板
      this.show = !this.show;
      sessionStorage.setItem("shown", JSON.stringify(this.show));
      this.getMyProjects(1);
    },
    //  表格 跳转 详情页
    handleEdit(index, row, cell, event) {
      this.$router.push({ name: "Task", params: { data: row } });
    },
    handleAddXB(index, row, cell, event) {
      changeXbZt({
        xmbh: row.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if (event.target.className.includes("el-icon-star-off")) {
            row.isxb = true;
          } else if (event.target.className.includes("el-icon-star-on")) {
            row.isxb = false;
          }
          if (this.xmbqC == 1) {
            this.getProjects(1);
          }
        }
      });
    }
  },
  mounted() {
    this.baseUrl = window.baseurl;
    let shown = JSON.parse(sessionStorage.getItem("shown"));
    if (shown != null) {
      this.show = shown;
    }
    if (shown == null || !shown) {
           this.getMyProjects(1);
    } else {
           this.getProjects(1);
    }

    EventBus.$on("searchXMKB", param => {
      this.xmkbkeyword = param;
      this.getMyProjects(1);
    });
  },

  activated() {},
  components: { itemListCard, pagination, UserBanner }
};
</script>
<style scoped>
.Project_detail {
  width: 1200px;
  padding: 10px 10px;
  margin: 20px auto;
}
.Project_detail > div:after {
  content: "";
  display: block;
  clear: both;
}
.Project_detail > div > h4 {
  margin: 0 0 10px 0 !important;
  font-size: 15px;
  font-weight: 700;
  text-shadow: 0px 2px 5px #888;
  background: linear-gradient( rgb(26, 150, 113), rgb(129, 143, 141));
  -webkit-background-clip: text;
  color: transparent;
}
.Project_detail > div {
  margin-bottom: 30px;
}
.project_detail_more {
  height: 100px;
  width: 100px;
  float: left;
  line-height: 100px;
  position: fixed;
  top: 40px;
  right: 15px;
  text-align: center;
}
.project_detail_more button,
.project_detail_more span {
  font-size: 16px;
  position: absolute;
  right: 0;
  top: 40px;
}
.project_detail_more span:hover {
  cursor: pointer;
  color: #409eff;
}
.project_more_table {
  padding: 20px 50px;
}
.project_more_table .project_more_choose {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
}
.project_more_table .project_more_choose .arrow:hover {
  cursor: pointer;
}
.project_more_table > div > div:nth-of-type(1) .el-input {
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

.bg-active {
  background: #1874cd;
  color: #fff;
}

.project_more_table p span:nth-of-type(n + 2):hover {
  cursor: pointer;
}

.fa-angle-double-down,
.fa-angle-double-up {
  font-size: 18px;
  padding: 0 2px;
}
.fa-angle-double-down:hover,
.fa-angle-double-up:hover {
  cursor: pointer;
}
.project-fbtable {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  height: 580px;
  background: #fff;
  border-radius: 4px;
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
/* .project-fbtable >div a{
    background: #409EFF;
    color: #fff;
    padding: 5px 13px;
    font-size: 12px;
    border-radius: 3px;
} */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.project_detail_checkMore {
  width: 270px;
  height: 150px;
  border: 1px solid #000;
  line-height: 150px;
  text-align: center;
  border-radius: 5px;
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
