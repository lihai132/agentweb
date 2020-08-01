import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: {
                title: '首页'
            },
            children: [{
                    path: '/customerOrder',
                    component: () => import( /* webpackChunkName: "dashboard" */ '../components/page/customerOrder.vue'),
                    meta: {
                        title: '客户订单',
                        requiresAuth: true
                    }
                },
                {
                    path: '/customerWaybill',
                    component: () => import( /* webpackChunkName: "icon" */ '../components/page/customerWaybill.vue'),
                    meta: {
                        title: '客户运单',
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            component: () => import( /* webpackChunkName: "login" */ '../components/Login/Login.vue'),
            meta: {
                title: '登录'
            }
        }
    ]
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        //如需鉴权，则先拿到保存在localStrorage里面的信息，然后再判断
        let cookies = document.cookie;

        if (cookies.length > 0) {
            console.log(111)
            let arrCookie = cookies.split(";");
            let token = false;
            if (arrCookie.length == 1) {
                for (var i = 0; i < arrCookie.length; i++) {
                    var arr = arrCookie[i].split("=");
                    console.log(arr)
                    if ("token" == arr[0]) {
                        token = true;

                    }
                }
                // console.log(token)
                if (token) {
                    next();
                } else {
                    next('/login');
                }
            } else {
                for (var i = 0; i < arrCookie.length; i++) {
                    var arr = arrCookie[i].split("=");
                    console.log(arr)
                    if (" token" == arr[0]) {
                        token = true;

                    }
                }
                // console.log(token)
                if (token) {
                    next();
                } else {
                    next('/login');
                }
            }



        } else {
            next('/login');
        }
    } else {
        next();
    }

});

export default router;