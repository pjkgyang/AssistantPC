<template>
<div>
      <div>
          <UserBanner :shown="false" :fbdetail="false" :crumb="crumbData"></UserBanner>
      </div>
  <div class="fbdetail_container">
     <span class="el-icon-close close-page" @click="gobackTb"></span>
       <div class="fb_name">
                <div>
                    <p class="project__name">
                        {{fbData.fbbh}} {{fbData.fbmc}}
                         <!-- <span :class="{'card-state':true,'card-state-del':cardData.stateType=='develop',
                         'card-state-bids':cardData.stateType=='bids','card-state-evaluate':cardData.stateType=='evaluate'}">招标中</span> -->
                         <span :class="{'card-state':true,'card-state-zbz':this.fbData.tbzt == '01','card-state-close':this.fbData.tbzt == '02'}">
                             {{fbData.tbzt == '01'?'投标中':'招标结束'}}
                         </span>
                    </p>

                    <p class="project__label">￥{{fbData.zfy}}</p>
                </div>
                <div class="project__extra">
                     <b>已有{{fbData.tbrs}}人投标</b>
                     <p>招标截止 {{fbData.zbjzrq}}</p>
                     <a href="javaScript:;;" @click="handleToubiao" v-if="istb == false && this.fbData.tbzt == '01'">我要投标</a>
                     <span style="font-size:16px;background:#71C671;padding:3px 5px;border-radius:4px"  v-if="istb != false && this.fbData.tbzt == '01'">
                        已投标
                     </span>
                </div>
            </div>
            <div class="fb_info">
                <div>
                    <h4>合同内容</h4>
                    <div>
                        <h6>合同基本信息</h6>
                        <table>
                              <tr>
                                   <th>合同金额(元)</th>
                                   <td>{{htjbxx.htje}}</td>
                                   <th>合同毛收入(元)</th>
                                   <td>{{htjbxx.htmsr}}</td>
                                   <th>合同签订日期</th>
                                   <td>{{htjbxx.qdrq}}</td>
                              </tr>
                               <tr>
                                   <th>生效日期</th>
                                   <td>{{htjbxx.sxrq}}</td>
                                   <th>立项日期</th>
                                   <td>{{htjbxx.lxrq}}</td>
                                   <th>合同服务开始时间</th>
                                   <td>{{htjbxx.fwksrq}}</td>
                              </tr>
                               <tr>
                                   <th>服务期限(月)</th>
                                   <td>{{htjbxx.fwqx}}</td>
                                   <th>客户经理</th>
                                   <td>{{htjbxx.khjl}}</td>
                                   <th>项目经理</th>
                                   <td>{{htjbxx.xmjl}}</td>
                              </tr>
                                <tr>
                                   <th>项目性质</th>
                                   <td>{{htjbxx.xmxz}}</td>
                                   <th>项目类别</th>
                                   <td>{{htjbxx.xmlb}}</td>
                              </tr>
                        </table>
                    </div>
                     <div>
                        <h6>合同内容</h6>
                             <htnrTable :htnrData="htnrData"></htnrTable>
                    </div>
                </div>
                <div>
                    <div>
                    <h4>分包信息</h4>
                    <div>
                        <h6>分包基本信息</h6>
                         <table>
                              <tr>
                                   <th>合同编号</th>
                                   <td>{{fbxxData.htbh}}</td>
                                   <th>分包名称</th>
                                   <td>{{fbxxData.fbmc}}</td>
                                   <th>分包人姓名</th>
                                   <td>{{fbxxData.fbrxm}}</td>
                              </tr>
                               <tr>
                                   <th>分包日期</th>
                                   <td>{{fbxxData.fbrq}}</td>
                                   <th>分包性质</th>
                                   <td>{{fbxxData.fbxz=='01'?'在建':fbxxData.fbxz=='02'?'售后服务':'过保'}}</td>
                                   <th>自助打印</th>
                                   <td>{{fbxxData.zzdy}}</td>
                              </tr>
                               <tr>
                                   <th>计划开始日期</th>
                                   <td>{{fbxxData.jhksrq}}</td>
                                   <th>计划结束日期</th>
                                   <td>{{fbxxData.jhjsrq}}</td>
                                   <th>招标截止日期</th>
                                   <td>{{fbxxData.zbjzrq}}</td>
                              </tr>
                               <tr>
                                   <th>实施费用 (元)</th>
                                   <td>{{fbxxData.ssfy}}</td>
                                   <th>二开费用 (元)</th>
                                   <td>{{fbxxData.ekfy}}</td>
                                   <th>可变费用 (元)</th>
                                   <td>{{fbxxData.kbfy}}</td>
                               </tr>
                                <tr>
                                   <th>分包说明</th>
                                   <td colspan="5">{{fbxxData.fbsm}}</td>
                              </tr>
                              <tr>
                                   <th>审核人编号</th>
                                   <td>{{fbxxData.shrbh}}</td>
                                    <th>审核人姓名</th>
                                   <td>{{fbxxData.shrmc}}</td>
                                   <th>审核日期</th>
                                   <td>{{fbxxData.shrq}}</td>
                                </tr>
                                <tr>
                                   <th>审核意见</th>
                                   <td colspan="5">{{fbxxData.shyj}}</td>
                                </tr>             
                        </table>
                    </div>
                    <div>
                        <h6>分包内容</h6>
                          <htnrTable :show="false" :fbnrData="fbcpData"></htnrTable>
                    </div>
                    <div>
                       
                        <div v-if="!tbzt && istb == undefined">
                             <h6>投标费用:</h6>
                            <div>
                                <span style="font-size:14px;">投标理由:</span>
                                <textarea v-model="zbxx.tbly" readonly style="margin:5px 0 10px;width:100%;height:50px;border-radius:5px;resize:none;outline:none"></textarea>
                            </div>
                            <table border width="100%" class="tb-table tbfy_table">
                            <tr>
                                <th>科目名称</th>
                                <th>金额（元）</th>
                            </tr>
                                <tr><td>实施费用</td><td>{{zbxx.ssfy}}</td></tr>
                                <tr><td>二开费用</td><td>{{zbxx.ekfy}}</td></tr>
                                <tr><td>可变费用</td><td>{{zbxx.kbfy}}</td></tr>
                                <tr><td>总费用</td><td>{{zbxx.zfy}}</td></tr>
                            </table>
                        </div>
                        <div v-if="tbzt && istb">
                             <h6>投标费用:</h6>
                             <div>
                                <span style="font-size:14px;">投标理由:</span>
                                <textarea v-model="tbly" readonly style="margin:5px 0 10px;width:100%;height:50px;border-radius:5px;resize:none;outline:none"></textarea>
                            </div>
                               <el-table
                                    :data="tbfyData"
                                    border
                                    style="width: 100%"
                                    max-height="400">
                                    <el-table-column prop="mbkmmc" label="科目名称"></el-table-column>
                                    <el-table-column prop="je" label="金额(元)" ></el-table-column>
                                </el-table>
                        </div>
                    </div>
                </div>
                </div>
            </div>


            <el-dialog title="投标" :visible.sync="dialogTableVisible" :close-on-click-modal="false"> 
                <div style="padding:0 20px;">
                    <div style="margin:10px 0;position:relative;">
                        <span>投标理由：</span>
                        <el-input type="textarea" maxlength="200" resize="none" v-model="tbly" rows="4" ></el-input>
                        <span style="position:absolute;bottom:0;right:10px;font-size:12px;"><span :class="{'max-length':tbly.length >= 200}">( {{tbly.length}}</span> / 200 )</span>
                    </div>
                    <table border width="100%" class="tb-table">
                    <tr>
                        <th>科目名称</th>
                        <th>金额（元）</th>
                    </tr>
                        <tr v-for="(tbfy,index) in tbfyData" :key="index">
                            <td>{{tbfy.mbkmmc}}</td><td><input type="text" v-model="tbfy.je"></td>
                        </tr>
                    </table>
                </div>
                <div style="margin:10px 0;text-align:right;background:#eee;padding:10px 20px;">
                   <button class="tbcommit"  @click="handleCommit">提交</button>
                </div>
            </el-dialog>
     </div>
  </div>
</template>
<script>
import htnrTable from  '@/components/BusinessPage/htnrTable.vue'
import UserBanner from '@/components/BusinessPage/itemUserBanner.vue'
import {queryHtxx,queryFbxx,launchTb,saveTbxx} from '@/api/toubiao.js'
import { EventBus ,returnFloat} from '../../utils/util.js'; 

export default {
    data(){
        return{
                dialogTableVisible:false,
                tbly:"",
                xmbh:"",
                fbData:'',
                htjbxx:{},
                htnrData:[],
                tbfyData:[],
                istb:'',
                tbzt:'',
                fbxxData:{},
                fbcpData:[],
                tbje:null,
                zbxx:"",
                crumbData:[{
                        mc:'项目投标',
                        path:'/BusinessPage/dataTab'
                    },{
                        mc:'分包详情',
                        path:'/BusinessPage/fbdetail'
                    }]
                
        }
    },
  mounted(){
        EventBus.$on('hoshRouter',(param)=>{
            this.$router.push({name:'DataTab'})
        })
        
  },
  methods:{
    //   获取投标费用
   handleToubiao(){
       launchTb({
           fbbh:this.fbData.fbbh
       }).then(({data})=>{
         if(data.state == 'success'){
           this.tbfyData = data.data
         }else{
              this.$message.error(data.msg);
          } 
       });
       this.dialogTableVisible = !this.dialogTableVisible
   },

   // 提交投标
   handleCommit(){
       this.tbje = null;
        this.tbfyData.forEach((ele,i,o)=>{
            this.tbje += parseFloat(ele.je)
        })
     
    if(this.tbje == 0 || isNaN(this.tbje)){
        this.$alert('投标总金额不能为0', '提示', {
          confirmButtonText: '确定',
          type:'error'
        });
    }else{
        saveTbxx({
            fbbh:this.fbData.fbbh,
            tbfy:JSON.stringify(this.tbfyData),
            tbly:this.tbly
        }).then(({data})=>{
            if(data.state == 'success'){
                this.$alert('投标成功', '提示', {
                    confirmButtonText: '确定',
                    type:'success',
                    callback: action => {
                        this.istb = true;
                        this.dialogTableVisible = !this.dialogTableVisible
                    }
                });
            }
        })
      }
    },
    gobackTb(){
       this.$router.go(-1);
    }
  },
  activated(){
       
       if(this.$route.params.data == undefined){
         this.fbData = JSON.parse(sessionStorage.getItem('fbData'));
       }else{
         sessionStorage.setItem('fbData',JSON.stringify(this.$route.params.data));
         this.fbData = this.$route.params.data || this.fbData
       }
    //   this.fbData = this.$route.params.data || this.fbData;

     //  查询合同内容
      queryHtxx({
           xmbh:this.fbData.xmbh,
           fbbh:this.fbData.fbbh
      }).then(({data})=>{
          if(data.state == 'success'){
           
            this.htjbxx = data.data.lxxx
            this.htnrData = data.data.htnr
            this.istb = data.data.istb;
            this.tbzt = data.data.tbzt
          
            if(this.tbzt && this.istb ){
                this.tbly = data.data.tbxx[0].tbly
                this.tbfyData = data.data.tbfy
            }else if(!this.tbzt &&  this.istb== undefined){
                this.zbxx = data.data.zbxx
            }
          }else{
              this.$message({
                    message:data.msg,
                    type: 'error'
                });
          }
      })
    //   查询分包信息
      queryFbxx({
          fbbh:this.fbData.fbbh
      }).then(({data})=>{
          if(data.state == 'success'){
              
            this.fbxxData = data.data.fbxx
            let fbnrArr = data.data.fbcp
            
            // 格式化 完工率 完工量
            fbnrArr.forEach((val,index,arr)=>{
                arr[index].wglv = returnFloat(val.wglv)
                arr[index].wgl = returnFloat(val.wgl)
            });
            this.fbcpData = fbnrArr
          }else{
               this.$message({
                    message:data.msg,
                    type: 'error'
              });
          } 
      })

      
  },
  components:{htnrTable,UserBanner}
}
</script>
<style scoped>
    .fbdetail_container{
       width: 1280px;
       margin:20px auto;
       border: 1px solid #ccc;
       box-shadow: 0 0 5px  #ccc;
       padding: 0;
       background: #fff;
       position: relative;
   }
   .fbdetail_container .fb_name{
       height: 220px;
       padding: 30px 20px;
       border-bottom: 1px solid #EFECEA;
   }
   .fbdetail_container .fb_name:after{
       content: "";
       display: block;
       clear: both;
   }
   .fbdetail_container .fb_name>div:nth-child(1){
       float: left;
   }
   .fbdetail_container .fb_name>div:nth-child(2){
    float: right;
    }
    .project__name{
        font-size: 20px;
        width: 800px;
    }
    .project__label{
        font-size: 36px;
        margin-top: 40px;
    } 
    .project__name span{
        font-size: 14px;
    }
    .project__extra{
        text-align: right;
    }
    .project__extra b{
        font-size: 20px;
        font-weight: normal;
    }
        .project__extra p{
        margin: 10px 0 20px 0;
        font-size: 14px;
        
    }
    .project__extra  a{
        height: 32px;
        width: 100px;
        text-align: center;
        line-height: 32px;
        font-size: 18px;
        background: #f00;
        color: #fff;
        padding: 5px 8px;
        border-radius: 2px;
    }
    .project__extra  a:hover{
        background: #cd1515;
        box-shadow:0 4px 8px rgba(0,0,0,.28);
        transition: box-shadow 0.3s linear;
        color: #fff;
    }


    .fb_info {
        padding: 15px 20px;
    }
    .fb_info h6{
        color: #999;
        font-size: 13px;
    }
    .fb_info>div{
        margin-bottom: 50px;
    }
    .fb_info a{
        color: #2196F3;
    }

    .fb_info table{
        width:100%;
        border-collapse: collapse;
        border:1px solid #C9ECE7;
        font-size: 14px;
    }
    .fb_info table th{
        font-size: 14px;
        text-align: center;
        width:150px;
        background: #eee;
        color: #4D4D4D;
    }
    .fb_info table td,.fb_info table th{    
        text-align: left;
        border: 1px solid #ccc !important;
        padding: 5px 10px;
        
    }
    .fb_info h4{
        border-left: 5px solid #CD69C9;
        padding: 0 5px;
    }

    .fb_info h6{
        margin: 10px 0;
    }
    .tb-table{
        border-collapse: collapse;
    }
    .tb-table th{
        background: #eee;
        padding: 5px 0;
    }
    .tb-table th,.tb-table td{
        border:1px solid #ccc;
    }
    .tb-table td:nth-of-type(1){
         padding:0 10px ;
    }
    .tb-table td input{
        width: 100%;
        padding: 5px ;
    }

    .tbcommit{
        background:#409EFF;
        border:none;
        color:#fff;
        padding:6px 10px;
        border-radius:5px;
    }
    .tbcommit:hover{
        cursor: pointer;
    }
    .tbfy_table td{
        padding: 5px 8px!important;
        border: 1px solid #000;
    }
    .fbdetail_container .close-page{
        position:absolute;
        right:0;
        top:0;
        font-size:18px;
        background:rgba(0, 0, 0, 0.1);
        color: #000;
        padding: 5px 10px;
    }
    .fbdetail_container .close-page:hover{
        cursor: pointer;
        color: #ccc;
    }
    .max-length{
        color: #f00;
    }
</style>
