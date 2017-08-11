import * as type from './type'
import Vue from 'vue'
import axios from 'axios'
import { playmode } from '../assets/js/config'
import { contains } from '../assets/js/dom';
const state = {
	isshowloading: false,
	isback: false,
	isshowsearch: true,
	isshowbox: false,
	srcid: '',
	isshowcollect: false,
	isplaying: false,
	collects:[],
	playlist:[],
	mode:0,
}

const mutations = {
	[type.CLEAR](state, obj) {

		state.collects.splice(0, state.collects.length)
		localStorage.setItem('collect2', JSON.stringify(state.collects))

	},
	[type.SHOWLOADING](state) {
		state.isshowloading = true
	},
	[type.HIDELOADING](state) {
		state.isshowloading = false
	},
	[type.ISBACKFALSE](state) {
		state.isback = false;
	},
	[type.ISBACK](state) {
		state.isback = true;
	},
	[type.ISSHOWSEARCHSHOW](state) {
		state.isshowsearch = true;
	},
	[type.ISSHOWSEARCH](state) {
		state.isshowsearch = false;
	},
	[type.AUDIOSHOW](state) {
		state.isshowbox = !state.isshowbox;
	},
	[type.SRCID](state, obj) {
		state.srcid = obj;
	},
	[type.ISPLAYING](state) {
		state.isplaying = true;
	},
	[type.NOPLAYING](state) {
		state.isplaying = false;
	},
	[type.ISSHOWCOLLECT](state) {

		state.isshowcollect = !state.isshowcollect;
	},
	[type.GETCOLLECT](state, obj) {
		console.log(typeof(Storage))
		let songinfo;
		if(contains(state.collects, obj)) {
			mui.toast('您已经添加过了')
			return
		} else {
			mui.toast('已加入我的收藏夹')
		}
		axios.get('/song/detail?ids=' + obj).then((res) => {

			songinfo = res.data.songs;
			state.collects.push({
				id: obj,
				name: songinfo[0].name,
				arname: songinfo[0].ar[0].name
			})

			localStorage.setItem('collect2', JSON.stringify(state.collects))

		})

	},
	[type.SET_PLAY_MODE](state, modes) {
		
		state.mode = modes
		console.log(state.mode)
	},
	[type.SET_PLAYLIST](state, list) {
  
    state.playlist = list
  },

}

const getters = {
	isshowloading(state) {
		return state.isshowloading
	},
	isback(state) {
		return state.isback;
	},
	isshowsearch(state) {
		return state.isshowsearch
	},
	isshowbox(state) {
		return state.isshowbox;
	},
	srcid(state) {
		return state.srcid;
	},
	isplaying(state) {
		return state.isplaying;
	},
	isshowcollect(state) {
		return state.isshowcollect;
	},
	collects(state) {
		state.collects = JSON.parse(localStorage.getItem('collect2') || '[]')
		return state.collects
	},
	mode(state) {
		return state.mode;
	},
	playlist(state){
		state.playlist = JSON.parse(localStorage.getItem('collect2') || '[]')
		return state.playlist
	},
}

export default {
	state,
	mutations,
	getters
}