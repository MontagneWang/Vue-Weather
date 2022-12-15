<template>
  <section class="mainInfo border">

    <div class="top">
      <div id="location" class="border">📍 定位中</div>
      <span onclick="location.reload();" class="border">🔄更新数据</span>
      <div id="currentTime" class="border">{{ now_time }}</div>
    </div>

    <div id="weatherIcon" class="border">
      <span id="statusNow"><i class="qi-100"></i> 正在测量</span>
      <span id="feelLike" style="font-size: 14px; width: 100%;"> 体感温度 {{ feelsLike }} ℃</span>
    </div>

    <div class="otherInfo border">
      <span>
          <p id="maxTemp">测量中</p>
          <p id="minTemp">测量中</p>
      </span><span>
          <p id="now.windDir">测量中</p>
          <p id="now.windScale">测量中</p>
      </span>
      <span id="now.vis">能见度<br>测量中</span>
      <span id="now.humidity">相对湿度<br>测量中</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      now_time: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),

      res: [0,0],

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

      max1: '',
      min1: '',
      windDir1: '',
      windScale1: '',
      vis1: '',
      humidity1: '',
    }
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
    this.timer = setInterval(() => {
      this.now_time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    }, 1000)

    function render() {
      Promise.all([axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`),
        axios.get(`https://devapi.qweather.com/v7/weather/now?location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`),
        axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`),
        axios.get(`https://devapi.qweather.com/v7/indices/1d?type=3,8&location=${locationNow}&key=2175cc3e56c3447bb9476001f1513df0`)])
          .then((response) => {

            let {data: resWeather} = response[1]
            let {now: {icon, text, temp, feelsLike}} = resWeather

            let {data: {location: resGeo}} = response[2]
            let [{adm1, adm2, name}] = resGeo

            let {data: {daily: resFeel}} = response[3]
            let [{text: closeText}, {text: feelText}] = resFeel

            let {data: {daily: res}} = response[0]
            let [{
              tempMax: max1,
              tempMin: min1,
              windDirDay: windDir1,
              windScaleDay: windScale1,
              vis: vis1,
              humidity: humidity1
            },
              {
                tempMax: max2,
                tempMin: min2,
                fxDate: date2,
                iconDay: icon2,
                textDay: textDay2,
                windDirDay: windDir2,
                windScaleDay: windScale2
              },
              {
                tempMax: max3,
                tempMin: min3,
                fxDate: date3,
                iconDay: icon3,
                textDay: textDay3,
                windDirDay: windDir3,
                windScaleDay: windScale3
              }] = res

            document.getElementById("statusNow").innerHTML = `<i class="qi-${icon}"></i>\n ${text} ${temp} ℃`
            // document.getElementById("feelLike").innerText = `体感温度 ${feelsLike} ℃`
            document.getElementById("location").innerText = `📍\xa0\xa0${adm1} ${adm2} ${name}`

            document.getElementById("maxTemp").innerText = `🔼\xa0\xa0${max1} ℃`
            document.getElementById("minTemp").innerText = `🔽\xa0\xa0${min1} ℃`
            document.getElementById("now.windDir").innerText = windDir1
            document.getElementById("now.windScale").innerText = `${windScale1}\xa0\xa0级`
            document.getElementById("now.vis").innerText = `能见度\n ${vis1} km`
            document.getElementById("now.humidity").innerText = `湿度\n ${humidity1} %`

            document.querySelector("#tomorrow > span.fxDate").innerText = date2
            document.querySelector("#tomorrow > span.iconDay").innerHTML = `<i class="qi-${icon2}"></i>\n ${textDay2}`
            document.querySelector("#tomorrow > span.tempMax").innerText = `🔼\xa0\xa0${max2} ℃\xa0\xa0\xa0🔽\xa0\xa0${min2} ℃`
            document.querySelector("#tomorrow > span.tempMin").innerText = `${windDir2}\xa0\xa0\xa0${windScale2} 级`

            // document.querySelector("#twoDays > span.fxDate").innerText = date3
            // document.querySelector("#twoDays > span.iconDay").innerHTML = `<i class="qi-${icon3}"></i>\n ${textDay3}`
            // document.querySelector("#twoDays > span.tempMax").innerText = `🔼\xa0\xa0${max3} ℃\xa0\xa0\xa0🔽\xa0\xa0${min3} ℃`
            // document.querySelector("#twoDays > span.tempMin").innerText = `${windDir3}\xa0\xa0\xa0${windScale3} 级`

            document.querySelector("#statusNow").setAttribute('title', closeText)
            document.querySelector("#feelLike").setAttribute('title', feelText)

            // 调用图表绘制函数
            callEcharts(max1, max2, max3, min1, min2, min3)

          })
          .catch((err) => {
            console.log("请求失败，Api 接口请求次数已达今日上限")
            console.dir(err)
            // 弹出错误信息
            // document.getElementById("modal").style.display = "block"
          })
    }

    render()
  },
  beforeUpdate() {
  },  // 数据已更新但模板未更新
  updated() {
  },  // 数据 + 模板已更新
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  activated() {
  },  // 如有 keep-alive 缓存功能，此函数会触发
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
