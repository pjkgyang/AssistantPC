<template>
  <div class="item_Card" @click="handleFBdetails">
      <div>
       <div class="item_Card_top" :style="note">
           <p>{{cardData.xmbh}}&#x3000;{{cardData.xmmc}}</p>
           <!-- <p>{{cardData.xmmc}}</p> -->
           <!-- <p><span>分包编号</span>:{{cardData.fbbh}}</p>
           <p><span>分包名称</span>:{{cardData.fbmc}}</p> -->
       </div>
       <div class="item_Card_mid">
           <p class="item_Card_midInfo">
                <span :title="cardData.fbmc">{{cardData.fbmc}}</span>
                <span>
                   ￥{{cardData.zfy}}
               </span>
           </p>
           <p  class="item_Card_midInfoT">
               <span>
                    <span class="card_color">投标人数: </span><span> {{cardData.tbrs}}</span>
               </span>
               <span :class="{'card-state':true,'card-state-zbz':cardData.tbzt=='01','card-state-close':cardData.tbzt=='02'}">
                   {{cardData.tbzt=='01'?'招标中':'招标结束'}}
               </span>

                <!-- <span :class="{'card-state':true}">
                   {{cardData.stateType=='develop'?'开发中':cardData.stateType=='bids'?'招标中':'评价中'}}
                   招标中
               </span> -->
           </p>
           <hr>
           <p  class="item_Card_midInfoThr">
                <span style="float:left;color:#000"> 
                    {{cardData.fbxz=='01'?'在建':cardData.fbxz=='02'?'售后服务':'过保'}}
               </span>
              <span><span style="color:#999">招标截止日期:</span>{{cardData.zbjzrq}}</span>
           </p>
       </div>
 </div>   
  </div>
</template>
<script>
export default {
  data(){
      return{
       note:{
            backgroundImage: "url(" + require("../../../static/img/09.png") + ")",
        },
      }
  },
   props:{
      stateType:{
        type:String,
        default:'develop'
      },
      levelType:{
        type:String,
        default:'hard'
      },
      cardData:{
          type:Object,
          default:function(){
              return {}
          }
      }
    },
    methods:{
        handleFBdetails(){
            this.$emit('handleFBdetails',this.cardData)
        }
    }
}
</script>
<style scoped>
.item_Card{
    width: 300px;
    box-shadow: 0 0px 5px #999;
    margin:10px 15px 25px 0 ;
    float: left;
    position: relative;
}

.item_Card:hover{
    cursor: pointer;
}

.item_Card .item_Card_top{
    height: 140px;
    width: 100%;
    padding: 5px 0;
}
.item_Card .item_Card_top p{
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    overflow:hidden;
    padding:0 10px;
    color: #fff;
    font-size: 13px;    
}
.item_Card_topInfo{
    color: #fff;
}
.item_Card_mid{
    padding: 0 5px;
}
.item_Card_mid hr{
    border:none;
    border-top: 1px solid #ccc;
    margin-top:10px;
}
.item_Card_mid p{
    margin: 5px 0;
}
.item_Card_midInfo{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.item_Card_midInfo>span:nth-child(1){
    display: inline-block;
    width: 80%;
    white-space:nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.item_Card_midInfoT{
    font-size: 13px;
}
.item_Card_midInfoT>span:nth-child(2),.item_Card_midInfoThr>span{
 float: right;
}
.item_Card_midInfoThr{
    color: #666;
    font-size: 13px;
}
.item_Card_midInfoThr::after{
    content: "";
    display: block;
    clear: both;
}
.card_color{
    color: #aaa;
}
.item_Card{
    transition: all 0.218s linear;
}
.item_Card:hover{
    transform: translate3d(0,-3px,0);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
</style>
