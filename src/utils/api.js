import axios from "axios"
import {message} from "antd"

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
})

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers["Authorization"] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  res => {
    let {data, status} = res
    if (status === 200 || status === 201) {
      return data
    }
  },
  error => {
    message.error(error.message)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "./#/login"
    }
    return "requestError"
  }
)

const get = (url, params = {}) => {
  return instance.get(url, params)
}

const post = (url, body = {}) => {
  return instance.post(url, body)
}

export default {
  get,
  post
}