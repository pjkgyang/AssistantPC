import axios from 'axios'
import Qs from 'qs'

var suburl = 'sys/'

// 当前用户信息
export function getLoginUser(){
	let url =  window.baseurl + suburl + 'getLoginUser.do'
	return axios.get(url,{
		
	})
}

// 获取当前用户拥有的系统
export function querySystem(){
	let url =  window.baseurl + suburl + 'querySystem.do'
	return axios.get(url,{
		
	})
}

// 退出登录
export function loginout(){
	let url =  window.baseurl + suburl + 'loginout.do'
	return axios.get(url,{
		
	})
}

// 获取用户菜单权限
export function queryHomePage(){
	let url =  window.baseurl + suburl + 'queryHomePage.do'
	return axios.get(url,{
		
	})
}


// 获取用户关联单位
export function getDwByUser(obj){
	let url =  window.baseurl + suburl + 'getDwByUser.do'
	return axios.get(url,{
		params:{
			dwlx:obj.dwlx,
			curPage:obj.curPage,
			pageSize:obj.pageSize,
			keyword:obj.keyword
		}
	})
}

// 获取当前用户包含的菜单权限
export function querySysPrivs(){
	let url =  window.baseurl + suburl + 'querySysPrivs.do'
	return axios.get(url,{
		
	})
}

// 获取单位
export function getUnits(obj){
	let url =  window.baseurl + suburl + 'getUnits.do'
	return axios.get(url,{
		params:{
			dwlx:obj.dwlx,
			keyword:obj.keyword
		}	
	})
}

// 获取单位部门
export function getDepts(obj){
	let url =  window.baseurl + suburl + 'getDepts.do'
	return axios.get(url,{
		params:{
			dwbh:obj.dwbh,
			dwmc:obj.dwmc
		}
	})
}

// 更改密码
export function changeLoginUserPwd(obj){
	let url = window.baseurl +suburl+"changeLoginUserPwd.do"
	return axios.post(url,{
			oldPwd:obj.oldPwd,
			newPwd:obj.newPwd,
			rePwd:obj.rePwd
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取用户消息分类开关
export function getMessageSwitch(obj){
	let url =  window.baseurl  + 'user/getMessageSwitch.do'
	return axios.get(url,{
		params:{
			
		}
	})
}

// 保存消息分类设置
export function saveMessageSwitch(obj){
	let url = window.baseurl +"user/saveMessageSwitch.do"
	return axios.post(url,{
			id:obj.id,
			value:obj.value,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取用户消息类型开关
export function getMessageTypeSwitch(obj){
	let url =  window.baseurl  + 'user/getMessageTypeSwitch.do'
	return axios.get(url,{
		params:{
			
		}
	})
}

// 保存消息类型设置
export function saveMessageTypeSwitch(obj){
	let url = window.baseurl +"user/saveMessageTypeSwitch.do"
	return axios.post(url,{
			id:obj.id,
			value:obj.value,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

