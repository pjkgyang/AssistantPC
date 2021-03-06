export default {
  getUsers: window.baseurl + 'personnel/getUsers.do', // 获取学校成员
  queryProjectParticipant: window.baseurl + 'personnel/queryProjectParticipant.do', //获取项目参与者
  downloadFile: window.baseurl + 'attachment/downloadFile.do', //下载附件

  exportEktbDetail: window.baseurl + 'report/exportEktbDetail.do', //导出二开提报（成本）
  exportBxbDetail: window.baseurl + 'report/exportBxbDetail.do', //导出可变提报（成本）

  queryDwUsers: window.baseurl + 'report/queryDwUsers.do', //查询相关用户
  getProjectUsers: window.baseurl + 'personnel/getProjectUsers.do', //获取项目相关用户
  // 枚举
  getDictEnum: window.baseurl + 'dict/getDictEnum.do',

  exportProductTasks: window.baseurl + 'task/exportProductTasks.do', //导出任务
  // 报表
  queryReportQuestionLst: window.baseurl + 'report/queryReportQuestionLst.do',
  WtReportOrderStar: window.baseurl + 'report/WtReportOrderStar.do',
  WtReportOrderStarLst: window.baseurl + 'report/WtReportOrderStarLst.do',
  queryCostStat: window.baseurl + 'report/queryCostStat.do',
  queryRegionSchoolDetailData: window.baseurl + 'report/queryRegionSchoolDetailData.do',
  cptsqlReport: window.baseurl + 'report/cptsqlReport.do', //产品提升潜力排行榜
  qytsqlReport: window.baseurl + 'report/qytsqlReport.do', //区域能力提升潜力排行榜
  grtsqlReport: window.baseurl + 'report/grtsqlReport.do', //个人能力提升排行榜
  dwtsqlReport: window.baseurl + 'report/dwtsqlReport.do', //单位能力提升排行榜
  dwtsqlmxReport: window.baseurl + 'report/dwtsqlmxReport.do', //单位能力提升明细
  qyxqtsqlReport: window.baseurl + 'report/qyxqtsqlReport.do', //区域需求排行榜
  pageShWtxm: window.baseurl + 'report/pageShWtxm.do', //单位售后阶段问题统计
  pageZjWtxm: window.baseurl + 'report/pageZjWtxm.do', //单位在建阶段问题统计
  pageYqRwxm: window.baseurl + 'report/pageYqRwxm.do', //单位延期任务统计
  pageGbWtxm: window.baseurl + 'report/pageGbWtxm.do', //单位过保阶段问题统计
  yswgphxqb: window.baseurl + 'report/yswgphxqb.do', //验收完工统计
  yswgphb: window.baseurl + 'report/yswgphb.do', // 完工验收排行榜
  pageEktbDetail: window.baseurl + 'report/pageEktbDetail.do', //二开提报明细分页列表
  pageBxDetail: window.baseurl + 'report/pageBxDetail.do', //报销明细分页列表
  listXxdk: window.baseurl + 'project/listXxdk.do', //获取学校到款明细
  queryMilestoneStageWorkHour: window.baseurl + 'report/queryMilestoneStageWorkHour.do', //获取日报工时详情
  getPersonalWorkLog: window.baseurl + 'process/getPersonalWorkLog.do', //获取日报
  questionAbnormalTrack: window.baseurl + 'report/questionAbnormalTrack.do', //获取问题异常跟踪
  questionOperatIndicator: window.baseurl + 'report/questionOperatIndicator.do', //获取问题运营指标

  exportReportQuestionLst: window.baseurl + 'report/exportReportQuestionLst.do', // 导出跳转问题列表
  exportOperatIndicator: window.baseurl + 'report/exportOperatIndicator.do', // 导出



  // 用户学习报表
  queryUserStudyTotalReport: window.baseurl + 'userstudyreport/queryUserStudyTotalReport.do', //用户使用报表
  queryUserStudyReport: window.baseurl + 'userstudyreport/queryUserStudyReport.do', //学习行为报表
  queryCourseQualityReport: window.baseurl + 'userstudyreport/queryCourseQualityReport.do', //课程质量报表


  // 使用报表
  problemsameIPStat: window.baseurl + 'usageReport/problemsameIPStat.do', //提问受理IP相同统计报表
  userLoginStat: window.baseurl + 'usageReport/userLoginStat.do', //用户登录统计报表
  userLoginReport: window.baseurl + 'usageReport/userLoginReport.do', //用户登录详情
  userBehaviorReport: window.baseurl + 'usageReport/userBehaviorReport.do', //用户行为记录
  questionProgressSummaryReport: window.baseurl + 'report/questionProgressSummaryReport.do', //问题处理进展报表



  // 考核报表
  ydkhb: window.baseurl + 'assessment/ydkhb.do', //月度考核报表
  ydjlb: window.baseurl + 'assessment/ydjlb.do', //月度奖励报表
  ydkhtsxqb: window.baseurl + 'assessment/ydkhtsxqb.do', //投诉详情表
  ydkhlcbxqb: window.baseurl + 'assessment/ydkhlcbxqb.do', //里程碑详情表
  ydkhwtxqb: window.baseurl + 'assessment/ydkhwtxqb.do', //问题详情表
  ydwtshgsb: window.baseurl + 'assessment/ydwtshgsb.do', //售后工时报表
  ydwtshgsxqb: window.baseurl + 'assessment/ydwtshgsxqb.do', //售后工时详情报表
  ydjlwtxqb: window.baseurl + 'assessment/ydjlwtxqb.do', //售后工时详情报表
  nfxggs: window.baseurl + 'assessment/nfxggs.do', //能否修改工时
  xggs: window.baseurl + 'assessment/xggs.do', //修改工时
  hasDepositData: window.baseurl + 'assessment/hasDepositData.do', //考核数据是否已封存
  depositAssessmentData: window.baseurl + 'assessment/depositAssessmentData.do', //封存考核数据
  personalProblemHandleIndicator: window.baseurl + 'assessment/personalProblemHandleIndicator.do', //个人指标的地址



  // 战队维护
  saveQyzd: window.baseurl + 'qyzd/saveQyzd.do', // 保存区域战队
  saveZdcy: window.baseurl + 'qyzd/saveZdcy.do', // 保存战队成员
  deleteQyzd: window.baseurl + 'qyzd/deleteQyzd.do', // 删除区域战队
  deleteZdcy: window.baseurl + 'qyzd/deleteZdcy.do', // 删除战队成员
  deleteTeamProject: window.baseurl + 'qyzd/deleteTeamProject.do', // 删除战队项目关联
  pageQyzd: window.baseurl + 'qyzd/pageQyzd.do', // 获取区域战队分页
  listQyzdCy: window.baseurl + 'qyzd/listQyzdCy.do', // 获取区域战队成员列表
  pageTeamProjects: window.baseurl + 'qyzd/pageTeamProjects.do', //战队项目分页数据
  addTeamProject: window.baseurl + 'qyzd/addTeamProject.do', //添加战队项目关联关系
  getQyzd: window.baseurl + 'qyzd/getQyzd.do', //获取区域战队

  // fujian
  uploadAttach: window.baseurl + 'attachment/uploadAttach.do',

  // 主动式服务
  isVisibleTab: window.baseurl + 'activeservice/isVisibleTab.do', //是否可见
  saveActiveService: window.baseurl + 'activeservice/saveActiveService.do', //保存主动式服务(编辑)
  deleteActiveService: window.baseurl + 'activeservice/deleteActiveService.do', //删除主动式服务
  pageActiveService: window.baseurl + 'activeservice/pageActiveService.do', //主动式服务分页列表
  listOperationLog: window.baseurl + 'activeservice/listOperationLog.do', //主动式服务日志列表
  submitActiveService: window.baseurl + 'activeservice/submitActiveService.do', //提报主动式服务
  changeCompleteDate: window.baseurl + 'activeservice/changeCompleteDate.do', //调整计划完成日期
  rejectActiveService: window.baseurl + 'activeservice/rejectActiveService.do', //驳回主动式服务
  getActiveService: window.baseurl + 'activeservice/getActiveService.do', //获取主动式服务
  confirmActiveService: window.baseurl + 'activeservice/confirmActiveService.do', //确认主动式服务
  listXmZdsfwCp: window.baseurl + 'activeservice/listXmZdsfwCp.do', // 获取产品
  listFwnrByCp: window.baseurl + 'activeservice/listFwnrByCp.do', // 获取服务内容
  isVisibleTab: window.baseurl + 'activeservice/isVisibleTab.do', //是否可见主动式服务
  pageActiveServiceProject: window.baseurl + 'activeservice/pageActiveServiceProject.do', //主动式服务（导航）
  generateActiveService: window.baseurl + 'activeservice/generateActiveService.do', //生成主动式服务（新增）
  publishActiveService: window.baseurl + 'activeservice/publishActiveService.do', //发布主动式服务（新增）
  updateZrr: window.baseurl + 'activeservice/updateZrr.do', //批量修改责任人
  addActiveServiceProblem: window.baseurl + 'activeservice/addActiveServiceProblem.do', //添加主动式服务问题
  deleteActiveServiceProblem: window.baseurl + 'activeservice/deleteActiveServiceProblem.do', //删除主动式服务问题
  pageActiveServiceProblem: window.baseurl + 'activeservice/pageActiveServiceProblem.do', //主动式服务问题分页列表
  addActiveServiceRisk: window.baseurl + 'activeservice/addActiveServiceRisk.do', //添加主动式服务风险
  deleteActiveServiceRisk: window.baseurl + 'activeservice/deleteActiveServiceRisk.do', //删除主动式服务风险
  pageActiveServiceRisk: window.baseurl + 'activeservice/pageActiveServiceRisk.do', // 主动式服务风险分页列表
  pageActiveServiceProblem: window.baseurl + 'activeservice/pageActiveServiceProblem.do', // 主动式服务风险分页列表
  submitActiveServiceRisk: window.baseurl + 'activeservice/submitActiveServiceRisk.do', //提交主动式服务风险
  submitActiveServiceProblem: window.baseurl + 'activeservice/submitActiveServiceProblem.do', //提交问题
  pageProblemSets: window.baseurl + 'activeservice/pageProblemSets.do', //问题库查询
  pageRiskSets: window.baseurl + 'activeservice/pageRiskSets.do', //风险库查询
  getLatestSubmitDescription: window.baseurl + 'activeservice/getLatestSubmitDescription.do', //获取最近一次提交的说明
  updateActiveServiceFlag: window.baseurl + 'activeservice/updateActiveServiceFlag.do', //更新项目停滞


  // 修改参与者 中标人
  listZbxx: window.baseurl + 'project/listZbxx.do', // 获取中标人列表
  modifyZbr: window.baseurl + 'personnel/modifyZbr.do', //修改中标人
  modifySale: window.baseurl + 'personnel/modifySale.do',

  // 任务（进度）
  getProductTasks: window.baseurl + 'task/getProductTasks.do', //获取产品任务分页列表
  pageHomePageTaskDetail: window.baseurl + 'task/pageHomePageTaskDetail.do', // 首页跳转任务数据列表

  // 项目看板里程碑明细(首页)
  pageProjectPanelMilestoneDetail: window.baseurl + 'milestone/pageProjectPanelMilestoneDetail.do',
  addMemo: window.baseurl + 'milestone/addMemo.do', //提交项目备忘（里程碑）
  editMemo: window.baseurl + 'milestone/editMemo.do', //编辑

  //  首页跳转日报数据列表
  pageProjectPanelWorkLogs: window.baseurl + 'process/pageProjectPanelWorkLogs.do',
  pageHomePageWeekWorkDetail: window.baseurl + 'plan/pageHomePageWeekWorkDetail.do', //周报动态工作明细
  pageHomePageWeeklyReportDetail: window.baseurl + 'plan/pageHomePageWeeklyReportDetail.do', //周报动态进度任务明细
  pageHomePageWeekQuestionDetail: window.baseurl + 'plan/pageHomePageWeekQuestionDetail.do', //周报动态问题明细
  pageHomePageMonthWorkDetail: window.baseurl + 'plan/pageHomePageMonthWorkDetail.do', //月报动态工作明细
  pageHomePageMonthQuestionDetail: window.baseurl + 'plan/pageHomePageMonthQuestionDetail.do', //月报动态问题明细
  listPlanCommentForHomePageDetail: window.baseurl + 'plan/listPlanCommentForHomePageDetail.do',
  getLogCommentsForHomePageDetail: window.baseurl + 'process/getLogCommentsForHomePageDetail.do', //获取首页明细跳转之后的日志批注

  // 结算接口 - 个人结算
  personalSettlement: window.baseurl + 'settlement/personalSettlement.do',
  crowdSettlement: window.baseurl + 'settlement/crowdSettlement.do', // 结算接口 - 二开结算
  presaleCallSettlement: window.baseurl + 'settlement/presaleCallSettlement.do', // 结算接口 - 售前调用结算
  projectSettlement: window.baseurl + 'settlement/projectSettlement.do', // 结算接口 - 项目结算
  settlementApplication: window.baseurl + 'settlement/settlementApplication.do', //结算申请列表
  settlementPoints: window.baseurl + 'settlement/settlementPoints.do', //获取结算点
  saveSettlementApplication: window.baseurl + 'settlement/saveSettlementApplication.do', //保存申请结算
  settlementApplicationRecord: window.baseurl + 'settlement/settlementApplicationRecord.do', //申请结算记录
  settlementTeamMembers: window.baseurl + 'settlement/settlementTeamMembers.do', //结算团队成员

  // 开始售后服务
  startAfterSalesService: window.baseurl + 'project/startAfterSalesService.do',
  stopAfterSalesService: window.baseurl + 'project/stopAfterSalesService.do', //停止售后服务
  addProjectProcess: window.baseurl + 'project/addProjectProcess.do', //添加项目催办
  pageProjectReminder: window.baseurl + 'project/pageProjectReminder.do',

  // 项目备忘 销售确认里程碑
  listHtnrApp: window.baseurl + 'project/listHtnrApp.do', //合同APP
  listMemoProduct: window.baseurl + 'milestone/listMemoProduct.do', //备忘产品列表
  isCanEditMemoMilestone: window.baseurl + 'milestone/isCanEditMemoMilestone.do', //是否可编辑备忘里程碑
  addMemo: window.baseurl + 'milestone/addMemo.do', //编辑备忘里程碑
  querySaleConfirmMilestone: window.baseurl + 'milestone/querySaleConfirmMilestone.do', //获取销售确认里程碑列表
  saleConfirmMilestone: window.baseurl + 'milestone/saleConfirmMilestone.do', //销售确认里程碑


  // 资源中心
  openTemplateFolder: window.baseurl + 'attachment/openTemplateFolder.do', //模板
  openCoursewareFolder: window.baseurl + 'attachment/openCoursewareFolder.do', //课件
  applyDismiss: window.baseurl + 'question/applyDismiss.do',
  queryCpZjData: window.baseurl + 'personnel/queryCpZjData.do', //获取专家列表 产品
  openNewcomerFolder: window.baseurl + 'attachment/openNewcomerFolder.do', //新人专用
  good: window.baseurl + 'attachment/good.do', //好评
  bad: window.baseurl + 'attachment/bad.do', //差评
  logs: window.baseurl + 'attachment/logs.do', //记录
  getCount: window.baseurl + 'attachment/getCount.do', //获取记录数
  expertgood: window.baseurl + 'personnel/expertgood.do', //专家好评
  expertbad: window.baseurl + 'personnel/expertbad.do', //专家差评
  experlogs: window.baseurl + 'personnel/logs.do', //专家操作记录
  experts: window.baseurl + 'personnel/listExperts.do', //专家列表
  addFjGjjh: window.baseurl + 'attachment/addFjGjjh.do', //添加改进状态
  pageFjGjjh: window.baseurl + 'attachment/pageFjGjjh.do', //附件改进计划分页列表
  deleteFile: window.baseurl + 'attachment/deleteFile.do', //删除
  addDir: window.baseurl + 'attachment/addDir.do', //增加文件夹
  deleteDir: window.baseurl + 'attachment/deleteDir.do', //删除文件夹
  feedback: window.baseurl + 'attachment/feedback.do', // 意见反馈
  pageFeedback: window.baseurl + 'attachment/pageFeedback.do', //反馈分页列表
  replyFeedback: window.baseurl + 'attachment/replyFeedback.do', //回复意见反馈
  pageReplyOfFeedback: window.baseurl + 'attachment/pageReplyOfFeedback.do', //反馈回复分页列表




  // 获取学校产品线
  getXxCpx: window.baseurl + 'personnel/getXxCpx.do',

  // 问题复盘 改进计划
  pageProductPlan: window.baseurl + 'wtgj/pageProductPlan.do', //获取产品改进计划列表
  pageCapacityPlan: window.baseurl + 'wtgj/pageCapacityPlan.do', //获取能力改进计划列表
  deleteProductPlan: window.baseurl + 'wtgj/deleteProductPlan.do', //删除产品计划
  deleteCapacityPlan: window.baseurl + 'wtgj/deleteCapacityPlan.do', //删除能力改进计划
  removeFromPlan: window.baseurl + 'wtgj/removeFromPlan.do', //剔除计划
  publishProduct: window.baseurl + 'wtgj/publishProduct.do', //发布产品
  addOrUpdateProductPlan: window.baseurl + 'wtgj/addOrUpdateProductPlan.do', //新增或修改产品计划
  addOrUpdateCapacityPlan: window.baseurl + 'wtgj/addOrUpdateCapacityPlan.do', //新增或修改能力改进计划
  addInPlan: window.baseurl + 'wtgj/addInPlan.do', //纳入计划
  abilityTraining: window.baseurl + 'wtgj/abilityTraining.do', //培训
  pageStaff: window.baseurl + 'personnel/pageStaff.do', //员工列表
  planImprovementProblemList: window.baseurl + 'question/planImprovementProblemList.do', //计划改进问题列表

  // 更新项目签订类型
  updateProjectSignType: window.baseurl + 'project/updateProjectSignType.do',

  //  问题限制产品
  questionLimitProduct: window.baseurl + 'question/questionLimitProduct.do',

  // 个人任职等级
  listPersonalPositionLevel: window.baseurl + 'personnel/listPersonalPositionLevel.do', //个人任职等级列表
  pagePositionLevel: window.baseurl + 'personnel/pagePositionLevel.do', // 任职等级分页列表
  pageXrzz: window.baseurl + 'training/pageXrzz.do', // 培训数据记录分页列表
  nfxgjszt: window.baseurl + 'assessment/nfxgjszt.do', // 能否修改结算状态
  xgjszt: window.baseurl + 'assessment/xgjszt.do', // 修改结算状态


  // 周报返回创建时间以及总结时间
  mapWeekReportDate: window.baseurl + 'plan/mapWeekReportDate.do', //周报返回创建时间以及总结时间


  // 支持中心 搜索
  searchFiles: window.baseurl + 'search/searchFiles.do',
  refreshFileIndex: window.baseurl + 'search/refreshFileIndex.do',

  // 日志
  log: window.baseurl + 'sys/log.do',


  // 获取项目列表
  pageUnitProjects: window.baseurl + 'project/pageUnitProjects.do', //获取单位项目
  listHtnrApp: window.baseurl + 'project/listHtnrApp.do', // 获取合同内容App
  sendServiceExpired: window.baseurl + 'project/sendServiceExpired.do', //发送服务过期提醒
  listServiceExpired: window.baseurl + 'project/listServiceExpired.do', //获取服务提醒列表
  queryProjectParticipantMap: window.baseurl + 'personnel/queryProjectParticipantMap.do', //获取项目参与者
  getTeamMembers: window.baseurl + 'team/getTeamMembers.do', //获取项目团队成员

  // crowd
  getCrowdYwx: window.baseurl + 'external/getCrowdYwx.do', // 获取crowd业务线
  getCrowdCp: window.baseurl + 'external/getCrowdCp.do', // 获取crowd产品
  crowdFbrw: window.baseurl + 'external/crowdFbrw.do',
  projectFeedback: window.baseurl + 'project/projectFeedback.do', //项目反馈
  queryResponsibleProduct: window.baseurl + 'question/queryResponsibleProduct.do', //获取负责的产品
  getDwByUser: window.baseurl + 'sys/getDwByUser.do', //获取单位列表


  // 分包
  queryLxxx: window.baseurl + 'fbxx/queryLxxx.do', //获取立项信息
  canProjectSubcontract: window.baseurl + 'fbxx/canProjectSubcontract.do', //是否可以分包
  queryFbYwxData: window.baseurl + 'fbxx/queryFbYwxData.do', //获取分包产品或业务域数据
  saveFbxx: window.baseurl + 'fbxx/saveFbxx.do', //保存分包
  fbManage: window.baseurl + 'fbxx/fbManage.do', //分包审核
  closeFb: window.baseurl + 'fbxx/closeFb.do', //关闭分包
  verifyFb: window.baseurl + 'fbxx/verifyFb.do', //分包审核
  getProjects: window.baseurl + 'fbxx/getProjects.do', //获取分包项目
  queryFbjsMonthReport: window.baseurl + 'fbxx/queryFbjsMonthReport.do', //查询项目月度结算单
  modifyProjectManager: window.baseurl + 'fbxx/modifyProjectManager.do', //修改项目经理
  modifyProjectArea: window.baseurl + 'fbxx/modifyProjectArea.do', //修改工程区域

  // 投标
  saveTbxx: window.baseurl + 'tbxx/saveTbxx.do', //投标
  tbManage: window.baseurl + 'tbxx/tbManage.do', //投标详情
  setBid: window.baseurl + 'tbxx/swzb.do', //设为中标

  // 结算
  queryJsData: window.baseurl + 'jsxx/queryJsData.do', //获取结算
  queryJsxq: window.baseurl + 'jsxx/queryJsxq.do', //获取结算详情
  querySsfy: window.baseurl + 'jsxx/querySsfy.do', //获取实施费用
  queryEkfy: window.baseurl + 'jsxx/queryEkfy.do', //获取二开费用
  queryBxfy: window.baseurl + 'jsxx/queryBxfy.do', //获取报销费用
  batchSetJsFySource: window.baseurl + 'jsxx/batchSetJsFySource.do', //批量设置结算费用
  saveJsFeeData: window.baseurl + 'jsxx/saveJsFeeData.do', //保存项目结算
  jsReview: window.baseurl + 'jsxx/jsReview.do', //结算审核
  setCz: window.baseurl + 'jsxx/setCz.do', //设置冲账
  setSettlementFeeAttribution: window.baseurl + 'jsxx/setSettlementFeeAttribution.do', //设置结算费用归属
  rejectSettlementApplication: window.baseurl + 'jsxx/rejectSettlementApplication.do', //项目结算驳回


  // 问题
  canApplySuspension: window.baseurl + 'question/canApplySuspension.do', //能否申请挂起
  submitSuspend: window.baseurl + 'question/submitSuspend.do', //提交挂起
  canDealSuspend: window.baseurl + 'question/canDealSuspend.do', //能否处理挂起
  dealSuspend: window.baseurl + 'question/dealSuspend.do', //处理挂起
  queryApplySuspension: window.baseurl + 'question/queryApplySuspension.do', //获取挂起问题

  // 岗位任职资格查询
  jobQualificationQuery: window.baseurl + 'personnel/jobQualificationQuery.do', //获取挂起问题

  // 过保反馈
  overProtectionFeedback: window.baseurl + 'project/overProtectionFeedback.do', //过保反馈

  // 项目停滞
  pageProjectStopWorkflow: window.baseurl + 'flow/pageProjectStopWorkflow.do', //项目停滞/重启流程分页数据
  startProjectStopProgress: window.baseurl + 'flow/startProjectStopProgress.do', //发起项目停滞流程
  startProjectRestartProgress: window.baseurl + 'flow/startProjectRestartProgress.do', //发起项目重启流程
  restartProjectStopProgress: window.baseurl + 'flow/restartProjectStopProgress.do', //重新发起项目停滞
  restartProjectRestartProgress: window.baseurl + 'flow/restartProjectRestartProgress.do', //重新发起项目重启
  agreeProjectStop: window.baseurl + 'flow/agree.do', //审批同意
  rejectProjectStop: window.baseurl + 'flow/reject.do', //审批驳回
  getProjectStopVO: window.baseurl + 'flow/getProjectStopVO.do', //获取项目停滞重启详情
  listWorkFlowNodes: window.baseurl + 'flow/listWorkFlowNodes.do', //流程节点列表
  logs: window.baseurl + 'flow/logs.do', //流程日志列表
  exportProjectStopWorkflow: window.baseurl + 'flow/exportProjectStopWorkflow.do', //导出项目停滞/重启流程


  // 获取成本
  getCost: window.baseurl + 'project/getCost.do', //获取成本

  afterSalesSettlementQuestion: window.baseurl + 'assessment/afterSalesSettlementQuestion.do', //获取成本售后

  // 学校服务(服务事项)
  treeDept: window.baseurl + 'serviceitem/treeDept.do', //部门树
  enableDept: window.baseurl + 'serviceitem/enableDept.do', //启用部门
  disableDept: window.baseurl + 'serviceitem/disableDept.do', //禁用部门
  deleteDept: window.baseurl + 'serviceitem/deleteDept.do', //删除部门
  saveDept: window.baseurl + 'serviceitem/saveDept.do', //保存部门
  treeDeptWithUnit: window.baseurl + 'serviceitem/treeDeptWithUnit.do', //获取相关学校部门树
  serviceObjects: window.baseurl + 'serviceitem/serviceObjects.do', // 获取服务对象下拉列表
  serviceCatalogs: window.baseurl + 'serviceitem/serviceCatalogs.do', // 获取服务类别下拉列表
  saveServiceItem: window.baseurl + 'serviceitem/saveServiceItem.do', // 保存服务事项
  saveServiceItemPlan: window.baseurl + 'serviceitem/saveServiceItemPlan.do', // 编辑实施计划
  getServiceItemPlan: window.baseurl + 'serviceitem/getServiceItemPlan.do', // 获取服务事项计划
  getServiceItem: window.baseurl + 'serviceitem/getServiceItem.do', // 获取服务事项

  pageServiceItem: window.baseurl + 'serviceitem/pageServiceItem.do', // 服务事项分页列表
  pageServiceItemPlan: window.baseurl + 'serviceitem/pageServiceItemPlan.do', // 获取服务事项计划

  addUserDept: window.baseurl + 'serviceitem/addUserDept.do', // 添加部门关系
  userDeptChecked: window.baseurl + 'serviceitem/userDeptChecked.do', // 用户已关联部门编号
  serviceItemStat: window.baseurl + 'serviceitem/serviceItemStat.do', //  服务事项分析
  deleteServiceItemPlan: window.baseurl + 'serviceitem/deleteServiceItemPlan.do', //  删除服务事项计划
  deleteServiceItem: window.baseurl + 'serviceitem/deleteServiceItem.do', //  删除服务事项

  // 开发在线化  api/demandDvpt
  queryDemand:window.baseurl + 'demandDvpt/queryDemand.do', // 获取详情
  demandProcessTemplate: window.baseurl + 'demandDvpt/demandProcessTemplate.do', //  需求流程模板
  demandProductTree: window.baseurl + 'demandDvpt/demandProductTree.do', //  产品树
  submitDemand: window.baseurl + 'demandDvpt/submitDemand.do', //  提报需求
  demandReplys: window.baseurl + 'demandDvpt/demandReplys.do', //  获取需求回复
  demandBtns: window.baseurl + 'demandDvpt/demandBtns.do', //  获取需求按钮
  reply: window.baseurl + 'demandDvpt/reply.do', //  需求回复
  accept: window.baseurl + 'demandDvpt/accept.do', //  受理
  reject: window.baseurl + 'demandDvpt/reject.do', //  驳回
  remind: window.baseurl + 'demandDvpt/remind.do', //  催办
  distributionDvpt: window.baseurl + 'demandDvpt/distributionDvpt.do', //  分配开发工程师
  openGreenChannel: window.baseurl + 'demandDvpt/openGreenChannel.do', //  开通绿色通道
  projectTeamSubmitDvpt: window.baseurl + 'demandDvpt/projectTeamSubmitDvpt.do', //  需求开发
  queryPageDemands: window.baseurl + 'demandDvpt/queryPageDemands.do', //  获取需求列表
  exportDemands: window.baseurl + 'demandDvpt/exportDemands.do' ,//  导出需求列表
  candidateConfirmPersons: window.baseurl + 'demandDvpt/candidateConfirmPersons.do', //  获取确认老师数据
  submitDetailDesign: window.baseurl + 'demandDvpt/submitDetailDesign.do', //  项目团队提交（需求提报）
  confirmRequirement: window.baseurl + 'demandDvpt/confirmRequirement.do', //  用户需求确认（需求确认）
  projectTeamVerifyDvpt: window.baseurl + 'demandDvpt/projectTeamVerifyDvpt.do', //  项目团队验证（完成验证）
  confirmDvpt: window.baseurl + 'demandDvpt/confirmDvpt.do', //   关闭需求
  submitDemandFile: window.baseurl + 'demandDvpt/submitDemandFile.do', //   提交开发包

  // 服务台
  saveCjdw: window.baseurl + 'servicedesk/saveCjdw.do', //   保存承建公司
  deleteCjdw: window.baseurl + 'servicedesk/deleteCjdw.do', //  删除承建公司
  pageCjdw: window.baseurl + 'servicedesk/pageCjdw.do', //   承建公司列表
  getCjdw: window.baseurl + 'servicedesk/getCjdw.do', //   获取承建公司
  saveApp: window.baseurl + 'servicedesk/saveApp.do', //   保存应用配置
  deleteApp: window.baseurl + 'servicedesk/deleteApp.do', //   删除应用配置
  pageApps: window.baseurl + 'servicedesk/pageApps.do', //   获取应用配置分页数据
  getApp: window.baseurl + 'servicedesk/getApp.do', //   获取应用配置
  appSelect: window.baseurl + 'servicedesk/appSelect.do', //   应用配置选择列表
  pageServiceDesk: window.baseurl + 'servicedesk/pageServiceDesk.do', //  服务台分页列表
  saveServiceDesk: window.baseurl + 'servicedesk/saveServiceDesk.do', //  保存
  deleteServiceDesk: window.baseurl + 'servicedesk/deleteServiceDesk.do', //  删除
  getServiceDesk: window.baseurl + 'servicedesk/getServiceDesk.do', //  获取服务台
  updatePromisedTime: window.baseurl + 'servicedesk/updatePromisedTime.do', //  更新承诺结束日期
  replyServiceDesk: window.baseurl + 'servicedesk/reply.do', //  回复
  completed: window.baseurl + 'servicedesk/completed.do', // 办结
  remindServiceDesk: window.baseurl + 'servicedesk/remind.do', // 催办
  returnVisit: window.baseurl + 'servicedesk/returnVisit.do', // 用户回访
  becomeAssistantQuestion: window.baseurl + 'servicedesk/becomeAssistantQuestion.do', // 转入小助手问题
  waitForUserVerification: window.baseurl + 'servicedesk/waitForUserVerification.do', // 等待用户验证
  pageServiceDeskWithoutAuth: window.baseurl + 'servicedesk/pageServiceDeskWithoutAuth.do', // 等待用户验证
  deleteServiceDeskProcess: window.baseurl + 'servicedesk/deleteServiceDeskProcess.do', //删除回复
  updateServiceDeskProcess: window.baseurl + 'servicedesk/updateServiceDeskProcess.do', //编辑回复

  // 专项服务
  pageSpecialService: window.baseurl + 'specialservice/pageSpecialService.do', // 专项服务分页列表
  generateSpecialService: window.baseurl + 'specialservice/generateSpecialService.do', //  生成专项服务
  updateZxfws: window.baseurl + 'specialservice/updateZxfws.do', //  更新责任人和时间
  deleteSpecialService: window.baseurl + 'specialservice/deleteSpecialService.do', //  删除专项服务
  releaseSpecialService: window.baseurl + 'specialservice/releaseSpecialService.do', //  发布专项服务
  submitSpecialService: window.baseurl + 'specialservice/submitSpecialService.do', //  提报专项服务
  confirmSpecialService: window.baseurl + 'specialservice/confirmSpecialService.do', //  提报专项服务
  rejectSpecialService: window.baseurl + 'specialservice/rejectSpecialService.do', //  驳回专项服务
  exportSpecialService: window.baseurl + 'specialservice/exportSpecialService.do', //  导出专项服务
  getSpecialService: window.baseurl + 'specialservice/getSpecialService.do', //  获取专项服务
  recordSpecialService: window.baseurl + 'specialservice/recordSpecialService.do', //  记录专项服务
  getSpecialServiceCPX: window.baseurl + 'specialservice/getSpecialServiceCPX.do', // 获取服务类型
  listOperationLogZxfw: window.baseurl + 'specialservice/listOperationLog.do', // 获取日志
  getSpecialServiceFWX: window.baseurl + 'specialservice/getSpecialServiceFWX.do', // 获取服务项
  addSpecailServiceJL: window.baseurl + 'specialservice/addSpecailServiceJL.do',//添加专项服务记录
  findSpecailServiceJL: window.baseurl + 'specialservice/findSpecailServiceJL.do',//查询专项服务记录项
  
  // 会议在线化
  saveMeeting:window.baseurl + 'meeting/saveMeeting.do', // 保存会议
  pageMeeting:window.baseurl + 'meeting/pageMeeting.do', // 获取分页分页
  exportMeeting:window.baseurl + 'meeting/exportMeeting.do', // 导出会议
  deleteMeeting:window.baseurl + 'meeting/deleteMeeting.do', // 删除
  saveDealtMatter:window.baseurl + 'meeting/saveDealtMatter.do', // 保存处理项
  deleteMatter:window.baseurl + 'meeting/deleteMatter.do', // 删除处理项
  pageMatter:window.baseurl + 'meeting/pageMatter.do', // 获取会议事项 分页
  exportMatter:window.baseurl + 'meeting/exportMatter.do', // 导出会议事项 
  saveMatterFeedback:window.baseurl + 'meeting/saveMatterFeedback.do', // 保存事项反馈
  pageMatterFeedback:window.baseurl + 'meeting/pageMatterFeedback.do', // 获取事项反馈
  queryMeetingStat:window.baseurl + 'meeting/queryMeetingStat.do', // 获取会议统计
  queryMeetingStatDetail:window.baseurl + 'meeting/queryMeetingStatDetail.do', // 获取会议统计详情
  exportMeetingStatDetail:window.baseurl + 'meeting/exportMeetingStatDetail.do', // 导出会议统计详情
  queryMatter:window.baseurl + 'meeting/queryMatter.do', // 获取单个待处理事项详情
  queryMeeting:window.baseurl + 'meeting/queryMeeting.do' // 获取单个会议详情
}
