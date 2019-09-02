<template>
  <div style="padding:20px;">
    <div class="pannelPaddingBg-10">
      <h4 text-center class="filter-weight">[{{ $route.query.xmmc }}] 中标详情</h4>
      <div class="mg-12" text-right v-if="tbxxData.zbedite == 1">
        <el-button size="mini" type="primary" @click="handleChangeZbxx">修改中标信息</el-button>
      </div>
      <div>
        <p>
          <span class="filter-weight tips">投标说明：</span>
          {{ tbxxData.tbly }}
        </p>
      </div>
      <div>
        <p>
          <span class="filter-weight tips">分包费用：</span>
        </p>
        <table border width="100%" class="tb-table">
          <tr>
            <th>总金额（元）</th>
            <td width="30%">{{ fbxxData.zfy }}</td>
            <th>实施费用（元）</th>
            <td width="30%">{{ fbxxData.ssfy }}</td>
          </tr>
          <tr>
            <th>二开费用（元）</th>
            <td width="30%">{{ fbxxData.ekfy }}</td>
            <th>可变费用（元）</th>
            <td width="30%">{{ fbxxData.kbfy }}</td>
          </tr>
        </table>
      </div>
      <div>
        <p>
          <span class="filter-weight tips">投标费用：</span>
        </p>
        <table border width="100%" class="tb-table">
          <tr>
            <th>总金额（元）</th>
            <td width="30%">{{ tbxxData.zfy }}</td>
            <th>实施费用（元）</th>
            <td width="30%">{{ tbxxData.ssfy }}</td>
          </tr>
          <tr>
            <th>二开费用（元）</th>
            <td width="30%">{{ tbxxData.ekfy }}</td>
            <th>可变费用（元）</th>
            <td width="30%">{{ tbxxData.kbfy }}</td>
          </tr>
        </table>
      </div>
      <br />
      <div>
        <span class="filter-weight tips">团队成员：</span>
        <el-table :data="userData" border style="width: 100%">
          <el-table-column prop="usercode" label="工号" width="100"></el-table-column>
          <el-table-column prop="username" label="姓名" width="100"></el-table-column>
          <el-table-column prop="ywx" label="负责业务线"></el-table-column>
          <el-table-column prop="ssfy" label="分配实施金额"></el-table-column>
          <el-table-column prop="ekfy" label="分配二开金额"></el-table-column>
          <el-table-column prop="kbfy" label="分配可变金额"></el-table-column>
        </el-table>
      </div>
      <div>
        <span class="filter-weight tips" style="margin: 10px 0">团队分配：</span>
        <table width="100%" class="tb-table tdfp-table">
          <tr>
            <th>业务域</th>
            <th>合同内容</th>
            <th>占比</th>
            <th>说明</th>
            <th>项目类别</th>
            <th>责任人</th>
            <th>实施人月</th>
            <th>任职等级</th>
            <th>任职系数</th>
            <th>实施金额</th>
            <th>二开金额</th>
            <th>可变金额</th>
          </tr>
          <tr v-if="!ywyData.length || !ywyData">
            <td colspan="9" style="color:#909399;padding:15px 0 !important">暂无数据</td>
          </tr>
          <tr v-for="(item, index) in ywyData" :key="index">
            <td>{{ item.ywymc }}</td>
            <td>{{ item.cpmc }}</td>
            <td>{{ item.zb }}</td>
            <td>{{ item.htsm }}</td>
            <td>{{ item.xmlb }}</td>
            <td width="100px" style="position: relative;">{{ item.zrrxm }}</td>
            <td width="100px">{{item.tbssry}}</td>
            <td>{{ item.xmjldjmc }}</td>
            <td width="100px">{{ !item.xmjldjxs?'':item.xmjldjxs }}</td>
            <td width="80px">{{ item.ssfy }}</td>
            <td width="80px">{{ item.ekfy }}</td>
            <td width="80px">{{ item.kbfy }}</td>
          </tr>
        </table>
      </div>
      <div>
        <span class="filter-weight tips" style="margin: 10px 0">相关附件：</span>
        <p>
          <a
            v-if="!!fjmc"
            :href="baseUrl + 'attachment/downloadFile.do?fjId=' + tbxxData.fjwid"
            target="blank"
          >{{ fjmc }}</a>
          <span v-else>暂无附件</span>
        </p>
      </div>
    </div>

    <toubiaoDialog
      :show.sync="toubiaoShow"
      :title="'编辑投标信息'"
      :zbedite="'1'"
      :type="curType"
      :fbbh="$route.query.fbbh"
      :tbbh="$route.query.tbbh"
      @handleCommitToubiao="handleCommitToubiao"
    ></toubiaoDialog>
  </div>
</template>

<script>
import toubiaoDialog from "@/components/dialog/toubiao-dialog.vue";
import { tbxq } from "@/api/toubiao.js";

export default {
  data() {
    return {
      toubiaoShow: false,
      tbxxData: {},
      fbxxData: {},
      userData: [],
      ywyData: [],
      fjmc: "",
      baseUrl: "",
      curType: "edit"
    };
  },
  methods: {
    // 中标信息
    handleChangeZbxx() {
      this.toubiaoShow = true;
    },
    //提交成功
    handleCommitToubiao() {
	  this.toubiaoShow = false;
	  this.getTbxq();
    },

    getTbxq() {
      let userList = [];
      tbxq({ fbbh: this.$route.query.fbbh, tbbh: this.$route.query.tbbh }).then(
        ({ data }) => {
          if (data.state == "success") {
            this.ywyData = !data.data.htnrfy ? [] : data.data.htnrfy;
            this.fbxxData = !data.data.fbxx ? {} : data.data.fbxx;
            this.fjmc = data.data.fjmc;
            if (!!data.data.tbxx) {
              this.tbxxData = data.data.tbxx;
            }
            if (!!data.data.tdfy) {
              data.data.tdfy.forEach((ele, i, arr) => {
                userList.push({
                  username: ele.zrrxm,
                  usercode: ele.zrrbh,
                  ywx: ele.ywymc,
                  ssfy: ele.ssfy,
                  ekfy: ele.ekfy,
                  kbfy: ele.kbfy
                });
              });
              this.userData = userList;
            }
          }
        }
      );
    }
  },
  mounted() {
	this.baseUrl = window.baseurl;
	this.getTbxq();
  },
  components: { toubiaoDialog }
};
</script>

<style scoped>
.tb-table {
  border-collapse: collapse;
}
.tb-table th {
  background: #f5f7fa;
  color: #999;
  text-align: center;
  padding: 5px 0;
}
.tb-table th,
.tb-table td {
  border: 1px solid #ebeef5;
  text-align: center;
  padding: 5px 0 !important;
}
.tb-table td:nth-of-type(1) {
  padding: 0 10px;
}
.tb-table td input {
  width: 100%;
  padding: 5px;
}
.tips {
  display: inline-block;
  margin-bottom: 10px !important;
}
</style>
