// 封装axios请求
const axios = require("axios")

export function request(config) {
    let instance = axios.create({
        baseURL: "http://127.0.0.1:3000",
        timeout: 3000,
        responseType: 'json',

    })

    // 请求拦截器 添加token 保证获取数据的权限
    // instance.interceptors.request.use(config => {
    //     config.headers.Authorization = window.sessionStorage.getItem("token")
    //     return config
    // })

    return instance(config) 
}