
export default {
    queryReportQuestionLst:window.baseurl +'report/queryReportQuestionLst.do',
    WtReportOrderStar:window.baseurl +'report/WtReportOrderStar.do',
    WtReportOrderStarLst:window.baseurl +'report/WtReportOrderStarLst.do',
    queryCostStat:window.baseurl+'report/queryCostStat.do',
    queryRegionSchoolDetailData:window.baseurl+'report/queryRegionSchoolDetailData.do',
    cptsqlReport:window.baseurl+'report/cptsqlReport.do',  //产品提升潜力排行榜
    qytsqlReport:window.baseurl+'report/qytsqlReport.do',  //区域能力提升潜力排行榜 
    grtsqlReport:window.baseurl+'report/grtsqlReport.do',  //个人能力提升排行榜 
    dwtsqlReport:window.baseurl+'report/dwtsqlReport.do',  //单位能力提升排行榜 
    dwtsqlmxReport:window.baseurl+'report/dwtsqlmxReport.do',  //单位能力提升明细
    qyxqtsqlReport:window.baseurl+'report/qyxqtsqlReport.do',  //区域需求排行榜
    pageShWtxm:window.baseurl+'report/pageShWtxm.do',//单位售后阶段问题统计
    pageZjWtxm:window.baseurl+'report/pageZjWtxm.do',//单位在建阶段问题统计
    pageYqRwxm:window.baseurl+'report/pageYqRwxm.do',//单位延期任务统计
    pageGbWtxm:window.baseurl+'report/pageGbWtxm.do',//单位过保阶段问题统计
    yswgphxqb:window.baseurl+'report/yswgphxqb.do',  //验收完工统计
    yswgphb:window.baseurl+'report/yswgphb.do', // 完工验收排行榜    
    pageEktbDetail:window.baseurl+'report/pageEktbDetail.do', //二开提报明细分页列表
    pageBxDetail:window.baseurl+'report/pageBxDetail.do',//报销明细分页列表
    
    ydkhb:window.baseurl+'report/ydkhb.do', //月度考核报表
    tsxqb:window.baseurl+'report/tsxqb.do', //投诉详情表
    lcbxqb:window.baseurl+'report/lcbxqb.do', //里程碑详情表
    wtxqb:window.baseurl+'report/wtxqb.do', //问题详情表

    // 战队维护
    saveQyzd:window.baseurl+'qyzd/saveQyzd.do',                    // 保存区域战队
    saveZdcy:window.baseurl+'qyzd/saveZdcy.do',                    // 保存战队成员
    deleteQyzd:window.baseurl+'qyzd/deleteQyzd.do',                // 删除区域战队
    deleteZdcy:window.baseurl+'qyzd/deleteZdcy.do',                // 删除战队成员
    deleteTeamProject:window.baseurl+'qyzd/deleteTeamProject.do',  // 删除战队项目关联
    pageQyzd:window.baseurl+'qyzd/pageQyzd.do',  // 获取区域战队分页
    listQyzdCy:window.baseurl+'qyzd/listQyzdCy.do',  // 获取区域战队成员列表
    pageTeamProjects:window.baseurl+'qyzd/pageTeamProjects.do',  //战队项目分页数据
    addTeamProject:window.baseurl+'qyzd/addTeamProject.do',  //添加战队项目关联关系
    getQyzd:window.baseurl+'qyzd/getQyzd.do',  //获取区域战队

    // fujian
    uploadAttach:window.baseurl+'attachment/uploadAttach.do', 

    // 主动式服务
    isVisibleTab:window.baseurl+'activeservice/isVisibleTab.do',//是否可见
    saveActiveService:window.baseurl+'activeservice/saveActiveService.do',//保存主动式服务
    deleteActiveService:window.baseurl+'activeservice/deleteActiveService.do',//删除主动式服务
    pageActiveService:window.baseurl+'activeservice/pageActiveService.do',//主动式服务分页列表
    listOperationLog:window.baseurl+'activeservice/listOperationLog.do',//主动式服务日志列表
    submitActiveService:window.baseurl+'activeservice/submitActiveService.do',//提报主动式服务
    changeCompleteDate:window.baseurl+'activeservice/changeCompleteDate.do',//调整计划完成日期
    rejectActiveService:window.baseurl+'activeservice/rejectActiveService.do',//驳回主动式服务
    getActiveService:window.baseurl+'activeservice/getActiveService.do', //获取主动式服务
    confirmActiveService:window.baseurl+'activeservice/confirmActiveService.do', //确认主动式服务
    listXmZdsfwCp:window.baseurl+'activeservice/listXmZdsfwCp.do',  // 获取产品
    listFwnrByCp:window.baseurl+'activeservice/listFwnrByCp.do',   // 获取服务内容
    isVisibleTab:window.baseurl+'activeservice/isVisibleTab.do', //是否可见主动式服务

    // 修改参与者 中标人
    listZbxx:window.baseurl+'project/listZbxx.do', // 获取中标人列表
    modifyZbr:window.baseurl+'personnel/modifyZbr.do', //修改中标人
    modifySale:window.baseurl+'personnel/modifySale.do',

    // 任务（进度）
    getProductTasks:window.baseurl+'task/getProductTasks.do', //获取产品任务分页列表
    pageHomePageTaskDetail:window.baseurl+'task/pageHomePageTaskDetail.do',  // 首页跳转任务数据列表

    // 项目看板里程碑明细(首页)
    pageProjectPanelMilestoneDetail:window.baseurl+'milestone/pageProjectPanelMilestoneDetail.do',

    //  首页跳转日报数据列表
    pageProjectPanelWorkLogs:window.baseurl+'process/pageProjectPanelWorkLogs.do',
    pageHomePageWeekWorkDetail:window.baseurl+'plan/pageHomePageWeekWorkDetail.do',//周报动态工作明细
    pageHomePageWeeklyReportDetail:window.baseurl+'plan/pageHomePageWeeklyReportDetail.do',//周报动态进度任务明细
    pageHomePageWeekQuestionDetail:window.baseurl+'plan/pageHomePageWeekQuestionDetail.do',//周报动态问题明细
    pageHomePageMonthWorkDetail:window.baseurl+'plan/pageHomePageMonthWorkDetail.do',//月报动态工作明细
    pageHomePageMonthQuestionDetail:window.baseurl+'plan/pageHomePageMonthQuestionDetail.do',//月报动态问题明细
    listPlanCommentForHomePageDetail:window.baseurl+'plan/listPlanCommentForHomePageDetail.do',
    getLogCommentsForHomePageDetail:window.baseurl+'process/getLogCommentsForHomePageDetail.do',//获取首页明细跳转之后的日志批注

    // 结算接口 - 个人结算
    personalSettlement:window.baseurl+'settlement/personalSettlement.do',
    crowdSettlement:window.baseurl+'settlement/crowdSettlement.do', // 结算接口 - 二开结算
    presaleCallSettlement:window.baseurl+'settlement/presaleCallSettlement.do', // 结算接口 - 售前调用结算
    projectSettlement:window.baseurl+'settlement/projectSettlement.do', // 结算接口 - 项目结算

    // 开始售后服务
    startAfterSalesService:window.baseurl+'project/startAfterSalesService.do',
    stopAfterSalesService:window.baseurl+'project/stopAfterSalesService.do', //停止售后服务
    

}
