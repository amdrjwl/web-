<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot>
			</slot><!--外部引入的dom会被插入到这里-->
		</div>
		<div class="dots">
			<span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import $ from 'jquery'
	import BScroll from 'better-scroll'

	export default {
		name: 'slider',
		props: {                                 //1、
			loop: { //是否循环         
				type: Boolean,
				default: true
			},
			autoPlay: {        
				type: Boolean,
				default: true
			},
			interval: { //自动轮播时间
				type: Number,
				default: 4000
			}
		},
		data() {
			return {
				dots: [],
				currentPageIndex: 0
			}
		},
		mounted() {
			   this.$nextTick(function(){
				this._setSliderWidth()   //计算slide宽度
				this._initDots()
				this._initSlider()    //初始化滚动

				if(this.autoPlay) {
					this._play()
				}
			})

			window.addEventListener('resize', () => {
				if(!this.slider) {
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()
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
			_setSliderWidth(isResize) {

				this.children = this.$refs.sliderGroup.children   //拿到这个列表多少元素
				
				

				let width = 0
				let sliderWidth = this.$refs.slider.clientWidth
				for(let i = 0; i < this.children.length; i++) {
					let child = this.children[i]

					$(child).addClass('slider-item')

					child.style.width = sliderWidth + 'px'
					width += sliderWidth
				}
				if(this.loop && !isResize) {
					width += 2 * sliderWidth
				}
				this.$refs.sliderGroup.style.width = width + 'px'
			},
			_initSlider() {
				this.slider = new BScroll(this.$refs.slider, {
					scrollX: true,   //横向
					scrollY: false,  //不允许纵向
					momentum: false,  //惯性
					click: true,
					snap: true,    
					snapLoop: this.loop,  
					snapThreshold: 0.3,
					snapSpeed: 400
				})

				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX   //pageindex

					if(this.loop) {
						pageIndex -= 1    //循环模式下 必须-1
					}
					this.currentPageIndex = pageIndex

					if(this.autoPlay) {
						this._play()
					}
				})

				this.slider.on('beforeScrollStart', () => {
					if(this.autoPlay) {
						clearTimeout(this.timer)
					}
				})
			},
			_initDots() {
				this.dots = new Array(this.children.length)
			},
			_play() {
				let pageIndex = this.currentPageIndex + 1
				if(this.loop) {
					pageIndex += 1   //从0开始 pageIndex对应第几个元素 开始得时候有复滚
				}
				this.timer = setTimeout(() => {
					this.slider.goToPage(pageIndex, 0, 400)     //第一个参数时滚动
				}, this.interval)
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.slider {
		min-height: 1px;
		.slider-group {
			position: relative;
			overflow: hidden;
			white-space: nowrap;
			.slider-item {
				float: left;
				box-sizing: border-box;
				overflow: hidden;
				text-align: center;
				a {
					display: block;
					width: 100%;
					overflow: hidden;
					text-decoration: none;
				}
				img {
					display: block;
					width: 100%;
				}
			}
		}
		.dots {
			position: relative;
			right: 0;
			left: 0;
			bottom: 22px;
			text-align: center;
			font-size: 0;
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
					background: rgba(255, 255, 255, 0.8);
				}
			}
		}
	}
</style>