import axios from 'axios'
import Qs from 'qs'

var suburl = 'service/'

// 用户投诉
export function complain(obj){
    let url = window.baseurl +suburl+"complain.do"
	return axios.post(url,{
          wid:obj.wid ||'',
          tslb:obj.tslb,
          xmmc:obj.xmmc,
          xmbh:obj.xmbh,
          cpdm:obj.cpdm,
          cpmc:obj.cpmc,
          tsbt:obj.tsbt,
          tsnr:obj.tsnr,
          tsdxData:obj.tsdxData,
          isedite:obj.isedite||""
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取投诉列表
export function complaintList(obj){
	let url =  window.baseurl + suburl + 'complaintList.do'
	return axios.get(url,{
		params:{
            curPage:obj.curPage,
            pageSize:obj.pageSize,
            keyword:obj.keyword,
            xmbh:obj.xmbh||'',
            type:obj.type||"",
            state:obj.state||"",
            qyzd:obj.qyzd,
            cb:obj.cb||""
		}
	})
}

// 获取投诉
export function getComplaint(obj){
	let url =  window.baseurl + suburl + 'getComplaint.do'
	return axios.get(url,{
		params:{
            wid:obj.wid
		}
	})
}


// 用户投诉回复
export function reply(obj){
    let url = window.baseurl +suburl+"reply.do"
	return axios.post(url,{
          tswid:obj.tswid,
          tslx:obj.tslx,
          ryData:obj.ryData||"",
          content:obj.content,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取投诉评论
export function getComments(obj){
	let url =  window.baseurl + suburl + 'getComments.do'
	return axios.get(url,{
		params:{
            curPage:obj.curPage,
            pageSize:obj.pageSize,
            tswid:obj.tswid
		}
	})
}

// 关闭投诉
export function closeComplaint(obj){
    let url = window.baseurl +suburl+"closeComplaint.do"
	return axios.post(url,{
          tswid:obj.tswid,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 编辑投诉
export function editComplain(obj){
    let url = window.baseurl +suburl+"editComplain.do"
	return axios.post(url,{
          wid:obj.wid,
          title:obj.title,
          content:obj.content,
          complaintObject:obj.complaintObject
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}


// 删除投诉
export function deleteComplain(obj){
    let url = window.baseurl +suburl+"deleteComplain.do"
	return axios.post(url,{
          wid:obj.wid,
	},{
		transformRequest: [function (data) {
　　data = Qs.stringify(data);
    return data;
  }]
})
}

// 获取投诉按钮权限
export function tsBtnAuth(obj){
	let url =  window.baseurl + suburl + 'tsBtnAuth.do'
	return axios.get(url,{
		params:{
            tswid:obj.tswid
		}
	})
}