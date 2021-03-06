import axios from 'axios';
import store from '@/store'
import { getToken } from '@/utils/auth'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL ='/app/';



// http request 拦截器
axios.interceptors.request.use(function (config) {
    config.headers['O'] = getToken()
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// http response 拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
    return new Promise((resolve,reject) => {
      axios.post(url,data).then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
    })
  }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data).then(response => {
      resolve(response.data);
    },err => {
      reject(err)
    })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
    .then(response => {
      resolve(response.data);
    },err => {
      reject(err)
    })
  })
}