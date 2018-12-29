
import axios from 'axios';
import { Loading, Message, MessageBox } from 'element-ui';
import Qs from 'qs';

// axios.defaults.headers.common['token'] = ''
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/**
 * @method get
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * @method post
 * @param url
 * @param data
 * @returns {Promise} 
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            transformRequest: [function (data) {
                data = Qs.stringify(data);
                return data;
            }]
        }).then(response => {
            resolve(response.data);
        }, err => {
            reject(err)
        })
    })
}

let loading        //定义loading变量


function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {
    loading.close()
}
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
let overtimeRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

axios.defaults.timeout = 30000

axios.interceptors.request.use(config => {
    showFullScreenLoading();
    return config;
}, error => {
    if (!!getCookie('access_token')) {
        MessageBox.alert('请求超时...', '提示', {
            type: 'error',
            confirmButtonText: '确定',
        });
    }
    tryHideFullScreenLoading();
    return Promise.reject(error)
})


// http响应拦截器
axios.interceptors.response.use(
    response => {
        // if(getCookie('access_token')){
        //     window.location.href = 'http://careful.wisedu.com/emap/sys/assistantauth/home/login.do?redirect_url=' + encodeURIComponent('http://careful.wisedu.com/#/');
        //  }
        // if (response.headers && (response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/vnd.ms-excel')) {
        //     downloadUrl(response.request.responseURL)
        //     return {data:{rCode:'success'}}
        //   }
        tryHideFullScreenLoading();
        return response;

    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    if (sessionStorage.getItem('Detailpannel')) {
                        window.location.href = 'http://careful.wisedu.com/emap/sys/assistantauth/home/login.do?redirect_url=' + encodeURIComponent('http://careful.wisedu.com/' + sessionStorage.getItem('Detailpannel'));
                    } else {
                        window.location.href = 'http://careful.wisedu.com/emap/sys/assistantauth/home/login.do?redirect_url=' + encodeURIComponent('http://careful.wisedu.com/#/');
                    }
                    break;
                default:
                    break;
            }
        }
        if (!!getCookie('access_token')) {
            MessageBox.alert('请求超时...', '提示', {
                type: 'error',
                confirmButtonText: '确定',
            });
        }
        tryHideFullScreenLoading();
        return Promise.reject(error);
    })

export default axios
