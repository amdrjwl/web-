<template>
	<div class="songlist">
		<div class="bgimage" ref='bgimage' :style='bgstyle'>
			
		</div>
		
		<div class="mui-row">
			<div class="mui-col-xs-5">
				<img :src="bgdesc.backgroundUrl" alt="" width="90%"/>
			</div>
			<div class="mui-col-xs-7">
				<h1 class="title">{{bgdesc.nickname}}</h1>
				<p>{{bgdesc.signature}}</p>
			</div>
		</div>
		<musiclist :data="songlist" v-if="songlist"></musiclist>
	</div>
</template>

<script>
	import musiclist from './musiclist'
	export default{
		data(){
			return	{
				bgimage:'',
				bgdesc:{},
				songlist:[]
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this.getdata(this.$route.params.id)
			})
		},
		computed:{
			bgstyle(){
				return `background:url(${this.bgimage})`
			}
		},
		methods:{
			getdata(id){
				let that=this
				this.$http.get('/playlist/detail?id='+id).then((res)=>{
					that.bgdesc=res.data.playlist.creator
					that.bgimage=res.data.playlist.creator.backgroundUrl
					that.songlist=res.data.playlist.tracks
				})
			}
		},
		components:{
			musiclist
		}
	}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
	.songlist{
		.bgimage{
			width: 100%;
			position: relative;
			height: 0;
			padding-top:60%;
			background-size:cover;
			filter:blur(5px)
		}
		.mui-row{
			position: absolute;
			top:12vh;
			.mui-col-xs-5{
				text-align: center;
			}
			.mui-col-xs-7{
				h1{
					color: #fff;
					font-weight: normal;
					font-size: 18px;
					margin-bottom: 5vh;
				}
				p{
					color: #fff;
				}
			}
		}
	}
</style>