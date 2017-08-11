import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import singer from '@/components/singer'
import member from '@/components/member'
import songlist from '@/components/songlist'
Vue.use(Router)

export default new Router({
	linkActiveClass:'active',
  routes: [
   	{
   		path:'/',
   		redirect:'/home'
   	},
   	{
   		path:'/home',
   		component:home
   	},
   		{
   		path:'/singer',
   		component:singer
   	},
   		{
   		path:'/member',
   		component:member
   	},
   	{
   		path:'/songlist/:id',
   		component:songlist
   	}
  ]
})
