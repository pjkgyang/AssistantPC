<template>
  <div>
    <el-dialog
      :title="title"
      width="1100px"
      top="30px"
      :visible.sync="visible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <div class="dialog-pj">
        <div style="padding:0 20px;">
          <div style="margin:10px 0;position:relative;">
            <span class="filter-weight">投标说明：</span>
            <el-input type="textarea" maxlength="200" resize="none" v-model="tbly" rows="3"></el-input>
            <span style="position:absolute;bottom:0;right:10px;font-size:12px;">
              <span
                :class="{ 'max-length':!!tbly?tbly.length>=200:false  }"
              >( {{!!tbly?tbly.length:0 }}</span>
              / 200 )
            </span>
          </div>
          <div>
            <span class="filter-weight">分包费用：</span>
            <table border width="100%" class="tb-table tdfp-table">
              <tr>
                <th>总金额（元）</th>
                <td width="30%">{{ fbxx.zfy }}</td>
                <th>实施费用（元）</th>
                <td width="30%">{{ fbxx.ssfy }}</td>
              </tr>
              <tr>
                <th>二开费用（元）</th>
                <td width="30%">{{ fbxx.ekfy }}</td>
                <th>可变费用（元）</th>
                <td width="30%">{{ fbxx.kbfy }}</td>
              </tr>
            </table>
          </div>
          <div>
            <span class="filter-weight">投标费用：</span>
            <table border width="100%" class="tb-table tdfp-table">
              <tr>
                <th>总金额（元）</th>
                <td
                  width="30%"
                >{{ Number(ssfyTotalkm) + Number(ekfyTotalkm) + Number(kbfyTotalkm) }}</td>
                <th>实施费用（元）</th>
                <td width="30%">{{ Math.floor(Number(ssfyTotalkm) * 100) / 100 }}</td>
              </tr>
              <tr>
                <th>二开费用（元）</th>
                <td width="30%">{{ Math.floor(Number(ekfyTotalkm) * 100) / 100 }}</td>
                <th>可变费用（元）</th>
                <td width="30%">{{ Math.floor(Number(kbfyTotalkm) * 100) / 100 }}</td>
              </tr>
            </table>
          </div>
          <br />
          <div>
            <span class="filter-weight">团队成员：</span>
            <div style="margin: 10px 0">
              <el-button size="mini" type="primary" @click="handleAddUser">添加成员</el-button>
            </div>
            <el-table :data="userData" border style="width: 100%">
              <el-table-column fixed="left" label="操作" width="80">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="hanldeDelete(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="usercode" label="工号" width="100"></el-table-column>
              <el-table-column prop="username" label="姓名" width="100"></el-table-column>
              <el-table-column prop="ywx" label="负责业务线"></el-table-column>
              <el-table-column prop="ssfy" label="分配实施金额">
                <template slot-scope="scope">
                  <span>{{ Math.floor(Number(scope.row.ssfy) * 100) / 100}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="ekfy" label="分配二开金额"></el-table-column>
              <el-table-column prop="kbfy" label="分配可变金额"></el-table-column>
            </el-table>
          </div>
          <div>
            <span class="filter-weight" style="margin: 10px 0">团队分配：</span>
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
              <tr v-if="!ywyData.length">
                <td colspan="9" style="color:#909399;padding:15px 0 !important">暂无数据</td>
              </tr>
              <tr v-for="(item, index) in ywyData" :key="index">
                <td>{{ item.ywymc }}</td>
                <td>{{ item.cpmc }}</td>
                <td>{{ item.zb }}</td>
                <td>{{ item.htsm }}</td>
                <td>{{ item.xmlb }}</td>
                <td width="100px" style="position: relative;">
                  <el-select
                    v-model="item.zrrbh"
                    size="mini"
                    placeholder="请选择"
                    style="border: none;"
                    @change="handleSeleteUser($event,index)"
                  >
                    <el-option
                      v-for="(item, index) in userData"
                      :key="index"
                      :label="item.username"
                      :value="item.usercode"
                    ></el-option>
                  </el-select>
                </td>
                <td width="80px">
                   <input
                    type="number"
                    v-model="item.tbssry"
                    @input="handleChangefy(index, 'ssry', item.zrrbh)"
                  />
                </td>
                <td>{{ item.xmjldjmc }}</td>
                <td>{{ !item.xmjldjxs?'':item.xmjldjxs }}</td>
                <td width="80px">
                  <input
                    type="number"
                    v-model="item.ssfy"
                    @input="handleChangefy(index, 'ss', item.zrrbh)"
                  />
                </td>
                <td width="80px">
                  <input
                    type="number"
                    v-model="item.ekfy"
                    @input="handleChangefy(index, 'ek', item.zrrbh)"
                  />
                </td>
                <td width="80px">
                  <input
                    type="number"
                    v-model="item.kbfy"
                    @input="handleChangefy(index, 'kb', item.zrrbh)"
                  />
                </td>
              </tr>
            </table>

            <br />
            <div>
              <span class="filter-weight" style="margin: 10px 0">项目文件：</span>
              <uploadComponent @handleUploadFile="handleUploadFile" :istb="istbMark"></uploadComponent>
              <p class="upload_file-p" v-if="!!fileName" flex colcenter spacebetween>
                <span>{{ fileName }}</span>
                <i class="el-icon-close" @click="handleDeleteFile"></i>
              </p>
            </div>
          </div>
        </div>
        <div style="margin:10px 0;text-align:right;padding:10px 20px;">
          <button class="tbcommit" @click="handleCommit">提交</button>
        </div>
      </div>
    </el-dialog>

    <userDialog :show.sync="userShow" :isdept="false" :xmjldj="'1'" @addUserSuccess="addUserSuccess"></userDialog>
  </div>
</template>

<script>
import { queryXmTbxx, queryFbxx, tbxq, saveTbxx } from "@/api/toubiao.js";
import userDialog from "@/components/dialog/user-dialog.vue";
import uploadComponent from '@/components/BusinessPage/upload.vue';

export default {
  data() {
    return {
      visible: this.show,
      userShow:false,
      tbly: "", //投标理由

      userData: [], //团队成员
      userList:[],//用户列表
      ywyData: [], //业务域列表

      ssfyTotal: 0,
      ywxArr: [],
      ekfyTotal: 0,
      kbfyTotal: 0,

      ssfyTotalkm: 0,
      ekfyTotalkm: 0,
      kbfyTotalkm: 0,

      fileList: [],
      tbxx: {}, //投标信息
      fbxx: {}, //分包信息
      fileName: "", //附件名称
      userInfo: {},

      userYwyData: [],
      istbMark: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    fbbh: {
      type: String,
      default: ""
    },
    tbbh:{
      type: String,
      default: ""  
    },
    zbedite:{
      type: String,
      default: ""  
    },
    type:{
      type:String,
      default:'tb'
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    handleAddUser() {
      this.userShow = true;
    },
    // 添加成员
    addUserSuccess(data) {
      let i = false;
      let userObj = data;
      data.ssfy = 0;
      data.ekfy = 0;
      data.kbfy = 0;
      if (!this.userData.length) {
        this.userData.push(data);
      } else {
        this.userData.forEach(ele => {
          if (ele.usercode == data.usercode) {
            i = true;
            this.$message({
              message: "该用户已添加~",
              type: "warning"
            });
          }
        });
        if (!!i) {
          return;
        } else {
          this.userData.push(data);
        }
      }
    },
    // 删除团队成员
    hanldeDelete(index) {
      this.ywyData.forEach((ele, i, arr) => {
        if (ele.zrrbh == this.userData[index].usercode) {
          this.$set(this.ywyData[i], "zrrbh", "");
          this.$set(this.ywyData[i], "zrrxm", "");

          this.ssfyTotalkm = this.ssfyTotalkm - this.ywyData[i].ssfy;
          this.ekfyTotalkm = this.ekfyTotalkm - this.ywyData[i].ekfy;
          this.kbfyTotalkm = this.kbfyTotalkm - this.ywyData[i].kbfy;

          this.$set(this.ywyData[i], "ssfy", 0);
          this.$set(this.ywyData[i], "ekfy", 0);
          this.$set(this.ywyData[i], "kbfy", 0);
        }
      });
      this.userData.splice(index, 1);
    },
    // 上传附件
    handleUploadFile(data) {
      this.fileList = data;
    },
    //   获取投标费用
    // handleToubiao(type) {
    //   let userList = [];
    //   if (type == "tb") {
    //     userList.push({
    //       username: this.userInfo.nickName,
    //       usercode: this.userInfo.userName,
    //       ywx: "",
    //       ssfy: "",
    //       ekfy: "",
    //       kbfy: ""
    //     });
    //   }
    //   if (type == "edit") {
    //     this.fileList = [];
    //   }
    //   tbxq({ fbbh: this.$route.query.fbbh }).then(({ data }) => {
    //     if (data.state == "success") {
    //       this.ywyData = !data.data.htnrfy ? [] : data.data.htnrfy;
    //       this.tbxx = !data.data.tbxx ? {} : data.data.tbxx; //投标信息
    //       this.fbxx = data.data.fbxx; //分包信息
    //       if (!!data.data.tbxx) {
    //         this.ssfyTotalkm = data.data.tbxx.ssfy;
    //         this.ekfyTotalkm = data.data.tbxx.ekfy;
    //         this.kbfyTotalkm = data.data.tbxx.kbfy;
    //         this.tbly = data.data.tbxx.tbly;
    //       }
    //       if (!!data.data.fjmc) {
    //         this.fileName = data.data.fjmc;
    //         this.fileList.push(data.data.tbxx.fjwid);
    //       }
    //       if (!!data.data.tdfy) {
    //         data.data.tdfy.forEach((ele, i, arr) => {
    //           userList.push({
    //             username: ele.zrrxm,
    //             usercode: ele.zrrbh,
    //             ywx: ele.ywymc,
    //             ssfy: ele.ssfy,
    //             ekfy: ele.ekfy,
    //             kbfy: ele.kbfy
    //           });
    //         });
    //       }
    //       this.userData = userList;

    //       this.userData.forEach((ele, i, arr) => {
    //         this.userYwyData[i] = [];
    //       });
    //     }
    //   });
    //   this.dialogTableVisible = !this.dialogTableVisible;
    // },

    // 分配用户
    handleSeleteUser(val,index) {
      this.ssfyTotalkm = this.ekfyTotalkm = this.kbfyTotalkm = 0;
      let curUser = {};
      this.userData.forEach((element, j, arr) => {
        this.$set(this.userData[j], "ywx", "");
        this.$set(this.userData[j], "ssfy", 0);
        this.$set(this.userData[j], "ekfy", 0);
        this.$set(this.userData[j], "kbfy", 0);
        this.userYwyData[j] = [];
        if (val == element.usercode) {
          curUser = element;
        }

        this.ywyData.forEach((ele, i, arr) => {
          if (val == ele.zrrbh) {
            this.ywyData[i].zrrxm = curUser.username;
            this.ywyData[i].xmjldj = curUser.xmjldj;
            this.ywyData[i].xmjldjmc = curUser.xmjldjmc;
            this.ywyData[i].xmjldjxs = curUser.xmjldjxs;

          }

          if (element.usercode == ele.zrrbh) {
            if (!this.userYwyData[j].includes(ele.ywymc)) {
              this.userYwyData[j].push(ele.ywymc);
            }
            this.userData[j].ssfy += Number(ele.ssfy); //累加责任人  实施金额
            this.userData[j].ekfy += Number(ele.ekfy); //累加责任人  二开金额
            this.userData[j].kbfy += Number(ele.kbfy); //累加责任人  可变金额
            this.$set(this.userData[j], "ywx", this.userYwyData[j].join(","));
          }
        });

        this.ssfyTotalkm += this.userData[j].ssfy; //投标费用实施费用 计算
        this.ekfyTotalkm += this.userData[j].ekfy; //投标费用二开费用 计算
        this.kbfyTotalkm += this.userData[j].kbfy; //投标费用可变费用 计算

        this.ywyData[index].ssfy = this.ywyData[index].ssbz*this.ywyData[index].xmjldjxs*this.ywyData[index].tbssry;
      });
    },

    // 实施费用
    handleChangefy(index, type, yhbh) {
      if (!this.ywyData[index].zrrbh) {
        this.$alert("请先选择责任人", " 提示", {
          type: "warning",
          confirmButtonText: "确定"
        });
        return;
      }
      let curObj = {}; //记录视图没更新的数据
      switch (type) {
        case "ss":
          this.ssfyTotal = 0;
          this.ssfyTotalkm = 0;
          this.ywyData.forEach((ele,i,arr) => {
            if(index == i){
              this.$set(this.ywyData[i], "tbssry", (ele.ssfy/ele.xmjldjxs/ele.ssbz).toFixed(2));
            }
            if (ele.zrrbh == yhbh) {
              this.ssfyTotal += Number(ele.ssfy);
            }
          });
          this.userData.forEach((ele, i, arr) => {
            if (ele.usercode == yhbh) {
              this.$set(this.userData[i], "ssfy", this.ssfyTotal);
              curObj = this.userData[i];
              this.userData.splice(i,1,curObj);
            }
            this.ssfyTotalkm += !this.userData[i].ssfy? 0: this.userData[i].ssfy;
          });
          break;
        case "ek":
          this.ekfyTotal = 0;
          this.ekfyTotalkm = 0;
          this.ywyData.forEach(ele => {
            if (ele.zrrbh == yhbh) {
              this.ekfyTotal += Number(ele.ekfy);
            }
          });
          this.userData.forEach((ele, i, arr) => {
            if (ele.usercode == yhbh) {
              this.$set(this.userData[i], "ekfy", this.ekfyTotal);
              curObj = this.userData[i];
              this.userData.splice(i,1,curObj);
            }
            this.ekfyTotalkm += !this.userData[i].ekfy? 0: this.userData[i].ekfy;
          });
          break;
        case "kb":
          this.kbfyTotal = 0;
          this.kbfyTotalkm = 0;
          this.ywyData.forEach(ele => {
            if (ele.zrrbh == yhbh) {
              this.kbfyTotal += Number(ele.kbfy);
            }
          });
          this.userData.forEach((ele, i, arr) => {
            if (ele.usercode == yhbh) {
              this.$set(this.userData[i], "kbfy", this.kbfyTotal);
              curObj = this.userData[i];
              this.userData.splice(i,1,curObj);
            }
            this.kbfyTotalkm += !this.userData[i].kbfy? 0: this.userData[i].kbfy;
          });
          break;

        case "ssry":
          this.ssfyTotal = 0;
          this.ssfyTotalkm = 0;
          this.ywyData.forEach((ele,i,arr) => {
            if(index == i){
              this.$set(this.ywyData[i], "ssfy", ele.ssbz*ele.xmjldjxs*ele.tbssry);
            }
            if (ele.zrrbh == yhbh) {
              this.ssfyTotal += Number(ele.ssfy);
            }
          });
          this.userData.forEach((ele, i, arr) => {
            if (ele.usercode == yhbh) {
              this.$set(this.userData[i], "ssfy", this.ssfyTotal);
              curObj = this.userData[i];
              this.userData.splice(i,1,curObj);
            }
            this.ssfyTotalkm += !this.userData[i].ssfy? 0: this.userData[i].ssfy;
          });
          
        default:
          break;
      }
    },

    // 删除附件
    handleDeleteFile() {
      this.fileName = "";
      this.fileList = [];
    },

    // 提交投标
    handleCommit() {
      let tdList = [],
        zrrnull = false;
        this.ywyData.forEach(ele => {
        if (!ele.zrrbh) {
          zrrnull = true;
        }
        tdList.push({
          htnrwid: ele.htnrwid,
          zrrbh: ele.zrrbh,
          zrrxm: ele.zrrxm,
          ssfy: Math.floor(Number(ele.ssfy) * 100) / 100,
          ekfy: Math.floor(Number(ele.ekfy) * 100) / 100,
          kbfy: Math.floor(Number(ele.kbfy) * 100) / 100,
          xmjldj:ele.xmjldj,
          xmjldjmc:ele.xmjldjmc,
          xmjldjxs:ele.xmjldjxs,
          tbssry:ele.tbssry
        });
      });
      if (!!zrrnull) {
        this.$message({
          message: "请先选择所属责任人~",
          type: "warning"
        });
        return;
      }
      this.$post(this.API.saveTbxx, {
        wid: !this.tbxx.wid ? "" : this.tbxx.wid,
        fbbh: this.$route.query.fbbh,
        tbly: this.tbly,
        fjwid: !this.fileList.length?'':this.fileList.join(",").split('|')[0],
        ssfy: this.ssfyTotalkm,
        ekfy: this.ekfyTotalkm,
        kbfy: this.kbfyTotalkm,
        tbtdlist: JSON.stringify(tdList),
        zbedite:this.zbedite
      }).then(res => {
        if (res.state == "success") {
          this.$message({
            message: "投标成功",
            type: "success"
          });
          this.istbMark = !this.istbMark;
          this.$emit('handleCommitToubiao','');

        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },

    // 获取投标详情
    getTbxq() {
      this.userList = [];
      tbxq({ fbbh: this.fbbh ,tbbh:this.tbbh}).then(({ data }) => {
        if (data.state == "success") {
          this.ywyData = !data.data.htnrfy ? [] : data.data.htnrfy;
          this.tbxx = !data.data.tbxx ? {} : data.data.tbxx; //投标信息
          this.fbxx = data.data.fbxx; //分包信息
          if (!!data.data.tbxx) {
            this.ssfyTotalkm = data.data.tbxx.ssfy;
            this.ekfyTotalkm = data.data.tbxx.ekfy;
            this.kbfyTotalkm = data.data.tbxx.kbfy;
            this.tbly = data.data.tbxx.tbly;
          }
          if (!!data.data.fjmc) {
            this.fileName = data.data.fjmc;
            this.fileList.push(data.data.tbxx.fjwid);
          }
          if (!!data.data.tdfy) {
            data.data.tdfy.forEach((ele, i, arr) => {
              this.userList.push({
                username: ele.zrrxm,
                usercode: ele.zrrbh,
                ywx: ele.ywymc,
                ssfy: ele.ssfy,
                ekfy: ele.ekfy,
                kbfy: ele.kbfy
              });
            });
            this.userData =  this.userList;
          }
          this.userData.forEach((ele, i, arr) => {
            this.userYwyData[i] = [];
          });
        }
      });
    }
  },
  watch: {
    show(n, o) {
      this.visible = this.show;
      if (!!n) {
         this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //  this.userList = [];
        // if (this.type == "tb") {
        //   this.userList.push({
        //     username: this.userInfo.nickName,
        //     usercode: this.userInfo.userName,
        //     ywx: "",
        //     ssfy: "",
        //     ekfy: "",
        //     kbfy: ""
        //   });
        // }
        if (this.type == "edit") {
          this.fileList = [];
        }
        this.getTbxq();
      } else {

      }
    }
  },
  components: { userDialog ,uploadComponent}
};
</script>

<style scoped>
.fb_info {
  padding: 15px 20px;
}
.fb_info h6 {
  color: #999;
  font-size: 13px;
  margin: 5px 0 !important;
}
.fb_info a {
  color: #2196f3;
}

.fb_info table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e9ecf4;
  font-size: 14px;
}
.fb_info table th {
  font-size: 14px;
  text-align: center;
  width: 150px;
  background: #f4f6f9;
  color: #4d4d4d;
}
.fb_info table td,
.fb_info table th {
  text-align: left;
  border: 1px solid #e9ecf4 !important;
  padding: 5px 10px;
}
.fb_info h4 {
  border-left: 5px solid #cd69c9;
  padding: 0 5px;
  font-weight: 700;
  margin: 15px 0 !important;
}

.fb_info h6 {
  margin: 10px 0;
}
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
}
.tb-table td:nth-of-type(1) {
  padding: 0 10px;
}
.tb-table td input {
  width: 100%;
  padding: 5px;
}

.tbcommit {
  background: #409eff;
  border: none;
  color: #fff;
  padding: 6px 10px;
  border-radius: 5px;
}
.tbcommit:hover {
  cursor: pointer;
}
.tbfy_table td {
  padding: 5px 8px !important;
  border: 1px solid #000;
}
.tdfp-table td {
  text-align: center;
}
.max-length {
  color: #f00;
}
p.upload_file-p {
  border: 1px solid rgb(235, 234, 234);
  padding: 2px 6px;
  border-radius: 3px;
  width: 900px;
  margin-top: 4px !important;
}
p.upload_file-p:hover {
  background: rgba(216, 214, 214, 0.5);
}
p.upload_file-p i:hover {
  cursor: pointer;
  color: #f00;
}
</style>
