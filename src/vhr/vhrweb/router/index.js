import vhrweb from "../vhrweb.vue";
import manage from '../views/manage'

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const routes = [
  {
    path: '/manage',
    name: 'manage',
    component: manage
  },
]

const router = new Router({
  routes,
  mode: "history",
  base: 'vhrweb'
})

export default router