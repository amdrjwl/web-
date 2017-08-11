<template>
	<div id="app">
		<vheader></vheader>
		<router-view></router-view>
		
		<audiobox v-show="isshowaudio"></audiobox>
	</div>
</template>

<script>
	import vheader from './components/header.vue'
	import audiobox from './components/audiobox.vue'
	import { mapGetters } from 'vuex'
	export default {
		name: 'app',
		computed:{
			...mapGetters([
				"isshowaudio"
			])
		},
		components: {
			vheader,
			audiobox
		}
	}
</script>

<style>
	#app{
		
	}
</style>