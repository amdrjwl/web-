<template>
	<div class="audiobox">
	 	<div class="background">
	 		<img :src="songinfo.al.picUrl"/>
		</div>
		<div class="backmore">
			<span class="mui-icon mui-icon-back"></span>
			<span>更多</span>
		</div>
		<div class="picbg" v-show="!islrc">
			<div>
				<img :src="songinfo.al.picUrl" alt="" width="250vh" height="250vh" class="picurl" />
				<span @click="showlrc()">歌词</span>
			</div>
			<div class="songinfo">
				{{songinfo.name}}
				<br />
				{{songinfo.ar[0].name}}
			</div>
		</div>
		
		<div class="lrcscroll" v-if="islrc" @click='showlrc()'>
				{{songinfo.name}}
				<br />
				{{songinfo.ar[0].name}}
				<scroll class='divscroll' ref="lyriclist">
					<div class="amd">
						<div class="lrcrow" v-for="i in lrc">{{i}}</div>
						
					</div>
				</scroll>
		</div>
		
		<div class="player">
			<div class="progress">
				<div class="now" style="width:70%"></div>
			</div>
			<div class="flexse">
				<div>0000</div>
				<div>0000</div>
			</div>
			
			<div class="played">
				<i class="Hui-iconfont Hui-iconfont-huanyipi"></i>
				<i class="Hui-iconfont Hui-iconfont-shangyishou"></i>
				<i class="Hui-iconfont Hui-iconfont-bofang"></i>
				<i class="Hui-iconfont Hui-iconfont-huanyipi"></i>
				<i class="Hui-iconfont Hui-iconfont-huanyipi"></i>
			</div>
		</div>
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				songurl:'',
				lrc:'',
				songinfo:'',
				islrc:false
			}
		},
		computed:{
			...mapGetters([
				'srcid'
			])
		},
		mounted(){
				this.init()
		},
		watch:{
			srcid(){
				this.init()
			}
		},
		methods:{
			init(){
				let that=this
				this.$http.get('/music/url?id='+this.srcid).then((res)=>{
					console.log(res.data)
					that.songurl=res.data.data[0].url
				})
				this.$http.get('/lyric?id='+this.srcid).then((res)=>{
					console.log(res.data)
					that.lrc=res.data.lrc
				})
				
				this.$http.get('/song/detail?ids='+this.srcid).then((res)=>{
					
					that.songinfo=res.data.songs[0]
				})
			},
			showlrc(){
				this.islrc=!this.islrc 
			}
		}
		
	}
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
	.audiobox {
		color: #FCFCFC;
		z-index: 999;
		position: fixed;
		background: rgba(0, 0, 0, 0.7);
		height: 100%;
		top: 0;
		width: 100%;
		.background {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			opacity: 0.8;
			filter: blur(20px);
		}
		.backmore {
			margin-top: 10px;
			padding: 2px 10px;
			
			
			display: flex;
			
			
			flex-direction: row;
			justify-content: space-between;
		}
		.picbg {
			text-align: center;
			width: 100%;
			position: relative;
			margin-top: 15vh;
			.picurl {
				border-radius: 50%;
				border: 4px solid;
				border-color: #956AD1 #4976B9;
				margin: 0 auto;
				animation: rotate_mus 20s linear infinite;
			}
			span {
				position: absolute;
				bottom: 10vh;
				right: 60px;
				display: block;
				background: rgba(71, 71, 71, 0.9);
				padding: 5px;
				font-size: 12px;
				border-radius: 7px;
			}
			.songinfo {
				text-align: center;
				padding-top: 5vh;
			}
		}
		@keyframes rotate_mus {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
		.lrcscroll {
			padding-top: 20px;
			background: rgba(51, 51, 51, 0.2);
			width: 100%;
			height: 70vh;
			padding-bottom: 5.4rem;
			text-align: center;
			.divscroll {
				overflow: hidden;
				height: 60vh;
				.amd {
					.lrcrow {
						font-size: 14px;
						color: #F3F3F3;
						margin-top: 10px;
						&.selectrow {
							color: yellow
						}
					}
				}
			}
		}
		.player {
			position: absolute;
			bottom: 0;
			left: 50%;
			margin-left: -45%;
			width: 90%;
			height: 17vh;
			.progress {
				position: absolute;
				width: 100%;
				height: 3px;
				background: #CCC;
				.now {
					height: 3px;
					background: #fff;
					position: absolute;
					&:after {
						content: "";
						left: 100%;
						position: absolute;
						background: #fff;
						width: 13px;
						top: -0.6vh;
						border-radius: 50%;
						height: 13px;
					}
				}
			}
			.flexse {
				font-size: 13px;
				margin-top: 5px;
				display: flex;
				justify-content: space-between;
			}
			.played {
				display: flex;
				margin-top: 2vh;
				justify-content: space-between;
				align-items: center;
				i:nth-child(2) {
					font-size: 36px
				}
				i:nth-child(3) {
					font-size: 36px
				}
				i:nth-child(4) {
					font-size: 36px
				}
			}
		}
	}
</style>