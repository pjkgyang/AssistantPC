import axios from 'axios'
import Qs from 'qs'

var suburl = 'project/'
var quesurl = 'question/'
var exterurl = 'external/'

// 获取项目
export function getProject(obj){
	let url =  window.baseurl + suburl + 'getProject.do'
	return axios.get(url,{
		params:{
          xmbh:obj.xmbh
		},
	})
}
// 获取星标项目
export function queryXbxm(obj){
	let url =  window.baseurl + suburl + 'queryXbxm.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword||""
		},
	})
}
// 获取高风险项目
export function queryGfxxm(obj){
	let url =  window.baseurl + suburl + 'queryGfxxm.do'

	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword||""
		}
	})
}
// 获取我拥有的项目
export function queryWyyxm(obj){
	let url =  window.baseurl + suburl + 'queryWyyxm.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword||""
		}
	})
}
// 获取我参与的项目
export function queryWcyxm(obj){
	let url =  window.baseurl + suburl + 'queryWcyxm.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword||""
		}
	})
}

// 获取关闭项目
export function queryGbxm(obj){
	let url =  window.baseurl + suburl + 'queryGbxm.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword||""
		}
	})
}


// 获取所有的项目
export function queryAllxm(obj){
	let url =  window.baseurl + suburl + 'queryAllxm.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword,
		  fbxz:obj.fbxz,
		//   fbzt:obj.fbzt,
		  xmlb:obj.xmlb,
		//   zzdy:obj.zzdy,
		  sfgx:obj.sfgx,
		  projectLabel:obj.projectLabel
		}
	})
}

// 查询我的项目
export function getMyProjects(obj){
	let url =  window.baseurl + suburl + 'getMyProjects.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword,
		  xmlb:obj.xmlb||"",
		  sfgx:obj.sfgx||"",
		  xmzt:obj.xmzt||"",
		  pl:obj.pl||""
		}
	})
}

// 查询项目
export function getProjects(obj){
	let url =  window.baseurl + suburl + 'getProjects.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
		  pageSize:obj.pageSize,
		  keyword:obj.keyword,
		  xmlb:obj.xmlb,
		  sfgx:obj.sfgx,
		  xmzt:obj.xmzt||"",
		  pl:obj.pl,
		  isAll:obj.isAll||''
		}
	})
}

// 导出项目信息
export function exportXmData(obj){
	let url =  window.baseurl + suburl + 'exportXmData.do'
	return axios.get(url,{
		params:{
			fbxz:obj.fbxz || "",
			fbzt:obj.fbzt|| "",
			xmlb:obj.xmlb|| "",
			zzdy:obj.zzdy|| "",
			sfgx:obj.sfgx|| "",
			projectLabel:obj.projectLabel|| ""
		}
	})
}

// 改变星标状态
export function changeXbZt(obj){
	let url = window.baseurl +suburl+"changeXbZt.do"
	return axios.post(url,{
		      xmbh:obj.xmbh,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取所有问题
export function queryAllQuestions(obj){
	let url =  window.baseurl + quesurl + 'queryAllQuestions.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			xmbh:obj.xmbh||"",
			urgent:obj.urgent||"",
			cp:obj.cp||"",
			cpx:obj.cpx||"",
			bug:obj.bug||"",
			noResponse:obj.noResponse||"",
			jjzt:obj.jjzt||"",
			zt:obj.zt||"",
			keyword:obj.keyword||"",
			qyzd:obj.qyzd||'',
			wtfl:obj.wtfl||'',
			dwlx:obj.dwlx||'',
			cb:obj.cb||'',
			wtlb:obj.wtlb||'',
			isSolution:obj.isSolution||'',
			sqgb:obj.sqgb||'',
			wtbq:obj.wtbq||"",
			deadline:obj.deadline||"",
			starDay:obj.starDay||'',
			endDay:obj.endDay||'',
			isAnalyse:obj.isAnalyse||"",
			bqly:obj.bqly||"",
			wtfbq:obj.wtfbq||"",
			wtgjzt:obj.wtgjzt||""
		}
	})
}

export function exportQuestionReport(obj){
	let url =  window.baseurl + quesurl + 'exportQuestionReport.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh||'',
			urgent:obj.urgent||"",
			cp:obj.cp||"",
			cpx:obj.cpx||"",
			bug:obj.bug||"",
			noResponse:obj.noResponse||"",
			jjzt:obj.jjzt||"",
			zt:obj.zt||"",
			keyword:obj.keyword||"",
			qyzd:obj.qyzd||'',
			wtfl:obj.wtfl||'',
			dwlx:obj.dwlx||'',
			cb:obj.cb||'',
			wtlb:obj.wtlb||'',
			isSolution:obj.isSolution||'',
			sqgb:obj.sqgb||'',
			wtbq:obj.wtbq||"",
			starDay:obj.starDay||'',
			endDay:obj.endDay||'',
			isAnalyse:obj.isAnalyse||""
		}
	})
}
// 获取单个问题
export function queryQuestion(obj){
	let url =  window.baseurl + quesurl + 'queryQuestion.do'
	return axios.get(url,{
		params:{
             wid:obj.wid
		}
	})
}

// 删除问题
export function deleteQuestion(obj){
	let url =  window.baseurl + quesurl + 'deleteQuestion.do'
	return axios.post(url,{
             wids:obj.wids	
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}



// 保存问题
export function saveQuestion(obj){
	let url = window.baseurl +quesurl+"saveQuestion.do"
	return axios.post(url,{
        	wtlb:obj.wtlb,
            jjyf:obj.jjyf,
            wtjb:obj.wtjb,
            cpbh:obj.cpbh,
            yxfw:obj.yxfw,
            sfbg:obj.sfbg,
            bbh:obj.bbh,
			bt:obj.bt||"",
			xmmc:obj.xmmc,
			xmbh:obj.xmbh,
			nr:obj.nr,
			qwjjrq:obj.qwjjrq,
			hjfjwid:obj.hjfjwid||'',
			wid:obj.wid,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 关闭问题
export function closeQuestion(obj){
	let url = window.baseurl +quesurl+"closeQuestion.do"
	return axios.post(url,{
			wid:obj.wid,
			xlpf:obj.xlpf,
			zlpf:obj.zlpf,
			gxrData:obj.gxrData,
			sfjj:obj.sfjj,
			jjsm:obj.jjsm,
			gssfrk:obj.gssfrk,
			cpsm:obj.cpsm			
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取工时
export function queryrReferenceHour(obj){
	let url =  window.baseurl + quesurl + 'queryrReferenceHour.do'
	return axios.get(url,{
		params:{
             wid:obj.wid
		}
	})
}

// 获取回复工时
export function queryrHfHour(obj){
	let url =  window.baseurl + quesurl + 'queryrHfHour.do'
	return axios.get(url,{
		params:{
             wid:obj.wid
		}
	})
}

// 获取问题贡献人
export function queryContributionPeople(obj){
	let url =  window.baseurl + quesurl + 'queryContributionPeople.do'
	return axios.get(url,{
		params:{
             wid:obj.wid
		}
	})
}

// 查询问题
export function queryAnswers(obj){
	let url =  window.baseurl + quesurl + 'queryAnswers.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid,
			 isSolution:obj.isSolution||""
		}
	})
}

// 按钮权限（）
export function queryBtnAuth(obj){
	let url =  window.baseurl + quesurl + 'queryBtnAuth.do'
	return axios.get(url,{
		params:{
             wid:obj.wid
		}
	})
}

// 获取转发对象（标签）
export function forwardLabel(obj){
	let url =  window.baseurl + quesurl + 'forwardLabel.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid	
		}
	})
}

// 获取问题进度
export function queryProcess(obj){
	let url =  window.baseurl + quesurl + 'queryProcess.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid,
			 isTs:obj.isTs
		}
	})
}

// 回复/催办问题
export function saveAnswer(obj){
	let url =  window.baseurl + quesurl + 'saveAnswer.do'
	return axios.post(url,{
			 zbwid:obj.zbwid,
			 nr:obj.nr,
			 gs:obj.gs,
			 sfbg:obj.sfbg,
			//  cnjsrq:obj.cnjsrq,
			 sfjsr:obj.sfjsr, //指定责任人姓名
			 jsrbh:obj.jsrbh,//指定责任人编号
			 nycd:obj.nycd,  //申请结算 难易程度
			 jjyf:obj.jjyf,  //是否紧急
			 hflx:obj.hflx,
			 tktwr:obj.tktwr,
			 qwjjrq:obj.qwjjrq
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取催办条件
export function showCbCondition(obj){
	let url =  window.baseurl + quesurl + 'showCbCondition.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid,
		}
	})
}


// 获取催办人员
export function queryCbRy(obj){
	let url =  window.baseurl + quesurl + 'queryCbRy.do'
	return axios.get(url,{
		params:{
			wid:obj.wid,
			keyword:obj.keyword
  		}
	})
}

// 运营人员转发
export function saveCb(obj){
	let url =  window.baseurl + quesurl + 'saveCb.do'
	return axios.post(url,{
			wid:obj.wid,
			nr:obj.nr,
			ryData:obj.ryData
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 运营人员转发
export function saveYyzfData(obj){
	let url =  window.baseurl + quesurl + 'saveYyzfData.do'
	return axios.post(url,{
			wid:obj.wid,
			nr:obj.nr,
			ryData:obj.ryData,
			bh:obj.bh,
			qwjjrq:obj.qwjjrq
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 获取问题问题（权限）
export function showQuestionCondition(obj){
	let url =  window.baseurl + quesurl + 'showQuestionCondition.do'
	return axios.get(url,{
		
	})
}

// 转发问题
export function saveForward(obj){
	let url =  window.baseurl + quesurl + 'saveForward.do'
	return axios.post(url,{
			 wid:obj.wid,
			 bh:obj.bh,
			 nr:obj.nr,
			 cpbh:obj.cpbh,
			 qwjjrq:obj.qwjjrq
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 修改承诺时间
export function changeCommitmentDate(obj){
	let url =  window.baseurl + quesurl + 'changeCommitmentDate.do'
	return axios.post(url,{
			 wid:obj.wid,
			 cnjsrq:obj.cnjsrq,
			 sm:obj.sm
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


//更改项目钉钉群Id
export function updateChatId(obj){
let url =  window.baseurl + suburl + 'updateChatId.do'
	return axios.post(url,{
			 xmbh:obj.xmbh,
			 chatId:obj.chatId
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

//创建项目钉钉群
export function createChat(obj){
	let url =  window.baseurl + suburl + 'createChat.do'
		return axios.post(url,{
				 xmbh:obj.xmbh,
				 name:obj.name
		},{
			transformRequest: [function (data) {
	　　data = Qs.stringify(data);
		return data;
	  }]
	})
}

// 获取项目钉钉群
export function getChatId(obj){
	let url =  window.baseurl + suburl + 'getChatId.do'
		return axios.get(url,{
			params:{
				 xmbh:obj.xmbh
			}
		})
}



// 受理
export function customerQuestion(obj){
	let url = window.baseurl +quesurl+"customerQuestion.do"
	return axios.post(url,{
        	wtlb:obj.wtlb||"",
            jjyf:obj.jjyf||"",
            wtjb:obj.wtjb||"",
            cpbh:obj.cpbh||"",
            yxfw:obj.yxfw||"",
            sfbg:obj.sfbg||"",
            bbh:obj.bbh||"",
			bt:obj.bt||"",
			xmmc:obj.xmmc||"",
			xmbh:obj.xmbh||"",
			nr:obj.nr||"",
			wid:obj.wid||"",
			qwjjrq:obj.qwjjrq,
			cnjsrq:obj.cnjsrq,
			hjfjwid:obj.hjfjwid,
			Guid:obj.Guid
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 获取CROWD id
export function getCrowdId(obj){
	let url =  window.baseurl + quesurl + 'getCrowdId.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid,
		}
	})
}


// 修改crowd
export function updateCrowdId(obj){
	let url = window.baseurl +quesurl+"updateCrowdId.do"
	return axios.post(url,{
			wid:obj.wid,
			crowdId:obj.crowdId,
			kfgzl:obj.kfgzl
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 驳回
export function applyDismiss(obj){
	let url = window.baseurl +quesurl+"applyDismiss.do"
	return axios.post(url,{
			wid:obj.wid,
			zbwid:obj.zbwid,
			sm:obj.sm
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 获取Crowd任务状态
export function getCrowdRwzt(obj){
	let url =  window.baseurl + exterurl + 'getCrowdRwzt.do'
	return axios.get(url,{
		params:{
			rwbh:obj.rwbh
		}
	})
}

// 获取
export function getCrowdRwxx(obj){
	let url =  window.baseurl + exterurl + 'getCrowdRwxx.do'
	return axios.get(url,{
		params:{
			 rwbh:obj.rwbh,
		}
	})
}
// 是否展示环境附件
export function showHjFj(obj){
	let url =  window.baseurl + quesurl + 'showHjFj.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid,
		}
	})
}

// 设置问题解决集
export function setSolution(obj){
	let url = window.baseurl +quesurl+"setSolution.do"
	return axios.post(url,{
			wid:obj.wid,
			zbwid:obj.zbwid,
			isCancel:obj.isCancel||''
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

//  编辑删除 回复
export function replySet(obj){
	let url = window.baseurl +quesurl+"replySet.do"
	return axios.post(url,{
			hfwid:obj.hfwid,
			isDel:obj.isDel,
			nr:obj.nr,
			gs:obj.gs||""
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


//  申请待验证
export function waitVerification(obj){
	let url = window.baseurl +quesurl+"waitVerification.do"
	return axios.post(url,{
			wid:obj.wid,
			yzrq:obj.yzrq
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 是否可以提问
export function canSubmitQuestion(obj){
	let url = window.baseurl +quesurl+"canSubmitQuestion.do"
	return axios.post(url,{
		
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取问题标签
export function queryLabel(obj){
	let url =  window.baseurl + quesurl + 'queryLabel.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid,
		}
	})
}

// 添加删除问题标签
export function operationLabel(obj){
	let url = window.baseurl +quesurl+"operationLabel.do"
	return axios.post(url,{
		wid:obj.wid,
		dm:obj.dm,
		isDel:obj.isDel
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 发送运维消息
export function sendOperationMsg(obj){
	let url = window.baseurl +quesurl+"sendOperationMsg.do"
	return axios.post(url,{
		wid:obj.wid,
		userIds:obj.userIds,
		msg:obj.msg
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 判断是否  已有申请关闭
export function canApplyClose(obj){
	let url =  window.baseurl + quesurl + 'canApplyClose.do'
	return axios.get(url,{
		params:{
			 wid:obj.wid,
		}
	})
}

//  
export function queryResponsibleProduct(obj){
	let url =  window.baseurl + quesurl + 'queryResponsibleProduct.do'
	return axios.get(url,{
		params:{
			 xmbh:obj.xmbh
		}
	})
}

// 获取产品承诺日期
export function queryProductSolutionTime(obj){
	let url =  window.baseurl + quesurl + 'queryProductSolutionTime.do'
	return axios.get(url,{
		params:{
			 cpbh:obj.cpbh
		}
	})
}

// 关联开发任务
export function addOrUpdateCrowdId(obj){
	let url = window.baseurl +quesurl+"addOrUpdateCrowdId.do"
	return axios.post(url,{
		wid:obj.wid,
		hfwid:obj.hfwid,
		crowdId:obj.crowdId,
		kfgzl:obj.kfgzl
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}
