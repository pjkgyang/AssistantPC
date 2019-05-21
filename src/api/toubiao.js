import axios from 'axios'
import Qs from 'qs'

var suburl = 'tbxx/'



// 获取投标信息
export function queryTbxx(obj){
	let url =  window.baseurl + suburl + 'queryTbxx.do'
	return axios.get(url,{
		params:{
          curPage:obj.curPage,
          pageSize:obj.pageSize,
          keyword:obj.keyword||"",
          gczd:obj.gczd||"",
          zbzt:obj.zbzt||"",
          fbxz:obj.fbxz||"",
          zzdy:obj.zzdy||"",
          sfgx:obj.sfgx||""
		}
	})
}
// 查询合同信息
export function queryXmTbxx(obj){
    let url =  window.baseurl + suburl + 'queryXmTbxx.do'
    return axios.get(url,{
		params:{
          xmbh:obj.xmbh,
          fbbh:obj.fbbh
		}
	})
}

// 查询分包信息
export function queryFbxx(obj){
    let url =  window.baseurl + suburl + 'queryFbxx.do'
    return axios.get(url,{
		params:{
          fbbh:obj.fbbh
		}
	})
}

// 发起投标
export function tbxq(obj){
    let url =  window.baseurl + suburl + 'tbxq.do'
    return axios.get(url,{
		params:{
          fbbh:obj.fbbh
		}
	})
}

// 保存投标信息
export function saveTbxx(obj){
	let url = window.baseurl +suburl+"saveTbxx.do"
	return axios.post(url,{
          fbbh:obj.fbbh,
          tbfy:obj.tbfy,
          tbly:obj.tbly || ''
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}