<template>
  <div class="dialog-container">
    <el-dialog title="会议登记" width="1000px" top="30px" :visible.sync="visible" :close-on-click-modal="false" @close="$emit('update:show', false)"
      :show="show">
      <div class="demand">
        <el-form style="width:950px;margin:0 auto" class="demo-ruleForm" :model="hydjData" :inline="true" size="mini"
          label-width="135px">

          <el-form-item label="会议主题" required>
            <el-input size="mini" type="text" style="width:800px" placeholder="请输入会议主题" v-model="hydjData.hybt"></el-input>
          </el-form-item>

          <el-form-item label="会议开始时间" required>
            <el-date-picker v-model="hykssj" type="date"  placeholder="选择会议开始时间"
            align="right"
            value-format="yyyy-MM-dd"
            style="width:220px;"  >
            </el-date-picker>
            <el-time-select
              style="width: 100px;"
              v-model="kssjTime"
              :clearable="false"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '24:00'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>

          <el-form-item label="会议结束时间" required>
            <el-date-picker v-model="hyjssj" type="date" placeholder="选择会议开始时间"
            align="right"
            value-format="yyyy-MM-dd"
            style="width:220px;"  >
            </el-date-picker>
            <el-time-select
              style="width: 100px;"
              v-model="jssjTime"
              :clearable="false"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '24:00'
              }"
              placeholder="选择时间">
            </el-time-select>
          </el-form-item>

          <el-form-item label="会议类型" required>
            <el-select v-model="hydjData.hylx" size="mini" placeholder="请选择会议类型" style="width:325px">
              <el-option v-for="(item, index) in hylxList" :key="index" :label="item.mc" :value="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="会议形式" required>
            <el-select v-model="hydjData.hyxs" size="mini" placeholder="请选择会议形式" style="width:325px">
              <el-option v-for="(item, index) in hyxsList" :key="index" :label="item.mc" :value="item.label"></el-option>
            </el-select>
          </el-form-item>

           <el-form-item label="会议记录人" required>
             <el-select v-model="hydjData.hyjlrbh" filterable size="mini" placeholder="请选择会议记录人（可按姓名搜索）" :style="{width:hydjData.hyxs != '1'?'325px':'800px'}"  @change="handleChangeHyjlr">
              <el-option v-for="(item, index) in userList" :key="index" :label="item.username" :value="item.userid"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="会议地点" required v-show="hydjData.hyxs != '1'">
            <el-input size="mini" type="text" style="width:325px" placeholder="请填写会议地点"  v-model="hydjData.hydd"></el-input>
          </el-form-item>


           <el-form-item label="所属项目"  >
              <el-input placeholder="请选择" readonly v-model="hydjData.xmmc" style="width:800px" >
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="chooseItemShow = true"></el-button>
              </el-input>
          </el-form-item>

          <el-form-item label="是否内部会议" required v-if="hydjData.hylx!='1' && hydjData.hylx!='2'">
             <el-radio-group v-model="hydjData.sfnbhy" style="width:325px">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
             </el-radio-group>
          </el-form-item>

           <el-form-item label="是否有待处理事项" required>
             <el-radio-group v-model="hydjData.sfyclsx" @change="handleChangeSfdcl" :style="{width:hydjData.hylx!='1' && hydjData.hylx!='2'?'325px':'800px'}">
                <el-radio label="1">有</el-radio>
                <el-radio label="0">无</el-radio>
             </el-radio-group>
          </el-form-item>

        <!-- 
          <el-form-item label="是否完成" required v-if="hydjData.sfyclsx == '1'">
             <el-radio-group v-model="hydjData.hyzt" style="width:325px">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
             </el-radio-group>
          </el-form-item> -->

          <!-- 区域工程例会和区域协同例会，不显示参会学校老师和参会学校部门和参会第三方 -->
          <el-form-item label="参会学校老师" v-if="!!hydjData.hylx && hydjData.hylx!='1' && hydjData.hylx!='2'">
            <el-input size="mini" type="text" style="width:325px" placeholder="请填写参会学校老师"  v-model="hydjData.chls"></el-input>
          </el-form-item>

          <el-form-item label="参会学校部门" v-if="!!hydjData.hylx && hydjData.hylx!='1' && hydjData.hylx!='2'">
            <el-input size="mini" type="text" style="width:325px" placeholder="请填写参会学校部门"  v-model="hydjData.chlsbm"></el-input>
          </el-form-item>

          <el-form-item label="参会第三方" v-if="!!hydjData.hylx && hydjData.hylx!='1' && hydjData.hylx!='2'">
            <el-input size="mini" type="text" style="width:800px" placeholder="请填写参会第三方"  v-model="hydjData.chdsf"></el-input>
          </el-form-item>

          <el-form-item label="参会公司人员" >
             <!-- <el-select v-model="jzchry" filterable multiple  size="mini" placeholder="请选择参会公司人员（可按姓名搜索）" style="width:800px" @change="handleChangeGsry">
              <el-option v-for="(item, index) in userList" :key="index" :label="item.username" :value="item.userid+','+item.username"></el-option>
            </el-select> -->
            <div flex spacebetween class="jzcyry" >
                <div>
                  <span v-if="!jzchry.length" class="placeholder">请选择参会人员</span>
                  <el-tag
                    v-for="(item,index) in jzchry"
                    :key="index"
                    size="mini"
                    closable
                    @close="handleCloseTag(index)"
                    type="info">
                    {{item}}
                  </el-tag>
                </div>
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="userShow = true"></el-button>
            </div>
             <!-- <el-input placeholder="请选择" readonly v-model="jzchry" style="width:800px" >
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="schoolShow = true"></el-button>
              </el-input> -->
          </el-form-item>

           <el-form-item label="会议结论" >
                 <div style="width:800px">
                    <div id="summernoteHyjl"></div>
                 </div>
            </el-form-item>

            <el-form-item label="会议纪要" >
                 <div  style="width:800px">
                    <div id="summernoteHyjy"></div>
                 </div>
            </el-form-item>

          <el-form-item label="会议纪要材料" >
            <div   style="width:800px">
              <uploadFile :Type="'meet'" :isMultiple="true" :istb="isClearFileHyjy" @handleUploadFile="handleUploadFileHyjy"></uploadFile>
              <p class="upload-file" v-if="!!hyjyfjList.length && !!wid"  v-for="(fj,index) in hyjyfjList">
                <span>{{fj.fjmc}}</span> <i class="el-icon-close" @click="handleRemovefj(index)"></i>
              </p>
            </div>
          </el-form-item>

          <el-form-item label="会议汇报材料" >
            <div   style="width:800px">
              <uploadFile :Type="'meet'" :isMultiple="true" :istb="isClearFile" @handleUploadFile="handleUploadFile"></uploadFile>
              <p class="upload-file" v-if="!!hbclfjList.length && !!wid"  v-for="(fj,index) in hbclfjList">
                <span>{{fj.fjmc}}</span> <i class="el-icon-close" @click="handleRemovehbclfj(index)"></i>
              </p>
            </div>
          </el-form-item>
        </el-form>


        <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
          <el-button size="small" type="primary" @click="handleCommit">确认提交</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>

      <el-dialog title="选择项目" :visible.sync="chooseItemShow" :close-on-click-modal="false" width="800px" top="30px"
		 append-to-body>
			<div style="padding:10px;">
				<itemChoose @handleEdit="handleChooseItem"></itemChoose>
			</div>
	  </el-dialog>

    <userChoose  :show.sync="userShow" @handleAdduser="handleAdduser"></userChoose>
  </div>
</template>

<script>
  import { getSession} from "@/utils/util.js";
  import uploadFile from "@/components/BusinessPage/upload.vue";
  import itemChoose from "@/components/BusinessPage/itemChoose.vue";
  import userChoose from "@/components/public/userChoose.vue";

  export default {
    data() {
      return {
        userShow:false,
        chooseItemShow:false,
        visible: this.show,
        isClearFile: false, //清除附件
        isClearFileHyjy:false,//会议纪要
        userList:[],

        hyxsList:[],
        hylxList:[],
        hyjyfjList:[],//会议纪要附件
        hbclfjList:[], //汇报材料名称
        hyjyfj:[],//会议纪要附件
        hbclfj:[],//汇报材料名称

        jzchry:[],//金智参会人员
        jzchryCode:[],//参会人员分割 参数
        hykssj:"",
        hyjssj:"",
        kssjTime:"08:00",
        jssjTime:"08:00",
        hydjData: {
          hybt:"",
          hykssj:"",
          hyjssj:"",
          hydd:"",
          hyjlrbh:"",//会议记录人编号
          hyjlrxm:"",//会议记录人名称
          hylx:"",
          hyxs:"",
          xmmc:"",
          xmbh:"",
          sfnbhy:"1",
          sfyclsx:"1",//是否有处理事项
          hyzt:"0", //是否完成
          chls:"",
          chlsbm:"",
          chdsf:"",
          hyjl:"",
          hyjy:"",
          jzchry:"",//金智参会人员
          hyjyfj:"",//会议纪要附件
          hbclfj:"",//汇报材料附件
        },
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      wid:{
        type:String,
        default:''
      }
    },
    components: {
      uploadFile,
      itemChoose,
      userChoose
    },
    methods: {
      //是否有待处理事项
      handleChangeSfdcl(val){
        this.hydjData.hyzt = val == '1'?'0':'1';
        if(!!this.wid && val == '0'){
            this.$confirm('您已经填写了待处理事项,改为【无】会删除已录入的待处理事项。确定要改为无待处理事项吗?', '提示', {
              cancelButtonText: '否',
              confirmButtonText: '是',
              type: 'warning'
          }).then(() => {

          }).catch(() => {
            this.hydjData.sfyclsx = '1';
          });
        }
      },
      // 选择会议记录人
      handleChangeHyjlr(val){
        let obj = this.userList.find(ele=>{
          return ele.userid == val;
        })
        this.hydjData.hyjlrxm = obj.username;
      },
      // 添加公司参与人
      handleAdduser(data){
        if(!this.jzchry.includes(data.username)){
          this.jzchry.push(data.username);
          this.jzchryCode.push(data.userid+','+data.username);
        }
      },
      // 删除金智参会人员
      handleCloseTag(index){
          this.jzchry.splice(index,1);
          this.jzchryCode.splice(index,1);
      },
      // 选择项目
      handleChooseItem(data){
        this.hydjData.xmmc = data.xmmc;
        this.hydjData.xmbh = data.xmbh;
        this.chooseItemShow = false;
      },
        // 移除附件
      handleRemovefj(index){
        this.hyjyfjList.splice(index,1);
        this.hyjyfj.splice(index,1);
      },
      // 移除附件 汇报材料
      handleRemovehbclfj(index){
        this.hbclfjList.splice(index,1);
        this.hbclfj.splice(index,1);
      },

      //  会议纪要附件
      handleUploadFileHyjy(data){
        if (!!data.length) {
          data.forEach(ele=>{
          this.hyjyfjList.push({
            fjwid:ele.split('|')[0],
            fjmc:ele.split('|')[1]
          })
          this.hyjyfj.push(ele);
        })
        } else {
          this.hyjyfj = [];
        }
        if(!!this.wid){
           this.isClearFileHyjy = !this.isClearFileHyjy;
        }
      },
      // 上传附件（汇报材料）
      handleUploadFile(data) {
       if (!!data.length) {
        data.forEach(ele=>{
          this.hbclfjList.push({
            fjwid:ele.split('|')[0],
            fjmc:ele.split('|')[1]
          })
         this.hbclfj.push(ele);
        })
        } else {
          this.hbclfj = [];
        }
        if(!!this.wid){
         this.isClearFile = !this.isClearFile;
        }
      },

      //提交需求
      handleCommit() {
        this.hydjData.hyjyfj = this.hyjyfj.join(',');
        this.hydjData.hbclfj = this.hbclfj.join(',');
        this.hydjData.hyjl = $("#summernoteHyjl").summernote("code");
        this.hydjData.hyjy = $("#summernoteHyjy").summernote("code");

        this.hydjData.hykssj = this.hykssj+' '+this.kssjTime;
        this.hydjData.hyjssj = this.hyjssj+' '+this.jssjTime;

        this.hydjData.jzchry = this.jzchryCode.join('|');
        if (!this.valiDate()) return;
        this.$post(this.API.saveMeeting, this.hydjData).then(res => {
          if (res.state == "success") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            $("#summernoteHyjl").summernote("code", "");
            $("#summernoteHyjy").summernote("code", "");
            this.isClearFile = !this.isClearFile;
            this.isClearFileHyjy = !this.isClearFileHyjy;
            this.visible = false;
            this.$emit("handleCommitHydj",this.hydjData.sfyclsx,res.data);
          } else {
            this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
          }
        });
      },

    //  获取金智用户
     getUsers() {
      this.$get(this.API.getUsers, {
        curPage: 1,
        pageSize: 9999,
        unitType: 0,
        keyword: "",
        dept: "01AM"
      }).then(res => {
        if (res.state == "success") {
          this.userList = res.data.rows;
        } else {
        }
      });
    },

    // 获取会议详情
    queryMeeting(){
      this.hbclfj =  [];this.hyjyfj = [];
      this.$get(this.API.queryMeeting,{
        wid:this.wid
      }).then(res=>{
        if(res.state == 'success'){
          this.hydjData.hybt = res.data.hybt;

          this.hykssj = res.data.hykssj.split(' ')[0];
          this.hyjssj = res.data.hyjssj.split(' ')[0];
          this.kssjTime = res.data.hykssj.split(' ')[1];
          this.jssjTime = res.data.hyjssj.split(' ')[1];

          // this.hydjData.hykssj = res.data.hykssj;
          // this.hydjData.hyjssj = res.data.hyjssj;

          this.hydjData.hydd = res.data.hydd;
          this.hydjData.hyjlrbh = res.data.hyjlrbh;//会议记录人编号
          this.hydjData.hyjlrxm = res.data.hyjlrxm;//会议记录人名称
          this.hydjData.hylx = res.data.hylx;
          this.hydjData.hyxs = res.data.hyxs;
          this.hydjData.xmmc = res.data.xmmc;
          this.hydjData.xmbh = res.data.xmbh;
          this.hydjData.sfnbhy = res.data.sfnbhy;
          this.hydjData.sfyclsx = res.data.sfyclsx;//是否有处理事项
          this.hydjData.hyzt = res.data.hyzt; //是否完成
          this.hydjData.chls = res.data.chls;
          this.hydjData.chlsbm = res.data.chlsbm;
          this.hydjData.chdsf = res.data.chdsf;
          this.hydjData.hyjl = res.data.hyjl=='-'?'':res.data.hyjl;
          this.hydjData.hyjy = res.data.hyjy=='-'?'':res.data.hyjy;
          $("#summernoteHyjl").summernote("code",res.data.hyjl=='-'?'':res.data.hyjl);
          $("#summernoteHyjy").summernote("code", res.data.hyjy=='-'?'':res.data.hyjy);

          this.hydjData.jzchry = res.data.chry;//金智参会人员
          this.jzchryCode = res.data.chry.split('|');
          this.jzchryCode.forEach(ele=>{
            this.jzchry.push(ele.split(',')[1]);
          })

          this.hyjyfjList = !res.data.hyjyfj?[]:res.data.hyjyfj;//会议纪要附件
          this.hbclfjList = !res.data.hbclfj?[]:res.data.hbclfj; //汇报材料名称

          this.hydjData.wid = res.data.wid;
           
          if(!res.data.hbclfj){
            this.hbclfjList = [];
            this.hbclfjList = res.data.hbclfj; //汇报材料名称
          }else{
            res.data.hbclfj.forEach((ele,i,arr)=>{
              this.hbclfj.push(ele.fjwid+"|"+ele.fjmc);
            })
          }
          
           if(!res.data.hyjyfj){
               this.hyjyfjList = res.data.hyjyfj;//会议纪要附件
               this.hyjyfjList = [];
           }else{
            res.data.hyjyfj.forEach((ele,i,arr)=>{
              this.hyjyfj.push(ele.fjwid+"|"+ele.fjmc);
            })
           }
        }else{

        }
      })
    },

      valiDate() {
        if (/^[\s]*$/.test(this.hydjData.hybt)) {
          this.$message({
            message: "请填写会议主题",
            type: "warning"
          });
          return false;
        }
        if (!this.hykssj) {
          this.$message({
            message: "请选择会议开始时间",
            type: "warning"
          });
          return false;
        }
        if (!this.hyjssj) {
          this.$message({
            message: "请选择会议结束时间",
            type: "warning"
          });
          return false;
        }

        if(new Date(this.hydjData.hykssj).getTime() >= new Date(this.hydjData.hyjssj).getTime()){
           this.$message({
            message: "会议开始时间 必须小于 会议结束时间",
            type: "warning"
          });
          return false;
        }
        if (this.hydjData.hyxs != '1' && /^[\s]*$/.test(this.hydjData.hydd)) {
          this.$message({
            message: "请填写会议地点",
            type: "warning"
          });
          return false;
        }
        if (/^[\s]*$/.test(this.hydjData.hyjlr)) {
          this.$message({
            message: "请填写会议记录人",
            type: "warning"
          });
          return false;
        }
        if (!this.hydjData.hylx) {
          this.$message({
            message: "请选择会议类型",
            type: "warning"
          });
          return false;
        }
        if (!this.hydjData.hyxs) {
          this.$message({
            message: "请选择会议形式",
            type: "warning"
          });
          return false;
        }
        return true;
      }
    },
    watch: {
      show(n,o) {
        this.visible = this.show;
        if (!!n) {
          this.hylxList = this.hyxsList  =  [];
          this.hylxList = getSession("MeetingType");
          this.hyxsList = getSession("MeetingFormat");

          this.$nextTick(() => {
            $("#summernoteHyjl").summernote({
              dialogsInBody: true,
              placeholder: "请输入内容",
              focus: true,
              height: 200,
              width: 100 + "%",
              minHeight: 285,
              lang: "zh-CN",
              toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["picture"],
                ["link", ["linkDialogShow", "unlink"]]
              ]
            });

            $("#summernoteHyjy").summernote({
              dialogsInBody: true,
              placeholder: "请输入内容",
              focus: true,
              height: 200,
              width: 100 + "%",
              minHeight: 285,
              lang: "zh-CN",
              toolbar: [
                ["style", ["bold", "italic", "underline", "clear"]],
                ["font", ["strikethrough", "superscript", "subscript"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["picture"],
                ["link", ["linkDialogShow", "unlink"]]
              ]
            });
          });
          if(!this.userList.length){
           this.getUsers();
          }
          if(!!this.wid){
            this.queryMeeting();
          }else{
            this.hydjData.hyjlrbh = JSON.parse(sessionStorage.getItem('userInfo')).uid;
            this.hydjData.hyjlrxm = JSON.parse(sessionStorage.getItem('userInfo')).nickName;
          }
        } else {
          this.hydjData.wid = "";
          this.hydjData.hybt = "";
          this.hykssj = "";
          this.hyjssj = "";
          this.kssjTime = "08:00";
          this.jssjTime = "08:00";
          this.hydjData.hydd  = "";
          this.hydjData.hyjlrbh  = "";//会议记录人编号
          this.hydjData.hyjlrxm = "";//会议记录人名称
          this.hydjData.hylx =  "";
          this.hydjData.hyxs = "";
          this.hydjData.xmmc =  "";
          this.hydjData.xmbh =  "";
          this.hydjData.sfnbhy =  "1";
          this.hydjData.sfyclsx = "1"//是否有处理事项
          this.hydjData.hyzt = "1" //是否完成
          this.hydjData.chls = "";
          this.hydjData.chlsbm = "";
          this.hydjData.chdsf = "";
          this.hydjData.hyjl = "";
          this.hydjData.hyjy = "";
          $("#summernoteHyjl").summernote("code","");
          $("#summernoteHyjy").summernote("code","");

          this.hyjyfjList = [];//会议纪要附件
          this.hbclfjList = []; //汇报材料名称
          this.hbclfj = [];
          this.hyjyfj = [];
          this.hydjData.hyjyfj = "";//会议纪要附件
          this.hydjData.hbclfj = "";//汇报材料附件

          this.hydjData.jzchry = "";//金智参会人员
          this.jzchry = [];
          this.jzchryCode = [];
        }
      }
    }
  };
</script>
<style scoped lang="scss">
.jzcyry{
 width:800px;border:1px solid #DCDFE6;border-radius:4px;padding:0 0 0 15px;
 overflow: hidden;
 .placeholder{
   color: rgb(206, 206, 206);
   font-size: 12px;
 }
 .el-tag{
   margin-right: 10px;
 }
 button{
   background: #F5F7FA;
   border:none;
   border-radius: 0;
   border-left: 1px solid #DCDFE6;
 }
}
</style>
