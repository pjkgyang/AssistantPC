<template>
  <div>
    <div class="project-question">
      <div>
        <ul class="project-question-detail">
          <li style="margin:10px 0;border:none">
            <div class="question-steps">
              <el-steps align-center finish-status="success">
                <el-step v-for="(Process,index) in questionProcess" :status='Process.status' :key="index" :title="Process.mc">
                  <i v-if="Process.flag == 1" class="el-icon-time" slot="icon"></i>
                </el-step>
              </el-steps>
            </div>
          </li>
          <li>
            <div class="project-question-detail-top">
              <div class="question-type">
                <span :class="{'el-icon-question':true}"></span>
              </div>
              <div class="question-content">
                <span style="font-size:18px;color:#363748">{{qusetionInfo.bt}}</span><br>
                <span style="font-size:12px;color:#363748">{{qusetionInfo.fbrq}}</span>&#x3000;
                <span style="font-size:12px;color:#363748">问题编号：{{qusetionInfo.wtbh}}</span>
                <div>
                  <span style="color:#000">
                    <span class="question-info-front">所属项目 &#x3000;</span>{{qusetionInfo.xmmc==''?'无':qusetionInfo.xmmc}}</span>
                </div>
                <p>
                  <span>
                    <span class="question-info-front">发布人 &#x3000;</span>{{qusetionInfo.fbrxm}}
                    <span v-if="hffjshow">({{qusetionInfo.fbrbh}})</span>
                  </span>
                  <span>
                    <span class="question-info-front">所属单位 &#x3000;</span>{{qusetionInfo.ssbm == ''?'无':qusetionInfo.ssbm}}</span>
                  <span>
                    <span class="question-info-front">问题类别 &#x3000;</span>{{wtlbmc == ''||wtlbmc == null?'无':wtlbmc}}</span>
                </p>
                <p>
                  <span>
                    <span class="question-info-front">产品 &#x3000;</span>{{qusetionInfo.cpmc}}</span>
                  <span>
                    <span class="question-info-front">是否紧急 &#x3000;</span>{{qusetionInfo.jjyf==null?'无':qusetionInfo.jjyf == 0?'否':'是'}}</span>
                  <span>
                    <span class="question-info-front">版本号 &#x3000;</span>{{qusetionInfo.bbh}}</span>
                </p>
                <p>
                  <span>
                    <span class="question-info-front">期望解决日期&#x3000;</span>{{qusetionInfo.qwjjrq==''?'无':qusetionInfo.qwjjrq}}&#x3000;</span>
                  <span>
                    <span class="question-info-front">承诺结束日期&#x3000;</span>{{qusetionInfo.cnjsrq == ''?'无':qusetionInfo.cnjsrq}}</span>
                  <!-- <span v-if="false">
                    <span class="question-info-front">开发工作量 &#x3000;</span>{{qusetionInfo.kfgzl}} 人/天</span> -->
                  <span>
                    <span class="question-info-front">问题来源 &#x3000;</span>{{wtlymc == ''||wtlymc == null?'无':wtlymc}}
                  </span>
                </p>

                <p>
                  <span>
                  <span class="question-info-front">解决责任人 &#x3000;</span>{{qusetionInfo.jjzrr}}</span>
                  <span v-if="hffjshow">
                    <span class="question-info-front">环境信息 &#x3000;</span>
                    <a :href="baseUrl+'attachment/downloadFile.do?fjId='+qusetionInfo.hjfjwid" target="blank">{{qusetionInfo.fjmc}}</a>
                  </span>
                  <span>
                    <span class="question-info-front">项目状态 &#x3000;</span>{{qusetionInfo.xmzt}}
                  </span>
                </p>
                <p>
                  <span>
                    <span class="question-info-front item-wtbq">问题标签 &#x3000;</span>
                    <span class="item-wtbq-tag">
                      <el-tag style="margin:0 10px 5px 0;" v-for="(tag,i) in wtbq" :key="i" :closable="tag.sjly == 2 || (User.indexOf('ProblemAdmin') != -1 && tag.sjly !=0)" size="mini" :type="tag.type" :title="tag.sjly == 0?'点击添加标签':''" 
                      @click.native="handleClick(i)" @close="handleCloseTag(i)">
                        {{tag.mc}}
                      </el-tag>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div class="project-question-detail-bottom">
              <div v-html="qusetionInfo.nr"></div>
            </div>
          </li>
          <li v-for="(reply,index) in questionReply">
            <div class="project-question-detail-top" style="background:#F5F7FA;height:44px;">
              <div class="question-type">
                <span class="question-reply">{{reply.hflx == 1?'回复':reply.hflx == 2?'转发':reply.hflx == 3?'申请':reply.hflx == 4?'受理':reply.hflx == 5?'取消':reply.hflx == 6?'指定':reply.hflx == 7?'催办':reply.hflx == 99?'记录':reply.hflx == 10?'待验':reply.hflx == 11?'标签':reply.hflx == 12?'集成':reply.hflx == 13?'运营':'开发'}}</span>
              </div>
              <div class="question-content-SC">
                <span>{{reply.bt}}</span>
                <div flex>
                  <p style="width:85%;padding-top:5px">
                    <span>回复人 : {{reply.fbrxm}}</span>&#x3000;
                    <span>流程状态 : {{reply.lcbh==''?'无':reply.lcbh}}</span>&#x3000;
                    <span>{{reply.fbsj}}</span>&#x3000;
                    <span v-if="reply.fbrxm != qusetionInfo.fbrxm && reply.hflx != 11 && reply.hflx != 12 && reply.hflx != 13">
                      <!-- 问题复盘 标签11 -->
                      <span v-if="reply.hflx != 6&&reply.hflx != 5&&reply.hflx != 4&&reply.hflx != 7&&reply.hflx != 9&&reply.hflx != 10">是否bug:{{reply.sfbg==0?'否':'是'}}</span>&#x3000;
                      <span v-if="reply.hflx != 6&&reply.hflx != 5&&reply.hflx != 4&&reply.hflx != 7&&reply.hflx != 9&&reply.hflx != 10">实施工时:{{reply.gs==''?0:reply.gs}}</span>
                      <span v-if="reply.hflx == 4">承诺结束日期:{{reply.cnjsrq==''?'无':reply.cnjsrq}}</span>&#x3000;
                      <span v-if="reply.hflx == 4">工时:{{reply.gs == ''?'0':reply.gs}}</span>
                      <span v-if="reply.hflx == 2||reply.hflx == 6">期望解决日期:{{reply.qwjjrq}}</span>
                    </span><br>
                    <span v-if="reply.hflx==2||reply.hflx==6||reply.hflx==7||reply.hflx==12||reply.hflx==13">
                      <span>{{reply.hflx==2?'转发至：':reply.hflx==7?'催办人：':reply.hflx==12||reply.hflx==13?'发送至：':'责任人：'}}</span>{{reply.sfjsr}}</span>
                  </p>
                  <span v-if="reply.sfhf == 1" flex-align-center>
                    <el-button @click="handleReplyEdit($event,index)" size="mini" style="width:60px;height:28px">编辑</el-button>
                    <el-button @click="handleReplyDelete($event,reply)" size="mini" type="danger" style="width:60px;height:28px">删除</el-button>&#x3000;
                  </span>
                  <span v-if="reply.wtjjj != 2 && !isCjwt" flex-align-center>
                    <el-button @click="handleSetResolve($event,reply,'')" :disabled="reply.wtjjj == 0" size="mini">{{reply.wtjjj==0?'已设为常见问题':reply.wtjjj==1?'设置为常见问题':''}}</el-button>&#x3000;
                  </span>
                  <span v-if="reply.wtjjj == 1 && isCjwt" flex-align-center>
                    <el-button @click="handleSetResolve($event,reply,'close')" size="mini">取消设置常见问题</el-button>&#x3000;
                  </span>
                  <span v-if="(reply.hflx == 3||reply.hflx == 10) && qusetionInfo.fbzt != 1" flex-align-center>
                    <el-button type="primary" v-if="reply.sfbh == 0" @click="handleRejectQuestion(reply.wid,index)" size="mini">驳回</el-button>
                    <el-tag v-if="reply.sfbh == 1" type="info" size="small">已驳回</el-tag>
                  </span>
                  <span v-if="reply.hflx == 9 && !!isgcXmtdbyWt" flex-align-center>
                    <el-button @click="handleEditkfrw($event,reply)" type="primary" size="mini">编辑开发任务</el-button>&#x3000;
                  </span>
                </div>
              </div>
            </div>
            <div class="project-question-detail-bottom">
              <div v-html="reply.nr + (!reply.sm?'':('<br><br><span style=color:red>'+reply.czrxm+' 于 '+reply.czsj+' 驳回了 '+reply.fbrxm+' 的申请；<br>驳回说明：'+reply.sm+'</span>'))" v-if="reply.hflx != 9"></div>
              <div v-if="reply.hflx == 9">
                <a href="javascript:void(0)" @click="handleJDGZ(reply.crowdid)">查看开发任务进度</a><br>
                <div v-html="reply.nr"></div>
              </div>
            </div>
          </li>

          <li v-if="qusetionInfo.fbzt == 1">
            <div class="project-question-detail-top" style="background:#F5F7FA;padding:10px 0;">
              <div class="question-type">
                <span class="question-reply">关闭</span>
              </div>
              <div class="question-content-SC">
                <p>
                  <span>关闭人 : {{qusetionInfo.wtgbr}}</span>&#x3000;
                  <span>{{qusetionInfo.gbsj}}</span>&#x3000;
                </p>
              </div>
            </div>
            <div class="project-question-detail-bottom" style="padding:0 30px;">
              <span style="border-left:4px solid #8A2BE2;font-weight:700;padding:0 8px;">服务评价</span>
              <div style="display:flex;border:none;padding:0;margin-bottom:5px;">
                <p style="display:flex;align-items:center;">
                  <span style="padding:0 12px">服务质量：</span>
                  <el-rate :disabled="true" v-model="zlpf" show-text :texts="['1分','2分','3分','4分','5分']"> </el-rate>
                </p>
              </div>
              <section v-if="zlpf<=3 && !!qusetionInfo.cpsm">
                <span style="border-left:4px solid #8A2BE2;font-weight:700;padding:0 8px;">服务评价说明</span>
                <div style="padding:0 !important;text-indent:12px" :class="{'isRedColor':!!qusetionInfo.cpsm}">{{!qusetionInfo.cpsm?'无':qusetionInfo.cpsm}}</div>
              </section>
              <span style="border-left:4px solid #8A2BE2;font-weight:700;padding:0 8px;">有效贡献人</span>
              <p v-for="(GXR,index) in yxGXR" :key="index" style="text-indent:12px">
                <span>姓名 : {{GXR.gxrxm}}</span>&#x3000;工时 :
                <span>{{GXR.gs}} (小时)</span>
              </p>
              <p v-if="yxGXR!=null&&yxGXR.length!=0" style="text-indent:12px">合计工时 : {{hjgs}} (小时)</p>
              <p v-if="yxGXR==null||yxGXR.length==0">暂无贡献人</p>
              <span style="border-left:4px solid #8A2BE2;font-weight:700;padding:0 8px;">解决说明</span>
              <div style="padding:0 !important;text-indent:12px" v-html="!qusetionInfo.jjsm?'无':qusetionInfo.jjsm"></div>
              <section v-if="qusetionInfo.gssfrk != ''">
                <span style="border-left:4px solid #8A2BE2;font-weight:700;padding:0 8px;">是否认可工时:</span>
                <span style="padding:0 !important;color:#888;" :class="{'isRedColor':qusetionInfo.gssfrk != 1}">{{qusetionInfo.gssfrk==1?'是':'否'}}</span>
              </section>
            </div>
          </li>

          <div style="margin-top:15px;" class="question-note">
            <div style="margin:5px 0;" v-if="username != qusetionInfo.fbrxm && qusetionInfo.fbzt != 1 && (isJZuser == 0||isJZuser == 2)">
              实施工时 :
              <el-input v-model="gsValue" placeholder="请输入内容" size='mini' style="width:100px"></el-input>&nbsp; 是否bug :
              <el-select v-model="sfbgValue" placeholder="请选择" size="mini">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>&nbsp;
              </el-date-picker>
              通知提问人 :
              <el-radio v-model="tktwr" :label="true">是</el-radio>
              <el-radio v-model="tktwr" :label="false">否</el-radio>
            </div>
            <div id="summernoteT"></div>
          </div>
          <div style="text-align:right;padding-top:10px">
            <el-button size="mini" type="primary" @click="handleSqdyz" v-if="btnShwon.sqdyz">申请待验证</el-button>
            <el-button size="mini" type="primary" @click="sendMsg" v-if="btnShwon.fsxx">发送消息</el-button>
            <el-button size="mini" type="primary" @click="replyQuestion('yyjl')" v-if="btnShwon.yyjl">添加运营记录</el-button>
            <el-button size="mini" type="primary" @click="changeCrowdId" v-if="btnShwon.xgcrowId">提报crowd任务</el-button>
            <el-button size="mini" type="primary" @click="accreditQuestion" v-if="btnShwon.sl">受理</el-button>
            <el-button size="mini" type="info" @click="changeCNDate" v-if="btnShwon.cnsj">修改承诺时间</el-button>
            <el-button size="mini" type="primary" @click="forwardingProblem" v-if="btnShwon.zf">转发问题</el-button>
            <el-button size="mini" type="primary" @click="handleYYRYZF" v-if="btnShwon.yyzf">运营人员转发</el-button>
            <el-button size="mini" type="primary" @click="appointPrincipal" v-if="btnShwon.zdr">指定解决人</el-button>
            <el-button size="mini" type="primary" @click="requisitionSettlement" v-if="btnShwon.sqjs">申请关闭</el-button>
            <el-button size="mini" type="primary" @click="remindsQuestion" v-if="btnShwon.cb">催办</el-button>
            <el-button size="mini" type="primary" @click="replyQuestion('hf')" v-if="btnShwon.hf" :disabled="isHF">回复</el-button>
            <el-button size="mini" type="danger" @click="closeQuestion" v-if="btnShwon.gb">关闭问题</el-button>
          </div>
        </ul>
      </div>

      <el-dialog width="600px" title="问题评价" :visible.sync="innerVisible" :close-on-click-modal="false" append-to-body>
        <div class="question-evaluate">
          <div class="question-rate">
            <p>
              <span class="filter-weight before-require">服务质量：</span>
              <el-rate v-model="fwzlValue" show-text :texts="['1 分','2 分','3 分','4 分','5 分']"></el-rate>
            </p>
          </div>
          <div class="question-rate" v-if="fwzlValue <= 3">
            <p>
              <span class="filter-weight before-require">评价说明：</span>
            </p>
            <p>
              <el-input type="textarea" :rows="2" placeholder="请输入说明内容" v-model="cpsm" style="width:490px;"></el-input>
            </p>
          </div>
          <p>说明：请认定贡献人工时，谢谢您的支持!</p>
          <div>
            <span class="filter-weight">合计贡献人: </span>
            <span style="color:#f00">{{ContributionPeople.length}} </span> 人
            <el-table :data="ContributionPeople" style="width: 100%" border :max-height="580" border>
              <el-table-column prop="fbrxm" label="姓名"></el-table-column>
              <el-table-column label="工时(小时)">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.qrgs" :class="{'is-outline':questionReply.length!=0&&questionReply[0].sfhf == 1}" size="mini" :readonly="questionReply.length!=0&&questionReply[0].sfhf != 1"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="question-rate">
            <p>
              <span class="filter-weight">工时认可：</span>
            </p>
            <el-radio-group v-model="gssfrk">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </div>
          <div style="text-align:right;margin:10px 0;">
            <el-button type='primary' size="mini" @click="commitQuestion">提交</el-button>
          </div>
        </div>
      </el-dialog>
      <!-- 受理 -->
      <el-dialog width="600px" :title="isSltitle" :visible.sync="innerCNRQVisible" :close-on-click-modal="false" append-to-body>
        <div style="padding:10px;">
          <span v-if="isSLvisible" class="filter-bt" style="display:inline-block;">
            期望解决日期 :
          </span>
           <el-date-picker v-model="xgqwjjrq" type="date" placeholder="选择日期" format="yyyy-MM-dd" :clearable="false" size="mini" readonly></el-date-picker>
          <div v-if="false" style="display:flex;margin-bottom:15px;">
            <span>环境信息 : </span>
            <el-upload style="width:510px;" class="upload-demo" ref="upload" :limit='1' :action="uploadAction" :before-upload="beforeUpload" :on-remove="handleRemove" :on-change="handleChange" :file-list="fileList" :show-file-list="true" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </div>

          <div style="margin:15px 0;">
            <span class="filter-bt">承诺结束日期 :</span>
            <el-date-picker :picker-options="pickerBeginDateBefore" v-model="xgcnjsrq" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :clearable="false" size="mini"></el-date-picker>
          </div>

          <div v-if="isSLvisible" style="margin:15px 0">
           <span class="filter-bt">问题来源 :</span>
           <el-select v-model="wtly" size="mini" placeholder="请选择问题来源" style="width:220px">
              <el-option v-for="(item,index) in wtlyList" :key="index" :label="item.mc" :value="item.label">
              </el-option>
          </el-select>
          </div>

          <div v-if="!isSLvisible" style="margin:15px 0">
            <span class="filter-bt before-require">说明：</span>
            <el-input type="textarea" :rows="2" style="width:400px" placeholder="请输入说明内容" v-model="cnjssm"></el-input>
          </div>

          <div style="text-align:right">
            <el-button type="primary" size="mini" @click="CommitChangeCNjsrq">提交</el-button>
            <el-button type="info" size="mini" @click="CancelChangeCNjsrq">取消</el-button>
          </div>
        </div>
      </el-dialog>

        <!-- 转发问题 -->
      <el-dialog width="1000px" title="转发问题" :visible.sync="innerZFWTisible" :close-on-click-modal="false" append-to-body>
        <div style="padding:10px;" class="question_transmit">
          <span class="filter-weight span_label before-require">转发对象: &nbsp;&nbsp;</span>
          <span v-if="zfDx.length == 0"> 暂无</span>
          <el-radio-group v-model="radio">
            <el-radio v-for="zfdx in zfDx" :key="zfdx.bh" :label="zfdx.bh">{{zfdx.mc}}</el-radio>
          </el-radio-group>

          <div style="margin:10px 0;" v-if="radio == 11">
            <span class="filter-weight span_label before-require">选择产品:</span>
            <el-select v-model="zfcp" size="mini" placeholder="选择产品" style="width:400px">
              <el-option v-for="(cp,index) in cplist" :key="index" :label="cp.mc" :value="cp.label"></el-option>
            </el-select>
          </div>
          <!-- 转发对象 -->
          <div style="margin:10px 0;" v-if="radio == 66">
            <span class="filter-weight span_label before-require">转发成员:</span>
            <el-input size="mini"  placeholder="请选择转发对象" v-model="forwordUser" :disabled="true" style="width:400px"></el-input>&nbsp;
            <el-button size="mini" type="primary" @click="handleChooseXmtdcy">选择转发成员</el-button>
          </div>        

          <div style="margin-top:10px;">
            <span class="question-sqdyz-title filter-weight span_label">期望解决日期:</span>
            <el-date-picker size="mini" v-model="qwjjrqZf" type="date" placeholder="选择期望解决日期" value-format="yyyy-MM-dd"></el-date-picker>
          </div>
          <div class="question-zf">
            <span class="before-require filter-weight span_label" style="display:inline-block;margin:10px 0 !important;">转发说明: &nbsp;&nbsp;</span>
            <div id="summernoteZF"></div>
            <div style="text-align:right;margin:10px 0;">
              <el-button type="primary" size="mini" @click="CommitZFWT">提交</el-button>
              <el-button type="info" size="mini" @click="CancelZFWT">取消</el-button>
            </div>
          </div>
        </div>
      </el-dialog>



      <el-dialog title="选择项目" :visible.sync="dialogQuestionVisible" :close-on-click-modal="false" width="1000px" top="30px" append-to-body>
        <div style="padding:10px;">
          <itemChoose @handleEdit="handleEdit"></itemChoose>
        </div>
      </el-dialog>
      <el-dialog :title="zdTitle" :visible.sync="zdfzrVisible" :close-on-click-modal="false" width="800px" top="30px" @close="ClosezdfzrVisible" append-to-body>
        <div style="padding:10px;">
          <zdfzrChoose :lchjList="lchjList" :visible="zdfzrVisible" :tableData="tableData" :zdTitle="zdTitle" :jkrTotal="jkrTotal" @handleYYRYLX="handleYYRYLX" @handleClose="handleClose" @handleCommitZdr="handleCommitZdr" @queryComplainZRR="queryComplainZRR" @queryComplainUser="queryComplainUser" @handleCurrentChange="handleZrrChange"></zdfzrChoose>
        </div>
      </el-dialog>


      <el-dialog title="申请关闭" :visible.sync="sqjsVisible" :close-on-click-modal="false" width="800px" top="30px" append-to-body>
        <div style="padding:10px;">
          <sqjsForm :gs="sqgbgs" @submitForm="submitForm" @closeForm="closeForm"></sqjsForm>
        </div>
      </el-dialog>

      <!-- 关联开发任务 -->
      <el-dialog title="提报crowd任务" :visible.sync="crowdVisible" :close-on-click-modal="false" width="1000px" top="30px" append-to-body>
        <div style="padding:20px 10px ">
          <div style="padding:10px 0;">
              <el-radio-group v-model="crowdType">
                  <el-radio :label="1">已经在Crowd发布了需求</el-radio>
                  <el-radio :label="2">我要发布需求</el-radio>
              </el-radio-group>
          </div>
          <div v-if="crowdType == 1">
            <p style="font-size:14px;font-weight:700">开发任务编号:</p>
            <el-input size="mini" v-model="Crowdvalue" placeholder="请输入开发任务编号"></el-input>
            <p  style="font-size:14px;margin-top:15px !important;font-weight:700">开发工作量(人/天):</p>
            <el-input size="mini" v-model="kfgzlValue" placeholder="请输入开发工作量 "></el-input>
            <p  style="text-align:right;padding:10px 0">
              <el-button type="primary" size="small" @click="handleCommitCrowd">提交</el-button>
            </p>
          </div>
          <div v-if="crowdType == 2" class="send_crowd">
            <el-form :model="crowdxqData" :rules="rules" ref="crowdxqData"  class="demo-ruleForm">
                    <el-form-item label="" >
                       <div class="send-crowd_topic">发布需求流程</div> 
                    </el-form-item>
                    <el-form-item label="" prop="rwfl">
                       <el-select style="100%" size="mini" v-model="crowdxqData.rwfl" placeholder="请选择需求分类">
                          <el-option
                            v-for="item in CrowdDemandList"
                            :key="item.label"
                            :label="item.mc"
                            :value="item.label">
                          </el-option>
                        </el-select> 
                    </el-form-item>
                <el-form-item>
                  <div class="send-crowd_topic">请完善需求的基本信息</div> 
                </el-form-item>
                <el-form-item prop="rwmc">
                  <el-input size="mini" v-model="crowdxqData.rwmc" placeholder="一个清晰的名字能帮助开发者快速的了解需求"></el-input> 
                </el-form-item>
                <el-form-item>
                  <el-select  size="mini" v-model="crowdxqData.rwlx" placeholder="请选择需求类型">
                    <el-option label="--- 请选择需求类型 ---" value=""></el-option>
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select  size="mini" v-model="crowdxqData.sfjj" placeholder="请选择需求紧急类型">
                    <el-option label="紧急" value="1"></el-option>
                    <el-option label="不紧急" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select  size="mini" v-model="crowdxqData.sfxyzc" placeholder="请选择是否需要驻场">
                    <el-option label="需要驻场" value="1"></el-option>
                    <el-option label="不需要驻场" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 预算金额 -->
              <el-form-item prop="xmysje">
                <el-input size="mini" v-model="crowdxqData.xmysje" placeholder="请输入预算金额(元),不能小于0"></el-input>
              </el-form-item>
              <!-- 机密信息 -->
              <el-form-item >
                  <el-input type="textarea" placeholder="请输入机密信息 , 可填写项目的账号、密码等信息,只对中标用户显示" v-model="crowdxqData.jmxx"></el-input>
              </el-form-item>
              <!-- 需求描述 -->
              <el-form-item prop="xqms">
                  <el-input type="textarea" placeholder="请输入需求描述" v-model="crowdxqData.xqms"></el-input>
              </el-form-item>

               <el-form-item >
                 <uploadFile @handleUploadCrowd="handleUploadCrowd"></uploadFile>
              </el-form-item>

              <el-form-item >
                <div class="send-crowd_topic">请选择需求客户/学校/个人的期望交付日期，该日期仅作数据记录使用</div> 
              </el-form-item>
              <el-form-item >
                <el-date-picker :picker-options="pickerJfrqDateBefore" value-format="yyyy-MM-dd"  size="mini" type="date" placeholder="请输入学校或个人期望交付日期，仅作数据记录使用 " v-model="crowdxqData.qwjfrq" style="width: 100%;"></el-date-picker>
              </el-form-item> 
              <el-form-item >
                <div class="send-crowd_topic" flex spacebetween><span>请选择需求的招标/交付日期</span> <a href="javaScript:;;" @click="handleCheckDateRule">日期规则</a></div> 
              </el-form-item>
              <el-form-item >
                <el-date-picker @change="handleChoosejfDate"  value-format="yyyy-MM-dd" :picker-options="pickerJfrqDateBefore" size="mini" type="date" placeholder="请输入需求招标截至日期，到达该日期后，如果没有投标或者选标，需求则会自动关闭" v-model="crowdxqData.zbjzrq " style="width: 100%;"></el-date-picker>
              </el-form-item> 
              <el-form-item >
                <el-date-picker @change="handleChoosejfDate2"  value-format="yyyy-MM-dd" :picker-options="pickerJfrqDateBefore" size="mini" type="date" placeholder="请输入预期交付日期日期，中标者将严格按照该日期交付需求相关信息" v-model="crowdxqData.jfrq" style="width: 100%;"></el-date-picker>
              </el-form-item> 
              <el-form-item >
                <div class="send-crowd_topic">请选择需求的相关项目信息</div> 
              </el-form-item>
              <el-form-item >
                 <el-select
                      size="mini"
                      v-model="crowdxqData.cpxbh"
                      filterable
                       @change="handleSeleteYwx" 
                      placeholder="请选择业务线信息(可搜索)">
                      <el-option v-for="(item,index) in CrowdYwx" :key="index" :label="item.lbmc" :value="item.lbdm"></el-option>
                    </el-select>
               </el-form-item>
               <el-form-item>
                  <el-select  size="mini"  filterable v-model="crowdxqData.cpbh" placeholder="请选择产品信息(可搜索)">
                    <el-option v-for="(item,index) in CrowdCp" :key="index" :label="item.lbmc" :value="item.lbdm">
                    </el-option>
                  </el-select>
               </el-form-item>
               <!-- <el-form-item>
                  <el-select  size="mini"  v-model="crowdxqData.fbbh" placeholder="请选择分包信息">
                   
                  </el-select>
               </el-form-item> -->

              <el-form-item text-right>
                   <el-button size="mini" type="primary" @click="sendSubmitForm('crowdxqData')">提交</el-button>
              </el-form-item>
            </el-form>      
          </div>
        </div>
      </el-dialog>


      <el-dialog :title="'进度跟踪' +'['+ crowdId +']'" :visible.sync="jdgzVisible" :close-on-click-modal="false" width="800px" top="30px" append-to-body>
        <div style="padding:20px 10px ">
          <div class="CrowdRwxx">
            <span>任务名称 : </span>
            <span :title="JSON.stringify(CrowdRwxx) == '{}'?'':CrowdRwxx.rwmc" class="Crowdrwmc">{{JSON.stringify(CrowdRwxx) == '{}'?'无':CrowdRwxx.rwmc}}</span>
            <span>交付日期 : </span>
            <span>{{JSON.stringify(CrowdRwxx) == '{}'?'无':CrowdRwxx.jfrq}}</span>
          </div>

          <el-table :data="JDGZList" style="width: 100%" border min-width="1200">
            <el-table-column prop="czrxm" label="操作人姓名" show-overflow-tooltip width="100"></el-table-column>
            <el-table-column prop="czsj" label="操作时间" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="shyy" label="审核意见" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ztDisplay" label="状态" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <el-dialog title="编辑回复内容" :visible.sync="editEplyVisible" :close-on-click-modal="false" width="800px" top="30px" append-to-body>
        <div style="padding:20px 10px" class="edit-reply">
          <div v-if="hflx!=7||hflx!=6||hflx!=5||hflx!=9">
            <span>工时 : </span>
            <el-input v-model="replygs" placeholder="请输入工时" size='mini' style="width:200px"></el-input>&nbsp;
          </div><br>
          <div id="summernoteEditReplay"></div>
          <div style="text-align:right">
            <el-button type="primary" size="mini" @click="handleSaveReplyContent">保存</el-button>
          </div>
        </div>
      </el-dialog>
      <el-dialog title="申请待验证" :visible.sync="sqdyzVisible" :close-on-click-modal="false" width="600px" top="30px" append-to-body>
        <div style="padding:20px 10px" class="question-sqdyz">
          <span class="question-sqdyz-title">版本发布日期:</span>
          <el-date-picker v-model="sqdyzValue" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false" size="mini"></el-date-picker>
          <div style="text-align:right">
            <el-button size="mini" type="primary" @click="saveSqdyz">保存</el-button>
          </div>
        </div>
      </el-dialog>
       
       <el-dialog title="日期规则" :visible.sync="dateruleVisible" :close-on-click-modal="false" width="600px" top="30px" append-to-body>
        <div style="padding:20px 10px" class="crowd-rqgz">
           <h4>第一条 名词解释</h4>
           <p>1、招标截止日期：表示需求在该日期之前，允许开发者投标，过期自动关闭需求。</p>
           <p>2、交付日期：要求开发者在这之前（包括本日）提交需求验收。</p>
           <br>
           <h4>第二条 招标截止日期要求</h4>
           <p>1、针对需求类型，预算费用在1200元以内的需求默认预留2个工作日的审核时间，1200元及以上需求的审核时间不超过5个工作日,预算费用在1200元以内的需求默认预留2个工作日的投标周期，1200元及以上需求的审核时间不超过3个工作日的投标周期。</p>
           <p>2、针对BUG类型，BUG类任务审核周期为1个工作日，审核后BUG责任人应在24小时内解决，遇到复杂问题或工作量大无法在24小时内解决时，责任人需要给出计划解决时间。</p>
           <br>
           <h4>第三条 交付日期约定</h4>
           <p>从需求中标日期起，大于需求标准开发人天，小于两倍标准开发人天的日期区间为需求的合理交付日期区间。需求审核人员有权根据开发资源状况在合理交付日期区间内调整交付日期，对于不在合理交付日期区间内的交付时间要求，由需求方与需求审核人进行协商并达成一致，无法达成一致时，需求方可向平台进行申诉。。</p>
           <br>
           <h4>第四条 约定解释权</h4>
           <p>1、该解释权归属平台所有，自发布日期开始，立即生效，无需和发包方确认。</p>
           <p>2、若任务确认紧急，请在发布任务的时候，选择紧急任务，平台审核方会和发包方确认，并收取合理的加急费用。</p>
        </div>
      </el-dialog>
       

      <twDialog :show.sync="show" :questionTitle="questionTitle" :accreditShow="accreditShow" :wid="wid" :slContent="slContent" :questionInfo="qusetionInfo" :guid="gsValue" @handleSLsuccess="handleSLsuccess"></twDialog>
      <!-- 发送运维消息 -->
      <xxDialog :show.sync="ywxxShow" :tableData="userList" @handleSure="handleSure"></xxDialog>
      <!-- 项目团队成员 -->
      <xmtdcylog :show.sync="xmtdcyShow" :xmbh="qusetionInfo.xmbh" @hanldeCommitUser="hanldeCommitUser" ></xmtdcylog>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { GetDateStr } from "@/utils/util";
import pagination from "@/components/BusinessPage/pagination.vue";
import { getResponsibleTaskList } from "@/api/common.js";
import twDialog from "@/components/dialog/tw-dialog.vue";
import xxDialog from "@/components/dialog/sendxx-dialog.vue";
import xmtdcylog from "@/components/dialog/xmtdcy.vue";
import { getLoginUser } from "@/api/system.js";
import uploadFile from "@/components/BusinessPage/upload.vue";

import {
  queryQuestion,
  queryAnswers,
  queryrReferenceHour,
  queryContributionPeople,
  closeQuestion,
  queryBtnAuth,
  forwardLabel,
  saveAnswer,
  saveForward,
  queryProcess,
  changeCommitmentDate,
  customerQuestion,
  addOrUpdateCrowdId, //关联开发任务
  getCrowdId,
  saveYyzfData,
  getCrowdRwzt,
  applyDismiss,
  getCrowdRwxx,
  showCbCondition,
  queryCbRy,
  saveCb,
  queryrHfHour,
  showHjFj,
  setSolution,
  replySet,
  waitVerification,
  queryLabel,
  operationLabel,
  sendOperationMsg,
  canApplyClose,
  canClose
} from "@/api/xmkb.js";
import {
  queryUser,
  isgcXmtdbyWt,
  queryZjCpData,
  queryProjectParticipantMap
} from "@/api/personal.js";
import itemChoose from "@/components/BusinessPage/itemChoose.vue";
import zdfzrChoose from "@/components/BusinessPage/zdfzrChoose.vue";
import sqjsForm from "@/components/BusinessPage/sqjsForm.vue";
import {
  GetQuestionDateStr,
  formatTime,
  getMenu,
  getSession,
  getMyDate,
  compare,
  EventBus
} from "@/utils/util.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!/^([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/.test(value)) {
        callback(new Error("请填写正确金额"));
      } else {
        callback();
      }
    };
    return {
      pickerJfrqDateBefore: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      CrowdDemandList: [], //需求分类
      CrowdYwx: [], //业务线
      CrowdCp: [], //产品
      options: [
        {
          value: "1",
          label: "需求"
        },
        {
          value: "2",
          label: "BUG"
        }
      ],

      rules: {
        rwmc: [{ required: true, message: "请输入基本信息", trigger: "blur" }],
        rwfl: [
          { required: true, message: "请选择需求分类", trigger: "change" }
        ],
        xmysje: [{ validator: validatePass, trigger: "blur" }],
        zbjzrq: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        jfrq: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        qwjfrq: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        xqms: [{ required: true, message: "请填写需求描述", trigger: "blur" }],
      },

      crowdxqData: {
        rwfl: "", //需求分类
        rwmc: "", //需求基本信息
        rwlx: "", //需求类型
        sfjj: "0", //需求紧急
        sfxyzc: "0", //是否需要驻场
        xmysje: "",
        jmxx: "",
        xqms: "", //需求描述
        zbjzrq: "",
        jfrq: "",
        qwjfrq: "",
        cpxbh: "", //业务线信息
        cpbh: "",
        xmbh: "",
        fjid:""
      },
      wtlyList: [], //问题来源
      wtly: "",

      dateruleVisible: false, //日期规则
      userList: [],
      pickerBeginDateBefore: this.handleFocusDate(),
      questionTitle: "提交问题",
      isSltitle: "承诺结束日期",
      isSLvisible: false,
      innerVisible: false,
      innerCNRQVisible: false,
      innerZFWTisible: false,
      dialogQuestionVisible: false,
      zdfzrVisible: false,
      sqjsVisible: false,
      crowdVisible: false,
      jdgzVisible: false,
      editEplyVisible: false,
      sqdyzVisible: false,
      sqdyzValue: "", //申请待验证日期
      fwzlValue: 0,
      cpsm: "", //差评说明
      gssfrk: 1, //工时是否确认
      sfbgValue: "0", //回复是否bug
      gsValue: "0",
      cnjsrq: "",
      xgcnjsrq: "",
      xgqwjjrq: "",
      radio: "",
      zfsmValue: "",
      question: {},
      keyword: "",
      pageSize: 10,
      CurrentPage: 1,
      total: null,
      cpline: [],
      cplist: [],
      wtlb: [],
      qusetionInfo: {},
      questionReply: [],
      wid: "",
      ContributionPeople: [],
      yxGXR: [],
      questionProcess: [],
      btnShwon: {}, //按钮权限
      zfDx: [], //转发对象
      isHF: false,
      zlpf: null,
      active: null,
      xmbh: "",
      xmmc: "",
      zdTitle: "指定解决人",
      tableData: [],
      jkrTotal: null,
      cpKeyword: "",
      accreditShow: false,
      isJZuser: "",
      tktwr: true,
      SLbtnDisabled: false,
      Crowdvalue: "",
      CrowdRwxx: {},
      kfgzlValue: "",
      isgcXmtdbyWt: false,
      JDGZList: [],
      username: "",
      rylb: "",
      wtlbmc: "",//问题类别
      wtlymc:"",//问题来源
      sqgbgs: 0,
      hjgs: 0,
      uploadAction: "https://jsonplaceholder.typicode.com/posts/",
      fileList: [],
      fileData: [],
      filesData: [],
      baseUrl: "",
      hffjshow: false,
      zfcp: "",
      lchjList: [], //流程环节（转发人员）
      show: false,
      ywxxShow: false, // 运维消息弹窗
      xmtdcyShow: false, // 项目团队成员
      slContent: "", // 受理内容
      isEditReplyIndex: null,
      replygs: "",
      hflx: "",
      wtbq: [],
      User: "",
      dm: null,
      sftj: [],
      isCjwt: "",
      qwjjrqZf: "",
      slqwjjrq: "",
      bhsm: "",
      cnjssm: "",
      hfwid: "",
      crowdId: "",

      // 项目团队转发 成员
      forwordUser: "",
      userIds: "",

      crowdType: 1,

    };
  },
  props: {},
  mounted() {
    this.baseUrl = window.baseurl;
    this.wid = this.$route.query.wid;
    this.isCjwt = this.$route.query.f;
    // if (window.location.hash.includes("h=1")) {
    //   sessionStorage.setItem("Detailpannel", window.location.hash);
    // } else {
    //   sessionStorage.removeItem("Detailpannel");
    // }
    getLoginUser().then(res => {
      if (res.status == 200) {
        if (res.data.state == "success") {
          sessionStorage.setItem("username", res.data.data.nickName);
          sessionStorage.setItem("isJZuser", res.data.data.unitType);
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
          this.username = res.data.data.nickName;
          this.isJZuser = res.data.data.unitType;
          this.User = res.data.data.userGroupTag;
        }
      }
    });
    this.queryLabel(this.wid);
    if (
      !getSession("ProblemType") ||
      !getSession("kycp") ||
      !getSession("cpx")
    ) {
      getMenu("ProblemType", this.wtlb, "");
      getMenu("kycp", this.cplist, true);
      getMenu("cpx", this.cpline, true); //获取产品线
    } else {
      this.wtlb = getSession("ProblemType");
      this.cplist = getSession("kycp");
      this.cpline = getSession("cpx");
    }

    if (!getSession("ProblemSource")) {
      getMenu("ProblemSource", this.wtlyList, "");
    } else {
      this.wtlyList = getSession("ProblemSource");
    }

    $("#summernoteT").summernote({
      dialogsInBody: false,
      placeholder: "请输入回复内容",
      height: 200,
      width: 100 + "%",
      minHeight: 200,
      maxHeight: 200,
      lang: "zh-CN",
      focus: true,
      toolbar: [
        ["style", ["bold", "italic", "underline", "clear"]],
        ["font", ["strikethrough", "superscript", "subscript"]],
        ["fontsize", ["fontsize"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["height", ["height"]],
        ["picture"],
        ["link", ["linkDialogShow", "unlink"]]
      ],
      callbacks: {}
    });
    //是否展示环境信息
    showHjFj({ wid: this.wid }).then(({ data }) => {
      if (data.state == "success") {
        this.hffjshow = data.data;
      }
    });
    this.queryProcess(this.wid);
    this.queryBtnAuth(this.wid); //获取按钮权限
    this.queryQuestion(this.wid, 1); // 获取单个问题
    this.queryAnswers(this.wid); //  获取回复
  },

  methods: {
    handleUploadCrowd(data){
      this.crowdxqData.fjid = data;
    },
    // 选择业务线
    handleSeleteYwx(val) {
      this.getCrowdCp(val);
    },
    // 截止日期（1）
    handleChoosejfDate(val) {
      if (val > this.crowdxqData.jfrq) {
        this.$alert("招标截止日期不能大于交付日期，请重新选择", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        this.crowdxqData.zbjzrq = "";
      }
    },
    // 交付日期
    handleChoosejfDate2(val) {
      if (val < this.crowdxqData.zbjzrq) {
        this.$alert("招标截止日期不能大于交付日期，请重新选择", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        this.crowdxqData.jfrq = "";
      }
    },
    // 查看日期规则
    handleCheckDateRule() {
      this.dateruleVisible = true;
    },
    // 提交需求
    sendSubmitForm(formName) {
      if (!this.crowdxqData.jfrq || !this.crowdxqData.zbjzrq) {
        this.$alert("请填写招标日期/交付日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.crowdxqData.xmbh = this.qusetionInfo.xmbh; // 项目编号
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post(this.API.crowdFbrw, this.crowdxqData).then(res => {
            if (res.state == "success") {
                this.addOrUpdateCrowdId('',res.data,'');
                this.crowdVisible = false;
                this.crowdxqData.fjid = '';
            }else{
              this.$alert(res.msg, "提示", {
                  confirmButtonText: "确定",
                  type: "warning"
              })
            }
          });
        } else {
          return false;
        }
      });
    },


    // 选择团队成员
    hanldeCommitUser(userids, usernames) {
      this.userIds = userids.join(",");
      this.forwordUser = usernames.join(",");
      this.xmtdcyShow = false;
    },

    // 选择团队成员 转发
    handleChooseXmtdcy() {
      this.xmtdcyShow = true;
    },
    // 日期格式化
    handleFocusDate() {
      let self = this;
      return {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let delayHs = JSON.parse(self.qusetionInfo.cphs) * 24 * 3600 * 1000;
          let delayDate = curDate + delayHs;
          return (
            time.getTime() < Date.now() - 8.64e7 || time.getTime() > delayDate
          );
        }
      };
    },

    //删除标签
    handleCloseTag(index) {
      if (
        this.User.indexOf("ProblemAdmin") == -1 &&
        this.User.indexOf("ZJZBZ") == -1 &&
        this.User.indexOf("ZJ") == -1
      ) {
        this.$alert("抱歉，您无权操作问题标签", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      operationLabel({
        wid: this.wid,
        dm: this.wtbq[index].dm,
        isDel: true
      }).then(({ data }) => {
        if (data.state == "success") {
          if (this.wtbq[index].sjly == 0) {
            this.wtbq[index].sjly = 1;
            this.wtbq[index].type = "";
          } else {
            this.wtbq[index].sjly = 0;
            this.wtbq[index].type = "info";
          }
          this.sftj.forEach((ele, i, arr)=>{
            if(ele == this.wtbq[index].dm){
              this.sftj.splice(i,1);
            }
          })
          this.queryAnswers(this.wid); //  获取回复
        }
      });
    },
      //添加标签
    handleClick(i) {
      if (
        this.User.indexOf("ProblemAdmin") == -1 &&
        this.User.indexOf("ZJZBZ") == -1 &&
        this.User.indexOf("ZJ") == -1
      ) {
        this.$alert("抱歉，您无权操作问题标签", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.sftj.length >= 2 && this.User.indexOf("ProblemAdmin") == -1) {
        this.$alert("一个问题只能添加两个标签", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.wtbq[i].sjly == 0) {
        operationLabel({
          wid: this.wid,
          dm: this.wtbq[i].dm,
          isDel: false
        }).then(({ data }) => {
          if (data.state == "success") {
            this.wtbq[i].sjly = 2;
            this.wtbq[i].type = "";
            this.sftj.push(this.wtbq[i].dm);
            this.queryAnswers(this.wid); //  获取回复
          }
        });
      }
    },
    handleSqdyz() {
      //申请待验证
      this.sqdyzVisible = !this.sqdyzVisible;
    },
    // 发送消息
    sendMsg() {
      this.ywxxShow = true;
      queryProjectParticipantMap({
        xmbh: this.qusetionInfo.xmbh
      }).then(({ data }) => {
        if (data.state == "success") {
          this.userList = data.data.qt;
          if (!!data.data.yf) {
            this.userList.unshift(data.data.yf);
          }
          if (!!data.data.jf) {
            this.userList.unshift(data.data.jf);
          }
          this.userList.forEach(ele => {
            if (ele.unitType == 0) {
              ele.unitName = "金智";
            } else if (ele.unitType == 1) {
              ele.unitName = "学校成员";
            } else {
              ele.unitName = "合作伙伴";
            }
          });
        }
      });
    },
    // 发送消息(提交)
    handleSure(param) {
      sendOperationMsg({
        wid: this.wid,
        userIds: param.userids.join(","),
        msg: param.content
      }).then(({ data }) => {
        if (data.state == "success") {
          this.queryAnswers(this.wid); //  获取回复
          this.ywxxShow = false;
          this.$alert("发送成功！", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    saveSqdyz() {
      // 保存申请待验证
      if (!this.sqdyzValue) {
        this.$alert("请选择版本发布日期", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          callback: action => {}
        });
        return;
      }
      waitVerification({
        wid: this.wid,
        yzrq: this.sqdyzValue
      }).then(({ data }) => {
        if (data.state == "success") {
          this.sqdyzVisible = false;
          this.$alert("保存成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.queryAnswers(this.wid); //  获取回复
              this.queryBtnAuth(this.wid); //获取按钮权限
            }
          });
        }
      });
    },
    handleReplyEdit(e, i) {
      //编辑回复
      this.editEplyVisible = true;
      this.isEditReplyIndex = i;
      this.replygs = "";
      this.$nextTick(() => {
        $("#summernoteEditReplay").summernote({
          dialogsInBody: true,
          placeholder: "",
          height: 200,
          width: 100 + "%",
          minHeight: 150,
          maxHeight: 400,
          lang: "zh-CN",
          focus: true,
          toolbar: [
            ["style", ["bold", "italic", "underline", "clear"]],
            ["font", ["strikethrough", "superscript", "subscript"]],
            ["fontsize", ["fontsize"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["height", ["height"]],
            ["picture"],
            ["link", ["linkDialogShow", "unlink"]]
          ]
        });
        $("#summernoteEditReplay").summernote("code", this.questionReply[i].nr);
      });
      this.replygs = this.questionReply[i].gs;
      this.hflx = this.questionReply[i].hflx;
    },
    handleSaveReplyContent() {
      if (!/^\d+(\.\d+)?$/.test(this.replygs)) {
        this.$alert("请输入正确工时", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.replySet(
        this.questionReply[this.isEditReplyIndex].wid,
        $("#summernoteEditReplay").summernote("code"),
        false,
        this.replygs
      );
    },
      //删除回复
    handleReplyDelete(e, param) {
      this.$confirm("是否删除该条回复?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.replySet(param.wid, "", true);
        })
        .catch(() => {});
    },

    replySet(wid, nr, isDel, gs) {
      replySet({
        hfwid: wid,
        nr: nr,
        isDel: isDel,
        gs: gs || ""
      }).then(({ data }) => {
        if (data.state == "success") {
          if (!isDel) {
            this.questionReply[this.isEditReplyIndex].nr = $(
              "#summernoteEditReplay"
            ).summernote("code");
            this.questionReply[this.isEditReplyIndex].gs = this.replygs;
            this.editEplyVisible = false;
            this.$alert("修改成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {}
            });
          } else {
            this.$alert("删除成功", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.queryAnswers(this.wid);
              }
            });
          }
        } else {
          this.$alert(data.msg, "提示", {
            confirmButtonText: "确定",
            type: "error",
            callback: action => {}
          });
        }
      });
    },
    handleSLsuccess() {
      // 受理成功
      this.queryAnswers(this.wid);
      this.queryBtnAuth(this.wid);
      this.queryProcess(this.wid);
      this.queryQuestion(this.wid);
      $("#summernoteT").summernote("code", "");
    },
    handleRemove(file, fileList) {
      // 删除文件
      this.fileData = [];
      this.fileList = [];
    },

    beforeUpload(file) {
      let fd = new FormData();
      fd.append("fileUpload", file);
      fd.append("xmbh", this.xmbh);

      axios
        .post(window.baseurl + "attachment/uploadAttach.do", fd, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          if (res.data.state == "success") {
            this.fileData.push(res.data.data); //文件 list Arr
          } else {
            this.$alert(res.data.msg, "提示", {
              confirmButtonText: "确定"
            });
          }
        });
      return true;
    },

    handleChange(file, fileList) {
      let r = [];
      this.filesData.push(file);
      for (var i = 0, l = this.filesData.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
          if (this.filesData[i].name === this.filesData[j].name) j = ++i;
        r.push(this.filesData[i]);
      }
      this.fileList = r;
      this.$refs.upload.submit();
    },

    handleSetResolve(e, param, data) {
      //设置问题解决集
      setSolution({
        zbwid: this.wid,
        wid: param.wid,
        isCancel: !!data ? 1 : ""
      }).then(({ data }) => {
        if (data.state == "success") {
          if (this.isCjwt) {
            this.$alert("取消成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {
                this.queryAnswers(this.wid); //  获取回复
              }
            });
          } else {
            this.$alert("设置成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
          if (!data) {
            param.wtjjj = 0;
          }
        }
      });
    },
    handleRejectQuestion(wid, param) {
      this.$prompt("请输入驳回说明", "提示", {
        // 驳回
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea",
        inputPattern: /^\S/,
        inputErrorMessage: "请输入驳回说明（必填）"
      })
        .then(({ value }) => {
          this.bhsm = value;
          applyDismiss({
            wid: wid,
            zbwid: this.wid,
            sm: this.bhsm
          }).then(({ data }) => {
            if (data.state == "success") {
              this.$alert("已驳回", "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.questionReply[param].sfbh = 1;
                  this.questionReply[param].nr =
                    this.questionReply[param].nr + "<br>说明 : " + this.bhsm;
                }
              });
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    handleEdit(data) {
      (this.xmbh = data.xmbh), (this.xmmc = data.xmmc);
      this.dialogQuestionVisible = false;
    },
    addQuestiontItem() {
      //选择项目
      this.dialogQuestionVisible = true;
    },
    changeCNDate() {
      //修改承诺时间
      this.xgcnjsrq = this.qusetionInfo.cnjsrq;
      this.isSltitle = "修改承诺时间";
      this.innerCNRQVisible = !this.innerCNRQVisible;
    },
    //编辑开发任务
    handleEditkfrw(e, data) {
      this.hfwid = data.wid;
      this.Crowdvalue = data.crowdid;
      this.kfgzlValue = data.kfgzl;
      this.crowdVisible = !this.crowdVisible;
    },
    // 添加开发任务
    changeCrowdId() {
      if (!getSession("CrowdDemandType")) {
        getMenu("CrowdDemandType", this.CrowdDemandList); //获取需求分类
      } else {
        this.CrowdDemandList = getSession("CrowdDemandType");
      }
      this.hfwid = "";
      this.crowdVisible = !this.crowdVisible;
      // this.getCrowdId(false);
    },
    // 查看开发任务进度
    handleJDGZ(data) {
      this.crowdId = data;
      this.getCrowdId(data);
    },
    // 运营人员转发
    handleYYRYZF() {
      this.zdTitle = "运营人员转发";
      this.zdfzrVisible = true;
      this.queryCpData(1, "");
    },
    // 运营人员转发  筛选
    handleYYRYLX(data) {
      this.rylb = data;
      this.queryCpData(1);
    },
    //更改crowd
    handleCommitCrowd() {
      if (!/^\d+(\.\d+)?$/.test(this.kfgzlValue)) {
        this.$alert("请输入正确开发工作量", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      this.addOrUpdateCrowdId(this.hfwid,this.Crowdvalue,this.kfgzlValue);
    },
    
    addOrUpdateCrowdId(hfwid,crowdId,kfgzlValue){
      addOrUpdateCrowdId({
        wid: this.wid,
        hfwid:hfwid, 
        crowdId:crowdId ,
        kfgzl:kfgzlValue 
      }).then(({ data }) => {
        if (data.state == "success") {
          this.crowdVisible = false;
          this.$alert(!this.hfwid ? "新增成功" : "编辑成功", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.queryBtnAuth(this.wid);
              this.queryAnswers(this.wid);
              this.queryQuestion(this.wid);
            }
          });
        }
      });
    },



    //受理
    accreditQuestion() {
      if (this.isgcXmtdbyWt) {
        this.questionTitle = "受理";
        this.accreditShow = true;
        this.SLbtnDisabled = false;
        this.slContent = $("#summernoteT").summernote("code");
        this.qusetionInfo.qwjjrqO = this.xgqwjjrq;
        this.show = true;
      } else {
        this.fileList = [];
        this.fileData = [];
        this.filesData = [];
        this.isSltitle = "受理";
        this.isSLvisible = true;
        this.question.xgcnjsrq =
          this.qusetionInfo.cnjsrq == ""
            ? this.qusetionInfo.qwjjrq
            : this.qusetionInfo.cnjsrq;
        this.innerCNRQVisible = !this.innerCNRQVisible;
      }
    },

    CommitChangeCNjsrq() {
      //修改承诺时间（提交）
      if (!this.xgcnjsrq) {
        this.$alert("请输入承诺日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.isSltitle == "修改承诺时间") {
        this.isSLvisible = false;
        if (!this.cnjssm) {
          this.$alert("请输入说明内容", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return;
        }
        //修改承诺结束时间
        changeCommitmentDate({
          wid: this.wid,
          cnjsrq: this.xgcnjsrq,
          sm: this.cnjssm
        }).then(({ data }) => {
          if (data.state == "success") {
            this.innerCNRQVisible = false;
            this.queryAnswers(this.wid);
            this.queryQuestion(this.wid);
            this.$alert("修改成功", "提示", {
              confirmButtonText: "确定",
              type: "success"
            });
          } else {
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      } else if (this.isSltitle == "受理") {
        if(!this.wtly){
          this.$alert("请选择问题来源", "提示", {confirmButtonText: "确定",type: "warning"})
          return;
        }
        this.$confirm(
          "期望解决日期:" +
            this.xgqwjjrq +
            "你的承诺解决日期:" +
            this.xgcnjsrq +
            ",确认受理吗？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            customerQuestion({
              wid: this.wid,
              nr:
                $("#summernoteT").summernote("code") == "<p><br></p>"
                  ? ""
                  : $("#summernoteT").summernote("code"),
              cnjsrq: this.xgcnjsrq,
              qwjjrq: this.xgqwjjrq,
              wtly:this.wtly, //问题来源
              hjfjwid: "",
              Guid: this.gsValue
            }).then(({ data }) => {
              if (data.state == "success") {
                $("#summernoteT").summernote("code", "");
                this.innerCNRQVisible = false;
                this.$alert("受理成功！", "提示", {
                  confirmButtonText: "确定",
                  type: "success",
                  callback: action => {
                    this.queryAnswers(this.wid);
                    this.queryBtnAuth(this.wid);
                    this.queryProcess(this.wid);
                    this.queryQuestion(this.wid);
                  }
                });
              } else {
                this.$alert(data.msg, "提示", {
                  confirmButtonText: "确定",
                  type: "error"
                });
              }
            });
          })
          .catch(() => {});
      }
    },
    CancelChangeCNjsrq() {
      this.innerCNRQVisible = false;
    },

    getCrowdId(rwbh) {
      getCrowdRwzt({
        rwbh: rwbh //this.qusetionInfo.crowdid
      }).then(({ data }) => {
        if (data.state == "success") {
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
        if (data.state == "success") {
          if (data.data != null) {
            this.CrowdRwxx = data.data;
          } else {
            this.CrowdRwxx = {};
          }
          this.jdgzVisible = true;
        }
      });
    },

    /************************************************* */
    //   指定解决人
    appointPrincipal() {
      this.zdfzrVisible = true;
      this.zdTitle = "指定解决人";
      this.queryUser(1);
    },
    //  申请结算
    requisitionSettlement() {
      canApplyClose({
        wid: this.wid
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data) {
            queryrHfHour({
              wid: this.wid
            }).then(({ data }) => {
              if (data.state == "success") {
                this.sqgbgs = data.data;
              }
            });
            this.sqjsVisible = true;
          } else {
            this.$alert("不可重复申请关闭，可驳回已有的再重新申请!", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
          }
        }
      });
    },
    //申请结算
    submitForm(data) {
      saveAnswer({
        zbwid: this.wid,
        nr: data.gbsm == "" ? "申请关闭" : data.gbsm,
        nycd: data.nycd,
        gs: data.gs,
        sfbg: data.sfbg == true ? "1" : "0",
        jjyf: data.sfjj,
        hflx: 3
      }).then(({ data }) => {
        this.sqjsVisible = false;
        if (data.state == "success") {
          this.$alert("提交成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.queryAnswers(this.wid);
            }
          });
        } else {
          this.$alert("提交成功！", "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        }
      });
    },
    closeForm() {
      this.sqjsVisible = false;
    },
    // 分页
    handleZrrChange(data) {
      if (this.zdTitle == "指定解决人") {
        this.queryUser(data);
      } else if (this.zdTitle == "运营人员转发") {
        this.queryCpData(data);
      }
    },
    // 查询责任人
    queryComplainZRR(data) {
      this.cpKeyword = data;
      if (this.zdTitle == "指定解决人") {
        this.queryUser(1);
      } else if (this.zdTitle == "运营人员转发") {
        this.queryCpData(1);
      } else if (this.zdTitle == "选择催办人") {
        this.queryCbRy();
      }
    },
    queryComplainUser(data) {
      this.cpKeyword = data;
      if (this.zdTitle == "指定解决人") {
        this.queryUser(1);
      } else if (this.zdTitle == "运营人员转发") {
        this.queryCpData(1);
      } else if (this.zdTitle == "选择催办人") {
        this.queryCbRy();
      }
    },
    // 选择人员
    handleCommitZdr(data) {
      if (this.zdTitle == "指定解决人") {
        saveAnswer({
          //指定责任人
          zbwid: this.wid,
          nr: data.nr,
          sfjsr: data.nickName,
          jsrbh: data.userName,
          qwjjrq: data.qwjjrq,
          hflx: 6
        }).then(({ data }) => {
          this.zdfzrVisible = false;
          if (data.state == "success") {
            let keysArr = Object.keys(data.data);
            if (keysArr[0] == "true") {
              this.zdfzrVisible = false;
              this.queryAnswers(this.wid);
              this.queryProcess(this.wid);
              this.queryQuestion(this.wid);
            }
            this.$alert(
              keysArr[0] == "true" ? data.data.true : data.data.false,
              "提示",
              {
                confirmButtonText: "确定",
                type: keysArr[0] == "true" ? "success" : "error"
              }
            );
          } else {
            this.$alert("提交失败", "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      } else if (this.zdTitle == "运营人员转发") {
        saveYyzfData({
          wid: this.wid,
          nr: data.nr,
          ryData: data.yyryData.join("|"),
          bh: data.lchj, //流程环节
          qwjjrq: data.qwjjrq
        }).then(({ data }) => {
          if (data.state == "success") {
            let keysArr = Object.keys(data.data);
            if (keysArr[0] == "true") {
              this.zdfzrVisible = false;
              this.queryAnswers(this.wid);
              this.queryProcess(this.wid);
              this.queryQuestion(this.wid);
            }
            this.$alert(
              keysArr[0] == "true" ? data.data.true : data.data.false,
              "提示",
              {
                confirmButtonText: "确定",
                type: keysArr[0] == "true" ? "success" : "error"
              }
            );
          } else {
            this.$alert("提交失败", "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      } else if (this.zdTitle == "选择催办人") {
        this.saveCb(data.yyryData.join("|"));
      }
    },
    handleClose() {
      this.ClosezdfzrVisible();
      this.zdfzrVisible = false;
    },
    ClosezdfzrVisible() {
      this.cpKeyword = "";
    },

    queryUser(curPage) {
      // 查询用户
      queryUser({
        curPage: curPage,
        pageSize: 10,
        Isexternal: false,
        keyword: this.cpKeyword
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data.rows;
          this.jkrTotal = data.data.records;
        }
      });
    },

    queryCpData(curPage) {
      // 查询产品人员
      queryZjCpData({
        curPage: curPage,
        pageSize: 10,
        rylb: this.rylb,
        keyword: this.cpKeyword
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data.rows;
          this.jkrTotal = data.data.records;
        }
      });
    },
    queryCbRy() {
      //查询催办人员
      queryCbRy({
        wid: this.wid,
        keyword: this.cpKeyword
      }).then(({ data }) => {
        if (data.state == "success") {
          this.tableData = data.data;
          this.tableData.forEach((ele, i, arr) => {
            if (ele.username.slice(0, 1) == 1) {
              ele.userbh = `${ele.username.slice(0, 3)}****${ele.username.slice(
                -4
              )}`;
            } else {
              ele.userbh = ele.username;
            }
          });
        }
      });
    },
    saveCb(ryData) {
      //保存催办
      saveCb({
        wid: this.wid,
        nr:
          $("#summernoteT").summernote("code") == "<p><br></p>"
            ? ""
            : $("#summernoteT").summernote("code"),
        ryData: ryData
      }).then(({ data }) => {
        if (data.state == "success") {
          $("#summernoteT").summernote("code", "");
          this.$alert("催办成功！", "提示", {
            confirmButtonText: "确定",
            type: "success",
            callback: action => {
              this.queryAnswers(this.wid);
            }
          });
          if (ryData) {
            this.zdfzrVisible = false;
          }
        }
      });
    },
    //转发问题
    forwardingProblem() {
      this.innerZFWTisible = true;
      forwardLabel({
        wid: this.wid
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data.length != 0 && data.data != null) {
            this.zfDx = data.data;
            this.radio = data.data[0].bh;
          }
        }
      });
      this.$nextTick(() => {
        $("#summernoteZF").summernote({
          dialogsInBody: true,
          placeholder: "请输入转发内容",
          height: 200,
          width: 100 + "%",
          minHeight: 150,
          maxHeight: 400,
          lang: "zh-CN",
          focus: true,
          toolbar: [
            ["style", ["bold", "italic", "underline", "clear"]],
            ["font", ["strikethrough", "superscript", "subscript"]],
            ["fontsize", ["fontsize"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["height", ["height"]],
            ["picture"],
            ["link", ["linkDialogShow", "unlink"]]
          ]
        });
      });
    },
    //转发问题(提交)
    CommitZFWT() {
      if (this.radio == 11 && this.zfcp == "") {
        this.$alert("请选择产品", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (this.radio == 66 && this.userIds == "") {
        this.$alert("请选择转发成员", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if (!this.qwjjrqZf) {
        this.$alert("请选择期望解决日期", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }
      if ($("#summernoteZF").summernote("code") == "<p><br></p>") {
        this.$alert("请填写转发说明", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
        return;
      }

      saveForward({
        wid: this.wid,
        bh: this.radio,
        nr:
          $("#summernoteZF").summernote("code") == "<p><br></p>"
            ? ""
            : $("#summernoteZF").summernote("code"),
        cpbh: this.radio == 11 ? this.zfcp : "",
        qwjjrq: this.qwjjrqZf,
        userIds: this.radio == 66 ? this.userIds : ""
      }).then(({ data }) => {
        if (data.state == "success") {
          let keysArr = Object.keys(data.data);
          if (keysArr[0] == "true") {
            this.innerZFWTisible = false;
            this.queryAnswers(this.wid);
            this.queryBtnAuth(this.wid);
            this.queryProcess(this.wid);
            this.queryQuestion(this.wid);
          }
          this.$alert(
            keysArr[0] == "true" ? data.data.true : data.data.false,
            "提示",
            {
              confirmButtonText: "确定",
              type: keysArr[0] == "true" ? "success" : "error"
            }
          );
        }
      });
    },
    CancelZFWT() {
      // 取消转发
      this.innerZFWTisible = false;
    },

    //催办
    remindsQuestion() {
      this.zdTitle = "选择催办人";
      //是否显示催办人
      showCbCondition({
        wid: this.wid
      }).then(({ data }) => {
        if (data.state == "success") {
          if (data.data == 1) {
            this.queryCbRy();
            this.zdfzrVisible = true;
          } else if (data.data == 0) {
            this.saveCb("");
          }
        }
      });
    },

    //回复
    replyQuestion(param) {
      let reg = /^\d+(\.\d+)?$/;
      let hfnr = $("#summernoteT").summernote("code");
      if (!reg.test(this.gsValue) || this.gsValue > 8) {
        this.$alert(
          "请输入正确工时且单次工时不能超过8小时,大于8小时请分多个回复!",
          "提示",
          {
            confirmButtonText: "确定",
            type: "warning"
          }
        );
        return;
      }

      if (hfnr == "<p><br></p>" || hfnr == "") {
        this.$alert("请输入回复内容", "提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      } else {
        this.isHF = true;
        saveAnswer({
          //回复问题
          zbwid: this.wid,
          nr: hfnr,
          gs: this.gsValue,
          sfbg: this.sfbgValue,
          cnjsrq: this.cnjsrq || "",
          hflx: param == "hf" ? 1 : 99,
          tktwr: this.tktwr
        }).then(({ data }) => {
          if (data.state == "success") {
            this.isHF = false;
            this.gsValue = 0;
            this.$alert("回复成功！", "提示", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.queryAnswers(this.wid);
                this.queryProcess(this.wid);
                $("#summernoteT").summernote("code", "");
              }
            });
          } else {
            this.isHF = false;
            this.$alert(data.msg, "提示", {
              confirmButtonText: "确定",
              type: "error"
            });
          }
        });
      }
    },
    //关闭
    closeQuestion() {
      // 关闭问题提示（12.03）；
      canClose({
        wid: this.wid
      }).then(({ data }) => {
        if (data.state == "success") {
          if (!data.data) {
            this.$alert("该问题未处理完成，不能关闭！", "提示", {
              confirmButtonText: "确定",
              type: "warning"
            });
          } else {
            if (this.qusetionInfo.zlpf != "") {
              this.fwzlValue = JSON.parse(this.qusetionInfo.zlpf);
            }
            queryrReferenceHour({
              wid: this.wid
            }).then(({ data }) => {
              if (data.state == "success") {
                this.ContributionPeople = data.data;
                this.ContributionPeople.forEach((ele, i, arr) => {
                  ele.qrgs = ele.confirmH.replace("/^.(d+)/", "0.");
                });
              }
            });
            this.innerVisible = true;
          }
        }
      });
    },
    commitQuestion() {
      //关闭问题（提交）
      let gxrArr = [];
      if (this.ContributionPeople.length != 0) {
        this.ContributionPeople.forEach((ele, i, arr) => {
          gxrArr.push(ele.fbrxm + "," + ele.fbrbh + "," + ele.qrgs);
        });
      }
      this.$confirm("确定要关闭此问题吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.fwzlValue == 0) {
            this.$alert("请选择服务质量星级", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
            return;
          }
          if (this.fwzlValue <= 3 && !this.cpsm) {
            this.$alert("请填写评价说明", "提示", {
              confirmButtonText: "确定",
              type: "warning",
              callback: action => {}
            });
            return;
          }
          closeQuestion({
            wid: this.wid,
            zlpf: this.fwzlValue,
            gxrData: gxrArr.join("|"),
            sfjj: "",
            jjsm:
              $("#summernoteT").summernote("code") == "<p><br></p>"
                ? ""
                : $("#summernoteT").summernote("code"),
            cpsm: this.fwzlValue <= 3 ? this.cpsm : "",
            gssfrk: this.gssfrk
          }).then(({ data }) => {
            if (data.state == "success") {
              this.innerVisible = false;
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "success",
                callback: action => {
                  this.queryQuestion(this.wid);
                  this.queryAnswers(this.wid);
                  this.queryBtnAuth(this.wid);
                  this.queryProcess(this.wid);
                }
              });
            } else {
              this.$alert(data.msg, "提示", {
                confirmButtonText: "确定",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    queryProcess(wid) {
      queryProcess({
        //获取进度
        wid: wid,
        isTs: ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.questionProcess = data.data;
          this.questionProcess.forEach((ele, i, arr) => {
            if (ele.flag == 1) {
              this.questionProcess[i].status = "process";
            } else if (ele.flag == 2) {
              this.questionProcess[i].status = "success";
            }
          });
          this.lchjList = this.questionProcess.slice(
            0,
            this.questionProcess.length - 2
          );
        }
      });
    },

    queryQuestion(wid, xmtd) {
      //   查询单个问题
      this.qusetionInfo = {};
      this.wtlbmc = "";
      this.wtlymc = "";
      this.hjgs = 0;
      queryQuestion({
        wid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.qusetionInfo = data.data;
          this.wtly = data.data.wtly;
          this.cnjsrq = data.data.qwjjrq;
          document.title = "问题详情-" + data.data.bt;
          if (this.qusetionInfo.fbzt == 1) {
            $("#summernoteT").summernote("destroy");
          }
          if (xmtd == 1) {
            isgcXmtdbyWt({
              wid: this.qusetionInfo.wid
            }).then(({ data }) => {
              if (data.state == "success") {
                this.isgcXmtdbyWt = data.data;
              }
            });
          }
          if (this.qusetionInfo.wtlb != "") {
            getResponsibleTaskList({
              name: "ProblemType",
              code: this.qusetionInfo.wtlb
            }).then(({ data }) => {
              if (data.state == "success") {
                this.wtlbmc = data.data;
              }
            });
          }
          if (this.qusetionInfo.wtly != "") {
            getResponsibleTaskList({
              name: "ProblemType",
              code: this.qusetionInfo.wtly
            }).then(({ data }) => {
              if (data.state == "success") {
                this.wtlymc = data.data;
              }
            });
          }

          //    关闭问题获取贡献人
          if (data.data.fbzt == 1) {
            this.zlpf = JSON.parse(data.data.zlpf);
            queryContributionPeople({
              //查询贡献人员
              wid: this.wid
            }).then(({ data }) => {
              if (data.state == "success") {
                if (data.data != null && data.data.length != 0) {
                  this.yxGXR = data.data;
                  this.yxGXR.forEach((ele, i, arr) => {
                    if (ele.gs.split(".")[0] == "") {
                      ele.gs = 0 + ele.gs;
                    }
                    this.hjgs += parseFloat(ele.gs);
                  });
                } else {
                  this.yxGXR = [];
                }
              }
            });
          }
          try {
            this.qusetionInfo.nr = decodeURIComponent(
              this.qusetionInfo.nr
            ).replace(
              /gcgl\/sys\/emapcomponent\/file\/getFileByToken/g,
              "emap/sys/emapcomponent/file/getFileByToken"
            );
          } catch (err) {
            this.qusetionInfo.nr = this.qusetionInfo.nr;
          }
        }
      });
    },
    // 获取问题回复
    queryAnswers(wid) {
      this.questionReply = [];
      queryAnswers({
        wid: wid,
        isSolution: this.isCjwt ? true : ""
      }).then(({ data }) => {
        if (data.state == "success") {
          this.questionReply = data.data;
          if (data.data != null && data.data.length != 0) {
            this.questionReply.forEach((ele, i, arr) => {
              try {
                ele.nr = decodeURIComponent(ele.nr).replace(
                  "/gcgl/sys/emapcomponent/file/getFileByToken/",
                  "/emap/sys/emapcomponent/file/getFileByToken/"
                );
              } catch (err) {
                ele.nr = ele.nr;
              }
            });
          }
        }
      });
    },
    //  按钮显示隐藏
    queryBtnAuth(wid) {
      queryBtnAuth({
        wid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.btnShwon = data.data;
          this.xgqwjjrq = data.data.qwjjrq;
        }
      });
    },
      //获取问题标签
    queryLabel(wid) {
      this.sftj = [];
      queryLabel({
        wid: wid
      }).then(({ data }) => {
        if (data.state == "success") {
          this.wtbq = data.data;
          this.wtbq.forEach((ele, i, arr) => {
            if (ele.sjly == 0) {
              ele.type = "info";
            } else {
              ele.type = "";
            }
            if (ele.sjly == 2){
              this.sftj.push(ele.dm);
            }
          });
        }
      });
    },

    getCrowdYwx() {
      this.$get(this.API.getCrowdYwx, {}).then(res => {
        if (res.state == "success") {
          this.CrowdYwx = res.data;
        }
      });
    },
    getCrowdCp(ywxbm) {
      this.$get(this.API.getCrowdCp, { ywxbm: ywxbm }).then(res => {
        if (res.state == "success") {
          this.CrowdCp = res.data;
        }
      });
    }
  },
  watch: {
    crowdVisible(n, o) {
      if (!!n) {
        this.crowdxqData.zbjzrq = GetDateStr(7);
      }
    },
    crowdType(n, o) {
      if (n == 2) {
        this.getCrowdYwx();
      }
    }
  },
  activated() {},
  components: {
    pagination,
    itemChoose,
    zdfzrChoose,
    sqjsForm,
    twDialog,
    xxDialog,
    xmtdcylog,
    uploadFile
  }
};
</script>
<style scoped>
.project-question {
  width: 95%;
  margin: 0 auto;
  padding: 10px;
}

.question-type {
  text-align: center;
  width: 100px;
}
.questionOperate {
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
}
.questionOperate > span:hover {
  text-decoration: underline #888;
}

.question-type span.el-icon-question {
  font-size: 32px;
  color: #f56c6c;
}
.question-type span.el-icon-success {
  font-size: 30px;
  color: #67c23a;
}

.Question {
  padding: 10px 0;
}
div.el-form-item {
  margin-bottom: 8px !important;
}
.send_crowd div.el-form-item {
  margin-bottom: 25px !important;
}
/*   detail*/
.project-question-detail {
  padding: 5px 10px;
  background: #fff;
}
.project-question-detail li {
  border-bottom: 1px solid #f1f1f1;
}
.project-question-detail-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}
.project-question-detail .question-reply {
  display: inline-block;
  width: 38px;
  height: 26px;
  border-radius: 3px;
  text-align: center;
  line-height: 24px;
  background: #3ba7f5;
  color: #fff;
  font-size: 14px;
}
.project-question-detail-top .question-content {
  width: 90%;
}
.project-question-detail-top .question-content-SC {
  width: 92%;
  color: #888;
}
.question-content-SC .el-button,
.question-content-SC .el-tag {
  height: 28px;
}
.question-content-SC .el-tag {
  line-height: 28px;
}
.question-content .question-info-front {
  color: #a8a8a8;
  font-size: 12px;
}
.question-content > p {
  margin: 0 0 3px 0 !important;
  width: 100%;
  white-space: nowrap;
  font-size: 14px;
}
.question-content > p > span {
  display: inline-block;
  min-width: 25%;
  white-space: nowrap;
  font-size: 14px;
  color: #363748;
}
.question-content > p > span:nth-of-type(2) {
  width: 40%;
}

.project-question-detail-bottom > div {
  width: 100%;
  overflow: auto;
  padding: 10px 5px 10px 80px;
}
.isshown-query:hover {
  cursor: pointer;
}

.bg-active {
  background: #1997d7;
  color: #fff !important;
}
.question-state {
  text-align: center;
  width: 13%;
}
.question-state > span:nth-of-type(1) {
  padding: 3px 8px;
  border-radius: 2px;
  font-size: 14px;
  display: inline-block;
}
.ygb-color {
  color: #7ece64 !important;
  background: rgba(126, 206, 100, 0.2);
}
.clz-color {
  color: #f56c6c;
  background: rgba(245, 108, 108, 0.2);
}

.question-evaluate {
  padding: 10px;
}
.question-evaluate > p {
  margin-top: 10px !important;
  color: #888;
  font-size: 12px;
}
.question-rate {
  margin: 10px 0;
}
.question-rate label {
  margin-bottom: 0;
}
.question-rate:after {
  content: "";
  display: block;
  clear: both;
}
.question-rate > p {
  display: flex;
  align-items: center;
  float: left;
}
.question-steps {
  padding: 5px 10px;
  background: #f4f6f9;
}
.question-textarea {
  width: 700px;
  margin: 0 auto;
}
.question-textarea > p {
  width: 125px;
  text-align: right;
  padding-right: 12px;
  font-weight: 700;
}
.question-textarea > p::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.CrowdRwxx {
  margin-bottom: 10px;
}
.CrowdRwxx span:nth-of-type(1),
.CrowdRwxx span:nth-of-type(3) {
  font-weight: 700;
}
.Crowdrwmc {
  display: inline-block;
  width: 350px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: bottom;
}
/*申请待验证 */
.question-sqdyz-title:before {
  content: "*";
  color: #f00;
  padding: 0 2px;
}
.item-wtbq {
  float: left;
  padding: 2px 0;
}
.item-wtbq-tag {
  display: inline-block;
  width: 95%;
  white-space: pre-wrap;
}
.filter-bt {
  display: inline-block;
  width: 100px;
  vertical-align: top;
  text-align: right;
  font-weight: 700;
}
.question_transmit .span_label {
  display: inline-block;
  width: 110px;
}

.isRedColor {
  color: #f00;
  font-weight: 700;
}

.send_crowd img {
  width: 100%;
}
.send-crowd_topic {
  border: 1px solid #e4eaec;
  background: #f3f7f9;
  border-radius: 3px;
  height: 40px;
  line-height: 40px;
  padding: 0 6px;
}

.crowd-rqgz h4 {
  font-weight: 700;
  font-size: 13px;
  margin: 10px 0 !important;
}
.crowd-rqgz p {
  font-size: 12px;
  text-indent: 2em;
}
</style>
