import axios from 'axios'
import Qs from 'qs'

var suburl = 'notice/'

// 获取通知列表
export function getMessages(obj){
    let url =  window.baseurl + suburl + 'getMessages.do'
    return axios.get(url,{
		params:{
            curPage:obj.curPage,
            pageSize:obj.pageSize,
            keyword:obj.keyword ||"",
            isread:obj.isread
		}
	})
}

// 查看通知
export function readMessage(obj){
    let url =  window.baseurl + suburl + 'readMessage.do'
    return axios.get(url,{
		params:{
            wid:obj.wid
		}
	})
}

// 查看通知
export function readAllMessages(obj){
      let url =  window.baseurl + suburl + 'readAllMessages.do'
      return axios.get(url,{
              params:{
                  
              }
        })
  }
  
