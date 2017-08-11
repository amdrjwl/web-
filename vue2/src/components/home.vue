<template>
	<div class="home">
		<div class="slidercont" v-if='swiperSlides.length'>
			<slide>
				<div v-for="(slide,index) in swiperSlides">
					<a :href='slide.url'>
						<img :src="slide.pic" />
					</a>
				</div>
			</slide>
		</div>

		<div class="backmore">推荐歌单
			<span>更多</span>
		</div>

		<scroll class="songlist" ref="songlist" :data="songlists.id">
			<div class="mui-row scrohei">
				<div class="mui-col-xs-4" v-for='song in songlists'>
					<router-link :to="'/songlist/'+song.id">
						<i class="Hui-iconfont Hui-iconfont-bofang"></i>
						<img v-lazy="song.coverImgUrl" alt="" width="100%" />
						<p> {{song.name | newslength1}}</p>
					</router-link>
				</div>
			</div>
		</scroll>
	</div>
</template>

<script>
	import slide from './slide'
	import { newslength1 } from '../assets/js/newleng';
	import Scroll from './scroll'
	export default {
		components: {
			slide,
			Scroll
		},
		data() {
			return {
				swiperSlides: [],
				songlists: '',
				ulheight: '',

			}
		},
		mounted() {
			// const userInfo = this.getUserInfo();
			this.amd = document.querySelector('.scrohei')
			this.$nextTick(() => {

				this.getbanner();

			})

		},
		methods: {

			getbanner() {
				let that = this
				this.$http.get('/banner').then((res) => {
					console.log(res.data)
					that.swiperSlides = res.data.banners
				}, (err) => {
					console.log(err)
				})

				this.$http.get('/top/playlist/highquality?limit').then((res) => {
					that.songlists = res.data.playlists
					this.amd.style.height = that.songlists.length / 3 * 172 + 'px'
					that.$refs.songlist._initScroll();
				}, (err) => {
					console.log(err)
				})

			},

		},
		filters: {
			newslength1(date, num) {

				return newslength1(date, 5);
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.home {
		.backmore {
			margin-top: 10px;
			padding: 2px 10px;
			display: flex;
			font-size: 15px;
			flex-direction: row;
			justify-content: space-between;
			color: #fff;
		}
		.songlist {
			padding: 2px;
			height: 1px;
			height: 57vh;
			overflow: hidden;
			.mui-row {
				padding: 0;
				.mui-col-xs-4 {
					list-style: none;
					padding: 5px;
					.Hui-iconfont {
						position: absolute;
						right: 1.5vh;
						bottom: 6.5vh;
						color: #fff;
						font-size: 20px;
					}
					p {
						color: #fff
					}
				}
			}
		}
	}
</style>