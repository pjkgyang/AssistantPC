<template>
  <div class="pannelPadding-10">
    <div class="pannelPaddingBg-10">
      <tableLayout>
        <section slot="top">
          <filterCondition :filterList="filterList" :placeholder="'请输入问题标题 / 版本号'" @handleChangeFilter="handleChangeFilter"></filterCondition>
        </section>
        <section slot="bottom">
          <div text-right>
            <el-button size="mini" type="primary" @click="handleExport">导出</el-button>
          </div>
          <div style="margin:10px 0">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column fixed="left" label="操作" width="180">
                <template slot-scope="scope">
                  <!-- v-if="scope.row.zt != 2" -->
                  <el-button type="text" size="mini" @click="handleTrain(scope.row)" >培训</el-button>
                  <el-button type="text" size="mini" @click="handlePlnrjh(scope.row)" >批量纳入计划</el-button>
                  <el-button style="color:#f00" type="text" size="mini" @click="handleDeljh(scope.row)" >删除</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="cpmc" label="产品" min-width="180"></el-table-column>
              <el-table-column fixed="left" prop="pxzt" label="培训主题" min-width="300" show-overflow-tooltip></el-table-column>
              <el-table-column prop="pxsc" label="培训时长" width="90"></el-table-column>
              <el-table-column prop="zt" label="培训状态" width="90">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.zt==1?'danger':'success'">{{scope.row.zt==2?'已完成':'未完成'}}</el-tag>
               </template>
              </el-table-column>
              <el-table-column label="培训形式" width="120">
                <template slot-scope="scope">
                  <span>{{scope.row.pxxs==1?'线上直播':scope.row.pxxs==2?'线下培训':'线上加线下'}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="jhpxsj" label="计划培训日期" width="110"></el-table-column>
              <el-table-column prop="sjpxsj" label="实际培训日期" width="110"></el-table-column>
              <el-table-column prop="fxrxm" label="分享人" width="110"></el-table-column>
               <el-table-column  label="推荐参与人数" width="110">
                <template slot-scope="scope">
                  <a href="javaScript:;;" @click="handleCehckCyrs(scope.row,'2')">{{scope.row.tjrs}}</a>
               </template>
              </el-table-column>
              <el-table-column  label="参与人数" width="100">
                <template slot-scope="scope">
                  <a href="javaScript:;;" @click="handleCehckCyrs(scope.row,'1')">{{scope.row.cyrs}}</a>
               </template>
              </el-table-column>
              <el-table-column prop="cjsj" label="创建日期" width="160"></el-table-column>
              <el-table-column prop="cjrxm" label="创建人" width="110"></el-table-column>
              <el-table-column label="纳入计划问题数" width="130">
                <template slot-scope="scope">
                  <a href="javaScript:;;" @click="handleCehckwts(scope.row.wid)">{{scope.row.jhwtzs}}</a>
               </template>
              </el-table-column>
              <el-table-column label="附件" min-width="260" >
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <div @click="handleDownFile(scope.$index,scope.row,$event)">
                     <p v-for="(fj,index) in scope.row.fjList">
                       <a href="javaScript:;;" title="点击下载"  :key="index" :data-fj="fj.fjbh">{{fj.fjmc}}</a>
                     </p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="pxsp" label="培训视频" width="180">
                <template slot-scope="scope">
                  <a v-if="scope.row.pxsp != '-'" v-for="item in scope.row.pxsp.split(',')" :href="item" target="blank">{{item}}</a>
                 </template> 
              </el-table-column>
            </el-table>
          </div>
        </section>
      </tableLayout>
      <div text-right>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>

    <sspx-dialog :show.sync="sspxShow" :itemData="itemData" @handleCommitSave="handleCommitSave" ></sspx-dialog>
    <wtfplist-dialog :show.sync="wtfpShow" :jhData="jhData" :lx="2" @handleNrsuccess="handleNrsuccess"></wtfplist-dialog>
  </div>
</template>

<script>
import filterCondition from "@/components/wtfp/Filter.vue";
import tableLayout from "@/components/layout/tableLayout.vue";
import sspxDialog from "@/components/dialog/wtfp/sspx-dialog.vue";
import wtfplistDialog from "@/components/dialog/wtfp/wtfplist-dialog.vue";

export default {
  data() {
    return {
      sspxShow: false,
      wtfpShow:false,
      filterList: ["keyword", "cp", "pxxs", "pxks","jhcjrq", "jhpxrq", "sjpxrq", "jhzt"],
      tableData: [],
      jhData:{},
      currentPage: 1,
      pageSize: 15,
      total: 0,
      filterWord: {
        keyword: "",
        cpbh: "",
        cpmc: "",
        jhcjrq: [],
        jhpxrq: [],
        sjpxrq:[],
        jhzt: "",
        pxxs: "",
        pxsc:""
      },
      itemData: {}
    };
  },
  methods: {
    // 批量纳入成功
    handleNrsuccess(){
      this.pageCapacityPlan();
    },
    handleCehckCyrs(data,type){
      let routeData = this.$router.resolve({
        path: "/stafflist",
        query:{
          nljhwid:data.wid,
          type:type,
          cpbh:data.cpbh
        }
      });
      window.open(routeData.href, "_blank");
    },
    // 跳转 
    handleCehckwts(data){
       let routeData = this.$router.resolve({
        path: "/report-list/questionlist.html",
        query:{
          jhwid:data,
          jhlx:'2'
        }
      });
      window.open(routeData.href, "_blank");
    },

    // 培训提交
    handleCommitSave(data) {
          this.$post(this.API.abilityTraining, {
            wid: this.itemData.wid,
            sjwcsj: data.sjwcsj,
            pxsp: data.pxsp,
            fjData: data.fileList,
            pxsc:data.pxsc
            // ry: data.ry
          }).then(res => {
            if (res.state == "success") {
              this.sspxShow = !this.sspxShow;
              this.$alert("保存成功", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.pageCapacityPlan();
                }
              });
            } else {
              this.$alert(res.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
    },
    // 下载附件
    handleDownFile(index, row, e) {
      let fjbh = e.target.getAttribute("data-fj");
      window.open(window.baseurl + "attachment/downloadFile.do?fjId=" + fjbh);
    },
    // 分页
    handleCurrentChange(data) {
      this.currentPage = 1;
      this.pageCapacityPlan();
    },
    handleSizeChange(data) {
      this.currentPage = 1;
      this.pageSize = data;
      this.pageCapacityPlan();
    },
    // 筛选
    handleChangeFilter(data) {
      this.filterWord = data;
      this.pageCapacityPlan();
    },
    handleExport() {
      window.open(
        window.baseurl +
          "wtgj/exportCapacityPlan.do?cpbh=" +
          this.filterWord.cpbh +
          "&zt=" +
          this.filterWord.jhzt +
          "&pxxs=" +
          this.filterWord.pxxs +
          "&cjsjStart=" +
          this.filterWord.jhcjrq[0] +
          "&cjsjEnd=" +
          this.filterWord.jhcjrq[1] +
          "&jhpxsjStart=" +
          this.filterWord.jhpxrq[0] +
          "&jhpxsjEnd=" +
          this.filterWord.jhpxrq[1] +
          "&sjpxsjStart=" +
          this.filterWord.sjpxrq[0] +
          "&sjpxsjEnd=" +
          this.filterWord.sjpxrq[1] +
          "&keyword=" +
          this.filterWord.keyword,
          "&pxsc=" +
          this.filterWord.pxsc,
      );
    },
    // 培训;
    handleTrain(data) {
      this.itemData = data;
      this.sspxShow = !this.sspxShow;
    },
    // 批量纳入计划
    handlePlnrjh(data){
      this.jhData = data;
      this.wtfpShow = !this.wtfpShow
    },
    handleDeljh(data){
      this.$confirm("是否确定将此计划删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$post(this.API.deleteCapacityPlan,{
          wid:data.wid
        }).then(res=>{
          if(res.state == 'success'){
             this.$alert('删除成功', "提示", {
              confirmButtonText: "确定",
              type:'success',
              callback:action=>{
                this.pageCapacityPlan();
              }
             });
          }else{
             this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
          }
        })
      }).catch(() => {});
    },
    // 获取能力类列表
    pageCapacityPlan() {
      this.$get(this.API.pageCapacityPlan, {
        curPage: this.currentPage,
        pageSize: this.pageSize,
        cpbh: this.filterWord.cpbh,
        zt: this.filterWord.jhzt,
        pxxs: this.filterWord.pxxs,
        cjsjStart: this.filterWord.jhcjrq[0],
        cjsjEnd: this.filterWord.jhcjrq[1],
        jhpxsjStart: this.filterWord.jhpxrq[0],
        jhpxsjEnd: this.filterWord.jhpxrq[1],
        sjpxsjStart: this.filterWord.sjpxrq[0],
        sjpxsjEnd: this.filterWord.sjpxrq[1],
        keyword: this.filterWord.keyword,
        pxsc:this.filterWord.pxsc
      }).then(res => {
          if (res.state == "success") {
            if (!!res.data.rows) {
              this.tableData = res.data.rows;
            } else {
              this.tableData = [];
            }
            this.total = res.data.records;
          } else {
            this.$alert(res.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.pageCapacityPlan();
  },
  components: { filterCondition, tableLayout, sspxDialog,wtfplistDialog }
};
</script>

<style lang="scss" scoped>
.name-wrapper {
  a:hover{
    text-decoration: underline !important;
  }
}
</style>
