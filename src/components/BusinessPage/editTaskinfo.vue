<template>
  <div class="edit-task-dialog" @click="selectHide">
         <div class="task-detail-scenario-infos-wrap">
              <div><span  class="el-icon-service"> 责任人</span> 
               <div style="width:82%;white-space:nowrap;">
                 <div style="float:left;">
                  <span class="item_zrr">甲</span> :
                  <span style="width:50px;display:inline-block">{{cpinfo.jfzrrxm == ''?'暂无':cpinfo.jfzrrxm}}</span>
                  <span  v-if="!jfshown">
                   <el-select style="width:200px" v-model="cpInfo.jfzrr" filterable  size="mini" placeholder="请选择/搜索责任人">
                    <el-option  
                         v-for="(item,index) in options"
                        :key="index"
                        :label="item.userName"
                        :value="item.userName+'&'+item.userId">
                       </el-option>
                   </el-select>
                   </span>
                   <span><el-button size="mini" @click="changeCPJfzrr">{{this.jfshown==true?'修改':'取消修改'}}</el-button></span>
                   <span v-if="!jfshown"><el-button size="mini" @click="CommitChangeCPJfzrr">确定修改</el-button></span>
                </div>
                <div style="float:left">
                <span class="item_zrr item_zrr_YF">乙</span> :
                <span style="width:50px;display:inline-block">{{cpinfo.yfzrrxm == ''?'暂无':cpinfo.yfzrrxm}}</span>
                  <span v-if="!yfshown">
                    <el-select style="width:200px" v-model="cpInfo.yfzrr" filterable  size="mini" placeholder="请选择/搜索责任人">
                          <el-option  
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.userName"
                            :value="item.userName+'&'+item.userId">
                          </el-option>
                      </el-select>
                  </span>
                   <span><el-button size="mini"  @click="changeCPYfzrr">{{this.yfshown==true?'修改':'取消修改'}}</el-button></span>
                   <span v-if="!yfshown"><el-button size="mini" @click="CommitChangeCPYfzrr">确定修改</el-button></span>
                </div>
                </div>
              </div>               
          </div>
            <div class="involve-view">
                  <p>参与者</p>
                   <el-tag
                      :key="index"
                      v-for="(tag,index) in dynamicTags"
                      :closable="tag.del == true"
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag.userName}}
                   </el-tag>
                   <el-button  class="button-new-tag" type="primary" @click="addUser">+</el-button>
                   <el-collapse-transition>
                    <ul class="task_participant" v-if="selectShow">
                          <li><el-input v-model="name" placeholder="搜索姓名"></el-input></li>
                          <ul style="height:180px;overflow-y:auto">
                            <li v-for="(list,index) in listt0" :data-label="list.userName+'&'+list.userId+'&'+index" :key="index" @click="addTaskParty">
                              <span style="display:inline-block;width:50px;">{{list.userName}} </span>
                              <span>{{list.userCode}}</span>
                              <span class="el-icon-check" style="float:right;margin-top:5px" v-if="partyArr.indexOf(index) != -1"></span>
                            </li>
                          </ul>
                    </ul>
                   </el-collapse-transition>
             </div>
  </div>
</template>
<script>
import { queryProjectParticipant ,modifyProductLeader,addProductParticipant ,queryProductParticipant } from "@/api/personal.js";
export default {
  data(){
      return{
        listt0: [],
        list0: [],
        dynamicTags:[],
        selectShow:false,
        input:"",
        name:"",
        partyArr:[],
        cpInfo:{
          jfzrr:'',
          yfzrr:'',
          bz:''
        },
        options:[],
        jfshown:true,
        yfshown:true,
        changeObj:{}
      }
  },
  props:{
      dialogEditTaskVisible:{
          type:Boolean,
          default:""
      },
      cpinfo:{
        type:Object,
        default:function(){
          return {}
        }
      },
      xmbh:{
        type:String,
        default:""
      }
  },
  mounted(){
            this.partyArr = [];
            this.listt0.forEach((ele,i,input)=>{
                 if(JSON.stringify(this.dynamicTags).indexOf(JSON.stringify(this.listt0[i])) != -1){
                       this.partyArr.push(i)
                  }
            })
          
       this.queryUser();
       this.queryProductParticipant();
  },
  methods:{
      selectHide(e){
        if(e.target.className != 'el-input__inner'){
            this.selectShow=false
        }
      },
      handleClose(tag) {  //删除参与人
          this.$confirm('删除此参与人?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteProductParticipant({
                xmbh:this.xmbh,
                cpbh:this.cpinfo.cpbh,
                cpmc:this.cpinfo.cp,
                yhxm:tag.userName,
                yhbh:tag.userId,
            }).then(({data})=>{
               if(data.state == 'success'){
                  this.$alert('这是一段内容', '标题名称', {
                  confirmButtonText: '确定',
                  callback: action => {
                     this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                  }
                });
               }
            })
          }).catch(() => {});
      },
      addUser(e) {      //添加按钮
        e.stopPropagation();
        this.selectShow = !this.selectShow;
      },
      addTaskParty(e){  //添加参与者
           let label = e.currentTarget.getAttribute('data-label');
           let index = label.split('&')[2]
           let yhbh = label.split('&')[1]
           let yhxm = label.split('&')[0]
           let userArr = []
           if(this.dynamicTags.length != 0){
              this.dynamicTags.forEach((ele,i,arr)=>{
                  userArr.push(this.dynamicTags[i].userName)
              })
              if(userArr.indexOf(this.dynamicTags[i].userName) != -1){
                return ;
              }
           }
    
          // 增加产品参与者
          addProductParticipant({
            xmbh:this.xmbh,
            cpbh:this.cpinfo.cpbh,
            cpmc:this.cpinfo.cp,
            yhxm:yhxm,
            yhbh:yhbh,
          }).then(({data})=>{
              if(data.state == 'success'){
                this.dynamicTags.push(this.listt0[index]);
              }
          })
          this.selectShow = !this.selectShow
      },


    // 修改产品甲方责任人
    changeCPJfzrr(){
     this.jfshown =!this.jfshown
    },
    // 修改产品乙方责任人
    changeCPYfzrr(){
     this.yfshown =!this.yfshown
    },
    // 修改产品甲方 责任人
    CommitChangeCPJfzrr(){
       this.modifyProductLeader(
          this.cpInfo.jfzrr.split('&')[1],
          this.cpInfo.jfzrr.split('&')[0],
          true 
         );
    },
    // 修改产品乙方 责任人
    CommitChangeCPYfzrr(){
        this.modifyProductLeader(
         this.cpInfo.yfzrr.split('&')[1],
         this.cpInfo.yfzrr.split('&')[0]
       );
    },
    // 获取用户
    queryUser(){
      queryProjectParticipant({
        xmbh:this.cpinfo.xmbh,
      }).then(({data})=>{
            if(data.state == 'success'){
               this.options = data.data
               this.listt0 = data.data
               this.list0 = data.data
            }
      })

    },
    queryProductParticipant(){
            queryProductParticipant({
                  xmbh:this.xmbh,
                  cpbh:this.cpinfo.cpbh,
                  cpmc:this.cpinfo.cp,
                }).then(({data})=>{
                   if(data.state == 'success'){
                     if(data.data == null){
                       this.dynamicTags = []
                     }else{
                       this.dynamicTags = data.data
                     }
                   }
              })
      },
  // 修改甲方责任人（产品）
modifyProductLeader(yhbh,yhxm,isJf){
  modifyProductLeader({
    xmbh:this.xmbh,
    yhbh:yhbh,
    yhxm:yhxm,
    cpmc:this.cpinfo.cp,
    cpbh:this.cpinfo.cpbh,
    isJf:isJf||""
  }).then(({data})=>{
    if(data.state == 'success'){
      this.changeObj.isJf = isJf
      this.changeObj.xm = yhxm
      if(isJf){
        this.$alert('修改成功', '提示', {
          confirmButtonText: '确定',
          type:'success',
          callback: action => {
              this.cpinfo.jfzrrxm =  this.cpInfo.jfzrr.split('&')[0]
          }
        });
      }else{
          this.$alert('修改成功', '提示', {
          confirmButtonText: '确定',
          type:'success',
          callback: action => {
              this.cpinfo.yfzrrxm = this.cpInfo.yfzrr.split('&')[0]
          }
        });
      }
        this.yfshown = true
        this.$emit('changeCPzrr',this.changeObj)
    }
  })
}
  },
  watch:{

        name(n,o){
                  var _this=this;
                         var tab = this['list0'];
                         if(this.name){                                     
                            _this['listt0']=[];                     
                                tab.forEach(function (item,i,input){
                                    if(tab[i].userId.indexOf(_this.name) >= 0 ||tab[i].userName.indexOf(_this.name) >= 0) {
                                        _this['listt0'].push(tab[i]);
                                    }
                                });
                         }else{
                             _this['listt0'] = tab
                         };
  
        },
        dialogEditTaskVisible(n,o){   
            if(n){ 
                this.jfshown = true;
                this.yfshown = true;
                this.queryUser();
                this.queryProductParticipant();
                this.partyArr = [];
                this.listt0.forEach((ele,i,input)=>{
                     if(JSON.stringify(this.dynamicTags).indexOf(JSON.stringify(this.listt0[i])) != -1){
                       this.partyArr.push(i)
                     }
                })
          }else{
            this.selectShow = false
          }
         
        },
        dynamicTags(n,o){
          this.partyArr = [];
          if(this.dialogEditTaskVisible == true){
                  this.listt0.forEach((ele,i,input)=>{
                   if(JSON.stringify(this.dynamicTags).indexOf(JSON.stringify(this.listt0[i])) != -1){
                       this.partyArr.push(i)
                     }
                })
          }
        },
    }
}
</script>
<style scoped>
/* .edit-task-dialog{
 padding:  0 20px;
} */
.task-detail-scenario-infos-wrap{
  border-bottom: 1px solid #ccc;
   padding:  0 20px;
}
.task-detail-scenario-infos-wrap>div{
  margin: 20px 0;
  display: flex;
  align-items: center;
}
.task-detail-scenario-infos-wrap>div textarea{
  resize:none; 
}
.task-detail-scenario-infos-wrap>div>span:nth-of-type(1){
  margin-right: 20px;
  color: #a6a6a6;
  width: 13%;
}
.el-icon-service{
  height: 50px;
  line-height: 50px;
}
.task-detail-scenario-infos-wrap>div input,.task-detail-scenario-infos-wrap>div div{
    width: 82%;
    padding:3px;
    outline: none;
    color: #666;
    display: inline-block;
    vertical-align: top;
}
.task-detail-scenario-infos-wrap>div input:hover{
  background: #eee;
}
.involve-view{
  border-bottom: 1px solid #ccc;
  padding: 10px 20px 20px;

}
.involve-view button{
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 20px;
}
.el-tag{
  margin-right: 5px;
}
.task_participant{
  position: fixed;
  background: #fff;
  width: 220px;
  box-shadow:0 2px 12px 0 rgba(0,0,0,.3);
  padding-top: 10px;
  margin-top: 10px;
}
.task_participant li:hover{
  background: #e5e5e5;
  cursor: pointer;
}
.task_participant li{
  padding: 2px 20px;
}
.task_participant .invite_newPerson{
  color: #549EF6;
  font-weight: 700;
}
.task_participant  .invite_newPerson span{
  display: inline-block;
  vertical-align: middle;
  font-size: 26px;
  color: #549EF6;
}
.item_zrr{
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #aaa;
  border-radius:50%;
  text-align: center;
  background: #B2DFEE;
  color: #000 !important;  
  line-height: 20px;
  margin:5px 0 0 0;
}
.item_zrr_YF{
  background: #ccc;
}
</style>
