<template>
  <template v-for="prefecture in prefectures" :key="prefecture.prefCode">
    <PrefectureCheckbox
      :prefCode="prefecture.prefCode"
      :prefName="prefecture.prefName"
      @toggled="onToggled"
    />
  </template>
  <PrefectureChartLine :data="chartData" :options="options" />
</template>
<script lang="js">
import PrefectureCheckbox from './modules/PrefectureCheckbox.vue';
import PrefectureChartLine from './modules/PrefectureChartLine.vue';
export default {
  name: 'PrefecturesList',
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
        maintainAspectRatio: true,
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
    this.getPrefectures();
  },
  methods: {
    getPrefectures() {
      const url = 'https://opendata.resas-portal.go.jp/api/v1/prefectures';
      const options = {
        headers: {
          'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY // APIキーは.envファイルから読み込む
        }
      };

      fetch(url, options)
        .then((response) => {
          // OKが返されなければエラー出力
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response.json();
        }).then((data) => {
          // APIからエラーが返された場合はstatusCodeが含まれているのでそれで判定
          if (data.statusCode) {
            throw new Error(`${data.statusCode} ${data.message} ${data.description}`);
          }

          // 後で使うプロパティをこの段階で作成しておく
          this.prefectures = data.result.map((prefecture) => {
            return {
              prefCode: prefecture.prefCode,
              prefName: prefecture.prefName,
              population: [],
              checked: false
            };
          });
        }).catch((error) => {
          console.error(error);
        });
    },
    getPrefecturePopulation(prefCode) {
      const url = `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`;
      const options = {
        headers: {
          'X-API-KEY': import.meta.env.VITE_RESAS_API_KEY, // APIキーは.envファイルから読み込む
        },
      };

      fetch(url, options)
        .then((response) => {
          // OKが返されなければエラー出力
          if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
          }
          return response.json();
        }).then((data) => {
          // APIからエラーが返された場合はstatusCodeが含まれているのでそれで判定
          if (data.statusCode) {
            throw new Error(`${data.statusCode} ${data.message} ${data.description}`);
          }

          // prefCodeは1始まりなので配列のインデックスとして使うために-1
          const prefecture = this.prefectures[prefCode - 1];

          // 人口：/result/data/data/value
          prefecture.population = data.result.data[0].data.map((population) => {
            return population.value;
          });

          // ラベルは1度だけ取得すればよいので、すでに取得済みでなければ取得する
          if (this.labels.length === 0) {
            this.labels = data.result.data[0].data.map((population) => {
              return population.year;
            });
          }
        }).catch((error) => {
          console.error(error);
        });
    },
    onToggled(event) {
      // prefCodeは1始まりなので配列のインデックスとして使うために-1
      const prefecture = this.prefectures[event.prefCode - 1];
      prefecture.checked = event.checked;

      // 人口データが未取得であれば取得する
      if (event.checked && prefecture.population.length === 0) {
        this.getPrefecturePopulation(event.prefCode);
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
