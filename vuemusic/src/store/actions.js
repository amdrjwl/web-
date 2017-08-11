import * as type from './type'

export default{
	showloading:({commit})=>{
		commit(type.SHOWLOADING)
	},
	hideloading:({commit})=>{
		commit(type.HIDELOADING)
	},
	isshowtab:({commit})=>{
		commit(type.ISSHOWTAB)
	},
	isshowtabshow:({commit})=>{
		commit(type.ISSHOWTABSHOW)
	},
	isbackfalse:({commit})=>{
		commit(type.ISBACKFALSE)
	},
	isback:({commit})=>{
		commit(type.ISBACK)
	},
	srcid:({commit},param)=>{
		commit(type.SRCID,param)
	},
	audioshow:({commit})=>{
		commit(type.AUDIOSHOW)
	}
}
