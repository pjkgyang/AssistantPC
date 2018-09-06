import axios from 'axios'
import Qs from 'qs'

var suburl = 'plan/'



// 获取月工作计划的分页列表
export function pageMonthWork(obj) {
  let url = window.baseurl + suburl + 'pageMonthWork.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      month: obj.month,
      planType: obj.planType || '',
      keyword: obj.keyword || '',
      zts: obj.zts
    }
  })
}

// 获取月工作计划
export function getMonthWork(obj) {
  let url = window.baseurl + suburl + 'getMonthWork.do'
  return axios.get(url, {
    params: {
      ygzWid: obj.ygzWid
    }
  })
}

// 获取月工作计划(合计)
export function countMonthWorkWglg(obj) {
  let url = window.baseurl + suburl + 'countMonthWorkWglg.do'
  return axios.get(url, {
    params: {
      qygc: obj.qygc,
      month: obj.month,
      planType: obj.planType
    }
  })
}

// 保存月工作计划
export function saveMonthWork(obj) {
  let url = window.baseurl + suburl + "saveMonthWork.do"
  return axios.post(url, {
    wid: obj.wid || '',
    qygc: obj.qygc,
    yf: obj.yf,
    lcbbh: obj.lcbbh,
    wwcyy: obj.wwcyy,
    hxcs: obj.hxcs || ''
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 获取月问题计划的分页列表
export function pageMonthQuestion(obj) {
  let url = window.baseurl + suburl + 'pageMonthQuestion.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      month: obj.month,
      wtzt:obj.wtzt,
      yczt:obj.yczt,
      keyword:obj.keyword
    }
  })
}

// 获取月问题计划
export function getMonthQuestion(obj) {
  let url = window.baseurl + suburl + 'getMonthQuestion.do'
  return axios.get(url, {
    params: {
      ywtWid: obj.ywtWid
    }
  })
}

// 保存月问题计划
export function saveMonthQuestion(obj) {
  let url = window.baseurl + suburl + "saveMonthQuestion.do"
  return axios.post(url, {
    wid: obj.wid || '',
    qygc: obj.qygc,
    yf: obj.yf,
    wtWid: obj.wtWid,
    wwcyy: obj.wwcyy || '',
    hxcs: obj.hxcs || '',
    cljh: obj.cljh || ''
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 获取计划的批注列表
export function listComments(obj) {
  let url = window.baseurl + suburl + 'listComments.do'
  return axios.get(url, {
    params: {
      oid: obj.oid,
      planType: obj.planType
    }
  })
}

// 获取计划的批注
export function getComment(obj) {
  let url = window.baseurl + suburl + 'getComment.do'
  return axios.get(url, {
    params: {
      wid: obj.wid
    }
  })
}

// 保存计划批注
export function addComment(obj) {
  let url = window.baseurl + suburl + "addComment.do"
  return axios.post(url, {
    comment: obj.comment,
    oids: obj.oids,
    planType: obj.planType
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 获取问题分页列表(新增问题)
export function pageQuestionForPlan(obj) {
  let url = window.baseurl + suburl + 'pageQuestionForPlan.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      cnjssj: obj.cnjssj,
      keyword: obj.keyword,
      wtzt:obj.wtzt,
      yczt:obj.yczt
    }
  })
}

// 获取里程碑信息分页数据以及完成量合计(月计划制定)
export function mapLcbxxForPlan(obj) {
  let url = window.baseurl + suburl + 'mapLcbxxForPlan.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      cnjssj: obj.cnjssj,
      keyword: obj.keyword,
      planType:obj.planType||'',
      xmlb: obj.xmlb || "",
      cpxs: obj.cpxs || "",
      zts: obj.zts || ""
    }
  })
}

// 获取里程碑信息分页数据以及完成量合计(周计划制定)
export function mapLcbxxForWeekPlan(obj) {
  let url = window.baseurl + suburl + 'mapLcbxxForWeekPlan.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      cnjssj: obj.cnjssj,
      keyword: obj.keyword,
      xmlb: obj.xmlb || "",
      cpxs: obj.cpxs || "",
      zts: obj.zts || ""
    }
  })
}

// 获取里程碑详情
export function getLcbxx(obj) {
  let url = window.baseurl + suburl + 'getLcbxx.do'
  return axios.get(url, {
    params: {
      lcbbh: obj.lcbbh,
      month:obj.month
    }
  })
}

// 添加问题为月问题计划
export function addMonthQuestionPlan(obj) {
  let url = window.baseurl + suburl + "addMonthQuestionPlan.do"
  return axios.post(url, {
    wids: obj.wids,
    month: obj.month
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 删除月问题计划
export function deleteMonthQuestion(obj) {
  let url = window.baseurl + suburl + "deleteMonthQuestion.do"
  return axios.post(url, {
    ywtWid: obj.ywtWid
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 刷新月问题计划
export function refreshMonthWork(obj) {
  let url = window.baseurl + suburl + "refreshMonthWork.do"
  return axios.post(url, {
    qygc: obj.qygc,
    month: obj.month,
    planType: obj.planType
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 刷新月问题计划
export function generateMonthWork(obj) {
  let url = window.baseurl + suburl + "generateMonthWork.do"
  return axios.post(url, {
    qygc: obj.qygc,
    month: obj.month,
    gzKeyword:obj.gzKeyword,
    xmlb:obj.xmlb,
    cpxs:obj.cpxs,
    zts:obj.zts,
    wtKeyword:obj.wtKeyword||'',
    wtzt:obj.wtzt,
    yczt:obj.yczt
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 周报································

// 获取周工作计划的分页列表
export function pageWeekWork(obj) {
  let url = window.baseurl + suburl + 'pageWeekWork.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      month: obj.month,
      zxh: obj.zxh,
      yhbh: obj.yhbh,
      zts:obj.zts||"",
      keyword:obj.keyword||""

    }
  })
}

// 获取周工作计划
export function getWeekWork(obj) {
  let url = window.baseurl + suburl + 'getWeekWork.do'
  return axios.get(url, {
    params: {
      zgzWid: obj.zgzWid
    }
  })
}

// 保存周工作计划
export function saveWeekWork(obj) {
  let url = window.baseurl + suburl + "saveWeekWork.do"
  return axios.post(url, {
    wid: obj.wid,
    yhbh: obj.yhbh,
    yf: obj.yf,
    zxh: obj.zxh,
    wwcyy: obj.wwcyy,
    hxcs: obj.hxcs,
    lcbbh: obj.lcbbh
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 删除周工作计划
export function deleteWeekWork(obj) {
  let url = window.baseurl + suburl + "deleteWeekWork.do"
  return axios.post(url, {
    zgzWid: obj.zgzWid,
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}
// **************** 问题
// 获取周问题计划的分页列表
export function pageWeekQuestion(obj) {
  let url = window.baseurl + suburl + 'pageWeekQuestion.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      month: obj.month,
      zxh: obj.zxh,
      yhbh: obj.yhbh,
      wtzt:obj.wtzt||'',
      yczt:obj.yczt||'',
      keyword:obj.keyword
    }
  })
}

// 获取周问题计划
export function getWeekQuestion(obj) {
  let url = window.baseurl + suburl + 'getWeekQuestion.do'
  return axios.get(url, {
    params: {
      zwtWid: obj.zwtWid
    }
  })
}

// 保存周问题计划
export function saveWeekQuestion(obj) {
  let url = window.baseurl + suburl + "saveWeekQuestion.do"
  return axios.post(url, {
    wid: obj.wid,
    yhbh: obj.yhbh,
    yf: obj.yf,
    zxh: obj.zxh,
    wwcyy: obj.wwcyy,
    hxcs: obj.hxcs,
    wtWid: obj.wtWid,
    cljh: obj.cljh
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 删除周问题
export function deleteWeekQuestion(obj) {
  let url = window.baseurl + suburl + "deleteWeekQuestion.do"
  return axios.post(url, {
    zwtWid: obj.zwtWid,
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}
// ************  进度
// 获取周进度计划的分页列表
export function pageWeeklyReport(obj) {
  let url = window.baseurl + suburl + 'pageWeeklyReport.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      month: obj.month,
      zxh: obj.zxh,
      yhbh: obj.yhbh,
      keyword:obj.keyword
    }
  })
}

// 获取周报（进度任务）
export function getWeeklyReport(obj) {
  let url = window.baseurl + suburl + 'getWeeklyReport.do'
  return axios.get(url, {
    params: {
      wid: obj.wid
    }
  })
}

// 保存周进度计划
export function saveWeeklyReport(obj) {
  let url = window.baseurl + suburl + "saveWeeklyReport.do"
  return axios.post(url, obj,
  //   {
  //     wid: obj.wid || '',
  //     yhbh: obj.yhbh,
  //     yf: obj.yf,
  //     zxh: obj.zxh,
  //     xmbh: obj.xmbh,
  //     lcbbh: obj.lcbbh,
  //     rwbh: obj.rwbh,
  //     gzms: obj.gzms,
  //     gs: obj.gs
  // },
   {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 保存周进度计划
export function addWeekQuestionPlan(obj) {
  let url = window.baseurl + suburl + "addWeekQuestionPlan.do"
  return axios.post(url, {
    wids: obj.wids,
    month: obj.month,
    zxh: obj.zxh,
    yhbh: obj.yhbh
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 删除周进度计划
export function deleteWeeklyReport(obj) {
  let url = window.baseurl + suburl + "deleteWeeklyReport.do"
  return axios.post(url, {
    wid: obj.wid,
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 获取周里程碑列表（新增）
export function pageMonthWorkForWeekWork(obj) {
  let url = window.baseurl + suburl + 'pageMonthWorkForWeekWork.do'
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      month: obj.month,
      // xmlb:obj.xmlb||'',
      // cpxs:obj.cpxs||'',
      zts: obj.zts || '',
      keyword: obj.keyword
    }
  })
}

// 保存周工作（里程碑）计划
export function addWeekWorkPlan(obj) {
  let url = window.baseurl + suburl + "addWeekWorkPlan.do"
  return axios.post(url, {
    lcbbhs: obj.lcbbhs,
    yhbh: obj.yhbh,
    month: obj.month,
    zxh: obj.zxh,
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 刷新周工作里程碑状态
export function refreshWeekWork(obj) {
  let url = window.baseurl + suburl + "refreshWeekWork.do"
  return axios.post(url, {
    qygc: obj.qygc,
    month: obj.month,
    zxh: obj.zxh,
    yhbh: obj.yhbh
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 月计划是否封存
export function isMonthPlanBlocked(obj) {
  let url = window.baseurl + suburl + "isMonthPlanBlocked.do"
  return axios.get(url, {
    params: {
      month: obj.month
    }
  })
}

// 周计划是否封存
export function isWeekPlanBlocked(obj) {
  let url = window.baseurl + suburl + "isWeekPlanBlocked.do"
  return axios.get(url, {
    params: {
      month: obj.month,
      zxh: obj.zxh
    }
  })
}

// 批量更新月工作计划
export function batchUpdateMonthWork(obj) {
  let url = window.baseurl + suburl + "batchUpdateMonthWork.do"
  return axios.post(url, {
    ygzwids: obj.ygzwids,
    wwcyy: obj.wwcyy,
    hxcs: obj.hxcs,

  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}
// 批量更新周工作计划
export function batchUpdateWeekWork(obj) {
  let url = window.baseurl + suburl + "batchUpdateWeekWork.do"
  return axios.post(url, {
    zgzwids: obj.zgzwids,
    wwcyy: obj.wwcyy,
    hxcs: obj.hxcs,

  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 批量更新周工作计划（包含工作内容）
export function batchUpdateWeekWorkGznr(obj) {
  let url = window.baseurl + suburl + "batchUpdateWeekWorkGznr.do"
  return axios.post(url, {
      zgzwids: obj.zgzwids,
      gznr:obj.gznr
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 批量更新周工作计划（包含工作内容）
export function batchUpdateWeekWorkAll(obj) {
  let url = window.baseurl + suburl + "batchUpdateWeekWorkAll.do"
  return axios.post(url, {
      zgzwids: obj.zgzwids,
      wwcyy: obj.wwcyy,
      hxcs: obj.hxcs,
      gznr:obj.gznr
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 批量更新月问题计划
export function batchUpdateMonthQuestion(obj) {
  let url = window.baseurl + suburl + "batchUpdateMonthQuestion.do"
  return axios.post(url, {
    ywtwids: obj.ywtwids,
    wwcyy: obj.wwcyy,
    hxcs: obj.hxcs,

  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 批量更新周问题计划
export function batchUpdateWeekQuestion(obj) {
  let url = window.baseurl + suburl + "batchUpdateWeekQuestion.do"
  return axios.post(url, {
    zwtwids: obj.zwtwids,
    wwcyy: obj.wwcyy,
    hxcs: obj.hxcs,

  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 批量更新周问题计划(所有)
export function batchUpdateWeekQuestionAll(obj) {
  let url = window.baseurl + suburl + "batchUpdateWeekQuestionAll.do"
  return axios.post(url, {
      zwtwids: obj.zwtwids,
      yhbh:obj.yhbh,
      month:obj.month,
      zxh:obj.zxh,
      wwcyy: obj.wwcyy,
      hxcs: obj.hxcs,
      cljh:obj.cljh
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 批量更新月问题处理计划
export function batchUpdateMonthQuestionCljh(obj) {
  let url = window.baseurl + suburl + "batchUpdateMonthQuestionCljh.do"
  return axios.post(url, {
      wtwids: obj.wtwids,
      cljh:obj.cljh,
      month:obj.month,
      qygc:obj.qygc
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 批量更新周问题（处理计划）
export function batchUpdateWeekQuestionCljh(obj) {
  let url = window.baseurl + suburl + "batchUpdateWeekQuestionCljh.do"
  return axios.post(url, {
      wtwids: obj.wtwids,
      cljh:obj.cljh,
      yhbh:obj.yhbh,
      month:obj.month,
      zxh:obj.zxh
  }, {
      transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
      }]
    })
}

// 获取问题详情
export function getQuestion(obj) {
  let url = window.baseurl + suburl + "getQuestion.do"
  return axios.get(url, {
    params: {
      wtwid:obj.wtwid,
      month:obj.month
    }
  })
}

// 获取问题分页列表（周计划制定）
export function pageQuestionForWeekPlan(obj) {
  let url = window.baseurl + suburl + "pageQuestionForWeekPlan.do"
  return axios.get(url, {
    params: {
      curPage: obj.curPage,
      pageSize: obj.pageSize,
      qygc: obj.qygc,
      cnjssj: obj.cnjssj,
      keyword: obj.keyword,
      wtzt:obj.wtzt,
      yczt:obj.yczt
    }
  })
}
  
// 获取问题详情（周计划制订）
export function getQuestionForWeekPlan(obj) {
  let url = window.baseurl + suburl + "getQuestionForWeekPlan.do"
  return axios.get(url, {
    params: {
     wtwid:obj.wtwid,
     month:obj.month,
     zxh:obj.zxh
    }
  })
}

// 获取产品线
export function getCpx() {
  let url = window.baseurl + 'dict/' + "getCpx.do"
  return axios.get(url, {
    params: {}
  })
}

// 获取产品线
export function listWeekPlanPerson(obj) {
  let url = window.baseurl + suburl + "listWeekPlanPerson.do"
  return axios.get(url, {
    params: {
      month:obj.month,
      zxh:obj.zxh,
      qygc:obj.qygc
    }
  })
}  

// 未完成原因关联判断
export function allowSaveWeekPlan(obj) {
  let url = window.baseurl + suburl + "allowSaveWeekPlan.do"
  return axios.get(url, {
    params: {
      month:obj.month,
      zxh:obj.zxh,
      yhbh:obj.yhbh
    }
  })
}  

// 
export function listMonthPlanQygc(obj) {
  let url = window.baseurl + suburl + "listMonthPlanQygc.do"
  return axios.get(url, {
    params: {
      month:obj.month,
      qygc:obj.qygc||''
    }
  })
}  


export function allowSaveMonthPlan(obj) {
  let url = window.baseurl + suburl + "allowSaveMonthPlan.do"
  return axios.get(url, {
    params: {
      month:obj.month,
    }
  })
}  
