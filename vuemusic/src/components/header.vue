<template>
	<div class="header">
		<search></search>
		<div class="tab mui-row" v-show='isshowtab'>
			<div class="mui-col-xs-4">
				<router-link to='/home'>
				推荐
				</router-link>
			</div>
			<div class="mui-col-xs-4">
				<router-link to='/singer'>
				歌手
				</router-link>
			</div>
			<div class="mui-col-xs-4">
				<router-link to='/member'>
				个人中心
				</router-link>
			</div>
		</div>
		
	</div>
</template>

<script>
	import search from './search'
	import { mapGetters } from 'vuex'
	export default{
		components:{
			search
		},
		computed: {
			...mapGetters([
			
				'isshowtab'
			])
		},
		watch: {
			$route(to) { //监听路由变动
				var path = to.path.substring(1);

				this.issearch(path)
			}
		},
		methods:{
			issearch(path) {

				if(path.indexOf('songlist/') >= 0 || path.indexOf('suggestlist') >= 0 || path.indexOf('searchlist') >= 0) {
					this.$store.dispatch('isshowtab')
				} else {
					this.$store.dispatch('isshowtabshow')
				}
				
			},
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
.header{
	.tab {
		
			width: 100%;
		
		
			div {
				text-align: center;
				a {
					display: block;
					padding: 9px 0;
					color: #fff;
					width: 100%;
					&.active {
						color: #28F5FF;
						border-bottom: 3px #28F5FF solid;
					}
				}
			}
		}
}

</style>