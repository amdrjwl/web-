<template>
	<div class="contentcolle" v-if="collects">
		<div class="screen" @click.stop="selfhide()"></div>

		<div class="colllist">
			<div class="tit">
				<span class="mui-icon mui-icon-loop"></span>
				<span>我的收藏夹</span>
				<span @click="clearlocal()">清楚</span>
			</div>

			<scroll ref="collect" :data="collects" class="collectscroll">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-for="(todo,index) in collects" @click.stop="playcoll(0,todo.title)">
						<span>{{todo.name}}<br>{{todo.arname}}</span>
						<span class="mui-icon mui-icon-closeempty right" @click.stop="removethis(todo)"></span>
					</li>

				</ul>
			</scroll>

		</div>

	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Scroll from './scroll'
	export default {
		computed: mapGetters([

			'collects',
			'isshowcollect'

		]),
		mounted() {
			console.log(this.collects.length)
		},
		watch: {
			isshowcollect() {

				this.$refs.collect.refresh();
			}
		},
		components: {
			Scroll
		},
		methods: {

			clearlocal() {
				let that = this
				let btn = ['确定', '取消']
				mui.confirm('确定清空所有内容', ' ', btn, function(e) {
					if(e.index == 0) {
						that.$store.dispatch('clear');
						mui.toast('已清空')
						that.$store.dispatch('isshowcollect')
					} else {
						mui.toast('算了')
					}
				})

			},
			selfhide() {
				this.$store.dispatch('isshowcollect')
			},
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.contentcolle {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, 0.5);
		.screen {
			width: 100%;
			position: fixed;
			height: 100%;
		}
		.colllist {
			position: absolute;
			border: 1px #FAFAFA solid;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 999;
			background: rgba(0, 0, 0, 0.8);
			border-top-left-radius: 20px;
			border-top-right-radius: 20px;
			color: #fff;
			.tit {
				padding: 5px 10px;
				font-size: 12px;
				width: 100%;
				display: flex;
				justify-content: space-between;
			}
			.collectscroll {
				height: 40vh;
				overflow: hidden;
				ul {
					background: none;
					.mui-table-view-cell {
						border-bottom: 1px solid #fff;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						span {
							font-size: 14px;
						}
						&:after {
							background: none;
						}
						.right {
							font-size: 24px;
							padding-top: 1vh;
						}
					}
				}
			}
		}
	}
</style>