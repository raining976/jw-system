
// 全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000'; // 后端接口地址
axios.defaults.timeout = 2000 // 请求过期时间

const request = function (url, params, config, method) {
    return new Promise((resolve, reject) => {
        axios[method](url, params, Object.assign({}, config))
            .then(response => {
                resolve(response.data)
            }, err => {
                if (err.Cancel) {
                    console.log('err', err)
                } else {
                    reject(err)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

const post = (url, params, config = {}) => {
    return request(url, params, config, 'post')
}

const get = (url, params, config = {}) => {
    return request(url, { params }, config, 'get')
}