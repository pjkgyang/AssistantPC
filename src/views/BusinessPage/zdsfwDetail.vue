<template>
 <div class="fwjh-Detail"> 
     <div class="fwjh-Detail-content">
         <tableLayout>
             <section slot="top">
                 <h5>产品内容</h5>
                 <div class="contentMark">
                    <div flex  class="contetnWord">
                        <p>
                            <span class="contenTitle">产品:</span>
                            <span>{{cpData.cpmc}}</span>
                        </p>
                        <p>
                            <span class="contenTitle">服务内容:</span>
                            <span>{{cpData.fwnr}}</span>
                        </p>
                    </div>
                    <div flex  class="contetnWord">
                        <p>
                            <span class="contenTitle">责任人:</span>
                            <span>{{cpData.zrrxm}}</span>
                        </p>
                        <p>
                            <span class="contenTitle">状态:</span>
                            <span>{{cpData.zt_display}}</span>
                        </p>
                    </div>
                    <div flex  class="contetnWord">
                        <p>
                            <span class="contenTitle">计划完成时间:</span>
                            <span>{{cpData.jhjsrq}}</span>
                        </p>
                        <p>
                            <span class="contenTitle">实际完成时间:</span>
                            <span>{{!cpData.sjjsrq?'无':cpData.sjjsrq}}</span>
                        </p>
                    </div>
                    <div>
                        <span class="contenTitle">相关材料:</span>
                        <a v-if="!!cpData.fjList" v-for="fj in cpData.fjList" :href="baseUrl+'attachment/downloadFile.do?fjId='+fj.fjbh"><span class="el-icon-download"></span>{{fj.fjmc}}</a> 
                        <span class="filter-weight" v-if="!cpData.fjList">无</span>
                    </div>
                 </div>
             </section>
             <section slot="bottom">
                 <div class="contetnProgress">
                      <h5>日志明细</h5>
                      <div class="contentMark">
                        <el-scrollbar style="height:calc(100vh - 300px);">
                            <div v-if="jdList.length" v-for="(jd,index) in jdList" :class="{'progress-dot':true,'progress-dot-last':index == (jdList.length-1)}">
                                <div>
                                    <span>{{jd.cjsj}}&#x3000;<span style="color:rgb(21, 145, 202)">{{!jd.czrxm?'':jd.czrxm}}</span>&#x3000;{{jd.czlxmc}}</span>
                                    <div v-html="jd.cznr"></div>
                                </div>
                            </div>
                            <div v-else class="emptyContent">
                                <img src="static/img/empty.png" alt="">
                                <p>暂无日志记录</p>
                            </div>
                         </el-scrollbar>
                      </div>
                  </div>
             </section>
         </tableLayout>
     </div>
 </div>
</template>

<script>
import tableLayout from '@/components/layout/tableLayout.vue'
 export default {
   data () {
     return {
         baseUrl:'',
         jdList:[
             {con:'2018-08-08 张三1 提报了惹怒',sm:'驳回驳回驳回<br/>驳回驳回驳回',zt:1},
             {con:'2018-08-08 张三2 提报了惹怒',sm:'驳回驳回驳回驳回驳回驳回',zt:1},
             {con:'2018-08-08 张三3 提报了惹怒',sm:'驳回驳回驳回驳回驳回驳回',zt:''},
             {con:'2018-08-08 张三4 提报了惹怒',sm:'驳回驳回驳回驳回驳回驳回',zt:''},
         ],
         cpData:{}
     }
   },
   mounted(){
       this.baseUrl = window.baseurl;
       this.$get(this.API.getActiveService,{
           wid:this.$route.query.wid
       }).then(res=>{
           if(res.state == 'success'){
               this.cpData = res.data
           }    
       })

       this.$get(this.API.listOperationLog,{
           zbwid:this.$route.query.wid
       }).then(res=>{
           if(res.state == 'success'){
               this.jdList = res.data
           }    
       })
       
   },
   components: {tableLayout}
 }
</script>

<style lang="scss" scoped>
.fwjh-Detail{
   padding:10px 0;
   height: 100%;
//    background: linear-gradient(to right bottom,rgb(237, 243, 245),rgb(227, 246, 250));
   .fwjh-Detail-content{
       width: 80%;
       background: #fff;
       border-radius: 5px;
       margin: 0 auto;
       padding: 10px 20px;
       height:calc(100vh - 40px);
       box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
       h5 {
          font-weight: 700;
          font-size: 15px;
          margin-bottom:10px !important;
          padding-left:5px;
          border-left: 4px solid rgb(177, 55, 214);
       }
   }
   .contentMark{
       padding: 0 30px;
       .emptyContent{
           width: 200px;
           text-align: center;
           padding: 20px 0;
           img{
               width:100px;
               height:100px;
           } 
           p{
               margin: 5px 0 !important;
           }
       }
   }
}
.contetnWord{
    margin:10px 0;
    p{
      width:50%;
       span{
           font-weight: 700;
       }
       span:nth-of-type(2){
           display: inline-block;
           width: calc(100% - 150px);
           text-overflow: ellipsis;
           white-space: nowrap;
           overflow: hidden;
           vertical-align:bottom;
       }
    }
}
.contenTitle{
    display: inline-block;
    width: 100px;
    font-weight: 700;
    color: #807e7e;
    text-align: right;
}
.progress-dot{
    padding: 0 30px 10px;
    position: relative;
    min-height:60px;
    div{
        color: #636161;
        font-size: 13px;
    }
}
.contetnProgress{
    padding: 20px 0;
    max-height:calc(100vh - 260px);
}
.progress-dot:before{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top:2px;
    width:20px;
    height:20px;
    background: #2A82E4;
    border-radius: 50%;
}
.progress-dot::after{
    content: '';
    width: 1px;
    height: calc(100% - 20px);
    position: absolute;
    top: 22px;
    left: 10px;
    border-left:1px solid #2A82E4;
}
.progress-dot-ywc::before{
    background: #2A82E4;
}
.progress-dot-ywc::after{
    border-color: #2A82E4;
}
.progress-dot-last:after{
    display: none;
}

</style>
