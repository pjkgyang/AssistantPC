import axios from 'axios'
import Qs from 'qs'

var suburl = 'milestone/'



// 获取里程碑目录
export function getMilestoneCatalog(obj){
	let url =  window.baseurl + suburl + 'getMilestoneCatalog.do'
	return axios.get(url,{
		params:{
		xmbh:obj.xmbh||"",
		cpbh:obj.cpbh||"",
		cpmc:obj.cpmc,
		curPage:obj.curPage,
		pageSize:obj.pageSize,
		taskType:obj.taskType||"",
		rwzt:obj.rwzt||"",
		keyword:obj.keyword||""
		}
	})
}

// 修改里程碑及固定任务计划结束时间
export function ModifyMilestoneCommitmentDate(obj){
	let url = window.baseurl +suburl+"ModifyMilestoneCommitmentDate.do"
	return axios.post(url,{
		    xmbh:obj.xmbh,
			lcbbh:obj.lcbbh,
			startDate:obj.startDate,
			endDate:obj.endDate,
			sm:obj.sm

	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

//  获取里程碑信息
export function queryMilestoneData(obj){
	let url =  window.baseurl + suburl + 'queryMilestoneData.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			xmbh:obj.xmbh,
			keyword:obj.keyword||"",
			zt:obj.zt||"",
			startCnjssj:obj.startCnjssj,
			endCnjssj:obj.endCnjssj,
			startSjjssj:obj.startSjjssj,
			endSjjssj:obj.endSjjssj,
			nrxmlb:obj.nrxmlb
		}
	})
}

// 提交里程碑
export function submitMilestone(obj){
	let url = window.baseurl +suburl+"submitMilestone.do"
	return axios.post(url,{
		    xmbh:obj.xmbh,
			lcbbh:obj.lcbbh,
			fjData:obj.fjData,
			sm:obj.sm,
			qzsj:obj.qzsj,
			fwsj:obj.fwsj,
			yhbh:obj.yhbh,
			yhxm:obj.yhxm

	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


//  获取里程碑类型
export function getMilestoneSubmitType(obj){
	let url =  window.baseurl + suburl + 'getMilestoneSubmitType.do'
	return axios.get(url,{
		params:{
			
			xmbh:obj.xmbh,
			lcbbh:obj.lcbbh
		}
	})
}

//  导出里程碑
export function exportMilestoneData(obj){
	let url =  window.baseurl + suburl + 'exportMilestoneData.do'
	return axios.get(url,{
		params:obj
	})
}
