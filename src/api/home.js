import axios from 'axios'
import Qs from 'qs'

var suburl  = 'stat/'
var exterurl = 'external/'
var quesurl = 'question/'
var complainturl = 'service/'

// 获取项目统计
export function getXmTj(obj){
	let url =  window.baseurl + suburl + 'getXmTj.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
		}
	})
}
// 获取项目统计
export function getXmTjRT(obj){
	let url =  window.baseurl + suburl + 'getXmTjRT.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh,
			isAll:obj.isAll
		}
	})
}

// 获取单位业务域
export function getYwy(obj){
	let url =  window.baseurl + suburl + 'getYwy.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
		}
	})
}

// 获取单位统计信息
export function getDwTj(obj){
	let url =  window.baseurl + suburl + 'getDwTj.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh,
			ywxdm:obj.ywxdm
		}
	})
}

// 获取里程碑月计划
export function getMonthLcb(obj){
	let url =  window.baseurl + suburl + 'getMonthLcb.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
		}
	})
}

// 
export function getXmJs(obj){
	let url =  window.baseurl + suburl + 'getXmJs.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
		}
	})
}

// 获取单位项目统计信息
export function getDwXmTj(obj){
	let url =  window.baseurl + suburl + 'getDwXmTj.do'
	return axios.get(url,{
		params:{
			dwmc:obj.dwmc
		}
	})
}

// 获取单位项目统计信息
export function getTop5(obj){
	let url =  window.baseurl + exterurl + 'getTop5.do'
	return axios.get(url,{
		params:{
			dwzsdm:obj.dwzsdm
		}
	})
}

// 获取单位项目统计信息（RT）
export function getDwXmTjRT(obj){
	let url =  window.baseurl + suburl + 'getDwXmTjRT.do'
	return axios.get(url,{
		params:{
			dwmc:obj.dwmc,
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			keyword:obj.keyword,
			xmfl:obj.xmfl
		}
	})
}


// 获取最近问题
export function queryRecentQuestions(obj){
	let url =  window.baseurl + quesurl + 'queryRecentQuestions.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			xmbh:obj.xmbh||'',
			unitNum:obj.unitNum||'',
			iscb:obj.iscb||'',
			isAll:obj.isAll
		}
	})
}

// 获取最近投诉
export function queryRecentComplaints(obj){
	let url =  window.baseurl + complainturl + 'queryRecentComplaints.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			xmbh:obj.xmbh||'',
			unitNum:obj.unitNum||'',
			isAll:obj.isAll
		}
	})
}


