<template>
  <div class="item-user-banner">
      <div v-if="!shown">
            <breadcrumb :crumb="crumb" v-if="xmdetail"></breadcrumb>
            <slot name="xmmc"></slot>
      </div>
      <div v-if="fbdetail" style="width:63%;display:flex;justify-content: space-between;">
        <div v-if="shown">
            <div class="item-curmb">
                <span @click="handleBack">项目看板(项目列表)</span> <span class="el-icon-arrow-right"></span><span>更多项目</span>
            </div>
        </div>
        <div v-if="!shown">
                <el-tabs v-model="banberActive" @tab-click="handleClick">
                    <el-tab-pane label="概览" name="overview"></el-tab-pane>
                    <el-tab-pane label="进度" name="process"></el-tab-pane>
                    <el-tab-pane label="问题" name="question"></el-tab-pane>
                    <el-tab-pane label="投诉" name="complain"></el-tab-pane>                    
                    <el-tab-pane label="配置库" name="files"></el-tab-pane>
                    <!-- 学校成员 1  不显示 -->
                    <el-tab-pane label="里程碑" name="milestone" v-if="isJZuser != 1"></el-tab-pane> 
                    <el-tab-pane label="模板" name="template" v-if="groupTag.indexOf('JZGCRY') != -1"></el-tab-pane>
                    <el-tab-pane label="团队" name="teamwork" v-if="isJZuser != 1"></el-tab-pane>
                    <el-tab-pane label="主动式服务" name="zdsfw"></el-tab-pane>
                </el-tabs>
        </div>
        
        <div style="height:100%" v-if="!shown">
            <p style="margin-left:30px !important;height:40px;" title="新建钉钉群" @click.prevent="handleAddDDgroup"  v-if="Operatepower">
               <img src="static/img/dingding.png" alt="" style="width:22px;height:22px;">
            </p>
          <!-- // 只有金智的显示 -->
            <p @click.prevent="handleItemUser" title="项目人员管理"  v-if="isJZuser == 0"> 
                <span><img src="static/img/rygl.png" alt=""  ></span> 
                <span style="font-size:14px;">{{userNum}}</span>
            </p>
        </div>
      </div>
  </div>
 
</template>
<script>
import breadcrumb from '@/components/BusinessPage/breadcrumb.vue'

export default {
    data(){
      return{
            show:false,
            banberActive:"overview",
            crumb:[{
                    mc:'项目看板',
                    path:"/businesspage/projects"
                },{
                    mc:'项目详情',
                    path:""
                }],
            isJZuser:'',
            groupTag:''
        }
    },


    props:{
      userNum:{
         type:Number,
         default:5
      },
      shown:{
         type:Boolean,
         default:true 
      },
      fbdetail:{
         type:Boolean,
         default:false 
      },
      bannerACtive:{
        type:String,
        default:""
      },
      itemMc:{
        type:String,
        default:""
      },
      Operatepower:{
         type:Boolean,
         default:true   
      },
      xmdetail:{
         type:Boolean,
         default:true     
      }
  },
  mounted(){
        this.isJZuser =  sessionStorage.getItem('isJZuser')
        this.groupTag = JSON.parse(sessionStorage.userInfo).userGroupTag
  },
  computed:{
    xminfo:{
        set(){
        },
        get(){
           return  this.itemMc 
        },
    }
  },
  methods:{
    handleItemUser(e){
        this.$emit('handleItemUser','')
    },
    handleBack(){
        this.$emit('handleBack','')
    },
    handleClick(tab,event){
        let name = tab.name
        this.$emit('handleTabsClick',name)
    },
    handleAddDDgroup(){
       this.$emit('handleAddDDgroup','') 
    }
  },
 watch:{
      bannerACtive(n,o){
        if(n=='overview'){
            this.banberActive = "overview"
        }else{
           this.banberActive = n 
        }
      },
      xminfo(n,o){
           this.crumb[1].mc = n
      }
 },
  components:{breadcrumb}
}
</script>
<style scoped>
.item-user-banner{
    height: 40px;
    padding: 0 50px;
    line-height: 40px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(240, 240, 240);
    box-shadow:0 2px 10px 0 rgba(0,0,0,.2);
    z-index:33; 
    min-width: 1200px;
}

.item-user-banner p{
    height: 100%;
    float: right;
}
.item-user-banner p:hover{
    cursor: pointer;
}

.item-user-banner >p>span:nth-of-type(1){
    display: inline-block;
    height: 100%;
    width:33px;
    text-align: right;
    font-size: 20px;   
}
.item-user-banner >p>span:nth-of-type(2){
    display: inline-block;
    height: 100%;
    vertical-align: center;
    font-size: 15px;    
}
.item-curmb{
    font-size: 14px;
}
.item-curmb span:nth-of-type(1){
    color: #303133 !important;
    font-weight: 700;
}
.item-curmb span:nth-of-type(1):hover{
    cursor: pointer;
    color:#409EFF !important;
}
.item-curmb span:nth-of-type(3){
    color: #606266;
}
.item-user-itemInfo{
    font-size:12px;
    width:23%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    color: #999;
}

</style>
