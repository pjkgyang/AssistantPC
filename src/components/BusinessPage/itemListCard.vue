<template>
<div>
    <ul v-if="!show" class="project-xmkb">
        <li  v-for="(data,index) in datas" :key="index" :data-fbbh="data.fbbh" v-if="datas.length != 0" @click="handlePage($event,index)">
            <div class="project-grid-card">
                    <div class="project-grid-card-top">
                        <div>
                            <img :src="data.logo" :onerror="errorImg">
                        </div>
                        <div>
                            <div class="project-grid-card_projectInfo"> 
                                <p :title="data.dwmc" style="font-size: 14px;color: #A8A8A8;">{{data.dwmc}}</p>
                                <p style="font-size: 12px;color: #363748;margin:5px 0 !important;">{{data.xmbh}}</p>
                                <p class="project-grid-card_xmmc" :title="data.xmmc" style="font-size:12px;color:#363748;">{{data.xmmc.length>30?data.xmmc.slice(0,30)+'...':data.xmmc}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="project-grid-card-info">
                        <div class="project-grid-zrr">
                                <p><span>甲</span> &nbsp;{{data.jfzrrxm == ''?'暂无':data.jfzrrxm}}</p>
                                <p><span>乙</span> &nbsp;{{data.yfzrrxm == ''?'暂无':data.yfzrrxm}}</p>
                        </div>
                        <div class="project-grid-other">
                            <p class="project-grid-card_projectLeader">
                                <span class="project-grid-yssj">验</span>
                                <span v-if="data.yssj != null &&　data.xmjd == '建设中'">
                                <span v-if="new Date(data.yssj).getTime() < new Date().getTime()" class="sf-overdue" :class="{'overdue-active':new Date(data.yssj).getTime() < new Date().getTime()}">{{new Date(data.yssj).getTime() < new Date().getTime()?'已超期':'未超期'}}</span></span>
                                <span style="font-size: 12px;color:#363748;">{{data.yssj == ''?'无':data.yssj}}</span>
                            </p>   
                             <p style="display:flex;margin-top:5px !important;">
                                <img src="static/img/js.png" alt="" style="width:14px;height:14px;"> &nbsp;
                                <span class="project-grid-card-xmjd" :title="data.xmjd"> {{data.xmjd == null?'未启动':data.xmjd}}</span>
                            </p> 
                        </div>
                    </div>
                    <div style="position:absolute;top:5px;right:10px;">
                           <span :title="data.isxb?'取消收藏':'添加收藏'" style="font-size:16px;opacity:1;" :class="{'xb-color':data.isxb,'el-icon-star-off':!data.isxb,'el-icon-star-on':data.isxb}"></span>
                    </div>
            </div>
        </li>

        <li v-if="datas.length == 0">
              <div class="project-grid-card_empty" >
                  <img src="static/img/empty.png" alt="">
                  <p>暂无任何项目</p>
              </div>      
        </li>

        <li v-if="datas.length != 0 && datas.length == 11">
            <div class="project-grid-card-checkMore" @click="handleMore" >
                 <a href="javaScript:;;" >查看更多...</a>  
            </div>
        </li>
    </ul>

     <ul  v-if="show" class="project-xmkb">
        <li  v-for="(data,index) in datas" :key="index" :data-fbbh="data.fbbh" v-if="datas.length != 0" @click="handlePage($event,index)">
            <div class="project-grid-card">
                    <div class="project-grid-card-top">
                        <div>
                            <img :src="data.logo" :onerror="errorImg">
                        </div>
                        <div>
                            <div class="project-grid-card_projectInfo"> 
                                <p :title="data.dwmc" style="font-size: 14px;color: #A8A8A8;">{{data.dwmc}}</p>
                                <p style="font-size: 12px;color: #363748;margin:5px 0 !important;">{{data.xmbh}}</p>
                                <p class="project-grid-card_xmmc" :title="data.xmmc" style="font-size:12px;color:#363748;">{{data.xmmc.length>30?data.xmmc.slice(0,29)+'...':data.xmmc}}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="project-grid-card-info">
                        <div class="project-grid-zrr">
                                <p><span>甲</span> &nbsp;{{data.jfzrrxm == ''?'暂无':data.jfzrrxm}}</p>
                                <p><span>乙</span> &nbsp;{{data.yfzrrxm == ''?'暂无':data.yfzrrxm}}</p>
                        </div>
                        <div class="project-grid-other">
                            <p class="project-grid-card_projectLeader">
                                <span class="project-grid-yssj">验</span>
                                <!-- 是否超期 -->
                                <span v-if="data.yssj != null &&　data.xmjd == '建设中'">
                                <span  v-if="new Date(data.yssj).getTime() < new Date().getTime()" class="sf-overdue" :class="{'overdue-active':new Date(data.yssj).getTime() < new Date().getTime()}">{{new Date(data.yssj).getTime() < new Date().getTime()?'已超期':'未超期'}}</span></span>
                                <!-- 'Unoverdue-active':new Date(data.yssj).getTime() > new Date().getTime() -->
                                <span style="font-size: 12px;color:#363748;">{{data.yssj == ''?'无':data.yssj}}</span>
                            </p>   
                             <p style="display:flex;margin-top:5px !important;">
                                <img src="static/img/js.png" alt="" style="width:14px;height:14px;"> &nbsp;
                                <span class="project-grid-card-xmjd" :title="data.xmjd"> {{data.xmjd == null?'未启动':data.xmjd}}</span>
                            </p> 
                        </div>
                    </div>
                    <div style="position:absolute;top:5px;right:10px;">
                           <span style="font-size:16px;color:#FFB90F" class="el-icon-star-on" title="取消收藏"></span>
                    </div>
            </div>
        </li>

        <li v-if="datas.length == 0">
              <div class="project-grid-card_empty" >
                  <img src="static/img/empty.png" alt="">
                  <p>暂无任何项目</p>
              </div>      
        </li>

        <li v-if="datas.length != 0 && datas.length == 11">
            <div class="project-grid-card-checkMore" @click="handleMore">
                 <a href="javaScript:;;">查看更多...</a>  
            </div>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    data(){
        return{
          errorImg: 'this.src="' + require("../../../static/img/timg.png") + '"',
        }
    },
   props:{
       datas:{
          type:Array,
          default:function(){
              return []
          }
       },
       show:{
           type:Boolean,
           default:false
       }
   },
   methods:{
       handlePage(e,param){  //获取项目看板（项目）
        let fbbh = e.currentTarget.getAttribute("data-fbbh");
        this.$emit('handlePage',this.datas[param]);
       },
       handleMore(){
           this.$emit('handleMore','');
       }
   }
}
</script>
<style scoped>
.project-xmkb{
    display: flex;
    flex-wrap: wrap;
}
.project-xmkb li{
    display: inline-block;
}
.project-grid-card-checkMore{
    width: 280px;
    height: 170px;
    line-height: 150px;
    border-radius: 5px;
    text-align: center;
    background: #fff;
}
.project-grid-card-checkMore a{
    color: #A8A8A8;
    font-size: 14px;
}

.project-grid-card{
    width: 280px;
    height: 170px;
    font-size: 13px;
    color: #fff;
    margin: 0 8px 8px 0;
    float: left;
    position: relative;
    background: #FFFFFF;
    border-radius: 8px;
    
}
.project-grid-card-top{
    height:56%;
    padding-top:10px; 
}
.project-grid-card-top>div{
    float: left;
}
.project-grid-card-top>div:nth-of-type(1){
    text-align:center;
    width: 30%;    
}
.project-grid-card-top>div:nth-of-type(2){
    width: 70%;  
}
.project-grid-card-top>div .project-grid-card_projectInfo{
    height: 100%;
}
.project-grid-card-top>div .project-grid-card_projectInfo>p:nth-of-type(1){
      width:80%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
}
.project-grid-card-top>div .project-grid-card_projectInfo>p:nth-of-type(2){
      width:100%;   
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
}
.project-grid-card-top img{
    width: 70%;
    border-radius: 50%;
}

 .project-grid-card-top>div>p:nth-of-type(2) span{
     background: #ccc;
 }

.project-grid-card-info{
    height: 44%;
    border-top: 1px solid #F1F1F1;
    display: flex;
}
.project-grid-card-info>div{
    padding: 10px 0 0 10px;
}
.project-grid-card-info .project-grid-zrr{
    width: 40%;
    height: 100%;
    border-right: 1px solid #f1f1f1;
    font-size: 14px;
    color: #363748;
}
.project-grid-card-info .project-grid-zrr p span{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  font-size: 12px !important;
}
.project-grid-card-info .project-grid-zrr p:nth-of-type(1){
    margin-bottom:5px !important;
}
.project-grid-card-info .project-grid-zrr p:nth-of-type(1) span{
  background: #3BA7F5;
  color: #FFFFFF;
}
.project-grid-card-info .project-grid-zrr p:nth-of-type(2) span{
  background: #7ECE64;
  color: #FFFFFF;
}

.project-grid-yssj{
 display:inline-block;
 width: 20px;
 height: 20px; 
 border-radius: 50%;
 border: 2px solid #FF9400;
 font-size: 12px;
 color: #FF9400;
 text-align: center;
}


/* .project-grid-card-top .project-grid-card_projectInfo span{
  word-break:break-all;
  display:-webkit-box;
 -webkit-line-clamp:2;
 -webkit-box-orient:vertical;
  overflow:hidden;

} */
.project-grid-card-top .project-grid-card_projectInfo .project-grid-card_xmmc{
   width: 100%;
   height: 36px;
}
.project-grid-card  .project-grid-card_projectLeader {
    white-space: nowrap;
}

.project-grid-card:hover,.project-grid-card-checkMore:hover{
    cursor: pointer;
    transition: all 0.218s linear;
    transform: translateY(-5px);
    box-shadow: 0 0 10px #999;
}
.project-grid-card:hover  .el-icon-star-off,.project-grid-card:hover .el-icon-star-on{
    opacity: 1 !important;
    transition: all 0.3s linear;
}
.el-icon-star-off{
  color: #A8A8A8;
}
.project-grid-card_empty{
    width: 270px;
    height: 150px;
    border-radius: 5px;
    background: #fff;
    text-align: center;
    padding-top: 10px;
    font-size: 14px;
}
.project-grid-card_empty img{
    width: 30%;
}
.sf-overdue{
    background: #7ECE64;
    border-radius: 2px;
    font-size: 12px;
    color: #FFFFFF;
    padding: 1px 5px;
}
.overdue-active{
    background: #FF4F3E;
}
.Unoverdue-active{
    background: #7ECE64;
}
.xb-color{
  color:#FFB90F
}
.project-grid-card-xmjd{
  font-size: 12px;
  color: #A8A8A8;
}
</style>
