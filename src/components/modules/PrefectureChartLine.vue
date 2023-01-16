<template>
  <div class="chart-container">
    <LineChart :data="data" :options="options" />
  </div>
</template>
<script lang="js">
import {
  Chart as ChartJS,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs' // 'Line'は他のコンポーネントと名前が被る可能性があるので別名をつける

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export default {
  name: 'PrefectureChartLine',
  components: {
    LineChart
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
}
</script>
<style>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* グラフ用にある程度の高さを確保しておく */
  min-height: 320px;
}
</style>
