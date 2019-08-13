<template>
  <div class="dialog-container">
    <el-dialog title="添加服务计划" width="1000px" top="30px" :visible.sync="visible" :close-on-click-modal="false" @close="$emit('update:show', false)"
      :show="show">
      <div class="demand">
        <el-form style="width:950px;margin:0 auto" class="demo-ruleForm" :model="fwdjData" :inline="true" size="mini"
          label-width="135px">
          <el-form-item label="服务类型" required>
              <el-input placeholder="请选择" readonly v-model="fwdjData.dwmc" style="width:800px" >
                <el-button slot="append" icon="el-icon-circle-plus-outline" @click="schoolShow = true"></el-button>
              </el-input>
          </el-form-item>
          <el-form-item label="项目名称" required>
            <el-input size="mini" type="text" style="width:325px" placeholder="请输入提报人姓名" v-model="fwdjData.xmmc"></el-input>
          </el-form-item>
          <el-form-item label="项目编号" required>
            <el-input size="mini" type="text" style="width:325px" placeholder="请输入提报联系方式"  v-model="fwdjData.xmbh"></el-input>
          </el-form-item>

          <el-form-item label="计划开始日期" required>
            <el-date-picker :picker-options="pickerBeginDateBefore" :clearable="false" size="mini" v-model="fwdjData.jhksrq"
              type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:325px;"></el-date-picker>
          </el-form-item>

           <el-form-item label="计划结束日期" required>
            <el-date-picker :picker-options="pickerBeginDateBefore" :clearable="false" size="mini" v-model="fwdjData.jhjsrq"
              type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:325px;"></el-date-picker>
          </el-form-item>

 

          <el-form-item label="服务阶段" required>
            <el-select v-model="fwdjData.fwjd" size="mini" placeholder="请选择服务阶段" style="width:325px">
              <el-option v-for="(item, index) in fwqqlyList" :key="index" :label="item.mc" :value="item.label"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="服务项" required>
            <el-select v-model="fwdjData.fwx" size="mini" placeholder="请选择信息系统" style="width:325px" @change="handleChangeYyxt">
              <el-option v-for="(xxxt, index) in xxxtList" :key="index" :label="xxxt.yymc" :value="xxxt.yybh"></el-option>
            </el-select>
          </el-form-item>


        <div style="text-align:right;width:100%;margin:10px 0;padding:0 20px;">
          <el-button size="small" type="primary" @click="handleCommit">确认提交</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import uploadFile from "@/components/BusinessPage/upload.vue";


  export default {
    data() {
      return {
        tbrbmShow:false,
        schoolShow:false,
        userInfo:{},
        visible: this.show,
        isClearFile: false, //清除附件
        unitList:[],
        wtjbList:[{mc:'一般',label:'0'},{mc:'紧急',label:'1'},{mc:'宕机',label:'2'}], // 问题级别
        xxxtList:[], // 信息系统
        fwqqlyList:[], // 服务请求来源

        xqflList: [],
        sfxsList: [{
            mc: "是",
            label: "1"
          },
          {
            mc: "否",
            label: "0"
          }
        ], //是否线上
        fwznfjMc: "", //编辑附件名称
        fwdjData: {
          xmmc:"",
          xmbh:"",
          jhksrq:"",
          jhjsrq:"",
          jzzrrxm:"",
          jzzrrbh:"",
          xxzrrxm:"",
          xxzrrbh:"",
          fwjd:"",
          fwx:"",
          fwnr:""
        },
        pickerBeginDateBefore: {
          disabledDate(time) {
            let curDate = new Date().getTime();
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      };
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    components: {
      uploadFile
    },
    methods: {

      // 更换应用系统
      handleChangeYyxt(val){
        if(!val)  return;
				let obj = {};
				obj = this.xxxtList.find((item)=>{
				    return item.yybh === val;
				});
        this.fwdjData.yymc = obj.yymc; //应用名称
        this.fwdjData.cjdw = obj.cjdw;
        this.fwdjData.cjdwbh = obj.cjdwbh;
        this.fwdjData.dwlxr = obj.dwlxr;
        this.fwdjData.dwlxrgh = obj.dwlxrgh;
        this.fwdjData.dwlxfs = obj.dwlxfs;
      },
      // 更换单位
			handleCommitSchool(data){
        if(!data) return;
        this.fwdjData.dwbh = data.wid;
        this.fwdjData.dwmc = data.mc;
        this.fwdjData.bmmc = '';
        this.schoolShow = false;
			},

      // 上传附件
      handleUploadFile(data) {
        this.fwznfjMc = "";
        if (!!data.length) {
          this.fwdjData.fjStr = data[0];
        } else {
          this.fwdjData.fjStr = "";
        }
      },

      //提交需求
      handleCommit() {
        this.fwdjData.sm = $("#summernoteTT").summernote("code");
        if (!this.valiDate()) return;
        this.$post(this.API.saveServiceDesk, this.fwdjData).then(res => {
          if (res.state == "success") {
            this.$message({
              message: "提交成功",
              type: "success"
            });
            $("#summernoteTT").summernote("code", "");
            this.isClearFile = !this.isClearFile;
            this.visible = false;
            this.$emit("handleCommitFwdj",'');
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        });
      },

      // 获取信息系统
      getApp(bmbh){
        this.$get(this.API.appSelect,{
          bmbh:bmbh
        }).then(res=>{
          if(res.state == 'success'){
            this.xxxtList = res.data;
          }else{}
        })
      },

      valiDate() {
        if (!this.fwdjData.dwmc) {
          this.$message({
            message: "请选择学校",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.tbr) {
          this.$message({
            message: "请输入提报人姓名",
            type: "warning"
          });
          return false;
        }
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.fwdjData.lxfs) || !(/^1[3|4|5|6|7|8|9]\d{9}$/.test(this.fwdjData.lxfs))) {
          this.$message({
            message: "请填写正确提报人联系方式",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.bmmc) {
          this.$message({
            message: "请选择提报人部门",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.tbsj) {
          this.$message({
            message: "请选择提报时间",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.qqly) {
          this.$message({
            message: "请选择服务请求来源",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.yymc) {
          this.$message({
            message: "请选择信息系统",
            type: "warning"
          });
          return false;
        }

        if (!this.fwdjData.wtjb) {
          this.$message({
            message: "请选择问题级别",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.bt) {
          this.$message({
            message: "请填写标题",
            type: "warning"
          });
          return false;
        }
        if (!this.fwdjData.sm || this.fwdjData.sm == "<p><br></p>") {
          this.$message({
            message: "请填写需求内容",
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
          this.$nextTick(() => {
            $("#summernoteTT").summernote({
              dialogsInBody: true,
              placeholder: "请输入内容",
              focus: true,
              height: 200,
              width: 100 + "%",
              minHeight: 300,
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

          this.userInfo = JSON.parse(sessionStorage.getItem('userInfo')); 
          if(this.userInfo.unitType != '0'){
            this.fwdjData.dwbh = this.userInfo.unitnum;
            this.fwdjData.dwmc = this.userInfo.unit;
          }
        } else {}
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

  .demand-textarea {
    width: 950px;
    margin: 0 auto;
  }

  .demand-textarea>p {
    width: 125px;
    text-align: right;
    padding-right: 12px;
    font-weight: 700;
  }

  .demand-textarea>p::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
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

</style>
