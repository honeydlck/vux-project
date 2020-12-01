import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist



router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // // set page title
  // document.title = getPageTitle(to.meta.title)
  // // set header title  by vuex
  // store.commit("app/SET_HEADER_TITLE",to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
// debugger
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Vue.vux.toast.text('出现错误，请重新登录', 'top')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {

    /* has no token*/

    if (whiteList.indexOf(to.path) === -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to,from) => {
  // set page title
  document.title = getPageTitle(to.meta.title)
  // set header title  by vuex
  store.commit("app/SET_HEADER_TITLE",to.meta.title)
  // finish progress bar
  NProgress.done()
})
