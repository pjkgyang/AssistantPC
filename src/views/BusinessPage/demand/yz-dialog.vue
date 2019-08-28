<template>
  <div>
    <el-dialog
      title="完成验证"
      width="700px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-pj">
        <section>
          <p>
            <span class="filter-weight before-require">提报老师：</span>
            <el-select
              v-model="teacherData"
              size="mini"
              multiple
              filterable
              placeholder="请选择提出老师(可按姓名搜索)"
              style="width:595px"
              @change="handleChangeTcls"
            >
              <el-option
                v-for="(tcls, index) in tclsList"
                :key="index"
                :label="tcls.username"
                :value="tcls.userid+','+tcls.username"
              ></el-option>
            </el-select>
          </p>
          <p class="mg-12">
            <span class="filter-weight before-require">是否会签：</span>
            <el-radio-group v-model="filterData.sfhq">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </p>
          <p flex class="mg-12">
            <span class="filter-weight before-require">开发质量：</span>
            <el-rate v-model="filterData.kfzl" :texts="texts" show-text></el-rate>
          </p>
          <p flex>
            <span class="filter-weight before-require">服务质量：</span>
            <el-rate v-model="filterData.fwzl" :texts="texts" show-text></el-rate>
          </p>
          <p flex class="mg-12">
            <span class="filter-weight before-require">响应速度：</span>
            <el-rate v-model="filterData.xysd" :texts="texts" show-text></el-rate>
          </p>
          <p class="pj-content">
            <span class="filter-weight before-require">内容：</span>
            <el-input
              v-model="filterData.nr"
              type="textarea"
              :rows="5"
              :maxlength="500"
              style="width:680px"
              placeholder="请输入备注内容"
            ></el-input>
          </p>
          <p class="pj-content">
            <span class="filter-weight before-require">crowd评价说明：</span>
            <el-input
              v-model="filterData.crowdpjsm"
              type="textarea"
              :rows="5"
              :maxlength="500"
              style="width:680px"
              placeholder="请输入crowd评价说明"
            ></el-input>
          </p>
        </section>
        <section class="pj-btn-group">
          <el-button size="small" type="primary" @click="handleClickSure">确定</el-button>
          <el-button size="small" @click="visible = false">取消</el-button>
        </section>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: this.show,
      isClearFile: false,
      texts: ["1分", "2分", "3分", "4分", "5分"],
      tclsList: [],
      teacherData: [],
      filterData: {
        nr: "",
        qrls: "",
        sfhq: 1,
        kfzl: 5,
        fwzl: 5,
        xysd: 5,
        crowdpjsm: ""
      }
    };
  },
  methods: {
    // 选择提出老师
    handleChangeTcls(val) {},
    handleClickSure() {
      this.filterData.btnbh = this.btnbh;
      this.filterData.zbwid = this.zbwid;
      this.filterData.qrls = this.teacherData.join("|");

      if (!this.validate()) return;
      this.$post(this.API.projectTeamVerifyDvpt, this.filterData).then(res => {
        if (res.state == "success") {
          this.$emit("handleClickSure", "");
          this.$message({ message: "保存成功", type: "success" });
          this.visible = false;
          this.filterData.nr = "";
          this.filterData.qrls = "";
          this.filterData.sfhq = 1;
          this.filterData.kfzl = 5;
          this.filterData.fwzl = 5;
          this.filterData.xysd = 5;
          this.filterData.crowdpjsm = "";
        } else {
        }
      });
    },

    validate() {
      if (!this.filterData.qrls) {
        this.$alert("请选择确认老师", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (/^[\s]*$/.test(this.filterData.nr)) {
        this.$alert("请填写内容", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      if (/^[\s]*$/.test(this.filterData.crowdpjsm)) {
        this.$alert("请填写crowd评价说明", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return false;
      }
      return true;
    },

    getUsers() {
      this.teacherData = [];
      this.$get(this.API.getUsers, {
        curPage: 1,
        pageSize: 999,
        xmbh: this.xmbh,
        unitType: 1
      }).then(res => {
        if (res.state == "success") {
          this.tclsList = res.data.rows;
          this.candidateConfirmPersons();
        } else {
        }
      });
    },

    candidateConfirmPersons() {
      this.$get(this.API.candidateConfirmPersons, {
        zbwid: this.zbwid
      }).then(res => {
        if (res.state == "success") {
          this.tclsList.forEach(ele => {
            res.data.forEach(element => {
              if (ele.userid == element) {
                this.teacherData.push(ele.userid + "," + ele.username);
              }
            });
          });
        } else {
        }
      });
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    zbwid: {
      type: String,
      default: ""
    },
    btnbh: {
      type: String,
      default: ""
    },
    xmbh: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
        this.getUsers();
      } else {
      }
    }
  },
  components: {}
};
</script>

<style scoped>
.dialog-pj {
  padding: 8px 10px;
}

.dialog-pj section:nth-of-type(2) {
  margin: 10px 0;
}

.pj-title {
  font-weight: 700;
  width: 14%;
}

.pj-content {
  width: 86%;
}

.pj-btn-group {
  text-align: right;
  padding: 10px 0;
}
</style>
