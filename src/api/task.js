import axios from 'axios'
import Qs from 'qs'

var suburl = 'task/'



// 获取里程碑目录
export function getTasksByCatalog(obj){
	let url =  window.baseurl + suburl + 'getTasksByCatalog.do'
	return axios.get(url,{
		params:{
            xmbh:obj.xmbh,
            catalog:obj.catalog,
			catalogId:obj.catalogId,
			cpbh:obj.cpbh,
			cpmc:obj.cpmc,
			catalogType:obj.catalogType,
            curPage:obj.curPage,
            pageSize:obj.pageSize,
			taskType:obj.taskType||"",
		    rwzt:obj.rwzt||"",
            keyword:obj.keyword || ""
		}
	})
}

// 添加或更新任务
export function addOrUpdateTask(obj){
	let url = window.baseurl +suburl+"addOrUpdateTask.do"
	return axios.post(url,{
			      xmbh:obj.xmbh,
                  fbbh:obj.fbbh,
                  lcbbh:obj.lcbbh,
				  rwmc:obj.rwmc,
				  rwbh:obj.rwbh,
                  yxj:obj.yxj,
				  jhgs:obj.jhgs||"",
				  gq:obj.gq||"",
                  jhksrq:obj.jhksrq,
                  jhjsrq:obj.jhjsrq,
                  ssrbh:obj.ssrbh||"",
				  ssrxm:obj.ssrxm||"",
				  rwxq:obj.rwxq,
                  lcbmlsy:obj.lcbmlsy,
                  cpbh:obj.cpbh,
				  cpmc:obj.cpmc,
				  ryData:obj.ryData
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 更改任务状态
export function changeTaskStatus(obj){
	let url = window.baseurl +suburl+"changeTaskStatus.do"
	return axios.post(url,{
			rwbh:obj.rwbh,
			state:obj.state,               
			wcsj:obj.wcsj   
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 获取任务列表
export function getTasks(obj){
	let url =  window.baseurl + suburl + 'getTasks.do'
	return axios.get(url,{
		params:{
                  curPage:obj.curPage,
                  pageSize:obj.pageSize,
                  startDt:obj.startDt,
                  endDt:obj.endDt,
                  state:obj.state,
				  xmbh:obj.xmbh,
                  keyword:obj.keyword,
                  orderby:obj.orderby||"",
		}
	})
}

// 获取任务DTO
export function getTaskDto(obj){
	let url =  window.baseurl + suburl + 'getTaskDto.do'
	return axios.get(url,{
		params:{
                  rwbh:obj.rwbh,
		}
	})
}

// 删除任务
export function deleteTask(obj){
	let url = window.baseurl +suburl+"deleteTask.do"
	return axios.post(url,{
		
			rwbh:obj.rwbh,                
		
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取任务操作日志
export function getTaskLogs(obj){
let url =  window.baseurl + suburl + 'getTaskLogs.do'
	return axios.get(url,{
		params:{
			rwbh:obj.rwbh,
			curPage:obj.curPage,
			pageSize:obj.pageSize
		}
	})
}

// 甲方确认里程碑
export function confirmMilestone(obj){
	let url = window.baseurl +suburl+"confirmMilestone.do"
	return axios.post(url,{
		
			lcbbh:obj.lcbbh,                
		
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}