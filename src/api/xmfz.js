import axios from 'axios'
import Qs from 'qs'

var suburl = 'project/'

// 获取项目产品目录
export function getProjectCatalog(obj){
	let url =  window.baseurl + suburl + 'getProjectCatalog.do'
	return axios.get(url,{
			params:{
			xmbh:obj.xmbh,
		}
	})
}

// 修改svn路径
export function updateSvnUrl(obj){
    let url = window.baseurl +suburl+"updateSvnUrl.do"
	return axios.post(url,{
		xmbh:obj.xmbh,
		svn:obj.svn
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 获取svn路径
export function getXmFileUrl(obj){
	let url =  window.baseurl + suburl + 'getXmFileUrl.do'
	return axios.get(url,{
			params:{
			xmbh:obj.xmbh,
		}
	})
}