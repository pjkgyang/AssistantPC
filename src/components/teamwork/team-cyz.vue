<template>
  <div class="item-addUser">
    <div style="text-align:right;padding-bottom:10px;">
      <!--2018-12-18 （项目甲方责任人）不可见修改中标人和团队成员。经营管理 添加中标人 -->
      <el-button v-if="GroupTag.includes('JYGL')" size="small" type="primary" @click="handleChangeZbr" >修改中标人</el-button>
      <el-button v-if="isJzuser != 1 || jsJf" size="small" type="primary" icon="el-icon-circle-plus-outline" @click="handleNewAdd">添加参与者</el-button>
    </div>
    <div class="item-user-outTable">
      <table class="item-user-table">
        <thead>
          <tr>
            <th>角色</th>
            <th>姓名</th>
            <th>工号/手机号</th>
            <th>单位类型</th>
            <th>部门</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tr>
          <td>
            <el-tag v-if="itemJfzrr.roleName" style="margin-right:5px;" size="mini" v-for="(roleName,index) in itemJfzrr.roleName" :key="index">{{roleName}}</el-tag>
            <el-tag v-if="!itemJfzrr.roleName" size="mini">甲方</el-tag>
          </td>
          <td>{{!itemJfzrr.userName?'暂无':itemJfzrr.userName}}</td>
          <td>{{!itemJfzrr.userCode?'-':itemJfzrr.userCode}}</td>
          <td>{{itemJfzrr.unitType == 0?'金智':itemJfzrr.unitType == 2?'合作伙伴':!itemJfzrr.unitType?'-':'学校成员'}}</td>
          <td>{{!itemJfzrr.dept?'-':itemJfzrr.dept}}</td>
          <td>{{!itemJfzrr.cjsj?'-':itemJfzrr.cjsj}}</td>
          <td>
            <!-- v-if="itemJfzrr.userName == username || itemJfzrr.unitType == 0 ||itemYfzrr.userName == username " -->
            <el-button  size="mini" @click="changeJfZrr">修改</el-button>
            <el-button v-if="itemJfzrr.edit " plain size="mini" @click="editUser(itemJfzrr)">编辑</el-button>
            <el-button v-if="itemJfzrr.del" type="danger" plain size="mini" @click="deleteJfZrr">删除</el-button>
          </td>
        </tr>
        <tr>
          <td>
            <el-tag v-if="itemYfzrr.roleName" style="margin-right:5px;" size="mini" v-for="(roleName,index) in itemYfzrr.roleName" :key="index">{{roleName}}</el-tag>
            <el-tag v-if="!itemYfzrr.roleName" size="mini">乙方</el-tag>
          </td>
          <td>{{!itemYfzrr.userName?'暂无':itemYfzrr.userName}}</td>
          <td>{{itemYfzrr.userCode}} / {{!itemYfzrr.mobile?'-':itemYfzrr.mobile}}</td>
          <td>{{!itemYfzrr.userName?'':itemYfzrr.unitType == 0?'金智':itemYfzrr.unitType == 1?'学校成员':'合作伙伴'}}</td>
          <td>{{!itemYfzrr.dept?'':itemYfzrr.dept}}</td>
          <td>{{itemYfzrr.cjsj}}</td>
          <td>
            <el-button v-if="!!GroupTag.includes('JYGL')" plain size="mini" @click="changeUser($event,itemYfzrr)">修改</el-button>
            <el-button v-if="itemYfzrr.edit" plain size="mini" @click="editUser(itemYfzrr)">编辑</el-button>
          </td>
        </tr>
        <tr v-for="(cyz,index) in itemCyz" v-if="itemCyz.length">
          <td>
            <el-tag style="margin-right:5px;" size="mini" v-for="(roleName,index) in cyz.roleName" :key="index">{{roleName}}</el-tag>
          </td>
          <td>{{cyz.userName}}</td>
          <td>{{cyz.userCode}}{{cyz.unitType == 0 && cyz.mobile?' / '+cyz.mobile:cyz.unitType == 0 && !cyz.mobile?' / -':''}}</td>
          <td>{{cyz.unitType == 0?'金智':cyz.unitType == 2?'合作伙伴':'学校成员'}}</td>
          <td>{{cyz.dept}}</td>
          <td>{{cyz.cjsj}}</td>

          <td>
            <el-button v-if="cyz.roleName.indexOf('销售') != -1 &&　(userTag || itemYfzrr.userName == username)" plain size="mini" plain @click="changeXsr(cyz)">修改</el-button>
            <el-button v-if="cyz.edit" plain size="mini" :data-wid="cyz.userId" plain @click="editUser(cyz)">编辑</el-button>
            <el-button v-if="cyz.del" type="danger" size="mini" :data-wid="cyz.userId" plain @click="delectUser($event,cyz.userId)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>

    <el-dialog title="人员列表" :visible.sync="dialogVisible" width="750px" :close-on-click-modal="false" @close="closeOutPerson" :append-to-body=true>
      <ul class="item-user-list">
        <li style="position:relative" flex>
          <el-input v-model="keyword" size="mini" :style="{width:isAddCyz && itemJfzrr.userId != userId && isJzuser!= 1?'300px':'655px'}" :class="{'isAddCyz-cyz':isAddCyz,'isAddCyz-jf':!isAddCyz}" placeholder="搜索人员姓名/编号" @change="searchUser"></el-input>
          <!-- 项目甲方不显示 -->
          <span style="width:40%" v-if="isAddCyz && itemJfzrr.userId != userId && isJzuser != 1">人员类别:
            <el-select v-model="rylb" placeholder="请选择" style="width:150px" size="mini" @change="chooseRylb">
              <el-option label="无" value=""></el-option>
              <el-option label="金智" value="0"></el-option>
              <el-option label="学校" value="1"></el-option>
              <el-option label="合作伙伴" value="2"></el-option>
            </el-select>
          </span>
          <span class="el-icon-circle-plus  invite-newUser" @click="inviteNewuser">添加</span>
        </li>
        <li v-for="(user,index) in UserList" v-if="UserList.length != 0">
          <span>{{user.nickName}}</span>
          <span>{{user.userName}}</span>
          <span :title="user.unit">{{user.unit}}</span>
          <span>
            <el-button :disabled="user.state == 'ytj'" size="mini" v-if="(isAddCyz && jszbr) || mark" @click="addItemCyz(user,index)">{{user.state == 'ytj'?'已添加':'添加'}}</el-button>
            <el-button size="mini" v-if="!isAddCyz && isJF" @click="addItemJfzrr(user)">修改为(甲方责任人)</el-button>
            <el-button size="mini" v-if="!isAddCyz && !isJF" @click="addItemYfzrr(user)">修改为(乙方责任人)</el-button>
          </span>
        </li>
        <div v-if="UserList.length == 0" text-center class="pd-10">
          暂无人员数据
        </div>
      </ul>
      <div style="padding:10px 0;text-align:center">
        <pagination v-if="" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
    </el-dialog>

    <el-dialog width="750px" title="添加外部人员" :visible.sync="innerVisible" :close-on-click-modal="false" append-to-body>
      <el-form :model="form" style="margin:10px 0;padding:0 30px;min-height:330px" size="mini" label-width="80px" :inline="true">
        <el-form-item label="姓名" required>
          <el-input required v-model="form.name" style="width:210px" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input type="password" required v-model="form.pwd" style="width:210px" clearable placeholder="6-12位字母、数字和下划线"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input required v-model="form.phone" style="width:210px" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" required>
          <el-input required v-model="form.email" style="width:210px" clearable placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="负责业务" required>
          <el-select v-model="cpxFzyw" placeholder="请选择" multiple :style="{width:form.rylx == '1013'?'514px':'440px'}" :disabled='form.rylx == "1013"?false:isAllCpx'>
            <el-option v-for="(yw,index) in cpxData" :label="yw.mc" :value="yw.mc+','+yw.label" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- 2018.12.11 学校用户不显示全部-->
        <el-form-item label="" v-if="form.rylx != '1013'">
          <el-checkbox v-model="isAllCpx">全部</el-checkbox>
        </el-form-item><br>

        <!-- v-if="itemJfzrr.userId != userId && isJzuser != 1" -->
        <!-- 2018.12.11 学校用户不显示全部-->
        <el-form-item label="人员类型" required v-if="isJzuser != 1">
          <el-select v-model="form.rylx" placeholder="请选择" style="width:210px">
            <el-option label="学校成员" value="1013"></el-option>
            <el-option label="合作伙伴" value="1004"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位" v-if="form.rylx == '1004'" required>
          <el-select v-model="form.dw" placeholder="请选择" style="width:210px">
            <el-option :title="dw.text" :label="dw.text" :value="dw.id+'&'+dw.text" v-for="(dw,i) in dwList" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" required v-else>
          <el-input size="mini" placeholder="请输入部门/选择部门" v-model="form.bm" style="width:210px" @blur="handleBMblur" @focus="handleBMfocus"></el-input>
          <transition name="component-fade">
            <ul class="bm-select" v-if="selectVisible">
              <li v-for="(item,index) in bmList" :key="index" @click="chooseBm(item.mc)" v-if="bmList.length != 0">{{item.mc}}</li>
              <div v-if="bmList.length == 0" style="color:#aaa;text-align:center">无数据</div>
            </ul>
          </transition>
        </el-form-item>
        <el-form-item label="性别" required>
          <el-select v-model="form.sex" placeholder="请选择" style="width:210px">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类别" v-if="form.rylx == '1013'">
          <el-select v-model="form.yhlb" placeholder="请选择" style="width:210px">
            <el-option label="学校老师" value="1"></el-option>
            <el-option label="学校领导" value="2"></el-option>
          </el-select>
        </el-form-item>
        <p style="color:#aaa;font-weight:700;font-size:12px;padding:0 20px">( 注 : 手机号为用户默认登录账号 )</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleCommit" size="mini">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑人员信息" :visible.sync="editdialogVisible" width="660px" :close-on-click-modal="false" :append-to-body=true>
      <el-form style="margin:10px 0 80px;padding:0 50px;" size="mini" label-width="80px" :inline="true">
        <el-form-item label="负责业务" required>
          <el-select v-model="fzywList" placeholder="请选择" multiple :style="{width:userInfo.unitType != 1?'400px':'450px'}" :disabled='userInfo.unitType == 1?false:isAllCpx'>
            <el-option v-for="(yw,index) in cpxData" :label="yw.mc" :value="yw.label + String.fromCharCode(2) + yw.mc" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <!-- 2018.12.11 学校用户不显示全部-->
        <el-form-item label="" v-if="userInfo.unitType != 1">
          <el-checkbox v-model="isAllCpx">全部</el-checkbox>
        </el-form-item>
        <el-form-item label="用户类别" required v-if="userInfo.unitType == 1">
          <el-radio v-model="yhlb" label="1">学校老师</el-radio>
          <el-radio v-model="yhlb" label="2">学校领导</el-radio>
        </el-form-item><br>
        <el-form-item label="用户性别" required v-if="userInfo.unitType == 1">
          <el-select v-model="editInfo.sex" placeholder="请选择" style="width:450px">
            <el-option label="保密" value="0"></el-option>
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="部门" required v-if="userInfo.unitType == 1">
          <el-input size="mini" placeholder="请输入部门/选择部门" v-model="editInfo.bm" style="width:450px" @blur="handleBMblur" @focus="handleBMfocus"></el-input>
          <transition name="component-fade">
            <ul class="bm-select" v-if="selectVisible">
              <li v-for="(item,index) in bmList" :key="index" @click="chooseEditBm(item.mc)" v-if="bmList.length != 0">{{item.mc}}</li>
              <div v-if="bmList.length == 0" style="color:#aaa;text-align:center">无数据</div>
            </ul>
          </transition>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleEditCommit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <zbrDialog :show.sync="show" :count="count" :xmbh="xmbh" @handlemodifyZbr="handlemodifyZbr"></zbrDialog>
  </div>
</template>
<script>
import {
  queryProjectParticipantMap,
  queryUser,
  addProjectParticipant,
  deleteProjectParticipant,
  // modifyProductLeader,
  modifyProjectJfFzr,
  AddOutStaff,
  queryDwUsers,
  clearProjectJfFzr,
  getRyCpx,
  saveRy,
  modifyProjectManager
} from "@/api/personal.js";
import pagination from "@/components/BusinessPage/pagination.vue";
import zbrDialog from "@/components/dialog/zbr-dialog.vue";
import { getResponsibleTaskList } from "@/api/common.js";
import { getUnits, getDepts } from "@/api/system.js";
import { EventBus } from "../../utils/util.js";
import { getMenu, getSession } from "@/utils/util.js";
export default {
  data() {
    return {
      show: false,
      UserList: [
        {
          xm: "jobs",
          wid: "01117777"
        },
        {
          xm: "apple",
          wid: "01117888"
        }
      ],
      dialogVisible: false,
      editdialogVisible: false,
      isAddCyz: true,
      itemCyz: [],
      itemJfzrr: {},
      itemYfzrr: {},
      Isexternal: "",
      total: null,
      pageSize: 10,
      innerVisible: false,
      form: {
        name: "",
        phone: "",
        pwd: "",
        email: "",
        rylx: "1013",
        yhdw: "",
        dw: "",
        bm: "",
        sex: "",
        yhlb: "1"
      },
      cpxFzyw: [],
      cpxData: [],
      sexList: [],
      keyword: "",
      BtnDisabled: "",
      rylb: "",
      dwList: [],
      bmList: [],
      selectVisible: false,
      fzywList: [],
      fzywData: [],
      isEdit: false,
      isAllCpx: true,
      userInfo: {},
      itemUser: [],
      yhlb: "",
      Maplist: [],
      isJF: true,
      userTag: false,
      username: "", //用户姓名
      userId: "", //用户编号
      zbrData: {},
      count: 0,
      mark: false,
      GroupTag: "",
      jszbr: false,
      isJzuser: 0,
      editInfo: {
        sex: "",
        bm: ""
      }
    };
  },
  props: {
    xmbh: {
      type: String,
      default: ""
    },
    userListShow: {
      type: Boolean,
      default: false
    },
    dwmc: {
      type: String,
      default: ""
    },
    tabName: {
      type: String,
      default: ""
    },
    jsJf: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 修改中标人
    handlemodifyZbr(data) {
      this.mark = false;
      this.zbrData.fbbh = data.fbbh;
      this.zbrData.xmbh = this.xmbh;
      this.isAddCyz = true;
      this.jszbr = true;
      this.queryUser(1, true);
      this.dialogVisible = !this.dialogVisible;
    },
    handleBMfocus() {
      this.selectVisible = true;
    },
    handleBMblur() {
      this.selectVisible = false;
    },
    // 选择部门
    chooseBm(bm) {
      this.form.bm = bm;
    },
    // 选择edit部门
    chooseEditBm(bm) {
      this.editInfo.bm = bm;
    },
    // 选择人员类别
    chooseRylb(val) {
      if (this.isAddCyz) {
        this.queryUser(1, false);
      } else {
        this.queryUser(1, true);
      }
    },
    //修改乙方责任人
    changeUser(e, data) {
      this.isAddCyz = false;
      this.isJF = false;
      this.jszbr = false; //是否修改中标人
      this.queryUser(1, true);
      this.dialogVisible = !this.dialogVisible;
    },
    //编辑参与者
    editUser( data) {
      this.cpxData = [];
      this.userInfo = data;

      // 2018.12.10 改为可以用产品
      // if (!getSession("kycp")) {
      //   getMenu("kycp", this.cpxData, true); //获取产品
      // } else {
      //   this.cpxData = getSession("kycp");
      // }
        let that = this;
        this.cpxData = [];
        this.$get(this.API.queryResponsibleProduct,{xmbh:'',internalProject:''}).then(res=>{
            Object.keys(res.data).forEach(function(key){
              that.cpxData.push({mc:res.data[key],label:key})
            });
        })

      if (data.unitType == 0) {
        this.getRyCpx(data.userId, this.xmbh);
      }else {
        this.getRyCpx(data.userId, this.xmbh);
        this.yhlb = data.yhlb;
        if(data.unitType == 1){
          this.getDepts();
        }
      }

      this.editInfo.bm = data.dept;
      this.editInfo.sex = data.sex;
      this.editdialogVisible = !this.editdialogVisible;
    },
    // 修改中标人
    changeXsr(data) {
      this.queryUser(1, true);
      this.mark = true;
      this.dialogVisible = !this.dialogVisible;
    },
    //保存 编辑 业务线
    handleEditCommit() {
      // 学校老师  金智编辑学校老师
      if(this.userInfo.unitType == 1){
          this.isAllCpx = false;
      }
      if (!this.isAllCpx && this.fzywList.length == 0 && this.userInfo.unitType != 1) {
        this.$alert("请选择负责业务", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }else if(this.fzywList.length == 0 && this.userInfo.unitType == 1){
        this.$alert("请选择负责业务", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }else {
        saveRy({
          yhbh: this.userInfo.userId,
          yhxm: this.userInfo.userName,
          xmbh: this.xmbh,
          cpxRy: this.isAllCpx?"":this.fzywList.join(String.fromCharCode(1)),
          yhlb: this.userInfo.unitType == 1 ? this.yhlb : "",
          isAllCpx: this.isAllCpx,
          dept: this.editInfo.bm,
          xm: this.editInfo.sex
        }).then(({ data }) => {
          if (data.state == "success") {
            this.editdialogVisible = false;
            this.queryProjectParticipantMap();
            this.$alert("保存成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          }
        });
      }
    },
    delectUser(e, param) {
      // 删除参与者
      this.$confirm("是否删除此参与者?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteProjectParticipant({
            xmbh: this.xmbh,
            yhbh: param
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("删除成功", "提示", {
                confirmButtonText: "确定",
                type: "success"
              });
              this.queryProjectParticipantMap();
              this.$emit("addItemuser", "");
            }
          });
        })
        .catch(() => {});
    },
    addStaff(e) {
      e.currentTarget.setAttribute("disabled", "disabled");
    },
    //添加甲方
    changeJfZrr(e) {
      this.isAddCyz = false;
      this.isJF = true;
      this.jszbr = false; //是否修改中标人
      this.queryUser(1, true);
      this.dialogVisible = !this.dialogVisible;
    },
    editJfZrr() {},

    // 删除甲方
    deleteJfZrr() {
      this.$confirm("是否删除甲方责任人?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          clearProjectJfFzr({
            xmbh: this.xmbh
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("删除成功", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.queryProjectParticipantMap();
                }
              });
            }
          });
        })
        .catch(() => {});
    },
    queryUser(curPage, needShowCyz) {
      queryDwUsers({
        curPage: curPage,
        pageSize: this.pageSize,
        xmbh: this.xmbh,
        unittype: this.itemJfzrr.userId == this.userId ? 1 : this.rylb,
        //   onlyxx:onlyxx,
        needShowCyz: needShowCyz,
        keyword: this.keyword || ""
      }).then(({ data }) => {
        if (data.state == "success") {
          if (!data.data || !data.data.rows.length) {
            this.UserList = [];
          } else {
            this.UserList = data.data.rows;
            this.UserList.forEach((ele, i, arr) => {
              if (ele.userName.slice(0, 1) == 1) {
                ele.userName = `${ele.userName.slice(
                  0,
                  3
                )}****${ele.userName.slice(-4)}`;
              }
            });
          }
         this.total = data.data.records;
        }
      });
    },
    // 新增参与者
    handleNewAdd() {
      // 学校老师 只能获取学校用户
      if(this.isJzuser == 1){
        this.rylb = 1;
      }
      this.zbrData = {};
      this.mark = false;
      this.queryUser(1, false);
      this.isAddCyz = true;
      this.jszbr = true; //是否修改中标人
      this.BtnDisabled = "";
      this.dialogVisible = !this.dialogVisible;
    },
    // 修改中标人
    handleChangeZbr() {
      this.show = !this.show;
    },
    //   分页查询用户
    handleCurrentChange(data) {
      if (this.isAddCyz) {
        this.queryUser(data, false);
      } else {
        this.queryUser(data, true);
      }
    },
    //   添加参与者
    addItemCyz(data, param) {
      let userData = data;
      if (this.mark) {
        this.$post(this.API.modifySale, {
          xmbh: this.xmbh,
          yhbh: data.uid,
          yhxm: data.nickName
        }).then(res => {
          if (res.state == "success") {
            this.dialogVisible = !this.dialogVisible;
            this.queryProjectParticipantMap();
          }
        });
      } else {
        if (JSON.stringify(this.zbrData) == "{}") {
          addProjectParticipant({
            xmbh: this.xmbh,
            yhxm: data.nickName,
            yhbh: data.uid
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$emit("addItemuser", "");
              this.queryProjectParticipantMap(userData);
              this.UserList[param].state = "ytj";
            } else {
              this.BtnDisabled = "";
            }
          });
        } else {
          this.zbrData.yhbh = data.uid;
          this.zbrData.yhxm = data.nickName;
          this.$post(this.API.modifyZbr, this.zbrData).then(res => {
            if (res.state == "success") {
              this.dialogVisible = !this.dialogVisible;
              this.count += 1;
              this.queryProjectParticipantMap();
            }
          });
        }
      }
    },
    //   搜索用户
    searchUser(val) {
      if (this.jszbr) {
        this.queryUser(1, true);
        return;
      }
      if (this.isAddCyz) {
        this.queryUser(1, false);
      } else {
        this.queryUser(1, true);
      }
    },
    closeOutPerson() {
      this.keyword = "";
    },
    //   邀请外部人员
    inviteNewuser() {
      this.innerVisible = !this.innerVisible;
      this.cpxData = [];
      this.isAllCpx = true;
      if (!getSession("kycp") || !getSession("GenderType")) {
        getMenu("kycp", this.cpxData, true); //获取产品
        getMenu("GenderType", this.sexList); //获取性别
      } else {
        this.cpxData = getSession("kycp");
        this.sexList = getSession("GenderType");
      }
      if (this.isJzuser == 1) {
        this.getXxCpx();
      }
      this.getUnits();
      this.getDepts();
    },
    // 获取学校产品线
    getXxCpx(){
      let Arrlist = [];
        this.$get(this.API.getXxCpx, {
          dwmc: this.dwmc
        }).then(res => {
          if(res.state == 'success'){
            if(!res.data.isAllCpx){
              res.data.cpx.forEach(ele=>{
                 Arrlist.push({
                 label:ele.cpxbh,
                 mc:ele.cpxmc
                })
              })
              this.cpxData = Arrlist
            }else{
              this.cpxData = getSession("kycp");
            }
          }
        });
    },
    handleCommit() {
      // 学校老师  金智提交学校老师
      if(this.form.rylx == '1013'){
          this.isAllCpx = false;
      }

      if (!this.form.name) {
        this.$alert("请输入姓名", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.phone.trim())) {
        this.$alert("请输入手机号码或号码有误", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else if (
        !/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(
          this.form.email.trim()
        )
      ) {
        this.$alert("请输入正确邮箱地址或地址有误", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else if (
        !this.isAllCpx &&
        this.cpxFzyw.length == 0 &&
        this.form.rylx != '1013'
      ) {
        this.$alert("请选择负责业务", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }else if(
        this.cpxFzyw.length == 0 &&
        this.form.rylx == '1013'
      ){
        this.$alert("请选择负责业务", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else if (this.form.rylx == "1013" && this.form.bm == "") {
        this.$alert("请填写部门", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else if (this.form.rylx == "1004" && this.form.dw == "") {
        this.$alert("请选择单位", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        AddOutStaff({
          xmbh: this.xmbh,
          name: this.form.name,
          telNum: this.form.phone,
          email: this.form.email,
          pwd: this.form.pwd,
          cpxdata: this.isAllCpx ? "" : this.cpxFzyw.join("|"),
          rylx: this.form.rylx,
          unitnum: this.form.rylx == "1013" ? "" : this.form.dw.split("&")[0],
          unit: this.form.rylx == "1013" ? "" : this.form.dw.split("&")[1],
          dept: this.form.rylx == "1004" ? "" : this.form.bm,
          sex: this.form.sex == "" ? "0" : this.form.sex,
          yhlb: this.form.yhlb,
          isAllCpx: this.isAllCpx
        }).then(({ data }) => {
          if (data.state == "success") {
            this.$alert("添加成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                if (this.isAddCyz) {
                  this.queryUser(1, false);
                  this.queryProjectParticipantMap();
                } else {
                  this.queryUser(1, true);
                }
                this.innerVisible = !this.innerVisible;
              }
            });
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type: "error",
              callback: action => {}
            });
          }
        });
      }
    },
    //   修改甲方责任人
    addItemJfzrr(param) {
      modifyProjectJfFzr({
        xmbh: this.xmbh,
        yhxm: param.nickName,
        yhbh: param.uid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$emit("addItemuser", "");
              this.queryProjectParticipantMap();
            }
          });
          this.dialogVisible = !this.dialogVisible;
        }
      });
    },
    //   修改乙方责任人
    addItemYfzrr(param) {
      modifyProjectManager({
        xmbh: this.xmbh,
        yhxm: param.nickName,
        yhbh: param.uid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$emit("addItemuser", "");
              this.queryProjectParticipantMap();
            }
          });
          this.dialogVisible = !this.dialogVisible;
        }
      });
    },
    //   获取项目相关人员
    queryProjectParticipantMap(userData) {
      queryProjectParticipantMap({
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          Object.values(data.data).forEach((ele, i, arr) => {
            if (ele) {
              if (ele.length) {
                ele.forEach((element, i, arr) => {
                  element.roleName = element.roleName.split(",");
                });
              } else if (ele.userName) {
                ele.roleName = ele.roleName.split(",");
              }
            }
          });
          if (!data.data.jf) {
            this.itemJfzrr = {};
          } else {
            this.itemJfzrr = data.data.jf;
          }
          if (!data.data.yf) {
            this.itemYfzrr = {};
          } else {
            this.itemYfzrr = data.data.yf;
          }
          if (!data.data.qt || !data.data.qt.length) {
            this.itemCyz = [];
          } else {
            this.itemCyz = data.data.qt;
          }
        }

        if(!!userData){
          let user = '';
          this.itemCyz.forEach(ele=>{
            if(userData.uid == ele.userId){
              user = ele;
            }
          })
         this.editUser(user); 
        }
      });
    },

    getUnits() {
      //获取单位
      getUnits({
        dwlx: 2,
        keyword: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.dwList = data.data;
        }
      });
    },
   //获取部门
    getDepts() {
      getDepts({
        dwbh: "",
        dwmc: this.dwmc
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data != null) {
            this.bmList = data.data;
          } else {
            this.bmList = [];
          }
        }
      });
    },
    // 获取产品线
    getRyCpx(yhbh, xmbh) {
      this.fzywList = [];
      getRyCpx({ yhbh: yhbh, xmbh: xmbh }).then(({ data }) => {
        this.isAllCpx = data.data.isAllCpx;
        if (data.state == "success") {
          if(this.isJzuser == 1){
            if(!this.isAllCpx){
              this.getXxCpx();
              if(!data.data.cpx){
                this.fzywList = [];
              }else{
                data.data.cpx.forEach((ele, i, arr) => {
                    this.fzywList.push(
                      ele.cpxbh + String.fromCharCode(2) + ele.cpxmc
                    );
                }); 
              }
            }else{
             this.cpxData =  getSession("kycp");
             this.cpxData.forEach((ele, i, arr) => {
                this.fzywList.push(
                  ele.label + String.fromCharCode(2) + ele.mc
                );
             });
            }
          }else{
            if (data.data.isAllCpx) {
              this.fzywList = [];
            } else {
              if (data.data.cpx && data.data.cpx.length != 0) {
                data.data.cpx.forEach((ele, i, arr) => {
                  this.fzywList.push(
                    ele.cpxbh + String.fromCharCode(2) + ele.cpxmc
                  );
                });
              } else {
                this.fzywList = [];
              }
            }
          }
        }
      });
    }
  },
  watch: {
    tabName(n, o) {
      if (n == "first") {
        this.queryProjectParticipantMap();
      }
    }
  },
  mounted() {
    this.GroupTag = JSON.parse(sessionStorage.userInfo).userGroupTag;
    if (
      this.GroupTag.indexOf("JYGL") != -1 ||
      this.GroupTag.indexOf("QYZ") != -1 ||
      this.GroupTag.indexOf("ZDDZ") != -1
    ) {
      this.userTag = true;
    } else {
      this.userTag = false;
    }
    this.username = sessionStorage.username;
    this.userId = JSON.parse(sessionStorage.userInfo).uid;
    this.isJzuser = sessionStorage.isJZuser;
    this.queryProjectParticipantMap();
  },
  components: { pagination, zbrDialog }
};
</script>
<style scoped>
.item-addUser {
  margin: 0 20px;
}
.item-addUser span.user-lx {
  display: inline-block;
  width: 20px;
  height: 20px;
  line-height: 22px;
  text-align: center;
  border-radius: 50%;
  font-size: 12px;
}
.item-addUser .item-user-table {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ebeef5;
}
.item-addUser .item-user-table button {
  padding: 5px 8px;
}
.item-addUser .item-user-table tr:hover {
  background: #e2e9ee;
}
.item-addUser .item-user-table th {
  background: #f5f7fa;
}
.item-addUser .item-user-table th,
.item-addUser .item-user-table td {
  text-align: center !important;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  height: 35px !important;
}

.item-jfzrr {
  background: #3ba7f5;
  color: #fff !important;
}
.item-yfzrr {
  background: #7ece64;
  color: #fff !important;
}
.item-cyz {
  background: rgb(146, 146, 13);
  color: #fff !important;
}
.item-user-delect:hover {
  cursor: pointer;
  color: #a4d3ee;
}
.item-addUser-oprater a {
  color: #000;
}
.item-addUser-oprater a:hover {
  color: #409eff;
}
.item-zrrname {
  font-size: 13px;
  width: 80px;
  margin: 0 10px;
  text-align: center;
}
.item-user-change {
  font-size: 14px;
  height: 20px;
  border: 1px solid #ccc;
  line-height: 20px;
  padding: 0 2px;
  border-radius: 3px;
  background: #eee;
}
.newAdd-cyz {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 5px 0;
  border-top: 1px solid #eee;
}
.newAdd-cyz > span:hover {
  color: #409eff;
  cursor: pointer;
}
.item-user-list {
  height: 460px;
  overflow-y: auto;
}
.item-user-list li {
  padding: 6px 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.item-user-list li span:nth-of-type(1) {
  display: inline-block;
  width: 10%;
}
.item-user-list li span:nth-of-type(2) {
  display: inline-block;
  width: 20%;
}
.item-user-list li span:nth-of-type(3) {
  display: inline-block;
  width: 40%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
}
.invite-newUser {
  position: absolute;
  right: 0px;
  top: 13px;
}
.invite-newUser:hover {
  color: #409eff;
  cursor: pointer;
}
.isAddCyz-cyz {
  width: 45%;
}
.isAddCyz-jf {
  width: 77%;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
.bm-select {
  width: 200px;
  max-height: 150px;
  border: 1px solid #dcdfe6;
  background: #fff;
  overflow-y: auto;
  border-radius: 5px;
  position: absolute;
  top: 33px;
  color: #606266;
  z-index: 7777;
}
.bm-select li,
.bm-select div {
  padding: 3px 10px;
}
.bm-select li:hover {
  cursor: pointer;
  background: #f5f7fa;
}
</style>
