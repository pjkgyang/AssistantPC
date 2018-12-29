import axios from 'axios'
import Qs from 'qs'

var suburl = 'team/'


// 获取团队成员列表
export function getTeamMembers(obj){
	let url =  window.baseurl + suburl + 'getTeamMembers.do'
	return axios.get(url,{
		params:{
            xmbh:obj.xmbh
        }
	})
}

// 是否显示团队成员菜单
export function isVisibleXmtd(obj){
	let url =  window.baseurl + suburl + 'isVisibleXmtd.do'
	return axios.get(url,{
		params:{
            xmbh:obj.xmbh
        }
	})
}

// 获取团队成员
export function getTeamMember(obj){
	let url =  window.baseurl + suburl + 'getTeamMember.do'
	return axios.get(url,{
		params:{
            xmbh:obj.xmbh
        }
	})
}

// 删除团队成员
export function deleteTeamMember(obj){
	let url = window.baseurl +suburl+"deleteTeamMember.do"
	return axios.post(url,{
			wid:obj.wid
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取项目产品
export function getProjectCatalog(obj){
	let url =  window.baseurl + 'project/getProjectCatalog.do'
	return axios.get(url,{
		params:{
            xmbh:obj.xmbh
        }
	})
}


// 获取分包信息select值
export function getFbxxSelect(obj){
	let url =  window.baseurl + 'project/getFbxxSelect.do'
	return axios.get(url,{
		params:{
            xmbh:obj.xmbh
        }
	})
}

// 获取用户
export function getUsers(obj){
	let url =  window.baseurl + 'personnel/getUsers.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			unitType:obj.unitType,
			keyword:obj.keyword
        }
	})
}


// 保存团队成员
export function saveTeamMember(obj){
	let url = window.baseurl +suburl+"saveTeamMember.do"
	return axios.post(url,{
			wid:obj.wid,
			xmbh:obj.xmbh,
			cybh:obj.cybh,
			cymc:obj.cymc,
			userId:obj.userId,
			cpmc:obj.cpmc,
			cpbh:obj.cpbh,
			fbbh:obj.fbbh,
			ydkssj:obj.ydkssj,
			ydjssj:obj.ydjssj,
			jhfpfy:obj.jhfpfy,
			ydgznr:obj.ydgznr,
			sfcpfzr:obj.sfcpfzr,
			cpxdata:obj.cpxdata,
			ssry:obj.ssry,
			ekry:obj.ekry,
			kbfy:obj.kbfy,
			isAllCpx:obj.isAllCpx
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}