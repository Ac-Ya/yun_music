// 封装axios请求
const axios = require("axios")

axios.defaults.withCredentials=true;
export function request(config) {
    let instance = axios.create({
        baseURL: "http://127.0.0.1:3000",
        timeout: 20000,
        withCredentials: true
    })

    // 请求拦截器 添加token 保证获取数据的权限
    // instance.interceptors.request.use(config => {
    //     
    //     return config
    // })

    instance.interceptors.request.use(config => {
        // console.log(document.cookie);
        // console.log(config);
        // config.Cookie = document.cookie
        config.credentials  = true
        return config
    }, err => {
        console.log(err);
    });

    // instance.interceptors.response.use(config => {
    //     // console.log(config);
    //     return config;
    // }, err => {
    //     console.log([err]);
    //     if (err.response.data.msg == '需要登录') {
           
    //         // console.log(err.response.data.msg);

    //     } else {
    //         console.log(err.response.message);
    //     }
    // });
    // instance.defaults.withCredentials = true;
    return instance(config) 
}