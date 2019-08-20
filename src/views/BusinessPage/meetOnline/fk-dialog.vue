<template>
  <div class="dialog-container">
    <el-dialog title="会议登记" width="1000px" top="30px" :visible.sync="visible" :close-on-click-modal="false" @close="$emit('update:show', false)"
      :show="show">
      <div class="demand mg-12">
        <el-form style="width:950px;margin:0 auto" class="demo-ruleForm" :model="formData" :inline="true" size="mini"
          label-width="135px">

          <el-form-item label="完成状态" required>
            <el-select v-model="formData.wczt" size="mini" placeholder="请选择会议形式" style="width:325px">
              <el-option v-for="(item, index) in wcztList" :key="index" :label="item.mc" :value="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计划完成时间" required>
            <el-date-picker  :clearable="false" size="mini" v-model="formData.jhwcsj"
              type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width:325px;"></el-date-picker>
          </el-form-item>


           <el-form-item label="反馈说明" >
                 <div style="width:800px">
                    <div id="summernoteFk"></div>
                 </div>
            </el-form-item>

             <el-form-item >
                 <div text-right style="width:940px;">
                    <el-button size="small" type="primary" @click="handleCommit">保存</el-button>
                    <el-button size="small" @click="visible = false">取消</el-button>
                 </div>
            </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chooseItemShow:false,
        visible: this.show,

        wcztList:[
          { mc: "未完成", label: '0' },
          { mc: "已完成", label: '1' },
        ], 
        fjList:[], //编辑附件名称
        formData: {
            wczt:"",
            jhwcsj:"",
            fksm:""
        }
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
    components: {},
    methods: {

      //提交需求
      handleCommit() {
        this.formData.fksm = $("#summernoteFk").summernote("code");
        if (!this.valiDate()) return;
        this.formData.sxwid = this.$route.query.wid;
        this.$post(this.API.saveMatterFeedback, this.formData).then(res => {
          if (res.state == "success") {
            this.$message({message: "提交成功",type: "success"});
            $("#summernoteFk").summernote("code", "");
            this.formData.wczt = "";
            this.formData.jhwcsj = "";
            this.formData.fksm = "";
            this.visible = false;
            this.$emit("handleCommitFk",'');
          } else {
            this.$alert(res.msg, "提示", {confirmButtonText: "确定",type: "error"}); 
          }
        });
      },

      valiDate() {
        if (!this.formData.wczt) {
          this.$message({
            message: "请选择完成状态",
            type: "warning"
          });
          return false;
        }
        if (!this.formData.jhwcsj) {
          this.$message({
            message: "请选择计划完成时间",
            type: "warning"
          });
          return false;
        }
        if (!this.formData.fksm || this.formData.fksm == "<p><br></p>") {
          this.$message({
            message: "请填写反馈说明",
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
            $("#summernoteFk").summernote({
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
        } else {
       
        }
      }
    }
  };
</script>
<style scoped lang="scss">
 
</style>
