import axios from 'axios'
import Qs from 'qs'

var suburl = 'process/'
var fileurl = 'attachment/'

// 	添加任务过程
export function addOrUpdateTaskProcess(obj){
	let url = window.baseurl +suburl+"addOrUpdateTaskProcess.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			fbbh:obj.fbbh,
			rwbh:obj.rwbh,
			gclx:obj.gclx,
			gcms:obj.gcms,
			gcrq:obj.gcrq,
			gs:obj.gs,
			hfrbh:obj.hfrbh,
			hfrxm:obj.hfrxm,
			fjdata:obj.fjdata||"",
			wid:obj.wid||""
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 获取日志（任务过程）
export function queryLogTaskProcess(obj){
	let url =  window.baseurl + suburl + 'queryLogTaskProcess.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			startDay:obj.startDay,
			endDay:obj.endDay,
			cybh:obj.cybh || "",
			isRead:obj.isRead,
			keyword:obj.keyword,
			qygc:obj.qygc||"",
			fw:obj.fw
		}
	})
}

// 获取任务过程（分页）
export function queryTaskProcess(obj){
	let url =  window.baseurl + suburl + 'queryTaskProcess.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			rwbh:obj.rwbh,
			gclx:obj.gclx,
			startDay:obj.startDay,
			endDay:obj.endDay,
		}
	})
}

// 设置已阅
export function readLog(obj){
	let url = window.baseurl +suburl+"readLog.do"
	return axios.post(url,{
		wid:obj.wid
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 上传附件
export function uploadAttach(obj){
	let url = window.baseurl +fileurl+"uploadAttach.do"
	return axios.post(url,obj,{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 下载附件
export function downFile(obj){
	let url =  window.baseurl + fileurl + 'downFile.do'
	return axios.get(url,{
		params:{
			fjId:obj.fjId
		}
	})
}


// 获取模板文件夹
export function getTemplateFolder(obj){
	let url =  window.baseurl + fileurl + 'getTemplateFolder.do'
	return axios.get(url,{
		params:{
			wid:obj.wid
		}
	})
}


// 获取里程碑模板文件夹(仅一级文件目录)
export function getLcbFolders(obj){
	let url =  window.baseurl + fileurl + 'getLcbFolders.do'
	return axios.get(url,{
		params:{
			lcbms:obj.lcbms
		}
	})
}

//  获取里程碑子模板
export function getChildrenByLcbms(obj){
	let url =  window.baseurl + fileurl + 'getChildrenByLcbms.do'
	return axios.get(url,{
		params:{
			lcbms:obj.lcbms
		}
	})
}

//  获取里程碑子模板(根据任务编号)
export function getTemplateByRwbh(obj){
	let url =  window.baseurl + fileurl + 'getTemplateByRwbh.do'
	return axios.get(url,{
		params:{
			rwbh:obj.rwbh
		}
	})
}

// 获取子模板
export function getChildren(obj){
	let url =  window.baseurl + fileurl + 'getChildren.do'
	return axios.get(url,{
		params:{
			parentwid:obj.parentwid
		}
	})
}

// 获取所有模板
export function getTemplates(obj){
	let url =  window.baseurl + fileurl + 'getTemplates.do'
	return axios.get(url,{
		params:{
			cpdm:obj.cpdm
		}
	})
}

// 获取所有模板
export function getTemplateCp(obj){
	let url =  window.baseurl + fileurl + 'getTemplateCp.do'
	return axios.get(url,{
		
	})
}

// 下载指定目录附件
export function downloadLocalFile(obj){
	let url =  window.baseurl + fileurl + 'downloadLocalFile.do'
	return axios.get(url,{
		params:{
			path:obj.path
		}
	})
}


// 打开文件夹
export function openFolder(obj){
	let url =  window.baseurl + fileurl + 'openFolder.do'
	return axios.get(url,{
		params:{
			folderwid:obj.folderwid,
			xmbh:obj.xmbh
		}
	})
}

// 打开真实文件夹
export function openRealFolder(obj){
	let url =  window.baseurl + fileurl + 'openRealFolder.do'
	return axios.get(url,{
		params:{
			path:obj.path,
			xmbh:obj.xmbh
		}
	})
}

// 检出
export function checkout(obj){
	let url =  window.baseurl + fileurl + 'checkout.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
		}
	})
}

// 下载文件
export function downloadXmFile(obj){
	let url =  window.baseurl + fileurl + 'downloadXmFile.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh,
			path:obj.path
		}
	})
}

// 更新文件（svn）
export function updateSvn(obj){
	let url =  window.baseurl + fileurl + 'updateSvn.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh,
		}
	})
}

// 获取日志批注
export function getLogComment(obj){
	let url =  window.baseurl + suburl + 'getLogComment.do'
	return axios.get(url,{
		params:{
			wid:obj.wid
		}
	})
}

// 提交日志批注
export function commentLog(obj){
	let url = window.baseurl +suburl+"commentLog.do"
	return axios.post(url,{
		wid:obj.wid,
		bz:obj.bz
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 删除日志
export function deleteTaskProcess(obj){
	let url = window.baseurl +suburl+"deleteTaskProcess.do"
	return axios.post(url,{
		wid:obj.wid,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取日志所有批注
export function getLogComments(obj){
	let url =  window.baseurl + suburl + 'getLogComments.do'
	return axios.get(url,{
		params:{
			wid:obj.wid
		}
	})
}

