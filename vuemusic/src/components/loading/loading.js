const loading=require('./loading.vue')

const loadings={
	install:function(Vue){
		Vue.component('loading',loading)
	}
}


module.exports=loadings