<template>
	<div id="app">
		<vheader ></vheader>
		<loading v-if='isshowloading'></loading>
		<router-view></router-view>
		
		
		<audiobox v-show="isshowbox"></audiobox>
		<collect v-show="isshowcollect"></collect>
		
	</div>
</template>

<script>
	import vheader from './components/header.vue'
	import collect from './components/collect.vue'
	import loading from './components/loading/loading.vue'
	import audiobox from './components/audiobox.vue'
	import { mapGetters } from 'vuex'
	export default {
		name: 'app',
		components: {
			vheader,
			audiobox,
			loading,
			collect
		},
		computed: {
			...mapGetters([
				'isshowloading',
				'isshowbox',
				'isshowcollect',
			])
		},
		
	}
</script>

<style>

</style>