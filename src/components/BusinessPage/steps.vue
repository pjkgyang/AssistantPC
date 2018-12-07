<template>
  <div>
    <div class="vertical-steps">
      <div :class="{'vertical-step__item':true,'done':true}" v-for="(process,index) in jdList" :key="index">
        <p>
          <span class="filter-weight">{{process.czrxm}}</span> &#x3000;
          <span>{{process.cjsj}}</span> &#x3000;
          <span>
            <el-tag size="mini" :type="process.czlx == 0||process.czlx == 1||process.czlx == 4||process.czlx == 5 ? 'primary':process.czlx == 3 ? 'danger':'success'" disable-transitions>{{process.czlxmc}}</el-tag>
          </span>
          <p>内容：<span style="color:#999;">{{process.cznr}}</span></p>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  components: {}
};
</script>

<style scoped>
.vertical-steps {
  padding-left: 30px;
  margin-top: 20px;
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
</style>
