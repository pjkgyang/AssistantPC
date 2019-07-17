import axios from 'axios'
import Qs from 'qs'

var suburl = 'report/'

// 问题跟踪报表
export function wtztqkReport(obj){
	let url =  window.baseurl + suburl + 'wtztqkReport.do'
	return axios.get(url,{
          params:{
            dwlx:obj.dwlx,
            qyzd:obj.qyzd
          }
	})
}

// 遗留问题报表
export function ylWtReportByCpx(obj){
	let url =  window.baseurl + suburl + 'ylWtReportByCpx.do'
	return axios.get(url,{
          params:{
            curPage:obj.curPage,
            pageSize:obj.pageSize,
            dwlx:obj.dwlx,
            qyzd:obj.qyzd,
            cpxbh:obj.cpxbh,
            sjlb:obj.sjlb,
            xx:obj.xx||'',
            lx:obj.lx,
            wtzt:obj.wtzt,
            gbStartDt:obj.gbStartDt||"",
            gbEndDt:obj.gbEndDt||"",
            wtStart:obj.wtStart,
            wtEnd:obj.wtEnd,
            keyword:obj.keyword
          }
    	})
}

// 区域日报报表
export function qyRbReport(obj){
	let url =  window.baseurl + suburl + 'qyRbReport.do'
	return axios.get(url,{
          params:{
            startDt:obj.startDt,
            endDt:obj.endDt,
            qymc:obj.qymc
          }
    	})
}


// 区域日报明细
export function qyRbMxReport(obj){
	let url =  window.baseurl + suburl + 'qyRbMxReport.do'
	return axios.get(url,{
          params:{
            rq:obj.rq,
            qymc:obj.qymc,
            ryfw:obj.ryfw,
            zdwid:obj.zdwid
          }
    	})
}

// 获取区域战队
export function getQyzd(obj){
	let url =  window.baseurl + 'dict/getQyzd.do'
	return axios.get(url,{
          params:{
            qymc:obj.qymc||""
          }
    	})
}



// 获取某人某天的工作日报
export function getPersonalWorkLog(obj){
	let url =  window.baseurl + 'process/getPersonalWorkLog.do'
	return axios.get(url,{
          params:{
            yhbh:obj.yhbh,
            rq:obj.rq
          }
    	})
}

// 问题评分日报 区域
export function WtReportOrderStar(obj){
	let url =  window.baseurl + suburl + 'WtReportOrderStar.do'
	return axios.get(url,{
          params:{
            curPage:obj.curPage,
            pageSize:obj.pageSize,
            gbsjStart:obj.gbsjStart,
            gbsjEnd:obj.gbsjEnd,
            cpxbh:obj.cpxbh,
            dwlx:obj.dwlx,
            xmlx:obj.xmlx,
          }
    	})
}

// 区域学校用户报表
export function queryregionSchoolQuestionLst(obj){
	let url =  window.baseurl + suburl + 'queryregionSchoolQuestionLst.do'
	return axios.get(url,{
          params:{
            xmlx:obj.xmlx,
            startDate:obj.startDate,
            endDate:obj.endDate
          }
    	})
}
