<template>
  <div>
    <el-dialog title="服务状态" width="700px" top="30px" :visible.sync="visible" :append-to-body="true" :close-on-click-modal="false" @close="$emit('update:show', false)" :show="show">
      <div class="dialog-pz">
        <section class="pd-10 itemSet-group">
          <p>
            <span class="filter-weight before-require">项目服务状态：{{value?'启动':'停止'}}</span>
            <span>
              <el-switch v-model="value" active-color="#13ce66" inactive-color="#dcdfe6"></el-switch>
            </span>&#x3000;&#x3000;&#x3000;
            <span v-if="xmData.gcfwzt != '0'">
                <span class="filter-weight">到期时间:</span>
                <span>{{!xmData.ycfwqx?'无':xmData.ycfwqx}}</span>
            </span>
          </p>
          <p style="color:#999;font-size:12px;padding:0 7px" >
            <span>状态变更说明:</span>
            <span>{{!xmData.gcfwztsm?'无':xmData.gcfwztsm}}</span>
          </p>
          <!-- 未过保不显示 -->
          <p class="mg-12" v-if="fwqxShow && value">
            <span style="color:#999;font-size:12px;padding:0 7px" >
            注：当前服务期限：{{xmDetail.fwqx}}月&#x3000;服务开始日期：{{xmDetail.fwksrq}}&#x3000;当前到期时间: {{!xmData.ycfwqx?'无':xmDetail.ycfwqx}}&#x3000;最大延长时间：3个月
            </span><br>
            <span class="filter-weight before-require">项目服务期限：</span>
            <span>
              <el-date-picker :picker-options="pickerBeginDateBefore" v-model="ycfwqx" type="date" size="mini" style="width:220px" placeholder="选择日期" format="yyyy年MM月dd日" value-format="yyyy-MM-dd">
              </el-date-picker>
            </span>
          </p>
          <p>
            <span class="filter-weight before-require">{{value?'启动说明:':'停止说明:'}}</span>
            <span>
              <el-input type="textarea" :rows="4" :placeholder="value?'请输入启动说明:':'请输入停止说明:'" v-model="textarea">
              </el-input>
            </span>
          </p>
        </section>
        <section text-right class="pd-10">
          <el-button type="primary" size="mini" @click="handleCommit">保存</el-button>
          <el-button size="mini" @click="handleClose">取消</el-button>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { EventBus,GetMonthBefore,GetDateStr } from "../../utils/util.js"; //事件总线
export default {
  data() {
    return {
      visible: this.show,
      pickerBeginDateBefore:this.handleFormatDate(),
      // {
      //     disabledDate(time) {
      //       let curDate = (new Data()).getTime();
      //       let three = 90 * 24 * 3600 * 1000;
      //       let threeMonths = curDate + three;
      //       return time.getTime() < Date.now() || time.getTime() > threeMonths;
      //     }
      // },  
      xmData:{},
      value: false,
      textarea: "",
      ycfwqx: '',
      fwqx:'',//可选日期范围
      fwqxShow: false,
      times:'',

      // 记录更新
      fwztObj:{}
    };
  },
  methods: {
    // 格式化日期
    handleFormatDate() {
      let self = this;
      return {
        disabledDate(time) {
            let curDate = new Date().getTime();
            let three = 92 * 24 * 3600 * 1000;
            let threeMonths = curDate + three;
          return (
            // time.getTime() <  Date.now() || 
            time.getTime() > threeMonths
          )
        }
      };
    },
    handleCommit() {
      if (/^[\s]*$/.test(this.textarea)) {
        this.$alert("请填写停止说明", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.ycfwqx && this.fwqxShow && this.value) {
        this.$alert("请填写服务期限", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.fwztObj.ycfwqx = this.ycfwqx;
      this.fwztObj.sm = this.textarea;

      this.$confirm(
        this.value ? "您是否确定启动服务？" : "您是否确定停止服务？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$post(
            this.value
              ? this.API.startAfterSalesService
              : this.API.stopAfterSalesService,
            {
              xmbh: this.xmbh,
              sm: this.textarea,
              ycfwqx:this.value?this.ycfwqx:''
            }
          ).then(res => {
            if (res.state == "success") {
              this.$alert("保存成功", "提示", {confirmButtonText: "确定",type: "success",
              callback: action => {
                 EventBus.$emit("handleCommitSuccess",'');
                 if(this.value){
                   this.xmData.gcfwzt = ''
                 }else{
                   this.xmData.gcfwzt = '0'
                 }
              }});
              this.visible = false;
            }
          });
        })
        .catch(() => {});
    },
    handleClose() {
      this.visible = false;
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    xmbh: {
      type: String,
      default: false
    },
    xmDetail: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted(){
   
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!n) {
        // this.ycfwqx = ''
        this.textarea = "";
      } else {
        this.xmData = this.xmDetail;
        

        if(this.fwztObj.ycfwqx){
          this.xmData.ycfwqx = this.fwztObj.ycfwqx
        }
        if(this.fwztObj.sm){
          this.xmData.gcfwztsm = this.fwztObj.sm
        }


        if (this.xmData.gcfwzt == "0") {
          this.value = false;
        } else {
          this.value = true;
        }
        // 过保显示
        if(this.xmData.ztztmc == '已过保'){
          this.fwqxShow = true;
        }else{
          this.fwqxShow = false;
        }

        

        // 项目服务状态延长日期（2.21）;
        // if(!!this.xmDetail.ycfwqx){
        //   this.ycfwqx = GetMonthBefore(this.xmDetail.ycfwqx,3);
        //   this.fwqx = GetMonthBefore(this.xmDetail.ycfwqx,0); // 日期
        // }else{
          this.ycfwqx = GetMonthBefore(GetDateStr(0),3);
          this.fwqx = GetMonthBefore(GetDateStr(0),0); // 日期
        // }
        // else if(!!this.xmDetail.fwksrq && !this.xmDetail.ycfwqx){
        //   this.ycfwqx = GetMonthBefore(GetDateStr(0),3);
        //   this.fwqx = GetMonthBefore(GetDateStr(0),0); // 日期
        // }else{
        //   this.ycfwqx = GetMonthBefore(GetDateStr(0),Number(!this.xmDetail.fwqx?0:this.xmDetail.fwqx)+3);
        //   this.fwqx = GetMonthBefore(GetDateStr(0),Number(!this.xmDetail.fwqx?0:this.xmDetail.fwqx)); // 日期
        // }
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-pz {
  padding: 8px 10px;
}
</style>
