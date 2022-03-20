// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';
export default [{
        path: "/home",
        //路由懒加载
        component: () =>
            import ('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        path: "/search/:keyword?",
        component: () =>
            import ('@/pages/Search'),
        meta: { show: true },
        name: "search"
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true }
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next();
            } else {
                //中断路由导航;停留在from的路径
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next();
            } else {
                //中断路由导航;停留在from的路径
                next(false)
            }
        }

    },
    {
        path: "/paysuccess",
        // 该写法是路由懒加载
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: "/center",
        // 该写法是路由懒加载
        component: Center,
        meta: { show: true },
        children: [{
                // 子路由path若要写斜杠/，要把路径写完整
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    // 重定向;用户首次访问的路径
    {
        path: '/',
        redirect: 'home'
    }
]