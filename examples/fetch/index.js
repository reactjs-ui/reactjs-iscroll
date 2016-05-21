import 'isomorphic-fetch';
import assign from 'lodash/assign';

// 定义 fetch 默认选项， 看 https://github.com/github/fetch
const defaultOptions = {
  method: 'get',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8'
  }
};

function checkStatus(response) {
  const status = response.status;
  if (status >= 200 && status < 300) {
    return response;
  }
  let error = new Error(response.statusText);
  error.response = response;
  error.errorCode = status;
  throw error;
}

/**
 * 封装 fetch
 * 根据业务需求，还可以在出错的地方处理相应的功能
 * @param url
 * @param options
 * @returns {Promise.<TResult>}
 */
function callApi({url, options}) {
  if (!url) {
    let error = new Error('请传入 url');
    return Promise.reject(error);
  }

  options = assign({}, defaultOptions, options);
  
  return fetch(url, options)
    .then(checkStatus)
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {
      if (!response.ok || json.success !== true) {
        // 根据后台实际返回数据来定义错误格式
        let error = new Error(json.message || '获取数据出错');
        error.json = json;
        return Promise.reject(error, json);
      }
      return {json, response};
    }).catch((error) => {
      return Promise.reject(error);
    });
}

export default callApi;
