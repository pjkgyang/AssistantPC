<template>
     <div class="choose-daily-tasks">
        <div class="search-dialog-task" flex >
                 <el-input v-model="xmValue" size="mini" style="width:286px" placeholder="请输入项目名称" @change="handleQueryItem"></el-input>&#x3000;
                 <el-button size="mini" type="primary" style="height:30px;margin-top:2px" @click="handleLogItem">查询</el-button>
        </div>
         <div class="choose-daily-alltask" >
             <el-collapse v-model="activeNames" v-if="shown" @change="handleCollapse" accordion>
                 <el-collapse-item title="收藏项目" name="1" >
                   <ul>
                        <li class="choose-daily-item" v-for="(item,index) in xbData" :title="item.xmmc" :data-xmmc="item.xmmc"  :data-xmbh="item.xmbh" @click="handleNext">{{item.xmmc}}</li>
                        <li class="choose-daily-more"><a href="javascript:void(0)" @click="handleMoreitem(index)" v-if="xbCurPage < xbTotal && xbTotal > 1">加载更多...</a></li>
                        <li class="choose-daily-emptyItem"  v-if="xbData.length == 0">暂无项目</li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item title="我负责的项目" name="3" >
                   <ul>
                        <li class="choose-daily-item" :title="item.xmmc" v-for="(item,index) in wfzData" :data-xmmc="item.xmmc" :data-xmbh="item.xmbh" @click="handleNext">{{item.xmmc}}</li>
                        <li class="choose-daily-more"><a href="javascript:void(0)" @click="handleMoreitem(3)" v-if="wyyCurPage < wyyTotal && wyyTotal > 1">加载更多...</a></li>
                        <li class="choose-daily-emptyItem"  v-if="wfzData.length == 0">暂无项目</li>
                    </ul>
                </el-collapse-item>
                <el-collapse-item title="我参与项目" name="4"  >
                    <ul>
                        <li class="choose-daily-item" :title="item.xmmc" v-for="(item,index) in wcyData" :data-xmmc="item.xmmc"  :data-xmbh="item.xmbh" @click="handleNext">{{item.xmmc}}</li>
                        <li class="choose-daily-more"><a href="javascript:void(0)" @click="handleMoreitem(4)" v-if="wcyCurPage < wcyTotal && wcyTotal > 1">加载更多...</a></li>    
                        <li class="choose-daily-emptyItem"  v-if="wcyData.length == 0">暂无项目</li>
                    </ul>
                </el-collapse-item>
             <!--   <el-collapse-item title="已关闭项目" name="5" >
                    <ul>
                        <li class="choose-daily-item" :title="item.xmmc" v-for="(item,index) in ygbData" :data-xmmc="item.xmmc"  :data-xmbh="item.xmbh" @click="handleNext">{{item.xmmc}}</li>
                        <li class="choose-daily-more"><a href="javascript:void(0)" @click="handleMoreitem(5)" v-if="ygbCurPage < ygbTotal && ygbTotal > 1">加载更多...</a></li>
                        <li class="choose-daily-emptyItem"  v-if="ygbData.length == 0">暂无项目</li>
                    </ul>
                </el-collapse-item> -->
                <el-collapse-item title="其他 ( 非项目任务 ) " name="6" >
                    <ul>
                        <li class="choose-daily-item" :title="item.xmmc" v-for="(item,index) in otherData" :data-xmmc="item.xmmc"  :data-xmbh="item.xmbh" @click="handleNext">{{item.xmmc}}</li>
                        <li class="choose-daily-more"><a href="javascript:void(0)" @click="handleMoreitem(6)" v-if="otherCurPage < otherTotal && otherTotal > 1">加载更多...</a></li>
                        <li class="choose-daily-emptyItem"  v-if="otherData.length == 0">暂无项目</li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
            <div v-if="!shown">
                <ul>
                    <li class="choose-daily-item" :title="item.xmmc" v-for="(item,index) in allxmData"  :data-xmmc="item.xmmc"  :data-xmbh="item.xmbh" @click="handleNext">{{item.xmmc}}</li>
                    <li class="choose-daily-more"><a href="javascript:void(0)" @click="handleMoreitem(7)" v-if="allCurpage < allTotal && allTotal > 1">加载更多...</a></li>
                    <li class="choose-daily-emptyItem" v-if="allxmData.length == 0">暂无项目</li>
                </ul>
            </div>
        </div>
        <transition name="slide-fade">
            <div v-if="taskGroup" style="height:calc(100% - 35px);width:300px;border:1px solid #ccc;float:left;border-left:none">
              <ul>
                  <li><h4>产品分组</h4></li>
                  <li class="choose-daily-item" v-for="(item,index) in cpgroup" @click="handleSeclist(index)">{{item.cp_display}}</li></li>
              </ul>
            </div>
        </transition>
        <transition name="slide-fade">
            <div v-if="taskList" style="height:calc(100% - 35px);width:300px;border:1px solid #ccc;float:left;border-left:none">
              <ul v-for="(item,index) in tasksData">
                  <li ><h4 style="overflow:hidden;white-space:nowrap; text-overflow: ellipsis" :title="item.catalog">{{item.catalog}}</h4></li>
                  <li :title="task.rwmc_display" class="choose-daily-item" v-for="task in item.tasks.rows"  @click="chooseRevelence(task)"><span class="el-icon-info"></span> {{task.rwmc_display}}</li>                 
              </ul>
            </div>
        </transition>
    </div>
</template>
<script>
import {
  queryXbxm,
  queryGfxxm,
  queryWyyxm,
  queryWcyxm,
  queryGbxm,
  queryAllxm,
  getMyProjects,
  getProjects
} from "@/api/xmkb.js";
import { getProjectCatalog } from "@/api/xmfz.js";
import { getMilestoneCatalog } from "@/api/milestone.js";

export default {
  data() {
    return {
      collapseList: [
        "收藏项目",
        "高风险",
        "我负责的项目",
        "我参与项目",
        "已关闭项目"
      ],
      dataList: [],
      taskGroup: false,
      taskList: false,
      xbData: [],
      riskData: [],
      wfzData: [],
      wcyData: [],
      ygbData: [],
      otherData: [],
      bhData: {},
      data: [
        {
          rwmc: "测试任务一",
          rwbh: "11"
        },
        {
          rwmc: "测试任务二",
          rwbh: "22"
        },
        {
          rwmc: "测试任务三",
          rwbh: "33"
        }
      ],
      cpgroup: [],
      tasksData: [],
      loading: "",
      xmmc: "",
      cpmc: "",
      xmValue: "",
      activeNames: [],
      allxmData: [],
      shown: true,
      curPage: 1,
      xbCurPage: 1,
      gfxCurPage: 1,
      wyyCurPage: 1,
      wcyCurPage: 1,
      ygbCurPage: 1,
      otherCurPage: 1,
      xbTotal: null,
      gfxTotal: null,
      wyyTotal: null,
      wcyTotal: null,
      ygbTotal: null,
      otherTotal: null,
      allCurpage: 1,
      allTotal: null,
      myItemData: {}
    };
  },
  props: {
    midShow: {
      type: Boolean,
      default: false
    },
    dialogTaskVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  watch: {
    dialogTaskVisible(n, o) {}
  },
  methods: {
    handleCollapse(data) {
      //折叠面板
      if (!data) return;
      this.curPage = 1;
      this.getMyProjects(data);
    },
    handleMoreitem(param) {
      // 查看更多项目
      switch (param) {
        case 1:
          this.xbCurPage += 1;
          this.curPage = this.xbCurPage;
          this.getMyProjects(1);
          break;
        // case 2:
        //  this.gfxCurPage += 1;
        //  this.curPage =  this.gfxCurPage
        //  this.queryXmOftype(queryGfxxm);
        // break;
        case 3:
          this.wyyCurPage += 1;
          this.curPage = this.wyyCurPage;
          this.getMyProjects(3);
          break;
        case 4:
          this.wcyCurPage += 1;
          this.curPage = this.wcyCurPage;
          this.getMyProjects(4);
          break;
        case 5:
          this.ygbCurPage += 1;
          this.curPage = this.ygbCurPage;
          this.getMyProjects(5);
          break;
        case 6:
          this.otherCurPage += 1;
          this.curPage = this.otherCurPage;
          this.getMyProjects(6);
          break;
        case 7:
          this.allCurpage += 1;
          this.getProjects();
      }
    },
    handleLogItem() {
      //查询项目
      if (this.xmValue == "") {
        this.shown = true;
      } else {
        this.shown = false;
        this.allCurpage = 1;
        this.getProjects();
      }
      this.taskGroup = false;
      this.taskList = false;
    },
    handleQueryItem() {
      // enter 查询
      if (this.xmValue == "") {
        this.shown = true;
      } else {
        this.shown = false;
        this.allCurpage = 1;
        this.getProjects();
      }
      this.taskGroup = false;
      this.taskList = false;
    },
    handleNext(e) {
      let xmbh = e.target.getAttribute("data-xmbh");
      this.xmmc = e.target.getAttribute("data-xmmc");
      this.bhData.xmbh = xmbh;
      this.taskGroup = true;
      if (this.taskList) {
        this.taskList = false;
      }
      this.getProjectCatalog(xmbh);
    },
    handleSeclist(params) {
      let data = this.cpgroup[params];
      this.cpmc = data.cp;
      this.getMilestoneCatalog(data.xmbh, data.cpbh, data.cp);
      this.taskList = true;
    },
    //   只能分组（选择任务）
    //   handleLast(e){
    //        console.log(e.target.getAttribute('data-type'))
    //        this.taskList = true
    //   },
    chooseRevelence(param) {
      this.bhData.rwmc = this.xmmc + "——" + this.cpmc + "——" + param.rwmc;
      this.bhData.rwbh = param.rwbh;
      this.bhData.lcbbh = param.lcbbh;
      this.$emit("chooseRevelenceTask", this.bhData);
    },

    // 获取产品目录
    getProjectCatalog(xmbh) {
      getProjectCatalog({
        xmbh: xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data != null && data.data.length != 0) {
            this.cpgroup = data.data;
          } else {
            this.cpgroup = [];
          }
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
		
    getMyProjects(type) {
      getMyProjects({
        curPage: this.curPage,
        pageSize: 20,
        keyword: this.xmValue,
				xmztzt:'0,1,4,5,7',
        pl: type
      }).then(({ data }) => {
        if (data.state == "success") {
          if (type == "1") {
            if (this.curPage == 1) {
              this.xbData = data.data["1"].rows;
            } else {
              this.xbData = this.xbData.concat(data.data["1"].rows);
            }
            this.xbTotal = data.data["1"].total;
          } else if (type == "3") {
            // else if(type == '2'){
            //     if(this.curPage == 1){
            //          this.riskData = data.data['2'].rows
            //     }else{
            //          this.riskData = this.riskData.concat(data.data['2'].rows);
            //     }
            //     this.gfxTotal = data.data['2'].total
            // }
            if (this.curPage == 1) {
              this.wfzData = data.data["3"].rows;
            } else {
              this.wfzData = this.wfzData.concat(data.data["3"].rows);
            }
            this.wyyTotal = data.data["3"].total;
          } else if (type == "4") {
            if (this.curPage == 1) {
              this.wcyData = data.data["4"].rows;
            } else {
              this.wcyData = this.wcyData.concat(data.data["4"].rows);
            }
            this.wcyTotal = data.data["4"].total;
          } else if (type == "5") {
            if (this.curPage == 1) {
              this.ygbData = data.data["5"].rows;
            } else {
              this.ygbData = this.ygbData.concat(data.data["5"].rows);
            }
            this.ygbTotal = data.data["5"].total;
          } else if (type == "6") {
            if (this.curPage == 1) {
              this.otherData = data.data["6"].rows;
            } else {
              this.otherData = this.otherData.concat(data.data["6"].rows);
            }
            this.otherTotal = data.data["6"].total;
          }
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    getProjects() {
      // 获取所有项目
      getProjects({
        curPage: this.allCurpage,
        pageSize: 20,
        keyword: this.xmValue,
        xmzt: "",
        xmlb: "",
        sfgx: "",
        pl: "",
        isAll: true
      }).then(({ data }) => {
        if (data.state == "success") {
          if (this.allCurpage == 1) {
            this.allxmData = data.data.rows;
          } else {
            this.allxmData = this.allxmData.concat(data.data.rows);
          }
          this.allTotal = data.data.total;
        }
      });
    },
    //   获取任务
    getMilestoneCatalog(xmbh, cpbh, cpmc) {
      getMilestoneCatalog({
        xmbh: xmbh,
        cpbh: cpbh,
        cpmc: cpmc,
        curPage: 1,
        pageSize: 9999,
        keyword: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data != null && data.data.length != 0) {
            this.tasksData = data.data;
          } else {
            this.tasksData = [];
          }
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.choose-daily-tasks {
  height: 600px;
  background: #e8e8e8;
}
.choose-daily-tasks ul {
  width: 100%;
}
.choose-daily-tasks ul li {
  padding: 3px 15px 3px 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.choose-daily-tasks ul .choose-daily-item {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 3px 15px 3px 30px;
}
.choose-daily-tasks ul .choose-daily-item:hover {
  background: #ccc;
  cursor: pointer;
}
.choose-daily-tasks h4 {
  font-size: 15px;
  font-weight: 700;
}
.choose-daily-tasks > div {
  background: #fafafa;
  overflow-x: auto;
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-300px);
  opacity: 0;
}
.search-dialog-task {
  padding: 0 15px;
  height: 35px;
  line-height: 35px;
}
.choose-daily-alltask {
  height: calc(100% - 35px);
  width: 300px;
  border: 1px solid #ccc;
  float: left;
  overflow-x: hidden !important;
}
.choose-daily-emptyItem {
  text-align: center;
  color: #999;
}
.choose-daily-more {
  color: #4994f5;
  text-align: center;
}
</style>
