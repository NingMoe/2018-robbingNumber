//路由引入结束
Vue.use(VueRouter)
import App from '../main'
const router = new VueRouter({
    mode: 'history',
    base: '/ct_gn',  //uat
    routes: [
        {
            path: '/',
            component: resolve => {
                require(['@/views/index'],resolve)
            }
        },
        // {
        //     path: '/preheating', //预热
        //     component: resolve => {
        //         require(['@/views/preheating'],resolve)
        //     }
        // },
        {
            path: '/pairentry',  //配对入口页面
            component: resolve => {
                require(['@/views/pairentry'],resolve)
            }
        },
        {
            path: '/pairSuccess',  //配对成功
            component: resolve => {
                require(['@/views/pairsuccess'],resolve)
            }
        },
        {
            path: '/matchchinanumbynum',  //按号码匹配内地副号码
            component: resolve => {
                require(['@/views/matchChinaNumByNum'],resolve)
            }
        },
        {
            path: '/matchchinanumbyself',  //通过心怡号码匹配
            component: resolve => {
                require(['@/views/matchChinaNumBySelf'],resolve)
            }
        },
        {
            path: '/matchchinanumnone',  //通过心怡号码匹配
            component: resolve => {
                require(['@/views/matchChinaNumNone'],resolve)
            }
        },
        {
            path: '/reservesuccess',  //号码匹配预留成功
            component: resolve => {
                require(['@/views/reserveSuccess'],resolve)
            }
        },
        {
            path: '/searchinfo',  //查询输入信息
            component: resolve => {
                require(['@/views/searchInfo'],resolve)
            }
        },
        {
            path: '/searchdetail',  //查询结果页面
            component: resolve => {
                require(['@/views/searchDetail'],resolve)
            }
        },
        {
            path: '/onecardentry',  //一卡雙號入口
            component: resolve => {
                require(['@/views/oneCardEntry'],resolve)
            }
        },
        {
            path: '/onecardsuccess',  //一卡雙號成功
            component: resolve => {
                require(['@/views/oneCardSuccess'],resolve)
            }
        },
        {
            path: '/onecardmatchnumbyself',  //一卡雙號通过心怡号码匹配
            component: resolve => {
                require(['@/views/oneCardMatchNumBySelf'],resolve)
            }
        },
        
    ],
    scrollBehavior (to, from, savedPosition) {
        if (to.fullPath.split("/").length <= 2) {
            return { x: 0, y: 0 }
        }
    }
})

// router.afterEach( ( to, from, next ) => {
//     setTimeout(()=>{
//             var _hmt = _hmt || [];
//             (function() {
//                 //每次执行前，先移除上次插入的代码
//                 document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove();
//                 var hm = document.createElement("script");
//                 hm.src = "https://hm.baidu.com/hm.js?b196fa86f40906c5d43a71c3b67d9dfc";
//                 hm.id = "baidu_tj"
//                 var s = document.getElementsByTagName("script")[0];
//                 s.parentNode.insertBefore(hm, s);
//             })();
//     },0);
// } );

router.afterEach((to,from,next) => {
    setTimeout(() =>{
        App.$ba.trackPageview(to.path)
    },0)
})


export default router