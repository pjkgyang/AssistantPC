<template>
    <div>
        <div class="vertical-steps" :style="{maxHeight:maxHeight+'px'}">
            <div :class="{'vertical-step__item':true,'done':true}" v-for="(process,index) in jdList" :key="index">
                <p>
                    <span class="filter-weight">{{process.czrxm||process.cjrxm}}</span> &#x3000;
                    <span>{{process.cjsj}}</span> &#x3000;
                    <span v-if="!type">
                        <el-tag size="mini" :type="process.zt == 1 ? '':process.zt == 2?'success':'info'" disable-transitions>{{process.zt==1?'改进中':process.zt==2?'改进完成':'未改进'}}</el-tag>
                    </span>
                    <span v-else>
                        <el-tag size="mini" :type="process.zt == 1|| process.zt == 2?'primary':'success'" disable-transitions>{{process.zt==1?'建议中':process.zt==2?'处理中':'已补充'}}</el-tag>
                    </span>
                    <p>
                        <span class="filter-weight">内容：</span>
                        <span style="color:#999;" v-html="process.cznr||process.clsm"></span>
                    </p>
            </div>
        </div>
     
    </div>
</template>

<script>
export default {
  data() {
    return {
      maxHeight: window.innerHeight - 240
    };
  },
  props: {
    jdList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    type:{
      type:String,
      default:''
    }
  },
  methods: {},
  watch: {},
  components: {}
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
</style>
