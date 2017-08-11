<template>
	<scroll class='listview'
		 ref='listview'
		:data='data'
		:probe-type="probeType"
		:listen-scroll='listenScroll'
		@scrolls='scroll'
		>
		<ul >
		
		<li v-for='i in data' class="listgroup" ref='listGroup'>
			<h2 class="list-group-title ">{{i.title}}</h2>
			<ul>
				<li v-for='item in i.items' class="list-group-item">
					<img :src="item.avatar" alt="" class="avatar" />
					<span class="name"> {{item.name}}</span>
					
				</li>
			</ul>
			
				
		</li>
		</ul>
	
	
	<div class="list-shortcut" 
		@touchstart.stop.prevent='onstart'
		@touchmove.stop.prevent='onmove'>
		<ul>
			<li v-for='(i,index) in rightpoint' class="item" :data-index='index'
				:class="{'current':currentindex==index}">{{i}}</li>
		</ul>
		
	</div>
	</scroll>
	
</template>

<script>
	import {getdata} from '../assets/js/dom.js'
	import Scroll from './scroll'
	
	const ANCHOR_HEIGHT=18
	
	export default{
		props:{
			data:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				currentindex:0,
				scrollY:-1
			}
		},
		created(){
			this.touch={},
			this.listheight=[],
			this.listenScroll=true,
			this.probeType=3
		},
		computed:{
			rightpoint(){
				return this.data.map((group)=>{
					return group.title
				})
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.heightcomput()
				},20)
			},
			scrollY(newY){
	
				const listheight=this.listheight
				if(newY>0){
					this.currentindex=0
					return
				}
				for(let i=0;i<listheight.length;i++){
					let height1=listheight[i]
					let height2=listheight[i+1]
					if(-newY>=height1 && -newY<height2){
						this.currentindex=i
						return
					}
				}
				
			}
		},
		components:{
			Scroll
		},
		methods:{
			onstart(e){
				let anchorindex=getdata(e.target,'index')
				let firstTouch=e.touches[0]
				this.touch.s1=firstTouch.pageY
				this.touch.anchorindex=anchorindex
				
				this.scrollto(anchorindex)	
			},
			onmove(e){
				let firstTouch=e.touches[0]
	
				this.touch.s2=firstTouch.pageY
				let esindex = (this.touch.s2-this.touch.s1)/ANCHOR_HEIGHT | 0
					
				let anchorindex=parseInt(this.touch.anchorindex)+esindex
				this.scrollto(anchorindex)	
				
			},
			
			scrollto(index){
				this.scrollY=-this.listheight[index]
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)		
			},
			scroll(pos){
				this.scrollY=pos.y
			},
			heightcomput(){
				this.listheight=[]
				const list=this.$refs.listGroup
				let height=0
				this.listheight.push(height)
				for(let i=0;i<list.length;i++){
					let item=list[i]
					height+=item.clientHeight
					console.log(height)
					this.listheight.push(height)
				}
			}
			
		}
	}
	
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
	.listview {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.5);
		ul {
			padding: 0;
			.listgroup {
				padding-bottom: 30px;
				.list-group-title {
					height: 30px;
					line-height: 30px;
					padding-left: 20px;
					font-size: 12px;
					color: rgba(255, 255, 255, 0.5);
					background: rgba(51, 51, 51, 0.8);
				}
				.list-group-item {
					display: flex;
					align-items: center;
					
				
					padding: 20px 0 0 30px;
					.avatar {
						width: 50px;
						height: 50px;
						border-radius: 50%;
					}
					.name {
						margin-left: 20px;
						color: rgba(255, 255, 255, 0.5);
						font-size: 14px;
					}
				}
			}
		}
		.list-shortcut {
			position: absolute;
			z-index: 30;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 20px;
			padding: 20px 0;
			border-radius: 10px;
			text-align: center;
			background: rgba(0, 0, 0, 0.3);
			font-family: Helvetica;
			.item {
				padding: 3px;
				line-height: 1;
					list-style: none;
				color: rgba(255, 255, 255, 0.5);
				font-size: 12px;
				&.current {
					color: #fff;
					border-radius: 50%;
					background: #ffcd32;
				}
			}
		}
		.list-fixed {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.fixed-title {
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				font-size: 12px;
				color: rgba(255, 255, 255, 0.5);
				background: #333;
			}
		}
	}
</style>