<template>
	<div class="singer">
		<listview :data='singer'></listview>
	</div>
</template>

<script>
	const HOT_NAME = '热门'
	const HOT_SINGER_LENGTH = 10
	import listview from './listview'
	export default {
		data() {
			return {
				singer: []
			}

		},
		mounted() {
			this.$nextTick(() => {
				this.getsinger()

			})
		},
		components:{
			listview
		},
		methods: {
			getsinger() {
				let that = this
				this.$http.get('/getsinger').then((res) => {
					
					that.singer = that.normalize(res.data.artists)
		
				}, (err) => {

					console.log(err)
				})
			},
			normalize(artists) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				artists.forEach((item, index) => {
					if(index < HOT_SINGER_LENGTH) {
						map.hot.items.push({
							id: item.id,
							name: item.name,
							avatar: item.img1v1Url
						})
					}
					const key = item.findex
					if(!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push({
						id: item.id,
						name: item.name,
						avatar: item.img1v1Url

					})
				})
				//为了有序列表，需要处理map
				let hot=[]
				let ret=[]
				for(let key in map){
					let val=map[key];
					if (val.title.match(/[a-zA-Z]/)) {
						ret.push(val)
					}else if(val.title===HOT_NAME){
						hot.push(val)
					}
				}
				ret.sort((a,b)=>{
					//var str='ABCDEFG'
					//console.log(str.charCodeAt(0)+"-"+str.charCodeAt(1))
					return a.title.charCodeAt(0)-b.title.charCodeAt(0)
				})
				return hot.concat(ret)
			},
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.singer{
	position: fixed;
	top: 88px;
	bottom: 0;
	width: 100%;
}
</style>