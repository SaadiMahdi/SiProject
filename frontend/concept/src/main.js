import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { faUsers } from '@fortawesome/free-solid-svg-icons'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// library.add(faUsers, faUserSecret)
// Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
