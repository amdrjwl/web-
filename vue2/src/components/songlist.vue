<template>
	<div>
<div class="bg-image" :style="bgStyle" ref="bgImage">

		</div>
		<div class="mui-row">
			<div class="mui-col-xs-5">
				<img :src="selflist.creator.backgroundUrl" alt="" width="90%" />
			</div>
			<div class="mui-col-xs-7">
				<h1 class="title" v-html="selflist.creator.nickname"></h1>
				<p v-html='selflist.creator.signature'></p>
			</div>
		</div>
		<musiclist :data='pagedata' ></musiclist>
	</div>
</template>

<script>
	import musiclist from './musiclist'
	export default {
		data() {
			return {
				pagedata: [],
				selflist:{},
				bgImage:''
			}
		},
	computed: {
			
			bgStyle() {
				return `background-image:url(${this.bgImage})`
			}
		},
		mounted() {
			//console.log(this.$route.params.idtf)

			this.$nextTick(() => {

				this.getdata(this.$route.params.id);
			})

		},
		methods: {

			getdata(dataid) {
				var _this = this;
				this.$http.get('/playlist/detail?id=' + dataid).then((res) => {
					if(res.status == 200) {
						_this.pagedata = res.data.playlist.tracks;
						_this.selflist=res.data.playlist;
						_this.bgImage = res.data.playlist.creator.backgroundUrl
						console.log(_this.pagedata)
					}
				}, (err) => {
					console.log(err)
				})
			}
		},
		components: {
			musiclist,
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