<template>
	<div class="search">

		<div class="mui-row">
			<template v-if="isback">
				<div class="mui-col-xs-1 ">
					<span class="mui-icon mui-icon-arrowleft" @click="backed()"></span>
				</div>
				<div class="mui-col-xs-11 ">
					<div class="mui-input-row mui-search">

						<input type="search" class="mui-input-clear" placeholder="搜索歌手歌曲或专辑" @click="keyups()" @keyup="suggest(searchInfo)" v-model="searchInfo" />

					</div>
				</div>
			</template>
			<template v-else>
				<div class="mui-col-xs-12 ">
					<div class="mui-input-row mui-search">

						<input type="search" class="mui-input-clear" placeholder="搜索歌手歌曲或专辑" @focus="keyups()" @keyup="suggest(searchInfo)" v-model="searchInfo" />

					</div>
				</div>
			</template>
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default{
		computed: {
			...mapGetters([
				'isback'
			])
		},
		watch: {
			$route(to) { //监听路由变动
				var path = to.path.substring(1);
			
				if(path == 'home' || path == 'singer' || path == 'member') {
					this.$store.dispatch('isbackfalse')
				}else{
					this.$store.dispatch('isback')
				}
			}

		},
		methods: {
				backed() {
					this.$router.back()
				
				},
			}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.search {
		padding: 5px;
		.mui-col-xs-1 {
			.mui-icon-arrowleft {
				line-height: 1.5em;
				color: #fff;
			}
		}
		.mui-search {
			&:before {
				color: #fff
			}
			.mui-icon-search {
				color: #fff
			}
			input {
				background: rgba(255, 255, 255, 0.3);
				border: #B27C8B 1px solid;
			}
			.mui-icon-clear {
				color: #ccc!important
			}
		}
	}
</style>