const axios = require("axios")

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

instance.interceptors.response.use(
  res => {
    let {data, status} = res
    if (status === 200 || status === 201) {
      return data
    }
    return data
  },
  error => {
    return Promise.reject(error.message)
  }
)

const get = (url, params = {}) => {
  return instance.get(url, params)
}

const post = (url, body = {}) => {
  return instance.post(url, body)
}

module.exports = {
  get, post
}