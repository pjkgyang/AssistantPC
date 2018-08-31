<template>
 <div class="item-addUser-xmtd">
   <div class="item-addUser-xmtd--addbtn">
     <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="handleAddcy">添加团队成员</el-button>
   </div>
   <div class="item-addUser-outtable">
      <el-table :data="xmtdList" style="width: 100%" border>
        <el-table-column
            fixed="left"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="info" size="mini" plain>编辑</el-button>
              <el-button @click="handleDeleteClick(scope.$index,scope.row,xmtdList)" type="danger" size="mini" plain >删除</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="cymc" label="成员名称" width="150"></el-table-column>
        <el-table-column prop="fbmc" label="分包名称" width="250" show-overflow-tooltip></el-table-column>
        <el-table-column prop="cpmc" label="产品名称" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="产品负责人" width="110">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{!scope.row.sfcpfzr?'否':'是'}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="jhfpfy" label="费用" width="110" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ydgznr" label="工作内容"  show-overflow-tooltip></el-table-column>
        <el-table-column prop="ydkssj" label="开始日期" width="110"></el-table-column>
        <el-table-column prop="ydjssj" label="结束日期" width="110"></el-table-column>
        <!-- <el-table-column prop="fbbh" label="分包编号" width="130"></el-table-column> -->
        <!-- <el-table-column prop="cpbh" label="产品编号" width="130"></el-table-column> -->
      </el-table>
    </div>

    <el-dialog
      title="选择用户"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="750px">
      <div class="item-addUser-xmtd--dialog">
        <div>
           <el-input v-model="keyword" size="mini" placeholder="请输入用户姓名/工号/手机号" @change="handleQueryuser"></el-input>
        </div>
          <ul class="item-addUser-xmtd--userList">
              <li>
                <span>姓名</span>
                <span>工号/手机号</span>
                <span>邮箱</span>
                <span>操作</span>
              </li>
              <li v-for="(user,i) in userList">
                <span>{{user.username}}</span>
                <span>{{user.usercode}}</span>
                <span>{{user.email}}</span>
                <span><el-button size="mini" @click="handleChooseUser(user)">选择</el-button></span>
              </li>
          </ul>
           <div v-if="total > 12" style="text-align:center">
             <pagination :pageSize="12" :total="total" @handleCurrentChange="handleCurrentChange"></pagination>
           </div>
      </div>
    </el-dialog>
    <el-dialog
        width="750px"
        title="团队成员信息"
        :visible.sync="innerVisible"
        :close-on-click-modal='false'
        append-to-body>
        <el-form ref="form" :model="tdcyInfo" label-width="110px" size="mini" :inline="true" style="padding:5px 10px">
            <el-form-item label="分包" required >
              <el-select v-model="tdcyInfo.fbbh" placeholder="请选择" style="width:510px">
                <el-option v-for="(fb,i) in fbxxList" :key="i" :label="fb.id+' '+fb.text" :value="fb.id"></el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item label="成员" required>
              <el-input v-model="tdcyInfo.cymc" readonly style="width:510px"></el-input>
            </el-form-item>
            <el-form-item label="产品" required>
              <el-select v-model="tdcyInfo.cp" placeholder="请选择" style="width:510px">
                <el-option v-for="(cp,i) in xmcpList" :key="i" :label="cp.cp" :value="cp.cpbh+'&'+cp.cp"></el-option>
              </el-select>
            </el-form-item><br>
            <el-form-item label="负责业务" required>
              <el-select v-model="cpxdata" multiple placeholder="请选择"  style="width:428px" :disabled="isAllCpx">
                <el-option v-for="(cpx,i) in cpxData" :key="i" :label="cpx.mc" :value="cpx.mc+','+cpx.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" >
                <el-checkbox v-model="isAllCpx">全部</el-checkbox>
            </el-form-item>
            <el-form-item label="计划开始日期" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="tdcyInfo.ydkssj" value-format="yyyy-MM-dd" style="width:193px"></el-date-picker>
            </el-form-item>
            <el-form-item label="计划结束日期" required>
              <el-date-picker type="date" placeholder="选择日期" v-model="tdcyInfo.ydjssj" value-format="yyyy-MM-dd" style="width:193px"></el-date-picker>
            </el-form-item>
            <el-form-item label="金额" required>
              <el-input v-model="tdcyInfo.jhfpfy" style="width:193px"></el-input>
            </el-form-item>
             <el-form-item label="产品负责人" >
               <el-radio-group v-model="sfcpfzr" :disabled='iscpzrr && wid != ""'>
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="工作内容">
              <el-input type="textarea" v-model="tdcyInfo.ydgznr" :rows="5" :cols="88"></el-input>
            </el-form-item><br>
          </el-form>
            <div style="text-align:right;padding:8px 20px;">
                  <el-button type="primary" @click="handleSaveinfo" size="mini">保存</el-button>
            </div>
      </el-dialog>    

 </div>
</template>

<script>
import { getTeamMembers ,getProjectCatalog,getFbxxSelect,getUsers,deleteTeamMember,saveTeamMember} from '@/api/xmtd.js'
import { getRyCpx} from '@/api/personal.js'
import pagination from '@/components/BusinessPage/pagination.vue'
import { getMenu,getSession} from '@/utils/util.js'
 export default {
   data () {
     return {
           dialogVisible:false,
           innerVisible:false,
           xmtdList:[],
           thList:['成员名称','分包名称','分包编号','产品编号','产品名称','开始日期','结束日期','工作内容'],
           xmcpList:[],
           fbxxList:[],
           userList:[],
           keyword:"",
           total:null,
           cpxData:[],
           tdcyInfo:{
             fbbh:"",
             cymc:"",
             cybh:"",
             cp:"",
             jhfpfy:"",
             ydkssj:"",
             ydjssj:"",
             ydgznr:"",
           },
            sfcpfzr:true,
            userId:'',
            cpxdata:[],
            wid:"",
            fzywList:[],
            iscpzrr:false,
            isAllCpx:''
       }
   },
   props:{
      tabName:{
        type:String,
        default:''
      },
      xmbh:{
         type:String,
         default:''
      }
   },
   mounted(){
      
   },
   methods:{
        handleSaveinfo(){  //保存团队成员
           if(!this.validate()) return;
           if(this.wid){
              this.saveTeamMember(this.wid);
           }else{
              this.saveTeamMember('');
           }
        },
        handleAddcy(){
            this.getUsers(1,0);
            this.dialogVisible = !this.dialogVisible;
        },
        handleQueryuser(){ // 查询用户
            this.getUsers(1,0);
        },
        handleCurrentChange(data){  // 分页
            this.getUsers(data,0);
        },

        handleClick(data){ //编辑 团队成员
            this.cpxdata = [];
            this.wid = data.wid
            this.tdcyInfo.fbbh = data.fbbh;
            this.tdcyInfo.cymc = data.cymc;
            this.tdcyInfo.cybh = data.cybh;
            this.tdcyInfo.cp =  !data.cpbh?'':data.cpbh+'&'+data.cpmc;
            this.tdcyInfo.ydkssj = data.ydkssj;
            this.tdcyInfo.ydjssj = data.ydjssj;
            this.tdcyInfo.jhfpfy = data.jhfpfy;
            this.tdcyInfo.ydgznr = data.ydgznr;
            this.sfcpfzr = data.sfcpfzr
            this.iscpzrr = data.sfcpfzr
            this.userId = data.userId
            getRyCpx({  // 获取用户 业务
              yhbh:data.userId,
              xmbh:this.xmbh
            }).then(({data})=>{
                if(data.state=='success'){
                  this.isAllCpx = data.data.isAllCpx
                  if(data.data.isAllCpx){
                    this.cpxdata = [];
                  }else{
                    if(data.data.cpx && data.data.cpx.length !=0){
                        data.data.cpx.forEach((ele,i,arr)=>{
                        this.cpxdata.push(ele.cpxmc+','+ele.cpxbh);
                     })
                    }else{
                        this.cpxdata = [];
                    }
                  }
                }
            })
            this.innerVisible = true
        },
        handleDeleteClick(index,data,rows){ // 删除团队成员
          this.$confirm('是否删除该成员?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteTeamMember({wid:data.wid}).then(({data})=>{
                if(data.state == 'success'){
                  this.$alert('删除成功', '提示', {confirmButtonText: '确定', type:'success',callback: action => {
                    rows.splice(index, 1);
                  }});   
                }else{
                  this.$alert(data.msg, '提示', {confirmButtonText: '确定', type:'error',callback: action => {}});   
                }
            })
          }).catch(() => {});
        },  
        handleChooseUser(data){  // 选择用户
            this.tdcyInfo = {};
            this.cpxdata = [];
            this.wid = '';
            this.iscpzrr =  false; // 是否产品责任人
            this.isAllCpx = true; // 默认全部（负责业务）
            this.tdcyInfo.cymc = data.username
            this.tdcyInfo.cybh = data.usercode
            this.userId = data.userid
            this.innerVisible = !this.innerVisible;
        },
        getTeamMembers(){//获取团队成员
            getTeamMembers({
              xmbh:this.xmbh
            }).then(({data})=>{ 
                if(data.state == 'success'){
                  if(data.data && data.data.length != 0){
                    this.xmtdList = data.data
                  }else{
                    this.xmtdList = []
                  }
                }else{
                   this.$alert(data.msg, '提示', {confirmButtonText: '确定', type:'error',callback: action => {}});   
                }
            })
        },
        getUsers(curPage,unitType){ //获取用户
            getUsers({
              curPage:curPage,
              pageSize:12,
              unitType:unitType,
              keyword:this.keyword}).then(({data})=>{
                if(data.state == 'success'){
                  this.userList = data.data.rows
                  this.total = data.data.records
                }else{
                   this.$alert(data.msg, '提示', {confirmButtonText: '确定', type:'error',callback: action => {}});   
                }
              })
        },
        saveTeamMember(wid){
          saveTeamMember({
              wid:wid,
              xmbh:this.xmbh,
              cybh:this.tdcyInfo.cybh,
              userId:this.userId,
              cymc:this.tdcyInfo.cymc,
              cpmc:this.tdcyInfo.cp.split('&')[1],
              cpbh:this.tdcyInfo.cp.split('&')[0],
              fbbh:this.tdcyInfo.fbbh,
              ydkssj:this.tdcyInfo.ydkssj,
              ydjssj:this.tdcyInfo.ydjssj,
              jhfpfy:this.tdcyInfo.jhfpfy,
              ydgznr:this.tdcyInfo.ydgznr,
              sfcpfzr:this.sfcpfzr,
              cpxdata:this.isAllCpx?'':this.cpxdata.join('|'),
              isAllCpx:this.isAllCpx
          }).then(({data})=>{
              if(data.state == 'success'){
                this.innerVisible = false;
                 this.$alert('保存成功', '提示', {
                  confirmButtonText: '确定',
                  type:"success",
                  callback: action => {
                       this.getTeamMembers();  
                  }
                });
              }else{
                  this.$alert(data.msg, '提示', {confirmButtonText: '确定', type:'error',callback: action => {}});   
              }
          })
        },

       validate(){
         if(!this.tdcyInfo.fbbh){
           this.$alert('请选择分包', '提示', {confirmButtonText: '确定', type:'warning',callback: action => {}});
           return false;
         }else if(!this.tdcyInfo.cp){
           this.$alert('请选择产品', '提示', {confirmButtonText: '确定', type:'warning',callback: action => {}});
           return false;
         }else if(!this.isAllCpx && this.cpxdata.length == 0){
           this.$alert('请选择负责业务', '提示', {confirmButtonText: '确定', type:'warning',callback: action => {}});
           return false;
         }else if(!/^\d+(\.\d+)?$/.test(this.tdcyInfo.jhfpfy)){
           this.$alert('请填写正确金额', '提示', {confirmButtonText: '确定', type:'warning',callback: action => {}});
           return false;
         }else if(!this.tdcyInfo.ydkssj){
           this.$alert('请选择计划开始日期', '提示', {confirmButtonText: '确定', type:'warning',callback: action => {}});
           return false;
         }else if(!this.tdcyInfo.ydjssj){
           this.$alert('请选择计划结束日期', '提示', {confirmButtonText: '确定', type:'warning',callback: action => {}});
           return false;
         }else{
           return true;
         }
       }
   },
   watch:{
      tabName(n,o){
        if(n == 'second'){
            this.getTeamMembers();
            if(!getSession('cp')){
                getMenu('cp',this.cpxData,true)  //获取产品
            }else{
                this.cpxData = getSession('cp');
            }
            if(this.xmcpList.length == 0){
               getProjectCatalog({xmbh:this.xmbh}).then(({data})=>{ // 获取项目产品
               if(data.state == 'success'){
                 this.xmcpList = data.data
               }    
              }) 
            }
            if(this.fbxxList.length == 0){
              getFbxxSelect({xmbh:this.xmbh}).then(({data})=>{ // 获取分包信息
                if(data.state == 'success'){
                  this.fbxxList = data.data
                } 
              })
            }  
         }
      }
   },
   components: {pagination}
 }
</script>

<style scoped>
.item-addUser-xmtd-xmtd {
  margin: 0 20px;
  width: 70vw;
}
.item-addUser-xmtd--addbtn{
  text-align: right;
  padding-bottom:10px;
}
.item-addUser-outtable{
  max-height: 65vh;
  overflow-y: auto;
}
.item-addUser-outtable button{
  padding: 5px 8px;
}
.item-addUser-xmtd--dialog div{
   margin: 5px 0;
   padding: 0 6px;
}
.item-addUser-xmtd--userList li{
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-addUser-xmtd--userList li:hover{
  background: #ecf5ff;
}
.item-addUser-xmtd--userList li:nth-of-type(1){
  background: #dbdddf;
  font-weight: 700;
}
.item-addUser-xmtd--userList li span{
  display: inline-block;
   width: 25%;
   text-align: center;
}
</style>
