<template>
  <div class="item-addUser">      
    <div class="item-addUser-list">
      <ul>
          <li>
               <p class="item-zrrname">{{JSON.stringify(itemJfzrr) == "{}"?'暂无':itemJfzrr.userName}}&#x3000;</p>
               <p class="item-user-role" :title="itemJfzrr.roleName">
                 <el-tag  v-if="JSON.stringify(itemJfzrr) != '{}'" style="margin-right:5px;"  size="mini"  v-for="(roleName,index) in itemJfzrr.roleName" :key="index">{{index==2?roleName+'...':roleName}}</el-tag>
                 <el-tag  v-if="JSON.stringify(itemJfzrr) == '{}'" size="mini" >甲方</el-tag>
               </p> 
               <!-- <el-button size="mini" type="info" plain :data-wid="itemJfzrr.userId"  @click="changeJfZrr">修改</el-button>  -->
           </li>
           <li>
               <p class="item-zrrname">{{JSON.stringify(itemYfzrr) == "{}"?'暂无':itemYfzrr.userName}}&#x3000;</p>
               <!-- <span class="item-user-delect" :data-wid="itemYfzrr.userId"></span> -->
               <p class="item-user-role" :title="itemYfzrr.roleName">
                 <el-tag  v-if="JSON.stringify(itemYfzrr) != '{}'" style="margin-right:5px;" size="mini" v-for="(roleName,index) in itemYfzrr.roleName" :key="index">{{index==2?roleName+'...':roleName}}</el-tag>
                 <el-tag  v-if="JSON.stringify(itemYfzrr) == '{}'" size="mini" >乙方</el-tag>
               </p>
           </li>
          <li  v-for="(itemQt,index) in itemCyz" v-if="itemCyz.length">
               <p class="item-zrrname">{{itemQt.userName}}&#x3000;</p>
               <p class="item-user-role" :title="itemQt.roleName">
                 <el-tag style="margin-right:5px;" size="mini" v-for="(item,index) in itemQt.roleName.split(',')" :key="index">{{item}}</el-tag>&#x3000;
               </p>
               <!-- <span v-if="itemQt.del" class="item-user-delect" :data-wid="itemQt.userId" title="删除"  @click="delectUser($event,index)">
                 <span class="el-icon-close"></span>
               </span> -->
           </li>
      </ul>
    </div>    
      <!-- <div>
            <div class="newAdd-cyz">
                <span class="el-icon-circle-plus-outline" @click="handleNewAdd"> 新增(参与者)</span>
            </div>
      </div> -->

        <el-dialog
            title="人员列表"
            :visible.sync="dialogVisible"
            width="600px"
            :close-on-click-modal="false"
            @close="closeOutPerson"
            :append-to-body=true>
             <ul class="item-user-list">
                <li style="position:relative" flex><el-input v-model="keyword" size="mini":class="{'isAddCyz-cyz':isAddCyz,'isAddCyz-jf':!isAddCyz}" placeholder="搜索人员姓名/编号" @change="searchUser"></el-input>
                    <span style="width:40%" v-if="isAddCyz">人员类别:
                           <el-select v-model="rylb" placeholder="请选择" style="width:150px" size="mini" @change="chooseRylb">
                                <el-option  label="无" value="" ></el-option>
                                <el-option  label="金智" value="0" ></el-option>
                                <el-option  label="学校" value="1" ></el-option>
                                <el-option  label="合作伙伴" value="2" ></el-option>
                            </el-select>
                    </span>
                   <span  class="el-icon-circle-plus  invite-newUser" @click="inviteNewuser" >添加</span>
                </li>
                <li v-for="(user,index) in UserList">
                    <span>{{user.nickName}}</span>
                    <span>{{user.userName}}</span>
                    <span :title="user.unit">{{user.unit}}</span>
                    <span>
                        <el-button :disabled="user.state == 'ytj'" size="mini" :data-info="user.nickName+'&'+user.uid" v-if="isAddCyz"  @click="addItemCyz($event,index)">{{user.state == 'ytj'?'已添加':'添加'}}</el-button>
                        <el-button size="mini" :data-info="user.nickName+'&'+user.uid"  v-else  @click="addItemJfzrr">修改为(甲方责任人)</el-button>
                    </span>
                </li>
             </ul>
             <div style="padding:10px 0;text-align:center">
              <pagination v-if="" :pageSize="pageSize" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
              </div>
                  <el-dialog
                    width="600px"
                    title="添加外部人员"
                    :visible.sync="innerVisible"
                    :close-on-click-modal="false"
                    append-to-body>
                     <el-form :model="form" style="margin:10px 0" size="mini" label-width="80px" :inline="true" >
                        <el-form-item label="姓名"  required>
                             <el-input required v-model="form.name" style="width:200px" clearable placeholder="请输入姓名"></el-input>
                        </el-form-item>
                         <el-form-item label="密码" required>
                             <el-input type="password" required v-model="form.pwd" style="width:200px" clearable placeholder="6-12位字母、数字和下划线"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" required>
                             <el-input required v-model="form.phone" style="width:200px" clearable placeholder="请输入手机号"></el-input>
                        </el-form-item>
                         <el-form-item label="邮箱" required>
                             <el-input required v-model="form.email" style="width:200px" clearable placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                        <el-form-item label="负责业务" >
                             <el-select v-model="form.cpx" placeholder="请选择" multiple  style="width:200px">
                                <el-option v-for="(yw,index) in cpxData"  :label="yw.mc" :value="yw.mc+','+yw.label" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="人员类型" required>
                             <el-select v-model="form.rylx" placeholder="请选择" style="width:200px" >
                                <el-option  label="学校成员" value="1013" ></el-option>
                                <el-option  label="合作伙伴" value="1004" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="单位" v-if="form.rylx == '1004'" required>
                             <el-select v-model="form.dw" placeholder="请选择" style="width:200px">
                                <el-option :title="dw.text" :label="dw.text" :value="dw.id+'&'+dw.text" v-for="(dw,i) in dwList" :key="i"></el-option>
                            </el-select>
                        </el-form-item>
                         <el-form-item label="部门" required v-else>
                               <el-input size="mini" placeholder="请输入部门/选择部门" v-model="form.bm" style="width:200px" @blur="handleBMblur" @focus="handleBMfocus"></el-input>
                             <el-collapse-transition>
                               <ul class="bm-select" v-if="selectVisible">
                                 <li v-for="(item,index) in bmList" :key="index" :data-bm='item.mc' @click="chooseBm" v-if="bmList.length != 0">{{item.mc}}</li>  
                                 <div v-if="bmList.length == 0" style="color:#aaa;text-align:center">无数据</div>
                               </ul>
                            </el-collapse-transition>
                        </el-form-item>
                        <el-form-item label="性别" >
                             <el-select v-model="form.sex" placeholder="请选择" style="width:200px">
                                <el-option  label="男" value="1" ></el-option>
                                <el-option  label="女" value="2" ></el-option>
                            </el-select>
                        </el-form-item>
                        <p style="color:#aaa;font-weight:700;font-size:12px;padding:0 20px">( 注 : 手机号为用户默认登录账号 )</p>
                    </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="innerVisible = false" size="mini">取 消</el-button>
                            <el-button type="primary" @click="handleCommit" size="mini">确 定</el-button>
                        </div>
                 </el-dialog>
        </el-dialog>

  </div>
</template>
<script>
import {
  queryProjectParticipantMap,
  queryUser,
  addProjectParticipant,
  deleteProjectParticipant,
  modifyProductLeader,
  AddOutStaff,
  queryDwUsers
} from "@/api/personal.js";
import pagination from "@/components/BusinessPage/pagination.vue";
import { getResponsibleTaskList } from "@/api/common.js";
import { getUnits, getDepts } from "@/api/system.js";
import { EventBus } from "../../utils/util.js";
import { getMenu,getSession} from '@/utils/util.js'
import Scrollbar from 'smooth-scrollbar';
export default {
  data() {
    return {
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
        cpx: "",
        rylx: "1013",
        yhdw: "",
        dw: "",
        bm: "",
        sex:''
      },
      cpxData: [],
      sexList:[],
      keyword: "",
      BtnDisabled: "",
      rylb: "",
      dwList: [],
      bmList: [{mc:'1'},{mc:'2'},{mc:'3'},{mc:'4'}],
      selectVisible:false
    };
  },
  props: {
    fbbh: {
      type: String,
      default: ""
    },
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
    }
  },
  methods: {
    handleBMfocus(){
        this.selectVisible = true
    },
    handleBMblur(){
        this.selectVisible = false
    },
    chooseBm(e){        // 选择部门
        let bm = e.target.getAttribute('data-bm');
        this.form.bm = bm
    },
    chooseRylb(val) {  // 选择人员类别
      if (this.isAddCyz) {
        this.queryUser(1, false);
      } else {
        this.queryUser(1, true);
      }
    },
    delectUser(e, param) {
      if (typeof param == "number") {
        let yhbh = e.target.getAttribute("data-wid");

        this.$confirm("是否删除此参与者?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteProjectParticipant({
              xmbh: this.xmbh,
              yhbh: yhbh
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
      }
    },
    addStaff(e) {
      e.currentTarget.setAttribute("disabled", "disabled");
    },
    changeJfZrr(e) {
      //添加甲方
      this.isAddCyz = false;
      this.queryUser(1, true);
      this.dialogVisible = !this.dialogVisible;
    },
    queryUser(curPage, needShowCyz) {
      queryDwUsers({
        curPage: curPage,
        pageSize: this.pageSize,
        xmbh: this.xmbh,
        unittype: this.rylb,
        //   onlyxx:onlyxx,
        needShowCyz: needShowCyz,
        keyword: this.keyword || ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.total = data.data.records;
          this.UserList = data.data.rows;
          this.UserList.forEach((ele, i, arr) => {
            if (ele.userName.slice(0, 1) == 1) {
              ele.userName = `${ele.userName.slice(0,3)}****${ele.userName.slice(-4)}`;
            }
          });
        }
      });
    },
    handleNewAdd() {
      // 新增参与者
      this.queryUser(1, false);
      this.isAddCyz = true;
      this.BtnDisabled = "";
      this.dialogVisible = !this.dialogVisible;
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
    addItemCyz(e, param) {
      let user = e.currentTarget.getAttribute("data-info");
      let yhbh = user.split("&")[1];
      let yhxm = user.split("&")[0];
      addProjectParticipant({
        xmbh: this.xmbh,
        yhxm: yhxm,
        yhbh: yhbh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$emit("addItemuser", "");
          this.queryProjectParticipantMap();
          this.UserList[param].state = "ytj";
        } else {
          this.BtnDisabled = "";
        }
      });
    },
    //   搜索用户
    searchUser(val) {
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
      if(getSession('cp') == null || getSession('GenderType') == null){
           getMenu('cp',this.cpxData,true)  //获取产品
           getMenu('GenderType',this.sexList)  //获取产品线
     }else{
          this.cpxData = getSession('cp');
          this.sexList = getSession('GenderType');
     } 
      this.getUnits();
      this.getDepts();
    },
    // else if (!/^[\w]{6,12}$/.test(this.form.pwd)) {
    //     this.$alert("请输入正确密码格式", "提示", {
    //       confirmButtonText: "确定",
    //       type: "error"
    //     });
    //   }
    handleCommit() {        
      if (!this.form.name) {
        this.$alert("请输入姓名", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
      }else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.form.phone.trim())) { //^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$
        this.$alert("请输入手机号码或号码有误", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
      } else if (!/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(this.form.email.trim())) {
        this.$alert("请输入正确邮箱地址或地址有误", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
      }else if(this.form.rylx=='1013'&&this.form.bm==""){
         this.$alert("请填写部门", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
      }else if(this.form.rylx=='1004'&&this.form.dw==""){
         this.$alert("请选择单位", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
      } else {
        AddOutStaff({
          xmbh: this.xmbh,
          name: this.form.name,
          telNum: this.form.phone,
          email: this.form.email,
          pwd: this.form.pwd,
          cpxdata: this.form.cpx.join("|"),
          rylx: this.form.rylx,
          unitnum:this.form.rylx=='1013'?'':this.form.dw.split('&')[0],
          unit:this.form.rylx=='1013'?'':this.form.dw.split('&')[1],
          dept:this.form.rylx=='1004'?'':this.form.bm,
          sex:this.form.sex==''?'0':this.form.sex
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
    addItemJfzrr(e) {
      let user = e.currentTarget.getAttribute("data-info");
      let yhbh = user.split("&")[1];
      let yhxm = user.split("&")[0];

      modifyProductLeader({
        xmbh: this.xmbh,
        yhxm: yhxm,
        yhbh: yhbh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.$alert("修改成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.$emit("addItemuser", "");
            }
          });
          this.queryProjectParticipantMap();
          this.dialogVisible = !this.dialogVisible;
        }
      });
    },
    //   获取项目相关人员
    queryProjectParticipantMap() {
      queryProjectParticipantMap({
        xmbh: this.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          if(!data.data.jf){
               this.itemJfzrr = {};
          }else{
              this.itemJfzrr = data.data.jf;
              this.itemJfzrr.roleName = this.itemJfzrr.roleName.slice('0,3')
              this.itemJfzrr.roleName = this.itemJfzrr.roleName.split(',')
          }
          if(!data.data.yf){
            this.itemYfzrr = {};
          }else{
            this.itemYfzrr = data.data.yf;
            this.itemYfzrr.roleName = this.itemYfzrr.roleName.slice('0,3');
            this.itemYfzrr.roleName = this.itemYfzrr.roleName.split(',')
          }
           this.itemCyz = data.data.qt;
        }
      });
    },

    getUnits() {  //获取单位
      getUnits({
        dwlx: 2,
        keyword: ""
      }).then(({ data }) => {
        if (data.state == "success") {
            this.dwList = data.data;
        }
      });
    },
    getDepts() {  //获取部门
      getDepts({
        dwbh: "",
        dwmc: this.dwmc
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data != null) {
            this.bmList = data.data;
          }
           else {
            this.bmList = [];
          }
        }
      });
    }
  },
  mounted() {
    this.queryProjectParticipantMap();
    Scrollbar.init(document.querySelector('.item-addUser-list'));
  },
  components: { pagination }
};
</script>
<style scoped>
.item-addUser-list{
  overflow-y: auto;
}
.item-addUser-list .item-user-role{
  overflow: hidden;
}
.item-addUser ul li button{
    float: left;
    padding: 4px 10px;
}
.item-addUser {
  background: rgb(248, 248, 248);
}
.item-addUser .el-input {
  margin: 10px;
  width: 90%;
}
.item-addUser ul {
  height: 310px;
  padding: 5px 8px;
}
.item-addUser ul li {
  border-bottom: 1px solid #ccc;
  line-height: 36px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  white-space: nowrap;
}

.item-addUser ul li:hover {
  cursor: pointer;
  background: #eee;
}
.item-user-delect{
  width: 48px;
  text-align: center;
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
  width: 72px;
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

 .component-fade-enter-active ,.component-fade-leave-active {
   transition: all 0.3s ease;

}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
.bm-select{
  width: 200px;
  max-height: 260px;
  border: 1px solid #c0c4cc;
  background: #fff;
  overflow-y: auto;
  border-radius: 5px;
  position: absolute;
  top: 33px;
  color: #606266;
}
.bm-select li,.bm-select div{
  padding:3px 10px;
}
.bm-select li:hover{
  cursor: pointer;
  background: #f5f7fa;
}
</style>
