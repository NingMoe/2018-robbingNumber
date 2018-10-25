import axios from 'axios'
import qs from 'qs'
import App from '../main'
// import store from '@/store'
// import * as types from '@/store/types'
const delayTime = 0; //设置相应时间超过100ms 才显示loading 否则不显示loading
let loadTimeout;
import router from '@/router'

axios.defaults.baseURL = '/ct_gn/ctm/macaoApi';  //本地
// axios.defaults.baseURL = '/gn/ctm/macaoApi';  //正式


axios.defaults.withCredentials = true;
/*
默认请求带loading效果，如果不需要loading,设置参数 auth: {
    noLoading: true
}
默认请求后，会对数据判断，如果报错，统一处理，
如果不需要统一处理的，设置参数 auth: {
    endNone: true
}

post请求在data后面加，如：
axios.post('xxxxurl',{
    name: ''
},{
    auth: {
        noLoading: true
    }
})

get请求增加格式
axios.get('xxxurl',{
    params: {
        name: 'xxx'
    },
    auth: {
        noLoading: true
    }
})
*/

axios.interceptors.request.use(config => {
    // if (!config.data) {
    //     config.data = {}
    // }
    // //配置 如果不是defaultData  data自动添加渠道值 channel 2
    // if (!(config.auth && config.auth.defaultData)) {
    //     config.data = Object.assign(config.data,{channel: 2});
    // }
    if (!(config.auth && config.auth.noLoading)) {
        loadTimeout = setTimeout(() => {
            //store.commit(types.UPHTTPLOADING,true);
            App.$indicator.open('加载中...')
        },delayTime)
        //alert('前置过滤器');
    }
    
    if (!(config.auth && config.auth.defaultData)) {
        config.data = qs.stringify(config.data);
    }
    // config.data = qs.stringify(config.data);
    return config
},function (error) {
    clearTimeout(loadTimeout);
    App.$indicator.close();
    // store.commit(types.UPHTTPLOADING,false);
    return Promise.reject(error)
})


axios.interceptors.response.use(response => {
    if (!(response.config.auth && response.config.auth.endNone)) {
        //请求成功后，根据数据进行判断，提示语或者返回首页
        // console.log(router.currentRoute.fullPath)
        //console.log(response)
        if (!response.data.meta.success && response.data.meta.isindex == 1) {  //返回首页
            // App.$messagebox.alert(response.data.meta.message, '提示',{
            //     callback: action => {
            //         router.push({path: '/'})
            //     }
            // });
            App.$messagebox.alert(response.data.meta.message,{
                title: '提示',
                confirmButtonText: '確定'
            }).then(res => {
                router.push({path: '/'})
            })
        }
        else if (!response.data.meta.success && response.data.meta.isindex != 1) {
            // App.$messagebox.alert(response.data.meta.message,'提示')
            App.$messagebox.alert(response.data.meta.message,{
                title: '提示',
                confirmButtonText: '確定'
            })
        }
    }
    clearTimeout(loadTimeout);
    App.$indicator.close();
    // store.commit(types.UPHTTPLOADING,false);
    return response
},function (error) {
    if (!(error.response.config.auth && error.response.config.auth.endNone)) {
        switch (error.response.status) {
            case 404:
                App.$messagebox.alert('系統異常，請稍後再試',{
                    title: '提示',
                    confirmButtonText: '確定'
                })
                break;
            case 500:
                App.$messagebox.alert('網絡異常，請稍後再試',{
                    title: '提示',
                    confirmButtonText: '確定'
                })
                break;
            default:
                App.$messagebox.alert('網絡異常，請稍後再試',{
                    title: '提示',
                    confirmButtonText: '確定'
                })
        }
    }
    clearTimeout(loadTimeout);
    App.$indicator.close();
    // store.commit(types.UPHTTPLOADING,false);
    return Promise.reject(error)
})


export default axios