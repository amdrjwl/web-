import * as type from './type'

const state={
	isshowloading:false,
	isshowtab:true,
	isback:false,
	isshowaudio:true,
	srcid:'347230'
}

const mutations={
	[type.SHOWLOADING](state){
		state.isshowloading=true
	},
	[type.HIDELOADING](state){
		state.isshowloading=false
	},
	[type.ISSHOWTAB](state){
		state.isshowtab=false
	},
	[type.ISSHOWTABSHOW](state){
		state.isshowtab=true
	},
	[type.ISBACK](state){
		state.isback=true
	},
	[type.ISBACKFALSE](state){
		state.isback=false
	},
	[type.SRCID](state,sid){
		console.log(sid)
		state.srcid=sid
	},
	[type.AUDIOSHOW](state){
		state.isshowaudio=true
	}
	
}

const getters={
	isshowloading(state){
		return state.isshowloading
	},
	isshowtab(state){
		return state.isshowtab
	},
	isback(state){
		return state.isback
	},
	isshowtab(state) {
		return state.isshowtab
	},
	isshowaudio(state){
		return state.isshowaudio
	},
	srcid(state){
		return state.srcid
	}
}


export default{
	state,
	mutations,
	getters
}
