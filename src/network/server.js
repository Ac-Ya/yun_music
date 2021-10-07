import axios from 'axios'
import qs from "qs"


function request() {
    let instance = axios.create({
        baseURL: 'http://120.27.210.24:8889',
        timeout: 10000,
    })
    instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    instance.defaults.withCredentials = true;
    //请求拦截
    instance.interceptors.request.use(config => {
        //请求成功时执行
        //获取本地存储中的token
        // let token = localStorage.getItem('token');
        // token && (config.headers.Authorization = token);
        let cookie = localStorage.getItem('cookie')
        return config;
    }, error => {//请求失败时执行
        return Primise.reject(error)
    }
    )
    //响应拦截
    instance.interceptors.response.use(response => {
        return response;
    }, error => {//拦截失败
        let { response } = error;
        console.log(response);
        if (response) {
            switch (response.status) {
                case 401://权限问题,提示未登录或无权限等；
                    break;
                case 403://服务器拒绝执行 （token过期）
                    break;
                case 404://找不到页面
                    break;
            }
        } else {
            //服务器连结果都没有返回
            if (!window.navigator.onLine) {
                //断网处理：跳转断网页面/提示网络错误等等
                return;
            }
            return Promise.reject(error)
        }
    }
    )
    return instance
}

export function get(url,params){
    return request().get(url,params)
}
export function post(url, data) {
    data = qs.stringify(data)
    return request().post(url,data)
}