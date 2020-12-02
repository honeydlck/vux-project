<template>
  <div class="container">
    <!-- {{ orderList[0] }}
    <Group title="订单列表">
      <cell
        v-for="(item, index) in orderList"
        :key="index"
        :title="item.account"
        >{{ item.account }}</cell
      >
    </Group> -->
    <!-- {{ orderList }} -->
    <ul>
      <li v-for="(item, index) in orderList" :key="index">
        {{ JSON.parse(item.rawData)[0].account }}{{ item.addtime }}
        {{ item.orderid }}
      </li>
    </ul>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
export default {
  data () {
    components: { Group, Cell }
    return {
      orderList: [],
      msg: '记录页面!'
    }
  },

  created () {
    this.$axios.post('/api/index.php?cmd=orderList').then(res => {
      this.orderList = res.data
    })
  }
}
</script>

<style scoped>
</style>