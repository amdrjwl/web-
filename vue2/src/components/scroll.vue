<template>
	<div ref="wrapper"> 
		<slot></slot>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'

	export default {
		props: {
			probeType: {          //1会截流,只有在滚动结束的时候派发一个 scroll 事件。2在手指 move 的时候也会实时派发 scroll 事件，不会截流。 3除了手指 move 的时候派发scroll事件，在 swipe（手指迅速滑动一小段距离）的情况下，列表会有一个长距离的滚动动画，这个滚动的动画过程中也会实时派发滚动事件
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			data: {
				type: Array,
				default: null
			},
			pullup: {
				type: Boolean,
				default: false
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			refreshDelay: {
				type: Number,
				default: 20
			}
		},

		mounted() {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},

		methods: {
			_initScroll() {
				if(!this.$refs.wrapper) {
					return
				}

				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click
				})

				if(this.listenScroll) {
					let me = this
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}

				if(this.pullup) {
					this.scroll.on('scrollEnd', () => {
						if(this.scroll.y <= (this.scroll.maxScrollY + 50)) {
							this.$emit('scrollToEnd')
						}
					})
				}

				if(this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {
			data() {
				setTimeout(() => {
					this.refresh()
				}, this.refreshDelay)
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>