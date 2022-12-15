<template>
  <div id="chart" class="border darkmode-ignore">
    图表正在加载 ……
  </div>
</template>

<script>
export default {
  name: "Chart",
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
#chart {
  margin-left: 7%;
  height: 100%;
  width: 60%;
  text-align: center;
  vertical-align: center;
  font-size: 3em;
  line-height: 200px;
  background: url("https://cdn1.tianli0.top/gh/MontagneWang/picodemo/img/202209242006237.png") no-repeat bottom;
  background-size: 100% 100%;
}
</style>
