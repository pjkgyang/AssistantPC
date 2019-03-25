<template>
  <div>
    <div class="vertical-steps" :style="{maxHeight:maxHeight+'px'}">
      <div :class="{'vertical-step__item':true,'done':true}" v-for="(process,index) in jdList" :key="index">
        <p>
          <span class="filter-weight">{{process.czrxm}}</span> &#x3000;
          <span>{{process.cjsj}}</span> &#x3000;
          <span>
            <el-tag v-if="!zjlbShow" size="mini" :type="process.czlx == 0||process.czlx == 1||process.czlx == 4||process.czlx == 5 ? 'primary':process.czlx == 3||process.czlx == 6 ? 'danger':'success'" disable-transitions>{{process.czlxmc}}</el-tag>
            <el-tag v-if="zjlbShow"  size="mini" :type="process.czlx == 2 ? 'danger':'success'" disable-transitions>{{process.czlxmc}}</el-tag>&#x3000;
            <el-tag size="mini" v-if="process.czlx == '3'" :type="process.gjzt==1?'':process.gjzt==2?'success':'info'">{{process.gjzt==1?'改进中':process.gjzt=='2'?'改进完成':'未改进'}}</el-tag>&#x3000;
          </span>&#x3000;
          <span class="oprate-btn" v-if="process.czlx == '3'">
            <el-button size="mini" type="primary" @click="handleCpgj(process,'gj')">文档改进</el-button>
            <el-button size="mini" type="primary" @click="handleCpgj(process,'jl')">文档改进记录</el-button>
          </span>
         </p>
         <p><span class="filter-weight">内容：</span><span style="color:#999;" v-html="process.cznr"></span></p>
         <p v-if="process.czlx == '3'">
           <span class="filter-weight">改进说明：</span><span style="color:#999;">{{!process.gjsm?'无':process.gjsm}}</span>
        </p>
      </div>
    </div>

    <wdgjDialog :show.sync="wdgjShow" :data="data" @handleCommit="handleCommit"></wdgjDialog>
    <gjjlDialog :show.sync="gjjlShow" :wid="data.wid"></gjjlDialog>
  </div>
</template>

<script>
import wdgjDialog from "@/components/dialog/resource/filegj-dialog.vue";
import gjjlDialog from "@/components/dialog/resource/gjjl-dialog.vue";
export default {
  data() {
    return {
      cpShow: false,
      wdgjShow: false,
      gjjlShow: false,
      data: {},
      maxHeight: window.innerHeight - 280
    };
  },
  props: {
    jdList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    zjlbShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 文档改进提交
    handleCommit(data) {
      this.$post(this.API.addFjGjjh, {
        wid: this.data.wid,
        zt: data.gjzt,
        gjsm: data.sm
      }).then(res => {
        if (res.state == "success") {
          this.wdgjShow = !this.wdgjShow;
          this.$alert("保存成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$emit("handleCommit", "");
            }
          });
        }
      });
    },
    handleCpgj(data, params) {
      this.data = data;
      if (params == "gj") {
        this.wdgjShow = !this.wdgjShow;
      } else {
        this.gjjlShow = !this.gjjlShow;
      }
    }
  },
  watch: {},
  components: { wdgjDialog, gjjlDialog }
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
.vertical-step__item > p {
  vertical-align: top;
  display: flex;
}
.oprate-btn button {
  padding: 4px 10px;
}
</style>
