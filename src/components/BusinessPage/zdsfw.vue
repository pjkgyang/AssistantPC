<template>
 <div class="myitem-zdsfw">
     <tableLayout class="zdsfw-content" flex-column >
         <section slot="top" style="border-bottom:1px solid #EBEEF5"  col=1>
           <div class="mb-12" flex> 
            <span class="query-title">产品:</span>
            <span class="query-list"  @click="handleCp" >
               <span data-type = ""  :class="{'bg-active':cpbh == ''}">全部</span>
               <span v-for="(cpx,index) in cpList" :data-index="index" :data-type="cpx.id" :key="index" :class="{'bg-active':cpbh == cpx.id&&cpmc == cpx.text}">{{cpx.text}}</span>
            </span>
           </div> 
           <div class="mb-12" flex>
            <span class="query-title">服务内容:</span>
            <span class="query-list"  @click="handleFwnr">
               <span data-type = ""  :class="{'bg-active':fwnr == ''}">全部</span>
               <span v-for="(fwnrl,index) in fwnrList" :data-type="fwnrl.id" :key="index" :class="{'bg-active':fwnr == fwnrl.id}">{{fwnrl.text}}</span>
            </span>
           </div>   
           <div class="mb-12" flex>
            <span class="query-title">状态:</span>
            <span class="query-list"  @click="handleZt">
               <span data-type = ""  :class="{'bg-active':zt == ''}">全部</span>
               <span v-for="(ztl,index) in ztList" :data-type="ztl.lable" :key="index" :class="{'bg-active':zt == ztl.lable}">{{ztl.mc}}</span>
            </span>
           </div> 
           <div class="mb-12" flex>
            <span class="query-title">类别:</span>
            <span class="query-list"  @click="handleLb">
               <span v-for="(lbl,index) in lbList" :data-type="lbl.lable" :key="index" :class="{'bg-active':lb == lbl.lable}">{{lbl.mc}}</span>
            </span>
           </div> 
         </section>
         <section slot="bottom" col=2 > 
           <section>
              <div flex spacebetween class="mb-12">
                <div>
                      <el-button v-if="isJzuser == 0" :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('tbfw')">提报服务</el-button>
                      <el-button v-if="isJzuser != 0" :disabled="!multipleSelection.length" type="primary" size="mini" @click="handleClick('qrfw')">确认服务</el-button>
                      <el-button :disabled="!multipleSelection.length" type="danger" size="mini" @click="handleClick('bhfw')">驳回服务</el-button>
                      <el-button v-if="isJzuser == 0" type="primary" size="mini" @click="handleClick('xzjh')">新增自定义服务计划</el-button>
                      <el-button v-if="isJzuser == 0" :disabled="!multipleSelection.length" type="danger" size="mini" @click="handleClick('scjh')">删除服务计划</el-button>
                </div>
                <div>
                    <el-button type="primary" size="mini"  @click="handleClick('export')">导出</el-button>
                </div>
            </div>
              <el-table
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  border
                  @selection-change="handleSelectionChange">
                  <el-table-column  fixed="left"  type="selection" width="55"></el-table-column>
                  <el-table-column
                    fixed="left"
                    label="操作"
                    width="210">
                    <template slot-scope="scope">
                      <el-button v-if="scope.row.zt != '1' && isJzuser == 0" type="text" size="mini" @click="handleClick('tbfw',scope.row)">提报</el-button>
                      <el-button v-if="isJzuser != 0" type="text" size="mini" @click="handleClick('qrfw',scope.row)">确认</el-button>
                      <el-button v-if="scope.row.zt == '1' && isJzuser == 0"  type="text" size="mini" @click="handleClick('bhfw',scope.row)">驳回</el-button>
                      <el-button v-if="scope.row.zt == '0' && isJzuser == 0" type="text" size="mini" @click="handleClick('scjh',scope.row)" style="color:#f00">删除</el-button>
                      <el-button type="text" size="mini" @click="handleCheckDetail(scope.row)">详情</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="cpmc" label="产品" min-width="300" show-overflow-tooltip>
                      <!-- <template slot-scope="scope">
                          <a href="javaScript:;;" class="pannel-cpmc" @click="handleCheckDetail(scope.row)">{{scope.row.cpmc}}</a>
                      </template> -->
                  </el-table-column>
                  <el-table-column  prop="fwnr" label="服务内容" min-width="160"  show-overflow-tooltip></el-table-column>
                  <el-table-column  prop="zt_display" label="状态" width="100"></el-table-column>
                  <el-table-column  label="计划完成时间" width="140">
                     <template slot-scope="scope">
                       <a v-if="scope.row.zt == 0 && isJzuser == 0" href="javaScript:;;" class="pannel-cpmc" @click="handleClick('wcsj',scope.row)">{{scope.row.jhjsrq}}</a>
                       <span v-else>{{scope.row.jhjsrq}}</span>
                     </template>
                  </el-table-column>
                  <el-table-column prop="zrrxm" label="责任人" width="100"></el-table-column>
                  <el-table-column prop="tbrxm" label="提报人" width="100" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="tbsj" label="提报时间" width="160"  show-overflow-tooltip></el-table-column>
                  <el-table-column prop="qrrxm" label="确认人" width="100"  show-overflow-tooltip></el-table-column>
                  <el-table-column prop="qrsj" label="确认时间" width="160"  show-overflow-tooltip></el-table-column>
                  <el-table-column prop="pf" label="评分" width="80"  ></el-table-column>
              </el-table>
            </section>
            <div text-right style="margin-top:2px">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                 </el-pagination>
            </div>
        </section>
     </tableLayout>
     <tbfwDialog :show.sync='tbfwShow' @handleCommitTB="handleCommitTB" :wids="wids"></tbfwDialog>
     <wcsjDialog :show.sync='wcsjShow' :yjhwcsj="rowsData.jhjsrq" @handleCommitTZJH="handleCommitTZJH"></wcsjDialog>
     <qrbhfwDialog :show.sync='qrbhfwShow' :title="title" @handleCommitQR="handleCommitQR"></qrbhfwDialog>
     <fwjhDialog :show.sync='fwjhShow' :cpList="cpList" @handleCommitFWJH="handleCommitFWJH"></fwjhDialog>
 </div>
</template>

<script>
import tableLayout from "@/components/layout/tableLayout.vue";
import { getProjectCatalog } from "@/api/xmfz.js";
import tbfwDialog from "@/components/dialog/zdsfw/tbfw-dialog.vue";
import wcsjDialog from "@/components/dialog/zdsfw/wcsj-dialog.vue";
import qrbhfwDialog from "@/components/dialog/zdsfw/qrbhfw-dialog.vue";
import fwjhDialog from "@/components/dialog/zdsfw/fwjh-dialog.vue";

export default {
  data() {
    return {
      tbfwShow: false,
      wcsjShow: false,
      qrbhfwShow: false,
      fwjhShow: false,
      title: "",
      cpList: [],
      cpbh: "",
      cpmc:"",
      fwnrList: [],
      fwnr: "",
      ztList: [
        { lable: "0", mc: "计划中" },
        { lable: "1", mc: "已完成" },
        { lable: "2", mc: "关闭" }
      ],
      zt: "",
      lbList: [
        { lable: "", mc: "全部" },
        { lable: "1", mc: "标准服务计划" },
        { lable: "0", mc: "自定义服务计划" }
      ],
      lb:"",
      currentPage: 1,
      pageSize: 15,
      total: 0,
      tableData:[],
      multipleSelection: [],
      widsArr:[],
      wids:'',
      cpobj:{},
      rowsData:'',
      isJzuser:''
    };
  },
  methods: {
    handleCommitTB(data){  //提报
      this.$post(this.API.submitActiveService,{
        wids:this.wids,
        sm:data.sm,
        fjData:data.fileList
      }).then(res=>{
        if(res.state == 'success'){
           this.$alert('提报成功', '提示', {confirmButtonText: '确定',type:'success',
            callback: action => {
              this.tbfwShow = false;
              this.pageActiveService();
            }}
          );
        }else{
           this.$alert(res.msg, '提示', {confirmButtonText: '确定',type:'error'});
        }
      })
    },
    handleCommitQR(data){   //驳回,确认
         let obj = {
           wids:this.wids,
           sm:data.sm
         };
        if(this.title == '确认服务'){
           obj['pf'] = !data.pf?'':data.pf
        }
       this.$post(this.title == '确认服务'?this.API.confirmActiveService:this.API.rejectActiveService,obj).then(res=>{
        if(res.state == 'success'){
           this.$alert(this.title == '确认服务'?'确认成功':'驳回成功', '提示', {confirmButtonText: '确定',type:'success',
            callback: action => {
              this.qrbhfwShow = false;
              this.pageActiveService();
            }}
          );
        }else{
           this.$alert(res.msg, '提示', {confirmButtonText: '确定',type:'success'});
        }
      })
    },
    handleCommitFWJH(data){ //服务计划确认
      data.xmbh = this.xmbh;
      data.xmmc = this.xmmc;
      this.$post(this.API.saveActiveService,data).then(res=>{
        if(res.state == 'success'){
           this.$alert('保存成功', '提示', {confirmButtonText: '确定',type:'success',
           callback: action => {
              this.fwjhShow = false;
              this.currentPage = 1;
              this.pageActiveService();
            }
          })
        }
      })
    },
    handleCommitTZJH(data){   //调整计划完成日期
        this.$post(this.API.changeCompleteDate,{
          wid:this.rowsData.wid,
          oldDate:this.rowsData.jhjsrq,
          newDate:data.mbjhwcsj,
          sm:data.sm
        }).then(res=>{
          if(res.state == 'success'){
            this.$alert('保存成功', '提示', {confirmButtonText: '确定',type:'success',
              callback: action => {
                this.wcsjShow = false;
                this.pageActiveService();
              }
            })
          }
        })
    },
    handleSelectionChange(val) { //复选
      this.widsArr = [];
      this.multipleSelection = val;
      val.forEach(ele=>{
       this.widsArr.push(ele.wid);
      })
    },
    handleCp(e) {
      let cpbh = e.target.getAttribute("data-type");
      let index = e.target.getAttribute("data-index");
      // this.cpobj = this.cpList.find(item=>{
      //     return item.id === cpbh;
      // })
      if (!cpbh){
        this.cpbh = '';
        this.cpmc = '';
      }else{
        this.cpbh = cpbh;
        this.cpmc = this.cpList[index].text;
        // this.cpmc = this.cpobj.text;
      }
      this.fwnr = '';
      this.listFwnrByCp();
      this.currentPage = 1;
      this.pageActiveService();
    },
    handleFwnr(e) {
      let fwnr = e.target.getAttribute("data-type");
      if (fwnr == null) return;
      this.fwnr = fwnr;
      this.currentPage = 1;
      this.pageActiveService();
    },
    handleZt(e) {
      let zt = e.target.getAttribute("data-type");
      if (zt == null) return;
      this.zt = zt;
      this.currentPage = 1;
      this.pageActiveService();
    },
    handleLb(e) {
      let lb = e.target.getAttribute("data-type");
      if (lb == null) return;
      this.lb = lb;
      this.currentPage = 1;
      this.pageActiveService();
    },
    handleClick(data,params) {
      this.wids = !params?this.widsArr.join(','):params.wid;
      let tbArr = [];
      switch (data) {
        case "tbfw":
            this.multipleSelection.forEach(ele=>{
              if(ele.zt == '1'){
                tbArr.push(ele.zt);
              }
            })
            if(tbArr.length){
                this.$alert('状态为 "已完成" 的服务不能再次提报！', '提示', {confirmButtonText: '确定',type:'warning'});
                return;
            }
          this.tbfwShow = true;
          break;
        case "qrfw":
          this.qrbhfwShow = true;
          this.title = "确认服务";
          break;
        case "bhfw":
           this.multipleSelection.forEach(ele=>{
              if(ele.zt != '1'){
                tbArr.push(ele.zt);
              }
            })
            if(tbArr.length){
                this.$alert('非 "已完成" 状态的服务不能驳回！', '提示', {confirmButtonText: '确定',type:'warning'});
                return;
            }
          this.title = "驳回服务";
          this.qrbhfwShow = true;
          break;
        case "xzjh":
          this.fwjhShow = true;
          break;
        case "scjh":
        this.multipleSelection.forEach(ele=>{
          if(ele.zt != '0'){
            tbArr.push(ele.zt);
          }
        })
        if(tbArr.length){
            this.$alert('非计划中服务不能删除！', '提示', {confirmButtonText: '确定',type:'warning'});
            return;
        }
        this.$confirm('您确定要删除服务计划么?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$post(this.API.deleteActiveService,{
            wids:this.wids
          }).then(res=>{
            if(res.state == 'success'){
               this.$alert('删除成功', '提示', {
                  confirmButtonText: '确定',
                  type:'success', 
                  callback: action => {
                     this.pageActiveService();
                  }
              });
            }
          })
         
        }).catch(() => {});
          break;
        case "export":
        window.open(window.baseurl+'activeservice/exportActiveService.do?cpbh='+this.cpbh+'&cpmc='+this.cpmc+'&fwnr='+this.fwnr+'&zt='+this.zt+
        '&lb='+this.lb); 
          break;
        case "wcsj":  //修改计划完成日期
            this.wcsjShow = true;
            this.rowsData = params
          break;
        default:
          break;
      }
    },
    handleSizeChange(data) {
      this.pageSize = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    handleCheckDetail(data) {
      let {href} = this.$router.resolve({
        name: "ZdsfwDetail",
        query:{
          wid:data.wid
        }
      });
      window.open(href, "_blank");
    },
     // 获取产品
    listXmZdsfwCp() {
      this.$get(this.API.listXmZdsfwCp,{
        xmbh:this.xmbh
      }).then(res=>{
        if(res.state == 'success'){
          if(!res.data){
             this.cpList = []
          }else{
             this.cpList = res.data
          }
        }
      })
    },
    // 获取服务内容
    listFwnrByCp(){
      this.$get(this.API.listFwnrByCp,{
        cpbh:this.cpbh,
        cpmc:this.cpmc
      }).then(res=>{
        if(res.state == 'success'){
           if(!res.data){
             this.fwnrList = []
           }else{
             this.fwnrList = res.data
           }
        }
      })  
    },
    pageActiveService(){
      this.$get(this.API.pageActiveService,{
        curPage:this.currentPage,
        pageSize:this.pageSize,
        xmbh:this.xmbh,
        cpbh:this.cpbh,
        cpmc:this.cpmc,
        fwnr:this.fwnr,
        zt:this.zt,
        lb:this.lb
      }).then(res=>{
        if(res.state == 'success'){
           this.tableData = res.data.rows
           this.total = res.data.records
        }
      })  
    }
  },
  mounted() {
    this.listXmZdsfwCp();
    this.pageActiveService();
    this.isJzuser = JSON.parse(sessionStorage.userInfo).unitType
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    xmmc: {
      type: String,
      default: ""
    },
    
  },
  components: { tableLayout, tbfwDialog, wcsjDialog, qrbhfwDialog, fwjhDialog }
};
</script>

<style lang="scss" scoped>
.myitem-zdsfw {
  // height: calc(100vh - 110px);
  padding: 10px 20px;
}
.pannel-cpmc:hover {
  text-decoration: underline !important;
}
.zdsfw-content {
  padding: 10px;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  overflow-y: auto;
}
</style>
