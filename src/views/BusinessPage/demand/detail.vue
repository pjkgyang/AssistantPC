<template>
  <div class="demandDetail-pannel">
    <div class="pannelPaddingBg-10 pull-left detail-left">
      <div class="demandDetail" colcenter>
        <div class="demandDetail_bgimg" center>{{detailInfo.cpjc}}</div>
        <div class="demandDetail-info" flex-column spacebetween>
          <h4 class="filter-weight">{{detailInfo.bt}}</h4>
          <p>
            <el-tag key="1" type="success" effect="plain" size="mini">{{detailInfo.dqlcmc}}</el-tag>
          </p>
          <p>
            {{detailInfo.tcsj}} &#x3000; {{detailInfo.tcrxm}} &#x3000;&#x3000;
            <span class="title">需求编号：</span>
            {{detailInfo.xqbh}} &#x3000;&#x3000;
            <span class="title">关联需求编号：</span>
            {{!detailInfo.glxqbh?'无':detailInfo.glxqbh}} &#x3000;&#x3000;
          </p>
          <p>
            <span class="title">设计编号：</span>
            <a v-if="!!detailInfo.sjbh" href="javaScript:;" @click="handleClickRwxq(detailInfo.sjbh)">{{detailInfo.sjbh}}</a>
            <span v-if="!detailInfo.sjbh" >无</span>
            &#x3000;&#x3000;
            <span  class="title">开发编号：</span>
            <a v-if="!!detailInfo.kfbh" href="javaScript:;" @click="handleClickRwxq(detailInfo.kfbh)">{{detailInfo.kfbh}}</a>
            <span v-if="!detailInfo.kfbh" >无</span>
          </p>
          <p>
            <span class="title">提出老师：</span>
            {{detailInfo.tcls}} ( {{detailInfo.lsdw}} )&#x3000;&#x3000;
            <span class="title">需求类型：</span>
            {{detailInfo.xqfl_display}}&#x3000;&#x3000;
            <span class="title">责任人：</span>
            {{!detailInfo.dqzrr?'无':detailInfo.dqzrr}}
          </p>
          <p>
            <span class="title">所属项目：</span>
            {{detailInfo.xmbh}} {{detailInfo.xmmc}}&#x3000;&#x3000;
            <span class="title">产品分类：</span>
            {{detailInfo.cpmc }}
          </p>

          <p>
            <span class="title">期望设计完成日期：</span>
            {{detailInfo.qwsjwcrq}} &#x3000;&#x3000;
            <span class="title">期望开发交付日期：</span>
            {{detailInfo.qwkfjfrq}} &#x3000;&#x3000;
            <span class="title">模块：</span>
            {{detailInfo.cpbjmc}} &#x3000;&#x3000;
          </p>

          <p>
            <span class="title">需求文档：</span>
            <a title="点击下载" :href="API.downloadFile+'?fjId='+detailInfo.xqfjwid" target="_blank">{{detailInfo.xqfjmc}}</a>
            &#x3000;&#x3000;
            <span>
              <span class="title">详细需求设计：</span>
              <a v-if="!!detailInfo.xxyxfjmc" title="点击下载" :href="API.downloadFile+'?fjId='+detailInfo.xxyxfjwid" target="_blank">{{detailInfo.xxyxfjmc}}</a>
              <span v-if="!detailInfo.xxyxfjmc">无</span>
            </span>&#x3000;&#x3000;
            <span>
              <span class="title">原型设计：</span>
              <a v-if="!!detailInfo.yxfjmc" title="点击下载" :href="API.downloadFile+'?fjId='+detailInfo.yxwjbh" target="_blank">{{detailInfo.yxfjmc}}</a>
              <span v-if="!detailInfo.yxfjmc">无</span>
            </span>&#x3000;&#x3000;
            <span>
              <span class="title">开发包：</span>
              <a v-if="!!detailInfo.kfwjbh" title="点击下载" :href="API.downloadFile+'?fjId='+detailInfo.kfwjbh" target="_blank">{{detailInfo.kffjmc}}</a>
              <span v-if="!detailInfo.kfwjbh">无</span>
            </span>
          </p>
        </div>
      </div>
      <!-- 内容 -->
      <div class="detail-content">
        <div class="content" v-html="detailInfo.nr"></div>
        <ul>
          <li colcenter v-for="(reply,index) in replyData" :key="index">
            <div class="reply-type"><span>{{reply.hflxmc}}</span></div>
            <div>
              <p>
                <span class="title">{{reply.hfrxm}}&#x3000;发表于&#x3000;{{reply.hfsj}}</span>&#x3000;
                <el-tag key="1" type="success" effect="plain" size="mini">{{reply.dqlcmc}}</el-tag>
              </p><br>
              <!-- 回复内容 -->
              <div>
                <div  v-html="reply.nr"></div>
                <div>
                  <br>
                  <p v-if="!!reply.fbfjmc"><span>附件：</span><a  title="点击下载" :href="API.downloadFile+'?fjId='+reply.fbwjbh" target="_blank">{{reply.fbfjmc}}</a></p>
                  <p v-if="!!reply.xxyxfjmc"><span>附件：</span><a  title="点击下载" :href="API.downloadFile+'?fjId='+reply.xxyxfjwid" target="_blank">{{reply.xxyxfjmc}}</a></p>
                  <p v-if="!!reply.crowdrwbh"><span>任务编号：{{reply.crowdrwbh}} &#x3000; </span><a href="javaScript:;" @click="handleClickRwxq(reply.crowdrwbh)">查看任务详情</a></p>
                  <p v-if="!!reply.fjwid"><span>附件：&#x3000; </span><a  title="点击下载" :href="API.downloadFile+'?fjId='+reply.fjwid" target="_blank">{{reply.fjmc}}</a></p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div v-if="detailInfo.xqzt != 11">
          <div id="summernote"></div>
        </div>
        <!-- 按钮组 -->
        <div text-right>
          <el-button size="mini" type="primary" v-for="(btn,index) in btnData" :key="index" @click="handleBtnOprate(btn)">{{btn.btnabb}}</el-button>
        </div>
      </div>
    </div>
    <div class="pannelPaddingBg-10 guid pull-right">
      <h5>需求工作指南</h5>
      <div>
        <step :list="stepData"></step>
      </div>
    </div>

    <el-dialog :title="'进度跟踪' + '[' + crowdId + ']'" :visible.sync="jdgzVisible" :close-on-click-modal="false" width="800px" top="30px" append-to-body>
				<div style="padding:20px 10px ">
					<div class="CrowdRwxx">
						<span>任务名称 :</span>
						<span :title="JSON.stringify(CrowdRwxx) == '{}' ? '' : CrowdRwxx.rwmc" class="Crowdrwmc">
							{{ JSON.stringify(CrowdRwxx) == '{}' ? '无' : CrowdRwxx.rwmc }}
						</span>
						<span>交付日期 :</span>
						<span>{{ JSON.stringify(CrowdRwxx) == '{}' ? '无' : CrowdRwxx.jfrq }}</span>
					</div>

					<el-table :data="JDGZList" style="width: 100%" border min-width="1200">
						<el-table-column prop="czrxm" label="操作人姓名" show-overflow-tooltip width="100"></el-table-column>
						<el-table-column prop="czsj" label="操作时间" show-overflow-tooltip width="180"></el-table-column>
						<el-table-column prop="shyy" label="审核意见" show-overflow-tooltip></el-table-column>
						<el-table-column prop="ztDisplay" label="状态" show-overflow-tooltip></el-table-column>
					</el-table>
				</div>
		</el-dialog>

    <xqqrDialog :show.sync="xqqrShow" :zbwid="zbwid" :btnbh="btnInfo.btnid" :demandDetail="detailInfo"  @handleClickSure="handleCommitQrxq"></xqqrDialog> <!-- 需求确认 -->
    <yzDialog :show.sync="yzShow" :zbwid="zbwid" :btnbh="btnInfo.btnid" :xmbh="detailInfo.xmbh" @handleClickSure="handleClickYzxq"></yzDialog> <!-- 需求验证 -->
    <gbxqDialog :show.sync="gbxqShow" :zbwid="zbwid" :btnbh="btnInfo.btnid" :demandDetail="detailInfo" @handleClickSure="handleClickGbxq"></gbxqDialog> <!-- 关闭需求 -->
    <crowdDialog :show.sync="crowdShow" :Type="curType" :zbwid="zbwid" :btnbh="btnInfo.btnid" @handleCommitCrowd="handleCommitCrowd"></crowdDialog> <!--  crowd -->
    <bhDialog :show.sync="bhShow" @handleClickSure="handleRejct"></bhDialog> <!-- 驳回 -->
    <xqtbDialog :show.sync="xqtbShow" :zbwid="zbwid" :btnbh="btnInfo.btnid" :xmbh="detailInfo.xmbh" @handleClickSure="handleClickXqtb"></xqtbDialog> <!-- 驳回  -->
    <fpgcsDialog :show.sync="fpgcsShow"  @handleCommitKfgcs="handleCommitKfgcs"></fpgcsDialog> <!-- 分配工程师  -->
    <!-- 发布需求，编辑 -->
    <fbxqDialog :show.sync="fbxqShow" :demandInfo="detailInfo" :Type="xqType" :btnbh="btnInfo.btnid" @handleCommitDemand="handleCommitDemand"></fbxqDialog>
    <!-- 提交开发包  -->
    <kfbDialog :show.sync="kfbShow" :zbwid="zbwid" :btnbh="btnInfo.btnid"  @handleClickSure="handleClicKfb"></kfbDialog>

  </div>
</template>

<script>
  import step from '@/components/demand/step';
  import xqqrDialog from '@/views/BusinessPage/demand/qrxq-dialog';
  import yzDialog from '@/views/BusinessPage/demand/yz-dialog';
  import gbxqDialog from '@/views/BusinessPage/demand/gbxq-dialog';
  import crowdDialog from '@/views/BusinessPage/demand/crowd-dialog';
  import bhDialog from '@/views/BusinessPage/demand/bh-dialog';
  import xqtbDialog from '@/views/BusinessPage/demand/xqtb-dialog';
  import fpgcsDialog from '@/views/BusinessPage/demand/fpgcs-dialog';
  import fbxqDialog from '@/views/BusinessPage/demand/xq-dialog';
  import kfbDialog from '@/views/BusinessPage/demand/tjkfb-dialog';

import { getCrowdId,getCrowdRwxx,getCrowdRwzt} from '@/api/xmkb.js';

  export default {
    data() {
      return {
        bhShow: false, //驳回
        xqqrShow: false, //需求确认
        yzShow: false, //需求验证
        gbxqShow: false, //关闭需求
        crowdShow: false, //crowd dialog
        xqtbShow: false, //需求提报
        fpgcsShow: false, //分配工程师
        fbxqShow:false,//发布需求，编辑
        kfbShow:false,//开发包
        jdgzVisible:false,//进度跟踪
        crowdId:'',
        JDGZList:[],
        CrowdRwxx:[],

        zbwid: '',
        curType: '', //crowd 当前类型

        xqType:'',// 发布需求
        stepData: [], //流程节点
        btnData: [], //按钮组
        btnInfo: {},

        detailInfo: {},
        replyData: []
      };
    },

    mounted() {
      this.zbwid = this.$route.query.id;
      $('#summernote').summernote({
        dialogsInBody: false,
        placeholder: '请输入回复内容',
        height: 200,
        width: 100 + '%',
        minHeight: 300,
        lang: 'zh-CN',
        focus: true,
        toolbar: [
          ['style', ['bold', 'italic', 'underline', 'clear']],
          ['font', ['strikethrough', 'superscript', 'subscript']],
          ['fontsize', ['fontsize']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['picture'],
          ['link', ['linkDialogShow', 'unlink']]
        ],
        callbacks: {}
      });

      this.queryProcessTemplate(); //流程
      this.queryDemand(); //详情
      this.queryDemandBtns(); //按钮组
      this.queryDemandReplys(); //回复
    },

    methods: {
      // 查看crowd任务编号
      handleClickRwxq(data){
        this.crowdId = data;
		  	this.getCrowdId(data);
      },
      // 提报crowd
      handleCommitCrowd(){
        this.queryProcessTemplate(); //流程
        this.queryDemandReplys(); //回复
        this.queryDemandBtns();
        this.queryDemand(); //详情
      },

      // 提交开发分配工程师
      handleCommitKfgcs(data){
        let formData = data;
        formData.zbwid = this.zbwid;
        formData.btnbh = this.btnInfo.btnid;

        this.$post(this.API.distributionDvpt,formData).then(res=>{
          if(res.state == 'success'){
            this.$message({message:'保存成功',type:'success'});
            this.queryDemandReplys();
            this.queryProcessTemplate();
            this.queryDemandBtns();
            this.queryDemand(); //详情
            this.fpgcsShow = false;
          }else{
             this.$alert(res.msg, '提示', {
                confirmButtonText: '确定',
                type:'error'
             });
          }
        })
      },

      // 按钮操作
      handleBtnOprate(params) {
        this.btnInfo = params;
        if (params.btnid == '1' || params.btnid == '4' || params.btnid == '2') { //1回复 4催办 2受理
          if ($('#summernote').summernote('code') == '<p><br></p>' && params.btnid == '1') {
             this.$alert('请输入回复内容', '提示', {
                confirmButtonText: '确定',
                type:'warning'
             });
             return;
          }
          this.$post(params.btnid == '1' ? this.API.reply : params.btnid == '4' ? this.API.remind : this.API.accept, {
            zbwid: this.zbwid,
            nr: $('#summernote').summernote('code'),
            btnbh: params.btnid
          }).then(res => {
            if (res.state == 'success') {
              this.$message({
                message: params.btnid == '1' ? '回复成功' : params.btnid == '4' ? '催办成功' : '受理成功',
                type: 'success'
              });
              $('#summernote').summernote('code', '');
              this.queryDemandReplys();
              if(params.btnid == '2'){
                this.queryProcessTemplate();
                this.queryDemandBtns();
              }
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              });
            }
          })
        } else if (params.btnid == '3') { //驳回
          this.bhShow = true;
        } else if (params.btnid == '5') { //分配开发工程
          this.fpgcsShow = true;
        } else if (params.btnid == '6') { //绿色通道
          this.curType = 'lstd';
          this.crowdShow = true;
        } else if (params.btnid == '7') { //需求提报
          this.xqtbShow = true;
        } else if (params.btnid == '8') { //需求确认
          this.xqqrShow = true;
        } else if (params.btnid == '9') { //需求开发
          this.curType = '';
          this.crowdShow = true;
        } else if (params.btnid == '10') {  //发布需求
          this.xqType = 'disabled';
          this.fbxqShow = true;
        } else if (params.btnid == '11') { //完成验证
          this.yzShow = true;
        } else if (params.btnid == '12') { //关闭需求
          this.gbxqShow = true;
        } else if (params.btnid == '15') { //编辑
          if(!!this.detailInfo.sfxqbg){
            this.xqType = 'editDisabled';
          }else{
            this.xqType = 'edit';
          }
          this.fbxqShow = true;
        }else{
          this.kfbShow = true;
        }
      },
      // 驳回
      handleRejct(data) {
        this.$post(this.API.reject, {
          zbwid: this.zbwid,
          nr: data.sm,
          fjwid:data.fjwid,
          fjmc:data.fjmc,
          btnbh: this.btnInfo.btnid
        }).then(res => {
          if (res.state == 'success') {
            this.$message({message: '已驳回',type: 'success'});
            this.bhShow = false;
            this.queryDemandReplys();
            this.queryDemandBtns();
            this.queryProcessTemplate();
          } else {
            this.$message({message: res.msg,type: 'error'});
          }
        })
      },
      // 需求确认
      handleCommitQrxq() {
        this.queryDemandReplys();
        this.queryProcessTemplate();
        this.queryDemandBtns();
        this.queryDemand(); //详情
      },
      // 验证需求
      handleClickYzxq() {
        this.queryDemandReplys();
        this.queryProcessTemplate();
        this.queryDemandBtns();
        this.queryDemand(); //详情
      },
      // 需求提报
      handleClickXqtb(){
        this.queryDemandReplys();
        this.queryProcessTemplate();
        this.queryDemandBtns();
        this.queryDemand(); //详情
      },
      // 关闭需求
      handleClickGbxq() {
        this.queryDemandReplys();
        this.queryProcessTemplate();
        this.queryDemandBtns();
        this.queryDemand(); //详情
      },
      // 编辑需求
      handleCommitDemand(data ){
        if(data.includes('edit')){
          this.queryDemandBtns();
          this.queryDemand(); //详情
          this.queryProcessTemplate();
          this.queryDemandReplys();
        }
      },
      // 开发包
      handleClicKfb(){
         this.queryDemandBtns();
          this.queryDemand(); //详情
          this.queryProcessTemplate();
          this.queryDemandReplys();
      },
      // 获取需求详情
      queryDemand() {
        this.$get(this.API.queryDemand, {
          zbwid: this.zbwid
        }).then(res => {
          if (res.state == 'success') {
            this.detailInfo = res.data;
            this.$get(this.API.getDictEnum, {
              name: 'DemandType',
              code: res.data.xqfl
            }).then(res => {
              if (res.state == 'success') {
                this.detailInfo.xqfl_display = res.data;
              }
            })
          } else {}
        })
      },

      // 获取回复
      queryDemandReplys() {
        this.$get(this.API.demandReplys, {
          zbwid: this.zbwid
        }).then(res => {
          if (res.state == 'success') {
            this.replyData = res.data;
          } else {

          }
        })
      },

      // 获取按钮
      queryDemandBtns() {
        this.$get(this.API.demandBtns, {
          zbwid: this.zbwid
        }).then(res => {
          if (res.state == 'success') {
            this.btnData = res.data;
          } else {}
        })
      },

      // 获取流程模板
      queryProcessTemplate() {
        this.$get(this.API.demandProcessTemplate, {
          zbwid: this.zbwid
        }).then(res => {
          if (res.state == 'success') {
            this.stepData = res.data;
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            });
          }
        })
      },

    getCrowdId(rwbh) {
			getCrowdRwzt({
				rwbh: rwbh //this.qusetionInfo.crowdid
			}).then(({ data }) => {
				if (data.state == 'success') {
					if (data.data != null && data.data.length != 0) {
						this.JDGZList = data.data;
						this.JDGZList.forEach((ele, i, arr) => {
							ele.czsj = formatTime(ele.czsj / 1000);
						});
					} else {
						this.JDGZList = [];
					}
				}
			});

			getCrowdRwxx({
				rwbh: rwbh //this.qusetionInfo.crowdid
			}).then(({ data }) => {
				if (data.state == 'success') {
					if (data.data != null) {
						this.CrowdRwxx = data.data;
					} else {
						this.CrowdRwxx = {};
					}
					this.jdgzVisible = true;
				}
			});
		},


    },
    components: {
      step,
      xqqrDialog,
      yzDialog,
      gbxqDialog,
      crowdDialog,
      bhDialog,
      xqtbDialog,
      fpgcsDialog,
      fbxqDialog,
      kfbDialog
    }
  };
</script>

<style scoped lang="scss">
  .demandDetail-pannel {
    width: 85%;
    margin: 20px auto;

    &:after {
      content: '';
      clear: both;
      display: block;
    }

    .demandDetail {
      margin-top: 20px;

      .demandDetail_bgimg {
        width: 114px;
        height: 74px;
        background: url('../../../../static/img/ywxbk.png') no-repeat;
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        padding: 0 5px;
      }

      .demandDetail-info {
        padding: 0 20px;

        >p {
          margin-top: 8px !important;
        }
      }
    }

    .detail-left {
      width: 75%;
    }

    .guid {
      min-width: 20%;

      h5 {
        border-bottom: 1px solid #999;
        text-align: center;
        padding: 10px 0;
        font-weight: 700 !important;
      }

      >div {
        padding: 20px 0 0 40px;
      }
    }

    .detail-content {
      margin: 15px 0 0 0;

      .content {
        padding: 15px 20px;
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
      }

      ul {
        li {
          padding: 15px 20px;
          border-bottom: 1px solid #dddddd;

          .reply-type {
            min-width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            margin-right: 30px;
            background: #169BD5;
            color: #fff;
          }
        }
      }
    }

    .title {
      color: #999;
    }
  }
</style>
