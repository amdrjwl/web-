<template>
	<div class="singer">
		ss
	</div>
	
	
</template>

<script>
	const HOT_NAME='热门'
	const HOT_SINGER_LENGTH= 10
	export default{
		mounted(){
			this.$nextTick(()=>{
				this.getsinger()
			})
		},
		methods:{
			getsinger(){
				let that=this
				this.$http.get('/getsinger').then((res)=>{
					normalize(res.data.artists)
				})
			}
			normalize(artists){
				let map={
					hot:{
						title:HOT_NAME,
						items:[]
					}
				}
				artists.forEach((item,index)=>{
					if(index<HOT_SINGER_LENGTH){
						map.hot.items.push({
							id:item.id,
							name:item.name,
							avatar:item.img1v1Url
						})
					}
					const key=item.findex
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push({
							id:item.id,
							name:item.name,
							avatar:item.img1v1Url
					})
				})
				
				let hot=[]
				let ret=[]
				
				for(let key in map){
					let val=map[key]
					if(val.titel.match(/[a-zA-Z]/)){
						ret.push(val)
					}else{
						hot.push(val)
					}
				}
				
				
				ret.sort((a,b)=>{
					console.log(a)
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
				})
				return hot.concat(ret)
				
			}
		}
	}
</script>

<style>
</style>