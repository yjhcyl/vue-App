// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from './components/goods/Goods.vue'
import Seller from './components/seller/Seller.vue'
import Ratings from './components/ratings/Ratings.vue'

import './common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  routes: [
    {path: '/', redirect: '/goods', component: Goods},
    {path: '/goods', component: Goods},
    {path: '/seller', component: Seller},
    {path: '/ratings', component: Ratings}
  ],
  linkActiveClass: 'active'
})
// router.push('/goods')

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
