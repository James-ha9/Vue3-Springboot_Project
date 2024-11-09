<template>
  <div class="background">
    <div class="math">
      <div
        ref="chartContainer"
        class="chart-container"
        style="width: 1000px; height: 800px; margin: auto; margin-top: 20px"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChinaMapChart",
  data() {
    return {
      echarts: null, // 用于存储 ECharts 实例
    };
  },
  mounted() {
    this.loadScripts();
  },
  methods: {
    async loadScripts() {
      // 创建一个 Promise 来处理脚本加载
      const loadScript = (url) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = url;
          script.onload = () => resolve(url);
          script.onerror = () =>
            reject(new Error(`Script load error for ${url}`));
          document.head.appendChild(script);
        });
      };

      try {
        // 加载 ECharts
        await loadScript(
          "https://assets.pyecharts.org/assets/v5/echarts.min.js"
        );
        // 加载 China 地图
        await loadScript(
          "https://assets.pyecharts.org/assets/v5/maps/china.js"
        );

        // 此时 ECharts 和 China 地图应该已经加载完毕
        this.initChart();
      } catch (error) {
        console.error("Failed to load scripts:", error);
      }
    },
    initChart() {
      const chartDom = this.$refs.chartContainer;
      this.echarts = echarts.init(chartDom);
      const option = {
        // 配置你的 ECharts 图表选项，包括 China 地图的 series 配置
        series: [
          {
            type: "map",
            name: "捐款者",
            label: {
              show: true,
              margin: 8,
            },
            map: "china",
            data: [
              {
                name: "\u56db\u5ddd\u7701",
                value: 1519,
              },
              {
                name: "\u6d59\u6c5f\u7701",
                value: 946,
              },
              {
                name: "\u798f\u5efa\u7701",
                value: 702,
              },
              {
                name: "\u6c5f\u82cf\u7701",
                value: 2163,
              },
              {
                name: "\u6e56\u5357\u7701",
                value: 742,
              },
              {
                name: "\u5c71\u4e1c\u7701",
                value: 1744,
              },
              {
                name: "\u5b89\u5fbd\u7701",
                value: 1311,
              },
              {
                name: "\u5e7f\u4e1c\u7701",
                value: 1290,
              },
              {
                name: "\u6cb3\u5317\u7701",
                value: 1205,
              },
              {
                name: "\u6e56\u5317\u7701",
                value: 1085,
              },
              {
                name: "\u5409\u6797\u7701",
                value: 287,
              },
              {
                name: "\u4e0a\u6d77\u5e02",
                value: 557,
              },
              {
                name: "\u6c5f\u897f\u7701",
                value: 575,
              },
              {
                name: "\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a",
                value: 1069,
              },
              {
                name: "\u8d35\u5dde\u7701",
                value: 859,
              },
              {
                name: "\u5317\u4eac\u7701",
                value: 679,
              },
              {
                name: "\u4e91\u5357\u7701",
                value: 767,
              },
              {
                name: "\u91cd\u5e86\u5e02",
                value: 664,
              },
              {
                name: "\u6cb3\u5357\u7701",
                value: 1359,
              },
              {
                name: "\u9655\u897f\u7701",
                value: 380,
              },
              {
                name: "\u5c71\u897f\u7701",
                value: 436,
              },
              {
                name: "\u8fbd\u5b81\u7701",
                value: 732,
              },
              {
                name: "\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a",
                value: 357,
              },
              {
                name: "\u5185\u8499\u53e4\u81ea\u6cbb\u533a",
                value: 262,
              },
              {
                name: "\u9ed1\u9f99\u6c5f\u7701",
                value: 443,
              },
              {
                name: "\u5929\u6d25\u5e02",
                value: 203,
              },
              {
                name: "\u7518\u8083\u7701",
                value: 348,
              },
              {
                name: "\u6d77\u5357\u7701",
                value: 121,
              },
              {
                name: "\u9752\u6d77\u7701",
                value: 63,
              },
              {
                name: "\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a",
                value: 134,
              },
              {
                name: "\u897f\u85cf\u81ea\u6cbb\u533a",
                value: 13,
              },
              {
                name: "\u53f0\u6e7e\u7701",
                value: 0,
              },
              {
                name: "\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a",
                value: 0,
              },
              {
                name: "\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a",
                value: 0,
              },
              {
                name: "\u5357\u6d77\u8bf8\u5c9b",
                value: 0,
              },
            ],
            roam: true,
            aspectScale: 0.75,
            nameProperty: "name",
            selectedMode: false,
            zoom: 1.2,
            mapValueCalculation: "sum",
            showLegendSymbol: true,
            emphasis: {},
          },
        ],
        legend: [
          {
            data: ["捐款者"],
            selected: {
              "\u6350\u6b3e\u8005": true,
            },
            show: true,
            padding: 5,
            itemGap: 10,
            itemWidth: 25,
            itemHeight: 14,
            backgroundColor: "transparent",
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 0,
            pageButtonItemGap: 5,
            pageButtonPosition: "end",
            pageFormatter: "{current}/{total}",
            pageIconColor: "#2f4554",
            pageIconInactiveColor: "#aaa",
            pageIconSize: 15,
            animationDurationUpdate: 800,
            selector: false,
            selectorPosition: "auto",
            selectorItemGap: 7,
            selectorButtonGap: 10,
          },
        ],
        tooltip: {
          show: true,
          trigger: "item",
          triggerOn: "mousemove|click",
          axisPointer: {
            type: "line",
          },
          showContent: true,
          alwaysShowContent: false,
          showDelay: 0,
          hideDelay: 100,
          enterable: false,
          confine: false,
          appendToBody: false,
          transitionDuration: 0.4,
          textStyle: {
            fontSize: 14,
          },
          borderWidth: 0,
          padding: 5,
          order: "seriesAsc",
        },
        title: [
          {
            show: true,
            text: "\u65e7\u7269\u56de\u6536\u5728\u5168\u56fd\u7684\u5206\u5e03 \u5355\u4f4d\uff1a\u4e07",
            target: "blank",
            subtarget: "blank",
            padding: 5,
            itemGap: 10,
            textAlign: "auto",
            textVerticalAlign: "auto",
            triggerEvent: false,
          },
        ],
        visualMap: {
          show: true,
          type: "piecewise",
          min: 0,
          max: 2500,
          text: ["\u4eba\u6570\u6570\u91cf\u533a\u95f4:", ""],
          inRange: {
            color: [
              // "#d94e5d",
              // "#eac763",
              // "#50a3ba",

              // "#50a3ba",
              // "#eac763",
              // "#d94e5d",

              // "#FFECEC",
              // "#FFD2D2",
              // "#FFB5B5",
              // "#FF5151"

              "#FFECEC",
              "#FFB5B5",
              "#FF5151",
              // "FF2D2D"
            ],
          },
          // 是否显示拖拽用的手柄
          calculable: true,
          // 是否反向
          inverse: false,
          // 分割段数
          splitNumber: 10,
          // 是否启用鼠标悬停时的联动高亮
          hoverLink: true,
          // 布局方式，默认为垂直布局
          orient: "vertical",
          // 组件离容器左侧的距离
          left: "left",
          // 组件离容器上侧的距离
          top: "middle",
          // 图形离容器四边的距离
          padding: 5,
          // 是否显示刻度标签
          showLabel: true,
          // 图形宽度
          itemWidth: 20,
          // 图形高度
          itemHeight: 14,
          // 图形边框宽度
          borderWidth: 0,
        },
      };

      this.echarts.setOption(option);
    },
  },
  beforeDestroy() {
    if (this.echarts) {
      this.echarts.dispose(); // 销毁 ECharts 实例，释放资源
    }
  },
};
</script>

<style scoped>
.math {
  /* 设置数学区域的宽度为100%，最大宽度为9000px */
  width: 100%;
  max-width: 9000px;
  /* 设置数学区域的上下外边距为90px，左右外边距为auto */
  margin: 90px auto;
  /* 设置数学区域的背景颜色为#561717 */
  background-color: #561717;
  /* 设置数学区域的内边距为10px */
  padding: 15px;
  /* 设置数学区域的阴影效果 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /* 设置数学区域的布局为垂直排列 */
  display: flex;
  flex-direction: column;
  /* 设置数学区域的高度为750px */
  height: 650px;
  /* 设置数学区域的宽度为1210px */
  width: 910px;
  /* 设置数学区域向左浮动 */
  float: left;
  /* 设置外边距，上边距为120px，右边距为40px，下边距为90px，左边距为235px */
  margin: 120px 40px 10px 235px;
  /* 设置数学区域的背景颜色为rgba(219, 235, 241, 0.8) */
  background: rgba(219, 235, 241, 0.8);
  /* 设置数学区域的阴影效果 */
  box-shadow: 0 0 15px rgb(59, 73, 95);
  /* 设置数学区域的边框圆角为15px */
  border-radius: 15px;
  /* 设置数学区域的溢出内容为隐藏 */
  overflow: hidden;
  /* 设置数学区域的滚动对齐方式为起始位置 */
  scroll-snap-align: start;
  /* 设置数学区域的过渡效果为0.5s，缓动函数为ease，延迟时间为0s */
  transition: all 0.5s ease 0s;
}
.math:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.sec {
  height: 50vh;
  width: 50vw;
  scroll-snap-align: start;
}
.background {
  background-color: rgb(245, 245, 245);
  font-size: 18px;
  margin: 0;
  padding: 0;
  margin: 0;
  padding: 0;
  background-image: url("../../../assets/background/jjh.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
