<template>
	<div>

		<scroll class="songlist" ref="songlist" :data="data">
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" v-for='(i,index) in data' @click="played(i)">
					{{index+1}}.{{i.name}}

					<i class="Hui-iconfont Hui-iconfont-star-o" ref='coleindex' @click.stop='addlist(i.id)'></i>

				</li>

			</ul>
		</scroll>

	</div>
</template>

<script>
	import Scroll from './scroll'
	import { mapGetters } from 'vuex'
	export default {
		props: {
			data: {
				type: Array,
				default:[],
			},

		},

		computed: {
			...mapGetters([
				
			]),
		},
		methods: {
		
			played(i) {
				
				this.$store.dispatch('srcid',i.id)
				this.$store.dispatch('audioshow')
			},
			addlist(id){
				console.log(1)
				this.$store.dispatch("getcollect", id)	
			}

		},
		components: {
			Scroll
		}

	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.bg-image {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 70%;
		transform-origin: top;
		background-size: cover;
		filter: blur(5px);
	}
	
	.mui-row {
		position: absolute;
		top: 12vh;
		.mui-col-xs-5 {
			text-align: center;
		}
		.mui-col-xs-7 {
			h1 {
				display: block;
				font-size: 18px;
				color: #fff;
				font-weight: normal;
				margin-bottom: 5vh;
			}
			p {
				display: block;
				color: #fff;
			}
		}
	}
	
	.songlist {
		position: fixed;
		height: 62vh;
		width: 100%;
		overflow: hidden;
		.mui-table-view {
			background-color: rgba(255, 255, 255, 0.3)!important;
			li {
				color: #fff;
				z-index: 88887;
				i {
					float: right;
				}
			}
		}
	}
</style>