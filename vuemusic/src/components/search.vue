<template>
	<div class="search">
		<template v-if="isback">
		<div class="mui-row">
			<div class="mui-col-xs-1">
				<span class="mui-icon mui-icon-back" @click='back()'></span>
			</div>
		
		<div class="mui-col-xs-11">
		<div class="mui-input-row mui-search ">
			
			<input type="search" class="mui-input-clear mui-input-speech searchinput" placeholder="" >
		</div>
		
		
		</div>
		
		</div>
		</template>
			<template v-else>
		<div class="mui-row">
				
		
		<div class="mui-col-xs-12">
		<div class="mui-input-row mui-search ">
			
			<input type="search" class="mui-input-clear mui-input-speech searchinput" placeholder="" >
		</div>
		
		</div>
		
		</div>
		</template>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default{
		computed:{
			...mapGetters([
				'isback'
			])
		},
		watch:{
			$route(to){
				let path=to.path.substring(1);
				console.log(path)		
				if(path=='home' || path=='singer' || path=='member'){
					this.$store.dispatch('isbackfalse')
				}else{
					this.$store.dispatch('isback')
				}
			}
		},
		methods:{
			back(){
				this.$router.back()
			}
		}
	}
</script>
		
<style lang="scss" rel="stylesheet/scss" scoped>
	.search{
		padding: 5px;
		.mui-col-xs-1{
			.mui-icon{
				color: #fff;
				line-height: 1.5em;
			}
		}
		.searchinput{
			background: rgba(255,255,255,0.3);
			border: 1px solid #B27C8B;
		}
		
	}
</style>