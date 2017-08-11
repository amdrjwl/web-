<template>
	<div class="home">
		<div v-if='slidebanner.length'>
			<slide>
				<div v-for="item in slidebanner">
					<a :href="item.url">
						<img :src="item.pic" alt="" />
					</a>
				</div>
			</slide>
		</div>
		
		<div class="tit">推荐歌单<span>更多</span>
		</div>
		
		<scroll class="songlist" :data='songlist' ref='songlist'>
			
			<div class="mui-row" ref='row'>
				<div class="mui-col-xs-4" v-for='i in songlist'>
					<router-link :to="'/songlist/'+i.id">
					<img :src="i.coverImgUrl" alt="" width="100%"/>
					<p >{{i.name | newlength}}</p>
					</router-link>
				</div>
			</div>
			
		</scroll>
		
		
		
	</div>
</template>

<script>
	import scroll from './scroll'
	import {newlength} from '../assets/js/newlength'
	import slide from './slide'
	export default {
		data() {
			return {
				slidebanner: [],
				songlist:[]
			}
		},
		mounted() {
			this.rowhei=this.$refs.row
			this.$nextTick(function() {
				this.getbanner()
			})

		},
		methods: {
			getbanner() {
				let that = this

				this.$http.get('/banner').then((res) => {
					console.log(res.data.banners)

					that.slidebanner = res.data.banners

				})
				
				this.$http.get('/top/playlist/highquality').then((res)=>{
					that.songlist=res.data.playlists
					that.rowhei.style.height=that.songlist.length/3*179+"px"
					
				})
				
				
			}
		},
		components: {
			slide,
			scroll
		},
		filters:{
			newlength(date){
				return newlength(date,8)
			}
		}
	}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.home{
	.tit{
		color: #fff;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 15px;
		margin-top: 10px;
		padding: 2px 10px;
	}
	.songlist{
		height: 58vh;
		overflow: hidden;
		.mui-col-xs-4{
			padding: 5px;
		}
	}
}
</style>