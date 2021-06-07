import Vue from 'vue'
import vhrweb from "./vhrweb.vue";
import store from '../../store/index'
import router from "./router/index";
import Element from 'element-ui'
import '../../assets/css/scss/element-variables.scss'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(vhrweb)
}).$mount('#vhrweb')