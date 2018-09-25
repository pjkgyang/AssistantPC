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
                            <span></span>
                        </p>
                        <p>
                            <span class="contenTitle">服务内容:</span>
                            <span></span>
                        </p>
                    </div>
                    <div flex  class="contetnWord">
                        <p>
                            <span class="contenTitle">责任人:</span>
                            <span></span>
                        </p>
                        <p>
                            <span class="contenTitle">状态:</span>
                            <span></span>
                        </p>
                    </div>
                    <div flex  class="contetnWord">
                        <p>
                            <span class="contenTitle">计划完成时间:</span>
                            <span></span>
                        </p>
                        <p>
                            <span class="contenTitle">实际完成时间:</span>
                            <span></span>
                        </p>
                    </div>
                    <div>
                        <span class="contenTitle">相关材料:</span>
                        <a :href="baseUrl+'attachment/downloadTemplateFile.do?path='"><span class="el-icon-download"></span> 测试11111</a> 
                    </div>
                 </div>
             </section>
             <section slot="bottom">
                 <div class="contetnProgress">
                      <h5>进度明细</h5>
                      <div class="contentMark">
                        <div v-for="(jd,index) in jdList" :class="{'progress-dot':true,'progress-dot-ywc':jd.zt == 1,'progress-dot-last':index == (jdList.length-1)}">
                            <p>
                                <span>{{jd.con}}</span><br>
                                <span>{{jd.sm}}</span>
                            </p>
                        </div>
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
             {con:'2018-08-08 张三1 提报了惹怒',sm:'驳回驳回驳回驳回驳回驳回',zt:1},
             {con:'2018-08-08 张三2 提报了惹怒',sm:'驳回驳回驳回驳回驳回驳回',zt:1},
             {con:'2018-08-08 张三3 提报了惹怒',sm:'驳回驳回驳回驳回驳回驳回',zt:''},
             {con:'2018-08-08 张三4 提报了惹怒',sm:'驳回驳回驳回驳回驳回驳回',zt:''},
         ]
     }
   },
   mounted(){
       console.log(this.$route)
       this.baseUrl = window.baseurl;
   },
   components: {tableLayout}
 }
</script>

<style lang="scss" scoped>
.fwjh-Detail{
   padding:10px 0;
   .fwjh-Detail-content{
       width: 75%;
       background: #fff;
       border-radius: 5px;
       margin: 0 auto;
       padding: 10px 15px;
       height:calc(100vh - 40px);
       h5 {
          font-weight: 700;
          margin-bottom:10px !important;
          padding-left:5px;
          border-left: 4px solid rgb(177, 55, 214);
       }
   }
   .contentMark{
       padding: 0 20px;
   }
}
.contetnWord{
    margin:10px 0;
    p{
        width:50%;
    }
}
.contenTitle{
    display: inline-block;
    width: 100px;
    font-weight: 700;
}
.progress-dot{
    padding: 0 25px;
    position: relative;
    min-height:60px;
    p{
        color: #969696;
        font-size: 14px;
    }
}
.contetnProgress{
    padding: 20px 0;
    max-height:calc(100vh - 200px);
}
.progress-dot:before{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width:20px;
    height:20px;
    background: #B7B6B6;
    border-radius: 50%;
}
.progress-dot::after{
    content: '';
    width: 1px;
    height: calc(100% - 20px);
    position: absolute;
    top: 20px;
    left: 10px;
    border-left:1px solid #B7B6B6;
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
