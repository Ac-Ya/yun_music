// 封装axios请求
const axios = require("axios")

export function request(config) {
    let instance = axios.create({
        baseURL: "http://127.0.0.1:3000",
        timeout: 3000,
        responseType: 'json',
        withCredentials: true
    })

    // 请求拦截器 添加token 保证获取数据的权限
    // instance.interceptors.request.use(config => {
    //     
    //     return config
    // })

    instance.interceptors.request.use(config => {
        config.Cookie = window.localStorage.getItem('cookie')
        return config
    }, err => {
        console.log(err);
    });

    instance.interceptors.response.use(config => {
        return config;
    }, err => {
        console.log([err]);
        if (err.response.data.msg == '需要登录') {
            // cookie过期 退出登录
            // console.log(window.localStorage.getItem("userInfo"));
            // window.localStorage.setItem("userInfo", "");
            // 刷新页面
            // history.go(0)
            // 修改当前的登录状态
            // this.state.isLogin = false;
            console.log(err.response.data.msg);

        } else {
            console.log(err.response.data.msg);
        }
    });
    // instance.defaults.withCredentials = true;

    return instance(config) 
}