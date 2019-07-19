<template>
	<div class="demandDetail-pannel" >
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
								{{detailInfo.sjbh}} &#x3000;&#x3000;
								<span class="title">开发编号：</span>
								{{detailInfo.kfbh}} &#x3000;&#x3000;
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
                <a title="点击下载" :href="API.downloadFile+'?fjId='+detailInfo.xqfjwid" target="_blank">{{detailInfo.xqfjmc}}</a> &#x3000;&#x3000;
                <span>
                  <span class="title">原型设计：</span>
                  <a v-if="!!detailInfo.yxfjwid" title="点击下载" :href="API.downloadFile+'?fjId='+detailInfo.yxfjwid" target="_blank">{{detailInfo.yxfjmc}}</a>
                  <span v-if="!detailInfo.yxfjwid">无</span>
                </span>&#x3000;&#x3000;
                <span>
                  <span class="title">开发包：</span>
                  <a v-if="!!detailInfo.kffjwid" title="点击下载" :href="API.downloadFile+'?fjId='+detailInfo.kffjwid" target="_blank">{{detailInfo.kffjmc}}</a>
                  <span v-if="!detailInfo.kffjwid">无</span>
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
								<div v-html="reply.nr"></div>
							</div>
						</li>
					</ul>
					<div>
						<div id="summernote"></div>
					</div>
          <!-- 按钮组 -->
					<div text-right>
            <el-button size="mini" type="primary" v-for="(btn,index) in btnData" :key="index" @click="handleBtnOprate(btn)">{{btn.btnabb}}</el-button>
					</div>
			   </div>
		</div>
		<div class="pannelPaddingBg-10 guid pull-right" >
			<h5>需求工作指南</h5>
			<div>
				<step  :list="stepData"></step>
			</div>
		</div>
		<xqqrDialog :show.sync="xqqrShow" @handleClickSure="handleCommitQrxq"></xqqrDialog>    <!-- 需求确认 -->
		<yzDialog :show.sync="yzShow" :xmbh="detailInfo.xmbh" @handleClickSure="handleClickYzxq"></yzDialog>  <!-- 需求验证 -->
		<gbxqDialog :show.sync="gbxqShow" @handleClickSure="handleClickGbxq"></gbxqDialog> <!-- 关闭需求 -->
    <crowdDialog :show.sync="crowdShow" :Type="curType"></crowdDialog>  <!--  crowd -->
    <bhDialog :show.sync="bhShow"   @handleClickSure="handleRejct"></bhDialog> <!-- 驳回 -->
    <xqtbDialog :show.sync="xqtbShow" :xmbh="detailInfo.xmbh"></xqtbDialog> <!-- 驳回  -->
    <fpgcsDialog  :show.sync="fpgcsShow"></fpgcsDialog> <!-- 分配工程师  -->
	</div>
</template>

<script>
import step from '@/components/demand/step';
import xqqrDialog from '@/views/BusinessPage/demand/qrxq-dialog';
import yzDialog from '@/views/BusinessPage/demand/yz-dialog';
import gbxqDialog from '@/views/BusinessPage/demand/gbxq-dialog';
import crowdDialog from '@/views/BusinessPage/demand/crowd-dialog';
import bhDialog from '@/components/dialog/smDialog';
import xqtbDialog from '@/views/BusinessPage/demand/xqtb-dialog';
import fpgcsDialog from '@/views/BusinessPage/demand/fpgcs-dialog';

export default {
	data() {
		return {
      bhShow:false,//驳回
			xqqrShow:false,//需求确认
			yzShow:false,//需求验证
			gbxqShow:false,//关闭需求
      crowdShow:false,//crowd dialog
      xqtbShow:false,//需求提报
      fpgcsShow:false,//分配工程师
      zbwid:'',
      curType:'', //crowd 当前类型
      stepData:[],//流程节点
      btnData:[
        {btnabb:'回复',btnid:'1'},
        {btnabb:'受理',btnid:'2'},
        {btnabb:'驳回',btnid:'3'},
        {btnabb:'分配开发',btnid:'5'},
        {btnabb:'催办',btnid:'4'},
        {btnabb:'绿色通道',btnid:'6'},
        {btnabb:'需求提报',btnid:'7'},
        {btnabb:'需求确认',btnid:'8'},
        {btnabb:'需求开发',btnid:'9'},
        {btnabb:'完成验证',btnid:'11'},
        {btnabb:'关闭需求',btnid:'12'}
      ],//按钮组
      btnInfo:{},

      detailInfo:{},
			replyData:[{
				hfrxm:'张三',
				hfsj:'2019-09-90',
				hflxmc:'分配开发',
				dqlcmc:'需求设计-分配开发',
        nr:'1111'
			},{
				hfrxm:'张三',
				hfsj:'2019-09-90',
				hflxmc:'分配开发',
				dqlcmc:'需求设计-分配开发',
        nr:'1111'
			},{
				hfrxm:'张三',
				hfsj:'2019-09-90',
				hflxmc:'分配开发',
				dqlcmc:'需求设计-分配开发',
				nr:'2222'
			}]
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

    this.queryProcessTemplate();//流程
    this.queryDemand();//详情
    this.queryDemandBtns();//按钮组
    this.queryDemandReplys();//回复
	},

	methods: {
      handleBtnOprate(params){
         this.btnInfo = params;
          if(params.btnid == '1' || params.btnid == '4' || params.btnid == '2'){  //1回复 4催办 2受理
            if($('#summernote').summernote('code')=='<p><br></p>' && params.btnid == '1'){
              this.$message({message:'请输入回复内容',type:'warning'});
              return;
            }
            this.$post(params.btnid == '1'?this.API.reply:params.btnid == '4'?this.API.remind:this.API.accept,{
              zbwid:this.zbwid,
              nr:$('#summernote').summernote('code'),
              btnbh:params.btnid
            }).then(res=>{
              if(res.state == 'success'){
                this.$message({message:params.btnid == '1'?'回复成功':params.btnid == '4'?'催办成功':'受理成功',type:'success'});
                $('#summernote').summernote('code','');
                this.queryDemandReplys();
              }else{
                this.$message({message:res.msg,type:'error'});
              }
            })
          }else if(params.btnid == '3'){  //驳回
            this.bhShow = true;
          }else if(params.btnid == '5'){  //分配开发工程
            this.fpgcsShow = true;
          }else if(params.btnid == '6'){  //绿色通道
            this.curType = 'lstd';
            this.crowdShow = true;
          }else if(params.btnid == '7'){  //需求提报
            this.xqtbShow = true;
          }else if(params.btnid == '8'){  //需求确认
            this.xqqrShow = true;
          }else if(params.btnid == '9'){  //需求开发
            this.crowdShow = true;
          }else if(params.btnid == '11'){  //完成验证
            this.yzShow = true;
          }else if(params.btnid == '12'){  //关闭需求
            this.gbxqShow = true;
          }
      },
      // 驳回
      handleRejct(data){
        this.$post(this.API.reject,{
          zbwid:this.zbwid,
          nr:data,
          btnbh:this.btnInfo.btnid
        }).then(res=>{
          if(res.state == 'succes'){
            this.$message({message:'已驳回',type:'success'});
            this.queryDemandReplys();
          }else{
            this.$message({message:res.msg,type:'error'});
          }
        })
      },
      // 需求确认
      handleCommitQrxq(){

      },
      // 验证需求
      handleClickYzxq(){

      },
      // 关闭需求
      handleClickGbxq(){

      },
      // 获取需求详情
      queryDemand(){
        this.$get(this.API.queryDemand,{
          zbwid:this.zbwid
        }).then(res=>{
          if(res.state == 'success'){
            this.detailInfo = res.data;
            this.$get(this.API.getDictEnum,{
              name: 'DemandType',
              code: res.data.xqfl
            }).then(res=>{
              if(res.state == 'success'){
                this.detailInfo.xqfl_display = res.data;
              }
            })
          }else{}
        })
      },

      // 获取回复
      queryDemandReplys(){
        this.$get(this.API.demandReplys,{
          zbwid:this.zbwid
        }).then(res=>{
          if(res.state == 'success'){
             this.replyData = res.data;
          }else{

          }
        })
      },

      // 获取按钮
      queryDemandBtns(){
        this.$get(this.API.demandBtns,{
          zbwid:this.zbwid
        }).then(res=>{
          if(res.state == 'success'){
            // this.btnData = res.data;
          }else{}
        })
      },

       // 获取流程模板
      queryProcessTemplate(){
        this.$get(this.API.demandProcessTemplate,{zbwid:this.zbwid}).then(res=>{
          if(res.state == 'success'){
            this.stepData = res.data;
          }else{
            this.$message({message:res.msg,type:'error'});
          }
        })
      }


	},
	components: {step,xqqrDialog,yzDialog,gbxqDialog,crowdDialog,bhDialog,xqtbDialog,fpgcsDialog}
};
</script>

<style scoped lang="scss">
.demandDetail-pannel {
	width: 85%;
	margin: 20px auto;
  &:after{
    content: '';
    clear: both;
    display: block;
  }
	.demandDetail {
		margin-top: 20px ;
		.demandDetail_bgimg {
			width: 114px;
			height: 74px;
			// background: url('../../../../static/img/demand-bg.png') no-repeat;
      background: #999;
			color: #fff;
			font-weight: 700;
			font-size: 18px;
			padding: 0 5px;
		}
		.demandDetail-info {
			padding: 0 20px;
			>p {
			   margin-top: 8px !important;
			}
		}
	}

	.detail-left{
		width: 75%;
	}
	.guid{
		min-width: 20%;
		h5{
			border-bottom: 1px solid #999;
			text-align: center;
			padding: 10px 0;
			font-weight: 700 !important;
		}
		>div{
			padding:20px 0 0 40px;
		}
	}

	.detail-content{
		margin:15px 0 0 0;
		.content{
			padding: 15px 20px;
			border-top: 1px solid #dddddd;
			border-bottom: 1px solid #dddddd;
		}
		ul{
			li{
				padding: 15px 20px;
				border-bottom: 1px solid #dddddd;
				.reply-type{
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
