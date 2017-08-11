<template>
	<div class="musiclist">
		<scroll class="songlist" ref='songlist' :data='data'>
			<ul class="mui-table-view">
				<li class="mui-table-view-cell" v-for="i in data" ref='listli' @click="played(i)">{{i.name}}
			        <i class="Hui-iconfont Hui-iconfont-star-o"></i>
			    </li>
			</ul>
		</scroll>
	</div>
	
	
</template>

<script>
	import scroll from './scroll'
	export default{
		props:{
			data:{			
				type:Array,
				default:[],
			}
		},
	
		methods:{
			played(i){
				this.$store.dispatch('srcid',i.id)
				this.$store.dispatch('audioshow')
			}
		},
		components:{
			scroll,
		}
	}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
	.musiclist{
	
		.songlist{
			position: fixed;
			width: 100%;
			overflow: hidden;
			height: 60vh;
		
	
		.mui-table-view{
			background: rgba(255,255,255,0.3)!important;
		
			li{
				color: #fff;
				i{
					float: right;
				}
			}
		}
	}
	
}
</style>