<template>
	<div class="wrapper" ref='wrapper'>
		<slot>
			
		</slot>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll'
	
	export default{
		props:{
			probeType:{
				type:Number,
				default:1
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:Array,
				default:null
			},
			listenrefre:{
				type:Number,
				default:20
			},
			listenScroll:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					
					this.refresh()
					
				},20)
				
			}
		},
		mounted(){
			setTimeout(()=>{
				this.initscroll()
			},this.listenrefre)
		},
		methods:{
			initscroll(){
				this.scroll=new Bscroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click
				})
				
				if(this.listenScroll){
					let that=this
					this.scroll.on('scroll',(pos)=>{
						that.$emit('scrolls',pos)
					})
				}
			},
			disable(){
				this.scroll && this.scroll.disable()
			},
			enable(){
				this.scroll && this.scroll.enable()
			},
			refresh(){
				this.scroll && this.scroll.refresh()
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement	.apply(this.scroll,arguments)
			}
		}
	}
	
</script>

<style>
</style>