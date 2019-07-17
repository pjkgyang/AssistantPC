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
								{{detailInfo.glxqbh}} &#x3000;&#x3000;
							</p>
							<p>
								<span class="title">设计编号：</span>
								{{detailInfo.sjbh}} &#x3000;&#x3000;
								<span class="title">开发编号：</span>
								{{detailInfo.kfbh}} &#x3000;&#x3000;
							</p>
							<p>
								<span class="title">提出老师：</span>
								{{detailInfo.tcls}}&#x3000;&#x3000;{{detailInfo.lsdw}}
								<span class="title">需求类型：</span>
								{{detailInfo.xqfl}}&#x3000;&#x3000;
								<span class="title">责任人：</span>
								{{detailInfo.dqzrr}}
							</p>
							<p>
								<span class="title">所属项目：</span>
								{{detailInfo.xmbh}} {{detailInfo.xmmc}}
							</p>
							<p>
								<span class="title">期望设计完成日期：</span>
								{{detailInfo.qwsjwcrq}} &#x3000;&#x3000;
                <span class="title">期望开发交付日期：</span>
                {{detailInfo.qwkfjfrq}} &#x3000;&#x3000;
								<span class="title">模块：</span>
								{{detailInfo.cpbjmc}} &#x3000;&#x3000;
								<span class="title">产品分类：</span>
								{{detailInfo.cpmc }} &#x3000;&#x3000;
							</p>
							<p>
								<span class="title">需求文档：</span>
                <a href="#">{{detailInfo.xqfjmc}} {{detailInfo.xqfjwid}}</a> &#x3000;&#x3000;
								<span class="title">原型设计：</span>
                 <a href="#">{{detailInfo.yxfjmc}} {{detailInfo.yxfjwid}}</a> &#x3000;&#x3000;
								<span class="title">开发包：</span>
								<a href="#">{{detailInfo.kffjmc}} {{detailInfo.kffjwid}}</a> &#x3000;&#x3000;
							</p>
						</div>
				</div>
				<!-- 内容 -->
				<div class="detail-content">
					<div class="content" v-html="detailInfo.content"></div>
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
            <el-button size="mini" @click="handleBtnOprate('hf')">回复</el-button>
            <el-button size="mini" @click="handleBtnOprate('kfgcs')">分配开发工程师</el-button>
						<el-button size="mini" @click="handleBtnOprate('xqqr')">需求确认</el-button>


					</div>
			   </div>
		</div>
		<div class="pannelPaddingBg-10 guid pull-right" >
			<h5>需求工作指南</h5>
			<div>
				<step :list="stepData"></step>
			</div>
		</div>

		<xqqrDialog :show.sync="xqqrShow" @handleClickSure="handleCommitQrxq"></xqqrDialog>
		<yzDialog :show.sync="yzShow" @handleClickSure="handleClickYzxq"></yzDialog>
		<gbxqDialog :show.sync="gbxqShow"></gbxqDialog>
    <crowdDialog :show.sync="crowdShow" :Type="curType"></crowdDialog>
    <bhDialog :show.sync="bhShow"></bhDialog>
	</div>
</template>

<script>
import step from '@/components/demand/step';
import xqqrDialog from '@/views/BusinessPage/demand/qrxq-dialog';
import yzDialog from '@/views/BusinessPage/demand/yz-dialog';
import gbxqDialog from '@/views/BusinessPage/demand/gbxq-dialog';
import crowdDialog from '@/views/BusinessPage/demand/crowd-dialog';
import bhDialog from '@/components/dialog/smDialog';

export default {
	data() {
		return {
      bhShow:false,//驳回
			xqqrShow:false,//需求确认
			yzShow:false,//需求验证
			gbxqShow:false,//关闭需求
      crowdShow:false,//crowd dialog
      curType:'',
      stepData:[],//流程节点
      btnData:[],//按钮组
      detailInfo:{
        content:'<div class="a-info" style="line-height: 20px; color: rgb(153, 153, 153); padding-top: 35px; font-family: &quot;\&quot;PingFang SC\&quot;,Arial,\&quot;Microsoft yahei\&quot;,simsun,\&quot;sans-serif\&quot;&quot;; background-color: rgb(249, 249, 249);"><span class="time" style="margin-right: 20px;">2019-07-15 14:09</span>&nbsp;<span class="original" style="margin-right: 20px;"></span><span class="tag" style="float: right;"></span></div><div class="a-con" style="color: rgb(25, 25, 25); font-size: 16px; padding-top: 5px; overflow: hidden; line-height: 26px; position: relative; font-family: &quot;\&quot;PingFang SC\&quot;,Arial,\&quot;Microsoft yahei\&quot;,simsun,\&quot;sans-serif\&quot;&quot;; background-color: rgb(249, 249, 249);"><p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; word-break: break-all;"><img src="https://t1.huanqiucdn.cn/8ce8a8b95e312439756ad4e4153983f3.jpg" style="border-width: initial; border-style: none; max-width: 100%; display: block; height: auto; margin: 10px auto 20px;"></p><p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; word-break: break-all;">央视网消息（记者 徐辉）7月12日，应急管理部森林消防局直升机支队在黑龙江大庆隆重举行空中突击救援大队入营仪式，由黑龙江总队抽组的空中突击救援大队200名指战员进驻大庆。欢迎仪式上，全体指战员面对“中国消防救援”队旗，庄重宣誓。下一步，直升机支队将以此为契机大力开展空地协同训练，不断提高遂行多样化救援任务能力，切实担当起航空应急救援主力军、国家队的职责。（供图/黎伟）</p><p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; word-break: break-all;"><img src="https://t1.huanqiucdn.cn/c26784a814b01ea475dff4e47a52cb59.jpg" style="border-width: initial; border-style: none; max-width: 100%; display: block; height: auto; margin: 10px auto 20px;"></p><p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; word-break: break-all;">7月12日，应急管理部森林消防局直升机支队在黑龙江大庆隆重举行空中突击救援大队入营仪式，由黑龙江总队抽组的空中突击救援大队200名指战员进驻大庆。欢迎仪式上，全体指战员面对“中国消防救援”队旗，庄重宣誓。下一步，直升机支队将以此为契机大力开展空地协同训练，不断提高遂行多样化救援任务能力，切实担当起航空应急救援主力军、国家队的职责。（供图/黎伟）</p></div>'
      },
			replyData:[{
				hfrxm:'张三',
				hfsj:'2019-09-90',
				hflxmc:'分配开发',
				dqlcmc:'需求设计-分配开发',
				nr:'<p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; font-size: 16px; word-break: break-all; color: rgb(25, 25, 25); font-family: &quot;\&quot;PingFang SC\&quot;,Arial,\&quot;Microsoft yahei\&quot;,simsun,\&quot;sans-serif\&quot;&quot;; background-color: rgb(249, 249, 249);"><img src="https://t1.huanqiucdn.cn/f55f255b738a8c58fce48e8686bb7348.jpg" style="border-width: initial; border-style: none; max-width: 100%; display: block; height: auto; margin: 10px auto 20px;"></p><p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; font-size: 16px; word-break: break-all; color: rgb(25, 25, 25); font-family: &quot;\&quot;PingFang SC\&quot;,Arial,\&quot;Microsoft yahei\&quot;,simsun,\&quot;sans-serif\&quot;&quot;; background-color: rgb(249, 249, 249);">7月12日，应急管理部森林消防局直升机支队在黑龙江大庆隆重举行空中突击救援大队入营仪式，由黑龙江总队抽组的空中突击救援大队200名指战员进驻大庆。欢迎仪式上，全体指战员面对“中国消防救援”队旗，庄重宣誓。下一步，直升机支队将以此为契机大力开展空地协同训练，不断提高遂行多样化救援任务能力，切实担当起航空应急救援主力军、国家队的职责。（供图/黎伟）</p>'
			},{
				hfrxm:'张三',
				hfsj:'2019-09-90',
				hflxmc:'分配开发',
				dqlcmc:'需求设计-分配开发',
				nr:'<p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; font-size: 16px; word-break: break-all; color: rgb(25, 25, 25); font-family: &quot;\&quot;PingFang SC\&quot;,Arial,\&quot;Microsoft yahei\&quot;,simsun,\&quot;sans-serif\&quot;&quot;; background-color: rgb(249, 249, 249);"><img src="https://t1.huanqiucdn.cn/e6028604c5383216a0b445206647951a.jpg" style="border-width: initial; border-style: none; max-width: 100%; display: block; height: auto; margin: 10px auto 20px;"></p><p style="margin-top: 10px; margin-bottom: 20px; list-style: none; line-height: 30px; font-size: 16px; word-break: break-all; color: rgb(25, 25, 25); font-family: &quot;\&quot;PingFang SC\&quot;,Arial,\&quot;Microsoft yahei\&quot;,simsun,\&quot;sans-serif\&quot;&quot;; background-color: rgb(249, 249, 249);">7月12日，应急管理部森林消防局直升机支队在黑龙江大庆隆重举行空中突击救援大队入营仪式，由黑龙江总队抽组的空中突击救援大队200名指战员进驻大庆。欢迎仪式上，全体指战员面对“中国消防救援”队旗，庄重宣誓。下一步，直升机支队将以此为契机大力开展空地协同训练，不断提高遂行多样化救援任务能力，切实担当起航空应急救援主力军、国家队的职责。（供图/黎伟）</p>'
			},{
				hfrxm:'张三',
				hfsj:'2019-09-90',
				hflxmc:'分配开发',
				dqlcmc:'需求设计-分配开发',
				nr:'7月12日，应急管理部森林消防局直升机支队在黑龙江大庆隆重举行空中突击救援大队入营仪式，由黑龙江总队抽组的空中突击救援大队200名指战员进驻大庆。欢迎仪式上，全体指战员面对“中国消防救援”队旗，庄重宣誓。下一步，直升机支队将以此为契机大力开展空地协同训练，不断提高遂行多样化救援任务能力，切实担当起航空应急救援主力军、国家队的职责。（供图/黎伟）'
			}]
		};
	},
	mounted() {
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

    this.queryProcessTemplate();
	},
	methods: {
      handleBtnOprate(type){
          if(type == 'hf'){
            this.crowdShow = true;
          }else if(type == 'xqqr'){

          }else if(type == 'kfgcs'){
            this.curType = 'kfgcs';
            this.crowdShow = true
           }
      },

      // 需求确认
      handleCommitQrxq(){

      },
      // 验证需求
      handleClickYzxq(){

      },
      // 获取需求详情
      queryDemand(){
        this.$get(this.API.queryDemand,{
          zbwid:''
        }).then(res=>{
          if(res.state == 'success'){
            console.log(res);
            this.detailInfo = res.data;
          }else{}
        })
      },

      // 获取回复
      queryDemandReplys(){
        this.$get(this.API.demandReplys,{
          zbwid:''
        }).then(res=>{
          if(res.state == 'success'){
            console.log(res);
             this.replyData = res.data;
          }else{

          }
        })
      },

      // 获取按钮
      queryDemandBtns(){
        this.$get(this.API.demandBtns,{
          zbwid:''
        }).then(res=>{
          if(res.state == 'success'){
            console.log(res);
            this.btnData = res.data;
          }else{

          }
        })
      },

       // 获取流程模板
      queryProcessTemplate(){
        this.$get(this.API.demandProcessTemplate,{zbwid:''}).then(res=>{
          if(res.state == 'success'){
            this.stepData = res.data;
          }else{
            this.$message({message:res.msg,type:'error'});
          }
        })
      }


	},
	components: {step,xqqrDialog,yzDialog,gbxqDialog,crowdDialog,bhDialog}
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
