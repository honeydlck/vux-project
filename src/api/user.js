import Vue from 'vue'
/**
 * 用户登录后cookie会存有以下几个字段
 * ecmsmlauth
 * ecmsmlgroupid
 * ecmsmlrnd
 * ecmsmluserid
 * ecmsmlusername
 *
 */

//  export function constructor (vue) {
//      context = vue;
//  }

export function login (data) {

  debugger
  console.log(Vue)
  return Vue.http.fetch('index.php', { params: { m: 'user', c: 'login'} })
}

export function getInfo () {
  return Vue.http.fetch('index.php', {params: { m: 'exam', c: 'memberinfo'} })
}

export function logout () {
  return Vue.http.fetch('index.php', {params: { m: 'exam', c: 'memberinfo'} })
}
