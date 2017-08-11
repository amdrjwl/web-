<template>
	<div class="slider" ref='slider'>
		<div class="slidergroup" ref="slidergroup">
			<slot>
			</slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(i,index) in dots"
				 :class="{active:index===currentpage}"></span>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import Bscroll from 'better-scroll'
	export default {
		props: {
			loop: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 3000
			}
		},
		data() {
			return {
				dots: [],
				currentpage: 0
			}

		},
		mounted() {
			this.$nextTick(function() {
				this.getwidth()
				
				this.initdot()
				
				this.initscroll()
				if(this.autoplay){
					this._play()
				}
				
			})
		},
			activated() {
			if(this.autoPlay) {
				this._play()
			}
		},
		deactivated() {
			clearTimeout(this.timer)
		},
		beforeDestroy() {
			clearTimeout(this.timer)
		},
		methods: {
			getwidth() {

				this.children = this.$refs.slidergroup.children
				console.log(this.children.length)
				let width = 0
				let slidewidth = this.$refs.slider.clientWidth
				for(let i = 0; i < this.children.length; i++) {
					let child = this.children[i]

					$(child).addClass('slideitem')

					child.style.width = slidewidth + 'px'
					width += slidewidth

				}
			if(this.loop){
				width+=2*slidewidth
			}
			
				this.$refs.slidergroup.style.width = width + 'px'

			},
			
			initscroll() {
				this.slider = new Bscroll(this.$refs.slider, {
					scrollX: true, //开启横向滚动
					scrollY: false, //关闭默认纵向滚动
					snap: true,
					snapLoop: this.loop,
					snapSpeed: 400,
					snapThreshold: 0.3,
					momentum: false,
					click: true,

				})

				this.slider.on("scrollEnd", () => {
					let pageindex = this.slider.getCurrentPage().pageX

					if(this.loop) {
						pageindex -= 1
					}
					this.currentpage = pageindex
					
					if(this.autoplay){
						this._play()
					}
				})
				this.slider.on('beforeScrollStart',()=>{
					if(this.autoplay){
						clearTimeout(this.timer)
					}
				})

			},
			initdot() {
				this.dots = new Array(this.children.length)
			},
			_play(){
				let pageindex=this.currentpage+1
				
				if(this.loop){
					pageindex+=1
				}
				
				this.timer=setTimeout(()=>{
					this.slider.goToPage(pageindex,0,400)
				},this.interval)
				
			}
		}

	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.slider {
		position: relative;
		min-height: 1px;
		.slidergroup {
			position: relative;
			overflow: hidden;
			white-space: nowrap;
			.slideitem {
				float: left;
				overflow: hidden;
				box-sizing: border-box;
					text-align: center;
				a {
					display: block;
					width: 100%;
					overflow: hidden;
					img{
						display: block;
						width: 100%;
					}
				}
			}
		}
		.dots {
			position: absolute;
			right: 0;
			bottom: 12px;
			left: 0;
		
			text-align: center;
			.dot {
				display: inline-block;
				margin: 0 4px;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.5);
				&.active {
					width: 20px;
					border-radius: 5px;
					background: rgba(255, 255, 255, 0.9);
				}
			}
		}
	}
</style>