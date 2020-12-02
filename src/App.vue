<template>
  <div id="app">
    <ViewBox ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <Header
        slot="header"
        style="width: 100%; position: absolute; left: 0; top: 0; z-index: 100"
      ></Header>
      <router-view class="router-view" />
      <Footer slot="bottom"></Footer>
    </ViewBox>
  </div>
</template>

<script>
import { ViewBox } from 'vux'
import Header from './components/Header'
import Footer from './components/Footer'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  name: 'App',
  components: {
    Header,
    ViewBox,
    Footer,
  },
  data () {
    return {}
  },
  methods: {
    getLogin () {
      let urlrouter = window.location.href.split('#/')[1] // 当前路由
      //hostName是后台服务器域名
      //url 是当前页面的地址。
      //appId 是公众号appid（注意：确定后台提供的appid和相关的token是同一个公众号的）

      let url = 'https://taotaokeji.cn/app/dist' // 重定向返回地址
      let str = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx335348b53555183c&redirect_uri=' + url + '/index.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'

      console.log("微信授权连接：", str)
      window.location.href = str

    },
  },
  mounted () {
    setToken('test');
    return
    var WXInfo = localStorage.getItem('WXInfo') ? JSON.parse(localStorage.getItem('WXInfo')) : 'noLogin'
    let str = window.location.href
    var ua = navigator.userAgent.toLowerCase()
    var isWeixin = ua.indexOf('micromessenger') !== -1 // 是否 在微信浏览   器内
    let isURL = window.location.href.indexOf('code=') === -1 // 是否 没有授权重定向回来

    console.log("参数1：", str, ua, isWeixin, isURL)
    if (isWeixin && isURL) {
      this.getLogin()
    } else {
      console.log("没有执行")
    }
    // 重定向回来
    if (!isURL) {
      let num1 = str.indexOf('code=')
      let num2 = str.indexOf('&state=')
      let code = str.slice(num1 + 5, num2)
      localStorage.setItem('WXcode', JSON.stringify(code))
      console.log("wxcode:", JSON.stringify(code))

      this.$axios.post('/api/index.php?cmd=getOpenid', { code: code }).then(res => {
        console.log("res", res.data)
        // setToken(res.data.data)
        if (res.data.data === null) {
          this.getLogin()
          return
        }
        setToken(res.data.data);
      })
    }

  },
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;

  background: #fbf9fe;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.container {
  // background: #fefefe;
  flex: 1;
  overflow: auto;
}
</style>
