<template>
  <template v-for="prefecture in prefectures" :key="prefecture.prefCode">
    <PrefectureCheckbox :prefCode="prefecture.prefCode" :prefName="prefecture.prefName" @toggled="onToggled" />
  </template>
</template>
<script lang="js">
import PrefectureCheckbox from './modules/PrefectureCheckbox.vue';
export default {
  name: 'PrefecturesList',
  components: {
    PrefectureCheckbox
  },
  data() {
    return {
      prefectures: []
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
              checked: false
            }
          });
        }).catch((error) => {
          console.error(error);
        });
    },
    onToggled(event) {
      // prefCodeは1始まりなので配列のインデックスとして使うために-1
      this.prefectures[event.prefCode - 1].checked = event.checked;
    }
  }
}
</script>
