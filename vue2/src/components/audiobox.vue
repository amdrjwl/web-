<template>
	<div class="audiobox">
		<div class="background">
			<img :src="songinfo[0].al.picUrl" />
		</div>
		<div class="backmore"><span class="mui-icon mui-icon-arrowdown" @click="isshow()"></span>
			<span>更多</span>
		</div>
		<div class="picbd" v-show="!islrc">
			<div>
				<img :src="songinfo[0].al.picUrl" width="250vh" height="250vh" class="picurl" />
				<span @click="showlrc()">歌词</span>
			</div>
			<div class="songinfo">
				{{songinfo[0].name}}
				<br> {{songinfo[0].ar[0].name}}

			</div>
		</div>
		<div class="lrcscroll" v-if="islrc" @click="showlrc()">
			{{songinfo[0].name}}
			<br>{{songinfo[0].ar[0].name}}

			<scroll ref="lyricList" :data="testlrc" class="divscroll">
				<div class="amd">
					<div class='aaa' v-for="(i,index) in lrc" ref="lyricLine">{{i}}</div>
				</div>
			</scroll>
		</div>
		<div class="player">
			<div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progress" class="progress">
				<div class="now" ref="now" :style="{width:progress+'%'}">
				</div>
			</div>
			<div class="flexse">
				<div>{{currentTime | times}}</div>
				<div>{{duration | times}}</div>
			</div>
			<div class="played">
				<i class="Hui-iconfont" :class="iconmode" @click="changemode()"></i>

				<i class="Hui-iconfont Hui-iconfont-shangyishou" @click="prev()"></i>
				<i class="Hui-iconfont" :class="[isplaying ? 'Hui-iconfont-bofang' : 'Hui-iconfont-zanting']" @click="playpasu()"></i>
				<i class="Hui-iconfont Hui-iconfont-xiayishou" @click="next()"></i>
				<i class="Hui-iconfont Hui-iconfont-music" @click.stop="showcollect()"></i>
			</div>

		</div>
		<!--{{songinfo[0].name}}
		{{songinfo[0].name}}
			{{songinfo[0].ar[0].name}}
			{{songinfo[0].al.picUrl}}-->

		<div>

			<audio :src="zhensongurl" @timeupdate="getcurrentTime" @canplay="getDuration" @ended="end"></audio>
		</div>

	</div>
</template>

<script>
	import $ from 'jquery'
	import parseLyric from '../assets/js/lyc';
	import { mapGetters, mapMutations } from 'vuex'
	import { playmode } from '../assets/js/config';
	import { contains, indexof } from '../assets/js/dom';
	import { shuffle } from '../assets/js/until';
	import Scroll from './scroll'
	export default {
		data() {
			return {
				songinfo: '',
				zhensongurl: '',
				islrc: false,
				testlrc: [],
				lrc: {},
				currentTime: '',
				duration: '',

			}

		},
		computed: {
			...mapGetters([
				'srcid',
				'isplaying',
				'mode',
				'collects',
				'playlist'
			]),
			progress() {
				return(this.currentTime / this.duration).toFixed(4) * 100
			},
			iconmode() {
				return this.mode === playmode.sequence ? 'Hui-iconfont-zhongzuo' : this.mode === playmode.loop ? 'Hui-iconfont-huanyipi' : 'Hui-iconfont-help'
			}

		},
		watch: {
			srcid() {
				this.init()
			},
			mode() {
				console.log(this.mode)
			}
		},
		filters: {
			times(data) {
				return parseInt(data / 60) + ':' + (Array(2).join(0) + (data % 60)).slice(-2)
			}
		},
		components: {
			Scroll,

		},
		methods: {
			end() {
				if(this.mode === playmode.loop) {
					const musicself = document.querySelector('audio')
					musicself.currentTime = 0
					musicself.play()
				} else {
					this.next()
				}
			},
			loop() {

				var _this = this

				this.$store.dispatch('srcid', this.playlist[0].id)

			},
			next() {
				if(!this.collects) {
					return
				}
				if(this.collects.length == 1) {
					this.loop();
					return
				} else {
					let idindex = parseInt(indexof(this.playlist, this.srcid))
					if(contains(this.playlist, this.srcid)) {
						idindex += 1
						this.$store.dispatch('srcid', this.playlist[idindex].id)
					} else {
						this.loop();
					}
				}
			},
			prev() {
				if(!this.collects) {
					return
				}
				if(this.collects.length == 1) {
					this.loop();
					return
				} else {
					let idindex = parseInt(indexof(this.playlist, this.srcid))
					if(contains(this.playlist, this.srcid)) {
						idindex -= 1
						this.$store.dispatch('srcid', this.playlist[idindex].id)
					} else {
						this.loop();
					}
				}
			},

			showcollect() {
				this.$store.dispatch('isshowcollect')
			},
			isshow() {
				this.$store.dispatch("audioshow");
			},
			changeTime(event) {

				const musicself = document.querySelector('audio')
				let progress = this.$refs.progress;
				let coordStart = progress.getBoundingClientRect().left; //初始点  元素当前位置
				let coordEnd = event.pageX; //落点  
				musicself.currentTime = (coordEnd - coordStart) / progress.offsetWidth * musicself.duration;
				this.currentTime = musicself.currentTime;
				musicself.play();

			},
			showlrc() {
				this.islrc = !this.islrc
			},
			init() {
				let _this = this;
				this.$http.get('/song/detail?ids=' + this.srcid).then((res) => {
					if(res.status == 200) {
						_this.songinfo = res.data.songs;

					}
				})
				this.$http.get('/lyric?id=' + this.srcid).then((res) => {
					if(res.status == 200) {
						console.log(res.data.lrc)
						_this.lrc = parseLyric.parseLyric(res.data.lrc.lyric);
						_this.testlrc = parseLyric.parseLyric2(res.data.lrc.lyric);
					}
				})

				this.$http.get('/music/url?id=' + this.srcid).then((res) => {
					_this.zhensongurl = res.data.data[0].url
				})

			},
			touchMove(event) {
				let progress = this.$refs.progress;
				let coordStart = progress.getBoundingClientRect().left;
				let coordEnd = event.touches[0].pageX;
				this.$refs.now.style.width = ((coordEnd - coordStart) / progress.offsetWidth).toFixed(3) * 100 + '%';
			},
			touchEnd(event) {
				const musicself = document.querySelector('audio')
				musicself.currentTime = this.$refs.now.style.width.replace('%', '') / 100 * musicself.duration;
				this.now = musicself.currentTime;
				musicself.play();
			},
			playpasu() {
				const musicself = document.querySelector('audio')

				if(this.isplaying == false) {
					musicself.play();
					this.$store.dispatch('isplaying')
				} else {
					musicself.pause();
					this.$store.dispatch('noplaying')
				}

			},
			getcurrentTime() {
				const musicself = document.querySelector('audio')
				this.currentTime = parseInt(musicself.currentTime);

				for(let data = 0; data < this.testlrc.length; data++) {
					if(this.testlrc[data] < this.currentTime && this.currentTime < this.testlrc[data + 1]) {
						$(".aaa").eq(data).addClass("amds")

					} else {
						$(".aaa").eq(data).removeClass("amds")
					}
				}

				let ele = $('.amd').find('.amds').eq(0)

				let nowlrc = parseInt(ele.index())

				let lrcle = this.$refs.lyricLine[nowlrc - 5]

				this.$refs.lyricList.scrollToElement(lrcle, 1000)

			},

			getDuration() {
				const musicself = document.querySelector('audio')
				this.$store.dispatch('isplaying')
				musicself.play();

				this.duration = parseInt(musicself.duration)
			},
			changemode() {

				console.log(this.mode)
				const modes = (this.mode + 1) % 3

				this.setPlayMode(modes)

				let list = null
				if(modes === playmode.random) {
					list = shuffle(this.playlist)

				} else {
					list = this.collects
				}

				this.setplaylist(list)
			},
			...mapMutations({
				setPlayMode: "SET_PLAY_MODE",
				setplaylist: 'SET_PLAYLIST'
			})
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
		.picbd {
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
					.aaa {
						font-size: 14px;
						color: #F3F3F3;
						margin-top: 10px;
						&.amds {
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
					&::after {
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