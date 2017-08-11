import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import loadings from './components/loading/loading'

Vue.use(loadings)

import Vuelazyload from 'vue-lazyload'
Vue.use(Vuelazyload,{
	loading:require('./assets/default.png')
})
axios.interceptors.request.use(function(config){
	store.dispatch('showloading')
	return config;
},function(error){
	return Promise.reject(error)
})

axios.interceptors.response.use(function(response){
	store.dispatch('hideloading');
	return response
},function(error){
	return Promise.reject(error)
})




Vue.prototype.$http=axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
