<template>
  <div class="container">
    <div class="checkbox-container">
      <PrefectureCheckbox
        v-for="prefecture in prefectures"
        :key="prefecture.prefCode"
        :prefCode="prefecture.prefCode"
        :prefName="prefecture.prefName"
        @toggled="onToggled"
      />
    </div>
    <PrefectureChartLine :data="chartData" :options="options" />
  </div>
</template>
<script lang="js">
import PrefectureCheckbox from './modules/PrefectureCheckbox.vue';
import PrefectureChartLine from './modules/PrefectureChartLine.vue';
import { getPrefectures, getPopulation } from '../js/resas.js';
export default {
  name: 'PrefecturesPage',
  components: {
    PrefectureCheckbox,
    PrefectureChartLine
  },
  data() {
    return {
      prefectures: [],
      labels: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: '年度',
              color: '#003b77'
            },
            ticks: {
              color: '#003b77'
            },
            grid: {
              color: '#003b77'
            },
          },
          y: {
            title: {
              display: true,
              text: '人口数',
              color: '#003b77'
            },
            ticks: {
              color: '#003b77'
            },
            grid: {
              color: '#003b77'
            },
          }
        },
        plugins: {
          title: {
            display: true,
            text: '都道府県の総人口数推移',
            position: 'top',
            color: '#003b77'
          },
          legend: {
          labels: {
            color: '#003b77'
          },
        },
          colors: {
            forceOverride: true,
          }
        }
      }
    }
  },
  created() {
    getPrefectures().then((prefectures) => {
      // 後で使うプロパティをこの段階で作成しておく
      this.prefectures = prefectures.map((prefecture) => {
        return {
          prefCode: prefecture.prefCode,
          prefName: prefecture.prefName,
          population: [],
          checked: false
        };
      });
    });
  },
  methods: {
    onToggled(event) {
      // prefCodeは1始まりなので配列のインデックスとして使うために-1
      const prefecture = this.prefectures[event.prefCode - 1];
      prefecture.checked = event.checked;

      // 人口データが未取得であれば取得する
      if (event.checked && prefecture.population.length === 0) {
        getPopulation(event.prefCode).then((data) => {
          // 総人口：/result/data[0]/data/value
          const populationData = data.data[0].data;
          prefecture.population = populationData.map((population) => {
            return population.value;
          });

          // ラベルは1度だけ取得すればよいので、すでに取得済みでなければ取得する
          if (this.labels.length === 0) {
            this.labels = populationData.map((population) => {
              return population.year;
            });
          }
        });
      }
    }
  },
  computed: {
    // 対象の都道府県が変化した際に更新を反映させるためにcomputedでデータを定義
    chartData() {
      return {
        labels: this.labels,
        datasets: this.prefectures
          .filter((prefecture) => {
            // チェックがついている都道府県のみをグラフ表示の対象とする
            return prefecture.checked
          })
          .map((prefecture) => {
            // 都道府県名をラベル、人口をデータとする
            return {
              label: prefecture.prefName,
              data: prefecture.population
            }
          })
      };
    }
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* ある程度のサイズ（今回はXGA）を以下の場合に1カラムとする */
@media screen and (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr;
  }
}

.checkbox-container {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
}
</style>
