<template>
  <div>
    <div class="vertical-steps" :style="{maxHeight:maxHeight+'px'}">
      <div :class="{'vertical-step__item':true,'done':true}" v-for="(process,index) in jdList" :key="index">
        <p>
          <span class="filter-weight">{{process.cjrxm}}</span> &#x3000;
          <span>{{process.cjsj}}</span> &#x3000;
          <span>
              <el-tag size="mini" :type="process.dqzt==1||process.dqzt==2?'primary':'success'">{{process.dqzt==1?'建议中':process.dqzt==2?'处理中':'已补充'}}</el-tag>
          </span>&#x3000;
          <span class="oprate-btn">
              <el-button  v-if="userTag.includes('NLPXZJ')" size="mini" type="primary" @click="handleOperate('cljy',process.wid)">建议处理</el-button>
              <el-button size="mini" type="primary" @click="handleOperate('cljl',process.wid)">处理记录</el-button>
          </span>
         </p>
         <p><span class="filter-weight">内容：</span><span style="color:#999;" v-html="process.jynr"></span></p>
         <p><span class="filter-weight">处理说明：</span><span style="color:#999;" v-html="process.dqclsm"></span></p>
      </div>
    </div>

    <gjjyDialog :show.sync="gjjyShow"  @handleCommit="handleCommit"></gjjyDialog>
    <gjjlDialog :show.sync="gjjlShow" :wid="wid" :type="'jyjl'"></gjjlDialog>
  </div>
</template>

<script>
import gjjyDialog from '@/components/dialog/resource/gjjy-dialog.vue';
import gjjlDialog from '@/components/dialog/resource/gjjl-dialog.vue';
export default {
  data() {
    return {
       cpShow:false,
       gjjyShow:false,
       gjjlShow:false,
       maxHeight:window.innerHeight - 280,
       userTag:'',
       wid:""
    };
  },
  props:{
    jdList: {
      type: Array,
      default: () => {
        return [];
      }
    },
  },
  mounted(){
    this.userTag = JSON.parse(sessionStorage.getItem('userInfo')).userGroupTag;
  },
  methods:{
    handleOperate(data,params){
        this.wid = params;
        if(data == 'cljy'){
           this.gjjyShow = !this.gjjyShow; 
        }else{
           this.gjjlShow = !this.gjjlShow
        }
    },
    // 文档改进提交
    handleCommit(data){

        this.$post(this.API.replyFeedback,{
            zbwid:this.wid,
            nr:data.sm,
            zt:data.zt
        }).then(res=>{
            if(res.state == 'success'){
                this.gjjyShow = !this.gjjyShow; 
                this.$message({
                    message: '提交成功~',
                    type: 'success'
                });
                this.$emit('handleSucess','')
            }else{
                this.$alert(res.msg, "提示", {confirmButtonText: "确定",type:'error'});
            }
        })
    },
    handleCpgj(data,params){

    }
  },
  watch:{

  },
  components: {gjjyDialog,gjjlDialog}
};
</script>

<style lang="scss" scoped>
.vertical-steps {
  padding-left: 30px;
  margin-top: 20px;
  overflow-y: auto;
}
.vertical-step__item {
  min-height: 32px;
  padding-bottom: 10px;
  position: relative;
}
.vertical-step__item:before {
  content: "";
  position: absolute;
  left: -24px;
  top: 5px;
  width: 1px;
  height: 100%;
}
.vertical-step__item:last-child:before {
  width: 0px;
}
.vertical-step__item:after {
  content: "";
  position: absolute;
  left: -30px;
  top: 4px;
  width: 14px;
  border-radius: 50%;
  height: 14px;
}
.vertical-step__item.done:before {
  background: #409eff;
}
.vertical-step__item.todo:before {
  background: #c0c4cc;
}
.vertical-step__item.done:after {
  background: #409eff;
}
.vertical-step__item.todo:after {
  background: #c0c4cc;
}
.vertical-step__item >p{
  vertical-align: top;
  display: flex;
}
.oprate-btn button{
    padding: 4px 10px;
}
</style>
