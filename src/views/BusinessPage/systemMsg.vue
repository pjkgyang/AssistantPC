<template>
  <div class="sys-notice">
      <div class="sys-notice-list">
            <div class="sys-notice-operate">
                <span data-type="0" :class="{'btn-active':showIndex == 0}" @click="handleNoticeType">未读</span>&#x3000;
                <span data-type="1" :class="{'btn-active':showIndex == 1}" @click="handleNoticeType">已读</span>&#x3000;
                <span data-type="2" :class="{'btn-active':showIndex == 2}" @click="handleNoticeType">全部</span>
                <el-button size="mini" style="float:right" @click="handleReadAllMsg">全部标记为已读</el-button>
            </div>
                <div class="notice-list"  id="scrollbar">
                    <div>
                        <section :class="{'list-bg':notice.wid == wid }" v-for="notice in noticeList" :data-wid="notice.wid" @click="handleNoticeDetail">
                            <div class="notice-list-top">
                                <span style="font-weight:700;font-size:15px;color:#666;float:left;width">{{notice.title}}</span><br>
                                <span style="font-size:12px;color:#aaa;float:left;">发送人:{{notice.fsrxm}}</span>
                                <span style="font-size:12px;color:#aaa;float:right">{{notice.sendTime}}</span>
                            </div>     
                            <div>
                                <span class="sys-notice-tip" >{{notice.summary}}</span>
                            </div> 
                        </section>

                        <div style="text-align:center;padding:20px;" v-if="noticeList.length == 0">
                           暂无通知
                        </div>
                      </div>
                </div>
            <div class="paginate-btn" v-if="noticeList.length != 0">
                <el-button-group>
                  <el-button size="mini" type="info"  round :disabled="curPage == 1" icon="el-icon-arrow-left" @click="handlePrev">上一页</el-button>
                  <el-button size="mini" type="info"  round :disabled="curPage == total" @click="handleNext">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
            </div>
            
       </div>
      <div class="sys-notice-detail">
          <div v-if="JSON.stringify(noticeDeatil) != '{}' && noticeList.length != 0">
            <div class="sys-notice-detail-head">
                <h3>{{noticeDeatil.tzbt}}</h3>
                <p>发送人 : <span>{{noticeDeatil.fsrxm}}</span></p>
                <p>接收人 : <span>{{noticeDeatil.jsrxm}}</span></p>
                <p>时间 : <span>{{noticeDeatil.fssj}}</span></p>
                <p v-if="noticeDeatil.xmmc">项目名称 : <span>{{noticeDeatil.xmmc}}</span></p>
                <p v-if="noticeDeatil.rwmc">任务名称 : <span>{{noticeDeatil.rwmc_display}}</span></p>
                <p v-if="noticeDeatil.lcbms">里程碑名称 : <span>{{noticeDeatil.lcbms_display}}</span></p>
            </div>
            <div class="sys-notice-detail-content">
                 <h5>内容：</h5>
                 <div style="color:#000;" v-html="noticeDeatil.tznr"></div>
            </div>
          </div>
          <div v-if="JSON.stringify(noticeDeatil) == '{}' || noticeList.length == 0" style="text-align:center;padding-top:100px">
              <img src="static/img/empty.png" alt="">
              <p>暂无通知</p>
          </div>
          <div class="sysNotice-close" title="关闭" @click="closeNotice"><span class="el-icon-close"></span></div>
      </div>
  </div>
</template>
<script>
import { getMessages,readMessage,readAllMessages } from '@/api/notice.js'
import Scrollbar from 'smooth-scrollbar';
import { EventBus } from '../../utils/util.js'; 

export default {
  data(){
      return{
        noticeList:[],
        showIndex:0,
        noticeDeatil:{},
        wid:'',
        isread:0,
        curPage:1,
        total:""
      }
  },
  mounted(){
        Scrollbar.init(document.querySelector('#scrollbar'));
  },
  methods:{
    handleReadAllMsg(){     // 全部为已读
         readAllMessages().then(({data})=>{
             if(data.state == 'success'){
                 this.getMessage(1,true);
                 EventBus.$emit('readAllMessages','');
             }
         })       
    },
    handleNoticeDetail(e){  // 查看通知详情
      let wid = e.currentTarget.getAttribute('data-wid');
      this.readMessage(wid);
    },

    readMessage(wid){
        readMessage({
            wid:wid
        }).then(({data})=>{
            if(data.state == 'success'){
                EventBus.$emit('changeNoticeNum','');
                if(data.data != null){
                    this.noticeDeatil = data.data
                }else{
                    this.noticeDeatil = {};        
                }
                this.wid = wid             
            }
        })
    },
    handleNoticeType(e){
      let type = e.target.getAttribute('data-type');
      this.isread = type
      this.showIndex = type
      if(type == 2){
        this.isread = ''
      }
      this.getMessage(1,true);

    }, 
    handleNext(){       //上一页
        this.curPage += 1
        this.getMessage(this.curPage);
    },
    handlePrev(){       //下一页
        this.curPage -= 1
        this.getMessage(this.curPage);
    },
    getMessage(curPage,type){
      getMessages({
        curPage:curPage,
        pageSize:12,
        keyword:'',
        isread:this.isread
      }).then(({data})=>{
        if(data.state == 'success'){
         this.noticeList = data.data.rows
         this.total = data.data.total
         if(type && data.data.rows.length != 0){
             this.readMessage(this.noticeList[0].wid); 
          }
        }
      })
    },
    closeNotice(){
        this.$router.go(-1);
    }
  },
  activated(){
    this.getMessage(1,true);    
  },
  components:{}
}
</script>
<style scoped>
.sys-notice{
    width: 90%;
    margin:0 auto ;
    height: calc(100vh - 50px);
    padding: 10px 0;
    display: flex;
    flex-wrap: nowrap;
}

.sys-notice-list{
    width: 370px;
    height: 100%;
    background: #fff;
    position: relative;
    overflow: hidden;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
}
.sys-notice-detail{
    margin:0 20px;
    padding: 20px;
    height: 100%;
    width: 70%;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background: #fff;
    position: relative;
}
.sys-notice-detail .sys-notice-detail-head{
  border-bottom: 1px dotted #999;
  padding: 10px 0;
}
.sys-notice-detail .sys-notice-detail-head p{
    font-size: 14px;
    margin: 5px 0;
    color: #666;
}
.sys-notice-detail .sys-notice-detail-head p span{
    color: #000;
}
.sys-notice-detail .sys-notice-detail-content{
    padding: 10px 0;
    font-size: 14px;
    color: #666;
}

.sys-notice-detail .sys-notice-detail-content p{
    margin: 5px 0;
}
.sys-notice-detail .sys-notice-detail-content p span{
    color: #000;
}
.notice-list{
  width:100%;
  height:88%;
  overflow-y: auto;
}
.notice-list section{
  border-bottom: 1px dotted #ccc;
  width: 100%;
  padding: 10px 8px 5px;
}
.notice-list section:hover{
    cursor: pointer;
    background: #eee;
}
.notice-list-top>span:nth-of-type(1){
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.notice-list-top:after{
    content: "";
    display: block;
    clear: both;
}
.sys-notice-operate{
    padding:10px;
    border-bottom:1px dotted #ccc;
    font-size: 14px;
    color:#000;
    height:50px;
    line-height: 30px;
}
.sys-notice-operate>span:hover{
    cursor: pointer;
}
.btn-active{
    color: #409EFF;
}
.paginate-btn{
    text-align: center;
    padding: 15px 0 10px;
    position: fixed;
    bottom:10px;
    left:180px;
}
/* .paginate-btn button:hover{
    background: #ccc !important;
    color: #fff;
} */
/* .paginate-btn button:nth-of-type(1){
    border-radius:14px 0 0 14px;
    line-height: 20px;
    background: #eee;
    border: 1px solid #999;
    padding:2px 15px;
    border-right: none;
}
.paginate-btn button:nth-of-type(2){
    border-radius:0 14px 14px 0;
    line-height: 20px;
    background: #eee;
    border: 1px solid #999;
    padding:2px 15px;
    margin-left: 0 !important;
} */
.list-bg{
   background: #eee;
}
.sysNotice-close{
    position: absolute;
    right: 0;
    top: 0;
    background: #eee;
    padding: 0 10px;
}
.sysNotice-close:hover{
    cursor: pointer;
}
.sys-notice-tip{
    font-size:14px;
}
</style>
