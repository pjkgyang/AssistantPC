<template>
  <div class="myitem-meet">
    <tableLayout class="meet-content" flex-column>
      <section slot="top" style="border-bottom:1px solid #EBEEF5" col=1>
        <meetFilter :placeholder="'请输入会议主题，会议人员，会议地点'"  @handleChangeFilter="handleChangeFilter"></meetFilter>
      </section>
      <section slot="bottom" col=2>
        <section>
          <div class="mb-12">
              <el-button  type="success" size="mini" @click="handleAddHy" v-if="$route.name != 'meetingTracking'">会议登记</el-button>
              <el-button  type="primary" size="mini" @click="handleExport">导出</el-button>
          </div>

          <el-table v-if="$route.name == 'meetingIndex'" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column fixed="left" label="操作" width="180" v-if="$route.name != 'meetingTracking'">
              <template slot-scope="scope">
                  <el-button v-if="scope.row.addMatterBtn=='1'"  type="text" size="mini" @click="handleClick(scope.row,scope.$index,'dcl')">待处理事项</el-button>
                  <el-button v-if="scope.row.editBtn=='1'" type="text" size="mini" @click="handleClick(scope.row,scope.$index,'edit')">编辑</el-button>
                  <el-button v-if="scope.row.delBtn=='1'" type="text" size="mini" style="color:#f00" @click="handleClick(scope.row,scope.$index,'delete')">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="hylx_display" label="会议类型" width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hyxs_display" label="会议形式" width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hybt" label="会议主题" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hykssj" label="开始时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hyjssj" label="结束时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hysc" label="时长" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hydd" label="会议地点"  min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="chry" label="参会人员" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column label="内部会议" width="100" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.sfnbhy_display}}</span>
              </template>
            </el-table-column>
          </el-table>

          <el-table v-if="$route.name == 'meetingTracking'" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border>
            <el-table-column fixed="left" label="操作" width="80" >
              <template slot-scope="scope">
                  <el-button  type="text" size="mini" v-if="scope.row.feedbackbtn == '1'">
                      <a :href="'#/meeting/itemdetail'+'?wid='+scope.row.matterWid" target="_blank">反馈</a>
                  </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="hylx_display" label="会议类型" width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hyxs_display" label="会议形式" width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hybt" label="会议主题" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hykssj" label="开始时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="hyjssj" label="结束时间" width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="clsxmc" label="待处理事项" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="gszrr" label="公司责任人"  min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sxwczt_display" label="完成状态" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="jhwcsj" label="计划完成时间" min-width="130" show-overflow-tooltip></el-table-column>
          </el-table>
        </section>
        <div text-right style="margin-top:2px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </section>
    </tableLayout>


    <hydjDialog :show.sync="hydjShow" :wid="curWid" @handleCommitHydj="handleCommitHydj"></hydjDialog>
    <dclsxList :show.sync="dclShow" :wid="curWid" :zt="curInfo.hyzt" @handleAddDclsx="handleAddDclsx"></dclsxList>
    <dclsxDialog :show.sync="dcldialogShow" :wid="curWid" :matterWid="matterWid" @handleCloseDcl="handleCloseDcl"></dclsxDialog>
  </div>
</template>

<script>
  import meetFilter from "@/views/BusinessPage/meetOnline/filter.vue";
  import tableLayout from "@/components/layout/tableLayout.vue";
  import hydjDialog from "@/views/BusinessPage/meetOnline/hydj-dialog.vue";
  import dclsxList from "@/views/BusinessPage/meetOnline/dclList.vue";
  import dclsxDialog from "@/views/BusinessPage/meetOnline/dcl-dialog.vue";


  export default {
    data() {
      return {
        hydjShow:false,
        dclShow:false,
        dcldialogShow:false,//待处理表单

        currentPage: 1,
        pageSize: 15,
        total: 0,
        tableData: [],

        curWid:"",//当前wid  会议wid
        matterWid:"",//事项wid
        curInfo:{},

        filterData: {
          keyword:"",
          meetingTypes:'',
          meetingFormat:"",
          meetingStatus:"",
          internalMeeting:"",
          startDateTime:"",//计划开始日期
          endDateTime:"",//计划结束日期
        },
        isJzuser: "",
        userGroupTag: "",
        userid: "", //用户编号 当前用户
      };
    },
    methods: {

      handleExport(){
        let url = this.$route.name == 'meetingTracking'?this.API.exportMatter:this.API.exportMeeting;
        window.open(
          url+'?startDateTime'+this.filterData.startDateTime+'&endDateTime='+this.filterData.endDateTime+
          '&meetingTypes='+this.filterData.meetingTypes+'&meetingFormat='+this.filterData.meetingFormat+
          '&meetingStatus='+this.filterData.meetingStatus+'&internalMeeting='+this.filterData.internalMeeting
        )
      },
      handleAddHy(){
        this.curWid = '';
        this.hydjShow = true;
      },
      // 会议登记
      handleCommitHydj(data,wid){
        if(data == 1){
           this.$confirm('您要现在添加待处理事项吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
            this.curWid = wid;
            this.dclShow = true;
            this.dcldialogShow = true;
          }).catch(() => {});
        }
        if(this.$route.name == 'meetingTracking'){
          this.pageMatter();
        }else{
          this.pageMeeting();
        }
      },
      // 添加待处理事项
      handleAddDclsx(data){

        if(!!data){
          this.matterWid = data;
        }
        this.dcldialogShow = !this.dcldialogShow;
      },
      // 清除待处理wid
      handleCloseDcl(){
        this.matterWid = "";
      },
      // 选择项目
      handleChooseItem(data){
         this.curItem = data;
         this.serviceTypeShow = !this.serviceTypeShow;
      },
     // 按钮操作
     handleClick(params,index,type){
         this.curWid = params.wid; // 会议wid
         this.curInfo = params;
         switch (type) {
             case 'dcl':
                this.dclShow = !this.dclShow;
                 break;
             case 'edit':
                this.hydjShow = !this.hydjShow;
                 break;
            case 'delete':
                  this.$confirm('是否确认删除此会议记录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                   this.$post(this.API.deleteMeeting,{
                     meetingwid:params.wid
                   }).then(res=>{
                     if(res.state == 'success'){
                       this.$message({message:'删除成功',type:'success'});
                       this.tableData.splice(index,1);
                     }else{
                       this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
                     }
                   })
                  }).catch(() => {});
                 break;
             default:
                 break;
         }
     },

      // 筛选条件
      handleChangeFilter(data) {
        this.filterData = data;
        this.currentPage = 1;
        if(this.$route.name == 'meetingTracking'){
          this.pageMatter();
        }else{
          this.pageMeeting();
        }
      },

      handleSizeChange(data) {
        this.pageSize = data;
        this.currentPage = 1;
        if(this.$route.name == 'meetingTracking'){
         this.pageMatter();
        }else{
          this.pageMeeting();
        }
      },
      handleCurrentChange(data) {
        this.currentPage = data;
        if(this.$route.name == 'meetingTracking'){
          this.pageMatter();
        }else{
          this.pageMeeting();
        }
      },

      // 编辑（单条）
      handleEdit(data){
        this.curRow = data;
        this.plxgZrr = false;
        this.editShow = !this.editShow;
      },

      // 查看详情
      handleCheckDetail(data) {
        let {
          href
        } = this.$router.resolve({
          name: "ZdsfwDetail",
          query: {
            wid: data.wid
          }
        });
        window.open(href, "_blank");
      },

     // 获取会议列表
      pageMeeting() {
        this.$get(this.API.pageMeeting, {
          curPage: this.currentPage,
          pageSize: this.pageSize,
          meetingTypes:this.filterData.meetingTypes,
          meetingFormat:this.filterData.meetingFormat,
          meetingStatus:this.filterData.meetingStatus,
          internalMeeting:this.filterData.internalMeeting,
          startDateTime:this.filterData.startDateTime,//计划开始日期
          endDateTime:this.filterData.endDateTime,//计划结束日期
          keyword: this.filterData.keyword
        }).then(res => {
          if (res.state == "success") {
            if(!!res.data.rows){
               this.tableData = res.data.rows;
            }else{
              this.tableData = []
            }
            this.total = res.data.records;
          }else{
             this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
          }
        });
      },

      //获取待处理事项列表
      pageMatter(){
        this.$get(this.API.pageMatter,{
          curPage:this.currentPage,
          pageSize:this.pageSize,
          meetingTypes:this.filterData.meetingTypes,
          meetingFormat:this.filterData.meetingFormat,
          meetingStatus:this.filterData.meetingStatus,
          internalMeeting:this.filterData.internalMeeting,
          startDateTime:this.filterData.startDateTime,//计划开始日期
          endDateTime:this.filterData.endDateTime,//计划结束日期
          keyword: this.filterData.keyword,
          meetingWid:''
        }).then(res=>{
          if(res.state == 'success'){
            if(!!res.data.rows){
               this.tableData = res.data.rows;
            }else{
              this.tableData = []
            }
            this.total = res.data.records;
          }else{
             this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
          }
        })
      }
    },
    activated() {
      if(this.$route.name == 'meetingTracking'){
        this.pageMatter();
      }else{
        this.pageMeeting();
      }
    },
    props: {},
    components: {
      tableLayout,
      meetFilter,
      hydjDialog,
      dclsxList,
      dclsxDialog
    }
  };
</script>

<style lang="scss" scoped>
  .myitem-meet {
    padding: 10px 20px;
    a{
      color: #409EFF;
    }
  }

  .pannel-cpmc:hover {
    text-decoration: underline !important;
  }

  .meet-content {
    padding: 10px;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 5px;
    overflow-y: auto;
  }
</style>
