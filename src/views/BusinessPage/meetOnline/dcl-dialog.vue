<template>
  <div class="dialog-container">
    <el-dialog title="添加待处理事项" width="1000px" top="30px" :visible.sync="visible" :close-on-click-modal="false" @close="$emit('update:show', false)"
      :show="show">
      <div class="demand">
        <el-form style="width:950px;margin:0 auto" class="demo-ruleForm" :model="hydjData" :inline="true" size="mini"
          label-width="135px">
          
          <el-form-item label="待处理事项" required>
            <el-input size="mini" type="text" style="width:800px" placeholder="请输入待处理事项" v-model="hydjData.clsxmc"></el-input>
          </el-form-item>

          <el-form-item label="计划完成时间" required>
            <el-date-picker :clearable="false" size="mini" v-model="hydjData.jhwcsj"
              type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:800px;"></el-date-picker>
          </el-form-item>

          <el-form-item label="责任方" required>
             <el-checkbox-group v-model="zrf" @change="handleCheckZrf">
              <el-checkbox label="0">公司</el-checkbox>
              <el-checkbox label="1">学校</el-checkbox>
              <el-checkbox label="2">第三方</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="公司责任人" >
             <el-select v-model="gszrrData" filterable multiple  size="mini" placeholder="请选择公司责任人（可按姓名搜索）" style="width:800px" @change="handleChangeGsry">
              <el-option v-for="(item, index) in JzUserList" :key="index" :label="item.username" :value="item.userid+','+item.username"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="学校责任人" >
            <el-input size="mini" type="text" style="width:800px" placeholder="请填写学校责任人"  v-model="hydjData.xxzrr"></el-input>
          </el-form-item>
          
          <el-form-item label="第三方责任人" >
            <el-input size="mini" type="text" style="width:800px" placeholder="请填写第三方责任人"  v-model="hydjData.dsfzrr"></el-input>
          </el-form-item>

          <el-form-item label="关注人" >
             <el-select v-model="gzrData" filterable multiple  remote reserve-keyword :remote-method="remoteMethod" size="mini" placeholder="请选择关注人（可按姓名搜索）" style="width:800px" @change="handleChangeGzr">
              <el-option v-for="(item, index) in userList" :key="index" :label="item.username" :value="item.userid+','+item.username"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      

        <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
          <el-button size="small" type="primary" @click="handleCommit">保存</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { EventBus } from "@/utils/util.js";
  export default {
    data() {
      return {
        visible: this.show,

        JzUserList:[],
        userList:[],
        gszrrData:[],//公司责任人
        gzrData:[],//关注人
        zrf:[],
        hydjData: {
         clsxmc:"",
         jhwcsj:"",
         sfjzzr:"",//是否金智责任
         sfxxzr:"", //是否学校责任
         sfdsfzr:"",//是否第三方责任
         gszrrData:"",
         gzrData:"",
         xxzrr:"",
         dsfzrr:""
        },
       sxwid:this.matterWid
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
      },
      matterWid:{
        type:String,
        default:''  
      }
    },
    components: {},

    methods: {
      // 选择责任方
      handleCheckZrf(val){
        this.hydjData.sfjzzr = this.hydjData.sfxxzr =  this.hydjData.sfdsfzr = '';
        val.forEach(ele=>{
          if(ele == '0'){
            this.hydjData.sfjzzr = 1;
          }else if(ele == '1'){
            this.hydjData.sfxxzr = 1;
          }else if(ele == '2'){
            this.hydjData.sfdsfzr = 1;
          }
        })
      },
      // 公司人员
      handleChangeGsry(val){
        this.hydjData.gszrrData = val.join('|');
      },
      // 关注人
      handleChangeGzr(val){
        this.hydjData.gzrData = val.join('|');
      },
      remoteMethod(val){
        if(!val) return;
        this.getUsers('',100,val);
      },

      //提交待处理事项
      handleCommit() {

        this.hydjData.sm = $("#summernoteTT").summernote("code");
        if (!this.valiDate()) return;
        this.hydjData.wid = this.matterWid;
        this.hydjData.zbwid = this.wid;
        this.$post(this.API.saveDealtMatter, this.hydjData).then(res => {
          if (res.state == "success") {
            this.$message({message: "提交成功", type: "success"});
            EventBus.$emit('handleCommitDclsx','');
            this.visible = false;
          } else {
            this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
          }
        });
      },

    
      //  获取金智用户
      getUsers(unitType,pageSize,keyword) {
        this.$get(this.API.getUsers, {
          curPage: 1,
          pageSize: pageSize,
          unitType: unitType,
          keyword:keyword,
          dept:"01AM"
        }).then(res => {
          if (res.state == "success") {
            if(unitType == '0'){
              this.JzUserList = res.data.rows;
            }else if(!unitType){
              this.userList = res.data.rows;
            }
          } else {
            this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"});
          }
        });
      },
      // 获取待处理事项
      queryMatter() {
        this.zrf = [];
        this.$get(this.API.queryMatter, {
          matteWid: this.matterWid
        }).then(res => {
          if (res.state == "success") {
            this.hydjData.clsxmc = res.data.clsxmc;
            this.hydjData.jhwcsj = res.data.jhwcsj;

            this.hydjData.sfjzzr = res.data.sfjzzr;//是否金智责任
            this.hydjData.sfxxzr = res.data.sfxxzr; //是否学校责任
            this.hydjData.sfdsfzr = res.data.sfdsfzr;//是否第三方责任
            if(this.hydjData.sfjzzr == '1'){
              this.zrf.push('0');
            }
            if(this.hydjData.sfxxzr == '1'){
              this.zrf.push('1');
            }
            if(this.hydjData.sfdsfzr == '1'){
              this.zrf.push('2');
            }
            if(!!res.data.gszrr){
              this.gszrrData = res.data.gszrr.split('|');
            }else{
              this.gszrrData =  [];
            }
            if(!!res.data.gzr){
              this.gzrData = res.data.gzr.split('|');
            }else{
               this.gzrData = [];
            }
            this.hydjData.xxzrr = res.data.xxzrr; //学校责任人
            this.hydjData.dsfzrr = res.data.dsfzrr;//公司责任人
            this.hydjData.gszrrData = res.data.gszrr;
            this.hydjData.gzrData = res.data.gzr;
          } else {
          }
        });
      },

      valiDate() {
        if (/^[\s]*$/.test(this.hydjData.clsxmc)) {
          this.$message({
            message: "请填写待处理事项",
            type: "warning"
          });
          return false;
        }
        if (!this.hydjData.jhwcsj) {
          this.$message({
            message: "请选择计划完成时间",
            type: "warning"
          });
          return false;
        }
        if (!this.zrf.length) {
          this.$message({
            message: "请选择责任方",
            type: "warning"
          });
          return false;
        }
        return true;
      }
    },
    watch: {
      show() {
        this.visible = this.show;
        if (this.show) {
          if(!this.JzUserList.length){
             this.getUsers('0',9999,'');
          }

          if(!this.userList.length){
            this.getUsers('',100,'');
          }

          if(!!this.matterWid){
            this.queryMatter();
          }
        } else {
            this.zrf = [];
            this.gszrrData = [];//公司责任人
            this.gzrData = [];//关注人
            this.hydjData.clsxmc = "";
            this.hydjData.jhwcsj = "";
            this.hydjData.sfjzzr = "";//是否金智责任
            this.hydjData.sfxxzr = ""; //是否学校责任
            this.hydjData.sfdsfzr = "";//是否第三方责任
            this.hydjData.gszrrData = "";
            this.hydjData.gzrData = "";
            this.hydjData.xxzrr = "";
            this.hydjData.dsfzrr = "";
            this.hydjData.wid = "";
            this.hydjData.zbwid = "";
            this.$emit('handleCloseDcl','')
        }
      }
    }
  };
</script>
<style scoped lang="scss">
  .demand {
    padding: 10px 0;
  }

  div.el-form-item {
    margin-bottom: 8px !important;
  }


  .file {
    padding: 2px 6px;
    border-radius: 3px;
    margin-top: 4px !important;

    &:hover {
      background: rgba(216, 214, 214, 0.5);
    }

    i {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;

      &:hover {
        color: #f00;
        cursor: pointer;
        background: rgba(255, 0, 0, 0.25);
      }
    }
  }

  .cptree {
    position: absolute;
    top: 0;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    top: 40px;
    z-index: 10200;
    width: 325px;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: auto;
  }
</style>
