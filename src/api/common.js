import axios from 'axios'
import Qs from 'qs'


export function getResponsibleTaskList(obj){
    var url = window.baseurl + "dict/getDictEnum.do";
    return axios.get(url,{
		params:{
                  name: obj.name,
                  code:obj.code||"",
                  isInterface: obj.isInterface || ''
		}
	})
}


// 问题是否编辑
export function isEdit(obj){
      var url = window.baseurl + "question/isEdit.do";
      return axios.get(url,{
            params:{
                  wid:obj.wid
            }
        })
  }
  