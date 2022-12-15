<template>
  <div id="tomorrow" class="border">
    <span class="fxDate">日期</span>
    <span class="iconDay">图标文字</span>
    <span class="tempMax">高低温度</span>
    <span class="tempMin">风向风力</span>
  </div>
  <!--    <div id="twoDays" class="border">-->
  <!--      <span class="fxDate">日期</span>-->
  <!--      <span class="iconDay">图标文字</span>-->
  <!--      <span class="tempMax">高低温度</span>-->
  <!--      <span class="tempMin">风向风力</span>-->
  <!--    </div>-->
</template>

<script>
export default {
  name: "Abbr",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  mounted() {
  },       // 挂载完成 DOM可访问 模板已渲染
  beforeUpdate() {
  },  // 数据已更新但模板未更新
  updated() {
  },       // 数据 + 模板已更新
  beforeDestroy() {
  }, // 销毁之前
  activated() {
  },     // 如有 keep-alive 缓存功能，此函数会触发
}
</script>

<style lang="less" scoped>
div {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 20%;
  margin-left: 3%;
}

span {
  width: 100%;
  height: 20%;
}

#tomorrow, #twoDays {
  background: #2980B9; /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #FFFFFF, #66ccff); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #FFFFFF, #66ccff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


  span:nth-child(2) {
    flex: 2;
    line-height: 80px;
    font-size: 2em;
  }
}
</style>
