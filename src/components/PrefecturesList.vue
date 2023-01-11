<template>
  <div>
    <!-- 暫定的にリストとして出力 -->
    <ul>
      <li v-for="prefecture in prefectures" :key="prefecture.prefCode">
        {{ prefecture.prefName }}
      </li>
    </ul>
  </div>
</template>
<script lang="js">
export default {
  name: 'PrefecturesList',
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
          this.prefectures = data.result;
        }).catch((error) => {
          console.error(error);
        });
    }
  }
}
</script>
