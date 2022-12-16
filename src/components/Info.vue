<template>
	<!--	因为数据是异步加载的，加上 v-if="info" 可以防止在 props 还没有数据时读取到 undefined -->
	<section class="mainInfo border" v-if="info">
		<div class="top">
			<div id="location" class="border" v-text="`📍\xa0\xa0${adm1} ${adm2} ${name}`">📍 定位中</div>
			<span onclick="location.reload();" class="border">🔄更新数据</span>
			<div id="currentTime" class="border">{{ now_time }}</div>
		</div>

		<div id="weatherIcon" class="border">
			<span id="statusNow"
			      :title="closeText"
			      v-html="`<i class=qi-${icon}></i>\n ${text} ${temp} ℃`">
				<i class="qi-100"></i> 正在测量
			</span>
			<span id="feelLike"
			      style="font-size: 14px; width: 100%;"
			      :title="feelText"
			      v-text="`体感温度 ${feelsLike} ℃`">
				体感温度 测量中
			</span>
		</div>

		<div class="otherInfo border">
      <span>
          <p id="maxTemp">{{ `🔼\xa0\xa0${info.tempMax} ℃` }}</p>
          <p id="minTemp">{{ `🔽\xa0\xa0${info.tempMin} ℃` }}</p>
      </span><span>
          <p id="now.windDir">{{ info.windDirDay }}</p>
          <p id="now.windScale">{{ `${info.windScaleDay}\xa0\xa0级` }}</p>
      </span>
			<span id="now.vis">能见度<br>{{ `\n ${info.vis} km` }}</span>
			<span id="now.humidity">相对湿度<br>{{ `\n ${info.humidity} %` }}</span>
		</div>
	</section>
</template>

<script>
import {mapState} from "vuex";

export default {
	name: "Info",
	props: ['info'],
	data() {
		return {
			now_time: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),

			icon: '',
			text: '',
			temp: '',
			feelsLike: '00',

			resGeo: '',
			adm1: '',
			adm2: '',
			name: '',

			closeText: '',
			feelText: '',
		}
	},
	computed: {
		...mapState(['geoLocation']),
	},
	methods: {
		send() {
			Promise.all([
				axios.get(`https://devapi.qweather.com/v7/weather/now?location=${this.geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`),
				axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${this.geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`),
				axios.get(`https://devapi.qweather.com/v7/indices/1d?type=3,8&location=${this.geoLocation}&key=2175cc3e56c3447bb9476001f1513df0`)])
					.then((response) => {

						let {data: resWeather} = response[0]
						let {now: {icon, text, temp, feelsLike}} = resWeather

						let {data: {location: resGeo}} = response[1]
						let [{adm1, adm2, name}] = resGeo

						let {data: {daily: resFeel}} = response[2]
						let [{text: closeText}, {text: feelText}] = resFeel

						this.icon = icon
						this.text = text
						this.temp = temp
						this.feelsLike = feelsLike
						this.resGeo = resGeo
						this.adm1 = adm1
						this.adm2 = adm2
						this.name = name
						this.closeText = closeText
						this.feelText = feelText
					})
					.catch((err) => {
						console.log("请求失败，Api 接口请求次数已达今日上限")
						console.dir(err)
					})
		}
	},
	watch: {
		geoLocation: {
			handler() {
				this.send()
			}
		}
	},
	mounted() {
		this.timer = setInterval(() => {
			this.now_time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
		}, 1000)

		this.send()
	},
	beforeDestroy() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	},
}
</script>

<style lang="less" scoped>

.mainInfo {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 55%;
	align-content: flex-start;
	background: #FFEEEE; /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #DDEFBB, #FFEEEE); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #DDEFBB, #FFEEEE); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 7%;
	line-height: 100px;
	text-align: center;
	vertical-align: center;
	width: 90%;

	span {
		font-size: 14px;
		line-height: 16px;
		height: 20px;
		text-align: center;
		cursor: pointer;
	}
}

#location {
	height: 30px;
	width: 42%;
	overflow: hidden;
	line-height: 30px;
}

#currentTime {
	overflow: hidden;
	text-align: center;
	line-height: 30px;
	height: 30px;
	width: 30%;
}

.iconDay {
	overflow: hidden;
}

#weatherIcon {
	font-size: 4em;
	overflow: hidden;
	margin: -2% 7%;
	line-height: 100px;
	text-align: center;
	vertical-align: center;
	width: 90%;
	height: 100px;

	#statusNow {
		margin-right: 7%;
	}
}

.otherInfo {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	text-align: center;
	width: 90%;
	height: 80px;
	line-height: 38px;
	margin: 7%;

	span {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 10%;
		height: 100%;

		p {
			flex: 1;
			height: 50%;
		}
	}
}
</style>
