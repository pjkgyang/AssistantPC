<template>
    <div>
        <div>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane :label="'全部('+100+')'" name="all"></el-tab-pane>
                <el-tab-pane :label="'上传('+10+')'" name="upload"></el-tab-pane>
                <el-tab-pane :label="'下载('+20+')'" name="download"></el-tab-pane>
                <el-tab-pane :label="'好评('+30+')'" name="praise"></el-tab-pane>
                <el-tab-pane :label="'差评('+40+')'" name="notpraise"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <el-table :data="jdList" style="width: 100%" :max-height="tableHeight">
                <el-table-column prop="xm" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="rq" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="tag" label="类型" width="100">
                    <template slot-scope="scope">
                        <el-tag size="small" :type="scope.row.type == 1||scope.row.type == 3 ? 'primary':scope.row.type == 4 ? 'danger':'success'" disable-transitions>{{scope.row.type==1?'下载':scope.row.type==2?'好评':'差评'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="wjmc" label="上传/下载文件" width="160">
                </el-table-column>
                <el-table-column prop="sm" label="说明">
                </el-table-column>
            </el-table>
        </div>
        <div text-right>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!-- <div class="vertical-steps">
            <div :class="{'vertical-step__item':true,'done':true}" v-for="(process,index) in jdList" :key="index">
                <p>{{process.xm}}&#x3000;{{process.rq}}&#x3000;{{process.type}}</p>
                <p>{{process.sm}}</p>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      jdList: [
        {
          jdmc: "ceshi",
          xm: "张三",
          type: 1,
          rq: "2018-08-08",
          sm: "好评好评",
          wjmc: "11111.text"
        },
        {
          jdmc: "ceshi",
          xm: "张三啊",
          type: 2,
          rq: "2018-08-08",
          sm: "好评好评",
          wjmc: "1112222.text"
        },
        {
          jdmc: "ceshi",
          xm: "张三啊",
          type: 3,
          rq: "2018-08-08",
          sm: "好评好评",
          wjmc: "1112222.text"
        },
        {
          jdmc: "ceshi",
          xm: "张三啊",
          type: 4,
          rq: "2018-08-08",
          sm: "好评好评",
          wjmc: "1112222.text"
        }
      ],
      activeName: "all",
      tableHeight: window.innerHeight - 260
    };
  },
  props:{
    currentPage:{
        type:Number,
        default:1
    },
    pageSize:{
        type:Number,
        default:15
    },
    total:{
      type:Number,
      default:0  
    }
  },
  methods: {
    handleClick() {},
    handleSizeChange(data){
        this.$emit('hadnleChange',data,'size');
    },
    handleCurrentChange(data){
        this.$emit('hadnleChange',data,'cur');
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
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
  top: 0;
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
  top: 0;
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
</style>
