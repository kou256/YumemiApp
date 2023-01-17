const baseUrl = 'https://opendata.resas-portal.go.jp/api/v1/';
const RESAS_API_KEY = import.meta.env.VITE_RESAS_API_KEY; // APIキーは.envファイルから読み込む

/**
 * 都道府県一覧を取得する
 * @returns {Promise} 都道府県一覧
 */
export async function getPrefectures() {
  const url = baseUrl + 'prefectures';
  const options = {
    headers: {
      'X-API-KEY': RESAS_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    // OKが返されなければエラー出力
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // APIからエラーが返された場合はstatusCodeが含まれているのでそれで判定
    if (data.statusCode) {
      throw new Error(`${data.statusCode} ${data.message} ${data.description}`);
    }
    return data.result;
  } catch (error) {
    console.error(error);
  }
}

/**
 * 指定した都道府県の人口構成を取得する
 * @param {Number} prefCode RESAS APIの都道府県コード
 * @returns {Promise} 指定した都道府県の人口構成
 */
export async function getPopulation(prefCode) {
  const url = baseUrl + `population/composition/perYear?prefCode=${prefCode}`;
  const options = {
    headers: {
      'X-API-KEY': RESAS_API_KEY,
    },
  };

  try {
    const response = await fetch(url, options);
    // OKが返されなければエラー出力
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // APIからエラーが返された場合はstatusCodeが含まれているのでそれで判定
    if (data.statusCode) {
      throw new Error(`${data.statusCode} ${data.message} ${data.description}`);
    }
    return data.result;
  } catch (error) {
    console.error(error);
  }
}
