<template>
	<div id="app">
		<nav class="topInfo">
			<Info :info="this.weatherInfo[0]"/>
			<Map/>
		</nav>

		<footer class="future">
			<Abbr :info="this.weatherInfo[1]"/>
			<Abbr :info="this.weatherInfo[2]"/>
			<Chart/>
		</footer>
	</div>
</template>

<script>
import Info from './components/Info'
import Map from './components/Map'
import Abbr from './components/Abbr'
import Chart from './components/Chart'
import {mapState} from "vuex";

export default {
	name: 'App',
	components: {Info, Map, Abbr, Chart},
	data() {
		return {
			weatherInfo: [],
		}
	},
	computed: {
		...mapState(['geoLocation']),
	},
	watch: {
		geoLocation: {
			handler() {
				this.send()
			}
		}
	},
	methods: {
		send() {
			axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${this.geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`)
					.then(({data: {daily: weatherInfo}}) => {
						this.weatherInfo = weatherInfo
					})
					.catch((err) => {
						console.log("请求失败，Api 接口请求次数已达今日上限")
						console.dir(err)
					})
		}
	},
	mounted() {
		this.send()
	},
}
</script>

<style lang="less">
@media screen and (max-width: 720px) {
	body, .future {
		margin-top: 15% !important;
	}

	.map {
		display: none;
	}

	.topInfo {
		margin-top: 10%;
	}

	.mainInfo {
		width: 100% !important;
	}

	#weatherIcon span {
		font-size: 1em;
	}

}

@media screen and (max-width: 900px) {
	#currentTime, #tomorrow, #twoDays {
		display: none;
	}

	#weatherIcon span {
		font-size: .8em;
	}

	#chart {
		margin: 0 !important;
		width: 100% !important;
	}
}

@media screen and (max-width: 1200px) {
	#feelLike {
		display: none;
	}
}

* {
	padding: 0;
	margin: 0;
}

.border {
	border-radius: 25px;
	border: 1px #66ccff solid;
	overflow: hidden;
	box-shadow: 7px 7px 7px #ccc;
}

body {
	min-width: 320px;
	max-width: 1260px;
	height: 100%;
	box-sizing: border-box;
}

.topInfo {
	display: flex;
	justify-content: space-between;
	margin: 2.5% 15%;
}

.future {
	display: flex;
	margin: -1% 15%;
	width: 70%;
	height: 200px;
	text-align: center;
	vertical-align: center;
	line-height: 40px;
}
</style>
