<template>
	<div class="demandDetail-pannel" >
		<div class="pannelPaddingBg-10 pull-left detail-left">
			 <div class="demandDetail" colcenter>
						<div class="demandDetail_bgimg" center>学工</div>
						<div class="demandDetail-info" flex-column spacebetween>
							<h4 class="filter-weight">北京大学</h4>
							<p>
								<el-tag key="1" type="success" effect="plain" size="mini">需求设计-分配开发</el-tag>
							</p>
							<p>
								2020-20-20 &#x3000; 张三 &#x3000;&#x3000;
								<span class="title">需求编号：</span>
								196646546 &#x3000;&#x3000;
								<span class="title">关联需求编号：</span>
								196646546 &#x3000;&#x3000;
							</p>
							<p>
								<span class="title">设计编号：</span>
								196646546 &#x3000;&#x3000;
								<span class="title">开发编号：</span>
								196646546 &#x3000;&#x3000;
							</p>
							<p>
								<span class="title">提出人：</span>
								王健&#x3000;华南师范大学 &#x3000;&#x3000;
								<span class="title">类型：</span>
								需求&#x3000;&#x3000;
								<span class="title">责任人：</span>
								开发经理
							</p>
							<p>
								<span class="title">所属项目：</span>
								uk17177 北京大学医学部
							</p>
							<p>
								<span class="title">期望完成日期：</span>
								2019-08-08 &#x3000;&#x3000;
								<span class="title">是否紧急：</span>
								2019-01-01 &#x3000;&#x3000;
								<span class="title">版本：</span>
								V999
							</p>
							<p>
								<span class="title">产品：</span>
								奖学金 &#x3000;&#x3000;
								<span class="title">产品分类：</span>
								学工 &#x3000;&#x3000;
							</p>
							<p>
								<span class="title">需求文档：</span>
								1111111 &#x3000;&#x3000;
								<span class="title">原型设计：</span>
								学工 &#x3000;&#x3000;
								<span class="title">开发包：</span>
								学工 &#x3000;&#x3000;
							</p>
						</div>
				</div>
				<!-- 内容 -->
				<div class="detail-content">
					<div class="content">阿萨德拉克零售价单看拉斯几点啦烧烤的</div>
					<ul>
						<li colcenter v-for="reply in replyData">
							<div class="reply-type"><span>{{reply.type==1?'分配开发':''}}</span></div>
							<div>
								<p>
									<span class="title">{{reply.fbrxm}}&#x3000;发表于&#x3000;{{reply.fbsj}}</span>&#x3000;
									<el-tag key="1" type="success" effect="plain" size="mini">{{reply.lcmc}}</el-tag>
								</p><br>
								<div>
									{{reply.content}}
								</div>
							</div>
						</li>
					</ul>
					<div>
						<div id="summernote"></div>
					</div>
					<div>
						<el-button @click="gbxqShow = true">需求确认</el-button>
					</div>
			   </div>
		</div>
		<div class="pannelPaddingBg-10 guid pull-right" >
			<h5>需求工作指南</h5>
			<div>
				<step></step>
			</div>
		</div>
		
		<xqqrDialog :show.sync="xqqrShow"></xqqrDialog>
		<yzDialog :show.sync="yzShow"></yzDialog>
		<gbxqDialog :show.sync="gbxqShow"></gbxqDialog>
	</div>
</template>

<script>
import step from '@/components/demand/step';
import xqqrDialog from '@/views/BusinessPage/demand/qrxq-dialog';
import yzDialog from '@/views/BusinessPage/demand/yz-dialog';
import gbxqDialog from '@/views/BusinessPage/demand/gbxq-dialog';
export default {
	data() {
		return {
			xqqrShow:false,
			yzShow:false,
			gbxqShow:false,
			replyData:[{
				fbrxm:'张三',
				fbsj:'2019-09-90',
				type:1,
				lcmc:'需求设计-分配开发',
				content:'2018年7月19日，就在部长级会议闭幕几天后，习近平主席便踏上了对阿联酋进行国事访问的旅程。这是习近平主席再次当选国家主席后的首访首站。贵宾到访，主人以超高规格的接待表达敬意。阿联酋派出12架战机为习近平主席专机护航，礼炮鸣放，马队护卫，欢迎焰火点亮夜空……'
			},{
				fbrxm:'张三',
				fbsj:'2019-09-90',
				type:1,
				lcmc:'需求设计-分配开发',
				content:'2018年7月19日，就在部长级会议闭幕几天后，习近平主席便踏上了对阿联酋进行国事访问的旅程。这是习近平主席再次当选国家主席后的首访首站。'
			},{
				fbrxm:'张三',
				fbsj:'2019-09-90',
				type:1,
				lcmc:'需求设计-分配开发',
				content:'2018年7月19日，就在部长级会议闭幕几天后，习近平主席便踏上了对阿联酋进行国事访问的旅程。这是习近平主席再次当选国家主席后的首访首站。'
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
	},
	methods: {

	},
	components: {step,xqqrDialog,yzDialog,gbxqDialog}
};
</script>

<style scoped lang="scss">
.demandDetail-pannel {
	width: 85%;
	margin: 20px auto 0;
	.demandDetail {
		margin-top: 20px ;
		.demandDetail_bgimg {
			width: 114px;
			height: 74px;
			background: url('../../../../static/img/demand-bg.png') no-repeat;
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
			padding:20px 0 0 20px;
		}
	}
	
	.detail-content{
		margin:15px 0;
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
