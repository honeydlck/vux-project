<template>
  <div class="container">
    <img src="@/assets/images/welearn.png" alt="" />
    <div class="step1"></div>
    <Group title="基本信息" label-align="left" label-width="5rem">
      <XInput
        type="number"
        pattern="[0-9]*"
        title="账  号"
        v-model="account"
        autofocus="autofocus"
        placeholder="请输入您的账号"
      ></XInput>
      <XInput
        type="password"
        title="密  码"
        v-model="password"
        placeholder="请输入您的密码"
      ></XInput>
    </Group>
    <Group title="代刷模式">
      <checker
        type="radio"
        radio-required
        class="mode"
        v-model="openUnit"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected"
      >
        <checker-item v-for="i in ['1', '2']" :key="i" :value="i">{{
          i == '2' ? '分单元' : '做整本'
        }}</checker-item>
      </checker>
    </Group>

    <XButton style="margin-top: 14px" type="primary" @click.native="query"
      >下一步</XButton
    >

    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :props="defaultProps"
    >
    </el-tree>
    <XButton style="margin-top: 14px" type="primary" @click.native="message"
      >下一步</XButton
    >
  </div>
</template>

<script>
import {
  Group,
  XInput,
  XButton,
  XNumber,
  Datetime,
  Checker,
  CheckerItem
} from "vux";

export default {
  components: {
    XInput,
    Group,
    XButton,
    XNumber,
    Datetime,
    Checker,
    CheckerItem
  },
  data () {
    return {
      school: "",
      account: "18390819475",
      password: "ycyc718718",
      orderDuration: "",
      openUnit: "1",
      platformId: "9",
      orderMajor: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    query () {
      let school = this.school,
        account = this.account,
        password = this.password,
        orderDuration = this.orderDuration,
        openUnit = this.openUnit,
        platformId = this.platformId,
        orderMajor = this.orderMajor;
      let rawData = [
        {
          school,
          account,
          password,
          orderDuration,
          openUnit,
          platformId,
          orderMajor
        }
      ];
      console.log(rawData);
      // return;
      this.$axios.post("/api/index.php?cmd=query", { rawData }).then(res => {
        console.log(res.data.data);
        console.log(res.data.data.data)
        this.data = res.data.data.data

      });
    },
    getCourse () {

    }
  }
};
</script>

<style scoped>
.container {
  padding: 10px;
}
.mode {
  height: 45px;
  line-height: 45px;
}
.demo5-item {
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 3px;
  border: 1px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
}
.demo5-item-selected {
  /*    background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom; */
  border-width: 2px;
  border-color: #ff4a00;
}
</style>
