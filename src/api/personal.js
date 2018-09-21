import axios from 'axios'
import Qs from 'qs'

var suburl = 'personnel/'



// 获取 团队成员
export function queryTdcy(){
	let url =  window.baseurl + suburl + 'queryTdcy.do'
	return axios.get(url,{
	})
}

// 	获取项目相关人员
export function queryprojectParticipant(obj){
	let url =  window.baseurl + suburl + 'queryprojectParticipant.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
  		}	
	})
}

// 	获取项目相关人员
export function queryProjectParticipant(obj){
	let url =  window.baseurl + suburl + 'queryProjectParticipant.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
  		}	
	})
}

// 	获取项目相关人员(map)
export function queryProjectParticipantMap(obj){
	let url =  window.baseurl + suburl + 'queryProjectParticipantMap.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh
  		}	
	})
}

// 获取用户
export function queryUser(obj){
	let url =  window.baseurl + suburl + 'queryUser.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			xmbh:obj.xmbh,
			Isexternal:obj.Isexternal,
			keyword:obj.keyword
  		}
	})
}

// 	增加项目相关人员
export function addProjectParticipant(obj){
	let url = window.baseurl +suburl+"addProjectParticipant.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			yhxm:obj.yhxm,
			yhbh:obj.yhbh,
	},{
		transformRequest: [function (data) {
	　　data = Qs.stringify(data);
		return data;
  }]
})
}

// 删除项目相关人员
export function deleteProjectParticipant(obj){
	let url = window.baseurl +suburl+"deleteProjectParticipant.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			yhbh:obj.yhbh
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 修改甲方及产品负责人
export function modifyProductLeader(obj){
	let url = window.baseurl +suburl+"modifyProductLeader.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			yhbh:obj.yhbh,
			yhxm:obj.yhxm,
			cpmc:obj.cpmc,
			cpbh:obj.cpbh,
			isJf:obj.isJf
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取任务相关人员
export function querytaskParticipant(obj){
	let url =  window.baseurl + suburl + 'querytaskParticipant.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh,
			rwbh:obj.rwbh,
  		}
	})
}

// 增加任务相关人员
export function addTaskParticipant(obj){
	let url = window.baseurl +suburl+"addTaskParticipant.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			rwbh:obj.rwbh,
			yhbh:obj.yhbh,
			yhxm:obj.yhxm,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 删除任务相关人员
export function deleteTaskParticipant(obj){
	let url = window.baseurl +suburl+"deleteTaskParticipant.do"
	return axios.post(url,{

			xmbh:obj.xmbh,
			rwbh:obj.rwbh,
			yhbh:obj.yhbh,
		
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 修改任务负责人
export function modifyTaskLeader(obj){
	let url = window.baseurl +suburl+"modifyTaskLeader.do"
	return axios.post(url,{

			xmbh:obj.xmbh,
			rwbh:obj.rwbh,
			yhxm:obj.yhxm,
			yhbh:obj.yhbh,
		
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 增加产品负责人
export function addProductParticipant(obj){
	let url = window.baseurl +suburl+"addProductParticipant.do"
	return axios.post(url,{
        
			xmbh:obj.xmbh,
			cpbh:obj.cpbh,
			cpmc:obj.cpmc,
			yhxm:obj.yhxm,
			yhbh:obj.yhbh,
		
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 删除产品负责人
export function deleteProductParticipant(obj){
	let url = window.baseurl +suburl+"deleteProductParticipant.do"
	return axios.post(url,{

			xmbh:obj.xmbh,
			cpbh:obj.cpbh,
			cpmc:obj.cpmc,
			yhxm:obj.yhxm,
			yhbh:obj.yhbh,
		
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 查询产品相关人员
export function queryProductParticipant(obj){
	let url =  window.baseurl + suburl + 'queryProductParticipant.do'
	return axios.get(url,{
		params:{
			xmbh:obj.xmbh,
			cpbh:obj.cpbh,
			cpmc:obj.cpmc
  		}
	})
}

// 添加外部人员
export function AddOutStaff(obj){
	let url = window.baseurl +suburl+"AddOutStaff.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			name:obj.name,
			telNum:obj.telNum,
			email:obj.email,
			pwd:obj.pwd,
			cpxdata:obj.cpxdata,
			rylx:obj.rylx,
			unitnum:obj.unitnum,
			unit:obj.unit,
			dept:obj.dept,
			sex:obj.sex,
			yhlb:obj.yhlb,
			isAllCpx:obj.isAllCpx
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取产品接口人
export function queryZjCpData(obj){
	let url =  window.baseurl + suburl + 'queryZjCpData.do'
	return axios.get(url,{
		params:{
            curPage:obj.curPage,
			pageSize:obj.pageSize,
			rylb:obj.rylb,
            keyword:obj.keyword
		}
	})
}

// 是否是问题团队
export function isgcXmtdbyWt(obj){
	let url =  window.baseurl + suburl + 'isgcXmtdbyWt.do'
	return axios.get(url,{
		params:{
			wid:obj.wid
  		}
	})
}


export function queryIntegral(obj){
	let url =  window.baseurl + suburl + 'queryIntegral.do'
	return axios.get(url,{
		params:{
          
		}
	})
}


// 获取单位用户
export function queryDwUsers(obj){
	let url =  window.baseurl + suburl + 'queryDwUsers.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			xmbh:obj.xmbh,
			unittype:obj.unittype,
			needShowCyz:obj.needShowCyz,
			keyword:obj.keyword
  		}
	})
}

// 获取登录用户可查看的用户
export function queryVisiblePerson(obj){
	let url =  window.baseurl + suburl + 'queryVisiblePerson.do'
	return axios.get(url,{
		params:{
			qygc:obj.qygc||''
  		}
	})
}

// 清空项目甲方责任人
export function clearProjectJfFzr(obj){
	let url = window.baseurl +suburl+"clearProjectJfFzr.do"
	return axios.post(url,{
			xmbh:obj.xmbh
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 获取用户产品线
export function getRyCpx(obj){
	let url =  window.baseurl + suburl + 'getRyCpx.do'
	return axios.get(url,{
		params:{
			yhbh:obj.yhbh,
			xmbh:obj.xmbh,

  		}
	})
}

// 保存用户（学校老师，合作伙伴）产品线 
export function saveRy(obj){
	let url =  window.baseurl + suburl + 'saveRy.do'
	return axios.post(url,{
			yhbh:obj.yhbh,
			yhxm:obj.yhxm,
			xmbh:obj.xmbh,
			cpxRy:obj.cpxRy,
			yhlb:obj.yhlb,
			isAllCpx:obj.isAllCpx
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 修改项目甲方责任人
export function modifyProjectJfFzr(obj){
	let url = window.baseurl +suburl+"modifyProjectJfFzr.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			yhbh:obj.yhbh,
			yhxm:obj.yhxm
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 修改项目已方责任人
export function modifyProjectManager(obj){
	let url = window.baseurl +suburl+"modifyProjectManager.do"
	return axios.post(url,{
			xmbh:obj.xmbh,
			yhbh:obj.yhbh,
			yhxm:obj.yhxm
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


export function getUsers(obj){
	let url =  window.baseurl + suburl + 'getUsers.do'
	return axios.get(url,{
		params:{
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			unitType:obj.unitType,
			keyword:obj.keyword,
			dept:obj.dept||''
  		}
	})
}
