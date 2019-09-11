import VueRouter from 'vue-router'
//导入对应的路由组件
import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Seller from './components/seller/Seller.vue'

var router = new VueRouter({
    routes:[
        { path:'/',redirect: '/goods' },
        { path:'/goods', component: Goods },
        { path:'/ratings', component: Ratings },
        { path:'/seller', component: Seller },
    ],
    linkActiveClass: 'active'   //覆盖默认的路由高亮的类，默认的类叫做router-link-active
})


export default router












